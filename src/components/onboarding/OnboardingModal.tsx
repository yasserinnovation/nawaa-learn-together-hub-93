import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, MapPin, Wrench, Brain, ChevronRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ElementType;
  action: {
    label: string;
    path: string;
  };
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to Nawaa!",
    description: "Your gateway to hands-on STEM learning. Build real projects with tools, spaces, and expert guidance.",
    icon: Brain,
    action: {
      label: "Get Started",
      path: "/courses"
    }
  },
  {
    title: "Explore Free Courses",
    description: "Choose from 50+ hands-on STEM courses. From robotics to 3D printing, learn by building real prototypes in 4 weeks.",
    icon: BookOpen,
    action: {
      label: "Browse Courses",
      path: "/courses"
    }
  },
  {
    title: "Find Learning Spaces",
    description: "Discover 50+ maker spaces near you with all the tools you need. Work alongside other innovators.",
    icon: MapPin,
    action: {
      label: "Find Spaces",
      path: "/discover-spaces"
    }
  },
  {
    title: "Access Tools & Equipment",
    description: "Get hands-on with 3D printers, laser cutters, electronics, and more. Request access to tools you need.",
    icon: Wrench,
    action: {
      label: "View Tools",
      path: "/access-tools"
    }
  }
];

const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      // Show onboarding after a short delay
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-4">
            {currentStep === 0 ? "Welcome to Nawaa! 🚀" : "Quick Tour"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Indicator */}
          <div className="flex justify-center gap-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-12 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "bg-primary"
                    : index < currentStep
                    ? "bg-primary/50"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Step Content */}
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6 text-center space-y-6">
              <div className="flex justify-center">
                <div className="h-20 w-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Icon className="h-10 w-10 text-primary" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
                  {step.description}
                </p>
              </div>

              {currentStep > 0 && (
                <Button variant="cta" size="lg" className="w-full" asChild>
                  <Link to={step.action.path} onClick={handleComplete}>
                    {step.action.label}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip Tour
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {onboardingSteps.length}
              </span>
              <Button onClick={handleNext} variant="cta">
                {currentStep < onboardingSteps.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Start Learning
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Help Text */}
          {currentStep === 0 && (
            <p className="text-xs text-center text-muted-foreground">
              This quick tour will help you discover everything Nawaa has to offer
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
