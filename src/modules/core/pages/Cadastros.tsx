import { useState } from "react";
import {
  Tag,
  Plus,
  Pencil,
  Trash2,
  Save,
  Dumbbell,
  BarChart3,
} from "lucide-react";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

// ── Types ──────────────────────────────────────────────
interface TipoProduto {
  id: string;
  nome: string;
  descricao: string;
  cor: string;
  status: "active" | "inactive";
}

interface Modalidade {
  id: string;
  nome: string;
  descricao: string;
  cor: string;
  icone: string;
  status: "active" | "inactive";
}

interface Nivel {
  id: string;
  nome: string;
  descricao: string;
  cor: string;
  ordem: number;
  status: "active" | "inactive";
}

// ── Mock data ──────────────────────────────────────────
const MOCK_TIPOS_PRODUTO: TipoProduto[] = [
  { id: "1", nome: "Plano", descricao: "Cobrança recorrente mensal com renovação automática de créditos", cor: "primary", status: "active" },
  { id: "2", nome: "Avulso", descricao: "Pagamento único para compra pontual de créditos", cor: "accent", status: "active" },
  { id: "3", nome: "Pacote", descricao: "Conjunto de aulas com desconto progressivo", cor: "success", status: "active" },
  { id: "4", nome: "Cortesia", descricao: "Créditos gratuitos para ações promocionais", cor: "info", status: "inactive" },
];

const MOCK_MODALIDADES: Modalidade[] = [
  { id: "1", nome: "Tênis", descricao: "Aulas e treinos de tênis de quadra", cor: "primary", icone: "🎾", status: "active" },
  { id: "2", nome: "Futevôlei", descricao: "Treinos e campeonatos de futevôlei", cor: "accent", icone: "⚽", status: "active" },
  { id: "3", nome: "Beach Tennis", descricao: "Aulas de beach tennis na quadra de areia", cor: "success", icone: "🏖️", status: "active" },
  { id: "4", nome: "Padel", descricao: "Aulas e locação de quadras de padel", cor: "info", icone: "🏸", status: "active" },
  { id: "5", nome: "Musculação", descricao: "Treinos de musculação e condicionamento", cor: "warning", icone: "🏋️", status: "inactive" },
];

const MOCK_NIVEIS: Nivel[] = [
  { id: "1", nome: "Iniciante", descricao: "Alunos sem experiência prévia na modalidade", cor: "success", ordem: 1, status: "active" },
  { id: "2", nome: "Intermediário", descricao: "Alunos com fundamentos básicos consolidados", cor: "info", ordem: 2, status: "active" },
  { id: "3", nome: "Avançado", descricao: "Alunos com domínio técnico e tático elevado", cor: "warning", ordem: 3, status: "active" },
  { id: "4", nome: "Competitivo", descricao: "Atletas que participam de torneios e competições", cor: "destructive", ordem: 4, status: "active" },
];

const ICONES_DISPONIVEIS = ["🎾", "⚽", "🏖️", "🏸", "🏋️", "🏊", "🥊", "🧘", "🚴", "🏃", "⛳", "🏀", "🏐", "🤸"];

const CORES_DISPONIVEIS = [
  { value: "primary", label: "Azul", class: "bg-primary" },
  { value: "accent", label: "Amarelo", class: "bg-accent" },
  { value: "success", label: "Verde", class: "bg-success" },
  { value: "info", label: "Azul Claro", class: "bg-info" },
  { value: "warning", label: "Laranja", class: "bg-warning" },
  { value: "destructive", label: "Vermelho", class: "bg-destructive" },
];

// ── Component ──────────────────────────────────────────
const Cadastros = () => {
  const [tiposProduto, setTiposProduto] = useState<TipoProduto[]>(MOCK_TIPOS_PRODUTO);
  const [modalidades, setModalidades] = useState<Modalidade[]>(MOCK_MODALIDADES);
  const [niveis, setNiveis] = useState<Nivel[]>(MOCK_NIVEIS);

  const [tipoDialogOpen, setTipoDialogOpen] = useState(false);
  const [editingTipo, setEditingTipo] = useState<TipoProduto | null>(null);
  const [modalidadeDialogOpen, setModalidadeDialogOpen] = useState(false);
  const [editingModalidade, setEditingModalidade] = useState<Modalidade | null>(null);
  const [nivelDialogOpen, setNivelDialogOpen] = useState(false);
  const [editingNivel, setEditingNivel] = useState<Nivel | null>(null);

  const [tipoForm, setTipoForm] = useState<Omit<TipoProduto, "id">>({
    nome: "", descricao: "", cor: "primary", status: "active",
  });

  const [modForm, setModForm] = useState<Omit<Modalidade, "id">>({
    nome: "", descricao: "", cor: "primary", icone: "🎾", status: "active",
  });

  const [nivelForm, setNivelForm] = useState<Omit<Nivel, "id">>({
    nome: "", descricao: "", cor: "primary", ordem: 1, status: "active",
  });

  // ── Tipo produto handlers ──
  const openNewTipo = () => {
    setEditingTipo(null);
    setTipoForm({ nome: "", descricao: "", cor: "primary", status: "active" });
    setTipoDialogOpen(true);
  };

  const openEditTipo = (t: TipoProduto) => {
    setEditingTipo(t);
    setTipoForm({ nome: t.nome, descricao: t.descricao, cor: t.cor, status: t.status });
    setTipoDialogOpen(true);
  };

  const saveTipo = () => {
    if (!tipoForm.nome) {
      toast({ title: "Informe o nome do tipo", variant: "destructive" });
      return;
    }
    if (editingTipo) {
      setTiposProduto((prev) => prev.map((t) => (t.id === editingTipo.id ? { ...t, ...tipoForm } : t)));
      toast({ title: "Tipo atualizado" });
    } else {
      setTiposProduto((prev) => [...prev, { ...tipoForm, id: Date.now().toString() }]);
      toast({ title: "Tipo adicionado" });
    }
    setTipoDialogOpen(false);
  };

  const deleteTipo = (id: string) => {
    setTiposProduto((prev) => prev.filter((t) => t.id !== id));
    toast({ title: "Tipo removido" });
  };

  const toggleTipoStatus = (id: string) => {
    setTiposProduto((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === "active" ? "inactive" : "active" } : t))
    );
  };

  // ── Modalidade handlers ──
  const openNewModalidade = () => {
    setEditingModalidade(null);
    setModForm({ nome: "", descricao: "", cor: "primary", icone: "🎾", status: "active" });
    setModalidadeDialogOpen(true);
  };

  const openEditModalidade = (m: Modalidade) => {
    setEditingModalidade(m);
    setModForm({ nome: m.nome, descricao: m.descricao, cor: m.cor, icone: m.icone, status: m.status });
    setModalidadeDialogOpen(true);
  };

  const saveModalidade = () => {
    if (!modForm.nome) {
      toast({ title: "Informe o nome da modalidade", variant: "destructive" });
      return;
    }
    if (editingModalidade) {
      setModalidades((prev) => prev.map((m) => (m.id === editingModalidade.id ? { ...m, ...modForm } : m)));
      toast({ title: "Modalidade atualizada" });
    } else {
      setModalidades((prev) => [...prev, { ...modForm, id: Date.now().toString() }]);
      toast({ title: "Modalidade adicionada" });
    }
    setModalidadeDialogOpen(false);
  };

  const deleteModalidade = (id: string) => {
    setModalidades((prev) => prev.filter((m) => m.id !== id));
    toast({ title: "Modalidade removida" });
  };

  const toggleModalidadeStatus = (id: string) => {
    setModalidades((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: m.status === "active" ? "inactive" : "active" } : m))
    );
  };

  // ── Nivel handlers ──
  const openNewNivel = () => {
    setEditingNivel(null);
    setNivelForm({ nome: "", descricao: "", cor: "primary", ordem: niveis.length + 1, status: "active" });
    setNivelDialogOpen(true);
  };

  const openEditNivel = (n: Nivel) => {
    setEditingNivel(n);
    setNivelForm({ nome: n.nome, descricao: n.descricao, cor: n.cor, ordem: n.ordem, status: n.status });
    setNivelDialogOpen(true);
  };

  const saveNivel = () => {
    if (!nivelForm.nome) {
      toast({ title: "Informe o nome do nível", variant: "destructive" });
      return;
    }
    if (editingNivel) {
      setNiveis((prev) => prev.map((n) => (n.id === editingNivel.id ? { ...n, ...nivelForm } : n)));
      toast({ title: "Nível atualizado" });
    } else {
      setNiveis((prev) => [...prev, { ...nivelForm, id: Date.now().toString() }]);
      toast({ title: "Nível adicionado" });
    }
    setNivelDialogOpen(false);
  };

  const deleteNivel = (id: string) => {
    setNiveis((prev) => prev.filter((n) => n.id !== id));
    toast({ title: "Nível removido" });
  };

  const toggleNivelStatus = (id: string) => {
    setNiveis((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: n.status === "active" ? "inactive" : "active" } : n))
    );
  };

  return (
    <DashboardLayout>
      <header className="sticky top-0 z-40 bg-background/60 backdrop-blur-xl border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">Cadastros</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Parametrize modalidades, níveis e tipos de produto do sistema</p>
          </div>
        </div>
      </header>

      <div className="px-6 lg:px-8 py-6">
        <Tabs defaultValue="modalidades" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="modalidades" className="gap-2">
              <Dumbbell className="h-4 w-4" />
              Modalidades
            </TabsTrigger>
            <TabsTrigger value="niveis" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Níveis
            </TabsTrigger>
            <TabsTrigger value="tipos" className="gap-2">
              <Tag className="h-4 w-4" />
              Tipos de Produto
            </TabsTrigger>
          </TabsList>

          {/* ── TAB: Modalidades ────────────────────────── */}
          <TabsContent value="modalidades">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-primary" />
                    Modalidades Esportivas
                  </CardTitle>
                  <CardDescription>Esportes e atividades oferecidos pelo seu negócio</CardDescription>
                </div>
                <Button onClick={openNewModalidade} className="shadow-md shadow-primary/20">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Modalidade
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {modalidades.map((mod) => (
                    <div
                      key={mod.id}
                      className={`relative rounded-xl border border-border bg-card p-5 space-y-3 hover:shadow-md transition-all ${
                        mod.status === "inactive" ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{mod.icone}</span>
                          <div>
                            <span className="font-semibold text-foreground">{mod.nome}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <div className={`h-2.5 w-2.5 rounded-full bg-${mod.cor}`} />
                              <Badge
                                variant={mod.status === "active" ? "default" : "secondary"}
                                className="text-[10px] cursor-pointer"
                                onClick={() => toggleModalidadeStatus(mod.id)}
                              >
                                {mod.status === "active" ? "Ativa" : "Inativa"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditModalidade(mod)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => deleteModalidade(mod.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{mod.descricao}</p>
                    </div>
                  ))}
                </div>

                {modalidades.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Dumbbell className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Nenhuma modalidade cadastrada</p>
                    <p className="text-sm">Adicione os esportes e atividades que a empresa oferece.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB: Níveis ───────────────────────────── */}
          <TabsContent value="niveis">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Níveis
                  </CardTitle>
                  <CardDescription>Níveis de habilidade para classificação dos alunos</CardDescription>
                </div>
                <Button onClick={openNewNivel} className="shadow-md shadow-primary/20">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Nível
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ordem</TableHead>
                      <TableHead>Cor</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead className="hidden sm:table-cell">Descrição</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {niveis
                      .sort((a, b) => a.ordem - b.ordem)
                      .map((nivel) => (
                        <TableRow key={nivel.id}>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">{nivel.ordem}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className={`h-4 w-4 rounded-full bg-${nivel.cor}`} />
                          </TableCell>
                          <TableCell className="font-medium">{nivel.nome}</TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground text-sm max-w-xs truncate">
                            {nivel.descricao}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={nivel.status === "active" ? "default" : "secondary"}
                              className="cursor-pointer"
                              onClick={() => toggleNivelStatus(nivel.id)}
                            >
                              {nivel.status === "active" ? "Ativo" : "Inativo"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditNivel(nivel)}>
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => deleteNivel(nivel.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    {niveis.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Nenhum nível cadastrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB: Tipos de Produto ──────────────────── */}
          <TabsContent value="tipos">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-primary" />
                    Tipos de Produto
                  </CardTitle>
                  <CardDescription>Categorias disponíveis ao cadastrar um produto</CardDescription>
                </div>
                <Button onClick={openNewTipo} className="shadow-md shadow-primary/20">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Tipo
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cor</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead className="hidden sm:table-cell">Descrição</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tiposProduto.map((tipo) => (
                      <TableRow key={tipo.id}>
                        <TableCell>
                          <div className={`h-4 w-4 rounded-full bg-${tipo.cor}`} />
                        </TableCell>
                        <TableCell className="font-medium">{tipo.nome}</TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground text-sm max-w-xs truncate">
                          {tipo.descricao}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={tipo.status === "active" ? "default" : "secondary"}
                            className="cursor-pointer"
                            onClick={() => toggleTipoStatus(tipo.id)}
                          >
                            {tipo.status === "active" ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditTipo(tipo)}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => deleteTipo(tipo.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {tiposProduto.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Nenhum tipo cadastrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ── Dialog: Tipo de Produto ─────────────────── */}
      <Dialog open={tipoDialogOpen} onOpenChange={setTipoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingTipo ? "Editar Tipo" : "Novo Tipo de Produto"}</DialogTitle>
            <DialogDescription>Defina uma categoria para os produtos</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input
                value={tipoForm.nome}
                onChange={(e) => setTipoForm({ ...tipoForm, nome: e.target.value })}
                placeholder="Ex: Plano, Avulso, Pacote"
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={tipoForm.descricao}
                onChange={(e) => setTipoForm({ ...tipoForm, descricao: e.target.value })}
                placeholder="Breve descrição do tipo..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Cor</Label>
              <div className="flex gap-2 flex-wrap">
                {CORES_DISPONIVEIS.map((cor) => (
                  <button
                    key={cor.value}
                    type="button"
                    onClick={() => setTipoForm({ ...tipoForm, cor: cor.value })}
                    className={`h-8 w-8 rounded-full ${cor.class} ring-offset-2 ring-offset-background transition-all ${
                      tipoForm.cor === cor.value ? "ring-2 ring-ring scale-110" : "opacity-60 hover:opacity-100"
                    }`}
                    title={cor.label}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={tipoForm.status}
                onValueChange={(v) => setTipoForm({ ...tipoForm, status: v as "active" | "inactive" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTipoDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveTipo}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Dialog: Nível ──────────────────────────── */}
      <Dialog open={nivelDialogOpen} onOpenChange={setNivelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingNivel ? "Editar Nível" : "Novo Nível"}</DialogTitle>
            <DialogDescription>Defina um nível de habilidade para os alunos</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input
                value={nivelForm.nome}
                onChange={(e) => setNivelForm({ ...nivelForm, nome: e.target.value })}
                placeholder="Ex: Iniciante, Intermediário, Avançado"
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={nivelForm.descricao}
                onChange={(e) => setNivelForm({ ...nivelForm, descricao: e.target.value })}
                placeholder="Breve descrição do nível..."
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ordem</Label>
                <Input
                  type="number"
                  min={1}
                  value={nivelForm.ordem}
                  onChange={(e) => setNivelForm({ ...nivelForm, ordem: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={nivelForm.status}
                  onValueChange={(v) => setNivelForm({ ...nivelForm, status: v as "active" | "inactive" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cor</Label>
              <div className="flex gap-2 flex-wrap">
                {CORES_DISPONIVEIS.map((cor) => (
                  <button
                    key={cor.value}
                    type="button"
                    onClick={() => setNivelForm({ ...nivelForm, cor: cor.value })}
                    className={`h-8 w-8 rounded-full ${cor.class} ring-offset-2 ring-offset-background transition-all ${
                      nivelForm.cor === cor.value ? "ring-2 ring-ring scale-110" : "opacity-60 hover:opacity-100"
                    }`}
                    title={cor.label}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNivelDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveNivel}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Dialog: Modalidade ──────────────────────── */}
      <Dialog open={modalidadeDialogOpen} onOpenChange={setModalidadeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingModalidade ? "Editar Modalidade" : "Nova Modalidade"}</DialogTitle>
            <DialogDescription>Defina um esporte ou atividade oferecida</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input
                value={modForm.nome}
                onChange={(e) => setModForm({ ...modForm, nome: e.target.value })}
                placeholder="Ex: Tênis, Beach Tennis, Padel"
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={modForm.descricao}
                onChange={(e) => setModForm({ ...modForm, descricao: e.target.value })}
                placeholder="Breve descrição da modalidade..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Ícone</Label>
              <div className="flex gap-2 flex-wrap">
                {ICONES_DISPONIVEIS.map((icone) => (
                  <button
                    key={icone}
                    type="button"
                    onClick={() => setModForm({ ...modForm, icone })}
                    className={`h-10 w-10 rounded-lg border text-xl flex items-center justify-center transition-all ${
                      modForm.icone === icone
                        ? "border-primary bg-primary/10 ring-2 ring-ring scale-110"
                        : "border-border hover:border-primary/50 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {icone}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cor</Label>
              <div className="flex gap-2 flex-wrap">
                {CORES_DISPONIVEIS.map((cor) => (
                  <button
                    key={cor.value}
                    type="button"
                    onClick={() => setModForm({ ...modForm, cor: cor.value })}
                    className={`h-8 w-8 rounded-full ${cor.class} ring-offset-2 ring-offset-background transition-all ${
                      modForm.cor === cor.value ? "ring-2 ring-ring scale-110" : "opacity-60 hover:opacity-100"
                    }`}
                    title={cor.label}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={modForm.status}
                onValueChange={(v) => setModForm({ ...modForm, status: v as "active" | "inactive" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativa</SelectItem>
                  <SelectItem value="inactive">Inativa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalidadeDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveModalidade}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Cadastros;
