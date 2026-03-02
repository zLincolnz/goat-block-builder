import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const Block = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0, rotate: -10 }}
    animate={{ scale: 1, opacity: 1, rotate: 0 }}
    transition={{ delay, duration: 0.6, type: "spring", stiffness: 150 }}
    className={`rounded-lg border border-primary/30 bg-gradient-to-br from-primary/20 to-accent/10 backdrop-blur-sm ${className}`}
  />
);

const ConnectorLine = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ delay, duration: 0.4 }}
    className={`h-0.5 bg-gradient-to-r from-primary/60 to-accent/40 origin-left ${className}`}
  />
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-accent mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Sistema Modular Inteligente
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              Monte seu sistema{" "}
              <span className="text-gradient">como um Lego.</span>
              <br />
              <span className="text-foreground/70 text-3xl sm:text-4xl lg:text-5xl">
                Integre tudo. Controle tudo.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Sistema modular e inteligente que conecta todos os setores da sua
              empresa em um único ambiente centralizado.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow gap-2 text-base px-8"
              >
                Montar Meu Sistema
                <ArrowRight size={18} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary text-foreground gap-2 text-base px-8"
              >
                <MessageCircle size={18} />
                Falar com Especialista
              </Button>
            </div>
          </motion.div>

          {/* Visual: Animated Lego Blocks */}
          <div className="relative h-[400px] lg:h-[500px] hidden lg:flex items-center justify-center">
            {/* Central hub */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
              className="absolute w-24 h-24 rounded-2xl bg-gradient-primary shadow-glow-lg flex items-center justify-center z-10"
            >
              <span className="font-display font-bold text-primary-foreground text-xs text-center leading-tight">
                GOAT<br />Core
              </span>
            </motion.div>

            {/* Surrounding blocks */}
            <Block className="absolute w-20 h-16 top-8 left-16" delay={0.8} />
            <Block className="absolute w-18 h-14 top-12 right-20" delay={1.0} />
            <Block className="absolute w-22 h-16 bottom-20 left-12" delay={1.2} />
            <Block className="absolute w-16 h-14 bottom-16 right-16" delay={1.4} />
            <Block className="absolute w-14 h-12 top-1/3 left-4" delay={1.6} />
            <Block className="absolute w-16 h-14 top-1/3 right-4" delay={1.8} />

            {/* Connector lines */}
            <ConnectorLine className="absolute w-16 top-[45%] left-[22%]" delay={2.0} />
            <ConnectorLine className="absolute w-16 top-[45%] right-[22%]" delay={2.1} />
            <ConnectorLine className="absolute w-12 top-[30%] left-[35%] rotate-45" delay={2.2} />
            <ConnectorLine className="absolute w-12 bottom-[30%] right-[35%] -rotate-45" delay={2.3} />

            {/* Floating labels */}
            {["Financeiro", "Vendas", "Estoque", "Fiscal", "Operações", "Dashboards"].map((label, i) => {
              const positions = [
                "top-2 left-10",
                "top-6 right-14",
                "bottom-14 left-6",
                "bottom-10 right-10",
                "top-1/3 -left-2",
                "top-1/3 -right-2",
              ];
              return (
                <motion.span
                  key={label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 + i * 0.15 }}
                  className={`absolute ${positions[i]} text-xs font-medium text-accent/70 font-display`}
                >
                  {label}
                </motion.span>
              );
            })}

            {/* Glow orbs */}
            <div className="absolute w-3 h-3 rounded-full bg-accent/60 animate-pulse top-20 left-24" />
            <div className="absolute w-2 h-2 rounded-full bg-primary/60 animate-pulse bottom-24 right-24" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
