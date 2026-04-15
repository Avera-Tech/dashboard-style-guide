import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import type { ProductCreateDTO, ProductType } from "@/modules/core/types/product";
import { getProductTypesDropdown } from "@/modules/core/api/productTypes";
import ProductsCollection from "@/modules/core/api/products";

const EMPTY_FORM: ProductCreateDTO = {
  productTypeId: 0,
  name: "",
  description: "",
  credits: 1,
  value: 0,
  validityDays: 30,
  recurring: false,
};

const ProdutoFormDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}) => {
  const repository = new ProductsCollection();
  const [form, setForm] = useState<ProductCreateDTO>(EMPTY_FORM);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductTypesDropdown().then(setProductTypes).catch(() => {});
  }, []);

  useEffect(() => {
    if (!open) setForm(EMPTY_FORM);
  }, [open]);

  const set = (field: keyof ProductCreateDTO, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.productTypeId || !form.name || form.value <= 0 || form.credits < 1) {
      toast({ title: "Preencha todos os campos obrigatórios.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await repository.create(form as any);
      toast({ title: "Produto cadastrado com sucesso!" });
      onOpenChange(false);
      onSuccess?.();
    } catch {
      toast({ title: "Erro ao cadastrar produto.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Produto</DialogTitle>
          <DialogDescription>Preencha os dados do novo produto ou pacote.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="produto-name">Nome do Produto *</Label>
              <Input
                id="produto-name"
                placeholder="Ex: Pacote Mensal Tennis"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="produto-description">Descrição</Label>
              <Textarea
                id="produto-description"
                placeholder="Ex: 10 aulas de musculação com validade de 30 dias"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Tipo de Produto *</Label>
              <Select
                value={form.productTypeId ? String(form.productTypeId) : ""}
                onValueChange={(v) => set("productTypeId", Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((pt) => (
                    <SelectItem key={pt.id} value={String(pt.id)}>
                      {pt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="produto-credits">Créditos (aulas) *</Label>
              <Input
                id="produto-credits"
                type="number"
                min={1}
                value={form.credits}
                onChange={(e) => set("credits", Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="produto-value">Valor (R$) *</Label>
              <Input
                id="produto-value"
                type="number"
                min={0}
                step={0.01}
                placeholder="0,00"
                value={form.value || ""}
                onChange={(e) => set("value", Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="produto-validity">Validade (dias) *</Label>
              <Input
                id="produto-validity"
                type="number"
                min={1}
                value={form.validityDays}
                onChange={(e) => set("validityDays", Number(e.target.value))}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Recorrente</Label>
              <p className="text-xs text-muted-foreground">
                Ativar para planos com renovação automática
              </p>
            </div>
            <Switch
              checked={form.recurring}
              onCheckedChange={(v) => set("recurring", v)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProdutoFormDialog;
