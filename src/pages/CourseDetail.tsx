import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, Users, Clock, Target, CircuitBoard, Wind, Lightbulb } from "lucide-react";
import { getCourseById } from "@/lib/course-utils";
import { useLanguage } from "@/contexts/LanguageContext";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { t } = useLanguage();
  const course = getCourseById(parseInt(courseId || "1"));

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
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    {t(`courses.${course.category}`)}
                  </Badge>
                  {course.level && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      {course.level}
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
                  <course.icon className="h-8 w-8 text-yellow-500" />
                  {getCourseTranslation('title')}
                </h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6 mb-8">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="h-5 w-5 text-yellow-500" />
                    <span>{t('courses.ages')} {course.ageGroup}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <span>{course.duration}/session</span>
                  </div>
                  {course.maxGroupSize && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="h-5 w-5 text-yellow-500" />
                      <span>{t('courseDetail.maxStudents')} {course.maxGroupSize} {t('courseDetail.students')}</span>
                    </div>
                  )}
                  {course.totalDuration && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-5 w-5 text-yellow-500" />
                      <span>{course.totalDuration}</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{t('courseDetail.courseOverview')}</h2>
                  <p className="text-gray-700 mb-6">{getCourseTranslation('project')}</p>
                  
                  <h3 className="text-xl font-semibold mb-3">{t('courseDetail.learningOutcomes')}</h3>
                  <div className="pl-5 mb-6">
                    {course.outcomes.split(". ").map((outcome, index) => (
                      outcome ? (
                        <div key={index} className="flex items-start gap-2 mb-2">
                          <div className="rounded-full bg-green-100 p-1 text-green-700 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <p className="text-gray-700">{outcome}.</p>
                        </div>
                      ) : null
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-700 mb-2">{t('courses.stemFocus')}</h3>
                      <p className="text-gray-700">{getCourseTranslation('stemFocus')}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-700 mb-2">{t('courses.lifeSkills')}</h3>
                      <p className="text-gray-700">{getCourseTranslation('lifeSkills')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <div className="mb-6">
                    <AspectRatio ratio={16 / 9} className="bg-gray-100 rounded-md mb-4 overflow-hidden">
                      <Skeleton className="h-full w-full">
                        <div className="h-full w-full bg-yellow-200 flex items-center justify-center">
                          <div className="p-6 bg-white rounded-full shadow-sm">
                            <course.icon className="h-12 w-12 text-yellow-500" />
                          </div>
                        </div>
                      </Skeleton>
                    </AspectRatio>
                    <h2 className="text-xl font-bold mb-2">{t('courseDetail.readyToEnroll')}</h2>
                    <p className="text-gray-600 mb-4">{t('courseDetail.enrollmentDesc')}</p>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 mb-3">
                      {t('courseDetail.startEnrollment')}
                    </Button>
                    <Button variant="outline" className="w-full border-yellow-500 text-yellow-700 hover:bg-yellow-50">
                      {t('courseDetail.requestInfo')}
                    </Button>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">{t('courseDetail.keyTechnologies')}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-gray-100">
                        <CircuitBoard className="h-3.5 w-3.5 mr-1" /> 
                        {t('courseDetail.electronics')}
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100">
                        <Wind className="h-3.5 w-3.5 mr-1" /> 
                        {t('courseDetail.renewableEnergy')}
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100">
                        <Lightbulb className="h-3.5 w-3.5 mr-1" /> 
                        {t('courseDetail.robotics')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {course.days && course.days.length > 0 && (
              <div className="mt-8 mb-12">
                <h2 className="text-2xl font-bold mb-6">{t('courseDetail.curriculumOutline')}</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-yellow-50">
                      <tr>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">{t('courseDetail.day')}</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">{t('courseDetail.moduleTitle')}</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">{t('courseDetail.hours')}</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">{t('courseDetail.activities')}</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">{t('courseDetail.keySkills')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.days.map((day) => (
                        <tr key={day.day} className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">{day.day}</td>
                          <td className="py-3 px-4 border-b font-medium">{day.title}</td>
                          <td className="py-3 px-4 border-b">{day.hours}</td>
                          <td className="py-3 px-4 border-b">{day.activities}</td>
                          <td className="py-3 px-4 border-b">{day.skills}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div className="flex justify-center mb-8">
              <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
                <Link to="/smart-assessment">{t('courseDetail.takeAssessment') || 'Take Assessment'}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
