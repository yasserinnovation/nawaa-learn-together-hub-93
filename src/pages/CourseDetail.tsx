import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, Users, Clock, Target, CircuitBoard, Wind, Lightbulb, MessageCircle } from "lucide-react";
import { getCourseById } from "@/lib/course-utils";
import { useLanguage } from "@/contexts/LanguageContext";
import EnrollmentModal from "@/components/courses/EnrollmentModal";
import { useState } from "react";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { t } = useLanguage();
  const course = getCourseById(parseInt(courseId || "1"));
  const [enrollmentOpen, setEnrollmentOpen] = useState(false);
  const [infoRequestOpen, setInfoRequestOpen] = useState(false);

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">{t('courseDetail.courseNotFound')}</h1>
            <Button asChild>
              <Link to="/courses">{t('courseDetail.backToCourses')}</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Get translated course content - ensure we return strings only
  const getCourseTranslation = (key: string): string => {
    const translation = t(`course.${course.id}.${key}`);
    if (translation && typeof translation === 'string') {
      return translation;
    }
    // Fallback to course property as string
    const fallback = course[key as keyof typeof course];
    return typeof fallback === 'string' ? fallback : '';
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <article className="md:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {t(`courses.${course.category}`)}
                  </Badge>
                  {course.level && (
                    <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                      {course.level}
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-4xl font-bold mb-4 flex items-center gap-3 text-foreground">
                  <course.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  {getCourseTranslation('title')}
                </h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6 mb-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span>{t('courses.ages')} {course.ageGroup}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span>{course.duration}/session</span>
                  </div>
                  {course.maxGroupSize && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                      <span>{t('courseDetail.maxStudents')} {course.maxGroupSize} {t('courseDetail.students')}</span>
                    </div>
                  )}
                  {course.totalDuration && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
                      <span>{course.totalDuration}</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-card rounded-lg shadow-md p-6 mb-8 border border-border">
                  <h2 className="text-2xl font-semibold mb-4 text-card-foreground">{t('courseDetail.courseOverview')}</h2>
                  <p className="text-muted-foreground mb-6">{getCourseTranslation('project')}</p>
                  
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">{t('courseDetail.learningOutcomes')}</h3>
                  <div className="pl-5 mb-6">
                    {course.outcomes.split(". ").map((outcome, index) => (
                      outcome ? (
                        <div key={index} className="flex items-start gap-2 mb-2">
                          <div className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <p className="text-muted-foreground">{outcome}.</p>
                        </div>
                      ) : null
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">{t('courses.stemFocus')}</h3>
                      <p className="text-muted-foreground">{getCourseTranslation('stemFocus')}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">{t('courses.lifeSkills')}</h3>
                      <p className="text-muted-foreground">{getCourseTranslation('lifeSkills')}</p>
                    </div>
                  </div>
                </div>
              </article>
              
              <aside className="md:w-1/3">
                <div className="bg-card rounded-lg shadow-md p-6 sticky top-24 border border-border">
                  <div className="mb-6">
                    <AspectRatio ratio={16 / 9} className="bg-muted rounded-md mb-4 overflow-hidden">
                      <Skeleton className="h-full w-full">
                        <div className="h-full w-full bg-primary/20 flex items-center justify-center">
                          <div className="p-6 bg-card rounded-full shadow-sm">
                            <course.icon className="h-12 w-12 text-primary" aria-hidden="true" />
                          </div>
                        </div>
                      </Skeleton>
                    </AspectRatio>
                    <h2 className="text-xl font-bold mb-2 text-card-foreground">Ready to Start Learning?</h2>
                    <p className="text-muted-foreground mb-4">
                      Secure your spot in this course. Limited seats available.
                    </p>
                    <Button 
                      onClick={() => setEnrollmentOpen(true)} 
                      variant="cta"
                      size="lg"
                      className="w-full mb-3"
                      aria-label="Enroll in this course"
                    >
                      Enroll Now
                    </Button>
                    <Button 
                      onClick={() => setInfoRequestOpen(true)}
                      variant="outline" 
                      size="lg"
                      className="w-full border-primary text-primary hover:bg-primary/10"
                      aria-label="Request more information about this course"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                      Get More Info
                    </Button>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <h3 className="font-semibold mb-3 text-card-foreground">{t('courseDetail.keyTechnologies')}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-secondary">
                        <CircuitBoard className="h-3.5 w-3.5 mr-1" aria-hidden="true" /> 
                        {t('courseDetail.electronics')}
                      </Badge>
                      <Badge variant="secondary" className="bg-secondary">
                        <Wind className="h-3.5 w-3.5 mr-1" aria-hidden="true" /> 
                        {t('courseDetail.renewableEnergy')}
                      </Badge>
                      <Badge variant="secondary" className="bg-secondary">
                        <Lightbulb className="h-3.5 w-3.5 mr-1" aria-hidden="true" /> 
                        {t('courseDetail.robotics')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
            
            {course.days && course.days.length > 0 && (
              <section className="mt-8 mb-12" aria-labelledby="curriculum-heading">
                <h2 id="curriculum-heading" className="text-2xl font-bold mb-6 text-foreground">{t('courseDetail.curriculumOutline')}</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-card rounded-lg overflow-hidden shadow-md border border-border">
                    <thead className="bg-primary/10">
                      <tr>
                        <th className="py-3 px-4 text-left font-semibold text-card-foreground border-b border-border">{t('courseDetail.day')}</th>
                        <th className="py-3 px-4 text-left font-semibold text-card-foreground border-b border-border">{t('courseDetail.moduleTitle')}</th>
                        <th className="py-3 px-4 text-left font-semibold text-card-foreground border-b border-border">{t('courseDetail.hours')}</th>
                        <th className="py-3 px-4 text-left font-semibold text-card-foreground border-b border-border">{t('courseDetail.activities')}</th>
                        <th className="py-3 px-4 text-left font-semibold text-card-foreground border-b border-border">{t('courseDetail.keySkills')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.days.map((day) => (
                        <tr key={day.day} className="hover:bg-muted/50">
                          <td className="py-3 px-4 border-b border-border text-card-foreground">{day.day}</td>
                          <td className="py-3 px-4 border-b border-border font-medium text-card-foreground">{day.title}</td>
                          <td className="py-3 px-4 border-b border-border text-muted-foreground">{day.hours}</td>
                          <td className="py-3 px-4 border-b border-border text-muted-foreground">{day.activities}</td>
                          <td className="py-3 px-4 border-b border-border text-muted-foreground">{day.skills}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            
            <div className="flex justify-center mb-8">
              <Button 
                onClick={() => setEnrollmentOpen(true)}
                variant="cta"
                size="xl"
                aria-label="Enroll in this course now"
              >
                Enroll in This Course
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enrollment Modal */}
      {course && (
        <>
          <EnrollmentModal
            open={enrollmentOpen}
            onOpenChange={setEnrollmentOpen}
            course={course}
          />
          <EnrollmentModal
            open={infoRequestOpen}
            onOpenChange={setInfoRequestOpen}
            course={course}
          />
        </>
      )}
    </Layout>
  );
};

export default CourseDetail;
