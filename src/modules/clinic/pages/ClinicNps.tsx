import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Bell } from "lucide-react";
import { NPS_GERAL, NPS_POR_MEDICO } from "@/modules/clinic/data/mock-nps";

const ClinicNps = () => {
  const [search, setSearch] = useState("");

  const maxScore = 100;

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">Satisfação / NPS</h1>
            <p className="text-sm text-muted-foreground mt-0.5">paciente / nps</p>
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
        {/* Subheader */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Satisfação / NPS</h2>
            <p className="text-sm text-muted-foreground">{NPS_GERAL.mes} · {NPS_GERAL.respostas} respostas</p>
          </div>
          <Button>Configurar pesquisa</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score NPS geral */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Score NPS geral</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score display */}
              <div className="flex items-center gap-6 justify-center pt-4">
                <div className="relative h-24 w-24">
                  <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke="hsl(var(--success))" strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(NPS_GERAL.score / 100) * 264} 264`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground">
                    {NPS_GERAL.score}
                  </span>
                </div>
                <div>
                  <p className="text-4xl font-bold text-foreground">{NPS_GERAL.score}</p>
                  <p className="text-sm text-muted-foreground">
                    NPS · <span className="text-success font-semibold">{NPS_GERAL.classificacao}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{NPS_GERAL.respostas} respostas em fev/26</p>
                </div>
              </div>

              {/* Breakdown bars */}
              <div className="space-y-3">
                {/* Promotores */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20 text-right">Promotores</span>
                  <div className="flex-1 h-6 bg-muted rounded-md overflow-hidden relative">
                    <div
                      className="h-full bg-success rounded-md flex items-center px-2"
                      style={{ width: `${NPS_GERAL.promotores.pct}%` }}
                    >
                      <span className="text-xs font-bold text-white">
                        {NPS_GERAL.promotores.pct}% · {NPS_GERAL.promotores.total}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Neutros */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20 text-right">Neutros</span>
                  <div className="flex-1 h-6 bg-muted rounded-md overflow-hidden relative">
                    <div
                      className="h-full bg-warning rounded-md flex items-center px-2"
                      style={{ width: `${NPS_GERAL.neutros.pct}%` }}
                    >
                      <span className="text-xs font-bold text-white">
                        {NPS_GERAL.neutros.pct}% · {NPS_GERAL.neutros.total}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Detratores */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20 text-right">Detratores</span>
                  <div className="flex-1 h-6 bg-muted rounded-md overflow-hidden relative">
                    <div
                      className="h-full bg-destructive rounded-md flex items-center px-2"
                      style={{ width: `${NPS_GERAL.detratores.pct}%` }}
                    >
                      <span className="text-xs font-bold text-white">
                        {NPS_GERAL.detratores.pct}% · {NPS_GERAL.detratores.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NPS por médico */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">NPS por médico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              {NPS_POR_MEDICO.map((m) => (
                <div key={m.medico} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-28 text-right">{m.medico}</span>
                  <div className="flex-1 h-7 bg-muted rounded-md overflow-hidden">
                    <div
                      className={`h-full ${m.color} rounded-md flex items-center px-2`}
                      style={{ width: `${(m.score / maxScore) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">{m.score}</span>
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

export default ClinicNps;
