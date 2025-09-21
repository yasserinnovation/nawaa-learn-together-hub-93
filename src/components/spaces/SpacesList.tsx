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
  filters?: SpaceFilter;
}

const SpacesList = ({ filters }: SpacesListProps) => {
  // Provide default filters when none are passed
  const defaultFilters: SpaceFilter = {
    searchText: '',
    distance: 50,
    capacity: 0,
    equipment: [],
    availability: null,
  };
  
  const activeFilters = filters || defaultFilters;
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    console.log('SpacesList: Starting to fetch spaces...');
    try {
      // Query the spaces table from Supabase
      const { data, error } = await (supabase as any)
        .from('spaces')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('SpacesList: Raw data from Supabase:', data);
      console.log('SpacesList: Number of spaces:', data?.length || 0);
      
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

  // Helper function to expand search terms with Arabic/English equivalents
  const expandSearchTerms = (searchText: string): string[] => {
    const terms = [searchText];
    const lowerSearch = searchText.toLowerCase();
    
    // Arabic-English location mappings
    const locationMappings: { [key: string]: string[] } = {
      'الهرم': ['giza', 'pyramids', 'pyramid', 'الجيزة'],
      'الجيزة': ['giza', 'pyramids', 'pyramid', 'الهرم'],
      'giza': ['الجيزة', 'الهرم', 'pyramids', 'pyramid'],
      'pyramids': ['الهرم', 'الجيزة', 'giza'],
      'pyramid': ['الهرم', 'الجيزة', 'giza'],
      'القاهرة': ['cairo', 'قاهرة'],
      'cairo': ['القاهرة', 'قاهرة'],
      'الإسكندرية': ['alexandria', 'اسكندرية'],
      'اسكندرية': ['alexandria', 'الإسكندرية'],
      'alexandria': ['الإسكندرية', 'اسكندرية'],
      'أسوان': ['aswan'],
      'aswan': ['أسوان'],
      'المنصورة': ['mansoura'],
      'mansoura': ['المنصورة'],
      'الشرقية': ['sharqiya', 'eastern'],
      'أكاديمية': ['academy', 'اكاديمية'],
      'academy': ['أكاديمية', 'اكاديمية'],
      'مدرسة': ['school'],
      'school': ['مدرسة'],
      'روبوت': ['robot', 'robotics'],
      'robotics': ['روبوت', 'روبوتات'],
      'robot': ['روبوت'],
      'برمجة': ['programming', 'coding', 'code'],
      'programming': ['برمجة'],
      'coding': ['برمجة'],
      'تدريب': ['training', 'education'],
      'training': ['تدريب'],
    };
    
    // Add mapped terms
    Object.keys(locationMappings).forEach(key => {
      if (lowerSearch.includes(key)) {
        terms.push(...locationMappings[key]);
      }
    });
    
    return [...new Set(terms)]; // Remove duplicates
  };

  const filteredSpaces = useMemo(() => {
    // If no filters are provided or all filters are at default values, show all spaces
    const hasActiveFilters = 
      activeFilters.searchText && activeFilters.searchText.trim() !== '' ||
      activeFilters.capacity > 0 ||
      activeFilters.equipment.length > 0 ||
      activeFilters.availability !== null;

    if (!hasActiveFilters) {
      console.log('SpacesList: No active filters, showing all spaces:', spaces.length);
      return spaces;
    }

    const result = spaces.filter(space => {
      // Search text filter
      if (activeFilters.searchText && activeFilters.searchText.trim()) {
        const searchTerms = expandSearchTerms(activeFilters.searchText);
        
        let matchesSearch = false;
        
        for (const term of searchTerms) {
          const lowerTerm = term.toLowerCase();
          const matchesName = space.name.toLowerCase().includes(lowerTerm);
          const matchesDescription = space.description.toLowerCase().includes(lowerTerm);
          const matchesAddress = space.address.toLowerCase().includes(lowerTerm);
          const matchesCity = space.city.toLowerCase().includes(lowerTerm);
          const matchesOwner = space.owner.toLowerCase().includes(lowerTerm);
          
          if (matchesName || matchesDescription || matchesAddress || matchesCity || matchesOwner) {
            matchesSearch = true;
            break;
          }
        }
        
        if (!matchesSearch) {
          return false;
        }
      }

      // Capacity filter
      if (activeFilters.capacity > 0 && space.capacity < activeFilters.capacity) {
        return false;
      }

      // Equipment filter
      if (activeFilters.equipment.length > 0) {
        const hasRequiredEquipment = activeFilters.equipment.every(item => 
          space.equipment.includes(item)
        );
        if (!hasRequiredEquipment) {
          return false;
        }
      }

      return true;
    });
    
    console.log('SpacesList: Filtered results:', result.length);
    return result;
  }, [spaces, activeFilters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading spaces..." />
      </div>
    );
  }

  console.log('SpacesList render - spaces:', spaces.length, 'filteredSpaces:', filteredSpaces.length);

  return (
    <ScrollReveal>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 id="spaces-results-heading" className="text-2xl font-bold text-foreground">
            Available Spaces ({filteredSpaces.length})
          </h2>
          <select 
            className="py-2 px-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-background shadow-sm hover:shadow-md text-foreground"
            aria-label="Sort spaces by different criteria"
          >
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
            <div className="text-center py-16 bg-muted/30 rounded-2xl">
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No spaces found
                </h3>
                <p className="text-muted-foreground">
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