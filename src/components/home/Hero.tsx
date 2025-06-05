
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Brain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="py-16 md:py-24 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
              {t('hero.title') || 'Transform Ideas into Real Prototypes'}
            </h1>
            <p className="text-lg md:text-xl text-black mb-8">
              {t('hero.subtitle') || 'Connect with expert trainers, access cutting-edge tools, and find collaborative spaces to bring your innovative ideas to life.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black" asChild>
                <Link to="/build-bundle" className="flex items-center gap-2" aria-label="Start building your learning bundle">
                  {t('hero.startBuilding') || 'Start Building'}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-100" asChild>
                <Link to="/smart-assessment" className="flex items-center gap-2" aria-label="Take smart assessment">
                  {t('hero.smartAssessment') || 'Smart Assessment'}
                  <Brain className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-black">
              <Button variant="link" className="text-black p-0" asChild>
                <Link to="/discover-spaces" className="flex items-center gap-1" aria-label="Explore available spaces">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {t('hero.exploreSpaces') || 'Explore Spaces'}
                </Link>
              </Button>
              <Button variant="link" className="text-black p-0" asChild>
                <Link to="/share-your-space" aria-label="Share your space with the community">
                  {t('hero.shareSpace') || 'Share Your Space'}
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1567057469246-03bf63afa843?w=800&auto=format&fit=crop"
                  alt="Children learning technology and building prototypes in a collaborative environment"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-500 rounded-lg p-4 shadow-lg border border-black">
                <p className="text-xl font-bold text-black">
                  {t('hero.spacesAvailable') || '50+ Spaces Available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
