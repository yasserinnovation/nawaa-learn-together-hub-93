
import Layout from "@/components/layout/Layout";
import CoursesList from "@/components/courses/CoursesList";
import CoursesHero from "@/components/courses/CoursesHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <Layout>
      <CoursesHero />
      
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" onValueChange={setActiveCategory} className="max-w-4xl mx-auto mb-8">
            <TabsList className="flex justify-center mb-6">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="math">Mathematics</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <CoursesList categoryFilter={activeCategory} />
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
