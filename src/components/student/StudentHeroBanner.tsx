import React from 'react';
import { UserProfile } from '../../types/academic';
import { Calculator } from 'lucide-react';

interface StudentHeroBannerProps {
  currentUser: UserProfile;
  gpa: number;
  completedCredits: number;
  requiredCredits: number;
  activeTab: 'OVERVIEW' | 'GRADES' | 'SCHEDULE' | 'ATTENDANCE' | 'SIMULATOR';
  onTabChange: (tab: 'OVERVIEW' | 'GRADES' | 'SCHEDULE' | 'ATTENDANCE' | 'SIMULATOR') => void;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const StudentHeroBanner: React.FC<StudentHeroBannerProps> = ({
  currentUser,
  gpa,
  completedCredits,
  requiredCredits,
  activeTab,
  onTabChange,
  language,
  t,
}) => {
  return (
    <div className="bg-[#0A0A0A] rounded-3xl border border-[#262626] p-6 sm:p-8 shadow-md relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-[#C5A059]/40 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#14120A] border border-[#C5A059]/30 text-[#E6CA85] text-xs font-mono-code font-bold">
                {currentUser.code}
              </span>
              <span className="text-xs text-neutral-400 font-mono-code">
                {language === 'es' ? `Semestre ${currentUser.currentSemester}° • 2026-I` : `Semester ${currentUser.currentSemester} • Term 2026-I`}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              {currentUser.name}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5">
              {language === 'es' ? 'Ingeniería de Software e Inteligencia Artificial' : 'Software Engineering & Artificial Intelligence'}
            </p>
          </div>
        </div>

        {/* Academic KPIs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#14120A] border border-[#C5A059]/20 text-center">
            <span className="text-[10px] font-mono-code font-bold uppercase text-[#C5A059] block">
              {t.studentGpa}
            </span>
            <span className="font-mono-code text-xl font-black text-white mt-0.5 block">
              {gpa} / 20
            </span>
            <span className="text-[9px] font-sans text-[#E6CA85] font-semibold">
              {language === 'es' ? 'Sobresaliente' : 'Outstanding'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-center">
            <span className="text-[10px] font-mono-code font-bold uppercase text-emerald-400 block">
              {t.meritHonorRoll}
            </span>
            <span className="font-mono-code text-xs font-bold text-emerald-200 mt-1 block">
              Top 3%
            </span>
            <span className="text-[9px] font-sans text-emerald-400 font-semibold">
              {language === 'es' ? 'Cuadro de Honor' : 'Honor Roll'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#121212] border border-[#262626] text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono-code font-bold uppercase text-neutral-400 block">
              {t.completedCreditsProgress}
            </span>
            <span className="font-mono-code text-lg font-bold text-white mt-0.5 block">
              {completedCredits} / {requiredCredits}
            </span>
            <span className="text-[9px] font-sans text-neutral-400">
              67.6%
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-8 pt-4 border-t border-[#262626] flex flex-wrap items-center gap-2">
        <button
          onClick={() => onTabChange('OVERVIEW')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'OVERVIEW'
              ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20'
              : 'text-neutral-400 hover:text-white hover:bg-[#141414]'
          }`}
        >
          {t.tabOverviewStudent}
        </button>
        <button
          onClick={() => onTabChange('GRADES')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'GRADES'
              ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20'
              : 'text-neutral-400 hover:text-white hover:bg-[#141414]'
          }`}
        >
          {t.tabGradesStudent}
        </button>
        <button
          onClick={() => onTabChange('SIMULATOR')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'SIMULATOR'
              ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20'
              : 'text-[#E6CA85] bg-[#14120A] hover:bg-[#1f1b0f] border border-[#C5A059]/20'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>{t.tabSimulatorStudent}</span>
        </button>
        <button
          onClick={() => onTabChange('SCHEDULE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'SCHEDULE'
              ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20'
              : 'text-neutral-400 hover:text-white hover:bg-[#141414]'
          }`}
        >
          {t.tabScheduleStudent}
        </button>
        <button
          onClick={() => onTabChange('ATTENDANCE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'ATTENDANCE'
              ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20'
              : 'text-neutral-400 hover:text-white hover:bg-[#141414]'
          }`}
        >
          {t.tabAttendanceStudent}
        </button>
      </div>
    </div>
  );
};
