import { motion } from "framer-motion";

const clients = [
  "Empresa Alpha", "TechCorp", "Global Dist.", "IndPro", "ComércioMax", "LogiTech", "SmartOps", "DataFlow"
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl h-20 flex items-center justify-center"
            >
              <span className="font-display font-semibold text-muted-foreground/60 text-sm tracking-wider uppercase">
                {client}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
