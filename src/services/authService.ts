const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  expiresIn: string;
  user: AuthUser;
}

export interface RegisterResponse {
  success: boolean;
  user: AuthUser;
}

export interface ApiError {
  success: false;
  error: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    const err = data as ApiError;
    throw new Error(err.error || "Erro inesperado");
  }
  return data as T;
}

// ─── Auth Service ─────────────────────────────────────────────────────────────

export const authService = {
  /**
   * POST /api/auth/login
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse<AuthResponse>(res);
  },

  /**
   * POST /api/auth/register
   */
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse<RegisterResponse>(res);
  },

  /**
   * GET /api/auth/me
   * Busca o usuário autenticado usando o token salvo
   */
  async me(token: string): Promise<AuthUser> {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse<{ success: boolean; user: AuthUser }>(res);
    return data.user;
  },

  /**
   * POST /api/auth/refresh
   * Renova o token usando o refreshToken
   */
  async refresh(refreshToken: string): Promise<{ token: string; expiresIn: string }> {
    const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    return handleResponse<{ token: string; expiresIn: string }>(res);
  },
};