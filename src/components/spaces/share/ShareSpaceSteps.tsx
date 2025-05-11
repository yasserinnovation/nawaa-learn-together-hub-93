
import { Check } from "lucide-react";

type StepProps = {
  currentStep: "form" | "preview" | "success";
};

const ShareSpaceSteps = ({ currentStep }: StepProps) => {
  const steps = [
    { id: "form", label: "Create Your Space Listing" },
    { id: "preview", label: "Preview & Submit" },
    { id: "success", label: "Confirmation" },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentStepIndex;
          
          return (
            <div key={step.id} className="flex flex-col items-center w-1/3">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full 
                ${isActive ? 'bg-yellow-500 text-white' : ''} 
                ${isCompleted ? 'bg-green-500 text-white' : ''} 
                ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-500' : ''}
                mb-2
              `}>
                {isCompleted ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="text-center">
                <p className={`text-sm font-medium ${isActive ? 'text-yellow-600' : ''}`}>
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Progress bar */}
      <div className="relative mt-2">
        <div className="h-1 w-full bg-gray-200 rounded">
          <div 
            className="h-1 bg-yellow-500 rounded"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        
        {/* Connector lines */}
        <div className="absolute top-0 left-0 w-full flex justify-between transform -translate-y-5">
          {steps.map((_, index) => (
            <div key={index} className="w-0 h-0"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareSpaceSteps;
