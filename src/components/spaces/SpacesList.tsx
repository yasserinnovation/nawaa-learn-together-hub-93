import { SpaceFilter, Space } from "@/types/space";
import SpaceCard from "./SpaceCard";
import { useMemo } from "react";

interface SpacesListProps {
  filters: SpaceFilter;
}

// Mock data for spaces
const mockSpaces: Space[] = [
  {
    id: "1",
    name: "Alexandria Library - Youth Section",
    type: "library",
    address: "El-Chatby, Alexandria",
    city: "Alexandria",
    owner: "Bibliotheca Alexandrina",
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
      lat: 31.2089,
      lng: 29.9092
    },
    availability: {
      days: ["Friday", "Saturday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "2",
    name: "Cairo Innovation Hub",
    type: "makerspace",
    address: "Smart Village, 6th of October",
    city: "Cairo",
    owner: "Ministry of Communications",
    description: "A dedicated makerspace with advanced equipment for STEM activities.",
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    ],
    equipment: ["3D Printer", "Soldering Station", "Wi-Fi", "Projector", "Robotics Kits"],
    capacity: 20,
    pricePerHour: 100,
    rating: 4.9,
    coordinates: {
      lat: 30.0874,
      lng: 31.3425
    },
    availability: {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      hours: "9:00 AM - 5:00 PM"
    }
  },
  {
    id: "3",
    name: "Luxor Learning Center",
    type: "coworking",
    address: "East Bank, Near Luxor Temple",
    city: "Luxor",
    owner: "Luxor Governorate",
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
      lat: 25.6872,
      lng: 32.6396
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 8:00 PM"
    }
  }
];

const SpacesList = ({ filters }: SpacesListProps) => {
  // Filter spaces based on the selected filters
  const filteredSpaces = useMemo(() => {
    return mockSpaces.filter(space => {
      // Filter by capacity
      if (space.capacity < filters.capacity) {
        return false;
      }

      // Filter by equipment
      if (filters.equipment.length > 0) {
        const hasAllEquipment = filters.equipment.every(item => 
          space.equipment.includes(item)
        );
        if (!hasAllEquipment) {
          return false;
        }
      }

      // For this mock version, we're not implementing actual distance or date filtering
      // In a real implementation, we would calculate distance from user location
      // and check availability for the selected date

      return true;
    });
  }, [filters]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Available Spaces ({filteredSpaces.length})</h2>
        <select className="py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
          <option>Sort by: Recommended</option>
          <option>Sort by: Price (Low to High)</option>
          <option>Sort by: Rating</option>
          <option>Sort by: Capacity</option>
        </select>
      </div>

      {filteredSpaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSpaces.map(space => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">
            No spaces match your current filters. Try adjusting your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default SpacesList;
