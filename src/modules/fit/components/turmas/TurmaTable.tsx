import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import type { Turma } from "@/modules/fit/pages/Turmas";

const statusConfig = {
  active: { label: "Ativa", variant: "default" as const },
  inactive: { label: "Inativa", variant: "secondary" as const },
  pending: { label: "Pendente", variant: "outline" as const },
};

interface TurmaTableProps {
  data: Turma[];
  onView?: (item: Turma) => void;
  onEdit?: (item: Turma) => void;
  onDelete?: (item: Turma) => void;
}

const TurmaTable = ({ data, onView, onEdit, onDelete }: TurmaTableProps) => {
  const [filterName, setFilterName] = useState("");
  const [filterModalidade, setFilterModalidade] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const modalidades = [...new Set(data.map((t) => t.modalidade))];

  const filteredData = data.filter((t) => {
    const matchesName = t.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesModalidade = filterModalidade === "all" || t.modalidade === filterModalidade;
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    return matchesName && matchesModalidade && matchesStatus;
  });

  const handleClear = () => {
    setFilterName("");
    setFilterModalidade("all");
    setFilterStatus("all");
  };

  return (
    <>
      {/* Filter Card */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Filtro</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Nome</label>
            <Input
              placeholder=""
              className="bg-background"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Modalidade</label>
            <Select value={filterModalidade} onValueChange={setFilterModalidade}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {modalidades.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Status</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativa</SelectItem>
                <SelectItem value="inactive">Inativa</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClear}>Limpar</Button>
          <Button>Pesquisar</Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-semibold uppercase tracking-wider">
                  <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                    Turma <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Modalidade</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Professor</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Horário</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Ocupação</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Opções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => {
                const status = statusConfig[item.status];
                const occupancyPercent = Math.round((item.alunosAtuais / item.maxAlunos) * 100);
                const isFull = item.alunosAtuais >= item.maxAlunos;
                return (
                  <TableRow key={item.id} className="group hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.nivel}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">{item.modalidade}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-foreground">{item.professor}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm text-foreground">{item.diasSemana.join(", ")}</p>
                        <p className="text-xs text-muted-foreground">{item.horario}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 min-w-[120px]">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{item.alunosAtuais}/{item.maxAlunos}</span>
                          {isFull && (
                            <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Lotada</Badge>
                          )}
                        </div>
                        <Progress value={occupancyPercent} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                            Opções
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => onView?.(item)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit?.(item)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => onDelete?.(item)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-16 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-8 w-8 text-muted-foreground/40" />
                      <p className="font-medium">Nenhuma turma encontrada</p>
                      <p className="text-xs">Tente ajustar os filtros de busca</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/10">
          <p className="text-xs text-muted-foreground">
            Mostrando <span className="font-semibold text-foreground">{filteredData.length}</span> de{" "}
            <span className="font-semibold text-foreground">{data.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="sm" className="h-8 min-w-[32px] shadow-sm">1</Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TurmaTable;
