import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rume Dominic, AI and Blockchain Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0A0E1A 0%, #111629 58%, #1E90FF 140%)',
          color: '#F8FAFC',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ color: '#D8EAF6', fontSize: 30, letterSpacing: 2, marginBottom: 20 }}>
          RUME DOMINIC · VOREM
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          <span style={{ marginRight: 16 }}>Build AI &amp; Web3</span>
          <span style={{ color: '#D8EAF6', marginRight: 16 }}>High-leverage</span>
          <span style={{ color: '#6DB8FF', marginRight: 16 }}>7x faster</span>
          <span style={{ color: '#F8FAFC' }}>10x clearer.</span>
        </div>
        <div style={{ marginTop: 30, fontSize: 28, color: '#9AA5B8' }}>
          UK-based, operating globally · Enterprise-grade security
        </div>
      </div>
    ),
    { ...size },
  );
}
