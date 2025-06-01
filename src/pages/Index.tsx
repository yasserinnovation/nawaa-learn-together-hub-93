
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import BundleSection from "@/components/home/BundleSection";
import LogoShowcase from "@/components/home/LogoShowcase";
import AssessmentSection from "@/components/home/AssessmentSection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <LogoShowcase />
      <AssessmentSection />
      <FeaturesSection />
      <BundleSection />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
