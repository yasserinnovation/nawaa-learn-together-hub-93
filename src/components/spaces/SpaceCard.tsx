
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Space } from "@/types/space";
import { MapPin, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SpaceCardProps {
  space: Space;
}

const SpaceCard = ({ space }: SpaceCardProps) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleViewDetails = () => {
    navigate(`/spaces/${space.id}`);
  };

  // Enhance the image URLs with real images based on space types
  const getEnhancedImageUrl = (index: number) => {
    const imageMap: Record<string, string[]> = {
      "makerspace": [
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
      ],
      "classroom": [
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"
      ],
      "library": [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800"
      ],
      "coworking": [
        "https://images.unsplash.com/photo-1497366812748-7b5800b65f1e?w=800",
        "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=800"
      ],
      "hall": [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800"
      ]
    };

    if (space.type in imageMap) {
      const images = imageMap[space.type];
      const imgIndex = index % images.length;
      return images[imgIndex];
    }
    
    return space.images[index % space.images.length];
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === space.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? space.images.length - 1 : prev - 1
    );
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border-border">
      <div className="relative">
        <div className="aspect-[16/9] bg-muted relative overflow-hidden">
          <img 
            src={getEnhancedImageUrl(currentImageIndex)}
            alt={`${space.name} - ${space.type} in ${space.city}`}
            className="w-full h-full object-cover transition-transform duration-500"
            loading="lazy"
          />
          
          {space.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
                aria-label={`Previous image of ${space.name}`}
              >
                ‹
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
                aria-label={`Next image of ${space.name}`}
              >
                ›
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1" role="group" aria-label="Image indicators">
                {space.images.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`block h-2 w-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    aria-hidden="true"
                  ></span>
                ))}
              </div>
            </>
          )}
          
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-semibold rounded">
            {space.type.charAt(0).toUpperCase() + space.type.slice(1)}
          </div>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1 text-card-foreground">{space.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
            <span className="ml-1 text-sm font-medium text-card-foreground">{space.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 mr-1" aria-hidden="true" />
          <span className="line-clamp-1">{space.address}, {space.city}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{space.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3" role="list" aria-label="Available equipment">
          {space.equipment.slice(0, 3).map((item) => (
            <span key={item} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
              {item}
            </span>
          ))}
          {space.equipment.length > 3 && (
            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
              +{space.equipment.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center mt-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-1" aria-hidden="true" />
            <span>Up to {space.capacity} people</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={handleViewDetails}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label={`View details for ${space.name}`}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SpaceCard;
