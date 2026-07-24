import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Fresh module per test: the logger keeps a module-level buffer, and env is
// read lazily, so each test imports its own instance after setting env.
async function freshLogger() {
  vi.resetModules();
  return (await import('@/lib/logger')).log;
}

describe('lib/logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.ELASTIC_URL;
    delete process.env.ELASTIC_API_KEY;
    delete process.env.ELASTIC_DATASET;
  });

  it('ships ECS docs to the Elastic bulk API on flush', async () => {
    process.env.ELASTIC_URL = 'https://elastic.example.com/';
    process.env.ELASTIC_API_KEY = 'test-key';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 200 }));

    const log = await freshLogger();
    log.info('lead captured', { route: '/api/contact', email: 'ada@company.com' });
    await log.flush();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://elastic.example.com/_bulk');
    expect((init.headers as Record<string, string>).authorization).toBe('ApiKey test-key');

    const [action, doc] = String(init.body).trim().split('\n').map((l) => JSON.parse(l));
    expect(action).toEqual({ create: { _index: 'logs-rumedominic.site-default' } });
    expect(doc.message).toBe('lead captured');
    expect(doc['log.level']).toBe('info');
    expect(doc['service.name']).toBe('rumedominic-site');
    expect(doc.route).toBe('/api/contact');
    expect(doc['@timestamp']).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('ships error-level lines immediately, without an explicit flush', async () => {
    process.env.ELASTIC_URL = 'https://elastic.example.com';
    process.env.ELASTIC_API_KEY = 'test-key';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 200 }));

    const log = await freshLogger();
    log.error('store failed', { route: '/api/newsletter' });
    await vi.waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));
  });

  it('honours ELASTIC_DATASET for the target data stream', async () => {
    process.env.ELASTIC_URL = 'https://elastic.example.com';
    process.env.ELASTIC_API_KEY = 'test-key';
    process.env.ELASTIC_DATASET = 'custom.dataset';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 200 }));

    const log = await freshLogger();
    log.info('hello');
    await log.flush();

    const [action] = String((fetchSpy.mock.calls[0][1] as RequestInit).body)
      .trim()
      .split('\n')
      .map((l) => JSON.parse(l));
    expect(action).toEqual({ create: { _index: 'logs-custom.dataset-default' } });
  });

  it('ships nothing when Elastic is not configured, but still logs to console', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');

    const log = await freshLogger();
    log.info('quiet');
    await log.flush();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('never throws when the bulk request fails', async () => {
    process.env.ELASTIC_URL = 'https://elastic.example.com';
    process.env.ELASTIC_API_KEY = 'test-key';
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network down'));

    const log = await freshLogger();
    log.info('still fine');
    await expect(log.flush()).resolves.toBeUndefined();
  });
});
