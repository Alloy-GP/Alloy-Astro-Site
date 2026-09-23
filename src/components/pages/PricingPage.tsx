// src/components/pages/PricingPage.tsx — /pricing
// Template 4c — pricing index. Copy from docs/redesign-handoff/site/pricing.dc.html.
// FAQ answers are carried over verbatim from the pre-redesign page (the prototype
// shows the accordion closed). PRICING_FAQ also feeds the FAQPage schema in the route.
import type { CSSProperties } from 'react';
import type { FaqItem } from '~/lib/schema';
import { Eyebrow, H1, TextLink, Btn, Steps, CtaBar } from '~/components/rd/atoms';

export const PRICING_FAQ: FaqItem[] = [
  {
    q: 'Why is there a 12-month minimum?',
    a: 'Marketing systems compound. Months 1–3 are build. Months 4–6 are tuning. Months 7–12 are when the data actually starts answering questions. Anything shorter is paying for setup costs without seeing the return — and we’re not in the business of selling that.',
  },
  {
    q: 'What does “all-in” actually mean?',
    a: 'The retainer covers every deliverable in your tier — content production, paid spend management (not media spend itself), design, dev, strategy. There is no per-asset fee, no surcharge for revisions, no ‘agency hours’ meter. Media spend (Google Ads budget, mail-house print, etc.) is billed at cost, separately.',
  },
  {
    q: 'Can we mix and match across tiers?',
    a: 'Selectively, yes — usually as add-ons to Foundation or Growth. Common requests: Foundation + Newsletter Production, or Growth + Fractional BD. We’ll quote those at the Strategic Review based on scope. We don’t unbundle Scale because the integrations are what make it Scale.',
  },
  {
    q: 'What’s the off-ramp if it isn’t working?',
    a: 'At month 6 we run a formal joint review against the outcomes set in your engagement letter. If we’re materially behind, you can either renegotiate scope or terminate without penalty. Five years in, we’ve activated this clause twice — both times it was the right call.',
  },
  {
    q: 'Do you take equity or rev-share?',
    a: 'No. Cash retainer only. We’ve turned down equity offers because alignment-via-incentives is a story we don’t believe — alignment-via-results is the only one that holds up. Our outcomes show up monthly; so does the invoice.',
  },
];

const TIERS: Array<{ name: string; sub: string; items: string[]; popular?: boolean }> = [
  {
    name: 'Foundation',
    sub: 'Under 1,500 doors. No marketing function yet.',
    items: ['Brand refresh + website', 'Local SEO + Google Business Profile', 'Review engine', 'Quarterly strategic review'],
  },
  {
    name: 'Growth',
    sub: '1,500–5,000 doors. Building a real growth motion.',
    items: ['Everything in Foundation', 'AI search + content engine', 'Paid acquisition', 'Proposal + RFP system', 'Newsletter + board education', 'Monthly strategic review'],
    popular: true,
  },
  {
    name: 'Scale',
    sub: '5,000+ doors, multi-market. Hitting growth ceilings.',
    items: ['Everything in Growth', 'Fractional BD prospecting', 'Local SEO in up to 5 metros', 'CRM / portal integrations', 'Dedicated CAM operator', 'Bi-weekly strategic review'],
  },
];

const COMPARE: Array<{ dim: string; f: string; g: string; s: string }> = [
  { dim: 'Strategic review cadence', f: 'Quarterly', g: 'Monthly', s: 'Bi-weekly' },
  { dim: 'Local SEO', f: '1 metro', g: '1 metro', s: 'Up to 5 metros' },
  { dim: 'AI search / GEO', f: '—', g: 'Full', s: 'Full + research' },
  { dim: 'Content engine', f: '—', g: '4 articles / mo', s: '8 articles / mo' },
  { dim: 'Paid acquisition', f: '—', g: 'Google + LinkedIn', s: 'Google + LinkedIn + Meta' },
  { dim: 'Proposal optimization', f: '—', g: 'System', s: 'System + custom' },
  { dim: 'Fractional BD prospecting', f: '—', g: '—', s: '40 conversations / mo' },
  { dim: 'Newsletter production', f: '—', g: 'Monthly', s: 'Monthly + custom' },
  { dim: 'Board education', f: '—', g: '4 micro-courses', s: 'Custom course production' },
  { dim: 'CAM operator', f: '—', g: 'Shared', s: 'Dedicated' },
  { dim: 'Market exclusivity', f: 'ZIP', g: 'Metro', s: 'Multi-metro' },
];

const RULES = [
  { title: 'One CAM firm per market.', body: 'We don’t run identical playbooks for two competing firms in the same metro. Period. When you hire us, your competitor can’t.' },
  { title: 'All-in pricing.', body: 'The retainer covers every listed deliverable. No per-project line items, no surprise scope fees. The number you see is the number you pay.' },
  { title: '12-month commitment.', body: 'Marketing compounds. Real systems take twelve months to mature, so we don’t take month-to-month engagements — the math doesn’t work for either of us.' },
  { title: 'Outcomes, not deliverables.', body: 'Every quarter we report against board-level outcomes — lead volume, win rate, retention — not how many blog posts we shipped.' },
];

// Comparison table — the prototype is a 1.4fr/1fr/1fr/1fr grid with a 2px purple header rule.
const TH: CSSProperties = { padding: '18px 16px 14px 0', borderBottom: '2px solid var(--alloy-purple)', fontSize: 11, letterSpacing: '.12em', color: 'var(--alloy-purple)' };
const TD: CSSProperties = { padding: '16px 16px 16px 0', fontSize: 14, verticalAlign: 'middle', borderBottom: '1px solid var(--border-subtle)' };
const TD_ROW: CSSProperties = { ...TD, fontWeight: 700, color: 'var(--alloy-purple)', textTransform: 'none', letterSpacing: 0 };
const TD_GROWTH: CSSProperties = { ...TD, fontWeight: 500, color: 'var(--alloy-purple)' };
const tdMuted = (v: string): CSSProperties => ({ ...TD, fontWeight: 400, color: v === '—' ? '#bbb' : 'var(--alloy-body-gray)' });

export default function PricingPage() {
  return (
    <div className="rd-page">
      {/* Hero */}
      <section className="rd-section rd-section--hero" style={{ paddingBottom: 64 }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Pricing · BoardSuite plans</Eyebrow>
            <H1 size="lg" accent="No rate cards.">Three plans.</H1>
          </div>
          <div className="rd-stack" style={{ gap: 20 }}>
            <p className="rd-intro">No project minimums. No “starting at” pricing that lands at 4× when you sign. Every retainer is all-in for the listed deliverables, billed monthly, scoped to your portfolio — with one CAM firm per market.</p>
            <div><TextLink href="/get-started" size={12}>Get scoped pricing in your Strategic Review</TextLink></div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="rd-section" style={{ padding: '24px 0 96px' }}>
        {/* data-reveal sits one level up: the rise CSS matches [data-rise] as a descendant of the root. */}
        <div className="rd-wrap" data-reveal>
          <div data-rise className="rd-tiers" style={{ gap: 20, alignItems: 'stretch' }}>
            {TIERS.map((t) => (
              <div key={t.name} className={`rd-tier${t.popular ? ' rd-tier--popular' : ''}`} style={{ padding: '36px 32px', gap: 24, position: 'relative' }}>
                {t.popular ? <span className="rd-tier-popular" style={{ position: 'absolute', top: 24, right: 24 }}>Popular</span> : null}
                <div className="rd-stack rd-stack--10">
                  <div className="rd-tier-name" style={{ fontSize: 32, lineHeight: 1 }}>{t.name}</div>
                  <div className="rd-tier-sub" style={{ fontSize: 15 }}>{t.sub}</div>
                </div>
                <ul className={`rd-stack rd-stack--10 ${t.popular ? 'rd-rule-top--light' : 'rd-rule-top'}`} style={{ margin: 0, padding: '22px 0 0', listStyle: 'none', fontSize: 15, fontWeight: 400, lineHeight: 1.45 }}>
                  {t.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
                {t.popular ? (
                  <Btn href="/get-started" size="sm" style={{ marginTop: 'auto', border: '2px solid transparent' }}>Get scoped pricing</Btn>
                ) : (
                  <Btn href="/get-started" variant="outline" size="sm" style={{ marginTop: 'auto', padding: '12px 20px' }}>Get scoped pricing</Btn>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--40">
          <div className="rd-grid rd-grid--2 rd-grid--end">
            <h2 className="rd-h2">What changes between tiers.</h2>
            <p className="rd-body">The short version. Every line is scoped at the Strategic Review; nothing is added after you sign.</p>
          </div>
          <div className="rd-card" style={{ padding: '8px 32px 16px' }}>
            <div className="rd-table-wrap">
              <table className="rd-table" style={{ minWidth: 640 }}>
                <colgroup>
                  <col style={{ width: '31.8%' }} />
                  <col style={{ width: '22.7%' }} />
                  <col style={{ width: '22.7%' }} />
                  <col style={{ width: '22.7%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <td style={TH} />
                    <th scope="col" style={TH}>Foundation</th>
                    <th scope="col" style={{ ...TH, color: 'var(--alloy-pink)' }}>Growth</th>
                    <th scope="col" style={TH}>Scale</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((r) => (
                    <tr key={r.dim}>
                      <th scope="row" style={TD_ROW}>{r.dim}</th>
                      <td style={tdMuted(r.f)}>{r.f}</td>
                      <td style={TD_GROWTH}>{r.g}</td>
                      <td style={tdMuted(r.s)}>{r.s}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Four rules */}
      <section className="rd-section">
        <div className="rd-wrap rd-stack rd-stack--40">
          <h2 className="rd-h2">Four rules that govern every retainer.</h2>
          <Steps steps={RULES} />
        </div>
      </section>

      {/* FAQ */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-grid rd-grid--prose">
          <div className="rd-stack rd-stack--18">
            <Eyebrow>Pricing questions</Eyebrow>
            <h2 className="rd-h2">Honest answers, plainly.</h2>
            <p className="rd-body">Not ready for the full system? We also take selective project work — an RFP response sprint, a brand and website refresh — when there’s a strategic event in motion.</p>
            <div><TextLink href="/contact" size={12}>See one-off engagements</TextLink></div>
          </div>
          <div className="rd-faq">
            {PRICING_FAQ.map((f) => (
              <details key={f.q}>
                <summary>
                  <span>{f.q}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <p className="rd-faq-a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-section rd-bg-off" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <CtaBar text="Want a real number for your situation? Thirty minutes covers tier fit and what it actually costs to run." />
        </div>
      </section>
    </div>
  );
}
