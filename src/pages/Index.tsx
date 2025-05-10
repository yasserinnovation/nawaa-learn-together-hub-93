
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <div className="bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1920')", backgroundBlendMode: "overlay", backgroundColor: "rgba(255,255,255,0.85)" }}>
        <Hero />
      </div>
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
