import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { ImagePlus, Pencil, Trash2, Plus, Megaphone } from "lucide-react";

interface Anuncio {
  id: string;
  imageUrl: string;
  titulo: string;
  descricao: string;
}

const MAX_ANUNCIOS = 4;

const Anuncios = () => {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      titulo: "Promoção de Verão",
      descricao: "Matricule-se agora e ganhe 30% de desconto nos primeiros 3 meses. Válido até o final de março!",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAnuncio, setEditingAnuncio] = useState<Anuncio | null>(null);
  const [form, setForm] = useState({ titulo: "", descricao: "", imageUrl: "" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openNew = () => {
    setEditingAnuncio(null);
    setForm({ titulo: "", descricao: "", imageUrl: "" });
    setDialogOpen(true);
  };

  const openEdit = (anuncio: Anuncio) => {
    setEditingAnuncio(anuncio);
    setForm({ titulo: anuncio.titulo, descricao: anuncio.descricao, imageUrl: anuncio.imageUrl });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.titulo.trim()) return;
    if (editingAnuncio) {
      setAnuncios((prev) =>
        prev.map((a) => (a.id === editingAnuncio.id ? { ...a, ...form } : a))
      );
    } else {
      setAnuncios((prev) => [
        ...prev,
        { id: Date.now().toString(), ...form },
      ]);
    }
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

  const emptySlots = MAX_ANUNCIOS - anuncios.length;

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Anúncios</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie seus anúncios promocionais ({anuncios.length}/{MAX_ANUNCIOS} espaços utilizados)
            </p>
          </div>
          {anuncios.length < MAX_ANUNCIOS && (
            <Button onClick={openNew}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Anúncio
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {anuncios.map((anuncio) => (
            <Card key={anuncio.id} className="overflow-hidden group">
              <div className="relative aspect-[3/2] bg-muted">
                {anuncio.imageUrl ? (
                  <img
                    src={anuncio.imageUrl}
                    alt={anuncio.titulo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImagePlus className="h-12 w-12 text-muted-foreground/40" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8 shadow-md" onClick={() => openEdit(anuncio)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8 shadow-md" onClick={() => confirmDelete(anuncio.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-5 space-y-2">
                <h3 className="font-semibold text-foreground text-lg leading-tight">{anuncio.titulo}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{anuncio.descricao}</p>
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

      {/* Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingAnuncio ? "Editar Anúncio" : "Novo Anúncio"}</DialogTitle>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={!form.titulo.trim()}>
              {editingAnuncio ? "Salvar" : "Criar Anúncio"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir Anúncio</DialogTitle>
            <DialogDescription>Tem certeza que deseja excluir este anúncio? Esta ação não pode ser desfeita.</DialogDescription>
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
