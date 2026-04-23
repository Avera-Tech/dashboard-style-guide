import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone, Calendar, GraduationCap, MapPin, Users as UsersIcon } from "lucide-react";
import { getInitials, statusConfig } from "@/modules/core/components/dashboard/UserTable";
import type { User } from "@/modules/core/types/user";

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

const UserProfileDialog = ({
  open,
  onOpenChange,
  user,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}) => {
  if (!user) return null;

  const status = statusConfig[user.status ?? (user.active ? "active" : "inactive")];
  const guardian = user.guardian ?? null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Perfil do Aluno</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 py-4">
          <Avatar className="h-16 w-16 ring-2 ring-border">
            <AvatarFallback className="text-lg bg-primary/10 text-primary font-bold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{user.name}</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Badge variant={status.variant}>{status.label}</Badge>
              {user.isMinor && (
                <Badge variant="outline" className="text-xs">Menor de idade</Badge>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4 py-2">
          <InfoRow icon={Mail} label="Email" value={user.email} />
          {user.phone && <InfoRow icon={Phone} label="Telefone" value={user.phone} />}
          {user.birthday && (
            <InfoRow
              icon={Calendar}
              label="Data de Nascimento"
              value={new Date(user.birthday).toLocaleDateString("pt-BR")}
            />
          )}
          {user.document && (
            <InfoRow icon={UsersIcon} label="CPF" value={user.document} />
          )}
          {user.level?.name && (
            <InfoRow icon={GraduationCap} label="Nível" value={user.level.name} />
          )}
          <InfoRow
            icon={Calendar}
            label="Cadastrado em"
            value={new Date(user.createdAt).toLocaleDateString("pt-BR")}
          />
        </div>

        {guardian && (
          <>
            <Separator />
            <div className="space-y-4 py-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Responsável
              </p>
              <div className="space-y-2">
                {guardian.name && <InfoRow icon={UsersIcon} label="Nome" value={guardian.name} />}
                {guardian.phone && <InfoRow icon={Phone} label="Telefone" value={guardian.phone} />}
                {guardian.document && <InfoRow icon={UsersIcon} label="CPF" value={guardian.document} />}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
