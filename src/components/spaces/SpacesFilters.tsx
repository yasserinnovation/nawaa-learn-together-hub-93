
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Filter, Search } from "lucide-react";
import { SpaceFilter } from "@/types/space";
import { useState } from "react";

interface SpacesFiltersProps {
  filters: SpaceFilter;
  onFilterChange: (filters: Partial<SpaceFilter>) => void;
}

const equipmentOptions = [
  "3D Printer",
  "Projector",
  "Wi-Fi",
  "Robotics Kits",
  "Soldering Station",
  "Computers",
  "Audio Equipment",
  "Video Equipment"
];

const SpacesFilters = ({ filters, onFilterChange }: SpacesFiltersProps) => {
  const [date, setDate] = useState<Date | undefined>(
    filters.availability || undefined
  );

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    onFilterChange({ availability: date || null });
  };

  const handleEquipmentChange = (value: string) => {
    const newEquipment = filters.equipment.includes(value)
      ? filters.equipment.filter(item => item !== value)
      : [...filters.equipment, value];
    
    onFilterChange({ equipment: newEquipment });
  };

  return (
    <Card className="sticky top-4 border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Filter className="h-5 w-5 text-primary" aria-hidden="true" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Search filter */}
          <div>
            <Label className="text-base font-medium text-card-foreground">Search Spaces</Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" aria-hidden="true" />
              <Input
                type="text"
                placeholder="Search by name, location, or description..."
                value={filters.searchText}
                onChange={(e) => {
                  onFilterChange({ searchText: e.target.value });
                }}
                className="pl-10 bg-background border-border"
                aria-label="Filter spaces by name, location, or description"
              />
            </div>
          </div>

          {/* Distance filter */}
          <div>
            <Label className="text-base font-medium text-card-foreground">Distance (km)</Label>
            <div className="mt-2">
              <Slider
                defaultValue={[filters.distance]}
                max={50}
                step={1}
                onValueChange={(values) => onFilterChange({ distance: values[0] })}
                className="mb-2"
                aria-label="Maximum distance filter"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 km</span>
                <span>{filters.distance} km</span>
                <span>50 km</span>
              </div>
            </div>
          </div>

          {/* Capacity filter */}
          <div>
            <Label className="text-base font-medium text-card-foreground">Minimum Capacity</Label>
            <div className="mt-2">
              <Slider
                defaultValue={[filters.capacity]}
                max={50}
                step={5}
                onValueChange={(values) => onFilterChange({ capacity: values[0] })}
                className="mb-2"
                aria-label="Minimum capacity filter"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0</span>
                <span>{filters.capacity} people</span>
                <span>50+</span>
              </div>
            </div>
          </div>

          {/* Equipment filter */}
          <div>
            <Label className="text-base font-medium text-card-foreground">Equipment</Label>
            <div className="mt-2 grid grid-cols-1 gap-2" role="group" aria-labelledby="equipment-filter">
              {equipmentOptions.map((equipment) => (
                <div key={equipment} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`equipment-${equipment}`}
                    checked={filters.equipment.includes(equipment)}
                    onCheckedChange={() => handleEquipmentChange(equipment)}
                    aria-describedby={`equipment-${equipment}-desc`}
                  />
                  <label
                    htmlFor={`equipment-${equipment}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-card-foreground cursor-pointer"
                  >
                    {equipment}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Availability filter */}
          <div>
            <Label className="text-base font-medium mb-2 block text-card-foreground">Availability</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="border border-border rounded-md bg-background"
              aria-label="Select availability date"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpacesFilters;
