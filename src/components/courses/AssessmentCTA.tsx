
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AssessmentCTA = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 mb-8 text-primary-foreground" role="region" aria-labelledby="assessment-cta-heading">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary-foreground/20 rounded-full p-3" aria-hidden="true">
            <Brain className="h-8 w-8" />
          </div>
          <div>
            <h3 id="assessment-cta-heading" className="text-xl font-bold mb-1">
              {t('assessment.title')}
            </h3>
            <p className="text-primary-foreground/90 leading-relaxed">
              {t('assessment.subtitle')}
            </p>
          </div>
        </div>
            <Button 
              variant="cta"
              size="lg" 
              asChild
              aria-label="Take our smart assessment for personalized course recommendations"
            >
              <Link to="/smart-assessment" className="flex items-center gap-3">
                <Brain className="h-5 w-5" aria-hidden="true" />
                {t('assessment.startAssessment')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
      </div>
    </div>
  );
};

export default AssessmentCTA;
