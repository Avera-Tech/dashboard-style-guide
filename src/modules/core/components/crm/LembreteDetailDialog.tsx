import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Send, Clock, CheckCheck, Zap, PenLine } from "lucide-react";
import {
  Lembrete,
  tipoConfig,
  statusConfig,
  canalConfig,
  formatDateTimeBR,
} from "@/modules/core/data/crm";
import { toast } from "@/hooks/use-toast";

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

const statusIcon = {
  pendente: Clock,
  enviado: Send,
  lido: CheckCheck,
};

interface LembreteDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lembrete: Lembrete | null;
}

const LembreteDetailDialog = ({ open, onOpenChange, lembrete }: LembreteDetailDialogProps) => {
  if (!lembrete) return null;

  const tipo = tipoConfig[lembrete.tipo];
  const status = statusConfig[lembrete.status];
  const canal = canalConfig[lembrete.canal];
  const StatusIcon = statusIcon[lembrete.status];

  const handleResend = () => {
    toast({
      title: "Lembrete reenviado",
      description: `"${lembrete.titulo}" reenviado para ${lembrete.alunoNome}.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="sr-only">Detalhes do Lembrete</DialogTitle>
        </DialogHeader>

        {/* Aluno + tipo */}
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {getInitials(lembrete.alunoNome)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground truncate">
              {lembrete.alunoNome}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm">{tipo.emoji} {tipo.label}</span>
              {lembrete.origem === "automatico" ? (
                <Badge variant="secondary" className="text-[10px] gap-1">
                  <Zap className="h-3 w-3" /> Auto
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] gap-1">
                  <PenLine className="h-3 w-3" /> Manual
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Meta */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Canal</p>
            <p className="text-sm font-medium">{canal.emoji} {canal.label}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <div className="flex items-center gap-1 mt-0.5">
              <StatusIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <Badge variant={status.variant} className="text-[10px]">{status.label}</Badge>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Data</p>
            <p className="text-sm font-medium">{formatDateTimeBR(lembrete.dataEnvio)}</p>
          </div>
        </div>

        {lembrete.turma && (
          <div>
            <p className="text-xs text-muted-foreground">Turma</p>
            <p className="text-sm font-medium">{lembrete.turma}</p>
          </div>
        )}

        <Separator />

        {/* Mensagem */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Título</p>
          <p className="text-sm font-semibold text-foreground">{lembrete.titulo}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Mensagem</p>
          <div className="rounded-lg bg-muted/50 border border-border p-3">
            <p className="text-sm text-foreground whitespace-pre-wrap">{lembrete.mensagem}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button onClick={handleResend}>
            <Send className="h-4 w-4 mr-2" />
            Reenviar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LembreteDetailDialog;
