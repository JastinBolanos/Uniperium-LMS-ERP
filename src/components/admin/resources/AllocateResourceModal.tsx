import React, { useState } from 'react';
import { ClassroomResource, Course } from '../../../types/academic';
import { getLocalizedClassroom, getLocalizedCourse } from '../../../i18n/localize';

interface AllocateResourceModalProps {
  selectedRoom: ClassroomResource;
  courses: Course[];
  isOpen: boolean;
  onClose: () => void;
  onAllocate: (data: {
    day: 'LUN' | 'MAR' | 'MIE' | 'JUE' | 'VIE' | 'SAB';
    startTime: string;
    endTime: string;
    courseId: string;
  }) => void;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const AllocateResourceModal: React.FC<AllocateResourceModalProps> = ({
  selectedRoom,
  courses,
  isOpen,
  onClose,
  onAllocate,
  language,
  t,
}) => {
  const localizedSelectedRoom = getLocalizedClassroom(selectedRoom.id, selectedRoom, language);

  const [form, setForm] = useState({
    day: 'LUN' as 'LUN' | 'MAR' | 'MIE' | 'JUE' | 'VIE' | 'SAB',
    startTime: '08:00',
    endTime: '10:30',
    courseId: courses[0]?.id || '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAllocate(form);
  };

  return (
    <div id="allocate-resource-modal" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] rounded-2xl shadow-2xl border border-[#262626] max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
        <h3 className="font-display font-bold text-lg text-white mb-1">
          {t.allocateSlotModalTitle}
        </h3>
        <p className="text-xs text-neutral-400 mb-5">
          {selectedRoom.code} • {localizedSelectedRoom.name}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1">
              {t.courseToAssign}
            </label>
            <select
              value={form.courseId}
              onChange={(e) => setForm({ ...form, courseId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-[#262626] text-xs text-white focus:border-[#C5A059] focus:outline-hidden"
            >
              {courses.map((c) => {
                const locC = getLocalizedCourse(c.id, c, language);
                return (
                  <option key={c.id} value={c.id}>
                    {c.code} - {locC.name} ({c.teacherName})
                  </option>
                );
              })}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1">
                {t.day}
              </label>
              <select
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-[#262626] text-xs text-white focus:border-[#C5A059] focus:outline-hidden"
              >
                <option value="LUN">{language === 'es' ? 'Lunes' : 'Monday'}</option>
                <option value="MAR">{language === 'es' ? 'Martes' : 'Tuesday'}</option>
                <option value="MIE">{language === 'es' ? 'Miércoles' : 'Wednesday'}</option>
                <option value="JUE">{language === 'es' ? 'Jueves' : 'Thursday'}</option>
                <option value="VIE">{language === 'es' ? 'Viernes' : 'Friday'}</option>
                <option value="SAB">{language === 'es' ? 'Sábado' : 'Saturday'}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1">
                {t.startTime}
              </label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-[#262626] text-xs text-white focus:border-[#C5A059] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1">
                {t.endTime}
              </label>
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-[#262626] text-xs text-white focus:border-[#C5A059] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#262626]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-[#141414] transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black text-xs font-bold shadow-md shadow-[#C5A059]/20 transition-all cursor-pointer"
            >
              {t.reserveSlotSubmit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
