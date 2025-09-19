
import { Helmet } from 'react-helmet-async';
import Layout from "@/components/layout/Layout";
import ToolsHero from "@/components/tools/ToolsHero";
import ToolsList from "@/components/tools/ToolsList";
import ToolsFilters from "@/components/tools/ToolsFilters";
import ContributorCTA from "@/components/tools/ContributorCTA";
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
    <>
      <Helmet>
        <title>Access Learning Tools | Nawaa - Rent, Buy & Share Educational Equipment</title>
        <meta name="description" content="Access quality educational tools and equipment in Egypt. Find Arduino kits, robotics sets, lab equipment for STEAM learning. Rent, buy or share with our community." />
        <meta name="keywords" content="educational tools, learning equipment, arduino, robotics, STEAM, Egypt, rent tools, buy equipment" />
        <meta property="og:title" content="Access Learning Tools | Nawaa" />
        <meta property="og:description" content="Access quality educational tools and equipment in Egypt. Find Arduino kits, robotics sets, lab equipment for STEAM learning." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/access-tools" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Marketplace",
            "name": "Nawaa Tools Marketplace",
            "description": "Educational tools and equipment marketplace for STEAM learning",
            "url": "/access-tools",
            "provider": {
              "@type": "Organization",
              "name": "Nawaa"
            }
          })}
        </script>
      </Helmet>
      <Layout>
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
    </>
  );
};

export default AccessTools;
