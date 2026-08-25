import React from 'react';
import { Course, StudentEnrollment } from '../../types/academic';
import { getLocalizedCourse } from '../../i18n/localize';
import { CalculatedAttendanceStats } from '../../domain/services/attendanceCalculationService';

interface StudentAttendanceTabProps {
  courses: Course[];
  enrollments: StudentEnrollment[];
  studentId: string;
  calculateAttendanceStats: (enrollment: StudentEnrollment, courseId: string) => CalculatedAttendanceStats;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const StudentAttendanceTab: React.FC<StudentAttendanceTabProps> = ({
  courses,
  enrollments,
  studentId,
  calculateAttendanceStats,
  language,
  t,
}) => {
  return (
    <div className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-6 shadow-md space-y-6">
      <div>
        <h3 className="font-display font-bold text-lg text-white">{t.attendanceTitle}</h3>
        <p className="text-xs text-neutral-400">
          {t.attendanceLimitNotice}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => {
          const locCourse = getLocalizedCourse(course.id, course, language);
          const enrollment =
            enrollments.find((e) => e.courseId === course.id && e.studentId === studentId) ||
            enrollments.find((e) => e.courseId === course.id);

          const stats = enrollment
            ? calculateAttendanceStats(enrollment, course.id)
            : { totalSessions: 8, attended: 8, tardies: 0, justified: 0, absent: 0, attendanceRate: 100, isRiskOfFA: false };

          return (
            <div key={course.id} className="p-5 rounded-xl bg-[#121212] border border-[#262626]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-code font-bold text-xs text-[#E6CA85] bg-[#14120A] border border-[#C5A059]/30 px-2 py-0.5 rounded">
                  {course.code}
                </span>
                <span className={`font-mono-code font-bold text-sm ${stats.attendanceRate >= 80 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stats.attendanceRate}% {t.tabAttendanceStudent}
                </span>
              </div>

              <h4 className="font-bold text-sm text-white mb-3">{locCourse.name}</h4>

              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono-code mb-3">
                <div className="p-2 rounded bg-[#0A0A0A] border border-[#262626]">
                  <span className="text-neutral-400 text-[10px] block">{t.present}</span>
                  <span className="font-bold text-emerald-400">{stats.attended}</span>
                </div>
                <div className="p-2 rounded bg-[#0A0A0A] border border-[#262626]">
                  <span className="text-neutral-400 text-[10px] block">{t.late}</span>
                  <span className="font-bold text-amber-400">{stats.tardies}</span>
                </div>
                <div className="p-2 rounded bg-[#0A0A0A] border border-[#262626]">
                  <span className="text-neutral-400 text-[10px] block">{t.justified}</span>
                  <span className="font-bold text-sky-400">{stats.justified || 0}</span>
                </div>
                <div className="p-2 rounded bg-[#0A0A0A] border border-[#262626]">
                  <span className="text-neutral-400 text-[10px] block">{t.absent}</span>
                  <span className="font-bold text-rose-400">{stats.absent}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-[#262626]">
                <span>{language === 'es' ? 'Condición de Asistencia:' : 'Attendance Standing:'}</span>
                <span className={`font-bold ${stats.isRiskOfFA ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {stats.isRiskOfFA ? t.faRisk : t.attendanceNormal}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
