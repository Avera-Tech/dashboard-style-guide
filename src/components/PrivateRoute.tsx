import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * PrivateRoute
 *
 * Envolve rotas que exigem autenticação.
 * - Se ainda está verificando o token salvo → mostra loading
 * - Se não autenticado → redireciona para /login
 * - Se autenticado → renderiza a rota normalmente
 *
 * Uso no App.tsx:
 *   <Route element={<PrivateRoute />}>
 *     <Route path="/" element={<Index />} />
 *     <Route path="/alunos" element={<Alunos />} />
 *     ...
 *   </Route>
 */
const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;