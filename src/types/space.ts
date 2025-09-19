
export interface Space {
  id: string;
  name: string;
  type: 'library' | 'classroom' | 'makerspace' | 'coworking' | 'hall';
  address: string;
  city: string;
  owner: string;
  description: string;
  images: string[];
  equipment: string[];
  capacity: number;
  pricePerHour: number;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  availability: {
    days: string[];
    hours: string;
  };
}

export interface SpaceFilter {
  searchText: string;
  distance: number;
  capacity: number;
  equipment: string[];
  availability: Date | null;
}
