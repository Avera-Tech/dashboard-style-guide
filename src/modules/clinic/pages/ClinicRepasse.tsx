import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Bell, CreditCard, Users } from "lucide-react";

type RepasseStatus = "pendente" | "aprovado" | "pago";

const statusCfg: Record<RepasseStatus, { label: string; cls: string }> = {
  pendente: { label: "Pendente", cls: "bg-warning/10 text-warning hover:bg-warning/20 border-0" },
  aprovado: { label: "Aprovado", cls: "bg-success/10 text-success hover:bg-success/20 border-0" },
  pago: { label: "Pago", cls: "bg-muted text-muted-foreground hover:bg-muted border-0" },
};

const MOCK_REPASSES = [
  { id: "1", iniciais: "RC", nome: "Dr. Roberto Carvalho", consultas: 142, pct: 40, valor: "R$ 12.800", cor: "#3b82f6", status: "pendente" as RepasseStatus },
  { id: "2", iniciais: "CS", nome: "Dra. Carla Santos", consultas: 118, pct: 40, valor: "R$ 9.440", cor: "#0d9488", status: "aprovado" as RepasseStatus },
  { id: "3", iniciais: "MO", nome: "Dr. Marcos Oliveira", consultas: 103, pct: 45, valor: "R$ 9.270", cor: "#6b7280", status: "aprovado" as RepasseStatus },
  { id: "4", iniciais: "FL", nome: "Dr. Fábio Lima", consultas: 97, pct: 40, valor: "R$ 7.760", cor: "#16a34a", status: "pendente" as RepasseStatus },
  { id: "5", iniciais: "PC", nome: "Dra. Paula Costa", consultas: 88, pct: 40, valor: "R$ 7.040", cor: "#7c3aed", status: "pago" as RepasseStatus },
];

const statCards = [
  { label: "TOTAL A REPASSAR", value: "R$55.4k", sub: "12 médicos", icon: CreditCard, border: "border-t-primary" },
  { label: "AGUARD. APROVAÇÃO", value: "5", sub: "médicos", icon: Users, border: "border-t-warning" },
  { label: "APROVADOS", value: "4", sub: "prontos pagar", icon: Users, border: "border-t-success" },
  { label: "JÁ PAGOS", value: "3", sub: "este mês", icon: Users, border: "border-t-muted-foreground" },
];

const ClinicRepasse = () => {
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">Repasse aos médicos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">financeiro / repasse</p>
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
            <h2 className="text-lg font-semibold text-foreground">Repasse aos médicos</h2>
            <p className="text-sm text-muted-foreground">Competência: fevereiro 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Calcular repasses</Button>
            <Button>Aprovar todos</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <Card key={s.label} className={`border-t-4 ${s.border}`}>
              <CardContent className="pt-4 pb-4 px-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">{s.label}</p>
                  <s.icon className="h-5 w-5 text-muted-foreground/50" />
                </div>
                <p className="text-3xl font-bold text-foreground mt-1">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Extrato de repasse por médico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {MOCK_REPASSES.map((r) => {
                const cfg = statusCfg[r.status];
                return (
                  <div key={r.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback style={{ backgroundColor: r.cor, color: "white" }} className="text-xs font-bold">
                          {r.iniciais}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{r.nome}</p>
                        <p className="text-xs text-muted-foreground">{r.consultas} consultas · {r.pct}% de produção</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground font-mono">{r.valor}</p>
                        <p className="text-xs text-muted-foreground">a repassar</p>
                      </div>
                      <Badge variant="secondary" className={cfg.cls}>{cfg.label}</Badge>
                    </div>
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

export default ClinicRepasse;
