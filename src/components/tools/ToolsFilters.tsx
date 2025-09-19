
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ToolFilter, ToolCondition, ToolAvailability } from "@/types/tool";

interface ToolsFiltersProps {
  filters: ToolFilter;
  onFilterChange: (filters: Partial<ToolFilter>) => void;
}

const ToolsFilters = ({ filters, onFilterChange }: ToolsFiltersProps) => {
  const courseTypes = ["Robotics", "3D Modeling", "Coding", "Electronics", "AI for Kids"];
  const toolTypes = ["Kits", "Sensors", "Computers", "Creative Tools", "Electronics"];
  const ageGroups = ["6-9 years", "10-12 years", "13-15 years", "16+ years"];
  const conditions: { value: ToolCondition; label: string }[] = [
    { value: "new", label: "New" },
    { value: "good", label: "Good" },
    { value: "used", label: "Used" },
    { value: "needs-care", label: "Needs Care" },
  ];
  
  const handleCourseTypeChange = (type: string) => {
    if (filters.courseType.includes(type)) {
      onFilterChange({
        courseType: filters.courseType.filter((t) => t !== type),
      });
    } else {
      onFilterChange({
        courseType: [...filters.courseType, type],
      });
    }
  };

  const handleToolTypeChange = (type: string) => {
    if (filters.toolType.includes(type)) {
      onFilterChange({
        toolType: filters.toolType.filter((t) => t !== type),
      });
    } else {
      onFilterChange({
        toolType: [...filters.toolType, type],
      });
    }
  };

  const handleConditionChange = (condition: ToolCondition) => {
    if (filters.condition.includes(condition)) {
      onFilterChange({
        condition: filters.condition.filter((c) => c !== condition),
      });
    } else {
      onFilterChange({
        condition: [...filters.condition, condition],
      });
    }
  };

  return (
    <Card className="sticky top-20 shadow-md">
      <CardHeader>
        <CardTitle className="text-card-foreground">Filter Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <fieldset>
          <legend className="text-sm font-medium mb-3 block text-card-foreground">Course Topics</legend>
          <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="course-topics">
            {courseTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`course-${type}`}
                  checked={filters.courseType.includes(type)}
                  onCheckedChange={() => handleCourseTypeChange(type)}
                  aria-describedby={`course-${type}-desc`}
                />
                <Label htmlFor={`course-${type}`} className="text-sm text-muted-foreground cursor-pointer">{type}</Label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium mb-3 block text-card-foreground">Age Group</legend>
          <RadioGroup value={filters.ageGroup} onValueChange={(value) => onFilterChange({ ageGroup: value })}>
            {ageGroups.map((age) => (
              <div key={age} className="flex items-center space-x-2">
                <RadioGroupItem value={age} id={`age-${age}`} />
                <Label htmlFor={`age-${age}`} className="text-sm text-muted-foreground cursor-pointer">{age}</Label>
              </div>
            ))}
          </RadioGroup>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium mb-3 block text-card-foreground">Tool Types</legend>
          <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="tool-types">
            {toolTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`tool-${type}`}
                  checked={filters.toolType.includes(type)}
                  onCheckedChange={() => handleToolTypeChange(type)}
                />
                <Label htmlFor={`tool-${type}`} className="text-sm text-muted-foreground cursor-pointer">{type}</Label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium mb-3 block text-card-foreground">Condition</legend>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="condition-filters">
            {conditions.map((condition) => (
              <div key={condition.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`condition-${condition.value}`}
                  checked={filters.condition.includes(condition.value)}
                  onCheckedChange={() => handleConditionChange(condition.value)}
                />
                <Label htmlFor={`condition-${condition.value}`} className="text-sm text-muted-foreground cursor-pointer">{condition.label}</Label>
              </div>
            ))}
          </div>
        </fieldset>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label htmlFor="price-slider" className="text-sm font-medium text-card-foreground">Price Range</label>
            <span className="text-sm text-muted-foreground">
              SAR {filters.priceRange[0]} - SAR {filters.priceRange[1]}
            </span>
          </div>
          <Slider
            id="price-slider"
            defaultValue={filters.priceRange}
            max={1000}
            step={50}
            onValueChange={(value) => onFilterChange({ priceRange: value as [number, number] })}
            aria-label={`Price range from SAR ${filters.priceRange[0]} to SAR ${filters.priceRange[1]}`}
          />
        </div>

        <fieldset>
          <legend className="text-sm font-medium mb-3 block text-card-foreground">Availability</legend>
          <RadioGroup
            value={filters.availability}
            onValueChange={(value) => onFilterChange({ availability: value as ToolAvailability })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="availability-all" />
              <Label htmlFor="availability-all" className="text-sm text-muted-foreground cursor-pointer">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sale" id="availability-sale" />
              <Label htmlFor="availability-sale" className="text-sm text-muted-foreground cursor-pointer">For Sale</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rent" id="availability-rent" />
              <Label htmlFor="availability-rent" className="text-sm text-muted-foreground cursor-pointer">For Rent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="availability-free" />
              <Label htmlFor="availability-free" className="text-sm text-muted-foreground cursor-pointer">Free to Share</Label>
            </div>
          </RadioGroup>
        </fieldset>
      </CardContent>
    </Card>
  );
};

export default ToolsFilters;
