
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Tag, Package, PackageOpen } from "lucide-react";
import { Tool, ToolFilter } from "@/types/tool";

interface ToolsListProps {
  filters: ToolFilter;
}

const ToolsList = ({ filters }: ToolsListProps) => {
  // Sample tools data
  const [tools] = useState<Tool[]>([
    {
      id: 1,
      name: "Arduino Starter Kit",
      image: "https://images.unsplash.com/photo-1608564697071-ddf911d3c1a8?auto=format&fit=crop&q=80&w=600",
      condition: "new",
      price: 180,
      location: "Riyadh",
      owner: "Mohammed A.",
      tags: ["Electronics", "Robotics", "Coding"],
      availability: "sale",
      description: "Perfect for beginners to learn electronics and programming. Includes Arduino UNO board, breadboard, jumper wires, and various components.",
      ageGroup: "10-12 years",
      toolType: "Kits"
    },
    {
      id: 2,
      name: "3D Pen for Kids",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600",
      condition: "good",
      price: 120,
      rentalRate: "SAR 20/day",
      location: "Jeddah",
      owner: "Sara K.",
      tags: ["3D Modeling", "Creative Tools"],
      availability: "rent",
      description: "Child-safe 3D pen with adjustable temperature and speed. Great for creative projects and developing spatial skills.",
      ageGroup: "6-9 years",
      toolType: "Creative Tools"
    },
    {
      id: 3,
      name: "Drone Kit with Camera",
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=600",
      condition: "used",
      price: 350,
      location: "Dammam",
      owner: "Khalid M.",
      tags: ["Robotics", "Coding", "Electronics"],
      availability: "sale",
      description: "DIY drone kit with programmable flight controller, camera module, and remote control. Perfect for teaching aerodynamics and programming.",
      ageGroup: "13-15 years",
      toolType: "Kits"
    },
    {
      id: 4,
      name: "BBC micro:bit Kit",
      image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&q=80&w=600",
      condition: "good",
      price: 0,
      location: "Abha",
      owner: "Community FabLab",
      tags: ["Coding", "Electronics"],
      availability: "free",
      description: "Available for community use. Set of 10 micro:bit boards with accessories for teaching basic programming concepts.",
      ageGroup: "10-12 years", 
      toolType: "Kits"
    },
    {
      id: 5,
      name: "Robot Building Set",
      image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&q=80&w=600",
      condition: "new",
      price: 250,
      rentalRate: "SAR 40/day",
      location: "Riyadh",
      owner: "Tech Learning Center",
      tags: ["Robotics", "Electronics", "STEM"],
      availability: "rent",
      description: "Advanced robot building kit with motors, sensors, and programmable controller. Ideal for group workshops.",
      ageGroup: "13-15 years",
      toolType: "Kits"
    },
    {
      id: 6, 
      name: "Basic Electronics Components Set",
      image: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&q=80&w=600",
      condition: "needs-care",
      price: 90,
      location: "Jeddah",
      owner: "Ahmed H.",
      tags: ["Electronics", "Robotics"],
      availability: "sale",
      description: "Collection of resistors, capacitors, LEDs, breadboards and more. Some components may need replacement but perfect for learning.",
      ageGroup: "13-15 years",
      toolType: "Electronics"
    }
  ]);
  
  // Filter tools based on user selections
  const filteredTools = tools.filter(tool => {
    // Filter by course type (tags)
    if (filters.courseType.length > 0 && !filters.courseType.some(type => tool.tags.includes(type))) {
      return false;
    }
    
    // Filter by age group
    if (filters.ageGroup && tool.ageGroup !== filters.ageGroup) {
      return false;
    }
    
    // Filter by tool type
    if (filters.toolType.length > 0 && !filters.toolType.includes(tool.toolType)) {
      return false;
    }
    
    // Filter by price range
    if (tool.price < filters.priceRange[0] || tool.price > filters.priceRange[1]) {
      return false;
    }
    
    // Filter by availability
    if (filters.availability !== 'all' && tool.availability !== filters.availability) {
      return false;
    }
    
    // Filter by condition
    if (filters.condition.length > 0 && !filters.condition.includes(tool.condition)) {
      return false;
    }
    
    return true;
  });

  // Get the availability badge color
  const getBadgeColor = (availability: string) => {
    switch (availability) {
      case 'sale':
        return 'bg-blue-100 text-blue-800';
      case 'rent':
        return 'bg-green-100 text-green-800';
      case 'free':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get condition text and color
  const getConditionDetails = (condition: string) => {
    switch (condition) {
      case 'new':
        return { text: 'New', color: 'text-green-600' };
      case 'good':
        return { text: 'Good Condition', color: 'text-blue-600' };
      case 'used':
        return { text: 'Used', color: 'text-yellow-600' };
      case 'needs-care':
        return { text: 'Needs Care', color: 'text-red-600' };
      default:
        return { text: condition, color: 'text-gray-600' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Available Tools ({filteredTools.length})</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select className="border rounded p-1 text-sm">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>

      {filteredTools.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <PackageOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No tools found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters to find more tools.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className="overflow-hidden">
              <div className="h-48 bg-gray-100">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <Badge className={getBadgeColor(tool.availability)}>
                    {tool.availability === 'sale' ? 'For Sale' : 
                     tool.availability === 'rent' ? 'For Rent' : 'Free'}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{tool.location}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm line-clamp-2">{tool.description}</p>
                
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getConditionDetails(tool.condition).color}`}>
                    {getConditionDetails(tool.condition).text}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <div key={tag} className="flex items-center text-xs bg-gray-100 rounded-full px-2 py-1">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <div>
                  {tool.availability === 'rent' ? (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Rental Rate</span>
                      <span className="font-bold">{tool.rentalRate}</span>
                    </div>
                  ) : tool.availability === 'sale' ? (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Price</span>
                      <span className="font-bold">SAR {tool.price}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Community Share</span>
                      <span className="font-bold text-purple-600">Free</span>
                    </div>
                  )}
                </div>
                <Button className="bg-yellow-500 hover:bg-yellow-600">
                  {tool.availability === 'rent' ? 'Rent Now' : 
                   tool.availability === 'sale' ? 'Purchase' : 'Borrow'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolsList;
