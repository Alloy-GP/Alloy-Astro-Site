// src/components/pages/FAQPage.tsx — /faq
// Template 6 (Editorial). Layout, hero copy and group structure from
// docs/redesign-handoff/site/faq.dc.html. Every Q&A from the pre-redesign page is kept verbatim
// (incl. the Match HOA answer + outbound link); prototype Q&As on topics the live page didn't
// already cover are added. Rendered as a static list, so every answer is in the server HTML.
// FAQ_ITEMS (plain-text answers) feeds the FAQPage JSON-LD in src/pages/faq.astro.
import type { CSSProperties, ReactNode } from 'react';
import { Eyebrow, CtaBar } from '~/components/rd/atoms';
import type { FaqItem } from '~/lib/schema';

const LH: CSSProperties = { lineHeight: 1.65 };

/** `a` is the plain-text answer (used for schema); `node` overrides the rendered answer when it contains links. */
interface Entry { q: string; a: string; node?: ReactNode }
interface Group { label: string; items: Entry[] }

const MATCH_HOA_TEXT =
  "Not directly — Alloy works for management companies, not for boards. If you're a board shopping for a manager, the place we send you is Match HOA — a free concierge service that screens management companies against your community's needs and hands you a shortlist of two or three vetted matches, usually within a week. No cost to the board, no obligation.";

export const FAQ_GROUPS: Group[] = [
  { label: 'Working with Alloy', items: [
    { q: 'How does market exclusivity actually work?', a: "When you sign with Alloy, your service area becomes locked. We can't engage another CAM firm in your defined metro for the duration of the engagement (and 12 months after). It's contractual — not a marketing promise." },
    { q: 'Where are you based, and does it matter?', a: 'Austin, Texas. Our partners are across the country; the work is remote with on-site visits for kickoffs and annual planning.' },
    { q: 'Do you replace our internal marketing?', a: "Sometimes yes, often no. Alloy frequently runs alongside an internal marketing manager — we're the strategy and execution muscle, they're the day-to-day program runner. We'll figure out the right line during scoping." },
  ] },
  { label: 'Capabilities', items: [
    { q: 'Will you build us a website?', a: "If yours isn't doing the job, yes. Conversion-engineered, board-stage SEO architecture, AI-search ready. It's part of the BoardReach engine, not a separate engagement." },
    { q: 'Do you do paid ads?', a: "Yes — Google Ads, retargeting, and conversion-rate optimization. Paid is one channel inside the BoardReach engine, not the whole strategy. We won't sell you ads as a primary growth lever." },
  ] },
  { label: 'Industry fit', items: [
    { q: 'Do you work with anyone other than CAM?', a: "No. Exclusively community association management companies. The whole point of Alloy is depth — we'd dilute that the moment we said yes to adjacent industries." },
    { q: 'Do you serve commercial property management?', a: 'No. Strictly community associations — HOAs, condos, master-planned, mixed-use boards.' },
    { q: 'What size firms do you work with?', a: "From single-location boutiques (Steady tier) to multi-state regionals (Ascend tier). The constant is that growth isn't accidental — it's intentional." },
    {
      q: "I'm on an HOA board looking for a management company. Can Alloy help?",
      a: MATCH_HOA_TEXT,
      node: (
        <>
          Not directly — Alloy works for management companies, not for boards. If you're a board shopping for a manager, the place we send you is{' '}
          <a href="https://matchhoa.com" target="_blank" rel="noopener" style={{ color: 'var(--alloy-pink)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>Match HOA</a>
          {' '}— a free concierge service that screens management companies against your community's needs and hands you a shortlist of two or three vetted matches, usually within a week. No cost to the board, no obligation.
        </>
      ),
    },
  ] },
  { label: 'Pricing', items: [
    { q: 'What does an engagement cost?', a: 'Pricing is custom and engagement-dependent across all three BoardSuite tiers (Steady, Accelerate, Ascend). We scope to your portfolio, market, and execution pace. The diagnostic call gets you a real number.' },
    { q: "What's the minimum commitment?", a: "12 months. Engineered growth doesn't happen in 90 days. The first 90 days are diagnostic + foundation; results compound from month 6 onward." },
    { q: 'What does “all-in” mean?', a: 'The retainer covers every listed deliverable. No per-project line items, no surprise scope fees.' },
    { q: 'Can we buy one service?', a: 'Yes — most services are available standalone, and we take project work when there’s a strategic event in motion.' },
  ] },
  { label: 'Results', items: [
    { q: 'Do you guarantee results?', a: 'No. We disclose them. Every number we publish is a contracted client outcome with its timeframe attached.' },
    { q: 'How fast will we see something?', a: 'Map pack in about ninety days; organic and AI search over six to twelve months; proposal and sales changes show up in the next pursuit.' },
  ] },
];

/** Flattened, plain-text Q&As — every rendered item, for FAQPage schema. */
export const FAQ_ITEMS: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items.map(({ q, a }) => ({ q, a })));

export default function FAQPage() {
  return (
    <div className="rd-page">
      {/* Hero */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 72 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>FAQ</Eyebrow>
            <h1 className="rd-h1">Honest answers, <span className="rd-accent">plainly.</span></h1>
          </div>
          <div className="rd-stack" style={{ gap: 20 }}>
            <p className="rd-intro" style={LH}>The questions CAM owners ask before the first call. If yours isn’t here, the Strategic Review is thirty minutes and free.</p>
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <div className="rd-stack rd-rule-top" style={{ gap: 64, paddingTop: 48 }}>
            {FAQ_GROUPS.map((g) => (
              <div key={g.label} className="rd-grid rd-grid--prose">
                <div><h2 className="rd-h3 rd-h3--sm" style={{ lineHeight: 1.2 }}>{g.label}</h2></div>
                <div className="rd-faq">
                  {g.items.map((it) => (
                    <div key={it.q} className="rd-faq-item">
                      <h3 className="rd-faq-q" style={{ margin: 0 }}>{it.q}</h3>
                      <p className="rd-faq-a" style={LH}>{it.node ?? it.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap">
          <CtaBar text="Still have a question? Ask a CAM operator, not a sales rep." />
        </div>
      </section>
    </div>
  );
}
