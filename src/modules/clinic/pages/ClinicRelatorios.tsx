import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Bell, Users, TrendingUp, CreditCard, UserPlus } from "lucide-react";

const statCards = [
  { label: "CONSULTAS NO MÊS", value: "824", sub: "↑ 12% vs jan", icon: Users, border: "border-t-primary" },
  { label: "FATURAMENTO", value: "R$186k", sub: "↑ R$14k", icon: TrendingUp, border: "border-t-success" },
  { label: "TICKET MÉDIO", value: "R$226", sub: "estável", icon: CreditCard, border: "border-t-warning" },
  { label: "NOVOS PACIENTES", value: "47", sub: "↑ 8 vs jan", icon: UserPlus, border: "border-t-primary" },
];

const consultasMedico = [
  { nome: "Dr. Carvalho", valor: 142, cor: "bg-primary" },
  { nome: "Dra. Santos", valor: 118, cor: "bg-[hsl(174,60%,50%)]" },
  { nome: "Dr. Oliveira", valor: 103, cor: "bg-success" },
  { nome: "Dr. Lima", valor: 97, cor: "bg-warning" },
  { nome: "Dra. Costa", valor: 88, cor: "bg-[hsl(174,60%,50%)]" },
];

const receitaConvenio = [
  { nome: "Particular", valor: "R$67k", pct: 100 },
  { nome: "Unimed", valor: "R$42k", pct: 63 },
  { nome: "Bradesco", valor: "R$28k", pct: 42 },
  { nome: "SulAmérica", valor: "R$19k", pct: 28 },
  { nome: "Fidelidade", valor: "R$18k", pct: 27 },
];

const resumo = [
  { label: "Consultas", value: "824" },
  { label: "Novos pacientes", value: "47" },
  { label: "Taxa de ocupação", value: "96%" },
  { label: "Cancelamentos", value: "3.2%" },
  { label: "Avaliação média", value: "4.8" },
  { label: "Médicos ativos", value: "12" },
];

const maxConsultas = Math.max(...consultasMedico.map((c) => c.valor));

const ClinicRelatorios = () => {
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">Relatórios</h1>
            <p className="text-sm text-muted-foreground mt-0.5">financeiro / relatórios</p>
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
            <h2 className="text-lg font-semibold text-foreground">Relatórios</h2>
            <p className="text-sm text-muted-foreground">Fevereiro 2026 · todas as unidades</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Filtrar período</Button>
            <Button>Exportar PDF</Button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <Card key={s.label} className={`border-t-4 ${s.border}`}>
              <CardContent className="pt-4 pb-4 px-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">{s.label}</p>
                  <s.icon className="h-5 w-5 text-muted-foreground/50" />
                </div>
                <p className="text-3xl font-bold text-foreground mt-1">{s.value}</p>
                <p className={`text-xs mt-1 ${s.sub.startsWith("↑") ? "text-success" : "text-muted-foreground"}`}>{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Consultas por médico */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Consultas por médico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {consultasMedico.map((m) => (
                <div key={m.nome} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-24 text-right shrink-0">{m.nome}</span>
                  <div className="flex-1 h-7 bg-muted/30 rounded overflow-hidden relative">
                    <div className={`h-full ${m.cor} rounded flex items-center pl-2`} style={{ width: `${(m.valor / maxConsultas) * 100}%` }}>
                      <span className="text-xs font-bold text-white">{m.valor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Receita por convênio */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Receita por convênio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {receitaConvenio.map((c) => (
                <div key={c.nome} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{c.nome}</span>
                    <span className="text-sm font-bold text-foreground font-mono">{c.valor}</span>
                  </div>
                  <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Resumo geral */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Resumo geral do mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 py-2">
              {resumo.map((r) => (
                <div key={r.label} className="text-center">
                  <p className="text-2xl font-bold text-foreground font-mono">{r.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{r.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClinicRelatorios;
