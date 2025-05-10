
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-nawaa-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to start your learning journey?
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-300">
              Join our community of trainers, parents, and shared spaces to create the perfect learning environment for children.
            </p>
          </div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
            <Button className="px-5 py-3" size="lg">
              Get Started
            </Button>
            <Button variant="outline" className="px-5 py-3 bg-transparent border-white text-white hover:bg-white hover:text-nawaa-black" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
