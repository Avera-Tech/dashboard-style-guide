// ─── Tipos da API (backend) ───────────────────────────────────────────────────

export interface ApiTeacher {
  id: number;
  name: string;
  email: string;
}

export interface ApiProductType {
  id: number;
  name: string;
  color?: string | null;
  description?: string | null;
}

export interface ApiPlace {
  id: number;
  name: string;
}

export interface ApiEnrollment {
  id: number;
  user_id: number;
  status: "enrolled" | "attended" | "cancelled" | "missed";
  checkin: boolean;
  checkin_at: string | null;
  student?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ApiClass {
  id: number;
  staff_id: number;
  product_type_id: number;
  place_id: number | null;
  date: string;           // "YYYY-MM-DD"
  time: string;           // "HH:mm:ss"
  limit: number;
  spots_taken: number;
  spots_available: number;
  has_commission: boolean;
  kickback_rule: string | null;
  kickback: number | null;
  active: boolean;
  cancelled: boolean;
  cancel_reason: string | null;
  createdAt: string;
  updatedAt: string;
  teacher?: ApiTeacher;
  productType?: ApiProductType;
  place?: ApiPlace;
  enrollments?: ApiEnrollment[];
}

export interface ApiClassListResponse {
  success: boolean;
  data: ApiClass[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiClassResponse {
  success: boolean;
  data: ApiClass;
}

export interface ApiClassMutationResponse {
  success: boolean;
  data: ApiClass;
  message: string;
}

export interface ApiMessageResponse {
  success: boolean;
  message: string;
}

export interface ApiEnrollmentListResponse {
  success: boolean;
  data: ApiEnrollment[];
  counts: {
    total: number;
    enrolled: number;
    attended: number;
    cancelled: number;
    missed: number;
  };
}

// ─── Payloads de criação/atualização ─────────────────────────────────────────

export interface CreateClassPayload {
  staff_id: number;
  product_type_id: number;
  place_id?: number | null;
  date: string;           // "YYYY-MM-DD"
  time: string;           // "HH:mm"
  limit: number;
  has_commission?: boolean;
  kickback_rule?: string | null;
  kickback?: number | null;
}

export interface UpdateClassPayload {
  staff_id?: number;
  product_type_id?: number;
  place_id?: number | null;
  date?: string;
  time?: string;
  limit?: number;
  has_commission?: boolean;
  kickback_rule?: string | null;
  kickback?: number | null;
  active?: boolean;
}

// ─── Tipo de exibição no frontend ────────────────────────────────────────────

export interface Aula {
  id: string;
  turmaId: string;
  turmaNome: string;
  modalidade: string;
  nivel: string;
  professorId: string;
  professorNome: string;
  data: string;           // "YYYY-MM-DD"
  horarioInicio: string;  // "HH:mm"
  horarioFim: string;
  status: "agendada" | "realizada" | "cancelada";
  motivoCancelamento?: string;
  observacoes?: string;
  maxAlunos: number;
  spots_available: number;
  presencas: Presenca[];
  lugar?: string;
}

export interface Presenca {
  alunoId: string;
  alunoNome: string;
  status: "presente" | "ausente" | "justificado" | "pendente";
}

export type AulaStatus = Aula["status"];
export type PresencaStatus = Presenca["status"];