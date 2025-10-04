
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LogoShowcase = () => {
  const { t } = useLanguage();
  const [illustrationLoaded, setIllustrationLoaded] = useState(false);

  const handleIllustrationLoad = () => {
    setIllustrationLoaded(true);
  };

  const handleIllustrationError = () => {
    // Silent error handling - component will show fallback
  };

  return (
    <section className="py-16 bg-white" aria-labelledby="logo-showcase-heading">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 id="logo-showcase-heading" className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">
            {t('logoShowcase.title') || 'Empowering Young Innovators'}
          </h2>
          
          <div className="w-full max-w-4xl mx-auto">
            {/* Illustration */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              {!illustrationLoaded && (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center" role="status" aria-label="Loading illustration">
                  <p className="text-black">Loading illustration...</p>
                </div>
              )}
              <img 
                src="/lovable-uploads/4feb6482-3a0a-45ec-8498-a2f75c92ecf7.png" 
                alt="Spiral illustration showing children engaged in technology learning activities - using drones, robots, and laptops in a collaborative educational environment" 
                className={`w-full h-auto ${!illustrationLoaded ? 'hidden' : ''}`}
                width={1200}
                height={800}
                onLoad={handleIllustrationLoad}
                onError={handleIllustrationError}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          
          <p className="mt-8 text-lg text-black max-w-3xl mx-auto text-center">
            {t('logoShowcase.description') || 'Join thousands of young minds exploring technology, building prototypes, and turning creative ideas into reality through hands-on learning experiences.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default LogoShowcase;
