import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface SubPiece {
  label: string;
  delay: number;
}

interface ModuleData {
  label: string;
  icon: string;
  color: string;
  border: string;
  glow: string;
  subPieces: SubPiece[];
  position: { x: number; y: number };
  startFrom: { x: number; y: number; rotate: number };
  delay: number;
}

const modules: ModuleData[] = [
  {
    label: "Financeiro",
    icon: "💰",
    color: "hsla(275, 60%, 30%, 0.12)",
    border: "hsla(275, 85%, 55%, 0.4)",
    glow: "hsla(275, 85%, 55%, 0.15)",
    subPieces: [
      { label: "Contas a Pagar", delay: 0.3 },
      { label: "Contas a Receber", delay: 0.5 },
      { label: "Fluxo de Caixa", delay: 0.7 },
      { label: "Conciliação", delay: 0.9 },
    ],
    position: { x: 0, y: 0 },
    startFrom: { x: -200, y: -80, rotate: -15 },
    delay: 0.6,
  },
  {
    label: "Vendas",
    icon: "📊",
    color: "hsla(43, 80%, 45%, 0.12)",
    border: "hsla(43, 100%, 55%, 0.4)",
    glow: "hsla(43, 100%, 55%, 0.15)",
    subPieces: [
      { label: "Pedidos", delay: 0.3 },
      { label: "Comissões", delay: 0.5 },
      { label: "Orçamentos", delay: 0.7 },
      { label: "CRM", delay: 0.9 },
    ],
    position: { x: 1, y: 0 },
    startFrom: { x: 200, y: -60, rotate: 12 },
    delay: 1.0,
  },
  {
    label: "Estoque",
    icon: "📦",
    color: "hsla(160, 60%, 30%, 0.12)",
    border: "hsla(160, 70%, 45%, 0.4)",
    glow: "hsla(160, 70%, 45%, 0.15)",
    subPieces: [
      { label: "Inventário", delay: 0.3 },
      { label: "Movimentação", delay: 0.5 },
      { label: "Lote / Validade", delay: 0.7 },
      { label: "Compras", delay: 0.9 },
    ],
    position: { x: 0, y: 1 },
    startFrom: { x: -180, y: 120, rotate: 18 },
    delay: 1.4,
  },
  {
    label: "Fiscal",
    icon: "📋",
    color: "hsla(210, 60%, 30%, 0.12)",
    border: "hsla(210, 80%, 55%, 0.4)",
    glow: "hsla(210, 80%, 55%, 0.15)",
    subPieces: [
      { label: "NF-e / NFS-e", delay: 0.3 },
      { label: "SPED", delay: 0.5 },
      { label: "Apuração", delay: 0.7 },
      { label: "DARF", delay: 0.9 },
    ],
    position: { x: 1, y: 1 },
    startFrom: { x: 220, y: 100, rotate: -20 },
    delay: 1.8,
  },
];

const ModulePiece = ({ mod }: { mod: ModuleData }) => {
  const [showSubs, setShowSubs] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubs(true), (mod.delay + 1.0) * 1000);
    return () => clearTimeout(timer);
  }, [mod.delay]);

  return (
    <motion.div
      className="relative"
      initial={{
        x: mod.startFrom.x,
        y: mod.startFrom.y,
        rotate: mod.startFrom.rotate,
        opacity: 0,
        scale: 0.7,
      }}
      animate={{
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: mod.delay,
        duration: 0.9,
        type: "spring",
        stiffness: 70,
        damping: 15,
      }}
    >
      {/* Main module card */}
      <motion.div
        className="relative w-[170px] h-[170px] rounded-2xl border backdrop-blur-sm overflow-hidden cursor-default"
        style={{
          backgroundColor: mod.color,
          borderColor: mod.border,
          boxShadow: `0 0 30px ${mod.glow}`,
        }}
        whileHover={{ scale: 1.04, boxShadow: `0 0 50px ${mod.glow}` }}
        transition={{ duration: 0.2 }}
      >
        {/* Puzzle tab connectors */}
        {mod.position.x === 0 && (
          <div
            className="absolute -right-[8px] top-1/2 -translate-y-1/2 w-4 h-6 rounded-r-full"
            style={{ backgroundColor: mod.border, opacity: 0.5 }}
          />
        )}
        {mod.position.x === 1 && (
          <div
            className="absolute -left-[8px] top-1/2 -translate-y-1/2 w-4 h-6 rounded-l-full"
            style={{ backgroundColor: mod.border, opacity: 0.5 }}
          />
        )}
        {mod.position.y === 0 && (
          <div
            className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-6 h-4 rounded-b-full"
            style={{ backgroundColor: mod.border, opacity: 0.5 }}
          />
        )}
        {mod.position.y === 1 && (
          <div
            className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-6 h-4 rounded-t-full"
            style={{ backgroundColor: mod.border, opacity: 0.5 }}
          />
        )}

        {/* Module header */}
        <div className="px-3 pt-3 pb-2 flex items-center gap-2">
          <span className="text-lg">{mod.icon}</span>
          <span className="text-xs font-bold text-foreground/90 tracking-wide uppercase">
            {mod.label}
          </span>
        </div>

        {/* Sub-pieces */}
        <div className="px-2.5 space-y-1">
          <AnimatePresence>
            {showSubs &&
              mod.subPieces.map((sub, i) => (
                <motion.div
                  key={sub.label}
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    delay: sub.delay,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                  }}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-medium text-foreground/75"
                  style={{
                    borderColor: mod.border,
                    backgroundColor: `${mod.color}`,
                  }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: mod.border }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                  {sub.label}
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Connection lines between modules
const ConnectionLines = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 pointer-events-none"
    >
      <svg className="w-full h-full absolute inset-0" style={{ overflow: "visible" }}>
        {/* Horizontal line */}
        <motion.line
          x1="48%" y1="35%" x2="52%" y2="35%"
          stroke="hsla(275, 85%, 55%, 0.3)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.line
          x1="48%" y1="65%" x2="52%" y2="65%"
          stroke="hsla(275, 85%, 55%, 0.3)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        {/* Vertical lines */}
        <motion.line
          x1="35%" y1="48%" x2="35%" y2="52%"
          stroke="hsla(275, 85%, 55%, 0.3)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
        <motion.line
          x1="65%" y1="48%" x2="65%" y2="52%"
          stroke="hsla(275, 85%, 55%, 0.3)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </svg>
    </motion.div>
  );
};

// Central GOAT badge
const CoreBadge = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
    >
      <motion.div
        className="w-16 h-16 rounded-xl bg-gradient-primary flex flex-col items-center justify-center shadow-glow-lg border border-primary/30"
        animate={{
          boxShadow: [
            "0 0 20px hsla(275, 85%, 55%, 0.3)",
            "0 0 40px hsla(275, 85%, 55%, 0.5)",
            "0 0 20px hsla(275, 85%, 55%, 0.3)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-primary-foreground text-xs font-extrabold tracking-wider">GOAT</span>
        <span className="text-accent text-[8px] font-semibold">Core</span>
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
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

          {/* Visual: Puzzle Assembly */}
          <div className="relative h-[480px] lg:h-[540px] hidden lg:flex items-center justify-center">
            {/* Ambient glow */}
            <div className="absolute w-[400px] h-[400px] bg-primary/6 blur-[80px] rounded-full" />

            {/* 2x2 Grid of modules */}
            <div className="relative grid grid-cols-2 gap-4">
              {modules.map((mod) => (
                <ModulePiece key={mod.label} mod={mod} />
              ))}

              {/* Connection lines */}
              <ConnectionLines />

              {/* Central GOAT Core badge */}
              <CoreBadge />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
