import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Bell } from "lucide-react";

const kpis = [
  { label: "TAXA DE RETORNO", value: "64%", sub: "pacientes que voltaram em 90 dias", colors: ["bg-primary/30", "bg-primary/40", "bg-primary/30", "bg-primary/50", "bg-primary/40", "bg-primary/60", "bg-primary/70", "bg-primary"] },
  { label: "TEMPO MÉDIO DE ESPERA", value: "18 min", sub: "↓ 4 min vs mês anterior", colors: ["bg-warning/40", "bg-warning/50", "bg-warning/60", "bg-warning/40", "bg-warning/50", "bg-warning/70", "bg-warning", "bg-warning/80"] },
  { label: "TAXA DE CANCELAMENTO", value: "3.2%", sub: "↓ 0.8pp vs mês anterior", colors: ["bg-destructive/30", "bg-destructive/40", "bg-destructive/30", "bg-destructive/40", "bg-destructive/50", "bg-destructive/60", "bg-destructive/70", "bg-destructive"] },
  { label: "CHURN MENSAL", value: "4.1%", sub: "pacientes que não retornaram", colors: ["bg-purple-300", "bg-purple-400", "bg-purple-300", "bg-purple-500", "bg-purple-400", "bg-purple-600", "bg-purple-700", "bg-primary"] },
  { label: "PICO DE OCUPAÇÃO", value: "9h–11h", sub: "menor ocupação às 13h–14h", colors: ["bg-primary/30", "bg-primary/40", "bg-primary/30", "bg-muted-foreground/20", "bg-primary/40", "bg-primary/50", "bg-primary/70", "bg-primary"] },
  { label: "TICKET MÉDIO", value: "R$ 226", sub: "↑ R$12 vs mês anterior", colors: ["bg-primary/30", "bg-primary/30", "bg-primary/40", "bg-primary/30", "bg-primary/40", "bg-primary/50", "bg-primary/60", "bg-success"] },
];

const sazonalidade = [
  { dia: "Segunda", nivel: "alto", pct: 100, cor: "bg-primary" },
  { dia: "Terça", nivel: "alto", pct: 90, cor: "bg-primary" },
  { dia: "Quarta", nivel: "médio", pct: 75, cor: "bg-success" },
  { dia: "Quinta", nivel: "médio", pct: 78, cor: "bg-success" },
  { dia: "Sexta", nivel: "baixo", pct: 60, cor: "bg-warning" },
  { dia: "Sábado", nivel: "baixo", pct: 45, cor: "bg-warning" },
];

const novosPacientes = [
  { mes: "Outubro", valor: 31, cor: "bg-primary" },
  { mes: "Novembro", valor: 35, cor: "bg-primary" },
  { mes: "Dezembro", valor: 24, cor: "bg-warning" },
  { mes: "Janeiro", valor: 39, cor: "bg-primary" },
  { mes: "Fevereiro", valor: 47, cor: "bg-success" },
];

const maxPacientes = Math.max(...novosPacientes.map((n) => n.valor));

const ClinicBi = () => {
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">BI operacional</h1>
            <p className="text-sm text-muted-foreground mt-0.5">inteligência / bi</p>
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
            <h2 className="text-lg font-semibold text-foreground">BI operacional</h2>
            <p className="text-sm text-muted-foreground">Indicadores de saúde da clínica — Últimos 30 dias</p>
          </div>
          <Button variant="outline">Exportar dados</Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpis.map((k) => (
            <Card key={k.label}>
              <CardContent className="pt-5 pb-4 px-5">
                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">{k.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2 font-mono">{k.value}</p>
                <p className={`text-xs mt-1 ${k.sub.startsWith("↑") || k.sub.startsWith("↓") ? "text-muted-foreground" : "text-muted-foreground"}`}>{k.sub}</p>
                <div className="flex gap-1 mt-3">
                  {k.colors.map((c, i) => (
                    <div key={i} className={`h-2 flex-1 rounded-sm ${c}`} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Sazonalidade semanal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sazonalidade.map((s) => (
                <div key={s.dia} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16 text-right shrink-0">{s.dia}</span>
                  <div className="flex-1 h-7 bg-muted/20 rounded overflow-hidden">
                    <div className={`h-full ${s.cor} rounded flex items-center pl-2`} style={{ width: `${s.pct}%` }}>
                      <span className="text-xs font-bold text-white">{s.nivel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Novos pacientes por mês</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {novosPacientes.map((n) => (
                <div key={n.mes} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20 text-right shrink-0">{n.mes}</span>
                  <div className="flex-1 h-7 bg-muted/20 rounded overflow-hidden">
                    <div className={`h-full ${n.cor} rounded flex items-center pl-2`} style={{ width: `${(n.valor / maxPacientes) * 100}%` }}>
                      <span className="text-xs font-bold text-white">{n.valor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicBi;
