
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Space } from "@/types/space";
import { MapPin, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SpaceCardProps {
  space: Space;
}

const SpaceCard = ({ space }: SpaceCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Enhance the image URLs with real images based on space types
  const getEnhancedImageUrl = (index: number) => {
    const imageMap: Record<string, string[]> = {
      "makerspace": [
        "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=600"
      ],
      "classroom": [
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600"
      ],
      "lab": [
        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"
      ],
      "studio": [
        "https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?auto=format&fit=crop&q=80&w=600"
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
          <img 
            src={getEnhancedImageUrl(currentImageIndex)}
            alt={space.name}
            className="w-full h-full object-cover transition-transform duration-500"
          />
          
          {space.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
                aria-label="Next image"
              >
                ›
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {space.images.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`block h-2 w-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                  ></span>
                ))}
              </div>
            </>
          )}
          
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded">
            {space.type.charAt(0).toUpperCase() + space.type.slice(1)}
          </div>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{space.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{space.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="line-clamp-1">{space.address}, {space.city}</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{space.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {space.equipment.slice(0, 3).map((item) => (
            <span key={item} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {item}
            </span>
          ))}
          {space.equipment.length > 3 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              +{space.equipment.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-2 text-sm">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>Up to {space.capacity} people</span>
          </div>
          <div className="font-semibold">
            {space.pricePerHour} SAR/hour
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SpaceCard;
