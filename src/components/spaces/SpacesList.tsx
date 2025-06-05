
import { SpaceFilter, Space } from "@/types/space";
import SpaceCard from "./SpaceCard";
import { useMemo } from "react";

interface SpacesListProps {
  filters: SpaceFilter;
}

// Mock data for spaces - including Egyptian academies and training centers
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
  },
  // Egyptian Academies and Training Centers
  {
    id: "4",
    name: "Mawaheb Academy",
    type: "classroom",
    address: "Nasr City, Maadi",
    city: "Cairo",
    owner: "Mawaheb Academy",
    description: "أكاديمية معتمدة من STEM.org تقدم برامج تعليمية في البرمجة والروبوتات للأطفال من 5-18 سنة",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Programming Tools", "Robotics Kits", "STEM Equipment", "Wi-Fi"],
    capacity: 20,
    pricePerHour: 80,
    rating: 4.7,
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "5",
    name: "Logic Club Academy",
    type: "classroom",
    address: "Cairo",
    city: "Cairo",
    owner: "Logic Club Academy",
    description: "تقدم برامج تعليمية في الروبوتات والبرمجة وتنظم مسابقات مثل Line Follower و AI Olympiad",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Robotics Kits", "Programming Tools", "Electronics", "Wi-Fi"],
    capacity: 18,
    pricePerHour: 75,
    rating: 4.6,
    coordinates: {
      lat: 30.0626,
      lng: 31.2497
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "9:00 AM - 5:00 PM"
    }
  },
  {
    id: "6",
    name: "Algorithmics Academy",
    type: "classroom",
    address: "Nasr City, Sheikh Zayed",
    city: "Cairo",
    owner: "Algorithmics Academy",
    description: "مدرسة برمجة دولية تقدم دورات في البرمجة والذكاء الاصطناعي وتصميم الألعاب للأطفال 6-18 سنة",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Programming Tools", "AI Tools", "Game Design Software", "Computers"],
    capacity: 22,
    pricePerHour: 85,
    rating: 4.8,
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 7:00 PM"
    }
  },
  {
    id: "7",
    name: "Innovation Hub Academy",
    type: "makerspace",
    address: "Cairo",
    city: "Cairo",
    owner: "Innovation Hub Academy",
    description: "تركز على تطوير مهارات الابتكار من خلال مشاريع علمية وتكنولوجية عملية للأطفال 8-16 سنة",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a"
    ],
    equipment: ["STEM Equipment", "Scientific Tools", "Robotics Kits", "Project Materials"],
    capacity: 16,
    pricePerHour: 70,
    rating: 4.5,
    coordinates: {
      lat: 30.0626,
      lng: 31.2497
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday"],
      hours: "11:00 AM - 6:00 PM"
    }
  },
  {
    id: "8",
    name: "Discovery Academy",
    type: "classroom",
    address: "Port Said",
    city: "Port Said",
    owner: "Discovery Academy",
    description: "تقدم برامج تعليمية في مجالات STEAM وشاركت في بطولات مثل Robotourney Egypt Championship 2024",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["STEAM Tools", "Robotics Kits", "Programming Tools", "Wi-Fi"],
    capacity: 15,
    pricePerHour: 65,
    rating: 4.4,
    coordinates: {
      lat: 31.2653,
      lng: 32.3020
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Wednesday"],
      hours: "10:00 AM - 5:00 PM"
    }
  },
  {
    id: "9",
    name: "Bright Brain Academy",
    type: "classroom",
    address: "10th of Ramadan City",
    city: "10th of Ramadan",
    owner: "Bright Brain Academy",
    description: "تقدم دورات في برمجة الروبوتات باستخدام LEGO SPIKE Prime للأطفال 6-12 سنة",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["LEGO SPIKE Prime", "Programming Tools", "Robotics Kits", "Wi-Fi"],
    capacity: 12,
    pricePerHour: 60,
    rating: 4.3,
    coordinates: {
      lat: 30.3273,
      lng: 31.7617
    },
    availability: {
      days: ["Friday", "Saturday", "Sunday"],
      hours: "9:00 AM - 4:00 PM"
    }
  },
  {
    id: "10",
    name: "Robo Code School",
    type: "classroom",
    address: "New Cairo",
    city: "Cairo",
    owner: "Robo Code School",
    description: "تقدم برامج تعليمية في البرمجة والروبوتات مع التركيز على تطوير مهارات البرمجة بلغة Python",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Python IDE", "Robotics Kits", "Programming Tools", "Computers"],
    capacity: 18,
    pricePerHour: 75,
    rating: 4.6,
    coordinates: {
      lat: 30.0131,
      lng: 31.4971
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "11",
    name: "Tricks Land STEAM Academy",
    type: "makerspace",
    address: "Cairo",
    city: "Cairo",
    owner: "Tricks Land STEAM Academy",
    description: "شاركت في المنتدى الأفروآسيوي 2025 وتقدم برامج تعليمية تدمج بين العلوم والفنون للأطفال 6-16 سنة",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a"
    ],
    equipment: ["STEAM Tools", "Arduino", "Robotics Kits", "Art Supplies"],
    capacity: 20,
    pricePerHour: 80,
    rating: 4.7,
    coordinates: {
      lat: 30.0626,
      lng: 31.2497
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday"],
      hours: "10:00 AM - 7:00 PM"
    }
  },
  {
    id: "12",
    name: "Mishkah Kids Academy",
    type: "classroom",
    address: "Cairo",
    city: "Cairo",
    owner: "Mishkah Kids Academy",
    description: "تقدم برامج تعليمية تدمج بين STEM والتربية الإسلامية مع التركيز على ريادة الأعمال للأطفال 5-14 سنة",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["STEM Tools", "Programming Tools", "Business Tools", "Wi-Fi"],
    capacity: 16,
    pricePerHour: 70,
    rating: 4.5,
    coordinates: {
      lat: 30.0626,
      lng: 31.2497
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Wednesday"],
      hours: "10:00 AM - 5:00 PM"
    }
  },
  {
    id: "13",
    name: "I Can Code Academy",
    type: "classroom",
    address: "Cairo",
    city: "Cairo",
    owner: "I Can Code Academy",
    description: "تقدم برامج تعليمية في البرمجة والذكاء الاصطناعي وتصميم الألعاب للأطفال 6-17 سنة",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Programming Tools", "AI Tools", "Game Design Software", "Computers"],
    capacity: 20,
    pricePerHour: 85,
    rating: 4.8,
    coordinates: {
      lat: 30.0626,
      lng: 31.2497
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 7:00 PM"
    }
  },
  {
    id: "14",
    name: "Creative Generation Academy",
    type: "makerspace",
    address: "Cairo",
    city: "Cairo",
    owner: "Creative Generation Academy",
    description: "تقدم معسكرات صيفية تركز على التفكير الإبداعي من خلال مشاريع الروبوتات والتصميم للأطفال 6-16 سنة",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a"
    ],
    equipment: ["Robotics Kits", "Design Tools", "Creative Materials", "Wi-Fi"],
    capacity: 18,
    pricePerHour: 75,
    rating: 4.6,
    coordinates: {
      lat: 30.0626,
      lng: 31.2497
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "15",
    name: "Smart Kids Academy",
    type: "classroom",
    address: "Cairo",
    city: "Cairo",
    owner: "Smart Kids Academy",
    description: "تقدم برامج تعليمية متدرجة حسب المستوى في البرمجة والروبوتات مع مناهج STEM للأطفال 5-15 سنة",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["STEM Tools", "Programming Tools", "Robotics Kits", "Wi-Fi"],
    capacity: 16,
    pricePerHour: 70,
    rating: 4.5,
    coordinates: {
      lat: 30.0626,
      lng: 31.2497
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "16",
    name: "Fantasia Academy",
    type: "classroom",
    address: "Al Haram, Giza",
    city: "Giza",
    owner: "Fantasia Academy",
    description: "تقدم برامج في الروبوتات والبرمجة مع التركيز على مهارات العرض والتقديم وشاركت في بطولات دولية للأطفال 5-17 سنة",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Robotics Kits", "Programming Tools", "Presentation Tools", "AI Tools"],
    capacity: 22,
    pricePerHour: 85,
    rating: 4.8,
    coordinates: {
      lat: 29.9792,
      lng: 31.1342
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 7:00 PM"
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
