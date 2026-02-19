import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus, MoreHorizontal, Eye, Pencil, Trash2, ArrowDownCircle,
} from "lucide-react";
import FilterCard from "@/components/financeiro/FilterCard";
import ContaDetailDialog from "@/components/financeiro/ContaDetailDialog";
import {
  ContaReceber,
  MOCK_CONTAS_RECEBER,
  statusConfig,
  formatCurrency,
  formatDate,
} from "@/data/financeiro";

const ContasReceber = () => {
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategoria, setFilterCategoria] = useState("all");
  const [selectedConta, setSelectedConta] = useState<ContaReceber | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const categorias = [...new Set(MOCK_CONTAS_RECEBER.map((c) => c.categoria))];

  const filtered = MOCK_CONTAS_RECEBER.filter((c) => {
    const matchName = c.descricao.toLowerCase().includes(filterName.toLowerCase()) || c.aluno.toLowerCase().includes(filterName.toLowerCase());
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    const matchCat = filterCategoria === "all" || c.categoria === filterCategoria;
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
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-success to-success/70">
              <ArrowDownCircle className="h-5 w-5 text-success-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Contas a Receber</h1>
              <p className="text-xs text-muted-foreground">{MOCK_CONTAS_RECEBER.length} registros</p>
            </div>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Nova Conta
          </Button>
        </div>

        <FilterCard
          filterName={filterName}
          setFilterName={setFilterName}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterCategoria={filterCategoria}
          setFilterCategoria={setFilterCategoria}
          categorias={categorias}
          onClear={() => { setFilterName(""); setFilterStatus("all"); setFilterCategoria("all"); }}
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
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Nenhuma conta encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((conta) => (
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
                          <DropdownMenuItem onClick={() => { setSelectedConta(conta); setDetailOpen(true); }}>
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
      </div>

      <ContaDetailDialog open={detailOpen} onOpenChange={setDetailOpen} conta={selectedConta} tipo="receber" />
    </DashboardLayout>
  );
};

export default ContasReceber;
