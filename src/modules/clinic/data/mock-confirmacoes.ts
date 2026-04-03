export type ConfirmacaoStatus = "confirmado" | "aguardando" | "cancelado";

export interface ConfirmacaoEnvio {
  id: string;
  paciente: string;
  medico: string;
  telefone: string;
  status: ConfirmacaoStatus;
}

export const MOCK_CONFIRMACOES: ConfirmacaoEnvio[] = [
  { id: "1", paciente: "Maria Silva", medico: "Dr. Carvalho", telefone: "(11) 98765-4321", status: "confirmado" },
  { id: "2", paciente: "João Pereira", medico: "Dra. Santos", telefone: "(11) 97654-3210", status: "confirmado" },
  { id: "3", paciente: "Ana Rodrigues", medico: "Dr. Lima", telefone: "(11) 96543-2109", status: "aguardando" },
  { id: "4", paciente: "Carlos Mendes", medico: "Dr. Carvalho", telefone: "(11) 95432-1098", status: "aguardando" },
  { id: "5", paciente: "Lucia Ferreira", medico: "Dra. Costa", telefone: "(11) 94321-0987", status: "cancelado" },
];

export const CONFIRMACAO_STATS = {
  enviadas: 48,
  confirmadas: 34,
  semResposta: 9,
  cancelamentos: 5,
};

export const MODELO_MENSAGEM = `Olá, *{{nome}}*! 👋 Lembrando sua consulta amanhã: 📅 *{{data}}* às *{{hora}}* 👨‍⚕️ *{{medico}}* — {{especialidade}} 📍 {{unidade}} ✅ Confirmar → responda *SIM* ❌ Cancelar → responda *NÃO*`;
