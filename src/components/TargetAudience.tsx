import { motion } from "framer-motion";
import { Factory, Store, Truck, TrendingUp, Layers } from "lucide-react";

const segments = [
  { icon: Factory, label: "Indústrias" },
  { icon: Store, label: "Comércio" },
  { icon: Truck, label: "Distribuidores" },
  { icon: TrendingUp, label: "Empresas em crescimento" },
  { icon: Layers, label: "Empresas que querem centralizar" },
];

const TargetAudience = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Para <span className="text-gradient">quem é</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {segments.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-full px-8 py-4 flex items-center gap-3 hover:border-primary/40 transition-colors"
            >
              <s.icon className="w-5 h-5 text-accent" />
              <span className="font-medium text-foreground text-sm">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
