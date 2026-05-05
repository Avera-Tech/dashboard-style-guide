import { CheckCircle2, Building2, Palette, Dumbbell, ShoppingBag, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  done: boolean;
}

interface Props {
  empresaName: string;
  modalidadesCount: number;
  tiposCount: number;
  hasEndereco: boolean;
}

const StepPronto = ({ empresaName, modalidadesCount, tiposCount, hasEndereco }: Props) => {
  const items: SummaryItem[] = [
    {
      icon: <Building2 className="h-4 w-4" />,
      label: "Empresa",
      value: empresaName || "—",
      done: !!empresaName,
    },
    {
      icon: <Palette className="h-4 w-4" />,
      label: "Identidade visual",
      value: "Cores configuradas",
      done: true,
    },
    {
      icon: <Dumbbell className="h-4 w-4" />,
      label: "Modalidades",
      value: modalidadesCount > 0 ? `${modalidadesCount} modalidade${modalidadesCount > 1 ? "s" : ""}` : "Nenhuma cadastrada",
      done: modalidadesCount > 0,
    },
    {
      icon: <ShoppingBag className="h-4 w-4" />,
      label: "Tipos de produto",
      value: tiposCount > 0 ? `${tiposCount} tipo${tiposCount > 1 ? "s" : ""}` : "Nenhum cadastrado",
      done: tiposCount > 0,
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: "Endereço",
      value: hasEndereco ? "Endereço salvo" : "Não informado",
      done: hasEndereco,
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Hero */}
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-foreground">
            Configuração concluída!
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Seu sistema está pronto. Você pode ajustar qualquer informação a qualquer momento em Configurações.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
          Resumo da configuração
        </p>
        <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-4 py-3 bg-card"
            >
              <div
                className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                  item.done
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className={cn("text-sm font-medium truncate", !item.done && "text-muted-foreground")}>
                  {item.value}
                </p>
              </div>
              <ChevronRight
                className={cn(
                  "h-4 w-4 shrink-0",
                  item.done ? "text-primary" : "text-muted-foreground/40"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Clique em <span className="font-semibold text-foreground">Ir para o dashboard</span> para começar a usar o sistema.
      </p>
    </div>
  );
};

export default StepPronto;
