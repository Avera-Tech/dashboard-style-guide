import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Bell, AlertTriangle, Info, CheckCircle2 } from "lucide-react";

type AlertaTipo = "warning" | "info" | "success";

const alertaIcon: Record<AlertaTipo, { icon: typeof AlertTriangle; cls: string }> = {
  warning: { icon: AlertTriangle, cls: "text-warning" },
  info: { icon: Info, cls: "text-primary" },
  success: { icon: CheckCircle2, cls: "text-success" },
};

const MOCK_ALERTAS = [
  {
    tipo: "warning" as AlertaTipo,
    titulo: "Agenda com baixa ocupação — Sexta-feira 21/02",
    descricao: "Apenas 38% dos horários preenchidos na Unidade Norte. Média histórica é 74%. Considere ativar lista de espera.",
    tempo: "agora",
  },
  {
    tipo: "warning" as AlertaTipo,
    titulo: "Estoque crítico — 3 insumos abaixo do mínimo",
    descricao: "Luvas descartáveis (3 cx), Álcool gel (2 un) e Máscaras (4 cx) precisam de reposição urgente.",
    tempo: "1h atrás",
  },
  {
    tipo: "warning" as AlertaTipo,
    titulo: "Pico de cancelamentos na Unidade Sul",
    descricao: "8 cancelamentos em 2 dias, contra média de 2. Possível correlação com falta de confirmação automática.",
    tempo: "3h atrás",
  },
  {
    tipo: "info" as AlertaTipo,
    titulo: "Faturamento da Unidade Norte abaixo da meta 18%",
    descricao: "Meta: R$11k · Realizado: R$9k. Ritmo atual projeta R$13.5k no fim do mês — possível recuperação.",
    tempo: "ontem",
  },
  {
    tipo: "success" as AlertaTipo,
    titulo: "NPS atingiu 72 pontos — maior resultado histórico",
    descricao: "Fevereiro com 412 respostas coletadas. Promotores em 78%, melhor resultado desde jan/2025.",
    tempo: "ontem",
  },
];

const ClinicAlertas = () => {
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">Alertas inteligentes</h1>
            <p className="text-sm text-muted-foreground mt-0.5">inteligência / alertas</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar paciente, médico..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-64" />
            </div>
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5 text-muted-foreground" /></Button>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Alertas inteligentes</h2>
            <p className="text-sm text-muted-foreground">4 alertas ativos — gerados automaticamente</p>
          </div>
          <Button variant="outline">Marcar todos como lido</Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {MOCK_ALERTAS.map((a, i) => {
                const cfg = alertaIcon[a.tipo];
                const Icon = cfg.icon;
                return (
                  <div key={i} className="flex items-start justify-between px-6 py-5">
                    <div className="flex items-start gap-4">
                      <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${cfg.cls}`} />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{a.titulo}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{a.descricao}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 ml-4">{a.tempo}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClinicAlertas;
