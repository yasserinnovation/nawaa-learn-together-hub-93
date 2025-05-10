
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Award, Language, Users } from "lucide-react";
import { Trainer } from "@/types/trainer";
import { useNavigate } from "react-router-dom";

interface TrainerCardProps {
  trainer: Trainer;
}

const TrainerCard = ({ trainer }: TrainerCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={trainer.imageUrl} 
            alt={trainer.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center">
            <Star className="h-3 w-3 mr-1" /> {trainer.rating.toFixed(1)}
          </div>
          {trainer.hasCertifications && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1">
                <Award className="h-3 w-3" /> Certified
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold">{trainer.name}</h3>
          
          <div className="flex items-center text-gray-600 text-sm mt-1 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{trainer.location}</span>
            <span className="mx-2">•</span>
            <span>{trainer.experience} years experience</span>
            <span className="mx-2">•</span>
            <span>{trainer.reviewCount} reviews</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {trainer.expertise.map((skill) => (
              <Badge key={skill} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="mb-3 flex items-start gap-2">
            <Users className="h-4 w-4 text-gray-500 mt-0.5" />
            <span className="text-sm text-gray-600">
              Teaches: {trainer.ageGroups.join(", ")} years
            </span>
          </div>
          
          <div className="mb-3 flex items-start gap-2">
            <Language className="h-4 w-4 text-gray-500 mt-0.5" />
            <span className="text-sm text-gray-600">
              Languages: {trainer.languages.join(", ")}
            </span>
          </div>
          
          <div className="mb-4 flex items-start gap-2">
            <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
            <span className="text-sm text-gray-600">
              Available: {trainer.availability.join(", ")}
            </span>
          </div>
          
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
            {trainer.bio}
          </p>
          
          <div className="flex gap-3">
            <Button 
              className="w-full bg-yellow-500 hover:bg-yellow-600"
              onClick={() => navigate(`/trainers/${trainer.id}`)}
            >
              View Profile
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate(`/build-bundle?trainerId=${trainer.id}`)}
            >
              Add to Bundle
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainerCard;
