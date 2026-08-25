import { Course, EvaluationItem, StudentEnrollment } from '../../types/academic';

export interface CalculatedFinalGrade {
  finalScore: number;
  letter: string;
  status: 'APROBADO' | 'EN_RIESGO' | 'REPROBADO' | 'CURSANDO';
  completedWeight: number;
}

export interface ClassGradeStats {
  avg: number;
  highest: number;
  lowest: number;
  passRate: number;
  count: number;
  passingCount: number;
  failingCount: number;
}

export interface PassingGradePrediction {
  requiredScore: number;
  isPossible: boolean;
  remainingWeight: number;
  currentAccumulatedScore: number;
  completedWeight: number;
}

/**
 * Converts a numeric score (0 - 20) to standard Peruvian/Institutional letter grade
 */
export function convertScoreToLetter(score: number): string {
  if (score >= 17.5) return 'A+ (Excelente)';
  if (score >= 15.5) return 'A (Sobresaliente)';
  if (score >= 13.5) return 'B (Bueno)';
  if (score >= 10.5) return 'C (Aprobado)';
  if (score >= 7.0) return 'D (Desaprobado)';
  return 'F (Deficiente)';
}

/**
 * Determines academic status based on current score and completed weight
 */
export function determineGradeStatus(
  score: number,
  completedWeight: number
): 'APROBADO' | 'EN_RIESGO' | 'REPROBADO' | 'CURSANDO' {
  if (completedWeight === 100) {
    return score >= 10.5 ? 'APROBADO' : 'REPROBADO';
  }
  if (score >= 13.0) return 'APROBADO';
  if (score >= 10.5) return 'CURSANDO';
  return 'EN_RIESGO';
}

/**
 * Computes weighted final grade for a student in a specific course
 */
export function calculateStudentFinalGrade(
  enrollment: StudentEnrollment,
  course: Course
): CalculatedFinalGrade {
  let weightedSum = 0;
  let completedWeight = 0;

  course.evaluations.forEach((evalItem: EvaluationItem) => {
    const gradeRecord = enrollment.grades.find((g) => g.evaluationId === evalItem.id);
    if (gradeRecord && gradeRecord.score !== null && gradeRecord.score !== undefined) {
      weightedSum += (gradeRecord.score * evalItem.weight) / 100;
      completedWeight += evalItem.weight;
    }
  });

  const finalScore = Number(weightedSum.toFixed(2));
  const letter = convertScoreToLetter(finalScore);
  const status = determineGradeStatus(finalScore, completedWeight);

  return {
    finalScore,
    letter,
    status,
    completedWeight,
  };
}

/**
 * Calculates overall class performance statistics
 */
export function calculateCourseGradeStats(
  enrollments: StudentEnrollment[],
  course: Course
): ClassGradeStats {
  const courseEnrollments = enrollments.filter((e) => e.courseId === course.id);
  if (courseEnrollments.length === 0) {
    return { avg: 0, highest: 0, lowest: 0, passRate: 0, count: 0, passingCount: 0, failingCount: 0 };
  }

  const grades = courseEnrollments.map((enr) => calculateStudentFinalGrade(enr, course).finalScore);
  const avg = Number((grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2));
  const highest = Math.max(...grades);
  const lowest = Math.min(...grades);
  const passingCount = courseEnrollments.filter(
    (enr) => calculateStudentFinalGrade(enr, course).finalScore >= 10.5
  ).length;
  const passRate = Math.round((passingCount / courseEnrollments.length) * 100);

  return {
    avg,
    highest,
    lowest,
    passRate,
    count: courseEnrollments.length,
    passingCount,
    failingCount: courseEnrollments.length - passingCount,
  };
}

/**
 * Calculates what score is required on remaining evaluations to achieve a target final grade (e.g. 10.5 or 14.0)
 */
export function predictRequiredFinalGrade(
  enrollment: StudentEnrollment,
  course: Course,
  targetScore: number = 10.5
): PassingGradePrediction {
  let currentAccumulated = 0;
  let completedWeight = 0;

  course.evaluations.forEach((ev) => {
    const g = enrollment.grades.find((x) => x.evaluationId === ev.id);
    if (g && g.score !== null && g.score !== undefined) {
      currentAccumulated += (g.score * ev.weight) / 100;
      completedWeight += ev.weight;
    }
  });

  const remainingWeight = 100 - completedWeight;
  if (remainingWeight <= 0) {
    return {
      requiredScore: 0,
      isPossible: currentAccumulated >= targetScore,
      remainingWeight: 0,
      currentAccumulatedScore: Number(currentAccumulated.toFixed(2)),
      completedWeight: 100,
    };
  }

  const neededPoints = targetScore - currentAccumulated;
  const requiredScore = Number(((neededPoints * 100) / remainingWeight).toFixed(2));
  const isPossible = requiredScore <= 20.0;

  return {
    requiredScore: Math.max(0, requiredScore),
    isPossible,
    remainingWeight,
    currentAccumulatedScore: Number(currentAccumulated.toFixed(2)),
    completedWeight,
  };
}
