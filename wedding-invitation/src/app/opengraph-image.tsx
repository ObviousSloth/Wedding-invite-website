import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const alt = 'Jessika & Randy';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const cinzelFont = readFileSync(
    path.join(process.cwd(), 'public/fonts/Cinzel-Regular.woff2')
  );

  const monogramSvg = readFileSync(
    path.join(process.cwd(), 'public/svgs/decorative/monogram.svg'),
    'utf-8'
  );
  const monogramBase64 = `data:image/svg+xml;base64,${Buffer.from(monogramSvg).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#F5F0E8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          fontFamily: 'Cinzel',
        }}
      >
        {/* decorative top line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '120px', height: '1px', background: '#6B2737' }} />
          <div style={{ width: '6px', height: '6px', background: '#6B2737', borderRadius: '50%' }} />
          <div style={{ width: '120px', height: '1px', background: '#6B2737' }} />
        </div>

        {/* monogram */}
        <img
          src={monogramBase64}
          width={180}
          height={180}
          style={{ objectFit: 'contain', filter: 'invert(18%) sepia(40%) saturate(800%) hue-rotate(310deg) brightness(60%)' }}
        />

        {/* names */}
        <div
          style={{
            color: '#6B2737',
            fontSize: '64px',
            letterSpacing: '0.12em',
            display: 'flex',
          }}
        >
          Jessika &amp; Randy
        </div>

        {/* date + location */}
        <div
          style={{
            color: '#6B2737',
            fontSize: '24px',
            letterSpacing: '0.2em',
            opacity: 0.75,
            display: 'flex',
          }}
        >
          19 · XII · 2026 · MADRID
        </div>

        {/* decorative bottom line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '120px', height: '1px', background: '#6B2737' }} />
          <div style={{ width: '6px', height: '6px', background: '#6B2737', borderRadius: '50%' }} />
          <div style={{ width: '120px', height: '1px', background: '#6B2737' }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Cinzel',
          data: cinzelFont,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
