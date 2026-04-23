export interface UserLevel {
  id: number;
  name: string;
  color: string | null;
}

export interface GuardianUser {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
}

export interface Guardian {
  id?: number;
  guardianUserId?: number | null;
  guardianUser?: GuardianUser | null;
  name?: string | null;
  phone?: string | null;
  document?: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  document?: string | null;
  birthday?: string | null;
  height?: number | null;
  weight?: number | null;
  levelId?: number | null;
  level?: UserLevel | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  guardian?: Guardian | null;
  isMinor?: boolean;
  status: "active" | "inactive" | "pending";
  active: boolean;
  availableCredits?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  phone?: string;
  document?: string;
  birthday?: string;
  levelId?: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  guardian?: Guardian | null;
  isMinor?: boolean;
  status?: "active" | "inactive" | "pending";
  active?: boolean;
}

export type UpdateUserPayload = Partial<CreateUserPayload>;
