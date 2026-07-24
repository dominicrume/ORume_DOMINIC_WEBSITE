// Winston transport that ships logs to Elasticsearch via the _bulk API into
// the logs-<dataset>-default data stream. Buffered and best-effort: an Elastic
// outage never blocks the pipeline (H6), and config is read at flush time so
// it works no matter when dotenv loads. Without ELASTIC_URL + ELASTIC_API_KEY
// it silently drops its buffer and the console/file transports carry on alone.
import Transport from 'winston-transport'

const MAX_BUFFER = 50
const FLUSH_MS = 2000

function config() {
  const url = process.env.ELASTIC_URL
  const apiKey = process.env.ELASTIC_API_KEY
  if (!url || !apiKey) return null
  return { url: url.replace(/\/+$/, ''), apiKey, dataset: process.env.ELASTIC_DATASET || 'rumedominic.growth-brain' }
}

export class ElasticTransport extends Transport {
  constructor(opts = {}) {
    super(opts)
    this.buffer = []
    this.timer = null
  }

  log(info, callback) {
    setImmediate(() => this.emit('logged', info))
    const { level, message, timestamp, ...meta } = info
    this.buffer.push({
      '@timestamp': new Date().toISOString(),
      'log.level': level,
      message,
      'service.name': 'living-engine',
      'event.dataset': config()?.dataset ?? 'rumedominic.growth-brain',
      ...meta,
    })
    if (this.buffer.length >= MAX_BUFFER || level === 'error') {
      this.flush()
    } else if (!this.timer) {
      this.timer = setTimeout(() => this.flush(), FLUSH_MS)
      this.timer.unref?.()
    }
    callback()
  }

  async flush() {
    if (this.timer) { clearTimeout(this.timer); this.timer = null }
    const cfg = config()
    const docs = this.buffer.splice(0, this.buffer.length)
    if (!cfg || docs.length === 0) return

    const index = `logs-${cfg.dataset}-default`
    const body = docs.map(d => `${JSON.stringify({ create: { _index: index } })}\n${JSON.stringify(d)}`).join('\n') + '\n'
    try {
      await fetch(`${cfg.url}/_bulk`, {
        method: 'POST',
        headers: { authorization: `ApiKey ${cfg.apiKey}`, 'content-type': 'application/x-ndjson' },
        body,
      })
    } catch {
      // Never log a shipping failure through winston — that would loop.
    }
  }
}
