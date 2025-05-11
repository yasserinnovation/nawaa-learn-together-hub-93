
import { Hammer, Search, Filter, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToolButton from "./AddToolButton";

const ToolsHero = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Access Learning Tools
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Find, rent, or buy the tech learning tools you need from our community marketplace.
            Share your own tools to help others learn.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-3">
                <Hammer className="h-10 w-10 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Tools</h3>
              <p className="text-gray-600">
                Access a variety of educational tech tools without the high cost of purchasing new.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-3">
                <Search className="h-10 w-10 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Find What You Need</h3>
              <p className="text-gray-600">
                Filter by age group, tool type, price range, and location to find exactly what you need.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-3">
                <Tag className="h-10 w-10 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Affordable Options</h3>
              <p className="text-gray-600">
                Rent tools for a fraction of the purchase price or find gently used items at great rates.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-yellow-500 hover:bg-yellow-600">
              Explore All Tools
            </Button>
            <AddToolButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsHero;
