
import Layout from "@/components/layout/Layout";
import SpacesHero from "@/components/spaces/SpacesHero";
import SpaceMap from "@/components/spaces/SpaceMap";
import SpacesList from "@/components/spaces/SpacesList";
import SpacesFilters from "@/components/spaces/SpacesFilters";
import { useState } from "react";
import { SpaceFilter } from "@/types/space";

const spacesStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Learning Spaces in Egypt",
  "description": "Discover makerspaces, libraries, and collaborative learning environments across Egypt",
  "url": "https://nawaa-mix-match-your-learning-bundle.lovable.app/discover-spaces",
  "numberOfItems": "150+",
  "itemListElement": [
    {
      "@type": "Place",
      "name": "Learning Spaces Directory",
      "description": "Community-shared locations for hands-on tech training",
      "addressCountry": "EG"
    }
  ]
};

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
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(spacesStructuredData),
        }}
      />
      
      <SpacesHero filters={filters} onFilterChange={handleFilterChange} />
      <main className="container mx-auto px-4 py-8" data-results-section>
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-1/3" role="complementary" aria-label="Search filters">
            <SpacesFilters filters={filters} onFilterChange={handleFilterChange} />
          </aside>
          <section className="lg:w-2/3" aria-labelledby="spaces-results-heading">
            <div className="mb-6">
              <SpaceMap filters={filters} />
            </div>
            <SpacesList filters={filters} />
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default DiscoverSpaces;
