import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Hammer, Search, Tag, ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const ToolsHero = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16" role="banner" aria-labelledby="tools-hero-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 id="tools-hero-heading" className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {t('tools.title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {t('tools.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Hammer className="h-8 w-8 text-primary mx-auto" aria-hidden="true" />
              </div>
              <h2 className="font-semibold mb-2 text-card-foreground text-lg">
                {t('tools.qualityTools')}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('tools.qualityToolsDesc')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Search className="h-8 w-8 text-primary mx-auto" aria-hidden="true" />
              </div>
              <h2 className="font-semibold mb-2 text-card-foreground text-lg">
                {t('tools.findWhatYouNeed')}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('tools.findWhatYouNeedDesc')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Tag className="h-8 w-8 text-primary mx-auto" aria-hidden="true" />
              </div>
              <h2 className="font-semibold mb-2 text-card-foreground text-lg">
                {t('tools.affordableOptions')}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('tools.affordableOptionsDesc')}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="cta"
            size="xl"
            asChild
            aria-label="Browse all available educational tools and equipment"
          >
              <Link to="#tools-list" className="flex items-center gap-3">
                <Search className="h-5 w-5" aria-hidden="true" />
                Browse All Tools
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
          </Button>
          
          <Button 
            variant="ctaSecondary"
            size="xl"
            asChild
            aria-label="Share your educational tools with the community"
          >
              <Link to="/add-tool" className="flex items-center gap-3">
                <Plus className="h-5 w-5" aria-hidden="true" />
                List Your Tool
              </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsHero;