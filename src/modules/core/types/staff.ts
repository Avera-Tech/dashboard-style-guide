export interface StaffRole {
  id: number;
  name: string;
  slug: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  roles: StaffRole[];
  active: boolean;
  phone?: string | null;
  employeeLevel?: string | null;
  emailVerified?: boolean;
  lastLogin?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
