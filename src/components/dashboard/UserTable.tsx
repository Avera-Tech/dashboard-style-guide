import { ReactNode } from "react";
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Filter,
  Download,
  X,
} from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
}

const statusConfig: Record<UserStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "Ativo", variant: "default" },
  inactive: { label: "Inativo", variant: "secondary" },
  pending: { label: "Pendente", variant: "outline" },
};

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function UserTable<T extends BaseUser>({
  data,
  columns,
  search,
  onSearchChange,
  searchPlaceholder = "Buscar por nome ou email...",
  filters = [],
  activeFilters = {},
  onFilterChange,
}: UserTableProps<T>) {
  const activeFilterCount = Object.values(activeFilters).reduce((acc, v) => acc + v.length, 0);

  const toggleFilter = (key: string, value: string) => {
    if (!onFilterChange) return;
    const current = activeFilters[key] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(key, next);
  };

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

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-10 bg-card"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="default" className="bg-card relative">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
                {activeFilterCount > 0 && (
                  <Badge variant="default" className="ml-1.5 h-5 min-w-[20px] px-1.5 text-[10px]">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64 p-3">
              <div className="space-y-3">
                {filters.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-2">Nenhum filtro disponível</p>
                ) : (
                  filters.map((filter) => (
                    <div key={filter.key} className="space-y-1.5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{filter.label}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {filter.options.map((opt) => {
                          const isActive = (activeFilters[filter.key] || []).includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              onClick={() => toggleFilter(filter.key, opt.value)}
                              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors border ${
                                isActive
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-card text-foreground border-border hover:bg-muted"
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => filters.forEach((f) => onFilterChange?.(f.key, []))}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Limpar filtros
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="default" className="bg-card">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
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
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => {
                const status = statusConfig[item.status];
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Enviar email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
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
                  <TableCell colSpan={columns.length + 4} className="text-center py-16 text-muted-foreground">
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
            <Button variant="outline" size="sm" className="h-8 min-w-[32px]">2</Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserTable;
export { statusConfig, getInitials };
export type { BaseUser, Column, UserStatus, FilterConfig, FilterOption };
