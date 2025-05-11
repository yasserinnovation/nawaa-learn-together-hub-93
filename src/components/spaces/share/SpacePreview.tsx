import { Button } from "@/components/ui/button";
import { MapPin, Users, Calendar, Clock, CheckCircle } from "lucide-react";
import { SpaceFormData } from "@/pages/ShareYourSpace";

type SpacePreviewProps = {
  spaceData: SpaceFormData;
  onEdit: () => void;
  onSubmit: () => void;
};

const SpacePreview = ({ spaceData, onEdit, onSubmit }: SpacePreviewProps) => {
  const formatDays = (days: string[]) => {
    if (days.length === 7) return "Every day";
    if (days.length === 0) return "Not specified";
    
    return days.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(", ");
  };
  
  const formatType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  const formatRentalType = (type: string, price: number) => {
    switch (type) {
      case "free":
        return "Free (Community Contribution)";
      case "fixed":
        return `${price} SAR per hour`;
      case "donation":
        return "Donation Based (Pay What You Can)";
      default:
        return "Not specified";
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-6">Preview Your Space Listing</h2>
        <p className="mb-6 text-gray-600">This is how your space will appear to others on the platform. Please review all details before submitting.</p>
        
        <div className="space-y-8">
          {/* Images */}
          {spaceData.images.length > 0 ? (
            <div className="grid grid-cols-3 gap-3 h-72">
              <div className="col-span-2 row-span-2 rounded-lg overflow-hidden">
                <img 
                  src={spaceData.images[0]} 
                  alt={spaceData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={spaceData.images[1] || spaceData.images[0]} 
                  alt={spaceData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={spaceData.images[2] || spaceData.images[0]} 
                  alt={spaceData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="h-52 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No images uploaded</p>
            </div>
          )}
          
          {/* Basic Info */}
          <div>
            <h1 className="text-2xl font-bold">{spaceData.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{spaceData.address}, {spaceData.city}</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                {formatType(spaceData.type)}
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                <Users className="h-4 w-4 mr-1" />
                {spaceData.capacity} people
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {formatRentalType(spaceData.rentalType, spaceData.pricePerHour)}
              </div>
            </div>
          </div>
          
          {/* Availability */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Availability</h2>
            <div className="flex flex-wrap gap-y-3 gap-x-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span>{formatDays(spaceData.days)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span>{spaceData.hours}</span>
              </div>
            </div>
          </div>
          
          {/* Equipment */}
          {spaceData.equipment && spaceData.equipment.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Available Equipment</h2>
              <div className="flex flex-wrap gap-2">
                {spaceData.equipment.map((item, index) => (
                  <div key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Safety Notes */}
          {spaceData.safetyNotes && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Safety Notes</h2>
              <p className="text-gray-700">{spaceData.safetyNotes}</p>
            </div>
          )}
          
          {/* Host Info */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-3">About the Host</h2>
            <p className="font-medium">{spaceData.hostName}</p>
            {spaceData.hostBio && <p className="text-gray-700 mt-2">{spaceData.hostBio}</p>}
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">🔍 Next Steps</h3>
        <ul className="list-disc pl-5 mb-6 space-y-1">
          <li>Our team will review your listing within 24-48 hours.</li>
          <li>We may contact you for additional information if needed.</li>
          <li>Once approved, your space will be visible to all users.</li>
          <li>You'll have full control to update your listing or manage bookings.</li>
        </ul>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onEdit}>
            Edit Listing
          </Button>
          <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={onSubmit}>
            Submit for Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpacePreview;
