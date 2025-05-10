
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "lucide-react";

interface Trainer {
  id: string;
  name: string;
  location: string;
  languages: string[];
  expertise: string[];
  gender: string;
  rating: number;
  imageUrl: string;
  experience: number;
  specialties: string[];
  availability: string[];
  bio: string;
}

const mockTrainers: Trainer[] = [
  {
    id: "1",
    name: "Fatima Al-Zahrani",
    location: "Riyadh",
    languages: ["Arabic", "English"],
    expertise: ["Robotics", "Electronics"],
    gender: "Female",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    experience: 5,
    specialties: ["Teaching girls aged 8-12", "Robotics competitions"],
    availability: ["Weekends", "Evenings"],
    bio: "Specialized in teaching STEM to young girls, with a focus on making robotics accessible and engaging. Holds a Master's in Computer Engineering and has led teams to regional championships."
  },
  {
    id: "2",
    name: "Ahmed Al-Dosari",
    location: "Jeddah",
    languages: ["Arabic", "English"],
    expertise: ["3D Printing", "Coding for Kids"],
    gender: "Male",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    experience: 4,
    specialties: ["Game development", "Creative coding"],
    availability: ["Weekdays", "Mornings"],
    bio: "Former software developer who now dedicates his time to teaching children coding through game development. Created several educational coding platforms used in schools across Saudi Arabia."
  },
  {
    id: "3",
    name: "Norah Al-Qahtani",
    location: "Dammam",
    languages: ["Arabic", "English", "French"],
    expertise: ["AI for Kids", "Electronics"],
    gender: "Female",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    experience: 7,
    specialties: ["AI ethics for children", "Interactive learning"],
    availability: ["Flexible", "Online sessions"],
    bio: "PhD in Computer Science with specialization in AI. Passionate about teaching children the fundamentals of AI and ethics in technology. Has developed curriculum for several international schools."
  }
];

interface TrainerSelectionProps {
  bundle: any;
  updateBundle: (key: string, value: any) => void;
}

const TrainerSelection = ({ bundle, updateBundle }: TrainerSelectionProps) => {
  const [filters, setFilters] = useState({
    location: "all",
    language: "all",
    gender: "all",
    expertise: "all"
  });
  
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(
    bundle.trainer ? bundle.trainer.id : null
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleTrainerSelect = (trainer: Trainer) => {
    setSelectedTrainer(trainer.id);
    updateBundle("trainer", trainer);
  };

  // Filter trainers based on selected filters
  const filteredTrainers = mockTrainers.filter(trainer => {
    if (filters.location !== "all" && trainer.location !== filters.location) return false;
    if (filters.language !== "all" && !trainer.languages.includes(filters.language)) return false;
    if (filters.gender !== "all" && trainer.gender !== filters.gender) return false;
    if (filters.expertise !== "all" && !trainer.expertise.includes(filters.expertise)) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">Filter Trainers</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Location</h3>
              <RadioGroup 
                value={filters.location} 
                onValueChange={(value) => handleFilterChange("location", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="location-all" />
                  <Label htmlFor="location-all">All Locations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Riyadh" id="location-riyadh" />
                  <Label htmlFor="location-riyadh">Riyadh</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Jeddah" id="location-jeddah" />
                  <Label htmlFor="location-jeddah">Jeddah</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Dammam" id="location-dammam" />
                  <Label htmlFor="location-dammam">Dammam</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Language</h3>
              <RadioGroup 
                value={filters.language} 
                onValueChange={(value) => handleFilterChange("language", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="language-all" />
                  <Label htmlFor="language-all">All Languages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Arabic" id="language-arabic" />
                  <Label htmlFor="language-arabic">Arabic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="English" id="language-english" />
                  <Label htmlFor="language-english">English</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Gender</h3>
              <RadioGroup 
                value={filters.gender} 
                onValueChange={(value) => handleFilterChange("gender", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="gender-all" />
                  <Label htmlFor="gender-all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="gender-female" />
                  <Label htmlFor="gender-female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="gender-male" />
                  <Label htmlFor="gender-male">Male</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Expertise</h3>
              <RadioGroup 
                value={filters.expertise} 
                onValueChange={(value) => handleFilterChange("expertise", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="expertise-all" />
                  <Label htmlFor="expertise-all">All Areas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Robotics" id="expertise-robotics" />
                  <Label htmlFor="expertise-robotics">Robotics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Coding for Kids" id="expertise-coding" />
                  <Label htmlFor="expertise-coding">Coding for Kids</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Electronics" id="expertise-electronics" />
                  <Label htmlFor="expertise-electronics">Electronics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3D Printing" id="expertise-3d" />
                  <Label htmlFor="expertise-3d">3D Printing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="AI for Kids" id="expertise-ai" />
                  <Label htmlFor="expertise-ai">AI for Kids</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-semibold mb-6">Choose a Trainer</h2>
        
        {filteredTrainers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTrainers.map((trainer) => (
              <Card 
                key={trainer.id} 
                className={`cursor-pointer transition-all ${
                  selectedTrainer === trainer.id ? 'ring-2 ring-yellow-500' : ''
                }`}
                onClick={() => handleTrainerSelect(trainer)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={trainer.imageUrl} 
                      alt={trainer.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                      {trainer.rating} ★
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{trainer.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {trainer.location} • {trainer.experience} years experience
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {trainer.expertise.map((skill) => (
                        <span 
                          key={skill} 
                          className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-sm line-clamp-2 text-gray-700 mb-3">
                      {trainer.bio}
                    </p>
                    
                    <div className="text-sm text-gray-600">
                      Available: {trainer.availability.join(", ")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No trainers match your current filters. Try adjusting your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerSelection;
