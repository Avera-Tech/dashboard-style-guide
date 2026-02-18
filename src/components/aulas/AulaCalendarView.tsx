import { useMemo, useCallback } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer, type Event, type EventProps } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, User, Users } from "lucide-react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AulaStatusBadge from "./AulaStatusBadge";
import type { Aula } from "@/types/aula";

const locales = { "pt-BR": ptBR };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface AulaEvent extends Event {
  resource: Aula;
}

const statusColors: Record<Aula["status"], { bg: string; border: string }> = {
  agendada: { bg: "hsl(224 60% 45% / 0.08)", border: "hsl(224 60% 45%)" },
  realizada: { bg: "hsl(152 60% 40% / 0.08)", border: "hsl(152 60% 40%)" },
  cancelada: { bg: "hsl(0 72% 51% / 0.08)", border: "hsl(0 72% 51%)" },
};

/* ── Custom event component rendered inside calendar cells ── */
const AulaEventComponent = ({ event }: EventProps<AulaEvent>) => {
  const aula = event.resource;
  const presentes = aula.presencas.filter((p) => p.status === "presente").length;
  const total = aula.presencas.length;

  return (
    <div className="flex flex-col gap-0.5 py-0.5 px-1 leading-tight">
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-foreground truncate">{aula.turmaNome}</p>
          <p className="text-[9px] text-muted-foreground truncate">{aula.modalidade} · {aula.nivel}</p>
        </div>
        <div className="shrink-0 scale-[0.7] origin-top-right -mr-1 -mt-0.5">
          <AulaStatusBadge status={aula.status} />
        </div>
      </div>
      <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
        <Clock className="h-2.5 w-2.5 shrink-0" />
        <span>{aula.horarioInicio} - {aula.horarioFim}</span>
      </div>
      <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
        <User className="h-2.5 w-2.5 shrink-0" />
        <span className="truncate">{aula.professorNome}</span>
      </div>
      {aula.status !== "cancelada" && total > 0 && (
        <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
          <Users className="h-2.5 w-2.5 shrink-0" />
          <span>
            {aula.status === "realizada"
              ? `${presentes}/${total} presentes`
              : `${total} alunos`}
          </span>
        </div>
      )}
      {aula.status === "cancelada" && aula.motivoCancelamento && (
        <p className="text-[9px] text-destructive italic truncate">{aula.motivoCancelamento}</p>
      )}
    </div>
  );
};

interface AulaCalendarViewProps {
  aulas: Aula[];
  onSelectAula: (aula: Aula) => void;
}

const AulaCalendarView = ({ aulas, onSelectAula }: AulaCalendarViewProps) => {
  const events: AulaEvent[] = useMemo(
    () =>
      aulas.map((aula) => {
        const [y, m, d] = aula.data.split("-").map(Number);
        const [hi, mi] = aula.horarioInicio.split(":").map(Number);
        const [hf, mf] = aula.horarioFim.split(":").map(Number);
        return {
          title: aula.turmaNome,
          start: new Date(y, m - 1, d, hi, mi),
          end: new Date(y, m - 1, d, hf, mf),
          resource: aula,
        };
      }),
    [aulas],
  );

  const handleSelectEvent = useCallback(
    (event: AulaEvent) => onSelectAula(event.resource),
    [onSelectAula],
  );

  const eventStyleGetter = useCallback((event: AulaEvent) => {
    const colors = statusColors[event.resource.status];
    return {
      style: {
        backgroundColor: colors.bg,
        borderLeft: `3px solid ${colors.border}`,
        color: "inherit",
        borderRadius: "8px",
        padding: "4px 6px",
        fontSize: "12px",
        fontWeight: 400,
        cursor: "pointer",
        overflow: "hidden",
      },
    };
  }, []);

  const components = useMemo(
    () => ({
      event: AulaEventComponent as React.ComponentType<EventProps<AulaEvent>>,
    }),
    [],
  );

  const messages = {
    today: "Hoje",
    previous: "Anterior",
    next: "Próximo",
    month: "Mês",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    date: "Data",
    time: "Horário",
    event: "Aula",
    noEventsInRange: "Nenhuma aula neste período",
    showMore: (total: number) => `+${total} mais`,
  };

  const defaultDate = useMemo(() => {
    if (events.length > 0) {
      const sorted = [...events].sort(
        (a, b) => (a.start as Date).getTime() - (b.start as Date).getTime(),
      );
      return sorted[Math.floor(sorted.length / 2)].start as Date;
    }
    return new Date();
  }, [events]);

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm aula-calendar">
      <BigCalendar
        localizer={localizer}
        events={events}
        defaultDate={defaultDate}
        defaultView="week"
        views={["month", "week", "day", "agenda"]}
        style={{ height: 700 }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        components={components}
        messages={messages}
        popup
        culture="pt-BR"
      />
    </div>
  );
};

export default AulaCalendarView;
