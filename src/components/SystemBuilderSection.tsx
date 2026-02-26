import { motion, AnimatePresence, Reorder } from "framer-motion";
import { useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  Package,
  FileText,
  Settings,
  BarChart3,
  Users,
  Mail,
  Plus,
  X,
  GripVertical,
  Puzzle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Module {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const availableModules: Module[] = [
  {
    id: "financeiro",
    name: "Financeiro",
    icon: <DollarSign className="w-5 h-5" />,
    color: "from-violet-500/20 to-purple-500/20 border-violet-500/30",
    description: "Contas, fluxo de caixa, conciliação",
  },
  {
    id: "vendas",
    name: "Vendas",
    icon: <ShoppingCart className="w-5 h-5" />,
    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    description: "Pedidos, orçamentos, funil",
  },
  {
    id: "estoque",
    name: "Estoque",
    icon: <Package className="w-5 h-5" />,
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
    description: "Controle, movimentações, inventário",
  },
  {
    id: "fiscal",
    name: "Fiscal",
    icon: <FileText className="w-5 h-5" />,
    color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30",
    description: "NF-e, impostos, obrigações",
  },
  {
    id: "operacional",
    name: "Operacional",
    icon: <Settings className="w-5 h-5" />,
    color: "from-rose-500/20 to-pink-500/20 border-rose-500/30",
    description: "Processos, tarefas, automações",
  },
  {
    id: "dashboards",
    name: "Dashboards",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "from-indigo-500/20 to-violet-500/20 border-indigo-500/30",
    description: "Relatórios, KPIs, métricas",
  },
  {
    id: "rh",
    name: "RH & Pessoas",
    icon: <Users className="w-5 h-5" />,
    color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30",
    description: "Colaboradores, folha, ponto",
  },
  {
    id: "crm",
    name: "CRM",
    icon: <Mail className="w-5 h-5" />,
    color: "from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/30",
    description: "Leads, clientes, relacionamento",
  },
];

const SystemBuilderSection = () => {
  const [selected, setSelected] = useState<Module[]>([]);

  const remaining = availableModules.filter(
    (m) => !selected.find((s) => s.id === m.id)
  );

  const addModule = (mod: Module) => {
    setSelected((prev) => [...prev, mod]);
  };

  const removeModule = (id: string) => {
    setSelected((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <section id="montar" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Puzzle className="w-4 h-4" />
            Montagem Interativa
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Monte seu sistema <span className="text-gradient">agora</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Selecione os módulos que sua empresa precisa e veja seu sistema
            tomando forma em tempo real. Sem código, sem complicação.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left: Available Modules */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <h3 className="text-lg font-semibold">Módulos Disponíveis</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Clique nos módulos para adicionar ao seu sistema
            </p>

            <div className="grid grid-cols-2 gap-3">
              <AnimatePresence>
                {remaining.map((mod) => (
                  <motion.button
                    key={mod.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => addModule(mod)}
                    className={`group relative p-4 rounded-xl border bg-gradient-to-br ${mod.color} backdrop-blur-sm text-left transition-shadow hover:shadow-glow cursor-pointer`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-card/80 text-foreground shrink-0">
                        {mod.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-sm block">
                          {mod.name}
                        </span>
                        <span className="text-xs text-muted-foreground leading-tight block mt-0.5">
                          {mod.description}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-4 h-4 text-primary" />
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Builder Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="text-lg font-semibold">Seu Sistema</h3>
              {selected.length > 0 && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-auto">
                  {selected.length} módulo{selected.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Arraste para reordenar • Clique no X para remover
            </p>

            <div className="rounded-2xl border-2 border-dashed border-border bg-muted/20 min-h-[360px] p-4 relative">
              {selected.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50">
                  <Puzzle className="w-12 h-12 mb-3" />
                  <p className="font-medium">Nenhum módulo selecionado</p>
                  <p className="text-sm">
                    Clique nos módulos ao lado para começar
                  </p>
                </div>
              ) : (
                <Reorder.Group
                  axis="y"
                  values={selected}
                  onReorder={setSelected}
                  className="space-y-3"
                >
                  <AnimatePresence>
                    {selected.map((mod, index) => (
                      <Reorder.Item
                        key={mod.id}
                        value={mod}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center gap-3 p-3 rounded-xl border bg-gradient-to-r ${mod.color} backdrop-blur-sm cursor-grab active:cursor-grabbing group`}
                      >
                        <GripVertical className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                        <div className="p-2 rounded-lg bg-card/80 text-foreground shrink-0">
                          {mod.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-sm">
                            {mod.name}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {mod.description}
                          </span>
                        </div>
                        <button
                          onClick={() => removeModule(mod.id)}
                          className="p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        {/* Connector line */}
                        {index < selected.length - 1 && (
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-px h-3 bg-primary/30" />
                        )}
                      </Reorder.Item>
                    ))}
                  </AnimatePresence>
                </Reorder.Group>
              )}
            </div>

            {/* Summary & CTA */}
            <AnimatePresence>
              {selected.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-6 p-4 rounded-xl glass"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">
                      Resumo do seu sistema
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selected.map((mod) => (
                      <span
                        key={mod.id}
                        className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        🧩 {mod.name}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow gap-2">
                    Solicitar Proposta com {selected.length} módulo
                    {selected.length !== 1 ? "s" : ""}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SystemBuilderSection;
