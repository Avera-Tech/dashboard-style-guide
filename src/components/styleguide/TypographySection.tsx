import SectionHeader from "./SectionHeader";

const typographyItems = [
  { tag: "h1", className: "text-4xl font-extrabold tracking-tight", label: "Heading 1", desc: "text-4xl / font-extrabold / tracking-tight" },
  { tag: "h2", className: "text-3xl font-bold tracking-tight", label: "Heading 2", desc: "text-3xl / font-bold / tracking-tight" },
  { tag: "h3", className: "text-2xl font-bold", label: "Heading 3", desc: "text-2xl / font-bold" },
  { tag: "h4", className: "text-xl font-semibold", label: "Heading 4", desc: "text-xl / font-semibold" },
  { tag: "h5", className: "text-lg font-semibold", label: "Heading 5", desc: "text-lg / font-semibold" },
  { tag: "p", className: "text-base", label: "Body", desc: "text-base / font-normal" },
  { tag: "p", className: "text-sm text-muted-foreground", label: "Body Small", desc: "text-sm / text-muted-foreground" },
  { tag: "p", className: "text-xs text-muted-foreground", label: "Caption", desc: "text-xs / text-muted-foreground" },
  { tag: "code", className: "text-sm font-mono bg-muted px-2 py-1 rounded-md", label: "Code Inline", desc: "font-mono / bg-muted / rounded" },
];

const TypographySection = () => (
  <section>
    <SectionHeader title="Tipografia" description="Hierarquia tipográfica usando Inter (sans) e JetBrains Mono (mono)." />
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      {typographyItems.map((item) => {
        const Tag = item.tag as keyof JSX.IntrinsicElements;
        return (
          <div key={item.label} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
            <div className="sm:w-32 shrink-0">
              <span className="text-xs font-mono text-muted-foreground">{item.label}</span>
            </div>
            <div className="flex-1">
              <Tag className={`text-foreground ${item.className}`}>
                O rato roeu a roupa do rei de Roma
              </Tag>
              <p className="text-xs text-muted-foreground mt-1 font-mono">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default TypographySection;
