
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Components",
      description: "Select trainers, spaces, tools, courses, and set your audience preferences.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    },
    {
      number: "02",
      title: "Preview Your Bundle",
      description: "Review your selections and get AI recommendations to optimize your learning package.",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&auto=format&fit=crop",
    },
    {
      number: "03",
      title: "Book & Learn",
      description: "Confirm your bundle, make payment, and start your hands-on learning journey.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How Nawaa Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Building your learning bundle is as simple as 1-2-3.
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-1 bg-nawaa-yellow" aria-hidden="true"></div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-nawaa-yellow bg-white text-nawaa-yellow text-xl font-bold z-10">
                      {step.number}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-base text-gray-500 text-center">{step.description}</p>
                    <div className="mt-8 h-48 w-full bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={step.image} 
                        alt={`Step ${step.number}: ${step.title}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <Button className="px-8 py-6 text-lg" asChild>
              <Link to="/build-bundle">Start Building Your Bundle</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
