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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tipoConfig, canalConfig } from "@/data/crm";
import { toast } from "@/hooks/use-toast";

interface LembreteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ALUNOS_MOCK = [
  { id: "1", nome: "Pedro Henrique Kevin Assunção" },
  { id: "2", nome: "Ana Clara Silva" },
  { id: "3", nome: "Bruno Costa Mendes" },
  { id: "4", nome: "Carla Oliveira Ramos" },
  { id: "5", nome: "Daniel Souza Lima" },
  { id: "6", nome: "Eduarda Santos Alves" },
];

const LembreteFormDialog = ({ open, onOpenChange }: LembreteFormDialogProps) => {
  const handleSubmit = () => {
    toast({
      title: "Lembrete criado",
      description: "O lembrete foi agendado com sucesso.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Lembrete</DialogTitle>
          <DialogDescription>
            Crie um lembrete ou comunicação para um aluno
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Destinatário</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1.5">
                <Label>Aluno</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {ALUNOS_MOCK.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(tipoConfig).map(([key, val]) => (
                      <SelectItem key={key} value={key}>
                        {val.emoji} {val.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Canal</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
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
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Mensagem</h4>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="titulo">Título</Label>
                <Input id="titulo" placeholder="Ex: Sua aula é hoje!" />
              </div>
              <div className="space-y-1.5">
                <Label>Mensagem</Label>
                <Textarea
                  placeholder="Escreva a mensagem para o aluno..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Agendamento</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="data">Data de envio</Label>
                <Input id="data" type="date" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hora">Horário</Label>
                <Input id="hora" type="time" />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Agendar Lembrete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LembreteFormDialog;
