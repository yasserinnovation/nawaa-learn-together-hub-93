import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const LoadingSpinner = ({ size = "md", className, text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Loader2 className={cn("animate-spin text-primary-500", sizeClasses[size])} />
      {text && (
        <span className={cn(
          "text-gray-600 animate-pulse",
          size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"
        )}>
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;