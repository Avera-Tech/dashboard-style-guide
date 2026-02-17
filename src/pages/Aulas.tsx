import { useState, useMemo } from "react";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  LayoutList,
  LayoutGrid,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import AulaCard from "@/components/aulas/AulaCard";
import AulaFilters from "@/components/aulas/AulaFilters";
import AulaDetailDialog from "@/components/aulas/AulaDetailDialog";
import AulaStatusBadge from "@/components/aulas/AulaStatusBadge";
import { MOCK_AULAS } from "@/data/mock-aulas";
import type { Aula } from "@/types/aula";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formatDateShort = (d: string) => {
  const [y, m, day] = d.split("-");
  return `${day}/${m}`;
};

const formatDateFull = (d: string) => {
  const [y, m, day] = d.split("-");
  const weekday = new Date(Number(y), Number(m) - 1, Number(day)).toLocaleDateString("pt-BR", { weekday: "short" });
  return `${weekday} ${day}/${m}`;
};

const Aulas = () => {
  const [view, setView] = useState<"cards" | "list">("cards");
  const [filterTurma, setFilterTurma] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [selectedAula, setSelectedAula] = useState<Aula | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const turmaNames = useMemo(() => [...new Set(MOCK_AULAS.map((a) => a.turmaNome))], []);

  const filtered = useMemo(() => {
    return MOCK_AULAS.filter((a) => {
      if (filterTurma !== "all" && a.turmaNome !== filterTurma) return false;
      if (filterStatus !== "all" && a.status !== filterStatus) return false;
      if (filterDate && a.data !== filterDate) return false;
      return true;
    }).sort((a, b) => a.data.localeCompare(b.data) || a.horarioInicio.localeCompare(b.horarioInicio));
  }, [filterTurma, filterStatus, filterDate]);

  const agendadas = MOCK_AULAS.filter((a) => a.status === "agendada").length;
  const realizadas = MOCK_AULAS.filter((a) => a.status === "realizada").length;
  const canceladas = MOCK_AULAS.filter((a) => a.status === "cancelada").length;

  const handleView = (aula: Aula) => {
    setSelectedAula(aula);
    setDetailOpen(true);
  };

  const handleClearFilters = () => {
    setFilterTurma("all");
    setFilterStatus("all");
    setFilterDate("");
  };

  // Group aulas by date for cards view
  const grouped = useMemo(() => {
    const map = new Map<string, Aula[]>();
    filtered.forEach((a) => {
      const arr = map.get(a.data) ?? [];
      arr.push(a);
      map.set(a.data, arr);
    });
    return [...map.entries()];
  }, [filtered]);

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">Aulas</h1>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {MOCK_AULAS.length}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Ocorrências geradas automaticamente a partir das turmas
            </p>
          </div>
          <Tabs value={view} onValueChange={(v) => setView(v as "cards" | "list")}>
            <TabsList>
              <TabsTrigger value="cards">
                <LayoutGrid className="h-4 w-4 mr-1.5" /> Cards
              </TabsTrigger>
              <TabsTrigger value="list">
                <LayoutList className="h-4 w-4 mr-1.5" /> Lista
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard label="Total de Aulas" value={String(MOCK_AULAS.length)} icon={Calendar} gradient="bg-gradient-to-br from-primary to-primary/70" />
          <StatCard label="Agendadas" value={String(agendadas)} icon={Clock} gradient="bg-gradient-to-br from-secondary to-secondary/70" />
          <StatCard label="Realizadas" value={String(realizadas)} icon={CheckCircle} gradient="bg-gradient-to-br from-success to-success/70" />
          <StatCard label="Canceladas" value={String(canceladas)} icon={XCircle} gradient="bg-gradient-to-br from-destructive to-destructive/70" />
        </div>

        {/* Filters */}
        <AulaFilters
          filterTurma={filterTurma}
          setFilterTurma={setFilterTurma}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          turmaNames={turmaNames}
          onClear={handleClearFilters}
        />

        {/* Content */}
        {view === "cards" ? (
          <div className="space-y-6">
            {grouped.map(([date, aulas]) => (
              <div key={date}>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">{formatDateFull(date)}</p>
                  <Badge variant="outline" className="text-[10px]">{aulas.length} aula{aulas.length > 1 ? "s" : ""}</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aulas.map((aula) => (
                    <AulaCard key={aula.id} aula={aula} onView={handleView} />
                  ))}
                </div>
              </div>
            ))}
            {grouped.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
                <p className="font-medium">Nenhuma aula encontrada</p>
                <p className="text-xs">Tente ajustar os filtros</p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Data</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Turma</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Horário</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Professor</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Alunos</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((aula) => (
                    <TableRow key={aula.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="text-sm font-medium text-foreground">{formatDateShort(aula.data)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{aula.turmaNome}</p>
                          <p className="text-xs text-muted-foreground">{aula.modalidade}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-foreground">{aula.horarioInicio} - {aula.horarioFim}</TableCell>
                      <TableCell className="text-sm text-foreground">{aula.professorNome}</TableCell>
                      <TableCell className="text-sm text-foreground">{aula.presencas.length}</TableCell>
                      <TableCell><AulaStatusBadge status={aula.status} /></TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => handleView(aula)}>
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-16 text-muted-foreground">
                        <Calendar className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
                        <p className="font-medium">Nenhuma aula encontrada</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      <AulaDetailDialog open={detailOpen} onOpenChange={setDetailOpen} aula={selectedAula} />
    </DashboardLayout>
  );
};

export default Aulas;
