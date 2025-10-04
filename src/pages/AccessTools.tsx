
import Layout from "@/components/layout/Layout";
import ToolsHero from "@/components/tools/ToolsHero";
import ToolsList from "@/components/tools/ToolsList";
import ToolsFilters from "@/components/tools/ToolsFilters";
import ContributorCTA from "@/components/tools/ContributorCTA";
import SEOHead from "@/components/common/SEOHead";
import { useState } from "react";
import { ToolFilter } from "@/types/tool";
import { toolsBreadcrumb } from "@/lib/breadcrumb-schema";

const toolsMarketplaceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Educational Tools & Equipment Marketplace",
  "description": "Rent, buy, or share educational tools and equipment for STEM learning",
  "url": "https://nawaa-mix-match-your-learning-bundle.lovable.app/access-tools",
  "numberOfItems": "200+",
  "itemListElement": [
    {
      "@type": "Product",
      "name": "Educational Tools Directory",
      "description": "Arduino kits, robotics sets, lab equipment, and more for hands-on learning"
    }
  ]
};

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
      <SEOHead 
        title="Educational Tools & Equipment - Rent, Buy & Share"
        description="Access 200+ educational tools and equipment in Egypt. Find Arduino kits, robotics sets, 3D printers, and lab equipment. Rent, buy, or share with the community."
        keywords="educational tools, learning equipment, arduino, robotics, 3D printers, STEAM, Egypt, rent tools, buy equipment, lab supplies"
        url="https://nawaa-mix-match-your-learning-bundle.lovable.app/access-tools"
        schema={[toolsMarketplaceSchema, toolsBreadcrumb]}
      />
        <main>
          <ToolsHero />
          <section className="container mx-auto px-4 py-8" aria-label="Tools marketplace">
            <div className="flex flex-col lg:flex-row gap-6">
              <aside className="lg:w-1/3" role="complementary" aria-label="Search filters">
                <ToolsFilters filters={filters} onFilterChange={handleFilterChange} />
              </aside>
              <div className="lg:w-2/3">
                <ContributorCTA />
                <ToolsList filters={filters} />
              </div>
            </div>
          </section>
        </main>
      </Layout>
  );
};

export default AccessTools;
