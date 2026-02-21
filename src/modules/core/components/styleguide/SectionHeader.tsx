interface SectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader = ({ title, description }: SectionHeaderProps) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-foreground tracking-tight">{title}</h2>
    {description && (
      <p className="text-muted-foreground mt-1 text-sm">{description}</p>
    )}
    <div className="mt-3 h-px bg-border" />
  </div>
);

export default SectionHeader;
