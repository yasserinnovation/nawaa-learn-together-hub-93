
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CoursesHero = () => {
  return (
    <section className="bg-gradient-to-r from-primary-50 to-primary-100 py-16" role="banner" aria-labelledby="courses-hero-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 id="courses-hero-heading" className="text-4xl font-bold mb-4 text-foreground">Custom Course Catalogs</h1>
          <p className="text-xl mb-6 text-muted-foreground">
            Mix and match between STEM curricula, life skills, and emerging technologies to create the perfect learning experience.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/discover-spaces" aria-label="Find a learning space near you">Find a Space</Link>
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link to="/contact" aria-label="Contact us for more information">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesHero;
