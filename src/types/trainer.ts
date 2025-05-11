
export interface Trainer {
  id: string;
  name: string;
  location: string;
  languages: string[];
  expertise: string[];
  gender: "Male" | "Female";
  rating: number;
  imageUrl: string;
  experience: number;
  specialties: string[];
  availability: string[];
  bio: string;
  ageGroups: string[];
  reviewCount: number;
  hasCertifications: boolean;
  email?: string;
  phone?: string;
  isVerified?: boolean;
  isNawaaCertified?: boolean;
  teachingStyle?: string;
  certifications?: string[];
  portfolioItems?: PortfolioItem[];
  completedTrainings?: TrainerTraining[];
  bookings?: TrainerBooking[];
  income?: TrainerIncome;
  createdAt?: string;
  updatedAt?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: "image" | "video";
  date: string;
}

export interface TrainerTraining {
  id: string;
  title: string;
  description: string;
  completedAt: string;
  certificateUrl?: string;
  category: "child-development" | "classroom-management" | "communication" | "ethics" | "teaching-methods";
}

export interface TrainerBooking {
  id: string;
  courseId?: string;
  courseName?: string;
  date: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  studentCount: number;
  location: string;
}

export interface TrainerIncome {
  totalEarned: number;
  pendingPayments: number;
  lastMonthEarnings: number;
  bookingsByMonth: { month: string; amount: number }[];
}

export type TrainerTab = "profile" | "portfolio" | "certifications" | "calendar" | "income" | "training";

