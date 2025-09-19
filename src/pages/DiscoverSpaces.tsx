
import Layout from "@/components/layout/Layout";
import SpacesHero from "@/components/spaces/SpacesHero";
import SpaceMap from "@/components/spaces/SpaceMap";
import SpacesList from "@/components/spaces/SpacesList";
import SpacesFilters from "@/components/spaces/SpacesFilters";
import { useState } from "react";
import { SpaceFilter } from "@/types/space";

const DiscoverSpaces = () => {
  const [filters, setFilters] = useState<SpaceFilter>({
    searchText: '',
    distance: 10,
    capacity: 0,
    equipment: [],
    availability: null,
  });

  const handleFilterChange = (newFilters: Partial<SpaceFilter>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <Layout>
      <SpacesHero filters={filters} onFilterChange={handleFilterChange} />
      <div className="container mx-auto px-4 py-8" data-results-section>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <SpacesFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className="lg:w-2/3">
            <div className="mb-6">
              <SpaceMap filters={filters} />
            </div>
            <SpacesList filters={filters} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DiscoverSpaces;
