
export type ToolAvailability = 'sale' | 'rent' | 'free' | 'all';
export type ToolCondition = 'new' | 'good' | 'used' | 'needs-care';

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
}

export interface ToolFilter {
  courseType: string[];
  ageGroup: string;
  toolType: string[];
  priceRange: [number, number];
  availability: ToolAvailability;
  condition: ToolCondition[];
}
