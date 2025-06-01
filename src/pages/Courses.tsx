
import Layout from "@/components/layout/Layout";
import CoursesList from "@/components/courses/CoursesList";
import CoursesHero from "@/components/courses/CoursesHero";
import AssessmentCTA from "@/components/courses/AssessmentCTA";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { t } = useLanguage();

  return (
    <Layout>
      <CoursesHero />
      
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <AssessmentCTA />
          
          <Tabs defaultValue="all" onValueChange={setActiveCategory} className="max-w-4xl mx-auto mb-8">
            <TabsList className="flex justify-center mb-6">
              <TabsTrigger value="all">{t('courses.allCourses')}</TabsTrigger>
              <TabsTrigger value="technology">{t('courses.technology')}</TabsTrigger>
              <TabsTrigger value="science">{t('courses.science')}</TabsTrigger>
              <TabsTrigger value="math">{t('courses.mathematics')}</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <CoursesList categoryFilter={activeCategory} />
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
