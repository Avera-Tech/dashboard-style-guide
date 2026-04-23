import type { CreateUserPayload, UpdateUserPayload } from "../types/user";
import conectAPI from "@/utils/conectAPI";
import type UserRepository from "./userRepository";

export default class UserCollection implements UserRepository {
  async list(params?: {
    search?: string;
    status?: string;
    levelId?: number;
    page?: number;
    limit?: number;
  }) {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.status) query.set("status", params.status);
    if (params?.levelId) query.set("level_id", String(params.levelId));
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString() ? `?${query.toString()}` : "";
    return conectAPI(`/users${qs}`, "GET");
  }

  async getById(id: number) {
    return conectAPI(`/users/${id}`, "GET");
  }

  async create(user: CreateUserPayload) {
    return conectAPI("/users", "POST", user);
  }

  async update(id: number, user: UpdateUserPayload) {
    return conectAPI(`/users/${id}`, "PATCH", user);
  }

  async deactivate(id: number) {
    return conectAPI(`/users/${id}`, "DELETE");
  }

  async listDropdown(): Promise<{ data: { id: number; name: string }[] }> {
    return conectAPI("/users/dropdown", "GET");
  }

  async listLevels() {
    return conectAPI("/users/levels", "GET");
  }
}
