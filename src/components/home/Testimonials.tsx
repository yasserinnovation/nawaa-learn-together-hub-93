
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/common/ScrollReveal";

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t('testimonials.quote1'),
      author: t('testimonials.author1'),
      role: t('testimonials.role1'),
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: t('testimonials.quote2'),
      author: t('testimonials.author2'),
      role: t('testimonials.role2'),
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: t('testimonials.quote3'),
      author: t('testimonials.author3'),
      role: t('testimonials.role3'),
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
  ];

  return (
    <section className="py-16 bg-primary-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              {t('testimonials.title')}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-white/80">
              {t('testimonials.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <Card className="bg-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="h-8 w-8 text-primary-400" />
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="h-12 w-12 rounded-full object-cover border-2 border-primary-200"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
