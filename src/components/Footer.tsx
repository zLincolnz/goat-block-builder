import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Instagram, Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/logo-purple.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const solutions = [
    { label: "Módulo Financeiro", href: "#modulos" },
    { label: "Módulo Vendas", href: "#modulos" },
    { label: "Módulo Estoque", href: "#modulos" },
    { label: "Módulo Fiscal", href: "#modulos" },
    { label: "Módulo Operacional", href: "#modulos" },
    { label: "Dashboards BI", href: "#modulos" },
  ];

  const empresa = [
    { label: "Sobre a Goat", href: "#" },
    { label: "Clientes", href: "#clientes" },
    { label: "Blog", href: "#" },
    { label: "Carreiras", href: "#" },
    { label: "Contato", href: "#contato" },
  ];

  const recursos = [
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Planos", href: "#planos" },
    { label: "FAQ", href: "#faq" },
    { label: "Documentação", href: "#" },
    { label: "Suporte", href: "#" },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-foreground/[0.03]">
      {/* Newsletter / CTA strip */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                Fique por dentro das novidades
              </h3>
              <p className="text-sm text-muted-foreground">
                Receba dicas de gestão, tecnologia e atualizações do sistema.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm flex-1 md:w-72 focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/60"
              />
              <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 gap-2">
                Inscrever
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="#" className="inline-block mb-4">
              <img src={logoImg} alt="Goat" className="h-10 w-auto" />
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Sistema modular e inteligente para integração e automação de processos empresariais.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Soluções */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Soluções
            </h4>
            <ul className="space-y-2.5">
              {solutions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Recursos
            </h4>
            <ul className="space-y-2.5">
              {recursos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:contato@goatibex.com.br" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  contato@goatibex.com.br
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="text-accent mt-0.5 flex-shrink-0" />
                <a href="tel:+5511999999999" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  São Paulo, SP – Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Goat Tecnologia. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-foreground transition-colors">LGPD</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
