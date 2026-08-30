import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { useLanguage, LanguageToggle } from '../../context/LanguageContext';
import { getLocalizedCourse, getLocalizedAnnouncement } from '../../i18n/localize';
import { Role } from '../../types/academic';
import {
  Bell,
  BookOpen,
  ChevronDown,
  Check,
  LogOut,
  GraduationCap,
  Layers,
  BarChart3,
} from 'lucide-react';

interface HeaderProps {
  onOpenWelcome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenWelcome }) => {
  const {
    currentRole,
    currentUser,
    switchRole,
    courses,
    selectedCourseId,
    setSelectedCourseId,
    announcements,
  } = useAcademic();
  const { t, language } = useLanguage();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false);

  const activeCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const locActiveCourse = getLocalizedCourse(activeCourse?.id || '', activeCourse, language);

  const roleLabels: Record<Role, { title: string; desc: string; color: string; badgeClass: string; icon: any }> = {
    TEACHER: {
      title: t.teacherFull,
      desc: t.simTeacherDesc,
      color: 'text-[#C5A059]',
      badgeClass: 'bg-[#C5A059]/20 border-[#C5A059]/40 text-[#E6CA85]',
      icon: BarChart3,
    },
    STUDENT: {
      title: language === 'es' ? 'Alumno / Estudiante' : 'Student',
      desc: t.simStudentDesc,
      color: 'text-emerald-400',
      badgeClass: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
      icon: GraduationCap,
    },
    ADMIN: {
      title: t.adminFull,
      desc: t.simAdminDesc,
      color: 'text-sky-400',
      badgeClass: 'bg-sky-500/20 border-sky-500/40 text-sky-300',
      icon: Layers,
    },
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-[#262626] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Academic Period Tag */}
          <div className="flex items-center gap-4">
            <button
              id="header-brand-logo"
              onClick={onOpenWelcome}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
              title={t.welcomeScreen}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1a150b] via-[#3d2e14] to-[#C5A059] p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="font-luxury font-black text-xl text-[#E6CA85]">U</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-base tracking-tight text-white">
                    UNIPERIUM
                  </span>
                  <span className="text-[10px] font-mono-code font-bold px-1.5 py-0.2 rounded bg-[#C5A059]/20 text-[#E6CA85] border border-[#C5A059]/30">
                    {t.brandTag}
                  </span>
                </div>
                <div className="text-[10px] text-neutral-400 font-mono-code flex items-center gap-1.5">
                  <span>{t.semesterPeriod}</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400 font-semibold">{t.inProgress}</span>
                </div>
              </div>
            </button>

            {/* Course Selector for Teacher / Student */}
            {currentRole !== 'ADMIN' && (
              <div className="relative hidden md:block">
                <button
                  id="course-selector-btn"
                  onClick={() => setIsCourseMenuOpen(!isCourseMenuOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#262626] hover:border-[#C5A059]/40 hover:bg-[#121212] text-neutral-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="max-w-[200px] truncate">{activeCourse?.code} • {locActiveCourse.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                </button>

                {isCourseMenuOpen && (
                  <div
                    id="course-selector-dropdown"
                    className="absolute left-0 mt-2 w-80 bg-[#0A0A0A] rounded-xl shadow-2xl border border-[#262626] py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-3 py-1 text-[11px] font-mono-code font-bold uppercase text-[#C5A059] border-b border-[#262626]">
                      {t.semesterCourses}
                    </div>
                    {courses.map((course) => {
                      const locCourse = getLocalizedCourse(course.id, course, language);
                      return (
                        <button
                          key={course.id}
                          onClick={() => {
                            setSelectedCourseId(course.id);
                            setIsCourseMenuOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left flex items-start gap-2.5 text-xs hover:bg-[#181818] transition-colors ${
                            course.id === selectedCourseId ? 'bg-[#181818] font-bold text-[#E6CA85]' : 'text-neutral-300'
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-mono-code text-[11px] font-bold text-[#C5A059]">{course.code}</span>
                              <span className="text-[10px] text-neutral-500 font-mono-code">{course.credits} {t.credits}</span>
                            </div>
                            <p className="truncate text-neutral-200">{locCourse.name}</p>
                          </div>
                          {course.id === selectedCourseId && <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Section: Language Switcher, Role Switcher, Notifications, User Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Bilingual Language Switcher Button */}
            <LanguageToggle variant="header" />

            {/* Quick Role Switcher Pill Dropdown */}
            <div className="relative">
              <button
                id="role-switcher-btn"
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#262626] bg-[#0A0A0A] hover:bg-[#141414] hover:border-[#C5A059]/40 text-xs font-semibold text-neutral-200 shadow-sm transition-all cursor-pointer"
                title={t.switchRole}
              >
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono-code">{t.role}:</span>
                <span className="text-white font-bold">{roleLabels[currentRole].title.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
              </button>

              {isRoleMenuOpen && (
                <div
                  id="role-switcher-dropdown"
                  className="absolute right-0 mt-2 w-72 bg-[#0A0A0A] rounded-2xl shadow-2xl border border-[#262626] p-2.5 z-50 animate-in fade-in duration-150"
                >
                  <div className="px-3 pt-1.5 pb-2 border-b border-[#222] mb-1.5">
                    <span className="text-[11px] font-mono-code font-bold uppercase text-[#C5A059] tracking-wider block">
                      {t.switchRole}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {(['TEACHER', 'STUDENT', 'ADMIN'] as Role[]).map((roleKey) => {
                      const RoleIcon = roleLabels[roleKey].icon;
                      const isActive = currentRole === roleKey;
                      return (
                        <button
                          key={roleKey}
                          id={`switch-to-${roleKey.toLowerCase()}`}
                          onClick={() => {
                            switchRole(roleKey);
                            setIsRoleMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#181818] font-bold text-[#E6CA85] border border-[#C5A059]/50 shadow-md shadow-[#C5A059]/5'
                              : 'hover:bg-[#121212] text-neutral-300 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                isActive
                                  ? 'bg-[#C5A059] text-black font-bold shadow-sm'
                                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                              }`}
                            >
                              <RoleIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className={`font-semibold text-xs ${isActive ? 'text-[#E6CA85]' : 'text-white'}`}>
                                {roleLabels[roleKey].title}
                              </p>
                              <p className="text-[10px] text-neutral-400 font-sans mt-0.5">
                                {roleLabels[roleKey].desc}
                              </p>
                            </div>
                          </div>
                          {isActive && <Check className="w-4 h-4 text-[#C5A059] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                id="notifications-btn"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-lg text-neutral-400 hover:bg-[#141414] hover:text-white transition-colors cursor-pointer"
                title={t.notifications}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C5A059]" />
              </button>

              {isNotificationsOpen && (
                <div
                  id="notifications-dropdown"
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0A0A0A] rounded-2xl shadow-2xl border border-[#262626] p-3 z-50 animate-in fade-in duration-150"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#262626] mb-2">
                    <span className="font-display font-bold text-xs text-white">{t.notifications}</span>
                    <span className="text-[10px] font-mono-code text-[#E6CA85] font-semibold">{announcements.length} {t.unreadAnnouncements}</span>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {announcements.map((ann) => {
                      const locAnn = getLocalizedAnnouncement(ann.id, ann, language);
                      return (
                        <div key={ann.id} className="p-2.5 rounded-xl bg-[#121212] hover:bg-[#181818] border border-[#262626] transition-colors">
                          <div className="flex items-center justify-between text-[10px] font-mono-code text-neutral-400 mb-1">
                            <span className="px-1.5 py-0.5 rounded bg-[#C5A059]/20 text-[#E6CA85] font-bold border border-[#C5A059]/30">{ann.category}</span>
                            <span>{ann.date}</span>
                          </div>
                          <h4 className="text-xs font-bold text-white mb-1">{locAnn.title}</h4>
                          <p className="text-[11px] text-neutral-400 leading-relaxed">{locAnn.content}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Thumbnail */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#262626]">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#C5A059]/40"
              />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-white leading-tight truncate max-w-[140px]">{currentUser.name}</p>
                <p className="text-[10px] text-neutral-400 font-mono-code">{currentUser.code}</p>
              </div>
            </div>

            {/* Return to Welcome Screen Button */}
            <button
              id="header-welcome-return-btn"
              onClick={onOpenWelcome}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#141414] transition-colors cursor-pointer"
              title={t.welcomeScreen}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
