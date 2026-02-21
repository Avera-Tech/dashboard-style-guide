export interface FilaAluno {
  id: string;
  alunoId: string;
  alunoNome: string;
  telefone: string;
  email: string;
  dataEntrada: string; // ISO date
  notificado: boolean;
}

export interface AulaListaEspera {
  id: string;
  aulaId: string;
  turmaNome: string;
  modalidade: string;
  professorNome: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  maxAlunos: number;
  alunosInscritos: number;
  fila: FilaAluno[];
}

export const MOCK_LISTA_ESPERA: AulaListaEspera[] = [
  {
    id: "le1",
    aulaId: "a3",
    turmaNome: "Tennis Iniciante A",
    modalidade: "Tennis",
    professorNome: "João Silva",
    data: "2025-02-17",
    horarioInicio: "14:00",
    horarioFim: "15:00",
    maxAlunos: 4,
    alunosInscritos: 4,
    fila: [
      { id: "f1", alunoId: "7", alunoNome: "Lucas Pereira", telefone: "(11) 91234-5678", email: "lucas.p@email.com", dataEntrada: "2025-02-10T09:30:00", notificado: false },
      { id: "f2", alunoId: "8", alunoNome: "Fernanda Lima", telefone: "(21) 92345-6789", email: "fernanda.l@email.com", dataEntrada: "2025-02-11T14:15:00", notificado: false },
      { id: "f3", alunoId: "9", alunoNome: "Rafael Martins", telefone: "(31) 93456-7890", email: "rafael.m@email.com", dataEntrada: "2025-02-12T08:00:00", notificado: false },
    ],
  },
  {
    id: "le2",
    aulaId: "a7",
    turmaNome: "Tennis Avançado",
    modalidade: "Tennis",
    professorNome: "Carlos Souza",
    data: "2025-02-18",
    horarioInicio: "16:00",
    horarioFim: "17:30",
    maxAlunos: 2,
    alunosInscritos: 2,
    fila: [
      { id: "f4", alunoId: "10", alunoNome: "Juliana Costa", telefone: "(41) 94567-8901", email: "juliana.c@email.com", dataEntrada: "2025-02-13T10:00:00", notificado: true },
    ],
  },
  {
    id: "le3",
    aulaId: "a4",
    turmaNome: "Tennis Iniciante A",
    modalidade: "Tennis",
    professorNome: "João Silva",
    data: "2025-02-19",
    horarioInicio: "14:00",
    horarioFim: "15:00",
    maxAlunos: 4,
    alunosInscritos: 4,
    fila: [
      { id: "f5", alunoId: "7", alunoNome: "Lucas Pereira", telefone: "(11) 91234-5678", email: "lucas.p@email.com", dataEntrada: "2025-02-14T11:30:00", notificado: false },
      { id: "f6", alunoId: "11", alunoNome: "Mariana Alves", telefone: "(51) 95678-9012", email: "mariana.a@email.com", dataEntrada: "2025-02-15T16:45:00", notificado: false },
    ],
  },
  {
    id: "le4",
    aulaId: "a12",
    turmaNome: "Tennis Kids",
    modalidade: "Tennis",
    professorNome: "Maria Oliveira",
    data: "2025-02-22",
    horarioInicio: "09:00",
    horarioFim: "10:00",
    maxAlunos: 4,
    alunosInscritos: 4,
    fila: [
      { id: "f7", alunoId: "12", alunoNome: "Gabriel Santos", telefone: "(62) 96789-0123", email: "gabriel.s@email.com", dataEntrada: "2025-02-16T07:00:00", notificado: false },
      { id: "f8", alunoId: "13", alunoNome: "Isabella Rodrigues", telefone: "(71) 97890-1234", email: "isabella.r@email.com", dataEntrada: "2025-02-16T09:20:00", notificado: false },
      { id: "f9", alunoId: "14", alunoNome: "Thiago Ferreira", telefone: "(81) 98901-2345", email: "thiago.f@email.com", dataEntrada: "2025-02-17T13:10:00", notificado: false },
      { id: "f10", alunoId: "15", alunoNome: "Camila Barbosa", telefone: "(91) 99012-3456", email: "camila.b@email.com", dataEntrada: "2025-02-18T15:30:00", notificado: false },
    ],
  },
];
