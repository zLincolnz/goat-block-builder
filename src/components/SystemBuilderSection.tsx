import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  X,
  Puzzle,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { moduleCategories } from "@/data/moduleCategories";

interface SubModuleSimple {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface ModuleCategorySimple {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  subModules: SubModuleSimple[];
}

interface SelectedItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  categoryId: string;
  categoryColor: string;
  categoryName: string;
}

const SystemBuilderSection = () => {
  const [selected, setSelected] = useState<SelectedItem[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (catId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const isSubModuleSelected = (subId: string) => selected.some((s) => s.id === subId);

  const addSubModule = (cat: ModuleCategory, sub: SubModule) => {
    if (isSubModuleSelected(sub.id)) return;
    setSelected((prev) => [
      ...prev,
      {
        id: sub.id,
        name: sub.name,
        icon: sub.icon,
        categoryId: cat.id,
        categoryColor: cat.color,
        categoryName: cat.name,
      },
    ]);
  };

  const removeSubModule = (id: string) => {
    setSelected((prev) => prev.filter((m) => m.id !== id));
  };

  const getCategoryCount = (catId: string) =>
    selected.filter((s) => s.categoryId === catId).length;

  const groupedSelected = moduleCategories
    .map((cat) => ({
      ...cat,
      items: selected.filter((s) => s.categoryId === cat.id),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <section id="montar" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Puzzle className="w-4 h-4" />
            Montagem Interativa
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Monte seu sistema <span className="text-gradient">peça por peça</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Escolha exatamente os micro-processos que sua empresa precisa.
            Sem módulos genéricos — cada funcionalidade é uma peça independente.
          </p>
        </motion.div>

        {/* 3-column layout: Sidebar | Canvas | Summary */}
        <div className="grid lg:grid-cols-[280px_1fr_260px] gap-4 max-w-7xl mx-auto">
          {/* Left Sidebar - Module Categories */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:max-h-[680px] lg:overflow-y-auto lg:pr-2 scrollbar-thin"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Funcionalidades
              </h3>
            </div>

            <div className="space-y-2">
              {moduleCategories.map((cat) => {
                const isExpanded = expandedCategories.includes(cat.id);
                const count = getCategoryCount(cat.id);
                return (
                  <div key={cat.id} className="rounded-xl border border-border/50 bg-card/30 overflow-hidden">
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full flex items-center gap-2.5 p-3 hover:bg-muted/30 transition-colors text-left"
                    >
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${cat.color}`}>
                        {cat.icon}
                      </div>
                      <span className="font-medium text-sm flex-1">{cat.name}</span>
                      {count > 0 && (
                        <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold">
                          {count}
                        </span>
                      )}
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-2 pb-2 space-y-1">
                            {cat.subModules.map((sub) => {
                              const added = isSubModuleSelected(sub.id);
                              return (
                                <motion.button
                                  key={sub.id}
                                  whileHover={{ x: 2 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => !added && addSubModule(cat, sub)}
                                  disabled={added}
                                  className={`w-full flex items-center gap-2 p-2 rounded-lg text-left text-xs transition-all ${
                                    added
                                      ? "bg-primary/10 text-primary/60 cursor-default"
                                      : "hover:bg-muted/40 cursor-pointer group"
                                  }`}
                                >
                                  <span className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
                                    {sub.icon}
                                  </span>
                                  <span className="flex-1 truncate">{sub.name}</span>
                                  {added ? (
                                    <span className="text-[10px] text-primary">✓</span>
                                  ) : (
                                    <Plus className="w-3 h-3 text-muted-foreground/0 group-hover:text-primary transition-all opacity-0 group-hover:opacity-100" />
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Center - Builder Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Seu Sistema
              </h3>
              {selected.length > 0 && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-auto font-medium">
                  {selected.length} funcionalidade{selected.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className="rounded-2xl border-2 border-dashed border-border bg-muted/10 min-h-[560px] p-5 relative">
              {selected.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40">
                  <div className="relative mb-4">
                    <Puzzle className="w-16 h-16" />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-primary/30 rounded-full"
                    />
                  </div>
                  <p className="font-semibold text-base">Monte seu sistema aqui</p>
                  <p className="text-sm mt-1">
                    Selecione funcionalidades no menu lateral
                  </p>
                  <div className="flex gap-2 mt-4">
                    {["Contas a Pagar", "Funil de Vendas", "NF-e"].map((ex) => (
                      <span key={ex} className="text-[10px] px-2 py-1 rounded-full border border-border/50 text-muted-foreground/30">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {groupedSelected.map((group) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-border/50 bg-card/40 p-3"
                    >
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className={`p-1 rounded-md bg-gradient-to-br ${group.color}`}>
                          {group.icon}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {group.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground/60 ml-auto">
                          {group.items.length} peça{group.items.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <AnimatePresence>
                          {group.items.map((item) => (
                            <motion.div
                              key={item.id}
                              layout
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className={`flex items-center gap-2 p-2.5 rounded-lg border bg-gradient-to-br ${item.categoryColor} backdrop-blur-sm group relative`}
                            >
                              <span className="shrink-0">{item.icon}</span>
                              <span className="text-xs font-medium truncate flex-1">
                                {item.name}
                              </span>
                              <button
                                onClick={() => removeSubModule(item.id)}
                                className="absolute -top-1.5 -right-1.5 p-0.5 rounded-full bg-card border border-border opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:max-h-[680px] lg:overflow-y-auto"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Resumo
              </h3>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/30 p-4 space-y-4 sticky top-4">
              {selected.length === 0 ? (
                <p className="text-xs text-muted-foreground/50 text-center py-8">
                  Suas funcionalidades selecionadas aparecerão aqui
                </p>
              ) : (
                <>
                  {groupedSelected.map((group) => (
                    <div key={group.id}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className={`p-0.5 rounded ${group.color}`}>
                          {group.icon}
                        </div>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase">
                          {group.name}
                        </span>
                      </div>
                      <div className="space-y-0.5 pl-5">
                        {group.items.map((item) => (
                          <div key={item.id} className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-primary/40 shrink-0" />
                            {item.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-border/30 pt-3">
                    <div className="flex justify-between text-xs mb-3">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-bold text-foreground">
                        {selected.length} funcionalidade{selected.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs mb-4">
                      <span className="text-muted-foreground">Categorias</span>
                      <span className="font-bold text-foreground">
                        {groupedSelected.length} módulo{groupedSelected.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <Button className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow gap-2 text-sm">
                      Solicitar Proposta
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SystemBuilderSection;
