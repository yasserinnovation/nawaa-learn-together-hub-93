
import { useState } from "react";

const LogoShowcase = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [illustrationLoaded, setIllustrationLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log("Logo image loaded successfully");
  };

  const handleImageError = () => {
    console.error("Failed to load the logo image");
  };

  const handleIllustrationLoad = () => {
    setIllustrationLoaded(true);
    console.log("Illustration loaded successfully");
  };

  const handleIllustrationError = () => {
    console.error("Failed to load the illustration");
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Empowering the Next Generation of Innovators
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
            {/* Logo */}
            <div className="bg-black rounded-lg overflow-hidden shadow-lg p-8">
              {!imageLoaded && (
                <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-400">Loading logo...</p>
                </div>
              )}
              <img 
                src="/lovable-uploads/15fb8a28-ecf5-48ee-b8c7-9d80f6320b52.png" 
                alt="Nawaa logo - hexagonal spiral design with NAWAA text" 
                className={`w-full h-auto ${!imageLoaded ? 'hidden' : ''}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
            
            {/* Illustration */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              {!illustrationLoaded && (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">Loading illustration...</p>
                </div>
              )}
              <img 
                src="/lovable-uploads/4feb6482-3a0a-45ec-8498-a2f75c92ecf7.png" 
                alt="Children learning with technology - spiral illustration with kids using drones, robots and laptops" 
                className={`w-full h-auto ${!illustrationLoaded ? 'hidden' : ''}`}
                onLoad={handleIllustrationLoad}
                onError={handleIllustrationError}
              />
            </div>
          </div>
          
          <p className="mt-8 text-lg text-gray-700 max-w-3xl mx-auto text-center">
            At Nawaa, we bring children together with technology, fostering creativity, 
            innovation, and hands-on learning experiences through our unique spiral approach to education.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LogoShowcase;
