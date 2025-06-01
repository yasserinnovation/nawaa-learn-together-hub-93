
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb, Users, Wrench, Rocket, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const IdeaToMVPSection = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Lightbulb,
      title: "Submit Your Idea",
      description: "Share your innovative idea or choose from our curated templates across themes like Green Tech, Smart Toys, and Assistive Devices.",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      title: "Get Matched with Experts",
      description: "Our smart matching engine connects you with the right trainers, tools, and spaces based on your location and project needs.",
      color: "text-blue-500"
    },
    {
      icon: Wrench,
      title: "Build & Learn",
      description: "Follow a guided project timeline, learn required skills, and access real tools and workspace to bring your idea to life.",
      color: "text-green-500"
    },
    {
      icon: Rocket,
      title: "Launch Your MVP",
      description: "Upload your prototype, create a pitch deck, and showcase your innovation in our public Innovation Gallery.",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From Idea to MVP in One Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your innovative ideas into real prototypes with our comprehensive ecosystem. 
              Get matched with expert trainers, access tools and spaces, and launch your MVP with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                    <step.icon className={`h-10 w-10 ${step.color}`} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full">
                      <ArrowRight className="h-6 w-6 text-gray-300 mx-auto" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Turn Your Idea into Reality?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our platform and get access to expert guidance, cutting-edge tools, 
              and collaborative spaces designed to help you build and launch your MVP successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600" asChild>
                <Link to="/build-bundle" className="flex items-center gap-2">
                  Start Your MVP Journey
                  <Rocket className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/discover-spaces">
                  Explore Our Ecosystem
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeaToMVPSection;
