
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import LogoShowcase from "@/components/home/LogoShowcase";
import AssessmentSection from "@/components/home/AssessmentSection";
import IdeaToMVPSection from "@/components/home/IdeaToMVPSection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <LogoShowcase />
      <IdeaToMVPSection />
      <AssessmentSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
