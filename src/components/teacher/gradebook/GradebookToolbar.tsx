import React from 'react';
import { Course } from '../../../types/academic';
import { Plus, Download, BarChart2, Search } from 'lucide-react';

interface GradebookToolbarProps {
  course: Course;
  totalWeight: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: 'ALL' | 'APROBADO' | 'EN_RIESGO' | 'REPROBADO';
  onStatusFilterChange: (filter: 'ALL' | 'APROBADO' | 'EN_RIESGO' | 'REPROBADO') => void;
  totalEnrolled: number;
  passedCount: number;
  atRiskCount: number;
  failedCount: number;
  onOpenAddEvaluation: () => void;
  onExportCSV: () => void;
  onOpenStats: () => void;
  t: Record<string, string>;
}

export const GradebookToolbar: React.FC<GradebookToolbarProps> = ({
  course,
  totalWeight,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalEnrolled,
  passedCount,
  atRiskCount,
  failedCount,
  onOpenAddEvaluation,
  onExportCSV,
  onOpenStats,
  t,
}) => {
  return (
    <div className="space-y-4">
      {/* Weights Verification Bar & Actions */}
      <div className="mt-5 pt-4 border-t border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 max-w-xl">
          <div className="flex items-center justify-between text-xs mb-1.5 font-mono-code">
            <span className="text-neutral-300 font-semibold">{t.totalWeight}</span>
            <span className={`font-bold ${totalWeight === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {totalWeight}% {totalWeight === 100 ? t.weightValid : t.weightInvalid}
            </span>
          </div>
          <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden flex border border-[#262626]">
            {course.evaluations.map((ev, idx) => (
              <div
                key={ev.id}
                style={{ width: `${ev.weight}%` }}
                title={`${ev.code}: ${ev.weight}%`}
                className={`h-full border-r border-black/40 ${
                  idx % 4 === 0
                    ? 'bg-[#C5A059]'
                    : idx % 4 === 1
                    ? 'bg-sky-500'
                    : idx % 4 === 2
                    ? 'bg-[#9A7B39]'
                    : 'bg-emerald-500'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="add-eval-column-btn"
            onClick={onOpenAddEvaluation}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#C5A059]/10 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addColumn}</span>
          </button>
          <button
            id="export-csv-btn"
            onClick={onExportCSV}
            className="px-3.5 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] text-neutral-200 border border-[#262626] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.exportExcelCsv}</span>
          </button>
          <button
            id="stats-drawer-btn"
            onClick={onOpenStats}
            className="p-2 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] text-neutral-300 transition-colors cursor-pointer"
            title={t.statsModalTitle}
          >
            <BarChart2 className="w-4 h-4 text-[#C5A059]" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            id="search-students-input"
            type="text"
            placeholder={t.searchStudentsPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0A0A0A] border border-[#262626] text-xs text-neutral-100 placeholder-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059]"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 bg-[#0A0A0A] p-1 rounded-xl border border-[#262626] text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => onStatusFilterChange('ALL')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              statusFilter === 'ALL' ? 'bg-[#C5A059] text-black font-bold' : 'text-neutral-400 hover:bg-[#141414]'
            }`}
          >
            {t.filterAll} ({totalEnrolled})
          </button>
          <button
            onClick={() => onStatusFilterChange('APROBADO')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              statusFilter === 'APROBADO' ? 'bg-emerald-600 text-white font-bold' : 'text-neutral-400 hover:bg-[#141414]'
            }`}
          >
            {t.filterPassed} ({passedCount})
          </button>
          <button
            onClick={() => onStatusFilterChange('EN_RIESGO')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              statusFilter === 'EN_RIESGO' ? 'bg-amber-600 text-white font-bold' : 'text-neutral-400 hover:bg-[#141414]'
            }`}
          >
            {t.filterAtRisk} ({atRiskCount})
          </button>
          <button
            onClick={() => onStatusFilterChange('REPROBADO')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              statusFilter === 'REPROBADO' ? 'bg-rose-600 text-white font-bold' : 'text-neutral-400 hover:bg-[#141414]'
            }`}
          >
            {t.filterFailed} ({failedCount})
          </button>
        </div>
      </div>
    </div>
  );
};
