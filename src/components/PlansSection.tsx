import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Puzzle, Star, Zap, Crown, Settings, Plus } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    subtitle: "Para quem está começando",
    annualPrice: "69",
    annualCents: "90",
    monthlyPrice: "87",
    monthlyCents: "38",
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
    annualPrice: "149",
    annualCents: "90",
    monthlyPrice: "187",
    monthlyCents: "38",
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
    annualPrice: "349",
    annualCents: "90",
    monthlyPrice: "437",
    monthlyCents: "38",
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
  const [isAnnual, setIsAnnual] = useState(true);
  const [showAddons, setShowAddons] = useState(false);

  return (
    <section id="planos" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Planos que <span className="text-gradient">crescem com você</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Comece pequeno e escale conforme sua operação. Cada módulo tem seu preço — você monta o sistema ideal.
          </p>

          {/* Toggle Mensal/Anual */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-secondary/60 border border-border/50">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isAnnual
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Anual
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-bold">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {plans.map((plan, i) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const cents = isAnnual ? plan.annualCents : plan.monthlyCents;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass rounded-2xl p-8 relative flex flex-col ${
                  plan.highlight
                    ? "border-primary/40 shadow-glow ring-1 ring-primary/20 md:scale-[1.03]"
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

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-muted-foreground text-sm">R$</span>
                  <motion.span
                    key={price}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-4xl font-bold text-foreground"
                  >
                    {price}
                  </motion.span>
                  <span className="text-muted-foreground text-sm">,{cents}/mês</span>
                </div>
                {isAnnual && (
                  <p className="text-xs text-accent mb-6">Economia de 20% no plano anual</p>
                )}
                {!isAnnual && <div className="mb-6" />}

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
            );
          })}
        </div>

        {/* Custom Plan - Highlighted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto mb-8"
        >
          {/* Glow border effect */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-accent/50 via-primary/50 to-accent/50 blur-sm opacity-60" />

          <div className="relative glass rounded-2xl p-8 border border-accent/30 overflow-hidden">
            {/* Decorative corner pieces */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[60px]" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-[40px]" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-2">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/20">
                  <Settings size={28} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                    <Puzzle size={20} className="text-accent" />
                    Personalizado
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-bold border border-accent/20">
                      MONTE O SEU
                    </span>
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Parta do Starter e adicione apenas os módulos que seu negócio precisa. Sem pacotes fixos.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-accent/40 text-accent hover:bg-accent/10 gap-2 shrink-0"
                onClick={() => setShowAddons(!showAddons)}
              >
                <Plus size={16} className={`transition-transform ${showAddons ? "rotate-45" : ""}`} />
                {showAddons ? "Ocultar módulos" : "Ver módulos e preços"}
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
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 hover:border-accent/20 border border-transparent transition-all cursor-pointer group"
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

            {showAddons && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 pt-4 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className="text-sm text-muted-foreground">
                  Exemplo: <span className="text-foreground font-medium">Starter + Contas a Pagar + NF-e</span> = <span className="text-accent font-bold">R$ 119,88/mês</span>
                </p>
                <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow gap-2">
                  <Puzzle size={16} />
                  Solicitar Proposta
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground max-w-xl mx-auto">
          Todos os planos incluem o Goat Core. Valores por mês. Sem fidelidade — cancele quando quiser.
        </p>
      </div>
    </section>
  );
};

export default PlansSection;
