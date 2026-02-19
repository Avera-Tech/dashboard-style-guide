import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface FilterCardProps {
  filterName: string;
  setFilterName: (v: string) => void;
  filterStatus: string;
  setFilterStatus: (v: string) => void;
  filterCategoria: string;
  setFilterCategoria: (v: string) => void;
  categorias: string[];
  onClear: () => void;
  entityLabel: string;
}

const FilterCard = ({
  filterName,
  setFilterName,
  filterStatus,
  setFilterStatus,
  filterCategoria,
  setFilterCategoria,
  categorias,
  onClear,
  entityLabel,
}: FilterCardProps) => (
  <Card className="border-border">
    <CardContent className="p-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[180px]">
          <Label className="text-xs text-muted-foreground mb-1.5 block">Descrição / {entityLabel}</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>
        <div className="min-w-[140px]">
          <Label className="text-xs text-muted-foreground mb-1.5 block">Status</Label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="atrasado">Atrasado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-[160px]">
          <Label className="text-xs text-muted-foreground mb-1.5 block">Categoria</Label>
          <Select value={filterCategoria} onValueChange={setFilterCategoria}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categorias.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" className="h-9" onClick={onClear}>
          <X className="h-3.5 w-3.5 mr-1" />
          Limpar
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default FilterCard;
