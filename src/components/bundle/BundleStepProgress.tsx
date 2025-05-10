
import { CheckIcon } from "lucide-react";

interface BundleStepProgressProps {
  currentStep: string;
  steps: string[];
}

const StepLabels = {
  "trainer": "Choose Trainer",
  "space": "Pick a Space",
  "tools": "Select Tools",
  "course": "Pick a Course",
  "audience": "Set Preferences",
  "preview": "Review Bundle"
};

const BundleStepProgress = ({ currentStep, steps }: BundleStepProgressProps) => {
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step;
          const isCompleted = index < currentStepIndex;
          
          return (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${isActive ? 'bg-yellow-500 text-white' : ''}
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-600' : ''}
                  transition-colors duration-300
                `}
              >
                {isCompleted ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span 
                className={`
                  text-xs mt-2 font-medium hidden md:block
                  ${isActive ? 'text-yellow-600' : ''}
                  ${isCompleted ? 'text-green-600' : ''}
                  ${!isActive && !isCompleted ? 'text-gray-500' : ''}
                `}
              >
                {StepLabels[step as keyof typeof StepLabels]}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="relative">
        <div className="absolute top-0 h-1 bg-gray-200 w-full rounded"></div>
        <div 
          className="absolute top-0 h-1 bg-yellow-500 rounded transition-all duration-300"
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BundleStepProgress;
