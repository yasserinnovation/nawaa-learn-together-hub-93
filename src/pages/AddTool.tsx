
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AddToolForm from "@/components/tools/AddToolForm";
import AddToolSidebar from "@/components/tools/AddToolSidebar";
import { Tool } from "@/types/tool";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddTool = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<Tool>>({
    condition: "new",
    availability: "sale",
    tags: [],
    photos: [],
    compatibleCourses: []
  });
  
  const handleStepChange = (step: number) => {
    setFormStep(step);
    window.scrollTo(0, 0);
  };
  
  const handleFormChange = (data: Partial<Tool>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  
  const handleSubmit = () => {
    // Here you would integrate with your backend to save the tool
    // For now, we'll just show a success message
    toast.success("Your tool has been submitted for review!");
    navigate("/access-tools");
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-8">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-2"
            onClick={() => navigate('/access-tools')}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Tools</span>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Add Your Tool</h1>
          <p className="text-gray-700 text-center mb-4">
            Share your tech learning tools with the community for rent, sale, or free sharing
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <AddToolForm 
              currentStep={formStep}
              formData={formData}
              onChange={handleFormChange}
              onStepChange={handleStepChange}
              onSubmit={handleSubmit}
            />
          </div>
          
          <div className="lg:w-1/4 order-first lg:order-last">
            <AddToolSidebar 
              currentStep={formStep} 
              onStepChange={handleStepChange} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddTool;
