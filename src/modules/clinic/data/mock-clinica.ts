export interface ConsultaClinica {
  id: string;
  horario: string;
  paciente: string;
  pacienteId: string;
  medico: string;
  status: "aguardando" | "confirmado" | "cancelado" | "atendido";
}

export interface MedicoOnline {
  id: string;
  nome: string;
  especialidade: string;
  iniciais: string;
  cor: string;
  atendimentosHoje: number;
}

export interface EspecialidadeData {
  especialidade: string;
  consultas: number;
  cor: string;
}

export const MOCK_CONSULTAS: ConsultaClinica[] = [
  { id: "1", horario: "13:30", paciente: "Maria Silva", pacienteId: "#00234", medico: "Dr. Carvalho", status: "aguardando" },
  { id: "2", horario: "13:45", paciente: "João Pereira", pacienteId: "#00891", medico: "Dra. Santos", status: "confirmado" },
  { id: "3", horario: "14:00", paciente: "Ana Rodrigues", pacienteId: "#01120", medico: "Dr. Lima", status: "confirmado" },
  { id: "4", horario: "14:15", paciente: "Carlos Mendes", pacienteId: "#00567", medico: "Dr. Carvalho", status: "aguardando" },
  { id: "5", horario: "14:30", paciente: "Lucia Ferreira", pacienteId: "#00345", medico: "Dra. Costa", status: "cancelado" },
];

export const MOCK_MEDICOS_ONLINE: MedicoOnline[] = [
  { id: "1", nome: "Dr. Roberto Carvalho", especialidade: "Clínica Geral", iniciais: "RC", cor: "hsl(152, 60%, 40%)", atendimentosHoje: 8 },
  { id: "2", nome: "Dra. Carla Santos", especialidade: "Pediatria", iniciais: "CS", cor: "hsl(207, 90%, 54%)", atendimentosHoje: 6 },
  { id: "3", nome: "Dr. Fábio Lima", especialidade: "Cardiologia", iniciais: "FL", cor: "hsl(39, 95%, 55%)", atendimentosHoje: 5 },
];

export const MOCK_ESPECIALIDADES: EspecialidadeData[] = [
  { especialidade: "Clínica Geral", consultas: 34, cor: "hsl(152, 60%, 40%)" },
  { especialidade: "Pediatria", consultas: 24, cor: "hsl(207, 90%, 54%)" },
  { especialidade: "Cardiologia", consultas: 16, cor: "hsl(39, 95%, 55%)" },
  { especialidade: "Dermatologia", consultas: 12, cor: "hsl(326, 80%, 55%)" },
  { especialidade: "Ortopedia", consultas: 8, cor: "hsl(270, 60%, 55%)" },
];

export const statusConsultaConfig: Record<string, { label: string; className: string }> = {
  aguardando: { label: "Aguardando", className: "text-warning" },
  confirmado: { label: "Confirmado", className: "text-success" },
  cancelado: { label: "Cancelado", className: "text-destructive" },
  atendido: { label: "Atendido", className: "text-info" },
};
