
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="py-16 md:py-24 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Empower children with technology through hands-on learning
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Mix and match your perfect learning bundle with trainers, spaces, tools, and courses tailored to your child's interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600">
                Get Started
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/discover-spaces">
                  Explore Spaces
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop"
                  alt="Children learning technology"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-500 rounded-lg p-4 shadow-lg">
                <p className="text-xl font-bold text-white">
                  200+ Spaces Available
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
