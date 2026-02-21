import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AulaFiltersProps {
  filterTurma: string;
  setFilterTurma: (v: string) => void;
  filterStatus: string;
  setFilterStatus: (v: string) => void;
  filterDate: string;
  setFilterDate: (v: string) => void;
  turmaNames: string[];
  onClear: () => void;
}

const AulaFilters = ({
  filterTurma,
  setFilterTurma,
  filterStatus,
  setFilterStatus,
  filterDate,
  setFilterDate,
  turmaNames,
  onClear,
}: AulaFiltersProps) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Filtro</p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground">Turma</label>
        <Select value={filterTurma} onValueChange={setFilterTurma}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {turmaNames.map((n) => (
              <SelectItem key={n} value={n}>{n}</SelectItem>
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
            <SelectItem value="agendada">Agendada</SelectItem>
            <SelectItem value="realizada">Realizada</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground">Data</label>
        <Input
          type="date"
          className="bg-background"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>
    </div>
    <div className="flex justify-end gap-3">
      <Button variant="outline" onClick={onClear}>Limpar</Button>
      <Button>Pesquisar</Button>
    </div>
  </div>
);

export default AulaFilters;
