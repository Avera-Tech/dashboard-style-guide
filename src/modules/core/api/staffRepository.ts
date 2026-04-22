import type { Staff } from "../types/staff";

export default interface StaffRepository {
  list(): Promise<{ data: Staff[]; meta: { total: number; page: number; limit: number; totalPages: number } }>;
  getById(id: string): Promise<{ data: Staff }>;
  create(staff: Partial<Staff> & { password: string; role: string }): Promise<{ data: Staff }>;
  update(id: string, staff: Partial<Staff> & { role?: string }): Promise<{ data: Staff }>;
  deactivate(id: string): Promise<void>;
}
