import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Brain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gray-900" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold" asChild>
             <Link to="/smart-assessment" className="flex items-center gap-2" aria-label="Take our smart assessment to get personalized recommendations">
               <Brain className="h-5 w-5" aria-hidden="true" />
               {t('cta.takeAssessment')}
               <ArrowRight className="h-5 w-5" aria-hidden="true" />
             </Link>
             </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-200 font-semibold" asChild>
              <Link to="/contact" className="flex items-center gap-2" aria-label="Contact us for support and questions">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {t('cta.contactUs')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;