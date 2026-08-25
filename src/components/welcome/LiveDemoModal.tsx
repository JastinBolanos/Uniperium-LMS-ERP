import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Role } from '../../types/academic';
import {
  BarChart3,
  GraduationCap,
  Layers,
  CheckCircle2,
  X,
  ArrowRight,
  Calculator,
  Server,
  Sparkles,
  AlertTriangle,
  Play,
  Cpu,
  Video,
  Eye,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: Role) => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
}) => {
  const { t, language } = useLanguage();
  const [activeCase, setActiveCase] = useState<'TEACHER' | 'STUDENT' | 'ADMIN'>('TEACHER');

  // Interactive Mini-Demo States
  // Teacher mini-state: live grade edit
  const [teacherGrades, setTeacherGrades] = useState({
    sofiaPC1: 18.0,
    sofiaPC2: 17.5,
    sofiaEP: 16.0,
    sofiaEF: 19.0,
  });

  // Student mini-state: target grade slider
  const [studentTarget, setStudentTarget] = useState(16.0);

  // Admin mini-state: simulated collision checker
  const [adminTestDay, setAdminTestDay] = useState<'LUN' | 'MIE'>('LUN');
  const [adminTestTime, setAdminTestTime] = useState<'08:00' | '14:00'>('08:00');

  if (!isOpen) return null;

  // Teacher weighted calculation
  const teacherAvg = (
    teacherGrades.sofiaPC1 * 0.2 +
    teacherGrades.sofiaPC2 * 0.2 +
    teacherGrades.sofiaEP * 0.25 +
    teacherGrades.sofiaEF * 0.35
  ).toFixed(2);

  // Student required EF calculation
  // current sum = 18*0.2 + 17*0.2 + 16*0.25 = 3.6 + 3.4 + 4.0 = 11.0 (65% weight)
  // needed for target: (target - 11.0) / 0.35
  const currentAccumulated = 18.0 * 0.2 + 17.0 * 0.2 + 16.0 * 0.25;
  const neededEF = Math.max(0, Number(((studentTarget - currentAccumulated) / 0.35).toFixed(2)));
  const isStudentGoalPossible = neededEF <= 20.0;

  // Admin collision calculation
  const hasConflict = adminTestDay === 'LUN' && adminTestTime === '08:00';

  const handleLaunchRole = (role: Role) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    onSelectRole(role);
    onClose();
  };

  return (
    <div
      id="live-demo-modal-overlay"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="live-demo-modal-container"
        className="bg-[#0A0A0A] rounded-3xl border border-[#C5A059]/40 shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto"
      >
        {/* Modal Top Header */}
        <div className="px-6 py-5 border-b border-[#262626] flex items-center justify-between bg-[#121212]/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14120A] border border-[#C5A059]/40 flex items-center justify-center text-[#E6CA85] shadow-md">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                  {t.liveDemoModalTitle}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#E6CA85] font-mono-code text-[10px] font-bold">
                  {language === 'es' ? 'Interactivo' : 'Interactive'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                {t.liveDemoModalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-[#1a1a1a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Case Tabs */}
        <div className="px-6 pt-4 pb-2 border-b border-[#262626] bg-[#070707] grid grid-cols-3 gap-2 sm:gap-3">
          <button
            onClick={() => setActiveCase('TEACHER')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              activeCase === 'TEACHER'
                ? 'bg-[#14120A] border-[#C5A059] text-white shadow-md'
                : 'bg-[#101010] border-[#262626] text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeCase === 'TEACHER' ? 'bg-[#C5A059] text-black font-bold' : 'bg-[#1a1a1a] text-neutral-400'}`}>
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono-code uppercase font-bold text-[#E6CA85] block">
                {t.caseTeacher.split(':')[0]}
              </span>
              <p className="font-display font-bold text-xs sm:text-sm truncate">
                {language === 'es' ? 'Docente / Profesor' : 'Faculty / Professor'}
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveCase('STUDENT')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              activeCase === 'STUDENT'
                ? 'bg-emerald-950/30 border-emerald-500 text-white shadow-md'
                : 'bg-[#101010] border-[#262626] text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeCase === 'STUDENT' ? 'bg-emerald-500 text-black font-bold' : 'bg-[#1a1a1a] text-neutral-400'}`}>
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono-code uppercase font-bold text-emerald-400 block">
                {t.caseStudent.split(':')[0]}
              </span>
              <p className="font-display font-bold text-xs sm:text-sm truncate">
                {language === 'es' ? 'Estudiante' : 'Student'}
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveCase('ADMIN')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              activeCase === 'ADMIN'
                ? 'bg-sky-950/30 border-sky-500 text-white shadow-md'
                : 'bg-[#101010] border-[#262626] text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeCase === 'ADMIN' ? 'bg-sky-500 text-black font-bold' : 'bg-[#1a1a1a] text-neutral-400'}`}>
              <Layers className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono-code uppercase font-bold text-sky-400 block">
                {t.caseAdmin.split(':')[0]}
              </span>
              <p className="font-display font-bold text-xs sm:text-sm truncate">
                {language === 'es' ? 'Administrador' : 'Administrator'}
              </p>
            </div>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#0A0A0A]">
          {/* CASE 1: TEACHER SHOWCASE */}
          {activeCase === 'TEACHER' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Banner Details */}
              <div className="p-5 rounded-2xl bg-[#14120A] border border-[#C5A059]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono-code font-bold uppercase text-[#E6CA85] px-2 py-0.5 rounded bg-[#0A0A0A] border border-[#C5A059]/20">
                    {language === 'es' ? 'Perfil: Dr. Marcos Valdivia S. • Algoritmos Avanzados' : 'Profile: Dr. Marcos Valdivia S. • Advanced Algorithms'}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mt-1.5">
                    {t.caseTeacher}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-0.5 max-w-xl">
                    {t.caseTeacherSubtitle}
                  </p>
                </div>

                <button
                  onClick={() => handleLaunchRole('TEACHER')}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#C5A059]/20 transition-all cursor-pointer shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.launchThisRole}</span>
                </button>
              </div>

              {/* Interactive Mini Excel Sheet Playground */}
              <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <h4 className="font-mono-code font-bold text-xs uppercase text-white">
                      {t.interactiveGradebookTest}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono-code text-[#E6CA85]">
                    {language === 'es' ? 'Edición en vivo en escala 0 a 20' : 'Live editing on 0 - 20 scale'}
                  </span>
                </div>

                {/* Simulated Sheet Table */}
                <div className="overflow-x-auto rounded-xl border border-[#262626]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#181818] border-b border-[#262626] font-mono-code text-[11px] text-neutral-400">
                      <tr>
                        <th className="py-2.5 px-3">{t.studentName}</th>
                        <th className="py-2.5 px-3 text-center">PC1 (20%)</th>
                        <th className="py-2.5 px-3 text-center">PC2 (20%)</th>
                        <th className="py-2.5 px-3 text-center">Parcial (25%)</th>
                        <th className="py-2.5 px-3 text-center">Final (35%)</th>
                        <th className="py-2.5 px-3 text-center font-bold text-[#E6CA85]">{t.average}</th>
                        <th className="py-2.5 px-3 text-center">{t.status}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262626] bg-[#0E0E0E]">
                      <tr className="hover:bg-[#141414]">
                        <td className="py-2.5 px-3 font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#C5A059]/20 text-[#E6CA85] font-bold text-[10px] flex items-center justify-center">SV</span>
                            <span>Sofía Valenzuela Méndez</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            value={teacherGrades.sofiaPC1}
                            onChange={(e) => setTeacherGrades({ ...teacherGrades, sofiaPC1: parseFloat(e.target.value) || 0 })}
                            className="w-16 text-center font-mono-code font-bold py-1 bg-[#1a1a1a] border border-[#333] focus:border-[#C5A059] rounded text-white"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            value={teacherGrades.sofiaPC2}
                            onChange={(e) => setTeacherGrades({ ...teacherGrades, sofiaPC2: parseFloat(e.target.value) || 0 })}
                            className="w-16 text-center font-mono-code font-bold py-1 bg-[#1a1a1a] border border-[#333] focus:border-[#C5A059] rounded text-white"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            value={teacherGrades.sofiaEP}
                            onChange={(e) => setTeacherGrades({ ...teacherGrades, sofiaEP: parseFloat(e.target.value) || 0 })}
                            className="w-16 text-center font-mono-code font-bold py-1 bg-[#1a1a1a] border border-[#333] focus:border-[#C5A059] rounded text-white"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            value={teacherGrades.sofiaEF}
                            onChange={(e) => setTeacherGrades({ ...teacherGrades, sofiaEF: parseFloat(e.target.value) || 0 })}
                            className="w-16 text-center font-mono-code font-bold py-1 bg-[#1a1a1a] border border-[#333] focus:border-[#C5A059] rounded text-[#E6CA85]"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono-code font-black text-base text-[#E6CA85]">
                          {teacherAvg}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-mono-code font-bold text-[10px] ${
                            parseFloat(teacherAvg) >= 10.5
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                              : 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                          }`}>
                            {parseFloat(teacherAvg) >= 10.5 ? t.passed : t.failed}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Superpowers List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626]">
                    <span className="text-[10px] font-mono-code font-bold text-[#E6CA85] uppercase block">01. {language === 'es' ? 'Edición Rápida' : 'Quick Editing'}</span>
                    <p className="text-xs text-neutral-300 mt-0.5">{language === 'es' ? 'Navegación con teclado tipo Excel y guardado automático.' : 'Excel-like keyboard navigation and auto-save.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626]">
                    <span className="text-[10px] font-mono-code font-bold text-[#E6CA85] uppercase block">02. {language === 'es' ? 'Control de Asistencias' : 'Attendance'}</span>
                    <p className="text-xs text-neutral-300 mt-0.5">{language === 'es' ? 'Matriz de Presente, Tardanza, Justificado y Ausente.' : 'Matrix for Present, Late, Justified, and Absent.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626]">
                    <span className="text-[10px] font-mono-code font-bold text-[#E6CA85] uppercase block">03. {language === 'es' ? 'Aulas Virtuales' : 'Virtual Rooms'}</span>
                    <p className="text-xs text-neutral-300 mt-0.5">{language === 'es' ? 'Apertura de enlaces Zoom y entornos GPU en 1 clic.' : '1-Click launch of Zoom meetings and GPU compute.'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CASE 2: STUDENT SHOWCASE */}
          {activeCase === 'STUDENT' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Banner Details */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono-code font-bold uppercase text-emerald-300 px-2 py-0.5 rounded bg-[#0A0A0A] border border-emerald-500/20">
                    {language === 'es' ? 'Perfil: Sofía Valenzuela Méndez • Semestre 7° • PPA: 17.85' : 'Profile: Sofía Valenzuela Méndez • Term 7 • GPA: 17.85'}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mt-1.5">
                    {t.caseStudent}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-0.5 max-w-xl">
                    {t.caseStudentSubtitle}
                  </p>
                </div>

                <button
                  onClick={() => handleLaunchRole('STUDENT')}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.launchThisRole}</span>
                </button>
              </div>

              {/* Interactive Student Simulator Playground */}
              <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-mono-code font-bold text-xs uppercase text-white">
                      {t.interactiveSimulatorTest}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono-code text-emerald-400 font-bold">
                    {t.gpaSimulator}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0E0E0E] p-4 rounded-xl border border-[#262626] items-center">
                  <div>
                    <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-2">
                      {t.targetGpa}: <span className="text-emerald-400 font-black text-base">{studentTarget.toFixed(1)} / 20.0</span>
                    </label>
                    <input
                      type="range"
                      min="11.0"
                      max="20.0"
                      step="0.5"
                      value={studentTarget}
                      onChange={(e) => setStudentTarget(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <p className="text-[11px] text-neutral-400 mt-2">
                      {language === 'es'
                        ? 'Notas acumuladas (65%): PC1 (18.0), PC2 (17.0), Parcial (16.0).'
                        : 'Current grades (65%): Quiz 1 (18.0), Quiz 2 (17.0), Midterm (16.0).'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border text-center ${
                    isStudentGoalPossible
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  }`}>
                    <span className="text-[10px] font-mono-code font-bold uppercase block text-neutral-300">
                      {language === 'es' ? 'Nota Necesaria en Examen Final (35%):' : 'Score Needed on Final Exam (35%):'}
                    </span>
                    <div className="font-mono-code font-black text-2xl mt-1">
                      {isStudentGoalPossible ? `${neededEF} / 20.00 pts` : (language === 'es' ? 'Matemáticamente Inalcanzable' : 'Exceeds 20 pts')}
                    </div>
                    <span className="text-[10px] font-sans font-semibold mt-1 block">
                      {isStudentGoalPossible ? (language === 'es' ? '¡Meta alcanzable!' : 'Goal reachable!') : (language === 'es' ? 'Ajusta tu meta a una nota menor' : 'Adjust target grade')}
                    </span>
                  </div>
                </div>

                {/* Superpowers List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626]">
                    <span className="text-[10px] font-mono-code font-bold text-emerald-400 uppercase block">01. {language === 'es' ? 'Avance Curricular' : 'Credit Progress'}</span>
                    <p className="text-xs text-neutral-300 mt-0.5">{language === 'es' ? '142 de 210 créditos completados con Cuadro de Honor Top 3%.' : '142 of 210 credits completed with Top 3% Honor Roll.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626]">
                    <span className="text-[10px] font-mono-code font-bold text-emerald-400 uppercase block">02. {language === 'es' ? 'Horario Dinámico' : 'Live Schedule'}</span>
                    <p className="text-xs text-neutral-300 mt-0.5">{language === 'es' ? 'Acceso directo a las salas de clase de lunes a viernes.' : 'Direct classroom join links from Monday to Friday.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626]">
                    <span className="text-[10px] font-mono-code font-bold text-emerald-400 uppercase block">03. {language === 'es' ? 'Rúbricas & Feedback' : 'Feedback'}</span>
                    <p className="text-xs text-neutral-300 mt-0.5">{language === 'es' ? 'Observaciones detalladas de los docentes en cada evaluación.' : 'Detailed feedback from faculty on every assessment.'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CASE 3: ADMIN SHOWCASE */}
          {activeCase === 'ADMIN' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Banner Details */}
              <div className="p-5 rounded-2xl bg-sky-950/20 border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono-code font-bold uppercase text-sky-300 px-2 py-0.5 rounded bg-[#0A0A0A] border border-sky-500/20">
                    {language === 'es' ? 'Perfil: Ing. Elena Rostova • Dirección Académica & Sistemas' : 'Profile: Eng. Elena Rostova • Academic Directorate & IT'}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mt-1.5">
                    {t.caseAdmin}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-0.5 max-w-xl">
                    {t.caseAdminSubtitle}
                  </p>
                </div>

                <button
                  onClick={() => handleLaunchRole('ADMIN')}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.launchThisRole}</span>
                </button>
              </div>

              {/* Interactive Admin Conflict Detector Playground */}
              <div className="p-5 rounded-2xl bg-[#121212] border border-[#262626] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-sky-400" />
                    <h4 className="font-mono-code font-bold text-xs uppercase text-white">
                      {t.interactiveResourceTest}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono-code text-sky-400 font-bold">
                    {language === 'es' ? 'Motor de Asignación Cloud' : 'Cloud Resource Allocator'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0E0E0E] p-4 rounded-xl border border-[#262626]">
                  <div>
                    <span className="text-[11px] font-mono-code font-bold uppercase text-neutral-300 block mb-2">
                      {language === 'es' ? 'Simular Reserva en Laboratorio GPU (LAB-GPU-01):' : 'Simulate Booking on GPU Lab (LAB-GPU-01):'}
                    </span>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAdminTestDay('LUN')}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono-code font-bold cursor-pointer ${
                            adminTestDay === 'LUN' ? 'bg-[#C5A059] text-black' : 'bg-[#1a1a1a] text-neutral-300'
                          }`}
                        >
                          Lunes (LUN)
                        </button>
                        <button
                          onClick={() => setAdminTestDay('MIE')}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono-code font-bold cursor-pointer ${
                            adminTestDay === 'MIE' ? 'bg-[#C5A059] text-black' : 'bg-[#1a1a1a] text-neutral-300'
                          }`}
                        >
                          Miércoles (MIE)
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setAdminTestTime('08:00')}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono-code font-bold cursor-pointer ${
                            adminTestTime === '08:00' ? 'bg-[#C5A059] text-black' : 'bg-[#1a1a1a] text-neutral-300'
                          }`}
                        >
                          08:00 - 10:30 (Ocupado LUN)
                        </button>
                        <button
                          onClick={() => setAdminTestTime('14:00')}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono-code font-bold cursor-pointer ${
                            adminTestTime === '14:00' ? 'bg-[#C5A059] text-black' : 'bg-[#1a1a1a] text-neutral-300'
                          }`}
                        >
                          14:00 - 16:30 (Libre)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border flex flex-col justify-center text-center ${
                    hasConflict
                      ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                      : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  }`}>
                    <div className="flex items-center justify-center gap-1.5 font-mono-code font-bold text-sm">
                      {hasConflict ? <AlertTriangle className="w-4 h-4 text-rose-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      <span>{hasConflict ? (language === 'es' ? '¡Conflicto Horario Detectado!' : 'Schedule Conflict Detected!') : (language === 'es' ? 'Horario Disponible y Validado' : 'Time Slot Validated & Free')}</span>
                    </div>
                    <p className="text-xs text-neutral-300 mt-1">
                      {hasConflict
                        ? (language === 'es' ? 'La sala ya está ocupada por Algoritmos Avanzados (Dr. Valdivia).' : 'Room already booked by Advanced Algorithms (Dr. Valdivia).')
                        : (language === 'es' ? 'Espacio libre para asignación sin colisiones institucionales.' : 'Slot ready for instant booking with zero collisions.')}
                    </p>
                  </div>
                </div>

                {/* Superpowers List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626]">
                    <span className="text-[10px] font-mono-code font-bold text-sky-400 uppercase block">01. {t.kpiRetentionRate}</span>
                    <p className="text-xs text-neutral-300 mt-0.5">{language === 'es' ? '98.4% de retención con auditoría en tiempo real.' : '98.4% retention with live institutional audit.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626]">
                    <span className="text-[10px] font-mono-code font-bold text-sky-400 uppercase block">02. {language === 'es' ? 'Gestión de Carreras' : 'Degree Programs'}</span>
                    <p className="text-xs text-neutral-300 mt-0.5">{language === 'es' ? 'Supervisión de planes de estudio, directores y créditos.' : 'Oversight of study plans, directors, and credits.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626]">
                    <span className="text-[10px] font-mono-code font-bold text-sky-400 uppercase block">03. {language === 'es' ? 'Actas Oficiales' : 'Official Transcripts'}</span>
                    <p className="text-xs text-neutral-300 mt-0.5">{language === 'es' ? 'Exportación consolidada de actas de fin de ciclo.' : 'Consolidated export of final grade certificates.'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3-in-1 Side-by-Side Live Summary Matrix */}
          <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-[#262626] space-y-3">
            <h4 className="font-display font-bold text-xs uppercase text-white tracking-wider">
              {t.allRolesComparison}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#141414] border-b border-[#262626] font-mono-code text-[10px] text-neutral-400 uppercase">
                  <tr>
                    <th className="py-2 px-3">{language === 'es' ? 'Módulo / Capacidad' : 'Module / Capability'}</th>
                    <th className="py-2 px-3 text-[#E6CA85]">{t.teacher}</th>
                    <th className="py-2 px-3 text-emerald-400">{t.student}</th>
                    <th className="py-2 px-3 text-sky-400">{t.admin}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626] text-neutral-300">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">{language === 'es' ? 'Libro de Calificaciones' : 'Gradebook'}</td>
                    <td className="py-2.5 px-3 text-[#E6CA85] font-semibold">{language === 'es' ? 'Edición en celda tipo Excel' : 'In-cell Excel editing'}</td>
                    <td className="py-2.5 px-3 text-emerald-300">{language === 'es' ? 'Consulta & Simulador PPA' : 'View & GPA Simulator'}</td>
                    <td className="py-2.5 px-3 text-sky-300">{language === 'es' ? 'Auditoría y Actas Oficiales' : 'Audit & Transcripts'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">{language === 'es' ? 'Control de Asistencias' : 'Attendance Tracking'}</td>
                    <td className="py-2.5 px-3 text-[#E6CA85] font-semibold">{language === 'es' ? 'Registro por estados (P/T/J/A)' : 'State entry (P/L/J/A)'}</td>
                    <td className="py-2.5 px-3 text-emerald-300">{language === 'es' ? 'Monitoreo de inasistencias' : 'Absence monitoring'}</td>
                    <td className="py-2.5 px-3 text-sky-300">{language === 'es' ? 'Tasa de retención institucional' : 'Institutional retention rate'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">{language === 'es' ? 'Aulas Virtuales & GPU' : 'Virtual Rooms & GPU'}</td>
                    <td className="py-2.5 px-3 text-[#E6CA85] font-semibold">{language === 'es' ? 'Lanzamiento y Host directo' : 'Direct Host Launch'}</td>
                    <td className="py-2.5 px-3 text-emerald-300">{language === 'es' ? 'Ingreso con 1 clic' : '1-Click Join'}</td>
                    <td className="py-2.5 px-3 text-sky-300">{language === 'es' ? 'Asignación & Detección conflictos' : 'Allocation & Conflict checks'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Action Bar */}
        <div className="px-6 py-4 border-t border-[#262626] bg-[#070707] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono-code">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{t.demoEvaluatorNotice}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-[#141414] transition-colors cursor-pointer"
            >
              {t.close}
            </button>
            <button
              onClick={() => handleLaunchRole(activeCase)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black font-bold text-xs flex items-center gap-2 shadow-md shadow-[#C5A059]/20 transition-all cursor-pointer"
            >
              <span>{t.launchThisRole}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
