
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
}
