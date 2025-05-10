
import { useNavigate } from "react-router-dom";
import { Users, MapPin, Hammer, Book, SlidersHorizontal, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BundleStep {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
}

const steps: BundleStep[] = [
  {
    id: "trainer",
    name: "Choose Trainer",
    icon: <Users size={20} />,
    path: "/build-bundle?step=trainer"
  },
  {
    id: "space",
    name: "Pick a Space",
    icon: <MapPin size={20} />,
    path: "/build-bundle?step=space"
  },
  {
    id: "tools",
    name: "Select Tools",
    icon: <Hammer size={20} />,
    path: "/build-bundle?step=tools"
  },
  {
    id: "course",
    name: "Pick a Course",
    icon: <Book size={20} />,
    path: "/build-bundle?step=course"
  },
  {
    id: "audience",
    name: "Set Preferences",
    icon: <SlidersHorizontal size={20} />,
    path: "/build-bundle?step=audience"
  },
  {
    id: "preview",
    name: "Review Bundle",
    icon: <ClipboardCheck size={20} />,
    path: "/build-bundle?step=preview"
  }
];

interface BundleNavigationProps {
  currentStepId?: string;
  compact?: boolean;
}

const BundleNavigation = ({ currentStepId = "trainer", compact = false }: BundleNavigationProps) => {
  const navigate = useNavigate();
  
  const handleStepClick = (path: string) => {
    navigate(path);
  };

  if (compact) {
    return (
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-3">Build Your Bundle</h3>
        <div className="flex flex-col space-y-2">
          {steps.map((step) => (
            <Button
              key={step.id}
              variant={step.id === currentStepId ? "default" : "ghost"}
              className={`justify-start ${step.id === currentStepId ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
              onClick={() => handleStepClick(step.path)}
            >
              <span className="mr-2">{step.icon}</span>
              {step.name}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Build Your Learning Bundle
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Mix and match the perfect combination of trainer, tools, space, and content — all tailored to your goals.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((step, index) => {
          const isActive = step.id === currentStepId;
          
          return (
            <Button
              key={step.id}
              onClick={() => handleStepClick(step.path)}
              variant={isActive ? "default" : "outline"}
              className={`
                h-auto py-4 flex flex-col items-center justify-center gap-2 
                ${isActive ? "bg-yellow-500 hover:bg-yellow-600" : ""}
              `}
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                <span className={`${isActive ? "text-yellow-600" : "text-gray-600"}`}>{step.icon}</span>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">{index + 1}</div>
                <div className="text-xs">{step.name}</div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BundleNavigation;
