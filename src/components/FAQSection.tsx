import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Preciso contratar todos os módulos de uma vez?",
    a: "Não! Você começa com o Plano Base (Core) e adiciona apenas os módulos que fazem sentido para o momento da sua empresa. Conforme cresce, pode ativar novos blocos sem perder nenhum dado.",
  },
  {
    q: "Quanto tempo leva a implantação?",
    a: "A implantação do Core leva em média 5 dias úteis. Cada módulo adicional é integrado em 2 a 3 dias. Todo o processo é acompanhado por nosso time de especialistas.",
  },
  {
    q: "Meus dados ficam seguros?",
    a: "Sim. Utilizamos criptografia de ponta a ponta, servidores em nuvem com certificação ISO 27001, backups automáticos diários e monitoramento 24/7.",
  },
  {
    q: "Consigo integrar com sistemas que já uso?",
    a: "Sim. A Goat possui APIs abertas e integrações nativas com os principais ERPs, bancos, marketplaces e ferramentas do mercado.",
  },
  {
    q: "Existe fidelidade ou multa de cancelamento?",
    a: "Não. Nossos planos são mensais e sem fidelidade. Você pode adicionar ou remover módulos a qualquer momento.",
  },
  {
    q: "Como funciona o suporte?",
    a: "Oferecemos suporte via chat, e-mail e telefone em horário comercial. Clientes do Plano Core têm acesso a um gerente de conta dedicado.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-4">
            <HelpCircle size={16} />
            Perguntas Frequentes
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Tire suas <span className="text-gradient">dúvidas</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tudo que você precisa saber antes de montar seu sistema.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass rounded-xl px-6 border border-border data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
