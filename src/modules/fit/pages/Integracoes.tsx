import { useState } from "react";
import {
  Plug,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  ArrowRightLeft,
  Settings,
  RefreshCw,
  UserCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import StatCard from "@/modules/core/components/dashboard/StatCard";
import { toast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  logo: string;
  connected: boolean;
  autoAccept: boolean;
  lastSync: string;
  totalCheckins: number;
  pendingCheckins: number;
  color: string;
}

interface Checkin {
  id: string;
  alunoName: string;
  alunoEmail: string;
  platform: "WellHub" | "TotalPass";
  timestamp: string;
  status: "accepted" | "pending" | "rejected";
  modalidade: string;
  planType: string;
}

const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: "wellhub",
    name: "WellHub",
    logo: "W",
    connected: true,
    autoAccept: true,
    lastSync: "Há 5 minutos",
    totalCheckins: 234,
    pendingCheckins: 0,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "totalpass",
    name: "TotalPass",
    logo: "T",
    connected: true,
    autoAccept: false,
    lastSync: "Há 12 minutos",
    totalCheckins: 187,
    pendingCheckins: 3,
    color: "from-blue-500 to-cyan-500",
  },
];

const MOCK_CHECKINS: Checkin[] = [
  { id: "1", alunoName: "Pedro Henrique Assunção", alunoEmail: "pedro@email.com", platform: "WellHub", timestamp: "20/02/2026 08:15", status: "accepted", modalidade: "Tennis", planType: "Gold" },
  { id: "2", alunoName: "Ana Clara Silva", alunoEmail: "ana.silva@email.com", platform: "WellHub", timestamp: "20/02/2026 08:30", status: "accepted", modalidade: "Futevôlei", planType: "Platinum" },
  { id: "3", alunoName: "Bruno Costa Mendes", alunoEmail: "bruno.costa@email.com", platform: "TotalPass", timestamp: "20/02/2026 09:00", status: "pending", modalidade: "Tennis", planType: "Premium" },
  { id: "4", alunoName: "Carla Oliveira Ramos", alunoEmail: "carla.oliveira@email.com", platform: "TotalPass", timestamp: "20/02/2026 09:15", status: "pending", modalidade: "Futevôlei", planType: "Standard" },
  { id: "5", alunoName: "Daniel Souza Lima", alunoEmail: "daniel.souza@email.com", platform: "WellHub", timestamp: "20/02/2026 09:45", status: "accepted", modalidade: "Tennis", planType: "Gold" },
  { id: "6", alunoName: "Eduarda Santos Alves", alunoEmail: "eduarda.santos@email.com", platform: "TotalPass", timestamp: "20/02/2026 10:00", status: "pending", modalidade: "Tennis", planType: "Premium" },
  { id: "7", alunoName: "Fernando Martins", alunoEmail: "fernando.m@email.com", platform: "WellHub", timestamp: "19/02/2026 14:20", status: "accepted", modalidade: "Futevôlei", planType: "Platinum" },
  { id: "8", alunoName: "Gabriela Lima Rocha", alunoEmail: "gabriela.r@email.com", platform: "WellHub", timestamp: "19/02/2026 16:00", status: "rejected", modalidade: "Tennis", planType: "Basic" },
  { id: "9", alunoName: "Henrique Nascimento", alunoEmail: "henrique.n@email.com", platform: "TotalPass", timestamp: "19/02/2026 17:30", status: "accepted", modalidade: "Tennis", planType: "Standard" },
  { id: "10", alunoName: "Isabela Ferreira", alunoEmail: "isabela.f@email.com", platform: "WellHub", timestamp: "19/02/2026 18:00", status: "accepted", modalidade: "Futevôlei", planType: "Gold" },
];

const statusConfig = {
  accepted: { label: "Aceito", variant: "default" as const, icon: CheckCircle2, className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  pending: { label: "Pendente", variant: "secondary" as const, icon: Clock, className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  rejected: { label: "Rejeitado", variant: "destructive" as const, icon: XCircle, className: "bg-red-500/10 text-red-600 border-red-500/20" },
};

const Integracoes = () => {
  const [integrations, setIntegrations] = useState(MOCK_INTEGRATIONS);
  const [checkins, setCheckins] = useState(MOCK_CHECKINS);
  const [filterPlatform, setFilterPlatform] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const totalCheckins = integrations.reduce((sum, i) => sum + i.totalCheckins, 0);
  const pendingCheckins = integrations.reduce((sum, i) => sum + i.pendingCheckins, 0);
  const connectedCount = integrations.filter((i) => i.connected).length;

  const filteredCheckins = checkins.filter((c) => {
    if (filterPlatform !== "all" && c.platform !== filterPlatform) return false;
    if (filterStatus !== "all" && c.status !== filterStatus) return false;
    return true;
  });

  const toggleAutoAccept = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((i) => {
        if (i.id === integrationId) {
          const newValue = !i.autoAccept;
          toast({
            title: newValue ? "Aceite automático ativado" : "Aceite automático desativado",
            description: `${i.name}: check-ins serão ${newValue ? "aceitos automaticamente" : "revisados manualmente"}.`,
          });
          return { ...i, autoAccept: newValue };
        }
        return i;
      })
    );
  };

  const handleAcceptCheckin = (checkinId: string) => {
    setCheckins((prev) =>
      prev.map((c) => (c.id === checkinId ? { ...c, status: "accepted" as const } : c))
    );
    toast({ title: "Check-in aceito", description: "O aluno foi confirmado com sucesso." });
  };

  const handleRejectCheckin = (checkinId: string) => {
    setCheckins((prev) =>
      prev.map((c) => (c.id === checkinId ? { ...c, status: "rejected" as const } : c))
    );
    toast({ title: "Check-in rejeitado", description: "O check-in foi recusado." });
  };

  const handleAcceptAll = () => {
    const pendingCount = checkins.filter((c) => c.status === "pending").length;
    setCheckins((prev) =>
      prev.map((c) => (c.status === "pending" ? { ...c, status: "accepted" as const } : c))
    );
    toast({ title: "Todos aceitos", description: `${pendingCount} check-ins foram aceitos.` });
  };

  const openConfig = (integration: Integration) => {
    setSelectedIntegration(integration);
    setConfigDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">Integrações</h1>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {connectedCount} conectadas
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Gerencie integrações com plataformas de benefícios
            </p>
          </div>
          <Button variant="outline" onClick={() => toast({ title: "Sincronizando...", description: "Buscando novos check-ins das plataformas." })}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sincronizar
          </Button>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Plataformas Conectadas" value={String(connectedCount)} icon={Plug} gradient="bg-gradient-to-br from-primary to-primary/70" />
          <StatCard label="Total de Check-ins" value={String(totalCheckins)} change="+18%" icon={UserCheck} gradient="bg-gradient-to-br from-success to-success/70" />
          <StatCard label="Pendentes" value={String(pendingCheckins)} icon={Clock} gradient="bg-gradient-to-br from-accent to-accent/70" />
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration) => (
            <Card key={integration.id} className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${integration.color}`} />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-base font-extrabold text-white">{integration.logo}</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{integration.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {integration.connected ? (
                          <span className="flex items-center gap-1 text-emerald-600">
                            <CheckCircle2 className="h-3 w-3" /> Conectado · {integration.lastSync}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <XCircle className="h-3 w-3" /> Desconectado
                          </span>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openConfig(integration)}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">{integration.totalCheckins}</p>
                    <p className="text-[11px] text-muted-foreground">Check-ins totais</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">{integration.pendingCheckins}</p>
                    <p className="text-[11px] text-muted-foreground">Pendentes</p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Aceite Automático</p>
                      <p className="text-[11px] text-muted-foreground">Aceitar check-ins automaticamente</p>
                    </div>
                  </div>
                  <Switch checked={integration.autoAccept} onCheckedChange={() => toggleAutoAccept(integration.id)} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Check-ins Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Check-ins Recentes</CardTitle>
                <CardDescription>Histórico de check-ins via plataformas de benefícios</CardDescription>
              </div>
              {checkins.some((c) => c.status === "pending") && (
                <Button size="sm" onClick={handleAcceptAll}>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Aceitar Todos
                </Button>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue placeholder="Plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="WellHub">WellHub</SelectItem>
                  <SelectItem value="TotalPass">TotalPass</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="accepted">Aceito</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="rejected">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Plataforma</TableHead>
                  <TableHead>Modalidade</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCheckins.map((checkin) => {
                  const st = statusConfig[checkin.status];
                  const StatusIcon = st.icon;
                  return (
                    <TableRow key={checkin.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{checkin.alunoName}</p>
                          <p className="text-xs text-muted-foreground">{checkin.alunoEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium text-xs">
                          {checkin.platform}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{checkin.modalidade}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{checkin.planType}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{checkin.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant={st.variant} className={st.className}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {st.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {checkin.status === "pending" ? (
                          <div className="flex justify-end gap-1">
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" onClick={() => handleAcceptCheckin(checkin.id)}>
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                              Aceitar
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleRejectCheckin(checkin.id)}>
                              <XCircle className="h-3.5 w-3.5 mr-1" />
                              Rejeitar
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredCheckins.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhum check-in encontrado com os filtros selecionados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Config Dialog */}
      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurar {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>Defina as credenciais e preferências da integração.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input type="password" placeholder="••••••••••••••••" />
            </div>
            <div className="space-y-2">
              <Label>ID do Estabelecimento</Label>
              <Input placeholder="Ex: 123456" />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Aceite Automático</p>
                <p className="text-xs text-muted-foreground">Aceitar check-ins sem revisão manual</p>
              </div>
              <Switch checked={selectedIntegration?.autoAccept ?? false} onCheckedChange={() => selectedIntegration && toggleAutoAccept(selectedIntegration.id)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => { setConfigDialogOpen(false); toast({ title: "Configuração salva", description: `${selectedIntegration?.name} atualizado com sucesso.` }); }}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Integracoes;
