export interface PacienteFila {
  id: string;
  posicao: number;
  paciente: string;
  horario: string;
  medico: string;
  sala: string;
  espera: string;
}

export const CHAMANDO_AGORA = {
  paciente: "João Carlos Pereira",
  sala: "Sala 03",
  medico: "Dra. Carla Santos",
  especialidade: "Pediatria",
};

export const PROXIMOS: { numero: string; paciente: string; horario: string }[] = [
  { numero: "02", paciente: "Ana Rodrigues", horario: "14:00" },
  { numero: "03", paciente: "Carlos Mendes", horario: "14:15" },
  { numero: "04", paciente: "Roberto Neto", horario: "14:30" },
  { numero: "05", paciente: "Fernanda Lima", horario: "14:45" },
];

export const FILA_ESPERA: PacienteFila[] = [
  { id: "1", posicao: 1, paciente: "João Pereira", horario: "13:45", medico: "Dra. Santos", sala: "Sala 03", espera: "12 min" },
  { id: "2", posicao: 2, paciente: "Ana Rodrigues", horario: "14:00", medico: "Dr. Lima", sala: "Sala 04", espera: "aguardando" },
  { id: "3", posicao: 3, paciente: "Carlos Mendes", horario: "14:15", medico: "Dr. Carvalho", sala: "Sala 01", espera: "aguardando" },
];
