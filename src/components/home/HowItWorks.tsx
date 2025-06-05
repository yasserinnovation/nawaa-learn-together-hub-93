
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb, Users, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-1 bg-yellow-400" aria-hidden="true"></div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-yellow-400 bg-white text-yellow-600 text-xl font-bold z-10 mb-2">
                    01
                  </div>
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md">
                    <Lightbulb className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{t('howItWorks.step1')}</h3>
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">{t('howItWorks.step1Desc')}</p>
                  <div className="h-48 w-full bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop" 
                      alt="Step 1: Submit Your Idea"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-yellow-400 bg-white text-yellow-600 text-xl font-bold z-10 mb-2">
                    02
                  </div>
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{t('howItWorks.step2')}</h3>
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">{t('howItWorks.step2Desc')}</p>
                  <div className="h-48 w-full bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&auto=format&fit=crop" 
                      alt="Step 2: Get Matched & Build"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-yellow-400 bg-white text-yellow-600 text-xl font-bold z-10 mb-2">
                    03
                  </div>
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md">
                    <Rocket className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{t('howItWorks.step3')}</h3>
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">{t('howItWorks.step3Desc')}</p>
                  <div className="h-48 w-full bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop" 
                      alt="Step 3: Launch Your MVP"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600" asChild>
              <Link to="/build-bundle">{t('howItWorks.startJourney')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
