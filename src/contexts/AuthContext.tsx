import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { authService, AuthUser, LoginPayload, RegisterPayload } from "@/services/authService";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean; // true enquanto verifica o token salvo no localStorage
}

interface AuthContextValue extends AuthState {
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const TOKEN_KEY = "avera_token";
const REFRESH_TOKEN_KEY = "avera_refresh_token";

// ─── Contexto ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true, // começa carregando para verificar o token salvo
  });

  // ── Ao montar: verifica se há token salvo e busca o usuário ────────────────
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);

    if (!savedToken) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    authService
      .me(savedToken)
      .then((user) => {
        setState({
          user,
          token: savedToken,
          isAuthenticated: true,
          isLoading: false,
        });
      })
      .catch(() => {
        // Token inválido ou expirado — limpa tudo
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
      });
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (payload: LoginPayload) => {
    const data = await authService.login(payload);

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

    setState({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  // ── Register ───────────────────────────────────────────────────────────────
  // Apenas cria a conta — não faz login automático
  const register = useCallback(async (payload: RegisterPayload) => {
    await authService.register(payload);
    // Não salva token aqui. O usuário precisa fazer login após o cadastro.
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  }
  return ctx;
}