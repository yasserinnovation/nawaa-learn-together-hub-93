
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white border-b border-gray-100'
      }`} 
      role="banner"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Nawaa home page">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-2 h-12 w-auto flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
            {!logoLoaded && <div className="h-8 w-8 bg-primary-700 rounded-md" aria-hidden="true"></div>}
            <img 
              src="/lovable-uploads/15fb8a28-ecf5-48ee-b8c7-9d80f6320b52.png" 
              alt="Nawaa Logo"
              className={`h-8 w-auto transition-opacity duration-300 ${!logoLoaded ? 'opacity-0' : 'opacity-100'}`}
              onLoad={handleLogoLoad}
              onError={handleLogoError}
            />
          </div>
          <span className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">Nawaa</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
          <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium relative group">
            {t('nav.home') || 'Home'}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link to="/courses" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium relative group">
            {t('nav.courses') || 'Courses'}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link to="/discover-spaces" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium relative group">
            {t('nav.discoverSpaces') || 'Discover Spaces'}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link to="/access-tools" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium relative group">
            {t('nav.accessTools') || 'Access Tools'}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link to="/competitions-guide" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium relative group">
            دليل المسابقات
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link to="/smart-assessment" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium relative group">
            {t('nav.smartAssessment') || 'Smart Assessment'}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium relative group">
            {t('nav.contact') || 'Contact'}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link to="/admin" className="text-primary-600 hover:text-primary-700 transition-colors duration-200 font-medium">
            Admin
          </Link>
        </nav>

        {/* Auth buttons and language switcher */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            {t('nav.signIn') || 'Sign In'}
          </Button>
          <Button size="default" className="shadow-md">
            {t('nav.signUp') || 'Sign Up'}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b shadow-lg animate-slide-down">
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 py-3 transition-colors font-medium border-b border-gray-100 last:border-b-0"
                onClick={closeMenu}
              >
                {t('nav.home') || 'Home'}
              </Link>
              <Link
                to="/courses"
                className="text-gray-700 hover:text-primary-600 py-3 transition-colors font-medium border-b border-gray-100 last:border-b-0"
                onClick={closeMenu}
              >
                {t('nav.courses') || 'Courses'}
              </Link>
              <Link
                to="/discover-spaces"
                className="text-gray-700 hover:text-primary-600 py-3 transition-colors font-medium border-b border-gray-100 last:border-b-0"
                onClick={closeMenu}
              >
                {t('nav.discoverSpaces') || 'Discover Spaces'}
              </Link>
              <Link
                to="/access-tools"
                className="text-gray-700 hover:text-primary-600 py-3 transition-colors font-medium border-b border-gray-100 last:border-b-0"
                onClick={closeMenu}
              >
                {t('nav.accessTools') || 'Access Tools'}
              </Link>
              <Link
                to="/competitions-guide"
                className="text-gray-700 hover:text-primary-600 py-3 transition-colors font-medium border-b border-gray-100 last:border-b-0"
                onClick={closeMenu}
              >
                دليل المسابقات
              </Link>
              <Link
                to="/smart-assessment"
                className="text-gray-700 hover:text-primary-600 py-3 transition-colors font-medium border-b border-gray-100 last:border-b-0"
                onClick={closeMenu}
              >
                {t('nav.smartAssessment') || 'Smart Assessment'}
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-primary-600 py-3 transition-colors font-medium border-b border-gray-100 last:border-b-0"
                onClick={closeMenu}
              >
                {t('nav.contact') || 'Contact'}
              </Link>
              <Link
                to="/admin"
                className="text-primary-600 hover:text-primary-700 py-3 transition-colors font-medium border-b border-gray-100 last:border-b-0"
                onClick={closeMenu}
              >
                Admin
              </Link>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <LanguageSwitcher />
              </div>
              
              <div className="flex flex-col gap-3 mt-4">
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-gray-900">
                  {t('nav.signIn') || 'Sign In'}
                </Button>
                <Button className="w-full shadow-md">
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
