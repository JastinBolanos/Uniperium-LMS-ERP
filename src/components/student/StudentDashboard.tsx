import React, { useState, useMemo } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { useLanguage } from '../../context/LanguageContext';
import { StudentHeroBanner } from './StudentHeroBanner';
import { StudentOverviewTab } from './StudentOverviewTab';
import { StudentGradesTab } from './StudentGradesTab';
import { StudentSimulatorTab } from './StudentSimulatorTab';
import { StudentScheduleTab } from './StudentScheduleTab';
import { StudentAttendanceTab } from './StudentAttendanceTab';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    enrollments,
    calculateStudentFinalGrade,
    calculateAttendanceStats,
    setSelectedCourseId,
    addToast,
  } = useAcademic();

  const { t, language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'GRADES' | 'SCHEDULE' | 'ATTENDANCE' | 'SIMULATOR'>('OVERVIEW');

  // Compute Overall Student GPA (PPA)
  const academicSummary = useMemo(() => {
    let totalWeightScore = 0;
    let totalCredits = 0;

    courses.forEach((c) => {
      const enr = enrollments.find((e) => e.courseId === c.id && e.studentId === currentUser.id);
      if (enr) {
        const computed = calculateStudentFinalGrade(enr, c);
        totalWeightScore += computed.finalScore * c.credits;
        totalCredits += c.credits;
      }
    });

    const gpa = totalCredits > 0 ? Number((totalWeightScore / totalCredits).toFixed(2)) : 0;
    return {
      gpa,
      totalCredits,
      meritPosition: t.meritHonorRoll,
      currentSemester: currentUser.currentSemester || 7,
      completedCreditsTotal: 142,
      requiredCreditsTotal: 210,
    };
  }, [courses, enrollments, currentUser.id, calculateStudentFinalGrade, currentUser.currentSemester, t.meritHonorRoll]);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveTab('GRADES');
  };

  return (
    <div id="student-portal-container" className="space-y-6">
      {/* Student Welcome Header Banner */}
      <StudentHeroBanner
        currentUser={currentUser}
        gpa={academicSummary.gpa}
        completedCredits={academicSummary.completedCreditsTotal}
        requiredCredits={academicSummary.requiredCreditsTotal}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
        t={t}
      />

      {/* Tab Content 1: Overview */}
      {activeTab === 'OVERVIEW' && (
        <StudentOverviewTab
          courses={courses}
          enrollments={enrollments}
          studentId={currentUser.id}
          calculateStudentFinalGrade={calculateStudentFinalGrade}
          calculateAttendanceStats={calculateAttendanceStats}
          onSelectCourse={handleSelectCourse}
          language={language}
          t={t}
        />
      )}

      {/* Tab Content 2: Detailed Grades with Rubric Feedback */}
      {activeTab === 'GRADES' && (
        <StudentGradesTab
          courses={courses}
          enrollments={enrollments}
          studentId={currentUser.id}
          calculateStudentFinalGrade={calculateStudentFinalGrade}
          language={language}
          t={t}
        />
      )}

      {/* Tab Content 3: Grade Simulator */}
      {activeTab === 'SIMULATOR' && (
        <StudentSimulatorTab
          courses={courses}
          enrollments={enrollments}
          studentId={currentUser.id}
          onToast={addToast}
          language={language}
          t={t}
        />
      )}

      {/* Tab Content 4: Schedule */}
      {activeTab === 'SCHEDULE' && (
        <StudentScheduleTab
          courses={courses}
          language={language}
          t={t}
        />
      )}

      {/* Tab Content 5: Attendance */}
      {activeTab === 'ATTENDANCE' && (
        <StudentAttendanceTab
          courses={courses}
          enrollments={enrollments}
          studentId={currentUser.id}
          calculateAttendanceStats={calculateAttendanceStats}
          language={language}
          t={t}
        />
      )}
    </div>
  );
};
