import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAcademic } from '../../context/AcademicContext';
import { Role } from '../../types/academic';
import {
  X,
  User,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  BarChart3,
  GraduationCap,
  Layers,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RoleLoginModalProps {
  isOpen: boolean;
  role: Role | null;
  onClose: () => void;
  onLoginSuccess: (role: Role) => void;
}

export const RoleLoginModal: React.FC<RoleLoginModalProps> = ({
  isOpen,
  role,
  onClose,
  onLoginSuccess,
}) => {
  const { t, language } = useLanguage();
  const { allDemoUsers } = useAcademic();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Preload default credentials when role opens
  useEffect(() => {
    if (!role) return;
    if (role === 'TEACHER') {
      setUsername('m.valdivia@uniperium.edu.pe');
      setPassword('Valdivia2026!#');
    } else if (role === 'STUDENT') {
      setUsername('EST-2022-8491');
      setPassword('SofiaVal2026*');
    } else {
      setUsername('ADM-ROSTOVA-001');
      setPassword('RostovaRoot2026$');
    }
    setShowPassword(false);
  }, [role]);

  if (!isOpen || !role) return null;

  const currentRoleUser = allDemoUsers[role];

  const getRoleTheme = () => {
    switch (role) {
      case 'TEACHER':
        return {
          title: t.teacherLoginTitle,
          idLabel: t.teacherIdLabel,
          passLabel: t.teacherPasswordLabel,
          authBadge: t.teacherAuthMethod,
          badgeCode: 'DOC-9042',
          icon: <BarChart3 className="w-5 h-5 text-[#C5A059]" />,
          colorClass: 'text-[#E6CA85]',
          bgClass: 'bg-[#C5A059]/10 border-[#C5A059]/30',
          btnGradient: 'bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black shadow-[#C5A059]/20',
          borderColor: 'border-[#C5A059]/40',
        };
      case 'STUDENT':
        return {
          title: t.studentLoginTitle,
          idLabel: t.studentIdLabel,
          passLabel: t.studentPasswordLabel,
          authBadge: t.studentAuthMethod,
          badgeCode: 'EST-2022-8491',
          icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
          colorClass: 'text-emerald-300',
          bgClass: 'bg-emerald-950/40 border-emerald-500/30',
          btnGradient: 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20',
          borderColor: 'border-emerald-500/40',
        };
      case 'ADMIN':
        return {
          title: t.adminLoginTitle,
          idLabel: t.adminIdLabel,
          passLabel: t.adminPasswordLabel,
          authBadge: t.adminAuthMethod,
          badgeCode: 'ADM-ROOT',
          icon: <Layers className="w-5 h-5 text-sky-400" />,
          colorClass: 'text-sky-300',
          bgClass: 'bg-sky-950/40 border-sky-500/30',
          btnGradient: 'bg-sky-500 hover:bg-sky-400 text-black shadow-sky-500/20',
          borderColor: 'border-sky-500/40',
        };
    }
  };

  const theme = getRoleTheme();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
      onLoginSuccess(role);
      onClose();
    }, 350);
  };

  return (
    <div
      id="role-login-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
    >
      <div
        id="role-login-modal-container"
        className={`bg-[#0A0A0A] rounded-3xl border ${theme.borderColor} shadow-2xl max-w-md w-full overflow-hidden my-auto`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#262626] flex items-center justify-between bg-[#111]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${theme.bgClass}`}>
              {theme.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-base text-white">
                  {t.signIn}
                </h2>
                <span className={`px-2 py-0.5 rounded font-mono-code text-[10px] font-bold ${theme.bgClass} ${theme.colorClass}`}>
                  {theme.badgeCode}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans">
                {currentRoleUser.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1f1f1f] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
          <div className="p-3 rounded-xl bg-[#141414] border border-[#262626] text-xs text-neutral-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-sans text-[11px]">{theme.authBadge}</span>
            </div>
            <span className="font-mono-code text-[10px] text-neutral-400">
              {t.verifiedOfficialAccount}
            </span>
          </div>

          <div>
            <label className="block text-xs font-mono-code font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-neutral-400" />
              <span>{theme.idLabel}</span>
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-[#2a2a2a] text-white text-xs font-mono-code focus:outline-none focus:border-[#C5A059] transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono-code font-semibold text-neutral-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-neutral-400" />
                <span>{theme.passLabel}</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] text-neutral-400 hover:text-[#E6CA85] flex items-center gap-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showPassword ? t.hideCredentialsToggle : t.showCredentialsToggle}</span>
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-[#2a2a2a] text-white text-xs font-mono-code focus:outline-none focus:border-[#C5A059] transition-colors"
              />
              <Lock className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-[#1a1a1a] border-[#333] accent-[#C5A059]"
              />
              <span className="text-[11px]">{t.rememberCredentials}</span>
            </label>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${theme.btnGradient}`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{t.signIn}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                onLoginSuccess(role);
                onClose();
              }}
              className="w-full py-2 px-3 rounded-lg text-neutral-400 hover:text-white font-mono-code text-[11px] hover:bg-[#141414] transition-colors cursor-pointer"
            >
              {t.quick1Click}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
