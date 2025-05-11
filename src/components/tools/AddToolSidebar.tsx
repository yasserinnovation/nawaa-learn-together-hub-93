
import { CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddToolSidebarProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const steps = [
  { id: 1, title: "Basic Info", description: "Name, type, description" },
  { id: 2, title: "Photos & Availability", description: "Condition, price, quantity" },
  { id: 3, title: "Location & Contact", description: "Where, delivery options" },
  { id: 4, title: "Preview & Submit", description: "Review and publish" }
];

const AddToolSidebar = ({ currentStep, onStepChange }: AddToolSidebarProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 sticky top-20">
      <h3 className="text-lg font-semibold mb-4">Add Tool Progress</h3>
      
      <div className="space-y-4">
        {steps.map((step) => {
          const isComplete = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <div key={step.id} className="flex items-start gap-3">
              <Button
                variant="ghost"
                className={`w-6 h-6 p-0 rounded-full ${isComplete || isCurrent ? "text-yellow-500" : "text-gray-400"}`}
                onClick={() => onStepChange(step.id)}
              >
                {isComplete ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" fill={isCurrent ? "currentColor" : "none"} />
                )}
              </Button>
              
              <div className="flex-1">
                <Button
                  variant="ghost"
                  className={`p-0 h-auto justify-start font-medium ${isComplete || isCurrent ? "text-yellow-700" : "text-gray-500"}`}
                  onClick={() => onStepChange(step.id)}
                >
                  {step.title}
                </Button>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Tips</h4>
        <ul className="text-xs text-gray-600 space-y-2">
          <li>• Clear photos increase your chances of renting/selling</li>
          <li>• Be detailed in your description</li>
          <li>• Suggest compatible courses to get more visibility</li>
          <li>• Set competitive pricing by checking similar items</li>
        </ul>
      </div>
    </div>
  );
};

export default AddToolSidebar;
