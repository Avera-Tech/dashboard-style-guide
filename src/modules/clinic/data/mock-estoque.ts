export interface InsumoEstoque {
  id: string;
  codigo: string;
  item: string;
  categoria: string;
  qtdAtual: number;
  minimo: number;
  status: "critico" | "atencao" | "normal";
  ultimaEntrada: string;
}

export const MOCK_ESTOQUE: InsumoEstoque[] = [
  { id: "1", codigo: "INS-001", item: "Luvas descartáveis (cx 100)", categoria: "EPI", qtdAtual: 3, minimo: 10, status: "critico", ultimaEntrada: "10/02/2026" },
  { id: "2", codigo: "INS-002", item: "Álcool gel 70% (500ml)", categoria: "Higiene", qtdAtual: 2, minimo: 15, status: "critico", ultimaEntrada: "08/02/2026" },
  { id: "3", codigo: "INS-003", item: "Máscaras cirúrgicas (cx 50)", categoria: "EPI", qtdAtual: 4, minimo: 20, status: "critico", ultimaEntrada: "05/02/2026" },
  { id: "4", codigo: "INS-004", item: "Seringas 5ml (cx 100)", categoria: "Descartável", qtdAtual: 22, minimo: 20, status: "normal", ultimaEntrada: "15/02/2026" },
  { id: "5", codigo: "INS-005", item: "Esparadrapo 5x4,5 (rolo)", categoria: "Curativo", qtdAtual: 18, minimo: 10, status: "normal", ultimaEntrada: "12/02/2026" },
  { id: "6", codigo: "INS-006", item: "Papel para ECG (rolo)", categoria: "Equipamento", qtdAtual: 8, minimo: 5, status: "atencao", ultimaEntrada: "18/02/2026" },
];
