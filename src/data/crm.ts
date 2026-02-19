export type LembreteTipo = "aula_hoje" | "checkin_pos_aula" | "cobranca" | "ausencia" | "aniversario";
export type LembreteStatus = "pendente" | "enviado" | "lido";
export type LembreteCanal = "whatsapp" | "email" | "sms" | "app";

export interface Lembrete {
  id: string;
  alunoId: string;
  alunoNome: string;
  tipo: LembreteTipo;
  canal: LembreteCanal;
  status: LembreteStatus;
  titulo: string;
  mensagem: string;
  dataEnvio: string;
  turma?: string;
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

export const MOCK_LEMBRETES: Lembrete[] = [
  // Aula hoje
  { id: "l1", alunoId: "1", alunoNome: "Pedro Henrique Kevin Assunção", tipo: "aula_hoje", canal: "whatsapp", status: "enviado", titulo: "Aula de Tennis hoje!", mensagem: "Olá Pedro! Sua aula de Tennis é hoje às 14h. Não esqueça de fazer check-in na recepção. Até lá! 🎾", dataEnvio: "2026-02-19T08:00:00", turma: "Tennis Intermediário" },
  { id: "l2", alunoId: "2", alunoNome: "Ana Clara Silva", tipo: "aula_hoje", canal: "whatsapp", status: "pendente", titulo: "Aula de Futevôlei hoje!", mensagem: "Oi Ana! Lembrete: sua aula de Futevôlei é hoje às 16h. Traga protetor solar! ☀️", dataEnvio: "2026-02-19T09:00:00", turma: "Futevôlei Iniciante" },

  // Check-in pós-aula
  { id: "l3", alunoId: "6", alunoNome: "Eduarda Santos Alves", tipo: "checkin_pos_aula", canal: "whatsapp", status: "enviado", titulo: "Como foi a aula?", mensagem: "Oi Eduarda! Como foi sua aula de Tennis hoje? Nos conte como se sentiu e se tem algum feedback. 😊", dataEnvio: "2026-02-18T18:00:00", turma: "Tennis Iniciante" },
  { id: "l4", alunoId: "4", alunoNome: "Carla Oliveira Ramos", tipo: "checkin_pos_aula", canal: "email", status: "lido", titulo: "Feedback da aula", mensagem: "Olá Carla! Gostaríamos de saber como foi sua aula de hoje. Seu feedback é muito importante para nós!", dataEnvio: "2026-02-17T19:00:00", turma: "Tennis Competitivo" },

  // Cobrança
  { id: "l5", alunoId: "3", alunoNome: "Bruno Costa Mendes", tipo: "cobranca", canal: "whatsapp", status: "enviado", titulo: "Plano próximo do vencimento", mensagem: "Olá Bruno! Seu plano vence em 3 dias (22/02). Regularize para não perder seus créditos de aula. Qualquer dúvida, estamos à disposição!", dataEnvio: "2026-02-19T10:00:00" },
  { id: "l6", alunoId: "5", alunoNome: "Daniel Souza Lima", tipo: "cobranca", canal: "email", status: "pendente", titulo: "Mensalidade em atraso", mensagem: "Olá Daniel, notamos que sua mensalidade de fevereiro está pendente. Entre em contato conosco para regularizar sua situação.", dataEnvio: "2026-02-19T10:30:00" },

  // Ausência / reengajamento
  { id: "l7", alunoId: "5", alunoNome: "Daniel Souza Lima", tipo: "ausencia", canal: "whatsapp", status: "enviado", titulo: "Sentimos sua falta!", mensagem: "Oi Daniel! Faz 30 dias que você não aparece no CT. Sentimos sua falta! Que tal agendar uma aula essa semana? 💪", dataEnvio: "2026-02-18T11:00:00" },
  { id: "l8", alunoId: "1", alunoNome: "Pedro Henrique Kevin Assunção", tipo: "ausencia", canal: "whatsapp", status: "lido", titulo: "Tudo bem por aí?", mensagem: "Pedro, notamos que você faltou nas últimas 2 aulas. Está tudo bem? Se precisar remarcar, é só nos chamar!", dataEnvio: "2026-02-15T10:00:00" },

  // Aniversário
  { id: "l9", alunoId: "2", alunoNome: "Ana Clara Silva", tipo: "aniversario", canal: "whatsapp", status: "pendente", titulo: "Feliz Aniversário! 🎉", mensagem: "Parabéns Ana Clara! 🎂🎉 Desejamos um dia incrível! Como presente, você ganhou uma aula cortesia. Aproveite!", dataEnvio: "2026-02-20T08:00:00" },
  { id: "l10", alunoId: "4", alunoNome: "Carla Oliveira Ramos", tipo: "aniversario", canal: "whatsapp", status: "enviado", titulo: "Feliz Aniversário! 🎉", mensagem: "Carla, hoje é seu dia! Feliz aniversário! 🎂 Passe na recepção para pegar seu brinde especial!", dataEnvio: "2026-02-10T08:00:00" },
];

export function formatDateBR(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

export function formatDateTimeBR(dateStr: string): string {
  return new Date(dateStr).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
