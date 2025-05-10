
import { Card } from "@/components/ui/card";
import { SpaceFilter } from "@/types/space";
import { Compass } from "lucide-react";

interface SpaceMapProps {
  filters: SpaceFilter;
}

const SpaceMap = ({ filters }: SpaceMapProps) => {
  return (
    <Card className="relative mb-6 overflow-hidden">
      <div className="aspect-video bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
        <Compass className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Interactive Map Coming Soon</h3>
        <p className="text-gray-500 max-w-md">
          This area will display an interactive map with pins for each available space.
          Users will be able to zoom, pan, and click on spaces to see details.
        </p>
      </div>
    </Card>
  );
};

export default SpaceMap;
