
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          Nawaa
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-yellow-600">
            Home
          </Link>
          <Link to="/courses" className="text-gray-700 hover:text-yellow-600">
            Courses
          </Link>
          <Link to="/discover-spaces" className="text-gray-700 hover:text-yellow-600">
            Discover Spaces
          </Link>
          <Link to="/access-tools" className="text-gray-700 hover:text-yellow-600">
            Access Tools
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-yellow-600">
            Contact
          </Link>
        </nav>

        {/* Auth buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="outline">Sign in</Button>
          <Button className="bg-yellow-500 hover:bg-yellow-600">
            Sign up
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-yellow-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="text-gray-700 hover:text-yellow-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/discover-spaces"
                className="text-gray-700 hover:text-yellow-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Discover Spaces
              </Link>
              <Link
                to="/access-tools"
                className="text-gray-700 hover:text-yellow-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Access Tools
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-yellow-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-2 mt-2">
                <Button variant="outline" className="w-full">
                  Sign in
                </Button>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
