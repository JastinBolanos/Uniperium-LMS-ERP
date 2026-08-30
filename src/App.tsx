import React, { useState } from 'react';
import { AcademicProvider, useAcademic } from './context/AcademicContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { WelcomeHero } from './components/welcome/WelcomeHero';
import { Header } from './components/layout/Header';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ToastContainer } from './components/common/ToastContainer';
import {
  GraduationCap,
  BarChart3,
  Layers,
  Sparkles,
  RotateCcw,
  HelpCircle,
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentRole, currentUser, isWelcomeOpen, setIsWelcomeOpen, resetAllData } = useAcademic();
  const { t } = useLanguage();
  const [showQuickHelp, setShowQuickHelp] = useState(false);

  // Default to Welcome Screen on initial load for the required presentation
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome || isWelcomeOpen) {
    return (
      <>
        <WelcomeHero
          onEnter={() => {
            setShowWelcome(false);
            setIsWelcomeOpen(false);
          }}
        />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col selection:bg-[#C5A059]/30 selection:text-[#E6CA85]">
      {/* Top Header */}
      <Header onOpenWelcome={() => setShowWelcome(true)} />

      {/* Quick Role & Mode Bar */}
      <div className="bg-[#0A0A0A] text-neutral-300 px-4 py-2.5 border-b border-[#262626] text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono-code text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-white font-bold tracking-wider">UNIPERIUM LMS PRO</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400">
              {t.interactingAs} <strong className="text-[#E6CA85] font-sans">{currentUser.name}</strong> (
              {currentRole === 'TEACHER' ? t.teacher : currentRole === 'STUDENT' ? t.student : t.admin})
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono-code">
            <button
              onClick={() => setShowQuickHelp(true)}
              className="text-neutral-400 hover:text-[#E6CA85] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t.roleGuide}</span>
            </button>

            <span className="text-neutral-700">|</span>

            <button
              onClick={resetAllData}
              className="text-neutral-400 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
              title={t.resetDemoData}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetDemoData}</span>
            </button>

            <span className="text-neutral-700">|</span>

            <button
              onClick={() => setShowWelcome(true)}
              className="text-[#C5A059] hover:text-[#E6CA85] font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E6CA85]" />
              <span>{t.welcomeScreen}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentRole === 'TEACHER' && <TeacherDashboard />}
        {currentRole === 'STUDENT' && <StudentDashboard />}
        {currentRole === 'ADMIN' && <AdminDashboard />}
      </main>

      {/* Global Toast Notifications */}
      <ToastContainer />

      {/* Quick Help Modal */}
      {showQuickHelp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0A] rounded-3xl shadow-2xl border border-[#262626] max-w-2xl w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#262626]">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#E6CA85] flex items-center justify-center font-bold text-sm">
                  ℹ️
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {t.helpModalTitle}
                  </h3>
                  <p className="text-xs text-neutral-400">{t.helpModalSubtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setShowQuickHelp(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-neutral-300">
              <div className="p-4 rounded-2xl bg-[#121212] border border-[#262626]">
                <h4 className="font-bold text-[#E6CA85] flex items-center gap-1.5 mb-1">
                  <BarChart3 className="w-4 h-4 text-[#C5A059]" />
                  1. {t.teacherFull}:
                </h4>
                <p className="text-neutral-400 leading-relaxed">
                  {t.teacherRoleInfo}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121212] border border-[#262626]">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  2. {t.studentFull}:
                </h4>
                <p className="text-neutral-400 leading-relaxed">
                  {t.studentRoleInfo}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121212] border border-[#262626]">
                <h4 className="font-bold text-sky-400 flex items-center gap-1.5 mb-1">
                  <Layers className="w-4 h-4 text-sky-400" />
                  3. {t.adminFull}:
                </h4>
                <p className="text-neutral-400 leading-relaxed">
                  {t.adminRoleInfo}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowQuickHelp(false)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black font-bold text-xs cursor-pointer shadow-lg shadow-[#C5A059]/20 transition-all"
              >
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AcademicProvider>
        <MainAppContent />
      </AcademicProvider>
    </LanguageProvider>
  );
}

