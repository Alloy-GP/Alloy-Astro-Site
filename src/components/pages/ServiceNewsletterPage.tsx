// src/components/pages/ServiceNewsletterPage.tsx
// Newsletter Production service page — /services/hoa-newsletter-production
import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import AccentBar from '~/components/AccentBar';
import Button from '~/components/Button';
import Eyebrow from '~/components/Eyebrow';
import Icon from '~/components/Icon';
import Tag from '~/components/Tag';
import { CtaBand, ServiceList } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

// ─── Newsletter mockup ────────────────────────────────────────────────────────
function NewsletterMockup({ variant = 'branded' }: { variant?: 'branded' | 'generic' }) {
  const isBranded = variant === 'branded';
  const accent = isBranded ? PINK : '#999';
  const ink = isBranded ? PURPLE : '#222';
  const masthead = isBranded ? '#fff7eb' : '#f3f3f3';
  const headlineFont = isBranded ? 'var(--font-display)' : 'Times, serif';
  return (
    <div style={{
      background: '#fff', borderRadius: 6,
      boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.18)',
      width: '100%', maxWidth: 460, overflow: 'hidden',
      transform: isBranded ? 'rotate(-1.5deg)' : 'rotate(1.5deg)',
      fontFamily: 'var(--font-body)', position: 'relative',
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)' }} />
      <div style={{ background: masthead, padding: '20px 24px 16px', borderBottom: `4px solid ${accent}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
            {isBranded ? 'Vol. 04 · Issue 11' : 'Microsoft Word · Page 1'}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#999', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {isBranded ? 'November 2026' : 'Nov 2026'}
          </div>
        </div>
        <div style={{ fontFamily: headlineFont, fontWeight: isBranded ? 800 : 700, fontSize: isBranded ? 28 : 22, color: ink, letterSpacing: isBranded ? '-0.02em' : '0', lineHeight: 1.05, margin: 0 }}>
          {isBranded ? 'The Cornerstone Quarterly' : 'HOA Newsletter'}
        </div>
        <div style={{ fontFamily: isBranded ? 'var(--font-display)' : 'Times, serif', fontStyle: isBranded ? 'normal' : 'italic', fontSize: 11, color: isBranded ? '#7a6a4a' : '#666', marginTop: 4, fontWeight: 500 }}>
          {isBranded ? 'Edition for Maple Glen HOA · Prepared by Cornerstone Property Management' : 'October Notes from Your Board President'}
        </div>
      </div>
      <div style={{ padding: '20px 24px 24px', display: 'grid', gridTemplateColumns: isBranded ? '1.4fr 1fr' : '1fr', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: ink, marginBottom: 6, letterSpacing: isBranded ? '-0.01em' : 0 }}>
            {isBranded ? 'Reserve study results — what they mean for 2027 dues.' : 'Pool will close Oct 31'}
          </div>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ height: 5, background: '#e6e0d4', borderRadius: 1, marginBottom: 5, width: i === 4 ? '62%' : '100%', opacity: 0.65 }} />
          ))}
          <div style={{ marginTop: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, color: accent, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {isBranded ? 'Read the breakdown →' : ''}
          </div>
          {isBranded && (
            <div style={{ marginTop: 16, padding: '10px 12px', background: 'var(--alloy-yellow-tint)', borderRadius: 4, borderLeft: `3px solid ${YELLOW}` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#8a7330', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Board action item</div>
              <div style={{ fontSize: 10, color: '#5a4a1a', lineHeight: 1.4 }}>Approve fence-color palette by Nov 18 to lock in vendor pricing for spring.</div>
            </div>
          )}
        </div>
        {isBranded && (
          <div style={{ background: 'linear-gradient(160deg, #fbe2eb 0%, #fbf2d6 100%)', borderRadius: 4, padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 100 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: PURPLE, letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase' }}>From your manager</div>
            <div>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: '#fff', marginBottom: 6, opacity: 0.7 }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700, color: PURPLE }}>Marisol Ortega</div>
              <div style={{ fontSize: 8, color: '#7a5a6a' }}>Senior Manager · 12 yrs</div>
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: '10px 24px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 8, color: '#aaa', letterSpacing: '0.1em' }}>
        <span>{isBranded ? 'CORNERSTONE.COM/MAPLEGLEN' : 'Page 1 of 4'}</span>
        <span>{isBranded ? '(512) 555-0142' : 'Print and post on bulletin board'}</span>
      </div>
    </div>
  );
}

// ─── Editorial calendar ───────────────────────────────────────────────────────
function EditorialCalendar() {
  const months = [
    { m: 'Jan', t: 'New-year budget', c: PINK },
    { m: 'Feb', t: 'Reserve planning', c: BLUE },
    { m: 'Mar', t: 'Spring landscape', c: GREEN },
    { m: 'Apr', t: 'Annual meeting', c: PINK },
    { m: 'May', t: 'Pool rules refresh', c: YELLOW },
    { m: 'Jun', t: 'Summer events', c: GREEN },
    { m: 'Jul', t: 'Mid-year financials', c: BLUE },
    { m: 'Aug', t: 'Election prep', c: PINK },
    { m: 'Sep', t: 'Storm-season prep', c: YELLOW },
    { m: 'Oct', t: 'Fall reserve study', c: BLUE },
    { m: 'Nov', t: '2027 dues notice', c: PINK },
    { m: 'Dec', t: 'Year-in-review', c: GREEN },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 6, background: '#fff', padding: 18, borderRadius: 14, border: '1px solid var(--border-subtle)' }}>
      {months.map((mo, i) => (
        <div key={mo.m} style={{ padding: '16px 8px', borderTop: `3px solid ${mo.c}`, background: i % 2 === 0 ? '#fafaff' : 'transparent', borderRadius: 4, minHeight: 120, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: PURPLE, fontSize: 13, letterSpacing: '-0.01em' }}>{mo.m}</div>
          <div style={{ fontSize: 11, color: '#666', lineHeight: 1.35 }}>{mo.t}</div>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ height: 3, background: mo.c, borderRadius: 1, opacity: 0.95 }} />
            <div style={{ height: 3, background: mo.c, borderRadius: 1, opacity: 0.55, width: '70%' }} />
            <div style={{ height: 3, background: mo.c, borderRadius: 1, opacity: 0.30, width: '40%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────
interface FAQItemProps { q: string; a: string; bordered?: boolean; accent?: string; }
function FAQItem({ q, a, bordered = true, accent = PINK }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: bordered ? '1px solid var(--border-subtle)' : 'none' }}>
      <button type="button" onClick={() => setOpen(!open)} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 24, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: PURPLE, letterSpacing: '-0.01em' }}>
        <span>{q}</span>
        <span style={{ width: 28, height: 28, borderRadius: 999, background: open ? accent : 'var(--alloy-pink-tint)', color: open ? '#fff' : PURPLE, display: 'grid', placeItems: 'center', transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'all 200ms var(--ease-standard)', flexShrink: 0 }}>
          <Icon name="plus" size={16} strokeWidth={2.5} />
        </span>
      </button>
      {open && <div style={{ padding: '0 28px 24px', color: '#555', fontSize: 15, lineHeight: 1.7, maxWidth: 800 }}>{a}</div>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServiceNewsletterPage() {
  const audiences = [
    { tag: 'Board members', tagColor: BLUE, eyebrow: 'Looking for a template?', headline: "We don't sell templates — and your management company shouldn't either.", body: "If you're a director Googling 'HOA newsletter template,' you're patching a gap your management company should be filling. Forward this page to them. The right CAM firm produces your community newsletter as part of the service — branded, scheduled, and read.", cta: 'Send this to your manager', ctaHref: 'mailto:?subject=Newsletter%20production%20by%20our%20management%20company&body=Came%20across%20this%20%E2%80%94%20curious%20if%20we%20could%20do%20this%20instead%20of%20building%20one%20each%20month%3A%20https%3A%2F%2Falloygp.co%2Fservices%2Fnewsletter-production-for-hoa-management%2F' },
    { tag: 'CAM operators', tagColor: PINK, eyebrow: 'Producing newsletters in-house?', headline: "Newsletters are the cheapest retention asset you're not making.", body: "A newsletter that actually arrives, looks professional, and answers the questions boards keep asking is worth more than any sales deck. We produce them for your portfolio at scale — same masthead, customized per association, on a schedule your managers don't have to manage.", cta: 'Talk to Alloy', ctaHref: '/strategic-review-request' },
  ];

  const includes = [
    { icon: 'edit', h: 'Editorial calendar', d: '12 months of board-stage themes mapped to your portfolio\'s seasonality — reserve cycles, election prep, weather risk, dues notices.' },
    { icon: 'feather', h: 'Original writing', d: 'CAM-fluent writers (not generalists) draft every issue. Reserve studies, ARC denials, statute updates — written so boards actually read them.' },
    { icon: 'layout', h: 'Brand-system design', d: "One masthead system that flexes per association. Your firm's identity stays consistent; each community sees its own name." },
    { icon: 'layers', h: 'Per-association customization', d: 'Auto-merged blocks for community-specific dates, financials, and notices. One production run, dozens of customized editions.' },
    { icon: 'send', h: 'Distribution: print + email', d: "PDF for portal/print posting, responsive email for direct distribution. Managers don't touch InDesign." },
    { icon: 'shield', h: 'Compliance review', d: 'Optional pre-publication legal pass for state-specific notice language, reserve disclosures, and election communications.' },
    { icon: 'globe', h: 'Bilingual editions', d: 'EN/ES (others on request) with the same editorial standard — not translation tools, professional translators familiar with HOA terminology.' },
    { icon: 'bar-chart', h: 'Open & engagement reporting', d: 'Per-association open rates, click maps, and reading depth — fed into your retention dashboard so you can see which boards are tuning out before churn shows up.' },
    { icon: 'archive', h: 'Searchable archive', d: 'Every issue indexed and hosted on your domain — boards search for past topics instead of emailing managers the same questions twice.' },
  ];

  const beforeAfter = [
    { dim: 'Producer', before: 'Manager, late on Friday', after: 'Alloy editorial team, on calendar' },
    { dim: 'Format', before: 'Word doc → PDF, single column', after: 'Designed system, print + responsive email' },
    { dim: 'Voice', before: "Notice-board prose ('Pool will close')", after: "Manager's voice, board-stage editorial" },
    { dim: 'Cadence', before: 'Whenever there\'s time (≈4×/yr)', after: 'Monthly or quarterly, on a published schedule' },
    { dim: 'Open rate', before: 'Unknown — printed, posted, lost', after: 'Tracked per association, segmented by board vs. homeowner' },
    { dim: 'Compliance', before: 'Hope the manager remembered', after: 'Pre-publish legal pass on every issue' },
    { dim: 'Cost per issue', before: '≈3–5 manager hours, never billed', after: 'Fixed per-association line item' },
  ];

  const stats = [
    { color: PINK,   k: '63%',   v: "of board members say their management firm 'rarely' communicates outside of meetings.", src: 'Industry survey, n=412 board members, 2025' },
    { color: YELLOW, k: '4.2×',  v: "median lift in board-perceived 'manager responsiveness' when newsletters arrive on a published schedule.", src: 'Alloy benchmark, Apex CMG* cohort' },
    { color: GREEN,  k: '≈3 hrs', v: 'saved per association per month — manager time redirected from layout to actual property work.', src: 'Apex CMG* operator interviews' },
    { color: BLUE,   k: '$0',    v: "extra software cost. Newsletters live inside BoardSuite — no separate Mailchimp, no separate design tool.", src: '—' },
  ];

  const process = [
    { num: '01', h: 'Portfolio audit', d: 'We inventory every association in your portfolio — name, brand assets, board composition, current comms cadence (or lack of it).' },
    { num: '02', h: 'Editorial system build', d: '12-month theme calendar, masthead system, voice guide. Approved by your leadership before issue one.' },
    { num: '03', h: 'Per-issue production', d: 'Draft → manager review (24-hour turn) → design → optional compliance pass → distribution.' },
    { num: '04', h: 'Reporting & iteration', d: 'Monthly engagement readout. We trim what boards skip and double down on what they read.' },
  ];

  const faqs = [
    { q: 'We have 80 associations. Do you produce 80 different newsletters?', a: "Yes — but with one editorial backbone. Each issue follows your firm's voice and calendar. Per-association content (dates, financials, names, notices) is merged in automatically. One production run, dozens of customized editions, no extra manager time." },
    { q: 'Can we edit issues before they go out?', a: "Every issue gets a 24-hour manager-review window before distribution. You can approve as-is, request copy edits, or replace per-association blocks. Beyond 24 hours, we publish on schedule — boards complain when newsletters slip." },
    { q: 'Do you handle compliance language for state-specific notices?', a: "Optionally. We offer a pre-publish legal pass that checks reserve-disclosure language, election communications, and state-specific notice requirements. Most clients add this at portfolio scale — it's cheaper than one missed notice." },
    { q: 'Print, email, or both?', a: "Both, by default. We deliver a print-ready PDF for portal hosting and bulletin-board posting, plus a responsive HTML email distributed via your existing list (or Alloy's, if you don't have one)." },
    { q: 'How does this fit with BoardSuite?', a: "Newsletter Production lives inside BoardRetain (Keep). It's the highest-frequency retention touchpoint — the thing every board sees every month, branded as your firm. Engagement data feeds back into BoardRetain so you can see which associations are tuning out before churn shows up in the renewal call." },
    { q: 'We already have a newsletter. Can you take it over?', a: "Yes, and we usually find quick wins inside the first 60 days — open rates climbing, manager hours dropping. The audit covers what's working before we touch anything." },
  ];

  const retentionFlow = [
    { c: PINK,   label: 'Issue ships on schedule', note: "Boards see your firm's masthead in their inbox the same week, every month — no missed cadence." },
    { c: GREEN,  label: 'Boards forward to homeowners', note: 'Directors look responsive without doing extra work. Your brand reaches the homeowner audience directors care about.' },
    { c: YELLOW, label: 'Engagement signal feeds BoardRetain', note: 'Open rates and reading depth flag which boards are tuning out — months before churn shows up in the renewal call.' },
    { c: BLUE,   label: 'Renewal conversations open warmer', note: "'We saw your piece on reserve studies' replaces 'remind me what you do for us?' Renewal is a confirmation, not a sales call." },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-bg-grid" />
        <div className="hero-inner" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: GREEN, boxShadow: '0 0 0 4px rgba(174,215,208,0.18)' as string } as CSSProperties} />
                <Eyebrow onDark noLine>Service · Newsletter Production for HOA Management</Eyebrow>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                The HOA newsletter your boards <span style={{ color: YELLOW }}>actually read</span>—<br />
                produced for your <span style={{ color: PINK }}>entire portfolio.</span>
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 28, maxWidth: 580 }}>
                Stop having managers patch together Word docs at 6pm on Friday. Alloy produces branded, on-calendar newsletters for every association you manage — written by CAM-fluent editors, designed once, customized per community, distributed in print and email.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
                <Button variant="primary" arrow href="/strategic-review-request">See a sample</Button>
                <Button variant="secondary" onDark href="#what-you-get">What's included</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)', flexWrap: 'wrap' }}>
                {[{ k: 'Issues / yr', v: '12' }, { k: 'Mgr time / issue', v: '≈ 0 hrs' }, { k: 'Inside BoardSuite', v: 'Yes' }].map(s => (
                  <div key={s.k}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: 22, letterSpacing: '-0.02em' }}>{s.v}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginTop: 2 }}>{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', height: 540, display: 'grid', placeItems: 'center', overflow: 'visible' }}>
              <div style={{ position: 'absolute', inset: '8% 4% 8% 4%', background: 'radial-gradient(ellipse at center, rgba(245,216,128,0.25) 0%, transparent 70%)', filter: 'blur(20px)' }} />
              <div style={{ position: 'absolute', left: '8%', top: '8%', width: '70%', opacity: 0.5, filter: 'saturate(0.7)' }}>
                <NewsletterMockup variant="generic" />
              </div>
              <div style={{ position: 'absolute', right: '0%', top: '20%', width: '82%' }}>
                <NewsletterMockup variant="branded" />
              </div>
              <div style={{ position: 'absolute', right: '-2%', top: '8%', background: '#fff', color: PURPLE, padding: '8px 14px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, boxShadow: '0 12px 30px rgba(0,0,0,0.30)', transform: 'rotate(6deg)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: PINK } as CSSProperties} />
                Branded by Alloy
              </div>
              <div style={{ position: 'absolute', left: '-4%', bottom: '4%', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', padding: '6px 12px', borderRadius: 999, fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.15)', transform: 'rotate(-4deg)', zIndex: 5, backdropFilter: 'blur(4px)' }}>
                Manager-made · 5pm Fri
              </div>
            </div>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* AUDIENCE SPLIT */}
      <section className="section section-white" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>Who's reading this page</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 10px', color: PURPLE }}>If you searched <span style={{ fontStyle: 'italic', color: PINK }}>"HOA newsletter,"</span><br />we know which one you are.</h2>
            <p className="lead">Two very different visitors land here. One needs a template. The other needs a vendor. Both leave with the right answer.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {audiences.map(a => (
              <div key={a.tag} className="card card-pad" style={{ borderTop: `5px solid ${a.tagColor}`, display: 'flex', flexDirection: 'column', gap: 14, padding: 36 }}>
                <div><Tag {...(a.tagColor === PINK ? { color: 'pink' } : { color: 'blue' })}>{a.tag}</Tag></div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: a.tagColor, letterSpacing: '0.10em', textTransform: 'uppercase' }}>{a.eyebrow}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: PURPLE, letterSpacing: '-0.018em', lineHeight: 1.2 }}>{a.headline}</div>
                <p style={{ color: '#555', lineHeight: 1.65, fontSize: 15, margin: 0 }}>{a.body}</p>
                <div style={{ marginTop: 'auto', paddingTop: 12 }}>
                  <Button variant={a.tagColor === PINK ? 'primary' : 'ghost'} arrow href={a.ctaHref} size="sm">{a.cta}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="section section-ivory" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>Why CAM firms produce newsletters</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The cheapest retention asset in your stack.</h2>
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

      {/* EDITORIAL CALENDAR */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 36, display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'end' }}>
            <div>
              <Eyebrow>The cadence</Eyebrow>
              <h2 className="display-lg" style={{ margin: '14px 0 10px', color: PURPLE }}>A 12-month editorial rhythm — built around <span style={{ color: PINK }}>your portfolio's actual year.</span></h2>
              <p style={{ color: '#555', lineHeight: 1.65, fontSize: 16, margin: 0, maxWidth: 720 }}>Reserve cycles. Annual meetings. Storm season. Dues notices. Your associations have a year that actually repeats — so why does communication feel improvised every month?</p>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 240 }}>
              {[{ c: PINK, l: 'Financial' }, { c: GREEN, l: 'Community' }, { c: BLUE, l: 'Governance' }, { c: YELLOW, l: 'Seasonal' }].map(x => (
                <div key={x.l} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ width: 10, height: 10, background: x.c, borderRadius: 2 } as CSSProperties} />
                  <span style={{ fontSize: 12, color: '#666' }}>{x.l}</span>
                </div>
              ))}
            </div>
          </div>
          <EditorialCalendar />
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section id="what-you-get" className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The complete newsletter operation, run by Alloy.</h2>
          </div>
          <ServiceList color={GREEN} items={includes} />
        </div>
      </section>

      {/* BEFORE / AFTER TABLE */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The honest comparison</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Manager-produced vs. Alloy-produced.</h2>
          </div>
          <div className="svc-compare-wrap" style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '16px 24px', background: PURPLE, color: '#fff', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
              <div>Dimension</div>
              <div style={{ opacity: 0.6 }}>In-house: manager + Word</div>
              <div style={{ color: YELLOW }}>Alloy newsletter production</div>
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

      {/* PROCESS */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow onDark>Onboarding</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>From zero to first issue in <span style={{ color: YELLOW }}>30 days.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {process.map((s, i) => (
              <div key={s.num} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderTop: `3px solid ${([PINK, YELLOW, GREEN, BLUE] as string[])[i]}`, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: ([PINK, YELLOW, GREEN, BLUE] as string[])[i], fontSize: 12, letterSpacing: '0.16em', marginBottom: 12 }}>{s.num}</div>
                <div className="display-md" style={{ fontSize: 22, color: '#fff', marginBottom: 10 }}>{s.h}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36, padding: 24, background: 'rgba(245,216,128,0.08)', border: '1px dashed rgba(245,216,128,0.30)', borderRadius: 10, display: 'flex', gap: 18, alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: YELLOW, lineHeight: 1, flexShrink: 0 }}>30</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>
              <strong style={{ color: '#fff' }}>days from kickoff to first issue published.</strong>{' '}
              Editorial system in week 1. Drafts in week 2. Review and design in week 3. Distribution in week 4. Every month after, a new issue lands without your team lifting a finger.
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT FITS BOARDSUITE */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'center' }}>
            <div>
              <Eyebrow>Where it lives</Eyebrow>
              <h2 className="display-lg" style={{ margin: '14px 0 18px', color: PURPLE }}>A retention engine — not a marketing add-on.</h2>
              <p style={{ fontSize: 16, color: '#444', lineHeight: 1.7, marginBottom: 16 }}>
                Newsletter Production is a <strong style={{ color: PURPLE }}>BoardRetain</strong> service because the boards who churn are the boards who feel ignored. A newsletter on a published cadence is the cheapest, most visible signal that you're still there.
              </p>
              <p style={{ fontSize: 16, color: '#444', lineHeight: 1.7, marginBottom: 24 }}>
                It's the highest-frequency touchpoint in the retention stack — the thing every board sees every month, branded as your firm, written in your voice.
              </p>
              <Button variant="ghost" arrow href="/our-approach/boardretain">See BoardRetain</Button>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: 32, border: '1px solid var(--border-subtle)', boxShadow: '0 16px 48px rgba(56,28,79,0.08)' }}>
              <Eyebrow noLine>How it drives renewal</Eyebrow>
              <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '14px 16px', alignItems: 'center' }}>
                {retentionFlow.map((f, i) => (
                  <React.Fragment key={f.label}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 14, height: 14, borderRadius: 999, background: f.c, boxShadow: `0 0 0 4px ${f.c}33` } as CSSProperties} />
                      {i < 3 && <div style={{ width: 2, height: 22, background: 'var(--border-subtle)' }} />}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: PURPLE }}>{f.label}</div>
                      <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{f.note}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-white">
        <div className="container-narrow">
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <Eyebrow noLine>Common questions</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px auto 0', color: PURPLE }}>What CAM operators actually ask.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--border-subtle)' }}>
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} bordered={true} accent={PINK} />)}
          </div>
        </div>
      </section>

      <CtaBand
        headline="Ready for newsletters that don't fall on managers?"
        sub="30 minutes. We'll review your portfolio, audit your current comms cadence, and show you a live sample masthead branded for your firm."
      />
    </>
  );
}
