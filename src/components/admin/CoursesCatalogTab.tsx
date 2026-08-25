import React from 'react';
import { Course } from '../../types/academic';
import { getLocalizedCourse } from '../../i18n/localize';

interface CoursesCatalogTabProps {
  courses: Course[];
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const CoursesCatalogTab: React.FC<CoursesCatalogTabProps> = ({
  courses,
  language,
  t,
}) => {
  return (
    <div className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-6 shadow-md space-y-6">
      <div>
        <h3 className="font-display font-bold text-lg text-white">
          {t.courseCatalog}
        </h3>
        <p className="text-xs text-neutral-400">
          {t.courseCatalogDesc}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#141414] border-b border-[#262626] font-mono-code text-[11px] text-neutral-400 uppercase">
              <th className="py-3 px-4">{t.code}</th>
              <th className="py-3 px-4">{t.name}</th>
              <th className="py-3 px-4">{language === 'es' ? 'Programa' : 'Degree'}</th>
              <th className="py-3 px-4">{language === 'es' ? 'Docente Asignado' : 'Assigned Faculty'}</th>
              <th className="py-3 px-4 text-center">{t.credits}</th>
              <th className="py-3 px-4 text-center">{language === 'es' ? 'Rúbricas' : 'Rubrics'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {courses.map((c) => {
              const locC = getLocalizedCourse(c.id, c, language);
              return (
                <tr key={c.id} className="hover:bg-[#141414] transition-colors">
                  <td className="py-3 px-4 font-mono-code font-bold text-[#E6CA85]">{c.code}</td>
                  <td className="py-3 px-4 font-bold text-white">{locC.name}</td>
                  <td className="py-3 px-4 text-neutral-300">{c.program}</td>
                  <td className="py-3 px-4 text-neutral-200 font-semibold">{c.teacherName}</td>
                  <td className="py-3 px-4 text-center font-mono-code font-bold text-white">{c.credits}</td>
                  <td className="py-3 px-4 text-center font-mono-code text-[#E6CA85] font-semibold">
                    {c.evaluations.length} {language === 'es' ? 'Evaluaciones' : 'Evaluations'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
