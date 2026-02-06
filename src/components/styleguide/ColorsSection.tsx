import SectionHeader from "./SectionHeader";

const colorGroups = [
  {
    label: "Primárias",
    colors: [
      { name: "Primary", var: "primary", fg: "primary-foreground" },
      { name: "Accent", var: "accent", fg: "accent-foreground" },
    ],
  },
  {
    label: "Superfícies",
    colors: [
      { name: "Background", var: "background", fg: "foreground" },
      { name: "Card", var: "card", fg: "card-foreground" },
      { name: "Muted", var: "muted", fg: "muted-foreground" },
      { name: "Secondary", var: "secondary", fg: "secondary-foreground" },
    ],
  },
  {
    label: "Semânticas",
    colors: [
      { name: "Success", var: "success", fg: "success-foreground" },
      { name: "Warning", var: "warning", fg: "warning-foreground" },
      { name: "Destructive", var: "destructive", fg: "destructive-foreground" },
      { name: "Info", var: "info", fg: "info-foreground" },
    ],
  },
  {
    label: "Utilitárias",
    colors: [
      { name: "Border", var: "border", fg: "foreground" },
      { name: "Input", var: "input", fg: "foreground" },
      { name: "Ring", var: "ring", fg: "primary-foreground" },
    ],
  },
];

const ColorsSection = () => (
  <section>
    <SectionHeader title="Cores" description="Paleta de cores semânticas do design system. Todas definidas em HSL via CSS variables." />
    <div className="space-y-8">
      {colorGroups.map((group) => (
        <div key={group.label}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{group.label}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {group.colors.map((c) => (
              <div key={c.name} className="rounded-lg overflow-hidden border border-border bg-card">
                <div
                  className="h-20 flex items-end p-3"
                  style={{ backgroundColor: `hsl(var(--${c.var}))` }}
                >
                  <span
                    className="text-xs font-medium"
                    style={{ color: `hsl(var(--${c.fg}))` }}
                  >
                    Aa
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-card-foreground">{c.name}</p>
                  <code className="text-xs text-muted-foreground font-mono">--{c.var}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ColorsSection;
