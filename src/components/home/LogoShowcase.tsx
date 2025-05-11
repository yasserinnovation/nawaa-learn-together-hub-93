
import { useState, useEffect } from "react";

const LogoShowcase = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Check if the image loads correctly
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
          
          <div className="rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
            {!imageLoaded && (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Loading logo...</p>
              </div>
            )}
            <img 
              src="/lovable-uploads/b0de8c1d-16f7-4476-88a5-c7f7f54292cf.png" 
              alt="Nawaa logo - hexagonal spiral design" 
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
