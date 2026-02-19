export type ContatoOrigem = "indicacao" | "site" | "instagram" | "whatsapp" | "presencial" | "outro";
export type ContatoStatus = "novo" | "em_contato" | "interessado" | "matriculado" | "perdido";
export type InteracaoTipo = "ligacao" | "whatsapp" | "email" | "presencial" | "nota";
export type TarefaStatus = "pendente" | "concluida" | "atrasada";

export interface Contato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  origem: ContatoOrigem;
  status: ContatoStatus;
  interesse: string;
  alunoVinculado?: string;
  criadoEm: string;
  ultimoContato: string;
}

export interface Interacao {
  id: string;
  contatoId: string;
  tipo: InteracaoTipo;
  descricao: string;
  data: string;
  responsavel: string;
}

export interface Tarefa {
  id: string;
  contatoId: string;
  titulo: string;
  descricao: string;
  dataVencimento: string;
  status: TarefaStatus;
  responsavel: string;
}

export const statusConfig: Record<ContatoStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  novo: { label: "Novo", variant: "outline" },
  em_contato: { label: "Em Contato", variant: "secondary" },
  interessado: { label: "Interessado", variant: "default" },
  matriculado: { label: "Matriculado", variant: "default" },
  perdido: { label: "Perdido", variant: "destructive" },
};

export const origemConfig: Record<ContatoOrigem, string> = {
  indicacao: "Indicação",
  site: "Site",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  presencial: "Presencial",
  outro: "Outro",
};

export const interacaoConfig: Record<InteracaoTipo, { label: string; emoji: string }> = {
  ligacao: { label: "Ligação", emoji: "📞" },
  whatsapp: { label: "WhatsApp", emoji: "💬" },
  email: { label: "E-mail", emoji: "✉️" },
  presencial: { label: "Presencial", emoji: "🤝" },
  nota: { label: "Nota", emoji: "📝" },
};

export const tarefaStatusConfig: Record<TarefaStatus, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  pendente: { label: "Pendente", variant: "secondary" },
  concluida: { label: "Concluída", variant: "default" },
  atrasada: { label: "Atrasada", variant: "destructive" },
};

export const MOCK_CONTATOS: Contato[] = [
  { id: "c1", nome: "Lucas Ferreira", email: "lucas.ferreira@email.com", telefone: "(11) 99123-4567", origem: "instagram", status: "novo", interesse: "Tennis", criadoEm: "2026-02-15", ultimoContato: "2026-02-15" },
  { id: "c2", nome: "Mariana Costa", email: "mariana.costa@email.com", telefone: "(21) 98765-1234", origem: "indicacao", status: "em_contato", interesse: "Futevôlei", criadoEm: "2026-02-10", ultimoContato: "2026-02-17", alunoVinculado: "Ana Clara Silva" },
  { id: "c3", nome: "Rafael Oliveira", email: "rafael.oliveira@email.com", telefone: "(31) 97654-3210", origem: "site", status: "interessado", interesse: "Tennis", criadoEm: "2026-02-05", ultimoContato: "2026-02-18" },
  { id: "c4", nome: "Juliana Mendes", email: "juliana.mendes@email.com", telefone: "(41) 96543-2109", origem: "whatsapp", status: "matriculado", interesse: "Ambos", criadoEm: "2026-01-20", ultimoContato: "2026-02-19", alunoVinculado: "Juliana Mendes" },
  { id: "c5", nome: "Thiago Souza", email: "thiago.souza@email.com", telefone: "(51) 95432-1098", origem: "presencial", status: "perdido", interesse: "Futevôlei", criadoEm: "2026-01-10", ultimoContato: "2026-02-01" },
  { id: "c6", nome: "Beatriz Lima", email: "beatriz.lima@email.com", telefone: "(62) 94321-0987", origem: "instagram", status: "em_contato", interesse: "Tennis", criadoEm: "2026-02-12", ultimoContato: "2026-02-16" },
  { id: "c7", nome: "Gabriel Santos", email: "gabriel.santos@email.com", telefone: "(71) 93210-9876", origem: "indicacao", status: "interessado", interesse: "Tennis", criadoEm: "2026-02-08", ultimoContato: "2026-02-18" },
  { id: "c8", nome: "Camila Rodrigues", email: "camila.rodrigues@email.com", telefone: "(81) 92109-8765", origem: "site", status: "novo", interesse: "Futevôlei", criadoEm: "2026-02-18", ultimoContato: "2026-02-18" },
];

export const MOCK_INTERACOES: Interacao[] = [
  { id: "i1", contatoId: "c1", tipo: "whatsapp", descricao: "Primeiro contato, demonstrou interesse em aulas de tennis", data: "2026-02-15T10:30:00", responsavel: "Ana Silva" },
  { id: "i2", contatoId: "c2", tipo: "ligacao", descricao: "Ligação de follow-up, agendou aula experimental", data: "2026-02-17T14:00:00", responsavel: "Ana Silva" },
  { id: "i3", contatoId: "c2", tipo: "whatsapp", descricao: "Primeiro contato via indicação da aluna Ana Clara", data: "2026-02-10T09:15:00", responsavel: "Ana Silva" },
  { id: "i4", contatoId: "c3", tipo: "email", descricao: "Enviado tabela de preços e horários disponíveis", data: "2026-02-18T11:00:00", responsavel: "Ana Silva" },
  { id: "i5", contatoId: "c3", tipo: "presencial", descricao: "Veio conhecer a estrutura do CT", data: "2026-02-12T16:30:00", responsavel: "Ana Silva" },
  { id: "i6", contatoId: "c3", tipo: "whatsapp", descricao: "Contato inicial pelo site, pediu mais informações", data: "2026-02-05T08:45:00", responsavel: "Ana Silva" },
  { id: "i7", contatoId: "c4", tipo: "nota", descricao: "Matrícula concluída, início em 25/01", data: "2026-01-22T10:00:00", responsavel: "Ana Silva" },
  { id: "i8", contatoId: "c5", tipo: "ligacao", descricao: "Tentativa de contato, não atendeu. 3ª tentativa sem retorno.", data: "2026-02-01T15:00:00", responsavel: "Ana Silva" },
  { id: "i9", contatoId: "c6", tipo: "whatsapp", descricao: "Respondeu stories, quer saber sobre aulas de tennis", data: "2026-02-12T20:00:00", responsavel: "Ana Silva" },
  { id: "i10", contatoId: "c6", tipo: "ligacao", descricao: "Follow-up, está comparando com outro CT", data: "2026-02-16T11:30:00", responsavel: "Ana Silva" },
];

export const MOCK_TAREFAS: Tarefa[] = [
  { id: "t1", contatoId: "c1", titulo: "Enviar tabela de preços", descricao: "Enviar PDF com planos e valores", dataVencimento: "2026-02-20", status: "pendente", responsavel: "Ana Silva" },
  { id: "t2", contatoId: "c2", titulo: "Confirmar aula experimental", descricao: "Ligar para confirmar presença na aula experimental de amanhã", dataVencimento: "2026-02-19", status: "pendente", responsavel: "Ana Silva" },
  { id: "t3", contatoId: "c3", titulo: "Enviar proposta comercial", descricao: "Montar proposta personalizada com desconto de inauguração", dataVencimento: "2026-02-19", status: "atrasada", responsavel: "Ana Silva" },
  { id: "t4", contatoId: "c6", titulo: "Follow-up pós visita", descricao: "Enviar mensagem perguntando se decidiu", dataVencimento: "2026-02-21", status: "pendente", responsavel: "Ana Silva" },
  { id: "t5", contatoId: "c7", titulo: "Agendar aula experimental", descricao: "Propor horários disponíveis para aula teste", dataVencimento: "2026-02-20", status: "pendente", responsavel: "Ana Silva" },
  { id: "t6", contatoId: "c4", titulo: "Boas-vindas pós matrícula", descricao: "Enviar kit de boas-vindas e informações da primeira aula", dataVencimento: "2026-01-24", status: "concluida", responsavel: "Ana Silva" },
];

export function formatDateBR(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

export function formatDateTimeBR(dateStr: string): string {
  return new Date(dateStr).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
