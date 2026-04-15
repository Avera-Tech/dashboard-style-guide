export default async function conectAPI(url: string, method: string, body?: any) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklkIjoyLCJlbWFpbCI6InIuc291emEwNkBob3RtYWlsLmNvbSIsImlhdCI6MTc3NjE4NjkzMywiZXhwIjoxNzc2MjczMzMzfQ.lUlsFDAyjdWUncRZR9En6cMKXCE4He3X9J0uK8NYTR0";
    if (!token) return;

    const response = await fetch(`http://localhost:3000/api${url}`, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Authorization': `Bearer ${token}`,
            ...(body ? { 'Content-Type': 'application/json' } : {}),
        }
    });
    return response.json();
}