
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Wrench, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: "Expert Trainers",
      description: "Connect with experienced mentors and industry professionals who guide you through every step of your innovation journey.",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Real Makerspaces",
      description: "Access fully equipped workshops and collaborative spaces with 3D printers, electronics, and prototyping tools.",
      icon: MapPin,
      color: "text-green-500"
    },
    {
      title: "Professional Tools",
      description: "Rent or access cutting-edge equipment, software, and materials needed to build professional-grade prototypes.",
      icon: Wrench,
      color: "text-purple-500"
    },
    {
      title: "Guided Learning",
      description: "Follow structured courses and tutorials tailored to your project needs and skill level for effective learning.",
      icon: BookOpen,
      color: "text-yellow-500"
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Build Your MVP
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive ecosystem provides all the resources, guidance, and support 
              needed to transform your innovative ideas into real working prototypes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-gray-50 to-white rounded-full flex items-center justify-center shadow-md">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
