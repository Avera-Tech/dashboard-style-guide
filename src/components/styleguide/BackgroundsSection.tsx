import SectionHeader from "./SectionHeader";

const BackgroundsSection = () => (
  <section>
    <SectionHeader title="Backgrounds & Superfícies" description="Padrões de fundo, cards e elevação." />
    <div className="space-y-6">
      {/* Surface levels */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Níveis de superfície</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl p-6 bg-background border border-border">
            <p className="text-sm font-semibold text-foreground">Background</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">bg-background</p>
            <p className="text-xs text-muted-foreground mt-0.5">Nível base da página</p>
          </div>
          <div className="rounded-xl p-6 bg-card border border-border shadow-sm">
            <p className="text-sm font-semibold text-card-foreground">Card</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">bg-card + shadow-sm</p>
            <p className="text-xs text-muted-foreground mt-0.5">Cards e painéis elevados</p>
          </div>
          <div className="rounded-xl p-6 bg-card border border-border shadow-md">
            <p className="text-sm font-semibold text-card-foreground">Card Elevado</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">bg-card + shadow-md</p>
            <p className="text-xs text-muted-foreground mt-0.5">Modais e popovers</p>
          </div>
        </div>
      </div>

      {/* Muted patterns */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Superfícies muted</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-6 bg-muted">
            <p className="text-sm font-semibold text-foreground">Muted</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">bg-muted</p>
            <p className="text-xs text-muted-foreground mt-0.5">Áreas de destaque suave, badges, tags</p>
          </div>
          <div className="rounded-xl p-6 bg-secondary">
            <p className="text-sm font-semibold text-secondary-foreground">Secondary</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">bg-secondary</p>
            <p className="text-xs text-muted-foreground mt-0.5">Botões secundários, hovers</p>
          </div>
        </div>
      </div>

      {/* Gradient patterns */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Gradientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-6 bg-gradient-to-br from-primary to-primary/70">
            <p className="text-sm font-semibold text-primary-foreground">Primary Gradient</p>
            <p className="text-xs text-primary-foreground/70 mt-1 font-mono">from-primary to-primary/70</p>
          </div>
          <div className="rounded-xl p-6 bg-gradient-to-br from-primary via-accent to-accent">
            <p className="text-sm font-semibold text-primary-foreground">Brand Gradient</p>
            <p className="text-xs text-primary-foreground/70 mt-1 font-mono">from-primary via-accent to-accent</p>
          </div>
        </div>
      </div>

      {/* Border radius */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Border Radius</h3>
        <div className="flex flex-wrap gap-4">
          {[
            { name: "sm", className: "rounded-sm" },
            { name: "md", className: "rounded-md" },
            { name: "lg", className: "rounded-lg" },
            { name: "xl", className: "rounded-xl" },
            { name: "full", className: "rounded-full" },
          ].map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 bg-primary ${r.className}`} />
              <span className="text-xs text-muted-foreground font-mono">{r.className}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BackgroundsSection;
