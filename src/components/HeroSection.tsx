import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const moduleGroups = [
  {
    label: "Financeiro",
    color: "from-violet-500/30 to-violet-700/20",
    border: "border-violet-400/40",
    textColor: "text-violet-300",
    pieces: ["Contas a Pagar", "Contas a Receber", "Conciliação", "Fluxo de Caixa"],
    position: "top-0 left-0",
    connectorAngle: "rotate-[35deg]",
    connectorOrigin: "bottom-right",
  },
  {
    label: "Vendas",
    color: "from-amber-500/30 to-yellow-600/20",
    border: "border-amber-400/40",
    textColor: "text-amber-300",
    pieces: ["Funil", "Propostas", "Pedidos", "Comissões"],
    position: "top-0 right-0",
    connectorAngle: "-rotate-[35deg]",
    connectorOrigin: "bottom-left",
  },
  {
    label: "Estoque",
    color: "from-emerald-500/30 to-green-600/20",
    border: "border-emerald-400/40",
    textColor: "text-emerald-300",
    pieces: ["Entradas", "Saídas", "Inventário", "Lotes"],
    position: "bottom-0 left-0",
    connectorAngle: "-rotate-[35deg]",
    connectorOrigin: "top-right",
  },
  {
    label: "Fiscal",
    color: "from-sky-500/30 to-blue-600/20",
    border: "border-sky-400/40",
    textColor: "text-sky-300",
    pieces: ["NF-e", "SPED", "Impostos", "Obrigações"],
    position: "bottom-0 right-0",
    connectorAngle: "rotate-[35deg]",
    connectorOrigin: "top-left",
  },
  {
    label: "Operações",
    color: "from-rose-500/30 to-pink-600/20",
    border: "border-rose-400/40",
    textColor: "text-rose-300",
    pieces: ["Produção", "Qualidade", "Manutenção"],
    position: "top-1/2 -translate-y-1/2 -left-2",
    connectorAngle: "rotate-0",
    connectorOrigin: "right",
  },
  {
    label: "Dashboards",
    color: "from-fuchsia-500/30 to-purple-600/20",
    border: "border-fuchsia-400/40",
    textColor: "text-fuchsia-300",
    pieces: ["KPIs", "Relatórios", "BI"],
    position: "top-1/2 -translate-y-1/2 -right-2",
    connectorAngle: "rotate-0",
    connectorOrigin: "left",
  },
];

const PuzzlePiece = ({
  label,
  delay,
  color,
  border,
}: {
  label: string;
  delay: number;
  color: string;
  border: string;
}) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.4, type: "spring", stiffness: 200 }}
    className={`px-2 py-1 rounded-md border ${border} bg-gradient-to-br ${color} backdrop-blur-sm text-[9px] font-medium text-foreground/80 whitespace-nowrap`}
  >
    {label}
  </motion.div>
);

const ModuleCluster = ({
  group,
  index,
}: {
  group: (typeof moduleGroups)[0];
  index: number;
}) => {
  const baseDelay = 0.8 + index * 0.3;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: baseDelay, duration: 0.5 }}
      className={`absolute ${group.position} w-[130px]`}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: baseDelay + 0.2 }}
        className={`text-[10px] font-display font-bold ${group.textColor} uppercase tracking-wider mb-1 block`}
      >
        {group.label}
      </motion.span>
      <div className="flex flex-wrap gap-1">
        {group.pieces.map((piece, i) => (
          <PuzzlePiece
            key={piece}
            label={piece}
            delay={baseDelay + 0.3 + i * 0.1}
            color={group.color}
            border={group.border}
          />
        ))}
      </div>
    </motion.div>
  );
};

const ConnectionLine = ({
  x1,
  y1,
  x2,
  y2,
  delay,
}: {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  delay: number;
}) => (
  <motion.line
    x1={x1 as unknown as number}
    y1={y1 as unknown as number}
    x2={x2 as unknown as number}
    y2={y2 as unknown as number}
    stroke="url(#lineGradient)"
    strokeWidth="1.5"
    strokeDasharray="6 3"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.6 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
  />
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
        {/* Industrial grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-accent mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Sistema Modular para Indústrias
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              Monte seu sistema{" "}
              <span className="text-gradient">como um Lego.</span>
              <br />
              <span className="text-foreground/70 text-3xl sm:text-4xl lg:text-5xl">
                Integre tudo. Controle tudo.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Sistema modular e inteligente que conecta todos os setores da sua
              indústria em um único ambiente centralizado — do chão de fábrica à diretoria.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow gap-2 text-base px-8"
              >
                Montar Meu Sistema
                <ArrowRight size={18} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary text-foreground gap-2 text-base px-8"
              >
                <MessageCircle size={18} />
                Falar com Especialista
              </Button>
            </div>
          </motion.div>

          {/* Visual: Puzzle System */}
          <div className="relative h-[480px] lg:h-[540px] hidden lg:flex items-center justify-center">
            {/* SVG Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(275, 85%, 55%)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="hsl(43, 100%, 55%)" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {/* Lines from core to each cluster */}
              <ConnectionLine x1="50%" y1="50%" x2="15%" y2="15%" delay={2.5} />
              <ConnectionLine x1="50%" y1="50%" x2="85%" y2="15%" delay={2.6} />
              <ConnectionLine x1="50%" y1="50%" x2="15%" y2="85%" delay={2.7} />
              <ConnectionLine x1="50%" y1="50%" x2="85%" y2="85%" delay={2.8} />
              <ConnectionLine x1="50%" y1="50%" x2="8%" y2="50%" delay={2.9} />
              <ConnectionLine x1="50%" y1="50%" x2="92%" y2="50%" delay={3.0} />
            </svg>

            {/* Pulsing rings around core */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-primary/10"
                style={{
                  width: `${160 + i * 100}px`,
                  height: `${160 + i * 100}px`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.6 }}
              />
            ))}

            {/* Animated orbit dots */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-accent/50"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: [
                    Math.cos((i * Math.PI) / 3) * 120,
                    Math.cos((i * Math.PI) / 3 + Math.PI) * 120,
                    Math.cos((i * Math.PI) / 3) * 120,
                  ],
                  y: [
                    Math.sin((i * Math.PI) / 3) * 120,
                    Math.sin((i * Math.PI) / 3 + Math.PI) * 120,
                    Math.sin((i * Math.PI) / 3) * 120,
                  ],
                }}
                transition={{
                  duration: 12 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Central GOAT Core */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
              className="absolute z-20 w-28 h-28 rounded-2xl bg-gradient-primary shadow-glow-lg flex flex-col items-center justify-center gap-1"
            >
              <span className="font-display font-bold text-primary-foreground text-sm leading-tight">
                GOAT
              </span>
              <span className="font-display font-bold text-primary-foreground/80 text-[10px] leading-tight">
                Core
              </span>
              <motion.div
                className="absolute -inset-1 rounded-2xl border-2 border-accent/30"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Module Clusters */}
            <div className="absolute inset-8">
              {moduleGroups.map((group, i) => (
                <ModuleCluster key={group.label} group={group} index={i} />
              ))}
            </div>

            {/* Corner glow accents - industrial feel */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />

            {/* Small floating connectors */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute w-1 h-1 rounded-full bg-primary/40"
                style={{
                  top: `${15 + Math.random() * 70}%`,
                  left: `${15 + Math.random() * 70}%`,
                }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
