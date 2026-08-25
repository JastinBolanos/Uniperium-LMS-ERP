import React from 'react';
import { AttendanceSession, AttendanceStatus, StudentEnrollment } from '../../../types/academic';
import { CheckCircle, AlertOctagon } from 'lucide-react';
import { CalculatedAttendanceStats } from '../../../domain/services/attendanceCalculationService';

interface AttendanceMatrixTableProps {
  courseSessions: AttendanceSession[];
  filteredStudents: StudentEnrollment[];
  onStatusCycle: (studentId: string, sessionId: string, currentStatus: AttendanceStatus) => void;
  onBulkMark: (sessionId: string, status: AttendanceStatus) => void;
  calculateAttendanceStats: (enrollment: StudentEnrollment, courseId: string) => CalculatedAttendanceStats;
  courseId: string;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const AttendanceMatrixTable: React.FC<AttendanceMatrixTableProps> = ({
  courseSessions,
  filteredStudents,
  onStatusCycle,
  onBulkMark,
  calculateAttendanceStats,
  courseId,
  language,
  t,
}) => {
  return (
    <div className="bg-[#0A0A0A] rounded-2xl border border-[#262626] shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table id="attendance-matrix-table" className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#141414] border-b border-[#262626] text-[11px] font-mono-code uppercase text-neutral-400">
              <th className="py-3 px-3 w-12 text-center border-r border-[#262626]">{t.headerIndex}</th>
              <th className="py-3 px-3 w-28 border-r border-[#262626]">{t.headerCode}</th>
              <th className="py-3 px-4 min-w-[200px] border-r border-[#262626]">{t.headerStudent}</th>

              {/* Dynamic Session Columns */}
              {courseSessions.map((session) => (
                <th
                  key={session.id}
                  className="py-3 px-2 text-center border-r border-[#262626] min-w-[100px] bg-[#121212]"
                >
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="font-bold text-white text-[11px]">
                      {language === 'es' ? `Ses #${session.sessionNumber}` : `Ses #${session.sessionNumber}`}
                    </span>
                    <span className="text-[10px] text-[#E6CA85] font-mono-code font-bold">{session.date}</span>
                    <span className="text-[9px] text-neutral-400 font-sans truncate max-w-[90px]" title={session.topic}>
                      {session.topic}
                    </span>

                    {/* Bulk Mark Shortcuts */}
                    <div className="flex items-center gap-1 mt-1">
                      <button
                        onClick={() => onBulkMark(session.id, 'P')}
                        title={language === 'es' ? 'Marcar todos Presentes' : 'Mark all Present'}
                        className="px-1 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold hover:bg-emerald-900 cursor-pointer"
                      >
                        ✓ {t.allPresent}
                      </button>
                    </div>
                  </div>
                </th>
              ))}

              <th className="py-3 px-3 text-center border-r border-[#262626] min-w-[90px] bg-[#1a160e] font-bold text-[#E6CA85]">
                {t.attendanceRate}
              </th>
              <th className="py-3 px-3 text-center border-r border-[#262626] w-20 bg-[#141414] font-bold text-neutral-300">
                {t.absences}
              </th>
              <th className="py-3 px-4 text-center min-w-[120px] bg-[#141414] font-bold text-neutral-300">
                {t.status}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#262626] text-xs font-sans">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={courseSessions.length + 6} className="py-12 text-center text-neutral-500">
                  {t.noStudentsFound}
                </td>
              </tr>
            ) : (
              filteredStudents.map((enrollment, rowIndex) => {
                const stats = calculateAttendanceStats(enrollment, courseId);

                return (
                  <tr
                    key={enrollment.studentId}
                    className="hover:bg-[#181818] transition-colors"
                  >
                    <td className="py-2.5 px-3 text-center border-r border-[#262626] font-mono-code text-neutral-500 text-[11px] bg-[#0d0d0d]">
                      {rowIndex + 1}
                    </td>

                    <td className="py-2.5 px-3 border-r border-[#262626] font-mono-code text-neutral-300 font-semibold text-[11px]">
                      {enrollment.studentCode}
                    </td>

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

                    {/* Interactive Session Cells */}
                    {courseSessions.map((session) => {
                      const status: AttendanceStatus = enrollment.attendance[session.id] || 'P';

                      let badgeClass = 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40';
                      let statusText = 'P';
                      if (status === 'T') {
                        badgeClass = 'bg-amber-950/60 text-amber-300 border-amber-500/40';
                        statusText = 'T';
                      } else if (status === 'FJ') {
                        badgeClass = 'bg-sky-950/60 text-sky-300 border-sky-500/40';
                        statusText = 'FJ';
                      } else if (status === 'F') {
                        badgeClass = 'bg-rose-950/60 text-rose-300 border-rose-500/40';
                        statusText = 'F';
                      }

                      return (
                        <td
                          key={session.id}
                          id={`att-cell-${enrollment.studentId}-${session.id}`}
                          onClick={() => onStatusCycle(enrollment.studentId, session.id, status)}
                          className="py-2 px-2 text-center border-r border-[#262626] cursor-pointer hover:bg-[#1f1f1f] select-none transition-colors"
                          title={language === 'es' ? 'Clic para alternar (P -> T -> FJ -> F)' : 'Click to cycle (P -> T -> FJ -> F)'}
                        >
                          <span className={`inline-block w-8 py-0.5 rounded text-[11px] font-mono-code font-bold border ${badgeClass}`}>
                            {statusText}
                          </span>
                        </td>
                      );
                    })}

                    {/* Attendance Rate */}
                    <td className="py-2.5 px-3 text-center border-r border-[#262626] font-mono-code text-sm font-bold bg-[#14120a]">
                      <span
                        className={
                          stats.attendanceRate >= 85
                            ? 'text-emerald-400'
                            : stats.attendanceRate >= 70
                            ? 'text-[#E6CA85]'
                            : 'text-rose-400'
                        }
                      >
                        {stats.attendanceRate}%
                      </span>
                    </td>

                    {/* Absences count */}
                    <td className="py-2.5 px-3 text-center border-r border-[#262626] font-mono-code text-xs font-bold text-neutral-300">
                      <span className={stats.absent > 2 ? 'text-rose-400' : 'text-neutral-300'}>
                        {stats.absent} {stats.tardies > 0 && <span className="text-[10px] text-amber-400 font-normal">(+{stats.tardies}T)</span>}
                      </span>
                    </td>

                    {/* FA Warning Status */}
                    <td className="py-2.5 px-4 text-center">
                      {stats.isRiskOfFA ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-rose-950/60 text-rose-400 border border-rose-500/40">
                          <AlertOctagon className="w-3 h-3 text-rose-400" />
                          <span>{t.faRisk}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span>{t.regularAttendance}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-[#121212] border-t border-[#262626] flex items-center justify-between text-xs text-neutral-400">
        <span className="font-mono-code text-[11px]">
          {language === 'es' ? 'Haz clic en cualquier celda para rotar el estado: Presente [P] -> Tardanza [T] -> Falta Justificada [FJ] -> Falta Injustificada [F]' : 'Click any cell to cycle status: Present [P] -> Tardy [T] -> Justified [FJ] -> Absent [F]'}
        </span>
        <span className="text-[11px] text-neutral-500 italic">* {t.autoSaveActive}</span>
      </div>
    </div>
  );
};
