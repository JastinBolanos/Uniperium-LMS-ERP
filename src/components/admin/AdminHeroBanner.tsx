import React from 'react';
import { Download, ArrowUpRight, Server } from 'lucide-react';
import { AcademicProgram, ClassroomResource } from '../../types/academic';

interface AdminHeroBannerProps {
  programs: AcademicProgram[];
  classrooms: ClassroomResource[];
  activeAdminTab: 'OVERVIEW' | 'RESOURCES' | 'PROGRAMS';
  onTabChange: (tab: 'OVERVIEW' | 'RESOURCES' | 'PROGRAMS') => void;
  onExportInstitutionalReport: () => void;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const AdminHeroBanner: React.FC<AdminHeroBannerProps> = ({
  programs,
  classrooms,
  activeAdminTab,
  onTabChange,
  onExportInstitutionalReport,
  language,
  t,
}) => {
  const totalStudents = 1420;
  const retentionRate = 98.4;

  return (
    <div className="bg-[#0A0A0A] rounded-3xl border border-[#262626] p-6 sm:p-8 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#14120A] border border-[#C5A059]/30 text-[#E6CA85] text-xs font-mono-code font-bold">
              {t.institutionalControlPanel}
            </span>
            <span className="text-xs text-neutral-400 font-mono-code">{t.semesterPeriod}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            {t.adminTitle}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5 max-w-2xl">
            {t.adminSubtitle}
          </p>
        </div>

        <button
          onClick={onExportInstitutionalReport}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black font-bold text-xs flex items-center gap-2 shadow-md shadow-[#C5A059]/20 transition-colors cursor-pointer self-start lg:self-auto"
        >
          <Download className="w-4 h-4 text-black" />
          <span>{t.exportInstitutionalReport}</span>
        </button>
      </div>

      {/* Global Institutional KPIs */}
      <div className="mt-8 pt-6 border-t border-[#262626] grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#121212] border border-[#262626]">
          <span className="text-[10px] font-mono-code font-bold uppercase text-neutral-400 block">{t.kpiTotalStudents}</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-mono-code text-2xl font-black text-white">{totalStudents}</span>
            <span className="text-[10px] font-mono-code font-bold text-emerald-400 flex items-center">
              +12% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">{t.activeFacultiesCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#121212] border border-[#262626]">
          <span className="text-[10px] font-mono-code font-bold uppercase text-neutral-400 block">{t.kpiRetentionRate}</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-mono-code text-2xl font-black text-emerald-400">{retentionRate}%</span>
            <span className="text-[10px] font-mono-code font-bold text-emerald-400">{t.highEfficiencyBadge}</span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">{t.dropoutRiskRate}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#121212] border border-[#262626]">
          <span className="text-[10px] font-mono-code font-bold uppercase text-neutral-400 block">{t.kpiProgramsCount}</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-mono-code text-2xl font-black text-[#E6CA85]">{programs.length} {language === 'es' ? 'Programas' : 'Degrees'}</span>
            <span className="text-[10px] font-mono-code font-bold text-[#C5A059]">{t.accreditedPrograms}</span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">{t.coursesTaughtCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#121212] border border-[#262626]">
          <span className="text-[10px] font-mono-code font-bold uppercase text-neutral-400 block">{t.kpiCloudEnvironments}</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-mono-code text-2xl font-black text-sky-400">{classrooms.length} {language === 'es' ? 'Entornos' : 'Environments'}</span>
            <span className="text-[10px] font-mono-code font-bold text-sky-400">100% Online</span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">{t.zeroIncidentsReported}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-8 pt-4 border-t border-[#262626] flex flex-wrap items-center gap-2">
        <button
          onClick={() => onTabChange('OVERVIEW')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAdminTab === 'OVERVIEW'
              ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20'
              : 'text-neutral-400 hover:text-white hover:bg-[#141414]'
          }`}
        >
          {t.adminTabOverview}
        </button>
        <button
          onClick={() => onTabChange('RESOURCES')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeAdminTab === 'RESOURCES'
              ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20'
              : 'text-[#E6CA85] bg-[#14120A] hover:bg-[#1f1b0f] border border-[#C5A059]/20'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>{t.adminTabResources}</span>
        </button>
        <button
          onClick={() => onTabChange('PROGRAMS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAdminTab === 'PROGRAMS'
              ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20'
              : 'text-neutral-400 hover:text-white hover:bg-[#141414]'
          }`}
        >
          {t.adminTabPrograms}
        </button>
      </div>
    </div>
  );
};
