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

const UserFormDialog = ({
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
            <Label htmlFor="user-name">Nome completo</Label>
            <Input id="user-name" placeholder="Ex: Maria Santos" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-cpf">CPF</Label>
            <Input id="user-cpf" placeholder="000.000.000-00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="user-email" type="email" placeholder="email@exemplo.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-phone">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="user-phone" placeholder="(00) 00000-0000" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-birth">Data de Nascimento</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="user-birth" type="date" className="pl-10" />
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
            <Label htmlFor="user-responsavel">Nome do Responsável</Label>
            <div className="relative">
              <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="user-responsavel" placeholder="Nome do pai/mãe ou responsável" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-resp-phone">Telefone do Responsável</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="user-resp-phone" placeholder="(00) 00000-0000" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-resp-email">Email do Responsável</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="user-resp-email" type="email" placeholder="responsavel@email.com" className="pl-10" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Endereço */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="user-cep">CEP</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="user-cep" placeholder="00000-000" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-state">Estado</Label>
            <Input id="user-state" placeholder="Ex: São Paulo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-city">Cidade</Label>
            <Input id="user-city" placeholder="Ex: São Paulo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-address">Endereço</Label>
            <Input id="user-address" placeholder="Rua, número, complemento" />
          </div>
        </div>

        <Separator />

        <div className="flex items-center space-x-2">
          <Checkbox id="user-minor" defaultChecked />
          <Label htmlFor="user-minor" className="text-sm font-normal cursor-pointer">
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

export default UserFormDialog;
