import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Role } from '../../types/academic';
import {
  X,
  LogIn,
  BarChart3,
  GraduationCap,
  Layers,
  ArrowRight,
  Shield,
  KeyRound,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: Role) => void;
  onOpenCredentialLogin?: (role: Role) => void;
}

export const QuickSignInModal: React.FC<QuickSignInModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
  onOpenCredentialLogin,
}) => {
  const { language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRoleClick = (role: Role) => {
    onClose();
    if (onOpenCredentialLogin) {
      onOpenCredentialLogin(role);
    }
  };

  const handleCredentialsClick = (e: React.MouseEvent, role: Role) => {
    e.stopPropagation();
    handleRoleClick(role);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#0A0A0A] border border-[#262626] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative px-6 py-5 border-b border-[#262626] bg-[#0E0E0E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center">
              <LogIn className="w-5 h-5 text-[#E6CA85]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg text-white">
                  {language === 'es' ? 'Iniciar Sesión' : 'Sign In'}
                </h2>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#E6CA85] border border-[#C5A059]/30">
                  {language === 'es' ? 'SELECCIÓN DE ROL' : 'ROLE SELECTION'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                {language === 'es'
                  ? 'Elige cómo deseas ingresar al sistema Uniperium LMS'
                  : 'Choose how you want to sign in to Uniperium LMS'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-[#1A1A1A] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 3 Interactive Role Options */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="text-xs font-mono-code text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span>
              {language === 'es'
                ? 'Selecciona tu tipo de acceso institucional:'
                : 'Select your institutional access type:'}
            </span>
          </div>

          {/* 1. PROFESOR / DOCENTE */}
          <div
            id="role-select-teacher"
            onClick={() => handleRoleClick('TEACHER')}
            className="group relative p-4 sm:p-5 rounded-2xl bg-[#12110C] border border-[#C5A059]/30 hover:border-[#C5A059] hover:bg-[#1A1710] transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[#C5A059]/10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-6 h-6 text-[#E6CA85]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#E6CA85] transition-colors">
                      {language === 'es' ? 'Profesor' : 'Faculty / Professor'}
                    </h3>
                    <span className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded bg-[#C5A059]/20 text-[#E6CA85] border border-[#C5A059]/30">
                      {language === 'es' ? 'DOCENTE' : 'TEACHER'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {language === 'es'
                      ? 'Libro de calificaciones tipo Excel, matriz de asistencia y apertura de aulas virtuales.'
                      : 'Excel-style gradebook, attendance matrix, and virtual classroom launcher.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoleClick('TEACHER');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] group-hover:from-[#E6CA85] group-hover:to-[#C5A059] text-black font-bold text-xs flex items-center gap-2 shadow-md shadow-[#C5A059]/20 transition-all cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Ingresar' : 'Sign In'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. ALUMNO / ESTUDIANTE */}
          <div
            id="role-select-student"
            onClick={() => handleRoleClick('STUDENT')}
            className="group relative p-4 sm:p-5 rounded-2xl bg-[#091510] border border-emerald-500/30 hover:border-emerald-400 hover:bg-[#0C1E16] transition-all duration-200 cursor-pointer shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-emerald-300 transition-colors">
                      {language === 'es' ? 'Alumno' : 'Student'}
                    </h3>
                    <span className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {language === 'es' ? 'ESTUDIANTE' : 'STUDENT'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {language === 'es'
                      ? 'Portal académico, simulador de notas para aprobar, registro de faltas y horario.'
                      : 'Student portal, predictive grade simulator, attendance tracking, and schedules.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoleClick('STUDENT');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 group-hover:from-emerald-400 group-hover:to-emerald-500 text-black font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Ingresar' : 'Sign In'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. ADMINISTRADOR */}
          <div
            id="role-select-admin"
            onClick={() => handleRoleClick('ADMIN')}
            className="group relative p-4 sm:p-5 rounded-2xl bg-[#09111A] border border-sky-500/30 hover:border-sky-400 hover:bg-[#0D1927] transition-all duration-200 cursor-pointer shadow-lg hover:shadow-sky-500/10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Layers className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-sky-300 transition-colors">
                      {language === 'es' ? 'Administrador' : 'Administrator'}
                    </h3>
                    <span className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      {language === 'es' ? 'ADMINISTRADOR' : 'ADMIN'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {language === 'es'
                      ? 'Supervisión institucional, asignación de salas y clusters GPU, y gestión de mallas.'
                      : 'Institutional oversight, GPU lab allocation, conflict detector, and degree curricula.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoleClick('ADMIN');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 group-hover:from-sky-400 group-hover:to-sky-500 text-black font-bold text-xs flex items-center gap-2 shadow-md shadow-sky-500/20 transition-all cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Ingresar' : 'Sign In'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0E0E0E] border-t border-[#262626] flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[11px] font-sans">
              {language === 'es'
                ? 'Acceso seguro con privilegios de rol (RBAC)'
                : 'Role-Based Access Control (RBAC) active'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1A1A1A] transition-colors cursor-pointer text-xs font-medium"
          >
            {language === 'es' ? 'Cancelar' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};
