import React from 'react';
import { Course } from '../../types/academic';
import { getLocalizedCourse, getLocalizedDay } from '../../i18n/localize';
import { MapPin, ExternalLink } from 'lucide-react';

interface StudentScheduleTabProps {
  courses: Course[];
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const StudentScheduleTab: React.FC<StudentScheduleTabProps> = ({
  courses,
  language,
  t,
}) => {
  return (
    <div className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-6 shadow-md space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-lg text-white">{t.weeklyScheduleTitle}</h3>
          <p className="text-xs text-neutral-400">{t.semesterPeriod}</p>
        </div>
        <span className="text-xs font-mono-code font-bold text-[#E6CA85] bg-[#14120A] border border-[#C5A059]/30 px-3 py-1 rounded-lg">
          {language === 'es' ? '5 Días Activos' : '5 Active Days'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.flatMap((c) => {
          const locCourse = getLocalizedCourse(c.id, c, language);
          return c.schedules.map((s, idx) => (
            <div key={`${c.id}-${idx}`} className="p-4 rounded-xl bg-[#121212] border border-[#262626] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-[#202020] text-neutral-200 border border-[#333] font-mono-code text-xs font-bold">
                    {getLocalizedDay(s.day, language)}
                  </span>
                  <span className="text-xs font-mono-code font-semibold text-neutral-400">
                    {s.startTime} - {s.endTime}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-white leading-tight mb-1">{locCourse.name}</h4>
                <p className="text-xs text-neutral-400 mb-3">{c.code} • {c.teacherName}</p>

                <div className="p-2 rounded-lg bg-[#0A0A0A] border border-[#262626] text-xs text-neutral-300 font-mono-code mb-4 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  <span>{s.roomName}</span>
                </div>
              </div>

              <a
                href={s.virtualMeetingUrl || c.virtualClassroom.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.openClassroom}</span>
              </a>
            </div>
          ));
        })}
      </div>
    </div>
  );
};
