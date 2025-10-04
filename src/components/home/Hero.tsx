import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Brain, Sparkles, BookOpen, Users, Award, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <main 
      className="relative py-20 md:py-32 bg-gradient-to-br from-primary-50 via-background to-primary-100 overflow-hidden" 
      role="main" 
      aria-labelledby="hero-heading"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className={`absolute top-20 ${isRTL ? 'right-10' : 'left-10'} w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float`}></div>
      <div className={`absolute bottom-20 ${isRTL ? 'left-10' : 'right-10'} w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float`} style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Text Content */}
          <div className={`lg:w-1/2 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'} space-y-6`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium animate-bounce-gentle">
              <Sparkles className="h-4 w-4" />
              <span className={isRTL ? 'font-arabic' : ''}>🚀 Join 10,000+ Young Innovators</span>
            </div>
            
            {/* Main Headline */}
            <h1 
              id="hero-heading" 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-in ${isRTL ? 'font-arabic' : ''}`}
            >
              <span className="text-gradient">
                Learn STEM Hands-On:
              </span>
              <br />
              <span className="text-foreground">
                Build Your First Model in 4 Weeks
              </span>
            </h1>
            
            {/* Quick Steps */}
            <div className={`flex flex-col sm:flex-row items-center justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} gap-3 text-base text-muted-foreground animate-fade-in`} style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Watch Lessons</span>
              </div>
              <ArrowRight className={`h-4 w-4 hidden sm:block ${isRTL ? 'rotate-180' : ''}`} />
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Try Projects</span>
              </div>
              <ArrowRight className={`h-4 w-4 hidden sm:block ${isRTL ? 'rotate-180' : ''}`} />
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Share Outcomes</span>
              </div>
            </div>
            
            {/* Subtitle */}
            <p 
              className={`text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in ${isRTL ? 'font-arabic' : ''}`} 
              style={{ animationDelay: '0.3s' }}
            >
              {t('hero.subtitle')}
            </p>
            
            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'lg:justify-end sm:flex-row-reverse' : 'lg:justify-start'} animate-fade-in`} 
              style={{ animationDelay: '0.5s' }}
            >
              <Button variant="cta" size="xl" asChild>
                <Link to="/courses" className="flex items-center gap-3" aria-label="Start free course">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                  <span className={isRTL ? 'font-arabic' : ''}>Start Free Course</span>
                  <ArrowRight className={`h-5 w-5 transition-transform ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
                </Link>
              </Button>
              
              <Button variant="ctaSecondary" size="xl" asChild>
                <Link to="/discover-spaces" className="flex items-center gap-3" aria-label="Find a learning space near you">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                  <span className={isRTL ? 'font-arabic' : ''}>Find Spaces Near You</span>
                </Link>
              </Button>
            </div>
            
            {/* Trust Elements */}
            <div 
              className={`flex flex-col sm:flex-row items-center gap-6 justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'} pt-4 border-t border-border/40 animate-fade-in`} 
              style={{ animationDelay: '0.7s' }}
            >
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">10,000+</strong> active learners
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">500+</strong> projects completed
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  <strong className="text-foreground">50+</strong> learning spaces
                </span>
              </div>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="lg:w-1/2">
            <div className="relative animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="relative hover-lift">
                <div className="bg-white rounded-2xl shadow-large overflow-hidden border border-gray-100 min-h-[400px] flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&auto=format&fit=crop&q=80"
                    alt={t('hero.imageAlt')}
                    className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105"
                    loading="eager"
                    onError={(e) => {
                      console.log('Image failed to load:', e.currentTarget.src);
                      e.currentTarget.src = 'https://via.placeholder.com/800x600/FFD600/000000?text=Learning+Spaces';
                    }}
                  />
                </div>
                
                {/* Floating stats card */}
                <div 
                  className={`absolute -bottom-6 ${isRTL ? '-left-6' : '-right-6'} bg-gradient-to-r from-primary to-primary-600 rounded-xl p-4 shadow-glow text-white animate-bounce-in min-w-[140px] z-10`} 
                  style={{ animationDelay: '1.2s' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-lg p-2">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className={`${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
                      <p className="text-xl font-bold">
                        {t('hero.spacesAvailable')}
                      </p>
                      <p className="text-xs font-medium opacity-90">
                        {t('spaces.availableLabel')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className={`absolute -top-4 ${isRTL ? '-right-4' : '-left-4'} bg-white rounded-full p-3 shadow-medium animate-pulse-scale z-10`}>
                <Brain className="h-6 w-6 text-primary-500" />
              </div>
              
              <div className={`absolute top-1/4 ${isRTL ? '-left-6' : '-right-6'} bg-white rounded-full p-2 shadow-medium animate-bounce-gentle z-10`} style={{ animationDelay: '1s' }}>
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