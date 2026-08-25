import { Course, StudentEnrollment, AttendanceSession } from '../../types/academic';
import { calculateStudentFinalGrade } from './gradeCalculationService';
import { calculateAttendanceStats } from './attendanceCalculationService';
import { getLocalizedStatus } from '../../i18n/localize';

/**
 * Generates and downloads a CSV of the gradebook table
 */
export function exportGradebookToCSV(
  course: Course,
  enrollments: StudentEnrollment[],
  language: 'es' | 'en' = 'es'
): void {
  const isEs = language === 'es';
  const headers = [
    isEs ? 'Código' : 'Student ID',
    isEs ? 'Estudiante' : 'Student Name',
    'Email',
    ...course.evaluations.map((e) => `${e.code} (${e.weight}%)`),
    isEs ? 'Promedio Ponderado' : 'Weighted Final',
    isEs ? 'Calificación' : 'Letter Grade',
    isEs ? 'Condición' : 'Status',
  ];

  const courseEnrollments = enrollments.filter((e) => e.courseId === course.id);

  const rows = courseEnrollments.map((enr) => {
    const computed = calculateStudentFinalGrade(enr, course);
    const scores = course.evaluations.map((ev) => {
      const g = enr.grades.find((x) => x.evaluationId === ev.id);
      return g && g.score !== null && g.score !== undefined ? g.score : '';
    });

    return [
      enr.studentCode,
      `"${enr.studentName}"`,
      enr.studentEmail,
      ...scores,
      computed.finalScore,
      computed.letter,
      getLocalizedStatus(computed.status, language),
    ].join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Uniperium_Gradebook_${course.code}_${isEs ? '2026-I' : 'Term-2026-I'}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generates and downloads an attendance matrix CSV
 */
export function exportAttendanceToCSV(
  course: Course,
  sessions: AttendanceSession[],
  enrollments: StudentEnrollment[],
  language: 'es' | 'en' = 'es'
): void {
  const isEs = language === 'es';
  const courseSessions = sessions.filter((s) => s.courseId === course.id);
  const courseEnrollments = enrollments.filter((e) => e.courseId === course.id);

  const headers = [
    isEs ? 'Código' : 'Student ID',
    isEs ? 'Estudiante' : 'Student Name',
    ...courseSessions.map((s) => `"${s.date} - ${s.topic}"`),
    isEs ? '% Asistencia' : '% Attendance',
    isEs ? 'Inasistencias' : 'Absences',
    isEs ? 'Riesgo FA' : 'FA Risk',
  ];

  const rows = courseEnrollments.map((enr) => {
    const stats = calculateAttendanceStats(enr, courseSessions);
    const sessionStatuses = courseSessions.map((s) => enr.attendance[s.id] || 'P');

    return [
      enr.studentCode,
      `"${enr.studentName}"`,
      ...sessionStatuses,
      `${stats.attendanceRate}%`,
      stats.absent,
      stats.isRiskOfFA ? (isEs ? 'ALERTA FA' : 'FA WARNING') : (isEs ? 'REGULAR' : 'REGULAR'),
    ].join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Uniperium_Attendance_${course.code}_${isEs ? '2026-I' : 'Term-2026-I'}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
