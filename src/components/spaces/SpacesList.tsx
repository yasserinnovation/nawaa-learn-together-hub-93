import { SpaceFilter, Space } from "@/types/space";
import SpaceCard from "./SpaceCard";
import { useMemo } from "react";

interface SpacesListProps {
  filters: SpaceFilter;
}

// Egyptian Educational Institutions and Training Centers
const mockSpaces: Space[] = [
  {
    id: "1",
    name: "الأكاديمية الوطنية للعلوم و المهارات",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "National Academy for Science & Skills",
    description: "مؤسسة تدريب متخصصة في العلوم والمهارات التكنولوجية",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Wi-Fi", "Projector", "Robotics Kits", "Computers", "STEM Tools"],
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
    id: "2",
    name: "International Little Coders",
    type: "classroom",
    address: "منصة أون لاين",
    city: "Online",
    owner: "International Little Coders",
    description: "مؤسسة تدريب متخصصة في تعليم البرمجة للأطفال عبر الإنترنت",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Online Platform", "Programming Tools", "Video Equipment"],
    capacity: 30,
    pricePerHour: 60,
    rating: 4.5,
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      hours: "10:00 AM - 8:00 PM"
    }
  },
  {
    id: "3",
    name: "Creative Generation Academy",
    type: "makerspace",
    address: "الاسكندرية",
    city: "Alexandria",
    owner: "Creative Generation Academy",
    description: "مؤسسة تدريب وتنظيم مسابقات متخصصة في الإبداع والتكنولوجيا",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a"
    ],
    equipment: ["Wi-Fi", "Projector", "Robotics Kits", "3D Printer", "STEM Tools", "Competition Equipment"],
    capacity: 25,
    pricePerHour: 85,
    rating: 4.8,
    coordinates: {
      lat: 31.2089,
      lng: 29.9092
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 7:00 PM"
    }
  },
  {
    id: "4",
    name: "مدارس هارفست الدولية",
    type: "classroom",
    address: "الاسكندرية",
    city: "Alexandria",
    owner: "Harvest International Schools",
    description: "مؤسسة تعليمية وتدريبية متخصصة في التعليم الحديث",
    images: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80"
    ],
    equipment: ["Wi-Fi", "Projector", "Interactive Boards", "Computers", "Educational Software"],
    capacity: 30,
    pricePerHour: 75,
    rating: 4.6,
    coordinates: {
      lat: 31.2089,
      lng: 29.9092
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "9:00 AM - 5:00 PM"
    }
  },
  {
    id: "5",
    name: "Makers Electronics",
    type: "makerspace",
    address: "الاسكندرية",
    city: "Alexandria",
    owner: "Makers Electronics",
    description: "مؤسسة توريد مستلزمات ومساحة صناع للإلكترونيات",
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    ],
    equipment: ["Wi-Fi", "Soldering Station", "Electronics Components", "Testing Equipment", "3D Printer"],
    capacity: 15,
    pricePerHour: 90,
    rating: 4.7,
    coordinates: {
      lat: 31.2089,
      lng: 29.9092
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "6",
    name: "Robo Camp",
    type: "classroom",
    address: "الاسكندرية",
    city: "Alexandria",
    owner: "Robo Camp",
    description: "مؤسسة تدريب وتوريد مستلزمات متخصصة في الروبوتات",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    ],
    equipment: ["Wi-Fi", "Robotics Kits", "Arduino", "Sensors", "Programming Tools"],
    capacity: 18,
    pricePerHour: 85,
    rating: 4.8,
    coordinates: {
      lat: 31.2089,
      lng: 29.9092
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "7",
    name: "لوكسفورد كلاسيز",
    type: "classroom",
    address: "الاسكندرية",
    city: "Alexandria",
    owner: "Luxford Classes",
    description: "مؤسسة تدريب متخصصة في التعليم التكنولوجي",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Wi-Fi", "Projector", "Computers", "Programming Software", "STEM Tools"],
    capacity: 20,
    pricePerHour: 70,
    rating: 4.5,
    coordinates: {
      lat: 31.2089,
      lng: 29.9092
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "8",
    name: "AcA Robotics",
    type: "classroom",
    address: "الاسكندرية",
    city: "Alexandria",
    owner: "AcA Robotics",
    description: "مؤسسة تدريب متخصصة في الروبوتات والتكنولوجيا",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    ],
    equipment: ["Wi-Fi", "Robotics Kits", "Programming Tools", "Sensors", "Arduino"],
    capacity: 16,
    pricePerHour: 80,
    rating: 4.6,
    coordinates: {
      lat: 31.2089,
      lng: 29.9092
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "9",
    name: "أطفال اليكس",
    type: "classroom",
    address: "الاسكندرية",
    city: "Alexandria",
    owner: "Alex Kids",
    description: "مؤسسة تدريب متخصصة في تعليم الأطفال",
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
    ],
    equipment: ["Wi-Fi", "Educational Games", "Computers", "Kids-Friendly Tools", "Projector"],
    capacity: 22,
    pricePerHour: 65,
    rating: 4.4,
    coordinates: {
      lat: 31.2089,
      lng: 29.9092
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 5:00 PM"
    }
  },
  {
    id: "10",
    name: "Technospace",
    type: "makerspace",
    address: "الاسكندرية",
    city: "Alexandria",
    owner: "Technospace",
    description: "مؤسسة تدريب وتنظيم مسابقات متخصصة في التكنولوجيا",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a"
    ],
    equipment: ["Wi-Fi", "Projector", "3D Printer", "Robotics Kits", "Competition Equipment", "STEM Tools"],
    capacity: 25,
    pricePerHour: 90,
    rating: 4.8,
    coordinates: {
      lat: 31.2089,
      lng: 29.9092
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 7:00 PM"
    }
  },
  {
    id: "11",
    name: "تكنوسبيس",
    type: "makerspace",
    address: "الاسكندريه",
    city: "Alexandria",
    owner: "Technospace Alexandria",
    description: "مؤسسة تدريب وتنظيم مسابقات وتوريد مستلزمات",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a"
    ],
    equipment: ["Wi-Fi", "3D Printer", "Robotics Kits", "Electronics", "Competition Equipment", "Supply Materials"],
    capacity: 30,
    pricePerHour: 95,
    rating: 4.9,
    coordinates: {
      lat: 31.2089,
      lng: 29.9092
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 8:00 PM"
    }
  },
  {
    id: "12",
    name: "Sparkminds",
    type: "classroom",
    address: "الإسكندرية",
    city: "Alexandria",
    owner: "Sparkminds",
    description: "مؤسسة تدريب متخصصة في تطوير العقول المبدعة",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Wi-Fi", "Projector", "Creative Tools", "Programming Software", "Educational Games"],
    capacity: 20,
    pricePerHour: 75,
    rating: 4.6,
    coordinates: {
      lat: 31.2089,
      lng: 29.9092
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "13",
    name: "Pyramakerz",
    type: "makerspace",
    address: "الإسكندرية",
    city: "Alexandria",
    owner: "Pyramakerz",
    description: "مؤسسة تدريب وتوريد مستلزمات متخصصة في التصنيع الرقمي",
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    ],
    equipment: ["Wi-Fi", "3D Printer", "Laser Cutter", "Robotics Kits", "Electronics", "Design Software"],
    capacity: 20,
    pricePerHour: 100,
    rating: 4.9,
    coordinates: {
      lat: 31.2089,
      lng: 29.9092
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 7:00 PM"
    }
  },
  {
    id: "14",
    name: "ابيكس للبرمجة وتعليم علوم الكمبيوتر",
    type: "classroom",
    address: "الأقصر",
    city: "Luxor",
    owner: "Apex Programming Academy",
    description: "مؤسسة تدريب وتنظيم مسابقات متخصصة في البرمجة وعلوم الكمبيوتر",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Computers", "Programming Software", "Competition Equipment", "Projector"],
    capacity: 18,
    pricePerHour: 70,
    rating: 4.5,
    coordinates: {
      lat: 25.6872,
      lng: 32.6396
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "15",
    name: "Science Academy",
    type: "classroom",
    address: "البحيرة كوم حمادة",
    city: "Beheira",
    owner: "Science Academy",
    description: "مؤسسة تدريب متخصصة في العلوم والتكنولوجيا",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    ],
    equipment: ["Wi-Fi", "Science Lab Equipment", "Computers", "Projector", "STEM Tools"],
    capacity: 16,
    pricePerHour: 65,
    rating: 4.4,
    coordinates: {
      lat: 30.9667,
      lng: 30.7833
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday"],
      hours: "10:00 AM - 5:00 PM"
    }
  },
  {
    id: "16",
    name: "الخبير",
    type: "classroom",
    address: "البحيره",
    city: "Beheira",
    owner: "Al Khabeer",
    description: "مؤسسة تدريب متخصصة في التدريب المهني",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Wi-Fi", "Projector", "Training Materials", "Computers", "Professional Tools"],
    capacity: 20,
    pricePerHour: 60,
    rating: 4.3,
    coordinates: {
      lat: 30.8481,
      lng: 30.3436
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "17",
    name: "الأكاديمية الدولية للتدريب والابتكار",
    type: "classroom",
    address: "الجيزة",
    city: "Giza",
    owner: "International Training & Innovation Academy",
    description: "مؤسسة تدريب وتنظيم مسابقات متخصصة في التدريب والابتكار",
    images: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80"
    ],
    equipment: ["Wi-Fi", "Projector", "Innovation Tools", "Competition Equipment", "Training Materials"],
    capacity: 25,
    pricePerHour: 85,
    rating: 4.7,
    coordinates: {
      lat: 30.0131,
      lng: 31.2089
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 7:00 PM"
    }
  },
  {
    id: "18",
    name: "اكاديمية فانتازيا لتطوير الذات و التدريب التكنولوجى",
    type: "classroom",
    address: "الجيزة",
    city: "Giza",
    owner: "Fantasia Academy",
    description: "مؤسسة تدريب متخصصة في تطوير الذات والتدريب التكنولوجي",
    images: [
      "/lovable-uploads/8a4851c0-946b-4890-88c1-a1f4371febc3.png"
    ],
    equipment: ["Wi-Fi", "Projector", "Technology Tools", "Personal Development Materials", "Computers"],
    capacity: 22,
    pricePerHour: 80,
    rating: 4.6,
    coordinates: {
      lat: 29.9792,
      lng: 31.1342
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 7:00 PM"
    }
  },
  {
    id: "19",
    name: "Little Programmer Academy",
    type: "classroom",
    address: "الجيزة",
    city: "Giza",
    owner: "Little Programmer Academy",
    description: "مؤسسة تدريب متخصصة في تعليم البرمجة للأطفال",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Kid-Friendly Computers", "Programming Tools", "Educational Games", "Projector"],
    capacity: 18,
    pricePerHour: 75,
    rating: 4.8,
    coordinates: {
      lat: 30.0131,
      lng: 31.2089
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "20",
    name: "المخترع الصغير للمنتجات التعليمية",
    type: "makerspace",
    address: "الجيزة",
    city: "Giza",
    owner: "Little Inventor Educational Products",
    description: "مؤسسة تدريب وتوريد مستلزمات متخصصة في الاختراع والتعليم",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a"
    ],
    equipment: ["Wi-Fi", "3D Printer", "Invention Tools", "Educational Materials", "Prototyping Equipment"],
    capacity: 16,
    pricePerHour: 90,
    rating: 4.7,
    coordinates: {
      lat: 30.0131,
      lng: 31.2089
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "21",
    name: "Little Coder Academy",
    type: "classroom",
    address: "الجيزة",
    city: "Giza",
    owner: "Little Coder Academy",
    description: "مؤسسة تدريب متخصصة في تعليم البرمجة للأطفال الصغار",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Kid-Friendly Computers", "Programming Games", "Coding Tools", "Interactive Boards"],
    capacity: 20,
    pricePerHour: 70,
    rating: 4.6,
    coordinates: {
      lat: 30.0131,
      lng: 31.2089
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 5:00 PM"
    }
  },
  {
    id: "22",
    name: "Westview International School",
    type: "classroom",
    address: "الجيزة",
    city: "Giza",
    owner: "Westview International School",
    description: "موسسه تعليميه دولية متخصصة في التعليم الحديث",
    images: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80"
    ],
    equipment: ["Wi-Fi", "Interactive Boards", "Computers", "Educational Software", "Modern Classrooms"],
    capacity: 30,
    pricePerHour: 85,
    rating: 4.8,
    coordinates: {
      lat: 30.0131,
      lng: 31.2089
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "9:00 AM - 5:00 PM"
    }
  },
  {
    id: "23",
    name: "Egyptian Ministry of Education",
    type: "classroom",
    address: "الجيزة",
    city: "Giza",
    owner: "Egyptian Ministry of Education",
    description: "مؤسسة تدريب حكومية متخصصة في التطوير التعليمي",
    images: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80"
    ],
    equipment: ["Wi-Fi", "Projector", "Educational Materials", "Training Facilities", "Government Resources"],
    capacity: 40,
    pricePerHour: 50,
    rating: 4.2,
    coordinates: {
      lat: 30.0131,
      lng: 31.2089
    },
    availability: {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      hours: "9:00 AM - 4:00 PM"
    }
  },
  {
    id: "24",
    name: "Algo Coder Academy",
    type: "classroom",
    address: "الشرقية",
    city: "Sharqia",
    owner: "Algo Coder Academy",
    description: "مؤسسة تدريب متخصصة في الخوارزميات والبرمجة",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Computers", "Algorithm Tools", "Programming Software", "Projector"],
    capacity: 18,
    pricePerHour: 75,
    rating: 4.6,
    coordinates: {
      lat: 30.5965,
      lng: 31.5041
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "25",
    name: "Bright Brains Academy",
    type: "classroom",
    address: "العاشر من رمضان",
    city: "10th of Ramadan",
    owner: "Bright Brains Academy",
    description: "مؤسسة تدريب متخصصة في تطوير القدرات الذهنية",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Wi-Fi", "Brain Training Tools", "Educational Games", "Computers", "Projector"],
    capacity: 20,
    pricePerHour: 70,
    rating: 4.5,
    coordinates: {
      lat: 30.3273,
      lng: 31.7617
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "26",
    name: "سكوبو أكاديمي",
    type: "classroom",
    address: "الغربية",
    city: "Gharbia",
    owner: "Scopo Academy",
    description: "مؤسسة تدريب متخصصة في التعليم التفاعلي",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Wi-Fi", "Interactive Tools", "Educational Software", "Computers", "Projector"],
    capacity: 16,
    pricePerHour: 65,
    rating: 4.4,
    coordinates: {
      lat: 30.8760,
      lng: 31.0335
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday"],
      hours: "10:00 AM - 5:00 PM"
    }
  },
  {
    id: "27",
    name: "ICanCode Academy",
    type: "classroom",
    address: "الغربيه",
    city: "Gharbia",
    owner: "ICanCode Academy",
    description: "مؤسسة تدريب متخصصة في تعليم البرمجة",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Programming Tools", "Coding Software", "Computers", "Interactive Boards"],
    capacity: 18,
    pricePerHour: 75,
    rating: 4.7,
    coordinates: {
      lat: 30.8760,
      lng: 31.0335
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "28",
    name: "Robotics Education",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Robotics Education",
    description: "مؤسسة تدريب متخصصة في تعليم الروبوتات",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    ],
    equipment: ["Wi-Fi", "Robotics Kits", "Programming Tools", "Arduino", "Sensors"],
    capacity: 20,
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
    id: "29",
    name: "مشكاة كيدز",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Mishkah Kids",
    description: "مؤسسة تدريب متخصصة في تعليم الأطفال",
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
    ],
    equipment: ["Wi-Fi", "Kid-Friendly Tools", "Educational Games", "Interactive Learning", "Projector"],
    capacity: 25,
    pricePerHour: 70,
    rating: 4.6,
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
    id: "30",
    name: "Robocode School",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Robocode School",
    description: "مؤسسة تدريب متخصصة في برمجة الروبوتات",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    ],
    equipment: ["Wi-Fi", "Robotics Kits", "Programming Software", "Coding Tools", "Competition Equipment"],
    capacity: 18,
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
    id: "31",
    name: "Techademics",
    type: "makerspace",
    address: "القاهرة",
    city: "Cairo",
    owner: "Techademics",
    description: "مؤسسة تدريب وتنظيم مسابقات وتوريد مستلزمات تكنولوجية",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a"
    ],
    equipment: ["Wi-Fi", "3D Printer", "Robotics Kits", "Competition Equipment", "Tech Supplies", "Arduino"],
    capacity: 25,
    pricePerHour: 95,
    rating: 4.9,
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 8:00 PM"
    }
  },
  {
    id: "32",
    name: "Mindvalley",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Mindvalley",
    description: "مؤسسة تدريب متخصصة في تطوير العقل والتفكير",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    ],
    equipment: ["Wi-Fi", "Mind Development Tools", "Educational Software", "Meditation Space", "Projector"],
    capacity: 20,
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
    id: "33",
    name: "Rawasy Misr International School",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Rawasy Misr International School",
    description: "مؤسسة تعليمية وتدريبية دولية",
    images: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80"
    ],
    equipment: ["Wi-Fi", "Interactive Boards", "Modern Classrooms", "Educational Technology", "Language Lab"],
    capacity: 30,
    pricePerHour: 90,
    rating: 4.8,
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "9:00 AM - 5:00 PM"
    }
  },
  {
    id: "34",
    name: "Elite Language School",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Elite Language School",
    description: "مؤسسة تعليمية وتدريبية متخصصة في اللغات",
    images: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80"
    ],
    equipment: ["Wi-Fi", "Language Lab", "Audio Equipment", "Interactive Software", "Projector"],
    capacity: 25,
    pricePerHour: 75,
    rating: 4.6,
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      hours: "10:00 AM - 8:00 PM"
    }
  },
  {
    id: "35",
    name: "Innovation Hub",
    type: "makerspace",
    address: "القاهرة",
    city: "Cairo",
    owner: "Innovation Hub",
    description: "مؤسسة تدريب متخصصة في الابتكار والتكنولوجيا",
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    ],
    equipment: ["Wi-Fi", "3D Printer", "Innovation Tools", "Prototyping Equipment", "Design Software"],
    capacity: 20,
    pricePerHour: 100,
    rating: 4.9,
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 8:00 PM"
    }
  },
  {
    id: "36",
    name: "Logic Club",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Logic Club",
    description: "مؤسسة تدريب متخصصة في المنطق والتفكير النقدي",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    ],
    equipment: ["Wi-Fi", "Logic Games", "Problem Solving Tools", "Educational Software", "Interactive Boards"],
    capacity: 18,
    pricePerHour: 70,
    rating: 4.5,
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
    id: "37",
    name: "ETS Academy",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "ETS Academy",
    description: "مؤسسة تدريب متخصصة في التعليم التقني",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Wi-Fi", "Technical Equipment", "Computers", "Programming Tools", "Projector"],
    capacity: 22,
    pricePerHour: 80,
    rating: 4.7,
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
    id: "38",
    name: "Bricks Builder",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Bricks Builder",
    description: "مؤسسة تدريب متخصصة في البناء والتصميم",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a"
    ],
    equipment: ["Wi-Fi", "Building Materials", "Design Tools", "LEGO Kits", "Construction Equipment"],
    capacity: 20,
    pricePerHour: 75,
    rating: 4.6,
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
    id: "39",
    name: "Code & More",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Code & More",
    description: "مؤسسة تدريب متخصصة في البرمجة والتكنولوجيا",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Programming Tools", "Coding Software", "Computers", "Development Environment"],
    capacity: 18,
    pricePerHour: 80,
    rating: 4.7,
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
    id: "40",
    name: "شركة مواهب للتدريب وتنمية المهارات",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Mawaheb Training & Skills Development",
    description: "موسسه تدريب وتنظيم مسابقات متخصصة في تنمية المواهب والمهارات",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Wi-Fi", "Skills Development Tools", "Competition Equipment", "Training Materials", "Projector"],
    capacity: 25,
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
    id: "41",
    name: "Algorithmics Nasr City and Sheikh Zayed",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Algorithmics",
    description: "مؤسسة تدريب دولية متخصصة في البرمجة والخوارزميات",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Programming Tools", "Algorithm Software", "Computers", "Interactive Learning"],
    capacity: 30,
    pricePerHour: 90,
    rating: 4.9,
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 8:00 PM"
    }
  },
  {
    id: "42",
    name: "Robotico Academy",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Robotico Academy",
    description: "مؤسسة تدريب متخصصة في الروبوتات والتكنولوجيا",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    ],
    equipment: ["Wi-Fi", "Advanced Robotics Kits", "Programming Software", "AI Tools", "Competition Equipment"],
    capacity: 20,
    pricePerHour: 95,
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
    id: "43",
    name: "STEM.org Educational Research™",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "STEM.org Educational Research",
    description: "مؤسسة تدريب واعتماد متخصصة في تعليم STEM",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    ],
    equipment: ["Wi-Fi", "STEM Equipment", "Research Tools", "Certification Materials", "Lab Equipment"],
    capacity: 25,
    pricePerHour: 100,
    rating: 4.9,
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 8:00 PM"
    }
  },
  {
    id: "44",
    name: "المركز الوطني للتحول الرقمي",
    type: "makerspace",
    address: "القاهرة",
    city: "Cairo",
    owner: "National Digital Transformation Center",
    description: "مؤسسة تدريب حكومية متخصصة في التحول الرقمي",
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    ],
    equipment: ["Wi-Fi", "Digital Tools", "Advanced Technology", "Government Resources", "Training Facilities"],
    capacity: 40,
    pricePerHour: 60,
    rating: 4.5,
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    availability: {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      hours: "9:00 AM - 5:00 PM"
    }
  },
  {
    id: "45",
    name: "Phoenix Look Academy",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Phoenix Look Academy",
    description: "مؤسسة تدريب متخصصة في التطوير الشخصي والمهني",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Wi-Fi", "Training Materials", "Professional Development Tools", "Computers", "Projector"],
    capacity: 22,
    pricePerHour: 75,
    rating: 4.6,
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
    id: "46",
    name: "ديسكفري للعلوم والتكنولوجيا",
    type: "makerspace",
    address: "القاهرة",
    city: "Cairo",
    owner: "Discovery Science & Technology",
    description: "مؤسسة تدريب وتنظيم مسابقات متخصصة في العلوم والتكنولوجيا",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a"
    ],
    equipment: ["Wi-Fi", "Science Lab", "Technology Tools", "Competition Equipment", "Research Facilities"],
    capacity: 30,
    pricePerHour: 90,
    rating: 4.8,
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 8:00 PM"
    }
  },
  {
    id: "47",
    name: "معاهد تاجان",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Tajan Institutes",
    description: "مؤسسة تدريب متعددة التخصصات",
    images: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80"
    ],
    equipment: ["Wi-Fi", "Multi-purpose Facilities", "Training Equipment", "Educational Resources", "Projector"],
    capacity: 35,
    pricePerHour: 70,
    rating: 4.4,
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
    id: "48",
    name: "MMS Academy",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "MMS Academy",
    description: "مؤسسة تدريب متخصصة في الوسائط المتعددة",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Multimedia Tools", "Video Equipment", "Audio Systems", "Design Software"],
    capacity: 20,
    pricePerHour: 85,
    rating: 4.7,
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
    id: "49",
    name: "Programming4OurKids",
    type: "classroom",
    address: "القاهرة",
    city: "Cairo",
    owner: "Programming4OurKids",
    description: "مؤسسة تدريب متخصصة في تعليم البرمجة للأطفال",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Kid-Friendly Programming Tools", "Educational Games", "Computers", "Interactive Learning"],
    capacity: 18,
    pricePerHour: 70,
    rating: 4.6,
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
    id: "50",
    name: "Stem Zone",
    type: "makerspace",
    address: "القاهره",
    city: "Cairo",
    owner: "Stem Zone",
    description: "مؤسسة تدريب وتنظيم مسابقات وتوريد مستلزمات متخصصة في STEM",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a"
    ],
    equipment: ["Wi-Fi", "STEM Lab Equipment", "3D Printer", "Robotics Kits", "Competition Tools", "Science Materials"],
    capacity: 30,
    pricePerHour: 100,
    rating: 4.9,
    coordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 8:00 PM"
    }
  },
  {
    id: "51",
    name: "YALLA Learn Academy",
    type: "classroom",
    address: "القليوبية",
    city: "Qalyubia",
    owner: "YALLA Learn Academy",
    description: "مؤسسة تدريب متخصصة في التعلم التفاعلي",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Wi-Fi", "Interactive Learning Tools", "Educational Software", "Computers", "Audio-Visual Equipment"],
    capacity: 20,
    pricePerHour: 65,
    rating: 4.5,
    coordinates: {
      lat: 30.1798,
      lng: 31.2456
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "52",
    name: "iDeveloper",
    type: "classroom",
    address: "القليوبية - بنها",
    city: "Benha",
    owner: "iDeveloper",
    description: "مؤسسة تدريب متخصصة في تطوير البرمجيات",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Development Tools", "Programming Software", "Computers", "Testing Environment"],
    capacity: 16,
    pricePerHour: 75,
    rating: 4.6,
    coordinates: {
      lat: 30.4648,
      lng: 31.1837
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "53",
    name: "Robo Mind",
    type: "classroom",
    address: "المنوفيه",
    city: "Menoufia",
    owner: "Robo Mind",
    description: "مؤسسة تدريب متخصصة في الروبوتات والذكاء الاصطناعي",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    ],
    equipment: ["Wi-Fi", "Advanced Robotics", "AI Tools", "Programming Software", "Mind Mapping Tools"],
    capacity: 18,
    pricePerHour: 80,
    rating: 4.7,
    coordinates: {
      lat: 30.5972,
      lng: 30.9876
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "54",
    name: "4My-Robot",
    type: "classroom",
    address: "المنوفيه",
    city: "Menoufia",
    owner: "4My-Robot",
    description: "مؤسسة تدريب متخصصة في الروبوتات الشخصية",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    ],
    equipment: ["Wi-Fi", "Personal Robotics Kits", "Programming Tools", "Customization Equipment", "Assembly Tools"],
    capacity: 15,
    pricePerHour: 75,
    rating: 4.6,
    coordinates: {
      lat: 30.5972,
      lng: 30.9876
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday"],
      hours: "10:00 AM - 5:00 PM"
    }
  },
  {
    id: "55",
    name: "Light Academy",
    type: "classroom",
    address: "المنوفيه منوف",
    city: "Menoufia",
    owner: "Light Academy",
    description: "مؤسسة تدريب متخصصة في التنوير والتعليم",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7"
    ],
    equipment: ["Wi-Fi", "Educational Tools", "Learning Materials", "Computers", "Interactive Boards"],
    capacity: 20,
    pricePerHour: 60,
    rating: 4.4,
    coordinates: {
      lat: 30.5972,
      lng: 30.9876
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "56",
    name: "Robonest Academy",
    type: "classroom",
    address: "المنيا الجديده",
    city: "New Minya",
    owner: "Robonest Academy",
    description: "مؤسسة تدريب متخصصة في عش الروبوتات",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    ],
    equipment: ["Wi-Fi", "Robotics Nest Setup", "Advanced Programming", "Competition Robots", "Development Environment"],
    capacity: 16,
    pricePerHour: 85,
    rating: 4.7,
    coordinates: {
      lat: 28.0871,
      lng: 30.7618
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "57",
    name: "TricksLandSteamAcademy",
    type: "makerspace",
    address: "بنى سويف",
    city: "Beni Suef",
    owner: "TricksLand Steam Academy",
    description: "مؤسسة تدريب متخصصة في STEAM والحيل التعليمية",
    images: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a"
    ],
    equipment: ["Wi-Fi", "STEAM Equipment", "Creative Tools", "Art Supplies", "Science Lab", "Technology Tools"],
    capacity: 20,
    pricePerHour: 75,
    rating: 4.6,
    coordinates: {
      lat: 29.0661,
      lng: 31.0994
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "58",
    name: "Little Coder Academy Beni Suef",
    type: "classroom",
    address: "بنى سويف",
    city: "Beni Suef",
    owner: "Little Coder Academy",
    description: "مؤسسة تدريب متخصصة في تعليم البرمجة للأطفال",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Kid Programming Tools", "Educational Games", "Child-Friendly Computers", "Interactive Learning"],
    capacity: 18,
    pricePerHour: 65,
    rating: 4.5,
    coordinates: {
      lat: 29.0661,
      lng: 31.0994
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 5:00 PM"
    }
  },
  {
    id: "59",
    name: "مكتبة مصر العامة بدمنهور",
    type: "library",
    address: "دمنهور",
    city: "Damanhur",
    owner: "Egypt Public Library Damanhur",
    description: "مؤسسة تدريب ومكتبة عامة متخصصة في التعليم المجتمعي",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    ],
    equipment: ["Wi-Fi", "Library Resources", "Computers", "Reading Areas", "Educational Materials"],
    capacity: 40,
    pricePerHour: 30,
    rating: 4.3,
    coordinates: {
      lat: 31.0364,
      lng: 30.4686
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      hours: "9:00 AM - 7:00 PM"
    }
  },
  {
    id: "60",
    name: "اكاديميه الطفل العبقري",
    type: "classroom",
    address: "سوهاج",
    city: "Sohag",
    owner: "Genius Child Academy",
    description: "مؤسسة تدريب متخصصة في تنمية قدرات الأطفال الفائقة",
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
    ],
    equipment: ["Wi-Fi", "Genius Development Tools", "Educational Games", "IQ Testing", "Creative Materials"],
    capacity: 16,
    pricePerHour: 60,
    rating: 4.5,
    coordinates: {
      lat: 26.5569,
      lng: 31.6948
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday"],
      hours: "10:00 AM - 5:00 PM"
    }
  },
  {
    id: "61",
    name: "IEEE",
    type: "classroom",
    address: "طوخ القليوبية",
    city: "Tokh Qalyubia",
    owner: "IEEE",
    description: "مؤسسة تدريب تقنية متخصصة في الهندسة الكهربائية والإلكترونية",
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    ],
    equipment: ["Wi-Fi", "Engineering Equipment", "Electronics Lab", "Technical Tools", "Professional Standards"],
    capacity: 25,
    pricePerHour: 90,
    rating: 4.8,
    coordinates: {
      lat: 30.3667,
      lng: 31.2000
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "62",
    name: "مركز ايفيكوم للتدريب والبرمجيات",
    type: "classroom",
    address: "قنا",
    city: "Qena",
    owner: "Evicom Training & Software Center",
    description: "مؤسسة تدريب متخصصة في البرمجيات والتدريب التقني",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Software Development Tools", "Programming Environment", "Computers", "Training Materials"],
    capacity: 20,
    pricePerHour: 65,
    rating: 4.4,
    coordinates: {
      lat: 26.1551,
      lng: 32.7160
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
    }
  },
  {
    id: "63",
    name: "Ebiar Official Language School",
    type: "classroom",
    address: "كفر الزيات",
    city: "Kafr El Zayat",
    owner: "Ebiar Official Language School",
    description: "مؤسسة تعليمية وتدريبية متخصصة في اللغات الرسمية",
    images: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80"
    ],
    equipment: ["Wi-Fi", "Language Lab", "Audio Equipment", "Interactive Software", "Educational Technology"],
    capacity: 30,
    pricePerHour: 70,
    rating: 4.6,
    coordinates: {
      lat: 30.8139,
      lng: 30.8217
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "9:00 AM - 5:00 PM"
    }
  },
  {
    id: "64",
    name: "Future Technology",
    type: "classroom",
    address: "كفر الشيخ",
    city: "Kafr El Sheikh",
    owner: "Future Technology",
    description: "مؤسسة تدريب متخصصة في تكنولوجيا المستقبل",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    ],
    equipment: ["Wi-Fi", "Future Tech Tools", "AI Equipment", "VR/AR Systems", "Advanced Computing"],
    capacity: 20,
    pricePerHour: 85,
    rating: 4.7,
    coordinates: {
      lat: 31.1107,
      lng: 30.9388
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 7:00 PM"
    }
  },
  {
    id: "65",
    name: "New Mind",
    type: "classroom",
    address: "كفرالشيخ",
    city: "Kafr El Sheikh",
    owner: "New Mind",
    description: "مؤسسة تدريب وتنظيم مسابقات متخصصة في تطوير العقل الجديد",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    ],
    equipment: ["Wi-Fi", "Mind Development Tools", "Competition Equipment", "Brain Training", "Creative Materials"],
    capacity: 18,
    pricePerHour: 70,
    rating: 4.5,
    coordinates: {
      lat: 31.1107,
      lng: 30.9388
    },
    availability: {
      days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      hours: "10:00 AM - 6:00 PM"
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
