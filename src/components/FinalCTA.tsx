import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Pare de adaptar sua empresa ao sistema.{" "}
            <span className="text-gradient">Adapte o sistema à sua empresa.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Comece hoje com os módulos que você precisa. Escale quando estiver pronto.
          </p>
          <Button
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow-lg gap-2 text-lg px-10 py-6"
          >
            Montar meu sistema agora
            <ArrowRight size={20} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
