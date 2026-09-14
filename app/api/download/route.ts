import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { GATED_DOCS, verifyToken } from '@/lib/download-token';
import { log } from '@/lib/logger';

export const runtime = 'nodejs';

/**
 * Serves a gated asset to a caller holding a valid token.
 *
 * The files live in `private-assets/`, outside `public/`, so this route is the
 * only path to them. `next.config.mjs` traces that directory into the function
 * bundle; without that the file exists locally and 404s in production.
 */
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('t');
  const result = verifyToken(token);

  if (!result.ok) {
    log.warn('gated download refused', { route: '/api/download', reason: result.reason });
    // An expired link is a recoverable, common case and deserves a different
    // message from a forged one.
    const expired = result.reason === 'expired';
    return NextResponse.json(
      {
        error: expired
          ? 'This download link has expired. Request it again and we will send a fresh one.'
          : 'This download link is not valid.',
      },
      { status: expired ? 410 : 403 },
    );
  }

  const meta = GATED_DOCS[result.doc];

  let file: Buffer;
  try {
    file = await readFile(path.join(process.cwd(), 'private-assets', meta.file));
  } catch (err) {
    log.error('gated asset missing on disk', {
      route: '/api/download',
      doc: result.doc,
      file: meta.file,
      reason: String(err),
    });
    await log.flush();
    return NextResponse.json({ error: 'That document is temporarily unavailable.' }, { status: 500 });
  }

  log.info('gated download served', {
    route: '/api/download',
    doc: result.doc,
    email: result.email,
  });
  await log.flush();

  // HTTP header values are Latin-1. The pretty filename contains an em-dash, so
  // send an ASCII fallback plus the RFC 5987 encoded form for clients that read
  // it. Sending only the pretty one throws before a byte reaches the browser.
  const asciiName = meta.filename.replace(/[^\x20-\x7E]/g, '-').replace(/"/g, '');
  const disposition =
    `attachment; filename="${asciiName}"; ` +
    `filename*=UTF-8''${encodeURIComponent(meta.filename)}`;

  return new NextResponse(new Uint8Array(file), {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': disposition,
      'content-length': String(file.byteLength),
      // Signed, expiring and per-lead: never let a shared cache hold it.
      'cache-control': 'private, no-store',
    },
  });
}
