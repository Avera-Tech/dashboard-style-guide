import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Search,
  X,
  FileText,
  CalendarDays,
  User,
  CreditCard,
  Receipt,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Types
interface ContaBase {
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

interface ContaReceber extends ContaBase {
  aluno: string;
  produto?: string;
  tipoProduto?: "Plano" | "Avulso";
}

interface ContaPagar extends ContaBase {
  fornecedor: string;
}

// Status config
const statusConfig = {
  pago: { label: "Pago", variant: "default" as const, icon: CheckCircle2, className: "bg-success text-success-foreground" },
  pendente: { label: "Pendente", variant: "secondary" as const, icon: Clock, className: "bg-warning/15 text-warning border border-warning/30" },
  atrasado: { label: "Atrasado", variant: "destructive" as const, icon: AlertCircle, className: "bg-destructive/15 text-destructive border border-destructive/30" },
  cancelado: { label: "Cancelado", variant: "outline" as const, icon: X, className: "bg-muted text-muted-foreground" },
};

// Mock data - Contas a Receber
const MOCK_CONTAS_RECEBER: ContaReceber[] = [
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
const MOCK_CONTAS_PAGAR: ContaPagar[] = [
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

// Format helpers
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const formatDate = (dateStr: string) =>
  new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR");

// Reusable filter card
const FilterCard = ({
  filterName,
  setFilterName,
  filterStatus,
  setFilterStatus,
  filterCategoria,
  setFilterCategoria,
  categorias,
  onClear,
  entityLabel,
}: {
  filterName: string;
  setFilterName: (v: string) => void;
  filterStatus: string;
  setFilterStatus: (v: string) => void;
  filterCategoria: string;
  setFilterCategoria: (v: string) => void;
  categorias: string[];
  onClear: () => void;
  entityLabel: string;
}) => (
  <Card className="border-border">
    <CardContent className="p-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[180px]">
          <Label className="text-xs text-muted-foreground mb-1.5 block">Descrição / {entityLabel}</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>
        <div className="min-w-[140px]">
          <Label className="text-xs text-muted-foreground mb-1.5 block">Status</Label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="atrasado">Atrasado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-[160px]">
          <Label className="text-xs text-muted-foreground mb-1.5 block">Categoria</Label>
          <Select value={filterCategoria} onValueChange={setFilterCategoria}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categorias.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" className="h-9" onClick={onClear}>
          <X className="h-3.5 w-3.5 mr-1" />
          Limpar
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Detail dialog
const ContaDetailDialog = ({
  open,
  onOpenChange,
  conta,
  tipo,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  conta: (ContaReceber | ContaPagar) | null;
  tipo: "receber" | "pagar";
}) => {
  if (!conta) return null;
  const status = statusConfig[conta.status];
  const StatusIcon = status.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Detalhes da Conta
          </DialogTitle>
          <DialogDescription>
            {tipo === "receber" ? "Conta a Receber" : "Conta a Pagar"} — {conta.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">{formatCurrency(conta.valor)}</span>
            <Badge className={status.className}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {status.label}
            </Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Descrição</p>
              <p className="font-medium text-foreground">{conta.descricao}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Categoria</p>
              <p className="font-medium text-foreground">{conta.categoria}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Vencimento</p>
              <p className="font-medium text-foreground">{formatDate(conta.dataVencimento)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Pagamento</p>
              <p className="font-medium text-foreground">{conta.dataPagamento ? formatDate(conta.dataPagamento) : "—"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Forma de Pagamento</p>
              <p className="font-medium text-foreground">{conta.formaPagamento}</p>
            </div>
            {conta.parcela && (
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Parcela</p>
                <p className="font-medium text-foreground">{conta.parcela}</p>
              </div>
            )}
            {conta.recorrencia && (
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Recorrência</p>
                <p className="font-medium text-foreground">{conta.recorrencia}</p>
              </div>
            )}
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">{tipo === "receber" ? "Aluno" : "Fornecedor"}</p>
              <p className="font-medium text-foreground">
                {tipo === "receber" ? (conta as ContaReceber).aluno : (conta as ContaPagar).fornecedor}
              </p>
            </div>
            {tipo === "receber" && (conta as ContaReceber).produto && (
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Produto</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{(conta as ContaReceber).produto}</p>
                  {(conta as ContaReceber).tipoProduto && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {(conta as ContaReceber).tipoProduto}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {conta.observacoes && (
            <>
              <Separator />
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Observações</p>
                <p className="text-sm text-foreground bg-muted/50 rounded-lg p-3">{conta.observacoes}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main page
const Financeiro = () => {
  // Contas a Receber state
  const [filterNameR, setFilterNameR] = useState("");
  const [filterStatusR, setFilterStatusR] = useState("all");
  const [filterCategoriaR, setFilterCategoriaR] = useState("all");
  const [selectedContaR, setSelectedContaR] = useState<ContaReceber | null>(null);
  const [detailOpenR, setDetailOpenR] = useState(false);

  // Contas a Pagar state
  const [filterNameP, setFilterNameP] = useState("");
  const [filterStatusP, setFilterStatusP] = useState("all");
  const [filterCategoriaP, setFilterCategoriaP] = useState("all");
  const [selectedContaP, setSelectedContaP] = useState<ContaPagar | null>(null);
  const [detailOpenP, setDetailOpenP] = useState(false);

  // Computed
  const totalReceber = MOCK_CONTAS_RECEBER.filter((c) => c.status !== "cancelado").reduce((s, c) => s + c.valor, 0);
  const totalPagar = MOCK_CONTAS_PAGAR.filter((c) => c.status !== "cancelado").reduce((s, c) => s + c.valor, 0);
  const totalRecebido = MOCK_CONTAS_RECEBER.filter((c) => c.status === "pago").reduce((s, c) => s + c.valor, 0);
  const totalAtrasado = MOCK_CONTAS_RECEBER.filter((c) => c.status === "atrasado").reduce((s, c) => s + c.valor, 0);

  const categoriasReceber = [...new Set(MOCK_CONTAS_RECEBER.map((c) => c.categoria))];
  const categoriasPagar = [...new Set(MOCK_CONTAS_PAGAR.map((c) => c.categoria))];

  const filteredReceber = MOCK_CONTAS_RECEBER.filter((c) => {
    const matchName = c.descricao.toLowerCase().includes(filterNameR.toLowerCase()) || c.aluno.toLowerCase().includes(filterNameR.toLowerCase());
    const matchStatus = filterStatusR === "all" || c.status === filterStatusR;
    const matchCat = filterCategoriaR === "all" || c.categoria === filterCategoriaR;
    return matchName && matchStatus && matchCat;
  });

  const filteredPagar = MOCK_CONTAS_PAGAR.filter((c) => {
    const matchName = c.descricao.toLowerCase().includes(filterNameP.toLowerCase()) || c.fornecedor.toLowerCase().includes(filterNameP.toLowerCase());
    const matchStatus = filterStatusP === "all" || c.status === filterStatusP;
    const matchCat = filterCategoriaP === "all" || c.categoria === filterCategoriaP;
    return matchName && matchStatus && matchCat;
  });

  const renderStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    return (
      <Badge className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Financeiro</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie contas a pagar e receber</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total a Receber"
            value={formatCurrency(totalReceber)}
            icon={ArrowDownCircle}
            gradient="bg-gradient-to-br from-success to-success/70"
          />
          <StatCard
            label="Total Recebido"
            value={formatCurrency(totalRecebido)}
            change="+12%"
            icon={TrendingUp}
            gradient="bg-gradient-to-br from-primary to-primary/70"
          />
          <StatCard
            label="Total a Pagar"
            value={formatCurrency(totalPagar)}
            icon={ArrowUpCircle}
            gradient="bg-gradient-to-br from-warning to-warning/70"
          />
          <StatCard
            label="Em Atraso"
            value={formatCurrency(totalAtrasado)}
            icon={AlertCircle}
            gradient="bg-gradient-to-br from-destructive to-destructive/70"
          />
        </div>

        {/* Contas a Receber */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-success to-success/70">
                <ArrowDownCircle className="h-5 w-5 text-success-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Contas a Receber</h2>
                <p className="text-xs text-muted-foreground">{MOCK_CONTAS_RECEBER.length} registros</p>
              </div>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Nova Conta
            </Button>
          </div>

          <FilterCard
            filterName={filterNameR}
            setFilterName={setFilterNameR}
            filterStatus={filterStatusR}
            setFilterStatus={setFilterStatusR}
            filterCategoria={filterCategoriaR}
            setFilterCategoria={setFilterCategoriaR}
            categorias={categoriasReceber}
            onClear={() => { setFilterNameR(""); setFilterStatusR("all"); setFilterCategoriaR("all"); }}
            entityLabel="Aluno"
          />

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[60px]">Opções</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceber.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhuma conta encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReceber.map((conta) => (
                    <TableRow key={conta.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">{conta.id}</TableCell>
                      <TableCell className="font-medium text-foreground max-w-[200px] truncate">{conta.descricao}</TableCell>
                      <TableCell className="text-foreground">{conta.aluno}</TableCell>
                      <TableCell>
                        {conta.produto && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-foreground text-sm">{conta.produto}</span>
                            {conta.tipoProduto && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                {conta.tipoProduto}
                              </Badge>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">{formatCurrency(conta.valor)}</TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(conta.dataVencimento)}</TableCell>
                      <TableCell>{renderStatusBadge(conta.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => { setSelectedContaR(conta); setDetailOpenR(true); }}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </section>

        <Separator />

        {/* Contas a Pagar */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-warning to-warning/70">
                <ArrowUpCircle className="h-5 w-5 text-warning-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Contas a Pagar</h2>
                <p className="text-xs text-muted-foreground">{MOCK_CONTAS_PAGAR.length} registros</p>
              </div>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Nova Conta
            </Button>
          </div>

          <FilterCard
            filterName={filterNameP}
            setFilterName={setFilterNameP}
            filterStatus={filterStatusP}
            setFilterStatus={setFilterStatusP}
            filterCategoria={filterCategoriaP}
            setFilterCategoria={setFilterCategoriaP}
            categorias={categoriasPagar}
            onClear={() => { setFilterNameP(""); setFilterStatusP("all"); setFilterCategoriaP("all"); }}
            entityLabel="Fornecedor"
          />

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[60px]">Opções</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPagar.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhuma conta encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPagar.map((conta) => (
                    <TableRow key={conta.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">{conta.id}</TableCell>
                      <TableCell className="font-medium text-foreground max-w-[200px] truncate">{conta.descricao}</TableCell>
                      <TableCell className="text-foreground">{conta.fornecedor}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{conta.categoria}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">{formatCurrency(conta.valor)}</TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(conta.dataVencimento)}</TableCell>
                      <TableCell>{renderStatusBadge(conta.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => { setSelectedContaP(conta); setDetailOpenP(true); }}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </section>
      </div>

      {/* Detail Dialogs */}
      <ContaDetailDialog open={detailOpenR} onOpenChange={setDetailOpenR} conta={selectedContaR} tipo="receber" />
      <ContaDetailDialog open={detailOpenP} onOpenChange={setDetailOpenP} conta={selectedContaP} tipo="pagar" />
    </DashboardLayout>
  );
};

export default Financeiro;
