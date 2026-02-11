import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone, MapPin, Calendar, GraduationCap } from "lucide-react";
import { getInitials, statusConfig } from "@/components/dashboard/UserTable";

interface AlunoData {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  phone: string;
  modalidade: string;
  nivel: string;
  ultimoCheckin: string;
}

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

const AlunoProfileDialog = ({
  open,
  onOpenChange,
  aluno,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aluno: AlunoData | null;
}) => {
  if (!aluno) return null;

  const status = statusConfig[aluno.status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Perfil do Aluno</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 py-4">
          <Avatar className="h-16 w-16 ring-2 ring-border">
            <AvatarFallback className="text-lg bg-primary/10 text-primary font-bold">
              {getInitials(aluno.name)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{aluno.name}</p>
            <Badge variant={status.variant} className="mt-1">{status.label}</Badge>
          </div>
        </div>

        <Separator />

        <div className="space-y-4 py-2">
          <InfoRow icon={Mail} label="Email" value={aluno.email} />
          <InfoRow icon={Phone} label="Telefone" value={aluno.phone} />
          <InfoRow icon={GraduationCap} label="Nível" value={aluno.nivel} />
          <InfoRow icon={Calendar} label="Último Check-in" value={aluno.ultimoCheckin} />
          <InfoRow icon={Calendar} label="Cadastrado em" value={new Date(aluno.createdAt).toLocaleDateString("pt-BR")} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlunoProfileDialog;
