
import { useState } from "react";

const LogoShowcase = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log("Logo image loaded successfully");
  };

  const handleImageError = () => {
    console.error("Failed to load the logo image");
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Empowering the Next Generation of Innovators
          </h2>
          
          <div className="bg-black rounded-lg overflow-hidden shadow-lg max-w-xl mx-auto p-8">
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
