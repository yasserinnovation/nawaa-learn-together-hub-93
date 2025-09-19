import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { SpaceFilter } from "@/types/space";
import { useLanguage } from "@/contexts/LanguageContext";

interface SpacesHeroProps {
  filters: SpaceFilter;
  onFilterChange: (filters: Partial<SpaceFilter>) => void;
}

const SpacesHero = ({ filters, onFilterChange }: SpacesHeroProps) => {
  const [heroSearchText, setHeroSearchText] = useState("");
  const { t } = useLanguage();

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
    <section 
      className="relative py-20 md:py-32 bg-gradient-to-br from-primary-50 via-background to-primary-100 overflow-hidden"
      role="banner" 
      aria-labelledby="spaces-hero-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Hero image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop')`
        }}
        aria-hidden="true"
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <MapPin className="h-4 w-4" />
            <span>150+ مساحة متاحة</span>
          </div>
          
          <h1 id="spaces-hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
            {t('spaces.title')}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            {t('spaces.subtitle')}
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-xl shadow-lg border border-primary-100">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="text"
                  placeholder={t('spaces.searchPlaceholder')}
                  value={heroSearchText}
                  onChange={(e) => setHeroSearchText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 border-0 bg-transparent focus:ring-0 focus:border-0 text-base h-12"
                  aria-label="Search for learning spaces by location"
                />
              </div>
              <Button 
                variant="cta"
                size="lg"
                onClick={handleHeroSearch}
                className="shrink-0"
                aria-label="Search for spaces with the entered criteria"
              >
                <Search className="h-5 w-5 mr-2" aria-hidden="true" />
                {t('spaces.searchSpaces')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpacesHero;