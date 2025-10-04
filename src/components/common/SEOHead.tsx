import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: Record<string, any>;
}

const SEOHead = ({
  title = "Nawaa - Learn STEM Hands-On: Build Your First Model in 4 Weeks",
  description = "Join 10,000+ young innovators learning STEM through hands-on projects. Watch lessons → Try projects → Share outcomes. Start your free course today and build real prototypes in 4 weeks.",
  keywords = "STEM education, hands-on learning, makerspaces, Egypt, innovation, prototypes, technology education, trainers, tools, workshops, 3D printing, robotics, coding for kids",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = "https://nawaa-mix-match-your-learning-bundle.lovable.app",
  type = "website",
  schema
}: SEOHeadProps) => {
  const fullTitle = title.includes('Nawaa') ? title : `${title} | Nawaa`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Nawaa" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@nawaa_edu" />
      <meta name="twitter:creator" content="@nawaa_edu" />
      
      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
