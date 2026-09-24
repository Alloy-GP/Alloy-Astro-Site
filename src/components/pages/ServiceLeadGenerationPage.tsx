// src/components/pages/ServiceLeadGenerationPage.tsx
// Alloy — Property Management Lead Generation
// BoardReach service detail page.
// Targeting: "property management lead generation" (150/mo, KD 0, $11 CPC).

import { useState } from 'react';
import type { CSSProperties } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import AccentBar from '~/components/AccentBar';
import { ServiceList, CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

// ── FAQ accordion ─────────────────────────────────────────────────────────────
interface FAQItemProps { q: string; a: string; bordered: boolean; accent: string; }
function FAQItem({ q, a, bordered, accent }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: bordered ? '1px solid var(--border-subtle)' : 'none' }}>
      <button type="button" onClick={() => setOpen(!open)} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 24, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: PURPLE, letterSpacing: '-0.01em' }}>
        <span>{q}</span>
        <span style={{ width: 28, height: 28, borderRadius: 999, background: open ? accent : 'var(--alloy-pink-tint)', color: open ? '#fff' : PURPLE, display: 'grid', placeItems: 'center', transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'all 200ms var(--ease-standard)', flexShrink: 0 } as CSSProperties}>
          <Icon name="plus" size={16} strokeWidth={2.5} />
        </span>
      </button>
      {open && <div className="reveal" style={{ padding: '0 28px 24px', color: '#555', fontSize: 15, lineHeight: 1.7, maxWidth: 800 }}>{a}</div>}
    </div>
  );
}

// ── Lead Pipeline Diagram ─────────────────────────────────────────────────────
function LeadPipelineDiagram() {
  const channels = [
    { c: PINK,   label: 'Local SEO + GBP',      sub: "Boards searching '<your metro> HOA management'" },
    { c: YELLOW, label: 'AI search citations',   sub: 'ChatGPT / Perplexity recommend you by name' },
    { c: BLUE,   label: 'Authority content',     sub: 'Field guides, board education, RFP help' },
    { c: GREEN,  label: 'Outbound prospecting',  sub: 'Targeted board outreach via Groundwork' },
  ];
  return (
    <div className="svc-pipeline-wrap" style={{ background: '#fff', borderRadius: 14, padding: 32, border: '1px solid var(--border-subtle)' }}>
      <div className="svc-pipeline-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr auto 1fr auto 1fr', gap: 18, alignItems: 'stretch' }}>
        {/* Channels column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#999', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 } as CSSProperties}>Inbound + outbound channels</div>
          {channels.map(ch => (
            <div key={ch.label} style={{ borderLeft: `4px solid ${ch.c}`, padding: '10px 14px', background: '#fafaff', borderRadius: '0 6px 6px 0' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: PURPLE }}>{ch.label}</div>
              <div style={{ fontSize: 11, color: '#666', lineHeight: 1.4, marginTop: 2 }}>{ch.sub}</div>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="pipeline-arrow" style={{ display: 'grid', placeItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 30, height: 2, background: 'var(--border-subtle)' }}></div>
            <Icon name="arrow-right" size={20} color="#999" />
          </div>
        </div>

        {/* Qualifier */}
        <div style={{
          background: `linear-gradient(160deg, ${PURPLE} 0%, #4a2766 100%)`,
          borderRadius: 12, padding: 24, color: '#fff',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, minHeight: 280,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: YELLOW, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 } as CSSProperties}>Qualification layer</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.01em' }}>Lead scoring + board fit</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>
            Portfolio size, contract end date, budget signal, geography, board mood. Hot leads route in &lt; 24 hrs.
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.15)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } as CSSProperties}>
            {[
              { l: 'MQL', v: 'Auto-route' },
              { l: 'SQL', v: 'Hand off' },
              { l: 'Cold', v: 'Nurture' },
              { l: 'Bad fit', v: 'Decline' },
            ].map(t => (
              <div key={t.l}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.10em', fontWeight: 700 } as CSSProperties}>{t.l}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#fff', marginTop: 2 }}>{t.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="pipeline-arrow" style={{ display: 'grid', placeItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 30, height: 2, background: 'var(--border-subtle)' }}></div>
            <Icon name="arrow-right" size={20} color="#999" />
          </div>
        </div>

        {/* Sales handoff */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#999', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 } as CSSProperties}>Your BD team</div>
          <div style={{ border: `2px solid ${GREEN}`, background: 'var(--alloy-green-tint)', borderRadius: 10, padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 14 }}>Qualified board lead</div>
            <div style={{ fontSize: 11, color: '#3a5a52', lineHeight: 1.5 }}>Pre-briefed: portfolio, RFP timing, decision-makers, prior agency, budget band, hot buttons.</div>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 4 } as CSSProperties}>
              {[
                { k: 'Win rate', v: '40–60%' },
                { k: 'Cycle',    v: '30–60 days' },
                { k: 'Avg ACV',  v: '$60K+' },
              ].map(s => (
                <div key={s.k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ color: '#5a7a72', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: 9, fontWeight: 700 } as CSSProperties}>{s.k}</span>
                  <span style={{ color: PURPLE, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Channel Economics ─────────────────────────────────────────────────────────
type Channel = { c: string; name: string; cpl: string; window: string; strength: string; weakness: string; example?: { label: string; href: string } };

function ChannelEconomics() {
  const channels: Channel[] = [
    {
      c: PINK,
      name: 'Local SEO + Google Business',
      cpl: '$60–$120',
      window: '3–6 mo to lift',
      strength: 'High intent, defensible, compounds monthly.',
      weakness: 'Slow to start. Capped at metro size.',
    },
    {
      c: YELLOW,
      name: 'AI search visibility (GEO)',
      cpl: '$80–$200',
      window: '60–90 days',
      strength: 'Boards trust LLM recommendations. Still uncontested.',
      weakness: 'Volume is small but growing fast (10× YoY).',
    },
    {
      c: BLUE,
      name: 'Authority content + email',
      cpl: '$40–$90',
      window: '6 mo to compound',
      strength: 'Lowest CPL once warm. Builds list + trust.',
      weakness: 'Needs editorial discipline most CAMs lack.',
    },
    {
      c: GREEN,
      name: 'Outbound BD (Groundwork)',
      cpl: '$200–$450',
      window: 'Live in 30 days',
      strength: 'Predictable, fastest to revenue, board-targeted.',
      weakness: 'Higher CPL — but ACV justifies it 5×.',
    },
    {
      c: PURPLE,
      name: 'Board matchmaking platforms',
      cpl: 'Varies',
      window: 'Live in days',
      strength: 'Boards arrive already shopping — the highest-intent lead there is.',
      weakness: "You're one of 2–3 on a shortlist. Proposal quality decides it.",
      example: { label: 'Match HOA', href: 'https://matchhoa.com' },
    },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
      {channels.map(ch => (
        <div key={ch.name} style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderTop: `4px solid ${ch.c}`, borderRadius: 12, padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: PURPLE, lineHeight: 1.25 }}>{ch.name}</div>
          {ch.example && (
            <a href={ch.example.href} target="_blank" rel="noopener" style={{ fontSize: 12, fontWeight: 700, color: ch.c, textDecoration: 'underline', textUnderlineOffset: 3, marginTop: -6 }}>
              e.g. {ch.example.label} ↗
            </a>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 12px', fontSize: 12, paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ color: '#999', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, fontSize: 10 } as CSSProperties}>CPL</span>
            <span style={{ color: PURPLE, fontFamily: 'var(--font-display)', fontWeight: 700 }}>{ch.cpl}</span>
            <span style={{ color: '#999', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, fontSize: 10 } as CSSProperties}>Ramp</span>
            <span style={{ color: PURPLE, fontFamily: 'var(--font-display)', fontWeight: 700 }}>{ch.window}</span>
          </div>
          <div style={{ marginTop: 4 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: ch.c, letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 } as CSSProperties}>Strength</div>
            <div style={{ fontSize: 12, color: '#444', lineHeight: 1.5, marginBottom: 8 }}>{ch.strength}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999', letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 } as CSSProperties}>Watch-out</div>
            <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{ch.weakness}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ServiceLeadGenerationPage() {
  const includes = [
    { icon: 'search',    h: 'Lead-source audit',         d: "Where every contract you've won in the last 36 months actually came from. Gut feel almost always wrong — channels you ignore usually outperform the ones you fund." },
    { icon: 'target',    h: 'ICP + portfolio targeting',  d: "Define the boards worth winning: door count, contract size, geography, vertical (HOA / condo / large-scale). Stop chasing 40-door condos when you're built for 400-door masters." },
    { icon: 'compass',   h: 'Channel mix design',         d: "Allocated budget across SEO, AI search, content, paid, and outbound — sized to your portfolio goal and runway. No 'try everything,' no agency-default templates." },
    { icon: 'feather',   h: 'Content + offer engine',     d: "Field guides, RFP help, board education, comparison content. The assets every other channel pulls from. Built once, deployed everywhere." },
    { icon: 'sparkles',  h: 'Inbound capture system',     d: "Forms, lead magnets, calendar booking, intake sequences. Designed so a board director can self-qualify in two minutes without talking to anyone." },
    { icon: 'zap',       h: 'Lead scoring + routing',     d: "Portfolio size, contract end date, geography, fit signals. Hot leads route in < 24 hrs to your BD lead. Cold leads enter nurture instead of getting dropped." },
    { icon: 'phone',     h: 'Outbound BD (Groundwork)',   d: "When inbound is too slow or too small. Alloy actively prospects qualified boards on your behalf — see Groundwork for the fractional-BD offering." },
    { icon: 'bar-chart', h: 'Pipeline reporting',         d: "MQL, SQL, win rate, CAC by channel, ACV, time-to-close. The dashboard your CFO can read without you in the room." },
    { icon: 'repeat',    h: 'Quarterly recalibration',    d: "Channels shift. Markets soften. Quarterly cycle to kill what's not working, double the channels that are, and reset the targets." },
  ];

  const stats = [
    { color: PINK,   k: '535%', v: 'lift in qualified lead intake at Apex CMG over 18 months — across SEO, content, and outbound combined.',                    src: 'Apex CMG case study, 2024–2025' },
    { color: YELLOW, k: '$11',  v: "average CPC for 'property management lead generation' — the keyword you're not ranking for. High CPC = high intent.",         src: 'Keyword data, May 2026' },
    { color: GREEN,  k: '40–60%', v: 'qualified-to-close rate when leads arrive pre-briefed instead of cold. Your sellers stop selling and start closing.',        src: 'Alloy benchmark, multi-client' },
    { color: BLUE,   k: '$0',   v: 'extra CRM cost. The lead system runs inside BoardSuite — no HubSpot license, no separate marketing-automation seat.',         src: 'BoardSuite Engineered tier' },
  ];

  const process = [
    { num: '01', h: 'Diagnose', d: "Two-week audit of every contract won in the last 36 months. Source, time-to-close, ACV, retention. The map of where revenue actually comes from — usually not where the budget is going." },
    { num: '02', h: 'Design',   d: "Channel mix, ICP, lead-scoring rubric, routing rules. Built around your portfolio target and operator capacity. Approved by your leadership before a dollar moves." },
    { num: '03', h: 'Deploy',   d: "Channels live in 30–60 days. SEO, AI-search, and content compound; outbound and capture forms produce volume immediately. Reporting wired to your CRM (or BoardSuite) on day one." },
    { num: '04', h: 'Compound', d: "Monthly reporting, quarterly recalibration. Kill what's not working. Double the channels that are. The system gets better with age — most CAM lead-gen efforts get worse." },
  ];

  const beforeAfter = [
    { dim: 'Lead source',     before: "Referral and 'whoever calls back'",          after: '5 named channels, each with a CPL target' },
    { dim: 'Lead definition', before: 'Anyone who fills out the form',              after: 'Scored by portfolio, RFP timing, fit signals' },
    { dim: 'Routing',         before: 'Whichever salesperson sees the email first', after: 'Hot < 24 hrs, warm into nurture, cold declined' },
    { dim: 'Reporting',       before: 'Monthly count of contact-form submissions',  after: 'Pipeline by source, CAC, ACV, time-to-close' },
    { dim: 'Outbound',        before: 'Owner cold-emails when inbound dries up',    after: 'Groundwork prospects qualified boards on calendar' },
    { dim: 'AI / search',     before: 'Not in the plan',                            after: 'Ranked + cited by ChatGPT / Perplexity / Google AI' },
    { dim: 'Cycle time',      before: '6–12 months from interest to signed',        after: '30–60 days when leads arrive pre-qualified' },
  ];

  const faqs = [
    {
      q: 'How is this different from Groundwork?',
      a: "Lead Generation is the system: the channel mix, scoring, routing, and reporting that turns inbound and outbound activity into qualified board conversations. Groundwork is one channel inside that system — fractional outbound BD that Alloy executes for you. Most CAM firms need the full system. Some only need Groundwork (you've got SEO and content covered, you just need an outbound team). We can scope either way.",
    },
    {
      q: 'How long until we see qualified leads?',
      a: "Outbound (Groundwork) produces qualified board conversations in 30 days. Inbound channels (SEO, content, AI search) compound over 3–6 months — but they keep paying after the spend stops. Most CAM firms run both: outbound for revenue this quarter, inbound for the runway 18 months from now.",
    },
    {
      q: "We already use a CRM and have a contact form. Why do we need this?",
      a: "Most CAM firms have a contact form and a CRM and almost no system between them. Leads come in, they sit, the right person doesn't see them in time, and warm boards go cold. The Lead Generation engagement is everything between 'we have a website' and 'the right salesperson is on the phone with the right board, briefed.' If your conversion from inbound to first meeting is below 30%, that gap is the problem.",
    },
    {
      q: "What if our market is too small for SEO?",
      a: "Then we lean outbound. Smaller markets favor named, targeted prospecting over broad keyword plays — there are only so many boards in your metro and we know who they are. Lead mix is sized to your market, not the agency template.",
    },
    {
      q: "Is this exclusive to one CAM firm per metro?",
      a: "Yes. Alloy works with one CAM company per metro — for everything, not just lead gen. If your market is taken, we'll tell you on the diagnostic call.",
    },
    {
      q: "Where does this fit inside BoardSuite?",
      a: "Lead Generation is the BoardReach (Attract) engine. It feeds BoardMatch (Close), which protects BoardRetain (Keep). When all three engines are connected, lead-to-close is one continuous motion instead of three handoffs that drop leads in the seams.",
    },
  ];

  const processColors = [PINK, YELLOW, GREEN, BLUE];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="hero" style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: PINK, boxShadow: `0 0 0 4px rgba(217,53,110,0.20)` }}></span>
                <Eyebrow onDark noLine>BoardReach™ · Property Management Lead Generation</Eyebrow>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                The lead-generation system <span style={{ color: PINK }}>built for CAM</span>—<br />
                not <span style={{ color: YELLOW }}>"more marketing."</span>
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 28, maxWidth: 600 }}>
                Most CAM firms have a contact form and a CRM and almost nothing between them. Alloy designs and runs the engine: five named channels, scored leads, briefed handoffs, and a CFO-readable pipeline — sized to your portfolio target and live in 60 days.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 } as CSSProperties}>
                <Button variant="primary" arrow href="/strategic-review-request">Diagnose your pipeline</Button>
                <Button variant="secondary" onDark href="#what-you-get">What's included</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)', flexWrap: 'wrap' } as CSSProperties}>
                {[
                  { k: 'Apex lift',  v: '535%' },
                  { k: 'Live in',    v: '60 days' },
                  { k: 'Win rate',   v: '40–60%' },
                ].map(s => (
                  <div key={s.k}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: 22, letterSpacing: '-0.02em' }}>{s.v}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginTop: 2 } as CSSProperties}>{s.k}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual: before/after pipeline cards */}
            <div style={{ position: 'relative', height: 540, display: 'grid', placeItems: 'center' }}>
              <div style={{ position: 'absolute', inset: '8% 4% 8% 4%', background: `radial-gradient(ellipse at center, rgba(217,53,110,0.22) 0%, transparent 70%)`, filter: 'blur(20px)' }}></div>

              {/* "Before" stack — chaotic */}
              <div style={{ position: 'absolute', left: '0%', top: '10%', width: '70%', opacity: 0.5, filter: 'saturate(0.6)', transform: 'rotate(-3deg)' }}>
                <div style={{ background: '#fff', borderRadius: 8, padding: 18, fontFamily: 'Times, serif', boxShadow: '0 20px 50px rgba(0,0,0,0.30)' }}>
                  <div style={{ fontSize: 11, color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 } as CSSProperties}>Spreadsheet · Q3 leads</div>
                  <div style={{ fontSize: 13, color: '#333', marginBottom: 4 }}>Greenwood HOA — referral?</div>
                  <div style={{ fontSize: 13, color: '#333', marginBottom: 4 }}>condo on 5th st — fwd to ben</div>
                  <div style={{ fontSize: 13, color: '#333', marginBottom: 4 }}>website form 8/12 (??)</div>
                  <div style={{ fontSize: 13, color: '#333', marginBottom: 4 }}>Liz mentioned someone…</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 12, fontStyle: 'italic' }}>Last updated 6 weeks ago</div>
                </div>
              </div>

              {/* "After" stack — pipeline card */}
              <div style={{ position: 'absolute', right: '-2%', bottom: '8%', width: '78%' }}>
                <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.18)', overflow: 'hidden', transform: 'rotate(2deg)' }}>
                  {/* card header */}
                  <div style={{ padding: '14px 18px', background: PURPLE, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: YELLOW, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 } as CSSProperties}>Lead score: 92 / 100 · HOT</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: '#fff', marginTop: 4 }}>Cypress Lakes Master HOA</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, background: PINK, color: '#fff', padding: '4px 10px', borderRadius: 999, letterSpacing: '0.10em', textTransform: 'uppercase' } as CSSProperties}>SQL</span>
                  </div>
                  {/* card body */}
                  <div style={{ padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', fontSize: 12 }}>
                    {[
                      { k: 'Doors',        v: '412 SF + 88 attached' },
                      { k: 'Contract end', v: 'Mar 2027 (RFP Jan)' },
                      { k: 'Source',       v: 'AI search → field guide' },
                      { k: 'Geography',    v: 'North Austin (claimed)' },
                      { k: 'Prior mgmt',   v: 'Generic regional, 4 yrs' },
                      { k: 'Hot button',   v: 'Reserve transparency' },
                    ].map(r => (
                      <div key={r.k}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 } as CSSProperties}>{r.k}</div>
                        <div style={{ color: PURPLE, fontWeight: 600, marginTop: 2 }}>{r.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafaff' }}>
                    <div style={{ fontSize: 11, color: '#666' }}>Routed to <strong style={{ color: PURPLE }}>D. Whitfield</strong> · 14 min ago</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: GREEN, fontWeight: 700, letterSpacing: '0.06em' } as CSSProperties}>● ACTION REQUIRED</div>
                  </div>
                </div>
              </div>

              {/* Floating annotations */}
              <div style={{ position: 'absolute', left: '-2%', top: '4%', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', padding: '6px 12px', borderRadius: 999, fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.15)', transform: 'rotate(-4deg)', backdropFilter: 'blur(4px)' } as CSSProperties}>
                Before: spreadsheet + hope
              </div>
              <div style={{ position: 'absolute', right: '0%', top: '44%', background: '#fff', color: PURPLE, padding: '8px 14px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, boxShadow: '0 12px 30px rgba(0,0,0,0.30)', transform: 'rotate(6deg)', display: 'flex', alignItems: 'center', gap: 8, zIndex: 5 } as CSSProperties}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: PINK }}></span>
                Scored. Briefed. Routed.
              </div>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* ── THE PROBLEM FRAME ─────────────────────────────────────────────────── */}
      <section className="section section-white" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 820 }}>
            <Eyebrow>The honest diagnosis</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 16px', color: PURPLE }}>"Lead generation" isn't a problem. <span style={{ color: PINK }}>The gap between contact form and qualified board call is.</span></h2>
            <p className="lead">Most CAM firms aren't out of leads. They're losing the warm ones in the seams — the days between a board director filling out a form and the right salesperson seeing it, briefed, with the right offer.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              {
                c: PINK,
                eyebrow: 'The leak',
                h: 'Inbound rots in the inbox.',
                d: "A board director fills out a form on Tuesday. The owner sees it Friday. By the time someone calls Monday, the board has booked three other firms. The lead wasn't bad — the response was.",
              },
              {
                c: YELLOW,
                eyebrow: 'The blind spot',
                h: "No one knows where wins came from.",
                d: "Ask any CAM owner where their last 10 contracts came from. The honest answer: 'mostly referrals, I think.' Without source attribution, every channel looks the same — so the wrong ones get funded.",
              },
              {
                c: GREEN,
                eyebrow: 'The ceiling',
                h: "Outbound never happens.",
                d: "Inbound has a ceiling — there are only so many boards Googling 'HOA management' in your metro this month. The growth comes from outbound. But owners can't sell and run the firm. So outbound just… doesn't happen.",
              },
            ].map(b => (
              <div key={b.h} style={{ background: '#fafaff', borderRadius: 14, padding: 32, borderTop: `4px solid ${b.c}` }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: b.c, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 } as CSSProperties}>{b.eyebrow}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: PURPLE, lineHeight: 1.2, letterSpacing: '-0.018em', marginBottom: 14 }}>{b.h}</div>
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.65, margin: 0 }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAND ────────────────────────────────────────────────────────── */}
      <section className="section section-ivory" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>Why this matters now</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The numbers a CAM owner actually needs to see.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {stats.map(s => (
              <div key={s.k} style={{ borderTop: `4px solid ${s.color}`, paddingTop: 22 }}>
                <div className="display-md" style={{ fontSize: 56, color: PURPLE, lineHeight: 0.95, marginBottom: 12, letterSpacing: '-0.025em', fontWeight: 800 }}>{s.k}</div>
                <div style={{ fontSize: 14, color: '#444', lineHeight: 1.55 }}>{s.v}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#999', letterSpacing: '0.08em', marginTop: 12, textTransform: 'uppercase', fontWeight: 600 } as CSSProperties}>{s.src}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PIPELINE DIAGRAM ─────────────────────────────────────────────────── */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 820 }}>
            <Eyebrow>The system</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 10px', color: PURPLE }}>Five channels in. <span style={{ color: PINK }}>One briefed lead</span> out.</h2>
            <p style={{ color: '#555', lineHeight: 1.65, fontSize: 16, margin: 0, maxWidth: 720 }}>
              Channels feed a qualification layer. The qualifier scores every lead by portfolio size, contract timing, geography, and fit signal. Only sales-qualified leads reach your BD team — pre-briefed, in less than 24 hours.
            </p>
          </div>
          <LeadPipelineDiagram />
        </div>
      </section>

      {/* ── CHANNEL ECONOMICS ────────────────────────────────────────────────── */}
      <section id="channel-economics" className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 820 }}>
            <Eyebrow>Channel economics</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 10px', color: PURPLE }}>What every channel actually costs—and what it returns.</h2>
            <p style={{ color: '#555', lineHeight: 1.65, fontSize: 16, margin: 0, maxWidth: 720 }}>
              The agency-template trap is treating every channel like it's the same. CPL, ramp time, ceiling, and durability are completely different. Here's the honest math.
            </p>
          </div>
          <ChannelEconomics />
          <div style={{ marginTop: 24, padding: 18, background: 'rgba(217,53,110,0.06)', border: '1px dashed rgba(217,53,110,0.30)', borderRadius: 10, fontSize: 13, color: '#555', lineHeight: 1.6 }}>
            <strong style={{ color: PURPLE }}>CPL ranges are blended benchmarks across CAM clients in markets of 500K–2M.</strong> Smaller markets favor outbound; larger metros favor SEO + content. We size the mix to your market and target.
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────────────────────────── */}
      <section id="what-you-get" className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The complete lead-generation engine, run by Alloy.</h2>
          </div>
          <ServiceList color={PINK} items={includes} />
        </div>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────────────────── */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The honest comparison</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Contact form + CRM vs. an actual system.</h2>
          </div>
          <div className="svc-compare-wrap" style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '16px 24px', background: PURPLE, color: '#fff', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 } as CSSProperties}>
              <div>Dimension</div>
              <div style={{ opacity: 0.6 }}>Contact form + CRM (most CAMs)</div>
              <div style={{ color: YELLOW }}>Alloy lead-gen system</div>
            </div>
            {beforeAfter.map((row, i) => (
              <div key={row.dim} style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '20px 24px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', gap: 24, alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 14 }}>{row.dim}</div>
                <div style={{ fontSize: 14, color: '#888', lineHeight: 1.55, fontStyle: 'italic' }}>{row.before}</div>
                <div style={{ fontSize: 14, color: '#222', lineHeight: 1.55, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Icon name="check" size={16} color={PINK} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 } as CSSProperties} />
                  <span>{row.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow onDark>How we build it</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>From audit to compounding pipeline in <span style={{ color: YELLOW }}>60 days.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {process.map((s, i) => (
              <div key={s.num} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderTop: `3px solid ${processColors[i]}`,
                borderRadius: 12, padding: 28,
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: processColors[i], fontSize: 12, letterSpacing: '0.16em', marginBottom: 12 } as CSSProperties}>{s.num}</div>
                <div className="display-md" style={{ fontSize: 22, color: '#fff', marginBottom: 10 }}>{s.h}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36, padding: 24, background: 'rgba(245,216,128,0.08)', border: '1px dashed rgba(245,216,128,0.30)', borderRadius: 10, display: 'flex', gap: 18, alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: YELLOW, lineHeight: 1, flexShrink: 0 }}>60</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>
              <strong style={{ color: '#fff' }}>days from kickoff to a working pipeline.</strong>{' '}
              Audit in weeks 1–2. System design in weeks 3–4. Channels live in weeks 5–8. By month three, the pipeline is reporting CAC and ACV by source — and your sales team is closing instead of hunting.
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW THIS FITS BOARDSUITE / GROUNDWORK ────────────────────────────── */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'center' }}>
            <div>
              <Eyebrow>Where it lives</Eyebrow>
              <h2 className="display-lg" style={{ margin: '14px 0 18px', color: PURPLE }}>The Attract engine inside BoardSuite.</h2>
              <p style={{ fontSize: 16, color: '#444', lineHeight: 1.7, marginBottom: 16 }}>
                Lead Generation is the <strong style={{ color: PURPLE }}>BoardReach</strong> engine — every channel, every score, every routing rule. It feeds <strong style={{ color: PURPLE }}>BoardMatch</strong> (Close), which protects <strong style={{ color: PURPLE }}>BoardRetain</strong> (Keep).
              </p>
              <p style={{ fontSize: 16, color: '#444', lineHeight: 1.7, marginBottom: 24 }}>
                Need just outbound? That's <strong style={{ color: PURPLE }}>Groundwork</strong> — a single channel inside the broader system. Most firms run both: Lead Gen for the inbound + scoring + reporting layer, Groundwork for the outbound channel.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' } as CSSProperties}>
                <Button variant="primary" arrow href="/boardsuite">See BoardSuite</Button>
                <Button variant="ghost" arrow href="/groundwork">Groundwork →</Button>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 32, border: '1px solid var(--border-subtle)', boxShadow: '0 16px 48px rgba(56,28,79,0.08)' }}>
              <Eyebrow noLine>How leads compound across the engines</Eyebrow>
              <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '14px 16px', alignItems: 'center' }}>
                {[
                  { c: PINK,   label: 'BoardReach attracts the right boards', note: 'Five named channels deliver pre-qualified leads with intent and timing signals.' },
                  { c: YELLOW, label: 'BoardMatch closes them faster',         note: 'Briefed leads + proposal system = 40–60% qualified-to-close, 30–60 day cycle.' },
                  { c: GREEN,  label: 'BoardRetain keeps them longer',         note: 'Higher retention → lower CAC ratio → more budget for Reach. The flywheel compounds.' },
                  { c: BLUE,   label: 'Reporting closes the loop',             note: "CAC / LTV by source flows into the next quarter's channel mix. Mistakes get killed early." },
                ].map((f, i) => (
                  <>
                    <div key={`dot-${f.label}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 14, height: 14, borderRadius: 999, background: f.c, boxShadow: `0 0 0 4px ${f.c}33` }}></div>
                      {i < 3 && <div style={{ width: 2, height: 22, background: 'var(--border-subtle)' }}></div>}
                    </div>
                    <div key={`text-${f.label}`}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: PURPLE }}>{f.label}</div>
                      <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{f.note}</div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="section section-white">
        <div className="container-narrow">
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <Eyebrow noLine>Common questions</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px auto 0', color: PURPLE }}>What CAM operators actually ask.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--border-subtle)' }}>
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} bordered={i > 0} accent={PINK} />)}
          </div>
        </div>
      </section>

      <CtaBand
        headline="Ready to see where the leaks are?"
        sub="30 minutes. We'll review your last 36 months of contracts, map the lead sources you actually have, and show you the channel mix sized to your portfolio target."
      />
    </>
  );
}
