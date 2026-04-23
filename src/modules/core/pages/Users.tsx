import { useState, useEffect, useCallback } from "react";
import {
  GraduationCap,
  Plus,
  UserCheck,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import StatCard from "@/modules/core/components/dashboard/StatCard";
import UserTable from "@/modules/core/components/dashboard/UserTable";
import type { BaseUser, Column, FilterConfig } from "@/modules/core/components/dashboard/UserTable";
import UserFormDialog from "@/modules/core/components/users/UserFormDialog";
import UserProfileDialog from "@/modules/core/components/users/UserProfileDialog";
import UserDeleteDialog from "@/modules/core/components/users/UserDeleteDialog";
import { toast } from "@/hooks/use-toast";
import UserCollection from "@/modules/core/api/users";
import type { User as ApiUser } from "@/modules/core/types/user";

const api = new UserCollection();

interface DisplayUser extends BaseUser {
  phone: string;
  nivel: string;
  ultimoCheckin: string;
  apiData: ApiUser;
}

function mapApiUser(u: ApiUser): DisplayUser {
  return {
    id: String(u.id),
    name: u.name,
    email: u.email,
    status: u.status ?? (u.active ? "active" : "inactive"),
    createdAt: u.createdAt,
    phone: u.phone ?? "—",
    nivel: u.level?.name ?? "—",
    ultimoCheckin: "—",
    apiData: u,
  };
}

const userColumns: Column<DisplayUser>[] = [
  {
    key: "phone",
    label: "Telefone",
    render: (user) => <span className="text-sm text-muted-foreground">{user.phone}</span>,
  },
  {
    key: "nivel",
    label: "Nível",
    render: (user) =>
      user.nivel !== "—" ? (
        <Badge variant="secondary" className="font-medium">{user.nivel}</Badge>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      ),
  },
  {
    key: "ultimoCheckin",
    label: "Último Check-in",
    render: (user) => <span className="text-sm text-muted-foreground">{user.ultimoCheckin}</span>,
  },
];

const Users = () => {
  const [users, setUsers] = useState<DisplayUser[]>([]);

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DisplayUser | null>(null);
  const [detailUser, setDetailUser] = useState<ApiUser | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const statusFilter = activeFilters.status?.[0];
      const result = await api.list({
        search: search || undefined,
        status: statusFilter,
        limit: 100,
      });
      setUsers((result.data as ApiUser[]).map(mapApiUser));
      setTotal(result.meta.total);
    } catch {
      toast({ title: "Erro ao carregar alunos", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [search, activeFilters]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);


  const activeCount = users.filter((u) => u.status === "active").length;
  const pendingCount = users.filter((u) => u.status === "pending").length;

  const userFilters: FilterConfig[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Ativo", value: "active" },
        { label: "Inativo", value: "inactive" },
        { label: "Pendente", value: "pending" },
      ],
    },
  ];

  const fetchDetail = async (id: number): Promise<ApiUser | null> => {
    try {
      setDetailLoading(true);
      const res = await api.getById(id);
      return res.data as ApiUser;
    } catch {
      toast({ title: "Erro ao carregar dados do aluno", variant: "destructive" });
      return null;
    } finally {
      setDetailLoading(false);
    }
  };

  const handleView = async (user: DisplayUser) => {
    setSelectedUser(user);
    const full = await fetchDetail(Number(user.id));
    if (full) {
      setDetailUser(full);
      setProfileDialogOpen(true);
    }
  };

  const handleEdit = async (user: DisplayUser) => {
    setSelectedUser(user);
    const full = await fetchDetail(Number(user.id));
    if (full) {
      setDetailUser(full);
      setEditDialogOpen(true);
    }
  };

  const handleDelete = (user: DisplayUser) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await api.deactivate(Number(selectedUser.id));
      toast({
        title: "Aluno removido",
        description: `${selectedUser.name} foi removido com sucesso.`,
      });
      setDeleteDialogOpen(false);
      setSelectedUser(null);
      loadUsers();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : undefined;
      toast({ title: "Erro ao remover aluno", description: message, variant: "destructive" });
    }
  };

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">Alunos</h1>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {total}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Gerencie os alunos do CT</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="shadow-md shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Novo Aluno
          </Button>
          <UserFormDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onSuccess={loadUsers}
          />
          <UserFormDialog
            open={editDialogOpen}
            onOpenChange={(open) => {
              setEditDialogOpen(open);
              if (!open) { setSelectedUser(null); setDetailUser(null); }
            }}
            user={detailUser ?? undefined}
            onSuccess={loadUsers}
          />
          <UserProfileDialog
            open={profileDialogOpen}
            onOpenChange={(open) => {
              setProfileDialogOpen(open);
              if (!open) setDetailUser(null);
            }}
            user={detailUser}
          />
          <UserDeleteDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            userName={selectedUser?.name ?? null}
            onConfirm={handleConfirmDelete}
          />
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total de Alunos"
            value={String(total)}
            change="+12%"
            icon={GraduationCap}
            gradient="bg-gradient-to-br from-primary to-primary/70"
          />
          <StatCard
            label="Ativos"
            value={String(activeCount)}
            icon={UserCheck}
            gradient="bg-gradient-to-br from-success to-success/70"
          />
          <StatCard
            label="Pendentes"
            value={String(pendingCount)}
            icon={Clock}
            gradient="bg-gradient-to-br from-accent to-accent/70"
          />
        </div>

        <UserTable
          data={users}
          columns={userColumns}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Buscar aluno por nome ou email..."
          filters={userFilters}
          activeFilters={activeFilters}
          onFilterChange={(key, values) =>
            setActiveFilters((prev) => ({ ...prev, [key]: values }))
          }
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
};

export default Users;
