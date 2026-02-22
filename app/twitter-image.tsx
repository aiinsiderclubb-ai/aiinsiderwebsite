import { ImageResponse } from 'next/og';
import { SITE_NAME } from './lib/site';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #050505 0%, #0B0B0F 40%, #050505 100%)',
          position: 'relative',
          color: 'white',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\"',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
            opacity: 0.25,
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: 920,
            height: 920,
            borderRadius: 9999,
            left: -260,
            top: -340,
            background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 62%)',
            filter: 'blur(10px)',
            opacity: 0.9,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 760,
            height: 760,
            borderRadius: 9999,
            right: -240,
            bottom: -320,
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 62%)',
            filter: 'blur(10px)',
            opacity: 0.8,
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 64,
            right: 64,
            width: 96,
            height: 96,
            borderRadius: 28,
            background: 'rgba(255,255,255,0.92)',
            color: '#0B0B0F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 900,
            letterSpacing: -1,
            boxShadow: '0 0 40px rgba(255,255,255,0.18)',
          }}
        >
          AI
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 980 }}>
          <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: -1.2, lineHeight: 1 }}>
            {SITE_NAME}
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: 'rgba(255,255,255,0.78)', letterSpacing: -0.4 }}>
            AI automation • AI agents • Voice agents • n8n workflows
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, color: 'rgba(255,255,255,0.58)' }}>
            Switzerland-based, working globally
          </div>
        </div>
      </div>
    ),
    size
  );
}

