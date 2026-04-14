export interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  phone?: string | null;
  employeeLevel?: string | null;
  createdAt?: string;
  updatedAt?: string;
}