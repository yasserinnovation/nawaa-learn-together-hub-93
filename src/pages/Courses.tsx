
import Layout from "@/components/layout/Layout";
import CoursesList from "@/components/courses/CoursesList";
import CoursesHero from "@/components/courses/CoursesHero";
import AssessmentCTA from "@/components/courses/AssessmentCTA";
import SEOHead from "@/components/common/SEOHead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseCatalogSchema } from "@/lib/course-schema";
import { coursesBreadcrumb } from "@/lib/breadcrumb-schema";

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
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  return (
    <Layout>
      <SEOHead 
        title="STEM Courses - Learn Robotics, 3D Printing, Coding & More"
        description="Browse our catalog of hands-on STEM courses. From robotics to 3D printing, coding to electronics. Free courses for all ages. Start building real projects in 4 weeks."
        keywords="STEM courses, robotics course, 3D printing, coding for kids, electronics, engineering courses, hands-on learning, free STEM education"
        url="https://nawaa-mix-match-your-learning-bundle.lovable.app/courses"
        schema={[courseCatalogSchema, coursesBreadcrumb]}
      />
      
      <CoursesHero />
      
      <main className="bg-background py-8">
        <div className="container mx-auto px-4">
          <AssessmentCTA />
          
          <section aria-labelledby="course-categories" className="mb-8">
            <div className="max-w-4xl mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="search"
                  placeholder={t('courses.searchPlaceholder') || "Search courses by name, topic, or skill..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                  aria-label="Search courses"
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" onValueChange={setActiveCategory} className="max-w-4xl mx-auto">
              <TabsList className="flex justify-center mb-6" role="tablist" aria-label="Course categories">
                <TabsTrigger value="all" role="tab">{t('courses.allCourses')}</TabsTrigger>
                <TabsTrigger value="technology" role="tab">{t('courses.technology')}</TabsTrigger>
                <TabsTrigger value="science" role="tab">{t('courses.science')}</TabsTrigger>
                <TabsTrigger value="math" role="tab">{t('courses.mathematics')}</TabsTrigger>
              </TabsList>
            </Tabs>
          </section>
          
          <CoursesList categoryFilter={activeCategory} searchQuery={searchQuery} />
        </div>
      </main>
    </Layout>
  );
};

export default Courses;
