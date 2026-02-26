import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import DemoVideoSection from "@/components/DemoVideoSection";
import HowItWorks from "@/components/HowItWorks";
import IntegrationSection from "@/components/IntegrationSection";
import BenefitsSection from "@/components/BenefitsSection";
import CTABanner from "@/components/CTABanner";
import TargetAudience from "@/components/TargetAudience";
import ClientsSection from "@/components/ClientsSection";
import PlansSection from "@/components/PlansSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <IntegrationSection />
      <BenefitsSection />
      <CTABanner />
      <TargetAudience />
      <ClientsSection />
      <DemoVideoSection />
      <PlansSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
