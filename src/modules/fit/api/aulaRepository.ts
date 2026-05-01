import type {
  ApiClassListResponse,
  ApiClassResponse,
  ApiClassMutationResponse,
  ApiMessageResponse,
  ApiEnrollmentListResponse,
  CreateClassPayload,
  UpdateClassPayload,
} from "../types/aula";

export default interface AulaRepository {
  list(params?: {
    date?: string;
    staff_id?: number;
    product_type_id?: number;
    place_id?: number;
    active?: boolean;
    page?: number;
    limit?: number;
  }): Promise<ApiClassListResponse>;

  getById(id: number): Promise<ApiClassResponse>;

  create(payload: CreateClassPayload): Promise<ApiClassMutationResponse>;

  update(id: number, payload: UpdateClassPayload): Promise<ApiClassMutationResponse>;

  cancel(id: number, reason?: string): Promise<ApiMessageResponse>;

  remove(id: number): Promise<ApiMessageResponse>;

  listEnrollments(classId: number, status?: string): Promise<ApiEnrollmentListResponse>;

  enrollStudent(classId: number, userId: number): Promise<{ success: boolean; data: unknown; message: string }>;

  cancelEnrollment(classId: number, enrollmentId: number): Promise<ApiMessageResponse>;

  checkin(classId: number, userId: number): Promise<{ success: boolean; data: unknown; message: string }>;
}