
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BundleStepProgress from "@/components/bundle/BundleStepProgress";
import TrainerSelection from "@/components/bundle/TrainerSelection";
import SpaceSelection from "@/components/bundle/SpaceSelection";
import ToolsSelection from "@/components/bundle/ToolsSelection";
import CourseSelection from "@/components/bundle/CourseSelection";
import AudiencePreferences from "@/components/bundle/AudiencePreferences";
import BundlePreview from "@/components/bundle/BundlePreview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

type BundleStep = 
  | "trainer" 
  | "space" 
  | "tools" 
  | "course" 
  | "audience" 
  | "preview";

const BuildBundle = () => {
  const [currentStep, setCurrentStep] = useState<BundleStep>("trainer");
  const [bundle, setBundle] = useState({
    trainer: null,
    space: null,
    tools: [],
    course: null,
    audience: {
      type: "public",
      parentJoin: false,
      gender: "mixed",
      language: "arabic",
      ageRange: "9-12",
      groupSize: 10,
      duration: 2,
      sessions: 2,
    },
  });

  const steps: BundleStep[] = [
    "trainer",
    "space",
    "tools",
    "course",
    "audience",
    "preview",
  ];

  const goToNextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      window.scrollTo(0, 0);
    }
  };

  const updateBundle = (key: string, value: any) => {
    setBundle((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBookBundle = () => {
    toast.success("Your bundle has been booked successfully!");
    // In a real application, this would send the bundle data to a backend
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "trainer":
        return <TrainerSelection bundle={bundle} updateBundle={updateBundle} />;
      case "space":
        return <SpaceSelection bundle={bundle} updateBundle={updateBundle} />;
      case "tools":
        return <ToolsSelection bundle={bundle} updateBundle={updateBundle} />;
      case "course":
        return <CourseSelection bundle={bundle} updateBundle={updateBundle} />;
      case "audience":
        return <AudiencePreferences bundle={bundle} updateBundle={updateBundle} />;
      case "preview":
        return <BundlePreview bundle={bundle} onBook={handleBookBundle} />;
      default:
        return null;
    }
  };

  const isLastStep = currentStep === "preview";
  const isFirstStep = currentStep === "trainer";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Build Your Learning Bundle
        </h1>
        <p className="text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          Mix and match the perfect combination of trainer, tools, space, and content — all tailored to your goals.
        </p>

        <BundleStepProgress currentStep={currentStep} steps={steps} />

        <div className="mt-12">
          {renderStepContent()}
        </div>

        <div className="flex justify-between mt-12">
          {!isFirstStep && (
            <Button 
              onClick={goToPreviousStep} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Previous Step
            </Button>
          )}
          
          {isFirstStep && <div></div>}
          
          {!isLastStep ? (
            <Button 
              onClick={goToNextStep}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600"
            >
              Next Step
              <ArrowRight size={16} />
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BuildBundle;
