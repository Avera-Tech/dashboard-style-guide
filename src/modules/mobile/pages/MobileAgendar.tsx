import { useState, useMemo } from "react";
import { Menu, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import "@/styles/mobile.css";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const DIAS_SEMANA = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

const HORARIOS = ["08:00", "10:00", "14:00", "18:00"];

// Mock — virá dos cadastros do sistema
const MODALIDADES = [
  { id: "tenis", nome: "Tênis", emoji: "🎾" },
  { id: "beach", nome: "Beach Tennis", emoji: "🏖️" },
  { id: "padel", nome: "Padel", emoji: "🏓" },
  { id: "squash", nome: "Squash", emoji: "🏸" },
];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

const MobileAgendar = () => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [selectedModalidade, setSelectedModalidade] = useState(MODALIDADES[0].id);

  const calendarDays = useMemo(
    () => getCalendarDays(selectedYear, selectedMonth),
    [selectedYear, selectedMonth]
  );

  const isToday = (day: number) =>
    day === today.getDate() &&
    selectedMonth === today.getMonth() &&
    selectedYear === today.getFullYear();

  // Show 4 months starting from current
  const visibleMonths = useMemo(() => {
    const result: { index: number; name: string }[] = [];
    for (let i = 0; i < 4; i++) {
      const m = (today.getMonth() + i) % 12;
      result.push({ index: m, name: MESES[m] });
    }
    return result;
  }, []);

  return (
    <div className="mobile-page mobile-agendar">
      {/* Header */}
      <header className="mobile-home__header">
        <button className="mobile-home__menu-btn">
          <Menu className="h-6 w-6 text-foreground" />
        </button>
        <div className="mobile-home__header-right">
          <img src={logo} alt="Logo" className="mobile-home__header-logo" />
          <span className="mobile-home__credits">100</span>
        </div>
      </header>

      {/* Title */}
      <h1 className="text-2xl font-bold text-foreground mb-6">Agendar Aulas</h1>

      {/* Month selector */}
      <div className="mobile-agendar__months">
        {visibleMonths.map((m) => (
          <button
            key={m.index}
            onClick={() => { setSelectedMonth(m.index); setSelectedDay(null); }}
            className={`mobile-agendar__month-btn ${selectedMonth === m.index ? "mobile-agendar__month-btn--active" : ""}`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="mobile-agendar__calendar">
        {/* Weekday headers */}
        <div className="mobile-agendar__weekdays">
          {DIAS_SEMANA.map((d) => (
            <span key={d} className="mobile-agendar__weekday">{d}</span>
          ))}
        </div>

        {/* Days grid */}
        <div className="mobile-agendar__days">
          {calendarDays.map((day, i) => (
            <button
              key={i}
              disabled={day === null}
              onClick={() => day && setSelectedDay(day)}
              className={`mobile-agendar__day 
                ${day === null ? "mobile-agendar__day--empty" : ""}
                ${day === selectedDay ? "mobile-agendar__day--selected" : ""}
                ${day !== null && isToday(day) && day !== selectedDay ? "mobile-agendar__day--today" : ""}
              `}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom sheet — Horários */}
      <div className="mobile-agendar__bottom-sheet">
        <div className="mobile-agendar__bottom-sheet-header">
          <Clock className="h-5 w-5" />
          <span className="text-lg font-bold">Horários</span>
        </div>

        <div className="mobile-agendar__horarios">
          {HORARIOS.map((h) => (
            <button
              key={h}
              onClick={() => setSelectedHorario(h)}
              className={`mobile-agendar__horario ${selectedHorario === h ? "mobile-agendar__horario--active" : ""}`}
            >
              {h}
            </button>
          ))}
        </div>

        <Button
          className="w-full h-12 text-base font-semibold rounded-full mt-4"
          variant="outline"
          disabled={!selectedDay || !selectedHorario}
        >
          Continuar
        </Button>

        {/* Home indicator */}
        <div className="mobile-agendar__home-indicator" />
      </div>
    </div>
  );
};

export default MobileAgendar;
