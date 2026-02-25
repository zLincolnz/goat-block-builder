const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-xl font-bold">
            <span className="text-gradient">GOAT</span>{" "}
            <span className="text-foreground/80">Ibex</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#solucao" className="hover:text-foreground transition-colors">Solução</a>
            <a href="#modulos" className="hover:text-foreground transition-colors">Módulos</a>
            <a href="#como-funciona" className="hover:text-foreground transition-colors">Como Funciona</a>
            <a href="#planos" className="hover:text-foreground transition-colors">Planos</a>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2025 Goat Tecnologia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
