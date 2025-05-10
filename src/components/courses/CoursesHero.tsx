
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CoursesHero = () => {
  return (
    <section className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Custom Course Catalogs</h1>
          <p className="text-xl mb-6">
            Mix and match between STEM curricula, life skills, and emerging technologies to create the perfect learning experience.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
              <Link to="/discover-spaces">Find a Space</Link>
            </Button>
            <Button variant="outline" className="border-yellow-500 text-yellow-700 hover:bg-yellow-50">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesHero;
