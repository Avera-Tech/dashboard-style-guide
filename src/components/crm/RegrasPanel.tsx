import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Settings, Pencil } from "lucide-react";
import {
  RegraLembrete,
  tipoConfig,
  canalConfig,
  MOCK_REGRAS,
} from "@/data/crm";
import { toast } from "@/hooks/use-toast";

const RegrasPanel = () => {
  const [regras, setRegras] = useState<RegraLembrete[]>(MOCK_REGRAS);
  const [editingRegra, setEditingRegra] = useState<RegraLembrete | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleToggle = (id: string) => {
    setRegras((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updated = { ...r, ativo: !r.ativo };
          toast({
            title: updated.ativo ? "Regra ativada" : "Regra desativada",
            description: `${tipoConfig[r.tipo].emoji} ${tipoConfig[r.tipo].label}`,
          });
          return updated;
        }
        return r;
      })
    );
  };

  const handleEdit = (regra: RegraLembrete) => {
    setEditingRegra({ ...regra });
    setEditOpen(true);
  };

  const handleSave = () => {
    if (!editingRegra) return;
    setRegras((prev) =>
      prev.map((r) => (r.id === editingRegra.id ? editingRegra : r))
    );
    toast({
      title: "Regra atualizada",
      description: `${tipoConfig[editingRegra.tipo].emoji} ${tipoConfig[editingRegra.tipo].label} configurada com sucesso.`,
    });
    setEditOpen(false);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-base font-bold text-foreground">
            Regras de Disparo Automático
          </h3>
        </div>
        <p className="text-sm text-muted-foreground -mt-2">
          Configure quando e como cada tipo de lembrete é disparado automaticamente para os alunos.
        </p>

        <div className="space-y-3">
          {regras.map((regra) => {
            const tipo = tipoConfig[regra.tipo];
            const canal = canalConfig[regra.canal];
            return (
              <Card
                key={regra.id}
                className={`transition-opacity ${!regra.ativo ? "opacity-50" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl mt-0.5">{tipo.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-foreground">
                          {tipo.label}
                        </h4>
                        <Badge variant="outline" className="text-[10px]">
                          {canal.emoji} {canal.label}
                        </Badge>
                        {regra.ativo ? (
                          <Badge variant="default" className="text-[10px]">
                            Ativo
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px]">
                            Inativo
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {regra.descricaoTrigger}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ⏱️ Antecedência:{" "}
                        <span className="font-semibold text-foreground">
                          {regra.antecedencia} {regra.unidadeAntecedencia}
                        </span>
                        {regra.tipo === "checkin_pos_aula" && " após o término"}
                        {regra.tipo === "aniversario" && " (no dia)"}
                      </p>
                      <div className="mt-2 rounded bg-muted/50 border border-border p-2">
                        <p className="text-[11px] text-muted-foreground mb-0.5">Template:</p>
                        <p className="text-xs text-foreground">
                          <span className="font-semibold">{regra.templateTitulo}</span>
                          {" — "}
                          {regra.templateMensagem.substring(0, 80)}...
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(regra)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Switch
                        checked={regra.ativo}
                        onCheckedChange={() => handleToggle(regra.id)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Configurar Regra: {editingRegra && tipoConfig[editingRegra.tipo].emoji}{" "}
              {editingRegra && tipoConfig[editingRegra.tipo].label}
            </DialogTitle>
            <DialogDescription>
              Ajuste quando e como esse lembrete é disparado automaticamente
            </DialogDescription>
          </DialogHeader>

          {editingRegra && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Canal de envio</Label>
                  <Select
                    value={editingRegra.canal}
                    onValueChange={(v) =>
                      setEditingRegra({ ...editingRegra, canal: v as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(canalConfig).map(([key, val]) => (
                        <SelectItem key={key} value={key}>
                          {val.emoji} {val.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>
                    {editingRegra.tipo === "checkin_pos_aula"
                      ? "Tempo após término"
                      : editingRegra.tipo === "aniversario"
                      ? "Antecedência"
                      : "Antecedência"}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min={0}
                      value={editingRegra.antecedencia}
                      onChange={(e) =>
                        setEditingRegra({
                          ...editingRegra,
                          antecedencia: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-20"
                    />
                    <Select
                      value={editingRegra.unidadeAntecedencia}
                      onValueChange={(v) =>
                        setEditingRegra({
                          ...editingRegra,
                          unidadeAntecedencia: v as any,
                        })
                      }
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutos">Minutos</SelectItem>
                        <SelectItem value="horas">Horas</SelectItem>
                        <SelectItem value="dias">Dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label>Título do template</Label>
                  <Input
                    value={editingRegra.templateTitulo}
                    onChange={(e) =>
                      setEditingRegra({
                        ...editingRegra,
                        templateTitulo: e.target.value,
                      })
                    }
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Variáveis: {"{nome}"}, {"{modalidade}"}, {"{horario}"}, {"{turma}"}, {"{dias}"}, {"{data_vencimento}"}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label>Mensagem do template</Label>
                  <Textarea
                    value={editingRegra.templateMensagem}
                    onChange={(e) =>
                      setEditingRegra({
                        ...editingRegra,
                        templateMensagem: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar Regra</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegrasPanel;
