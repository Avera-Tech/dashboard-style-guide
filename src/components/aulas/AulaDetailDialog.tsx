import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  User,
  Users,
  GraduationCap,
  CheckCircle,
  XCircle,
  AlertCircle,
  Ban,
} from "lucide-react";
import AulaStatusBadge from "./AulaStatusBadge";
import { toast } from "@/hooks/use-toast";
import type { Aula, Presenca, PresencaStatus } from "@/types/aula";

const presencaConfig: Record<PresencaStatus, { label: string; icon: React.ElementType; color: string }> = {
  presente: { label: "Presente", icon: CheckCircle, color: "text-success" },
  ausente: { label: "Ausente", icon: XCircle, color: "text-destructive" },
  justificado: { label: "Justificado", icon: AlertCircle, color: "text-warning" },
  pendente: { label: "Pendente", icon: Clock, color: "text-muted-foreground" },
};

const getInitials = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();

const formatDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-");
  const weekday = new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString("pt-BR", { weekday: "long" });
  return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${d}/${m}/${y}`;
};

interface AulaDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aula: Aula | null;
}

const AulaDetailDialog = ({ open, onOpenChange, aula }: AulaDetailDialogProps) => {
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [observacoes, setObservacoes] = useState("");
  const [aulaStatus, setAulaStatus] = useState<Aula["status"]>("agendada");

  const handleOpen = (value: boolean) => {
    if (value && aula) {
      setPresencas([...aula.presencas]);
      setObservacoes(aula.observacoes ?? "");
      setAulaStatus(aula.status);
    }
    onOpenChange(value);
  };

  const updatePresenca = (alunoId: string, status: PresencaStatus) => {
    setPresencas((prev) =>
      prev.map((p) => (p.alunoId === alunoId ? { ...p, status } : p))
    );
  };

  const handleSave = () => {
    toast({ title: "Aula atualizada", description: "Presenças e observações salvas com sucesso." });
    onOpenChange(false);
  };

  const handleCancel = () => {
    setAulaStatus("cancelada");
    toast({ title: "Aula cancelada", description: "A aula foi marcada como cancelada." });
  };

  if (!aula) return null;

  const presentes = presencas.filter((p) => p.status === "presente").length;
  const ausentes = presencas.filter((p) => p.status === "ausente").length;

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes da Aula</DialogTitle>
        </DialogHeader>

        {/* Header */}
        <div className="flex flex-col items-center gap-3 py-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{aula.turmaNome}</p>
            <div className="flex items-center gap-2 justify-center mt-1">
              <Badge variant="outline">{aula.modalidade}</Badge>
              <AulaStatusBadge status={aulaStatus} />
            </div>
          </div>
        </div>

        <Separator />

        {/* Info */}
        <div className="space-y-3 py-2">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Data</p>
              <p className="text-sm font-medium text-foreground">{formatDate(aula.data)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Horário</p>
              <p className="text-sm font-medium text-foreground">{aula.horarioInicio} - {aula.horarioFim}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Professor</p>
              <p className="text-sm font-medium text-foreground">{aula.professorNome}</p>
            </div>
          </div>
        </div>

        {aulaStatus !== "cancelada" && (
          <>
            <Separator />

            {/* Chamada / Presença */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Chamada</p>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-[10px]">
                    <CheckCircle className="h-3 w-3 mr-1" /> {presentes}
                  </Badge>
                  <Badge variant="destructive" className="text-[10px]">
                    <XCircle className="h-3 w-3 mr-1" /> {ausentes}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 max-h-52 overflow-y-auto">
                {presencas.map((p) => {
                  const cfg = presencaConfig[p.status];
                  return (
                    <div
                      key={p.alunoId}
                      className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                            {getInitials(p.alunoNome)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">{p.alunoNome}</span>
                      </div>
                      <Select
                        value={p.status}
                        onValueChange={(v) => updatePresenca(p.alunoId, v as PresencaStatus)}
                      >
                        <SelectTrigger className="w-[130px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(presencaConfig).map(([key, val]) => (
                            <SelectItem key={key} value={key}>
                              <span className="flex items-center gap-1.5">
                                <val.icon className={`h-3 w-3 ${val.color}`} />
                                {val.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}
                {presencas.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">Nenhum aluno nesta aula</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Observações */}
            <div className="space-y-2">
              <Label htmlFor="obs">Observações</Label>
              <Textarea
                id="obs"
                placeholder="Anotações sobre a aula..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                rows={3}
              />
            </div>
          </>
        )}

        {aulaStatus === "cancelada" && aula.motivoCancelamento && (
          <>
            <Separator />
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <Ban className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Motivo do cancelamento</p>
                <p className="text-sm font-medium text-foreground">{aula.motivoCancelamento}</p>
              </div>
            </div>
          </>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {aulaStatus === "agendada" && (
            <Button variant="destructive" size="sm" onClick={handleCancel} className="sm:mr-auto">
              <Ban className="h-4 w-4 mr-1.5" />
              Cancelar Aula
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>
          {aulaStatus !== "cancelada" && (
            <Button onClick={handleSave}>Salvar</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AulaDetailDialog;
