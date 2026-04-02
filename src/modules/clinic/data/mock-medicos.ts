export interface Medico {
  id: string;
  nome: string;
  crm: string;
  especialidade: string;
  iniciais: string;
  cor: string;
  status: "online" | "offline";
  atendimentosHoje: number;
  atendimentosMes: number;
  avaliacao: number;
}

export const MOCK_MEDICOS: Medico[] = [
  { id: "1", nome: "Dr. Roberto Carvalho", crm: "CRM 54.321-SP", especialidade: "Clínica Geral", iniciais: "RC", cor: "hsl(207, 90%, 54%)", status: "online", atendimentosHoje: 8, atendimentosMes: 142, avaliacao: 4.9 },
  { id: "2", nome: "Dra. Carla Santos", crm: "CRM 67.890-SP", especialidade: "Pediatria", iniciais: "CS", cor: "hsl(152, 60%, 40%)", status: "online", atendimentosHoje: 6, atendimentosMes: 118, avaliacao: 4.8 },
  { id: "3", nome: "Dr. Fábio Lima", crm: "CRM 43.210-SP", especialidade: "Cardiologia", iniciais: "FL", cor: "hsl(174, 60%, 40%)", status: "online", atendimentosHoje: 5, atendimentosMes: 97, avaliacao: 4.7 },
  { id: "4", nome: "Dra. Paula Costa", crm: "CRM 78.432-SP", especialidade: "Dermatologia", iniciais: "PC", cor: "hsl(270, 50%, 45%)", status: "offline", atendimentosHoje: 4, atendimentosMes: 88, avaliacao: 4.9 },
  { id: "5", nome: "Dr. Marcos Oliveira", crm: "CRM 91.234-SP", especialidade: "Ortopedia", iniciais: "MO", cor: "hsl(152, 60%, 40%)", status: "online", atendimentosHoje: 7, atendimentosMes: 103, avaliacao: 4.6 },
  { id: "6", nome: "Dra. Tatiana Alves", crm: "CRM 55.678-SP", especialidade: "Ginecologia", iniciais: "TA", cor: "hsl(39, 55%, 35%)", status: "offline", atendimentosHoje: 0, atendimentosMes: 76, avaliacao: 5.0 },
];
