
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-nawaa-black">
                <span className="text-nawaa-yellow">Na</span>waa
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link to="/spaces" className="text-gray-800 hover:text-nawaa-yellow px-3 py-2 text-sm font-medium transition-colors">
              Spaces
            </Link>
            <Link to="/tools" className="text-gray-800 hover:text-nawaa-yellow px-3 py-2 text-sm font-medium transition-colors">
              Tools
            </Link>
            <Link to="/trainers" className="text-gray-800 hover:text-nawaa-yellow px-3 py-2 text-sm font-medium transition-colors">
              Trainers
            </Link>
            <Link to="/courses" className="text-gray-800 hover:text-nawaa-yellow px-3 py-2 text-sm font-medium transition-colors">
              Courses
            </Link>
            <Button variant="default" className="ml-4">
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-nawaa-yellow focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg rounded-b-xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/spaces" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-nawaa-yellow"
              onClick={toggleMenu}
            >
              Spaces
            </Link>
            <Link 
              to="/tools"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-nawaa-yellow"
              onClick={toggleMenu}
            >
              Tools
            </Link>
            <Link 
              to="/trainers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-nawaa-yellow"
              onClick={toggleMenu}
            >
              Trainers
            </Link>
            <Link 
              to="/courses"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-nawaa-yellow"
              onClick={toggleMenu}
            >
              Courses
            </Link>
            <div className="pt-4">
              <Button variant="default" className="w-full">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
