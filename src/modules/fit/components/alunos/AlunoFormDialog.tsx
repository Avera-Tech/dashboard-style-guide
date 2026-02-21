import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users as UsersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

const AlunoFormDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Cadastrar Aluno</DialogTitle>
        <DialogDescription>Preencha os dados para matricular um novo aluno no CT.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        {/* Dados pessoais */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="aluno-name">Nome completo</Label>
            <Input id="aluno-name" placeholder="Ex: Maria Santos" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-cpf">CPF</Label>
            <Input id="aluno-cpf" placeholder="000.000.000-00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-email" type="email" placeholder="email@exemplo.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-phone">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-phone" placeholder="(00) 00000-0000" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-birth">Data de Nascimento</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-birth" type="date" className="pl-10" />
            </div>
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

        {/* Dados esportivos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nível</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iniciante">Iniciante</SelectItem>
                <SelectItem value="intermediario">Intermediário</SelectItem>
                <SelectItem value="avancado">Avançado</SelectItem>
                <SelectItem value="competitivo">Competitivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Responsável */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="aluno-responsavel">Nome do Responsável</Label>
            <div className="relative">
              <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-responsavel" placeholder="Nome do pai/mãe ou responsável" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-resp-phone">Telefone do Responsável</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-resp-phone" placeholder="(00) 00000-0000" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-resp-email">Email do Responsável</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-resp-email" type="email" placeholder="responsavel@email.com" className="pl-10" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Endereço */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="aluno-cep">CEP</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="aluno-cep" placeholder="00000-000" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-state">Estado</Label>
            <Input id="aluno-state" placeholder="Ex: São Paulo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-city">Cidade</Label>
            <Input id="aluno-city" placeholder="Ex: São Paulo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aluno-address">Endereço</Label>
            <Input id="aluno-address" placeholder="Rua, número, complemento" />
          </div>
        </div>

        <Separator />

        <div className="flex items-center space-x-2">
          <Checkbox id="aluno-minor" defaultChecked />
          <Label htmlFor="aluno-minor" className="text-sm font-normal cursor-pointer">
            Pessoa menor de idade
          </Label>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
        <Button onClick={() => onOpenChange(false)}>Cadastrar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default AlunoFormDialog;
