// src/components/pages/ServiceSocialMediaPage.tsx
// Social Media Marketing for HOA Management Companies — /services/social-media-marketing-for-hoa-management-companies
import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import AccentBar from '~/components/AccentBar';
import Button from '~/components/Button';
import Eyebrow from '~/components/Eyebrow';
import Icon from '~/components/Icon';
import Tag from '~/components/Tag';
import { CtaBand, ServiceList } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

// ─── Post mockup ──────────────────────────────────────────────────────────────
function PostMockup({ variant = 'branded' }: { variant?: 'branded' | 'generic' }) {
  const isBranded = variant === 'branded';
  const accent = isBranded ? PINK : '#999';
  const ink = isBranded ? PURPLE : '#222';
  const headline = isBranded ? 'Maple Glen HOA' : 'John Smith';
  const handle = isBranded ? 'Maple Glen Community' : 'Personal account';
  const time = isBranded ? 'Posted 9:00 AM · Cornerstone PM' : 'yesterday at 11:47 PM';
  return (
    <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.18)', width: '100%', maxWidth: 420, overflow: 'hidden', transform: isBranded ? 'rotate(-1.5deg)' : 'rotate(1.5deg)', fontFamily: 'var(--font-body)', position: 'relative' }}>
      <div style={{ padding: '14px 18px 10px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: isBranded ? 'none' : '1px solid #eee' }}>
        <div style={{ width: 38, height: 38, borderRadius: 999, background: isBranded ? `linear-gradient(135deg, ${PINK} 0%, ${PURPLE} 100%)` : '#dcdcdc', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: 14, flexShrink: 0 }}>
          {isBranded ? 'M' : 'JS'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: ink, fontSize: 14, lineHeight: 1.2 }}>{headline}</div>
          <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{handle} · {time}</div>
        </div>
        {isBranded && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, background: 'var(--alloy-green-tint)', color: '#2c6a62', padding: '3px 8px', borderRadius: 999, letterSpacing: '0.10em', textTransform: 'uppercase', flexShrink: 0 }}>Verified</div>
        )}
      </div>
      <div style={{ padding: '6px 18px 14px' }}>
        {isBranded ? (
          <>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: ink, lineHeight: 1.35, marginBottom: 8 }}>Reserve study results are in — what they mean for 2027.</div>
            <div style={{ fontSize: 13, color: '#444', lineHeight: 1.5 }}>The board reviewed the updated reserve study Tuesday. Here's a quick summary of what's funded, what's deferred, and how dues stay flat next year. Full breakdown in this month's newsletter.</div>
          </>
        ) : (
          <div style={{ fontSize: 13, color: '#444', lineHeight: 1.5 }}>ATTENTION HOMEOWNERS!! someone left their dog poop bag by the mailboxes AGAIN. seriously people 🤬 I've told the board MULTIPLE times we need cameras…</div>
        )}
      </div>
      <div style={{ height: 170, background: isBranded ? `linear-gradient(140deg, ${PINK}22 0%, ${YELLOW}33 50%, ${GREEN}22 100%)` : '#e8e8e8', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 14 }}>
        {isBranded ? (
          <div style={{ background: 'rgba(255,255,255,0.92)', padding: '10px 14px', borderRadius: 6, boxShadow: '0 6px 18px rgba(0,0,0,0.10)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: PURPLE, letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>Reserve study · 2026</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: PURPLE, marginTop: 2 }}>Funded through 2032 · 0% dues increase</div>
          </div>
        ) : (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#aaa', letterSpacing: '0.10em', textTransform: 'uppercase' }}>[blurry photo of mailbox]</div>
        )}
      </div>
      <div style={{ padding: '10px 18px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', fontSize: 11, color: isBranded ? '#666' : '#aaa', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
        <span>{isBranded ? '👍 247  💬 18  ↪︎ 12' : '😡 41  💬 89  ↪︎ 2'}</span>
        <span style={{ color: isBranded ? GREEN : '#bbb', fontWeight: 700 }}>{isBranded ? 'On-brand' : 'Off the rails'}</span>
      </div>
    </div>
  );
}

// ─── Content mix grid ─────────────────────────────────────────────────────────
function ContentMixGrid() {
  const posts = [
    { c: BLUE,   t: 'Board update',        k: 'Governance', icon: '•' },
    { c: GREEN,  t: 'Community spotlight', k: 'Community',  icon: '★' },
    { c: YELLOW, t: 'Seasonal reminder',   k: 'Seasonal',   icon: '◇' },
    { c: PINK,   t: 'Manager intro',       k: 'Trust',      icon: '▲' },
    { c: BLUE,   t: 'Meeting recap',       k: 'Governance', icon: '•' },
    { c: GREEN,  t: 'Volunteer thank-you', k: 'Community',  icon: '★' },
    { c: YELLOW, t: 'Maintenance window',  k: 'Seasonal',   icon: '◇' },
    { c: PINK,   t: 'Vendor partner',      k: 'Trust',      icon: '▲' },
    { c: BLUE,   t: 'Reserve milestone',   k: 'Governance', icon: '•' },
    { c: GREEN,  t: 'Event invitation',    k: 'Community',  icon: '★' },
    { c: YELLOW, t: 'Storm prep checklist',k: 'Seasonal',   icon: '◇' },
    { c: PINK,   t: 'Year-end recap',      k: 'Trust',      icon: '▲' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, background: '#fff', padding: 18, borderRadius: 14, border: '1px solid var(--border-subtle)' }}>
      {posts.map((p, i) => (
        <div key={i} style={{ padding: '16px 14px', borderTop: `3px solid ${p.c}`, background: i % 2 === 0 ? '#fafaff' : 'transparent', borderRadius: 4, minHeight: 110, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#999', letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 700 }}>Wk {i + 1}</div>
            <div style={{ color: p.c, fontSize: 14, fontWeight: 800 }}>{p.icon}</div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: PURPLE, lineHeight: 1.3, letterSpacing: '-0.005em' }}>{p.t}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: p.c, letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 700, marginTop: 'auto' }}>{p.k}</div>
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
export default function ServiceSocialMediaPage() {
  const audiences = [
    { tag: 'Board members', tagColor: BLUE, eyebrow: 'Looking for ideas to post?', headline: 'Your management company should be running this — not your volunteer secretary.', body: "If you're a director Googling 'HOA social media post ideas,' you're filling a gap your management firm should have closed. Forward this page to them. The right CAM produces your community's social presence as part of the service — branded, scheduled, compliance-checked.", cta: 'Send this to your manager', ctaHref: 'mailto:?subject=Social%20media%20by%20our%20management%20company&body=Came%20across%20this%20%E2%80%94%20curious%20if%20we%20could%20do%20this%20instead%20of%20me%20posting%20from%20my%20personal%20account%3A%20https%3A%2F%2Falloygp.co%2Fservices%2Fsocial-media-marketing-for-hoa-management-companies%2F' },
    { tag: 'CAM operators', tagColor: PINK, eyebrow: 'Producing social in-house?', headline: 'Social is the most-seen, least-resourced surface in your portfolio.', body: "Every association has a Facebook group nobody's running, an Instagram nobody's posting to, and a board that's about to fill the void with their personal account. Alloy produces branded, on-calendar social for your portfolio — same voice, customized per association, pre-cleared for compliance.", cta: 'Talk to Alloy', ctaHref: '/strategic-review-request' },
  ];

  const includes = [
    { icon: 'edit',    h: 'Content calendar',        d: "Weekly post calendar mapped to your portfolio's seasonality — meetings, reserve cycles, community events, weather risk, dues notices." },
    { icon: 'feather', h: 'Original copy & creative', d: "CAM-fluent writers and designers — not generalists. Every post drafted in your firm's voice and visual system, not stock-template slop." },
    { icon: 'layout',  h: 'Brand-system design',      d: "One visual system that flexes per association. Your firm's identity stays consistent; each community sees its own name, colors, and feed." },
    { icon: 'layers',  h: 'Per-association feeds',    d: "Facebook page, Instagram, Nextdoor (where it makes sense). One production run, dozens of customized feeds, one approval workflow." },
    { icon: 'shield',  h: 'Compliance pre-clearance', d: 'Every post screened for fair-housing, election-period rules, reserve-disclosure language, and state-specific notice requirements before it goes live.' },
    { icon: 'send',    h: 'Scheduling & publishing',  d: "Posts queued in advance, published on schedule, archived for the record. Managers don't touch Hootsuite, Buffer, or Meta Business Suite." },
    { icon: 'lock',    h: 'Crisis & comment moderation', d: "Off-hours monitoring, escalation playbook, and pre-approved response templates so a midnight Karen doesn't become a Monday-morning email storm." },
    { icon: 'bar-chart', h: 'Engagement reporting',  d: 'Per-association reach, follow growth, engagement rate, and comment sentiment — fed into your retention dashboard so you spot disengaged boards before they churn.' },
    { icon: 'users',   h: 'Firm-level B2B presence',  d: "LinkedIn for the management company itself — thought-leadership posts that win RFPs, not just engagement-bait." },
  ];

  const beforeAfter = [
    { dim: 'Producer',          before: "Board secretary's personal Facebook", after: 'Alloy social team, on calendar' },
    { dim: 'Voice',             before: 'ALL CAPS at midnight',                after: "Manager's voice, board-stage editorial" },
    { dim: 'Cadence',           before: "When somebody remembers",             after: '2–3× weekly per association, scheduled' },
    { dim: 'Brand',             before: 'Whatever Canva template was on top',  after: "Your firm's visual system, every post" },
    { dim: 'Compliance',        before: 'Fingers crossed',                     after: 'Pre-publish legal pass on every post' },
    { dim: 'Crisis comments',   before: "Nobody sees them until Monday",       after: 'Off-hours monitoring + escalation playbook' },
    { dim: 'Reporting',         before: 'Vanity likes, no insight',            after: 'Per-association engagement + sentiment, in BoardSuite' },
  ];

  const stats = [
    { color: PINK,   k: '71%',   v: 'of homeowners say they get HOA news from a community Facebook group — not from board emails or notices.', src: 'Industry homeowner survey, n=2,108, 2025' },
    { color: YELLOW, k: '3.6×',  v: "median lift in board-perceived 'manager visibility' when social is published on a schedule for 90 days.", src: 'Alloy benchmark cohort' },
    { color: GREEN,  k: '≈4 hrs', v: "saved per association per week — manager and board hours redirected from 'who's posting?' to actual property work.", src: 'Apex CMG* operator interviews' },
    { color: BLUE,   k: '1 day', v: "average comment-to-response time when Alloy moderates — vs. 3+ days when posts come from the board secretary's personal account.", src: 'Alloy moderation logs' },
  ];

  const process = [
    { num: '01', h: 'Audit & inventory', d: "We catalog every association's existing social footprint — orphaned Facebook groups, dormant pages, board-personal accounts that should be retired." },
    { num: '02', h: 'System build', d: 'Voice guide, visual system, content calendar, compliance playbook, escalation protocol. Approved by your leadership before week one of posting.' },
    { num: '03', h: 'Production & publishing', d: 'Weekly posts drafted → manager review (24-hour turn) → scheduled → published. Comment monitoring and moderation runs in parallel.' },
    { num: '04', h: 'Reporting & iteration', d: 'Monthly engagement readout per association. We trim what nobody reads and double down on what gets shared.' },
  ];

  const platforms = [
    { name: 'Facebook',  color: BLUE,   role: 'Primary channel — community pages and groups. Where most homeowner attention actually lives.' },
    { name: 'Instagram', color: PINK,   role: 'Visual storytelling — community spotlights, events, before/afters. Reaches younger homeowners boards struggle to engage.' },
    { name: 'Nextdoor',  color: GREEN,  role: "Hyperlocal — claim the official voice before a vocal homeowner does. Critical in suburban portfolios." },
    { name: 'LinkedIn',  color: YELLOW, role: 'Firm-level B2B — thought-leadership for the management company. Wins RFPs, attracts board leads, recruits managers.' },
  ];

  const antiPatterns = [
    { h: "The board secretary's personal account", d: "Half the homeowner base is following an unverified personal page. When the secretary moves, the audience and history go with them. This is a liability, not a strategy." },
    { h: 'Canva-template Mondays', d: "Fifteen recycled stock posts in a row about 'community pride' don't build trust — they signal that nobody's home. Boards notice." },
    { h: 'Compliance roulette', d: "One ill-worded post during an election period or about a fair-housing-adjacent issue is all it takes. 'We didn't know' is not a defense." },
    { h: 'The midnight rage post', d: "An angry homeowner comments at 11pm. Nobody's watching until Tuesday. By then it's screenshotted, shared, and on the agenda. Off-hours moderation isn't optional." },
  ];

  const faqs = [
    { q: 'We have 80 associations. Do you run 80 different feeds?', a: "Yes — but with one editorial backbone. Each feed follows your firm's voice, visual system, and calendar. Per-association content (events, names, dates, notices) is customized per community. One production run, dozens of branded feeds, no extra manager time." },
    { q: 'Can boards approve posts before they go live?', a: "Optional — most clients let Alloy publish on calendar with a manager-only review window, since board-by-board approval slows everything to a halt. For sensitive announcements (election periods, dues changes, legal notices) we route through your manager and the board chair on a 48-hour timeline." },
    { q: 'Do you handle compliance language for HOA-specific rules?', a: "Yes. Every post is screened against fair-housing language, state-specific notice rules, election-period restrictions, and reserve-disclosure requirements. Compliance pre-clearance is included in the base service — it's not an add-on." },
    { q: 'Who responds to comments — including the angry ones?', a: "Alloy moderates during business hours and off-hours via a defined escalation playbook. Routine comments get answered same-day. Anything operationally sensitive (maintenance complaints, governance disputes, legal questions) is routed to your manager with a recommended response. We never argue with homeowners on your firm's behalf." },
    { q: 'Which platforms do you cover?', a: "Facebook and Instagram are the default per-association channels. Nextdoor where the demographic warrants it. LinkedIn for the firm-level B2B presence. We don't add platforms for the sake of it — every channel has a defined audience and purpose, or it's not in the plan." },
    { q: 'How does this fit with BoardSuite?', a: "Social Media Marketing lives inside BoardRetain (Keep) — it's the most-visible, highest-frequency retention surface in the stack. Engagement and sentiment data feed back into BoardRetain so you can see which boards are tuning out, months before churn shows up in the renewal call. The firm-level LinkedIn track sits inside BoardReach (Attract)." },
    { q: 'We already have Facebook pages. Can you take them over?', a: "Yes. Most engagements start with a portfolio audit — claiming dormant pages, retiring board-personal accounts, consolidating duplicates, and migrating audiences. Quick wins usually land in the first 60 days: page-admin clean-up, profile completion, posting cadence resumed." },
  ];

  const retentionFlow = [
    { c: PINK,   label: 'Posts ship on schedule',         note: 'Every association sees branded, on-cadence content in their feed every week — no missed moments, no dead pages.' },
    { c: GREEN,  label: 'Homeowners engage publicly',     note: 'Likes, comments, shares — directors look responsive without doing extra work. Your firm is visible inside the community.' },
    { c: YELLOW, label: 'Engagement signal feeds BoardRetain', note: 'Reach, sentiment, and comment volume flag which associations are tuning out — months before churn shows up.' },
    { c: BLUE,   label: 'Renewal opens warmer',           note: "'We saw your post on the reserve study' replaces 'remind me what you do for us?' Renewal becomes a confirmation, not a sales call." },
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
                <Eyebrow onDark noLine>Service · Social Media Marketing for HOA Management</Eyebrow>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                The community feed boards <span style={{ color: YELLOW }}>actually trust</span>—<br />
                run for your <span style={{ color: PINK }}>entire portfolio.</span>
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 28, maxWidth: 580 }}>
                Stop letting board secretaries post from personal accounts at midnight. Alloy runs branded, compliance-cleared social for every association you manage — original copy, on-calendar posting, off-hours comment moderation, full reporting back into BoardSuite.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
                <Button variant="primary" arrow href="/strategic-review-request">See a sample</Button>
                <Button variant="secondary" onDark href="#what-you-get">What's included</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.10)', flexWrap: 'wrap' }}>
                {[{ k: 'Posts / wk', v: '2–3' }, { k: 'Compliance pass', v: 'Every post' }, { k: 'Mgr time / wk', v: '≈ 0 hrs' }, { k: 'Inside BoardSuite', v: 'Yes' }].map(s => (
                  <div key={s.k}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: 22, letterSpacing: '-0.02em' }}>{s.v}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginTop: 2 }}>{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', height: 540, display: 'grid', placeItems: 'center', overflow: 'visible' }}>
              <div style={{ position: 'absolute', inset: '8% 4% 8% 4%', background: 'radial-gradient(ellipse at center, rgba(245,216,128,0.25) 0%, transparent 70%)', filter: 'blur(20px)' }} />
              <div style={{ position: 'absolute', left: '6%', top: '10%', width: '70%', opacity: 0.5, filter: 'saturate(0.7)' }}>
                <PostMockup variant="generic" />
              </div>
              <div style={{ position: 'absolute', right: '0%', top: '22%', width: '82%' }}>
                <PostMockup variant="branded" />
              </div>
              <div style={{ position: 'absolute', right: '-2%', top: '10%', background: '#fff', color: PURPLE, padding: '8px 14px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, boxShadow: '0 12px 30px rgba(0,0,0,0.30)', transform: 'rotate(6deg)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: PINK } as CSSProperties} />
                Run by Alloy
              </div>
              <div style={{ position: 'absolute', left: '-4%', bottom: '4%', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', padding: '6px 12px', borderRadius: 999, fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.15)', transform: 'rotate(-4deg)', zIndex: 5, backdropFilter: 'blur(4px)' }}>
                Board secretary · 11pm
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
            <h2 className="display-lg" style={{ margin: '14px 0 10px', color: PURPLE }}>If you searched <span style={{ fontStyle: 'italic', color: PINK }}>"HOA social media,"</span> we know which one you are.</h2>
            <p className="lead">Two very different visitors land here. One needs ideas. The other needs a vendor. Both leave with the right answer.</p>
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
            <Eyebrow>Why CAM firms run social</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The most-seen surface in your portfolio. Usually unmanned.</h2>
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

      {/* PLATFORMS */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>Channels we run</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 10px', color: PURPLE }}>Four platforms. Each with a job. <span style={{ color: PINK }}>No bloat.</span></h2>
            <p style={{ color: '#555', lineHeight: 1.65, fontSize: 16, margin: 0, maxWidth: 680 }}>We don't add channels for the sake of it. Every platform we run has a defined audience and a defined business outcome.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
            {platforms.map(p => (
              <div key={p.name} style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderTop: `4px solid ${p.color}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 200 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: PURPLE, letterSpacing: '-0.015em' }}>{p.name}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT MIX GRID */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 36, display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'end' }}>
            <div>
              <Eyebrow>The mix</Eyebrow>
              <h2 className="display-lg" style={{ margin: '14px 0 10px', color: PURPLE }}>Twelve weeks of posts — built around <span style={{ color: PINK }}>your portfolio's actual rhythm.</span></h2>
              <p style={{ color: '#555', lineHeight: 1.65, fontSize: 16, margin: 0, maxWidth: 720 }}>Governance. Community. Seasonal. Trust. Four content pillars rotating on a published cadence — the same backbone for every association, customized in the details.</p>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 240 }}>
              {[{ c: BLUE, l: 'Governance' }, { c: GREEN, l: 'Community' }, { c: YELLOW, l: 'Seasonal' }, { c: PINK, l: 'Trust' }].map(x => (
                <div key={x.l} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ width: 10, height: 10, background: x.c, borderRadius: 2 } as CSSProperties} />
                  <span style={{ fontSize: 12, color: '#666' }}>{x.l}</span>
                </div>
              ))}
            </div>
          </div>
          <ContentMixGrid />
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section id="what-you-get" className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The complete social operation, run by Alloy.</h2>
          </div>
          <ServiceList color={GREEN} items={includes} />
        </div>
      </section>

      {/* ANTI-PATTERNS */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>What this replaces</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Four social-media patterns that quietly hurt your firm.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {antiPatterns.map((p, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--border-subtle)', borderLeft: `4px solid ${PINK}`, padding: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: PURPLE, letterSpacing: '-0.015em' }}>{p.h}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.65 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER TABLE */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>The honest comparison</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Board-run vs. Alloy-run.</h2>
          </div>
          <div className="svc-compare-wrap" style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.6fr', padding: '16px 24px', background: PURPLE, color: '#fff', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
              <div>Dimension</div>
              <div style={{ opacity: 0.6 }}>In-house: board secretary</div>
              <div style={{ color: YELLOW }}>Alloy social production</div>
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
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>From audit to first post in <span style={{ color: YELLOW }}>30 days.</span></h2>
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
              <strong style={{ color: '#fff' }}>days from kickoff to first published post.</strong>{' '}
              Audit and admin clean-up in week 1. Voice and visual system in week 2. First posts drafted and reviewed in week 3. Live publishing in week 4 — every week after, your portfolio's feeds keep filling without your team lifting a finger.
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
                Social Media Marketing is a <strong style={{ color: PURPLE }}>BoardRetain</strong> service because the boards who churn are the boards who feel ignored. A live, branded community feed is the most-seen retention surface you have — and the cheapest one to lose.
              </p>
              <p style={{ fontSize: 16, color: '#444', lineHeight: 1.7, marginBottom: 24 }}>
                The firm-level LinkedIn track lives inside <strong style={{ color: PURPLE }}>BoardReach</strong> — thought leadership that wins RFPs and brings new boards in the door.
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
        headline="Ready for community feeds that don't fall on board secretaries?"
        sub="30 minutes. We'll audit your portfolio's current social footprint, claim or retire what needs it, and show you a live sample feed branded for your firm."
      />
    </>
  );
}
