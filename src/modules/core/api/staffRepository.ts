import type { Staff } from "../types/staff";

export default interface StaffRepository {
    list(): Promise<{data: Staff[]}>;
    getById(id: string): Promise<Staff>;
    create(staff: Staff): Promise<Staff>;
    update(id: string, staff: Staff): Promise<Staff>;
    delete(id: string): Promise<void>;
}
