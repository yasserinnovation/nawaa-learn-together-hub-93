
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
    <section className="py-12 bg-background" aria-labelledby="courses-list-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 id="courses-list-heading" className="text-3xl font-bold mb-8 text-center text-foreground">{t('courses.title')}</h2>
          
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
              <Card key={course.id} className="h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300 bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {t('courses.ages')} {course.ageGroup}
                    </Badge>
                    <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                      {course.duration}
                    </Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <course.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    {getCourseTranslation(course.id, 'title', course.title)}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">{getCourseTranslation(course.id, 'project', course.project)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-sm text-primary">{t('courses.stemFocus')}</h4>
                      <p className="text-sm text-muted-foreground">{getCourseTranslation(course.id, 'stemFocus', course.stemFocus)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-primary">{t('courses.lifeSkills')}</h4>
                      <p className="text-sm text-muted-foreground">{getCourseTranslation(course.id, 'lifeSkills', course.lifeSkills)}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <Link to={`/courses/${course.id}`} aria-label={`View details for ${course.title}`}>{t('courses.viewDetails')}</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => downloadCourseAsWord(course.id, course.title)}
                    disabled={isDownloading}
                    className="border-primary text-primary hover:bg-primary/10"
                    title="Download course as Word document"
                    aria-label={`Download ${course.title} as Word document`}
                  >
                    {isDownloading ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Download className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">{t('courses.resourcesTitle')}</h3>
            <ul className="max-w-2xl mx-auto text-muted-foreground space-y-2 mb-6" role="list">
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-primary/10 w-6 h-6 inline-flex items-center justify-center text-primary" aria-hidden="true">✓</span>
                {t('courses.teacherGuides')}
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-primary/10 w-6 h-6 inline-flex items-center justify-center text-primary" aria-hidden="true">✓</span>
                {t('courses.studentJournals')}
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-primary/10 w-6 h-6 inline-flex items-center justify-center text-primary" aria-hidden="true">✓</span>
                {t('courses.worksheets')}
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-primary/10 w-6 h-6 inline-flex items-center justify-center text-primary" aria-hidden="true">✓</span>
                {t('courses.assessmentRubrics')}
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="rounded-full bg-primary/10 w-6 h-6 inline-flex items-center justify-center text-primary" aria-hidden="true">✓</span>
                {t('courses.onlinePlatform')}
              </li>
            </ul>

            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
              <Link to="/discover-spaces" aria-label="Find a learning space to take these courses">{t('courses.findSpace')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesList;
