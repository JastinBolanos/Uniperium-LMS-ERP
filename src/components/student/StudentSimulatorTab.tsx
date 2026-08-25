import React, { useState, useMemo } from 'react';
import { Course, StudentEnrollment } from '../../types/academic';
import { getLocalizedCourse } from '../../i18n/localize';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { predictRequiredFinalGrade } from '../../domain/services/gradeCalculationService';

interface StudentSimulatorTabProps {
  courses: Course[];
  enrollments: StudentEnrollment[];
  studentId: string;
  onToast: (toast: { type: 'success' | 'info' | 'warning' | 'error'; title: string; message: string }) => void;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const StudentSimulatorTab: React.FC<StudentSimulatorTabProps> = ({
  courses,
  enrollments,
  studentId,
  onToast,
  language,
  t,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [targetGoalGrade, setTargetGoalGrade] = useState<number>(14.0);

  const simCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const locSimCourse = getLocalizedCourse(simCourse?.id || '', simCourse, language);

  const simEnrollment =
    enrollments.find((e) => e.courseId === simCourse?.id && e.studentId === studentId) ||
    enrollments.find((e) => e.courseId === simCourse?.id);

  const simulationResult = useMemo(() => {
    if (!simCourse || !simEnrollment) {
      return {
        requiredScore: 0,
        isPossible: true,
        remainingWeight: 20,
        currentAccumulatedScore: 0,
        completedWeight: 80,
      };
    }
    return predictRequiredFinalGrade(simEnrollment, simCourse, targetGoalGrade);
  }, [simCourse, simEnrollment, targetGoalGrade]);

  const celebrateGoal = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
    onToast({
      type: 'success',
      title: language === 'es' ? '¡Meta Proyectada!' : 'Projected Goal!',
      message:
        language === 'es'
          ? `Con ${simulationResult.requiredScore} pts alcanzas tu meta de ${targetGoalGrade} en ${simCourse.code}.`
          : `With ${simulationResult.requiredScore} pts you reach your goal of ${targetGoalGrade} in ${simCourse.code}.`,
    });
  };

  return (
    <div className="bg-[#0A0A0A] rounded-3xl border border-[#262626] p-6 sm:p-8 shadow-md max-w-3xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-[#14120A] border border-[#C5A059]/30 text-[#E6CA85] text-xs font-mono-code font-bold">
            {t.gpaSimulator}
          </span>
        </div>
        <h3 className="font-display font-bold text-2xl text-white">
          {t.gpaSimulator}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-1">
          {t.gpaSimulatorDesc}
        </p>
      </div>

      {/* Select Course & Target */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1.5">
            {t.selectSimCourse}
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#121212] border border-[#262626] text-xs font-semibold text-white focus:outline-hidden focus:border-[#C5A059]"
          >
            {courses.map((c) => {
              const loc = getLocalizedCourse(c.id, c, language);
              return (
                <option key={c.id} value={c.id}>
                  {c.code} • {loc.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1.5">
            {t.targetGpa}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="11.0"
              max="20.0"
              step="0.5"
              value={targetGoalGrade}
              onChange={(e) => setTargetGoalGrade(parseFloat(e.target.value))}
              className="flex-1 accent-[#C5A059]"
            />
            <span className="w-14 text-center font-mono-code font-black text-lg text-[#E6CA85] px-2 py-1 bg-[#14120A] border border-[#C5A059]/30 rounded-lg">
              {targetGoalGrade.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Simulation Output Card */}
      <div
        className={`p-6 rounded-2xl border ${
          simulationResult.isPossible
            ? 'bg-gradient-to-br from-[#14120A] via-[#0D0D0D] to-[#0A0A0A] border-[#C5A059]/30'
            : 'bg-rose-950/30 border-rose-500/30'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-[11px] font-mono-code font-bold uppercase text-neutral-400 block">
              {t.requiredFinalScore} ({t.weight}: {simulationResult.remainingWeight}%)
            </span>
            <div className="text-3xl sm:text-4xl font-mono-code font-black text-white mt-1">
              {simulationResult.isPossible ? (
                <span className="text-[#E6CA85]">{simulationResult.requiredScore.toFixed(2)} / 20.00 pts</span>
              ) : (
                <span className="text-rose-400">{t.simNotPossibleAlert}</span>
              )}
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              {language === 'es' ? 'Puntaje acumulado actual:' : 'Current weighted score:'}{' '}
              <strong className="font-mono-code text-neutral-200">
                {simulationResult.currentAccumulatedScore} pts
              </strong>
            </p>
          </div>

          {simulationResult.isPossible && (
            <button
              onClick={celebrateGoal}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black font-bold text-xs flex items-center gap-2 shadow-md shadow-[#C5A059]/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>{t.celebrateSimulationBtn}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
