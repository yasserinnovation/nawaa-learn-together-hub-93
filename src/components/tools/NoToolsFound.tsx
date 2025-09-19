
import { Card, CardContent } from "@/components/ui/card";
import { PackageOpen } from "lucide-react";

const NoToolsFound = () => {
  return (
    <Card className="shadow-md">
      <CardContent className="pt-6">
        <div className="text-center py-12" role="status" aria-live="polite">
          <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-card-foreground">No tools found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filters to find more tools.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoToolsFound;
