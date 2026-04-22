import { ReactNode, useState, useEffect } from "react";
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
} from "lucide-react";
import { Pagination } from "./Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

type UserStatus = "active" | "inactive" | "pending";

interface BaseUser {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  createdAt: string;
}

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render: (item: T) => ReactNode;
}

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
}

interface UserTableProps<T extends BaseUser> {
  data: T[];
  columns: Column<T>[];
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  activeFilters?: Record<string, string[]>;
  onFilterChange?: (key: string, values: string[]) => void;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  loading?: boolean;
}

const statusConfig: Record<UserStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Ativo", variant: "default" },
  inactive: { label: "Inativo", variant: "secondary" },
  pending: { label: "Pendente", variant: "outline" },
};

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

const PAGE_SIZE = 10;
const SKELETON_ROWS = 6;

function SkeletonCell({ className = "h-4 w-24" }: { className?: string }) {
  return <div className={`rounded bg-muted animate-pulse ${className}`} />;
}

function UserTable<T extends BaseUser>({
  data,
  columns,
  search,
  onSearchChange,
  filters = [],
  activeFilters = {},
  onFilterChange,
  onView,
  onEdit,
  onDelete,
  loading = false,
}: UserTableProps<T>) {
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilters = Object.entries(activeFilters).every(([key, values]) => {
      if (values.length === 0) return true;
      return values.includes(String((u as Record<string, unknown>)[key]));
    });
    return matchesSearch && matchesFilters;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeFilters]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleClearFilters = () => {
    setFilterName("");
    setFilterEmail("");
    onSearchChange("");
    if (onFilterChange) {
      Object.keys(activeFilters).forEach((key) => onFilterChange(key, []));
    }
  };

  const handleSearch = () => {
    onSearchChange(filterName || filterEmail);
  };

  const totalCols = columns.length + 4;

  return (
    <>
      {/* Filter Card */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Filtro</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Nome</label>
            <Input
              className="bg-background"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Email</label>
            <Input
              className="bg-background"
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClearFilters}>Limpar</Button>
          <Button onClick={handleSearch}>Pesquisar</Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-[280px]">
                  <button className="flex items-center gap-1.5 hover:text-foreground transition-colors text-xs font-semibold uppercase tracking-wider">
                    Usuário <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                {columns.map((col) => (
                  <TableHead key={col.key} className="text-xs font-semibold uppercase tracking-wider">
                    {col.sortable ? (
                      <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                        {col.label} <ArrowUpDown className="h-3 w-3" />
                      </button>
                    ) : (
                      col.label
                    )}
                  </TableHead>
                ))}
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                <TableHead>
                  <button className="flex items-center gap-1.5 hover:text-foreground transition-colors text-xs font-semibold uppercase tracking-wider">
                    Criado em <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider">Opções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-muted animate-pulse shrink-0" />
                        <div className="space-y-1.5">
                          <SkeletonCell className="h-3.5 w-28" />
                          <SkeletonCell className="h-3 w-36" />
                        </div>
                      </div>
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        <SkeletonCell className="h-4 w-20" />
                      </TableCell>
                    ))}
                    <TableCell><SkeletonCell className="h-5 w-14 rounded-full" /></TableCell>
                    <TableCell><SkeletonCell className="h-4 w-20" /></TableCell>
                    <TableCell><SkeletonCell className="h-8 w-20 rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item) => {
                  const status = statusConfig[item.status];
                  const isInactive = item.status === "inactive";
                  return (
                    <TableRow key={item.id} className="group hover:bg-muted/20 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 ring-1 ring-border">
                            <AvatarFallback className="text-xs bg-primary/5 text-primary font-semibold">
                              {getInitials(item.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      {columns.map((col) => (
                        <TableCell key={col.key}>{col.render(item)}</TableCell>
                      ))}
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => onView?.(item)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit?.(item)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              disabled={isInactive}
                              onClick={() => !isInactive && onDelete?.(item)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={totalCols} className="text-center py-16 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-8 w-8 text-muted-foreground/40" />
                      <p className="font-medium">Nenhum resultado encontrado</p>
                      <p className="text-xs">Tente ajustar os filtros de busca</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
          loading={loading}
        />
      </div>
    </>
  );
}

export default UserTable;
export { statusConfig, getInitials };
export type { BaseUser, Column, UserStatus, FilterConfig, FilterOption };
