import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  Calendar,
  Tag,
  Link2,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  Contato,
  Interacao,
  Tarefa,
  statusConfig,
  origemConfig,
  interacaoConfig,
  tarefaStatusConfig,
  formatDateBR,
  formatDateTimeBR,
  MOCK_INTERACOES,
  MOCK_TAREFAS,
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

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 py-2">
    <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground truncate">{value}</p>
    </div>
  </div>
);

const tarefaStatusIcon = {
  pendente: Clock,
  concluida: CheckCircle2,
  atrasada: AlertCircle,
};

interface ContatoProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contato: Contato | null;
}

const ContatoProfileDialog = ({
  open,
  onOpenChange,
  contato,
}: ContatoProfileDialogProps) => {
  const [showNewInteracao, setShowNewInteracao] = useState(false);
  const [novaInteracaoTipo, setNovaInteracaoTipo] = useState("whatsapp");
  const [novaInteracaoDesc, setNovaInteracaoDesc] = useState("");

  if (!contato) return null;

  const interacoes = MOCK_INTERACOES.filter(
    (i) => i.contatoId === contato.id
  ).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const tarefas = MOCK_TAREFAS.filter(
    (t) => t.contatoId === contato.id
  ).sort((a, b) => new Date(a.dataVencimento).getTime() - new Date(b.dataVencimento).getTime());

  const status = statusConfig[contato.status];

  const handleAddInteracao = () => {
    if (!novaInteracaoDesc.trim()) return;
    toast({
      title: "Interação registrada",
      description: `${interacaoConfig[novaInteracaoTipo as keyof typeof interacaoConfig]?.label} adicionada ao contato.`,
    });
    setNovaInteracaoDesc("");
    setShowNewInteracao(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Perfil do Contato</DialogTitle>
        </DialogHeader>

        {/* Header */}
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 ring-2 ring-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
              {getInitials(contato.nome)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground truncate">
              {contato.nome}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={status.variant}>{status.label}</Badge>
              <span className="text-xs text-muted-foreground">
                {origemConfig[contato.origem]}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Info */}
        <div className="grid grid-cols-2 gap-x-4">
          <InfoRow icon={Mail} label="E-mail" value={contato.email} />
          <InfoRow icon={Phone} label="Telefone" value={contato.telefone} />
          <InfoRow icon={Tag} label="Interesse" value={contato.interesse} />
          <InfoRow
            icon={Calendar}
            label="Criado em"
            value={formatDateBR(contato.criadoEm)}
          />
          {contato.alunoVinculado && (
            <InfoRow
              icon={Link2}
              label="Aluno vinculado"
              value={contato.alunoVinculado}
            />
          )}
          <InfoRow
            icon={Calendar}
            label="Último contato"
            value={formatDateBR(contato.ultimoContato)}
          />
        </div>

        <Separator />

        {/* Tabs */}
        <Tabs defaultValue="interacoes" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="interacoes" className="flex-1">
              Interações ({interacoes.length})
            </TabsTrigger>
            <TabsTrigger value="tarefas" className="flex-1">
              Tarefas ({tarefas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interacoes" className="space-y-3 mt-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setShowNewInteracao(!showNewInteracao)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Interação
            </Button>

            {showNewInteracao && (
              <div className="space-y-2 p-3 rounded-lg border border-border bg-muted/30">
                <Select
                  value={novaInteracaoTipo}
                  onValueChange={setNovaInteracaoTipo}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(interacaoConfig).map(([key, val]) => (
                      <SelectItem key={key} value={key}>
                        {val.emoji} {val.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Descreva a interação..."
                  value={novaInteracaoDesc}
                  onChange={(e) => setNovaInteracaoDesc(e.target.value)}
                  rows={2}
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNewInteracao(false)}
                  >
                    Cancelar
                  </Button>
                  <Button size="sm" onClick={handleAddInteracao}>
                    Salvar
                  </Button>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="space-y-0">
              {interacoes.map((interacao, idx) => {
                const config =
                  interacaoConfig[interacao.tipo];
                return (
                  <div key={interacao.id} className="flex gap-3 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm shrink-0">
                        {config.emoji}
                      </div>
                      {idx < interacoes.length - 1 && (
                        <div className="w-px flex-1 bg-border min-h-[16px]" />
                      )}
                    </div>
                    <div className="pb-4 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {config.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {formatDateTimeBR(interacao.data)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {interacao.descricao}
                      </p>
                    </div>
                  </div>
                );
              })}
              {interacoes.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhuma interação registrada.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tarefas" className="space-y-2 mt-3">
            {tarefas.map((tarefa) => {
              const tConfig = tarefaStatusConfig[tarefa.status];
              const TIcon = tarefaStatusIcon[tarefa.status];
              return (
                <div
                  key={tarefa.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card"
                >
                  <TIcon
                    className={`h-5 w-5 mt-0.5 shrink-0 ${
                      tarefa.status === "atrasada"
                        ? "text-destructive"
                        : tarefa.status === "concluida"
                        ? "text-success"
                        : "text-muted-foreground"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {tarefa.titulo}
                      </span>
                      <Badge variant={tConfig.variant} className="text-[10px]">
                        {tConfig.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {tarefa.descricao}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Vencimento: {formatDateBR(tarefa.dataVencimento)}
                    </p>
                  </div>
                </div>
              );
            })}
            {tarefas.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma tarefa registrada.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ContatoProfileDialog;
