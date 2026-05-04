import { useState, useEffect } from "react";
import {
  Building2,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Phone,
  Mail,
  Globe,
  Save,
  Palette,
  Image,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

// ── Theme helpers ──────────────────────────────────────
const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

function authHeaders(extra?: Record<string, string>) {
  const token    = localStorage.getItem("token") ?? "";
  const clientId = localStorage.getItem("clientId") ?? "";
  return {
    Authorization:  `Bearer ${token}`,
    "X-Client-Id":  clientId,
    ...extra,
  };
}

interface ThemeForm {
  name:            string;
  primaryColor:    string;
  secondaryColor:  string;
  accentColor:     string;
  backgroundColor: string;
  textColor:       string;
  logo:            string;
  favicon:         string;
}

const DEFAULT_THEME: ThemeForm = {
  name:            "",
  primaryColor:    "#3B82F6",
  secondaryColor:  "#6c757d",
  accentColor:     "#F59E0B",
  backgroundColor: "#ffffff",
  textColor:       "#212529",
  logo:            "",
  favicon:         "",
};

// ── Types ──────────────────────────────────────────────
interface Endereco {
  id: string;
  nome: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  principal: boolean;
}

// ── Mock data ──────────────────────────────────────────
const MOCK_ENDERECOS: Endereco[] = [
  {
    id: "1",
    nome: "Sede Principal",
    cep: "01310-100",
    logradouro: "Av. Paulista",
    numero: "1578",
    complemento: "Sala 12",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    principal: true,
  },
  {
    id: "2",
    nome: "Quadra Norte",
    cep: "02040-020",
    logradouro: "Rua das Palmeiras",
    numero: "320",
    complemento: "",
    bairro: "Santana",
    cidade: "São Paulo",
    estado: "SP",
    principal: false,
  },
];

const Configuracoes = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") ?? "empresa";

  // ── Theme state ────────────────────────────────────
  const [themeForm,    setThemeForm]    = useState<ThemeForm>(DEFAULT_THEME);
  const [themeLoading, setThemeLoading] = useState(false);
  const [themeSaving,  setThemeSaving]  = useState(false);

  useEffect(() => {
    setThemeLoading(true);
    fetch(`${BASE}/api/theme`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.theme) {
          setThemeForm({
            name:            data.theme.name            ?? "",
            primaryColor:    data.theme.primaryColor    ?? DEFAULT_THEME.primaryColor,
            secondaryColor:  data.theme.secondaryColor  ?? DEFAULT_THEME.secondaryColor,
            accentColor:     data.theme.accentColor     ?? DEFAULT_THEME.accentColor,
            backgroundColor: data.theme.backgroundColor ?? DEFAULT_THEME.backgroundColor,
            textColor:       data.theme.textColor       ?? DEFAULT_THEME.textColor,
            logo:            data.theme.logo            ?? "",
            favicon:         data.theme.favicon         ?? "",
          });
        }
      })
      .catch(() => {/* mantém defaults */})
      .finally(() => setThemeLoading(false));
  }, []);

  const saveTheme = async () => {
    setThemeSaving(true);
    try {
      const res  = await fetch(`${BASE}/api/theme`, {
        method:  "PUT",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body:    JSON.stringify({
          ...themeForm,
          logo:    themeForm.logo    || null,
          favicon: themeForm.favicon || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Atualiza o localStorage para que o sidebar reflita imediatamente
        const stored = localStorage.getItem("theme");
        if (stored) {
          const parsed = JSON.parse(stored);
          localStorage.setItem("theme", JSON.stringify({ ...parsed, ...themeForm, configured: true }));
        }
        toast({ title: "Tema salvo com sucesso!" });
      } else {
        toast({ title: "Erro ao salvar tema", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro de conexão", variant: "destructive" });
    } finally {
      setThemeSaving(false);
    }
  };

  // ── Endereços state ────────────────────────────────
  const [enderecos, setEnderecos] = useState<Endereco[]>(MOCK_ENDERECOS);
  const [enderecoDialogOpen, setEnderecoDialogOpen] = useState(false);
  const [editingEndereco, setEditingEndereco] = useState<Endereco | null>(null);
  const [endForm, setEndForm] = useState<Omit<Endereco, "id">>({
    nome: "", cep: "", logradouro: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "", principal: false,
  });

  const openNewEndereco = () => {
    setEditingEndereco(null);
    setEndForm({ nome: "", cep: "", logradouro: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "", principal: false });
    setEnderecoDialogOpen(true);
  };

  const openEditEndereco = (e: Endereco) => {
    setEditingEndereco(e);
    setEndForm({ nome: e.nome, cep: e.cep, logradouro: e.logradouro, numero: e.numero, complemento: e.complemento, bairro: e.bairro, cidade: e.cidade, estado: e.estado, principal: e.principal });
    setEnderecoDialogOpen(true);
  };

  const saveEndereco = () => {
    if (!endForm.nome || !endForm.logradouro || !endForm.cidade) {
      toast({ title: "Preencha os campos obrigatórios", variant: "destructive" });
      return;
    }
    if (editingEndereco) {
      setEnderecos((prev) => prev.map((e) => (e.id === editingEndereco.id ? { ...e, ...endForm } : endForm.principal ? { ...e, principal: false } : e)));
      toast({ title: "Endereço atualizado" });
    } else {
      const newEnd: Endereco = { ...endForm, id: Date.now().toString() };
      if (newEnd.principal) {
        setEnderecos((prev) => [...prev.map((e) => ({ ...e, principal: false })), newEnd]);
      } else {
        setEnderecos((prev) => [...prev, newEnd]);
      }
      toast({ title: "Endereço adicionado" });
    }
    setEnderecoDialogOpen(false);
  };

  const deleteEndereco = (id: string) => {
    setEnderecos((prev) => prev.filter((e) => e.id !== id));
    toast({ title: "Endereço removido" });
  };

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">Configurações</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Dados administrativos do seu negócio</p>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6">
        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="empresa" className="gap-2">
              <Building2 className="h-4 w-4" />
              Empresa
            </TabsTrigger>
            <TabsTrigger value="enderecos" className="gap-2">
              <MapPin className="h-4 w-4" />
              Endereços
            </TabsTrigger>
            <TabsTrigger value="aparencia" className="gap-2">
              <Palette className="h-4 w-4" />
              Aparência
            </TabsTrigger>
          </TabsList>

          {/* ── TAB: Empresa ────────────────────────────── */}
          <TabsContent value="empresa">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Dados da Empresa
                </CardTitle>
                <CardDescription>Informações gerais do seu negócio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome da Empresa</Label>
                    <Input defaultValue="TennisUp" placeholder="Nome da empresa" />
                  </div>
                  <div className="space-y-2">
                    <Label>CNPJ</Label>
                    <Input defaultValue="12.345.678/0001-90" placeholder="00.000.000/0001-00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Razão Social</Label>
                    <Input defaultValue="TennisUp Esportes LTDA" placeholder="Razão social" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Negócio</Label>
                    <Select defaultValue="fit">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fit">Centro Esportivo</SelectItem>
                        <SelectItem value="clinic">Clínica</SelectItem>
                        <SelectItem value="both">Ambos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      Telefone
                    </Label>
                    <Input defaultValue="(11) 99999-0000" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      E-mail
                    </Label>
                    <Input defaultValue="contato@tennisup.com.br" placeholder="email@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      Website
                    </Label>
                    <Input defaultValue="www.tennisup.com.br" placeholder="www.empresa.com.br" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Observações</Label>
                  <Textarea rows={3} placeholder="Informações adicionais sobre o negócio..." />
                </div>

                <div className="flex justify-end">
                  <Button className="shadow-md shadow-primary/20">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB: Aparência ──────────────────────────── */}
          <TabsContent value="aparencia">
            <div className="space-y-6">
              {/* Cores */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    Cores do Sistema
                  </CardTitle>
                  <CardDescription>Defina a paleta de cores da identidade visual</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {themeLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {(
                          [
                            { key: "primaryColor",    label: "Cor Principal" },
                            { key: "secondaryColor",  label: "Cor Secundária" },
                            { key: "accentColor",     label: "Cor de Destaque" },
                            { key: "backgroundColor", label: "Cor de Fundo" },
                            { key: "textColor",       label: "Cor do Texto" },
                          ] as { key: keyof ThemeForm; label: string }[]
                        ).map(({ key, label }) => (
                          <div key={key} className="space-y-2">
                            <Label>{label}</Label>
                            <div className="flex items-center gap-2">
                              <div
                                className="relative h-10 w-10 shrink-0 rounded-lg border-2 border-border overflow-hidden cursor-pointer"
                                style={{ backgroundColor: themeForm[key] || "#000" }}
                              >
                                <input
                                  type="color"
                                  value={themeForm[key] || "#000000"}
                                  onChange={(e) => setThemeForm((f) => ({ ...f, [key]: e.target.value }))}
                                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                />
                              </div>
                              <Input
                                value={themeForm[key]}
                                onChange={(e) => setThemeForm((f) => ({ ...f, [key]: e.target.value }))}
                                placeholder="#000000"
                                className="font-mono text-sm"
                                maxLength={7}
                              />
                            </div>
                          </div>
                        ))}

                        <div className="space-y-2">
                          <Label>Nome do Tema</Label>
                          <Input
                            value={themeForm.name}
                            onChange={(e) => setThemeForm((f) => ({ ...f, name: e.target.value }))}
                            placeholder="Ex: Tema Principal"
                          />
                        </div>
                      </div>

                      {/* Preview */}
                      <div className="rounded-xl border border-border p-4 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Prévia</p>
                        <div className="flex gap-2 flex-wrap">
                          {[
                            { label: "Principal",   color: themeForm.primaryColor },
                            { label: "Secundária",  color: themeForm.secondaryColor },
                            { label: "Destaque",    color: themeForm.accentColor },
                          ].map(({ label, color }) => (
                            <div key={label} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-white text-xs font-medium" style={{ backgroundColor: color }}>
                              {label}
                            </div>
                          ))}
                          <div
                            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium border"
                            style={{ backgroundColor: themeForm.backgroundColor, color: themeForm.textColor, borderColor: themeForm.secondaryColor }}
                          >
                            Texto sobre fundo
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Imagens */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5 text-primary" />
                    Logotipo e Favicon
                  </CardTitle>
                  <CardDescription>URLs públicas das imagens do seu sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>URL do Logo</Label>
                      <Input
                        value={themeForm.logo}
                        onChange={(e) => setThemeForm((f) => ({ ...f, logo: e.target.value }))}
                        placeholder="https://sua-empresa.com/logo.png"
                      />
                      {themeForm.logo && (
                        <div className="rounded-lg border border-border bg-muted/30 p-3 flex items-center justify-center h-20">
                          <img src={themeForm.logo} alt="Logo" className="h-full w-auto object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>URL do Favicon</Label>
                      <Input
                        value={themeForm.favicon}
                        onChange={(e) => setThemeForm((f) => ({ ...f, favicon: e.target.value }))}
                        placeholder="https://sua-empresa.com/favicon.ico"
                      />
                      {themeForm.favicon && (
                        <div className="rounded-lg border border-border bg-muted/30 p-3 flex items-center justify-center h-20">
                          <img src={themeForm.favicon} alt="Favicon" className="h-8 w-8 object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={saveTheme} disabled={themeSaving} className="shadow-md shadow-primary/20">
                  <Save className="h-4 w-4 mr-2" />
                  {themeSaving ? "Salvando..." : "Salvar Tema"}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* ── TAB: Endereços ──────────────────────────── */}
          <TabsContent value="enderecos">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Endereços
                  </CardTitle>
                  <CardDescription>Locais de operação do negócio</CardDescription>
                </div>
                <Button onClick={openNewEndereco} className="shadow-md shadow-primary/20">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Endereço
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enderecos.map((end) => (
                    <div
                      key={end.id}
                      className="relative rounded-xl border border-border bg-card p-5 space-y-3 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-foreground">{end.nome}</span>
                          {end.principal && (
                            <Badge variant="default" className="text-[10px]">Principal</Badge>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditEndereco(end)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => deleteEndereco(end.id)}
                            disabled={end.principal}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {end.logradouro}, {end.numero}
                        {end.complemento && ` — ${end.complemento}`}
                        <br />
                        {end.bairro} · {end.cidade}/{end.estado}
                        <br />
                        CEP {end.cep}
                      </p>
                    </div>
                  ))}
                </div>

                {enderecos.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <MapPin className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Nenhum endereço cadastrado</p>
                    <p className="text-sm">Adicione o primeiro endereço do seu negócio.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ── Dialog: Endereço ────────────────────────── */}
      <Dialog open={enderecoDialogOpen} onOpenChange={setEnderecoDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingEndereco ? "Editar Endereço" : "Novo Endereço"}</DialogTitle>
            <DialogDescription>Preencha os dados do local de operação</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Nome do Local *</Label>
                <Input
                  value={endForm.nome}
                  onChange={(e) => setEndForm({ ...endForm, nome: e.target.value })}
                  placeholder="Ex: Sede Principal"
                />
              </div>
              <div className="space-y-2">
                <Label>CEP</Label>
                <Input
                  value={endForm.cep}
                  onChange={(e) => setEndForm({ ...endForm, cep: e.target.value })}
                  placeholder="00000-000"
                />
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Input
                  value={endForm.estado}
                  onChange={(e) => setEndForm({ ...endForm, estado: e.target.value })}
                  placeholder="SP"
                  maxLength={2}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Logradouro *</Label>
                <Input
                  value={endForm.logradouro}
                  onChange={(e) => setEndForm({ ...endForm, logradouro: e.target.value })}
                  placeholder="Rua, Avenida..."
                />
              </div>
              <div className="space-y-2">
                <Label>Número</Label>
                <Input
                  value={endForm.numero}
                  onChange={(e) => setEndForm({ ...endForm, numero: e.target.value })}
                  placeholder="123"
                />
              </div>
              <div className="space-y-2">
                <Label>Complemento</Label>
                <Input
                  value={endForm.complemento}
                  onChange={(e) => setEndForm({ ...endForm, complemento: e.target.value })}
                  placeholder="Sala, Bloco..."
                />
              </div>
              <div className="space-y-2">
                <Label>Bairro</Label>
                <Input
                  value={endForm.bairro}
                  onChange={(e) => setEndForm({ ...endForm, bairro: e.target.value })}
                  placeholder="Bairro"
                />
              </div>
              <div className="space-y-2">
                <Label>Cidade *</Label>
                <Input
                  value={endForm.cidade}
                  onChange={(e) => setEndForm({ ...endForm, cidade: e.target.value })}
                  placeholder="Cidade"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="principal"
                checked={endForm.principal}
                onChange={(e) => setEndForm({ ...endForm, principal: e.target.checked })}
                className="rounded border-input"
              />
              <Label htmlFor="principal" className="cursor-pointer text-sm">Definir como endereço principal</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEnderecoDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveEndereco}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Configuracoes;
