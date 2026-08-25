import React, { useState, useMemo } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { useLanguage } from '../../context/LanguageContext';
import { getLocalizedCourse } from '../../i18n/localize';
import { EvaluationCategory } from '../../types/academic';
import { FileSpreadsheet, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportGradebookToCSV } from '../../domain/services/csvExportService';
import { calculateCourseGradeStats } from '../../domain/services/gradeCalculationService';
import { GradebookToolbar } from './gradebook/GradebookToolbar';
import { GradebookTable } from './gradebook/GradebookTable';
import { AddEvaluationModal } from './gradebook/AddEvaluationModal';
import { GradebookStatsModal } from './gradebook/GradebookStatsModal';

export const ExcelGradebook: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    enrollments,
    updateStudentGrade,
    addEvaluationColumn,
    calculateStudentFinalGrade,
    addToast,
  } = useAcademic();

  const { t, language } = useLanguage();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const localizedCourse = getLocalizedCourse(course.id, course, language);

  const courseEnrollments = useMemo(
    () => enrollments.filter((e) => e.courseId === course.id),
    [enrollments, course.id]
  );

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'APROBADO' | 'EN_RIESGO' | 'REPROBADO'>('ALL');
  const [editingCell, setEditingCell] = useState<{ studentId: string; evalId: string } | null>(null);
  const [cellInputValue, setCellInputValue] = useState<string>('');
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showNewEvalModal, setShowNewEvalModal] = useState(false);

  // Calculate sum of weights
  const totalWeight = useMemo(
    () => course.evaluations.reduce((acc, curr) => acc + curr.weight, 0),
    [course.evaluations]
  );

  // Filtered students
  const filteredStudents = useMemo(() => {
    return courseEnrollments.filter((enrollment) => {
      const matchesSearch =
        enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.studentCode.toLowerCase().includes(searchTerm.toLowerCase());

      const computed = calculateStudentFinalGrade(enrollment, course);
      const matchesStatus = statusFilter === 'ALL' || computed.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [courseEnrollments, searchTerm, statusFilter, course, calculateStudentFinalGrade]);

  // Overall class statistics calculated via domain service
  const classStats = useMemo(() => {
    return calculateCourseGradeStats(enrollments, course);
  }, [enrollments, course]);

  // Cell editing handlers
  const handleCellClick = (studentId: string, evalId: string, currentScore: number | null) => {
    setEditingCell({ studentId, evalId });
    setCellInputValue(currentScore !== null && currentScore !== undefined ? String(currentScore) : '');
  };

  const handleCellBlur = () => {
    if (!editingCell) return;
    const { studentId, evalId } = editingCell;
    const parsed = cellInputValue.trim() === '' ? null : parseFloat(cellInputValue);

    if (parsed !== null && (isNaN(parsed) || parsed < 0 || parsed > 20)) {
      addToast({
        type: 'error',
        title: t.invalidGradeTitle,
        message: t.invalidGradeMsg,
      });
    } else {
      updateStudentGrade(studentId, course.id, evalId, parsed);
    }
    setEditingCell(null);
  };

  const handleCellKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCellBlur();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  // Export to CSV via domain service
  const handleExportCSV = () => {
    exportGradebookToCSV(course, enrollments, language);
    addToast({
      type: 'success',
      title: t.csvExportedTitle,
      message: t.csvExportedMsg,
    });
  };

  const handleCreateEvaluation = (formData: {
    code: string;
    name: string;
    weight: number;
    maxScore: number;
    category: EvaluationCategory;
    date: string;
  }) => {
    addEvaluationColumn(course.id, {
      ...formData,
      isPublished: true,
    });
  };

  const triggerCurvingBonus = () => {
    courseEnrollments.forEach((enr) => {
      const firstEval = course.evaluations[0];
      if (firstEval) {
        const curr = enr.grades.find((g) => g.evaluationId === firstEval.id)?.score || 0;
        const newScore = Math.min(20, curr + 1);
        updateStudentGrade(enr.studentId, course.id, firstEval.id, newScore);
      }
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    addToast({
      type: 'success',
      title: t.bonusAppliedTitle,
      message: t.bonusAppliedMsg,
    });
  };

  const passedCount = courseEnrollments.filter(
    (e) => calculateStudentFinalGrade(e, course).status === 'APROBADO'
  ).length;
  const atRiskCount = courseEnrollments.filter(
    (e) => calculateStudentFinalGrade(e, course).status === 'EN_RIESGO'
  ).length;
  const failedCount = courseEnrollments.filter(
    (e) => calculateStudentFinalGrade(e, course).status === 'REPROBADO'
  ).length;

  return (
    <div id="excel-gradebook-container" className="space-y-6">
      {/* Top Banner / Course Title Bar */}
      <div className="bg-[#0A0A0A] rounded-2xl border border-[#262626] p-6 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#E6CA85] text-xs font-mono-code font-bold">
                {course.code}
              </span>
              <span className="text-xs text-neutral-400 font-mono-code">
                {t.semesterPeriod} • {course.credits} {t.credits}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              {t.gradebookTitle}
            </h2>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              {t.gradebookSubtitle}
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-[#121212] border border-[#262626] text-center">
              <span className="text-[10px] uppercase font-mono-code font-bold text-neutral-400 block">{t.classAverage}</span>
              <span className="font-mono-code text-base font-bold text-[#E6CA85]">{classStats.avg} / 20</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[#121212] border border-[#262626] text-center">
              <span className="text-[10px] uppercase font-mono-code font-bold text-neutral-400 block">{t.passed}</span>
              <span className="font-mono-code text-base font-bold text-emerald-400">{classStats.passRate}%</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[#121212] border border-[#262626] text-center">
              <span className="text-[10px] uppercase font-mono-code font-bold text-neutral-400 block">{t.totalEnrolled}</span>
              <span className="font-mono-code text-base font-bold text-neutral-200">{courseEnrollments.length}</span>
            </div>
          </div>
        </div>

        {/* Modular Toolbar */}
        <GradebookToolbar
          course={course}
          totalWeight={totalWeight}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          totalEnrolled={courseEnrollments.length}
          passedCount={passedCount}
          atRiskCount={atRiskCount}
          failedCount={failedCount}
          onOpenAddEvaluation={() => setShowNewEvalModal(true)}
          onExportCSV={handleExportCSV}
          onOpenStats={() => setShowStatsModal(true)}
          t={t}
        />
      </div>

      {/* Spreadsheet Container */}
      <div className="bg-[#0A0A0A] rounded-2xl border border-[#262626] shadow-md overflow-hidden">
        {/* Spreadsheet Status Header */}
        <div className="px-4 py-2.5 bg-[#121212] text-white text-xs flex items-center justify-between border-b border-[#262626]">
          <div className="flex items-center gap-2 font-mono-code text-[11px]">
            <FileSpreadsheet className="w-4 h-4 text-[#E6CA85]" />
            <span className="font-bold text-[#E6CA85]">{t.liveSpreadsheetHeader}</span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400">{t.clickCellToEdit}</span>
          </div>
          <button
            onClick={triggerCurvingBonus}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#C5A059]/20 hover:bg-[#C5A059]/30 text-[#E6CA85] border border-[#C5A059]/40 text-[11px] font-semibold cursor-pointer transition-colors"
          >
            <Sparkles className="w-3 h-3 text-[#E6CA85]" />
            <span>{t.quickCurveBonus}</span>
          </button>
        </div>

        {/* The Modular Excel Grid Table */}
        <GradebookTable
          course={course}
          filteredStudents={filteredStudents}
          editingCell={editingCell}
          cellInputValue={cellInputValue}
          onCellClick={handleCellClick}
          onCellInputChange={setCellInputValue}
          onCellBlur={handleCellBlur}
          onCellKeyDown={handleCellKeyDown}
          calculateStudentFinalGrade={calculateStudentFinalGrade}
          language={language}
          t={t}
        />

        {/* Spreadsheet Footer Summary */}
        <div className="px-4 py-3 bg-[#121212] border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
          <div className="flex items-center gap-4 font-mono-code text-[11px]">
            <span>{language === 'es' ? `Mostrando ${filteredStudents.length} de ${courseEnrollments.length} alumnos` : `Showing ${filteredStudents.length} of ${courseEnrollments.length} students`}</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">{classStats.passingCount} {t.passed}</span>
            <span>•</span>
            <span className="text-rose-400 font-semibold">{classStats.failingCount} {t.failed}</span>
          </div>
          <div className="text-[11px] text-neutral-500 italic">
            * {t.autoSaveActive}
          </div>
        </div>
      </div>

      {/* Modular Modals */}
      <AddEvaluationModal
        course={course}
        isOpen={showNewEvalModal}
        onClose={() => setShowNewEvalModal(false)}
        onAddEvaluation={handleCreateEvaluation}
        language={language}
        t={t}
      />

      <GradebookStatsModal
        course={course}
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        classStats={classStats}
        courseEnrollments={courseEnrollments}
        calculateStudentFinalGrade={calculateStudentFinalGrade}
        language={language}
        t={t}
      />
    </div>
  );
};
