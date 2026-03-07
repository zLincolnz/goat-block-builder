import {
  DollarSign, ShoppingCart, Package, FileText, Settings, BarChart3, Users, Mail,
  CreditCard, Wallet, Building2, TrendingUp, Receipt, ShoppingBag, Target, Percent,
  Truck, ClipboardList, RotateCcw, ScanBarcode, FileCheck, Calculator, FileBadge,
  Gavel, Cog, Zap, ListChecks, Clock, PieChart, LineChart, Activity, Monitor,
  UserCheck, CalendarDays, BadgeDollarSign, GraduationCap, MessageSquare, Contact,
  Handshake, Megaphone, CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

export interface SubModule {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  demo?: React.ReactNode;
}

export interface ModuleCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  colorSolid: string;
  description: string;
  subModules: SubModule[];
}

// Mini demo components
export const MiniBarChart = ({ color }: { color: string }) => {
  const bars = [40, 65, 45, 80, 55, 70, 90];
  return (
    <div className="flex items-end gap-1 h-16">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="w-4 rounded-t-sm"
          style={{ backgroundColor: color, opacity: 0.7 + (i * 0.04) }}
        />
      ))}
    </div>
  );
};

export const MiniFunnel = ({ color }: { color: string }) => {
  const stages = [
    { label: "Leads", width: "100%" },
    { label: "Qualificados", width: "72%" },
    { label: "Proposta", width: "45%" },
    { label: "Fechados", width: "25%" },
  ];
  return (
    <div className="space-y-1.5 w-full max-w-[200px]">
      {stages.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: s.width, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
          className="h-5 rounded-r-md flex items-center px-2"
          style={{ backgroundColor: color, opacity: 0.5 + i * 0.15 }}
        >
          <span className="text-[9px] font-medium text-foreground/90 whitespace-nowrap">{s.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export const MiniChecklist = ({ color }: { color: string }) => {
  const items = ["Item verificado", "Item verificado", "Pendente"];
  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className="flex items-center gap-2 text-[10px]"
        >
          <div
            className="w-3.5 h-3.5 rounded-sm border flex items-center justify-center"
            style={{ borderColor: color, backgroundColor: i < 2 ? color : "transparent" }}
          >
            {i < 2 && <CheckCircle2 className="w-2.5 h-2.5 text-foreground" />}
          </div>
          <span className="text-foreground/70">{item}</span>
        </motion.div>
      ))}
    </div>
  );
};

export const MiniFlowCash = ({ color }: { color: string }) => {
  const data = [
    { label: "Jan", in: 35, out: 20 },
    { label: "Fev", in: 50, out: 30 },
    { label: "Mar", in: 40, out: 45 },
    { label: "Abr", in: 60, out: 25 },
  ];
  return (
    <div className="flex items-end gap-2 h-16">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <div className="flex gap-0.5 items-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${d.in}px` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="w-3 rounded-t-sm"
              style={{ backgroundColor: color, opacity: 0.8 }}
            />
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${d.out}px` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.05, duration: 0.4 }}
              className="w-3 rounded-t-sm bg-destructive/40"
            />
          </div>
          <span className="text-[8px] text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

export const MiniNFe = ({ color }: { color: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="rounded-lg border p-2.5 w-full max-w-[180px]"
    style={{ borderColor: color + "60" }}
  >
    <div className="flex items-center gap-1.5 mb-1.5">
      <FileCheck className="w-3 h-3" style={{ color }} />
      <span className="text-[9px] font-bold text-foreground/80">NF-e #00234</span>
    </div>
    <div className="space-y-0.5">
      <div className="text-[8px] text-muted-foreground">Valor: R$ 4.250,00</div>
      <div className="text-[8px] text-muted-foreground">Status: <span className="text-green-400 font-semibold">Autorizada</span></div>
    </div>
  </motion.div>
);

export const MiniGauge = ({ color, value = 78 }: { color: string; value?: number }) => (
  <div className="relative w-16 h-16">
    <svg viewBox="0 0 36 36" className="w-full h-full">
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="hsl(var(--muted))"
        strokeWidth="3"
      />
      <motion.path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray={`${value}, 100`}
        initial={{ strokeDasharray: "0, 100" }}
        whileInView={{ strokeDasharray: `${value}, 100` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-[10px] font-bold text-foreground/80">{value}%</span>
    </div>
  </div>
);

export const moduleCategories: ModuleCategory[] = [
  {
    id: "financeiro",
    name: "Financeiro",
    icon: <DollarSign className="w-5 h-5" />,
    color: "from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400",
    colorSolid: "rgb(139, 92, 246)",
    description: "Controle completo de todas as movimentações financeiras da sua empresa, com automação de cobranças, conciliações e visão em tempo real do fluxo de caixa.",
    subModules: [
      { id: "contas-pagar", name: "Contas a Pagar", icon: <CreditCard className="w-4 h-4" />, description: "Gerencie todos os pagamentos da empresa com controle de vencimentos, alertas automáticos e agendamento de pagamentos recorrentes.", demo: <MiniBarChart color="rgb(139, 92, 246)" /> },
      { id: "contas-receber", name: "Contas a Receber", icon: <Wallet className="w-4 h-4" />, description: "Acompanhe todos os recebíveis, envie cobranças automáticas e visualize a inadimplência em tempo real.", demo: <MiniBarChart color="rgb(139, 92, 246)" /> },
      { id: "conciliacao", name: "Conciliação Bancária", icon: <Building2 className="w-4 h-4" />, description: "Compare automaticamente os extratos bancários com os lançamentos internos, identificando divergências em segundos.", demo: <MiniChecklist color="rgb(139, 92, 246)" /> },
      { id: "fluxo-caixa", name: "Fluxo de Caixa", icon: <TrendingUp className="w-4 h-4" />, description: "Visualize entradas e saídas futuras, projete cenários e tome decisões baseadas em dados reais do seu caixa.", demo: <MiniFlowCash color="rgb(139, 92, 246)" /> },
      { id: "integracao-banco", name: "Integração com Banco", icon: <Building2 className="w-4 h-4" />, description: "Conecte sua conta bancária diretamente ao sistema para importar extratos e realizar pagamentos sem sair da plataforma." },
      { id: "dre", name: "DRE e Balanço", icon: <Receipt className="w-4 h-4" />, description: "Gere automaticamente Demonstração de Resultados e Balanço Patrimonial a partir dos dados já lançados no sistema.", demo: <MiniBarChart color="rgb(139, 92, 246)" /> },
    ],
  },
  {
    id: "vendas",
    name: "Vendas",
    icon: <ShoppingCart className="w-5 h-5" />,
    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400",
    colorSolid: "rgb(59, 130, 246)",
    description: "Do primeiro contato ao fechamento: gerencie todo o ciclo de vendas com funis visuais, comissões automáticas e tabelas de preço dinâmicas.",
    subModules: [
      { id: "pedidos", name: "Pedidos de Venda", icon: <ShoppingBag className="w-4 h-4" />, description: "Crie pedidos de venda rapidamente, com cálculo automático de impostos, descontos e condições de pagamento.", demo: <MiniNFe color="rgb(59, 130, 246)" /> },
      { id: "orcamentos", name: "Orçamentos", icon: <FileText className="w-4 h-4" />, description: "Monte orçamentos profissionais em minutos e envie direto ao cliente. Converta em pedido com um clique." },
      { id: "funil-vendas", name: "Funil de Vendas", icon: <Target className="w-4 h-4" />, description: "Visualize em qual etapa cada negociação está, identifique gargalos e preveja receita com base no pipeline.", demo: <MiniFunnel color="rgb(59, 130, 246)" /> },
      { id: "comissoes", name: "Comissões", icon: <Percent className="w-4 h-4" />, description: "Calcule comissões automaticamente com regras flexíveis por vendedor, produto ou faixa de faturamento.", demo: <MiniBarChart color="rgb(59, 130, 246)" /> },
      { id: "tabela-precos", name: "Tabela de Preços", icon: <Receipt className="w-4 h-4" />, description: "Crie múltiplas tabelas de preço por região, canal ou cliente, com reajustes automáticos programados." },
    ],
  },
  {
    id: "estoque",
    name: "Estoque",
    icon: <Package className="w-5 h-5" />,
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400",
    colorSolid: "rgb(245, 158, 11)",
    description: "Controle total do seu estoque em tempo real — entradas, saídas, devoluções, inventário e rastreabilidade por lote ou código de barras.",
    subModules: [
      { id: "controle-estoque", name: "Controle de Estoque", icon: <Package className="w-4 h-4" />, description: "Saiba exatamente a quantidade de cada produto em cada depósito, com alertas de estoque mínimo e máximo.", demo: <MiniGauge color="rgb(245, 158, 11)" value={62} /> },
      { id: "movimentacoes", name: "Movimentações", icon: <Truck className="w-4 h-4" />, description: "Registre automaticamente entradas por compra, saídas por venda e transferências entre filiais.", demo: <MiniBarChart color="rgb(245, 158, 11)" /> },
      { id: "inventario", name: "Inventário", icon: <ClipboardList className="w-4 h-4" />, description: "Realize contagens cíclicas ou completas com leitor de código de barras e ajuste automático de diferenças.", demo: <MiniChecklist color="rgb(245, 158, 11)" /> },
      { id: "devolucoes", name: "Devoluções", icon: <RotateCcw className="w-4 h-4" />, description: "Gerencie devoluções de clientes e fornecedores com rastreamento do motivo e reposição automática no estoque." },
      { id: "codigo-barras", name: "Código de Barras", icon: <ScanBarcode className="w-4 h-4" />, description: "Gere e imprima etiquetas com código de barras. Use leitores para agilizar entradas, saídas e inventário." },
    ],
  },
  {
    id: "fiscal",
    name: "Fiscal",
    icon: <FileText className="w-5 h-5" />,
    color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400",
    colorSolid: "rgb(16, 185, 129)",
    description: "Automatize toda a rotina fiscal: emissão de notas, cálculo de impostos, SPED e obrigações acessórias em conformidade com a legislação vigente.",
    subModules: [
      { id: "nfe", name: "Emissão de NF-e", icon: <FileCheck className="w-4 h-4" />, description: "Emita Notas Fiscais Eletrônicas diretamente do pedido de venda, com preenchimento automático de todos os campos obrigatórios.", demo: <MiniNFe color="rgb(16, 185, 129)" /> },
      { id: "impostos", name: "Cálculo de Impostos", icon: <Calculator className="w-4 h-4" />, description: "Calcule ICMS, IPI, PIS, COFINS e outros automaticamente com base no NCM, CFOP e regime tributário da empresa.", demo: <MiniBarChart color="rgb(16, 185, 129)" /> },
      { id: "sped", name: "SPED Fiscal", icon: <FileBadge className="w-4 h-4" />, description: "Gere os arquivos SPED Fiscal e SPED Contribuições automaticamente a partir dos dados já registrados." },
      { id: "obrigacoes", name: "Obrigações Acessórias", icon: <Gavel className="w-4 h-4" />, description: "Controle prazos e status de todas as obrigações fiscais, com alertas antes do vencimento para evitar multas.", demo: <MiniChecklist color="rgb(16, 185, 129)" /> },
    ],
  },
  {
    id: "operacional",
    name: "Operacional",
    icon: <Settings className="w-5 h-5" />,
    color: "from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400",
    colorSolid: "rgb(244, 63, 94)",
    description: "Automatize processos internos, crie checklists, defina SLAs e elimine tarefas manuais repetitivas em toda a operação.",
    subModules: [
      { id: "processos", name: "Gestão de Processos", icon: <Cog className="w-4 h-4" />, description: "Mapeie e padronize processos internos com fluxos visuais, garantindo que cada etapa seja executada corretamente." },
      { id: "automacoes", name: "Automações", icon: <Zap className="w-4 h-4" />, description: "Crie regras automáticas: quando X acontecer, faça Y. Elimine tarefas manuais e reduza erros humanos.", demo: <MiniChecklist color="rgb(244, 63, 94)" /> },
      { id: "tarefas", name: "Tarefas e Checklists", icon: <ListChecks className="w-4 h-4" />, description: "Distribua tarefas para a equipe com prazos, prioridades e checklists de conclusão.", demo: <MiniChecklist color="rgb(244, 63, 94)" /> },
      { id: "sla", name: "SLA e Prazos", icon: <Clock className="w-4 h-4" />, description: "Defina prazos máximos para cada processo e receba alertas quando estiverem próximos de estourar.", demo: <MiniGauge color="rgb(244, 63, 94)" value={85} /> },
    ],
  },
  {
    id: "dashboards",
    name: "Dashboards",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-indigo-400",
    colorSolid: "rgb(99, 102, 241)",
    description: "Painéis visuais em tempo real com KPIs, gráficos e relatórios que transformam dados brutos em decisões estratégicas.",
    subModules: [
      { id: "kpis", name: "KPIs em Tempo Real", icon: <PieChart className="w-4 h-4" />, description: "Acompanhe os indicadores mais importantes da empresa atualizados em tempo real, direto no painel.", demo: <MiniGauge color="rgb(99, 102, 241)" /> },
      { id: "relatorios", name: "Relatórios Gerenciais", icon: <LineChart className="w-4 h-4" />, description: "Gere relatórios detalhados por período, setor ou produto com exportação para PDF e Excel.", demo: <MiniBarChart color="rgb(99, 102, 241)" /> },
      { id: "bi", name: "Business Intelligence", icon: <Activity className="w-4 h-4" />, description: "Cruze dados de diferentes módulos para descobrir tendências, oportunidades e pontos de atenção.", demo: <MiniFlowCash color="rgb(99, 102, 241)" /> },
      { id: "painel-gestor", name: "Painel do Gestor", icon: <Monitor className="w-4 h-4" />, description: "Visão consolidada para diretoria: faturamento, margem, inadimplência e performance da equipe em uma só tela.", demo: <MiniGauge color="rgb(99, 102, 241)" value={92} /> },
    ],
  },
  {
    id: "rh",
    name: "RH & Pessoas",
    icon: <Users className="w-5 h-5" />,
    color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-400",
    colorSolid: "rgb(20, 184, 166)",
    description: "Gestão completa de pessoas: cadastros, controle de ponto, folha de pagamento e programas de treinamento integrados.",
    subModules: [
      { id: "colaboradores", name: "Cadastro de Colaboradores", icon: <UserCheck className="w-4 h-4" />, description: "Centralize todas as informações dos colaboradores: dados pessoais, cargo, salário, documentos e histórico." },
      { id: "ponto", name: "Controle de Ponto", icon: <CalendarDays className="w-4 h-4" />, description: "Registre e acompanhe a jornada de trabalho dos colaboradores com controle de horas extras e banco de horas.", demo: <MiniChecklist color="rgb(20, 184, 166)" /> },
      { id: "folha", name: "Folha de Pagamento", icon: <BadgeDollarSign className="w-4 h-4" />, description: "Calcule automaticamente salários, descontos, benefícios e encargos com base nos dados de ponto e contrato.", demo: <MiniBarChart color="rgb(20, 184, 166)" /> },
      { id: "treinamentos", name: "Treinamentos", icon: <GraduationCap className="w-4 h-4" />, description: "Crie programas de capacitação, acompanhe a participação e avalie o desempenho pós-treinamento.", demo: <MiniGauge color="rgb(20, 184, 166)" value={68} /> },
    ],
  },
  {
    id: "crm",
    name: "CRM",
    icon: <Mail className="w-5 h-5" />,
    color: "from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/30 text-fuchsia-400",
    colorSolid: "rgb(192, 38, 211)",
    description: "Relacionamento completo com o cliente: da captação de leads ao pós-venda, com campanhas automatizadas e histórico unificado.",
    subModules: [
      { id: "leads", name: "Gestão de Leads", icon: <MessageSquare className="w-4 h-4" />, description: "Capture leads de diferentes fontes, qualifique automaticamente e distribua para o time comercial.", demo: <MiniFunnel color="rgb(192, 38, 211)" /> },
      { id: "clientes", name: "Base de Clientes", icon: <Contact className="w-4 h-4" />, description: "Tenha todo o histórico do cliente em um só lugar: compras, interações, chamados e preferências." },
      { id: "pos-venda", name: "Pós-Venda", icon: <Handshake className="w-4 h-4" />, description: "Acompanhe a satisfação do cliente após a compra, gerencie chamados e garanta a recompra.", demo: <MiniGauge color="rgb(192, 38, 211)" value={88} /> },
      { id: "campanhas", name: "Campanhas", icon: <Megaphone className="w-4 h-4" />, description: "Crie campanhas de e-mail e remarketing segmentadas por perfil de cliente, com métricas de resultado.", demo: <MiniBarChart color="rgb(192, 38, 211)" /> },
    ],
  },
];
