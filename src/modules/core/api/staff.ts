import type { Staff } from "../types/staff";
import conectAPI from "@/utils/conectAPI";
import StaffRepository from "./staffRepository";

export default class StaffCollection implements StaffRepository {
  async list() {
    return conectAPI("/staff", "GET");
  }

  async getById(id: string) {
    return conectAPI(`/staff/${id}`, "GET");
  }

  async create(staff: Partial<Staff> & { password: string; role: string }) {
    return conectAPI("/staff", "POST", staff);
  }

  async update(id: string, staff: Partial<Staff> & { role?: string }) {
    return conectAPI(`/staff/${id}`, "PATCH", staff);
  }

  async deactivate(id: string): Promise<void> {
    return conectAPI(`/staff/${id}/deactivate`, "PATCH");
  }
}
