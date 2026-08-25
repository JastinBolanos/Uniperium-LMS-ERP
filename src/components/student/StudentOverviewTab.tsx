import React from 'react';
import { Course, StudentEnrollment } from '../../types/academic';
import { getLocalizedCourse, getLocalizedStatus } from '../../i18n/localize';
import { Video, ChevronRight } from 'lucide-react';
import { CalculatedFinalGrade } from '../../domain/services/gradeCalculationService';
import { CalculatedAttendanceStats } from '../../domain/services/attendanceCalculationService';

interface StudentOverviewTabProps {
  courses: Course[];
  enrollments: StudentEnrollment[];
  studentId: string;
  calculateStudentFinalGrade: (enrollment: StudentEnrollment, course: Course) => CalculatedFinalGrade;
  calculateAttendanceStats: (enrollment: StudentEnrollment, courseId: string) => CalculatedAttendanceStats;
  onSelectCourse: (courseId: string) => void;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const StudentOverviewTab: React.FC<StudentOverviewTabProps> = ({
  courses,
  enrollments,
  studentId,
  calculateStudentFinalGrade,
  calculateAttendanceStats,
  onSelectCourse,
  language,
  t,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => {
          const locCourse = getLocalizedCourse(course.id, course, language);
          const enrollment =
            enrollments.find((e) => e.courseId === course.id && e.studentId === studentId) ||
            enrollments.find((e) => e.courseId === course.id);

          const computed = enrollment
            ? calculateStudentFinalGrade(enrollment, course)
            : { finalScore: 0, letter: 'F', status: 'CURSANDO' as const };

          const attStats = enrollment
            ? calculateAttendanceStats(enrollment, course.id)
            : { attendanceRate: 100, isRiskOfFA: false };

          return (
            <div
              key={course.id}
              className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-6 shadow-md hover:border-[#C5A059]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Course Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-[#14120A] border border-[#C5A059]/30 font-mono-code font-bold text-[11px] text-[#E6CA85]">
                        {course.code}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono-code">{course.credits} {t.credits}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-white leading-snug">
                      {locCourse.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{t.teacher}: {course.teacherName}</p>
                  </div>

                  {/* Grade Pill */}
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono-code text-neutral-400 block uppercase">{t.average}</span>
                    <span className="font-mono-code font-black text-xl text-white">
                      {computed.finalScore.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-mono-code font-bold text-emerald-400 block">
                      {computed.letter} • {getLocalizedStatus(computed.status, language)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-4">
                  {locCourse.description}
                </p>

                {/* Progress Bars */}
                <div className="space-y-2 mb-6">
                  <div>
                    <div className="flex justify-between text-[11px] font-mono-code text-neutral-400 mb-1">
                      <span>{t.attendanceTitle}</span>
                      <span className="font-bold text-neutral-200">{attStats.attendanceRate}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div
                        style={{ width: `${attStats.attendanceRate}%` }}
                        className={`h-full rounded-full ${attStats.attendanceRate >= 80 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Bar */}
              <div className="pt-4 border-t border-[#262626] flex items-center justify-between gap-3">
                <a
                  href={course.virtualClassroom.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#C5A059]/10 transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{course.virtualClassroom.isLiveNow ? t.joinSession : t.openClassroom}</span>
                </a>

                <button
                  onClick={() => onSelectCourse(course.id)}
                  className="text-xs font-bold text-neutral-300 hover:text-[#E6CA85] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{t.tabGradesStudent}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
