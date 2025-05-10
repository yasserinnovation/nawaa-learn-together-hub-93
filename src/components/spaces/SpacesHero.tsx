
import { MapPin, Search } from "lucide-react";

const SpacesHero = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920" 
          alt="Collaborative spaces" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center mb-4">
          <MapPin className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Spaces</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          Explore community-shared locations for hands-on tech training across Saudi Arabia
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by city, neighborhood, or space name"
              className="pl-10 pr-4 py-3 w-full rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Search Spaces
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpacesHero;
