export type TurnoType = "manha" | "tarde" | "folga" | "ferias";

export interface EscalaMedico {
  medicoId: string;
  nome: string;
  turnos: TurnoType[]; // 7 dias (seg-dom)
}

export const MOCK_ESCALA: EscalaMedico[] = [
  { medicoId: "1", nome: "Dr. Carvalho", turnos: ["manha", "manha", "folga", "manha", "tarde", "folga", "folga"] },
  { medicoId: "2", nome: "Dra. Santos", turnos: ["tarde", "tarde", "manha", "manha", "folga", "manha", "folga"] },
  { medicoId: "3", nome: "Dr. Lima", turnos: ["manha", "folga", "tarde", "tarde", "manha", "folga", "folga"] },
  { medicoId: "4", nome: "Dra. Costa", turnos: ["folga", "manha", "manha", "folga", "tarde", "manha", "folga"] },
  { medicoId: "5", nome: "Dr. Oliveira", turnos: ["tarde", "manha", "tarde", "manha", "manha", "folga", "folga"] },
  { medicoId: "6", nome: "Dra. Alves", turnos: ["folga", "folga", "ferias", "ferias", "ferias", "ferias", "ferias"] },
];

export const turnoConfig: Record<TurnoType, { label: string; className: string }> = {
  manha: { label: "Manhã", className: "bg-primary/10 text-primary border-0" },
  tarde: { label: "Tarde", className: "bg-warning/10 text-warning border-0" },
  folga: { label: "Folga", className: "bg-muted text-muted-foreground border-0" },
  ferias: { label: "Férias", className: "bg-destructive/10 text-destructive border-0" },
};
