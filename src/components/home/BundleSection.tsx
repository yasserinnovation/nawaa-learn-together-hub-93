
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, MapPin, Hammer, Book, SlidersHorizontal, ClipboardCheck } from "lucide-react";

const BundleSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-yellow-50 to-yellow-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build Your Learning Bundle
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Mix and match the perfect combination of trainer, tools, space, and content — all tailored to your goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Choose Trainer</h3>
            <p className="text-gray-600 mb-4">
              Find expert trainers specializing in robotics, coding, 3D design, and more.
            </p>
            <Link to="/build-bundle?step=trainer">
              <Button variant="link" className="p-0 text-yellow-600 hover:text-yellow-700">
                Start here →
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Pick a Space</h3>
            <p className="text-gray-600 mb-4">
              Select from libraries, co-working spaces, and makerspaces perfect for learning.
            </p>
            <Link to="/build-bundle?step=space">
              <Button variant="link" className="p-0 text-yellow-600 hover:text-yellow-700">
                Explore spaces →
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <Hammer size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Select Tools</h3>
            <p className="text-gray-600 mb-4">
              Choose from Arduino kits, 3D pens, robots, and more for your session.
            </p>
            <Link to="/build-bundle?step=tools">
              <Button variant="link" className="p-0 text-yellow-600 hover:text-yellow-700">
                Browse tools →
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <Book size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">4. Pick a Course</h3>
            <p className="text-gray-600 mb-4">
              Choose from curated courses or let your trainer define a custom one.
            </p>
            <Link to="/build-bundle?step=course">
              <Button variant="link" className="p-0 text-yellow-600 hover:text-yellow-700">
                See courses →
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <SlidersHorizontal size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">5. Set Preferences</h3>
            <p className="text-gray-600 mb-4">
              Customize for your audience with language, age range, and schedule options.
            </p>
            <Link to="/build-bundle?step=audience">
              <Button variant="link" className="p-0 text-yellow-600 hover:text-yellow-700">
                Configure →
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <ClipboardCheck size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">6. Review Bundle</h3>
            <p className="text-gray-600 mb-4">
              Preview your complete learning package before confirming and booking.
            </p>
            <Link to="/build-bundle?step=preview">
              <Button variant="link" className="p-0 text-yellow-600 hover:text-yellow-700">
                Finalize →
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/build-bundle">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-lg px-8 py-6 h-auto">
              Start Building Your Bundle
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BundleSection;
