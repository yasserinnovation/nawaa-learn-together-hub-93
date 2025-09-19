
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/FeaturesSection";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import LogoShowcase from "@/components/home/LogoShowcase";
import AssessmentSection from "@/components/home/AssessmentSection";
import StatsSection from "@/components/home/StatsSection";
import InteractiveDemo from "@/components/home/InteractiveDemo";
import NewsletterSection from "@/components/home/NewsletterSection";
import PageTransition from "@/components/common/PageTransition";
import { organizationSchema, websiteSchema, educationalOrganizationSchema } from "@/lib/structured-data";

const Index = () => {
  return (
    <Layout>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema, educationalOrganizationSchema]),
        }}
      />
      
      <PageTransition>
        <Hero />
        <LogoShowcase />
        <StatsSection />
        <FeaturesSection />
        <InteractiveDemo />
        <AssessmentSection />
        <Testimonials />
        <NewsletterSection />
        <CTASection />
      </PageTransition>
    </Layout>
  );
};

export default Index;
