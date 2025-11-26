import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Star } from 'lucide-react';

interface Space {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  capacity?: number;
  price_per_hour?: number;
  rating?: number;
  equipment: string[];
  coordinates: {
    lat?: number;
    lng?: number;
  };
}

interface LocationMapProps {
  spaces: Space[];
  mapboxToken: string;
  onSpaceSelect?: (space: Space) => void;
}

const LocationMap: React.FC<LocationMapProps> = ({ spaces, mapboxToken, onSpaceSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return; // Guard against re-initialization

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [31.2357, 30.0444], // Cairo, Egypt as default center
      zoom: 10,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for each space
    spaces.forEach((space) => {
      if (space.coordinates.lat && space.coordinates.lng) {
        // Create custom marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.style.cssText = `
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
        `;

        // Add icon
        const icon = document.createElement('div');
        icon.innerHTML = '📍';
        icon.style.fontSize = '16px';
        markerElement.appendChild(icon);

        // Add hover effect
        markerElement.addEventListener('mouseenter', () => {
          markerElement.style.transform = 'scale(1.1)';
          markerElement.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.6)';
        });

        markerElement.addEventListener('mouseleave', () => {
          markerElement.style.transform = 'scale(1)';
          markerElement.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
        });

        // Create popup content
        const popupContent = `
          <div class="p-3 min-w-[250px]">
            <h3 class="font-semibold text-lg mb-2">${space.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${space.type} • ${space.city}</p>
            <div class="flex items-center gap-2 mb-2">
              ${space.rating ? `
                <div class="flex items-center gap-1">
                  <span class="text-yellow-500">⭐</span>
                  <span class="font-medium">${space.rating.toFixed(1)}</span>
                </div>
              ` : ''}
              ${space.capacity ? `
                <div class="flex items-center gap-1">
                  <span class="text-blue-500">👥</span>
                  <span class="text-sm">${space.capacity}</span>
                </div>
              ` : ''}
            </div>
            <p class="text-xs text-gray-500 mb-2">${space.address}</p>
            ${space.price_per_hour ? `
              <div class="text-sm font-medium text-green-600">${space.price_per_hour} EGP/hour</div>
            ` : ''}
            <div class="flex flex-wrap gap-1 mt-2">
              ${space.equipment.slice(0, 3).map(eq => `
                <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">${eq}</span>
              `).join('')}
            </div>
          </div>
        `;

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: false
        }).setHTML(popupContent);

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([space.coordinates.lng, space.coordinates.lat])
          .setPopup(popup)
          .addTo(map.current);

        // Add click handler
        markerElement.addEventListener('click', () => {
          setSelectedSpace(space);
          onSpaceSelect?.(space);
          map.current?.flyTo({
            center: [space.coordinates.lng!, space.coordinates.lat!],
            zoom: 14,
            duration: 1500
          });
        });
      }
    });

    // Fit map to show all markers
    if (spaces.length > 0) {
      const validCoordinates = spaces
        .filter(space => space.coordinates.lat && space.coordinates.lng)
        .map(space => [space.coordinates.lng!, space.coordinates.lat!]);

      if (validCoordinates.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        validCoordinates.forEach(coord => bounds.extend(coord as [number, number]));
        
        map.current.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          maxZoom: 15
        });
      }
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [spaces, mapboxToken]); // Removed onSpaceSelect from dependencies to prevent infinite re-renders

  if (!mapboxToken) {
    return (
      <Card className="h-[400px]">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Map requires Mapbox token</p>
            <p className="text-sm text-gray-500 mt-2">
              Please configure your Mapbox token in Supabase secrets
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Spaces Map View</h3>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {spaces.filter(s => s.coordinates.lat && s.coordinates.lng).length} Locations
        </Badge>
      </div>
      
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <div ref={mapContainer} className="h-[500px] w-full" />
            
            {/* Map overlay with stats */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{spaces.length}</span>
                  <span className="text-gray-600">Total</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-green-500" />
                  <span className="font-medium">
                    {spaces.reduce((sum, s) => sum + (s.capacity || 0), 0)}
                  </span>
                  <span className="text-gray-600">Capacity</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">
                    {spaces.length > 0 ? (spaces.reduce((sum, s) => sum + (s.rating || 0), 0) / spaces.length).toFixed(1) : 'N/A'}
                  </span>
                  <span className="text-gray-600">Avg Rating</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected space details */}
      {selectedSpace && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              {selectedSpace.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-medium">{selectedSpace.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p className="font-medium">{selectedSpace.city}</p>
              </div>
              {selectedSpace.capacity && (
                <div>
                  <p className="text-sm text-gray-600">Capacity</p>
                  <p className="font-medium">{selectedSpace.capacity} people</p>
                </div>
              )}
              {selectedSpace.price_per_hour && (
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="font-medium">{selectedSpace.price_per_hour} EGP/hr</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Equipment</p>
              <div className="flex flex-wrap gap-2">
                {selectedSpace.equipment.map((eq, idx) => (
                  <Badge key={idx} variant="secondary">{eq}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LocationMap;