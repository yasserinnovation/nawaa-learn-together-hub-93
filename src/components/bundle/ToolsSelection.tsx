
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hammer } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ToolsSelectionProps {
  bundle: any;
  updateBundle: (key: string, value: any) => void;
}

interface ToolItem {
  id: string;
  name: string;
  type: string;
  description: string;
  condition: string;
  priceType: "buy" | "rent" | "free";
  price: number;
  rentalPeriod?: string;
  owner: string;
  location: string;
  imageUrl: string;
  quantity: number;
  compatibleCourses: string[];
  ageGroups: string[];
}

const mockTools: ToolItem[] = [
  {
    id: "1",
    name: "Arduino UNO Starter Kit",
    type: "Electronics",
    description: "Complete starter kit with Arduino UNO board, breadboard, jumper wires, resistors, LEDs and more.",
    condition: "New",
    priceType: "rent",
    price: 15,
    rentalPeriod: "day",
    owner: "TechMakers Community",
    location: "Riyadh",
    imageUrl: "https://images.unsplash.com/photo-1553406830-ef2513450d76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quantity: 10,
    compatibleCourses: ["Build a Smart Light System", "Introduction to Electronics"],
    ageGroups: ["10-12 years", "13-15 years"]
  },
  {
    id: "2",
    name: "3D Printing Pen for Kids",
    type: "Creative Tools",
    description: "Safe and easy-to-use 3D pen with adjustable settings, perfect for beginners.",
    condition: "Good",
    priceType: "rent",
    price: 10,
    rentalPeriod: "day",
    owner: "Maker Space Jeddah",
    location: "Jeddah",
    imageUrl: "https://images.unsplash.com/photo-1576613109753-27804de2cba8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quantity: 15,
    compatibleCourses: ["3D Design Basics", "Creative Modeling"],
    ageGroups: ["6-9 years", "10-12 years"]
  },
  {
    id: "3",
    name: "Robotics Kit with Remote Control",
    type: "Robotics",
    description: "Build your own programmable robot with motors, sensors, and remote control functionality.",
    condition: "New",
    priceType: "buy",
    price: 220,
    owner: "STEM Education Store",
    location: "Dammam",
    imageUrl: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quantity: 8,
    compatibleCourses: ["Introduction to Robotics", "Robot Building Challenge"],
    ageGroups: ["10-12 years", "13-15 years"]
  },
  {
    id: "4",
    name: "Breadboards Bundle",
    type: "Electronics",
    description: "Set of 10 small breadboards, perfect for electronics workshops and classes.",
    condition: "Used",
    priceType: "free",
    price: 0,
    owner: "Community Electronics Lab",
    location: "Riyadh",
    imageUrl: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    quantity: 20,
    compatibleCourses: ["Introduction to Electronics", "Circuit Design Basics"],
    ageGroups: ["10-12 years", "13-15 years", "16+ years"]
  }
];

const ToolsSelection = ({ bundle, updateBundle }: ToolsSelectionProps) => {
  const [selectedTools, setSelectedTools] = useState<{id: string, quantity: number}[]>(
    bundle.tools || []
  );

  const [filters, setFilters] = useState({
    priceType: "all", // all, buy, rent, free
    maxPrice: 500,
    ageGroup: "all",
    toolType: "all"
  });

  const addTool = (toolId: string) => {
    const existingTool = selectedTools.find(t => t.id === toolId);
    
    if (existingTool) {
      // Update quantity if already in cart
      setSelectedTools(prev => 
        prev.map(t => 
          t.id === toolId ? { ...t, quantity: t.quantity + 1 } : t
        )
      );
    } else {
      // Add new tool with quantity 1
      setSelectedTools(prev => [...prev, { id: toolId, quantity: 1 }]);
    }
    
    // Update bundle with the full tool objects
    const updatedTools = [...selectedTools];
    const toolIndex = updatedTools.findIndex(t => t.id === toolId);
    
    if (toolIndex >= 0) {
      updatedTools[toolIndex].quantity += 1;
    } else {
      updatedTools.push({ id: toolId, quantity: 1 });
    }
    
    const fullTools = updatedTools.map(tool => {
      const toolData = mockTools.find(t => t.id === tool.id);
      return { ...toolData, selectedQuantity: tool.quantity };
    });
    
    updateBundle("tools", fullTools);
    toast.success("Tool added to your bundle!");
  };

  const removeToolQuantity = (toolId: string) => {
    const tool = selectedTools.find(t => t.id === toolId);
    
    if (tool) {
      if (tool.quantity > 1) {
        // Reduce quantity
        setSelectedTools(prev => 
          prev.map(t => 
            t.id === toolId ? { ...t, quantity: t.quantity - 1 } : t
          )
        );
      } else {
        // Remove tool completely
        setSelectedTools(prev => prev.filter(t => t.id !== toolId));
      }
    }
    
    // Update bundle with the full tool objects
    let updatedTools = [...selectedTools];
    const toolIndex = updatedTools.findIndex(t => t.id === toolId);
    
    if (toolIndex >= 0) {
      if (updatedTools[toolIndex].quantity > 1) {
        updatedTools[toolIndex].quantity -= 1;
      } else {
        updatedTools = updatedTools.filter(t => t.id !== toolId);
      }
    }
    
    const fullTools = updatedTools.map(tool => {
      const toolData = mockTools.find(t => t.id === tool.id);
      return { ...toolData, selectedQuantity: tool.quantity };
    });
    
    updateBundle("tools", fullTools);
  };

  const getToolQuantity = (toolId: string) => {
    const tool = selectedTools.find(t => t.id === toolId);
    return tool ? tool.quantity : 0;
  };

  // Filter tools based on selected filters
  const filteredTools = mockTools.filter(tool => {
    if (filters.priceType !== "all" && tool.priceType !== filters.priceType) return false;
    if (tool.price > filters.maxPrice) return false;
    if (filters.ageGroup !== "all" && !tool.ageGroups.includes(filters.ageGroup)) return false;
    if (filters.toolType !== "all" && tool.type !== filters.toolType) return false;
    return true;
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Calculate total cost
  const totalCost = selectedTools.reduce((sum, item) => {
    const tool = mockTools.find(t => t.id === item.id);
    return sum + (tool ? tool.price * item.quantity : 0);
  }, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <Hammer className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">Filter Tools</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-4">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="price-all" 
                    checked={filters.priceType === "all"}
                    onCheckedChange={() => handleFilterChange("priceType", "all")}
                  />
                  <Label htmlFor="price-all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="price-buy" 
                    checked={filters.priceType === "buy"}
                    onCheckedChange={() => handleFilterChange("priceType", "buy")}
                  />
                  <Label htmlFor="price-buy">For Sale</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="price-rent" 
                    checked={filters.priceType === "rent"}
                    onCheckedChange={() => handleFilterChange("priceType", "rent")}
                  />
                  <Label htmlFor="price-rent">For Rent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="price-free" 
                    checked={filters.priceType === "free"}
                    onCheckedChange={() => handleFilterChange("priceType", "free")}
                  />
                  <Label htmlFor="price-free">Free to Share</Label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Max Price (SAR)</h3>
                <span className="text-sm text-gray-600">{filters.maxPrice}</span>
              </div>
              <Slider
                value={[filters.maxPrice]}
                min={0}
                max={500}
                step={10}
                onValueChange={(value) => handleFilterChange("maxPrice", value[0])}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Age Group</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="age-all" 
                    checked={filters.ageGroup === "all"}
                    onCheckedChange={() => handleFilterChange("ageGroup", "all")}
                  />
                  <Label htmlFor="age-all">All Ages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="age-6-9" 
                    checked={filters.ageGroup === "6-9 years"}
                    onCheckedChange={() => handleFilterChange("ageGroup", "6-9 years")}
                  />
                  <Label htmlFor="age-6-9">6-9 years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="age-10-12" 
                    checked={filters.ageGroup === "10-12 years"}
                    onCheckedChange={() => handleFilterChange("ageGroup", "10-12 years")}
                  />
                  <Label htmlFor="age-10-12">10-12 years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="age-13-15" 
                    checked={filters.ageGroup === "13-15 years"}
                    onCheckedChange={() => handleFilterChange("ageGroup", "13-15 years")}
                  />
                  <Label htmlFor="age-13-15">13-15 years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="age-16" 
                    checked={filters.ageGroup === "16+ years"}
                    onCheckedChange={() => handleFilterChange("ageGroup", "16+ years")}
                  />
                  <Label htmlFor="age-16">16+ years</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Tool Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="type-all" 
                    checked={filters.toolType === "all"}
                    onCheckedChange={() => handleFilterChange("toolType", "all")}
                  />
                  <Label htmlFor="type-all">All Types</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="type-electronics" 
                    checked={filters.toolType === "Electronics"}
                    onCheckedChange={() => handleFilterChange("toolType", "Electronics")}
                  />
                  <Label htmlFor="type-electronics">Electronics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="type-creative" 
                    checked={filters.toolType === "Creative Tools"}
                    onCheckedChange={() => handleFilterChange("toolType", "Creative Tools")}
                  />
                  <Label htmlFor="type-creative">Creative Tools</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="type-robotics" 
                    checked={filters.toolType === "Robotics"}
                    onCheckedChange={() => handleFilterChange("toolType", "Robotics")}
                  />
                  <Label htmlFor="type-robotics">Robotics</Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedTools.length > 0 && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Selected Tools</h3>
            <div className="space-y-3">
              {selectedTools.map(toolSelection => {
                const tool = mockTools.find(t => t.id === toolSelection.id);
                if (!tool) return null;
                
                return (
                  <div key={tool.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        src={tool.imageUrl} 
                        alt={tool.name}
                        className="w-10 h-10 object-cover rounded mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium">{tool.name}</p>
                        <p className="text-xs text-gray-500">
                          {tool.priceType === "rent" ? 
                            `${tool.price} SAR/day × ${toolSelection.quantity}` : 
                            `${tool.price} SAR × ${toolSelection.quantity}`}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => removeToolQuantity(tool.id)}
                    >
                      -
                    </Button>
                  </div>
                );
              })}
              
              <div className="pt-3 mt-3 border-t border-gray-200">
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total:</span>
                  <span>{totalCost} SAR</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-semibold mb-6">Select the Tools</h2>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={tool.imageUrl} 
                    alt={tool.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className={`absolute top-3 right-3 ${
                      tool.priceType === "free" ? 'bg-green-500' : 
                      tool.priceType === "rent" ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                  >
                    {tool.priceType === "free" ? "Free" : 
                     tool.priceType === "rent" ? `${tool.price} SAR/${tool.rentalPeriod}` : 
                     `${tool.price} SAR`}
                  </Badge>
                  <Badge className="absolute top-3 left-3 bg-gray-700">
                    {tool.condition}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">{tool.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{tool.type} • {tool.location}</p>
                  
                  <p className="text-sm mb-4 line-clamp-2">{tool.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tool.ageGroups.map(age => (
                      <Badge key={age} variant="outline" className="bg-gray-50">
                        {age}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-600">Available: {tool.quantity}</span>
                    
                    <div className="flex items-center">
                      {getToolQuantity(tool.id) > 0 && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeToolQuantity(tool.id);
                            }}
                          >
                            -
                          </Button>
                          <span className="mx-2 text-sm font-medium">
                            {getToolQuantity(tool.id)}
                          </span>
                        </>
                      )}
                      <Button 
                        className="bg-yellow-500 hover:bg-yellow-600"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          addTool(tool.id);
                        }}
                        disabled={getToolQuantity(tool.id) >= tool.quantity}
                      >
                        {getToolQuantity(tool.id) > 0 ? '+' : 'Add'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No tools match your current filters. Try adjusting your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsSelection;
