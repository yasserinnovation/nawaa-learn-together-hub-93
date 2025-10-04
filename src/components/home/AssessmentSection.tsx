
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
              <Brain className="h-12 w-12 text-purple-500" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Find Your Perfect Learning Path in 5 Minutes</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take our smart assessment to discover which courses and spaces match your skills, interests, and learning style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Target className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('assessment.multipleIntelligences')}</h3>
              <p className="text-gray-600">{t('assessment.multipleIntelligencesDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Brain className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('assessment.personalityAnalysis')}</h3>
              <p className="text-gray-600">{t('assessment.personalityAnalysisDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <BookOpen className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('assessment.courseMatching')}</h3>
              <p className="text-gray-600">{t('assessment.courseMatchingDesc')}</p>
            </div>
          </div>

          <div className="text-center">
            <Button variant="cta" size="xl" asChild>
              <Link to="/smart-assessment" className="flex items-center gap-2" aria-label="Start your personalized assessment">
                <Brain className="h-5 w-5" aria-hidden="true" />
                Take the Assessment Now
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              ⏱️ Just 5 minutes · No signup required · Instant results
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentSection;
