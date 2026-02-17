import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProdutoFormDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Cadastrar Produto</DialogTitle>
        <DialogDescription>Preencha os dados do novo produto ou pacote.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        {/* Dados principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="produto-name">Nome do Produto</Label>
            <Input id="produto-name" placeholder="Ex: Pacote Mensal Tennis" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="produto-credits">Créditos (aulas)</Label>
            <Input id="produto-credits" type="number" placeholder="Ex: 8" min={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="produto-validity">Validade</Label>
            <Input id="produto-validity" placeholder="Ex: 30 dias" />
          </div>
          <div className="space-y-2">
            <Label>Tipo de Produto</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Plano">Plano</SelectItem>
                <SelectItem value="Avulso">Avulso</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="produto-price">Valor (R$)</Label>
            <Input id="produto-price" type="number" placeholder="Ex: 320.00" min={0} step={0.01} />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Regras de uso */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="produto-usage-limit">Limite de uso por período</Label>
            <Input id="produto-usage-limit" placeholder="Ex: 2 por semana" />
          </div>
          <div className="space-y-2">
            <Label>Quem pode ver o produto</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Alunos ativos">Alunos ativos</SelectItem>
                <SelectItem value="Convidados">Convidados</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="produto-purchase-limit">Limite de Compras</Label>
            <Input id="produto-purchase-limit" type="number" placeholder="Ex: 1" min={1} />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
        <Button onClick={() => onOpenChange(false)}>Cadastrar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ProdutoFormDialog;
