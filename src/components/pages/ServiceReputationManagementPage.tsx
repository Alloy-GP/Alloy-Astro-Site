// src/components/pages/ServiceReputationManagementPage.tsx
// Reputation Management for HOA Management Companies — /boardretain/reputation-management
import { useState } from 'react';
import AccentBar from '~/components/AccentBar';
import Button from '~/components/Button';
import Eyebrow from '~/components/Eyebrow';
import Icon from '~/components/Icon';
import { CtaBand, ServiceList } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

function ReviewStreamMockup() {
  const reviews = [
    { stars: 5, name: 'Linda K. · Cypress Lakes Board',  body: 'Reserve transparency we\'ve never seen. Quarterly reports, real numbers, real explanations.', time: '2d', c: GREEN, v: true },
    { stars: 5, name: 'Marcus R. · Oakridge Master HOA', body: 'Manager response time under 4 hours. We thought that was a unicorn.', time: '1w', c: GREEN, v: true },
    { stars: 4, name: 'Patricia L. · Homeowner',          body: 'Took two tries to get the maintenance form right but the follow-up was excellent.', time: '2w', c: BLUE, v: true },
    { stars: 5, name: 'James T. · Ridgeview Condo',       body: 'Switched from a regional firm. The difference is night and day.', time: '3w', c: GREEN, v: true },
  ];
  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.18)', overflow: 'hidden', maxWidth: 480, transform: 'rotate(-1deg)' }}>
      <div style={{ padding: '14px 18px', background: PURPLE, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: YELLOW, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>Cornerstone PM · This quarter</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff', marginTop: 4 }}>4.8 ★ · 247 reviews</div>
        </div>
        <div style={{ background: GREEN, color: PURPLE, padding: '4px 10px', borderRadius: 999, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' }}>+38 this Q</div>
      </div>
      {reviews.map((r, i) => (
        <div key={i} style={{ padding: '14px 18px', borderBottom: i < reviews.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#f5b800', fontSize: 11 }}>{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</span>
              {r.v && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: GREEN, fontWeight: 700, letterSpacing: '0.10em' }}>● VERIFIED</span>}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999' }}>{r.time}</div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, color: PURPLE, marginBottom: 4 }}>{r.name}</div>
          <div style={{ fontSize: 12, color: '#444', lineHeight: 1.5 }}>"{r.body}"</div>
        </div>
      ))}
    </div>
  );
}

interface FAQItemProps { q: string; a: string; bordered: boolean; accent: string; }
function FAQItem({ q, a, bordered, accent }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: bordered ? '1px solid var(--border-subtle)' : 'none' }}>
      <button type="button" onClick={() => setOpen(!open)} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 24, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: PURPLE, letterSpacing: '-0.01em' }}>
        <span>{q}</span>
        <span style={{ width: 28, height: 28, borderRadius: 999, background: open ? accent : 'var(--alloy-pink-tint)', color: open ? '#fff' : PURPLE, display: 'grid', placeItems: 'center', transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'all 200ms var(--ease-standard)', flexShrink: 0 }}>
          <Icon name="plus" size={16} strokeWidth={2.5} />
        </span>
      </button>
      {open && <div className="reveal" style={{ padding: '0 28px 24px', color: '#555', fontSize: 15, lineHeight: 1.7, maxWidth: 800 }}>{a}</div>}
    </div>
  );
}

export default function ServiceReputationManagementPage() {
  const includes = [
    { icon: 'search',    h: 'Reputation audit',            d: 'Every surface boards check: Google, BBB, Yelp, Reddit, Nextdoor, CAI, CAM-industry forums. Sentiment baseline, competitor benchmarking, and the bad-data clean-up plan.' },
    { icon: 'zap',       h: 'Review velocity engine',      d: 'Trigger-based ask system. Closed work order → review prompt. Board renewal → review prompt. Annual meeting → review prompt. Velocity is the metric that moves rankings.' },
    { icon: 'shield',    h: 'Response protocol',           d: 'Every review gets a response, on a 24-hour clock, in your firm\'s voice. Approved templates for the 12 most common review types. Escalation flow for crises.' },
    { icon: 'edit',      h: 'Negative-review playbook',    d: 'Mediation-first language. Operationally what to do, legally what not to say. We\'ve handled 200+ negative reviews — none escalated to legal.' },
    { icon: 'globe',     h: 'Off-site profile management', d: 'GBP optimization, BBB profile, CAI directory, third-party CAM directories. NAP consistency, photos, posts, Q&A monitoring. The corpus AI search reads when boards research you.' },
    { icon: 'sparkles',  h: 'Crisis response',             d: 'Reddit thread blowing up? Local news story? Board going to a competitor publicly? On-call response within 2 hours, full plan within 24, mitigation in motion same week.' },
    { icon: 'feather',   h: 'Story repair content',        d: 'When you\'ve inherited a reputation problem, we publish authority content (case studies, board testimonials, transparency reports) that surfaces above the legacy noise within 60–90 days.' },
    { icon: 'compass',   h: 'AI search reputation',        d: 'Boards ask ChatGPT \'is X CAM company any good.\' We monitor what LLMs say about you, fix bad citations, and seed authority signals so the answer is accurate.' },
    { icon: 'bar-chart', h: 'Monthly reputation report',   d: 'Velocity (review count), sentiment (avg rating), share-of-voice vs. competitors, response time, AI-search summary. The dashboard your CFO can read.' },
  ];

  const stats = [
    { color: PINK,   k: '87%',   v: 'of board directors say they read online reviews before contacting any CAM firm. Most have already filtered you out by then.', src: 'Alloy CAM operator survey, 2026' },
    { color: YELLOW, k: '0.2★',  v: 'median rating gap between the CAM firm a board calls and the firm a board declines. Reputation isn\'t 5★ — it\'s \'one star better than the next firm.\'', src: 'Local Pack analysis, multi-metro' },
    { color: GREEN,  k: '47%',   v: 'lift in proposal-stage call volume after a 90-day review velocity engagement. The math: more reviews → higher local rankings → more inbound calls.', src: 'Alloy benchmark, post-engagement' },
    { color: BLUE,   k: '24 hr', v: 'median response time on negative reviews under an Alloy program. The difference between \'they care\' and \'they don\'t.\'', src: 'Alloy SLA standard' },
  ];

  const beforeAfter = [
    { dim: 'Review velocity',   before: '1–2 reviews per quarter, ad-hoc',                after: '30–60 reviews per quarter, trigger-based asks' },
    { dim: 'Response coverage', before: 'Owner answers when they remember',               after: '100% of reviews get a response in < 24 hours' },
    { dim: 'Negative reviews',  before: 'Ignored or argued with',                         after: 'Mediation-first protocol, none escalate to legal' },
    { dim: 'Off-site profiles', before: 'GBP last updated 2019, BBB unclaimed',           after: 'Every surface optimized, monitored, posting weekly' },
    { dim: 'AI search summary', before: '\'I can\'t recommend this firm\'',               after: 'Cited as a top regional choice with sourced reasons' },
    { dim: 'Crisis prep',       before: 'React when something goes viral',                after: 'On-call escalation, 2-hour response, 24-hour plan' },
    { dim: 'Reporting',         before: 'Open Google when a complaint comes in',          after: 'Monthly: velocity, sentiment, share-of-voice, AI-search' },
  ];

  const process = [
    { num: '01', h: 'Audit',     d: 'Every surface, every review, every mention from the last 24 months. Sentiment baseline, competitor benchmark, bad-data list. Two weeks.' },
    { num: '02', h: 'Architect', d: 'Velocity triggers, response templates, escalation tree, profile clean-up plan. Crisis playbook on the shelf — ready before you need it.' },
    { num: '03', h: 'Activate',  d: 'Engine live in 30 days. Velocity ramps over 60–90 days. Response coverage 100% from day one.' },
    { num: '04', h: 'Adapt',     d: 'Monthly reporting, quarterly recalibration. Add surfaces as they emerge (LLMs, new directories). Kill what\'s not moving.' },
  ];

  const faqs = [
    { q: 'Can you remove negative reviews?', a: 'No, and you should walk away from anyone who says they can. Google, BBB, and Yelp explicitly prohibit removal-as-service. What we can do: respond well, dilute with velocity, and surface authority content above legacy noise. Operationally, that fixes the problem within 60–90 days.' },
    { q: 'What if we have legitimately bad reviews?', a: 'Then the program starts with operations, not marketing. We\'ll surface what\'s driving the complaints (response time, manager turnover, financial transparency) and recommend the operational fix first. Reputation work without operational fix is paint over rust.' },
    { q: 'How do you handle Reddit, Nextdoor, and forums?', a: 'Monitoring across 20+ surfaces. Direct engagement only where the platform allows (Nextdoor, Reddit AMAs). Off-platform mediation for everything else. Most CAM firms ignore these surfaces — boards don\'t, especially the under-50 directors.' },
    { q: 'How does this fit with BoardSuite?', a: 'Reputation is a BoardRetain (Keep) engine — protecting the portfolio you have. But it feeds BoardReach (Attract) directly: high local rankings, strong AI-search summaries, and visible review velocity all bring in new boards. One investment, two returns.' },
  ];

  const colors = [PINK, YELLOW, GREEN, BLUE] as string[];

  return (
    <>
      <section className="hero" style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: PINK, boxShadow: '0 0 0 4px rgba(217,53,110,0.20)' }}></span>
                <Eyebrow onDark noLine>BoardRetain · Reputation Management</Eyebrow>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                The board has <span style={{ color: PINK }}>already read</span> your reviews.<br/>
                Make sure they say <span style={{ color: YELLOW }}>what you want.</span>
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 28, maxWidth: 600 }}>
                87% of board directors check reviews before they call. Most CAM firms have one star less than the firm next door — and don't know why. Alloy runs the velocity engine, the response protocol, and the AI-search reputation work that closes the gap.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
                <Button variant="primary" arrow href="/strategic-review-request">Audit my reputation</Button>
                <Button variant="secondary" onDark href="#what-you-get">What's included</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)', flexWrap: 'wrap' }}>
                {[{ k: 'Call lift', v: '47%' }, { k: 'Response', v: '< 24 hr' }, { k: 'Surfaces', v: '20+' }].map(s => (
                  <div key={s.k}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: 22, letterSpacing: '-0.02em' }}>{s.v}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginTop: 2 }}>{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', height: 540, display: 'grid', placeItems: 'center' }}>
              <div style={{ position: 'absolute', inset: '8% 4% 8% 4%', background: 'radial-gradient(ellipse at center, rgba(217,53,110,0.20) 0%, transparent 70%)', filter: 'blur(20px)' }}></div>
              <div style={{ width: '82%' }}><ReviewStreamMockup /></div>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      <section className="section section-ivory" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>Why this matters</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The numbers behind reputation work that converts.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {stats.map(s => (
              <div key={s.k} style={{ borderTop: `4px solid ${s.color}`, paddingTop: 22 }}>
                <div className="display-md" style={{ fontSize: 56, color: PURPLE, lineHeight: 0.95, marginBottom: 12, letterSpacing: '-0.025em', fontWeight: 800 }}>{s.k}</div>
                <div style={{ fontSize: 14, color: '#444', lineHeight: 1.55 }}>{s.v}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#999', letterSpacing: '0.08em', marginTop: 12, textTransform: 'uppercase', fontWeight: 600 }}>{s.src}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="what-you-get" className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The complete reputation engine, run by Alloy.</h2>
          </div>
          <ServiceList color={PINK} items={includes} />
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The honest comparison</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Hope-for-the-best vs. an actual program.</h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '16px 24px', background: PURPLE, color: '#fff', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
              <div>Dimension</div><div style={{ opacity: 0.6 }}>Most CAM firms</div><div style={{ color: YELLOW }}>Alloy reputation engine</div>
            </div>
            {beforeAfter.map((row, i) => (
              <div key={row.dim} style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '20px 24px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', gap: 24, alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 14 }}>{row.dim}</div>
                <div style={{ fontSize: 14, color: '#888', lineHeight: 1.55, fontStyle: 'italic' }}>{row.before}</div>
                <div style={{ fontSize: 14, color: '#222', lineHeight: 1.55, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Icon name="check" size={16} color={PINK} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{row.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow onDark>How we run it</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>From audit to live engine in <span style={{ color: YELLOW }}>30 days.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {process.map((s, i) => (
              <div key={s.num} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderTop: `3px solid ${colors[i]}`, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: colors[i], fontSize: 12, letterSpacing: '0.16em', marginBottom: 12 }}>{s.num}</div>
                <div className="display-md" style={{ fontSize: 22, color: '#fff', marginBottom: 10 }}>{s.h}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
        headline="Ready to see what boards see when they search you?"
        sub="30 minutes. We'll audit every surface — Google, BBB, Yelp, Reddit, Nextdoor, AI search — and show you the velocity gap between you and the firm next door."
      />
    </>
  );
}
