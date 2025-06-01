
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Target, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AssessmentSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="h-12 w-12 text-purple-500" />
              <h2 className="text-3xl md:text-4xl font-bold">Smart Child Assessment</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Not sure which course is perfect for your child? Our AI-powered assessment analyzes their strengths, interests, and learning style to recommend the ideal tech course.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Target className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Intelligences</h3>
              <p className="text-gray-600">Discover your child's unique learning strengths and cognitive preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Brain className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personality Analysis</h3>
              <p className="text-gray-600">Understand their behavior patterns and social learning preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <BookOpen className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Course Matching</h3>
              <p className="text-gray-600">Get personalized recommendations for the perfect learning path</p>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-purple-500 hover:bg-purple-600" asChild>
              <Link to="/smart-assessment">
                Start Smart Assessment
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">Takes only 5-10 minutes • 100% Free</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentSection;
