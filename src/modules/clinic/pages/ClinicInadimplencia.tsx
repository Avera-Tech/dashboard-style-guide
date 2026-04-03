import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const statCards = [
  { label: "ATÉ 30 DIAS", value: "3", sub: "R$ 1.440", icon: Clock, border: "border-t-warning" },
  { label: "31 A 60 DIAS", value: "2", sub: "R$ 960", icon: AlertCircle, border: "border-t-destructive" },
  { label: "MAIS DE 60 DIAS", value: "2", sub: "R$ 1.980", icon: AlertCircle, border: "border-t-primary" },
  { label: "RECUPERADO MÊS", value: "R$2.1k", sub: "↑ R$400", icon: TrendingUp, border: "border-t-success" },
];

const MOCK_INADIMPLENTES = [
  { id: "1", dias: 28, nome: "Maria Aparecida Lima", plano: "Fidelidade Ouro", venc: "22/01/2026", valor: "R$ 480", grave: false },
  { id: "2", dias: 15, nome: "Roberto Souza Neto", plano: "Fidelidade Prata", venc: "05/02/2026", valor: "R$ 320", grave: false },
  { id: "3", dias: 45, nome: "Fernanda Castro Dias", plano: "Fidelidade Ouro", venc: "06/01/2026", valor: "R$ 480", grave: false },
  { id: "4", dias: 72, nome: "Carlos Mendes Filho", plano: "Fidelidade Ouro", venc: "09/12/2025", valor: "R$ 1.440", grave: true },
];

const diasColor = (dias: number) => {
  if (dias > 60) return "bg-destructive/10 text-destructive border-destructive/20";
  if (dias > 30) return "bg-warning/10 text-warning border-warning/20";
  return "bg-warning/10 text-warning border-warning/20";
};

const ClinicInadimplencia = () => {
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">Inadimplência</h1>
            <p className="text-sm text-muted-foreground mt-0.5">financeiro / inadimplência</p>
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
            <h2 className="text-lg font-semibold text-foreground">Inadimplência</h2>
            <p className="text-sm text-muted-foreground">7 pacientes com mensalidade em atraso — R$ 4.380 em aberto</p>
          </div>
          <Button>Enviar cobranças</Button>
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
                <p className={`text-xs mt-1 ${s.label === "RECUPERADO MÊS" ? "text-success" : "text-muted-foreground"}`}>{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Pacientes inadimplentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {MOCK_INADIMPLENTES.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className={`${diasColor(p.dias)} text-xs font-bold px-2 py-1 min-w-[60px] justify-center`}>
                      {p.dias} dias
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-foreground">{p.nome}</p>
                      <p className="text-xs text-muted-foreground">{p.plano} · venc. {p.venc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-foreground font-mono">{p.valor}</p>
                    {p.grave ? (
                      <Button size="sm" variant="destructive" onClick={() => toast({ title: "Paciente suspenso", description: `${p.nome} foi suspenso por inadimplência.` })}>
                        Suspender
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => toast({ title: "Cobrança enviada", description: `Cobrança enviada para ${p.nome} via WhatsApp.` })}>
                        Cobrar WA
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClinicInadimplencia;
