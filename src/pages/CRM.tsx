import { useState } from "react";
import {
  MessageSquare,
  Plus,
  Calendar,
  Bell,
  Send,
  Search,
  MoreVertical,
  Eye,
  Trash2,
  Clock,
  CheckCheck,
  Zap,
  PenLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import LembreteDetailDialog from "@/components/crm/LembreteDetailDialog";
import LembreteFormDialog from "@/components/crm/LembreteFormDialog";
import RegrasPanel from "@/components/crm/RegrasPanel";
import {
  Lembrete,
  tipoConfig,
  statusConfig,
  canalConfig,
  formatDateTimeBR,
  MOCK_LEMBRETES,
} from "@/data/crm";
import { toast } from "@/hooks/use-toast";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const statusIcon = {
  pendente: Clock,
  enviado: Send,
  lido: CheckCheck,
};

const CRM = () => {
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedLembrete, setSelectedLembrete] = useState<Lembrete | null>(null);

  const pendentesCount = MOCK_LEMBRETES.filter((l) => l.status === "pendente").length;
  const enviadosCount = MOCK_LEMBRETES.filter((l) => l.status === "enviado").length;
  const autoCount = MOCK_LEMBRETES.filter((l) => l.origem === "automatico").length;

  const filteredData = MOCK_LEMBRETES.filter((l) => {
    const matchSearch =
      !search ||
      l.alunoNome.toLowerCase().includes(search.toLowerCase()) ||
      l.titulo.toLowerCase().includes(search.toLowerCase());
    const matchTipo = filterTipo === "all" || l.tipo === filterTipo;
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchTipo && matchStatus;
  }).sort((a, b) => new Date(b.dataEnvio).getTime() - new Date(a.dataEnvio).getTime());

  const handleView = (lembrete: Lembrete) => {
    setSelectedLembrete(lembrete);
    setDetailOpen(true);
  };

  const handleResend = (lembrete: Lembrete) => {
    toast({
      title: "Lembrete reenviado",
      description: `"${lembrete.titulo}" reenviado para ${lembrete.alunoNome}.`,
    });
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
                Comunicação
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Lembretes automáticos e comunicações com alunos
            </p>
          </div>
          <Button onClick={() => setFormOpen(true)} className="shadow-md shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Lembrete Avulso
          </Button>
          <LembreteFormDialog open={formOpen} onOpenChange={setFormOpen} />
          <LembreteDetailDialog
            open={detailOpen}
            onOpenChange={setDetailOpen}
            lembrete={selectedLembrete}
          />
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard
            label="Total de Lembretes"
            value={String(MOCK_LEMBRETES.length)}
            icon={MessageSquare}
            gradient="bg-gradient-to-br from-primary to-primary/70"
          />
          <StatCard
            label="Automáticos"
            value={String(autoCount)}
            icon={Zap}
            gradient="bg-gradient-to-br from-info to-info/70"
          />
          <StatCard
            label="Pendentes"
            value={String(pendentesCount)}
            icon={Bell}
            gradient="bg-gradient-to-br from-accent to-accent/70"
          />
          <StatCard
            label="Enviados"
            value={String(enviadosCount)}
            icon={Send}
            gradient="bg-gradient-to-br from-success to-success/70"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="lembretes" className="w-full">
          <TabsList>
            <TabsTrigger value="lembretes" className="gap-1.5">
              <MessageSquare className="h-4 w-4" />
              Lembretes
            </TabsTrigger>
            <TabsTrigger value="regras" className="gap-1.5">
              <Zap className="h-4 w-4" />
              Regras de Disparo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lembretes" className="space-y-4 mt-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por aluno ou título..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={filterTipo} onValueChange={setFilterTipo}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      {Object.entries(tipoConfig).map(([key, val]) => (
                        <SelectItem key={key} value={key}>
                          {val.emoji} {val.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[150px]">
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
                </div>
              </CardContent>
            </Card>

            {/* Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aluno</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Canal</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="w-[50px]">Opções</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((lembrete) => {
                      const tipo = tipoConfig[lembrete.tipo];
                      const status = statusConfig[lembrete.status];
                      const canal = canalConfig[lembrete.canal];
                      const StatusIcon = statusIcon[lembrete.status];
                      return (
                        <TableRow
                          key={lembrete.id}
                          className="cursor-pointer"
                          onClick={() => handleView(lembrete)}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                                  {getInitials(lembrete.alunoNome)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium text-foreground truncate max-w-[140px]">
                                {lembrete.alunoNome}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs whitespace-nowrap">
                              {tipo.emoji} {tipo.label}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-foreground truncate max-w-[180px] block">
                              {lembrete.titulo}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px]">
                              {canal.emoji} {canal.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {lembrete.origem === "automatico" ? (
                              <Badge variant="secondary" className="text-[10px] gap-1">
                                <Zap className="h-3 w-3" /> Auto
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px] gap-1">
                                <PenLine className="h-3 w-3" /> Manual
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <StatusIcon className="h-3.5 w-3.5 text-muted-foreground" />
                              <Badge variant={status.variant} className="text-[10px]">
                                {status.label}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDateTimeBR(lembrete.dataEnvio)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleView(lembrete); }}>
                                  <Eye className="h-4 w-4 mr-2" /> Ver detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleResend(lembrete); }}>
                                  <Send className="h-4 w-4 mr-2" /> Reenviar
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
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          Nenhum lembrete encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regras" className="mt-4">
            <RegrasPanel />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CRM;
