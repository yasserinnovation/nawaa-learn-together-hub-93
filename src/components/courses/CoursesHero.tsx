import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CoursesHero = () => {
  const { t } = useLanguage();

  return (
    <section 
      className="bg-gradient-to-br from-primary-50 to-primary-100 py-16" 
      role="banner" 
      aria-labelledby="courses-hero-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <span>📚</span>
            <span>{t('courses.stemFocus')}</span>
          </div>
          
          <h1 id="courses-hero-heading" className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            {t('courses.title')}
          </h1>
          
          <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mix and match between STEM curricula, life skills, and emerging technologies to create the perfect learning experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="cta" 
              size="xl" 
              asChild 
              aria-label="Find a learning space near you to start your courses"
            >
              <Link to="/discover-spaces" className="flex items-center gap-3">
                <MapPin className="h-5 w-5" aria-hidden="true" />
                {t('courses.findSpace')}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            
            <Button 
              variant="ctaSecondary" 
              size="xl" 
              asChild 
              aria-label="Contact us for more information about our courses"
            >
              <Link to="/contact" className="flex items-center gap-3">
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

export default CoursesHero;