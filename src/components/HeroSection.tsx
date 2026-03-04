import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

// Puzzle piece SVG path with interlocking tabs
const puzzlePath = (tabs: { top: number; right: number; bottom: number; left: number }) => {
  const s = 100; // piece size
  const t = 18; // tab size
  const r = 8; // tab radius

  const tabBump = (dir: number) => {
    if (dir === 0) return "";
    const sign = dir === 1 ? 1 : -1;
    return `c 0 0, ${sign * t * 0.4} ${-sign * r * 0.5}, ${sign * t * 0.5} ${-sign * r}
            a ${r} ${r} 0 1 ${dir === 1 ? 1 : 0} ${sign * t} 0
            c ${sign * t * 0.1} ${sign * r * 0.5}, ${sign * t * 0.5} ${sign * r}, ${sign * t * 0.5} ${sign * r}`;
  };

  // Build path clockwise: top, right, bottom, left
  // Simplified approach with actual puzzle connectors
  return generatePuzzleSVG(tabs);
};

// Generate puzzle piece as SVG path
const generatePuzzleSVG = (tabs: { top: number; right: number; bottom: number; left: number }) => {
  const w = 120;
  const h = 100;
  const tab = 16;
  const neck = 6;

  let d = `M 0 0`;

  // Top edge
  if (tabs.top !== 0) {
    d += ` L ${w / 2 - neck} 0`;
    d += tabs.top === 1
      ? ` C ${w / 2 - neck} ${-tab * 0.3}, ${w / 2 - tab} ${-tab}, ${w / 2} ${-tab}
         C ${w / 2 + tab} ${-tab}, ${w / 2 + neck} ${-tab * 0.3}, ${w / 2 + neck} 0`
      : ` C ${w / 2 - neck} ${tab * 0.3}, ${w / 2 - tab} ${tab}, ${w / 2} ${tab}
         C ${w / 2 + tab} ${tab}, ${w / 2 + neck} ${tab * 0.3}, ${w / 2 + neck} 0`;
    d += ` L ${w} 0`;
  } else {
    d += ` L ${w} 0`;
  }

  // Right edge
  if (tabs.right !== 0) {
    d += ` L ${w} ${h / 2 - neck}`;
    d += tabs.right === 1
      ? ` C ${w + tab * 0.3} ${h / 2 - neck}, ${w + tab} ${h / 2 - tab}, ${w + tab} ${h / 2}
         C ${w + tab} ${h / 2 + tab}, ${w + tab * 0.3} ${h / 2 + neck}, ${w} ${h / 2 + neck}`
      : ` C ${w - tab * 0.3} ${h / 2 - neck}, ${w - tab} ${h / 2 - tab}, ${w - tab} ${h / 2}
         C ${w - tab} ${h / 2 + tab}, ${w - tab * 0.3} ${h / 2 + neck}, ${w} ${h / 2 + neck}`;
    d += ` L ${w} ${h}`;
  } else {
    d += ` L ${w} ${h}`;
  }

  // Bottom edge (right to left)
  if (tabs.bottom !== 0) {
    d += ` L ${w / 2 + neck} ${h}`;
    d += tabs.bottom === 1
      ? ` C ${w / 2 + neck} ${h + tab * 0.3}, ${w / 2 + tab} ${h + tab}, ${w / 2} ${h + tab}
         C ${w / 2 - tab} ${h + tab}, ${w / 2 - neck} ${h + tab * 0.3}, ${w / 2 - neck} ${h}`
      : ` C ${w / 2 + neck} ${h - tab * 0.3}, ${w / 2 + tab} ${h - tab}, ${w / 2} ${h - tab}
         C ${w / 2 - tab} ${h - tab}, ${w / 2 - neck} ${h - tab * 0.3}, ${w / 2 - neck} ${h}`;
    d += ` L 0 ${h}`;
  } else {
    d += ` L 0 ${h}`;
  }

  // Left edge (bottom to top)
  if (tabs.left !== 0) {
    d += ` L 0 ${h / 2 + neck}`;
    d += tabs.left === 1
      ? ` C ${-tab * 0.3} ${h / 2 + neck}, ${-tab} ${h / 2 + tab}, ${-tab} ${h / 2}
         C ${-tab} ${h / 2 - tab}, ${-tab * 0.3} ${h / 2 - neck}, 0 ${h / 2 - neck}`
      : ` C ${tab * 0.3} ${h / 2 + neck}, ${tab} ${h / 2 + tab}, ${tab} ${h / 2}
         C ${tab} ${h / 2 - tab}, ${tab * 0.3} ${h / 2 - neck}, 0 ${h / 2 - neck}`;
    d += ` L 0 0`;
  } else {
    d += ` L 0 0`;
  }

  d += " Z";
  return d;
};

interface PuzzlePieceData {
  label: string;
  icon: string;
  color: string;
  stroke: string;
  glow: string;
  tabs: { top: number; right: number; bottom: number; left: number };
  finalX: number;
  finalY: number;
  startX: number;
  startY: number;
  startRotation: number;
  delay: number;
}

const pieces: PuzzlePieceData[] = [
  {
    label: "Financeiro",
    icon: "💰",
    color: "hsl(275, 60%, 25%)",
    stroke: "hsl(275, 85%, 55%)",
    glow: "hsl(275, 85%, 55%)",
    tabs: { top: 0, right: 1, bottom: 1, left: 0 },
    finalX: 0, finalY: 0,
    startX: -180, startY: -120, startRotation: -25,
    delay: 0.8,
  },
  {
    label: "Vendas",
    icon: "📊",
    color: "hsl(43, 50%, 25%)",
    stroke: "hsl(43, 100%, 55%)",
    glow: "hsl(43, 100%, 55%)",
    tabs: { top: 0, right: 0, bottom: 1, left: -1 },
    finalX: 120, finalY: 0,
    startX: 300, startY: -100, startRotation: 30,
    delay: 1.2,
  },
  {
    label: "Estoque",
    icon: "📦",
    color: "hsl(160, 50%, 20%)",
    stroke: "hsl(160, 70%, 45%)",
    glow: "hsl(160, 70%, 45%)",
    tabs: { top: -1, right: 1, bottom: 0, left: 0 },
    finalX: 0, finalY: 100,
    startX: -200, startY: 250, startRotation: 20,
    delay: 1.6,
  },
  {
    label: "Fiscal",
    icon: "📋",
    color: "hsl(210, 50%, 22%)",
    stroke: "hsl(210, 80%, 55%)",
    glow: "hsl(210, 80%, 55%)",
    tabs: { top: -1, right: 0, bottom: 0, left: -1 },
    finalX: 120, finalY: 100,
    startX: 280, startY: 260, startRotation: -35,
    delay: 2.0,
  },
  {
    label: "GOAT",
    icon: "⚡",
    color: "hsl(275, 70%, 30%)",
    stroke: "hsl(43, 100%, 55%)",
    glow: "hsl(43, 100%, 55%)",
    tabs: { top: 0, right: 0, bottom: 0, left: 0 },
    finalX: 50, finalY: 42,
    startX: 50, startY: -200, startRotation: 0,
    delay: 2.6,
  },
];

const AnimatedPuzzlePiece = ({ piece }: { piece: PuzzlePieceData }) => {
  const path = generatePuzzleSVG(piece.tabs);
  const isCore = piece.label === "GOAT";

  return (
    <motion.g
      initial={{
        x: piece.startX,
        y: piece.startY,
        rotate: piece.startRotation,
        opacity: 0,
      }}
      animate={{
        x: piece.finalX,
        y: piece.finalY,
        rotate: 0,
        opacity: 1,
      }}
      transition={{
        delay: piece.delay,
        duration: 1.2,
        type: "spring",
        stiffness: 60,
        damping: 14,
      }}
    >
      {/* Glow filter */}
      <defs>
        <filter id={`glow-${piece.label}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor={piece.glow} floodOpacity="0.3" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`grad-${piece.label}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={piece.color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={piece.color} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {!isCore && (
        <path
          d={path}
          fill={`url(#grad-${piece.label})`}
          stroke={piece.stroke}
          strokeWidth="1.5"
          strokeOpacity="0.6"
          filter={`url(#glow-${piece.label})`}
        />
      )}

      {isCore ? (
        <>
          <rect
            x="25"
            y="20"
            width="70"
            height="60"
            rx="12"
            fill="url(#coreGrad)"
            stroke="hsl(43, 100%, 55%)"
            strokeWidth="2"
            strokeOpacity="0.8"
            filter={`url(#glow-${piece.label})`}
          />
          <text
            x="60"
            y="48"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="800"
            fontFamily="inherit"
          >
            GOAT
          </text>
          <text
            x="60"
            y="63"
            textAnchor="middle"
            fill="hsla(43, 100%, 70%, 0.9)"
            fontSize="9"
            fontWeight="600"
          >
            Core
          </text>
        </>
      ) : (
        <>
          <text x="60" y="42" textAnchor="middle" fontSize="22">
            {piece.icon}
          </text>
          <text
            x="60"
            y="65"
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="700"
            opacity="0.9"
          >
            {piece.label}
          </text>
        </>
      )}
    </motion.g>
  );
};

// Particle that flies in when pieces connect
const ConnectionSpark = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.circle
    cx={x}
    cy={y}
    r="2"
    fill="hsl(43, 100%, 60%)"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 2, 0],
      y: [y, y - 15],
    }}
    transition={{
      delay,
      duration: 0.6,
      ease: "easeOut",
    }}
  />
);

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
            {/* Ambient glow behind puzzle */}
            <div className="absolute w-[320px] h-[280px] bg-primary/10 blur-[60px] rounded-full" />
            <div className="absolute w-[200px] h-[200px] bg-accent/8 blur-[50px] rounded-full translate-x-8 translate-y-4" />

            <svg
              viewBox="-50 -50 300 260"
              className="w-full max-w-[520px] h-auto relative z-10"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(275, 85%, 45%)" />
                  <stop offset="100%" stopColor="hsl(275, 70%, 35%)" />
                </linearGradient>
              </defs>

              {/* Puzzle pieces */}
              {pieces.map((piece) => (
                <AnimatedPuzzlePiece key={piece.label} piece={piece} />
              ))}

              {/* Connection sparks where pieces meet */}
              <ConnectionSpark delay={2.2} x={120} y={50} />
              <ConnectionSpark delay={2.2} x={125} y={55} />
              <ConnectionSpark delay={2.6} x={60} y={100} />
              <ConnectionSpark delay={2.6} x={55} y={95} />
              <ConnectionSpark delay={3.0} x={120} y={100} />
              <ConnectionSpark delay={3.0} x={125} y={105} />

              {/* Subtle floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.circle
                  key={`p-${i}`}
                  cx={-20 + Math.random() * 240}
                  cy={-20 + Math.random() * 220}
                  r="1"
                  fill="hsl(275, 80%, 60%)"
                  fillOpacity="0.4"
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </svg>

            {/* Labels floating around puzzle */}
            {[
              { text: "Contas a Pagar", x: "-left-4", y: "top-[20%]", delay: 3.2 },
              { text: "NF-e", x: "-right-2", y: "top-[25%]", delay: 3.4 },
              { text: "Inventário", x: "-left-2", y: "bottom-[25%]", delay: 3.6 },
              { text: "Comissões", x: "-right-4", y: "bottom-[20%]", delay: 3.8 },
            ].map((tag) => (
              <motion.div
                key={tag.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tag.delay, duration: 0.5 }}
                className={`absolute ${tag.x} ${tag.y} px-2.5 py-1 rounded-md border border-primary/20 bg-card/80 backdrop-blur-sm text-[10px] font-medium text-muted-foreground`}
              >
                {tag.text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
