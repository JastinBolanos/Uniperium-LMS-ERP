import React from 'react';
import { Course, StudentEnrollment } from '../../../types/academic';
import { getLocalizedStatus, getLocalizedEvaluation } from '../../../i18n/localize';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { CalculatedFinalGrade } from '../../../domain/services/gradeCalculationService';

interface GradebookTableProps {
  course: Course;
  filteredStudents: StudentEnrollment[];
  editingCell: { studentId: string; evalId: string } | null;
  cellInputValue: string;
  onCellClick: (studentId: string, evalId: string, currentScore: number | null) => void;
  onCellInputChange: (value: string) => void;
  onCellBlur: () => void;
  onCellKeyDown: (e: React.KeyboardEvent) => void;
  calculateStudentFinalGrade: (enrollment: StudentEnrollment, course: Course) => CalculatedFinalGrade;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const GradebookTable: React.FC<GradebookTableProps> = ({
  course,
  filteredStudents,
  editingCell,
  cellInputValue,
  onCellClick,
  onCellInputChange,
  onCellBlur,
  onCellKeyDown,
  calculateStudentFinalGrade,
  language,
  t,
}) => {
  return (
    <div className="overflow-x-auto">
      <table id="excel-gradebook-table" className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#141414] border-b border-[#262626] text-[11px] font-mono-code uppercase text-neutral-400">
            <th className="py-3 px-3 w-12 text-center border-r border-[#262626]">{t.headerIndex}</th>
            <th className="py-3 px-3 w-28 border-r border-[#262626]">{t.headerCode}</th>
            <th className="py-3 px-4 min-w-[200px] border-r border-[#262626]">{t.headerStudent}</th>

            {/* Dynamic Evaluation Columns */}
            {course.evaluations.map((ev) => {
              const locEval = getLocalizedEvaluation(ev.id, ev, language);
              return (
                <th key={ev.id} className="py-3 px-3 text-center border-r border-[#262626] min-w-[120px]">
                  <div className="flex items-center justify-center gap-1 font-bold text-white">
                    <span>{ev.code}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#C5A059]/20 text-[#E6CA85] border border-[#C5A059]/30 font-normal">
                      {ev.weight}%
                    </span>
                  </div>
                  <div className="text-[9px] text-neutral-400 font-sans truncate max-w-[110px]" title={locEval.name}>
                    {locEval.name}
                  </div>
                </th>
              );
            })}

            <th className="py-3 px-3 text-center border-r border-[#262626] min-w-[110px] bg-[#1a160e] font-bold text-[#E6CA85]">
              {t.headerWeightedAvg}
            </th>
            <th className="py-3 px-3 text-center border-r border-[#262626] w-16 bg-[#1a160e] font-bold text-[#E6CA85]">
              {t.headerLetter}
            </th>
            <th className="py-3 px-4 text-center min-w-[120px] bg-[#141414] font-bold text-neutral-300">
              {t.headerCondition}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#262626] text-xs font-sans">
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan={course.evaluations.length + 6} className="py-12 text-center text-neutral-500">
                {t.noStudentsFound}
              </td>
            </tr>
          ) : (
            filteredStudents.map((enrollment, rowIndex) => {
              const computed = calculateStudentFinalGrade(enrollment, course);

              return (
                <tr
                  key={enrollment.studentId}
                  className="hover:bg-[#181818] transition-colors group"
                >
                  {/* Row Index */}
                  <td className="py-2.5 px-3 text-center border-r border-[#262626] font-mono-code text-neutral-500 text-[11px] bg-[#0d0d0d]">
                    {rowIndex + 1}
                  </td>

                  {/* Student Code */}
                  <td className="py-2.5 px-3 border-r border-[#262626] font-mono-code text-neutral-300 font-semibold text-[11px]">
                    {enrollment.studentCode}
                  </td>

                  {/* Student Name and Avatar */}
                  <td className="py-2.5 px-4 border-r border-[#262626]">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={enrollment.studentAvatar}
                        alt={enrollment.studentName}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-[#C5A059]/30"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-neutral-100 truncate">{enrollment.studentName}</p>
                        <p className="text-[10px] text-neutral-500 font-mono-code truncate">{enrollment.studentEmail}</p>
                      </div>
                    </div>
                  </td>

                  {/* Grade Cells for each Evaluation */}
                  {course.evaluations.map((ev) => {
                    const gradeRecord = enrollment.grades.find((g) => g.evaluationId === ev.id);
                    const isEditing = editingCell?.studentId === enrollment.studentId && editingCell?.evalId === ev.id;
                    const score = gradeRecord?.score;

                    let scoreColor = 'text-neutral-300';
                    if (score !== null && score !== undefined) {
                      if (score >= 14) scoreColor = 'text-emerald-400 font-bold bg-emerald-950/20';
                      else if (score >= 10.5) scoreColor = 'text-amber-400 font-bold bg-amber-950/20';
                      else scoreColor = 'text-rose-400 font-bold bg-rose-950/20';
                    }

                    return (
                      <td
                        key={ev.id}
                        id={`cell-${enrollment.studentId}-${ev.id}`}
                        onClick={() => onCellClick(enrollment.studentId, ev.id, score ?? null)}
                        className={`py-2 px-3 text-center border-r border-[#262626] font-mono-code text-xs cursor-pointer select-none transition-all ${
                          isEditing
                            ? 'bg-[#1f190e] ring-2 ring-[#C5A059] ring-inset'
                            : 'hover:bg-[#1a1a1a]'
                        } ${scoreColor}`}
                        title={t.clickCellToEdit}
                      >
                        {isEditing ? (
                          <input
                            autoFocus
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            value={cellInputValue}
                            onChange={(e) => onCellInputChange(e.target.value)}
                            onBlur={onCellBlur}
                            onKeyDown={onCellKeyDown}
                            className="w-14 text-center py-1 px-1 rounded bg-[#0A0A0A] font-mono-code font-bold text-[#E6CA85] border border-[#C5A059] focus:outline-hidden"
                          />
                        ) : score !== null && score !== undefined ? (
                          <span>{score.toFixed(1)}</span>
                        ) : (
                          <span className="text-neutral-600 italic font-sans text-[11px]">--</span>
                        )}
                      </td>
                    );
                  })}

                  {/* Calculated Final Grade */}
                  <td className="py-2.5 px-3 text-center border-r border-[#262626] font-mono-code text-sm font-bold bg-[#14120a]">
                    <span
                      className={
                        computed.finalScore >= 14
                          ? 'text-emerald-400'
                          : computed.finalScore >= 10.5
                          ? 'text-[#E6CA85]'
                          : 'text-rose-400'
                      }
                    >
                      {computed.finalScore.toFixed(2)}
                    </span>
                  </td>

                  {/* Letter Grade */}
                  <td className="py-2.5 px-3 text-center border-r border-[#262626] font-mono-code text-xs font-bold text-neutral-300 bg-[#14120a]">
                    {computed.letter}
                  </td>

                  {/* Final Condition Pill */}
                  <td className="py-2.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider ${
                        computed.status === 'APROBADO'
                          ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/40'
                          : computed.status === 'EN_RIESGO'
                          ? 'bg-amber-950/50 text-amber-400 border border-amber-500/40'
                          : computed.status === 'REPROBADO'
                          ? 'bg-rose-950/50 text-rose-400 border border-rose-500/40'
                          : 'bg-neutral-900 text-neutral-400 border border-[#262626]'
                      }`}
                    >
                      {computed.status === 'APROBADO' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      {computed.status === 'EN_RIESGO' && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                      {computed.status === 'REPROBADO' && <XCircle className="w-3 h-3 text-rose-400" />}
                      <span>{getLocalizedStatus(computed.status, language)}</span>
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
