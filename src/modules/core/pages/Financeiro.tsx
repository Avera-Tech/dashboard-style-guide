import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import StatCard from "@/modules/core/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  MOCK_CONTAS_RECEBER,
  MOCK_CONTAS_PAGAR,
  formatCurrency,
  statusConfig,
} from "@/modules/core/data/financeiro";
import { Badge } from "@/components/ui/badge";

const Financeiro = () => {
  const navigate = useNavigate();

  const totalReceber = MOCK_CONTAS_RECEBER.filter((c) => c.status !== "cancelado").reduce((s, c) => s + c.valor, 0);
  const totalPagar = MOCK_CONTAS_PAGAR.filter((c) => c.status !== "cancelado").reduce((s, c) => s + c.valor, 0);
  const totalRecebido = MOCK_CONTAS_RECEBER.filter((c) => c.status === "pago").reduce((s, c) => s + c.valor, 0);
  const totalAtrasado = [
    ...MOCK_CONTAS_RECEBER.filter((c) => c.status === "atrasado"),
    ...MOCK_CONTAS_PAGAR.filter((c) => c.status === "atrasado"),
  ].reduce((s, c) => s + c.valor, 0);

  const receberPendentes = MOCK_CONTAS_RECEBER.filter((c) => c.status === "pendente" || c.status === "atrasado");
  const pagarPendentes = MOCK_CONTAS_PAGAR.filter((c) => c.status === "pendente" || c.status === "atrasado");

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Financeiro</h1>
          <p className="text-sm text-muted-foreground mt-1">Visão geral das finanças</p>
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

        {/* Quick access cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contas a Receber - resumo */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-success to-success/70">
                  <ArrowDownCircle className="h-5 w-5 text-success-foreground" />
                </div>
                <CardTitle className="text-base">Contas a Receber</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate("/financeiro/receber")}>
                Ver todas
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {receberPendentes.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Nenhuma conta pendente</p>
              ) : (
                receberPendentes.slice(0, 4).map((conta) => {
                  const status = statusConfig[conta.status];
                  const StatusIcon = status.icon;
                  return (
                    <div key={conta.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{conta.descricao}</p>
                        <p className="text-xs text-muted-foreground">{conta.aluno}</p>
                      </div>
                      <div className="flex items-center gap-3 ml-3">
                        <span className="text-sm font-semibold text-foreground">{formatCurrency(conta.valor)}</span>
                        <Badge className={status.className}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                    </div>
                  );
                })
              )}
              {receberPendentes.length > 4 && (
                <p className="text-xs text-muted-foreground text-center">
                  +{receberPendentes.length - 4} contas pendentes
                </p>
              )}
            </CardContent>
          </Card>

          {/* Contas a Pagar - resumo */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-warning to-warning/70">
                  <ArrowUpCircle className="h-5 w-5 text-warning-foreground" />
                </div>
                <CardTitle className="text-base">Contas a Pagar</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate("/financeiro/pagar")}>
                Ver todas
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {pagarPendentes.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Nenhuma conta pendente</p>
              ) : (
                pagarPendentes.slice(0, 4).map((conta) => {
                  const status = statusConfig[conta.status];
                  const StatusIcon = status.icon;
                  return (
                    <div key={conta.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{conta.descricao}</p>
                        <p className="text-xs text-muted-foreground">{conta.fornecedor}</p>
                      </div>
                      <div className="flex items-center gap-3 ml-3">
                        <span className="text-sm font-semibold text-foreground">{formatCurrency(conta.valor)}</span>
                        <Badge className={status.className}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                    </div>
                  );
                })
              )}
              {pagarPendentes.length > 4 && (
                <p className="text-xs text-muted-foreground text-center">
                  +{pagarPendentes.length - 4} contas pendentes
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Financeiro;
