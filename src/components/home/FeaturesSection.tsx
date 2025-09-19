
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Wrench, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/common/ScrollReveal";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: t('features.expertTrainers'),
      description: t('features.expertTrainersDesc'),
      color: "blue",
      link: "/find-trainers"
    },
    {
      icon: MapPin,
      title: t('features.realMakerspaces'),
      description: t('features.realMakerspacesDesc'),
      color: "green", 
      link: "/discover-spaces"
    },
    {
      icon: Wrench,
      title: t('features.professionalTools'),
      description: t('features.professionalToolsDesc'),
      color: "purple",
      link: "/access-tools"
    },
    {
      icon: BookOpen,
      title: t('features.guidedLearning'),
      description: t('features.guidedLearningDesc'),
      color: "yellow",
      link: "/courses"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600",
      green: "from-green-400 to-green-500 hover:from-green-500 hover:to-green-600", 
      purple: "from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600",
      yellow: "from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-16 bg-background" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 id="features-heading" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t('features.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('features.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                 <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-muted/20 group hover:-translate-y-2">
                   <CardHeader className="text-center pb-4">
                     <div className={`mx-auto mb-4 w-16 h-16 bg-gradient-to-br ${getColorClasses(feature.color)} rounded-full flex items-center justify-center shadow-glow transition-all duration-300 group-hover:shadow-glow-lg group-hover:scale-110`} role="img" aria-label={`${feature.title} icon`}>
                       <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                     </div>
                     <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                       {feature.title}
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="text-center">
                     <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                       {feature.description}
                     </CardDescription>
                     <Button variant="ghost" size="sm" className="group/btn hover:bg-primary/10 hover:text-primary" asChild>
                       <Link to={feature.link} className="flex items-center gap-2" aria-label={`Learn more about ${feature.title}`}>
                         Learn More
                         <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                       </Link>
                     </Button>
                   </CardContent>
                 </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
