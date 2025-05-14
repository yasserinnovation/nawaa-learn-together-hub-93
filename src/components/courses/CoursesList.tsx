
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getAllCourses } from "@/lib/course-utils";

const CoursesList = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const courses = getAllCourses();

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
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600" asChild>
                    <Link to={`/courses/${course.id}`}>View Details</Link>
                  </Button>
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
