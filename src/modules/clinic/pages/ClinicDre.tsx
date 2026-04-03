import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Bell, TrendingUp, CreditCard } from "lucide-react";

const statCards = [
  { label: "RECEITA BRUTA", value: "R$186k", sub: "↑ 8% vs jan", icon: TrendingUp, border: "border-t-primary" },
  { label: "DESPESAS", value: "R$112k", sub: "↑ 3% vs jan", icon: CreditCard, border: "border-t-warning" },
  { label: "LUCRO LÍQUIDO", value: "R$74k", sub: "↑ 14% vs jan", icon: TrendingUp, border: "border-t-success" },
  { label: "MARGEM", value: "39.8%", sub: "↑ 2.1pp", icon: TrendingUp, border: "border-t-accent" },
];

const dreLinhas = [
  { label: "Receita bruta", valor: "R$ 186.400", tipo: "receita" as const },
  { label: "(-) Impostos e deduções", valor: "- R$ 22.368", tipo: "despesa" as const },
  { label: "Receita líquida", valor: "R$ 164.032", tipo: "receita" as const },
  { label: "(-) Repasse médicos", valor: "- R$ 55.400", tipo: "despesa" as const },
  { label: "(-) Folha administrativa", valor: "- R$ 18.200", tipo: "despesa" as const },
  { label: "(-) Aluguel", valor: "- R$ 12.000", tipo: "despesa" as const },
  { label: "(-) Insumos", valor: "- R$ 4.432", tipo: "despesa" as const },
  { label: "Lucro operacional", valor: "R$ 74.000", tipo: "lucro" as const },
];

const projecao = [
  { semana: "Semana 1", valor: "R$44k", pct: 58, color: "bg-primary" },
  { semana: "Semana 2", valor: "R$41k", pct: 54, color: "bg-primary/80" },
  { semana: "Semana 3", valor: "R$47k", pct: 62, color: "bg-success/80" },
  { semana: "Semana 4", valor: "R$50k", pct: 66, color: "bg-success" },
];

const ClinicDre = () => {
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">DRE / Fluxo de caixa</h1>
            <p className="text-sm text-muted-foreground mt-0.5">financeiro / dre</p>
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
            <h2 className="text-lg font-semibold text-foreground">DRE / Fluxo de caixa</h2>
            <p className="text-sm text-muted-foreground">Fevereiro 2026 · todas as unidades</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Filtrar período</Button>
            <Button>Exportar PDF</Button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <Card key={s.label} className={`border-t-4 ${s.border}`}>
              <CardContent className="pt-4 pb-4 px-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">{s.label}</p>
                  <s.icon className="h-5 w-5 text-muted-foreground/50" />
                </div>
                <p className="text-3xl font-bold text-foreground mt-1">{s.value}</p>
                <p className="text-xs text-success mt-1">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* DRE */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">DRE — Fevereiro 2026</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {dreLinhas.map((linha, i) => {
                  const isBold = linha.tipo === "receita" || linha.tipo === "lucro";
                  const isLucro = linha.tipo === "lucro";
                  return (
                    <div key={i} className={`flex items-center justify-between py-3 ${isLucro ? "bg-success/5 -mx-6 px-6 rounded" : ""}`}>
                      <span className={`text-sm ${isBold ? "font-semibold text-foreground" : "text-muted-foreground pl-4"} ${isLucro ? "text-success font-semibold" : ""}`}>
                        {linha.label}
                      </span>
                      <span className={`text-sm font-mono ${linha.tipo === "despesa" ? "text-destructive" : ""} ${isLucro ? "text-success font-bold" : "font-semibold text-foreground"}`}>
                        {linha.valor}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Projeção */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Projeção próximos 30 dias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              {projecao.map((p) => (
                <div key={p.semana} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-20 text-right">{p.semana}</span>
                  <div className="flex-1 h-7 bg-muted rounded-md overflow-hidden">
                    <div className={`h-full ${p.color} rounded-md flex items-center px-2`} style={{ width: `${p.pct}%` }}>
                      <span className="text-xs font-bold text-white">{p.valor}</span>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground pt-2">
                Projeção baseada em consultas agendadas. Total estimado: <span className="font-semibold text-foreground">R$ 182k</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicDre;
