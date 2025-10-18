import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Brain } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gray-900" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-6">
            هل أنت مستعد لتطوير خدماتك التدريبية؟
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            انضم إلى 300+ مدرب ومركز تدريب يقدمون تعليماً تقنياً بمعايير عالمية. احصل على التوجيه المناسب في أقل من 5 دقائق.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="cta" asChild>
             <Link to="/smart-assessment" className="flex items-center gap-2" aria-label="Start your personalized assessment now">
               <Brain className="h-5 w-5" aria-hidden="true" />
               Start Your Assessment Now
               <ArrowRight className="h-5 w-5" aria-hidden="true" />
             </Link>
             </Button>
            <Button size="lg" variant="ctaOutline" asChild>
              <Link to="/contact" className="flex items-center gap-2" aria-label="Get expert help and support">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Get Expert Help
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;