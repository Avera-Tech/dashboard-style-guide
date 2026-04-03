import { useState } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Bell } from "lucide-react";
import { CHAMANDO_AGORA, PROXIMOS, FILA_ESPERA } from "@/modules/clinic/data/mock-painel-chamada";
import { toast } from "@/hooks/use-toast";

const ClinicPainelChamada = () => {
  const [search, setSearch] = useState("");

  const handleChamar = (paciente: string) => {
    toast({ title: "Chamando paciente", description: `${paciente} foi chamado(a).` });
  };

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">Painel de chamada</h1>
            <p className="text-sm text-muted-foreground mt-0.5">paciente / chamada</p>
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
            <h2 className="text-lg font-semibold text-foreground">Painel de chamada</h2>
            <p className="text-sm text-muted-foreground">Fila em tempo real — Unidade Centro</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Trocar unidade</Button>
            <Button>Chamar próximo</Button>
          </div>
        </div>

        {/* Chamando agora */}
        <div className="rounded-xl bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] p-8 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            CHAMANDO AGORA
          </p>
          <p className="text-3xl font-bold">{CHAMANDO_AGORA.paciente}</p>
          <p className="text-primary font-medium">
            {CHAMANDO_AGORA.sala} — {CHAMANDO_AGORA.medico} · {CHAMANDO_AGORA.especialidade}
          </p>

          {/* Próximos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {PROXIMOS.map((p) => (
              <div
                key={p.numero}
                className="rounded-lg border border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-accent))] py-4 px-3 text-center"
              >
                <p className="text-2xl font-bold">{p.numero}</p>
                <p className="text-sm text-muted-foreground">{p.paciente}</p>
                <p className="text-xs text-muted-foreground">{p.horario}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fila completa */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Fila completa de espera</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs uppercase text-muted-foreground">Posição</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Paciente</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Horário</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Médico</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Sala</TableHead>
                  <TableHead className="text-xs uppercase text-muted-foreground">Espera</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FILA_ESPERA.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-primary font-bold">#{String(item.posicao).padStart(2, "0")}</TableCell>
                    <TableCell className="font-semibold text-foreground">{item.paciente}</TableCell>
                    <TableCell className="text-primary">{item.horario}</TableCell>
                    <TableCell className="text-muted-foreground">{item.medico}</TableCell>
                    <TableCell className="text-muted-foreground">{item.sala}</TableCell>
                    <TableCell>
                      <span className={item.espera !== "aguardando" ? "text-warning font-medium" : "text-muted-foreground"}>
                        {item.espera}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={item.posicao === 1 ? "default" : "outline"}
                        onClick={() => handleChamar(item.paciente)}
                      >
                        Chamar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClinicPainelChamada;
