import { motion } from "framer-motion";
import { Play, Monitor } from "lucide-react";
import { useState } from "react";

const DemoVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Monitor className="w-4 h-4" />
            Demonstração
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Veja o sistema <span className="text-gradient">em ação</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Assista como os módulos se conectam e transformam a gestão da sua empresa em um ambiente único, inteligente e integrado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-glow-lg border border-border bg-card">
            {/* Aspect ratio container 16:9 */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              {!isPlaying ? (
                /* Thumbnail / Placeholder */
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-primary/10 flex flex-col items-center justify-center">
                  {/* Decorative grid */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                  </div>

                  {/* Play button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(true)}
                    className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow cursor-pointer group"
                  >
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" />
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                  </motion.button>

                  <p className="mt-6 text-muted-foreground font-medium text-sm md:text-base">
                    Clique para assistir a demonstração
                  </p>

                  {/* Floating module labels */}
                  {["Financeiro", "Vendas", "Estoque", "Dashboards"].map(
                    (label, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                        className="absolute text-xs font-medium px-3 py-1.5 rounded-full glass text-foreground/70"
                        style={{
                          top: `${20 + (i % 2) * 55}%`,
                          left: i < 2 ? `${6 + i * 4}%` : "auto",
                          right: i >= 2 ? `${6 + (i - 2) * 4}%` : "auto",
                        }}
                      >
                        🧩 {label}
                      </motion.div>
                    )
                  )}
                </div>
              ) : (
                /* Video embed – replace the src with your real video URL */
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                  title="Demonstração Goat Tecnologia"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-muted-foreground text-sm mt-4">
            Demonstração completa do sistema modular Goat em funcionamento
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoVideoSection;
