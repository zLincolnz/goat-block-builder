import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  shape: "square" | "circle" | "diamond" | "hexagon";
  rotation: number;
  rotationSpeed: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
  depth: number; // 0.3 to 1.0 — parallax layer
}

const COLORS = [
  "hsla(275, 85%, 55%, 0.08)",
  "hsla(280, 90%, 60%, 0.06)",
  "hsla(43, 100%, 55%, 0.07)",
  "hsla(275, 60%, 70%, 0.05)",
  "hsla(270, 40%, 80%, 0.04)",
];

const LINE_COLOR_BASE = "hsla(275, 50%, 60%,";
const LINE_COLOR_GOLD = "hsla(43, 80%, 55%,";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);

    const count = Math.min(Math.floor((canvas.width * canvas.height) / 30000), 90);
    const nodes: Node[] = [];
    const shapes: Node["shape"][] = ["square", "circle", "diamond", "hexagon"];

    for (let i = 0; i < count; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const depth = 0.3 + Math.random() * 0.7; // parallax depth
      const yPos = Math.random() * canvas.height;
      nodes.push({
        x: Math.random() * canvas.width,
        y: yPos,
        baseY: yPos,
        vx: (Math.random() - 0.5) * 0.2 * depth,
        vy: (Math.random() - 0.5) * 0.15 * depth,
        size: (shape === "circle" ? Math.random() * 3 + 2 : Math.random() * 14 + 6) * (0.6 + depth * 0.4),
        opacity: 1,
        shape,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.003 * depth,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.01,
        depth,
      });
    }
    nodesRef.current = nodes;

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener("mousemove", handleMouse);

    let time = 0;

    const drawHexagon = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = Math.cos(angle) * size * 0.5;
        const y = Math.sin(angle) * size * 0.5;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const drawNode = (ctx: CanvasRenderingContext2D, n: Node, pulse: number) => {
      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.rotate(n.rotation);
      ctx.fillStyle = n.color;

      const s = n.size * (1 + pulse * 0.15);

      switch (n.shape) {
        case "square": {
          const r = 2;
          const w = s;
          const h = s * 0.7;
          ctx.beginPath();
          ctx.moveTo(-w / 2 + r, -h / 2);
          ctx.lineTo(w / 2 - r, -h / 2);
          ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
          ctx.lineTo(w / 2, h / 2 - r);
          ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
          ctx.lineTo(-w / 2 + r, h / 2);
          ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
          ctx.lineTo(-w / 2, -h / 2 + r);
          ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
          ctx.closePath();
          ctx.fill();
          // Subtle stroke for "block" feel
          ctx.strokeStyle = n.color.replace(/[\d.]+\)$/, "0.12)");
          ctx.lineWidth = 0.5;
          ctx.stroke();
          break;
        }
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, s, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "diamond":
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.45);
          ctx.lineTo(s * 0.35, 0);
          ctx.lineTo(0, s * 0.45);
          ctx.lineTo(-s * 0.35, 0);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = n.color.replace(/[\d.]+\)$/, "0.1)");
          ctx.lineWidth = 0.5;
          ctx.stroke();
          break;
        case "hexagon":
          drawHexagon(ctx, s);
          ctx.fill();
          ctx.strokeStyle = n.color.replace(/[\d.]+\)$/, "0.1)");
          ctx.lineWidth = 0.5;
          ctx.stroke();
          break;
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      const scrollY = window.scrollY;
      const viewTop = scrollY - 300;
      const viewBottom = scrollY + window.innerHeight + 300;

      // Update & draw nodes with parallax
      for (const n of nodes) {
        n.baseY += n.vy;
        n.x += n.vx;
        n.rotation += n.rotationSpeed;
        n.pulsePhase += n.pulseSpeed;

        // Parallax offset: deeper nodes (depth~1) move with scroll, shallow ones lag behind
        const parallaxOffset = scrollY * (1 - n.depth) * 0.15;
        n.y = n.baseY - parallaxOffset;

        if (n.x < -60) n.x = canvas.width + 60;
        if (n.x > canvas.width + 60) n.x = -60;
        if (n.baseY < -60) n.baseY = canvas.height + 60;
        if (n.baseY > canvas.height + 60) n.baseY = -60;

        if (n.y < viewTop || n.y > viewBottom) continue;

        // Mouse interaction — gentle attraction instead of repulsion
        const dx = mouseRef.current.x - n.x;
        const dy = mouseRef.current.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 30) {
          const force = (200 - dist) / 200 * 0.02;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        } else if (dist <= 30) {
          n.vx -= (dx / dist) * 0.05;
          n.vy -= (dy / dist) * 0.05;
        }

        n.vx *= 0.998;
        n.vy *= 0.998;

        const pulse = Math.sin(n.pulsePhase);
        drawNode(ctx, n, pulse);
      }

      // Connection lines — data flow aesthetic
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (a.y < viewTop || a.y > viewBottom) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.y < viewTop || b.y > viewBottom) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = 0.06 * (1 - dist / 140);
            
            // Alternate between purple and gold connections
            const isGold = (i + j) % 7 === 0;
            const lineColor = isGold ? LINE_COLOR_GOLD : LINE_COLOR_BASE;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `${lineColor} ${alpha})`;
            ctx.lineWidth = isGold ? 0.8 : 0.5;
            ctx.stroke();

            // Data flow dots on some connections
            if (dist < 80 && (i + j) % 3 === 0) {
              const t = (Math.sin(time * 0.02 + i) + 1) / 2;
              const dotX = a.x + (b.x - a.x) * t;
              const dotY = a.y + (b.y - a.y) * t;
              ctx.beginPath();
              ctx.arc(dotX, dotY, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = isGold
                ? `hsla(43, 100%, 55%, ${alpha * 3})`
                : `hsla(275, 85%, 60%, ${alpha * 3})`;
              ctx.fill();
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouse);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default AnimatedBackground;
