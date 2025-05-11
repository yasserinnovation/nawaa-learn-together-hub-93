
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Tag } from "lucide-react";
import { Tool } from "@/types/tool";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  // Get the availability badge color
  const getBadgeColor = (availability: string) => {
    switch (availability) {
      case 'sale':
        return 'bg-blue-100 text-blue-800';
      case 'rent':
        return 'bg-green-100 text-green-800';
      case 'free':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get condition text and color
  const getConditionDetails = (condition: string) => {
    switch (condition) {
      case 'new':
        return { text: 'New', color: 'text-green-600' };
      case 'good':
        return { text: 'Good Condition', color: 'text-blue-600' };
      case 'used':
        return { text: 'Used', color: 'text-yellow-600' };
      case 'needs-care':
        return { text: 'Needs Care', color: 'text-red-600' };
      default:
        return { text: condition, color: 'text-gray-600' };
    }
  };

  return (
    <Card key={tool.id} className="overflow-hidden">
      <div className="h-48 bg-gray-100">
        <img
          src={tool.image}
          alt={tool.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{tool.name}</CardTitle>
          <Badge className={getBadgeColor(tool.availability)}>
            {tool.availability === 'sale' ? 'For Sale' : 
             tool.availability === 'rent' ? 'For Rent' : 'Free'}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{tool.location}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm line-clamp-2">{tool.description}</p>
        
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${getConditionDetails(tool.condition).color}`}>
            {getConditionDetails(tool.condition).text}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <div key={tag} className="flex items-center text-xs bg-gray-100 rounded-full px-2 py-1">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </div>
          ))}
        </div>
        
        {tool.compatibleCourses && tool.compatibleCourses.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1">Compatible with courses:</p>
            <div className="flex flex-wrap gap-1">
              {tool.compatibleCourses.map((course) => (
                <Badge key={course} variant="outline" className="text-xs bg-yellow-50">
                  {course}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div>
          {tool.availability === 'rent' ? (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Rental Rate</span>
              <span className="font-bold">{tool.rentalRate}</span>
            </div>
          ) : tool.availability === 'sale' ? (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Price</span>
              <span className="font-bold">SAR {tool.price}</span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Community Share</span>
              <span className="font-bold text-purple-600">Free</span>
            </div>
          )}
        </div>
        <Button className="bg-yellow-500 hover:bg-yellow-600">
          {tool.availability === 'rent' ? 'Rent Now' : 
           tool.availability === 'sale' ? 'Purchase' : 'Borrow'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
