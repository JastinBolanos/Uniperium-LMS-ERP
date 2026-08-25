import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { useLanguage } from '../../context/LanguageContext';
import { ExcelGradebook } from './ExcelGradebook';
import { AttendanceTracker } from './AttendanceTracker';
import { VirtualClassroomLauncher } from './VirtualClassroomLauncher';
import {
  FileSpreadsheet,
  CalendarCheck2,
  Video,
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { courses, selectedCourseId, setSelectedCourseId } = useAcademic();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'GRADEBOOK' | 'ATTENDANCE' | 'CLASSROOM'>('GRADEBOOK');

  return (
    <div id="teacher-dashboard-container" className="space-y-6">
      {/* Top Navigation Tabs for Teacher */}
      <div className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-2 shadow-md flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            id="tab-gradebook-btn"
            onClick={() => setActiveTab('GRADEBOOK')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'GRADEBOOK'
                ? 'bg-gradient-to-r from-[#C5A059] to-[#9A7B39] text-black font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{t.tabGradebook}</span>
          </button>

          <button
            id="tab-attendance-btn"
            onClick={() => setActiveTab('ATTENDANCE')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'ATTENDANCE'
                ? 'bg-gradient-to-r from-[#C5A059] to-[#9A7B39] text-black font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <CalendarCheck2 className="w-4 h-4" />
            <span>{t.tabAttendance}</span>
          </button>

          <button
            id="tab-classroom-btn"
            onClick={() => setActiveTab('CLASSROOM')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'CLASSROOM'
                ? 'bg-gradient-to-r from-[#C5A059] to-[#9A7B39] text-black font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-[#141414]'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{t.tabVirtualClassroom}</span>
          </button>
        </div>

        {/* Course quick pills */}
        <div className="flex items-center gap-1.5 px-2">
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCourseId(c.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-code font-bold transition-colors cursor-pointer ${
                c.id === selectedCourseId
                  ? 'bg-[#C5A059]/20 text-[#E6CA85] border border-[#C5A059]/40'
                  : 'bg-[#121212] text-neutral-400 hover:text-neutral-200 border border-[#262626]'
              }`}
            >
              {c.code}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'GRADEBOOK' && <ExcelGradebook />}
      {activeTab === 'ATTENDANCE' && <AttendanceTracker />}
      {activeTab === 'CLASSROOM' && <VirtualClassroomLauncher />}
    </div>
  );
};

