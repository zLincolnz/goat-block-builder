import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Puzzle } from "lucide-react";

const PlansSection = () => {
  return (
    <section id="planos" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Planos <span className="text-gradient">modulares</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Você não paga por um sistema inteiro. Paga apenas pelos blocos que precisa.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Core Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 relative"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-accent text-xs font-medium mb-6">
              <Puzzle size={12} />
              Obrigatório
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">Plano Base (Core)</h3>
            <p className="text-muted-foreground mb-6">
              Infraestrutura central que conecta todos os módulos.
            </p>
            <ul className="space-y-3 mb-8">
              {["Painel administrativo", "Gestão de usuários", "Integrações base", "Suporte dedicado"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-foreground/80">
                  <Check size={16} className="text-accent flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full border-border hover:bg-secondary text-foreground">
              Começar com o Core
            </Button>
          </motion.div>

          {/* Modular */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 relative border-primary/30 shadow-glow"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-medium mb-6">
              <Puzzle size={12} />
              Personalizável
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">Módulos Adicionais</h3>
            <p className="text-muted-foreground mb-6">
              Adicione os blocos que fazem sentido para seu negócio.
            </p>
            <ul className="space-y-3 mb-8">
              {["Financeiro", "Vendas & CRM", "Estoque", "Fiscal", "Operacional", "Dashboards BI"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-foreground/80">
                  <span className="text-accent text-xs">🧩</span>
                  {f}
                </li>
              ))}
            </ul>
            <Button className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow">
              Montar Meu Sistema
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
