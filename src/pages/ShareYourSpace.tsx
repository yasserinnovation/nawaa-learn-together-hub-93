
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ShareSpaceHero from "@/components/spaces/share/ShareSpaceHero";
import ShareSpaceSteps from "@/components/spaces/share/ShareSpaceSteps";
import SpaceForm from "@/components/spaces/share/SpaceForm";
import SpacePreview from "@/components/spaces/share/SpacePreview";
import SubmissionSuccess from "@/components/spaces/share/SubmissionSuccess";
import { toast } from "@/hooks/use-toast";

type FormStep = "form" | "preview" | "success";

const ShareYourSpace = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>("form");
  const [formData, setFormData] = useState({
    name: "",
    type: "classroom",
    address: "",
    city: "",
    coordinates: { lat: 24.7136, lng: 46.6753 }, // Default to Riyadh
    capacity: 10,
    days: [] as string[],
    hours: "",
    rentalType: "fixed",
    pricePerHour: 50,
    images: [] as string[],
    equipment: [] as string[],
    safetyNotes: "",
    hostName: "",
    hostBio: "",
    bankDetails: "",
  });

  const handleSubmitForm = (data: typeof formData) => {
    setFormData(data);
    setCurrentStep("preview");
    window.scrollTo(0, 0);
  };

  const handleEditForm = () => {
    setCurrentStep("form");
    window.scrollTo(0, 0);
  };

  const handleFinalSubmit = () => {
    // Here you would normally submit the data to an API
    console.log("Submitting space data:", formData);
    toast({
      title: "Space submitted successfully",
      description: "We'll review your listing and get back to you within 48 hours.",
    });
    setCurrentStep("success");
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <ShareSpaceHero />
      <div className="container mx-auto px-4 py-8">
        <ShareSpaceSteps currentStep={currentStep} />
        
        <div className="mt-8">
          {currentStep === "form" && (
            <SpaceForm initialData={formData} onSubmit={handleSubmitForm} />
          )}
          
          {currentStep === "preview" && (
            <SpacePreview 
              spaceData={formData} 
              onEdit={handleEditForm} 
              onSubmit={handleFinalSubmit} 
            />
          )}
          
          {currentStep === "success" && (
            <SubmissionSuccess />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ShareYourSpace;
