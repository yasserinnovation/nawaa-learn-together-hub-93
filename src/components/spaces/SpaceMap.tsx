
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { SpaceFilter } from "@/types/space";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import 'mapbox-gl/dist/mapbox-gl.css';

interface SpaceMapProps {
  filters: SpaceFilter;
}

// Mock data for map pins (same coordinates as the spaces in SpacesList.tsx)
const mapPins = [
  {
    id: "1",
    name: "King Abdulaziz Public Library - Youth Section",
    type: "library",
    coordinates: { lat: 24.7136, lng: 46.6753 },
    capacity: 25,
    price: 75,
  },
  {
    id: "2",
    name: "Mawhiba Innovation Center",
    type: "makerspace",
    coordinates: { lat: 24.8105, lng: 46.6527 },
    capacity: 20,
    price: 100,
  },
  {
    id: "3",
    name: "Jeddah Innovation Hub",
    type: "coworking",
    coordinates: { lat: 21.5433, lng: 39.1728 },
    capacity: 35,
    price: 120,
  }
];

const SpaceMap = ({ filters }: SpaceMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const initializeMap = () => {
    if (!mapboxToken) {
      setShowTokenDialog(true);
      return;
    }

    try {
      // Import mapbox dynamically to prevent build errors
      import('mapbox-gl').then((mapboxgl) => {
        if (map.current || !mapContainer.current) return;
        
        mapboxgl.default.accessToken = mapboxToken;
        
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [45.0792, 23.8859], // Center on Saudi Arabia
          zoom: 4,
        });

        // Add navigation controls
        map.current.addControl(
          new mapboxgl.default.NavigationControl(),
          'top-right'
        );

        map.current.on('load', () => {
          setMapLoaded(true);
          
          // Add markers for each space
          mapPins.forEach(pin => {
            // Create a marker element
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.width = '25px';
            el.style.height = '25px';
            el.style.borderRadius = '50%';
            el.style.backgroundSize = '100%';
            
            // Color based on space type
            switch(pin.type) {
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
            
            el.style.border = '2px solid white';
            el.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.1)';
            
            // Add popup
            const popup = new mapboxgl.default.Popup({ offset: 25 })
              .setHTML(
                `<strong>${pin.name}</strong><br>
                Type: ${pin.type}<br>
                Capacity: ${pin.capacity} people<br>
                Price: ${pin.price} SAR/hour`
              );
            
            // Add marker to map
            new mapboxgl.default.Marker(el)
              .setLngLat([pin.coordinates.lng, pin.coordinates.lat])
              .setPopup(popup)
              .addTo(map.current);
          });
        });
      }).catch(err => {
        console.error('Error loading mapbox:', err);
        toast.error("Failed to load map. Please check your internet connection.");
      });
    } catch (err) {
      console.error('Error initializing map:', err);
    }
  };

  useEffect(() => {
    // Check localStorage for token
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
  }, [mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('token') as string;
    
    if (token) {
      setMapboxToken(token);
      localStorage.setItem('mapbox_token', token);
      setShowTokenDialog(false);
      toast.success("Map token saved successfully!");
    }
  };

  return (
    <>
      <Card className="relative mb-6 overflow-hidden">
        {!mapboxToken ? (
          <div className="aspect-video bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
            <Button 
              onClick={() => setShowTokenDialog(true)}
              className="bg-yellow-500 hover:bg-yellow-600 mb-2"
            >
              Enter Mapbox Token to View Map
            </Button>
            <p className="text-sm text-gray-500">
              You'll need a Mapbox token to view the interactive map with space locations.
            </p>
          </div>
        ) : (
          <div className="aspect-video bg-gray-100" ref={mapContainer} />
        )}
      </Card>

      <Dialog open={showTokenDialog} onOpenChange={setShowTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Mapbox Token</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div>
              <label htmlFor="token" className="block text-sm font-medium mb-1">
                Mapbox Public Token
              </label>
              <input
                id="token"
                name="token"
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="pk.eyJ1Ijoie3VzZXJuYW1lfSIsImE..."
                defaultValue={mapboxToken}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                You can get your token from <a href="https://www.mapbox.com/account/access-tokens" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">mapbox.com</a>
              </p>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">
                Save Token
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SpaceMap;
