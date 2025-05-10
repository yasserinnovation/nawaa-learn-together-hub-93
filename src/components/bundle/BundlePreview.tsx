
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  MapPin, 
  Tool, 
  Book, 
  Users, 
  Clock, 
  Calendar,
  Languages,
  CreditCard
} from "lucide-react";

interface BundlePreviewProps {
  bundle: any;
  onBook: () => void;
}

const BundlePreview = ({ bundle, onBook }: BundlePreviewProps) => {
  const hasAllComponents = bundle.trainer && bundle.space && bundle.course && bundle.tools?.length > 0;
  
  // Calculate total cost
  const calculateTotalCost = () => {
    let total = 0;
    
    // Course cost
    if (bundle.course) {
      total += bundle.course.price;
    }
    
    // Space cost (per hour * sessions * duration)
    if (bundle.space && bundle.audience) {
      total += bundle.space.pricePerHour * bundle.audience.sessions * bundle.audience.duration;
    }
    
    // Tools cost
    if (bundle.tools && bundle.tools.length > 0) {
      bundle.tools.forEach((tool: any) => {
        if (tool.priceType === "buy") {
          total += tool.price * (tool.selectedQuantity || 1);
        } else if (tool.priceType === "rent") {
          // Assuming rental is for the duration of the course
          total += tool.price * (tool.selectedQuantity || 1) * (bundle.audience?.sessions || 1);
        }
      });
    }
    
    return total;
  };

  const totalCost = calculateTotalCost();

  return (
    <div className="space-y-8">
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Your Learning Bundle Preview</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700">
            {hasAllComponents 
              ? "Great job! Your bundle is ready to book. Review all components below."
              : "Your bundle is incomplete. Please go back and complete all sections."}
          </p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={bundle.trainer ? "border-green-200" : "border-red-200 opacity-60"}>
          <CardHeader className="bg-gray-50 flex flex-row items-center gap-2">
            <User className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-lg">Trainer</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {bundle.trainer ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img 
                    src={bundle.trainer.imageUrl} 
                    alt={bundle.trainer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{bundle.trainer.name}</h3>
                    <p className="text-sm text-gray-600">{bundle.trainer.location}</p>
                  </div>
                </div>
                <p className="text-sm bg-green-50 text-green-800 p-2 rounded">
                  {bundle.trainer.experience} years experience • {bundle.trainer.rating} ★
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {bundle.trainer.expertise.map((skill: string) => (
                    <Badge key={skill} variant="outline" className="bg-gray-50">{skill}</Badge>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No trainer selected. Go back to select one.</p>
            )}
          </CardContent>
        </Card>
        
        <Card className={bundle.space ? "border-green-200" : "border-red-200 opacity-60"}>
          <CardHeader className="bg-gray-50 flex flex-row items-center gap-2">
            <MapPin className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-lg">Space</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {bundle.space ? (
              <div className="space-y-3">
                <img 
                  src={bundle.space.images[0]} 
                  alt={bundle.space.name}
                  className="w-full h-32 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">{bundle.space.name}</h3>
                  <p className="text-sm text-gray-600">{bundle.space.address}, {bundle.space.city}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Capacity: {bundle.space.capacity}</span>
                  <span className="font-semibold">{bundle.space.pricePerHour} SAR/hour</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No space selected. Go back to select one.</p>
            )}
          </CardContent>
        </Card>
        
        <Card className={bundle.tools && bundle.tools.length > 0 ? "border-green-200" : "border-red-200 opacity-60"}>
          <CardHeader className="bg-gray-50 flex flex-row items-center gap-2">
            <Tool className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-lg">Tools</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {bundle.tools && bundle.tools.length > 0 ? (
              <div className="space-y-3">
                <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                  {bundle.tools.map((tool: any) => (
                    <div key={tool.id} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        <img 
                          src={tool.imageUrl} 
                          alt={tool.name}
                          className="w-10 h-10 object-cover rounded mr-2"
                        />
                        <div>
                          <p className="text-sm font-medium">{tool.name}</p>
                          <p className="text-xs text-gray-500">
                            {tool.selectedQuantity}x {tool.priceType === "rent" ? `(${tool.price} SAR/day)` : `(${tool.price} SAR)`}
                          </p>
                        </div>
                      </div>
                      <Badge className={
                        tool.priceType === "free" ? "bg-green-500" : 
                        tool.priceType === "rent" ? "bg-blue-500" : "bg-yellow-500"
                      }>
                        {tool.priceType === "free" ? "Free" : 
                         tool.priceType === "rent" ? "Rent" : "Buy"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium">
                  Total items: {bundle.tools.reduce((sum: number, t: any) => sum + (t.selectedQuantity || 1), 0)}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 italic">No tools selected. Go back to select some.</p>
            )}
          </CardContent>
        </Card>
        
        <Card className={bundle.course ? "border-green-200" : "border-red-200 opacity-60"}>
          <CardHeader className="bg-gray-50 flex flex-row items-center gap-2">
            <Book className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-lg">Course</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {bundle.course ? (
              <div className="space-y-3">
                <img 
                  src={bundle.course.image} 
                  alt={bundle.course.title}
                  className="w-full h-32 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">{bundle.course.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {bundle.course.category.map((cat: string) => (
                      <Badge key={cat} className="bg-yellow-100 text-yellow-800 border-none">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                  <span>Age: {bundle.course.ageRange}</span>
                  <span>{bundle.course.sessions} sessions</span>
                  <span>{bundle.course.duration} hrs/session</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No course selected. Go back to select one.</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="bg-gray-50 flex flex-row items-center gap-2">
          <Users className="h-5 w-5 text-yellow-600" />
          <CardTitle className="text-lg">Audience Settings</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Group Type</p>
                  <p className="text-sm text-gray-600">
                    {bundle.audience?.type === "public" ? "Public Group" : "Private Group"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Session Details</p>
                  <p className="text-sm text-gray-600">
                    {bundle.audience?.duration} hours × {bundle.audience?.sessions} sessions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Age Range</p>
                  <p className="text-sm text-gray-600">
                    {bundle.audience?.ageRange} years
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Gender Preference</p>
                  <p className="text-sm text-gray-600">
                    {bundle.audience?.gender === "mixed" ? "Mixed (all genders)" : 
                     bundle.audience?.gender === "boys" ? "Boys only" : "Girls only"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Languages className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-sm text-gray-600">
                    {bundle.audience?.language === "arabic" ? "Arabic" : 
                     bundle.audience?.language === "english" ? "English" : "Bilingual"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Group Size</p>
                  <p className="text-sm text-gray-600">
                    {bundle.audience?.groupSize} participants
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold">Total Cost</h3>
              <p className="text-sm text-gray-600">Complete bundle with all components</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{totalCost} SAR</p>
              <p className="text-sm text-gray-600">Including all fees and taxes</p>
            </div>
          </div>
          
          <Button 
            onClick={onBook}
            disabled={!hasAllComponents}
            className="w-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center gap-2"
            size="lg"
          >
            <CreditCard className="h-5 w-5" />
            Book Your Bundle Now
          </Button>
          
          {!hasAllComponents && (
            <p className="text-center text-red-500 mt-2 text-sm">
              Please complete all sections before booking.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BundlePreview;
