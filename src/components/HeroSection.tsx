import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    color: "hsla(275, 60%, 30%, 0.15)",
    border: "hsla(275, 85%, 55%, 0.5)",
    glow: "hsla(275, 85%, 55%, 0.2)",
    subPieces: [
      { label: "Contas a Pagar", delay: 0.2 },
      { label: "Contas a Receber", delay: 0.4 },
      { label: "Fluxo de Caixa", delay: 0.6 },
      { label: "Conciliação", delay: 0.8 },
    ],
    position: { x: 0, y: 0 },
    startFrom: { x: -250, y: -120, rotate: -20 },
    delay: 0.6,
  },
  {
    label: "Vendas",
    icon: "📊",
    color: "hsla(43, 80%, 45%, 0.15)",
    border: "hsla(43, 100%, 55%, 0.5)",
    glow: "hsla(43, 100%, 55%, 0.2)",
    subPieces: [
      { label: "Pedidos", delay: 0.2 },
      { label: "Comissões", delay: 0.4 },
      { label: "Orçamentos", delay: 0.6 },
      { label: "CRM", delay: 0.8 },
    ],
    position: { x: 1, y: 0 },
    startFrom: { x: 250, y: -100, rotate: 15 },
    delay: 1.0,
  },
  {
    label: "Estoque",
    icon: "📦",
    color: "hsla(160, 60%, 30%, 0.15)",
    border: "hsla(160, 70%, 45%, 0.5)",
    glow: "hsla(160, 70%, 45%, 0.2)",
    subPieces: [
      { label: "Inventário", delay: 0.2 },
      { label: "Movimentação", delay: 0.4 },
      { label: "Lote / Validade", delay: 0.6 },
      { label: "Compras", delay: 0.8 },
    ],
    position: { x: 0, y: 1 },
    startFrom: { x: -220, y: 150, rotate: 22 },
    delay: 1.4,
  },
  {
    label: "Fiscal",
    icon: "📋",
    color: "hsla(210, 60%, 30%, 0.15)",
    border: "hsla(210, 80%, 55%, 0.5)",
    glow: "hsla(210, 80%, 55%, 0.2)",
    subPieces: [
      { label: "NF-e / NFS-e", delay: 0.2 },
      { label: "SPED", delay: 0.4 },
      { label: "Apuração", delay: 0.6 },
      { label: "DARF", delay: 0.8 },
    ],
    position: { x: 1, y: 1 },
    startFrom: { x: 260, y: 130, rotate: -18 },
    delay: 1.8,
  },
];

// Puzzle piece dimensions
const W = 200;
const H = 210;
const TAB = 20;
const NECK = 14;

// Build SVG path for puzzle piece shape
function buildPuzzlePath(pos: { x: number; y: number }): string {
  const tabRight = pos.x === 0;
  const slotLeft = pos.x === 1;
  const tabBottom = pos.y === 0;
  const slotTop = pos.y === 1;

  // We work in a coordinate space where content area is from (TAB, TAB) to (TAB+W, TAB+H)
  // Extra TAB padding on all sides for tabs/slots
  const l = TAB; // left of content
  const t = TAB; // top of content
  const r = TAB + W; // right of content
  const b = TAB + H; // bottom of content

  const midX = (l + r) / 2;
  const midY = (t + b) / 2;

  let d = `M ${l} ${t} `;

  // Top edge
  if (slotTop) {
    d += `L ${midX - NECK} ${t} `;
    d += `A ${NECK} ${NECK} 0 0 1 ${midX + NECK} ${t} `;
    d += `L ${r} ${t} `;
  } else {
    d += `L ${r} ${t} `;
  }

  // Right edge
  if (tabRight) {
    d += `L ${r} ${midY - NECK} `;
    d += `A ${NECK} ${NECK} 0 0 1 ${r} ${midY + NECK} `;
    d += `L ${r} ${b} `;
  } else {
    d += `L ${r} ${b} `;
  }

  // Bottom edge (right to left)
  if (tabBottom) {
    d += `L ${midX + NECK} ${b} `;
    d += `A ${NECK} ${NECK} 0 0 1 ${midX - NECK} ${b} `;
    d += `L ${l} ${b} `;
  } else {
    d += `L ${l} ${b} `;
  }

  // Left edge (bottom to top)
  if (slotLeft) {
    d += `L ${l} ${midY + NECK} `;
    d += `A ${NECK} ${NECK} 0 0 1 ${l} ${midY - NECK} `;
    d += `L ${l} ${t} `;
  } else {
    d += `L ${l} ${t} `;
  }

  d += "Z";
  return d;
}

// Use cubic bezier for smoother tab/slot shapes
function buildPuzzlePathSmooth(pos: { x: number; y: number }): string {
  const tabRight = pos.x === 0;
  const slotLeft = pos.x === 1;
  const tabBottom = pos.y === 0;
  const slotTop = pos.y === 1;

  const l = TAB;
  const t = TAB;
  const r = TAB + W;
  const b = TAB + H;
  const midX = (l + r) / 2;
  const midY = (t + b) / 2;
  const tabSize = TAB;

  let d = `M ${l} ${t} `;

  // Top edge
  if (slotTop) {
    // slot = inward bump (goes into the piece)
    d += `L ${midX - NECK} ${t} `;
    d += `C ${midX - NECK} ${t + tabSize * 0.3}, ${midX - tabSize * 0.6} ${t - tabSize}, ${midX} ${t - tabSize} `;
    d += `C ${midX + tabSize * 0.6} ${t - tabSize}, ${midX + NECK} ${t + tabSize * 0.3}, ${midX + NECK} ${t} `;
  }
  d += `L ${r} ${t} `;

  // Right edge
  if (tabRight) {
    d += `L ${r} ${midY - NECK} `;
    d += `C ${r + tabSize * 0.3} ${midY - NECK}, ${r + tabSize} ${midY - tabSize * 0.6}, ${r + tabSize} ${midY} `;
    d += `C ${r + tabSize} ${midY + tabSize * 0.6}, ${r + tabSize * 0.3} ${midY + NECK}, ${r} ${midY + NECK} `;
  }
  d += `L ${r} ${b} `;

  // Bottom edge
  if (tabBottom) {
    d += `L ${midX + NECK} ${b} `;
    d += `C ${midX + NECK} ${b + tabSize * 0.3}, ${midX + tabSize * 0.6} ${b + tabSize}, ${midX} ${b + tabSize} `;
    d += `C ${midX - tabSize * 0.6} ${b + tabSize}, ${midX - NECK} ${b + tabSize * 0.3}, ${midX - NECK} ${b} `;
  }
  d += `L ${l} ${b} `;

  // Left edge
  if (slotLeft) {
    d += `L ${l} ${midY + NECK} `;
    d += `C ${l - tabSize * 0.3} ${midY + NECK}, ${l - tabSize} ${midY + tabSize * 0.6}, ${l - tabSize} ${midY} `;
    d += `C ${l - tabSize} ${midY - tabSize * 0.6}, ${l - tabSize * 0.3} ${midY - NECK}, ${l} ${midY - NECK} `;
  }
  d += `L ${l} ${t} Z`;

  return d;
}

const TOTAL_W = W + TAB * 2;
const TOTAL_H = H + TAB * 2;

const ModulePiece = ({ mod }: { mod: ModuleData }) => {
  const [showSubs, setShowSubs] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubs(true), (mod.delay + 1.0) * 1000);
    return () => clearTimeout(timer);
  }, [mod.delay]);

  const path = buildPuzzlePathSmooth(mod.position);

  return (
    <motion.div
      className="relative"
      style={{
        width: TOTAL_W,
        height: TOTAL_H,
        // Overlap pieces so tabs fit into adjacent slots
        marginRight: mod.position.x === 0 ? -TAB * 2 : 0,
        marginBottom: mod.position.y === 0 ? -TAB * 2 : 0,
      }}
      initial={{
        x: mod.startFrom.x,
        y: mod.startFrom.y,
        rotate: mod.startFrom.rotate,
        opacity: 0,
        scale: 0.6,
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
        duration: 1,
        type: "spring",
        stiffness: 60,
        damping: 14,
      }}
    >
      {/* SVG puzzle shape */}
      <svg
        width={TOTAL_W}
        height={TOTAL_H}
        viewBox={`0 0 ${TOTAL_W} ${TOTAL_H}`}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id={`glow-${mod.label}`}>
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Fill */}
        <motion.path
          d={path}
          fill={mod.color}
          stroke={mod.border}
          strokeWidth="1.5"
          filter={`url(#glow-${mod.label})`}
          whileHover={{ filter: "brightness(1.2)" }}
        />
      </svg>

      {/* Content overlay */}
      <div
        className="absolute z-10 flex flex-col"
        style={{
          top: TAB,
          left: TAB,
          width: W,
          height: H,
        }}
      >
        {/* Module header */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-2">
          <span className="text-xl">{mod.icon}</span>
          <span className="text-xs font-bold text-foreground/90 tracking-wider uppercase">
            {mod.label}
          </span>
        </div>

        {/* Sub-pieces */}
        <div className="px-3 space-y-1.5 flex-1">
          <AnimatePresence>
            {showSubs &&
              mod.subPieces.map((sub, i) => (
                <motion.div
                  key={sub.label}
                  initial={{ opacity: 0, x: -16, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    delay: sub.delay,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                  }}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-md border text-[10px] font-medium text-foreground/80"
                  style={{
                    borderColor: mod.border,
                    backgroundColor: mod.color,
                  }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: mod.border }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                  {sub.label}
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
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
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
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
              <Link to="/modulos">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow gap-2 text-base px-8"
                >
                  Montar Meu Sistema
                  <ArrowRight size={18} />
                </Button>
              </Link>
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
          <div className="relative h-[520px] lg:h-[560px] hidden lg:flex items-center justify-center">
            {/* Ambient glow */}
            <div className="absolute w-[400px] h-[400px] bg-primary/6 blur-[80px] rounded-full" />

            {/* 2x2 Grid of puzzle pieces */}
            <div className="relative grid grid-cols-2">
              {modules.map((mod) => (
                <ModulePiece key={mod.label} mod={mod} />
              ))}

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
