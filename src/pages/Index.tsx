import ColorsSection from "@/components/styleguide/ColorsSection";
import TypographySection from "@/components/styleguide/TypographySection";
import ButtonsSection from "@/components/styleguide/ButtonsSection";
import InputsSection from "@/components/styleguide/InputsSection";
import SelectorsSection from "@/components/styleguide/SelectorsSection";
import AlertsSection from "@/components/styleguide/AlertsSection";
import IconsSection from "@/components/styleguide/IconsSection";
import BackgroundsSection from "@/components/styleguide/BackgroundsSection";
import BadgesSection from "@/components/styleguide/BadgesSection";
import SpacingSection from "@/components/styleguide/SpacingSection";
import { Palette } from "lucide-react";

const sections = [
  { id: "cores", label: "Cores" },
  { id: "tipografia", label: "Tipografia" },
  { id: "botoes", label: "Botões" },
  { id: "inputs", label: "Inputs" },
  { id: "seletores", label: "Seletores" },
  { id: "alertas", label: "Alertas" },
  { id: "badges", label: "Badges" },
  { id: "icones", label: "Ícones" },
  { id: "backgrounds", label: "Backgrounds" },
  { id: "espacamento", label: "Espaçamento" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Palette className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-none">Design System</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Guia de Estilos — Dashboard</p>
            </div>
          </div>
        </div>
        {/* Nav */}
        <div className="max-w-6xl mx-auto px-6 pb-3">
          <nav className="flex gap-1 overflow-x-auto">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors whitespace-nowrap"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        <div id="cores"><ColorsSection /></div>
        <div id="tipografia"><TypographySection /></div>
        <div id="botoes"><ButtonsSection /></div>
        <div id="inputs"><InputsSection /></div>
        <div id="seletores"><SelectorsSection /></div>
        <div id="alertas"><AlertsSection /></div>
        <div id="badges"><BadgesSection /></div>
        <div id="icones"><IconsSection /></div>
        <div id="backgrounds"><BackgroundsSection /></div>
        <div id="espacamento"><SpacingSection /></div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground">
            Design System v1.0 — Tokens definidos em <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">index.css</code> e <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">tailwind.config.ts</code>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
