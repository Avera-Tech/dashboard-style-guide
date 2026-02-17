import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, Users, GraduationCap, User } from "lucide-react";
import type { Turma } from "@/pages/Turmas";

const statusConfig = {
  active: { label: "Ativa", variant: "default" as const },
  inactive: { label: "Inativa", variant: "secondary" as const },
  pending: { label: "Pendente", variant: "outline" as const },
};

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

const TurmaProfileDialog = ({
  open,
  onOpenChange,
  turma,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  turma: Turma | null;
}) => {
  if (!turma) return null;

  const status = statusConfig[turma.status];
  const occupancyPercent = Math.round((turma.alunosAtuais / turma.maxAlunos) * 100);
  const isFull = turma.alunosAtuais >= turma.maxAlunos;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes da Turma</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{turma.name}</p>
            <div className="flex items-center gap-2 justify-center mt-1">
              <Badge variant="outline">{turma.modalidade}</Badge>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4 py-2">
          <InfoRow icon={GraduationCap} label="Nível" value={turma.nivel} />
          <InfoRow icon={User} label="Professor" value={turma.professor} />
          <InfoRow icon={Calendar} label="Dias" value={turma.diasSemana.join(", ")} />
          <InfoRow icon={Clock} label="Horário" value={turma.horario} />
          <InfoRow icon={Calendar} label="Criada em" value={new Date(turma.createdAt).toLocaleDateString("pt-BR")} />

          <div className="flex items-start gap-3">
            <Users className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Ocupação</p>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={occupancyPercent} className="h-2 flex-1" />
                <span className="text-sm font-medium text-foreground">
                  {turma.alunosAtuais}/{turma.maxAlunos}
                </span>
                {isFull && <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Lotada</Badge>}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TurmaProfileDialog;
