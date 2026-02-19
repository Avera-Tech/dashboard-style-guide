import { useState } from "react";
import {
  Users,
  Plus,
  Phone,
  MessageCircle,
  UserPlus,
  AlertCircle,
  Search,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ContatoProfileDialog from "@/components/crm/ContatoProfileDialog";
import ContatoFormDialog from "@/components/crm/ContatoFormDialog";
import {
  Contato,
  statusConfig,
  origemConfig,
  tarefaStatusConfig,
  formatDateBR,
  MOCK_CONTATOS,
  MOCK_TAREFAS,
} from "@/data/crm";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const CRM = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterOrigem, setFilterOrigem] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedContato, setSelectedContato] = useState<Contato | null>(null);

  const novosCount = MOCK_CONTATOS.filter((c) => c.status === "novo").length;
  const emContatoCount = MOCK_CONTATOS.filter((c) => c.status === "em_contato" || c.status === "interessado").length;
  const tarefasPendentes = MOCK_TAREFAS.filter((t) => t.status === "pendente" || t.status === "atrasada").length;

  const filteredData = MOCK_CONTATOS.filter((contato) => {
    const matchSearch =
      !search ||
      contato.nome.toLowerCase().includes(search.toLowerCase()) ||
      contato.email.toLowerCase().includes(search.toLowerCase()) ||
      contato.telefone.includes(search);
    const matchStatus = filterStatus === "all" || contato.status === filterStatus;
    const matchOrigem = filterOrigem === "all" || contato.origem === filterOrigem;
    return matchSearch && matchStatus && matchOrigem;
  });

  const handleView = (contato: Contato) => {
    setSelectedContato(contato);
    setProfileDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">
                CRM
              </h1>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {MOCK_CONTATOS.length}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Comunicação e follow-up com contatos
            </p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="shadow-md shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Novo Contato
          </Button>
          <ContatoFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
          <ContatoProfileDialog
            open={profileDialogOpen}
            onOpenChange={setProfileDialogOpen}
            contato={selectedContato}
          />
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard
            label="Total de Contatos"
            value={String(MOCK_CONTATOS.length)}
            icon={Users}
            gradient="bg-gradient-to-br from-primary to-primary/70"
          />
          <StatCard
            label="Novos"
            value={String(novosCount)}
            icon={UserPlus}
            gradient="bg-gradient-to-br from-info to-info/70"
          />
          <StatCard
            label="Em Negociação"
            value={String(emContatoCount)}
            icon={MessageCircle}
            gradient="bg-gradient-to-br from-accent to-accent/70"
          />
          <StatCard
            label="Tarefas Pendentes"
            value={String(tarefasPendentes)}
            icon={AlertCircle}
            gradient="bg-gradient-to-br from-destructive to-destructive/70"
          />
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email ou telefone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {Object.entries(statusConfig).map(([key, val]) => (
                    <SelectItem key={key} value={key}>
                      {val.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterOrigem} onValueChange={setFilterOrigem}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Origem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {Object.entries(origemConfig).map(([key, val]) => (
                    <SelectItem key={key} value={key}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contato</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Interesse</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Contato</TableHead>
                  <TableHead className="w-[50px]">Opções</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((contato) => {
                  const status = statusConfig[contato.status];
                  const tarefas = MOCK_TAREFAS.filter(
                    (t) =>
                      t.contatoId === contato.id &&
                      (t.status === "pendente" || t.status === "atrasada")
                  );
                  return (
                    <TableRow key={contato.id} className="cursor-pointer" onClick={() => handleView(contato)}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                              {getInitials(contato.nome)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {contato.nome}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {contato.email}
                            </p>
                          </div>
                          {tarefas.length > 0 && (
                            <Badge variant="destructive" className="text-[10px] shrink-0">
                              {tarefas.length} tarefa{tarefas.length > 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {contato.telefone}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {origemConfig[contato.origem]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {contato.interesse}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDateBR(contato.ultimoContato)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleView(contato); }}>
                              <Eye className="h-4 w-4 mr-2" /> Ver perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="h-4 w-4 mr-2" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" /> Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhum contato encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CRM;
