import React, { useState } from 'react';
import { Course } from '../../../types/academic';
import { getLocalizedCourse } from '../../../i18n/localize';

interface NewSessionModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  onAddSession: (data: {
    topic: string;
    date: string;
    modality: 'VIRTUAL' | 'HIBRIDA' | 'LABORATORIO';
  }) => void;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const NewSessionModal: React.FC<NewSessionModalProps> = ({
  course,
  isOpen,
  onClose,
  onAddSession,
  language,
  t,
}) => {
  const localizedCourse = getLocalizedCourse(course.id, course, language);

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    topic: language === 'es' ? 'Taller de Implementación Práctica' : 'Practical Implementation Workshop',
    modality: 'VIRTUAL' as 'VIRTUAL' | 'HIBRIDA' | 'LABORATORIO',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSession(form);
    onClose();
  };

  return (
    <div id="new-session-modal" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] rounded-2xl shadow-2xl border border-[#262626] max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
        <h3 className="font-display font-bold text-lg text-white mb-1">
          {t.createSessionModalTitle}
        </h3>
        <p className="text-xs text-neutral-400 mb-5">
          {course.code} • {localizedCourse.name}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1">
              {t.sessionTopicLabel}
            </label>
            <input
              type="text"
              required
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              placeholder="e.g. Clúster de Microservicios & Kubernetes"
              className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-[#262626] text-xs text-white focus:border-[#C5A059] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1">
                {t.date}
              </label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-[#262626] text-xs text-white focus:border-[#C5A059] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1">
                {t.sessionModalityLabel}
              </label>
              <select
                value={form.modality}
                onChange={(e) => setForm({ ...form, modality: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-[#262626] text-xs text-white focus:border-[#C5A059] focus:outline-hidden"
              >
                <option value="VIRTUAL">{t.modalityVirtual}</option>
                <option value="HIBRIDA">{t.modalityHybrid}</option>
                <option value="LABORATORIO">{t.modalityLab}</option>
              </select>
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
              {t.createSessionSubmit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
