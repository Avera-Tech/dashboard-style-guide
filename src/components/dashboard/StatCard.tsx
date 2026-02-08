import { TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  gradient: string;
}

const StatCard = ({ label, value, change, icon: Icon, gradient }: StatCardProps) => (
  <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:shadow-primary/5 group">
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-extrabold text-foreground tracking-tight">{value}</span>
          {change && (
            <span className="flex items-center gap-0.5 text-xs font-semibold text-success mb-1">
              <TrendingUp className="h-3 w-3" />
              {change}
            </span>
          )}
        </div>
      </div>
      <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${gradient}`}>
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
  </div>
);

export default StatCard;
