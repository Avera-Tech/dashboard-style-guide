import conectAPI from "@/utils/conectAPI";
import type AulaRepository from "./aulaRepository";
import type { CreateClassPayload, UpdateClassPayload } from "../types/aula";

export default class AulaCollection implements AulaRepository {
  async list(params?: {
    date?: string;
    staff_id?: number;
    product_type_id?: number;
    place_id?: number;
    active?: boolean;
    page?: number;
    limit?: number;
  }) {
    const query = new URLSearchParams();
    if (params?.date)             query.set("date", params.date);
    if (params?.staff_id)         query.set("staff_id", String(params.staff_id));
    if (params?.product_type_id)  query.set("product_type_id", String(params.product_type_id));
    if (params?.place_id)         query.set("place_id", String(params.place_id));
    if (params?.active !== undefined) query.set("active", String(params.active));
    if (params?.page)             query.set("page", String(params.page));
    if (params?.limit)            query.set("limit", String(params.limit));
    const qs = query.toString() ? `?${query.toString()}` : "";
    return conectAPI(`/classes${qs}`, "GET");
  }

  async getById(id: number) {
    return conectAPI(`/classes/${id}`, "GET");
  }

  async create(payload: CreateClassPayload) {
    return conectAPI("/classes", "POST", payload);
  }

  async update(id: number, payload: UpdateClassPayload) {
    return conectAPI(`/classes/${id}`, "PATCH", payload);
  }

  async cancel(id: number, reason?: string) {
    return conectAPI(`/classes/${id}/cancel`, "PATCH", reason ? { reason } : undefined);
  }

  async remove(id: number) {
    return conectAPI(`/classes/${id}`, "DELETE");
  }

  async listEnrollments(classId: number, status?: string) {
    const qs = status ? `?status=${status}` : "";
    return conectAPI(`/classes/${classId}/enrollments${qs}`, "GET");
  }

  async enrollStudent(classId: number, userId: number) {
    return conectAPI(`/classes/${classId}/enroll`, "POST", { user_id: userId });
  }

  async cancelEnrollment(classId: number, enrollmentId: number) {
    return conectAPI(`/classes/${classId}/enroll/${enrollmentId}/cancel`, "PATCH");
  }

  async checkin(classId: number, userId: number) {
    return conectAPI(`/classes/${classId}/checkin`, "POST", { user_id: userId });
  }
}