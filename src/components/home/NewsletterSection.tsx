import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import ScrollReveal from "@/components/common/ScrollReveal";

const NewsletterSection = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Specific validation messages
    if (!email) {
      toast.error('Email address is required');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address (example: you@example.com)');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      toast.success('Welcome aboard! Check your email to confirm your subscription.');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-r from-primary-400 to-primary-500">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <Card className="max-w-2xl mx-auto p-8 text-center border-0 shadow-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {t('newsletter.thankYou') || 'Thank You!'}
              </h3>
              <p className="text-gray-600">
                {t('newsletter.confirmationMessage') || 'You\'ve been successfully subscribed to our newsletter. Check your email for confirmation.'}
              </p>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary-400 to-primary-500 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-bounce-gentle" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse-scale" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-white" />
              <span className="text-white font-medium">
                {t('newsletter.badge') || 'Stay Updated'}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join 10,000+ Innovators - Get Weekly STEM Updates
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              New courses, maker space openings, and exclusive opportunities delivered to your inbox every week.
            </p>

            <Card className="p-6 border-0 shadow-xl bg-white/95 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="email"
                    placeholder={t('newsletter.emailPlaceholder') || 'Enter your email address'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 py-3 border-gray-300 focus:border-primary-400"
                    disabled={isLoading}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="cta"
                  size="lg"
                  disabled={isLoading}
                  aria-label="Subscribe to newsletter"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" aria-hidden="true" />
                      Subscribing...
                    </div>
                  ) : (
                    <>Subscribe Now</>
                  )}
                </Button>
              </form>
              
              <p className="text-sm text-muted-foreground mt-4 text-center">
                100% free. Unsubscribe anytime. No spam, ever.
              </p>
            </Card>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/90 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Weekly project ideas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>New space openings</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Early course access</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsletterSection;