// src/components/pages/ResourceHubPage.tsx
import Eyebrow from '~/components/Eyebrow';
import Tag from '~/components/Tag';
import { PageHero, CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, GREEN, BLUE } from '~/lib/tokens';

const tagFor = (color: string) =>
  color === PINK ? 'pink' : color === YELLOW ? 'yellow' : color === GREEN ? 'green' : 'blue';

export default function ResourceHubPage() {
  const featured = [
    { type: 'Article', color: PINK, title: 'How CAM Firms Win in AI Search', excerpt: "ChatGPT, Perplexity, Gemini, Google AI Overviews — being cited is the new being on page one. Here's how to be the answer.", href: '/resource-hub/ai-search-for-cam', read: '9 min' },
    { type: 'Article', color: YELLOW, title: 'The CAM Marketing Strategy That Actually Compounds', excerpt: "Why 'do more marketing' fails and what an engineered, system-first growth strategy looks like over 18 months.", href: '/resource-hub/cam-marketing-strategy', read: '11 min' },
    { type: 'Micro-course', color: GREEN, title: 'Building Trust as a CAM', excerpt: '6 lessons + knowledge check. Free. Why trust — not service quality — decides which CAM firms boards renew, refer, and rave about.', href: '/courses/trust-building', read: '6 lessons' },
  ];
  const more = [
    { type: 'Buyer\'s guide', color: BLUE, title: 'HOA Management Software: 2026 Buyer\'s Guide for CAM Firms', read: '12 min', href: '/resources/hoa-management-software-guide' },
    { type: 'Article', color: PINK, title: 'The 26 questions every board really wants answered', read: '8 min' },
    { type: 'Field guide', color: BLUE, title: 'Manager-transition checklist that prevents account churn', read: '6 min' },
    { type: 'Article', color: YELLOW, title: 'Why your proposal loses before you submit it', read: '10 min' },
    { type: 'Micro-course', color: GREEN, title: 'Build your authority library in 30 days', read: '5 lessons' },
    { type: 'Article', color: PINK, title: 'What boards search for at 11pm on a Tuesday', read: '7 min' },
    { type: 'Field guide', color: YELLOW, title: 'Proposal anatomy that wins 1-in-2 RFPs', read: '12 min' },
  ];
  return (
    <>
      <PageHero
        eyebrow="Resource Hub"
        h1={<>Field-tested playbooks for <span style={{ color: PINK }}>CAM operators.</span></>}
        sub="Everything we've learned engineering growth for community association management firms — articles, micro-courses, frameworks, and field guides. Free. Built by people who lived inside CAM."
      />
      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 24, marginBottom: 48 }}>
            {featured.map((it, i) => {
              const isHero = i === 0;
              return (
                <a key={it.title} href={it.href} className="card" style={{
                  display: 'flex', flexDirection: 'column', textDecoration: 'none',
                  background: isHero ? `linear-gradient(135deg, ${PURPLE} 0%, #290d41 100%)` : '#fff',
                  color: isHero ? '#fff' : 'inherit',
                  gridRow: isHero ? 'span 2' : 'auto',
                  padding: 32, gap: 16,
                  border: isHero ? 'none' : '1px solid var(--border-subtle)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Tag color={tagFor(it.color) as any}>{it.type}</Tag>
                    <span style={{ fontSize: 12, color: isHero ? 'rgba(255,255,255,0.7)' : '#888', fontFamily: 'var(--font-display)' }}>{it.read}</span>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em',
                    fontSize: isHero ? 36 : 22,
                    color: isHero ? '#fff' : PURPLE,
                  }}>{it.title}</div>
                  <div style={{ fontSize: 14, color: isHero ? 'rgba(255,255,255,0.78)' : '#555', lineHeight: 1.6 }}>{it.excerpt}</div>
                  <div style={{ marginTop: 'auto', paddingTop: 12, fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: it.color }}>Read →</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <Eyebrow>More from the hub</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Recent articles & guides.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {more.map(it => {
              const cardStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, textDecoration: 'none', color: 'inherit' };
              const inner = (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Tag color={tagFor(it.color) as any}>{it.type}</Tag>
                    <span style={{ fontSize: 12, color: '#888', fontFamily: 'var(--font-display)' }}>{it.read}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: PURPLE, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{it.title}</div>
                  <div style={{ marginTop: 'auto', fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: it.color }}>
                    {'href' in it ? 'Read →' : 'Coming soon'}
                  </div>
                </>
              );
              return 'href' in it
                ? <a key={it.title} href={(it as any).href} className="card card-pad" style={cardStyle}>{inner}</a>
                : <div key={it.title} className="card card-pad" style={cardStyle}>{inner}</div>;
            })}
          </div>
        </div>
      </section>
      <CtaBand headline="Want this in your inbox?" sub="One thoughtful piece per month. No filler, no upsells. Unsubscribe anytime." primary="Subscribe" primaryHref="/strategic-review-request" />
    </>
  );
}
