import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { useLanguage } from '../../context/LanguageContext';
import { Role } from '../../types/academic';
import { LiveDemoModal } from './LiveDemoModal';
import { RoleLoginModal } from './RoleLoginModal';
import { QuickSignInModal } from './QuickSignInModal';
import { WelcomeHeader } from './WelcomeHeader';
import { WelcomeTitleSection } from './WelcomeTitleSection';
import { RolePortalCards } from './RolePortalCards';
import { LiveDemoShowcaseBanner } from './LiveDemoShowcaseBanner';
import { WelcomeFooter } from './WelcomeFooter';
import confetti from 'canvas-confetti';

interface WelcomeHeroProps {
  onEnter: () => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ onEnter }) => {
  const { switchRole, allDemoUsers } = useAcademic();
  const { t, language } = useLanguage();

  // Modals state
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isQuickSignInOpen, setIsQuickSignInOpen] = useState(false);
  const [loginModalRole, setLoginModalRole] = useState<Role | null>(null);

  const handleDirectEnter = (role: Role) => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
    });
    switchRole(role);
    onEnter();
  };

  const handleOpenLoginModal = (role: Role, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLoginModalRole(role);
  };

  return (
    <div id="welcome-portal" className="min-h-screen bg-[#050505] text-neutral-100 relative overflow-hidden flex flex-col justify-between selection:bg-[#C5A059]/30 selection:text-[#E6CA85]">
      {/* Background Decorative Mesh & Geometry */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a140b]/60 via-[#050505] to-[#050505] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#9A7B39]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      {/* Top Header Branding with Iniciar Sesión button opening QuickSignInModal */}
      <WelcomeHeader onEnter={() => setIsQuickSignInOpen(true)} t={t} />

      {/* Main Hero Showcase */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-6 py-8 sm:py-10 flex-1 flex flex-col justify-center">
        {/* Typographic Title Section */}
        <WelcomeTitleSection t={t} />

        {/* Section Header */}
        <div className="mb-6 text-center">
          <h2 className="text-xs font-mono-code font-bold uppercase tracking-widest text-[#C5A059] flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-[#262626]" />
            {t.demoRoleSelection}
            <span className="w-8 h-px bg-[#262626]" />
          </h2>
        </div>

        {/* 3 Discreet, Clean & Elegant Role Portal Cards */}
        <RolePortalCards
          allDemoUsers={allDemoUsers}
          onDirectEnter={handleDirectEnter}
          onOpenLoginModal={handleOpenLoginModal}
          t={t}
        />

        {/* Prominent Live Demo Showcase Section for Non-Clients / Evaluators */}
        <LiveDemoShowcaseBanner
          onOpenLiveDemo={() => setIsDemoModalOpen(true)}
          language={language}
          t={t}
        />
      </main>

      {/* Top Header Quick Sign-In Modal with 3 role choice buttons */}
      <QuickSignInModal
        isOpen={isQuickSignInOpen}
        onClose={() => setIsQuickSignInOpen(false)}
        onSelectRole={handleDirectEnter}
        onOpenCredentialLogin={(role) => setLoginModalRole(role)}
      />

      {/* Interactive Live Demo Modal */}
      <LiveDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectRole={handleDirectEnter}
      />

      {/* Discreet Role-Specific Login Modal */}
      <RoleLoginModal
        isOpen={loginModalRole !== null}
        role={loginModalRole}
        onClose={() => setLoginModalRole(null)}
        onLoginSuccess={handleDirectEnter}
      />

      {/* Footer Credentials & Quick Help */}
      <WelcomeFooter />
    </div>
  );
};
