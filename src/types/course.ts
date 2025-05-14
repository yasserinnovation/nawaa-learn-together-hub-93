
import { LucideIcon } from "lucide-react";

export interface Course {
  id: number;
  title: string;
  icon: LucideIcon;
  ageGroup: string;
  duration: string;
  category: 'technology' | 'science' | 'math' | 'engineering';
  project: string;
  stemFocus: string;
  lifeSkills: string;
  outcomes: string;
  level?: string;
  maxGroupSize?: number;
  totalDuration?: string;
  description?: string;
  days?: CourseDay[];
}

export interface CourseDay {
  day: number;
  title: string;
  hours: number;
  activities: string;
  skills: string;
}
