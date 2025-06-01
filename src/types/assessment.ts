
export interface MultipleIntelligenceQuestion {
  id: number;
  text: string;
  category: 'logical' | 'linguistic' | 'spatial' | 'interpersonal' | 'mechanical' | 'creative';
}

export interface PersonalityQuestion {
  id: number;
  text: string;
  options: { value: string; label: string }[];
  category: 'planning' | 'social' | 'thinking' | 'learning' | 'leadership' | 'creativity' | 'presentation';
}

export interface TechnicalQuestion {
  id: number;
  text: string;
  type: 'textarea' | 'select';
  options?: string[];
}

export interface AssessmentAnswers {
  multipleIntelligence: Record<number, number>;
  personality: Record<number, string>;
  technical: Record<number, string>;
}

export interface AssessmentResult {
  recommendedCourses: number[];
  strengths: string[];
  personalityType: string;
  summary: string;
}
