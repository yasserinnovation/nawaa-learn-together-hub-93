// Breadcrumb structured data generator
export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const coursesBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://nawaa-mix-match-your-learning-bundle.lovable.app/" },
  { name: "Courses", url: "https://nawaa-mix-match-your-learning-bundle.lovable.app/courses" }
]);

export const spacesBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://nawaa-mix-match-your-learning-bundle.lovable.app/" },
  { name: "Learning Spaces", url: "https://nawaa-mix-match-your-learning-bundle.lovable.app/discover-spaces" }
]);

export const trainersBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://nawaa-mix-match-your-learning-bundle.lovable.app/" },
  { name: "Find Trainers", url: "https://nawaa-mix-match-your-learning-bundle.lovable.app/find-trainers" }
]);

export const toolsBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://nawaa-mix-match-your-learning-bundle.lovable.app/" },
  { name: "Tools & Equipment", url: "https://nawaa-mix-match-your-learning-bundle.lovable.app/access-tools" }
]);
