import { describe, expect, it, vi } from 'vitest';
import { httpClient } from '@services/adapters/httpClient';

describe('httpClient', () => {
  it('effectue un GET avec fetch', async () => {
    const mock = vi.fn().mockResolvedValue({ ok: true, json: () => ({}) });
    vi.stubGlobal('fetch', mock);

    await httpClient.get('/api/status');
    expect(mock).toHaveBeenCalledWith('/api/status', expect.any(Object));
  });
});
