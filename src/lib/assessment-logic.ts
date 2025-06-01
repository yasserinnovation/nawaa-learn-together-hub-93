
import { AssessmentAnswers, AssessmentResult } from "@/types/assessment";
import { getAllCourses } from "./course-utils";

export const calculateAssessmentResult = (answers: AssessmentAnswers): AssessmentResult => {
  // Calculate Multiple Intelligence scores
  const intelligenceScores = {
    logical: 0,
    linguistic: 0,
    spatial: 0,
    interpersonal: 0,
    mechanical: 0,
    creative: 0
  };

  // Score multiple intelligence questions
  Object.entries(answers.multipleIntelligence).forEach(([questionId, score]) => {
    const qId = parseInt(questionId);
    if (qId <= 2 || qId === 9) intelligenceScores.logical += score;
    if (qId === 3 || qId === 15) intelligenceScores.linguistic += score;
    if (qId === 5 || qId === 11 || qId === 14) intelligenceScores.spatial += score;
    if (qId === 4 || qId === 10 || qId === 13) intelligenceScores.interpersonal += score;
    if (qId === 1 || qId === 6 || qId === 8 || qId === 12) intelligenceScores.mechanical += score;
    if (qId === 7) intelligenceScores.creative += score;
  });

  // Determine personality type (simplified)
  let personalityScore = 0;
  Object.values(answers.personality).forEach(value => {
    if (value === 'A') personalityScore++;
  });
  
  const personalityType = personalityScore >= 4 ? "Analytical" : "Creative";

  // Determine strengths
  const strengths: string[] = [];
  const maxScore = Math.max(...Object.values(intelligenceScores));
  Object.entries(intelligenceScores).forEach(([key, score]) => {
    if (score === maxScore) {
      strengths.push(key);
    }
  });

  // Course matching logic
  const courses = getAllCourses();
  const recommendedCourses: number[] = [];

  // Match based on strengths and personality
  if (strengths.includes('mechanical') || strengths.includes('logical')) {
    // Recommend technology and engineering courses
    recommendedCourses.push(...courses.filter(c => c.category === 'technology').map(c => c.id));
  }
  
  if (strengths.includes('spatial') || strengths.includes('creative')) {
    // Recommend creative and design-oriented courses
    recommendedCourses.push(...courses.filter(c => c.category === 'science').map(c => c.id));
  }

  if (strengths.includes('interpersonal')) {
    // Recommend collaborative courses
    recommendedCourses.push(1, 3); // Add specific course IDs that are collaborative
  }

  // Ensure we have at least 2 recommendations
  if (recommendedCourses.length < 2) {
    recommendedCourses.push(...courses.slice(0, 2).map(c => c.id));
  }

  const summary = `Based on your assessment, you show strong ${strengths.join(' and ')} intelligence(s) with a ${personalityType.toLowerCase()} personality type. This makes you well-suited for hands-on, practical learning experiences.`;

  return {
    recommendedCourses: recommendedCourses.slice(0, 2),
    strengths,
    personalityType,
    summary
  };
};
