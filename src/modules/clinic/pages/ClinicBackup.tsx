import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Bell, HardDrive } from "lucide-react";

const statCards = [
  { label: "ÚLTIMO BACKUP", value: "OK", sub: "hoje 02:00", border: "border-t-success" },
  { label: "TAMANHO TOTAL", value: "48GB", sub: "↑ 1.2GB vs ontem", border: "border-t-primary" },
  { label: "BACKUPS NO MÊS", value: "20", sub: "diários", border: "border-t-primary" },
  { label: "PRÓXIMO BACKUP", value: "02:00", sub: "amanhã", border: "border-t-warning" },
];

const MOCK_BACKUPS = [
  { data: "20/02/2026 — 02:00", tamanho: "48.2 GB · 4m12s", status: "sucesso" as const },
  { data: "19/02/2026 — 02:00", tamanho: "47.0 GB · 4m05s", status: "sucesso" as const },
  { data: "18/02/2026 — 02:00", tamanho: "46.8 GB · 4m18s", status: "sucesso" as const },
  { data: "17/02/2026 — 02:00", tamanho: "—", status: "falhou" as const },
  { data: "16/02/2026 — 02:00", tamanho: "46.1 GB · 4m01s", status: "sucesso" as const },
];

const ClinicBackup = () => {
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">Backup</h1>
            <p className="text-sm text-muted-foreground mt-0.5">segurança / backup</p>
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
            <h2 className="text-lg font-semibold text-foreground">Backup e recuperação</h2>
            <p className="text-sm text-muted-foreground">Política de retenção: 90 dias</p>
          </div>
          <Button>Forçar backup agora</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <Card key={s.label} className={`border-t-4 ${s.border}`}>
              <CardContent className="pt-4 pb-4 px-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">{s.label}</p>
                  <HardDrive className="h-5 w-5 text-success/50" />
                </div>
                <p className="text-3xl font-bold text-foreground mt-1">{s.value}</p>
                <p className={`text-xs mt-1 ${s.sub.startsWith("↑") ? "text-success" : "text-muted-foreground"}`}>{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Status atual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                <HardDrive className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Backup automático ativo — AWS S3 · São Paulo (sa-east-1)</p>
                <p className="text-xs text-muted-foreground mt-0.5">Último backup bem-sucedido: hoje às 02:00 · 48.2 GB · duração: 4min 12s</p>
              </div>
            </div>

            <div className="divide-y divide-border">
              {MOCK_BACKUPS.map((b, i) => (
                <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <span className="text-sm text-foreground font-mono">{b.data}</span>
                  <span className="text-sm text-muted-foreground font-mono">{b.tamanho}</span>
                  {b.status === "sucesso" ? (
                    <span className="text-sm text-success font-medium">✓ Sucesso</span>
                  ) : (
                    <span className="text-sm text-destructive font-medium">✗ Falhou</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClinicBackup;
