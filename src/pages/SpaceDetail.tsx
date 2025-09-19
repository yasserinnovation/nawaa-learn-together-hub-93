import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Space } from "@/types/space";
import { ArrowLeft, MapPin, Users, Star, Clock, Wifi, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useLanguage } from "@/contexts/LanguageContext";

const SpaceDetail = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (spaceId) {
      fetchSpaceDetail(spaceId);
    }
  }, [spaceId]);

  const fetchSpaceDetail = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      // Convert database format to expected format
      const convertedSpace: Space = {
        id: data.id,
        name: data.name,
        type: data.type as 'library' | 'classroom' | 'makerspace' | 'coworking' | 'hall',
        address: data.address || '',
        city: data.city,
        owner: data.owner || '',
        description: data.description || '',
        images: data.images || ['https://images.unsplash.com/photo-1509062522246-3755977927d7'],
        equipment: data.equipment || [],
        capacity: data.capacity || 10,
        pricePerHour: data.price_per_hour || 50,
        rating: data.rating || 4.5,
        coordinates: {
          lat: (data.coordinates as any)?.lat || 30.0444,
          lng: (data.coordinates as any)?.lng || 31.2357
        },
        availability: {
          days: (data.availability as any)?.days || [],
          hours: (data.availability as any)?.hours || '9:00 AM - 6:00 PM'
        }
      };

      setSpace(convertedSpace);
    } catch (error) {
      console.error('Error fetching space detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEnhancedImageUrl = (index: number) => {
    if (!space) return '';
    
    const imageMap: Record<string, string[]> = {
      "makerspace": [
        "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800"
      ],
      "classroom": [
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
      ],
      "coworking": [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800"
      ],
      "library": [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800"
      ]
    };

    if (space.type in imageMap) {
      const images = imageMap[space.type];
      return images[index % images.length];
    }
    
    return space.images[index % space.images.length];
  };

  const nextImage = () => {
    if (space) {
      setCurrentImageIndex((prev) => 
        prev === space.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (space) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? space.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" text="Loading space details..." />
        </div>
      </Layout>
    );
  }

  if (!space) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Space Not Found</h1>
            <Button onClick={() => navigate('/discover-spaces')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Spaces
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate('/discover-spaces')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Spaces
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={getEnhancedImageUrl(currentImageIndex)}
                alt={space.name}
                className="w-full h-full object-cover"
              />
              
              {space.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    ›
                  </button>
                </>
              )}
              
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-yellow-500 text-white">
                  {space.type.charAt(0).toUpperCase() + space.type.slice(1)}
                </Badge>
              </div>
            </div>
            
            {/* Thumbnail Navigation */}
            {space.images.length > 1 && (
              <div className="flex space-x-2">
                {space.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      idx === currentImageIndex ? 'border-yellow-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={getEnhancedImageUrl(idx)}
                      alt={`${space.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Space Details */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{space.name}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{space.address}, {space.city}</span>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{space.rating}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{space.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-sm text-gray-600">Up to {space.capacity} people</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-sm text-gray-600">{space.availability.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Equipment */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wifi className="h-5 w-5 mr-2" />
                  Available Equipment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {space.equipment.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Available Days
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {space.availability.days.map((day) => (
                    <Badge key={day} variant="secondary">
                      {day}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Contact */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-semibold">Price</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {space.pricePerHour} جنيه/hour
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Owner</p>
                  <p className="font-medium">{space.owner}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Owner
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SpaceDetail;