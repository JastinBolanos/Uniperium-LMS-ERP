import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { useLanguage } from '../../context/LanguageContext';
import { ClassroomResource } from '../../types/academic';
import { Plus } from 'lucide-react';
import { ResourceCardGrid } from './resources/ResourceCardGrid';
import { ResourceScheduleTable } from './resources/ResourceScheduleTable';
import { AllocateResourceModal } from './resources/AllocateResourceModal';

export const ResourceAllocationView: React.FC = () => {
  const { classrooms, courses, allocateResource, removeResourceSlot, addToast } = useAcademic();
  const { t, language } = useLanguage();

  const [selectedRoom, setSelectedRoom] = useState<ClassroomResource>(classrooms[0] || ({} as ClassroomResource));
  const [showAllocateModal, setShowAllocateModal] = useState(false);

  const handleAllocate = (data: {
    day: 'LUN' | 'MAR' | 'MIE' | 'JUE' | 'VIE' | 'SAB';
    startTime: string;
    endTime: string;
    courseId: string;
  }) => {
    const courseObj = courses.find((c) => c.id === data.courseId);
    if (!courseObj) return;

    const res = allocateResource(selectedRoom.id, {
      day: data.day,
      startTime: data.startTime,
      endTime: data.endTime,
      courseId: courseObj.id,
      courseName: courseObj.name,
      teacherName: courseObj.teacherName,
    });

    if (res.success) {
      setShowAllocateModal(false);
      const updated = classrooms.find((c) => c.id === selectedRoom.id);
      if (updated) setSelectedRoom(updated);
    } else {
      addToast({
        type: 'error',
        title: t.resourceAllocationError,
        message: res.error || (language === 'es' ? 'No se pudo reservar el recurso.' : 'Could not reserve the resource.'),
      });
    }
  };

  const handleRemoveSlot = (roomId: string, slotId: string) => {
    removeResourceSlot(roomId, slotId);
    const updated = classrooms.find((c) => c.id === roomId);
    if (updated) {
      setSelectedRoom({
        ...updated,
        assignedSlots: updated.assignedSlots.filter((s) => s.id !== slotId),
      });
    }
  };

  return (
    <div id="resource-allocation-container" className="space-y-6">
      {/* Banner */}
      <div className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-6 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-[#14120A] border border-[#C5A059]/30 text-[#E6CA85] text-xs font-mono-code font-bold">
              {t.digitalInfrastructureMgmt}
            </span>
            <span className="text-xs text-neutral-400 font-mono-code">{classrooms.length} {t.activeEnvironments}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            {t.resourceTitle}
          </h2>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            {t.resourceSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAllocateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B39] hover:from-[#E6CA85] hover:to-[#C5A059] text-black font-bold text-xs flex items-center gap-2 shadow-md shadow-[#C5A059]/20 transition-colors cursor-pointer self-start lg:self-auto"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>{t.newAllocationBtn}</span>
        </button>
      </div>

      {/* Resources Cards Grid */}
      <ResourceCardGrid
        classrooms={classrooms}
        selectedRoom={selectedRoom}
        onSelectRoom={setSelectedRoom}
        language={language}
        t={t}
      />

      {/* Selected Resource Detailed Schedule Table */}
      <ResourceScheduleTable
        selectedRoom={selectedRoom}
        onRemoveSlot={handleRemoveSlot}
        language={language}
        t={t}
      />

      {/* Allocate Modal */}
      <AllocateResourceModal
        selectedRoom={selectedRoom}
        courses={courses}
        isOpen={showAllocateModal}
        onClose={() => setShowAllocateModal(false)}
        onAllocate={handleAllocate}
        language={language}
        t={t}
      />
    </div>
  );
};
