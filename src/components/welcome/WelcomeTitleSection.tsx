import React from 'react';
import { Sparkles } from 'lucide-react';

interface WelcomeTitleSectionProps {
  t: Record<string, string>;
}

export const WelcomeTitleSection: React.FC<WelcomeTitleSectionProps> = ({ t }) => {
  return (
    <div className="text-center max-w-4xl mx-auto mb-8">
      {/* Badge Eyebrow */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121212] border border-[#C5A059]/30 text-[#E6CA85] text-xs font-semibold tracking-wider uppercase mb-4 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        <span className="font-luxury tracking-widest text-[11px]">{t.welcomeBadge}</span>
      </div>

      {/* Mixed Display Headings */}
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
        <span className="font-luxury font-medium text-neutral-300 block text-xl sm:text-2xl tracking-wider mb-2">
          {t.welcomeTitle1}
        </span>
        <span className="font-display font-black tracking-tight gold-gradient-text">
          {t.welcomeTitle2}
        </span>
      </h1>

      <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-sans max-w-2xl mx-auto leading-relaxed">
        {t.welcomeSubtitle}
      </p>

      {/* Quick Metrics Bar */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto">
        <div className="p-2.5 rounded-2xl bg-[#0A0A0A] border border-[#262626] backdrop-blur-sm text-center">
          <div className="font-mono-code font-bold text-base text-[#E6CA85]">1,420</div>
          <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold mt-0.5">{t.statStudents}</div>
        </div>
        <div className="p-2.5 rounded-2xl bg-[#0A0A0A] border border-[#262626] backdrop-blur-sm text-center">
          <div className="font-mono-code font-bold text-emerald-400">98.4%</div>
          <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold mt-0.5">{t.statSatisfaction}</div>
        </div>
        <div className="p-2.5 rounded-2xl bg-[#0A0A0A] border border-[#262626] backdrop-blur-sm text-center">
          <div className="font-mono-code font-bold text-sky-400">99.9%</div>
          <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold mt-0.5">{t.statUptime}</div>
        </div>
        <div className="p-2.5 rounded-2xl bg-[#0A0A0A] border border-[#262626] backdrop-blur-sm text-center">
          <div className="font-mono-code font-bold text-[#C5A059]">42</div>
          <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold mt-0.5">{t.kpiCloudEnvironments}</div>
        </div>
      </div>
    </div>
  );
};
