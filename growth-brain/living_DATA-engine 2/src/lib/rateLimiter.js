// LIVING ENGINE — Rate Limiter (H4)
import { RateLimiterMemory } from 'rate-limiter-flexible'

const make = (rpm) => new RateLimiterMemory({ points: rpm, duration: 60 })

export const limiters = {
  serpapi: make(Number(process.env.SERPAPI_RPM) || 8),
  hunter:  make(Number(process.env.HUNTER_RPM)  || 25),
  apollo:  make(Number(process.env.APOLLO_RPM)  || 15),
  keepa:   make(Number(process.env.KEEPA_RPM)   || 4),
  ch:      make(18),
  claude:  make(45),
  default: make(8),
}

export async function withLimit(source, fn) {
  const limiter = limiters[source] || limiters.default
  await limiter.consume(1)
  return fn()
}

export const delay = (ms) => new Promise(r => setTimeout(r, ms))
