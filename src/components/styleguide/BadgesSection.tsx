import SectionHeader from "./SectionHeader";

const badges = [
  { label: "Default", className: "bg-primary text-primary-foreground" },
  { label: "Secondary", className: "bg-secondary text-secondary-foreground" },
  { label: "Sucesso", className: "bg-success/10 text-success border border-success/30" },
  { label: "Atenção", className: "bg-warning/10 text-warning border border-warning/30" },
  { label: "Erro", className: "bg-destructive/10 text-destructive border border-destructive/30" },
  { label: "Info", className: "bg-info/10 text-info border border-info/30" },
  { label: "Accent", className: "bg-accent text-accent-foreground" },
  { label: "Muted", className: "bg-muted text-muted-foreground" },
];

const BadgesSection = () => (
  <section>
    <SectionHeader title="Badges & Tags" description="Indicadores visuais de status e categorização." />
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Badges</h3>
        <div className="flex flex-wrap gap-3">
          {badges.map((b) => (
            <span key={b.label} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${b.className}`}>
              {b.label}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Status Dots</h3>
        <div className="flex flex-wrap gap-6">
          {[
            { label: "Online", color: "bg-success" },
            { label: "Away", color: "bg-warning" },
            { label: "Offline", color: "bg-muted-foreground" },
            { label: "Error", color: "bg-destructive" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${s.color}`} />
              <span className="text-sm text-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BadgesSection;
