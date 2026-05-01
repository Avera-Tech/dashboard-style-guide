import { createContext, useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

interface ClientContextType {
  clientId: string;
}

const ClientContext = createContext<ClientContextType>({ clientId: "" });

export function ClientProvider() {
  const { clientId = "" } = useParams<{ clientId: string }>();

  useEffect(() => {
    if (clientId) localStorage.setItem("clientId", clientId);
  }, [clientId]);

  return (
    <ClientContext.Provider value={{ clientId }}>
      <Outlet />
    </ClientContext.Provider>
  );
}

export function useClientId() {
  return useContext(ClientContext).clientId;
}
