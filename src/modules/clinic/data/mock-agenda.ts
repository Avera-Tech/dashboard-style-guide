export interface ConsultaAgenda {
  id: string;
  paciente: string;
  medico: string;
  horario: string;
  diaSemana: number; // 0=seg, 1=ter, ...
  cor: "blue" | "green" | "orange" | "teal";
}

export const consultasAgendaMock: ConsultaAgenda[] = [
  { id: "1", paciente: "M. Silva", medico: "Carvalho", horario: "08:00", diaSemana: 0, cor: "teal" },
  { id: "2", paciente: "L. Rocha", medico: "Santos", horario: "08:00", diaSemana: 2, cor: "teal" },
  { id: "3", paciente: "A. Costa", medico: "Lima", horario: "08:00", diaSemana: 3, cor: "blue" },
  { id: "4", paciente: "P. Neves", medico: "", horario: "08:00", diaSemana: 5, cor: "orange" },
  { id: "5", paciente: "J. Pereira", medico: "Costa", horario: "09:00", diaSemana: 0, cor: "orange" },
  { id: "6", paciente: "C. Alves", medico: "Lima", horario: "09:00", diaSemana: 1, cor: "green" },
  { id: "7", paciente: "R. Souza", medico: "Santos", horario: "09:00", diaSemana: 3, cor: "blue" },
  { id: "8", paciente: "T. Melo", medico: "Carvalho", horario: "09:00", diaSemana: 4, cor: "blue" },
  { id: "9", paciente: "F. Dias", medico: "Carvalho", horario: "10:00", diaSemana: 1, cor: "green" },
  { id: "10", paciente: "V. Lima", medico: "Lima", horario: "10:00", diaSemana: 2, cor: "teal" },
  { id: "11", paciente: "B. Cruz", medico: "Costa", horario: "10:00", diaSemana: 4, cor: "green" },
  { id: "12", paciente: "M. Faria", medico: "Santos", horario: "11:00", diaSemana: 0, cor: "teal" },
  { id: "13", paciente: "G. Pinto", medico: "Carvalho", horario: "11:00", diaSemana: 2, cor: "blue" },
  { id: "14", paciente: "K. Lemos", medico: "Lima", horario: "11:00", diaSemana: 3, cor: "orange" },
  { id: "15", paciente: "H. Ramos", medico: "Santos", horario: "11:00", diaSemana: 5, cor: "blue" },
  { id: "16", paciente: "N. Borges", medico: "Costa", horario: "13:00", diaSemana: 1, cor: "green" },
  { id: "17", paciente: "O. Teixeira", medico: "", horario: "13:00", diaSemana: 2, cor: "teal" },
  { id: "18", paciente: "Q. Araújo", medico: "Santos", horario: "13:00", diaSemana: 3, cor: "green" },
  { id: "19", paciente: "S. Barbosa", medico: "Lima", horario: "14:00", diaSemana: 0, cor: "orange" },
  { id: "20", paciente: "U. Campos", medico: "Costa", horario: "14:00", diaSemana: 2, cor: "teal" },
  { id: "21", paciente: "W. Castro", medico: "", horario: "14:00", diaSemana: 3, cor: "green" },
  { id: "22", paciente: "X. Duarte", medico: "Santos", horario: "14:00", diaSemana: 4, cor: "blue" },
  { id: "23", paciente: "Y. Esteves", medico: "Lima", horario: "15:00", diaSemana: 1, cor: "green" },
  { id: "24", paciente: "Z. Fonseca", medico: "Santos", horario: "15:00", diaSemana: 3, cor: "blue" },
  { id: "25", paciente: "A. Gomes", medico: "", horario: "15:00", diaSemana: 4, cor: "orange" },
];

export const HORARIOS = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

export const DIAS_SEMANA = [
  { abrev: "SEG", nome: "Segunda" },
  { abrev: "TER", nome: "Terça" },
  { abrev: "QUA", nome: "Quarta" },
  { abrev: "QUI", nome: "Quinta" },
  { abrev: "SEX", nome: "Sexta" },
  { abrev: "SÁB", nome: "Sábado" },
  { abrev: "DOM", nome: "Domingo" },
];
