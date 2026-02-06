import SectionHeader from "./SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus, Download, Trash2, ArrowRight, Loader2 } from "lucide-react";

const ButtonsSection = () => (
  <section>
    <SectionHeader title="Botões" description="Variantes, tamanhos e estados dos botões." />
    <div className="bg-card rounded-xl border border-border p-6 space-y-8">
      {/* Variants */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Variantes</h3>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Tamanhos</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Plus className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* With icons */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Com Ícones</h3>
        <div className="flex flex-wrap gap-3">
          <Button><Plus className="h-4 w-4 mr-2" />Adicionar</Button>
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Exportar</Button>
          <Button variant="destructive"><Trash2 className="h-4 w-4 mr-2" />Remover</Button>
          <Button variant="ghost">Próximo<ArrowRight className="h-4 w-4 ml-2" /></Button>
        </div>
      </div>

      {/* States */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Estados</h3>
        <div className="flex flex-wrap gap-3">
          <Button disabled>Desabilitado</Button>
          <Button disabled><Loader2 className="h-4 w-4 mr-2 animate-spin" />Carregando</Button>
        </div>
      </div>
    </div>
  </section>
);

export default ButtonsSection;
