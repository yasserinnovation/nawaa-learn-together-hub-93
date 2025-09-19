// Structured data for SEO
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nawaa",
  "description": "An interactive web platform for teaching children technology through customizable learning experiences",
  "url": "https://nawaa-mix-match-your-learning-bundle.lovable.app",
  "logo": "https://nawaa-mix-match-your-learning-bundle.lovable.app/lovable-uploads/15fb8a28-ecf5-48ee-b8c7-9d80f6320b52.png",
  "sameAs": [
    "https://twitter.com/nawaa_edu",
    "https://facebook.com/nawaa",
    "https://instagram.com/nawaa"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["English", "Arabic"]
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nawaa - Mix & Match Your Learning Bundle",
  "description": "Transform ideas into real prototypes with expert trainers, cutting-edge tools, and collaborative spaces",
  "url": "https://nawaa-mix-match-your-learning-bundle.lovable.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://nawaa-mix-match-your-learning-bundle.lovable.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const educationalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Nawaa",
  "description": "Platform connecting learners with expert trainers, makerspaces, and professional tools for STEM education",
  "url": "https://nawaa-mix-match-your-learning-bundle.lovable.app",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Learning Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "STEM Courses",
          "description": "Hands-on STEM learning experiences for all ages"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Makerspace Access",
          "description": "Access to collaborative learning spaces and workshops"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Professional Tools",
          "description": "Rent professional equipment and tools for projects"
        }
      }
    ]
  }
};