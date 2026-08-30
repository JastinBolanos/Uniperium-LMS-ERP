export type Language = 'es' | 'en';

export interface Translations {
  // Common & Branding
  brandTag: string;
  semesterPeriod: string;
  inProgress: string;
  role: string;
  teacher: string;
  student: string;
  admin: string;
  teacherFull: string;
  studentFull: string;
  adminFull: string;
  credits: string;
  logout: string;
  close: string;
  cancel: string;
  save: string;
  confirm: string;
  actions: string;
  status: string;
  name: string;
  code: string;
  date: string;
  time: string;
  day: string;
  score: string;
  weight: string;
  average: string;
  finalScore: string;
  passed: string;
  failed: string;
  atRisk: string;
  inProgressStatus: string;
  switchRole: string;
  activeRole: string;
  welcomeScreen: string;
  resetDemoData: string;
  roleGuide: string;
  interactingAs: string;
  
  // Header & Navigation
  semesterCourses: string;
  notifications: string;
  noNotifications: string;
  unreadAnnouncements: string;
  officialAnnouncement: string;
  systemNotification: string;
  
  // Welcome Hero
  welcomeBadge: string;
  welcomeTitle1: string;
  welcomeTitle2: string;
  welcomeSubtitle: string;
  enterPlatform: string;
  demoRoleSelection: string;
  teacherDesc: string;
  studentDesc: string;
  adminDesc: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  statStudents: string;
  statFaculty: string;
  statUptime: string;
  statSatisfaction: string;
  quickAccessAs: string;
  
  // Custom Login Methods per Role
  signIn: string;
  signInAsTeacher: string;
  signInAsStudent: string;
  signInAsAdmin: string;
  signInPrompt: string;
  enterWithCredentials: string;
  directAccess: string;
  modalLoginHeader: string;
  modalLoginDesc: string;
  teacherLoginTitle: string;
  teacherIdLabel: string;
  teacherPasswordLabel: string;
  teacherAuthMethod: string;
  teacherLoginBtn: string;
  studentLoginTitle: string;
  studentIdLabel: string;
  studentPasswordLabel: string;
  studentAuthMethod: string;
  studentLoginBtn: string;
  adminLoginTitle: string;
  adminIdLabel: string;
  adminPasswordLabel: string;
  adminAuthMethod: string;
  adminLoginBtn: string;
  quick1Click: string;
  showCredentialsToggle: string;
  hideCredentialsToggle: string;
  rememberCredentials: string;
  verifiedOfficialAccount: string;

  // Live Demo 3-in-1 Showcase
  liveDemoSectionTitle: string;
  liveDemoSectionSubtitle: string;
  liveDemoBtn: string;
  liveDemoModalTitle: string;
  liveDemoModalSubtitle: string;
  caseTeacher: string;
  caseStudent: string;
  caseAdmin: string;
  caseTeacherSubtitle: string;
  caseStudentSubtitle: string;
  caseAdminSubtitle: string;
  tryLiveSimulation: string;
  launchThisRole: string;
  allRolesComparison: string;
  demoEvaluatorNotice: string;
  interactiveGradebookTest: string;
  interactiveSimulatorTest: string;
  interactiveResourceTest: string;
  liveCalculatedOutcome: string;
  testedSuccessfully: string;
  
  // Teacher Module
  teacherPanel: string;
  teacherSubtitle: string;
  tabGradebook: string;
  tabAttendance: string;
  tabVirtualClassroom: string;
  activeCourseBadge: string;
  totalEnrolled: string;
  classAverage: string;
  attendanceRate: string;
  atRiskStudents: string;
  
  // Excel Gradebook
  gradebookTitle: string;
  gradebookSubtitle: string;
  exportExcelCsv: string;
  addColumn: string;
  totalWeight: string;
  weightValid: string;
  weightInvalid: string;
  studentName: string;
  studentId: string;
  feedback: string;
  editFeedback: string;
  deleteColumn: string;
  newEvaluationTitle: string;
  evalNameLabel: string;
  evalWeightLabel: string;
  evalMaxScoreLabel: string;
  evalTypeLabel: string;
  savingChanges: string;
  autoSaveActive: string;
  scoreSaved: string;
  searchStudentsPlaceholder: string;
  filterAll: string;
  filterPassed: string;
  filterAtRisk: string;
  filterFailed: string;
  liveSpreadsheetHeader: string;
  clickCellToEdit: string;
  quickCurveBonus: string;
  headerIndex: string;
  headerCode: string;
  headerStudent: string;
  headerWeightedAvg: string;
  headerLetter: string;
  headerCondition: string;
  noStudentsFound: string;
  invalidGradeTitle: string;
  invalidGradeMsg: string;
  csvExportedTitle: string;
  csvExportedMsg: string;
  bonusAppliedTitle: string;
  bonusAppliedMsg: string;
  statsModalTitle: string;
  statsClassAvg: string;
  statsHighest: string;
  statsLowest: string;
  statsPassingCount: string;
  statsFailingCount: string;
  gradeDistribution: string;
  
  // Attendance Tracker
  attendanceTitle: string;
  attendanceSubtitle: string;
  newSessionBtn: string;
  markAllPresent: string;
  markAllAbsent: string;
  sessionTopic: string;
  sessionDate: string;
  modality: string;
  virtual: string;
  hybrid: string;
  lab: string;
  present: string;
  late: string;
  justified: string;
  absent: string;
  attendanceSummary: string;
  faWarning: string;
  createSessionModalTitle: string;
  topicLabel: string;
  dateLabel: string;
  modalityLabel: string;
  attendanceLegend: string;
  filterAttendancePlaceholder: string;
  allPresentSession: string;
  attendancePctHeader: string;
  faStatusHeader: string;
  absencesLabel: string;
  tardiesLabel: string;
  attendanceLimitNotice: string;
  biometricSyncBadge: string;
  
  // Virtual Classroom
  classroomTitle: string;
  classroomSubtitle: string;
  launchSession: string;
  endSession: string;
  copyMeetingLink: string;
  directRoomLink: string;
  serverSpecs: string;
  cloudGpuCluster: string;
  roomCapacity: string;
  joinSession: string;
  openClassroom: string;
  gpuActiveNotice: string;
  liveNowBadge: string;
  roomWaitingBadge: string;
  meetingIdLabel: string;
  passcodeLabel: string;
  noPasscodeRequired: string;
  openDirectRoomBtn: string;
  linkCopiedToast: string;
  linkCopiedMsg: string;
  sessionEndedToast: string;
  sessionEndedMsg: string;
  sessionLiveToast: string;
  sessionLiveMsg: string;
  
  // Student Module
  studentPortalTitle: string;
  studentPortalSubtitle: string;
  studentGpa: string;
  studentCompletedCredits: string;
  studentEnrolledCourses: string;
  studentAttendanceAverage: string;
  gradeOverview: string;
  gpaSimulator: string;
  gpaSimulatorDesc: string;
  targetGpa: string;
  requiredFinalScore: string;
  scheduleTimetable: string;
  announcementsTab: string;
  evaluationsBreakdown: string;
  teacherFeedback: string;
  noFeedbackYet: string;
  currentAttendance: string;
  absencesCount: string;
  attendanceNormal: string;
  attendanceWarning: string;
  meritHonorRoll: string;
  completedCreditsProgress: string;
  tabOverviewStudent: string;
  tabGradesStudent: string;
  tabScheduleStudent: string;
  tabAttendanceStudent: string;
  tabSimulatorStudent: string;
  selectSimCourse: string;
  simTargetNotice: string;
  simPossibleSuccess: string;
  simNotPossibleAlert: string;
  allEvaluationsCompleted: string;
  celebrateSimulationBtn: string;
  weeklyScheduleTitle: string;
  
  // Admin Module
  adminTitle: string;
  adminSubtitle: string;
  adminTabOverview: string;
  adminTabResources: string;
  adminTabPrograms: string;
  exportInstitutionalReport: string;
  kpiTotalStudents: string;
  kpiRetentionRate: string;
  kpiProgramsCount: string;
  kpiCloudEnvironments: string;
  facultiesOverview: string;
  courseCatalog: string;
  courseCatalogDesc: string;
  director: string;
  duration: string;
  semesters: string;
  faculty: string;
  institutionalControlPanel: string;
  activeFacultiesCount: string;
  highEfficiencyBadge: string;
  dropoutRiskRate: string;
  accreditedPrograms: string;
  coursesTaughtCount: string;
  zeroIncidentsReported: string;
  
  // Resource Allocation
  resourceTitle: string;
  resourceSubtitle: string;
  newAllocationBtn: string;
  assignedSlots: string;
  availableCapacity: string;
  conflictDetected: string;
  allocateSuccess: string;
  releaseSlot: string;
  testDirectLink: string;
  noReservations: string;
  selectResourceModalTitle: string;
  courseAndTeacherLabel: string;
  dayOfWeekLabel: string;
  startTimeLabel: string;
  endTimeLabel: string;
  digitalInfrastructureMgmt: string;
  activeEnvironments: string;
  resourceAllocationError: string;
  
  // Days of week
  dayMon: string;
  dayTue: string;
  dayWed: string;
  dayThu: string;
  dayFri: string;
  daySat: string;
  
  // Quick Help Modal
  helpModalTitle: string;
  helpModalSubtitle: string;
  teacherRoleInfo: string;
  studentRoleInfo: string;
  adminRoleInfo: string;
}

export const translations: Record<Language, Translations> = {
  es: {
    brandTag: 'LMS PRO',
    semesterPeriod: 'Período 2026-I',
    inProgress: 'En Curso',
    role: 'Rol',
    teacher: 'Docente',
    student: 'Estudiante',
    admin: 'Administrador',
    teacherFull: 'Profesor / Docente',
    studentFull: 'Estudiante',
    adminFull: 'Administrador Institucional',
    credits: 'Créditos',
    logout: 'Cerrar Sesión',
    close: 'Cerrar',
    cancel: 'Cancelar',
    save: 'Guardar',
    confirm: 'Entendido, continuar',
    actions: 'Acciones',
    status: 'Estado',
    name: 'Nombre',
    code: 'Código',
    date: 'Fecha',
    time: 'Horario',
    day: 'Día',
    score: 'Nota',
    weight: 'Peso',
    average: 'Promedio',
    finalScore: 'Nota Final',
    passed: 'Aprobado',
    failed: 'Reprobado',
    atRisk: 'En Riesgo',
    inProgressStatus: 'Cursando',
    switchRole: 'Cambiar Perfil de Usuario',
    activeRole: 'Rol Activo',
    welcomeScreen: 'Pantalla de Bienvenida',
    resetDemoData: 'Resetear Datos Demo',
    roleGuide: 'Guía de Roles',
    interactingAs: 'Estás interactuando como:',
    
    semesterCourses: 'Asignaturas del Semestre',
    notifications: 'Notificaciones',
    noNotifications: 'Sin notificaciones pendientes',
    unreadAnnouncements: 'comunicados institucionales activos',
    officialAnnouncement: 'Comunicado Oficial',
    systemNotification: 'Alerta del Sistema',
    
    welcomeBadge: 'Sistema de Gestión Académica & Instituto Virtual',
    welcomeTitle1: 'Gestión Integral para Educación Superior',
    welcomeTitle2: 'Uniperium Academic Portal',
    welcomeSubtitle: 'Estructuración de jerarquías de datos, libro de calificaciones interactivo tipo hoja de cálculo en tiempo real, seguimiento matricial de asistencia y control centralizado de aulas virtuales.',
    enterPlatform: 'Ir al Panel Principal',
    demoRoleSelection: 'SELECCIONA UN ROL PARA INGRESAR AL SISTEMA',
    teacherDesc: 'Acceso al Libro de Calificaciones tipo Excel con edición en celda, ponderaciones automáticas, matriz de asistencia y apertura de aulas virtuales.',
    studentDesc: 'Portal académico con visualización de calificaciones desglosadas, simulador de nota para aprobar, registro de asistencias y horario de clases virtuales.',
    adminDesc: 'Supervisión institucional, asignación de recursos y aulas virtuales con detector de conflictos, mallas curriculares, actas oficiales y nóminas docentes.',
    feature1Title: 'Edición de notas en línea y fórmulas',
    feature1Desc: 'Cálculo de promedios ponderados en tiempo real con validación matemática de fórmulas y redondeo institucional.',
    feature2Title: 'Lanzamiento de Zoom & Clúster GPU',
    feature2Desc: 'Integración y lanzamiento directo de sesiones Zoom, Google Meet y Clústers GPU para laboratorios.',
    feature3Title: 'Control de inasistencias en lote',
    feature3Desc: 'Seguimiento riguroso de inasistencias con alertas preventivas por inhabilitación automática (FA).',
    statStudents: 'Estudiantes',
    statFaculty: 'Docentes',
    statUptime: 'Disponibilidad Cloud',
    statSatisfaction: 'Retención',
    quickAccessAs: 'Ingresar como',

    // Custom Login Methods per Role
    signIn: 'Iniciar Sesión',
    signInAsTeacher: 'Iniciar Sesión como Docente',
    signInAsStudent: 'Iniciar Sesión como Estudiante',
    signInAsAdmin: 'Iniciar Sesión como Administrador',
    signInPrompt: 'Acceder al Portal Institucional',
    enterWithCredentials: 'Ingresar con Credenciales',
    directAccess: 'Ingreso Rápido Directo',
    modalLoginHeader: 'Portal de Autenticación Institucional',
    modalLoginDesc: 'Ingresa con las credenciales de tu cuenta para acceder a las herramientas correspondientes a tu rol.',
    teacherLoginTitle: 'Portal Docente • Autenticación',
    teacherIdLabel: 'ID Docente / Correo Institucional',
    teacherPasswordLabel: 'Clave de Acceso Académico',
    teacherAuthMethod: 'Firma Digital & Certificado Docente',
    teacherLoginBtn: 'Ingresar al Aula Docente',
    studentLoginTitle: 'Portal del Estudiante • Autenticación',
    studentIdLabel: 'Código de Matrícula / Carné Universitario',
    studentPasswordLabel: 'PIN de Acceso / Contraseña',
    studentAuthMethod: 'Matrícula Vigente • Semestre 2026-I',
    studentLoginBtn: 'Ingresar al Portal Estudiantil',
    adminLoginTitle: 'Consola Directiva • Autenticación Máster',
    adminIdLabel: 'Credencial Directiva / ID Administrador',
    adminPasswordLabel: 'Llave Maestra / Token 2FA',
    adminAuthMethod: 'Nivel: Super Admin Institucional',
    adminLoginBtn: 'Ingresar a la Consola Administrativa',
    quick1Click: 'Acceso Rápido (1-Clic)',
    showCredentialsToggle: 'Ver Credenciales',
    hideCredentialsToggle: 'Ocultar Credenciales',
    rememberCredentials: 'Recordar credenciales en este equipo',
    verifiedOfficialAccount: 'Cuenta Oficial Verificada',

    // Live Demo 3-in-1 Showcase
    liveDemoSectionTitle: '¿No eres cliente o estás evaluando la plataforma?',
    liveDemoSectionSubtitle: 'Explora una demostración interactiva en vivo con los 3 casos de uso reales (Docente, Estudiante, Administrador) y comprueba cómo funciona cada rol sin necesidad de registrarte.',
    liveDemoBtn: 'Ver Demostración en Vivo de los 3 Casos (Interactiva)',
    liveDemoModalTitle: 'Demostración en Vivo Interactiva • 3 Casos de Uso',
    liveDemoModalSubtitle: 'Experimenta las funciones clave de cada perfil como si fueras un usuario activo antes de iniciar sesión.',
    caseTeacher: 'Caso 1: El Docente en Acción',
    caseStudent: 'Caso 2: La Estudiante en Acción',
    caseAdmin: 'Caso 3: La Administración Institucional',
    caseTeacherSubtitle: 'Gestión de calificaciones en tiempo real, fórmulas ponderadas y aulas virtuales.',
    caseStudentSubtitle: 'Simulador predictivo de nota para aprobar, avance curricular y horarios.',
    caseAdminSubtitle: 'Supervisión global de carreras, asignación de recursos y métricas de retención.',
    tryLiveSimulation: 'Probar Simulador Interactivo',
    launchThisRole: 'Ingresar con este Perfil en Vivo',
    allRolesComparison: 'Comparativa Rápida de los 3 Roles',
    demoEvaluatorNotice: 'Modo Evaluación Libre: Datos reales simulados para pruebas inmediatas.',
    interactiveGradebookTest: 'Simulador de Planilla Docente: Haz clic para cambiar notas y ver el recálculo.',
    interactiveSimulatorTest: 'Simulador Estudiantil: Desliza tu nota objetivo para calcular lo necesario.',
    interactiveResourceTest: 'Simulador Administrativo: Prueba la asignación de recursos y detección de colisiones.',
    liveCalculatedOutcome: 'Resultado Calculado en Tiempo Real',
    testedSuccessfully: '¡Simulación Ejecutada con Éxito!',
    
    teacherPanel: 'Espacio de Trabajo Docente',
    teacherSubtitle: 'Gestiona evaluaciones, planillas interactivas de notas, asistencia y salas virtuales.',
    tabGradebook: 'Libro de Calificaciones (Tipo Excel)',
    tabAttendance: 'Control de Asistencias',
    tabVirtualClassroom: 'Aula Virtual & Transmisión',
    activeCourseBadge: 'Asignatura Activa',
    totalEnrolled: 'Estudiantes',
    classAverage: 'Promedio Grupal',
    attendanceRate: 'Asistencia Promedio',
    atRiskStudents: 'En Riesgo de Desaprobación',
    
    gradebookTitle: 'Libro de Calificaciones Interactivo',
    gradebookSubtitle: 'Edición en celda tipo Excel con recálculo dinámico de fórmulas ponderadas en escala vigesimal (0.00 – 20.00).',
    exportExcelCsv: 'Exportar CSV',
    addColumn: 'Nueva Evaluación',
    totalWeight: 'Ponderación Total de Rúbricas:',
    weightValid: '(Distribución Completa 100%)',
    weightInvalid: '(No suma 100%)',
    studentName: 'Estudiante',
    studentId: 'Código',
    feedback: 'Retroalimentación Docente',
    editFeedback: 'Editar Observación',
    deleteColumn: 'Eliminar Columna',
    newEvaluationTitle: 'Registrar Nueva Evaluación',
    evalNameLabel: 'Nombre descriptivo de la evaluación',
    evalWeightLabel: 'Peso porcentual en el promedio (%)',
    evalMaxScoreLabel: 'Puntaje Máximo',
    evalTypeLabel: 'Categoría Académica',
    savingChanges: 'Guardando...',
    autoSaveActive: 'Modo volátil: Calificaciones editables en memoria (se reinician al actualizar)',
    scoreSaved: 'Calificación actualizada con éxito',
    searchStudentsPlaceholder: 'Buscar por nombre o código de estudiante...',
    filterAll: 'Todos',
    filterPassed: 'Aprobados',
    filterAtRisk: 'En Riesgo',
    filterFailed: 'Reprobados',
    liveSpreadsheetHeader: 'HOJA DE CALIFICACIONES EN VIVO',
    clickCellToEdit: 'Haz clic en cualquier celda para editar el puntaje',
    quickCurveBonus: 'Curva Rápida (+1 pto EP1)',
    headerIndex: '#',
    headerCode: 'Código',
    headerStudent: 'Estudiante',
    headerWeightedAvg: 'Prom. Ponderado',
    headerLetter: 'Letra',
    headerCondition: 'Condición',
    noStudentsFound: 'No se encontraron estudiantes que coincidan con los filtros aplicados.',
    invalidGradeTitle: 'Calificación Inválida',
    invalidGradeMsg: 'La nota debe ser un valor numérico entre 0.00 y 20.00 puntos.',
    csvExportedTitle: 'Acta de Calificaciones Exportada',
    csvExportedMsg: 'Se descargó el archivo CSV compatible con Excel.',
    bonusAppliedTitle: 'Bonificación Aplicada',
    bonusAppliedMsg: 'Se aplicó +1.0 pto de bonificación a la primera evaluación.',
    statsModalTitle: 'Estadísticas Globales de la Sección',
    statsClassAvg: 'Promedio de Clase',
    statsHighest: 'Calificación Más Alta',
    statsLowest: 'Calificación Más Baja',
    statsPassingCount: 'Alumnos Aprobados',
    statsFailingCount: 'Alumnos Reprobados',
    gradeDistribution: 'Distribución de Calificaciones',
    
    attendanceTitle: 'Matriz de Asistencia en Tiempo Real',
    attendanceSubtitle: 'Haz clic en cada celda para alternar el estado (Presente, Tardanza, Justificada, Falta).',
    newSessionBtn: 'Nueva Sesión de Clase',
    markAllPresent: 'Marcar Todos Presentes',
    markAllAbsent: 'Marcar Todos Ausentes',
    sessionTopic: 'Tema de la Sesión',
    sessionDate: 'Fecha',
    modality: 'Modalidad',
    virtual: 'Virtual (Online)',
    hybrid: 'Híbrida',
    lab: 'Laboratorio Especializado',
    present: 'Presente',
    late: 'Tardanza',
    justified: 'Justificada',
    absent: 'Falta',
    attendanceSummary: 'Resumen de Asistencia',
    faWarning: 'Riesgo Crítico de Inhabilitación (FA)',
    createSessionModalTitle: 'Registrar Nueva Sesión de Clase',
    topicLabel: 'Tema o Unidad Académica',
    dateLabel: 'Fecha de la Sesión',
    modalityLabel: 'Modalidad de Impartición',
    attendanceLegend: 'Leyenda:',
    filterAttendancePlaceholder: 'Filtrar estudiante en lista de asistencia...',
    allPresentSession: 'Todos',
    attendancePctHeader: '% Asist.',
    faStatusHeader: 'Estado FA',
    absencesLabel: 'Faltas',
    tardiesLabel: 'Tardanzas',
    attendanceLimitNotice: 'Límite de Inasistencia: 20%',
    biometricSyncBadge: 'Control Biométrico & Sincrónico',
    
    classroomTitle: 'Aula Virtual & Transmisión',
    classroomSubtitle: 'Gestión y orquestación de la sesión sincrónica de clase. Transmite audio/video HD, comparte entornos de laboratorio en la nube y graba actas en tiempo real.',
    launchSession: 'Iniciar Clase Virtual',
    endSession: 'Finalizar Transmisión',
    copyMeetingLink: 'Copiar Enlace',
    directRoomLink: 'Enlace Directo de la Sala',
    serverSpecs: 'Especificaciones del Servidor',
    cloudGpuCluster: 'Clúster GPU & Cómputo',
    roomCapacity: 'Capacidad de Usuarios',
    joinSession: 'Unirse al Aula',
    openClassroom: 'Abrir Sala Directa',
    gpuActiveNotice: 'Instancia GPU aprovisionada y lista para procesamiento en tiempo real.',
    liveNowBadge: 'EN VIVO AHORA',
    roomWaitingBadge: 'SALA EN ESPERA',
    meetingIdLabel: 'ID de Reunión',
    passcodeLabel: 'Código de Acceso / Passcode',
    noPasscodeRequired: 'Sin clave requerida',
    openDirectRoomBtn: 'Abrir Sala Directa',
    linkCopiedToast: 'Enlace Copiado',
    linkCopiedMsg: 'URL de acceso copiada al portapapeles.',
    sessionEndedToast: 'Sesión Finalizada',
    sessionEndedMsg: 'Se ha cerrado la sesión sincrónica para los alumnos.',
    sessionLiveToast: '¡Aula Virtual Transmitiendo!',
    sessionLiveMsg: 'Los estudiantes ya pueden conectarse a la sala.',
    
    studentPortalTitle: 'Portal del Estudiante',
    studentPortalSubtitle: 'Monitorea tu rendimiento académico, simula tus notas finales y accede a tus clases en vivo.',
    studentGpa: 'Promedio Ponderado Acumulado (GPA)',
    studentCompletedCredits: 'Créditos Aprobados',
    studentEnrolledCourses: 'Cursos Inscritos',
    studentAttendanceAverage: 'Asistencia Global',
    gradeOverview: 'Boleta de Calificaciones',
    gpaSimulator: 'Simulador Predictivo de Nota Final',
    gpaSimulatorDesc: 'Calcula cuántos puntos se requieren en tus próximas evaluaciones para aprobar la asignatura con la meta deseada.',
    targetGpa: 'Nota Meta Deseada:',
    requiredFinalScore: 'Puntaje Requerido en Examen Final:',
    scheduleTimetable: 'Horario Semanal',
    announcementsTab: 'Avisos Institucionales',
    evaluationsBreakdown: 'Desglose de Evaluaciones',
    teacherFeedback: 'Comentario del Docente:',
    noFeedbackYet: 'Sin comentarios adicionales por el momento.',
    currentAttendance: 'Tu Asistencia en este curso',
    absencesCount: 'Faltas Registradas:',
    attendanceNormal: 'Asistencia Regular',
    attendanceWarning: '¡Cuidado! Te acercas al límite de faltas permitidas.',
    meritHonorRoll: 'Tercio Superior (Top 5%)',
    completedCreditsProgress: 'Créditos Completados',
    tabOverviewStudent: 'Resumen Académico',
    tabGradesStudent: 'Boleta de Notas',
    tabScheduleStudent: 'Horario Semanal',
    tabAttendanceStudent: 'Asistencias',
    tabSimulatorStudent: 'Simulador de Nota',
    selectSimCourse: 'Seleccionar Asignatura a Simular',
    simTargetNotice: 'Ajusta tu meta para calcular el puntaje necesario en el Examen Final.',
    simPossibleSuccess: '¡Meta Alcanzable!',
    simNotPossibleAlert: 'La meta requerida excede la escala máxima de 20 puntos.',
    allEvaluationsCompleted: 'Todas las evaluaciones de este curso ya han sido calificadas.',
    celebrateSimulationBtn: 'Celebrar Meta Proyectada',
    weeklyScheduleTitle: 'Horario de Clases Sincrónicas',
    
    adminTitle: 'Dirección de Operaciones & Tecnología Educativa',
    adminSubtitle: 'Supervisión de jerarquías académicas, infraestructura de cómputo en la nube, asignación de aulas virtuales y validación de actas oficiales de notas.',
    adminTabOverview: 'Vista General & Facultades',
    adminTabResources: 'Asignador de Recursos & Aulas Virtuales',
    adminTabPrograms: 'Estructura de Carreras & Mallas',
    exportInstitutionalReport: 'Exportar Actas Oficiales (PDF/CSV)',
    kpiTotalStudents: 'Estudiantes Matriculados',
    kpiRetentionRate: 'Tasa de Retención',
    kpiProgramsCount: 'Programas y Carreras',
    kpiCloudEnvironments: 'Aulas & Servidores GPU',
    facultiesOverview: 'Facultades y Escuelas Académicas',
    courseCatalog: 'Catálogo General de Asignaturas (Semestre 2026-I)',
    courseCatalogDesc: 'Estructura jerárquica curricular, créditos académicos y carga lectiva docente.',
    director: 'Director:',
    duration: 'Duración:',
    semesters: 'Ciclos',
    faculty: 'Facultad:',
    institutionalControlPanel: 'Panel de Control Institucional',
    activeFacultiesCount: '4 Facultades activas',
    highEfficiencyBadge: 'Alta Eficiencia',
    dropoutRiskRate: 'Riesgo de deserción < 1.6%',
    accreditedPrograms: 'Acreditados',
    coursesTaughtCount: '168 Asignaturas dictadas',
    zeroIncidentsReported: 'Zero incidentes reportados',
    
    resourceTitle: 'Asignación de Recursos & Aulas Virtuales',
    resourceSubtitle: 'Orquestación de clústers GPU en la nube, licencias Zoom/Meet y aulas híbridas con validador de colisiones en tiempo real.',
    newAllocationBtn: 'Nueva Asignación de Horario',
    assignedSlots: 'Bloques Asignados',
    availableCapacity: 'Capacidad Disponible',
    conflictDetected: '¡Conflicto de Horario detectado! El recurso ya se encuentra ocupado en ese horario.',
    allocateSuccess: 'Horario asignado exitosamente al recurso.',
    releaseSlot: 'Liberar espacio',
    testDirectLink: 'Probar Enlace Directo',
    noReservations: 'Este recurso no cuenta con reservas asignadas en la semana. Está disponible al 100%.',
    selectResourceModalTitle: 'Asignar Recurso / Aula Virtual',
    courseAndTeacherLabel: 'Asignatura & Docente',
    dayOfWeekLabel: 'Día de la Semana',
    startTimeLabel: 'Hora Inicio',
    endTimeLabel: 'Hora Término',
    digitalInfrastructureMgmt: 'Gestión de Infraestructura Digital',
    activeEnvironments: 'Entornos Activos',
    resourceAllocationError: 'Error de Asignación',
    
    dayMon: 'Lunes',
    dayTue: 'Martes',
    dayWed: 'Miércoles',
    dayThu: 'Jueves',
    dayFri: 'Viernes',
    daySat: 'Sábado',
    
    helpModalTitle: 'Demostración de Roles Complejos en Uniperium LMS',
    helpModalSubtitle: 'Puedes alternar entre los 3 roles en cualquier momento desde el selector superior.',
    teacherRoleInfo: 'Permite editar en línea celdas tipo Excel en el Libro de Calificaciones (fórmulas automáticas de promedio ponderado), control de Asistencias por fecha con cálculo de riesgo de inasistencia (FA) y apertura de sesiones en Aulas Virtuales.',
    studentRoleInfo: 'Acceso a la boleta desglosada con rúbricas y feedback docente, Simulador Predictivo de Examen Final (calcula cuántos puntos se requieren para aprobar), horario semanal y enlace a laboratorios en la nube.',
    adminRoleInfo: 'Supervisión general institucional, Asignador de Recursos y Aulas Virtuales con detector de conflictos de horario en tiempo real, catálogo de carreras y actas oficiales.',
  },
  en: {
    brandTag: 'LMS PRO',
    semesterPeriod: 'Term 2026-I',
    inProgress: 'In Progress',
    role: 'Role',
    teacher: 'Faculty',
    student: 'Student',
    admin: 'Administrator',
    teacherFull: 'Professor / Faculty',
    studentFull: 'Student',
    adminFull: 'Institutional Admin',
    credits: 'Credits',
    logout: 'Log Out',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Understood, continue',
    actions: 'Actions',
    status: 'Status',
    name: 'Name',
    code: 'Code',
    date: 'Date',
    time: 'Time',
    day: 'Day',
    score: 'Grade',
    weight: 'Weight',
    average: 'Average',
    finalScore: 'Final Grade',
    passed: 'Passed',
    failed: 'Failed',
    atRisk: 'At Risk',
    inProgressStatus: 'In Progress',
    switchRole: 'Switch User Profile',
    activeRole: 'Active Role',
    welcomeScreen: 'Welcome Screen',
    resetDemoData: 'Reset Demo Data',
    roleGuide: 'Role Guide',
    interactingAs: 'You are currently interacting as:',
    
    semesterCourses: 'Semester Courses',
    notifications: 'Notifications',
    noNotifications: 'No pending notifications',
    unreadAnnouncements: 'active institutional announcements',
    officialAnnouncement: 'Official Announcement',
    systemNotification: 'System Alert',
    
    welcomeBadge: 'Academic Management System & Virtual Institute',
    welcomeTitle1: 'Comprehensive Management for Higher Education',
    welcomeTitle2: 'Uniperium Academic Portal',
    welcomeSubtitle: 'Hierarchical academic structures, live spreadsheet-style gradebooks with dynamic formula recalculation, matrix attendance tracking, and centralized virtual room orchestration.',
    enterPlatform: 'Enter Main Dashboard',
    demoRoleSelection: 'SELECT A ROLE TO ENTER THE SYSTEM',
    teacherDesc: 'Excel-style Gradebook access with in-cell editing, automatic weighted averages, attendance matrices, and virtual classroom launcher.',
    studentDesc: 'Student portal with breakdown of graded evaluations, predictive final score simulator, attendance tracking, and weekly schedules.',
    adminDesc: 'Institutional oversight, resource and GPU allocation with real-time schedule conflict detector, degree catalogs, and official transcripts.',
    feature1Title: 'Live in-cell grade entry & formulas',
    feature1Desc: 'Real-time weighted averages calculation with mathematical formula validation and institutional rounding.',
    feature2Title: 'Zoom & Cloud GPU Cluster launcher',
    feature2Desc: 'Direct integration and launch of Zoom, Google Meet, and GPU compute clusters for labs.',
    feature3Title: 'Batch attendance & absence alerts',
    feature3Desc: 'Rigorous absence tracking with preventative alerts for automatic attendance disqualification (FA).',
    statStudents: 'Students',
    statFaculty: 'Faculty',
    statUptime: 'Cloud Uptime',
    statSatisfaction: 'Retention',
    quickAccessAs: 'Sign in as',

    // Custom Login Methods per Role
    signIn: 'Sign In',
    signInAsTeacher: 'Sign In as Faculty',
    signInAsStudent: 'Sign In as Student',
    signInAsAdmin: 'Sign In as Administrator',
    signInPrompt: 'Access Institutional Portal',
    enterWithCredentials: 'Log In with Credentials',
    directAccess: 'Direct Quick Access',
    modalLoginHeader: 'Institutional Authentication Portal',
    modalLoginDesc: 'Enter your verified account credentials to access your dedicated role tools and workspace.',
    teacherLoginTitle: 'Faculty Portal • Authentication',
    teacherIdLabel: 'Faculty ID / Institutional Email',
    teacherPasswordLabel: 'Academic Access Key',
    teacherAuthMethod: 'Digital Signature & Faculty SSO',
    teacherLoginBtn: 'Sign In to Faculty Portal',
    studentLoginTitle: 'Student Portal • Authentication',
    studentIdLabel: 'Student ID / Enrollment Code',
    studentPasswordLabel: 'Student PIN / Password',
    studentAuthMethod: 'Active Term • 2026-I Enrollment',
    studentLoginBtn: 'Sign In to Student Portal',
    adminLoginTitle: 'Directorate Console • Master Auth',
    adminIdLabel: 'Executive Credential / Admin ID',
    adminPasswordLabel: 'Master Key / 2FA Token',
    adminAuthMethod: 'Access Level: Institutional Super Admin',
    adminLoginBtn: 'Sign In to Admin Console',
    quick1Click: 'Fast Access (1-Click)',
    showCredentialsToggle: 'View Credentials',
    hideCredentialsToggle: 'Hide Credentials',
    rememberCredentials: 'Remember credentials on this device',
    verifiedOfficialAccount: 'Verified Official Account',

    // Live Demo 3-in-1 Showcase
    liveDemoSectionTitle: 'Not a client or evaluating our platform?',
    liveDemoSectionSubtitle: 'Explore a live interactive showcase featuring all 3 real-world user personas (Faculty, Student, Administrator) and test their workflow without needing to sign up.',
    liveDemoBtn: 'Live Interactive Demo: 3-in-1 Role Showcase',
    liveDemoModalTitle: 'Live Interactive Showcase • 3 Real-World Roles',
    liveDemoModalSubtitle: 'Experience the core features of each profile as if you were an active user before signing in.',
    caseTeacher: 'Case 1: Faculty in Action',
    caseStudent: 'Case 2: Student in Action',
    caseAdmin: 'Case 3: Institutional Administration',
    caseTeacherSubtitle: 'Live gradebook management, dynamic weighted formulas, and virtual classrooms.',
    caseStudentSubtitle: 'Predictive passing grade simulator, credit tracking, and live schedule.',
    caseAdminSubtitle: 'Global degree oversight, cloud resource allocation, and student retention KPIs.',
    tryLiveSimulation: 'Test Interactive Playground',
    launchThisRole: 'Launch Live with this Profile',
    allRolesComparison: 'Quick 3-in-1 Role Comparison',
    demoEvaluatorNotice: 'Open Evaluation Mode: Preloaded real data for instant testing.',
    interactiveGradebookTest: 'Faculty Sheet Simulator: Click to change grades and watch the recalculation.',
    interactiveSimulatorTest: 'Student Simulator: Slide your target grade to calculate what you need.',
    interactiveResourceTest: 'Admin Simulator: Test cloud resource allocation and collision detection.',
    liveCalculatedOutcome: 'Real-Time Calculated Outcome',
    testedSuccessfully: 'Simulation Executed Successfully!',
    
    teacherPanel: 'Faculty Workspace',
    teacherSubtitle: 'Manage evaluations, live gradebooks, attendance sheets, and virtual classrooms.',
    tabGradebook: 'Gradebook (Excel Grid)',
    tabAttendance: 'Attendance Control',
    tabVirtualClassroom: 'Virtual Classroom & Stream',
    activeCourseBadge: 'Active Course',
    totalEnrolled: 'Students',
    classAverage: 'Class Average',
    attendanceRate: 'Average Attendance',
    atRiskStudents: 'Students At Risk',
    
    gradebookTitle: 'Interactive Gradebook Sheet',
    gradebookSubtitle: 'In-cell spreadsheet editing with dynamic weighted formula recalculation on a 0.00 – 20.00 scale.',
    exportExcelCsv: 'Export CSV',
    addColumn: 'New Evaluation',
    totalWeight: 'Total Rubric Weighting:',
    weightValid: '(Complete 100% Distribution)',
    weightInvalid: '(Does not equal 100%)',
    studentName: 'Student',
    studentId: 'ID',
    feedback: 'Instructor Feedback',
    editFeedback: 'Edit Feedback',
    deleteColumn: 'Delete Column',
    newEvaluationTitle: 'Create New Evaluation Column',
    evalNameLabel: 'Descriptive Evaluation Name',
    evalWeightLabel: 'Weight percentage in average (%)',
    evalMaxScoreLabel: 'Max Score',
    evalTypeLabel: 'Academic Category',
    savingChanges: 'Saving...',
    autoSaveActive: 'Volatile mode: In-memory editable grades (reset upon page refresh)',
    scoreSaved: 'Grade updated successfully',
    searchStudentsPlaceholder: 'Search by student name or student ID...',
    filterAll: 'All',
    filterPassed: 'Passed',
    filterAtRisk: 'At Risk',
    filterFailed: 'Failed',
    liveSpreadsheetHeader: 'LIVE SPREADSHEET GRADEBOOK',
    clickCellToEdit: 'Click any cell to edit grade score',
    quickCurveBonus: 'Quick Curve (+1 pt Midterm)',
    headerIndex: '#',
    headerCode: 'ID',
    headerStudent: 'Student',
    headerWeightedAvg: 'Weighted Avg.',
    headerLetter: 'Letter',
    headerCondition: 'Status',
    noStudentsFound: 'No students found matching the selected filters.',
    invalidGradeTitle: 'Invalid Grade Score',
    invalidGradeMsg: 'Grade must be a numeric score between 0.00 and 20.00 points.',
    csvExportedTitle: 'Grade Transcript Exported',
    csvExportedMsg: 'Excel-compatible CSV file downloaded successfully.',
    bonusAppliedTitle: 'Curve Bonus Applied',
    bonusAppliedMsg: '+1.0 pt bonus applied to the first evaluation.',
    statsModalTitle: 'Section Performance Analytics',
    statsClassAvg: 'Class Average',
    statsHighest: 'Highest Grade',
    statsLowest: 'Lowest Grade',
    statsPassingCount: 'Passing Students',
    statsFailingCount: 'Failing Students',
    gradeDistribution: 'Grade Distribution',
    
    attendanceTitle: 'Real-Time Attendance Matrix',
    attendanceSubtitle: 'Click any cell to cycle status (Present, Late, Excused, Absent).',
    newSessionBtn: 'New Class Session',
    markAllPresent: 'Mark All Present',
    markAllAbsent: 'Mark All Absent',
    sessionTopic: 'Session Topic',
    sessionDate: 'Date',
    modality: 'Modality',
    virtual: 'Virtual (Online)',
    hybrid: 'Hybrid',
    lab: 'Specialized Lab',
    present: 'Present',
    late: 'Late',
    justified: 'Excused',
    absent: 'Absent',
    attendanceSummary: 'Attendance Summary',
    faWarning: 'Critical Risk of Disqualification (FA)',
    createSessionModalTitle: 'Log New Class Session',
    topicLabel: 'Topic / Unit Name',
    dateLabel: 'Session Date',
    modalityLabel: 'Delivery Modality',
    attendanceLegend: 'Legend:',
    filterAttendancePlaceholder: 'Filter student in attendance list...',
    allPresentSession: 'All',
    attendancePctHeader: '% Att.',
    faStatusHeader: 'FA Status',
    absencesLabel: 'Absences',
    tardiesLabel: 'Tardies',
    attendanceLimitNotice: 'Absence Ceiling: 20%',
    biometricSyncBadge: 'Biometric & Synchronous Control',
    
    classroomTitle: 'Virtual Classroom & Live Stream',
    classroomSubtitle: 'Manage and orchestrate live synchronous class sessions. Stream HD audio/video, share cloud lab environments, and log meeting attendance in real-time.',
    launchSession: 'Start Virtual Class',
    endSession: 'End Live Stream',
    copyMeetingLink: 'Copy Link',
    directRoomLink: 'Direct Room URL',
    serverSpecs: 'Server Specifications',
    cloudGpuCluster: 'GPU Compute Cluster',
    roomCapacity: 'User Capacity',
    joinSession: 'Join Classroom',
    openClassroom: 'Open Direct Room',
    gpuActiveNotice: 'GPU compute instance provisioned and ready for real-time processing.',
    liveNowBadge: 'LIVE NOW',
    roomWaitingBadge: 'ROOM ON STANDBY',
    meetingIdLabel: 'Meeting ID',
    passcodeLabel: 'Passcode / Access Code',
    noPasscodeRequired: 'No password required',
    openDirectRoomBtn: 'Open Direct Room',
    linkCopiedToast: 'Link Copied',
    linkCopiedMsg: 'Access URL copied to clipboard.',
    sessionEndedToast: 'Session Ended',
    sessionEndedMsg: 'Synchronous room has been closed for students.',
    sessionLiveToast: 'Virtual Classroom Streaming!',
    sessionLiveMsg: 'Students can now join the live room.',
    
    studentPortalTitle: 'Student Portal',
    studentPortalSubtitle: 'Track your academic progress, simulate your final grades, and join your live virtual classrooms.',
    studentGpa: 'Cumulative GPA (PPA)',
    studentCompletedCredits: 'Credits Earned',
    studentEnrolledCourses: 'Enrolled Courses',
    studentAttendanceAverage: 'Overall Attendance',
    gradeOverview: 'Academic Transcript',
    gpaSimulator: 'Predictive Final Grade Simulator',
    gpaSimulatorDesc: 'Calculate how many points you need in remaining evaluations to pass the course with your desired target score.',
    targetGpa: 'Desired Target Grade:',
    requiredFinalScore: 'Required Score on Final Exam:',
    scheduleTimetable: 'Weekly Schedule',
    announcementsTab: 'Institutional Bulletins',
    evaluationsBreakdown: 'Evaluations Breakdown',
    teacherFeedback: 'Instructor Feedback:',
    noFeedbackYet: 'No additional comments recorded yet.',
    currentAttendance: 'Your Attendance in this course',
    absencesCount: 'Recorded Absences:',
    attendanceNormal: 'Regular Attendance',
    attendanceWarning: 'Caution! You are approaching the maximum allowed absence limit.',
    meritHonorRoll: 'Top 5% Honor Roll',
    completedCreditsProgress: 'Completed Credits',
    tabOverviewStudent: 'Academic Summary',
    tabGradesStudent: 'Grades Transcript',
    tabScheduleStudent: 'Weekly Schedule',
    tabAttendanceStudent: 'Attendance',
    tabSimulatorStudent: 'Grade Simulator',
    selectSimCourse: 'Select Course to Simulate',
    simTargetNotice: 'Adjust your target score to calculate the exact grade needed on the Final Exam.',
    simPossibleSuccess: 'Goal Achievable!',
    simNotPossibleAlert: 'Required grade exceeds the maximum 20.00 scale ceiling.',
    allEvaluationsCompleted: 'All evaluations for this course have already been graded.',
    celebrateSimulationBtn: 'Celebrate Projected Target',
    weeklyScheduleTitle: 'Synchronous Class Schedule',
    
    adminTitle: 'Operations & Educational Technology Directorate',
    adminSubtitle: 'Supervision of academic hierarchies, cloud compute infrastructure, virtual classroom assignments, and official grade transcripts.',
    adminTabOverview: 'Overview & Faculties',
    adminTabResources: 'Resource & Room Allocator',
    adminTabPrograms: 'Curriculum & Program Structures',
    exportInstitutionalReport: 'Export Official Transcripts (PDF/CSV)',
    kpiTotalStudents: 'Enrolled Students',
    kpiRetentionRate: 'Retention Rate',
    kpiProgramsCount: 'Programs & Degrees',
    kpiCloudEnvironments: 'Classrooms & GPU Servers',
    facultiesOverview: 'Faculties & Academic Departments',
    courseCatalog: 'General Course Catalog (Term 2026-I)',
    courseCatalogDesc: 'Curricular hierarchy, academic credits, and faculty teaching loads.',
    director: 'Dean / Director:',
    duration: 'Duration:',
    semesters: 'Semesters',
    faculty: 'Faculty:',
    institutionalControlPanel: 'Institutional Control Panel',
    activeFacultiesCount: '4 Active Faculties',
    highEfficiencyBadge: 'High Efficiency',
    dropoutRiskRate: 'Dropout risk < 1.6%',
    accreditedPrograms: 'Accredited',
    coursesTaughtCount: '168 Courses Taught',
    zeroIncidentsReported: 'Zero incidents reported',
    
    resourceTitle: 'Resource & Virtual Room Allocation',
    resourceSubtitle: 'Orchestration of cloud GPU clusters, Zoom/Meet enterprise licenses, and hybrid rooms with real-time collision checking.',
    newAllocationBtn: 'New Schedule Allocation',
    assignedSlots: 'Assigned Blocks',
    availableCapacity: 'Available Capacity',
    conflictDetected: 'Schedule conflict detected! The resource is already booked during this time window.',
    allocateSuccess: 'Timeslot successfully assigned to the resource.',
    releaseSlot: 'Free slot',
    testDirectLink: 'Test Direct Link',
    noReservations: 'This resource has no reservations this week. 100% available.',
    selectResourceModalTitle: 'Allocate Resource / Virtual Room',
    courseAndTeacherLabel: 'Course & Instructor',
    dayOfWeekLabel: 'Day of the Week',
    startTimeLabel: 'Start Time',
    endTimeLabel: 'End Time',
    digitalInfrastructureMgmt: 'Digital Infrastructure Management',
    activeEnvironments: 'Active Environments',
    resourceAllocationError: 'Allocation Error',
    
    dayMon: 'Monday',
    dayTue: 'Tuesday',
    dayWed: 'Wednesday',
    dayThu: 'Thursday',
    dayFri: 'Friday',
    daySat: 'Saturday',
    
    helpModalTitle: 'Multi-Role Architecture Demonstration in Uniperium LMS',
    helpModalSubtitle: 'You can toggle between all 3 roles at any moment from the top header selector.',
    teacherRoleInfo: 'Faculty: Enables in-cell Excel-style grade entry (automatic weighted formula recalculations), date-by-date attendance tracking with disqualification risk warnings (FA), and live virtual classroom launching.',
    studentRoleInfo: 'Student: Displays detailed performance analytics with rubrics and faculty feedback, predictive final score simulator (calculates points needed to pass), weekly timetable, and cloud lab access.',
    adminRoleInfo: 'Administrator: Institutional oversight, resource and GPU room scheduler with real-time collision detection, academic degree catalog, and official grade certification.',
  }
};
