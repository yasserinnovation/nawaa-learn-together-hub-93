
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { AssessmentResult } from "@/types/assessment";
import { getCourseById } from "@/lib/course-utils";
import { Download, CheckCircle } from "lucide-react";

interface AssessmentResultsProps {
  result: AssessmentResult;
}

const AssessmentResults = ({ result }: AssessmentResultsProps) => {
  const recommendedCourses = result.recommendedCourses.map(id => getCourseById(id)).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-green-600">Assessment Complete!</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <span className="text-lg">Your personalized course recommendations are ready</span>
        </div>
      </div>

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl">Your Child's Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Personality Type:</h4>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                {result.personalityType}
              </Badge>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Key Strengths:</h4>
              <div className="flex flex-wrap gap-2">
                {result.strengths.map((strength) => (
                  <Badge key={strength} variant="outline" className="bg-yellow-100 text-yellow-800">
                    {strength.charAt(0).toUpperCase() + strength.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Summary:</h4>
              <p className="text-gray-700">{result.summary}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-2xl font-bold mb-4">Recommended Courses</h3>
        <div className="grid gap-4">
          {recommendedCourses.map((course, index) => (
            <Card key={course.id} className="border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <course.icon className="h-6 w-6 text-yellow-500" />
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{course.project}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="outline">{course.ageGroup}</Badge>
                    <Badge variant="outline">{course.duration}</Badge>
                  </div>
                  <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
                    <Link to={`/courses/${course.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-6">
        <Button 
          variant="outline" 
          className="border-green-500 text-green-700 hover:bg-green-50"
          onClick={() => window.print()}
        >
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
          <Link to="/courses">Explore All Courses</Link>
        </Button>
      </div>
    </div>
  );
};

export default AssessmentResults;
