export default async function conectAPI(url: string, method: string, body?: any) {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/api${url}`, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...(body ? { 'Content-Type': 'application/json' } : {}),
        }
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
    }

    return response.json();
}