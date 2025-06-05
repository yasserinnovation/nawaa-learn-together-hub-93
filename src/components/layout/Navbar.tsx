
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoLoad = () => {
    setLogoLoaded(true);
  };

  const handleLogoError = () => {
    console.error("Failed to load logo");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50" role="banner">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" aria-label="Nawaa home page">
          <div className="bg-black rounded-md p-1 h-12 w-auto flex items-center justify-center">
            {!logoLoaded && <div className="h-8 w-8 bg-gray-800" aria-hidden="true"></div>}
            <img 
              src="/lovable-uploads/15fb8a28-ecf5-48ee-b8c7-9d80f6320b52.png" 
              alt="Nawaa Logo"
              className={`h-8 w-auto ${!logoLoaded ? 'hidden' : ''}`}
              onLoad={handleLogoLoad}
              onError={handleLogoError}
            />
          </div>
          <span className="font-bold text-xl text-black">Nawaa</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-700 p-2"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
            aria-hidden="true"
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
        <nav className="hidden lg:flex items-center gap-6" role="navigation" aria-label="Main navigation">
          <Link to="/" className="text-gray-700 hover:text-yellow-600 transition-colors">
            {t('nav.home') || 'Home'}
          </Link>
          <Link to="/courses" className="text-gray-700 hover:text-yellow-600 transition-colors">
            {t('nav.courses') || 'Courses'}
          </Link>
          <Link to="/find-trainers" className="text-gray-700 hover:text-yellow-600 transition-colors">
            {t('nav.findTrainers') || 'Find Trainers'}
          </Link>
          <Link to="/discover-spaces" className="text-gray-700 hover:text-yellow-600 transition-colors">
            {t('nav.discoverSpaces') || 'Discover Spaces'}
          </Link>
          <Link to="/access-tools" className="text-gray-700 hover:text-yellow-600 transition-colors">
            {t('nav.accessTools') || 'Access Tools'}
          </Link>
          <Link to="/build-bundle" className="text-gray-700 hover:text-yellow-600 transition-colors">
            {t('nav.buildBundle') || 'Build Bundle'}
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-yellow-600 transition-colors">
            {t('nav.contact') || 'Contact'}
          </Link>
        </nav>

        {/* Auth buttons and language switcher */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Button variant="outline" className="text-black border-black hover:bg-gray-100">
            {t('nav.signIn') || 'Sign In'}
          </Button>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
            {t('nav.signUp') || 'Sign Up'}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-yellow-600 py-2 transition-colors"
                onClick={closeMenu}
              >
                {t('nav.home') || 'Home'}
              </Link>
              <Link
                to="/courses"
                className="text-gray-700 hover:text-yellow-600 py-2 transition-colors"
                onClick={closeMenu}
              >
                {t('nav.courses') || 'Courses'}
              </Link>
              <Link
                to="/find-trainers"
                className="text-gray-700 hover:text-yellow-600 py-2 transition-colors"
                onClick={closeMenu}
              >
                {t('nav.findTrainers') || 'Find Trainers'}
              </Link>
              <Link
                to="/discover-spaces"
                className="text-gray-700 hover:text-yellow-600 py-2 transition-colors"
                onClick={closeMenu}
              >
                {t('nav.discoverSpaces') || 'Discover Spaces'}
              </Link>
              <Link
                to="/access-tools"
                className="text-gray-700 hover:text-yellow-600 py-2 transition-colors"
                onClick={closeMenu}
              >
                {t('nav.accessTools') || 'Access Tools'}
              </Link>
              <Link
                to="/build-bundle"
                className="text-gray-700 hover:text-yellow-600 py-2 transition-colors"
                onClick={closeMenu}
              >
                {t('nav.buildBundle') || 'Build Bundle'}
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-yellow-600 py-2 transition-colors"
                onClick={closeMenu}
              >
                {t('nav.contact') || 'Contact'}
              </Link>
              <div className="flex items-center justify-between">
                <LanguageSwitcher />
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <Button variant="outline" className="w-full text-black border-black hover:bg-gray-100">
                  {t('nav.signIn') || 'Sign In'}
                </Button>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  {t('nav.signUp') || 'Sign Up'}
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
