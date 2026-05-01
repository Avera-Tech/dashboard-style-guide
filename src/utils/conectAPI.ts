export default async function conectAPI(url: string, method: string, body?: any) {
    const token    = localStorage.getItem("token");
    const clientId = localStorage.getItem("clientId");

    const base = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
    const response = await fetch(`${base}/api${url}`, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            ...(token    ? { 'Authorization': `Bearer ${token}` } : {}),
            ...(clientId ? { 'X-Client-Id': clientId }           : {}),
            ...(body     ? { 'Content-Type': 'application/json' } : {}),
        }
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = clientId ? `/${clientId}/login` : "/login";
        return;
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message ?? `Erro ${response.status}`);
    }

    return data;
}