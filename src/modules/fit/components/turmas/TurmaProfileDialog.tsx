import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Users, GraduationCap, User, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AulaStatusBadge from "@/modules/fit/components/aulas/AulaStatusBadge";
import { MOCK_AULAS } from "@/modules/fit/data/mock-aulas";
import type { Turma } from "@/modules/fit/pages/Turmas";

const statusConfig = {
  active: { label: "Ativa", variant: "default" as const },
  inactive: { label: "Inativa", variant: "secondary" as const },
  pending: { label: "Pendente", variant: "outline" as const },
};

// Mock de alunos disponíveis para vincular
const MOCK_ALUNOS_DISPONIVEIS = [
  { id: "1", name: "Pedro Henrique Kevin Assunção" },
  { id: "2", name: "Ana Clara Silva" },
  { id: "3", name: "Bruno Costa Mendes" },
  { id: "4", name: "Carla Oliveira Ramos" },
  { id: "5", name: "Daniel Souza Lima" },
  { id: "6", name: "Eduarda Santos Alves" },
];

// Mock de alunos já vinculados por turma
const MOCK_ALUNOS_POR_TURMA: Record<string, { id: string; name: string }[]> = {
  "1": [
    { id: "1", name: "Pedro Henrique Kevin Assunção" },
    { id: "2", name: "Ana Clara Silva" },
    { id: "4", name: "Carla Oliveira Ramos" },
    { id: "6", name: "Eduarda Santos Alves" },
  ],
  "2": [
    { id: "3", name: "Bruno Costa Mendes" },
    { id: "4", name: "Carla Oliveira Ramos" },
  ],
  "3": [
    { id: "2", name: "Ana Clara Silva" },
    { id: "5", name: "Daniel Souza Lima" },
  ],
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

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
  const [alunosVinculados, setAlunosVinculados] = useState<{ id: string; name: string }[]>([]);
  const [selectedAlunoId, setSelectedAlunoId] = useState("");

  // Sync alunos when turma changes
  const turmaAlunos = turma ? MOCK_ALUNOS_POR_TURMA[turma.id] ?? [] : [];
  const currentAlunos = alunosVinculados.length > 0 || !turma ? alunosVinculados : turmaAlunos;

  const handleOpenChange = (value: boolean) => {
    if (value && turma) {
      setAlunosVinculados(MOCK_ALUNOS_POR_TURMA[turma.id] ?? []);
    }
    if (!value) {
      setAlunosVinculados([]);
      setSelectedAlunoId("");
    }
    onOpenChange(value);
  };

  const alunosDisponiveis = MOCK_ALUNOS_DISPONIVEIS.filter(
    (a) => !currentAlunos.some((v) => v.id === a.id)
  );

  const handleAddAluno = () => {
    if (!selectedAlunoId) return;
    const aluno = MOCK_ALUNOS_DISPONIVEIS.find((a) => a.id === selectedAlunoId);
    if (!aluno) return;
    setAlunosVinculados([...currentAlunos, aluno]);
    setSelectedAlunoId("");
    toast({ title: "Aluno vinculado", description: `${aluno.name} foi adicionado à turma.` });
  };

  const handleRemoveAluno = (alunoId: string) => {
    const aluno = currentAlunos.find((a) => a.id === alunoId);
    setAlunosVinculados(currentAlunos.filter((a) => a.id !== alunoId));
    if (aluno) {
      toast({ title: "Aluno removido", description: `${aluno.name} foi desvinculado da turma.` });
    }
  };

  if (!turma) return null;

  const status = statusConfig[turma.status];
  const occupancyPercent = Math.round((currentAlunos.length / turma.maxAlunos) * 100);
  const isFull = currentAlunos.length >= turma.maxAlunos;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
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

          <div className="flex items-start gap-3">
            <Users className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Ocupação</p>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={occupancyPercent} className="h-2 flex-1" />
                <span className="text-sm font-medium text-foreground">
                  {currentAlunos.length}/{turma.maxAlunos}
                </span>
                {isFull && <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Lotada</Badge>}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Alunos vinculados */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Alunos Vinculados</p>
            <Badge variant="secondary" className="text-[10px] font-bold">{currentAlunos.length}</Badge>
          </div>

          {/* Adicionar aluno */}
          {!isFull && alunosDisponiveis.length > 0 && (
            <div className="flex gap-2">
              <Select value={selectedAlunoId} onValueChange={setSelectedAlunoId}>
                <SelectTrigger className="flex-1 bg-background">
                  <SelectValue placeholder="Selecionar aluno..." />
                </SelectTrigger>
                <SelectContent>
                  {alunosDisponiveis.map((aluno) => (
                    <SelectItem key={aluno.id} value={aluno.id}>{aluno.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm" onClick={handleAddAluno} disabled={!selectedAlunoId}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}

          {isFull && (
            <p className="text-xs text-destructive font-medium">Turma lotada — remova um aluno para adicionar outro.</p>
          )}

          {/* Lista de alunos */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {currentAlunos.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Nenhum aluno vinculado</p>
            ) : (
              currentAlunos.map((aluno) => (
                <div
                  key={aluno.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2 group hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                        {getInitials(aluno.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{aluno.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveAluno(aluno.id)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        <Separator />

        {/* Próximas Aulas */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Próximas Aulas</p>
          {(() => {
            const turmaAulas = MOCK_AULAS
              .filter((a) => a.turmaId === turma.id)
              .sort((a, b) => a.data.localeCompare(b.data))
              .slice(0, 4);
            if (turmaAulas.length === 0)
              return <p className="text-sm text-muted-foreground text-center py-3">Nenhuma aula gerada</p>;
            return (
              <div className="space-y-1.5">
                {turmaAulas.map((a) => {
                  const [y, m, d] = a.data.split("-");
                  return (
                    <div key={a.id} className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{d}/{m}</span>
                        <span className="text-xs text-muted-foreground">{a.horarioInicio} - {a.horarioFim}</span>
                      </div>
                      <AulaStatusBadge status={a.status} />
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TurmaProfileDialog;
