import { useMemo } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Bell, AlertTriangle } from "lucide-react";
import { MOCK_ESTOQUE } from "@/modules/clinic/data/mock-estoque";

const statusConfig: Record<string, { label: string; className: string }> = {
  critico: { label: "Crítico", className: "bg-destructive/10 text-destructive hover:bg-destructive/20 border-0" },
  atencao: { label: "Atenção", className: "bg-warning/10 text-warning hover:bg-warning/20 border-0" },
  normal: { label: "Normal", className: "bg-success/10 text-success hover:bg-success/20 border-0" },
};

const ClinicEstoque = () => {
  const criticos = useMemo(
    () => MOCK_ESTOQUE.filter((i) => i.status === "critico"),
    []
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Estoque de insumos</h1>
            <p className="text-sm text-muted-foreground">operacional / estoque</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar paciente, médico..." className="pl-9 w-64" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Subheader */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Estoque de insumos</h2>
            <p className="text-sm text-muted-foreground">
              {criticos.length} itens abaixo do mínimo
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Entrada de estoque
          </Button>
        </div>

        {/* Alerta crítico */}
        {criticos.length > 0 && (
          <Alert variant="destructive" className="bg-destructive/5 border-destructive/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {criticos.length} itens com estoque crítico precisam de reposição urgente.
            </AlertDescription>
          </Alert>
        )}

        {/* Tabela */}
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs uppercase text-muted-foreground">Código</TableHead>
                <TableHead className="text-xs uppercase text-muted-foreground">Item</TableHead>
                <TableHead className="text-xs uppercase text-muted-foreground">Categoria</TableHead>
                <TableHead className="text-xs uppercase text-muted-foreground">Qtd. Atual</TableHead>
                <TableHead className="text-xs uppercase text-muted-foreground">Mínimo</TableHead>
                <TableHead className="text-xs uppercase text-muted-foreground">Status</TableHead>
                <TableHead className="text-xs uppercase text-muted-foreground">Última Entrada</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_ESTOQUE.map((insumo) => {
                const cfg = statusConfig[insumo.status];
                return (
                  <TableRow key={insumo.id}>
                    <TableCell className="text-muted-foreground text-sm">{insumo.codigo}</TableCell>
                    <TableCell className="font-medium text-foreground">{insumo.item}</TableCell>
                    <TableCell className="text-muted-foreground">{insumo.categoria}</TableCell>
                    <TableCell className="font-bold text-foreground">{insumo.qtdAtual}</TableCell>
                    <TableCell className="text-muted-foreground">{insumo.minimo}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cfg.className}>
                        {cfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{insumo.ultimaEntrada}</TableCell>
                    <TableCell>
                      {insumo.status === "critico" && (
                        <Button size="sm">Repor</Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicEstoque;
