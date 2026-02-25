import { motion } from "framer-motion";
import { Puzzle, Link2, Zap, Monitor } from "lucide-react";

const steps = [
  {
    icon: Puzzle,
    number: "01",
    title: "Escolha os módulos",
    desc: "Selecione apenas o que sua empresa precisa agora.",
  },
  {
    icon: Link2,
    number: "02",
    title: "Integramos os dados",
    desc: "Conectamos tudo em um ambiente único e centralizado.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Automatizamos os processos",
    desc: "Fluxos inteligentes eliminam retrabalho e erros.",
  },
  {
    icon: Monitor,
    number: "04",
    title: "Acompanhe em tempo real",
    desc: "Dashboards e relatórios com visão completa do negócio.",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Como <span className="text-gradient">funciona</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/40 to-transparent" />
              )}
              
              <div className="glass rounded-2xl p-8 text-center relative">
                <span className="font-display text-4xl font-bold text-primary/20 absolute top-4 right-6">
                  {step.number}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary mx-auto mb-5 flex items-center justify-center shadow-glow">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
