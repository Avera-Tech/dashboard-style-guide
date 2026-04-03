import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { consultasAgendaMock, HORARIOS, DIAS_SEMANA } from "@/modules/clinic/data/mock-agenda";
import { addDays, startOfWeek, format, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

const corClasses: Record<string, string> = {
  blue: "border-l-blue-500 bg-blue-50 text-blue-900",
  green: "border-l-emerald-500 bg-emerald-50 text-emerald-900",
  orange: "border-l-amber-500 bg-amber-50 text-amber-900",
  teal: "border-l-teal-500 bg-teal-50 text-teal-900",
};

const ClinicAgenda = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const weekRange = `${format(weekStart, "d")}–${format(addDays(weekStart, 6), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}`;

  const filteredConsultas = useMemo(() => {
    if (!searchQuery) return consultasAgendaMock;
    const q = searchQuery.toLowerCase();
    return consultasAgendaMock.filter(
      (c) => c.paciente.toLowerCase().includes(q) || c.medico.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const getConsulta = (horario: string, dia: number) =>
    filteredConsultas.filter((c) => c.horario === horario && c.diaSemana === dia);

  return (
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">Agenda</h1>
            <p className="text-sm text-muted-foreground mt-0.5">administração / agenda</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar paciente, médico..."
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Week controls */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Agenda semanal</h2>
            <p className="text-sm text-muted-foreground">{weekRange}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate((d) => addDays(d, -7))}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Hoje
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate((d) => addDays(d, 7))}
            >
              Próxima
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Agendar
            </Button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          {/* Day headers */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border bg-muted/30">
            <div />
            {weekDays.map((day, i) => {
              const today = isToday(day);
              return (
                <div
                  key={i}
                  className={cn(
                    "text-center py-3 border-l border-border",
                    today && "bg-primary/5"
                  )}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {DIAS_SEMANA[i].abrev}
                  </p>
                  <p
                    className={cn(
                      "text-lg font-bold",
                      today ? "text-primary" : "text-foreground"
                    )}
                  >
                    {format(day, "d")}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Time slots */}
          {HORARIOS.map((horario) => (
            <div
              key={horario}
              className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border last:border-b-0 min-h-[56px]"
            >
              <div className="flex items-start justify-end pr-3 pt-2 text-xs text-muted-foreground font-medium">
                {horario}
              </div>
              {Array.from({ length: 7 }, (_, dia) => {
                const consultas = getConsulta(horario, dia);
                const today = isToday(weekDays[dia]);
                return (
                  <div
                    key={dia}
                    className={cn(
                      "border-l border-border p-1",
                      today && "bg-primary/5"
                    )}
                  >
                    {consultas.map((c) => (
                      <button
                        key={c.id}
                        className={cn(
                          "w-full text-left text-xs font-medium px-2 py-1.5 rounded border-l-[3px] cursor-pointer hover:opacity-80 transition-opacity",
                          corClasses[c.cor]
                        )}
                      >
                        {c.paciente}
                        {c.medico && (
                          <span className="opacity-70"> · {c.medico}</span>
                        )}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicAgenda;
