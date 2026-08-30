import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  UserProfile,
  Course,
  StudentEnrollment,
  ClassroomResource,
  AttendanceSession,
  Announcement,
  AcademicProgram,
  EvaluationItem,
  AttendanceStatus,
} from '../types/academic';
import {
  DEMO_USERS,
  INITIAL_COURSES,
  INITIAL_ENROLLMENTS,
  INITIAL_CLASSROOMS,
  INITIAL_ATTENDANCE_SESSIONS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_PROGRAMS,
} from '../data/initialData';
import { calculateStudentFinalGrade } from '../domain/services/gradeCalculationService';
import { calculateAttendanceStats } from '../domain/services/attendanceCalculationService';
import { checkResourceConflict } from '../domain/services/resourceAllocationService';
import { storageAdapter } from '../infrastructure/storage/localStorageAdapter';

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AcademicContextType {
  currentRole: Role;
  currentUser: UserProfile;
  allDemoUsers: Record<Role, UserProfile>;
  courses: Course[];
  enrollments: StudentEnrollment[];
  classrooms: ClassroomResource[];
  attendanceSessions: AttendanceSession[];
  announcements: Announcement[];
  programs: AcademicProgram[];
  selectedCourseId: string;
  isWelcomeOpen: boolean;
  toasts: ToastNotification[];
  
  // Actions
  switchRole: (role: Role) => void;
  setSelectedCourseId: (courseId: string) => void;
  setIsWelcomeOpen: (open: boolean) => void;
  addToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;
  
  // Gradebook operations
  updateStudentGrade: (
    studentId: string,
    courseId: string,
    evaluationId: string,
    score: number | null,
    feedback?: string
  ) => void;
  addEvaluationColumn: (courseId: string, item: Omit<EvaluationItem, 'id'>) => void;
  updateEvaluationColumn: (courseId: string, evalId: string, updates: Partial<EvaluationItem>) => void;
  deleteEvaluationColumn: (courseId: string, evalId: string) => void;
  
  // Attendance operations
  updateAttendance: (
    studentId: string,
    courseId: string,
    sessionId: string,
    status: AttendanceStatus
  ) => void;
  bulkMarkAttendance: (courseId: string, sessionId: string, status: AttendanceStatus) => void;
  addAttendanceSession: (
    courseId: string,
    topic: string,
    date: string,
    modality: 'VIRTUAL' | 'HIBRIDA' | 'LABORATORIO'
  ) => void;
  
  // Classroom / Resource allocation
  allocateResource: (
    resourceId: string,
    slot: {
      day: 'LUN' | 'MAR' | 'MIE' | 'JUE' | 'VIE' | 'SAB';
      startTime: string;
      endTime: string;
      courseId: string;
      courseName: string;
      teacherName: string;
    }
  ) => { success: boolean; error?: string };
  removeResourceSlot: (resourceId: string, index: number) => void;
  
  // Course management
  addCourse: (course: Course) => void;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  
  // Helpers
  calculateStudentFinalGrade: (enrollment: StudentEnrollment, course: Course) => {
    finalScore: number;
    letter: string;
    status: 'APROBADO' | 'EN_RIESGO' | 'REPROBADO' | 'CURSANDO';
    completedWeight: number;
  };
  calculateAttendanceStats: (enrollment: StudentEnrollment, courseId: string) => {
    totalSessions: number;
    attended: number;
    tardies: number;
    justified: number;
    absent: number;
    attendanceRate: number;
    isRiskOfFA: boolean;
  };
  resetAllData: () => void;
}

const AcademicContext = createContext<AcademicContextType | undefined>(undefined);

export const AcademicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<Role>('TEACHER');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-01');
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Persistent entities via storageAdapter
  const [courses, setCourses] = useState<Course[]>(() => {
    return storageAdapter.get<Course[]>('courses', INITIAL_COURSES);
  });

  // Ephemeral / in-memory enrollments (grades are editable in real-time, but fugitive/transient across page reloads)
  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>(() => {
    // Clear any previously persisted enrollments from storage to ensure fresh starting state
    storageAdapter.remove('enrollments');
    return JSON.parse(JSON.stringify(INITIAL_ENROLLMENTS));
  });

  const [classrooms, setClassrooms] = useState<ClassroomResource[]>(() => {
    return storageAdapter.get<ClassroomResource[]>('classrooms', INITIAL_CLASSROOMS);
  });

  const [attendanceSessions, setAttendanceSessions] = useState<AttendanceSession[]>(() => {
    return storageAdapter.get<AttendanceSession[]>('attendance', INITIAL_ATTENDANCE_SESSIONS);
  });

  const [announcements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [programs] = useState<AcademicProgram[]>(INITIAL_PROGRAMS);

  // Sync courses, classrooms, and attendance to local storage (enrollments/grades remain ephemeral in-memory)
  useEffect(() => {
    storageAdapter.set('courses', courses);
  }, [courses]);

  useEffect(() => {
    storageAdapter.set('classrooms', classrooms);
  }, [classrooms]);

  useEffect(() => {
    storageAdapter.set('attendance', attendanceSessions);
  }, [attendanceSessions]);

  const currentUser = DEMO_USERS[currentRole];

  const addToast = (toast: Omit<ToastNotification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchRole = (role: Role) => {
    setCurrentRole(role);
    addToast({
      type: 'info',
      title: `Sesión iniciada como ${role}`,
      message: `Has cambiado al perfil de ${DEMO_USERS[role].name}`,
    });
  };

  // Wrapper for attendance stats by courseId
  const getAttendanceStats = (enrollment: StudentEnrollment, courseId: string) => {
    const courseSessions = attendanceSessions.filter((s) => s.courseId === courseId);
    return calculateAttendanceStats(enrollment, courseSessions);
  };

  // Update grade cell
  const updateStudentGrade = (
    studentId: string,
    courseId: string,
    evaluationId: string,
    score: number | null,
    feedback?: string
  ) => {
    setEnrollments((prev) =>
      prev.map((enrollment) => {
        if (enrollment.studentId === studentId && enrollment.courseId === courseId) {
          const existingGrades = [...(enrollment.grades || [])];
          const gradeIndex = existingGrades.findIndex((g) => g.evaluationId === evaluationId);

          if (gradeIndex >= 0) {
            existingGrades[gradeIndex] = {
              ...existingGrades[gradeIndex],
              score: score !== null ? Math.min(20, Math.max(0, Number(score))) : null,
              feedback: feedback !== undefined ? feedback : existingGrades[gradeIndex].feedback,
              updatedAt: new Date().toISOString(),
            };
          } else {
            existingGrades.push({
              evaluationId,
              score: score !== null ? Math.min(20, Math.max(0, Number(score))) : null,
              feedback: feedback || '',
              updatedAt: new Date().toISOString(),
            });
          }

          const currentCourse = courses.find((c) => c.id === courseId);
          const computed = currentCourse
            ? calculateStudentFinalGrade({ ...enrollment, grades: existingGrades }, currentCourse)
            : { finalScore: 0, letter: 'F', status: 'CURSANDO' as const };

          return {
            ...enrollment,
            grades: existingGrades,
            finalGrade: computed.finalScore,
            letterGrade: computed.letter,
            status: computed.status,
          };
        }
        return enrollment;
      })
    );
  };

  // Add evaluation column
  const addEvaluationColumn = (courseId: string, item: Omit<EvaluationItem, 'id'>) => {
    const newId = `eval-${Date.now()}`;
    const newEval: EvaluationItem = { ...item, id: newId };

    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            evaluations: [...c.evaluations, newEval],
          };
        }
        return c;
      })
    );

    addToast({
      type: 'success',
      title: 'Columna de Evaluación Creada',
      message: `Se añadió "${newEval.name}" (${newEval.weight}%) a la matriz de calificaciones.`,
    });
  };

  const updateEvaluationColumn = (courseId: string, evalId: string, updates: Partial<EvaluationItem>) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            evaluations: c.evaluations.map((ev) => (ev.id === evalId ? { ...ev, ...updates } : ev)),
          };
        }
        return c;
      })
    );

    addToast({
      type: 'info',
      title: 'Evaluación Modificada',
      message: 'Los parámetros de la columna fueron actualizados.',
    });
  };

  const deleteEvaluationColumn = (courseId: string, evalId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            evaluations: c.evaluations.filter((ev) => ev.id !== evalId),
          };
        }
        return c;
      })
    );

    addToast({
      type: 'warning',
      title: 'Columna Eliminada',
      message: 'Se retiró la evaluación del libro de calificaciones.',
    });
  };

  // Attendance update
  const updateAttendance = (
    studentId: string,
    courseId: string,
    sessionId: string,
    status: AttendanceStatus
  ) => {
    setEnrollments((prev) =>
      prev.map((enr) => {
        if (enr.studentId === studentId && enr.courseId === courseId) {
          return {
            ...enr,
            attendance: {
              ...(enr.attendance || {}),
              [sessionId]: status,
            },
          };
        }
        return enr;
      })
    );
  };

  const bulkMarkAttendance = (courseId: string, sessionId: string, status: AttendanceStatus) => {
    setEnrollments((prev) =>
      prev.map((enr) => {
        if (enr.courseId === courseId) {
          return {
            ...enr,
            attendance: {
              ...(enr.attendance || {}),
              [sessionId]: status,
            },
          };
        }
        return enr;
      })
    );

    addToast({
      type: 'success',
      title: 'Asistencia Registrada en Lote',
      message: `Se marcaron todos los alumnos como ${status === 'P' ? 'Presentes' : status} para la sesión.`,
    });
  };

  const addAttendanceSession = (
    courseId: string,
    topic: string,
    date: string,
    modality: 'VIRTUAL' | 'HIBRIDA' | 'LABORATORIO'
  ) => {
    const existingCourseSessions = attendanceSessions.filter((s) => s.courseId === courseId);
    const newSession: AttendanceSession = {
      id: `att-s${Date.now()}`,
      courseId,
      date,
      dayName: new Date(date).toLocaleDateString('es-ES', { weekday: 'long' }),
      sessionNumber: existingCourseSessions.length + 1,
      topic,
      modality,
      completed: true,
    };

    setAttendanceSessions((prev) => [...prev, newSession]);

    // Initialize all active enrollments for this session as 'P' by default
    setEnrollments((prev) =>
      prev.map((enr) => {
        if (enr.courseId === courseId) {
          return {
            ...enr,
            attendance: {
              ...(enr.attendance || {}),
              [newSession.id]: 'P',
            },
          };
        }
        return enr;
      })
    );

    addToast({
      type: 'success',
      title: 'Nueva Sesión de Clase Creada',
      message: `Sesión #${newSession.sessionNumber}: "${topic}" agregada a la matriz de asistencia.`,
    });
  };

  // Classroom allocation with conflict check
  const allocateResource = (
    resourceId: string,
    slot: {
      day: 'LUN' | 'MAR' | 'MIE' | 'JUE' | 'VIE' | 'SAB';
      startTime: string;
      endTime: string;
      courseId: string;
      courseName: string;
      teacherName: string;
    }
  ) => {
    const targetRoom = classrooms.find((c) => c.id === resourceId);
    if (!targetRoom) {
      return { success: false, error: 'Aula o recurso no encontrado' };
    }

    const { hasConflict, conflictingSlot } = checkResourceConflict(targetRoom.assignedSlots, slot);

    if (hasConflict && conflictingSlot) {
      return {
        success: false,
        error: `Conflicto de horario: El recurso ya está reservado por "${conflictingSlot.courseName}" (${conflictingSlot.startTime} - ${conflictingSlot.endTime}) el día ${conflictingSlot.day}.`,
      };
    }

    setClassrooms((prev) =>
      prev.map((room) => {
        if (room.id === resourceId) {
          return {
            ...room,
            assignedSlots: [...room.assignedSlots, slot],
            status: 'EN_USO',
          };
        }
        return room;
      })
    );

    addToast({
      type: 'success',
      title: 'Recurso Asignado',
      message: `Se vinculó ${slot.courseName} a ${targetRoom.name} (${slot.day} ${slot.startTime}-${slot.endTime}).`,
    });

    return { success: true };
  };

  const removeResourceSlot = (resourceId: string, index: number) => {
    setClassrooms((prev) =>
      prev.map((room) => {
        if (room.id === resourceId) {
          const updated = [...room.assignedSlots];
          updated.splice(index, 1);
          return {
            ...room,
            assignedSlots: updated,
            status: updated.length > 0 ? 'EN_USO' : 'DISPONIBLE',
          };
        }
        return room;
      })
    );

    addToast({
      type: 'info',
      title: 'Asignación Liberada',
      message: 'Se canceló la reserva del recurso en ese horario.',
    });
  };

  const addCourse = (course: Course) => {
    setCourses((prev) => [...prev, course]);
    addToast({
      type: 'success',
      title: 'Curso Creado',
      message: `Se registró la asignatura ${course.code}: ${course.name}`,
    });
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, ...updates } : c))
    );
    addToast({
      type: 'info',
      title: 'Curso Actualizado',
      message: 'La configuración de la asignatura fue guardada.',
    });
  };

  const resetAllData = () => {
    storageAdapter.clearAll();
    setCourses(INITIAL_COURSES);
    setEnrollments(INITIAL_ENROLLMENTS);
    setClassrooms(INITIAL_CLASSROOMS);
    setAttendanceSessions(INITIAL_ATTENDANCE_SESSIONS);
    addToast({
      type: 'warning',
      title: 'Datos Restablecidos',
      message: 'Se han restaurado los datos originales de demostración.',
    });
  };

  return (
    <AcademicContext.Provider
      value={{
        currentRole,
        currentUser,
        allDemoUsers: DEMO_USERS,
        courses,
        enrollments,
        classrooms,
        attendanceSessions,
        announcements,
        programs,
        selectedCourseId,
        isWelcomeOpen,
        toasts,
        switchRole,
        setSelectedCourseId,
        setIsWelcomeOpen,
        addToast,
        removeToast,
        updateStudentGrade,
        addEvaluationColumn,
        updateEvaluationColumn,
        deleteEvaluationColumn,
        updateAttendance,
        bulkMarkAttendance,
        addAttendanceSession,
        allocateResource,
        removeResourceSlot,
        addCourse,
        updateCourse,
        calculateStudentFinalGrade,
        calculateAttendanceStats: getAttendanceStats,
        resetAllData,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
};

export const useAcademic = () => {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
};
