
import Layout from "@/components/layout/Layout";
import SpacesHero from "@/components/spaces/SpacesHero";
import SpaceMap from "@/components/spaces/SpaceMap";
import SpacesList from "@/components/spaces/SpacesList";

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
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(spacesStructuredData),
        }}
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
