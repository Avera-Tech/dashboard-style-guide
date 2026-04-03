export interface Convenio {
  id: string;
  iniciais: string;
  nome: string;
  plano: string;
  pacientes: number;
  receitaMes: string;
  cor: string;
  status: "ativo" | "inativo";
}

export const MOCK_CONVENIOS: Convenio[] = [
  { id: "1", iniciais: "UN", nome: "Unimed", plano: "Plano coletivo", pacientes: 312, receitaMes: "R$42k", cor: "#3b82f6", status: "ativo" },
  { id: "2", iniciais: "BS", nome: "Bradesco", plano: "Plano individual", pacientes: 198, receitaMes: "R$28k", cor: "#16a34a", status: "ativo" },
  { id: "3", iniciais: "SA", nome: "SulAmérica", plano: "Plano empresarial", pacientes: 145, receitaMes: "R$19k", cor: "#1e3a5f", status: "ativo" },
  { id: "4", iniciais: "PT", nome: "Particular", plano: "Pagamento direto", pacientes: 540, receitaMes: "R$67k", cor: "#6b7280", status: "ativo" },
  { id: "5", iniciais: "CF", nome: "Fidelidade", plano: "Plano próprio", pacientes: 210, receitaMes: "R$18k", cor: "#0d9488", status: "ativo" },
  { id: "6", iniciais: "AM", nome: "Amil", plano: "Plano de saúde", pacientes: 89, receitaMes: "R$12k", cor: "#1e40af", status: "ativo" },
];
