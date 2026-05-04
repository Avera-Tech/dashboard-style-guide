import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import NotFound from "@/modules/core/pages/NotFound";

const RESERVED = new Set([
  "login", "forgot-password", "reset-password", "verify",
  "404", "not-found", "m", "api",
]);

export interface TenantTheme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  logo: string | null;
  favicon: string | null;
}

interface ClientContextType {
  clientId: string;
  tenant: TenantTheme | null;
}

const ClientContext = createContext<ClientContextType>({ clientId: "", tenant: null });

// Converte hex (#RRGGBB) para o formato HSL do Tailwind: "H S% L%"
function hexToHsl(hex: string): string {
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function applyTheme(theme: TenantTheme) {
  const root = document.documentElement;
  const primary = hexToHsl(theme.primaryColor);
  const accent  = hexToHsl(theme.accentColor);

  root.style.setProperty("--primary",           primary);
  root.style.setProperty("--ring",               primary);
  root.style.setProperty("--sidebar-primary",    primary);
  root.style.setProperty("--sidebar-ring",       primary);
  root.style.setProperty("--accent",             accent);

  if (theme.favicon) {
    const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (link) link.href = theme.favicon;
  }
}

const cacheKey = (clientId: string) => `tenant:${clientId}`;

function getCached(clientId: string): TenantTheme | null {
  try {
    const raw = localStorage.getItem(cacheKey(clientId));
    return raw ? (JSON.parse(raw) as TenantTheme) : null;
  } catch {
    return null;
  }
}

async function fetchTenant(clientId: string): Promise<TenantTheme | null> {
  const base = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
  const res  = await fetch(`${base}/api/public/tenant/${clientId}`);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.found) return null;

  return {
    name:            data.name            ?? clientId,
    primaryColor:    data.primaryColor    ?? "#6366f1",
    secondaryColor:  data.secondaryColor  ?? "#8b5cf6",
    accentColor:     data.accentColor     ?? "#06b6d4",
    backgroundColor: data.backgroundColor ?? "#ffffff",
    textColor:       data.textColor       ?? "#0f172a",
    logo:            data.logo            ?? null,
    favicon:         data.favicon         ?? null,
  };
}

const EMPTY_THEME: TenantTheme = {
  name: "",
  primaryColor: "",
  secondaryColor: "",
  accentColor: "",
  backgroundColor: "",
  textColor: "",
  logo: null,
  favicon: null,
};

function saveThemeToStorage(theme: TenantTheme | null) {
  localStorage.setItem("theme", JSON.stringify(theme ?? EMPTY_THEME));
}

export function ClientProvider() {
  const { clientId = "" } = useParams<{ clientId: string }>();
  const isReserved = !clientId || RESERVED.has(clientId);

  const cached = isReserved ? null : getCached(clientId);

  const [tenant,   setTenant]   = useState<TenantTheme | null>(cached);
  const [notFound, setNotFound] = useState(false);
  // Só bloqueia renderização se não há cache — caso contrário usa o cache imediatamente
  const [loading,  setLoading]  = useState(!isReserved && !cached);

  useEffect(() => {
    if (isReserved) {
      saveThemeToStorage(null);
      return;
    }

    localStorage.setItem("clientId", clientId);

    // Aplica cache imediatamente enquanto o fetch acontece em background
    if (cached) {
      applyTheme(cached);
      saveThemeToStorage(cached);
    } else {
      saveThemeToStorage(null);
    }

    fetchTenant(clientId)
      .then((fresh) => {
        if (!fresh) {
          setNotFound(true);
          return;
        }
        localStorage.setItem(cacheKey(clientId), JSON.stringify(fresh));
        saveThemeToStorage(fresh);
        setTenant(fresh);
        applyTheme(fresh);
      })
      .catch(() => {
        // Erro de rede: se há cache, segue; se não há, bloqueia com 404
        if (!cached) setNotFound(true);
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  const contextValue = useMemo(() => ({ clientId, tenant }), [clientId, tenant]);

  if (isReserved || notFound) return <NotFound />;
  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );

  return (
    <ClientContext.Provider value={contextValue}>
      <Outlet />
    </ClientContext.Provider>
  );
}

export function useClientId() {
  return useContext(ClientContext).clientId;
}

export function useTenant() {
  return useContext(ClientContext).tenant;
}
