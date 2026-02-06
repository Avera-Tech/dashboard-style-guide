import SectionHeader from "./SectionHeader";
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

const alerts = [
  {
    type: "info",
    icon: Info,
    title: "Informação",
    message: "Este é um alerta informativo com detalhes relevantes.",
    bg: "bg-info/10",
    border: "border-info/30",
    iconColor: "text-info",
    titleColor: "text-info",
  },
  {
    type: "success",
    icon: CheckCircle2,
    title: "Sucesso",
    message: "Operação realizada com sucesso!",
    bg: "bg-success/10",
    border: "border-success/30",
    iconColor: "text-success",
    titleColor: "text-success",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Atenção",
    message: "Verifique as informações antes de continuar.",
    bg: "bg-warning/10",
    border: "border-warning/30",
    iconColor: "text-warning",
    titleColor: "text-warning",
  },
  {
    type: "destructive",
    icon: AlertCircle,
    title: "Erro",
    message: "Algo deu errado. Tente novamente mais tarde.",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    iconColor: "text-destructive",
    titleColor: "text-destructive",
  },
];

const AlertsSection = () => (
  <section>
    <SectionHeader title="Alertas" description="Feedback contextual para o usuário com diferentes níveis de severidade." />
    <div className="space-y-4">
      {alerts.map((alert) => {
        const Icon = alert.icon;
        return (
          <div
            key={alert.type}
            className={`${alert.bg} ${alert.border} border rounded-lg p-4 flex items-start gap-3`}
          >
            <Icon className={`h-5 w-5 ${alert.iconColor} shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${alert.titleColor}`}>{alert.title}</p>
              <p className="text-sm text-foreground/80 mt-0.5">{alert.message}</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  </section>
);

export default AlertsSection;
