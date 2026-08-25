import React from 'react';
import { Role, UserProfile } from '../../types/academic';
import {
  BarChart3,
  GraduationCap,
  Layers,
  CheckCircle,
  LogIn,
  KeyRound,
  ArrowRight,
} from 'lucide-react';

interface RolePortalCardsProps {
  allDemoUsers: Record<Role, UserProfile>;
  onDirectEnter: (role: Role) => void;
  onOpenLoginModal: (role: Role, e?: React.MouseEvent) => void;
  t: Record<string, string>;
}

export const RolePortalCards: React.FC<RolePortalCardsProps> = ({
  allDemoUsers,
  onDirectEnter,
  onOpenLoginModal,
  t,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto w-full">
      {/* Card 1: Profesor (Teacher) */}
      <div
        id="role-card-teacher"
        className="group relative rounded-3xl bg-[#0A0A0A] border border-[#C5A059]/30 hover:border-[#C5A059] p-6 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-[#C5A059]/10 flex flex-col justify-between"
      >
        <div>
          {/* Header Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-[#14120A] border border-[#C5A059]/40 flex items-center justify-center text-[#E6CA85] group-hover:scale-105 transition-transform shadow-md">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono-code font-bold uppercase px-2.5 py-1 rounded-full bg-[#C5A059]/15 text-[#E6CA85] border border-[#C5A059]/30">
              {t.teacher}
            </span>
          </div>

          {/* Title & Persona */}
          <div className="mb-4">
            <h3 className="font-display text-xl font-bold text-white group-hover:text-[#E6CA85] transition-colors">
              {t.teacher}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <p className="text-xs font-mono-code text-[#C5A059] font-semibold">
                {allDemoUsers.TEACHER.name}
              </p>
              <span className="text-[10px] font-mono-code text-neutral-500">• DOC-9042</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed mt-2">
              {t.teacherDesc}
            </p>
          </div>

          {/* Discrete Capabilities List */}
          <ul className="space-y-2.5 mb-6 text-xs text-neutral-300 border-t border-[#1a1a1a] pt-4">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>{t.feature1Title}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>{t.feature3Title}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>{t.feature2Title}</span>
            </li>
          </ul>
        </div>

        {/* Clear Login Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-[#1a1a1a]">
          <button
            id="enter-teacher-btn"
            onClick={() => onDirectEnter('TEACHER')}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#C5A059]/20 transition-all cursor-pointer group-hover:scale-[1.01]"
          >
            <LogIn className="w-4 h-4" />
            <span>{t.signInAsTeacher}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>

          <button
            type="button"
            onClick={(e) => onOpenLoginModal('TEACHER', e)}
            className="w-full py-2 px-3 rounded-lg text-neutral-400 hover:text-[#E6CA85] font-mono-code text-[11px] hover:bg-[#121212] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-3 h-3 text-[#C5A059]" />
            <span>{t.enterWithCredentials}</span>
          </button>
        </div>
      </div>

      {/* Card 2: Estudiante (Student) */}
      <div
        id="role-card-student"
        className="group relative rounded-3xl bg-[#0A0A0A] border border-[#262626] hover:border-emerald-500/60 p-6 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
      >
        <div>
          {/* Header Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono-code font-bold uppercase px-2.5 py-1 rounded-full bg-emerald-950/50 text-emerald-300 border border-emerald-500/30">
              {t.student}
            </span>
          </div>

          {/* Title & Persona */}
          <div className="mb-4">
            <h3 className="font-display text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
              {t.student}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <p className="text-xs font-mono-code text-emerald-400 font-semibold">
                {allDemoUsers.STUDENT.name}
              </p>
              <span className="text-[10px] font-mono-code text-neutral-500">• 2026-I</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed mt-2">
              {t.studentDesc}
            </p>
          </div>

          {/* Discrete Capabilities List */}
          <ul className="space-y-2.5 mb-6 text-xs text-neutral-300 border-t border-[#1a1a1a] pt-4">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{t.studentGpa} (PPA / GPA)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{t.gpaSimulator}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{t.weeklyScheduleTitle}</span>
            </li>
          </ul>
        </div>

        {/* Clear Login Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-[#1a1a1a]">
          <button
            id="enter-student-btn"
            onClick={() => onDirectEnter('STUDENT')}
            className="w-full py-3 px-4 rounded-xl bg-[#141414] hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 border border-[#262626] transition-all cursor-pointer group-hover:shadow-lg group-hover:shadow-emerald-600/20 group-hover:scale-[1.01]"
          >
            <LogIn className="w-4 h-4" />
            <span>{t.signInAsStudent}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>

          <button
            type="button"
            onClick={(e) => onOpenLoginModal('STUDENT', e)}
            className="w-full py-2 px-3 rounded-lg text-neutral-400 hover:text-emerald-300 font-mono-code text-[11px] hover:bg-[#121212] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-3 h-3 text-emerald-400" />
            <span>{t.enterWithCredentials}</span>
          </button>
        </div>
      </div>

      {/* Card 3: Administrador (Admin) */}
      <div
        id="role-card-admin"
        className="group relative rounded-3xl bg-[#0A0A0A] border border-[#262626] hover:border-sky-500/60 p-6 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col justify-between"
      >
        <div>
          {/* Header Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-sky-950/30 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono-code font-bold uppercase px-2.5 py-1 rounded-full bg-sky-950/50 text-sky-300 border border-sky-500/30">
              {t.admin}
            </span>
          </div>

          {/* Title & Persona */}
          <div className="mb-4">
            <h3 className="font-display text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
              {t.admin}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <p className="text-xs font-mono-code text-sky-400 font-semibold">
                {allDemoUsers.ADMIN.name}
              </p>
              <span className="text-[10px] font-mono-code text-neutral-500">• ROOT</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed mt-2">
              {t.adminDesc}
            </p>
          </div>

          {/* Discrete Capabilities List */}
          <ul className="space-y-2.5 mb-6 text-xs text-neutral-300 border-t border-[#1a1a1a] pt-4">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{t.digitalInfrastructureMgmt}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{t.kpiRetentionRate}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{t.accreditedPrograms}</span>
            </li>
          </ul>
        </div>

        {/* Clear Login Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-[#1a1a1a]">
          <button
            id="enter-admin-btn"
            onClick={() => onDirectEnter('ADMIN')}
            className="w-full py-3 px-4 rounded-xl bg-[#141414] hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 border border-[#262626] transition-all cursor-pointer group-hover:shadow-lg group-hover:shadow-sky-600/20 group-hover:scale-[1.01]"
          >
            <LogIn className="w-4 h-4" />
            <span>{t.signInAsAdmin}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>

          <button
            type="button"
            onClick={(e) => onOpenLoginModal('ADMIN', e)}
            className="w-full py-2 px-3 rounded-lg text-neutral-400 hover:text-sky-300 font-mono-code text-[11px] hover:bg-[#121212] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-3 h-3 text-sky-400" />
            <span>{t.enterWithCredentials}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
