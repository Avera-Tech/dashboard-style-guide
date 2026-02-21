import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Receipt } from "lucide-react";
import {
  ContaReceber,
  ContaPagar,
  statusConfig,
  formatCurrency,
  formatDate,
} from "@/modules/core/data/financeiro";

interface ContaDetailDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  conta: (ContaReceber | ContaPagar) | null;
  tipo: "receber" | "pagar";
}

const ContaDetailDialog = ({ open, onOpenChange, conta, tipo }: ContaDetailDialogProps) => {
  if (!conta) return null;
  const status = statusConfig[conta.status];
  const StatusIcon = status.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Detalhes da Conta
          </DialogTitle>
          <DialogDescription>
            {tipo === "receber" ? "Conta a Receber" : "Conta a Pagar"} — {conta.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">{formatCurrency(conta.valor)}</span>
            <Badge className={status.className}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {status.label}
            </Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Descrição</p>
              <p className="font-medium text-foreground">{conta.descricao}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Categoria</p>
              <p className="font-medium text-foreground">{conta.categoria}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Vencimento</p>
              <p className="font-medium text-foreground">{formatDate(conta.dataVencimento)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Pagamento</p>
              <p className="font-medium text-foreground">{conta.dataPagamento ? formatDate(conta.dataPagamento) : "—"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">Forma de Pagamento</p>
              <p className="font-medium text-foreground">{conta.formaPagamento}</p>
            </div>
            {conta.parcela && (
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Parcela</p>
                <p className="font-medium text-foreground">{conta.parcela}</p>
              </div>
            )}
            {conta.recorrencia && (
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Recorrência</p>
                <p className="font-medium text-foreground">{conta.recorrencia}</p>
              </div>
            )}
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">{tipo === "receber" ? "Aluno" : "Fornecedor"}</p>
              <p className="font-medium text-foreground">
                {tipo === "receber" ? (conta as ContaReceber).aluno : (conta as ContaPagar).fornecedor}
              </p>
            </div>
            {tipo === "receber" && (conta as ContaReceber).produto && (
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Produto</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{(conta as ContaReceber).produto}</p>
                  {(conta as ContaReceber).tipoProduto && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {(conta as ContaReceber).tipoProduto}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {conta.observacoes && (
            <>
              <Separator />
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Observações</p>
                <p className="text-sm text-foreground bg-muted/50 rounded-lg p-3">{conta.observacoes}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContaDetailDialog;
