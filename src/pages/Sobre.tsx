import { motion } from "framer-motion";
import { Target, Eye, Heart, Compass, Users, Rocket, Lightbulb, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const mvvItems = [
  {
    icon: Target,
    title: "Missão",
    text: "Levar a inovação aos empreendedores e impulsionar a escalabilidade das empresas, convertendo negócios criados por necessidade em negócios guiados por oportunidade.",
    accent: "from-primary to-purple-600",
  },
  {
    icon: Eye,
    title: "Visão",
    text: "Se consolidar no mercado local como uma marca representativa gerando valor para os clientes, investidores e equipe, no curto prazo.",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    icon: Heart,
    title: "Valores",
    text: "Todas as atividades da empresa devem se embasar em sua missão e visão, assim como, na liberdade de ideias, inovação de processos, equidade entre os membros e excelência nos trabalhos realizados.",
    accent: "from-rose-500 to-orange-400",
  },
  {
    icon: Compass,
    title: "Propósito",
    text: "Transformar o Brasil através do empreendedorismo, convertendo necessidades em oportunidades e ideias em soluções.",
    accent: "from-emerald-500 to-teal-400",
  },
];

const founders = [
  {
    name: "Lincoln Ricardo Caetano Souto",
    role: "Estratégia Comercial & Expansão",
    description:
      "À frente da estratégia comercial e expansão, Lincoln foca em garantir que a solução chegue aos empreendedores que precisam escalar, mantendo um relacionamento de confiança e proximidade com o mercado.",
  },
  {
    name: "Caesar Altran",
    role: "Estrutura & Inteligência do Sistema",
    description:
      "Focado na estrutura e inteligência do sistema, Caesar garante que o Goat Ibex seja uma plataforma robusta e intuitiva, transformando complexidade técnica em simplicidade operacional para o usuário final.",
  },
];

const deliverables = [
  {
    icon: Lightbulb,
    title: "Visão 360°",
    text: "Integre Financeiro, Estoque, Vendas, Cadastro e Fiscal em uma única tela.",
  },
  {
    icon: Rocket,
    title: "Adeus às Tarefas Manuais",
    text: "Nossa automação permite importar extratos e realizar conciliações bancárias em minutos.",
  },
  {
    icon: Users,
    title: "Agilidade na Decisão",
    text: "Acesse qualquer informação estratégica da sua empresa em apenas 3 cliques, seja pelo computador, tablet ou celular.",
  },
];

const Sobre = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
              Sobre a{" "}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Goat
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Mais do que uma empresa de software, somos uma parceira estratégica focada em levar inovação e eficiência para a sua empresa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 md:p-12">
              <div className="absolute -top-3 left-8 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                Nossa História
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed mt-4">
                <p>
                  Entendemos que o recurso mais escasso de quem empreende é o <strong className="text-foreground">tempo</strong>. Por isso, não aceitamos que você o perca com processos manuais e burocracia.
                </p>
                <p>
                  Nascemos com uma missão clara: <strong className="text-foreground">transformar a mentalidade empreendedora</strong>, convertendo negócios criados por necessidade em negócios guiados por grandes oportunidades.
                </p>
                <p>
                  A Goat é liderada por quem entende as dores do mercado. Com a expertise de <strong className="text-foreground">Lincoln Ricardo Caetano Souto</strong> e <strong className="text-foreground">Caesar Altran</strong>, a empresa une expertise estratégica e tecnologia de ponta para resolver problemas reais.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fundadores */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-heading text-center mb-12"
          >
            Quem está por trás
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder, i) => (
              <motion.div
                key={founder.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="rounded-2xl border border-border/50 bg-card p-8 h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-1">{founder.name}</h3>
                  <p className="text-sm text-primary font-medium mb-4">{founder.role}</p>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {founder.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-muted-foreground mt-10 max-w-2xl mx-auto"
          >
            Juntos, desenvolveram o <strong className="text-foreground">Goat Ibex</strong>, uma plataforma criada com base nas necessidades reais dos clientes e não apenas em teorias de gestão.
          </motion.p>
        </div>
      </section>

      {/* MVV */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-heading text-center mb-4"
          >
            O que nos move
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mb-14 max-w-xl mx-auto"
          >
            Nossos pilares estratégicos que guiam cada decisão e entrega.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {mvvItems.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="rounded-2xl border border-border/50 bg-card p-6 h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center mb-5`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-heading mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* O que entregamos */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-heading text-center mb-12"
          >
            O que a Goat entrega ao seu negócio
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {deliverables.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold font-heading mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600" />
            <div className="relative z-10 p-10 md:p-16 text-center">
              <p className="text-primary-foreground/80 text-sm font-semibold tracking-widest uppercase mb-3">
                Goat Ibex
              </p>
              <h2 className="text-2xl md:text-4xl font-bold font-heading text-primary-foreground mb-4">
                Simplificando finanças, impulsionando negócios.
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Seja você um pequeno empresário, um gestor do agronegócio ou uma empresa de BPO, a Goat oferece a clareza financeira necessária para escalar seu negócio.
              </p>
              <Link
                to="/modulos"
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors"
              >
                Monte seu Sistema
                <Rocket className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;
