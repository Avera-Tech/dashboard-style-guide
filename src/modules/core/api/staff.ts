import { Staff } from "../types/staff";
import conectAPI from "@/utils/conectAPI";
import StaffRepository from "./staffRepository";

export default class StaffCollection implements StaffRepository {
    async list(): Promise<{data: Staff[]}> {
        return conectAPI("/staff", "GET");
    }

    async getById(id: string): Promise<Staff> {
        return conectAPI(`/staff/${id}`, "GET");
    }

    async create(staff: Staff): Promise<Staff> {
        return conectAPI("/staff", "POST", staff);
    }

    async update(id: string, staff: Staff): Promise<Staff> {
        return conectAPI(`/staff/${id}`, "PATCH", staff);
    }

    async delete(id: string): Promise<void> {
        return conectAPI(`/staff/${id}`, "DELETE");
    }
}