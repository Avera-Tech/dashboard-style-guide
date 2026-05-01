import type { ApiClass, Aula } from "../types/aula";

/**
 * Resolve o status de exibição da aula com base nos campos do backend.
 * Backend não tem campo `status` explícito — derivamos pela data e flag `cancelled`.
 */
function resolveStatus(cls: ApiClass): Aula["status"] {
  if (cls.cancelled) return "cancelada";
  const classDate = new Date(`${cls.date}T${cls.time}`);
  if (classDate < new Date()) return "realizada";
  return "agendada";
}

/**
 * Converte o status de matrícula (backend) para status de presença (frontend).
 */
function resolvePresencaStatus(
  enrollmentStatus: string,
  checkin: boolean
): Aula["presencas"][number]["status"] {
  if (checkin || enrollmentStatus === "attended") return "presente";
  if (enrollmentStatus === "cancelled")            return "ausente";
  if (enrollmentStatus === "missed")               return "ausente";
  return "pendente";
}

/**
 * Mapeia um ApiClass retornado pela API para o tipo Aula usado pelos componentes.
 */
export function mapApiClass(cls: ApiClass): Aula {
  return {
    id:              String(cls.id),
    turmaId:         String(cls.product_type_id),
    turmaNome:       cls.productType?.name ?? "—",
    modalidade:      cls.productType?.name ?? "—",
    nivel:           "—",                          // ⚠️ campo não existe no backend
    professorId:     String(cls.staff_id),
    professorNome:   cls.teacher?.name ?? "—",
    data:            cls.date,
    horarioInicio:   cls.time.slice(0, 5),          // "HH:mm:ss" → "HH:mm"
    horarioFim:      "—",                           // ⚠️ campo não existe no backend
    status:          resolveStatus(cls),
    motivoCancelamento: cls.cancel_reason ?? undefined,
    maxAlunos:       cls.limit,
    spots_available: cls.spots_available ?? cls.limit - cls.spots_taken,
    presencas: (cls.enrollments ?? []).map((e) => ({
      alunoId:   String(e.user_id),
      alunoNome: e.student?.name ?? "—",
      status:    resolvePresencaStatus(e.status, e.checkin),
    })),
    lugar: cls.place?.name,
  };
}