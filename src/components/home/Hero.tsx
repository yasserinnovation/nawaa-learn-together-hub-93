
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Transform Ideas into Real Prototypes
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Connect with expert trainers, access cutting-edge tools, and use real makerspaces 
              to build your MVP. From idea to launch in one comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600" asChild>
                <Link to="/build-bundle" className="flex items-center gap-2">
                  Start Your MVP Journey
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/smart-assessment" className="flex items-center gap-2">
                  Take Smart Assessment
                  <Brain className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
              <Button variant="link" className="text-yellow-600 p-0" asChild>
                <Link to="/discover-spaces" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Explore 150+ Spaces
                </Link>
              </Button>
              <Button variant="link" className="text-yellow-600 p-0" asChild>
                <Link to="/share-your-space">
                  Share Your Space
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1567057469246-03bf63afa843?w=800&auto=format&fit=crop"
                  alt="Children learning technology and building prototypes"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-500 rounded-lg p-4 shadow-lg">
                <p className="text-xl font-bold text-white">
                  150+ Spaces Available
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
