import { AttendanceSession, AttendanceStatus, StudentEnrollment } from '../../types/academic';

export interface CalculatedAttendanceStats {
  totalSessions: number;
  attended: number;
  tardies: number;
  justified: number;
  absent: number;
  attendanceRate: number;
  isRiskOfFA: boolean;
}

export interface SessionOverview {
  sessionId: string;
  totalPresent: number;
  totalTardy: number;
  totalJustified: number;
  totalAbsent: number;
  totalEnrolled: number;
  attendanceRate: number;
}

/**
 * Calculates attendance metrics and FA risk for a student in a course
 * Standard rule: Unjustified absences > 30% flags FA (Inhabilitado por inasistencias)
 */
export function calculateAttendanceStats(
  enrollment: StudentEnrollment,
  sessions: AttendanceSession[]
): CalculatedAttendanceStats {
  const totalSessions = sessions.length;
  if (totalSessions === 0) {
    return {
      totalSessions: 0,
      attended: 0,
      tardies: 0,
      justified: 0,
      absent: 0,
      attendanceRate: 100,
      isRiskOfFA: false,
    };
  }

  let attended = 0;
  let tardies = 0;
  let justified = 0;
  let absent = 0;

  sessions.forEach((s) => {
    const status: AttendanceStatus = enrollment.attendance[s.id] || 'P';
    if (status === 'P') attended++;
    else if (status === 'T') tardies++;
    else if (status === 'FJ') justified++;
    else if (status === 'F') absent++;
  });

  // Tardiness weight: 2 tardies = 1 absent in strict systems, or attendance formula: (P + T*0.5 + FJ*0.8) / Total
  const effectivePresent = attended + tardies * 0.75 + justified;
  const attendanceRate = Math.min(100, Math.round((effectivePresent / totalSessions) * 100));

  // Risk of FA if absences > 30% of total sessions
  const isRiskOfFA = (absent / totalSessions) >= 0.3 || (attendanceRate < 70);

  return {
    totalSessions,
    attended,
    tardies,
    justified,
    absent,
    attendanceRate,
    isRiskOfFA,
  };
}

/**
 * Computes attendance summary for a given session across all students
 */
export function calculateSessionOverview(
  sessionId: string,
  enrollments: StudentEnrollment[]
): SessionOverview {
  let totalPresent = 0;
  let totalTardy = 0;
  let totalJustified = 0;
  let totalAbsent = 0;

  enrollments.forEach((enr) => {
    const status = enr.attendance[sessionId] || 'P';
    if (status === 'P') totalPresent++;
    else if (status === 'T') totalTardy++;
    else if (status === 'FJ') totalJustified++;
    else if (status === 'F') totalAbsent++;
  });

  const totalEnrolled = enrollments.length;
  const attendanceRate = totalEnrolled > 0
    ? Math.round(((totalPresent + totalTardy * 0.75 + totalJustified) / totalEnrolled) * 100)
    : 100;

  return {
    sessionId,
    totalPresent,
    totalTardy,
    totalJustified,
    totalAbsent,
    totalEnrolled,
    attendanceRate,
  };
}
