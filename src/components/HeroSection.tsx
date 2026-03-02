import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import logoImg from "@/assets/logo-purple.png";

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
            {/* Glow behind logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="absolute w-[350px] h-[350px] rounded-full bg-primary/10 blur-[80px]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              className="absolute w-[200px] h-[200px] rounded-full bg-accent/15 blur-[60px]"
            />

            {/* Logo with dramatic entrance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.9, type: "spring", stiffness: 80, damping: 15 }}
              className="relative z-10"
            >
              <motion.img
                src={logoImg}
                alt="Goat Tecnologia"
                className="w-[320px] h-auto drop-shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Pulsing glow ring */}
              <motion.div
                className="absolute inset-0 -m-6 rounded-full border-2 border-primary/20"
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Floating labels around logo */}
            {["Financeiro", "Vendas", "Estoque", "Fiscal", "Operações", "Dashboards"].map((label, i) => {
              const angle = (i / 6) * 2 * Math.PI - Math.PI / 2;
              const radius = 210;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.12, type: "spring", stiffness: 120 }}
                  className="absolute text-xs font-medium text-accent font-display px-3 py-1 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm"
                  style={{ left: `calc(50% + ${x}px - 40px)`, top: `calc(50% + ${y}px - 12px)` }}
                >
                  {label}
                </motion.span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
