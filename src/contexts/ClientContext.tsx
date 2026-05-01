import { createContext, useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import NotFound from "@/modules/core/pages/NotFound";

const RESERVED = new Set([
  "login", "forgot-password", "reset-password", "verify",
  "404", "not-found", "m", "api",
]);

interface ClientContextType {
  clientId: string;
}

const ClientContext = createContext<ClientContextType>({ clientId: "" });

export function ClientProvider() {
  const { clientId = "" } = useParams<{ clientId: string }>();
  const isReserved = !clientId || RESERVED.has(clientId);

  useEffect(() => {
    if (!isReserved) localStorage.setItem("clientId", clientId);
  }, [clientId, isReserved]);

  if (isReserved) return <NotFound />;

  return (
    <ClientContext.Provider value={{ clientId }}>
      <Outlet />
    </ClientContext.Provider>
  );
}

export function useClientId() {
  return useContext(ClientContext).clientId;
}
