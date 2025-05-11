
import { Card, CardContent } from "@/components/ui/card";
import { PackageOpen } from "lucide-react";

const NoToolsFound = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <PackageOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No tools found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters to find more tools.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoToolsFound;
