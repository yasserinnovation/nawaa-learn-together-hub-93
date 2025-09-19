
import Layout from "@/components/layout/Layout";
import CoursesList from "@/components/courses/CoursesList";
import CoursesHero from "@/components/courses/CoursesHero";
import AssessmentCTA from "@/components/courses/AssessmentCTA";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const coursesStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "STEM Courses",
  "description": "Comprehensive catalog of hands-on STEM courses for all ages",
  "url": "https://nawaa-mix-match-your-learning-bundle.lovable.app/courses",
  "numberOfItems": "50+",
  "itemListElement": [
    {
      "@type": "Course",
      "name": "Custom Course Catalogs",
      "description": "Mix and match between STEM curricula, life skills, and emerging technologies",
      "provider": {
        "@type": "Organization",
        "name": "Nawaa"
      }
    }
  ]
};

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(coursesStructuredData),
        }}
      />
      
      <CoursesHero />
      
      <main className="bg-background py-8">
        <div className="container mx-auto px-4">
          <AssessmentCTA />
          
          <section aria-labelledby="course-categories">
            <Tabs defaultValue="all" onValueChange={setActiveCategory} className="max-w-4xl mx-auto mb-8">
              <TabsList className="flex justify-center mb-6" role="tablist" aria-label="Course categories">
                <TabsTrigger value="all" role="tab">{t('courses.allCourses')}</TabsTrigger>
                <TabsTrigger value="technology" role="tab">{t('courses.technology')}</TabsTrigger>
                <TabsTrigger value="science" role="tab">{t('courses.science')}</TabsTrigger>
                <TabsTrigger value="math" role="tab">{t('courses.mathematics')}</TabsTrigger>
              </TabsList>
            </Tabs>
          </section>
          
          <CoursesList categoryFilter={activeCategory} />
        </div>
      </main>
    </Layout>
  );
};

export default Courses;
