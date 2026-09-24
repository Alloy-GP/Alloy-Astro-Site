// src/components/pages/ServiceEmailMarketingPage.tsx
// HOA Email Marketing for Management Companies — /boardreach/email-marketing
import { useState } from 'react';
import AccentBar from '~/components/AccentBar';
import Button from '~/components/Button';
import Eyebrow from '~/components/Eyebrow';
import Icon from '~/components/Icon';
import { CtaBand, ServiceList } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

function EmailInboxMockup() {
  const emails = [
    { from: 'Cornerstone PM',   subj: 'Reserve study Q&A — your 7 questions answered', time: 'Now',  pin: true,  c: PINK },
    { from: 'Cornerstone PM',   subj: 'Q1 financial summary · Cypress Lakes',          time: '2d',   pin: false, c: BLUE },
    { from: 'Cornerstone PM',   subj: 'Board memo: HB-2024 update + what it means',    time: '1w',   pin: false, c: GREEN },
    { from: 'Cornerstone PM',   subj: 'RFP help: 5 things to ask any CAM finalist',    time: '2w',   pin: false, c: YELLOW },
  ];
  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.18)', overflow: 'hidden', maxWidth: 480, transform: 'rotate(-1deg)' }}>
      <div style={{ padding: '10px 14px', background: '#f4f0fa', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: '#fb6c5b' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: '#f8bb3e' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: '#5dc850' }}></span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#666' }}>📬 Inbox · Board director</div>
      </div>
      {emails.map((e, i) => (
        <div key={i} style={{ padding: '14px 18px', borderBottom: i < emails.length - 1 ? '1px solid #f0f0f0' : 'none', background: e.pin ? '#fafaff' : '#fff', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ width: 6, height: 6, borderRadius: 999, background: e.c, flexShrink: 0, marginTop: 6 }}></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: PURPLE }}>{e.from}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999' }}>{e.time}</div>
            </div>
            <div style={{ fontSize: 12, color: '#333', lineHeight: 1.4 }}>{e.subj}</div>
          </div>
        </div>
      ))}
      <div style={{ padding: '10px 18px', background: '#fafafa', borderTop: '1px solid #eee', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999', letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 700 }}>4 of 12 from Cornerstone this quarter</div>
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

export default function ServiceEmailMarketingPage() {
  const includes = [
    { icon: 'edit',      h: 'Three-track program design',       d: 'Board nurture (RFP-stage), homeowner operations (current portfolio), new-business cadence (cold pipeline). Each track on its own calendar, voice, and frequency.' },
    { icon: 'feather',   h: 'CAM-fluent ghostwriting',          d: 'Editors who\'ve been inside the industry. Reserve studies, HB updates, special assessments, board governance — written so directors recognize the language.' },
    { icon: 'layers',    h: 'Branded templates per association', d: 'Each association gets its own header, color, and signature line — but the engine is one. Your portfolio scales without copy-pasting.' },
    { icon: 'calendar',  h: 'Editorial calendar',               d: '12-month plan: monthly board newsletters, quarterly state-of-portfolio, ad-hoc legislative alerts, RFP-stage nurture, win-back sequences.' },
    { icon: 'sparkles',  h: 'Lead magnets + gated assets',      d: 'RFP scorecards, reserve checklists, board-onboarding kits. Gated downloads that grow your list with researching boards — fed into the new-business cadence.' },
    { icon: 'zap',       h: 'Automations + segmentation',       d: 'Welcome flows, RFP-anniversary triggers, re-engagement, board-turnover detection. Every email goes to the right segment at the right moment.' },
    { icon: 'shield',    h: 'CAN-SPAM + accessibility',         d: 'Compliant unsubs, plain-text fallbacks, alt text, color-contrast verified. Lawsuits and bounce-rate damage are real — we don\'t let them happen.' },
    { icon: 'search',    h: 'Deliverability monitoring',        d: 'DMARC, DKIM, SPF, warm-up, sender-reputation tracking. CAM list quality is variable — we keep your domain off blocklists.' },
    { icon: 'bar-chart', h: 'Monthly pipeline report',          d: 'Open, click, reply, conversion by track. List growth, unsub trends, top-performing assets. The metrics you\'d want if email were a sales rep.' },
  ];

  const stats = [
    { color: PINK,   k: '4×',   v: 'median lift in proposal-stage opens when CAM firms move from ad-hoc broadcasts to a scored, segmented program.', src: 'Alloy multi-client benchmark' },
    { color: YELLOW, k: '$36',  v: 'average return per dollar spent on permission-based B2B email — still the highest-ROI channel in the marketing stack.', src: 'DMA ROI study, 2024' },
    { color: GREEN,  k: '30%',  v: 'of board directors say email is their top channel for staying informed about CAM industry changes.', src: 'Alloy CAM operator survey, 2026' },
    { color: BLUE,   k: '12+',  v: 'branded sends per association per year is the median program — not \'when we have time,\' which is what most CAM firms run today.', src: 'Alloy Newsletter cadence' },
  ];

  const beforeAfter = [
    { dim: 'Cadence',      before: 'Ad-hoc, when someone has time',                  after: '12-month editorial calendar, 3 tracks, on schedule' },
    { dim: 'Voice',        before: 'Whoever wrote it last — usually the owner',      after: 'CAM-fluent editorial team, one consistent voice' },
    { dim: 'Segmentation', before: 'One list, one blast',                            after: 'Boards / homeowners / prospects / by-association segments' },
    { dim: 'Branding',     before: 'Plain text or generic Mailchimp template',       after: 'Per-association branded templates with shared CAM identity' },
    { dim: 'Lead capture', before: 'Newsletter signup nobody fills out',             after: 'Gated assets feeding the new-business cadence' },
    { dim: 'Compliance',   before: 'Hope nobody complains',                          after: 'CAN-SPAM, WCAG, deliverability monitoring on the engine' },
    { dim: 'Reporting',    before: 'Open rates if you remember to check',            after: 'Monthly: opens, clicks, replies, conversion, list health' },
  ];

  const process = [
    { num: '01', h: 'Audit',    d: 'Inbound list health, deliverability, current cadence, recent sends. The honest baseline — usually shows two of three tracks aren\'t running at all.' },
    { num: '02', h: 'Architect', d: 'Three-track program: board nurture, homeowner ops, new-business. Calendar, voice guide, segment plan. Templates designed per-association.' },
    { num: '03', h: 'Author',   d: 'First 90 days of content authored, scheduled, and approved. CAM-fluent editors. You review monthly — we ship weekly.' },
    { num: '04', h: 'Optimize', d: 'Monthly reporting, quarterly recalibration. Cut what\'s not opening. Double down on what is. List grows on autopilot via gated assets.' },
  ];

  const faqs = [
    { q: 'How is this different from your Newsletter Production service?', a: 'Newsletter Production is the print + email newsletter engine for your associations — homeowner-facing, monthly, association-by-association. Email Marketing is the broader program: it includes those newsletters but adds board nurture (RFP-stage), new-business cadence (cold pipeline growth), and the segmentation/automation layer that ties them together. Most BoardSuite Engineered tier clients run both.' },
    { q: 'What email platform do you use?', a: 'We work in your stack — Mailchimp, ActiveCampaign, HubSpot, Brevo, Klaviyo. If you don\'t have one, we\'ll spec the right one for your portfolio size and budget. We don\'t lock you into a proprietary tool.' },
    { q: 'Will boards actually open these?', a: 'When the cadence is right and the content is operator-grade. The median open rate on Alloy CAM email programs is 38% — well above the 21% B2B benchmark. The reason: boards already trust your firm and the content is genuinely useful. The wrong cadence kills the engine — that\'s why we audit first.' },
    { q: 'Do you handle homeowner emails too?', a: 'Yes — that\'s the operations track. Maintenance announcements, project updates, special-assessment communications, annual meeting notices. CAM-fluent writing your managers don\'t have time to do well.' },
    { q: 'How does this fit with BoardSuite?', a: 'Email Marketing runs across BoardReach (board nurture + new-business cadence) and BoardRetain (homeowner ops). It\'s the connective tissue between the engines. List growth from BoardReach feeds nurture; nurture ages into BoardMatch proposal stage; ops emails from BoardRetain protect the portfolio.' },
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
                <span style={{ width: 8, height: 8, borderRadius: 999, background: GREEN, boxShadow: '0 0 0 4px rgba(167,210,158,0.20)' }}></span>
                <Eyebrow onDark noLine>BoardReach + BoardRetain · HOA Email Marketing</Eyebrow>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                Three email tracks. <span style={{ color: PINK }}>One CAM firm.</span><br/>
                <span style={{ color: YELLOW }}>Always-on</span> — not "when we have time."
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 28, maxWidth: 600 }}>
                Most CAM firms send email when someone remembers. Alloy runs the program: board nurture for RFP-stage prospects, homeowner operations for the portfolio you have, new-business cadence for the pipeline you need. CAM-fluent, branded, on calendar.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
                <Button variant="primary" arrow href="/strategic-review-request">Audit my email program</Button>
                <Button variant="secondary" onDark href="#what-you-get">What's included</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)', flexWrap: 'wrap' }}>
                {[{ k: 'Open rate', v: '38%' }, { k: 'ROI', v: '$36 / $1' }, { k: 'Tracks', v: '3' }].map(s => (
                  <div key={s.k}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: 22, letterSpacing: '-0.02em' }}>{s.v}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginTop: 2 }}>{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', height: 540, display: 'grid', placeItems: 'center' }}>
              <div style={{ position: 'absolute', inset: '8% 4% 8% 4%', background: 'radial-gradient(ellipse at center, rgba(167,210,158,0.20) 0%, transparent 70%)', filter: 'blur(20px)' }}></div>
              <div style={{ width: '82%' }}><EmailInboxMockup /></div>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      <section className="section section-ivory" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>Why this matters</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The metrics behind a real email program.</h2>
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
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The complete email program, run by Alloy.</h2>
          </div>
          <ServiceList color={GREEN} items={includes} />
        </div>
      </section>

      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The honest comparison</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Send-when-you-remember vs. an actual program.</h2>
          </div>
          <div className="svc-compare-wrap" style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '16px 24px', background: PURPLE, color: '#fff', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
              <div>Dimension</div><div style={{ opacity: 0.6 }}>Most CAM email</div><div style={{ color: YELLOW }}>Alloy email program</div>
            </div>
            {beforeAfter.map((row, i) => (
              <div key={row.dim} style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '20px 24px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', gap: 24, alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 14 }}>{row.dim}</div>
                <div style={{ fontSize: 14, color: '#888', lineHeight: 1.55, fontStyle: 'italic' }}>{row.before}</div>
                <div style={{ fontSize: 14, color: '#222', lineHeight: 1.55, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Icon name="check" size={16} color={GREEN} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
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
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>From audit to live program in <span style={{ color: YELLOW }}>30 days.</span></h2>
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
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} bordered={i > 0} accent={GREEN} />)}
          </div>
        </div>
      </section>

      <CtaBand
        headline="Ready to see what your email is actually doing?"
        sub="30 minutes. We'll audit deliverability, cadence, and list health — and show you the three-track program sized to your portfolio."
      />
    </>
  );
}
