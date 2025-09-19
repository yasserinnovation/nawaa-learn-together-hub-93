import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Brain, Sparkles, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <main className={`relative py-20 md:py-32 bg-gradient-to-br from-primary-50 via-background to-primary-100 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`} role="main" aria-labelledby="hero-heading">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className={`absolute top-20 ${isRTL ? 'right-10' : 'left-10'} w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float`}></div>
      <div className={`absolute bottom-20 ${isRTL ? 'left-10' : 'right-10'} w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float`} style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`lg:w-1/2 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-6 animate-bounce-gentle">
              <Sparkles className="h-4 w-4" />
              {t('hero.badge')}
            </div>
            
            <h1 id="hero-heading" className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-foreground leading-tight ${isRTL ? 'font-arabic' : ''}`}>
              <span className="text-gradient animate-fade-in">
                {t('hero.title')}
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in ${isRTL ? 'font-arabic' : ''}`} style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle')}
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} mb-8 animate-fade-in`} style={{ animationDelay: '0.4s' }}>
              <Button variant="cta" size="xl" asChild>
                <Link to="/smart-assessment" className="flex items-center gap-3" aria-label="Start your smart assessment to find the perfect learning path">
                  <Brain className="h-5 w-5" aria-hidden="true" />
                  {t('hero.smartAssessment')}
                  <ArrowRight className={`h-5 w-5 transition-transform ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
                </Link>
              </Button>
              
              <Button variant="ctaSecondary" size="xl" asChild>
                <Link to="/discover-spaces" className="flex items-center gap-3" aria-label="Discover learning spaces near you">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                  {t('hero.exploreSpaces')}
                </Link>
              </Button>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-6 text-sm text-muted-foreground animate-fade-in justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'}`} style={{ animationDelay: '0.6s' }}>
              <Button variant="link" className="text-muted-foreground p-0 h-auto hover:text-primary group" asChild>
                <Link to="/courses" className="flex items-center gap-2" aria-label="Browse available STEM courses and learning materials">
                  <BookOpen className="h-4 w-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  {t('hero.browseCourses')}
                </Link>
              </Button>
              
              <Button variant="link" className="text-muted-foreground p-0 h-auto hover:text-primary" asChild>
                <Link to="/share-your-space" aria-label="Share your makerspace or workshop with the community">
                  {t('hero.shareSpace')}
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="relative hover-lift">
                <div className="bg-white rounded-2xl shadow-large overflow-hidden border border-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1567057469246-03bf63afa843?w=800&auto=format&fit=crop"
                    alt={t('hero.imageAlt')}
                    className="w-full h-auto transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Floating stats card */}
                <div className={`absolute -bottom-6 ${isRTL ? '-left-6' : '-right-6'} bg-gradient-to-r from-primary to-primary-600 rounded-xl p-6 shadow-glow text-white animate-bounce-in`} style={{ animationDelay: '1.2s' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-lg p-2">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <p className="text-2xl font-bold">
                        {t('hero.spacesAvailable')}
                      </p>
                      <p className="text-sm font-medium">
                        {t('spaces.availableLabel')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className={`absolute -top-4 ${isRTL ? '-right-4' : '-left-4'} bg-white rounded-full p-3 shadow-medium animate-pulse-scale`}>
                <Brain className="h-6 w-6 text-primary-500" />
              </div>
              
              <div className={`absolute top-1/4 ${isRTL ? '-left-6' : '-right-6'} bg-white rounded-full p-2 shadow-medium animate-bounce-gentle`} style={{ animationDelay: '1s' }}>
                <Sparkles className="h-4 w-4 text-primary-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;