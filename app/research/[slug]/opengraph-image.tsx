import { ImageResponse } from 'next/og';
import { RESEARCH_POSTS, getPost } from '@/lib/research-posts';

// output: export requires the image route be statically generated.
export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Research by Arif Adito';

export function generateStaticParams() {
  return RESEARCH_POSTS.map(p => ({ slug: p.slug }));
}

// The site advertised /og-image.png sitewide, which was a 404 — so every share
// fell back to whatever LinkedIn had cached. Generated per post at build time.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#050505',
          padding: '72px',
          borderTop: '10px solid #F27D26',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#F27D26',
              fontWeight: 700,
            }}
          >
            Published Research
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: post && post.title.length > 55 ? 60 : 72,
              lineHeight: 1.1,
              color: '#ffffff',
              maxWidth: '1000px',
            }}
          >
            {post?.title ?? 'Research'}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', fontSize: 30, color: '#ffffff', fontWeight: 600 }}>
              Arif Adito
            </div>
            <div style={{ display: 'flex', fontSize: 22, color: '#A19E95' }}>arifadito.com</div>
          </div>
          {post ? (
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                color: '#F27D26',
                border: '2px solid #F27D26',
                borderRadius: 999,
                padding: '12px 28px',
              }}
            >
              {post.citations} sources
            </div>
          ) : null}
        </div>
      </div>
    ),
    size,
  );
}
