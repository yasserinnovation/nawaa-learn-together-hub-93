
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/components/auth/AuthProvider";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { Menu, X, ChevronDown, Users, BookOpen, MapPin, Wrench, Trophy, Brain, MessageSquare, Shield, LogOut } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { t, language } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoLoad = () => {
    setLogoLoaded(true);
  };

  const handleLogoError = () => {
    // Silent error handling - fallback to text-only logo
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setShowAdminMenu(false);
    setShowUserMenu(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActivePath = (path: string) => location.pathname === path;

  const navItems = [
    { 
      path: "/", 
      label: t('nav.home') || 'Home', 
      icon: BookOpen,
      isActive: isActivePath("/")
    },
    { 
      path: "/courses", 
      label: t('nav.courses') || 'Courses', 
      icon: BookOpen,
      isActive: isActivePath("/courses")
    },
    { 
      path: "/discover-spaces", 
      label: t('nav.discoverSpaces') || 'Discover Spaces', 
      icon: MapPin,
      isActive: isActivePath("/discover-spaces")
    },
    { 
      path: "/access-tools", 
      label: t('nav.accessTools') || 'Access Tools', 
      icon: Wrench,
      isActive: isActivePath("/access-tools")
    }
  ];

  const secondaryItems = [
    { 
      path: "/all-spaces", 
      label: language === 'ar' ? 'جميع الأماكن' : 'All Spaces', 
      icon: MapPin,
      isActive: isActivePath("/all-spaces")
    },
    { 
      path: "/competitions-guide", 
      label: language === 'ar' ? 'دليل المسابقات' : 'Competitions Guide', 
      icon: Trophy,
      isActive: isActivePath("/competitions-guide")
    },
    { 
      path: "/smart-assessment", 
      label: t('nav.smartAssessment') || 'Smart Assessment', 
      icon: Brain,
      isActive: isActivePath("/smart-assessment")
    },
    { 
      path: "/contact", 
      label: t('nav.contact') || 'Contact', 
      icon: MessageSquare,
      isActive: isActivePath("/contact")
    }
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-sm border-b border-gray-100'
      }`} 
      role="banner"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group hover:scale-105 transition-all duration-200" 
            aria-label="Nawaa home page"
          >
            <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl p-2.5 h-11 w-auto flex items-center justify-center shadow-lg group-hover:shadow-yellow transition-all duration-300">
              {!logoLoaded && <div className="h-6 w-6 bg-yellow-600 rounded-md animate-pulse" aria-hidden="true"></div>}
              <img 
                src="/lovable-uploads/15fb8a28-ecf5-48ee-b8c7-9d80f6320b52.png" 
                alt="Nawaa Logo"
                className={`h-6 w-auto transition-opacity duration-300 ${!logoLoaded ? 'opacity-0' : 'opacity-100'}`}
                onLoad={handleLogoLoad}
                onError={handleLogoError}
              />
            </div>
            <span className="font-bold text-xl text-gray-900 group-hover:text-yellow-600 transition-colors font-poppins">
              Nawaa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center" role="navigation" aria-label="Main navigation">
            {/* Primary Navigation */}
            <div className="flex items-center gap-1 mr-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group flex items-center gap-2 ${
                    item.isActive
                      ? 'text-yellow-600 bg-yellow-50 shadow-sm'
                      : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  {item.isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-500 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Secondary Navigation */}
            <div className="flex items-center gap-1 mr-8">
              {secondaryItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group flex items-center gap-2 ${
                    item.isActive
                      ? 'text-yellow-600 bg-yellow-50'
                      : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Admin Menu (Only visible to admins) */}
            {isAdmin && (
              <div className="relative mr-6">
                <button
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="flex items-center gap-1 px-3 py-2 text-xs text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-muted/50"
                  aria-expanded={showAdminMenu}
                  aria-haspopup="true"
                  aria-label="Admin menu - Access administrative functions"
                >
                  <Shield className="w-3 h-3" aria-hidden="true" />
                  <span className="sr-only">Admin</span>
                  <ChevronDown className="w-3 h-3" aria-hidden="true" />
                </button>
                
                {showAdminMenu && (
                  <div 
                    className="absolute top-full right-0 mt-1 bg-popover rounded-lg shadow-lg border border-border py-1 min-w-[140px] animate-fade-in-up z-50"
                    role="menu"
                    aria-label="Admin menu options"
                  >
                    <Link
                      to="/admin"
                      onClick={() => setShowAdminMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted hover:text-primary transition-colors duration-200"
                      role="menuitem"
                    >
                      <Shield className="w-4 h-4" aria-hidden="true" />
                      Admin Panel
                    </Link>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* User Authentication */}
            {user ? (
              <div className="hidden lg:flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                    aria-expanded={showUserMenu}
                    aria-haspopup="true"
                    aria-label={`User account menu for ${user.email}`}
                  >
                    <div className="h-8 w-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm" aria-hidden="true">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  </button>
                  
                  {showUserMenu && (
                    <div 
                      className="absolute top-full right-0 mt-1 bg-popover rounded-lg shadow-lg border border-border py-2 min-w-[180px] animate-fade-in-up z-50"
                      role="menu"
                      aria-label="User account options"
                    >
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-popover-foreground truncate">{user.email}</p>
                        {isAdmin && (
                          <p className="text-xs text-primary font-medium">Administrator</p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted hover:text-destructive transition-colors duration-200"
                        role="menuitem"
                      >
                        <LogOut className="w-4 h-4" aria-hidden="true" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link to="/auth">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-foreground hover:text-primary hover:bg-muted font-medium"
                  >
                    {t('auth.signIn')}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button 
                    variant="cta"
                    size="sm"
                  >
                    {t('auth.signUp')}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-yellow-600 transition-all duration-200"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b shadow-xl animate-slide-in-right">
            <div className="container mx-auto px-4 py-6">
              {/* Primary Navigation */}
              <div className="space-y-1 mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 mb-3">
                  Main Navigation
                </h3>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      item.isActive
                        ? 'text-yellow-600 bg-yellow-50'
                        : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50/50'
                    }`}
                    onClick={closeMenu}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Secondary Navigation */}
              <div className="space-y-1 mb-6 border-t border-gray-100 pt-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 mb-3">
                  More
                </h3>
                {secondaryItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      item.isActive
                        ? 'text-yellow-600 bg-yellow-50'
                        : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50/50'
                    }`}
                    onClick={closeMenu}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {/* User Menu - Mobile */}
              <div className="space-y-3 border-t border-border pt-6">
                {user ? (
                  <>
                    <div className="px-3 py-2">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                          {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
                          {isAdmin && (
                            <p className="text-xs text-primary font-medium">Administrator</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        signOut();
                        closeMenu();
                      }}
                      variant="ghost" 
                      className="w-full justify-start text-foreground hover:text-destructive hover:bg-muted font-medium h-12"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={closeMenu}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-foreground hover:text-primary hover:bg-muted font-medium h-12"
                      >
                        <Users className="w-5 h-5 mr-3" />
                        {t('auth.signIn')}
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={closeMenu}>
                      <Button 
                        variant="cta"
                        className="w-full h-12"
                      >
                        {t('auth.signUp')}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
