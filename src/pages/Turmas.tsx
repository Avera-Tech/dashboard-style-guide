import { useState } from "react";
import {
  Users,
  Plus,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import TurmaTable from "@/components/turmas/TurmaTable";
import TurmaFormDialog from "@/components/turmas/TurmaFormDialog";
import TurmaProfileDialog from "@/components/turmas/TurmaProfileDialog";
import TurmaDeleteDialog from "@/components/turmas/TurmaDeleteDialog";
import { toast } from "@/hooks/use-toast";

export interface Turma {
  id: string;
  name: string;
  modalidade: string;
  nivel: string;
  professor: string;
  diasSemana: string[];
  horario: string;
  maxAlunos: number;
  alunosAtuais: number;
  status: "active" | "inactive" | "pending";
  createdAt: string;
}

const MOCK_TURMAS: Turma[] = [
  {
    id: "1",
    name: "Tennis Iniciante A",
    modalidade: "Tennis",
    nivel: "Iniciante",
    professor: "João Silva",
    diasSemana: ["Seg", "Qua"],
    horario: "14:00 - 15:00",
    maxAlunos: 8,
    alunosAtuais: 6,
    status: "active",
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    name: "Tennis Avançado",
    modalidade: "Tennis",
    nivel: "Avançado",
    professor: "Carlos Souza",
    diasSemana: ["Ter", "Qui"],
    horario: "16:00 - 17:30",
    maxAlunos: 6,
    alunosAtuais: 6,
    status: "active",
    createdAt: "2025-01-12",
  },
  {
    id: "3",
    name: "Futevôlei Intermediário",
    modalidade: "Futevôlei",
    nivel: "Intermediário",
    professor: "Ana Costa",
    diasSemana: ["Seg", "Qua", "Sex"],
    horario: "08:00 - 09:30",
    maxAlunos: 12,
    alunosAtuais: 9,
    status: "active",
    createdAt: "2025-02-01",
  },
  {
    id: "4",
    name: "Tennis Kids",
    modalidade: "Tennis",
    nivel: "Iniciante",
    professor: "Maria Oliveira",
    diasSemana: ["Sáb"],
    horario: "09:00 - 10:00",
    maxAlunos: 10,
    alunosAtuais: 4,
    status: "active",
    createdAt: "2025-02-10",
  },
  {
    id: "5",
    name: "Beach Tennis Noturno",
    modalidade: "Beach Tennis",
    nivel: "Intermediário",
    professor: "Pedro Lima",
    diasSemana: ["Ter", "Qui"],
    horario: "19:00 - 20:30",
    maxAlunos: 8,
    alunosAtuais: 0,
    status: "inactive",
    createdAt: "2024-12-15",
  },
];

const Turmas = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<Turma | null>(null);

  const activeCount = MOCK_TURMAS.filter((t) => t.status === "active").length;
  const inactiveCount = MOCK_TURMAS.filter((t) => t.status === "inactive").length;
  const totalAlunos = MOCK_TURMAS.reduce((acc, t) => acc + t.alunosAtuais, 0);

  const handleView = (turma: Turma) => {
    setSelectedTurma(turma);
    setProfileDialogOpen(true);
  };

  const handleEdit = (turma: Turma) => {
    setSelectedTurma(turma);
    setEditDialogOpen(true);
  };

  const handleDelete = (turma: Turma) => {
    setSelectedTurma(turma);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    toast({
      title: "Turma removida",
      description: `${selectedTurma?.name} foi removida com sucesso.`,
    });
    setDeleteDialogOpen(false);
    setSelectedTurma(null);
  };

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">Turmas</h1>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {MOCK_TURMAS.length}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Gerencie as turmas e alocação de alunos</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="shadow-md shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Nova Turma
          </Button>
          <TurmaFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
          <TurmaFormDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} />
          <TurmaProfileDialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen} turma={selectedTurma} />
          <TurmaDeleteDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            turmaName={selectedTurma?.name ?? null}
            onConfirm={handleConfirmDelete}
          />
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard
            label="Total de Turmas"
            value={String(MOCK_TURMAS.length)}
            icon={Calendar}
            gradient="bg-gradient-to-br from-primary to-primary/70"
          />
          <StatCard
            label="Ativas"
            value={String(activeCount)}
            icon={CheckCircle}
            gradient="bg-gradient-to-br from-success to-success/70"
          />
          <StatCard
            label="Inativas"
            value={String(inactiveCount)}
            icon={XCircle}
            gradient="bg-gradient-to-br from-accent to-accent/70"
          />
          <StatCard
            label="Alunos Alocados"
            value={String(totalAlunos)}
            icon={Users}
            gradient="bg-gradient-to-br from-secondary to-secondary/70"
          />
        </div>

        <TurmaTable
          data={MOCK_TURMAS}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default Turmas;
