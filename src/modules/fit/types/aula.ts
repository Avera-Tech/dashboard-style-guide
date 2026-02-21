export interface Aula {
  id: string;
  turmaId: string;
  turmaNome: string;
  modalidade: string;
  nivel: string;
  professorId: string;
  professorNome: string;
  data: string; // YYYY-MM-DD
  horarioInicio: string;
  horarioFim: string;
  status: "agendada" | "realizada" | "cancelada";
  motivoCancelamento?: string;
  observacoes?: string;
  maxAlunos: number;
  presencas: Presenca[];
}

export interface Presenca {
  alunoId: string;
  alunoNome: string;
  status: "presente" | "ausente" | "justificado" | "pendente";
}

export type AulaStatus = Aula["status"];
export type PresencaStatus = Presenca["status"];
