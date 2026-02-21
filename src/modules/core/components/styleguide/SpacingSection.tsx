import SectionHeader from "./SectionHeader";

const spacings = [
  { name: "1", px: "4px" },
  { name: "2", px: "8px" },
  { name: "3", px: "12px" },
  { name: "4", px: "16px" },
  { name: "6", px: "24px" },
  { name: "8", px: "32px" },
  { name: "12", px: "48px" },
  { name: "16", px: "64px" },
];

const SpacingSection = () => (
  <section>
    <SectionHeader title="Espaçamento" description="Escala de espaçamento baseada em múltiplos de 4px." />
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="space-y-3">
        {spacings.map((s) => (
          <div key={s.name} className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-mono w-16 text-right">{s.px}</span>
            <div className="bg-primary/20 rounded-sm" style={{ width: s.px, height: "24px" }}>
              <div className="bg-primary h-full rounded-sm" style={{ width: s.px }} />
            </div>
            <span className="text-xs text-muted-foreground font-mono">space-{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SpacingSection;
