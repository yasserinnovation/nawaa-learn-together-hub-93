
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { School, Users, Building2, ArrowRight } from "lucide-react";

const ContributorCTA = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("individual");
  
  const contributorTypes = [
    {
      id: "individual",
      name: "Individuals",
      icon: <Users className="h-5 w-5" />,
      description: "Teachers, hobbyists, and parents can list their unused tools",
    },
    {
      id: "school",
      name: "Schools",
      icon: <School className="h-5 w-5" />,
      description: "Educational institutions with surplus tech learning kits",
    },
    {
      id: "company",
      name: "Companies",
      icon: <Building2 className="h-5 w-5" />,
      description: "Training centers, suppliers and makerspace operators",
    },
  ];

  return (
    <Card className="mb-8 overflow-hidden border-yellow-200 shadow-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Join Our Tool Marketplace</h3>
        <p className="text-gray-600 mb-4">
          Share your tech learning tools with the community - whether for rent, sale, or free sharing
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {contributorTypes.map((type) => (
            <Button
              key={type.id}
              variant={activeTab === type.id ? "default" : "outline"}
              className={activeTab === type.id ? "bg-yellow-500 hover:bg-yellow-600" : ""}
              onClick={() => setActiveTab(type.id)}
            >
              {type.icon}
              <span className="ml-2">{type.name}</span>
            </Button>
          ))}
        </div>

        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            {contributorTypes.find(t => t.id === activeTab)?.icon}
            <div>
              <h4 className="font-medium">
                {contributorTypes.find(t => t.id === activeTab)?.name}
              </h4>
              <p className="text-gray-600 text-sm mt-1">
                {contributorTypes.find(t => t.id === activeTab)?.description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-4">
        <Button 
          className="bg-yellow-500 hover:bg-yellow-600 w-full sm:w-auto flex items-center justify-center gap-2"
          onClick={() => navigate('/add-tool')}
        >
          Add Your Tool
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContributorCTA;
