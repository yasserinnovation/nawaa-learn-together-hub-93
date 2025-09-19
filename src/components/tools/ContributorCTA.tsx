
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
    <Card className="mb-8 overflow-hidden border-primary-200 shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4 text-card-foreground">Join Our Tool Marketplace</h2>
        <p className="text-muted-foreground mb-4">
          Share your tech learning tools with the community - whether for rent, sale, or free sharing
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {contributorTypes.map((type) => (
            <Button
              key={type.id}
              variant={activeTab === type.id ? "default" : "outline"}
              className={activeTab === type.id ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "border-primary/20 hover:border-primary/40"}
              onClick={() => setActiveTab(type.id)}
              aria-pressed={activeTab === type.id}
              aria-label={`Select ${type.name} contributor type`}
            >
              {type.icon}
              <span className="ml-2">{type.name}</span>
            </Button>
          ))}
        </div>

        <div className="mt-4 bg-muted p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <span aria-hidden="true">{contributorTypes.find(t => t.id === activeTab)?.icon}</span>
            <div>
              <h3 className="font-medium text-card-foreground">
                {contributorTypes.find(t => t.id === activeTab)?.name}
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                {contributorTypes.find(t => t.id === activeTab)?.description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted px-6 py-4">
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto flex items-center justify-center gap-2 font-semibold"
          onClick={() => navigate('/add-tool')}
          aria-label="Add your tool to marketplace"
        >
          Add Your Tool
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContributorCTA;
