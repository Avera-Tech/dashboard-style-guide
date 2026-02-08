import { useState } from "react";
import {
  GraduationCap,
  Plus,
  UserCheck,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import UserTable from "@/components/dashboard/UserTable";
import type { BaseUser, Column, FilterConfig } from "@/components/dashboard/UserTable";
import AlunoFormDialog from "@/components/alunos/AlunoFormDialog";

interface Aluno extends BaseUser {
  phone: string;
  modalidade: string;
  nivel: string;
  ultimoCheckin: string;
}

const MOCK_ALUNOS: Aluno[] = [
  { id: "1", name: "Pedro Henrique Kevin Assunção", email: "pedro-assuncao86@grupoap.com.br", status: "active", createdAt: "2025-01-15", phone: "(62) 98759-1829", modalidade: "Tennis", nivel: "Intermediário", ultimoCheckin: "12/12/2023" },
  { id: "2", name: "Ana Clara Silva", email: "ana.silva@email.com", status: "active", createdAt: "2025-02-01", phone: "(11) 99876-5432", modalidade: "Futevôlei", nivel: "Iniciante", ultimoCheckin: "05/02/2026" },
  { id: "3", name: "Bruno Costa Mendes", email: "bruno.costa@email.com", status: "pending", createdAt: "2025-03-10", phone: "(21) 98765-4321", modalidade: "Tennis", nivel: "Avançado", ultimoCheckin: "01/02/2026" },
  { id: "4", name: "Carla Oliveira Ramos", email: "carla.oliveira@email.com", status: "active", createdAt: "2025-01-22", phone: "(31) 97654-3210", modalidade: "Ambos", nivel: "Competitivo", ultimoCheckin: "07/02/2026" },
  { id: "5", name: "Daniel Souza Lima", email: "daniel.souza@email.com", status: "inactive", createdAt: "2024-11-05", phone: "(41) 96543-2109", modalidade: "Futevôlei", nivel: "Intermediário", ultimoCheckin: "20/01/2026" },
  { id: "6", name: "Eduarda Santos Alves", email: "eduarda.santos@email.com", status: "active", createdAt: "2024-12-18", phone: "(51) 95432-1098", modalidade: "Tennis", nivel: "Iniciante", ultimoCheckin: "06/02/2026" },
];

const alunoColumns: Column<Aluno>[] = [
  {
    key: "phone",
    label: "Telefone",
    render: (aluno) => <span className="text-sm text-muted-foreground">{aluno.phone}</span>,
  },
  {
    key: "modalidade",
    label: "Modalidade",
    render: (aluno) => (
      <Badge variant="outline" className="font-medium">
        {aluno.modalidade}
      </Badge>
    ),
  },
  {
    key: "nivel",
    label: "Nível",
    render: (aluno) => (
      <Badge variant="secondary" className="font-medium">
        {aluno.nivel}
      </Badge>
    ),
  },
  {
    key: "ultimoCheckin",
    label: "Último Check-in",
    render: (aluno) => <span className="text-sm text-muted-foreground">{aluno.ultimoCheckin}</span>,
  },
];

const alunoFilters: FilterConfig[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Ativo", value: "active" },
      { label: "Inativo", value: "inactive" },
      { label: "Pendente", value: "pending" },
    ],
  },
  {
    key: "nivel",
    label: "Nível",
    options: [
      { label: "Iniciante", value: "Iniciante" },
      { label: "Intermediário", value: "Intermediário" },
      { label: "Avançado", value: "Avançado" },
      { label: "Competitivo", value: "Competitivo" },
    ],
  },
];

const Alunos = () => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const activeCount = MOCK_ALUNOS.filter((u) => u.status === "active").length;
  const pendingCount = MOCK_ALUNOS.filter((u) => u.status === "pending").length;

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">Alunos</h1>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {MOCK_ALUNOS.length}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Gerencie os alunos do CT</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="shadow-md shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Novo Aluno
          </Button>
          <AlunoFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total de Alunos"
            value={String(MOCK_ALUNOS.length)}
            change="+12%"
            icon={GraduationCap}
            gradient="bg-gradient-to-br from-primary to-primary/70"
          />
          <StatCard
            label="Ativos"
            value={String(activeCount)}
            icon={UserCheck}
            gradient="bg-gradient-to-br from-success to-success/70"
          />
          <StatCard
            label="Pendentes"
            value={String(pendingCount)}
            icon={Clock}
            gradient="bg-gradient-to-br from-accent to-accent/70"
          />
        </div>

        <UserTable
          data={MOCK_ALUNOS}
          columns={alunoColumns}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Buscar aluno por nome ou email..."
          filters={alunoFilters}
          activeFilters={activeFilters}
          onFilterChange={(key, values) =>
            setActiveFilters((prev) => ({ ...prev, [key]: values }))
          }
        />
      </div>
    </DashboardLayout>
  );
};

export default Alunos;
