import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import SystemBuilderSection from "@/components/SystemBuilderSection";
import Footer from "@/components/Footer";

const Modulos = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />

      <div className="pt-20">
        <SystemBuilderSection />
      </div>

      <Footer />
    </div>
  );
};

export default Modulos;
