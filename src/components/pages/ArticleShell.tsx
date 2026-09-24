// src/components/pages/ArticleShell.tsx
import type { ReactNode } from 'react';
import Tag from '~/components/Tag';
import { CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, GREEN } from '~/lib/tokens';

const tagFor = (color: string) => color === PINK ? 'pink' : color === YELLOW ? 'yellow' : color === GREEN ? 'green' : 'blue';

export interface ArticleShellProps {
  category: string;
  categoryColor: string;
  title: string;
  dek: string;
  body: ReactNode;
}

export default function ArticleShell({ category, categoryColor, title, dek, body }: ArticleShellProps) {
  return (
    <>
      <section className="hero bg-ivory" style={{ paddingBottom: 0 }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ padding: '60px 32px 40px' }}>
          <div style={{ maxWidth: 880 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <a href="/resource-hub" style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#888', textDecoration: 'none' }}>← Resource Hub</a>
              <span style={{ width: 3, height: 3, background: '#bbb', borderRadius: 999 }}></span>
              <Tag color={tagFor(categoryColor) as any}>{category}</Tag>
            </div>
            <h1 className="display-xl" style={{ margin: '0 0 20px', color: PURPLE, maxWidth: 900 }}>{title}</h1>
            <p className="lead" style={{ maxWidth: 820 }}>{dek}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 999, background: PINK, color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 800 }}>SN</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE }}>Skyler Nelson</div>
                <div style={{ fontSize: 13, color: '#888' }}>Managing Partner · 9 min read</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-white">
        <div className="container-narrow">
          {body}
        </div>
      </section>
      <CtaBand headline="Like this thinking?" sub="Apply it to your CAM firm in a 30-minute diagnostic. No pitch — promise." />
    </>
  );
}

export const articleProse = {
  fontFamily: 'var(--font-body)', fontSize: 17, color: '#333', lineHeight: 1.75, maxWidth: 760,
} as const;
export const articleH2 = {
  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: PURPLE, letterSpacing: '-0.018em', margin: '48px 0 18px', lineHeight: 1.2,
} as const;
export const articleQuote = {
  borderLeft: `4px solid ${PINK}`, paddingLeft: 24, margin: '40px 0',
  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, color: PURPLE, letterSpacing: '-0.01em', lineHeight: 1.4, fontStyle: 'italic',
} as const;
