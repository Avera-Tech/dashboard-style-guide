import { useMemo, useCallback } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer, type Event } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
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
  agendada: { bg: "hsl(224 60% 45% / 0.15)", border: "hsl(224 60% 45%)" },
  realizada: { bg: "hsl(152 60% 40% / 0.15)", border: "hsl(152 60% 40%)" },
  cancelada: { bg: "hsl(0 72% 51% / 0.15)", border: "hsl(0 72% 51%)" },
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
        color: "hsl(224 30% 12%)",
        borderRadius: "6px",
        padding: "2px 6px",
        fontSize: "12px",
        fontWeight: 600,
      },
    };
  }, []);

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
        defaultView="month"
        views={["month", "week", "day", "agenda"]}
        style={{ height: 650 }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        messages={messages}
        popup
        culture="pt-BR"
      />
    </div>
  );
};

export default AulaCalendarView;
