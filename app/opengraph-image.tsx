import { ImageResponse } from 'next/og';

// output: export requires the image route be statically generated.
export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Arif Adito — Business Growth Leader';

// Replaces the 404ing /og-image.png that every page pointed at.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '24px',
          background: '#050505',
          padding: '80px',
          borderTop: '10px solid #F27D26',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#A19E95',
            fontWeight: 700,
          }}
        >
          Business Growth Leader
        </div>
        <div style={{ display: 'flex', fontSize: 104, color: '#ffffff' }}>
          Arif Adito<span style={{ color: '#F27D26' }}>.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#A19E95', maxWidth: '900px', lineHeight: 1.4 }}>
          OTT &amp; platform growth, 0→1 in Bangladesh. AI-native operator and published researcher.
        </div>
      </div>
    ),
    size,
  );
}
