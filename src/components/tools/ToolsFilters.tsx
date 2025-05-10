
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
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Filter Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Course Topic</h3>
          <div className="grid grid-cols-2 gap-2">
            {courseTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`course-${type}`}
                  checked={filters.courseType.includes(type)}
                  onCheckedChange={() => handleCourseTypeChange(type)}
                />
                <Label htmlFor={`course-${type}`}>{type}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Age Group</h3>
          <RadioGroup
            value={filters.ageGroup}
            onValueChange={(value) => onFilterChange({ ageGroup: value })}
          >
            {ageGroups.map((age) => (
              <div key={age} className="flex items-center space-x-2">
                <RadioGroupItem value={age} id={`age-${age}`} />
                <Label htmlFor={`age-${age}`}>{age}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Tool Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {toolTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`tool-${type}`}
                  checked={filters.toolType.includes(type)}
                  onCheckedChange={() => handleToolTypeChange(type)}
                />
                <Label htmlFor={`tool-${type}`}>{type}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Condition</h3>
          <div className="flex flex-wrap gap-2">
            {conditions.map((condition) => (
              <div key={condition.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`condition-${condition.value}`}
                  checked={filters.condition.includes(condition.value)}
                  onCheckedChange={() => handleConditionChange(condition.value)}
                />
                <Label htmlFor={`condition-${condition.value}`}>{condition.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Price Range</h3>
            <span className="text-sm">
              SAR {filters.priceRange[0]} - SAR {filters.priceRange[1]}
            </span>
          </div>
          <Slider
            defaultValue={filters.priceRange}
            max={1000}
            step={50}
            onValueChange={(value) => onFilterChange({ priceRange: value as [number, number] })}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Availability</h3>
          <RadioGroup
            value={filters.availability}
            onValueChange={(value) => onFilterChange({ availability: value as ToolAvailability })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="availability-all" />
              <Label htmlFor="availability-all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sale" id="availability-sale" />
              <Label htmlFor="availability-sale">For Sale</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rent" id="availability-rent" />
              <Label htmlFor="availability-rent">For Rent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="availability-free" />
              <Label htmlFor="availability-free">Free to Share</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolsFilters;
