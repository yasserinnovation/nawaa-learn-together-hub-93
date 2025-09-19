import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { SpaceFilter } from "@/types/space";
import { useMapboxToken } from "@/hooks/useMapboxToken";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import 'mapbox-gl/dist/mapbox-gl.css';

interface SpaceMapProps {
  filters?: SpaceFilter;
}

interface Space {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  capacity?: number;
  price_per_hour?: number;
  rating?: number;
  coordinates: any; // Json type from Supabase
  equipment: string[];
}

const SpaceMap = ({ filters }: SpaceMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const { token: mapboxToken, loading: tokenLoading } = useMapboxToken();

  // Fetch spaces from database
  const fetchSpaces = async () => {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSpaces(data || []);
    } catch (error) {
      console.error('Error fetching spaces:', error);
      toast.error('Failed to fetch spaces');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  const initializeMap = () => {
    if (!mapboxToken || !spaces.length || tokenLoading) return;

    try {
      // Import mapbox dynamically to prevent build errors
      import('mapbox-gl').then((mapboxgl) => {
        if (map.current || !mapContainer.current) return;
        
        mapboxgl.default.accessToken = mapboxToken;
        
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [31.2357, 30.0444], // Center on Cairo, Egypt
          zoom: 6,
        });

        // Add navigation controls
        map.current.addControl(
          new mapboxgl.default.NavigationControl(),
          'top-right'
        );

        map.current.on('load', () => {
          // Add markers for each space with coordinates
          spaces
            .filter(space => space.coordinates?.lat && space.coordinates?.lng)
            .forEach(space => {
              // Create a marker element
              const el = document.createElement('div');
              el.className = 'marker';
              el.style.cssText = `
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                cursor: pointer;
                transition: all 0.3s ease;
              `;
              
              // Color based on space type
              switch(space.type) {
                case 'library':
                  el.style.backgroundColor = '#3B82F6'; // blue
                  break;
                case 'makerspace':
                  el.style.backgroundColor = '#EF4444'; // red
                  break;
                case 'coworking':
                  el.style.backgroundColor = '#10B981'; // green
                  break;
                default:
                  el.style.backgroundColor = '#F59E0B'; // yellow
              }

              // Add hover effect
              el.addEventListener('mouseenter', () => {
                el.style.transform = 'scale(1.2)';
                el.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
              });

              el.addEventListener('mouseleave', () => {
                el.style.transform = 'scale(1)';
                el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
              });
              
              // Create rich popup content
              const popupContent = `
                <div class="p-4 min-w-[280px]">
                  <h3 class="font-semibold text-lg mb-2 text-gray-800">${space.name}</h3>
                  <p class="text-sm text-gray-600 mb-2 capitalize">${space.type} • ${space.city}</p>
                  ${space.rating ? `
                    <div class="flex items-center gap-1 mb-2">
                      <span class="text-yellow-500">⭐</span>
                      <span class="font-medium">${space.rating.toFixed(1)}</span>
                      <span class="text-gray-500 text-sm">rating</span>
                    </div>
                  ` : ''}
                  <p class="text-xs text-gray-500 mb-3">${space.address}</p>
                  <div class="flex items-center justify-between mb-3">
                    ${space.capacity ? `
                      <div class="flex items-center gap-1">
                        <span class="text-blue-500">👥</span>
                        <span class="text-sm">${space.capacity} people</span>
                      </div>
                    ` : ''}
                    ${space.price_per_hour ? `
                      <div class="text-sm font-medium text-green-600">${space.price_per_hour} EGP/hour</div>
                    ` : ''}
                  </div>
                  <div class="border-t pt-2">
                    <p class="text-xs text-gray-600 mb-1">Equipment:</p>
                    <div class="flex flex-wrap gap-1">
                      ${space.equipment.slice(0, 4).map(eq => `
                        <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">${eq}</span>
                      `).join('')}
                      ${space.equipment.length > 4 ? `
                        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">+${space.equipment.length - 4} more</span>
                      ` : ''}
                    </div>
                  </div>
                </div>
              `;
              
              // Add popup
              const popup = new mapboxgl.default.Popup({ 
                offset: 35,
                closeButton: true,
                closeOnClick: false
              }).setHTML(popupContent);
              
              // Add marker to map
              new mapboxgl.default.Marker(el)
                .setLngLat([space.coordinates.lng, space.coordinates.lat])
                .setPopup(popup)
                .addTo(map.current);
            });

          // Fit map to show all markers
          const validCoordinates = spaces
            .filter(space => space.coordinates?.lat && space.coordinates?.lng)
            .map(space => [space.coordinates.lng, space.coordinates.lat]);

          if (validCoordinates.length > 0) {
            const bounds = new mapboxgl.default.LngLatBounds();
            validCoordinates.forEach(coord => bounds.extend(coord as [number, number]));
            
            map.current.fitBounds(bounds, {
              padding: { top: 50, bottom: 50, left: 50, right: 50 },
              maxZoom: 12
            });
          }
        });
      }).catch(err => {
        console.error('Error loading mapbox:', err);
        toast.error("Failed to load map. Please check your connection.");
      });
    } catch (err) {
      console.error('Error initializing map:', err);
    }
  };

  useEffect(() => {
    if (mapboxToken && spaces.length > 0 && !tokenLoading) {
      initializeMap();
    }
  }, [mapboxToken, spaces, tokenLoading]);

  // Clean up map on unmount
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  if (tokenLoading || loading) {
    return (
      <Card className="relative mb-6 overflow-hidden">
        <div className="aspect-video bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </Card>
    );
  }

  if (!mapboxToken) {
    return (
      <Card className="relative mb-6 overflow-hidden">
        <div className="aspect-video bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-lg font-semibold mb-2">Map Configuration Required</h3>
            <p className="text-gray-600 mb-4">
              Mapbox token is being configured. The map will load automatically once ready.
            </p>
            <div className="text-sm text-gray-500">
              <p>• Real-time location data from database</p>
              <p>• Interactive markers and popups</p>
              <p>• {spaces.filter(s => s.coordinates?.lat && s.coordinates?.lng).length} spaces with coordinates</p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative mb-6 overflow-hidden">
      <div className="aspect-video bg-gray-100" ref={mapContainer} />
      
      {/* Map overlay with stats */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-500 rounded-full" aria-hidden="true"></span>
            <span className="text-card-foreground">Libraries</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-500 rounded-full" aria-hidden="true"></span>
            <span className="text-card-foreground">Makerspaces</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500 rounded-full" aria-hidden="true"></span>
            <span className="text-card-foreground">Coworking</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {spaces.filter(s => s.coordinates?.lat && s.coordinates?.lng).length} of {spaces.length} spaces mapped
        </div>
      </div>
    </Card>
  );
};

export default SpaceMap;