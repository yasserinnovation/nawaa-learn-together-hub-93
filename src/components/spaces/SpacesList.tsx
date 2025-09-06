import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock, Wifi } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SpaceCard from "./SpaceCard";
import { SpaceFilter, Space } from "@/types/space";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ScrollReveal from "@/components/common/ScrollReveal";

interface SpacesListProps {
  filters: SpaceFilter;
}

const SpacesList = ({ filters }: SpacesListProps) => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      // Query the spaces table from Supabase
      const { data, error } = await (supabase as any)
        .from('spaces')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Convert database format to expected format
      const convertedSpaces: Space[] = (data || []).map(space => ({
        id: space.id,
        name: space.name,
        type: space.type as 'library' | 'classroom' | 'makerspace' | 'coworking' | 'hall',
        address: space.address || '',
        city: space.city,
        owner: space.owner || '',
        description: space.description || '',
        images: space.images || ['https://images.unsplash.com/photo-1509062522246-3755977927d7'],
        equipment: space.equipment || [],
        capacity: space.capacity || 10,
        pricePerHour: space.price_per_hour || 50,
        rating: 4.5, // Default rating until we implement ratings
        coordinates: {
          lat: space.coordinates?.lat || 30.0444,
          lng: space.coordinates?.lng || 31.2357
        },
        availability: {
          days: space.availability?.days || [],
          hours: space.availability?.hours || '9:00 AM - 6:00 PM'
        }
      }));
      
      setSpaces(convertedSpaces);
    } catch (error) {
      console.error('Error fetching spaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSpaces = useMemo(() => {
    return spaces.filter(space => {
      // Capacity filter
      if (filters.capacity && space.capacity < filters.capacity) {
        return false;
      }

      // Equipment filter
      if (filters.equipment.length > 0) {
        const hasRequiredEquipment = filters.equipment.every(item => 
          space.equipment.includes(item)
        );
        if (!hasRequiredEquipment) {
          return false;
        }
      }

      // Note: Distance and availability filters would require more complex logic
      // For now, we're showing all spaces that match capacity and equipment

      return true;
    });
  }, [spaces, filters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading spaces..." />
      </div>
    );
  }

  return (
    <ScrollReveal>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Spaces ({filteredSpaces.length})
          </h2>
          <select className="py-2 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md">
            <option>Sort by: Recommended</option>
            <option>Sort by: Price (Low to High)</option>
            <option>Sort by: Rating</option>
            <option>Sort by: Capacity</option>
          </select>
        </div>

        {filteredSpaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredSpaces.map((space, index) => (
              <ScrollReveal key={space.id} delay={index * 100}>
                <SpaceCard space={space} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal>
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No spaces found
                </h3>
                <p className="text-gray-500">
                  No spaces match your current filters. Try adjusting your criteria to see more results.
                </p>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </ScrollReveal>
  );
};

export default SpacesList;