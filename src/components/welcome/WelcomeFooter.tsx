import React from 'react';

export const WelcomeFooter: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-[#262626] bg-[#050505]/90 px-6 py-4 text-center text-xs text-neutral-500 font-sans flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full">
      <div>
        <span>Uniperium LMS © 2026 • Plataforma de Educación Superior Digital.</span>
      </div>
      <div className="flex items-center gap-4 mt-2 sm:mt-0 font-mono-code text-[11px]">
        <span className="text-neutral-400">Autenticación Multi-Rol: Activa</span>
        <span className="text-neutral-700">•</span>
        <span className="text-[#E6CA85]">Demostración en Vivo Lista</span>
      </div>
    </footer>
  );
};
