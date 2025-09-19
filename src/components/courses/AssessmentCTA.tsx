
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
            <h3 id="assessment-cta-heading" className="text-xl font-bold mb-1">Not sure which course is right for your child?</h3>
            <p className="text-primary-foreground/80">Take our Smart Assessment to get personalized course recommendations</p>
          </div>
        </div>
        <Button 
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shrink-0" 
          asChild
        >
          <Link to="/smart-assessment" className="flex items-center gap-2" aria-label="Take our smart assessment for personalized course recommendations">
            Take Assessment
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AssessmentCTA;
