
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const SubmissionSuccess = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Your Space Has Been Submitted!</h2>
      
      <p className="text-gray-600 mb-6">
        Thank you for sharing your space with our community. Our team will review your listing 
        and get back to you within 48 hours.
      </p>
      
      <div className="bg-yellow-50 p-5 rounded-lg mb-8">
        <h3 className="font-semibold mb-2">What happens next?</h3>
        <ol className="text-left list-decimal pl-5 space-y-1">
          <li>Our team reviews your space details and photos</li>
          <li>You'll receive an email when your listing is approved</li>
          <li>Your space will become visible to all platform users</li>
          <li>You can start receiving booking requests</li>
        </ol>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link to="/discover-spaces" className="flex items-center gap-2">
            Explore Other Spaces
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        
        <Button variant="outline" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
