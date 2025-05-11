
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AddToolButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      onClick={() => navigate('/add-tool')} 
      className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2"
    >
      <Plus size={18} />
      <span>Add Your Tool</span>
    </Button>
  );
};

export default AddToolButton;
