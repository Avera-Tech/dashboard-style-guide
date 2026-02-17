import { Clock, User, Users, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AulaStatusBadge from "./AulaStatusBadge";
import type { Aula } from "@/types/aula";

interface AulaCardProps {
  aula: Aula;
  onView: (aula: Aula) => void;
}

const AulaCard = ({ aula, onView }: AulaCardProps) => {
  const presentes = aula.presencas.filter((p) => p.status === "presente").length;
  const total = aula.presencas.length;

  return (
    <div
      className="rounded-xl border border-border bg-card p-4 hover:shadow-md hover:shadow-primary/5 transition-all cursor-pointer group"
      onClick={() => onView(aula)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {aula.turmaNome}
          </p>
          <p className="text-xs text-muted-foreground">{aula.modalidade} · {aula.nivel}</p>
        </div>
        <AulaStatusBadge status={aula.status} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span>{aula.horarioInicio} - {aula.horarioFim}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <User className="h-3.5 w-3.5 shrink-0" />
          <span>{aula.professorNome}</span>
        </div>
        {aula.status !== "cancelada" && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span>
              {aula.status === "realizada"
                ? `${presentes}/${total} presentes`
                : `${total} alunos esperados`}
            </span>
          </div>
        )}
        {aula.status === "cancelada" && aula.motivoCancelamento && (
          <p className="text-xs text-destructive italic">{aula.motivoCancelamento}</p>
        )}
      </div>
    </div>
  );
};

export default AulaCard;
