import React from 'react';
import { Course, StudentEnrollment } from '../../../types/academic';
import { getLocalizedCourse } from '../../../i18n/localize';
import { ClassGradeStats, CalculatedFinalGrade } from '../../../domain/services/gradeCalculationService';

interface GradebookStatsModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  classStats: ClassGradeStats;
  courseEnrollments: StudentEnrollment[];
  calculateStudentFinalGrade: (enrollment: StudentEnrollment, course: Course) => CalculatedFinalGrade;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const GradebookStatsModal: React.FC<GradebookStatsModalProps> = ({
  course,
  isOpen,
  onClose,
  classStats,
  courseEnrollments,
  calculateStudentFinalGrade,
  language,
  t,
}) => {
  if (!isOpen) return null;

  const localizedCourse = getLocalizedCourse(course.id, course, language);

  const excellentCount = courseEnrollments.filter(
    (e) => calculateStudentFinalGrade(e, course).finalScore >= 17
  ).length;

  const satisfactoryCount = courseEnrollments.filter((e) => {
    const s = calculateStudentFinalGrade(e, course).finalScore;
    return s >= 13 && s < 17;
  }).length;

  const atRiskCount = courseEnrollments.filter((e) => {
    const s = calculateStudentFinalGrade(e, course).finalScore;
    return s >= 10.5 && s < 13;
  }).length;

  const failedCount = courseEnrollments.filter(
    (e) => calculateStudentFinalGrade(e, course).finalScore < 10.5
  ).length;

  const total = courseEnrollments.length || 1;

  return (
    <div id="stats-overview-modal" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] rounded-2xl shadow-2xl border border-[#262626] max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              {t.statsModalTitle}
            </h3>
            <p className="text-xs text-neutral-400">{course.code} • {localizedCourse.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[#14120a] border border-[#C5A059]/30 text-center">
            <span className="text-[10px] font-mono-code font-bold uppercase text-[#C5A059]">{t.statsClassAvg}</span>
            <span className="text-xl font-mono-code font-black text-[#E6CA85] block mt-0.5">{classStats.avg}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
            <span className="text-[10px] font-mono-code font-bold uppercase text-emerald-400">{t.statsHighest}</span>
            <span className="text-xl font-mono-code font-black text-emerald-300 block mt-0.5">{classStats.highest}</span>
          </div>
          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-center">
            <span className="text-[10px] font-mono-code font-bold uppercase text-rose-400">{t.statsLowest}</span>
            <span className="text-xl font-mono-code font-black text-rose-300 block mt-0.5">{classStats.lowest}</span>
          </div>
        </div>

        <h4 className="text-xs font-mono-code font-bold uppercase text-neutral-300 mb-2">
          {t.gradeDistribution}
        </h4>
        <div className="space-y-2 mb-6">
          <div>
            <div className="flex justify-between text-xs text-neutral-400 mb-1">
              <span>{language === 'es' ? 'Sobresaliente (17 - 20 pts)' : 'Excellent (17 - 20 pts)'}</span>
              <span className="font-bold text-white">{excellentCount} {t.totalEnrolled}</span>
            </div>
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-[#262626]">
              <div
                style={{ width: `${(excellentCount / total) * 100}%` }}
                className="h-full bg-emerald-500 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-neutral-400 mb-1">
              <span>{language === 'es' ? 'Aprobado Satisfactorio (13 - 16.9 pts)' : 'Satisfactory (13 - 16.9 pts)'}</span>
              <span className="font-bold text-white">{satisfactoryCount} {t.totalEnrolled}</span>
            </div>
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-[#262626]">
              <div
                style={{ width: `${(satisfactoryCount / total) * 100}%` }}
                className="h-full bg-[#C5A059] rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-neutral-400 mb-1">
              <span>{language === 'es' ? 'En Riesgo / Regular (10.5 - 12.9 pts)' : 'At Risk / Average (10.5 - 12.9 pts)'}</span>
              <span className="font-bold text-white">{atRiskCount} {t.totalEnrolled}</span>
            </div>
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-[#262626]">
              <div
                style={{ width: `${(atRiskCount / total) * 100}%` }}
                className="h-full bg-amber-500 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-neutral-400 mb-1">
              <span>{language === 'es' ? 'Desaprobado (< 10.5 pts)' : 'Failed (< 10.5 pts)'}</span>
              <span className="font-bold text-white">{failedCount} {t.totalEnrolled}</span>
            </div>
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-[#262626]">
              <div
                style={{ width: `${(failedCount / total) * 100}%` }}
                className="h-full bg-rose-500 rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#141414] hover:bg-[#202020] border border-[#262626] text-white text-xs font-bold cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
