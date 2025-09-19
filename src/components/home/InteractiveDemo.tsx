import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Wrench, BookOpen, ArrowRight, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/common/ScrollReveal";
import { Link } from "react-router-dom";

const InteractiveDemo = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const demoSections = [
    {
      id: 'spaces',
      title: t('demo.spaces') || 'Discover Spaces',
      icon: MapPin,
      description: t('demo.spacesDesc') || 'Find makerspaces and workshops near you',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop',
      features: ['150+ Locations', '3D Printers', 'Electronics Lab', 'Expert Support'],
      cta: '/discover-spaces'
    },
    {
      id: 'courses',
      title: t('demo.courses') || 'STEM Courses',
      icon: BookOpen,
      description: t('demo.coursesDesc') || 'Hands-on learning experiences for all ages',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop',
      features: ['Age-Appropriate', 'Project-Based', 'Expert-Led', 'Certificate'],
      cta: '/courses'
    },
    {
      id: 'tools',
      title: t('demo.tools') || 'Access Tools',
      icon: Wrench,
      description: t('demo.toolsDesc') || 'Rent professional equipment and tools',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop',
      features: ['Professional Grade', 'Affordable Rates', 'Delivered', 'Support Included'],
      cta: '/access-tools'
    },
    {
      id: 'trainers',
      title: t('demo.trainers') || 'Expert Trainers',
      icon: Users,
      description: t('demo.trainersDesc') || 'Connect with skilled mentors and coaches',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop',
      features: ['Verified Experts', 'Industry Experience', 'Personal Mentoring', '24/7 Support'],
      cta: '/find-trainers'
    }
  ];

  return (
    <section className="py-16 bg-muted/30" aria-labelledby="demo-heading">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 id="demo-heading" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t('demo.title') || 'Explore Our Platform'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('demo.subtitle') || 'See how our platform can help you turn your ideas into reality'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <ScrollReveal>
            <div className="space-y-4">
              {demoSections.map((section, index) => (
                <Card 
                  key={section.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeTab === index 
                      ? 'border-primary-400 shadow-lg bg-primary-50' 
                      : 'hover:border-primary-200 hover:shadow-md'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        activeTab === index 
                          ? 'bg-primary-400 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        <section.icon className="h-6 w-6" />
                      </div>
                       <div className="flex-1">
                         <h3 className="text-lg font-semibold mb-1 text-card-foreground">{section.title}</h3>
                         <p className="text-muted-foreground text-sm">{section.description}</p>
                       </div>
                      {activeTab === index && (
                        <Play className="h-5 w-5 text-primary-500" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>

          {/* Active Demo Content */}
          <ScrollReveal delay={200}>
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="relative">
                <img 
                  src={demoSections[activeTab].image}
                  alt={demoSections[activeTab].title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white text-black">
                    {demoSections[activeTab].title}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                 <h3 className="text-xl font-bold mb-3 text-card-foreground">
                   {demoSections[activeTab].title}
                 </h3>
                 <p className="text-muted-foreground mb-4">
                   {demoSections[activeTab].description}
                 </p>
                
                 <div className="grid grid-cols-2 gap-2 mb-6">
                   {demoSections[activeTab].features.map((feature, index) => (
                     <div key={index} className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
                       <span className="text-sm text-muted-foreground">{feature}</span>
                     </div>
                   ))}
                 </div>
                
                 <Button className="w-full group" asChild>
                   <Link to={demoSections[activeTab].cta} aria-label={`Explore ${demoSections[activeTab].title} section`}>
                     {t('demo.explore') || 'Explore Now'}
                     <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                   </Link>
                 </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;