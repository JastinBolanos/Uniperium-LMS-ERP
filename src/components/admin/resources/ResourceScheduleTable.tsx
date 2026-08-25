import React from 'react';
import { ClassroomResource } from '../../../types/academic';
import { getLocalizedClassroom, getLocalizedDay } from '../../../i18n/localize';
import { ExternalLink, Trash2 } from 'lucide-react';

interface ResourceScheduleTableProps {
  selectedRoom: ClassroomResource;
  onRemoveSlot: (roomId: string, slotId: string) => void;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const ResourceScheduleTable: React.FC<ResourceScheduleTableProps> = ({
  selectedRoom,
  onRemoveSlot,
  language,
  t,
}) => {
  const localizedSelectedRoom = getLocalizedClassroom(selectedRoom.id, selectedRoom, language);

  return (
    <div className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-6 shadow-md space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold text-[#E6CA85] bg-[#14120A] border border-[#C5A059]/30 px-2 py-0.5 rounded">
              {selectedRoom.code}
            </span>
            <h3 className="font-display font-bold text-lg text-white">{localizedSelectedRoom.name}</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            {language === 'es'
              ? 'Horario de ocupación semanal reservado para este recurso.'
              : 'Weekly occupancy schedule reserved for this resource.'}
          </p>
        </div>

        <a
          href={selectedRoom.directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] hover:border-[#C5A059]/40 text-white text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <span>{t.testDirectLink}</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#E6CA85]" />
        </a>
      </div>

      {selectedRoom.assignedSlots.length === 0 ? (
        <div className="py-12 text-center text-neutral-400 text-xs">
          {t.noReservations}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#141414] border-b border-[#262626] font-mono-code text-[11px] text-neutral-400 uppercase">
                <th className="py-3 px-4">{t.day}</th>
                <th className="py-3 px-4">{t.schedule}</th>
                <th className="py-3 px-4">{t.assignedCourse}</th>
                <th className="py-3 px-4">{t.teacher}</th>
                <th className="py-3 px-4 text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {selectedRoom.assignedSlots.map((slot) => (
                <tr key={slot.id} className="hover:bg-[#141414] transition-colors">
                  <td className="py-3 px-4 font-mono-code font-bold text-[#E6CA85]">
                    {getLocalizedDay(slot.day, language)}
                  </td>
                  <td className="py-3 px-4 font-mono-code text-neutral-200 font-semibold">
                    {slot.startTime} - {slot.endTime}
                  </td>
                  <td className="py-3 px-4 font-bold text-white">
                    {slot.courseName}
                  </td>
                  <td className="py-3 px-4 text-neutral-300">
                    {slot.teacherName}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onRemoveSlot(selectedRoom.id, slot.id)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title={language === 'es' ? 'Liberar espacio' : 'Free up slot'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
