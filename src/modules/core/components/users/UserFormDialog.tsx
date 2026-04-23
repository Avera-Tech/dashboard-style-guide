import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users as UsersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusField from "@/modules/core/components/dashboard/StatusField";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import UserCollection from "@/modules/core/api/users";
import type { User, UserLevel, CreateUserPayload } from "@/modules/core/types/user";

const api = new UserCollection();

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const EMPTY_FORM = {
  name: "",
  document: "",
  email: "",
  phone: "",
  birthday: "",
  status: "active" as "active" | "inactive" | "pending",
  levelId: "",
  guardianUserId: "",
  guardianName: "",
  guardianPhone: "",
  guardianDocument: "",
  zipCode: "",
  state: "",
  city: "",
  address: "",
  isMinor: false as boolean,
};

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onSuccess: () => void;
}

const UserFormDialog = ({ open, onOpenChange, user, onSuccess }: UserFormDialogProps) => {
  const isEdit = !!user;
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof EMPTY_FORM, string>>>({});
  const [loading, setLoading] = useState(false);
  const [guardianMode, setGuardianMode] = useState<"external" | "student">("external");
  const [students, setStudents] = useState<{ id: number; name: string }[]>([]);
  const [levels, setLevels] = useState<UserLevel[]>([]);

  useEffect(() => {
    if (!open) return;
    if (levels.length === 0) {
      api.listLevels().then((res) => setLevels(res.data)).catch(() => {});
    }
    setErrors({});
    const g = user?.guardian;
    const mode = g?.guardianUserId ? "student" : "external";
    setGuardianMode(mode);
    if (user) {
      setForm({
        name: user.name ?? "",
        document: user.document ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        birthday: user.birthday ? String(user.birthday).split("T")[0] : "",
        status: user.status ?? "active",
        levelId: user.levelId ? String(user.levelId) : "",
        guardianUserId: g?.guardianUserId ? String(g.guardianUserId) : "",
        guardianName: g?.name ?? "",
        guardianPhone: g?.phone ?? "",
        guardianDocument: g?.document ?? "",
        zipCode: user.zipCode ?? "",
        state: user.state ?? "",
        city: user.city ?? "",
        address: user.address ?? "",
        isMinor: !!g || (user.isMinor ?? false),
      });
    } else {
      setForm({ ...EMPTY_FORM });
    }
  }, [open, user, levels.length]);

  useEffect(() => {
    if (!open || !form.isMinor || guardianMode !== "student") return;
    if (students.length > 0) return;
    api.listDropdown().then((res) => setStudents(res.data)).catch(() => {});
  }, [open, form.isMinor, guardianMode, students.length]);

  const set = (key: keyof typeof EMPTY_FORM, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async () => {
    const newErrors: Partial<Record<keyof typeof EMPTY_FORM, string>> = {};

    if (!form.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!form.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Email inválido";
    }
    if (form.phone && !isValidPhone(form.phone)) {
      newErrors.phone = "Telefone inválido";
    }
    if (form.isMinor && guardianMode === "external") {
      if (form.guardianPhone && !isValidPhone(form.guardianPhone)) {
        newErrors.guardianPhone = "Telefone inválido";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const stripPhone = (v: string) => v.replace(/\D/g, "");

    const payload: CreateUserPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone ? stripPhone(form.phone) : undefined,
      document: form.document || undefined,
      birthday: form.birthday || undefined,
      levelId: form.levelId ? Number(form.levelId) : undefined,
      guardian: form.isMinor
        ? guardianMode === "student" && form.guardianUserId
          ? { guardianUserId: Number(form.guardianUserId) }
          : (form.guardianName || form.guardianPhone || form.guardianDocument)
            ? {
                name: form.guardianName || undefined,
                phone: form.guardianPhone ? stripPhone(form.guardianPhone) : undefined,
                document: form.guardianDocument || undefined,
              }
            : undefined
        : null,
      zipCode: form.zipCode || undefined,
      state: form.state || undefined,
      city: form.city || undefined,
      address: form.address || undefined,
      isMinor: form.isMinor,
      status: form.status,
      active: form.status === "active",
    };

    try {
      setLoading(true);
      if (isEdit && user) {
        await api.update(user.id, payload);
        toast({ title: "Aluno atualizado com sucesso" });
      } else {
        await api.create(payload);
        toast({ title: "Aluno cadastrado com sucesso" });
      }
      onOpenChange(false);
      onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : undefined;
      toast({
        title: isEdit ? "Erro ao atualizar aluno" : "Erro ao cadastrar aluno",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Aluno" : "Cadastrar Aluno"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edite os dados do aluno."
              : "Preencha os dados para matricular um novo aluno no CT."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Dados pessoais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="user-name">Nome completo</Label>
              <Input
                id="user-name"
                placeholder="Ex: Maria Santos"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-cpf">CPF</Label>
              <Input
                id="user-cpf"
                placeholder="000.000.000-00"
                value={form.document}
                onChange={(e) => set("document", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="user-email"
                  type="email"
                  placeholder="email@exemplo.com"
                  className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-phone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="user-phone"
                  placeholder="(00) 00000-0000"
                  className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                  value={form.phone}
                  onChange={(e) => set("phone", maskPhone(e.target.value))}
                />
              </div>
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-birth">Data de Nascimento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="user-birth"
                  type="date"
                  className="pl-10"
                  value={form.birthday}
                  onChange={(e) => set("birthday", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Menor de idade + Responsável */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="user-minor"
                checked={form.isMinor}
                onCheckedChange={(checked) => set("isMinor", !!checked)}
              />
              <Label htmlFor="user-minor" className="text-sm font-normal cursor-pointer">
                Pessoa menor de idade
              </Label>
            </div>

            {form.isMinor && (
              <Tabs
                value={guardianMode}
                onValueChange={(v) => setGuardianMode(v as "external" | "student")}
              >
                <TabsList className="w-full">
                  <TabsTrigger value="external" className="flex-1">Responsável externo</TabsTrigger>
                  <TabsTrigger value="student" className="flex-1">Aluno responsável</TabsTrigger>
                </TabsList>

                <TabsContent value="external" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="user-responsavel">Nome do Responsável</Label>
                      <div className="relative">
                        <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="user-responsavel"
                          placeholder="Nome do pai/mãe ou responsável"
                          className="pl-10"
                          value={form.guardianName}
                          onChange={(e) => set("guardianName", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-resp-phone">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="user-resp-phone"
                          placeholder="(00) 00000-0000"
                          className={`pl-10 ${errors.guardianPhone ? "border-destructive" : ""}`}
                          value={form.guardianPhone}
                          onChange={(e) => set("guardianPhone", maskPhone(e.target.value))}
                        />
                      </div>
                      {errors.guardianPhone && <p className="text-xs text-destructive">{errors.guardianPhone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-resp-doc">CPF</Label>
                      <Input
                        id="user-resp-doc"
                        placeholder="000.000.000-00"
                        value={form.guardianDocument}
                        onChange={(e) => set("guardianDocument", e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="student" className="mt-4">
                  <div className="space-y-2">
                    <Label>Selecionar aluno</Label>
                    <Select
                      value={form.guardianUserId}
                      onValueChange={(v) => set("guardianUserId", v)}
                      disabled={students.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={students.length === 0 ? "Nenhum aluno disponível" : "Selecionar aluno..."}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {students
                          .filter((s) => !user || s.id !== user.id)
                          .map((s) => (
                            <SelectItem key={s.id} value={String(s.id)}>
                              {s.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>

          <Separator />

          {/* Dados esportivos */}
          <div className="space-y-2">
            <Label>Nível</Label>
            <Select
              value={form.levelId}
              onValueChange={(v) => set("levelId", v)}
              disabled={levels.length === 0}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={levels.length === 0 ? "Nenhum nível cadastrado" : "Selecione o nível"}
                />
              </SelectTrigger>
              <SelectContent>
                {levels.map((l) => (
                  <SelectItem key={l.id} value={String(l.id)}>
                    {l.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Endereço */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user-cep">CEP</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="user-cep"
                  placeholder="00000-000"
                  className="pl-10"
                  value={form.zipCode}
                  onChange={(e) => set("zipCode", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-state">Estado</Label>
              <Input
                id="user-state"
                placeholder="Ex: SP"
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-city">Cidade</Label>
              <Input
                id="user-city"
                placeholder="Ex: São Paulo"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-address">Endereço</Label>
              <Input
                id="user-address"
                placeholder="Rua, número, complemento"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
              />
            </div>
          </div>

          <Separator />

          {/* Status */}
          <StatusField
            checked={form.status === "active"}
            onCheckedChange={(checked) => set("status", checked ? "active" : "inactive")}
            activeDescription="O aluno está ativo e pode participar das aulas."
            inactiveDescription="O aluno está inativo e não aparece nas turmas."
          />


        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : isEdit ? "Salvar" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
