import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { useLanguage } from '../../context/LanguageContext';
import { getLocalizedCourse } from '../../i18n/localize';
import {
  Video,
  Radio,
  Copy,
  Check,
  ExternalLink,
  Users,
  Cpu,
  MonitorPlay
} from 'lucide-react';

export const VirtualClassroomLauncher: React.FC = () => {
  const { courses, selectedCourseId, updateCourse, addToast } = useAcademic();
  const { t, language } = useLanguage();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const localizedCourse = getLocalizedCourse(course.id, course, language);

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPasscode, setCopiedPasscode] = useState(false);

  const toggleLiveStatus = () => {
    const isLive = course.virtualClassroom?.isLiveNow;
    updateCourse(course.id, {
      virtualClassroom: {
        ...course.virtualClassroom,
        isLiveNow: !isLive,
      },
    });

    addToast({
      type: isLive ? 'info' : 'success',
      title: isLive ? t.sessionEndedToast : t.sessionLiveToast,
      message: isLive
        ? t.sessionEndedMsg
        : `${localizedCourse.name}: ${t.sessionLiveMsg}`,
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(course.virtualClassroom.joinUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    addToast({
      type: 'info',
      title: t.linkCopiedToast,
      message: t.linkCopiedMsg,
    });
  };

  const handleCopyPasscode = () => {
    if (course.virtualClassroom.passcode) {
      navigator.clipboard.writeText(course.virtualClassroom.passcode);
      setCopiedPasscode(true);
      setTimeout(() => setCopiedPasscode(false), 2000);
    }
  };

  return (
    <div id="virtual-classroom-launcher" className="space-y-6">
      {/* Active Broadcast Control Center */}
      <div className="bg-gradient-to-br from-[#0D0D0D] via-[#14120A] to-[#0A0A0A] rounded-3xl p-8 text-white border border-[#262626] shadow-2xl relative overflow-hidden">
        {/* Glow circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-bold ${
                course.virtualClassroom.isLiveNow
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'bg-[#141414] text-neutral-400 border border-[#262626]'
              }`}>
                <span className={`w-2 h-2 rounded-full ${course.virtualClassroom.isLiveNow ? 'bg-rose-500' : 'bg-neutral-500'}`} />
                {course.virtualClassroom.isLiveNow ? t.liveNowBadge : t.roomWaitingBadge}
              </span>
              <span className="text-xs font-mono-code text-[#E6CA85]">
                {course.virtualClassroom.platform}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              {localizedCourse.name}
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl mt-1 leading-relaxed">
              {t.classroomSubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              id="toggle-live-class-btn"
              onClick={toggleLiveStatus}
              className={`px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                course.virtualClassroom.isLiveNow
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                  : 'bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black shadow-[#C5A059]/20 hover:scale-105'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>{course.virtualClassroom.isLiveNow ? t.endSession : t.launchSession}</span>
            </button>

            <a
              href={course.virtualClassroom.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-[#141414] hover:bg-[#1f1f1f] text-neutral-200 border border-[#262626] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>{t.openDirectRoomBtn}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Credentials and Direct Access Box */}
        <div className="mt-8 pt-6 border-t border-[#262626] grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#080808] border border-[#262626]">
            <span className="text-[10px] font-mono-code font-bold uppercase text-neutral-400 block mb-1">{t.meetingIdLabel}</span>
            <div className="flex items-center justify-between font-mono-code font-bold text-sm text-[#E6CA85]">
              <span>{course.virtualClassroom.meetingId}</span>
              <Video className="w-4 h-4 text-neutral-500" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#080808] border border-[#262626]">
            <span className="text-[10px] font-mono-code font-bold uppercase text-neutral-400 block mb-1">{t.passcodeLabel}</span>
            <div className="flex items-center justify-between font-mono-code font-bold text-sm text-neutral-200">
              <span>{course.virtualClassroom.passcode || t.noPasscodeRequired}</span>
              {course.virtualClassroom.passcode && (
                <button
                  onClick={handleCopyPasscode}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title={t.copyMeetingLink}
                >
                  {copiedPasscode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#080808] border border-[#262626]">
            <span className="text-[10px] font-mono-code font-bold uppercase text-neutral-400 block mb-1">{t.directRoomLink}</span>
            <div className="flex items-center justify-between font-mono-code text-xs text-neutral-300">
              <span className="truncate max-w-[160px]">{course.virtualClassroom.joinUrl}</span>
              <button
                onClick={handleCopyLink}
                className="px-2.5 py-1 rounded-lg bg-[#141414] hover:bg-[#202020] border border-[#333] text-[10px] font-mono-code text-[#E6CA85] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLink ? 'OK' : t.copyMeetingLink}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Server Infrastructure & Cloud GPU features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/40 text-violet-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">{t.cloudGpuCluster}</h3>
              <p className="text-xs text-neutral-400 font-mono-code">{t.serverSpecs}</p>
            </div>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed mb-4">
            {t.gpuActiveNotice}
          </p>
          <div className="p-3 rounded-xl bg-[#121212] border border-[#262626] flex items-center justify-between text-xs font-mono-code">
            <span className="text-neutral-400">Hardware Profile:</span>
            <span className="text-[#E6CA85] font-bold">NVIDIA A100 Tensor Core 80GB</span>
          </div>
        </div>

        <div className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#14120A] border border-[#C5A059]/40 text-[#E6CA85]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">{t.roomCapacity}</h3>
              <p className="text-xs text-neutral-400 font-mono-code">Enterprise High-Capacity Room</p>
            </div>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed mb-4">
            {language === 'es' ? 'Sala optimizada para transmisiones masivas, subtitulado automático y salas de grupos de trabajo simultáneos.' : 'Room optimized for large broadcasts, real-time live captions, and simultaneous breakout workgroups.'}
          </p>
          <div className="p-3 rounded-xl bg-[#121212] border border-[#262626] flex items-center justify-between text-xs font-mono-code">
            <span className="text-neutral-400">Capacity:</span>
            <span className="text-emerald-400 font-bold">500 {language === 'es' ? 'Participantes' : 'Participants'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
