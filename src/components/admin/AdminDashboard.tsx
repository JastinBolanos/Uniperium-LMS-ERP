import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { useLanguage } from '../../context/LanguageContext';
import { AdminHeroBanner } from './AdminHeroBanner';
import { ProgramsOverviewTab } from './ProgramsOverviewTab';
import { CoursesCatalogTab } from './CoursesCatalogTab';
import { ResourceAllocationView } from './ResourceAllocationView';

export const AdminDashboard: React.FC = () => {
  const { programs, courses, classrooms, addToast } = useAcademic();
  const { t, language } = useLanguage();
  const [activeAdminTab, setActiveAdminTab] = useState<'OVERVIEW' | 'RESOURCES' | 'PROGRAMS'>('OVERVIEW');

  const handleExportInstitutionalReport = () => {
    addToast({
      type: 'success',
      title: language === 'es' ? 'Reporte Institucional Generado' : 'Institutional Report Generated',
      message: language === 'es' ? 'Se descargó el consolidado de actas oficiales del ciclo 2026-I.' : 'Downloaded consolidated official grade transcripts for Term 2026-I.',
    });
  };

  return (
    <div id="admin-dashboard-container" className="space-y-6">
      {/* Top Banner & Tab Navigation */}
      <AdminHeroBanner
        programs={programs}
        classrooms={classrooms}
        activeAdminTab={activeAdminTab}
        onTabChange={setActiveAdminTab}
        onExportInstitutionalReport={handleExportInstitutionalReport}
        language={language}
        t={t}
      />

      {/* Tab 1: Overview */}
      {activeAdminTab === 'OVERVIEW' && (
        <ProgramsOverviewTab
          programs={programs}
          language={language}
          t={t}
        />
      )}

      {/* Tab 2: Resource Allocation Module */}
      {activeAdminTab === 'RESOURCES' && <ResourceAllocationView />}

      {/* Tab 3: Programs & Curricula */}
      {activeAdminTab === 'PROGRAMS' && (
        <CoursesCatalogTab
          courses={courses}
          language={language}
          t={t}
        />
      )}
    </div>
  );
};
