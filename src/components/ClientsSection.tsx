import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const clients = [
  "Empresa Alpha", "TechCorp", "Global Dist.", "IndPro", "ComércioMax", "LogiTech", "SmartOps", "DataFlow"
];

const testimonials = [
  {
    name: "Ricardo Mendes",
    role: "CEO, Empresa Alpha",
    text: "A Goat transformou nossa gestão. Antes tínhamos 5 sistemas diferentes, hoje tudo está integrado em um só lugar. Reduzimos o retrabalho em 60%.",
    initials: "RM",
  },
  {
    name: "Fernanda Costa",
    role: "Diretora de Operações, TechCorp",
    text: "O conceito modular é genial. Começamos com o financeiro e hoje já temos vendas, estoque e dashboards. Crescemos sem trocar de sistema.",
    initials: "FC",
  },
  {
    name: "Carlos Eduardo",
    role: "Gerente Comercial, Global Dist.",
    text: "Nosso time de vendas ganhou agilidade absurda. Os relatórios em tempo real mudaram a forma como tomamos decisões estratégicas.",
    initials: "CE",
  },
];

const ClientsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Quem <span className="text-gradient">confia</span> na Goat
          </h2>
          <p className="text-muted-foreground">Empresas que transformaram sua gestão com o sistema modular.</p>
        </motion.div>

        {/* Marquee logos */}
        <div className="relative overflow-hidden mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex animate-marquee w-max">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`${client}-${i}`}
                className="flex-shrink-0 mx-8 h-16 px-8 flex items-center justify-center rounded-xl border border-border bg-card"
              >
                <span className="font-display font-semibold text-muted-foreground text-sm tracking-wider uppercase whitespace-nowrap">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="font-display text-2xl font-bold mb-2">
            O que nossos clientes <span className="text-gradient">dizem</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
