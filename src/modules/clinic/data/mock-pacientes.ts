export interface Paciente {
  id: string;
  codigo: string;
  nome: string;
  dataNascimento: string;
  convenio: string;
  ultimoAtendimento: string;
  status: "Ativo" | "Inativo";
}

export const CONVENIOS = ["Unimed", "Bradesco", "SulAmérica", "Particular", "Amil", "Porto Seguro"];

export const MOCK_PACIENTES: Paciente[] = [
  { id: "1", codigo: "#00234", nome: "Maria Aparecida Silva", dataNascimento: "12/03/1980", convenio: "Unimed", ultimoAtendimento: "20/02/2026", status: "Ativo" },
  { id: "2", codigo: "#00891", nome: "João Carlos Pereira", dataNascimento: "07/11/1975", convenio: "Bradesco", ultimoAtendimento: "18/02/2026", status: "Ativo" },
  { id: "3", codigo: "#01120", nome: "Ana Paula Rodrigues", dataNascimento: "25/06/1992", convenio: "Particular", ultimoAtendimento: "20/02/2026", status: "Ativo" },
  { id: "4", codigo: "#00567", nome: "Carlos Eduardo Mendes", dataNascimento: "14/09/1968", convenio: "SulAmérica", ultimoAtendimento: "15/02/2026", status: "Ativo" },
  { id: "5", codigo: "#00345", nome: "Lucia Helena Ferreira", dataNascimento: "02/01/1955", convenio: "Unimed", ultimoAtendimento: "10/02/2026", status: "Inativo" },
  { id: "6", codigo: "#01284", nome: "Roberto Alves Neto", dataNascimento: "30/04/2001", convenio: "Particular", ultimoAtendimento: "19/02/2026", status: "Ativo" },
  { id: "7", codigo: "#00102", nome: "Fernanda Costa Lima", dataNascimento: "18/07/1988", convenio: "Amil", ultimoAtendimento: "22/02/2026", status: "Ativo" },
  { id: "8", codigo: "#00455", nome: "Paulo Roberto Santos", dataNascimento: "05/12/1972", convenio: "Porto Seguro", ultimoAtendimento: "14/02/2026", status: "Ativo" },
  { id: "9", codigo: "#00678", nome: "Beatriz Oliveira", dataNascimento: "21/09/1995", convenio: "Bradesco", ultimoAtendimento: "17/02/2026", status: "Inativo" },
  { id: "10", codigo: "#00912", nome: "Marcos Antônio Souza", dataNascimento: "10/03/1960", convenio: "SulAmérica", ultimoAtendimento: "21/02/2026", status: "Ativo" },
  { id: "11", codigo: "#01345", nome: "Juliana Martins", dataNascimento: "15/08/1990", convenio: "Unimed", ultimoAtendimento: "23/02/2026", status: "Ativo" },
  { id: "12", codigo: "#00789", nome: "Ricardo Gomes Filho", dataNascimento: "28/02/1983", convenio: "Particular", ultimoAtendimento: "12/02/2026", status: "Ativo" },
];
