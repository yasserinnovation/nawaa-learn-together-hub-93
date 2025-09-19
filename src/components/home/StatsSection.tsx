import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, BookOpen, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/common/ScrollReveal";

const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      number: "2,500+",
      label: t('stats.activeUsers') || "Active Users",
      description: t('stats.activeUsersDesc') || "Students and trainers actively using the platform"
    },
    {
      icon: MapPin,
      number: "150+", 
      label: t('stats.spaces') || "Learning Spaces",
      description: t('stats.spacesDesc') || "Makerspaces and workshops across Egypt"
    },
    {
      icon: BookOpen,
      number: "50+",
      label: t('stats.courses') || "STEM Courses",
      description: t('stats.coursesDesc') || "Hands-on courses for all skill levels"
    },
    {
      icon: Award,
      number: "98%",
      label: t('stats.satisfaction') || "Satisfaction Rate",
      description: t('stats.satisfactionDesc') || "Students rate their experience as excellent"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-background" aria-labelledby="stats-heading">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 id="stats-heading" className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t('stats.title') || 'Empowering Innovation Across Egypt'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('stats.subtitle') || 'Join thousands of innovators who are transforming their ideas into reality'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 100}>
               <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card hover:bg-primary-50 group">
                 <CardContent className="p-6 text-center">
                   <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300" role="img" aria-label={`${stat.label} icon`}>
                     <stat.icon className="h-8 w-8 text-primary-foreground" aria-hidden="true" />
                   </div>
                   <div className="mb-2">
                     <span className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                       {stat.number}
                     </span>
                   </div>
                   <h3 className="text-lg font-semibold text-card-foreground mb-2">
                     {stat.label}
                   </h3>
                   <p className="text-sm text-muted-foreground leading-relaxed">
                     {stat.description}
                   </p>
                 </CardContent>
               </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;