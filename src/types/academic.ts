export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  code: string; // e.g. "ADM-2024", "DOC-0842", "EST-20231049"
  department?: string;
  faculty?: string;
  program?: string; // e.g. "Ingeniería de Software e Inteligencia Artificial"
  currentSemester?: number;
  phone?: string;
  status: 'ACTIVO' | 'LICENCIA' | 'GRADUADO';
}

export type EvaluationCategory = 'PARCIAL' | 'LABORATORIO' | 'PROYECTO' | 'CONTINUA' | 'FINAL';

export interface EvaluationItem {
  id: string;
  code: string; // e.g. "EP1", "LAB1", "PRJ", "EF"
  name: string; // e.g. "Examen Parcial 1"
  weight: number; // Percentage e.g. 20 (sum must be 100)
  maxScore: number; // e.g. 20 or 100
  category: EvaluationCategory;
  date: string;
  isPublished: boolean;
}

export interface StudentGradeRecord {
  evaluationId: string;
  score: number | null; // null if pending
  feedback?: string;
  updatedAt?: string;
}

export type AttendanceStatus = 'P' | 'T' | 'FJ' | 'F'; // Presente, Tardanza, Falta Justificada, Falta

export interface StudentEnrollment {
  studentId: string;
  studentName: string;
  studentCode: string;
  studentAvatar: string;
  studentEmail: string;
  courseId: string;
  grades: StudentGradeRecord[];
  attendance: Record<string, AttendanceStatus>; // key: sessionId or date YYYY-MM-DD
  finalGrade?: number;
  letterGrade?: string;
  status: 'APROBADO' | 'EN_RIESGO' | 'REPROBADO' | 'CURSANDO';
  notes?: string;
}

export interface ScheduleSlot {
  day: 'LUN' | 'MAR' | 'MIE' | 'JUE' | 'VIE' | 'SAB';
  startTime: string; // "08:00"
  endTime: string;   // "10:30"
  roomType: 'VIRTUAL_ZOOM' | 'VIRTUAL_MEET' | 'LAB_CLOUD_GPU' | 'AULA_HIBRIDA';
  roomId: string;
  roomName: string;
  virtualMeetingUrl?: string;
}

export interface Course {
  id: string;
  code: string; // e.g. "INF-401"
  name: string;
  program: string;
  faculty: string;
  semester: number;
  credits: number;
  period: string; // "2026-I"
  teacherId: string;
  teacherName: string;
  teacherEmail: string;
  teacherAvatar: string;
  color: string;
  iconName: string;
  description: string;
  syllabusUrl?: string;
  evaluations: EvaluationItem[];
  schedules: ScheduleSlot[];
  virtualClassroom: {
    platform: 'Zoom Enterprise' | 'Google Meet Pro' | 'Cloud Lab Jupyter' | 'Canvas Studio';
    meetingId: string;
    passcode?: string;
    joinUrl: string;
    isLiveNow: boolean;
    recordingUrl?: string;
  };
}

export type ResourceType = 'VIRTUAL_ZOOM' | 'VIRTUAL_MEET' | 'LAB_CLOUD_GPU' | 'AULA_HIBRIDA' | 'AUDITORIO_VIRTUAL';

export interface ClassroomResource {
  id: string;
  name: string;
  code: string;
  type: ResourceType;
  capacity: number;
  status: 'DISPONIBLE' | 'EN_USO' | 'MANTENIMIENTO';
  specs?: string; // e.g., "8x NVIDIA A100 TensorCore, 500GB RAM" or "Zoom Rooms 500p + Breakouts"
  directUrl: string;
  assignedSlots: {
    day: 'LUN' | 'MAR' | 'MIE' | 'JUE' | 'VIE' | 'SAB';
    startTime: string;
    endTime: string;
    courseId: string;
    courseName: string;
    teacherName: string;
  }[];
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  date: string; // YYYY-MM-DD
  dayName: string;
  sessionNumber: number;
  topic: string;
  modality: 'VIRTUAL' | 'HIBRIDA' | 'LABORATORIO';
  completed: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  targetRole: 'ALL' | 'TEACHER' | 'STUDENT' | 'ADMIN';
  priority: 'ALTA' | 'NORMAL' | 'URGENTE';
  category: 'ACADEMICO' | 'INFRAESTRUCTURA' | 'EVALUACION' | 'INSTITUCIONAL';
}

export interface AcademicProgram {
  id: string;
  code: string;
  name: string;
  degreeType: 'PREGRADO' | 'MAESTRIA' | 'INSTITUTO_TECNOLOGICO';
  faculty: string;
  totalCredits: number;
  durationSemesters: number;
  director: string;
  activeStudents: number;
  coursesCount: number;
}
