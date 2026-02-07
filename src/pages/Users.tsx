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
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

const StatCard = ({ label, value, change }: { label: string; value: string; change?: string }) => (
  <Card>
    <CardContent className="p-5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <div className="flex items-end gap-2 mt-1">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {change && <span className="text-xs font-medium text-success mb-0.5">{change}</span>}
      </div>
    </CardContent>
  </Card>
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
      {/* Sidebar + Content layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-60 border-r border-border bg-card flex-col min-h-screen sticky top-0">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">D</span>
              </div>
              <span className="font-semibold text-sm text-foreground">Dashboard</span>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-0.5">
            {[
              { label: "Visão Geral", active: false },
              { label: "Usuários", active: true },
              { label: "Produtos", active: false },
              { label: "Relatórios", active: false },
              { label: "Configurações", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">AS</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Ana Silva</p>
                <p className="text-xs text-muted-foreground truncate">admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-foreground">Usuários</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Gerencie os usuários do sistema</p>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Adicionar Usuário</DialogTitle>
                    <DialogDescription>Preencha os dados para criar um novo usuário.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="user-name">Nome completo</Label>
                      <Input id="user-name" placeholder="Ex: Maria Santos" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="user-email" type="email" placeholder="email@empresa.com" className="pl-10" />
                      </div>
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
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={() => setDialogOpen(false)}>Criar Usuário</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <div className="px-6 lg:px-8 py-6 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Total de Usuários" value={String(MOCK_USERS.length)} change="+12%" />
              <StatCard label="Ativos" value={String(activeCount)} />
              <StatCard label="Pendentes" value={String(pendingCount)} />
            </div>

            {/* Filters bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline" size="default">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* Table */}
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[280px]">
                        <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                          Usuário <ArrowUpDown className="h-3 w-3" />
                        </button>
                      </TableHead>
                      <TableHead>Papel</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <button className="flex items-center gap-1 hover:text-foreground transition-colors">
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
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="text-xs bg-muted text-muted-foreground font-medium">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-foreground">{user.name}</p>
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
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
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
                        <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                          Nenhum usuário encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <Separator />
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  Mostrando {filteredUsers.length} de {MOCK_USERS.length} usuários
                </p>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 min-w-[32px] bg-primary text-primary-foreground hover:bg-primary/90">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 min-w-[32px]">2</Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
