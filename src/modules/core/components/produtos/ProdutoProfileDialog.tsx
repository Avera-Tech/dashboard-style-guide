import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Package,
  CreditCard,
  Calendar,
  Eye,
  ShoppingCart,
  Timer,
  Tag,
} from "lucide-react";
import type { Produto } from "@/modules/core/pages/Produtos";

const statusConfig = {
  active: { label: "Ativo", variant: "default" as const },
  inactive: { label: "Inativo", variant: "secondary" as const },
  pending: { label: "Pendente", variant: "outline" as const },
};

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

const ProdutoProfileDialog = ({
  open,
  onOpenChange,
  produto,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  produto: Produto | null;
}) => {
  if (!produto) return null;

  const status = statusConfig[produto.status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Produto</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{produto.name}</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Badge variant={status.variant}>{status.label}</Badge>
              <Badge variant="outline">{produto.type}</Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4 py-2">
          <InfoRow icon={CreditCard} label="Créditos" value={`${produto.credits} ${produto.credits === 1 ? "crédito" : "créditos"}`} />
          <InfoRow icon={Calendar} label="Validade" value={produto.validity} />
          <InfoRow icon={Tag} label="Valor" value={produto.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} />
          <InfoRow icon={Timer} label="Limite de uso por período" value={produto.usageLimitPeriod} />
          <InfoRow icon={Eye} label="Visibilidade" value={produto.visibility} />
          <InfoRow icon={ShoppingCart} label="Limite de compras" value={String(produto.purchaseLimit)} />
          <InfoRow icon={Calendar} label="Cadastrado em" value={new Date(produto.createdAt).toLocaleDateString("pt-BR")} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProdutoProfileDialog;
