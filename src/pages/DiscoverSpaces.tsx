
import Layout from "@/components/layout/Layout";
import SpacesHero from "@/components/spaces/SpacesHero";
import SpaceMap from "@/components/spaces/SpaceMap";
import SpacesList from "@/components/spaces/SpacesList";
import SEOHead from "@/components/common/SEOHead";
import { spacesBreadcrumb } from "@/lib/breadcrumb-schema";

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

  return (
    <Layout>
      <SEOHead 
        title="Discover Learning Spaces Near You - Makerspaces & STEM Labs"
        description="Find makerspaces, innovation labs, and collaborative learning spaces across Egypt. 50+ locations with 3D printers, robotics kits, and expert trainers. Book your space today."
        keywords="makerspaces Egypt, learning spaces, innovation labs, STEM labs, collaborative workspace, 3D printing, robotics lab, tech education spaces"
        url="https://nawaa-mix-match-your-learning-bundle.lovable.app/discover-spaces"
        schema={[spacesStructuredData, spacesBreadcrumb]}
      />
      
      <SpacesHero />
      <main className="container mx-auto px-4 py-8" data-results-section>
        <div className="mb-6">
          <SpaceMap />
        </div>
        <SpacesList />
      </main>
    </Layout>
  );
};

export default DiscoverSpaces;
