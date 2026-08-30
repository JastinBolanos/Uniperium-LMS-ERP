import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Role } from '../../types/academic';
import {
  X,
  User,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  BarChart3,
  GraduationCap,
  Layers,
  Lock,
  ShieldAlert,
  AlertCircle,
  HelpCircle,
  UserPlus,
  ArrowRight,
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [securityBlockMessage, setSecurityBlockMessage] = useState<string | null>(null);
  const [securityBlockType, setSecurityBlockType] = useState<'LOGIN' | 'FORGOT' | 'REGISTER' | null>(null);

  // Clear inputs whenever modal opens or role changes
  useEffect(() => {
    setUsername('');
    setPassword('');
    setShowPassword(false);
    setSecurityBlockMessage(null);
    setSecurityBlockType(null);
    setIsVerifying(false);
  }, [role, isOpen]);

  if (!isOpen || !role) return null;

  const getRoleTheme = () => {
    switch (role) {
      case 'TEACHER':
        return {
          title: t.teacherLoginTitle,
          idLabel: t.teacherIdLabel,
          passLabel: t.teacherPasswordLabel,
          badgeCode: 'DOC-9042',
          icon: <BarChart3 className="w-5 h-5 text-[#C5A059]" />,
          colorClass: 'text-[#E6CA85]',
          bgClass: 'bg-[#C5A059]/10 border-[#C5A059]/30',
          borderColor: 'border-[#C5A059]/40',
          demoBtnText: t.notTeacherDemoBtn,
          demoGradient: 'bg-gradient-to-r from-[#C5A059] via-[#E6CA85] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black shadow-lg shadow-[#C5A059]/25 hover:scale-[1.02] active:scale-[0.99]',
          demoBadge: 'DOCENTE EN DEMOSTRACIÓN',
          confettiColors: ['#C5A059', '#E6CA85', '#FFF8E7', '#9A7B39', '#F59E0B'],
        };
      case 'STUDENT':
        return {
          title: t.studentLoginTitle,
          idLabel: t.studentIdLabel,
          passLabel: t.studentPasswordLabel,
          badgeCode: 'EST-2022-8491',
          icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
          colorClass: 'text-emerald-300',
          bgClass: 'bg-emerald-950/40 border-emerald-500/30',
          borderColor: 'border-emerald-500/40',
          demoBtnText: t.notStudentDemoBtn,
          demoGradient: 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 hover:from-emerald-400 hover:to-emerald-500 text-black shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.99]',
          demoBadge: 'ESTUDIANTE EN DEMOSTRACIÓN',
          confettiColors: ['#10B981', '#34D399', '#6EE7B7', '#059669', '#A7F3D0'],
        };
      case 'ADMIN':
        return {
          title: t.adminLoginTitle,
          idLabel: t.adminIdLabel,
          passLabel: t.adminPasswordLabel,
          badgeCode: 'ADM-ROOT',
          icon: <Layers className="w-5 h-5 text-sky-400" />,
          colorClass: 'text-sky-300',
          bgClass: 'bg-sky-950/40 border-sky-500/30',
          borderColor: 'border-sky-500/40',
          demoBtnText: t.notAdminDemoBtn,
          demoGradient: 'bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-500 hover:from-sky-400 hover:to-sky-500 text-black shadow-lg shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.99]',
          demoBadge: 'ADMINISTRADOR EN DEMOSTRACIÓN',
          confettiColors: ['#0EA5E9', '#38BDF8', '#7DD3FC', '#0284C7', '#BAE6FD'],
        };
    }
  };

  const theme = getRoleTheme();

  // Handle attempt to log in with arbitrary credentials -> ALWAYS strictly blocks with institutional security error
  const handleAttemptLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setSecurityBlockMessage(null);
    setSecurityBlockType('LOGIN');

    setTimeout(() => {
      setIsVerifying(false);
      setSecurityBlockMessage(t.authBlockedDesc);
    }, 450);
  };

  // Handle forgot password attempt -> strictly blocks with security message
  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setSecurityBlockType('FORGOT');
    setSecurityBlockMessage(t.forgotPasswordBlockedDesc);
  };

  // Handle registration attempt -> strictly blocks with security message
  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    setSecurityBlockType('REGISTER');
    setSecurityBlockMessage(t.registerBlockedDesc);
  };

  // The ONLY authorized way to enter the home: Demo mode access button
  const handleEnterAsDemo = () => {
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.65 },
      colors: theme.confettiColors,
    });
    onLoginSuccess(role);
    onClose();
  };

  return (
    <div
      id="role-login-modal-overlay"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150"
    >
      <div
        id="role-login-modal-container"
        className={`bg-[#0A0A0A] rounded-3xl border ${theme.borderColor} shadow-2xl max-w-md w-full overflow-hidden my-auto border-t-2`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#262626] flex items-center justify-between bg-[#111111]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${theme.bgClass}`}>
              {theme.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-base text-white">
                  {theme.title}
                </h2>
                <span className={`px-2 py-0.5 rounded font-mono-code text-[10px] font-bold ${theme.bgClass} ${theme.colorClass}`}>
                  {theme.badgeCode}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                {t.signInPrompt}
              </p>
            </div>
          </div>

          <button
            id="close-login-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1f1f1f] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 space-y-4">
          {/* Security Alert Banner when login / forgot / register is attempted */}
          {securityBlockMessage && (
            <div
              id="security-blocked-alert"
              className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/50 text-rose-200 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-white">
                      {t.authBlockedTitle}
                    </h4>
                    <span className="text-[9px] font-mono-code bg-rose-900/60 px-1.5 py-0.2 rounded text-rose-300 border border-rose-700/50">
                      ERR-SEC-AUTH-01
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-300 mt-1 leading-relaxed">
                    {securityBlockMessage}
                  </p>
                  <div className="mt-2 pt-2 border-t border-rose-800/40 text-[10px] text-rose-200 font-semibold flex items-center gap-1">
                    <span>👉</span>
                    <span>{language === 'es' ? 'Pulsa el botón de demostración inferior para acceder sin credenciales.' : 'Press the demo button below to enter without credentials.'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Institutional Credentials Inputs */}
          <form onSubmit={handleAttemptLogin} className="space-y-3.5">
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
                placeholder={language === 'es' ? 'ejemplo@uniperium.edu.pe' : 'user@uniperium.edu'}
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
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3 text-[#C5A059]" />}
                  <span>{showPassword ? t.hideCredentialsToggle : t.showCredentialsToggle}</span>
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121212] border border-[#2a2a2a] text-white text-xs font-mono-code focus:outline-none focus:border-[#C5A059] transition-colors"
                />
                <Lock className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-0.5 text-xs">
              <label className="flex items-center gap-2 text-neutral-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-[#1a1a1a] border-[#333] accent-[#C5A059]"
                />
                <span className="text-[11px]">{t.rememberCredentials}</span>
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[11px] font-sans text-neutral-400 hover:text-[#E6CA85] hover:underline cursor-pointer"
              >
                {t.forgotPassword}
              </button>
            </div>

            {/* Standard Submit Button (Triggers realistic security lock validation) */}
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-2.5 px-4 rounded-xl bg-[#181818] hover:bg-[#222222] border border-[#333] text-neutral-200 font-mono-code font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isVerifying ? (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[11px] text-[#E6CA85]">
                    {language === 'es' ? 'Autenticando en Directorio Activo...' : 'Authenticating LDAP Server...'}
                  </span>
                </div>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{t.tryCredentialsBtn}</span>
                </>
              )}
            </button>

            {/* Request Account / Register Link */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={handleRegister}
                className="text-[11px] text-neutral-500 hover:text-neutral-300 inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <UserPlus className="w-3 h-3" />
                <span>{t.registerAccount}</span>
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#262626]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0A0A0A] px-3 font-mono-code text-[10px] font-bold text-[#C5A059] tracking-widest">
                {language === 'es' ? 'ACCESO EXCLUSIVO EN DEMOSTRACIÓN' : 'EXCLUSIVE DEMO ACCESS'}
              </span>
            </div>
          </div>

          {/* THE ONLY WORKING ACCESS BUTTON: DEMO BUTTON */}
          <div className="space-y-2">
            <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
              {t.demoAccessNotice}
            </p>

            <button
              id={`enter-demo-btn-${role.toLowerCase()}`}
              type="button"
              onClick={handleEnterAsDemo}
              className={`w-full py-3.5 px-5 rounded-2xl font-display font-extrabold text-xs tracking-wide flex items-center justify-center gap-2.5 transition-all cursor-pointer ${theme.demoGradient}`}
            >
              <Sparkles className="w-4 h-4 shrink-0 text-black fill-current animate-spin" style={{ animationDuration: '4s' }} />
              <span className="leading-snug text-center">
                {theme.demoBtnText}
              </span>
              <ArrowRight className="w-4 h-4 shrink-0 text-black ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
