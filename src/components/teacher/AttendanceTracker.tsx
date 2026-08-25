import React, { useState, useMemo } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { useLanguage } from '../../context/LanguageContext';
import { AttendanceStatus } from '../../types/academic';
import { Search } from 'lucide-react';
import { exportAttendanceToCSV } from '../../domain/services/csvExportService';
import { AttendanceHeader } from './attendance/AttendanceHeader';
import { AttendanceMatrixTable } from './attendance/AttendanceMatrixTable';
import { NewSessionModal } from './attendance/NewSessionModal';

export const AttendanceTracker: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    enrollments,
    attendanceSessions,
    updateAttendance,
    bulkMarkAttendance,
    addAttendanceSession,
    calculateAttendanceStats,
    addToast,
  } = useAcademic();

  const { t, language } = useLanguage();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const courseSessions = useMemo(
    () => attendanceSessions.filter((s) => s.courseId === course.id),
    [attendanceSessions, course.id]
  );
  const courseEnrollments = useMemo(
    () => enrollments.filter((e) => e.courseId === course.id),
    [enrollments, course.id]
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);

  const filteredStudents = useMemo(() => {
    return courseEnrollments.filter((enr) =>
      enr.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enr.studentCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courseEnrollments, searchTerm]);

  // Overall attendance metrics
  const classAttendanceSummary = useMemo(() => {
    if (courseEnrollments.length === 0) return { overallRate: 100, studentsAtRisk: 0 };
    const rates = courseEnrollments.map((enr) => calculateAttendanceStats(enr, course.id).attendanceRate);
    const overallRate = Math.round(rates.reduce((a, b) => a + b, 0) / rates.length);
    const studentsAtRisk = courseEnrollments.filter(
      (enr) => calculateAttendanceStats(enr, course.id).isRiskOfFA
    ).length;

    return { overallRate, studentsAtRisk };
  }, [courseEnrollments, course.id, calculateAttendanceStats]);

  const handleStatusCycle = (studentId: string, sessionId: string, currentStatus: AttendanceStatus) => {
    const cycleMap: Record<AttendanceStatus, AttendanceStatus> = {
      P: 'T',
      T: 'FJ',
      FJ: 'F',
      F: 'P',
    };
    const nextStatus = cycleMap[currentStatus] || 'P';
    updateAttendance(studentId, course.id, sessionId, nextStatus);
  };

  const handleCreateSession = (data: {
    topic: string;
    date: string;
    modality: 'VIRTUAL' | 'HIBRIDA' | 'LABORATORIO';
  }) => {
    addAttendanceSession(course.id, data.topic, data.date, data.modality);
  };

  const handleExportCSV = () => {
    exportAttendanceToCSV(course, attendanceSessions, enrollments, language);
    addToast({
      type: 'success',
      title: t.csvExportedTitle,
      message: t.csvExportedMsg,
    });
  };

  return (
    <div id="attendance-tracker-container" className="space-y-6">
      {/* Attendance Header Banner */}
      <AttendanceHeader
        overallRate={classAttendanceSummary.overallRate}
        studentsAtRisk={classAttendanceSummary.studentsAtRisk}
        totalSessionsCount={courseSessions.length}
        onOpenNewSession={() => setShowNewSessionModal(true)}
        onExportCSV={handleExportCSV}
        language={language}
        t={t}
      />

      {/* Search Input */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            id="search-attendance-input"
            type="text"
            placeholder={t.searchStudentsPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0A0A0A] border border-[#262626] text-xs text-neutral-100 placeholder-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059]"
          />
        </div>
      </div>

      {/* Matrix Table */}
      <AttendanceMatrixTable
        courseSessions={courseSessions}
        filteredStudents={filteredStudents}
        onStatusCycle={handleStatusCycle}
        onBulkMark={(sessionId, status) => bulkMarkAttendance(course.id, sessionId, status)}
        calculateAttendanceStats={calculateAttendanceStats}
        courseId={course.id}
        language={language}
        t={t}
      />

      {/* New Session Modal */}
      <NewSessionModal
        course={course}
        isOpen={showNewSessionModal}
        onClose={() => setShowNewSessionModal(false)}
        onAddSession={handleCreateSession}
        language={language}
        t={t}
      />
    </div>
  );
};
