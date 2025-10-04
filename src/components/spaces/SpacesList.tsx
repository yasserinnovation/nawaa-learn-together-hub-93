import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SpaceFilter, Space } from "@/types/space";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";
import SpaceCard from "./SpaceCard";
import { MapPin } from "lucide-react";

interface SpacesListProps {
  filters?: SpaceFilter;
}

const SpacesList = ({ filters }: SpacesListProps) => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      console.log('Fetching spaces...');
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        return;
      }

      console.log('Fetched spaces data:', data?.length || 0);
      
      if (data) {
        const convertedSpaces: Space[] = data.map(space => ({
          id: space.id,
          name: space.name || 'Unnamed Space',
          type: space.type as 'library' | 'classroom' | 'makerspace' | 'coworking' | 'hall',
          address: space.address || '',
          city: space.city || '',
          owner: space.owner || '',
          description: space.description || '',
          images: Array.isArray(space.images) ? space.images : ['https://images.unsplash.com/photo-1509062522246-3755977927d7'],
          equipment: Array.isArray(space.equipment) ? space.equipment : [],
          capacity: space.capacity || 10,
          pricePerHour: space.price_per_hour || 50,
          rating: space.rating || 4.5,
          coordinates: {
            lat: (space.coordinates as any)?.lat || 30.0444,
            lng: (space.coordinates as any)?.lng || 31.2357
          },
          availability: {
            days: (space.availability as any)?.days || [],
            hours: (space.availability as any)?.hours || '9:00 AM - 6:00 PM'
          }
        }));
        
        console.log('Converted spaces:', convertedSpaces.length);
        setSpaces(convertedSpaces);
      }
    } catch (err) {
      console.error('Error fetching spaces:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading spaces..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button 
          onClick={fetchSpaces}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          Debug: Showing {spaces.length} spaces
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Available Spaces ({spaces.length})
        </h2>
      </div>

      {spaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={MapPin}
          title="No Learning Spaces Found"
          description="We couldn't find any learning spaces matching your criteria. Try adjusting your filters or explore all available spaces."
          action={{
            label: "Browse All Spaces",
            href: "/all-spaces"
          }}
          secondaryAction={{
            label: "Share Your Space",
            href: "/share-your-space"
          }}
        />
      )}
    </div>
  );
};

export default SpacesList;