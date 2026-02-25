import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, Package, FileText, Settings, BarChart3, Puzzle } from "lucide-react";

const modules = [
  { icon: DollarSign, name: "Financeiro", desc: "Contas, fluxo de caixa, conciliação" },
  { icon: ShoppingCart, name: "Vendas", desc: "CRM, pedidos, propostas" },
  { icon: Package, name: "Estoque", desc: "Controle, movimentações, inventário" },
  { icon: FileText, name: "Fiscal", desc: "NF-e, impostos, obrigações" },
  { icon: Settings, name: "Operacional", desc: "Processos, workflows, tarefas" },
  { icon: BarChart3, name: "Dashboards", desc: "Relatórios, KPIs, BI" },
];

const SolutionSection = () => {
  return (
    <section id="modulos" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-4">
            <Puzzle size={16} />
            A Solução Goat
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" id="solucao">
            Um sistema modular que{" "}
            <span className="text-gradient">cresce com você.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cada módulo funciona sozinho. Mas quando conectados, formam um ecossistema completo e integrado.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-8 group cursor-default hover:border-primary/40 transition-all relative overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                  <mod.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-accent/60 font-display">🧩</span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Módulo {mod.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">{mod.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-accent/80 font-medium mt-10 font-display"
        >
          Todos integrados automaticamente em um único ambiente.
        </motion.p>
      </div>
    </section>
  );
};

export default SolutionSection;
