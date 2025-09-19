
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AddToolButton = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={() => navigate('/add-tool')} 
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 relative font-semibold transition-all duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Add your tool to the marketplace"
          >
            <Plus size={18} />
            <span>Add Your Tool</span>
            {isHovered && (
              <ArrowRight className="absolute right-2 opacity-70" size={14} aria-hidden="true" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share your tech learning tools with the community</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddToolButton;
