// Course structured data for SEO
export const createCourseSchema = (course: {
  name: string;
  description: string;
  provider: string;
  url: string;
  duration?: string;
  difficulty?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.name,
  "description": course.description,
  "provider": {
    "@type": "Organization",
    "name": course.provider,
    "sameAs": "https://nawaa-mix-match-your-learning-bundle.lovable.app"
  },
  "url": course.url,
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Blended",
    "courseWorkload": course.duration || "PT4W"
  },
  ...(course.image && { "image": course.image }),
  ...(course.difficulty && { "educationalLevel": course.difficulty }),
  "inLanguage": ["en", "ar"],
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "category": "Education",
    "price": "0",
    "priceCurrency": "EGP"
  }
});

export const courseCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "STEM Courses Catalog",
  "description": "Hands-on STEM courses covering robotics, 3D printing, coding, and more",
  "url": "https://nawaa-mix-match-your-learning-bundle.lovable.app/courses",
  "numberOfItems": 12,
  "itemListElement": [
    {
      "@type": "Course",
      "position": 1,
      "name": "Introduction to Robotics",
      "description": "Build and program your first robot in 4 weeks",
      "provider": {
        "@type": "Organization",
        "name": "Nawaa"
      }
    },
    {
      "@type": "Course",
      "position": 2,
      "name": "3D Printing Basics",
      "description": "Learn to design and print 3D models",
      "provider": {
        "@type": "Organization",
        "name": "Nawaa"
      }
    },
    {
      "@type": "Course",
      "position": 3,
      "name": "Coding for Kids",
      "description": "Start your coding journey with visual programming",
      "provider": {
        "@type": "Organization",
        "name": "Nawaa"
      }
    }
  ]
};
