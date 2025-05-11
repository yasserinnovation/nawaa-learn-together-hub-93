
import { useState } from "react";
import { Tool, ToolFilter } from "@/types/tool";
import ToolCard from "./ToolCard";
import NoToolsFound from "./NoToolsFound";
import ToolsHeader from "./ToolsHeader";

interface ToolsListProps {
  filters: ToolFilter;
}

const ToolsList = ({ filters }: ToolsListProps) => {
  // Sample tools data with compatibleCourses added
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
      toolType: "Kits",
      compatibleCourses: ["Introduction to Arduino", "Electronics Fundamentals"]
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
      toolType: "Creative Tools",
      compatibleCourses: ["3D Design Basics", "Creative Modeling Workshop"]
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
      toolType: "Kits",
      compatibleCourses: ["Drone Programming", "Aviation Technology"]
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
      toolType: "Kits",
      compatibleCourses: ["Beginner Coding", "Physical Computing"]
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
      toolType: "Kits",
      compatibleCourses: ["Introduction to Robotics", "Sensors and Actuators"]
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
      toolType: "Electronics",
      compatibleCourses: ["Circuit Design", "Electronics Basics"]
    }
  ]);
  
  const [sortOrder, setSortOrder] = useState<string>("price-low");

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

  // Sort tools
  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortOrder) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        // In a real app, you'd sort by date created
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  return (
    <div className="space-y-6">
      <ToolsHeader 
        toolCount={filteredTools.length}
        onSortChange={handleSortChange}
      />

      {filteredTools.length === 0 ? (
        <NoToolsFound />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolsList;
