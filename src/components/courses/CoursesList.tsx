
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Loader2 } from "lucide-react";
import { getAllCourses } from "@/lib/course-utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCourseDownload } from "@/hooks/useCourseDownload";

interface CoursesListProps {
  categoryFilter?: string;
}

const CoursesList = ({ categoryFilter = "all" }: CoursesListProps) => {
  const [activeTab, setActiveTab] = useState(categoryFilter);
  const { t } = useLanguage();
  const { downloadCourseAsWord, isDownloading } = useCourseDownload();
  
  const courses = getAllCourses();

  const filteredCourses = activeTab === "all" 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  // Get translated course content - fallback to course data since course translations aren't available yet
  const getCourseTranslation = (courseId: number, key: string, fallback: string) => {
    const translationKey = `course.${courseId}.${key}`;
    const translation = t(translationKey);
    // If translation doesn't exist (returns the key), return the fallback
    return translation === translationKey ? fallback : translation;
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('courses.title')}</h2>
          
          {!categoryFilter && (
            <div className="mb-8">
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="flex justify-center mb-6">
                  <TabsTrigger value="all">{t('courses.allCourses')}</TabsTrigger>
                  <TabsTrigger value="technology">{t('courses.technology')}</TabsTrigger>
                  <TabsTrigger value="science">{t('courses.science')}</TabsTrigger>
                  <TabsTrigger value="math">{t('courses.mathematics')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                      {t('courses.ages')} {course.ageGroup}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {course.duration}
                    </Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <course.icon className="h-6 w-6 text-yellow-500" />
                    {getCourseTranslation(course.id, 'title', course.title)}
                  </CardTitle>
                  <CardDescription>{getCourseTranslation(course.id, 'project', course.project)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-sm text-yellow-700">{t('courses.stemFocus')}</h4>
                      <p className="text-sm text-gray-600">{getCourseTranslation(course.id, 'stemFocus', course.stemFocus)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-yellow-700">{t('courses.lifeSkills')}</h4>
                      <p className="text-sm text-gray-600">{getCourseTranslation(course.id, 'lifeSkills', course.lifeSkills)}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600" asChild>
                    <Link to={`/courses/${course.id}`}>{t('courses.viewDetails')}</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => downloadCourseAsWord(course.id, course.title)}
                    disabled={isDownloading}
                    className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                    title="Download as Word document"
                  >
                    {isDownloading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">{t('courses.resourcesTitle')}</h3>
            <ul className="max-w-2xl mx-auto text-gray-700 space-y-2 mb-6">
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-yellow-100 w-6 h-6 inline-flex items-center justify-center text-yellow-700">✓</span>
                {t('courses.teacherGuides')}
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-yellow-100 w-6 h-6 inline-flex items-center justify-center text-yellow-700">✓</span>
                {t('courses.studentJournals')}
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-yellow-100 w-6 h-6 inline-flex items-center justify-center text-yellow-700">✓</span>
                {t('courses.worksheets')}
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-yellow-100 w-6 h-6 inline-flex items-center justify-center text-yellow-700">✓</span>
                {t('courses.assessmentRubrics')}
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-yellow-100 w-6 h-6 inline-flex items-center justify-center text-yellow-700">✓</span>
                {t('courses.onlinePlatform')}
              </li>
            </ul>

            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 mt-4">
              <Link to="/discover-spaces">{t('courses.findSpace')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesList;
