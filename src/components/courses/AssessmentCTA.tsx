
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AssessmentCTA = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-6 mb-8 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-full p-3">
            <Brain className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Not sure which course is right for your child?</h3>
            <p className="text-purple-100">Take our Smart Assessment to get personalized course recommendations</p>
          </div>
        </div>
        <Button 
          className="bg-white text-purple-600 hover:bg-gray-100 shrink-0" 
          asChild
        >
          <Link to="/smart-assessment" className="flex items-center gap-2">
            Take Assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AssessmentCTA;
