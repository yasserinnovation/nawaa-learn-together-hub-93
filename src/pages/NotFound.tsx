
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, MapPin, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background py-12 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            {/* Animated 404 */}
            <div className="mb-6">
              <h1 className="text-8xl font-bold text-primary mb-2 animate-bounce-gentle">
                404
              </h1>
              <div className="h-2 w-24 bg-primary rounded-full mx-auto"></div>
            </div>
            
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you may have entered the wrong URL.
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <Home className="h-5 w-5" aria-hidden="true" />
                  Return to Home
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild onClick={() => window.history.back()}>
                <button className="flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  Go Back
                </button>
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Here are some helpful links instead:
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link to="/courses" className="flex items-center gap-2 text-primary hover:underline">
                  <BookOpen className="h-4 w-4" />
                  Browse Courses
                </Link>
                <Link to="/discover-spaces" className="flex items-center gap-2 text-primary hover:underline">
                  <MapPin className="h-4 w-4" />
                  Find Spaces
                </Link>
                <Link to="/contact" className="flex items-center gap-2 text-primary hover:underline">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
