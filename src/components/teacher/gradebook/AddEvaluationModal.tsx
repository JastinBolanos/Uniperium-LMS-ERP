import React, { useState } from 'react';
import { Course, EvaluationCategory } from '../../../types/academic';
import { getLocalizedCourse } from '../../../i18n/localize';

interface AddEvaluationModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  onAddEvaluation: (data: {
    code: string;
    name: string;
    weight: number;
    maxScore: number;
    category: EvaluationCategory;
    date: string;
  }) => void;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const AddEvaluationModal: React.FC<AddEvaluationModalProps> = ({
  course,
  isOpen,
  onClose,
  onAddEvaluation,
  language,
  t,
}) => {
  const localizedCourse = getLocalizedCourse(course.id, course, language);

  const [form, setForm] = useState({
    code: 'PC2',
    name: language === 'es' ? 'Práctica Calificada 2' : 'Graded Practical 2',
    weight: 15,
    maxScore: 20,
    category: 'PARCIAL' as EvaluationCategory,
    date: new Date().toISOString().split('T')[0],
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvaluation(form);
    onClose();
  };

  return (
    <div id="new-eval-modal" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] rounded-2xl shadow-2xl border border-[#262626] max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
        <h3 className="font-display font-bold text-lg text-white mb-1">
          {t.newEvaluationTitle}
        </h3>
        <p className="text-xs text-neutral-400 mb-5">
          {course.code} • {localizedCourse.name}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1">
                {t.code}
              </label>
              <input
                type="text"
                required
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="e.g. LAB2, PC3, PRJ"
                className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-[#262626] text-xs font-mono-code font-bold text-white focus:border-[#C5A059] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1">
                {t.evalWeightLabel}
              </label>
              <input
                type="number"
                required
                min="1"
                max="100"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-[#262626] text-xs font-mono-code font-bold text-white focus:border-[#C5A059] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1">
              {t.evalNameLabel}
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Microservices Workshop"
              className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-[#262626] text-xs text-white focus:border-[#C5A059] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-code font-bold uppercase text-neutral-300 mb-1">
                {t.evalTypeLabel}
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-[#121212] border border-[#262626] text-xs text-white focus:border-[#C5A059] focus:outline-hidden"
              >
                <option value="PARCIAL">{language === 'es' ? 'Examen Parcial' : 'Midterm Exam'}</option>
                <option value="LABORATORIO">{language === 'es' ? 'Laboratorio Práctico' : 'Hands-on Lab'}</option>
                <option value="PROYECTO">{language === 'es' ? 'Proyecto Integrador' : 'Capstone Project'}</option>
                <option value="CONTINUA">{language === 'es' ? 'Evaluación Continua' : 'Continuous Evaluation'}</option>
                <option value="FINAL">{language === 'es' ? 'Examen Final' : 'Final Exam'}</option>
              </select>
            </div>
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
              {t.addColumn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
