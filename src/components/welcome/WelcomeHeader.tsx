import React from 'react';
import { LogIn, ArrowRight } from 'lucide-react';
import { LanguageToggle } from '../../context/LanguageContext';

interface WelcomeHeaderProps {
  onEnter: () => void;
  t: Record<string, string>;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ onEnter, t }) => {
  return (
    <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-[#262626] backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E6CA85] via-[#C5A059] to-[#9A7B39] p-0.5 shadow-lg shadow-[#C5A059]/15 flex items-center justify-center">
          <div className="w-full h-full bg-[#0A0A0A] rounded-[10px] flex items-center justify-center">
            <span className="font-luxury font-black text-2xl tracking-tighter text-[#E6CA85]">
              U
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xl tracking-tight text-white">
              UNIPERIUM
            </span>
            <span className="font-mono-code text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#E6CA85] border border-[#C5A059]/30">
              {t.brandTag}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 font-sans tracking-wide">
            {t.welcomeBadge}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Language Switcher */}
        <LanguageToggle variant="header" />

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#262626] text-xs text-neutral-300 font-mono-code">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span>{t.semesterPeriod}</span>
        </div>

        <button
          id="welcome-direct-enter-btn"
          onClick={onEnter}
          className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black font-bold text-xs transition-all shadow-md shadow-[#C5A059]/20 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>{t.enterPlatform}</span>
          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>
    </header>
  );
};
