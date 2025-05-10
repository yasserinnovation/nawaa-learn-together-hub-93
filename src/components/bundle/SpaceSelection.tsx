
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { SpaceFilter, Space } from "@/types/space";

interface SpaceSelectionProps {
  bundle: any;
  updateBundle: (key: string, value: any) => void;
}

// Reusing the same mock data from SpacesList component
const mockSpaces: Space[] = [
  {
    id: "1",
    name: "King Abdulaziz Public Library - Youth Section",
    type: "library",
    address: "King Fahd Rd, Olaya District",
    city: "Riyadh",
    owner: "King Abdulaziz Foundation",
    description: "A bright, modern space with dedicated areas for tech activities and learning.",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    ],
    equipment: ["Wi-Fi", "Projector", "Robotics Kits", "Computers"],
    capacity: 25,
    pricePerHour: 75,
    rating: 4.8,
    coordinates: {
      lat: 24.7136,
      lng: 46.6753
    },
    availability: {
      days: ["Friday", "Saturday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "2",
    name: "Mawhiba Innovation Center",
    type: "makerspace",
    address: "Prince Turki St, Al Malqa",
    city: "Riyadh",
    owner: "Mawhiba Foundation",
    description: "A dedicated makerspace with advanced equipment for STEM activities.",
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    ],
    equipment: ["3D Printer", "Soldering Station", "Wi-Fi", "Projector", "Robotics Kits"],
    capacity: 20,
    pricePerHour: 100,
    rating: 4.9,
    coordinates: {
      lat: 24.8105,
      lng: 46.6527
    },
    availability: {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      hours: "9:00 AM - 5:00 PM"
    }
  },
  {
    id: "3",
    name: "Jeddah Innovation Hub",
    type: "coworking",
    address: "Al Andalus, King Abdullah Rd",
    city: "Jeddah",
    owner: "Jeddah Municipality",
    description: "A collaborative space designed for innovation and tech education.",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833"
    ],
    equipment: ["Wi-Fi", "Projector", "Audio Equipment", "Video Equipment"],
    capacity: 35,
    pricePerHour: 120,
    rating: 4.6,
    coordinates: {
      lat: 21.5433,
      lng: 39.1728
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 8:00 PM"
    }
  }
];

const SpaceSelection = ({ bundle, updateBundle }: SpaceSelectionProps) => {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(
    bundle.space ? bundle.space.id : null
  );

  const [filters, setFilters] = useState<SpaceFilter>({
    distance: 10,
    capacity: 0,
    equipment: [],
    availability: null,
  });

  // If a trainer is selected, show a recommendation based on their location
  const trainerCity = bundle.trainer?.location || null;

  const handleSpaceSelect = (space: Space) => {
    setSelectedSpace(space.id);
    updateBundle("space", space);
  };

  const filteredSpaces = mockSpaces.filter(space => {
    if (filters.capacity > 0 && space.capacity < filters.capacity) {
      return false;
    }
    
    if (filters.equipment.length > 0) {
      const hasAllEquipment = filters.equipment.every(item => 
        space.equipment.includes(item)
      );
      if (!hasAllEquipment) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center bg-yellow-100 p-4 rounded-lg">
        <MapPin className="text-yellow-600 mr-2 h-5 w-5" />
        <p className="text-yellow-800">
          {trainerCity 
            ? `Showing spaces compatible with your selected trainer in ${trainerCity}.` 
            : "Select a space for your learning experience."}
        </p>
      </div>

      <h2 className="text-2xl font-semibold">Pick a Space</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpaces.map(space => (
          <Card
            key={space.id}
            className={`cursor-pointer overflow-hidden transition-all ${
              selectedSpace === space.id ? 'ring-2 ring-yellow-500' : ''
            }`}
            onClick={() => handleSpaceSelect(space)}
          >
            <div className="relative h-48">
              <img
                src={space.images[0]}
                alt={space.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-yellow-500">
                SAR {space.pricePerHour}/hour
              </Badge>
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{space.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{space.city} • {space.type}</p>
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm flex items-center">
                  {space.rating} ★
                </div>
              </div>
              
              <p className="text-sm mb-3 line-clamp-2">{space.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 mr-1">Capacity:</span>
                  <span>{space.capacity} people</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 mr-1">Available:</span>
                  <span>{space.availability.days.join(", ")}</span>
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {space.equipment.slice(0, 3).map(item => (
                  <Badge key={item} variant="outline" className="bg-gray-100">
                    {item}
                  </Badge>
                ))}
                {space.equipment.length > 3 && (
                  <Badge variant="outline" className="bg-gray-100">
                    +{space.equipment.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpaceSelection;
