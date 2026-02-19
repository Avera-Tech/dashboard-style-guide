import { CheckCircle2, Clock, AlertCircle, X } from "lucide-react";

// Types
export interface ContaBase {
  id: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  status: "pago" | "pendente" | "atrasado" | "cancelado";
  categoria: string;
  formaPagamento: string;
  parcela?: string;
  recorrencia?: string;
  observacoes?: string;
}

export interface ContaReceber extends ContaBase {
  aluno: string;
  produto?: string;
  tipoProduto?: "Plano" | "Avulso";
}

export interface ContaPagar extends ContaBase {
  fornecedor: string;
}

// Status config
export const statusConfig = {
  pago: { label: "Pago", variant: "default" as const, icon: CheckCircle2, className: "bg-success text-success-foreground" },
  pendente: { label: "Pendente", variant: "secondary" as const, icon: Clock, className: "bg-warning/15 text-warning border border-warning/30" },
  atrasado: { label: "Atrasado", variant: "destructive" as const, icon: AlertCircle, className: "bg-destructive/15 text-destructive border border-destructive/30" },
  cancelado: { label: "Cancelado", variant: "outline" as const, icon: X, className: "bg-muted text-muted-foreground" },
};

// Format helpers
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const formatDate = (dateStr: string) =>
  new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR");

// Mock data - Contas a Receber
export const MOCK_CONTAS_RECEBER: ContaReceber[] = [
  {
    id: "CR001",
    descricao: "Mensalidade Plano Mensal - Janeiro",
    valor: 249.90,
    dataVencimento: "2025-01-10",
    dataPagamento: "2025-01-09",
    status: "pago",
    categoria: "Mensalidade",
    formaPagamento: "Cartão de Crédito",
    aluno: "João Silva",
    produto: "Plano Mensal",
    tipoProduto: "Plano",
    recorrencia: "Mensal",
    parcela: "1/12",
  },
  {
    id: "CR002",
    descricao: "Aula Avulsa - Tênis",
    valor: 80.00,
    dataVencimento: "2025-01-15",
    status: "pendente",
    categoria: "Aula Avulsa",
    formaPagamento: "PIX",
    aluno: "Maria Oliveira",
    produto: "Aula Avulsa",
    tipoProduto: "Avulso",
  },
  {
    id: "CR003",
    descricao: "Mensalidade Plano Trimestral - Janeiro",
    valor: 649.90,
    dataVencimento: "2025-01-05",
    status: "atrasado",
    categoria: "Mensalidade",
    formaPagamento: "Boleto",
    aluno: "Carlos Santos",
    produto: "Plano Trimestral",
    tipoProduto: "Plano",
    recorrencia: "Trimestral",
    parcela: "1/4",
    observacoes: "Entrar em contato para negociar",
  },
  {
    id: "CR004",
    descricao: "Mensalidade Plano Mensal - Janeiro",
    valor: 249.90,
    dataVencimento: "2025-01-10",
    dataPagamento: "2025-01-10",
    status: "pago",
    categoria: "Mensalidade",
    formaPagamento: "PIX",
    aluno: "Ana Costa",
    produto: "Plano Mensal",
    tipoProduto: "Plano",
    recorrencia: "Mensal",
    parcela: "3/12",
  },
  {
    id: "CR005",
    descricao: "Aula Avulsa - Beach Tennis",
    valor: 90.00,
    dataVencimento: "2025-01-20",
    status: "pendente",
    categoria: "Aula Avulsa",
    formaPagamento: "Dinheiro",
    aluno: "Pedro Lima",
    produto: "Aula Avulsa Beach",
    tipoProduto: "Avulso",
  },
  {
    id: "CR006",
    descricao: "Mensalidade Plano Semestral - Janeiro",
    valor: 1199.90,
    dataVencimento: "2025-01-01",
    dataPagamento: "2024-12-30",
    status: "pago",
    categoria: "Mensalidade",
    formaPagamento: "Cartão de Crédito",
    aluno: "Fernanda Rocha",
    produto: "Plano Semestral",
    tipoProduto: "Plano",
    recorrencia: "Semestral",
    parcela: "2/2",
  },
  {
    id: "CR007",
    descricao: "Mensalidade Plano Mensal - Janeiro",
    valor: 249.90,
    dataVencimento: "2025-01-10",
    status: "cancelado",
    categoria: "Mensalidade",
    formaPagamento: "Boleto",
    aluno: "Ricardo Mendes",
    produto: "Plano Mensal",
    tipoProduto: "Plano",
    recorrencia: "Mensal",
    observacoes: "Aluno cancelou matrícula",
  },
];

// Mock data - Contas a Pagar
export const MOCK_CONTAS_PAGAR: ContaPagar[] = [
  {
    id: "CP001",
    descricao: "Aluguel da quadra - Janeiro",
    valor: 3500.00,
    dataVencimento: "2025-01-05",
    dataPagamento: "2025-01-04",
    status: "pago",
    categoria: "Aluguel",
    formaPagamento: "Transferência",
    fornecedor: "Imobiliária Central",
    recorrencia: "Mensal",
  },
  {
    id: "CP002",
    descricao: "Conta de Energia - Janeiro",
    valor: 890.00,
    dataVencimento: "2025-01-20",
    status: "pendente",
    categoria: "Utilidades",
    formaPagamento: "Boleto",
    fornecedor: "Enel SP",
    recorrencia: "Mensal",
  },
  {
    id: "CP003",
    descricao: "Salário Professor João",
    valor: 4200.00,
    dataVencimento: "2025-01-05",
    dataPagamento: "2025-01-05",
    status: "pago",
    categoria: "Folha de Pagamento",
    formaPagamento: "Transferência",
    fornecedor: "João Ferreira (Professor)",
    recorrencia: "Mensal",
  },
  {
    id: "CP004",
    descricao: "Material esportivo - Bolas de tênis",
    valor: 450.00,
    dataVencimento: "2025-01-08",
    status: "atrasado",
    categoria: "Material",
    formaPagamento: "Boleto",
    fornecedor: "Sports Center LTDA",
    parcela: "2/3",
    observacoes: "Aguardando aprovação do financeiro",
  },
  {
    id: "CP005",
    descricao: "Manutenção da quadra",
    valor: 1200.00,
    dataVencimento: "2025-01-25",
    status: "pendente",
    categoria: "Manutenção",
    formaPagamento: "PIX",
    fornecedor: "QuadraTech Serviços",
  },
  {
    id: "CP006",
    descricao: "Software de gestão - Mensalidade",
    valor: 199.90,
    dataVencimento: "2025-01-15",
    dataPagamento: "2025-01-15",
    status: "pago",
    categoria: "Software",
    formaPagamento: "Cartão de Crédito",
    fornecedor: "TechSoft",
    recorrencia: "Mensal",
  },
];
