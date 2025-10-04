// Structured data for SEO
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nawaa",
  "description": "A hands-on STEM learning platform helping young innovators build real prototypes through structured courses and access to makerspaces",
  "url": "https://nawaa-mix-match-your-learning-bundle.lovable.app",
  "logo": "https://nawaa-mix-match-your-learning-bundle.lovable.app/lovable-uploads/15fb8a28-ecf5-48ee-b8c7-9d80f6320b52.png",
  "foundingDate": "2024",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "50"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "EG",
    "addressLocality": "Cairo"
  },
  "sameAs": [
    "https://twitter.com/nawaa_edu",
    "https://facebook.com/nawaa",
    "https://instagram.com/nawaa"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["English", "Arabic"],
    "email": "contact@nawaa.app"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nawaa - Learn STEM Hands-On",
  "alternateName": "Nawaa",
  "description": "Learn STEM hands-on and build your first model in 4 weeks. Join 10,000+ young innovators.",
  "url": "https://nawaa-mix-match-your-learning-bundle.lovable.app",
  "inLanguage": ["en", "ar"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://nawaa-mix-match-your-learning-bundle.lovable.app/discover-spaces?search={search_term_string}"
    },
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