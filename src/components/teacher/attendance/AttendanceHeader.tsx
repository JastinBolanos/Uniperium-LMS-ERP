import React from 'react';
import { Plus, Download } from 'lucide-react';

interface AttendanceHeaderProps {
  overallRate: number;
  studentsAtRisk: number;
  totalSessionsCount: number;
  onOpenNewSession: () => void;
  onExportCSV: () => void;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  overallRate,
  studentsAtRisk,
  totalSessionsCount,
  onOpenNewSession,
  onExportCSV,
  language,
  t,
}) => {
  return (
    <div className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-6 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-mono-code font-bold">
              {t.biometricSyncBadge}
            </span>
            <span className="text-xs text-neutral-400 font-mono-code">{t.attendanceLimitNotice}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            {t.attendanceTitle}
          </h2>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            {t.attendanceSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-[#121212] border border-[#262626] text-center">
            <span className="text-[10px] uppercase font-mono-code font-bold text-neutral-400 block">{t.studentAttendanceAverage}</span>
            <span className="font-mono-code text-base font-bold text-emerald-400">
              {overallRate}%
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-[#121212] border border-[#262626] text-center">
            <span className="text-[10px] uppercase font-mono-code font-bold text-neutral-400 block">{t.faWarning}</span>
            <span className={`font-mono-code text-base font-bold ${studentsAtRisk > 0 ? 'text-rose-400' : 'text-neutral-300'}`}>
              {studentsAtRisk} {t.totalEnrolled}
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-[#121212] border border-[#262626] text-center">
            <span className="text-[10px] uppercase font-mono-code font-bold text-neutral-400 block">{language === 'es' ? 'Sesiones Realizadas' : 'Conducted Sessions'}</span>
            <span className="font-mono-code text-base font-bold text-neutral-200">
              {totalSessionsCount} {language === 'es' ? 'Clases' : 'Classes'}
            </span>
          </div>
        </div>
      </div>

      {/* Legend and Actions */}
      <div className="mt-5 pt-4 border-t border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Color Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
          <span className="text-neutral-400 font-bold uppercase text-[10px] mr-1">{t.attendanceLegend}</span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> [P] {t.present}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-amber-950/60 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> [T] {t.late}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-sky-950/60 text-sky-300 border border-sky-500/30 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> [FJ] {t.justified}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-rose-950/60 text-rose-300 border border-rose-500/30 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> [F] {t.absent}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="new-session-btn"
            onClick={onOpenNewSession}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#C5A059]/10 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.newSessionBtn}</span>
          </button>
          <button
            id="export-attendance-csv-btn"
            onClick={onExportCSV}
            className="px-3.5 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] text-neutral-200 border border-[#262626] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.exportExcelCsv}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
