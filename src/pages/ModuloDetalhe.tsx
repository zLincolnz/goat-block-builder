import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { moduleCategories } from "@/data/moduleCategories";

const SubModuleCard = ({ sub, colorSolid, index }: { sub: any; colorSolid: string; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-all group"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <div
          className="p-2 rounded-lg shrink-0 mt-0.5"
          style={{ backgroundColor: colorSolid + "20" }}
        >
          <span style={{ color: colorSolid }}>{sub.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-sm text-foreground">{sub.name}</h4>
            <motion.div
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </motion.div>
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {sub.description}
          </p>
        </div>
      </button>

      {expanded && sub.demo && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pb-4 pt-1 border-t border-border/30"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Play className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
              Demonstração
            </span>
          </div>
          <div className="flex justify-center py-2">
            {sub.demo}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const ModuloDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const cat = moduleCategories.find((c) => c.id === id);

  if (!cat) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Módulo não encontrado</h1>
          <Link to="/modulos" className="text-primary hover:underline">
            Voltar aos módulos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />

      <section className="pt-28 pb-16 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/modulos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Monte seu Sistema
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-4 mb-10"
          >
            <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.color} shrink-0`}>
              {cat.icon}
            </div>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-3">
                {cat.name}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {cat.description}
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
            {cat.subModules.map((sub, i) => (
              <SubModuleCard key={sub.id} sub={sub} colorSolid={cat.colorSolid} index={i} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow gap-2">
              <Link to="/modulos">
                Montar Meu Sistema
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ModuloDetalhe;
