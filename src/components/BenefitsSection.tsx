import { motion } from "framer-motion";
import { Repeat, Network, TrendingUp, Brain, Workflow, Rocket } from "lucide-react";

const benefits = [
  { icon: Repeat, title: "Redução de retrabalho", desc: "Processos fluem sem duplicação de esforço." },
  { icon: Network, title: "Integração total", desc: "Todos os setores conectados em tempo real." },
  { icon: TrendingUp, title: "Escalabilidade", desc: "Adicione módulos conforme seu crescimento." },
  { icon: Brain, title: "Decisão baseada em dados", desc: "Relatórios e dashboards estratégicos." },
  { icon: Workflow, title: "Automatização de fluxos", desc: "Regras inteligentes que trabalham por você." },
  { icon: Rocket, title: "Crescimento sem caos", desc: "Organização operacional em cada etapa." },
];

const BenefitsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Benefícios <span className="text-gradient">estratégicos</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 p-6 rounded-xl hover:bg-secondary/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex-shrink-0 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                <b.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
