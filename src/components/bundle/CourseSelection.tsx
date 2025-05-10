
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CourseSelectionProps {
  bundle: any;
  updateBundle: (key: string, value: any) => void;
}

interface Course {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number;
  sessions: number;
  price: number;
  category: string[];
  image: string;
  skills: string[];
  prerequisites: string[];
  tools: string[];
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Build a Smart Traffic Light System",
    description: "Learn how to build and program a complete traffic light system with Arduino. Students will learn basic electronics, programming concepts, and how to integrate sensors.",
    ageRange: "9-12",
    difficulty: "beginner",
    duration: 2,
    sessions: 2,
    price: 150,
    category: ["Electronics", "Coding", "Robotics"],
    image: "https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    skills: ["Basic programming", "Circuit design", "Problem solving"],
    prerequisites: ["None"],
    tools: ["Arduino UNO kit", "LEDs", "Breadboard"]
  },
  {
    id: "2",
    title: "3D Design Fundamentals",
    description: "Explore the world of 3D modeling and design. Students will learn how to create simple 3D objects and prepare them for printing.",
    ageRange: "10-13",
    difficulty: "beginner",
    duration: 1.5,
    sessions: 3,
    price: 180,
    category: ["3D Printing", "Design"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    skills: ["3D modeling", "Spatial thinking", "Design principles"],
    prerequisites: ["Basic computer skills"],
    tools: ["3D design software", "3D printer", "3D pens"]
  },
  {
    id: "3",
    title: "Introduction to AI for Kids",
    description: "A gentle introduction to artificial intelligence concepts for young learners. Students will explore machine learning through fun, interactive activities.",
    ageRange: "11-15",
    difficulty: "intermediate",
    duration: 2,
    sessions: 4,
    price: 250,
    category: ["AI", "Coding"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    skills: ["Pattern recognition", "Basic AI concepts", "Computational thinking"],
    prerequisites: ["None"],
    tools: ["Laptop", "Online AI platforms"]
  },
  {
    id: "4",
    title: "Robot Building Challenge",
    description: "Design, build and program your own robot to navigate obstacles and complete missions. A hands-on experience with robotics fundamentals.",
    ageRange: "10-15",
    difficulty: "intermediate",
    duration: 3,
    sessions: 4,
    price: 300,
    category: ["Robotics", "Engineering", "Coding"],
    image: "https://images.unsplash.com/photo-1558137623-ce933996c730?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    skills: ["Mechanical design", "Programming", "Problem solving", "Engineering"],
    prerequisites: ["Basic programming helpful but not required"],
    tools: ["Robotics kit", "Sensors", "Motors", "Controller"]
  }
];

const CourseSelection = ({ bundle, updateBundle }: CourseSelectionProps) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(
    bundle.course ? bundle.course.id : null
  );

  const [filters, setFilters] = useState({
    ageRange: "all",
    difficulty: "all",
    category: "all"
  });

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course.id);
    updateBundle("course", course);
  };

  // Check for compatibility with selected tools
  const getToolCompatibility = (course: Course) => {
    if (!bundle.tools || bundle.tools.length === 0) return null;
    
    // Check if all required tools for the course are in the bundle
    const requiredTools = course.tools;
    const selectedToolNames = bundle.tools.map((t: any) => t.name);
    
    // Simple check - in a real app this would be more sophisticated
    const hasAllTools = requiredTools.every(tool => {
      return selectedToolNames.some((selectedTool: string) => 
        selectedTool.toLowerCase().includes(tool.toLowerCase())
      );
    });
    
    return hasAllTools;
  };

  // Filter courses based on selected filters
  const filteredCourses = mockCourses.filter(course => {
    if (filters.ageRange !== "all") {
      const [minAge, maxAge] = course.ageRange.split("-").map(Number);
      const [filterMinAge, filterMaxAge] = filters.ageRange.split("-").map(Number);
      
      if (minAge > filterMaxAge || maxAge < filterMinAge) {
        return false;
      }
    }
    
    if (filters.difficulty !== "all" && course.difficulty !== filters.difficulty) {
      return false;
    }
    
    if (filters.category !== "all" && !course.category.includes(filters.category)) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <Book className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">Filter Courses</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Age Range</h3>
              <RadioGroup 
                value={filters.ageRange} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, ageRange: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="age-all" />
                  <Label htmlFor="age-all">All ages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6-9" id="age-6-9" />
                  <Label htmlFor="age-6-9">6-9 years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="9-12" id="age-9-12" />
                  <Label htmlFor="age-9-12">9-12 years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="10-13" id="age-10-13" />
                  <Label htmlFor="age-10-13">10-13 years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="11-15" id="age-11-15" />
                  <Label htmlFor="age-11-15">11-15 years</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Difficulty Level</h3>
              <RadioGroup 
                value={filters.difficulty} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="diff-all" />
                  <Label htmlFor="diff-all">All levels</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="diff-beginner" />
                  <Label htmlFor="diff-beginner">Beginner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="diff-intermediate" />
                  <Label htmlFor="diff-intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="diff-advanced" />
                  <Label htmlFor="diff-advanced">Advanced</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Category</h3>
              <RadioGroup 
                value={filters.category} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="cat-all" />
                  <Label htmlFor="cat-all">All categories</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Robotics" id="cat-robotics" />
                  <Label htmlFor="cat-robotics">Robotics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Coding" id="cat-coding" />
                  <Label htmlFor="cat-coding">Coding</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Electronics" id="cat-electronics" />
                  <Label htmlFor="cat-electronics">Electronics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3D Printing" id="cat-3d" />
                  <Label htmlFor="cat-3d">3D Printing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="AI" id="cat-ai" />
                  <Label htmlFor="cat-ai">AI</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-semibold mb-6">Pick a Course</h2>
        
        <div className="grid grid-cols-1 gap-6">
          {filteredCourses.map((course) => {
            const isCompatible = getToolCompatibility(course);
            
            return (
              <Card 
                key={course.id} 
                className={`cursor-pointer transition-all overflow-hidden ${
                  selectedCourse === course.id ? 'ring-2 ring-yellow-500' : ''
                }`}
                onClick={() => handleCourseSelect(course)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 md:p-6 md:w-2/3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {course.category.map(cat => (
                        <Badge key={cat} className="bg-yellow-100 text-yellow-800 border-none">
                          {cat}
                        </Badge>
                      ))}
                      
                      <Badge className={`
                        ${course.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : 
                          course.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' : 
                          'bg-purple-100 text-purple-800'} 
                        border-none
                      `}>
                        {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                      </Badge>
                      
                      {isCompatible !== null && (
                        <Badge className={`
                          ${isCompatible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} 
                          border-none
                        `}>
                          {isCompatible ? "Tools Ready" : "Missing Tools"}
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600 mb-3">
                      <span>Age: {course.ageRange} years</span>
                      <span>{course.sessions} sessions</span>
                      <span>{course.duration} hours/session</span>
                      <span className="font-semibold">{course.price} SAR</span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      {course.description}
                    </p>
                    
                    <details className="text-sm group">
                      <summary className="cursor-pointer flex items-center font-medium text-yellow-600">
                        <ChevronDown className="h-4 w-4 mr-1 transition-transform group-open:rotate-180" />
                        Show course details
                      </summary>
                      <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-2">
                        <div>
                          <p className="font-medium">Skills gained:</p>
                          <ul className="list-disc list-inside pl-2 text-gray-600">
                            {course.skills.map((skill, i) => (
                              <li key={i}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-medium">Prerequisites:</p>
                          <ul className="list-disc list-inside pl-2 text-gray-600">
                            {course.prerequisites.map((prereq, i) => (
                              <li key={i}>{prereq}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-medium">Required tools:</p>
                          <ul className="list-disc list-inside pl-2 text-gray-600">
                            {course.tools.map((tool, i) => (
                              <li key={i} className={`${
                                bundle.tools && bundle.tools.some((t: any) => 
                                  t.name.toLowerCase().includes(tool.toLowerCase())
                                ) ? 'text-green-600' : ''
                              }`}>
                                {tool}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </details>
                  </CardContent>
                </div>
              </Card>
            );
          })}
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No courses match your current filters. Try adjusting your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSelection;
