// src/components/pages/ServiceGoogleAdsPPCPage.tsx
// Alloy — Google Ads & PPC for CAM Companies
// Service detail page targeting "google ads property management" + paid acquisition for CAM.
// Sub-service inside BoardReach (Attract).

import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Icon from '~/components/Icon';
import { CtaBand, PageHero, ServiceList } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

// ─── Local FAQ accordion ───────────────────────────────────────────────────────
interface FAQItemProps { q: string; a: string; bordered: boolean; accent: string; }
function FAQItem({ q, a, accent }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 } as CSSProperties}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: PURPLE, lineHeight: 1.35 }}>{q}</span>
        <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: 999, background: open ? accent : 'var(--alloy-light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
          <Icon name={open ? 'arrow-down' : 'plus'} size={14} color={open ? '#fff' : PURPLE} strokeWidth={2.5} />
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: 22, fontSize: 15, color: '#444', lineHeight: 1.7, paddingRight: 40 }}>{a}</div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServiceGoogleAdsPPCPage() {
  const includes = [
    { icon: 'target',    h: 'Account architecture',        d: "Campaign structure built around board-buying intent — RFP-active, contract-end-window, replacement-search, expansion. Not the agency-template 'brand / non-brand / competitor' split that wastes 60% of CAM budgets." },
    { icon: 'search',    h: 'Keyword strategy',            d: "Bidding on the queries boards run — '<metro> HOA management RFP,' 'best community association management <metro>,' 'replace HOA management company.' Negative-keyword lists pruned weekly to keep homeowners and residents out of paid clicks." },
    { icon: 'edit',      h: 'Ad copy + creative',          d: "Headlines, descriptions, callouts, sitelinks — written for the board director comparing 4 firms, not a homeowner with a maintenance complaint. RSA optimization, A/B tested monthly." },
    { icon: 'compass',   h: 'Landing-page alignment',      d: "Each campaign points at a purpose-built landing page — RFP-track, market-expansion, replace-firm — with the conversion path designed for board directors. Not your homepage. Conversion lifts 3–5× from this alone." },
    { icon: 'trending',  h: 'Bid + budget management',     d: 'Daily bid management, geo-targeting tuned to your service areas, dayparting around board-meeting cycles. Budget allocated against pipeline value, not arbitrary monthly cap.' },
    { icon: 'shield',    h: 'LinkedIn Ads (when it fits)', d: "Targeted board-member outreach via LinkedIn — but only when your portfolio target justifies it. Most CAM firms shouldn't run LinkedIn Ads. We say so when that's true." },
    { icon: 'repeat',    h: 'Retargeting + nurture',       d: "Display + search retargeting against board researchers who didn't convert. Sequenced creative — case studies, FAQ, RFP guide — over a 90-day window matched to typical board decision cycles." },
    { icon: 'bar-chart', h: 'Pipeline-tied reporting',     d: 'Cost per qualified lead, cost per RFP invite, cost per signed contract — not just CTR and CPC. Wired into your CRM or BoardSuite. The dashboard your CFO can read without you in the room.' },
  ];

  const stats = [
    { color: PINK,   k: '$6+',   v: "average CPC for board-stage HOA-management queries. High CPC means high intent — and most CAM firms aren't bidding at all.",                     src: 'Keyword data, May 2026' },
    { color: YELLOW, k: '60%',   v: "of CAM PPC budgets we audit are spent on queries that don't convert — homeowner support, resident questions, branded competitor terms.",         src: 'Alloy audit benchmark' },
    { color: GREEN,  k: '$200K', v: "median ACV of a single signed contract from a paid lead. Justifies a $300–$500 CPL — the math most CAM operators haven't run.",                 src: 'Alloy client benchmark' },
    { color: BLUE,   k: '30',    v: 'days to a stable account: built, launched, optimized through first conversion data. Most agencies take 90+ to do less.',                          src: 'Alloy launch standard' },
  ];

  const process = [
    { num: '01', h: 'Diagnose',  d: "Account audit: existing campaigns, wasted spend, conversion tracking, landing-page fit. If you're already running ads, we map every dollar and what it bought. Two-week deliverable — you keep the audit either way." },
    { num: '02', h: 'Architect', d: "Campaign structure, keyword strategy, ad copy, landing-page brief, conversion-tracking spec. Approved by your leadership before any spend moves. Built around your portfolio target and budget — not template defaults." },
    { num: '03', h: 'Launch',    d: 'Account live in 30 days. Conversion tracking wired before spend turns on. First two weeks at conservative bids to gather data; budget scales as conversion paths validate.' },
    { num: '04', h: 'Optimize',  d: 'Weekly bid + budget management, monthly creative rotation, quarterly account audit. Dead keywords killed, working ones scaled. The account gets better with age — most accounts get worse.' },
  ];

  const beforeAfter = [
    { dim: 'Campaign structure',  before: 'Brand / non-brand / competitor (template)',          after: 'RFP-active / window / replacement / expansion' },
    { dim: 'Keyword targeting',   before: 'Broad match, no negatives, homeowner queries',       after: 'Phrase + exact, weekly negatives, board-only intent' },
    { dim: 'Landing pages',       before: 'Homepage for every campaign',                        after: 'Purpose-built landing page per campaign track' },
    { dim: 'Ad copy',             before: "Generic 'experienced, responsive, local'",           after: 'Board-language headlines tied to RFP / replacement intent' },
    { dim: 'Conversion tracking', before: "'Form submit' = success, no value attached",         after: 'Lead-quality scoring, ACV-weighted, CRM-tied' },
    { dim: 'Reporting',           before: "Google Ads dashboard nobody reads",                  after: 'CPL, CPQL, CAC, CPRFP — pipeline-tied' },
    { dim: 'Cycle time',          before: "90 days to a 'stable' account",                      after: '30 days to launch, 90 days to scaled spend' },
  ];

  const faqs = [
    { q: 'Should every CAM firm run Google Ads?',         a: "No. If your local pack and SEO aren't built yet, paid is filling a leaky bucket. We typically recommend Google Ads after the local-pack stack and authority content are in motion — usually month 4 onward in a BoardSuite engagement. The exception is firms with active RFPs or geographic expansion plans where speed-to-pipeline matters more than CAC efficiency." },
    { q: 'How is Alloy different from a generic PPC agency?', a: "Generic agencies don't know what a board director searches at month 11 of a contract. They bid on 'property management <city>' and route everything to the homepage. We've run CAM campaigns for years — we know which keywords are board-stage vs. homeowner, which negatives to apply on day one, and which landing-page structures actually convert board researchers." },
    { q: 'Who manages the media spend?',                  a: 'You do. Media spend (the budget Google charges for clicks) is paid directly to Google on your card — we never markup or rebill it. Our retainer covers strategy, build, and management. Standard CAM monthly spend ranges $4K–$25K depending on metro count, portfolio target, and competitor pressure.' },
    { q: "What's the minimum monthly spend?",             a: "$4,000/mo is our floor. Below that, the campaign can't gather enough data to optimize against. Above $30,000/mo, we'll often recommend splitting into multiple campaigns or layering LinkedIn — diminishing returns set in fast on a single search account." },
    { q: 'Do you do LinkedIn Ads, Meta, retargeting?',   a: "LinkedIn when the portfolio target justifies it — typically large-scale or commercial-master segments. Meta rarely — the audience targeting doesn't match how boards form. Display + search retargeting always — the 90-day decision cycle is too long not to." },
    { q: 'How does this fit with BoardSuite?',            a: "Google Ads & PPC is a BoardReach engine. It's typically activated in Growth and Scale tiers, after the local-pack and authority-content engines have produced signal. Foundation tier doesn't include paid — by design. We don't recommend paying for clicks before the conversion path is built." },
  ];

  return (
    <>
      <PageHero
        eyebrow="BoardReach · Sub-service"
        h1={<>Paid acquisition <span style={{ color: PINK }}>built around boards</span> — not homeowners.</>}
        sub="Google Ads, retargeting, and (sometimes) LinkedIn — engineered for CAM firms by people who know which queries are board-stage and which are wasted spend."
        dark
      />

      {/* WHAT'S INCLUDED */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>What's included</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The full paid acquisition system.</h2>
            <p className="lead" style={{ marginTop: 14, color: '#444' }}>Strategy, build, optimization, and reporting — wired to pipeline value, not vanity clicks.</p>
          </div>
          <ServiceList color={BLUE} items={includes} />
        </div>
      </section>

      {/* STATS */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The numbers</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Why most CAM PPC budgets underperform.</h2>
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

      {/* BEFORE / AFTER */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The honest comparison</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Templated PPC vs. CAM-built paid.</h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '16px 24px', background: PURPLE, color: '#fff', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
              <div>Dimension</div>
              <div style={{ opacity: 0.6 }}>Most CAM firms</div>
              <div style={{ color: YELLOW }}>Alloy paid system</div>
            </div>
            {beforeAfter.map((row, i) => (
              <div key={row.dim} style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '20px 24px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', gap: 24, alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 14 }}>{row.dim}</div>
                <div style={{ fontSize: 14, color: '#888', lineHeight: 1.55, fontStyle: 'italic' }}>{row.before}</div>
                <div style={{ fontSize: 14, color: '#222', lineHeight: 1.55, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Icon name="check" size={16} color={BLUE} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 } as CSSProperties} />
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
            <Eyebrow onDark>How we run it</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>Four phases. Stable account in <span style={{ color: YELLOW }}>30 days.</span></h2>
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
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-white">
        <div className="container-narrow">
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <Eyebrow noLine>Common questions</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px auto 0', color: PURPLE }}>Honest answers about paid for CAM.</h2>
          </div>
          <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
            {faqs.map((f, idx) => <FAQItem key={idx} q={f.q} a={f.a} bordered accent={BLUE} />)}
          </div>
        </div>
      </section>

      <CtaBand
        headline="Want a paid-account audit?"
        sub="The Strategic Review covers your account structure (or whether you should have one). By the end of 30 minutes, you'll know what's wasted and what would actually move pipeline."
      />
    </>
  );
}
