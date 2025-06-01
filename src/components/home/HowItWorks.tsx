
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb, Users, Wrench, Rocket } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Submit Your Idea",
      description: "Share your innovative concept or choose from our curated templates across Green Tech, Smart Toys, and Assistive Devices.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
      icon: Lightbulb,
      color: "text-yellow-500"
    },
    {
      number: "02",
      title: "Get Matched & Build",
      description: "Our smart engine connects you with expert trainers, nearby spaces, and required tools. Follow guided timelines to learn and build.",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&auto=format&fit=crop",
      icon: Users,
      color: "text-blue-500"
    },
    {
      number: "03",
      title: "Launch Your MVP",
      description: "Complete your prototype, create a pitch deck, and showcase in our Innovation Gallery for feedback and opportunities.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
      icon: Rocket,
      color: "text-purple-500"
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Nawaa Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From idea to MVP in three simple steps. Our platform guides you through 
              the entire innovation journey.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-1 bg-yellow-400" aria-hidden="true"></div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-yellow-400 bg-white text-yellow-600 text-xl font-bold z-10 mb-2">
                      {step.number}
                    </div>
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md">
                      <step.icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                    <p className="text-gray-600 text-center mb-6 leading-relaxed">{step.description}</p>
                    <div className="h-48 w-full bg-gray-100 rounded-lg overflow-hidden">
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

          <div className="mt-16 text-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600" asChild>
              <Link to="/build-bundle">Start Your MVP Journey</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
