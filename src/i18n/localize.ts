import { Language } from './translations';

export interface CourseTranslation {
  name: string;
  description: string;
}

export interface ProgramTranslation {
  name: string;
  faculty: string;
  degreeType: string;
}

export interface EvaluationTranslation {
  name: string;
  category: string;
}

export const COURSE_TRANSLATIONS: Record<string, Record<Language, CourseTranslation>> = {
  'course-01': {
    es: {
      name: 'Arquitectura de Software & Sistemas Distribuidos',
      description: 'Diseño de microservicios, consistencia eventual, patrones de resiliencia y orquestación con Kubernetes.',
    },
    en: {
      name: 'Software Architecture & Distributed Systems',
      description: 'Microservices design, eventual consistency, resilience patterns, and Kubernetes orchestration.',
    },
  },
  'course-02': {
    es: {
      name: 'Inteligencia Artificial Avanzada & Modelos LLM',
      description: 'Fine-tuning, arquitecturas Transformer, agentes autónomos y RAG empresarial.',
    },
    en: {
      name: 'Advanced Artificial Intelligence & LLM Models',
      description: 'Fine-tuning, Transformer architectures, autonomous agents, and enterprise RAG pipelines.',
    },
  },
  'course-03': {
    es: {
      name: 'Ciberseguridad Ofensiva & DevSecOps Cloud',
      description: 'Auditoría de vulnerabilidades, pipelines CI/CD seguros, Zero Trust y criptografía aplicada.',
    },
    en: {
      name: 'Offensive Cybersecurity & Cloud DevSecOps',
      description: 'Vulnerability assessment, secure CI/CD pipelines, Zero Trust architecture, and applied cryptography.',
    },
  },
  'course-04': {
    es: {
      name: 'Computación en la Nube & Arquitectura Serverless',
      description: 'Diseño de soluciones elásticas de alta disponibilidad, Terraform y optimización FinOps.',
    },
    en: {
      name: 'Cloud Computing & Serverless Architecture',
      description: 'Elastic high-availability solution design, Infrastructure as Code (Terraform), and FinOps optimization.',
    },
  },
};

export const PROGRAM_TRANSLATIONS: Record<string, Record<Language, ProgramTranslation>> = {
  'prog-01': {
    es: {
      name: 'Ingeniería de Software e Inteligencia Artificial',
      faculty: 'Facultad de Ingeniería y Ciencias Aplicadas',
      degreeType: 'PREGRADO',
    },
    en: {
      name: 'Software Engineering & Artificial Intelligence',
      faculty: 'Faculty of Engineering & Applied Sciences',
      degreeType: 'UNDERGRADUATE',
    },
  },
  'prog-02': {
    es: {
      name: 'Ciberseguridad y Gestión de Riesgos Digitales',
      faculty: 'Facultad de Ingeniería y Ciencias Aplicadas',
      degreeType: 'PREGRADO',
    },
    en: {
      name: 'Cybersecurity & Digital Risk Management',
      faculty: 'Faculty of Engineering & Applied Sciences',
      degreeType: 'UNDERGRADUATE',
    },
  },
  'prog-03': {
    es: {
      name: 'Ciencia de Datos y Analítica Avanzada',
      faculty: 'Escuela Superior de Computación',
      degreeType: 'INSTITUTO TECNOLÓGICO',
    },
    en: {
      name: 'Data Science & Advanced Analytics',
      faculty: 'Graduate School of Computing',
      degreeType: 'TECHNICAL INSTITUTE',
    },
  },
  'prog-04': {
    es: {
      name: 'Administración Cloud y Arquitectura DevOps',
      faculty: 'Escuela Superior de Computación',
      degreeType: 'INSTITUTO TECNOLÓGICO',
    },
    en: {
      name: 'Cloud Administration & DevOps Architecture',
      faculty: 'Graduate School of Computing',
      degreeType: 'TECHNICAL INSTITUTE',
    },
  },
};

export const EVALUATION_TRANSLATIONS: Record<string, Record<Language, EvaluationTranslation>> = {
  'eval-101': {
    es: { name: 'Examen Parcial 1: Microservicios & Patrones', category: 'Parcial' },
    en: { name: 'Midterm Exam 1: Microservices & Patterns', category: 'Midterm' },
  },
  'eval-102': {
    es: { name: 'Laboratorio Práctico: Docker & API Gateways', category: 'Laboratorio' },
    en: { name: 'Hands-on Lab: Docker & API Gateways', category: 'Lab' },
  },
  'eval-103': {
    es: { name: 'Práctica Calificada: Kafka & Event Streams', category: 'Práctica' },
    en: { name: 'Graded Assignment: Kafka & Event Streams', category: 'Practice' },
  },
  'eval-104': {
    es: { name: 'Avance de Proyecto: Sistema de Pagos Cloud', category: 'Proyecto' },
    en: { name: 'Project Milestone: Cloud Payment Engine', category: 'Project' },
  },
  'eval-105': {
    es: { name: 'Examen Final: Arquitecturas Distribuidas', category: 'Final' },
    en: { name: 'Final Exam: Distributed Architectures', category: 'Final' },
  },
};

export const ANNOUNCEMENT_TRANSLATIONS: Record<string, Record<Language, { title: string; content: string; author: string }>> = {
  'ann-01': {
    es: {
      title: 'Apertura de Simulador de Examen Final y Cierre de Actas',
      content: 'Estimada comunidad docente y estudiantil: Se habilitó el simulador de cálculo de notas para el cierre del período 2026-I.',
      author: 'Vicerrectorado Académico',
    },
    en: {
      title: 'Final Exam Simulator Released & Grade Filing Deadline',
      content: 'Dear faculty and student community: The grade prediction simulator is now active for Term 2026-I closure.',
      author: 'Office of the Academic Provost',
    },
  },
  'ann-02': {
    es: {
      title: 'Mantenimiento Programado de Clústers GPU Virtuales',
      content: 'Este domingo de 02:00 a 04:00 AM se realizará actualización de drivers CUDA en las instancias de laboratorio.',
      author: 'Dirección de Infraestructura Cloud',
    },
    en: {
      title: 'Scheduled Maintenance for Virtual GPU Compute Clusters',
      content: 'This Sunday from 02:00 to 04:00 AM, CUDA driver maintenance will occur across cloud laboratory instances.',
      author: 'Cloud Infrastructure Directorate',
    },
  },
  'ann-03': {
    es: {
      title: 'Conferencia Magistral: Sistemas de Alta Concurrencia',
      content: 'Inscripciones abiertas para la ponencia internacional con el equipo de ingeniería de Google Cloud.',
      author: 'Facultad de Ingeniería',
    },
    en: {
      title: 'Keynote Lecture: High-Concurrency Distributed Systems',
      content: 'Registration is now open for the international guest lecture featuring Google Cloud engineering teams.',
      author: 'Faculty of Engineering',
    },
  },
};

export const CLASSROOM_NAME_TRANSLATIONS: Record<string, Record<Language, { name: string; specs: string }>> = {
  'room-01': {
    es: { name: 'Clúster GPU A100 - Lab Inteligencia Artificial', specs: '8x NVIDIA A100 80GB Tensor Core • 256 vCPU • 1TB RAM' },
    en: { name: 'GPU Cluster A100 - Artificial Intelligence Lab', specs: '8x NVIDIA A100 80GB Tensor Core • 256 vCPU • 1TB RAM' },
  },
  'room-02': {
    es: { name: 'Sala Virtual Zoom Pro - Auditorio Principal', specs: 'Capacidad 500 participantes • Grabación Cloud 4K • Transcripción en vivo' },
    en: { name: 'Virtual Room Zoom Pro - Main Auditorium', specs: '500 participants capacity • 4K Cloud Recording • Live Transcription' },
  },
  'room-03': {
    es: { name: 'Aula Híbrida 402 - Pabellón de Innovación', specs: 'Cámara PTZ con seguimiento por IA • Pizarras táctiles interactivas 85"' },
    en: { name: 'Hybrid Classroom 402 - Innovation Hall', specs: 'AI-tracking PTZ Camera • 85" Interactive Touch Displays' },
  },
  'room-04': {
    es: { name: 'Laboratorio Cloud DevOps & Kubernetes', specs: 'Clúster k8s multi-nodo • 64 vCPU • 256GB RAM • Ingress NGINX' },
    en: { name: 'Cloud DevOps & Kubernetes Lab Cluster', specs: 'Multi-node k8s cluster • 64 vCPU • 256GB RAM • NGINX Ingress' },
  },
  'room-05': {
    es: { name: 'Sala Google Meet Enterprise - Cátedra Magistral', specs: 'Salas para grupos pequeños • Encriptación extremo a extremo' },
    en: { name: 'Google Meet Enterprise - Master Class Room', specs: 'Breakout rooms • End-to-end encryption' },
  },
};

export function getLocalizedCourse(courseId: string, defaultCourse: { name: string; description: string }, lang: Language) {
  const item = COURSE_TRANSLATIONS[courseId];
  if (item && item[lang]) {
    return item[lang];
  }
  return { name: defaultCourse.name, description: defaultCourse.description };
}

export function getLocalizedProgram(progId: string, defaultProg: { name: string; faculty: string; degreeType: string }, lang: Language) {
  const item = PROGRAM_TRANSLATIONS[progId];
  if (item && item[lang]) {
    return item[lang];
  }
  return defaultProg;
}

export function getLocalizedEvaluation(evalId: string, defaultEval: { name: string; category: string }, lang: Language) {
  const item = EVALUATION_TRANSLATIONS[evalId];
  if (item && item[lang]) {
    return item[lang];
  }
  return defaultEval;
}

export function getLocalizedAnnouncement(annId: string, defaultAnn: { title: string; content: string; author: string }, lang: Language) {
  const item = ANNOUNCEMENT_TRANSLATIONS[annId];
  if (item && item[lang]) {
    return item[lang];
  }
  return defaultAnn;
}

export function getLocalizedClassroom(roomId: string, defaultRoom: { name: string; specs?: string }, lang: Language) {
  const item = CLASSROOM_NAME_TRANSLATIONS[roomId];
  if (item && item[lang]) {
    return { name: item[lang].name, specs: item[lang].specs };
  }
  return { name: defaultRoom.name, specs: defaultRoom.specs || '' };
}

export function getLocalizedStatus(status: string, lang: Language): string {
  if (lang === 'en') {
    switch (status) {
      case 'APROBADO':
        return 'PASSED';
      case 'EN_RIESGO':
        return 'AT RISK';
      case 'REPROBADO':
        return 'FAILED';
      case 'CURSANDO':
        return 'IN PROGRESS';
      case 'ACTIVO':
        return 'ACTIVE';
      case 'EN_USO':
        return 'IN USE';
      case 'DISPONIBLE':
        return 'AVAILABLE';
      default:
        return status;
    }
  }
  switch (status) {
    case 'APROBADO':
      return 'APROBADO';
    case 'EN_RIESGO':
      return 'EN RIESGO';
    case 'REPROBADO':
      return 'REPROBADO';
    case 'CURSANDO':
      return 'CURSANDO';
    case 'ACTIVO':
      return 'ACTIVO';
    case 'EN_USO':
      return 'EN USO';
    case 'DISPONIBLE':
      return 'DISPONIBLE';
    default:
      return status;
  }
}

export function getLocalizedDay(dayCode: string, lang: Language): string {
  const days: Record<string, { es: string; en: string }> = {
    LUN: { es: 'Lunes', en: 'Monday' },
    MAR: { es: 'Martes', en: 'Tuesday' },
    MIE: { es: 'Miércoles', en: 'Wednesday' },
    JUE: { es: 'Jueves', en: 'Thursday' },
    VIE: { es: 'Viernes', en: 'Friday' },
    SAB: { es: 'Sábado', en: 'Saturday' },
  };
  return days[dayCode]?.[lang] || dayCode;
}
