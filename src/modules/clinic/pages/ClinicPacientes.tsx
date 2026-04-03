import { useState, useMemo } from "react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, Eye, ExternalLink, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { MOCK_PACIENTES, CONVENIOS } from "@/modules/clinic/data/mock-pacientes";

const ITEMS_PER_PAGE = 6;

const ClinicPacientes = () => {
  const [search, setSearch] = useState("");
  const [convenioFilter, setConvenioFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return MOCK_PACIENTES.filter((p) => {
      const matchSearch =
        !search ||
        p.nome.toLowerCase().includes(search.toLowerCase()) ||
        p.codigo.toLowerCase().includes(search.toLowerCase());
      const matchConvenio = convenioFilter === "todos" || p.convenio === convenioFilter;
      const matchStatus = statusFilter === "todos" || p.status === statusFilter;
      return matchSearch && matchConvenio && matchStatus;
    });
  }, [search, convenioFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalCadastrados = 1284;
  const ativosHoje = 48;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Pacientes</h1>
            <p className="text-sm text-muted-foreground mt-1">administração / pacientes</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar paciente, médico..."
                className="pl-9 w-64"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>
        </div>

        {/* Title + stats + action */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Pacientes</h2>
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">{totalCadastrados.toLocaleString()}</span> cadastrados · {ativosHoje} ativos hoje
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo paciente
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CPF ou código..."
              className="pl-9"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <Select value={convenioFilter} onValueChange={(v) => { setConvenioFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Todos os convênios" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os convênios</SelectItem>
              {CONVENIOS.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs uppercase text-muted-foreground font-semibold">Código</TableHead>
                <TableHead className="text-xs uppercase text-muted-foreground font-semibold">Nome</TableHead>
                <TableHead className="text-xs uppercase text-muted-foreground font-semibold">Data Nasc.</TableHead>
                <TableHead className="text-xs uppercase text-muted-foreground font-semibold">Convênio</TableHead>
                <TableHead className="text-xs uppercase text-muted-foreground font-semibold">Último Atend.</TableHead>
                <TableHead className="text-xs uppercase text-muted-foreground font-semibold">Status</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((paciente) => (
                <TableRow key={paciente.id} className="hover:bg-muted/30">
                  <TableCell className="text-sm text-muted-foreground">{paciente.codigo}</TableCell>
                  <TableCell className="text-sm font-medium text-foreground">{paciente.nome}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{paciente.dataNascimento}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {paciente.convenio}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{paciente.ultimoAtendimento}</TableCell>
                  <TableCell>
                    <span className={paciente.status === "Ativo" ? "text-sm font-medium text-green-600" : "text-sm font-medium text-muted-foreground"}>
                      {paciente.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhum paciente encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-1 p-4 border-t border-border">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            {totalPages > 4 && (
              <>
                <span className="px-1 text-muted-foreground">…</span>
                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicPacientes;
