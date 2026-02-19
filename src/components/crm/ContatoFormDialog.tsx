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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { origemConfig } from "@/data/crm";

interface ContatoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContatoFormDialog = ({ open, onOpenChange }: ContatoFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Contato</DialogTitle>
          <DialogDescription>
            Registre um novo contato no CRM
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Dados pessoais
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" placeholder="Nome do contato" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="(00) 00000-0000" />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Informações comerciais
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Origem</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(origemConfig).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Interesse</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tennis">Tennis</SelectItem>
                    <SelectItem value="Futevôlei">Futevôlei</SelectItem>
                    <SelectItem value="Ambos">Ambos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Novo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="novo">Novo</SelectItem>
                    <SelectItem value="em_contato">Em Contato</SelectItem>
                    <SelectItem value="interessado">Interessado</SelectItem>
                    <SelectItem value="matriculado">Matriculado</SelectItem>
                    <SelectItem value="perdido">Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-1.5">
            <Label>Observações</Label>
            <Textarea placeholder="Notas adicionais sobre o contato..." rows={3} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => onOpenChange(false)}>Cadastrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContatoFormDialog;
