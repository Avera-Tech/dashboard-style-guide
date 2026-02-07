import { useState } from "react";
import {
  Users as UsersIcon,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Shield,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Filter,
  Download,
  Phone,
  MapPin,
  Calendar,
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
  LogOut,
  TrendingUp,
  UserCheck,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

type UserStatus = "active" | "inactive" | "pending";
type UserRole = "admin" | "editor" | "viewer";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

const MOCK_USERS: User[] = [
  { id: "1", name: "Ana Clara Silva", email: "ana.silva@empresa.com", role: "admin", status: "active", createdAt: "2025-01-15" },
  { id: "2", name: "Bruno Costa", email: "bruno.costa@empresa.com", role: "editor", status: "active", createdAt: "2025-02-01" },
  { id: "3", name: "Carla Mendes", email: "carla.mendes@empresa.com", role: "viewer", status: "pending", createdAt: "2025-03-10" },
  { id: "4", name: "Daniel Oliveira", email: "daniel.oliveira@empresa.com", role: "editor", status: "active", createdAt: "2025-01-22" },
  { id: "5", name: "Eduarda Ramos", email: "eduarda.ramos@empresa.com", role: "viewer", status: "inactive", createdAt: "2024-11-05" },
  { id: "6", name: "Felipe Souza", email: "felipe.souza@empresa.com", role: "admin", status: "active", createdAt: "2024-12-18" },
  { id: "7", name: "Gabriela Lima", email: "gabriela.lima@empresa.com", role: "viewer", status: "active", createdAt: "2025-01-30" },
  { id: "8", name: "Henrique Alves", email: "henrique.alves@empresa.com", role: "editor", status: "pending", createdAt: "2025-03-01" },
];

const statusConfig: Record<UserStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Ativo", variant: "default" },
  inactive: { label: "Inativo", variant: "secondary" },
  pending: { label: "Pendente", variant: "outline" },
};

const roleConfig: Record<UserRole, { label: string; icon: typeof Shield }> = {
  admin: { label: "Admin", icon: Shield },
  editor: { label: "Editor", icon: Edit },
  viewer: { label: "Viewer", icon: UsersIcon },
};

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

const navItems = [
  { label: "Visão Geral", icon: LayoutDashboard, active: false },
  { label: "Usuários", icon: UsersIcon, active: true },
  { label: "Produtos", icon: Package, active: false },
  { label: "Relatórios", icon: BarChart3, active: false },
  { label: "Configurações", icon: Settings, active: false },
];

const StatCard = ({
  label,
  value,
  change,
  icon: Icon,
  gradient,
}: {
  label: string;
  value: string;
  change?: string;
  icon: typeof UsersIcon;
  gradient: string;
}) => (
  <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:shadow-primary/5 group">
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-extrabold text-foreground tracking-tight">{value}</span>
          {change && (
            <span className="flex items-center gap-0.5 text-xs font-semibold text-success mb-1">
              <TrendingUp className="h-3 w-3" />
              {change}
            </span>
          )}
        </div>
      </div>
      <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${gradient}`}>
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
  </div>
);

const UserFormDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Adicionar Usuário</DialogTitle>
        <DialogDescription>Preencha os dados para criar um novo usuário.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="user-name">Nome completo</Label>
            <Input id="user-name" placeholder="Ex: Maria Santos" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-cpf">CPF</Label>
            <Input id="user-cpf" placeholder="000.000.000-00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="user-email" type="email" placeholder="email@empresa.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-birth">Data de Nascimento</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="user-birth" type="date" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-phone">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="user-phone" placeholder="(00) 00000-0000" className="pl-10" />
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
          <div className="space-y-2">
            <Label>Papel</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um papel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="user-cep">CEP</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="user-cep" placeholder="00000-000" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-country">País</Label>
            <Input id="user-country" placeholder="Brasil" defaultValue="Brasil" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-state">Estado</Label>
            <Input id="user-state" placeholder="Ex: São Paulo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-city">Cidade</Label>
            <Input id="user-city" placeholder="Ex: São Paulo" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="user-address">Endereço</Label>
            <Input id="user-address" placeholder="Rua, número, complemento" />
          </div>
        </div>

        <Separator />

        <div className="flex items-center space-x-2">
          <Checkbox id="user-minor" />
          <Label htmlFor="user-minor" className="text-sm font-normal cursor-pointer">
            Pessoa menor de idade
          </Label>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
        <Button onClick={() => onOpenChange(false)}>Criar Usuário</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const Users = () => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredUsers = MOCK_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = MOCK_USERS.filter((u) => u.status === "active").length;
  const pendingCount = MOCK_USERS.filter((u) => u.status === "pending").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 border-r border-border bg-card/50 backdrop-blur-sm flex-col min-h-screen sticky top-0">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-sm font-extrabold text-primary-foreground">D</span>
              </div>
              <div>
                <span className="font-bold text-sm text-foreground">Dashboard</span>
                <p className="text-[10px] text-muted-foreground font-medium">Painel administrativo</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 m-3 mb-4 rounded-xl bg-muted/40 border border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">AS</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Ana Silva</p>
                <p className="text-[11px] text-muted-foreground truncate">Administradora</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold text-foreground tracking-tight">Usuários</h1>
                  <Badge variant="secondary" className="text-[10px] font-bold">
                    {MOCK_USERS.length}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">Gerencie os usuários do sistema</p>
              </div>
              <Button onClick={() => setDialogOpen(true)} className="shadow-md shadow-primary/20">
                <Plus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
              <UserFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
            </div>
          </header>

          <div className="px-6 lg:px-8 py-6 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Total de Usuários"
                value={String(MOCK_USERS.length)}
                change="+12%"
                icon={UsersIcon}
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

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  className="pl-10 bg-card"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="default" className="bg-card">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline" size="default" className="bg-card">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="w-[280px]">
                        <button className="flex items-center gap-1.5 hover:text-foreground transition-colors text-xs font-semibold uppercase tracking-wider">
                          Usuário <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wider">Papel</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                      <TableHead>
                        <button className="flex items-center gap-1.5 hover:text-foreground transition-colors text-xs font-semibold uppercase tracking-wider">
                          Criado em <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </TableHead>
                      <TableHead className="w-[50px]" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => {
                      const role = roleConfig[user.role];
                      const status = statusConfig[user.status];
                      return (
                        <TableRow key={user.id} className="group hover:bg-muted/20 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9 ring-1 ring-border">
                                <AvatarFallback className="text-xs bg-primary/5 text-primary font-semibold">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-semibold text-foreground">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <role.icon className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-sm text-foreground">{role.label}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Enviar email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remover
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-16 text-muted-foreground">
                          <div className="flex flex-col items-center gap-2">
                            <Search className="h-8 w-8 text-muted-foreground/40" />
                            <p className="font-medium">Nenhum usuário encontrado</p>
                            <p className="text-xs">Tente ajustar os filtros de busca</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/10">
                <p className="text-xs text-muted-foreground">
                  Mostrando <span className="font-semibold text-foreground">{filteredUsers.length}</span> de{" "}
                  <span className="font-semibold text-foreground">{MOCK_USERS.length}</span> usuários
                </p>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="h-8 min-w-[32px] shadow-sm">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 min-w-[32px]">
                    2
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
