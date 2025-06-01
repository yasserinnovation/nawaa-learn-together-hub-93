
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket, Brain, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Innovation Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of young innovators building the future. Get matched with expert trainers, 
            access cutting-edge tools, and turn your ideas into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link to="/build-bundle" className="flex items-center gap-2">
                Start Building Your MVP
                <Rocket className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link to="/smart-assessment" className="flex items-center gap-2">
                Take Smart Assessment
                <Brain className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            100% Free Assessment • Expert Guidance • Real Tools & Spaces
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
