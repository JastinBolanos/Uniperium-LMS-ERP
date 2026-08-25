import React from 'react';
import { ClassroomResource } from '../../../types/academic';
import { getLocalizedClassroom } from '../../../i18n/localize';
import { Cpu, Video, Monitor, Server } from 'lucide-react';

interface ResourceCardGridProps {
  classrooms: ClassroomResource[];
  selectedRoom: ClassroomResource;
  onSelectRoom: (room: ClassroomResource) => void;
  language: 'es' | 'en';
  t: Record<string, string>;
}

export const ResourceCardGrid: React.FC<ResourceCardGridProps> = ({
  classrooms,
  selectedRoom,
  onSelectRoom,
  language,
  t,
}) => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'LAB_CLOUD_GPU':
        return <Cpu className="w-5 h-5 text-violet-400" />;
      case 'VIRTUAL_ZOOM':
      case 'VIRTUAL_MEET':
        return <Video className="w-5 h-5 text-sky-400" />;
      case 'AULA_HIBRIDA':
        return <Monitor className="w-5 h-5 text-emerald-400" />;
      default:
        return <Server className="w-5 h-5 text-[#E6CA85]" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {classrooms.map((room) => {
        const isSelected = selectedRoom.id === room.id;
        const locRoom = getLocalizedClassroom(room.id, room, language);
        return (
          <div
            key={room.id}
            onClick={() => onSelectRoom(room)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              isSelected
                ? 'bg-[#14120A] border-[#C5A059] ring-2 ring-[#C5A059]/20 shadow-md'
                : 'bg-[#0A0A0A] border-[#262626] hover:border-[#C5A059]/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-[#141414] border border-[#262626]">
                  {getResourceIcon(room.type)}
                </div>
                <span
                  className={`text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full ${
                    room.status === 'EN_USO'
                      ? 'bg-amber-950/50 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {room.status === 'EN_USO'
                    ? language === 'es'
                      ? 'EN USO'
                      : 'IN USE'
                    : language === 'es'
                    ? 'DISPONIBLE'
                    : 'AVAILABLE'}
                </span>
              </div>

              <h3 className="font-display font-bold text-sm text-white mb-1">{locRoom.name}</h3>
              <p className="text-[11px] font-mono-code text-neutral-400 mb-2">{room.code}</p>

              {locRoom.specs && (
                <p className="text-xs text-neutral-300 bg-[#121212] p-2 rounded-lg border border-[#262626] mb-3 line-clamp-2">
                  {locRoom.specs}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-[#262626] flex items-center justify-between text-xs font-mono-code">
              <span className="text-neutral-400">
                {t.roomCapacity}: {room.capacity}
              </span>
              <span className="font-bold text-[#E6CA85]">
                {room.assignedSlots.length} {t.assignedSlots}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
