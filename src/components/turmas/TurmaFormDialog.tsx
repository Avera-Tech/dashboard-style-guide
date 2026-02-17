import { Clock, Users as UsersIcon } from "lucide-react";
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

const DIAS_SEMANA = [
  { id: "seg", label: "Seg" },
  { id: "ter", label: "Ter" },
  { id: "qua", label: "Qua" },
  { id: "qui", label: "Qui" },
  { id: "sex", label: "Sex" },
  { id: "sab", label: "Sáb" },
  { id: "dom", label: "Dom" },
];

const TurmaFormDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Cadastrar Turma</DialogTitle>
        <DialogDescription>Preencha os dados para criar uma nova turma.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        {/* Dados da turma */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="turma-name">Nome da Turma</Label>
            <Input id="turma-name" placeholder="Ex: Tennis Iniciante A" />
          </div>
          <div className="space-y-2">
            <Label>Modalidade</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="beach-tennis">Beach Tennis</SelectItem>
                <SelectItem value="futevolei">Futevôlei</SelectItem>
                <SelectItem value="padel">Padel</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

        {/* Professor e capacidade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Professor</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="joao">João Silva</SelectItem>
                <SelectItem value="carlos">Carlos Souza</SelectItem>
                <SelectItem value="ana">Ana Costa</SelectItem>
                <SelectItem value="maria">Maria Oliveira</SelectItem>
                <SelectItem value="pedro">Pedro Lima</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="turma-max">Máximo de Alunos</Label>
            <div className="relative">
              <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="turma-max" type="number" placeholder="8" className="pl-10" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Horário */}
        <div className="space-y-3">
          <Label>Dias da Semana</Label>
          <div className="flex flex-wrap gap-3">
            {DIAS_SEMANA.map((dia) => (
              <div key={dia.id} className="flex items-center space-x-2">
                <Checkbox id={`dia-${dia.id}`} />
                <Label htmlFor={`dia-${dia.id}`} className="text-sm font-normal cursor-pointer">
                  {dia.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="turma-hora-inicio">Horário Início</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="turma-hora-inicio" type="time" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="turma-hora-fim">Horário Fim</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="turma-hora-fim" type="time" className="pl-10" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativa</SelectItem>
                <SelectItem value="inactive">Inativa</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>
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

export default TurmaFormDialog;
