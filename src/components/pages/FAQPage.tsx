// src/components/pages/FAQPage.tsx
import { useState, type ReactNode } from 'react';
import Icon from '~/components/Icon';
import { PageHero, CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, GREEN } from '~/lib/tokens';

interface QA { q: string; a: ReactNode; }
interface Group { label: string; color: string; items: QA[]; }

export default function FAQPage() {
  const groups: Group[] = [
    { label: 'Engagement', color: PINK, items: [
      { q: 'How does market exclusivity actually work?', a: "When you sign with Alloy, your service area becomes locked. We can't engage another CAM firm in your defined metro for the duration of the engagement (and 12 months after). It's contractual — not a marketing promise." },
      { q: 'What does an engagement cost?', a: 'Pricing is custom and engagement-dependent across all three BoardSuite tiers (Steady, Accelerate, Ascend). We scope to your portfolio, market, and execution pace. The diagnostic call gets you a real number.' },
      { q: "What's the minimum commitment?", a: "12 months. Engineered growth doesn't happen in 90 days. The first 90 days are diagnostic + foundation; results compound from month 6 onward." },
    ]},
    { label: 'Capabilities', color: YELLOW, items: [
      { q: 'Do you replace our internal marketing?', a: "Sometimes yes, often no. Alloy frequently runs alongside an internal marketing manager — we're the strategy and execution muscle, they're the day-to-day program runner. We'll figure out the right line during scoping." },
      { q: 'Will you build us a website?', a: "If yours isn't doing the job, yes. Conversion-engineered, board-stage SEO architecture, AI-search ready. It's part of the BoardReach engine, not a separate engagement." },
      { q: 'Do you do paid ads?', a: "Yes — Google Ads, retargeting, and conversion-rate optimization. Paid is one channel inside the BoardReach engine, not the whole strategy. We won't sell you ads as a primary growth lever." },
    ]},
    { label: 'Industry fit', color: GREEN, items: [
      { q: 'Do you work with anyone other than CAM?', a: "No. Exclusively community association management companies. The whole point of Alloy is depth — we'd dilute that the moment we said yes to adjacent industries." },
      { q: 'Do you serve commercial property management?', a: 'No. Strictly community associations — HOAs, condos, master-planned, mixed-use boards.' },
      { q: 'What size firms do you work with?', a: "From single-location boutiques (Steady tier) to multi-state regionals (Ascend tier). The constant is that growth isn't accidental — it's intentional." },
      { q: "I'm on an HOA board looking for a management company. Can Alloy help?", a: (
        <>
          Not directly — Alloy works for management companies, not for boards. If you're a board shopping for a manager, the place we send you is{' '}
          <a href="https://matchhoa.com" target="_blank" rel="noopener" style={{ color: PINK, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>Match HOA</a>
          {' '}— a free concierge service that screens management companies against your community's needs and hands you a shortlist of two or three vetted matches, usually within a week. No cost to the board, no obligation.
        </>
      ) },
    ]},
  ];
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        h1={<>Questions <span style={{ color: PINK }}>operators ask</span><br/>before signing on.</>}
        sub="Honest answers to the questions that come up most. If yours isn't here, ask it during the diagnostic — we'd rather hear it directly."
      />
      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {groups.map(g => (
              <div key={g.label}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                  <div style={{ width: 36, height: 4, background: g.color, borderRadius: 2 }}></div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 800, color: PURPLE }}>{g.label}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border-subtle)', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
                  {g.items.map((it, i) => <FAQItem key={it.q} q={it.q} a={it.a} bordered={i > 0} accent={g.color} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

interface FAQItemProps { q: string; a: ReactNode; bordered: boolean; accent: string; }

function FAQItem({ q, a, bordered, accent }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: bordered ? '1px solid var(--border-subtle)' : 'none' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', border: 'none', background: 'transparent',
          padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer', gap: 24,
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: PURPLE, letterSpacing: '-0.01em',
        }}
      >
        <span>{q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: 999, background: open ? accent : 'var(--alloy-pink-tint)',
          color: open ? '#fff' : PURPLE, display: 'grid', placeItems: 'center',
          transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'all 200ms var(--ease-standard)', flexShrink: 0,
        }}>
          <Icon name="plus" size={16} strokeWidth={2.5} />
        </span>
      </button>
      {open && (
        <div className="reveal" style={{ padding: '0 28px 24px', color: '#555', fontSize: 15, lineHeight: 1.7, maxWidth: 800 }}>
          {a}
        </div>
      )}
    </div>
  );
}
