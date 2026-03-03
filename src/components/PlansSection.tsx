import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Puzzle, Star, Zap, Crown, Settings, Plus } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    subtitle: "Para quem está começando",
    price: "69",
    cents: "90",
    icon: Zap,
    highlight: false,
    badge: null,
    includes: [
      "Gestão Financeira básica",
      "Conciliação Bancária",
      "1 Integração bancária",
      "Painel administrativo",
      "1 usuário",
    ],
    cta: "Começar Agora",
  },
  {
    name: "Essencial",
    subtitle: "O mais popular",
    price: "149",
    cents: "90",
    icon: Star,
    highlight: true,
    badge: "Mais Popular",
    includes: [
      "Tudo do Starter +",
      "Contas a Pagar e Receber",
      "Fluxo de Caixa",
      "Emissão de NF-e",
      "3 Integrações",
      "Até 5 usuários",
      "Suporte prioritário",
    ],
    cta: "Escolher Essencial",
  },
  {
    name: "Profissional",
    subtitle: "Para operações completas",
    price: "349",
    cents: "90",
    icon: Crown,
    highlight: false,
    badge: null,
    includes: [
      "Tudo do Essencial +",
      "Vendas & CRM completo",
      "Gestão de Estoque",
      "Módulo Fiscal completo",
      "Dashboards BI",
      "Integrações ilimitadas",
      "Até 20 usuários",
      "Suporte dedicado",
    ],
    cta: "Escolher Profissional",
  },
];

const addons = [
  { name: "Contas a Pagar/Receber", price: "19,99" },
  { name: "Fluxo de Caixa", price: "14,99" },
  { name: "Emissão NF-e", price: "29,99" },
  { name: "Integração bancária extra", price: "9,99" },
  { name: "Módulo de Vendas", price: "39,99" },
  { name: "Gestão de Estoque", price: "34,99" },
  { name: "Dashboard BI", price: "24,99" },
  { name: "Usuário adicional", price: "7,99" },
];

const PlansSection = () => {
  const [showAddons, setShowAddons] = useState(false);

  return (
    <section id="planos" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Planos que <span className="text-gradient">crescem com você</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comece pequeno e escale conforme sua operação. Cada módulo tem seu preço — você monta o sistema ideal.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-8 relative flex flex-col ${
                plan.highlight
                  ? "border-primary/40 shadow-glow ring-1 ring-primary/20 scale-[1.03]"
                  : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold">
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${plan.highlight ? "bg-primary/20" : "bg-secondary"}`}>
                  <plan.icon size={20} className={plan.highlight ? "text-accent" : "text-muted-foreground"} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.subtitle}</p>
                </div>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-muted-foreground text-sm">R$</span>
                <span className="font-display text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm">,{plan.cents}/mês</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.includes.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check size={14} className="text-accent flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlight
                    ? "bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow"
                    : "border-border hover:bg-secondary text-foreground"
                }`}
                variant={plan.highlight ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Custom Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 max-w-6xl mx-auto mb-8 border-accent/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/15">
                <Settings size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                  <Puzzle size={20} className="text-accent" />
                  Personalizado
                </h3>
                <p className="text-muted-foreground text-sm">
                  Monte seu próprio plano adicionando módulos individuais ao Starter.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-accent/30 text-accent hover:bg-accent/10 gap-2"
              onClick={() => setShowAddons(!showAddons)}
            >
              <Plus size={16} />
              {showAddons ? "Ocultar módulos" : "Ver módulos avulsos"}
            </Button>
          </div>

          {showAddons && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-border/50"
            >
              {addons.map((addon, i) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-accent group-hover:scale-110 transition-transform">🧩</span>
                    <span className="text-sm text-foreground/80">{addon.name}</span>
                  </div>
                  <span className="text-xs font-bold text-accent whitespace-nowrap">
                    +R$ {addon.price}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        <p className="text-center text-xs text-muted-foreground max-w-xl mx-auto">
          Todos os planos incluem o Goat Core. Valores por mês. Sem fidelidade — cancele quando quiser.
        </p>
      </div>
    </section>
  );
};

export default PlansSection;
