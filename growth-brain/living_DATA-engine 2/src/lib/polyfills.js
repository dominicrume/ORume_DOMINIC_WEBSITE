// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE 2.0 — NODE V18 COMPATIBILITY POLYFILLS
// Enforces clean WebIDL File / Blob bindings for undici & AI SDKs
// ═══════════════════════════════════════════════════════════════

import { Blob, File } from 'node:buffer'

if (typeof globalThis.Blob === 'undefined') {
  globalThis.Blob = Blob
}

if (typeof globalThis.File === 'undefined') {
  globalThis.File = File || class File extends Blob {
    constructor(fileBits, fileName, options = {}) {
      super(fileBits, options)
      this.name = fileName
      this.lastModified = options.lastModified || Date.now()
    }
  }
}

export const polyfillsLoaded = true
