/**
 * Structured server-side logger. Every line is printed to the console as JSON
 * (picked up by Cloud Run / Vercel log collection) and, when ELASTIC_URL +
 * ELASTIC_API_KEY are set, shipped to Elasticsearch in ECS format via the
 * _bulk API into the `logs-<dataset>-default` data stream. Shipping is
 * buffered and best-effort: a logging outage must never block or fail a
 * request, so every failure path here swallows silently.
 */

type Level = 'debug' | 'info' | 'warn' | 'error';
type Fields = Record<string, unknown>;
type EcsDoc = Fields & {
  '@timestamp': string;
  'log.level': Level;
  message: string;
};

// Flush when the buffer reaches this size, or FLUSH_MS after the first
// buffered line — whichever comes first. Errors flush immediately so they
// survive a serverless instance being frozen right after the response.
const MAX_BUFFER = 20;
const FLUSH_MS = 1000;

const buffer: EcsDoc[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

/** Read config lazily so tests (and late env injection) are respected. */
function elasticConfig() {
  const url = process.env.ELASTIC_URL;
  const apiKey = process.env.ELASTIC_API_KEY;
  if (!url || !apiKey) return null;
  const dataset = process.env.ELASTIC_DATASET || 'rumedominic.site';
  return { url: url.replace(/\/+$/, ''), apiKey, dataset };
}

async function flush(): Promise<void> {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  const cfg = elasticConfig();
  const docs = buffer.splice(0, buffer.length);
  if (!cfg || docs.length === 0) return;

  const index = `logs-${cfg.dataset}-default`;
  // Data streams accept only `create` ops.
  const body =
    docs.map((d) => `${JSON.stringify({ create: { _index: index } })}\n${JSON.stringify(d)}`).join('\n') +
    '\n';

  try {
    await fetch(`${cfg.url}/_bulk`, {
      method: 'POST',
      headers: {
        authorization: `ApiKey ${cfg.apiKey}`,
        'content-type': 'application/x-ndjson',
      },
      body,
    });
  } catch {
    // Logging must never throw; the console mirror above still has the lines.
  }
}

function emit(level: Level, message: string, fields?: Fields): void {
  const cfg = elasticConfig();
  const doc: EcsDoc = {
    '@timestamp': new Date().toISOString(),
    'log.level': level,
    message,
    'service.name': 'rumedominic-site',
    'event.dataset': cfg?.dataset ?? 'rumedominic.site',
    ...fields,
  };

  const line = JSON.stringify(doc);
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);

  if (!cfg) return;
  buffer.push(doc);
  if (level === 'error' || buffer.length >= MAX_BUFFER) {
    void flush();
  } else if (!flushTimer) {
    flushTimer = setTimeout(() => void flush(), FLUSH_MS);
    // Never keep a serverless process alive just to ship logs.
    flushTimer.unref?.();
  }
}

export const log = {
  debug: (message: string, fields?: Fields) => emit('debug', message, fields),
  info: (message: string, fields?: Fields) => emit('info', message, fields),
  warn: (message: string, fields?: Fields) => emit('warn', message, fields),
  error: (message: string, fields?: Fields) => emit('error', message, fields),
  /** Force-ship anything buffered. Await at the end of long-running handlers. */
  flush,
};
