import React from 'react';
import { Course, StudentEnrollment } from '../../types/academic';
import { getLocalizedCourse, getLocalizedEvaluation, getLocalizedStatus } from '../../i18n/localize';
import { CalculatedFinalGrade } from '../../domain/services/gradeCalculationService';

interface StudentGradesTabProps {
  courses: Course[];
  enrollments: StudentEnrollment[];
  studentId: string;
  calculateStudentFinalGrade: (enrollment: StudentEnrollment, course: Course) => CalculatedFinalGrade;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const StudentGradesTab: React.FC<StudentGradesTabProps> = ({
  courses,
  enrollments,
  studentId,
  calculateStudentFinalGrade,
  language,
  t,
}) => {
  return (
    <div className="space-y-6">
      {courses.map((course) => {
        const locCourse = getLocalizedCourse(course.id, course, language);
        const enrollment =
          enrollments.find((e) => e.courseId === course.id && e.studentId === studentId) ||
          enrollments.find((e) => e.courseId === course.id);

        const computed = enrollment
          ? calculateStudentFinalGrade(enrollment, course)
          : { finalScore: 0, letter: 'F', status: 'CURSANDO' as const };

        return (
          <div key={course.id} className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-6 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262626] mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-code font-bold text-xs text-[#E6CA85] bg-[#14120A] border border-[#C5A059]/30 px-2 py-0.5 rounded">
                    {course.code}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white">{locCourse.name}</h3>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">{t.teacher}: {course.teacherName}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-mono-code uppercase text-neutral-400 block">{t.average}</span>
                  <span className="font-mono-code text-2xl font-black text-white">{computed.finalScore.toFixed(2)}</span>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-xl font-mono-code font-bold text-xs border ${
                    computed.status === 'APROBADO'
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                  }`}
                >
                  {computed.letter} • {getLocalizedStatus(computed.status, language)}
                </div>
              </div>
            </div>

            {/* Evaluations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {course.evaluations.map((ev) => {
                const locEval = getLocalizedEvaluation(ev.id, ev, language);
                const gradeObj = enrollment?.grades.find((g) => g.evaluationId === ev.id);
                const score = gradeObj?.score;

                return (
                  <div key={ev.id} className="p-4 rounded-xl bg-[#121212] border border-[#262626] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono-code text-xs font-bold text-white">{ev.code}</span>
                        <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-[#14120A] text-[#E6CA85] border border-[#C5A059]/20 font-semibold">
                          {t.weight} {ev.weight}%
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-neutral-200 mb-2 leading-snug">{locEval.name}</h4>

                      {gradeObj?.feedback && (
                        <div className="p-2.5 rounded-lg bg-[#0A0A0A] border border-[#262626] text-[11px] text-neutral-400 italic mb-3">
                          "{gradeObj.feedback}"
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#262626] flex items-center justify-between">
                      <span className="text-[10px] font-mono-code text-neutral-400">{t.score}:</span>
                      <span
                        className={`font-mono-code font-black text-base ${
                          score !== null && score !== undefined
                            ? score >= 14
                              ? 'text-emerald-400'
                              : score >= 10.5
                              ? 'text-[#E6CA85]'
                              : 'text-rose-400'
                            : 'text-neutral-500 italic text-xs'
                        }`}
                      >
                        {score !== null && score !== undefined
                          ? `${score.toFixed(1)} / 20`
                          : language === 'es'
                          ? 'Pendiente'
                          : 'Pending'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
