
import Layout from "@/components/layout/Layout";
import ToolsHero from "@/components/tools/ToolsHero";
import ToolsList from "@/components/tools/ToolsList";
import ToolsFilters from "@/components/tools/ToolsFilters";
import { useState } from "react";
import { ToolFilter } from "@/types/tool";

const AccessTools = () => {
  const [filters, setFilters] = useState<ToolFilter>({
    courseType: [],
    ageGroup: '',
    toolType: [],
    priceRange: [0, 1000],
    availability: 'all',
    condition: []
  });

  const handleFilterChange = (newFilters: Partial<ToolFilter>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <Layout>
      <ToolsHero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <ToolsFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className="lg:w-2/3">
            <ToolsList filters={filters} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccessTools;
