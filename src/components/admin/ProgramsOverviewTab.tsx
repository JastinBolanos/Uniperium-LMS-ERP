import React from 'react';
import { AcademicProgram } from '../../types/academic';
import { getLocalizedProgram } from '../../i18n/localize';

interface ProgramsOverviewTabProps {
  programs: AcademicProgram[];
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const ProgramsOverviewTab: React.FC<ProgramsOverviewTabProps> = ({
  programs,
  language,
  t,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((prog) => {
          const locProg = getLocalizedProgram(prog.id, prog, language);
          return (
            <div
              key={prog.id}
              className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-6 shadow-md flex flex-col justify-between hover:border-[#C5A059]/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-[#14120A] border border-[#C5A059]/30 font-mono-code font-bold text-xs text-[#E6CA85]">
                    {prog.code}
                  </span>
                  <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-sky-950/40 text-sky-300 border border-sky-500/30">
                    {prog.degreeType}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white leading-snug mb-1">
                  {locProg.name}
                </h3>
                <p className="text-xs text-neutral-400 mb-4">{locProg.faculty}</p>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono-code bg-[#121212] p-3 rounded-xl border border-[#262626] mb-4">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">{t.totalEnrolled}</span>
                    <span className="font-bold text-white">{prog.activeStudents}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">{t.credits}</span>
                    <span className="font-bold text-white">{prog.totalCredits}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">{t.duration}</span>
                    <span className="font-bold text-white">{prog.durationSemesters} {t.semesters}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#262626] flex items-center justify-between text-xs text-neutral-400">
                <span>{t.director} <strong className="text-neutral-200">{prog.director}</strong></span>
                <span className="font-mono-code text-[#E6CA85] font-bold">{prog.coursesCount} {language === 'es' ? 'Cursos' : 'Courses'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
