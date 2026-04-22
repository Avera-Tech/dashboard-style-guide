import { useCallback, useEffect, useState } from "react";
import {
  Briefcase,
  Plus,
  UserCheck,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import StatCard from "@/modules/core/components/dashboard/StatCard";
import UserTable from "@/modules/core/components/dashboard/UserTable";
import type { BaseUser, Column, FilterConfig } from "@/modules/core/components/dashboard/UserTable";
import StaffCollection from "@/modules/core/api/staff";
import type { Staff } from "@/modules/core/types/staff";
import { toast } from "@/hooks/use-toast";

const repository = new StaffCollection();

// ── Helpers ──────────────────────────────────────────────

const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Professor", value: "professor" },
  { label: "Coordenador", value: "coordenador" },
  { label: "Secretário", value: "secretario" },
  { label: "Diretor", value: "diretor" },
];

const LEVEL_OPTIONS = [
  { label: "Júnior", value: "junior" },
  { label: "Pleno", value: "pleno" },
  { label: "Sênior", value: "senior" },
];

function getFirstRole(staff: Staff) {
  return staff.roles?.[0]?.name ?? "—";
}

function getFirstRoleSlug(staff: Staff) {
  return staff.roles?.[0]?.slug ?? "";
}

// ── Colunas ──────────────────────────────────────────────

const staffColumns: Column<Staff & BaseUser>[] = [
  {
    key: "roles",
    label: "Cargo",
    render: (s) => (
      <div className="flex items-center gap-1.5">
        <BadgeCheck className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-sm text-foreground">{getFirstRole(s)}</span>
      </div>
    ),
  },
  {
    key: "employeeLevel",
    label: "Nível",
    render: (s) => (
      <Badge variant="outline" className="font-medium">
        {s.employeeLevel ?? "—"}
      </Badge>
    ),
  },
  {
    key: "phone",
    label: "Telefone",
    render: (s) => (
      <span className="text-sm text-muted-foreground">{s.phone ?? "—"}</span>
    ),
  },
];

// ── Form state ────────────────────────────────────────────

interface StaffFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  employeeLevel: string;
}

const emptyForm: StaffFormData = {
  name: "",
  email: "",
  password: "",
  role: "",
  phone: "",
  employeeLevel: "",
};

// ── Create Dialog ─────────────────────────────────────────

const StaffCreateDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) => {
  const [form, setForm] = useState<StaffFormData>(emptyForm);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof StaffFormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleClose = () => {
    setForm(emptyForm);
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.role) {
      toast({ title: "Campos obrigatórios", description: "Nome, email, senha e cargo são obrigatórios.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await repository.create({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        phone: form.phone || undefined,
        employeeLevel: form.employeeLevel || undefined,
      });
      toast({ title: "Funcionário cadastrado", description: `${form.name} foi adicionado com sucesso.` });
      onSuccess();
      handleClose();
    } catch {
      toast({ title: "Erro ao cadastrar", description: "Não foi possível criar o funcionário.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Funcionário</DialogTitle>
          <DialogDescription>Preencha os dados para cadastrar um novo funcionário.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="create-name">Nome completo *</Label>
              <Input id="create-name" placeholder="Ex: Roberto Ferreira" value={form.name} onChange={set("name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="create-email" type="email" placeholder="email@empresa.com" className="pl-10" value={form.email} onChange={set("email")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-password">Senha *</Label>
              <Input id="create-password" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-phone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="create-phone" placeholder="(00) 00000-0000" className="pl-10" value={form.phone} onChange={set("phone")} />
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cargo *</Label>
              <Select value={form.role} onValueChange={(v) => setForm((p) => ({ ...p, role: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nível</Label>
              <Select value={form.employeeLevel} onValueChange={(v) => setForm((p) => ({ ...p, employeeLevel: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {LEVEL_OPTIONS.map((l) => (
                    <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Cadastrar Funcionário"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ── Edit Dialog ───────────────────────────────────────────

const StaffEditDialog = ({
  open,
  onOpenChange,
  staff,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: Staff | null;
  onSuccess: () => void;
}) => {
  const [form, setForm] = useState({ name: "", phone: "", employeeLevel: "", role: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (staff) {
      setForm({
        name: staff.name,
        phone: staff.phone ?? "",
        employeeLevel: staff.employeeLevel ?? "",
        role: getFirstRoleSlug(staff),
      });
    }
  }, [staff]);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!staff) return;
    setLoading(true);
    try {
      await repository.update(staff.id, {
        name: form.name || undefined,
        phone: form.phone || undefined,
        employeeLevel: form.employeeLevel || undefined,
        role: form.role || undefined,
      });
      toast({ title: "Funcionário atualizado", description: `${form.name} foi atualizado com sucesso.` });
      onSuccess();
      onOpenChange(false);
    } catch {
      toast({ title: "Erro ao atualizar", description: "Não foi possível atualizar o funcionário.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Funcionário</DialogTitle>
          <DialogDescription>Atualize os dados do funcionário.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="edit-name">Nome completo</Label>
              <Input id="edit-name" value={form.name} onChange={set("name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="edit-phone" placeholder="(00) 00000-0000" className="pl-10" value={form.phone} onChange={set("phone")} />
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cargo</Label>
              <Select value={form.role} onValueChange={(v) => setForm((p) => ({ ...p, role: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nível</Label>
              <Select value={form.employeeLevel} onValueChange={(v) => setForm((p) => ({ ...p, employeeLevel: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {LEVEL_OPTIONS.map((l) => (
                    <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ── Deactivate Dialog ─────────────────────────────────────

const StaffDeactivateDialog = ({
  open,
  onOpenChange,
  staff,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: Staff | null;
  onSuccess: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!staff) return;
    setLoading(true);
    try {
      await repository.deactivate(staff.id);
      toast({ title: "Funcionário desativado", description: `${staff.name} foi desativado com sucesso.` });
      onSuccess();
      onOpenChange(false);
    } catch {
      toast({ title: "Erro ao desativar", description: "Não foi possível desativar o funcionário.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Desativar funcionário</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja desativar{" "}
            <span className="font-semibold text-foreground">{staff?.name}</span>?
            O funcionário perderá acesso ao sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Desativando..." : "Desativar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// ── Filtros ───────────────────────────────────────────────

const staffFilters: FilterConfig[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Ativo", value: "active" },
      { label: "Inativo", value: "inactive" },
    ],
  },
];

// ── Página principal ──────────────────────────────────────

const StaffPage = () => {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [staff, setStaff] = useState<Staff[]>([]);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const activeCount = staff.filter((s) => s.active).length;
  const inactiveCount = staff.filter((s) => !s.active).length;

  const fetchStaff = useCallback(async () => {
    try {
      const { data } = await repository.list();
      setStaff(data);
    } catch {
      toast({ title: "Erro ao carregar", description: "Não foi possível carregar os funcionários.", variant: "destructive" });
    }
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const handleEdit = (item: Staff & BaseUser) => {
    setSelectedStaff(item);
    setEditOpen(true);
  };

  const handleDeactivate = (item: Staff & BaseUser) => {
    setSelectedStaff(item);
    setDeactivateOpen(true);
  };

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">Funcionários</h1>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {staff.length}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Gerencie os funcionários da instituição</p>
          </div>
          <Button onClick={() => setCreateOpen(true)} className="shadow-md shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Novo Funcionário
          </Button>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total de Funcionários"
            value={String(staff.length)}
            icon={Briefcase}
            gradient="bg-gradient-to-br from-primary to-primary/70"
          />
          <StatCard
            label="Ativos"
            value={String(activeCount)}
            icon={UserCheck}
            gradient="bg-gradient-to-br from-success to-success/70"
          />
          <StatCard
            label="Inativos"
            value={String(inactiveCount)}
            icon={Clock}
            gradient="bg-gradient-to-br from-accent to-accent/70"
          />
        </div>

        <UserTable
          data={staff.map((s) => ({
            ...s,
            status: s.active ? "active" : "inactive",
          } as Staff & BaseUser))}
          columns={staffColumns}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Buscar funcionário por nome ou email..."
          filters={staffFilters}
          activeFilters={activeFilters}
          onFilterChange={(key, values) =>
            setActiveFilters((prev) => ({ ...prev, [key]: values }))
          }
          onEdit={handleEdit}
          onDelete={handleDeactivate}
        />
      </div>

      <StaffCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={fetchStaff}
      />

      <StaffEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        staff={selectedStaff}
        onSuccess={fetchStaff}
      />

      <StaffDeactivateDialog
        open={deactivateOpen}
        onOpenChange={setDeactivateOpen}
        staff={selectedStaff}
        onSuccess={fetchStaff}
      />
    </DashboardLayout>
  );
};

export default StaffPage;
