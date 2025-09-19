
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Brain, Sparkles, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative py-20 md:py-32 bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-6 animate-bounce-gentle">
              <Sparkles className="h-4 w-4" />
              {t('hero.badge') || 'Transform Your Ideas'}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-gray-900 leading-tight">
              <span className="text-gradient animate-fade-in">
                {t('hero.title') || 'Transform Ideas into'}
              </span>
              <br />
              <span className="animate-slide-up">
                Real Prototypes
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle') || 'Connect with expert trainers, access cutting-edge tools, and find collaborative spaces to bring your innovative ideas to life.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button size="xl" className="group" asChild>
                <Link to="/smart-assessment" className="flex items-center gap-2" aria-label="Take smart assessment">
                  {t('hero.startAssessment') || 'Take Assessment'}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </Button>
              
              <Button size="xl" variant="outline" className="group" asChild>
                <Link to="/discover-spaces" className="flex items-center gap-2" aria-label="Discover learning spaces">
                  <MapPin className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  {t('hero.exploreSpaces') || 'Explore Spaces'}
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-600 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button variant="link" className="text-gray-600 p-0 h-auto hover:text-primary-600 group" asChild>
                <Link to="/courses" className="flex items-center gap-2" aria-label="Browse available courses">
                  <BookOpen className="h-4 w-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  {t('hero.browseCourses') || 'Browse Courses'}
                </Link>
              </Button>
              
              <Button variant="link" className="text-gray-600 p-0 h-auto hover:text-primary-600" asChild>
                <Link to="/share-your-space" aria-label="Share your space with the community">
                  {t('hero.shareSpace') || 'Share Your Space'}
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
                    alt="Children learning technology and building prototypes in a collaborative environment"
                    className="w-full h-auto transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Floating stats card */}
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl p-6 shadow-glow text-white animate-bounce-in" style={{ animationDelay: '1.2s' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-lg p-2">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {t('hero.spacesAvailable') || '50+'}
                      </p>
                      <p className="text-sm opacity-90">Spaces Available</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-full p-3 shadow-medium animate-pulse-scale">
                <Brain className="h-6 w-6 text-primary-500" />
              </div>
              
              <div className="absolute top-1/4 -right-6 bg-white rounded-full p-2 shadow-medium animate-bounce-gentle" style={{ animationDelay: '1s' }}>
                <Sparkles className="h-4 w-4 text-primary-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
