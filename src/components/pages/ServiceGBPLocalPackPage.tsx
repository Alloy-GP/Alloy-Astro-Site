// src/components/pages/ServiceGBPLocalPackPage.tsx
// Alloy — GBP & Local Pack Optimization for CAM
// Service detail page targeting "local seo hoa management" + GBP queries.
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
export default function ServiceGBPLocalPackPage() {
  const includes = [
    { icon: 'map-pin',   h: 'Per-location GBP buildout',     d: 'Full Google Business Profile setup or rebuild for every office and operating metro: categories, services, attributes, hours, photos (geotagged), products. Done by humans, not a checklist tool.' },
    { icon: 'shield',    h: 'NAP consistency audit',          d: 'Name, Address, Phone audited across 60+ surfaces — GBP, Apple Maps, Bing Places, Yelp, BBB, CAI directory, Yellow Pages, every CAM-specific listing. Mismatched data is the #1 local-pack ranking blocker.' },
    { icon: 'search',    h: 'Local pack ranking strategy',    d: "Reverse-engineered against the firms currently ranking in your metro. Service-area definition, category strategy, signal balance — everything Google's local algorithm actually weighs in 2026." },
    { icon: 'edit',      h: 'Posts, products, Q&A',           d: "Weekly GBP posts (events, articles, offers). Service products built out with descriptions and photos. Q&A pre-populated with the questions boards actually ask. The surface that converts after the search." },
    { icon: 'sparkles',  h: 'Review velocity engine',         d: "Targeted: 10+ reviews per quarter. Email + SMS request flows wired into your portfolio onboarding, board-meeting check-ins, and renewal moments. We don't buy reviews — we ask the right people at the right time." },
    { icon: 'globe',     h: 'Local citations + directories',  d: 'Submission and cleanup across 40+ CAM-relevant directories. CAI member directory, regional HOA-management listings, BBB profile, Chamber of Commerce, every surface a board director might check.' },
    { icon: 'compass',   h: 'Multi-market expansion',         d: 'Adding metros? We build the local stack for each new market — service-area pages, GBP, citations, photo set — synced to your launch timing. Up to 5 metros on Scale tier.' },
    { icon: 'bar-chart', h: 'Monthly local rank report',      d: 'Local pack position tracked across 30+ board-relevant queries, by metro. Tied back to GBP impressions, calls, direction requests. The first dashboard that ties local visibility to actual lead behavior.' },
  ];

  const stats = [
    { color: PINK,   k: '44%',   v: "of board-relevant queries return a local pack as the first organic result. If you're not in it, you're not in the conversation.",                src: 'Alloy SERP analysis, 2026' },
    { color: YELLOW, k: '$0',    v: "media spend. The local pack is unpaid real estate — but you have to earn it. We build the signal stack that gets you there.",                    src: 'Google Local Pack' },
    { color: GREEN,  k: '10+',   v: "reviews per quarter target — the velocity that signals 'active firm' to both Google's algorithm and the board reading them.",                    src: 'Alloy benchmark' },
    { color: BLUE,   k: '60+',   v: "surfaces audited for NAP consistency. One mismatched phone number on a forgotten directory is enough to suppress the entire profile.",          src: 'Alloy NAP audit' },
  ];

  const process = [
    { num: '01', h: 'Audit',     d: 'Full visibility audit: GBP completeness, NAP consistency across 60+ surfaces, local pack rank for 30+ queries, review velocity, competitor signal stack. Two-week diagnostic — you keep the document either way.' },
    { num: '02', h: 'Stabilize', d: 'Fix the ranking blockers first: NAP mismatches, claim/verify GBPs, reclaim hijacked listings, repair categories. Most firms rank meaningfully better in 30 days from cleanup alone, before any new effort.' },
    { num: '03', h: 'Build',     d: 'GBP buildout per location, citation submission across CAM directories, review-request flow wiring, weekly post cadence, Q&A seeding. Six-week build phase — full local stack live.' },
    { num: '04', h: 'Compound',  d: 'Monthly cadence: review velocity, post engagement, rank tracking, citation health. Quarterly recalibration against competitor moves. The signal stack compounds — month 12 is materially better than month 3.' },
  ];

  const beforeAfter = [
    { dim: 'GBP completeness',    before: 'Half the fields blank, last updated 2019',                  after: '100% complete, weekly posts, geotagged photos, full Q&A' },
    { dim: 'NAP consistency',     before: 'Phone number on website ≠ GBP ≠ Yelp',                     after: 'Identical across 60+ surfaces, monitored monthly' },
    { dim: 'Local pack rank',     before: "Page 2 for '<metro> HOA management'",                       after: 'Top 3 for the queries boards actually run' },
    { dim: 'Reviews',             before: '37 reviews, last one 14 months ago',                        after: '10+ per quarter, every one responded to in < 24 hrs' },
    { dim: 'Citations',           before: 'Random scrape data, half wrong',                            after: '40+ CAM-specific directories, all aligned' },
    { dim: 'Multi-market',        before: 'One GBP, no service-area pages, no metro signals',          after: 'Per-metro stack — GBP, page, citations, photos' },
    { dim: 'Reporting',           before: "GBP insights you've never opened",                          after: 'Monthly rank report tied to calls + lead actions' },
  ];

  const faqs = [
    { q: "Isn't this just SEO?",                              a: "Local SEO is a subset of SEO with its own ranking algorithm. The local pack uses different signals than the organic blue links — proximity, GBP completeness, review velocity, citations. We build both, but they're separate disciplines and we run them as such. The Property Management SEO service handles organic; this service handles the local pack and GBP." },
    { q: 'We have multiple offices. How is that priced?',     a: 'Local SEO is sized by metro. One metro is included in Foundation. One metro on Growth. Up to 5 metros on Scale. Adding metros mid-engagement is a project add-on — quoted by complexity (single office vs. multi-zip service area).' },
    { q: 'Can you fix a hijacked GBP?',                      a: "Yes. We've reclaimed profiles where ownership was lost during a manager transition, agency change, or after acquisition. Process takes 2–6 weeks depending on Google's verification path. We document every step so it stays in your control after." },
    { q: 'Do you buy reviews?',                              a: "No. Never. We build review-request flows that ask the right people (boards mid-renewal, satisfied homeowners, vendors) at the right moments. Velocity is real. Authenticity is the whole point — boards read reviews to filter for legitimate firms." },
    { q: 'How does this fit with BoardSuite?',               a: 'GBP & Local Pack is a BoardReach engine. It runs alongside Property Management SEO and AI Search & GEO as the three discovery surfaces. Most CAM firms run all three — they share signals (NAP, reviews, schema) and reinforce each other. Foundation tier includes the local pack stack for one metro.' },
  ];

  return (
    <>
      <PageHero
        eyebrow="BoardReach · Sub-service"
        h1={<>Be the firm <span style={{ color: YELLOW }}>boards see first</span> when they search your metro.</>}
        sub="GBP, local pack, citations, reviews — the unpaid-but-earned visibility stack that gets you in front of every board director searching for HOA management in your market."
        dark
      />

      {/* WHAT'S INCLUDED */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>What's included</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The full local visibility stack.</h2>
            <p className="lead" style={{ marginTop: 14, color: '#444' }}>Done by humans who've run it for CAM firms — not by a tool that ticks boxes.</p>
          </div>
          <ServiceList color={YELLOW} items={includes} />
        </div>
      </section>

      {/* STATS */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The numbers</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Why local-pack visibility is non-negotiable for CAM.</h2>
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
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Random GBP edits vs. an actual local stack.</h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '16px 24px', background: PURPLE, color: '#fff', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
              <div>Dimension</div>
              <div style={{ opacity: 0.6 }}>Most CAM firms</div>
              <div style={{ color: YELLOW }}>Alloy local stack</div>
            </div>
            {beforeAfter.map((row, i) => (
              <div key={row.dim} style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '20px 24px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', gap: 24, alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 14 }}>{row.dim}</div>
                <div style={{ fontSize: 14, color: '#888', lineHeight: 1.55, fontStyle: 'italic' }}>{row.before}</div>
                <div style={{ fontSize: 14, color: '#222', lineHeight: 1.55, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Icon name="check" size={16} color={YELLOW} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 } as CSSProperties} />
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
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>Four phases. Live local stack in <span style={{ color: YELLOW }}>60 days.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {process.map((s, i) => (
              <div key={s.num} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderTop: `3px solid ${[PINK, YELLOW, GREEN, BLUE][i]}`, borderRadius: 12, padding: 28 }}>
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
            <h2 className="display-lg" style={{ margin: '14px auto 0', color: PURPLE }}>Honest answers to GBP questions.</h2>
          </div>
          <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
            {faqs.map((f, idx) => <FAQItem key={idx} q={f.q} a={f.a} bordered accent={YELLOW} />)}
          </div>
        </div>
      </section>

      <CtaBand
        headline="Want a local-pack audit for your metro?"
        sub="The Strategic Review covers GBP, NAP consistency, rank position, and review velocity. By the end of 30 minutes, you'll know exactly which signals are blocking your local visibility."
      />
    </>
  );
}
