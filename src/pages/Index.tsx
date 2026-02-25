import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import BenefitsSection from "@/components/BenefitsSection";
import TargetAudience from "@/components/TargetAudience";
import ClientsSection from "@/components/ClientsSection";
import PlansSection from "@/components/PlansSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <BenefitsSection />
      <TargetAudience />
      <ClientsSection />
      <PlansSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
