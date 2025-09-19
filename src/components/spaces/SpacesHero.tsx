
import { MapPin, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SpaceFilter } from "@/types/space";
import { useState } from "react";

interface SpacesHeroProps {
  filters: SpaceFilter;
  onFilterChange: (filters: Partial<SpaceFilter>) => void;
}

const SpacesHero = ({ filters, onFilterChange }: SpacesHeroProps) => {
  const { t } = useLanguage();
  const [heroSearchText, setHeroSearchText] = useState('');

  const handleHeroSearch = () => {
    onFilterChange({ searchText: heroSearchText });
    // Scroll to results section
    const resultsSection = document.querySelector('[data-results-section]');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleHeroSearch();
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 py-16 relative overflow-hidden" role="banner" aria-labelledby="spaces-hero-heading">
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920" 
          alt="Students collaborating in modern learning spaces with technology and equipment" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center mb-4" aria-hidden="true">
          <MapPin className="h-12 w-12 text-primary" />
        </div>
        <h1 id="spaces-hero-heading" className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t('nav.discoverSpaces')}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Explore community-shared locations for hands-on tech training across Egypt
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="text"
              placeholder={t('common.searchPlaceholder')}
              value={heroSearchText}
              onChange={(e) => setHeroSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              aria-label="Search for learning spaces by name, location, or description"
            />
          </div>
          <button 
            onClick={handleHeroSearch}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors"
            aria-label="Search for spaces with current criteria"
          >
            {t('common.searchSpaces')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpacesHero;
