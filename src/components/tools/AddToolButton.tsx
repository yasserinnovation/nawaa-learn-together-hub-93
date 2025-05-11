
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
            className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Plus size={18} />
            <span>Add Your Tool</span>
            {isHovered && (
              <ArrowRight className="absolute right-2 opacity-70" size={14} />
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
