import { useState } from "react";
import {
  Briefcase,
  Plus,
  UserCheck,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  BadgeCheck,
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

interface Funcionario extends BaseUser {
  cargo: string;
  departamento: string;
  dataAdmissao: string;
}

const MOCK_FUNCIONARIOS: Funcionario[] = [
  { id: "1", name: "Roberto Ferreira", email: "roberto.ferreira@empresa.com", status: "active", createdAt: "2024-06-15", cargo: "Professor", departamento: "Ensino", dataAdmissao: "2024-06-15" },
  { id: "2", name: "Mariana Lopes", email: "mariana.lopes@empresa.com", status: "active", createdAt: "2024-08-01", cargo: "Coordenadora", departamento: "Coordenação", dataAdmissao: "2024-08-01" },
  { id: "3", name: "Carlos Pereira", email: "carlos.pereira@empresa.com", status: "active", createdAt: "2024-03-10", cargo: "Professor", departamento: "Ensino", dataAdmissao: "2024-03-10" },
  { id: "4", name: "Juliana Santos", email: "juliana.santos@empresa.com", status: "pending", createdAt: "2025-02-01", cargo: "Secretária", departamento: "Administrativo", dataAdmissao: "2025-02-01" },
  { id: "5", name: "Pedro Nascimento", email: "pedro.nascimento@empresa.com", status: "active", createdAt: "2023-11-20", cargo: "Diretor", departamento: "Diretoria", dataAdmissao: "2023-11-20" },
  { id: "6", name: "Fernanda Ribeiro", email: "fernanda.ribeiro@empresa.com", status: "inactive", createdAt: "2024-01-10", cargo: "Professora", departamento: "Ensino", dataAdmissao: "2024-01-10" },
];

const funcionarioColumns: Column<Funcionario>[] = [
  {
    key: "cargo",
    label: "Cargo",
    render: (f) => (
      <div className="flex items-center gap-1.5">
        <BadgeCheck className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-sm text-foreground">{f.cargo}</span>
      </div>
    ),
  },
  {
    key: "departamento",
    label: "Departamento",
    render: (f) => (
      <Badge variant="outline" className="font-medium">
        {f.departamento}
      </Badge>
    ),
  },
  {
    key: "dataAdmissao",
    label: "Admissão",
    sortable: true,
    render: (f) => (
      <span className="text-sm text-muted-foreground">
        {new Date(f.dataAdmissao).toLocaleDateString("pt-BR")}
      </span>
    ),
  },
];

const FuncionarioFormDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Adicionar Funcionário</DialogTitle>
        <DialogDescription>Preencha os dados para cadastrar um novo funcionário.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="func-name">Nome completo</Label>
            <Input id="func-name" placeholder="Ex: Roberto Ferreira" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="func-cpf">CPF</Label>
            <Input id="func-cpf" placeholder="000.000.000-00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="func-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="func-email" type="email" placeholder="email@empresa.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="func-birth">Data de Nascimento</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="func-birth" type="date" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="func-phone">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="func-phone" placeholder="(00) 00000-0000" className="pl-10" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Campos específicos do funcionário */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="func-cargo">Cargo</Label>
            <div className="relative">
              <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="func-cargo" placeholder="Ex: Professor" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Departamento</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ensino">Ensino</SelectItem>
                <SelectItem value="coordenacao">Coordenação</SelectItem>
                <SelectItem value="diretoria">Diretoria</SelectItem>
                <SelectItem value="administrativo">Administrativo</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="ti">TI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="func-admissao">Data de Admissão</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="func-admissao" type="date" className="pl-10" />
            </div>
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

        {/* Endereço */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="func-cep">CEP</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="func-cep" placeholder="00000-000" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="func-state">Estado</Label>
            <Input id="func-state" placeholder="Ex: São Paulo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="func-city">Cidade</Label>
            <Input id="func-city" placeholder="Ex: São Paulo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="func-address">Endereço</Label>
            <Input id="func-address" placeholder="Rua, número, complemento" />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
        <Button onClick={() => onOpenChange(false)}>Cadastrar Funcionário</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const Funcionarios = () => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const activeCount = MOCK_FUNCIONARIOS.filter((u) => u.status === "active").length;
  const pendingCount = MOCK_FUNCIONARIOS.filter((u) => u.status === "pending").length;

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">Funcionários</h1>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {MOCK_FUNCIONARIOS.length}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Gerencie os funcionários da instituição</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="shadow-md shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Novo Funcionário
          </Button>
          <FuncionarioFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total de Funcionários"
            value={String(MOCK_FUNCIONARIOS.length)}
            change="+5%"
            icon={Briefcase}
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
          data={MOCK_FUNCIONARIOS}
          columns={funcionarioColumns}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Buscar funcionário por nome ou email..."
        />
      </div>
    </DashboardLayout>
  );
};

export default Funcionarios;
