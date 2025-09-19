
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Hammer, Search, Tag } from "lucide-react";
import AddToolButton from "./AddToolButton";

const ToolsHero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16" role="banner">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Access Learning Tools</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find, rent, or purchase quality educational tools and equipment. 
            Connect with our community to access everything you need for hands-on learning.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Hammer className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
              <h2 className="font-semibold mb-2 text-card-foreground">Quality Tools</h2>
              <p className="text-muted-foreground text-sm">
                Verified educational equipment from trusted sources
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Search className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
              <h2 className="font-semibold mb-2 text-card-foreground">Find What You Need</h2>
              <p className="text-muted-foreground text-sm">
                Advanced search and filtering to match your course requirements
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Tag className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
              <h2 className="font-semibold mb-2 text-card-foreground">Affordable Options</h2>
              <p className="text-muted-foreground text-sm">
                Rent, buy, or access free tools within your budget
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
            aria-label="Browse all available tools"
          >
            Explore All Tools
          </Button>
          <AddToolButton />
        </div>
      </div>
    </section>
  );
};

export default ToolsHero;
