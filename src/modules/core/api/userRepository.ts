import type { User, UserLevel, CreateUserPayload, UpdateUserPayload } from "../types/user";

export default interface UserRepository {
  list(params?: {
    search?: string;
    status?: string;
    levelId?: number;
    page?: number;
    limit?: number;
  }): Promise<{
    data: User[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }>;
  getById(id: number): Promise<{ data: User }>;
  create(user: CreateUserPayload): Promise<{ data: User; message: string }>;
  update(id: number, user: UpdateUserPayload): Promise<{ data: User; message: string }>;
  deactivate(id: number): Promise<{ message: string }>;
  listLevels(): Promise<{ data: UserLevel[] }>;
}
