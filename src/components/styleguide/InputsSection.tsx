import SectionHeader from "./SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Mail, Eye } from "lucide-react";

const InputsSection = () => (
  <section>
    <SectionHeader title="Inputs" description="Campos de entrada, áreas de texto e estados." />
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Default */}
        <div className="space-y-2">
          <Label htmlFor="default">Label padrão</Label>
          <Input id="default" placeholder="Placeholder..." />
          <p className="text-xs text-muted-foreground">Texto de ajuda opcional</p>
        </div>

        {/* Disabled */}
        <div className="space-y-2">
          <Label htmlFor="disabled">Desabilitado</Label>
          <Input id="disabled" placeholder="Campo desabilitado" disabled />
        </div>

        {/* With icon */}
        <div className="space-y-2">
          <Label htmlFor="search">Com ícone</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="search" placeholder="Buscar..." className="pl-10" />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="email@exemplo.com" className="pl-10" />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input id="password" type="password" placeholder="••••••••" />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" />
          </div>
        </div>

        {/* Error state */}
        <div className="space-y-2">
          <Label htmlFor="error" className="text-destructive">Com erro</Label>
          <Input id="error" placeholder="Campo obrigatório" className="border-destructive focus-visible:ring-destructive" />
          <p className="text-xs text-destructive">Este campo é obrigatório</p>
        </div>
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <Label htmlFor="textarea">Textarea</Label>
        <Textarea id="textarea" placeholder="Escreva sua mensagem..." rows={3} />
      </div>
    </div>
  </section>
);

export default InputsSection;
