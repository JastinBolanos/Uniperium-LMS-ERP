import React from 'react';
import { Play, Sparkles, CheckCircle } from 'lucide-react';

interface LiveDemoShowcaseBannerProps {
  onOpenLiveDemo: () => void;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const LiveDemoShowcaseBanner: React.FC<LiveDemoShowcaseBannerProps> = ({
  onOpenLiveDemo,
  language,
  t,
}) => {
  return (
    <div className="mt-10 max-w-4xl mx-auto w-full">
      <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#18140D] via-[#0E0E0E] to-[#0A0A0A] border border-[#C5A059]/40 shadow-2xl shadow-[#C5A059]/10 text-center overflow-hidden">
        {/* Ambient Lighting */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#C5A059]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#E6CA85] font-mono-code text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{language === 'es' ? 'Modo Demostración en Vivo • 3 en 1' : 'Live Showcase Mode • 3 in 1'}</span>
          </div>

          <h3 className="font-display font-black text-lg sm:text-xl text-white">
            {t.liveDemoSectionTitle}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {t.liveDemoSectionSubtitle}
          </p>

          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="open-live-demo-showcase-btn"
              onClick={onOpenLiveDemo}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-[#E6CA85] via-[#C5A059] to-[#9A7B39] hover:from-[#F0DC9E] hover:to-[#C5A059] text-black font-sans font-bold text-xs sm:text-sm tracking-normal flex items-center justify-center gap-2.5 shadow-xl shadow-[#C5A059]/25 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current shrink-0" />
              <span>{t.liveDemoBtn}</span>
            </button>
          </div>

          <div className="pt-1 flex items-center justify-center gap-6 text-[11px] font-mono-code text-neutral-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{language === 'es' ? 'Caso Docente: Planilla Excel' : 'Faculty: Excel Sheet'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'es' ? 'Caso Estudiante: Simulador PPA' : 'Student: GPA Simulator'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>{language === 'es' ? 'Caso Admin: Asignador Cloud' : 'Admin: Cloud Allocator'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
