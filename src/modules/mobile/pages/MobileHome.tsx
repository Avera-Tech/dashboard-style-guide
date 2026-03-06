import { Menu, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.svg";
import "@/styles/mobile.css";

const proximasAulas = [
  { dia: 20, mes: "Abril", diaSemana: "sábado", horario: "08:00" },
  { dia: 22, mes: "Abril", diaSemana: "segunda", horario: "08:00" },
  { dia: 23, mes: "Abril", diaSemana: "terça", horario: "08:00" },
  { dia: 25, mes: "Abril", diaSemana: "quinta", horario: "08:00" },
];

const resumoItems = [
  { label: "Créditos disponíveis", value: "10" },
  { label: "Aulas agendadas", value: "01" },
  { label: "Aulas realizadas", value: "32" },
];

const MobileHome = () => {
  return (
    <div className="mobile-page">
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

      {/* Greeting */}
      <section className="mobile-home__greeting">
        <h1 className="text-2xl font-bold text-foreground">Olá, Fulano</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          Desperte seu espírito atlético e eleve sua energia – reserve seu lugar no próximo ciclo de desafios e triunfos!
        </p>
      </section>

      {/* Próximas Aulas */}
      <section className="mobile-home__section">
        <div className="mobile-home__section-header">
          <h2 className="text-lg font-bold text-foreground">Próximas Aulas</h2>
          <Button size="sm" variant="outline" className="rounded-full text-xs h-8 px-4">
            Agendar aulas
          </Button>
        </div>

        <div className="mobile-home__aulas-scroll">
          {proximasAulas.map((aula, i) => (
            <div key={i} className="mobile-home__aula-card">
              <div className="mobile-home__aula-card-body">
                <span className="text-3xl font-extrabold text-foreground">{aula.dia}</span>
                <span className="text-xs text-muted-foreground">{aula.mes}</span>
                <span className="text-[0.65rem] text-muted-foreground">{aula.diaSemana}</span>
              </div>
              <div className="mobile-home__aula-card-footer">
                <Clock className="h-3 w-3" />
                <span>{aula.horario}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resumo */}
      <section className="mobile-home__section">
        <h2 className="text-lg font-bold text-foreground">Resumo</h2>
        <div className="mobile-home__resumo-grid">
          {resumoItems.map((item, i) => (
            <div key={i} className="mobile-home__resumo-item">
              <span className="text-xs text-muted-foreground text-center leading-tight">{item.label}</span>
              <span className="text-3xl font-extrabold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MobileHome;
