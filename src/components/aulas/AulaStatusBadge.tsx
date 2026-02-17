import { Badge } from "@/components/ui/badge";
import type { AulaStatus } from "@/types/aula";

const config: Record<AulaStatus, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  agendada: { label: "Agendada", variant: "default" },
  realizada: { label: "Realizada", variant: "secondary" },
  cancelada: { label: "Cancelada", variant: "destructive" },
};

const AulaStatusBadge = ({ status }: { status: AulaStatus }) => {
  const c = config[status];
  return <Badge variant={c.variant}>{c.label}</Badge>;
};

export default AulaStatusBadge;
