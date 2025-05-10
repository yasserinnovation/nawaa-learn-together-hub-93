
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bot, Cpu, BarChart3, ShieldCheck, FlaskConical, Printer, Brain, Lightbulb, Gamepad2, Microscope } from "lucide-react";
import { Course } from "@/types/course";

const CoursesList = () => {
  const [activeTab, setActiveTab] = useState("all");

  const courses: Course[] = [
    {
      id: 1,
      title: "Robotics",
      icon: Bot,
      ageGroup: "10–12",
      duration: "2 hours",
      category: "technology",
      project: "Build a robot that reacts to sound or light using basic sensors and motor control modules.",
      stemFocus: "Engineering fundamentals, electrical circuits, basic programming logic (via block coding)",
      lifeSkills: "Team collaboration, communication under constraint, problem framing and solving, responsibility in shared tasks",
      outcomes: "Students will understand the foundations of how robots perceive and act on stimuli. They will gain experience in coding logic, teamwork mechanics, and hardware assembly."
    },
    {
      id: 2,
      title: "Drones",
      icon: Gamepad2,
      ageGroup: "12–14",
      duration: "2 hours",
      category: "technology",
      project: "Program a mini drone to follow a rescue path using visual-based block programming.",
      stemFocus: "Aerodynamics basics, spatial orientation, introductory coding and mission logic",
      lifeSkills: "Leadership under pressure, spatial awareness, decision-making, risk management",
      outcomes: "Students will learn drone mechanics and flight safety while building awareness of how tech can support real-world challenges."
    },
    {
      id: 3,
      title: "3D Printing",
      icon: Printer,
      ageGroup: "11–14",
      duration: "2 hours",
      category: "technology",
      project: "Design and 3D print a small tool to solve a community need, such as a water carrier, prosthetic part, or book holder.",
      stemFocus: "Engineering design process, geometric modeling, CAD software (e.g., Tinkercad)",
      lifeSkills: "Creativity, empathy for others, design with purpose",
      outcomes: "Students will learn how to transform abstract needs into tangible solutions, using design thinking and rapid prototyping tools."
    },
    {
      id: 4,
      title: "Artificial Intelligence",
      icon: Brain,
      ageGroup: "12–15",
      duration: "2 hours",
      category: "technology",
      project: "Image classification with Teachable Machine",
      stemFocus: "Computer science, data patterns, model training",
      lifeSkills: "Ethics in AI, logical analysis",
      outcomes: "Students will gain insight into how machines learn and ethical tech use"
    },
    {
      id: 5,
      title: "Renewable Energy",
      icon: Lightbulb,
      ageGroup: "10–13",
      duration: "2 hours",
      category: "science",
      project: "Build a solar-powered mini house",
      stemFocus: "Environmental engineering, circuits",
      lifeSkills: "Sustainability, green responsibility",
      outcomes: "Students will understand solar power and system efficiency"
    },
    {
      id: 6,
      title: "Virtual Reality",
      icon: Gamepad2,
      ageGroup: "11–15",
      duration: "2 hours",
      category: "technology",
      project: "Create a virtual Mars journey",
      stemFocus: "Storyboarding, digital creativity, 3D navigation",
      lifeSkills: "Empathy, storytelling",
      outcomes: "Students will explore narrative design and immersive tech"
    },
    {
      id: 7,
      title: "Internet of Things (IoT)",
      icon: Cpu,
      ageGroup: "12–16",
      duration: "2 hours",
      category: "technology",
      project: "Smart lighting control system",
      stemFocus: "Embedded systems, sensor integration, electronics",
      lifeSkills: "Innovation, planning, team leadership",
      outcomes: "Students will create functional tech and understand automation"
    },
    {
      id: 8,
      title: "Data Analysis",
      icon: BarChart3,
      ageGroup: "12–15",
      duration: "2 hours",
      category: "math",
      project: "Analyze behavioral or weather data",
      stemFocus: "Math, statistics, spreadsheet tools",
      lifeSkills: "Critical thinking, data-driven decisions",
      outcomes: "Students will gain analytical skills and pattern recognition"
    },
    {
      id: 9,
      title: "Cybersecurity",
      icon: ShieldCheck,
      ageGroup: "10–14",
      duration: "2 hours",
      category: "technology",
      project: "Digital escape game on safety",
      stemFocus: "Digital literacy, logic puzzles",
      lifeSkills: "Digital ethics, protection mindset",
      outcomes: "Students will understand personal data safety and ethics online"
    },
    {
      id: 10,
      title: "Biotechnology",
      icon: Microscope,
      ageGroup: "10–13",
      duration: "2 hours",
      category: "science",
      project: "Grow a plant under different conditions",
      stemFocus: "Biology, experimentation, sensors",
      lifeSkills: "Patience, inquiry, scientific mindset",
      outcomes: "Students will learn about environmental impact and scientific testing"
    }
  ];

  const filteredCourses = activeTab === "all" 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Course Catalog</h2>
          
          <div className="mb-8">
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="flex justify-center mb-6">
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="science">Science</TabsTrigger>
                <TabsTrigger value="math">Mathematics</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                      Ages {course.ageGroup}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {course.duration}
                    </Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <course.icon className="h-6 w-6 text-yellow-500" />
                    {course.title}
                  </CardTitle>
                  <CardDescription>{course.project}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-sm text-yellow-700">STEM Focus</h4>
                      <p className="text-sm text-gray-600">{course.stemFocus}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-yellow-700">Life Skills</h4>
                      <p className="text-sm text-gray-600">{course.lifeSkills}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Resources Included</h3>
            <ul className="max-w-2xl mx-auto text-gray-700 space-y-2 mb-6">
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-yellow-100 w-6 h-6 inline-flex items-center justify-center text-yellow-700">✓</span>
                Teacher guides with step-by-step instructions
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-yellow-100 w-6 h-6 inline-flex items-center justify-center text-yellow-700">✓</span>
                Student reflection journals
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-yellow-100 w-6 h-6 inline-flex items-center justify-center text-yellow-700">✓</span>
                Worksheets and activity templates
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-yellow-100 w-6 h-6 inline-flex items-center justify-center text-yellow-700">✓</span>
                Assessment rubrics (creativity, collaboration, technical execution)
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-yellow-100 w-6 h-6 inline-flex items-center justify-center text-yellow-700">✓</span>
                Optional: Online platform for project sharing
              </li>
            </ul>

            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 mt-4">
              <Link to="/discover-spaces">Find a Space for Your Course</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesList;
