import { motion } from "framer-motion";
import { Zap, ArrowLeftRight, Globe, Shield, Cloud, Cpu } from "lucide-react";

const integrations = [
  { icon: Globe, label: "APIs Abertas" },
  { icon: ArrowLeftRight, label: "ERPs" },
  { icon: Cloud, label: "Cloud Native" },
  { icon: Shield, label: "LGPD Compliant" },
  { icon: Cpu, label: "Automações" },
  { icon: Zap, label: "Webhooks" },
];

const IntegrationSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-4">
              <Zap size={16} />
              Integrações
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Conecta com tudo que você{" "}
              <span className="text-gradient">já usa.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              A Goat foi projetada para se integrar nativamente com as principais 
              ferramentas do mercado. APIs abertas, webhooks e conectores prontos 
              para que seus dados fluam sem barreiras.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {integrations.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-border bg-card hover:border-primary/30 transition-all group"
                >
                  <item.icon size={18} className="text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual – animated connection diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] hidden lg:flex items-center justify-center"
          >
            {/* Central node */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-full"
            >
              {/* Orbit ring */}
              <div className="absolute inset-8 rounded-full border border-dashed border-primary/20" />
              <div className="absolute inset-20 rounded-full border border-dashed border-accent/15" />
            </motion.div>

            {/* Center hub */}
            <div className="w-28 h-28 rounded-2xl bg-gradient-primary shadow-glow-lg flex items-center justify-center z-10 animate-pulse-glow">
              <span className="font-display font-bold text-primary-foreground text-sm text-center">
                GOAT<br />Hub
              </span>
            </div>

            {/* Orbiting nodes */}
            {integrations.map((item, i) => {
              const angle = (i / integrations.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 150;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, type: "spring" }}
                  className="absolute w-14 h-14 rounded-xl glass flex items-center justify-center shadow-sm"
                  style={{ left: `calc(50% + ${x}px - 28px)`, top: `calc(50% + ${y}px - 28px)` }}
                >
                  <item.icon size={20} className="text-accent" />
                </motion.div>
              );
            })}

            {/* Connection lines */}
            {integrations.map((_, i) => {
              const angle = (i / integrations.length) * 2 * Math.PI - Math.PI / 2;
              const length = 95;
              const deg = (angle * 180) / Math.PI;
              return (
                <motion.div
                  key={`line-${i}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="absolute h-px bg-gradient-to-r from-primary/40 to-accent/20 origin-left"
                  style={{
                    width: `${length}px`,
                    left: "50%",
                    top: "50%",
                    transform: `rotate(${deg}deg)`,
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
