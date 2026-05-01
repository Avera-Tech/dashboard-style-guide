import { Navigate, Outlet, useParams } from "react-router-dom";

export default function PrivateRoute() {
  const token = localStorage.getItem("token");
  const { clientId } = useParams<{ clientId: string }>();
  return token ? <Outlet /> : <Navigate to={`/${clientId}/login`} replace />;
}
