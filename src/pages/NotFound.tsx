
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          
          <div className="text-sm text-gray-500">
            <p>If you believe this is an error, please <Link to="/contact" className="text-yellow-600 hover:underline">contact us</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
