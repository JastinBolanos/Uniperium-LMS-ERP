import { ClassroomResource, ScheduleSlot } from '../../types/academic';

export interface AllocationSlotInput {
  day: 'LUN' | 'MAR' | 'MIE' | 'JUE' | 'VIE' | 'SAB';
  startTime: string; // "10:00"
  endTime: string;   // "12:30"
  courseId: string;
  courseName: string;
  teacherName: string;
}

export interface ResourceUtilizationMetrics {
  totalRooms: number;
  activeInUse: number;
  utilizationRate: number;
  gpuClusterLoad: number;
  virtualRoomsCount: number;
}

/**
 * Checks whether two time intervals overlap on the same day
 */
export function isTimeOverlapping(
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean {
  // Convert "HH:MM" to minutes from midnight
  const toMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const aStart = toMinutes(startA);
  const aEnd = toMinutes(endA);
  const bStart = toMinutes(startB);
  const bEnd = toMinutes(endB);

  return Math.max(aStart, bStart) < Math.min(aEnd, bEnd);
}

/**
 * Validates whether a new slot can be allocated without conflict
 */
export function checkResourceConflict(
  existingSlots: AllocationSlotInput[],
  newSlot: AllocationSlotInput
): { hasConflict: boolean; conflictingSlot?: AllocationSlotInput } {
  for (const slot of existingSlots) {
    if (slot.day === newSlot.day) {
      if (isTimeOverlapping(slot.startTime, slot.endTime, newSlot.startTime, newSlot.endTime)) {
        return { hasConflict: true, conflictingSlot: slot };
      }
    }
  }
  return { hasConflict: false };
}

/**
 * Calculates global resource utilization across all academic classrooms & labs
 */
export function calculateResourceMetrics(classrooms: ClassroomResource[]): ResourceUtilizationMetrics {
  const totalRooms = classrooms.length;
  const activeInUse = classrooms.filter((r) => r.status === 'EN_USO' || (r.assignedSlots && r.assignedSlots.length > 0)).length;
  const utilizationRate = totalRooms > 0 ? Math.round((activeInUse / totalRooms) * 100) : 0;
  
  const gpuRooms = classrooms.filter((r) => r.type === 'LAB_CLOUD_GPU');
  const gpuClusterLoad = gpuRooms.length > 0
    ? Math.round((gpuRooms.filter((r) => r.assignedSlots.length > 0).length / gpuRooms.length) * 88)
    : 45;

  const virtualRoomsCount = classrooms.filter((r) => r.type === 'VIRTUAL_ZOOM' || r.type === 'VIRTUAL_MEET' || r.type === 'AUDITORIO_VIRTUAL').length;

  return {
    totalRooms,
    activeInUse,
    utilizationRate,
    gpuClusterLoad,
    virtualRoomsCount,
  };
}
