
export type ToolAvailability = 'sale' | 'rent' | 'free' | 'all';
export type ToolCondition = 'new' | 'good' | 'used' | 'needs-care';
export type ToolStatus = 'pending' | 'approved' | 'rejected';
export type ContributorType = 'individual' | 'company' | 'school' | 'nonprofit';

export interface Tool {
  id: number;
  name: string;
  image: string;
  condition: ToolCondition;
  price: number;
  rentalRate?: string;
  location: string;
  owner: string;
  tags: string[];
  availability: 'sale' | 'rent' | 'free';
  description: string;
  ageGroup: string;
  toolType: string;
  quantity?: number;
  status?: ToolStatus;
  contributorType?: ContributorType;
  safetyGuidelines?: string;
  deliveryOptions?: string[];
  rentalPeriods?: string[];
  photos?: string[];
  contactInfo?: string;
  compatibleCourses?: string[];
}

export interface ToolFilter {
  courseType: string[];
  ageGroup: string;
  toolType: string[];
  priceRange: [number, number];
  availability: ToolAvailability;
  condition: ToolCondition[];
}
