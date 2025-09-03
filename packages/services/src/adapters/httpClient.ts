export const httpClient = {
  async get(url: string, options?: RequestInit) {
    const res = await fetch(url, { method: 'GET', ...(options || {}) });
    if (!res.ok) throw new Error('Network error');
    return res.json();
  },
};
