import { motion } from "framer-motion";
import { FileSpreadsheet, Unplug, RotateCcw, EyeOff, Database } from "lucide-react";

const problems = [
  { icon: FileSpreadsheet, text: "Planilhas desconectadas" },
  { icon: Unplug, text: "Sistemas isolados" },
  { icon: RotateCcw, text: "Retrabalho constante" },
  { icon: EyeOff, text: "Falta de visão estratégica" },
  { icon: Database, text: "Dados espalhados" },
];

const ProblemSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Empresas crescem.{" "}
            <span className="text-gradient">Sistemas não acompanham.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            O crescimento traz complexidade. Sem integração, sua operação vira um campo de batalha.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center group hover:border-destructive/30 transition-colors"
            >
              <problem.icon className="w-8 h-8 text-destructive/70 mx-auto mb-3 group-hover:text-destructive transition-colors" />
              <p className="text-sm font-medium text-foreground/80">{problem.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
