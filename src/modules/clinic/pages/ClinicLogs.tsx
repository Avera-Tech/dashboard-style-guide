import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Bell, Clock, Edit, Users, ShieldCheck } from "lucide-react";

const statCards = [
  { label: "ACESSOS HOJE", value: "234", sub: "prontuários", icon: Clock, border: "border-t-primary" },
  { label: "EDIÇÕES HOJE", value: "87", sub: "registros", icon: Edit, border: "border-t-warning" },
  { label: "USUÁRIOS ATIVOS", value: "18", sub: "online agora", icon: Users, border: "border-t-success" },
  { label: "SEM ANOMALIAS", value: "0K", sub: "sistema normal", icon: ShieldCheck, border: "border-t-success" },
];

type EventoTipo = "acesso" | "edicao" | "login" | "agendamento" | "cancelamento";

const eventoCor: Record<EventoTipo, string> = {
  acesso: "bg-primary",
  edicao: "bg-warning",
  login: "bg-success",
  agendamento: "bg-warning",
  cancelamento: "bg-destructive",
};

const MOCK_EVENTOS = [
  { tipo: "acesso" as EventoTipo, usuario: "Dr. Carvalho", acao: "acessou prontuário de", alvo: "Maria Silva (#00234)", ip: "192.168.1.42", browser: "Chrome · Windows", hora: "13:28:04" },
  { tipo: "edicao" as EventoTipo, usuario: "Dra. Santos", acao: "editou prontuário de", alvo: "João Pereira (#00891)", ip: "192.168.1.55", browser: "Chrome · macOS", hora: "13:22:47" },
  { tipo: "login" as EventoTipo, usuario: "Admin Geral", acao: "fez login no sistema", alvo: "", ip: "200.142.10.5", browser: "Firefox · Windows", hora: "13:01:12" },
  { tipo: "acesso" as EventoTipo, usuario: "Caixa 01", acao: "acessou cadastro de", alvo: "Ana Rodrigues (#01120)", ip: "192.168.1.20", browser: "Chrome · Windows", hora: "12:58:33" },
  { tipo: "agendamento" as EventoTipo, usuario: "Recepção", acao: "agendou consulta para", alvo: "Carlos Mendes (#00567)", ip: "192.168.1.22", browser: "Edge · Windows", hora: "12:45:10" },
  { tipo: "cancelamento" as EventoTipo, usuario: "Admin Geral", acao: "cancelou agendamento de", alvo: "Lucia Ferreira (#00345)", ip: "192.168.1.42", browser: "Chrome · Windows", hora: "12:30:05" },
];

const ClinicLogs = () => {
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">Log de auditoria</h1>
            <p className="text-sm text-muted-foreground mt-0.5">segurança / auditoria</p>
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
            <h2 className="text-lg font-semibold text-foreground">Log de auditoria</h2>
            <p className="text-sm text-muted-foreground">Registro de acessos e alterações — LGPD</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Filtrar</Button>
            <Button>Exportar log</Button>
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
                <p className={`text-xs mt-1 ${s.sub === "sistema normal" ? "text-success" : "text-muted-foreground"}`}>{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Eventos recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {MOCK_EVENTOS.map((e, i) => (
                <div key={i} className="flex items-start justify-between py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${eventoCor[e.tipo]}`} />
                    <div>
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">{e.usuario}</span>{" "}
                        {e.acao}{" "}
                        {e.alvo && <span className="font-semibold">{e.alvo}</span>}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 font-mono">{e.ip} · {e.browser}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono shrink-0">{e.hora}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClinicLogs;
