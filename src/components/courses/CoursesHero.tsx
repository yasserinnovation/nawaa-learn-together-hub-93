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
            Mix & Match Your Perfect Learning Experience
          </h1>
          
          <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Combine STEM courses, life skills, and emerging technologies to create your custom learning path. Start building real projects today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="cta" 
              size="xl" 
              asChild 
              aria-label="Find a learning space to start hands-on projects"
            >
              <Link to="/discover-spaces" className="flex items-center gap-3">
                <MapPin className="h-5 w-5" aria-hidden="true" />
                Find Spaces Near You
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            
            <Button 
              variant="ctaSecondary" 
              size="xl" 
              asChild 
              aria-label="Contact us for personalized course recommendations"
            >
              <Link to="/contact" className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Get Course Guidance
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesHero;