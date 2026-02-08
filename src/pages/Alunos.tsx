import { useState } from "react";
import {
  GraduationCap,
  Plus,
  UserCheck,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Users as UsersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import UserTable from "@/components/dashboard/UserTable";
import type { BaseUser, Column } from "@/components/dashboard/UserTable";

interface Aluno extends BaseUser {
  matricula: string;
  turma: string;
  turno: string;
}

const MOCK_ALUNOS: Aluno[] = [
  { id: "1", name: "Ana Clara Silva", email: "ana.silva@escola.com", status: "active", createdAt: "2025-01-15", matricula: "2025001", turma: "9º A", turno: "Manhã" },
  { id: "2", name: "Bruno Costa", email: "bruno.costa@escola.com", status: "active", createdAt: "2025-02-01", matricula: "2025002", turma: "8º B", turno: "Tarde" },
  { id: "3", name: "Carla Mendes", email: "carla.mendes@escola.com", status: "pending", createdAt: "2025-03-10", matricula: "2025003", turma: "7º A", turno: "Manhã" },
  { id: "4", name: "Daniel Oliveira", email: "daniel.oliveira@escola.com", status: "active", createdAt: "2025-01-22", matricula: "2025004", turma: "9º B", turno: "Manhã" },
  { id: "5", name: "Eduarda Ramos", email: "eduarda.ramos@escola.com", status: "inactive", createdAt: "2024-11-05", matricula: "2024050", turma: "6º A", turno: "Tarde" },
  { id: "6", name: "Felipe Souza", email: "felipe.souza@escola.com", status: "active", createdAt: "2024-12-18", matricula: "2024060", turma: "8º A", turno: "Manhã" },
  { id: "7", name: "Gabriela Lima", email: "gabriela.lima@escola.com", status: "active", createdAt: "2025-01-30", matricula: "2025007", turma: "7º B", turno: "Tarde" },
  { id: "8", name: "Henrique Alves", email: "henrique.alves@escola.com", status: "pending", createdAt: "2025-03-01", matricula: "2025008", turma: "9º A", turno: "Manhã" },
];

const alunoColumns: Column<Aluno>[] = [
  {
    key: "matricula",
    label: "Matrícula",
    render: (aluno) => <span className="text-sm font-mono text-foreground">{aluno.matricula}</span>,
  },
  {
    key: "turma",
    label: "Turma",
    render: (aluno) => (
      <Badge variant="outline" className="font-medium">
        {aluno.turma}
      </Badge>
    ),
  },
  {
    key: "turno",
    label: "Turno",
    render: (aluno) => <span className="text-sm text-muted-foreground">{aluno.turno}</span>,
  },
];

const AlunoFormDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Adicionar Aluno</DialogTitle>
        <DialogDescription>Preencha os dados para matricular um novo aluno.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="aluno-name">Nome completo</Label>
            <Input id="aluno-name" placeholder="Ex: Maria Santos" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-cpf">CPF</Label>
            <Input id="aluno-cpf" placeholder="000.000.000-00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-email" type="email" placeholder="email@escola.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-birth">Data de Nascimento</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-birth" type="date" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-phone">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-phone" placeholder="(00) 00000-0000" className="pl-10" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Campos específicos do aluno */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="aluno-matricula">Matrícula</Label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-matricula" placeholder="2025001" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Turma</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a turma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6a">6º A</SelectItem>
                <SelectItem value="6b">6º B</SelectItem>
                <SelectItem value="7a">7º A</SelectItem>
                <SelectItem value="7b">7º B</SelectItem>
                <SelectItem value="8a">8º A</SelectItem>
                <SelectItem value="8b">8º B</SelectItem>
                <SelectItem value="9a">9º A</SelectItem>
                <SelectItem value="9b">9º B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Turno</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o turno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manha">Manhã</SelectItem>
                <SelectItem value="tarde">Tarde</SelectItem>
                <SelectItem value="integral">Integral</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Responsável */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="aluno-responsavel">Nome do Responsável</Label>
            <div className="relative">
              <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-responsavel" placeholder="Nome do pai/mãe ou responsável" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-resp-phone">Telefone do Responsável</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-resp-phone" placeholder="(00) 00000-0000" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-resp-email">Email do Responsável</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-resp-email" type="email" placeholder="responsavel@email.com" className="pl-10" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Endereço */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="aluno-cep">CEP</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-cep" placeholder="00000-000" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-state">Estado</Label>
            <Input id="aluno-state" placeholder="Ex: São Paulo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-city">Cidade</Label>
            <Input id="aluno-city" placeholder="Ex: São Paulo" />
          </div>
          <div className="space-y-2 sm:col-span-1">
            <Label htmlFor="aluno-address">Endereço</Label>
            <Input id="aluno-address" placeholder="Rua, número, complemento" />
          </div>
        </div>

        <Separator />

        <div className="flex items-center space-x-2">
          <Checkbox id="aluno-minor" defaultChecked />
          <Label htmlFor="aluno-minor" className="text-sm font-normal cursor-pointer">
            Pessoa menor de idade
          </Label>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
        <Button onClick={() => onOpenChange(false)}>Matricular Aluno</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const Alunos = () => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

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
            <p className="text-sm text-muted-foreground mt-0.5">Gerencie os alunos matriculados</p>
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
        />
      </div>
    </DashboardLayout>
  );
};

export default Alunos;
