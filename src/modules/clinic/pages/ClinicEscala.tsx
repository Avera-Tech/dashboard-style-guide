import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bell, Search, Plus } from "lucide-react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { MOCK_ESCALA, turnoConfig, TurnoType } from "@/modules/clinic/data/mock-escala";
import { startOfWeek, addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

const DIAS_ABREV = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

const ClinicEscala = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [search, setSearch] = useState("");

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const startStr = format(weekStart, "d", { locale: ptBR });
  const endDate = addDays(weekStart, 6);
  const weekRange = `Semana ${startStr}–${format(endDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}`;

  const filtered = useMemo(() => {
    if (!search) return MOCK_ESCALA;
    return MOCK_ESCALA.filter((e) => e.nome.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const today = new Date();

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Escala médica</h1>
            <p className="text-sm text-muted-foreground mt-1">operacional / escala</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar paciente, médico..." className="pl-9 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
          </div>
        </div>

        {/* Subheader */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Escala médica</h2>
            <p className="text-sm text-muted-foreground">{weekRange}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setCurrentDate((d) => addDays(d, -7))}>‹ Semana ant.</Button>
            <Button variant="outline" onClick={() => setCurrentDate((d) => addDays(d, 7))}>Próxima ›</Button>
            <Button><Plus className="h-4 w-4 mr-1" /> Novo turno</Button>
          </div>
        </div>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-40 font-semibold uppercase text-xs">Médico</TableHead>
                {weekDays.map((day, i) => {
                  const isToday = format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
                  return (
                    <TableHead key={i} className={`text-center font-semibold uppercase text-xs ${isToday ? "text-primary" : ""}`}>
                      {DIAS_ABREV[i]} {format(day, "d")}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((escala) => (
                <TableRow key={escala.medicoId}>
                  <TableCell className="font-medium">{escala.nome}</TableCell>
                  {escala.turnos.map((turno, i) => {
                    const config = turnoConfig[turno];
                    return (
                      <TableCell key={i} className="text-center">
                        <Badge className={config.className}>{config.label}</Badge>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Legend */}
        <div className="flex items-center gap-6">
          {(Object.entries(turnoConfig) as [TurnoType, typeof turnoConfig[TurnoType]][]).map(([key, config]) => (
            <div key={key} className="flex items-center gap-1.5">
              <Badge className={`${config.className} text-xs`}>{config.label}</Badge>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicEscala;
