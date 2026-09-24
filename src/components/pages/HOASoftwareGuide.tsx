// src/components/pages/HOASoftwareGuide.tsx
// Long-form pillar guide targeting the "hoa management software" keyword
// cluster (vol 1,100 head, KD 2, opp 1,078). Designed to internally funnel
// readers to /boardsuite as the system above the platform layer.
//
// Voice: senior partner, operator-grade. No vendor reviews. No feature
// shopping lists. Frameworks and Tuesday-night reality checks instead.

import { useState } from 'react';
import type { CSSProperties } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Tag from '~/components/Tag';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import AccentBar from '~/components/AccentBar';
import { CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

// ---------------------------------------------------------------------------
// Software category card — taxonomy of the HOA software landscape
// ---------------------------------------------------------------------------
interface CategoryProps {
  accent: string;
  label: string;
  headline: string;
  body: string;
  board: string;
  manager: string;
  examples: string;
}
function CategoryCard({ accent, label, headline, body, board, manager, examples }: CategoryProps) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderLeft: `4px solid ${accent}`,
      borderRadius: 10,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 10,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: accent,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 22,
        lineHeight: 1.15,
        letterSpacing: '-0.018em',
        color: PURPLE,
      }}>{headline}</div>
      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#555', margin: 0 }}>{body}</p>
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 14, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 10, fontSize: 13 }}>
          <div style={{ minWidth: 86, fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Board sees</div>
          <div style={{ color: '#555', lineHeight: 1.5 }}>{board}</div>
        </div>
        <div style={{ display: 'flex', gap: 10, fontSize: 13 }}>
          <div style={{ minWidth: 86, fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Manager runs</div>
          <div style={{ color: '#555', lineHeight: 1.5 }}>{manager}</div>
        </div>
      </div>
      <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: 12, fontSize: 12, color: '#888' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999', marginRight: 8 }}>Examples</span>
        {examples}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nine features that matter — checklist with the dimension boards judge on
// ---------------------------------------------------------------------------
interface FeatureRowProps { n: string; h: string; what: string; signal: string; }
function FeatureRow({ n, h, what, signal }: FeatureRowProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '76px 1fr 1fr',
      gap: 28,
      alignItems: 'flex-start',
      padding: '24px 0',
      borderTop: '1px solid var(--border-subtle)',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, color: PINK, lineHeight: 1, letterSpacing: '-0.02em' }}>{n}</div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, color: PURPLE, marginBottom: 6, letterSpacing: '-0.012em', lineHeight: 1.25 }}>{h}</div>
        <div style={{ fontSize: 14.5, color: '#555', lineHeight: 1.6 }}>{what}</div>
      </div>
      <div style={{
        background: 'var(--alloy-purple-tint)',
        borderLeft: `3px solid ${PURPLE}`,
        padding: '14px 16px',
        borderRadius: 6,
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: PURPLE, marginBottom: 6 }}>Buying signal</div>
        <div style={{ fontSize: 13.5, color: '#444', lineHeight: 1.55, fontStyle: 'italic' }}>{signal}</div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pricing tier comparison — ranges, not vendor names
// ---------------------------------------------------------------------------
interface PriceTierProps { color: string; tier: string; portfolio: string; range: string; range2: string; gotchas: string; }
function PriceTier({ color, tier, portfolio, range, range2, gotchas }: PriceTierProps) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderTop: `5px solid ${color}`,
      borderRadius: 12,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color }}>{tier}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: PURPLE, lineHeight: 1.35 }}>{portfolio}</div>
      <div style={{
        background: 'var(--alloy-off-white)',
        borderRadius: 8,
        padding: '14px 16px',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: PURPLE, letterSpacing: '-0.018em', lineHeight: 1.1 }}>{range}</div>
        <div style={{ fontSize: 12, color: '#888', marginTop: 4, lineHeight: 1.4 }}>{range2}</div>
      </div>
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 12, marginTop: 'auto' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999', marginBottom: 6 }}>Watch the line items</div>
        <div style={{ fontSize: 13, color: '#555', lineHeight: 1.55 }}>{gotchas}</div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// RFP question block — inline RFP-style download substitute
// ---------------------------------------------------------------------------
function RFPInline({ items }: { items: { num: string; q: string }[] }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 12,
      padding: 0,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ padding: '20px 28px', background: PURPLE, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: YELLOW, marginBottom: 4 }}>The Alloy RFP — short form</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff' }}>14 questions. Send to every shortlisted vendor. Score the answers.</div>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Copy/paste · No download required</div>
      </div>
      <div>
        {items.map((it, i) => (
          <div key={it.num} style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr',
            gap: 16,
            padding: '16px 28px',
            borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
            background: i % 2 === 0 ? '#fff' : 'var(--alloy-off-white)',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: PINK, letterSpacing: '0.04em' }}>{it.num}</div>
            <div style={{ fontSize: 14.5, color: '#333', lineHeight: 1.6 }}>{it.q}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Rollout playbook — 4 phases on a timeline
// ---------------------------------------------------------------------------
interface PhaseProps { phase: string; weeks: string; h: string; tasks: string[]; color: string; }
function RolloutPhase({ phase, weeks, h, tasks, color }: PhaseProps) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderTop: `5px solid ${color}`,
      borderRadius: 12,
      padding: 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color }}>{phase}</div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 10, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase' }}>· {weeks}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: PURPLE, letterSpacing: '-0.012em', lineHeight: 1.25 }}>{h}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tasks.map((t, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#555', lineHeight: 1.5 }}>
            <Icon name="check" size={14} color={color} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 4 } as CSSProperties} />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQ accordion
// ---------------------------------------------------------------------------
interface FAQItem { q: string; a: string; }
function FAQList({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number>(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{
            background: '#fff',
            border: '1px solid var(--border-subtle)',
            borderLeft: `3px solid ${isOpen ? PINK : 'var(--border-subtle)'}`,
            borderRadius: 8,
            overflow: 'hidden',
            transition: 'border-color 0.2s',
          }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                padding: '20px 24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 16.5,
                color: PURPLE,
                lineHeight: 1.35,
              }}
            >
              <span>{it.q}</span>
              <span style={{ flexShrink: 0, color: PINK, fontSize: 22, fontWeight: 400, transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>+</span>
            </button>
            {isOpen && (
              <div style={{ padding: '0 24px 22px', fontSize: 14.5, lineHeight: 1.7, color: '#555' }}>
                {it.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function HOASoftwareGuide() {
  const categories: CategoryProps[] = [
    {
      accent: PINK,
      label: 'Accounting & financial',
      headline: 'Books, reserves, dues, audits.',
      body: 'The foundation layer. Every CAM firm runs accounting software — the only question is whether it integrates with everything else or sits in a silo your team reconciles by hand each month. Dues billing, AR/AP, bank rec, reserve and fund accounting, audit-ready trial balances, 1099s, lockbox integration.',
      board: 'Clean financials at every meeting. Reserve studies that match the bank balance.',
      manager: 'Bank rec, AR aging, vendor 1099s, year-end audits. Where the auditor lives.',
      examples: 'CINC Systems, Enumerate Central (formerly TOPS), FRONTSTEPS Caliber, AppFolio Property Manager, Buildium, VMS, Smartwebs, PayHOA',
    },
    {
      accent: YELLOW,
      label: 'Board portals & governance',
      headline: 'The room where the work happens.',
      body: 'Where directors review packets, vote, sign documents, and find the agenda. The standalone-board-portal market that exists for corporate boards (Diligent, BoardEffect) has effectively zero footprint in HOA — every credible option here is a module inside an all-in-one platform. The board sees this surface more than they see your website. They form their opinion of your firm on it.',
      board: 'Find the packet, sign the doc, see what’s next — on a phone, at 9 PM, before the meeting.',
      manager: 'Packet assembly, agenda templates, motion tracking, document retention.',
      examples: 'Vantaca Home, FRONTSTEPS Community, CINC Systems, Enumerate Engage, TownSq, BoardSpace',
    },
    {
      accent: BLUE,
      label: 'Resident communication',
      headline: 'Notices, requests, the inbox.',
      body: 'Mass communication, work order intake, ARC submissions, violation tracking, community calendars, e-voting. Usually bundled into the accounting platform — and usually the source of every "why didn’t anyone tell us?" complaint.',
      board: 'Did our notice go out? Did homeowners actually see it?',
      manager: 'Eblasts, SMS, push, work orders, violations, ARC, gate codes, e-voting.',
      examples: 'TownSq, Condo Control, FRONTSTEPS Community, Smartwebs, AppFolio Property Manager, PayHOA',
    },
    {
      accent: GREEN,
      label: 'Maintenance & operations',
      headline: 'Inspections, vendors, work orders.',
      body: 'Site inspections (ideally offline-capable on a phone), vendor bid tracking, COI tracking, preventive maintenance schedules, and the photo evidence that proves the manager was actually there. The layer most underbuilt in the typical CAM stack — and the one Smartwebs originally won on with its "3 clicks and a pic" field workflow.',
      board: 'Was the property inspected? Were vendors invoiced for work that actually happened?',
      manager: 'Inspection routes, vendor management, COI tracking, PM schedules, photo logs.',
      examples: 'Smartwebs, Vantaca, FRONTSTEPS Suite Manager, AppFolio Property Manager, CINC Systems',
    },
    {
      accent: PURPLE,
      label: 'Document management & voting',
      headline: 'Governing docs, retention, e-voting.',
      body: 'CC&Rs, bylaws, meeting minutes, ballot logic, proxy tracking, and the retention rules that get firms sued when they’re ignored. Nearly always a module inside the all-in-one platform; standalone e-voting tools sometimes get bolted on for contested elections.',
      board: 'Can we find the original CC&Rs in under a minute? Can we vote without paper?',
      manager: 'Document libraries, version control, statutory retention, e-ballot setup.',
      examples: 'Vantaca, Smartwebs, Enumerate Central, CINC Systems, eUnify · standalone voting: eBallot, ElectionBuddy, AssociationVoting',
    },
    {
      accent: PINK,
      label: 'All-in-one HOA property management software',
      headline: 'One vendor, every layer.',
      body: 'Single-vendor systems covering accounting, portal, communication, documents, and operations. This is where the real competition is — the two clear market leaders for professional CAM firms are Vantaca and CINC Systems, with FRONTSTEPS, Enumerate, and AppFolio Property Manager rounding out the mid-market tier. Easier to buy. Harder to leave. Quality varies module-by-module — the accounting can be excellent and the portal can feel like it shipped in 2014.',
      board: 'One login. One bill. One throat to choke when something breaks.',
      manager: 'Everything in one dashboard. Or — depending on the vendor — five tabs of one dashboard.',
      examples: 'Vantaca · CINC Systems · FRONTSTEPS (Caliber + Community + Suite Manager) · Enumerate (formerly TOPS) · AppFolio Property Manager · Buildium · Smartwebs',
    },
  ];

  const features = [
    {
      n: '01',
      h: 'Mobile-first board portal',
      what: 'Find the packet in 30 seconds, on a phone, at 9 PM, on hotel Wi-Fi. If a director needs a desktop, the portal does not exist for them. This is the single biggest driver of board NPS and the single most-faked dimension in vendor demos.',
      signal: 'Open the live demo portal on your phone. Time it.',
    },
    {
      n: '02',
      h: 'Integrated e-signature, not bolted on',
      what: 'Boards sign 12\u201330 documents a year. DocuSign-out, DocuSign-back is a deal-killing experience. The signing flow must live inside the portal — same login, same UI, archived to the document library automatically.',
      signal: 'Walk through signing a budget approval end-to-end. Count clicks.',
    },
    {
      n: '03',
      h: 'Accounting that actually reconciles',
      what: 'The platform must produce a reserve balance and YTD-vs-budget that match the bank without a controller calling someone. Reserve-account segregation, fund accounting, and audit-ready trial balances are table stakes, not roadmap items.',
      signal: 'Ask for last month’s actual reserve report from a live association.',
    },
    {
      n: '04',
      h: 'Compliance-supporting communications',
      what: 'No platform genuinely "warns you" about fair-housing wording or election-period rules in real time — anyone claiming that is overselling. What the right platform does is support the workflow: configurable templates, approval gates, communication restrictions during election windows, and timestamped audit trails. The cost of one bad eblast during a contested board election dwarfs the licensing fee for a decade; the platform should make the right path the path of least resistance.',
      signal: 'Send a test notice in election mode. Watch what the system makes hard vs. easy.',
    },
    {
      n: '05',
      h: 'Real integrations, in production',
      what: 'An API spec is not an integration. Ask for the named CAM firms running their ACH, eblast, accounting, and CRM connectors in production today. Ship-and-supported, not "on the roadmap."',
      signal: 'Three reference customers per integration, available on a call this week.',
    },
    {
      n: '06',
      h: 'Per-association branding & permissions',
      what: 'One firm running 80 associations needs 80 visual identities, 80 permission models, 80 communication templates — managed centrally. Most platforms force one master brand or one-by-one chaos. The right one does both.',
      signal: 'Show me three live associations on your platform with distinct branding.',
    },
    {
      n: '07',
      h: 'Data export without ransom',
      what: 'Your associations’ data is your data. Get the export terms — including format, frequency, and cost — in writing during the contract phase. The vendors that fight this question are the ones you most need protection from.',
      signal: 'Section 8 of the contract: data export, format, and ceiling cost.',
    },
    {
      n: '08',
      h: 'Real support, not ticket theater',
      what: 'Who answers the phone on a Friday at 4:50 PM when a board meeting at 6 PM can’t open the packet? Tickets are not support. Named human contacts with phone numbers are.',
      signal: 'Call the support line during the eval. Time-to-human, not time-to-ticket.',
    },
    {
      n: '09',
      h: 'A roadmap with ship dates',
      what: 'Every vendor has a roadmap deck. Ask for the three pain points your team complained about last year. If they’re not scoped with quarter-targeted ship dates, they’re "on the list" — and "the list" is where roadmaps go to die.',
      signal: 'Three specific items, three specific quarters. In writing.',
    },
  ];

  const rfp = [
    { num: 'Q01', q: 'Walk us through bank reconciliation for a 200-unit association on a Tuesday morning. Show the actual screens a controller uses, not the dashboard.' },
    { num: 'Q02', q: 'Send credentials for a live demo association we can browse on a phone. No sandbox. Fifteen minutes, unsupervised.' },
    { num: 'Q03', q: 'What is the all-in monthly cost for a portfolio of 80 associations, 12,000 doors, with the module mix below? Include ACH fees, eblast credits, document storage, onboarding amortized, and integration fees.' },
    { num: 'Q04', q: 'Quote the contractual ceiling on year-over-year price increases. What’s the renewal mechanic — opt-out, auto-renew, multi-year lock?' },
    { num: 'Q05', q: 'Connect us with two firms who went live in the last 12 months. We will find a third one ourselves.' },
    { num: 'Q06', q: 'What percentage of your last 10 implementations went live on the originally-scoped timeline? Where did the others slip and why?' },
    { num: 'Q07', q: 'Show three live associations on your platform with distinct branding, distinct permission models, and distinct communication templates. Same login pane.' },
    { num: 'Q08', q: 'Walk us through a budget approval e-signature flow end-to-end. From "manager prepares" to "signed, archived, board notified."' },
    { num: 'Q09', q: 'Send a sample eblast in election-period mode for a fictional association. Show what the system flags or rewrites.' },
    { num: 'Q10', q: 'List every API integration shipped, supported, and in production today. Three customer references per integration, available this week.' },
    { num: 'Q11', q: 'Describe support escalation on a Friday at 4:50 PM when a 6 PM board meeting can’t access the packet. Specifically: who picks up, in what time frame, with what authority?' },
    { num: 'Q12', q: 'Provide the three roadmap items your largest CAM customer asked for at last year’s user conference. With current status and committed ship quarter.' },
    { num: 'Q13', q: 'Send the data export clause from your standard MSA. Format, frequency, cost ceiling, on contract termination.' },
    { num: 'Q14', q: 'In one sentence per item: what are the three things your platform does NOT do well that we should consider before signing?' },
  ];

  const rollout: PhaseProps[] = [
    {
      phase: 'Phase 1', weeks: 'Weeks 0\u20134', h: 'Foundations & data prep',
      color: BLUE,
      tasks: [
        'Lock the implementation team — internal owner, external CSM, executive sponsor.',
        'Inventory current systems and reconciliations. List every workaround your team has invented.',
        'Stage clean chart of accounts, vendor master, and association master.',
        'Communicate the migration timeline to boards before they hear about it from a manager.',
      ],
    },
    {
      phase: 'Phase 2', weeks: 'Weeks 4\u201310', h: 'Dual-system pilot',
      color: YELLOW,
      tasks: [
        'Migrate one association cohort (5\u201310 properties). Run both platforms in parallel.',
        'Train managers in cohort first. Document every "wait, where did that go?" question.',
        'Reconcile pilot AR/AP daily for 30 days. Resolve every discrepancy before scaling.',
        'Brief pilot boards on the new portal experience and what changes for them.',
      ],
    },
    {
      phase: 'Phase 3', weeks: 'Weeks 10\u201320', h: 'Portfolio rollout',
      color: PINK,
      tasks: [
        'Migrate in cohorts of 10\u201320 associations. Two-week cadence between cohorts.',
        'Owner-operator and operations lead embedded with each cohort kickoff.',
        'Hold weekly post-mortems. What broke, what got bolted on, what got cut.',
        'Lock retention bonuses for any manager whose cohort is mid-migration.',
      ],
    },
    {
      phase: 'Phase 4', weeks: 'Weeks 20\u201326', h: 'Decommission & optimize',
      color: GREEN,
      tasks: [
        'Sunset the legacy system. Export every record, store under signed retention policy.',
        'Audit the new platform against the original RFP scorecard. Flag the gaps.',
        'Re-train managers on the workflows that drifted. Update SOPs in the platform.',
        'Reset board NPS baseline post-migration. Compare to pre-migration baseline.',
      ],
    },
  ];

  const pricing = [
    {
      color: BLUE, tier: 'Self-managed HOA software',
      portfolio: 'Single HOA, board-run, no management firm.',
      range: '$0.50–$3 / door / mo',
      range2: 'Or $39–$300/mo flat per association',
      gotchas: 'Real examples: PayHOA ($49/mo up to 25 units → $275/mo for 500+), HOA Start ($39/mo flat), Effortless HOA ($3/home), Buildium Essential (~$55/mo min), EasyHOA (flat-rate tiers). Hidden costs: ACH fees ($1–$3/txn or 0.30–0.50% of dues), per-eblast credits, document storage tiers, monthly minimums on small communities. All-in cost is frequently 50–100% over the headline rate.',
    },
    {
      color: YELLOW, tier: 'CAM-managed · small',
      portfolio: 'Under 50 associations, single market.',
      range: '$1–$3 / door / mo',
      range2: 'Plus $3K–$10K onboarding',
      gotchas: 'Most platforms at this tier use custom quotes. Module add-ons (inspections, e-voting, ARC), per-user manager seats, and integration fees stack up. Some vendors (Smartwebs, Buildium) skip formal onboarding fees — confirm what is actually included before signing.',
    },
    {
      color: PINK, tier: 'CAM-managed · mid-market',
      portfolio: '50–300 associations, multi-market.',
      range: '$1.50–$3.50 / door / mo',
      range2: 'Plus $15K–$40K onboarding',
      gotchas: 'Volume discounts get meaningful here. Negotiate the YoY price ceiling and the multi-year discount up front. Line items that move the most: ACH float, eblast credits, document storage, custom integrations.',
    },
    {
      color: GREEN, tier: 'Enterprise · regional/national',
      portfolio: '300+ associations, complex stack.',
      range: '$1–$3 / door / mo',
      range2: 'Custom MSAs; onboarding $30K–$75K+',
      gotchas: 'Volume discounts are real but require contractual term commitments. At this scale software should be roughly 10–20% of per-door management fees — not more. Multi-system (best-of-breed across layers) sometimes beats single-vendor TCO above 400 associations.',
    },
  ];

  const faq: FAQItem[] = [
    {
      q: 'What is HOA management software?',
      a: 'HOA management software is the day-to-day operating layer a community association management firm — or a self-managed HOA board — runs the business on. It typically covers accounting (dues, reserves, AP/AR), board portals (packets, e-signature, voting), resident communication (notices, work orders, ARC requests), maintenance/inspections, and document retention. Some platforms cover all of those in one (all-in-one); others specialize in one or two layers and integrate.',
    },
    {
      q: 'What is the difference between HOA software and a board portal?',
      a: 'HOA software is the broader operating system the management company runs on; a board portal is one surface inside it — where directors log in to find packets, sign documents, and vote. In HOA, standalone board portals essentially do not exist; the corporate-governance board-portal market (Diligent, BoardEffect) serves Fortune 500s and nonprofits and has no real footprint in CAM. The portal you care about is the one inside Vantaca Home, FRONTSTEPS Community, CINC, Enumerate Engage, TownSq, or whichever all-in-one runs your portfolio.',
    },
    {
      q: 'What is the best HOA management software?',
      a: 'It depends on buyer type. For professional CAM firms, the two clear market leaders are Vantaca and CINC Systems, with FRONTSTEPS, Enumerate (formerly TOPS), and AppFolio Property Manager as the strongest alternatives at mid-market. For self-managed HOAs, the most-recommended platforms are PayHOA, Condo Control, HOA Start, EasyHOA, and Smartwebs. The framework matters more than the brand — use the 14-question RFP on this page to score whichever shortlist you build.',
    },
    {
      q: 'How much does HOA property management software cost?',
      a: 'Self-managed HOAs typically pay $0.50–$3 per door per month or $39–$300 per month flat (PayHOA, HOA Start, EasyHOA, Effortless HOA). CAM firms typically pay $1–$3.50 per door per month depending on portfolio size, plus onboarding from $3K (small firms) up to $75K+ (enterprise). The headline rate is misleading: ACH fees (commonly 0.30–0.50% of dues processed) are often the single biggest hidden cost. Build a 36-month TCO before negotiating.',
    },
    {
      q: 'Can self-managed HOAs use the same software CAM firms use?',
      a: 'Most CAM-grade platforms offer a self-managed tier, but the economics rarely work for a single association — these platforms are priced for portfolio scale and integration density. If you are a self-managed board, look at purpose-built tools: PayHOA, HOA Start, EasyHOA, Effortless HOA, or Yardi Breeze Premier. If you are a CAM firm, skip the self-managed tier of any vendor and start where you are going.',
    },
    {
      q: 'How long does HOA software implementation actually take?',
      a: 'It depends on scope. A self-managed HOA can be up and running in days to a few weeks (PayHOA cites days; HOA Start is similar). A small CAM firm typically takes 30–90 days. A mid-to-large CAM portfolio migration is honestly four to six months — vendors quote 60–90 days but the field reality is longer once you account for the dual-system pilot and cohort rollout. Manager turnover during implementation is the single most common reason migrations fail; lock retention bonuses before kickoff, not after.',
    },
    {
      q: 'Will switching HOA software fix our growth or retention problem?',
      a: 'Almost never. Software fixes operations problems — slow bank rec, late packets, lost vendor invoices, ARC backlog. It helps with service problems where communication and transparency are bottlenecks. It does not fix positioning problems (invisible to boards shopping for new management) or retention problems (quiet churn, transactional renewal conversations). Those require a growth system above the software layer. That is what BoardSuite is for.',
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ padding: '88px 32px 72px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'flex-end' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22, flexWrap: 'wrap' }}>
                <Tag color="pink">Pillar guide · Resources</Tag>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.65)' }}>
                  <Icon name="check" size={12} color={YELLOW} strokeWidth={2.5} />
                  Read time · 12 min
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.45)' }}>
                  Updated · May 2026
                </span>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                HOA management software,<br />
                <span style={{ color: PINK }}>evaluated like an operator would.</span>
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 28, maxWidth: 640 }}>
                Most CAM firms shop HOA software by demo. Boards judge it by Tuesday at 9 PM, on a phone, looking for the packet. This is the guide we give every Alloy client when they’re evaluating the platform underneath their portfolio — categories, real pricing ranges, the 14-question RFP, and the rollout playbook that doesn’t blow up your board NPS.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Button variant="primary" arrow href="#rfp">Jump to the RFP</Button>
                <Button variant="secondary" onDark href="/boardsuite">See BoardSuite™</Button>
              </div>
            </div>
            <nav aria-label="Guide sections" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 12, padding: 26 }}>
              <Eyebrow onDark>Jump to</Eyebrow>
              <ol style={{ listStyle: 'none', padding: 0, margin: '18px 0 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { n: '01', t: 'What HOA management software is', a: '#what-it-is' },
                  { n: '02', t: 'Self-managed HOAs vs CAM firms', a: '#audience' },
                  { n: '03', t: 'The six software categories', a: '#categories' },
                  { n: '04', t: 'Nine features that matter', a: '#features' },
                  { n: '05', t: 'What it actually costs', a: '#pricing' },
                  { n: '06', t: 'The 14-question RFP', a: '#rfp' },
                  { n: '07', t: 'The rollout playbook', a: '#rollout' },
                  { n: '08', t: 'Build vs buy vs system', a: '#build-vs-buy' },
                  { n: '09', t: 'FAQ', a: '#faq' },
                ].map(s => (
                  <li key={s.n}>
                    <a href={s.a} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, letterSpacing: '0.08em', color: PINK, minWidth: 22 }}>{s.n}</span>
                      <span style={{ fontSize: 14, fontWeight: 500, flex: 1, lineHeight: 1.35 }}>{s.t}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* SECTION 1 — What it is */}
      <section className="section section-white" id="what-it-is">
        <div className="container">
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <Eyebrow>What HOA management software is</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 26px', color: PURPLE }}>
              The operating system underneath every CAM firm and every self-managed HOA.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: '#333', margin: 0 }}>
                HOA management software is the day-to-day operating layer that handles dues collection, reserve accounting, board packets, e-signatures, homeowner notices, work orders, ARC submissions, vendor management, and document retention. Some platforms cover all of those — the all-in-one HOA property management software category. Others specialize in one layer — accounting, the board portal, communications — and integrate with the rest.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: '#333', margin: 0 }}>
                The conversation usually starts the same way. A board complains they can’t find the packet. A manager quits and takes the tribal knowledge with them. A controller spends a weekend reconciling because the integration broke. Somebody says <em>"we need new software for HOA management."</em> Three vendor demos are scheduled before anyone asks what the actual problem is. <strong style={{ color: PURPLE }}>This guide is how to ask that question — and what to do with the answer.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Audience */}
      <section className="section section-ivory" id="audience">
        <div className="container">
          <div style={{ maxWidth: 880, marginBottom: 36 }}>
            <Eyebrow>Who this is for</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 16px', color: PURPLE }}>
              Two buyers. Two playbooks. Same platforms.
            </h2>
            <p className="lead" style={{ margin: 0 }}>The product category is the same, but the evaluation math is not. Boards running self-managed HOAs and operators running CAM firms make different bets — and frequently mis-buy by ignoring this.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--border-subtle)', borderTop: `5px solid ${BLUE}`, padding: 32 }}>
              <Eyebrow color={BLUE}>Self-managed HOA software</Eyebrow>
              <div className="display-md" style={{ margin: '12px 0 14px', color: PURPLE, fontSize: 24 }}>One association, board-run, no management company.</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: '#555' }}>The board is doing it themselves — dues, reserves, notices, meetings. Self managed HOA software exists to keep this from becoming a second job. Priorities flip: simplicity over depth, predictable monthly cost over per-door pricing, communication and document management over accounting sophistication.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Optimize for: low setup time, low ongoing admin, board-friendly UX.',
                  'Skip: per-door pricing models, enterprise modules, CAM-grade integrations.',
                  'Caution: vendors who quote operator pricing for a 1-association deployment.',
                ].map(s => (
                  <li key={s} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#555', lineHeight: 1.55 }}>
                    <Icon name="check" size={14} color={BLUE} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 4 } as CSSProperties} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--border-subtle)', borderTop: `5px solid ${PINK}`, padding: 32 }}>
              <Eyebrow color={PINK}>HOA property management software</Eyebrow>
              <div className="display-md" style={{ margin: '12px 0 14px', color: PURPLE, fontSize: 24 }}>A CAM firm running a portfolio of properties.</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: '#555' }}>The math changes completely. Per-association costs are pooled across the portfolio, but so are the consequences of a bad choice — every association inherits the platform you pick. Integration depth, manager workflows, per-association branding, and contractual price ceilings matter more than UX gloss.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Optimize for: workflow density, manager retention, board portal quality.',
                  'Insist on: data export terms, integration roadmap, YoY price ceiling.',
                  'Caution: full-stack platforms that are strong in one layer and weak in another.',
                ].map(s => (
                  <li key={s} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: '#555', lineHeight: 1.55 }}>
                    <Icon name="check" size={14} color={PINK} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 4 } as CSSProperties} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Categories */}
      <section className="section section-white" id="categories">
        <div className="container">
          <div style={{ maxWidth: 800, marginBottom: 36 }}>
            <Eyebrow>The landscape</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 16px', color: PURPLE }}>
              Six functional layers. One platform usually covers all of them.
            </h2>
            <p className="lead" style={{ margin: 0 }}>HOA software is not really six independent markets with separate vendors — it is one all-in-one market dominated by a handful of platforms, with six functional layers inside each one. The interesting question is not “which vendor for each layer” but “which layers is this vendor actually strong in, and which ones were bolted on.”</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
            {categories.map(c => <CategoryCard key={c.label} {...c} />)}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Nine features */}
      <section className="section section-ivory" id="features">
        <div className="container">
          <div style={{ maxWidth: 880, marginBottom: 24 }}>
            <Eyebrow>The checklist</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 16px', color: PURPLE }}>
              The nine features that actually decide renewal.
            </h2>
            <p className="lead" style={{ margin: 0 }}>Vendors lead demos with what photographs well. Boards renew on what works at 9 PM. Re-rank every vendor scorecard around these.</p>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: '8px 32px 32px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)' }}>
            {features.map(f => <FeatureRow key={f.n} {...f} />)}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Pricing */}
      <section className="section section-white" id="pricing">
        <div className="container">
          <div style={{ maxWidth: 880, marginBottom: 36 }}>
            <Eyebrow>Pricing reality</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 16px', color: PURPLE }}>
              What HOA software actually costs — by tier, not by brand.
            </h2>
            <p className="lead" style={{ margin: 0 }}>Public pricing is rare and usually misleading. These are the ranges we see across active client engagements. Build your 36-month TCO from this, then negotiate.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {pricing.map(p => <PriceTier key={p.tier} {...p} />)}
          </div>
          <div style={{
            marginTop: 28,
            background: 'var(--alloy-pink-tint)',
            borderLeft: `4px solid ${PINK}`,
            padding: '20px 24px',
            borderRadius: 8,
            maxWidth: 880,
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: PINK, marginBottom: 6 }}>The line that costs you</div>
            <div style={{ fontSize: 15, color: '#444', lineHeight: 1.65 }}>
              ACH float on dues processed is the single biggest hidden cost. A 0.40% rate on a $40M annual dues book is $160K/year — typically more than the licensing line on the same contract. Negotiate the ACH rate as hard as you negotiate the seat license.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — RFP */}
      <section className="section section-dark" id="rfp">
        <div className="container">
          <div style={{ maxWidth: 880, marginBottom: 36 }}>
            <Eyebrow onDark>Vendor evaluation</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 16px', color: '#fff' }}>
              The short-form RFP. Fourteen questions. Send to every shortlist vendor.
            </h2>
            <p className="lead on-dark" style={{ margin: 0 }}>This is the diligence sequence we walk every Alloy client through when they’re evaluating a platform — independent of which vendor is in the room. Copy it. Paste it. Score the answers.</p>
          </div>
          <RFPInline items={rfp} />
          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13.5, color: 'rgba(255,255,255,0.6)' }}>
            Want help running this evaluation? <a href="/get-started" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: 3 }}>Talk to Alloy</a> — we sit on the buyer side of the table.
          </div>
        </div>
      </section>

      {/* SECTION 7 — Rollout */}
      <section className="section section-ivory" id="rollout">
        <div className="container">
          <div style={{ maxWidth: 880, marginBottom: 36 }}>
            <Eyebrow>The rollout playbook</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 16px', color: PURPLE }}>
              26 weeks. Four phases. Don’t skip Phase 1.
            </h2>
            <p className="lead" style={{ margin: 0 }}>The vendor will quote you 60\u201390 days. For a mid-to-large CAM portfolio migration, the honest number is closer to six months — and the board-side communication has to start before week one of dual-system operation, not after. (Self-managed HOAs and small firms onboarding their first platform compress this dramatically: PayHOA cites days, FRONTSTEPS quotes ~60-day averages. The phased shape still applies; the calendar shrinks.)</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {rollout.map(r => <RolloutPhase key={r.phase} {...r} />)}
          </div>
          <div style={{
            marginTop: 28,
            background: '#fff',
            border: '1px solid var(--border-subtle)',
            borderLeft: `4px solid ${YELLOW}`,
            padding: '20px 24px',
            borderRadius: 8,
            maxWidth: 880,
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: PURPLE, marginBottom: 6 }}>The thing that kills migrations</div>
            <div style={{ fontSize: 15, color: '#444', lineHeight: 1.65 }}>
              Manager turnover during implementation. The manager who has the tribal knowledge of how the current platform handles a specific edge case quits during week 12 of dual-system pain, and the migration loses its anchor. <strong style={{ color: PURPLE }}>Lock retention bonuses before kickoff, not after.</strong> Read our deeper take in <a href="/resource-hub/cam-marketing-strategy" style={{ color: PINK, textDecoration: 'underline', textUnderlineOffset: 3 }}>The CAM Marketing Strategy That Actually Compounds</a> on why operator retention drives every other metric.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Build vs Buy vs System (the BoardSuite pivot) */}
      <section className="section section-purple-deep" id="build-vs-buy">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <Eyebrow onDark>Build vs buy vs system</Eyebrow>
              <h2 className="display-lg" style={{ margin: '14px 0 18px', color: '#fff' }}>
                Software runs the firm.<br />
                <span style={{ color: YELLOW }}>It does not grow the firm.</span>
              </h2>
              <p className="lead on-dark" style={{ marginBottom: 22 }}>
                If you’re invisible to boards shopping for a new manager — software won’t help. If your proposals lose to firms running the same platform with a better pitch — software won’t help. If a 12% churn rate is quietly undoing a 20% growth rate — software won’t help.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,0.88)', marginBottom: 28 }}>
                That’s what <strong style={{ color: '#fff' }}>BoardSuite™</strong> is for: the system above the software layer that engineers attract, close, and keep into one connected playbook. Most of our clients run Vantaca, CINC, or AppFolio. The platform is rarely the constraint. The system around it is. See <a href="/results/rise-amg" style={{ color: YELLOW, textDecoration: 'underline', textUnderlineOffset: 3 }}>the RISE AMG case study</a> for an 18-month example.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Button variant="primary" arrow href="/boardsuite">See BoardSuite™</Button>
                <Button variant="secondary" onDark href="/get-started">Run your eval with us</Button>
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 16,
              padding: 32,
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { color: PINK,   label: 'Operations problem', caption: 'Bank rec slow, packets late, vendor invoices lost, ARC backlog.', fix: 'Software fixes this.', fixColor: GREEN },
                  { color: YELLOW, label: 'Service problem',    caption: 'Boards feel ignored. Manager turnover. Communication gaps.',    fix: 'Software helps. People decide it.', fixColor: BLUE },
                  { color: BLUE,   label: 'Positioning problem',caption: 'Invisible to boards searching. Cited by nobody. RFPs go nowhere.', fix: 'Software won’t help.', fixColor: PINK },
                  { color: GREEN,  label: 'Retention problem',  caption: 'Quiet 12% churn. Renewal conversations feel transactional.',    fix: 'Software won’t help.', fixColor: PINK },
                ].map(p => (
                  <div key={p.label} style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderTop: `3px solid ${p.color}`,
                    padding: '16px 16px 14px',
                    borderRadius: 8,
                  }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.color, marginBottom: 8 }}>{p.label}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: 12 }}>{p.caption}</div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: p.fixColor, letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>{p.fix}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FAQ */}
      <section className="section section-ivory" id="faq">
        <div className="container">
          <div style={{ maxWidth: 760, marginBottom: 32 }}>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 12px', color: PURPLE }}>
              The questions CAM operators ask every week.
            </h2>
            <p className="lead" style={{ margin: 0 }}>Quick answers from working with firms across every major platform.</p>
          </div>
          <div style={{ maxWidth: 880 }}>
            <FAQList items={faq} />
          </div>
        </div>
      </section>

      {/* Related reading */}
      <section className="section section-white">
        <div className="container">
          <div style={{ maxWidth: 760, marginBottom: 24 }}>
            <Eyebrow>Keep reading</Eyebrow>
            <h2 className="display-md" style={{ margin: '14px 0 0', color: PURPLE, fontSize: 28 }}>
              Where this guide sends you next.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { color: PINK,   eyebrow: 'System',  title: 'BoardSuite™ — the integrated growth system', desc: 'How attract, close, and keep run as one playbook across the platform layer.', href: '/boardsuite' },
              { color: YELLOW, eyebrow: 'Article', title: 'The CAM Marketing Strategy That Actually Compounds', desc: '"Do more marketing" is the most expensive advice CAM firms hear. System is the lever.', href: '/resource-hub/cam-marketing-strategy' },
              { color: GREEN,  eyebrow: 'Case study', title: 'RISE AMG — 18 months, 1,580% YoY opportunities', desc: 'What system-level growth looks like when the platform layer was already in place.', href: '/results/rise-amg' },
            ].map(r => (
              <a key={r.title} href={r.href} className="card card-pad" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                textDecoration: 'none',
                color: 'inherit',
                borderTop: `4px solid ${r.color}`,
              }}>
                <Eyebrow color={r.color}>{r.eyebrow}</Eyebrow>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, color: PURPLE, lineHeight: 1.25, letterSpacing: '-0.012em' }}>{r.title}</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#666' }}>{r.desc}</p>
                <div style={{ marginTop: 'auto', paddingTop: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '0.10em', textTransform: 'uppercase', color: r.color }}>
                  Read more →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        headline="The platform isn’t your problem. The system around it is."
        sub="30 minutes. We’ll diagnose what’s operations, what’s growth, and what software will (and won’t) fix — independent of any vendor."
        primary="Run your evaluation with us"
        primaryHref="/get-started"
      />
    </>
  );
}

// Export FAQ data for the .astro page to use in JSON-LD without duplicating
// content. Keeps the page-specific FAQPage schema in sync with what readers
// actually see on the page.
export const hoaSoftwareFAQ: { q: string; a: string }[] = [
  {
    q: 'What is HOA management software?',
    a: 'HOA management software is the day-to-day operating layer a community association management firm — or a self-managed HOA board — runs the business on. It typically covers accounting, board portals, resident communication, maintenance/inspections, and document retention. Some platforms cover all of those in one (all-in-one); others specialize in one or two layers and integrate.',
  },
  {
    q: 'What is the difference between HOA software and a board portal?',
    a: 'HOA software is the broader operating system; a board portal is one surface inside it where directors log in to find packets, sign documents, and vote. Standalone board portals essentially do not exist in HOA; the corporate-governance board-portal market (Diligent, BoardEffect) serves Fortune 500s and nonprofits and has no real CAM footprint. The portal you care about is inside Vantaca Home, FRONTSTEPS Community, CINC, Enumerate Engage, or TownSq.',
  },
  {
    q: 'What is the best HOA management software?',
    a: 'It depends on buyer type. For professional CAM firms, the two clear market leaders are Vantaca and CINC Systems, with FRONTSTEPS, Enumerate (formerly TOPS), and AppFolio Property Manager as strong alternatives. For self-managed HOAs, the most-recommended platforms are PayHOA, Condo Control, HOA Start, EasyHOA, and Smartwebs.',
  },
  {
    q: 'How much does HOA property management software cost?',
    a: 'Self-managed HOAs: $0.50–$3 per door per month or $39–$300 per month flat. CAM firms: $1–$3.50 per door per month depending on portfolio size, plus onboarding from $3K (small firms) to $75K+ (enterprise). ACH fees (commonly 0.30–0.50% of dues processed) are often the single biggest hidden cost. Build a 36-month TCO before negotiating.',
  },
  {
    q: 'Can self-managed HOAs use the same software CAM firms use?',
    a: 'Most CAM-grade platforms offer a self-managed tier, but the economics rarely work for a single association. For self-managed boards, purpose-built tools (PayHOA, HOA Start, EasyHOA, Effortless HOA, Yardi Breeze Premier) are usually the right fit.',
  },
  {
    q: 'How long does HOA software implementation actually take?',
    a: 'A self-managed HOA: days to a few weeks. A small CAM firm: 30–90 days. A mid-to-large CAM portfolio migration: four to six months — vendors quote 60–90 days, but field reality is longer once you account for the dual-system pilot and cohort rollout. Manager turnover during implementation is the single most common reason migrations fail.',
  },
  {
    q: 'Will switching HOA software fix our growth or retention problem?',
    a: 'Almost never. Software fixes operations problems. It does not fix positioning problems (invisible to boards shopping for new management) or retention problems (quiet churn, transactional renewal). Those require a growth system above the software layer. That is what BoardSuite is for.',
  },
];
