import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface StatusFieldProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  title?: string;
  activeDescription?: string;
  inactiveDescription?: string;
}

const StatusField = ({
  checked,
  onCheckedChange,
  title = "Status",
  activeDescription,
  inactiveDescription,
}: StatusFieldProps) => (
  <div className="flex items-center justify-between rounded-lg border border-border p-4">
    <div className="space-y-0.5">
      <Label className="text-sm font-medium">{title}</Label>
      <p className="text-xs text-muted-foreground">
        {checked ? activeDescription : inactiveDescription}
      </p>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-xs font-medium ${checked ? "text-primary" : "text-muted-foreground"}`}>
        {checked ? "Ativo" : "Inativo"}
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  </div>
);

export default StatusField;
