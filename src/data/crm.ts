export type LembreteTipo = "aula_hoje" | "checkin_pos_aula" | "cobranca" | "ausencia" | "aniversario";
export type LembreteStatus = "pendente" | "enviado" | "lido";
export type LembreteCanal = "whatsapp" | "email" | "sms" | "app";
export type LembreteOrigem = "automatico" | "manual";

export interface Lembrete {
  id: string;
  alunoId: string;
  alunoNome: string;
  tipo: LembreteTipo;
  canal: LembreteCanal;
  status: LembreteStatus;
  origem: LembreteOrigem;
  titulo: string;
  mensagem: string;
  dataEnvio: string;
  turma?: string;
}

export interface RegraLembrete {
  id: string;
  tipo: LembreteTipo;
  ativo: boolean;
  canal: LembreteCanal;
  antecedencia: number;
  unidadeAntecedencia: "minutos" | "horas" | "dias";
  templateTitulo: string;
  templateMensagem: string;
  descricaoTrigger: string;
}

export const tipoConfig: Record<LembreteTipo, { label: string; emoji: string; color: string }> = {
  aula_hoje: { label: "Lembrete de Aula", emoji: "📅", color: "text-primary" },
  checkin_pos_aula: { label: "Check-in Pós-Aula", emoji: "✅", color: "text-success" },
  cobranca: { label: "Cobrança/Vencimento", emoji: "💰", color: "text-accent" },
  ausencia: { label: "Reengajamento", emoji: "👋", color: "text-destructive" },
  aniversario: { label: "Aniversário", emoji: "🎂", color: "text-info" },
};

export const statusConfig: Record<LembreteStatus, { label: string; variant: "default" | "secondary" | "outline" }> = {
  pendente: { label: "Pendente", variant: "outline" },
  enviado: { label: "Enviado", variant: "secondary" },
  lido: { label: "Lido", variant: "default" },
};

export const canalConfig: Record<LembreteCanal, { label: string; emoji: string }> = {
  whatsapp: { label: "WhatsApp", emoji: "💬" },
  email: { label: "E-mail", emoji: "✉️" },
  sms: { label: "SMS", emoji: "📱" },
  app: { label: "Notificação", emoji: "🔔" },
};

export const MOCK_REGRAS: RegraLembrete[] = [
  {
    id: "r1",
    tipo: "aula_hoje",
    ativo: true,
    canal: "whatsapp",
    antecedencia: 2,
    unidadeAntecedencia: "horas",
    templateTitulo: "Aula de {modalidade} hoje!",
    templateMensagem: "Olá {nome}! Sua aula de {modalidade} é hoje às {horario}. Não esqueça de fazer check-in na recepção. Até lá! 🎾",
    descricaoTrigger: "Dispara automaticamente antes de cada aula agendada",
  },
  {
    id: "r2",
    tipo: "checkin_pos_aula",
    ativo: true,
    canal: "whatsapp",
    antecedencia: 1,
    unidadeAntecedencia: "horas",
    templateTitulo: "Como foi a aula?",
    templateMensagem: "Oi {nome}! Como foi sua aula de {modalidade} hoje? Nos conte como se sentiu e se tem algum feedback. 😊",
    descricaoTrigger: "Dispara automaticamente após o término de cada aula",
  },
  {
    id: "r3",
    tipo: "cobranca",
    ativo: true,
    canal: "whatsapp",
    antecedencia: 3,
    unidadeAntecedencia: "dias",
    templateTitulo: "Plano próximo do vencimento",
    templateMensagem: "Olá {nome}! Seu plano vence em {dias} dias ({data_vencimento}). Regularize para não perder seus créditos de aula.",
    descricaoTrigger: "Dispara quando o plano do aluno está próximo do vencimento",
  },
  {
    id: "r4",
    tipo: "ausencia",
    ativo: true,
    canal: "whatsapp",
    antecedencia: 7,
    unidadeAntecedencia: "dias",
    templateTitulo: "Sentimos sua falta!",
    templateMensagem: "Oi {nome}! Faz {dias} dias que você não aparece no CT. Sentimos sua falta! Que tal agendar uma aula essa semana? 💪",
    descricaoTrigger: "Dispara quando o aluno fica sem check-in por X dias",
  },
  {
    id: "r5",
    tipo: "aniversario",
    ativo: true,
    canal: "whatsapp",
    antecedencia: 0,
    unidadeAntecedencia: "dias",
    templateTitulo: "Feliz Aniversário! 🎉",
    templateMensagem: "Parabéns {nome}! 🎂🎉 Desejamos um dia incrível! Como presente, você ganhou uma aula cortesia. Aproveite!",
    descricaoTrigger: "Dispara no dia do aniversário do aluno",
  },
];

export const MOCK_LEMBRETES: Lembrete[] = [
  { id: "l1", alunoId: "1", alunoNome: "Pedro Henrique Kevin Assunção", tipo: "aula_hoje", canal: "whatsapp", status: "enviado", origem: "automatico", titulo: "Aula de Tennis hoje!", mensagem: "Olá Pedro! Sua aula de Tennis é hoje às 14h. Não esqueça de fazer check-in na recepção. Até lá! 🎾", dataEnvio: "2026-02-19T08:00:00", turma: "Tennis Intermediário" },
  { id: "l2", alunoId: "2", alunoNome: "Ana Clara Silva", tipo: "aula_hoje", canal: "whatsapp", status: "pendente", origem: "automatico", titulo: "Aula de Futevôlei hoje!", mensagem: "Oi Ana! Lembrete: sua aula de Futevôlei é hoje às 16h. Traga protetor solar! ☀️", dataEnvio: "2026-02-19T09:00:00", turma: "Futevôlei Iniciante" },
  { id: "l3", alunoId: "6", alunoNome: "Eduarda Santos Alves", tipo: "checkin_pos_aula", canal: "whatsapp", status: "enviado", origem: "automatico", titulo: "Como foi a aula?", mensagem: "Oi Eduarda! Como foi sua aula de Tennis hoje? Nos conte como se sentiu e se tem algum feedback. 😊", dataEnvio: "2026-02-18T18:00:00", turma: "Tennis Iniciante" },
  { id: "l4", alunoId: "4", alunoNome: "Carla Oliveira Ramos", tipo: "checkin_pos_aula", canal: "email", status: "lido", origem: "automatico", titulo: "Feedback da aula", mensagem: "Olá Carla! Gostaríamos de saber como foi sua aula de hoje. Seu feedback é muito importante para nós!", dataEnvio: "2026-02-17T19:00:00", turma: "Tennis Competitivo" },
  { id: "l5", alunoId: "3", alunoNome: "Bruno Costa Mendes", tipo: "cobranca", canal: "whatsapp", status: "enviado", origem: "automatico", titulo: "Plano próximo do vencimento", mensagem: "Olá Bruno! Seu plano vence em 3 dias (22/02). Regularize para não perder seus créditos de aula.", dataEnvio: "2026-02-19T10:00:00" },
  { id: "l6", alunoId: "5", alunoNome: "Daniel Souza Lima", tipo: "cobranca", canal: "email", status: "pendente", origem: "automatico", titulo: "Mensalidade em atraso", mensagem: "Olá Daniel, notamos que sua mensalidade de fevereiro está pendente. Entre em contato conosco para regularizar sua situação.", dataEnvio: "2026-02-19T10:30:00" },
  { id: "l7", alunoId: "5", alunoNome: "Daniel Souza Lima", tipo: "ausencia", canal: "whatsapp", status: "enviado", origem: "automatico", titulo: "Sentimos sua falta!", mensagem: "Oi Daniel! Faz 30 dias que você não aparece no CT. Sentimos sua falta! Que tal agendar uma aula essa semana? 💪", dataEnvio: "2026-02-18T11:00:00" },
  { id: "l8", alunoId: "1", alunoNome: "Pedro Henrique Kevin Assunção", tipo: "ausencia", canal: "whatsapp", status: "lido", origem: "automatico", titulo: "Tudo bem por aí?", mensagem: "Pedro, notamos que você faltou nas últimas 2 aulas. Está tudo bem? Se precisar remarcar, é só nos chamar!", dataEnvio: "2026-02-15T10:00:00" },
  { id: "l9", alunoId: "2", alunoNome: "Ana Clara Silva", tipo: "aniversario", canal: "whatsapp", status: "pendente", origem: "automatico", titulo: "Feliz Aniversário! 🎉", mensagem: "Parabéns Ana Clara! 🎂🎉 Desejamos um dia incrível! Como presente, você ganhou uma aula cortesia. Aproveite!", dataEnvio: "2026-02-20T08:00:00" },
  { id: "l10", alunoId: "4", alunoNome: "Carla Oliveira Ramos", tipo: "aniversario", canal: "whatsapp", status: "enviado", origem: "automatico", titulo: "Feliz Aniversário! 🎉", mensagem: "Carla, hoje é seu dia! Feliz aniversário! 🎂 Passe na recepção para pegar seu brinde especial!", dataEnvio: "2026-02-10T08:00:00" },
  { id: "l11", alunoId: "3", alunoNome: "Bruno Costa Mendes", tipo: "aula_hoje", canal: "whatsapp", status: "enviado", origem: "manual", titulo: "Mudança de horário!", mensagem: "Oi Bruno! Atenção: sua aula de amanhã foi reagendada para às 15h. Qualquer dúvida, nos chame!", dataEnvio: "2026-02-18T14:00:00", turma: "Tennis Avançado" },
];

export function formatDateBR(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

export function formatDateTimeBR(dateStr: string): string {
  return new Date(dateStr).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
