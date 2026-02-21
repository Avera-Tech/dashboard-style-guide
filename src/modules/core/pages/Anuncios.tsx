import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import DashboardLayout from "@/modules/core/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { ImagePlus, Plus, CalendarIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Anuncio {
  id: string;
  imageUrl: string;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
}

const MAX_ANUNCIOS = 3;

// Anúncio patrocinado fixo — vem de fora, admin não controla
const ANUNCIO_PATROCINADO: Anuncio = {
  id: "patrocinado",
  imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
  titulo: "Corrida de Rua 10K — Inscreva-se!",
  descricao: "Participe da maior corrida de rua da cidade! Garanta já o seu kit com camiseta exclusiva e medalha de participação. Vagas limitadas.",
  dataInicio: new Date(2026, 2, 1),
  dataFim: new Date(2026, 4, 30),
};

const Anuncios = () => {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=400&fit=crop",
      titulo: "Raquetes Pro Staff — 20% OFF",
      descricao: "Aproveite a promoção exclusiva em raquetes profissionais. Modelos Wilson, Babolat e Head com desconto imperdível!",
      dataInicio: new Date(2026, 1, 1),
      dataFim: new Date(2026, 2, 31),
    },
    {
      id: "2",
      imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=400&fit=crop",
      titulo: "Loja Tennis Center — Novidades",
      descricao: "Confira os lançamentos em calçados esportivos e acessórios na nossa loja parceira.",
      dataInicio: new Date(2026, 1, 15),
      dataFim: new Date(2026, 3, 15),
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ titulo: "", descricao: "", imageUrl: "" });
  const [dataInicio, setDataInicio] = useState<Date>();
  const [dataFim, setDataFim] = useState<Date>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openNew = () => {
    setForm({ titulo: "", descricao: "", imageUrl: "" });
    setDataInicio(undefined);
    setDataFim(undefined);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.titulo.trim() || !dataInicio || !dataFim) return;
    setAnuncios((prev) => [
      ...prev,
      { id: Date.now().toString(), ...form, dataInicio, dataFim },
    ]);
    setDialogOpen(false);
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (deletingId) {
      setAnuncios((prev) => prev.filter((a) => a.id !== deletingId));
    }
    setDeleteDialogOpen(false);
    setDeletingId(null);
  };

  const isActive = (a: Anuncio) => {
    const now = new Date();
    return now >= a.dataInicio && now <= a.dataFim;
  };

  const emptySlots = MAX_ANUNCIOS - anuncios.length;

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Anúncios</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie seus anúncios promocionais ({anuncios.length}/{MAX_ANUNCIOS} espaços utilizados + 1 patrocinado)
            </p>
          </div>
          {anuncios.length < MAX_ANUNCIOS && (
            <Button onClick={openNew}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Anúncio
            </Button>
          )}
        </div>

        {/* Featured (first) */}
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto bg-muted">
              <img src={ANUNCIO_PATROCINADO.imageUrl} alt={ANUNCIO_PATROCINADO.titulo} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-6 md:p-8 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={isActive(ANUNCIO_PATROCINADO) ? "default" : "secondary"}>
                  {isActive(ANUNCIO_PATROCINADO) ? "Ativo" : "Inativo"}
                </Badge>
                <Badge variant="outline">Destaque</Badge>
                <Badge className="bg-amber-500/15 text-amber-600 border-amber-500/30 hover:bg-amber-500/20">Patrocinado</Badge>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{ANUNCIO_PATROCINADO.titulo}</h2>
              <p className="text-muted-foreground leading-relaxed">{ANUNCIO_PATROCINADO.descricao}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarIcon className="h-3.5 w-3.5" />
                {format(ANUNCIO_PATROCINADO.dataInicio, "dd/MM/yyyy")} — {format(ANUNCIO_PATROCINADO.dataFim, "dd/MM/yyyy")}
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Remaining cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {anuncios.map((anuncio) => (
            <Card key={anuncio.id} className="overflow-hidden">
              <div className="relative aspect-[3/2] bg-muted">
                {anuncio.imageUrl ? (
                  <img src={anuncio.imageUrl} alt={anuncio.titulo} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImagePlus className="h-12 w-12 text-muted-foreground/40" />
                  </div>
                )}
              </div>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant={isActive(anuncio) ? "default" : "secondary"}>
                    {isActive(anuncio) ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground text-lg leading-tight">{anuncio.titulo}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{anuncio.descricao}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarIcon className="h-3 w-3" />
                  {format(anuncio.dataInicio, "dd/MM/yyyy")} — {format(anuncio.dataFim, "dd/MM/yyyy")}
                </div>
                <Button variant="destructive" size="sm" onClick={() => confirmDelete(anuncio.id)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Remover
                </Button>
              </CardContent>
            </Card>
          ))}

          {Array.from({ length: emptySlots }).map((_, i) => (
            <Card
              key={`empty-${i}`}
              className="overflow-hidden border-dashed cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
              onClick={openNew}
            >
              <div className="aspect-[3/2] flex flex-col items-center justify-center gap-3 text-muted-foreground/50">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                  <Plus className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">Adicionar anúncio</span>
              </div>
              <CardContent className="p-5 space-y-2">
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted/60" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* New Anuncio Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Novo Anúncio</DialogTitle>
            <DialogDescription>Preencha as informações do anúncio.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>URL da Imagem</Label>
              <Input
                placeholder="https://exemplo.com/imagem.jpg"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
              {form.imageUrl && (
                <div className="aspect-[3/2] rounded-lg overflow-hidden bg-muted">
                  <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                placeholder="Título do anúncio"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                placeholder="Descrição do anúncio..."
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data de Início</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dataInicio && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataInicio ? format(dataInicio, "dd/MM/yyyy") : "Selecionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dataInicio} onSelect={setDataInicio} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Data de Fim</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dataFim && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataFim ? format(dataFim, "dd/MM/yyyy") : "Selecionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dataFim} onSelect={setDataFim} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={!form.titulo.trim() || !dataInicio || !dataFim}>Criar Anúncio</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir Anúncio</DialogTitle>
            <DialogDescription>Tem certeza que deseja excluir este anúncio?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Anuncios;
