import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Bell, CheckCircle2, Clock, XCircle, Send } from "lucide-react";
import {
  MOCK_CONFIRMACOES,
  CONFIRMACAO_STATS,
  MODELO_MENSAGEM,
  type ConfirmacaoStatus,
} from "@/modules/clinic/data/mock-confirmacoes";

const statusConfig: Record<ConfirmacaoStatus, { label: string; color: string; dotClass: string }> = {
  confirmado: { label: "Confirmou", color: "text-success", dotClass: "bg-success" },
  aguardando: { label: "Aguardando", color: "text-warning", dotClass: "bg-warning" },
  cancelado: { label: "Cancelou", color: "text-destructive", dotClass: "bg-destructive" },
};

const statCards = [
  {
    label: "ENVIADAS HOJE",
    value: CONFIRMACAO_STATS.enviadas,
    sub: "100% do dia",
    icon: Send,
    borderColor: "border-t-success",
  },
  {
    label: "CONFIRMADAS",
    value: CONFIRMACAO_STATS.confirmadas,
    sub: `${Math.round((CONFIRMACAO_STATS.confirmadas / CONFIRMACAO_STATS.enviadas) * 100)}% de taxa`,
    icon: CheckCircle2,
    borderColor: "border-t-primary",
  },
  {
    label: "SEM RESPOSTA",
    value: CONFIRMACAO_STATS.semResposta,
    sub: "aguardando",
    icon: Clock,
    borderColor: "border-t-warning",
  },
  {
    label: "CANCELAMENTOS",
    value: CONFIRMACAO_STATS.cancelamentos,
    sub: "↑ 2 vs ontem",
    icon: XCircle,
    borderColor: "border-t-destructive",
  },
];

const ClinicConfirmacoes = () => {
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">
              Confirmações automáticas
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              paciente / confirmações
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar paciente, médico..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Subheader */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Confirmações automáticas</h2>
            <p className="text-sm text-muted-foreground">WhatsApp / SMS — 20/02/2026</p>
          </div>
          <Button>Configurar mensagens</Button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label} className={`border-t-4 ${stat.borderColor}`}>
              <CardContent className="pt-4 pb-4 px-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
                    {stat.label}
                  </p>
                  <stat.icon className="h-5 w-5 text-muted-foreground/50" />
                </div>
                <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Modelo de mensagem */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold">Modelo de mensagem ativa</CardTitle>
              <Button variant="link" className="text-primary p-0 h-auto text-sm">Editar</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">Enviado 24h antes via WhatsApp</p>
              <div className="rounded-lg bg-muted/50 border border-border p-4">
                <p className="text-sm text-foreground whitespace-pre-line font-mono leading-relaxed">
                  {MODELO_MENSAGEM}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Fila de envios */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Fila de envios hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {MOCK_CONFIRMACOES.map((envio) => {
                  const cfg = statusConfig[envio.status];
                  return (
                    <div key={envio.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${cfg.dotClass}`} />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {envio.paciente} · <span className="font-semibold">{envio.medico}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{envio.telefone}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium ${cfg.color}`}>
                        {envio.status === "confirmado" && "✓ "}
                        {cfg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicConfirmacoes;
