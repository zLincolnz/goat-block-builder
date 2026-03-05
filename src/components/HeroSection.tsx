import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

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

// Generate puzzle piece SVG path
// Each piece has tabs (outward bumps) and slots (inward notches) based on position
function puzzlePath(
  w: number,
  h: number,
  pos: { x: number; y: number },
  tab: number = 14,
  neck: number = 8
): string {
  // pos.x=0 means left column, pos.x=1 means right column
  // pos.y=0 means top row, pos.y=1 means bottom row
  // Left col: tab on right. Right col: slot on left.
  // Top row: tab on bottom. Bottom row: slot on top.

  const hasTabRight = pos.x === 0;
  const hasSlotLeft = pos.x === 1;
  const hasTabBottom = pos.y === 0;
  const hasSlotTop = pos.y === 1;

  let d = "";

  // Start top-left
  d += `M 0 0 `;

  // Top edge
  if (hasSlotTop) {
    const mid = w / 2;
    d += `L ${mid - neck} 0 `;
    d += `C ${mid - neck} ${tab}, ${mid + neck} ${tab}, ${mid + neck} 0 `;
    d += `L ${w} 0 `;
  } else {
    d += `L ${w} 0 `;
  }

  // Right edge
  if (hasTabRight) {
    const mid = h / 2;
    d += `L ${w} ${mid - neck} `;
    d += `C ${w + tab} ${mid - neck}, ${w + tab} ${mid + neck}, ${w} ${mid + neck} `;
    d += `L ${w} ${h} `;
  } else {
    d += `L ${w} ${h} `;
  }

  // Bottom edge (right to left)
  if (hasTabBottom) {
    const mid = w / 2;
    d += `L ${mid + neck} ${h} `;
    d += `C ${mid + neck} ${h + tab}, ${mid - neck} ${h + tab}, ${mid - neck} ${h} `;
    d += `L 0 ${h} `;
  } else {
    d += `L 0 ${h} `;
  }

  // Left edge (bottom to top)
  if (hasSlotLeft) {
    const mid = h / 2;
    d += `L 0 ${mid + neck} `;
    d += `C ${-tab} ${mid + neck}, ${-tab} ${mid - neck}, 0 ${mid - neck} `;
    d += `L 0 0 `;
  } else {
    d += `L 0 0 `;
  }

  d += "Z";
  return d;
}

const PIECE_W = 180;
const PIECE_H = 190;
const TAB = 16;
const NECK = 10;

const ModulePiece = ({ mod }: { mod: ModuleData }) => {
  const [showSubs, setShowSubs] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubs(true), (mod.delay + 1.0) * 1000);
    return () => clearTimeout(timer);
  }, [mod.delay]);

  const clipId = `puzzle-${mod.label}`;
  const path = useMemo(
    () => puzzlePath(PIECE_W, PIECE_H, mod.position, TAB, NECK),
    [mod.position]
  );

  // SVG viewBox needs extra space for tabs
  const vbX = mod.position.x === 1 ? -TAB : 0;
  const vbW = PIECE_W + TAB + (mod.position.x === 1 ? TAB : 0);
  const vbY = mod.position.y === 1 ? -TAB : 0;
  const vbH = PIECE_H + TAB + (mod.position.y === 1 ? TAB : 0);

  // Offset for clip-path positioning
  const marginLeft = mod.position.x === 1 ? -TAB : 0;
  const marginTop = mod.position.y === 1 ? -TAB : 0;

  return (
    <motion.div
      className="relative"
      style={{
        width: PIECE_W + (mod.position.x === 0 ? TAB : 0),
        height: PIECE_H + (mod.position.y === 0 ? TAB : 0),
        marginLeft: mod.position.x === 1 ? -TAB : 0,
        marginTop: mod.position.y === 1 ? -TAB : 0,
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
      {/* SVG for clip-path definition */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={path} />
          </clipPath>
        </defs>
      </svg>

      {/* Puzzle-shaped card */}
      <motion.div
        className="absolute inset-0 backdrop-blur-sm cursor-default overflow-visible"
        style={{
          clipPath: `url(#${clipId})`,
          backgroundColor: mod.color,
          boxShadow: `0 0 40px ${mod.glow}, inset 0 1px 0 ${mod.border}`,
        }}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.2 }}
      >
        {/* Border overlay via SVG */}
        <svg
          className="absolute pointer-events-none"
          style={{
            top: 0,
            left: 0,
            width: PIECE_W + TAB,
            height: PIECE_H + TAB,
            overflow: "visible",
          }}
        >
          <path
            d={path}
            fill="none"
            stroke={mod.border}
            strokeWidth="1.5"
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 p-4 pt-3">
          {/* Module header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{mod.icon}</span>
            <span className="text-xs font-bold text-foreground/90 tracking-wider uppercase">
              {mod.label}
            </span>
          </div>

          {/* Sub-pieces */}
          <div className="space-y-1.5">
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

            {/* 2x2 Grid of puzzle pieces */}
            <div className="relative grid grid-cols-2" style={{ gap: "2px" }}>
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
