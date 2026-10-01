import { useState } from 'react';
import type { CSSProperties } from 'react';

/**
 * FindYourPathPage — "Alloy Growth Journey" interactive path-finder.
 *
 * A self-contained 5-step branching walkthrough that takes a prospective CAM firm
 * from "what do I get with Alloy?" to a signup CTA. The prospect self-selects their
 * starting point (Step 1); every later step tailors its content to that choice.
 *
 * Ported from the Design Component (DC) prototype "Alloy Growth Journey.dc.html".
 * All profile data / copy is carried over verbatim from that prototype's script block.
 * Built as one React island (client:load); one step renders at a time.
 *
 * Not linked from anywhere on the site, not in nav.ts, noindex + excluded from sitemap.
 */

// ─────────────────────────────────────────────────────────────
// Signup / booking destinations (repointed from the prototype's alloygp.co)
// ─────────────────────────────────────────────────────────────
const SIGNUP_HREF = '/contact';
const BOOK_HREF = '/contact';

// Site assets
const LOGO_INVERTED = '/assets/alloy-logo-on-dark.svg';
const PORTAL_AVATAR = '/assets/alloy-icon-1500.png';

// ─────────────────────────────────────────────────────────────
// Static data model (ported verbatim from the DC prototype)
// ─────────────────────────────────────────────────────────────
const PHASE_NAMES = ['Foundation', 'Traction', 'Momentum', 'Expansion', 'Dominance'];

const MILESTONE_SETS: string[][] = [
  ['Website live', 'Google verified', 'Service pages', 'Tracking on', 'First reviews in'],
  ['Page-1 rankings', 'Ads converting', 'Inbound flowing', 'Proposals live', 'First contracts'],
  ['Broad rankings', 'Flywheel engaging', 'Reputation engine', 'Boards retained', 'Referrals compound'],
  ['Services expanded', 'Pipeline predictable', 'Team scaled', 'Case studies live', 'Next market chosen'],
  ['#1 in market', 'Inbound-led growth', 'Portfolio expanding', 'Brand recognized', 'Defending the lead'],
];

const TOOLKIT = [
  { name: 'Proposal System', level: 1 },
  { name: 'Review Program', level: 2 },
  { name: 'Board Surveys', level: 3 },
  { name: 'Staff Surveys', level: 4 },
];

const BUDGET_LEVELS = [
  { n: 1, sym: '$', name: 'Foundation', scope: 'Essentials, built right' },
  { n: 2, sym: '$$', name: 'Steady', scope: 'Essentials plus momentum' },
  { n: 3, sym: '$$$', name: 'Accelerate', scope: 'The full engine — most CAMs' },
  { n: 4, sym: '$$$$', name: 'Ascend', scope: 'Everything, at full tempo' },
];

type Engine = 'reach' | 'match' | 'retain';
interface Market { name: string; sub: string; curPhase: number; curHit: number; }
interface Play { label: string; level: number; engine: Engine; }
interface Profile {
  label: string; color: string; tagline: string;
  diagHeadline: string; diagBody: string; getHeadline: string;
  rmCount: string; rmLabel: string; rmNote: string;
  markets: Market[]; defaultBudget: number;
  q1Headline: string; q1Body: string; plays: Play[];
}

const PROFILES: Record<'starting' | 'established' | 'multi', Profile> = {
  starting: {
    label: 'Just getting started', color: '#a1c8e7',
    tagline: 'Start at Foundation — climb to Dominance',
    diagHeadline: 'Your roadmap starts here.',
    diagBody: "You begin at phase one and climb a proven five-phase journey — five milestones each — the same path our most dominant CAMs walked. Here's exactly what that climb looks like.",
    getHeadline: 'From invisible to in-demand.',
    rmCount: '1', rmLabel: 'your market', rmNote: 'building from the ground up',
    markets: [{ name: 'Your market', sub: 'just getting started', curPhase: 0, curHit: 1 }],
    defaultBudget: 2,
    q1Headline: 'Your first quarter, mostly foundational.',
    q1Body: "With no presence yet, Quarter 1 leans hard into the basics — a real website, findability, and the first high-value content that makes boards take you seriously. Slide the budget to see how much of it we complete in the first 90 days.",
    plays: [
      { label: 'New 5-page website build', level: 1, engine: 'reach' },
      { label: 'Google Business Profile setup & verification', level: 1, engine: 'reach' },
      { label: 'On-page SEO for core pages', level: 1, engine: 'reach' },
      { label: 'Core service page copy (3 pages)', level: 1, engine: 'reach' },
      { label: 'Analytics & call tracking installed', level: 1, engine: 'reach' },
      { label: '15 directory & citation listings', level: 2, engine: 'reach' },
      { label: '10 local keyword targets', level: 2, engine: 'reach' },
      { label: '2 SEO blog articles / month', level: 2, engine: 'reach' },
      { label: 'Cornerstone "how to choose a CAM" guide', level: 3, engine: 'reach' },
      { label: 'Extra service-area pages', level: 3, engine: 'reach' },
      { label: 'Google Ads starter campaign', level: 4, engine: 'reach' },
      { label: 'FAQ & short-form video content', level: 4, engine: 'reach' },
      { label: 'Lead capture forms & routing', level: 1, engine: 'match' },
      { label: 'Proposal system setup', level: 2, engine: 'match' },
      { label: 'Review generation program', level: 3, engine: 'retain' },
      { label: 'Review response program', level: 3, engine: 'retain' },
      { label: 'Referral engine', level: 4, engine: 'retain' },
    ],
  },
  established: {
    label: 'Established · one location', color: '#d9356e',
    tagline: 'Your market, built out end to end',
    diagHeadline: 'One market. The whole roadmap.',
    diagBody: "Your location runs the complete five-phase journey — Foundation to Dominance, five milestones a phase, nothing skipped. The same rigor a multi-market CAM gets, focused entirely on you.",
    getHeadline: 'Turn conversations into contracts.',
    rmCount: '1', rmLabel: 'your market', rmNote: 'built out end to end',
    markets: [{ name: 'Your market', sub: 'one location · 5 months in', curPhase: 1, curHit: 3 }],
    defaultBudget: 2,
    q1Headline: 'Your first quarter, pointed at demand.',
    q1Body: "You already have the fundamentals — so Quarter 1 turns on the recurring engine, ships a revenue-focused conversion page, and starts capturing commercial demand you can finally measure. Slide the budget to see how much lands in the first 90 days.",
    plays: [
      { label: 'Quarterly growth audit & strategy report', level: 1, engine: 'reach' },
      { label: 'Local pack management (GBP posts, photos, reviews)', level: 1, engine: 'reach' },
      { label: 'Pillar optimization for commercial terms', level: 1, engine: 'reach' },
      { label: 'GBP & directory NAP consistency', level: 1, engine: 'reach' },
      { label: 'Budget-season blog content (2 / month)', level: 2, engine: 'reach' },
      { label: 'Additional geo & service pages', level: 3, engine: 'reach' },
      { label: 'Scale content to 4 / month', level: 3, engine: 'reach' },
      { label: 'Google Ads management', level: 4, engine: 'reach' },
      { label: 'Revenue / à la carte conversion page', level: 1, engine: 'match' },
      { label: 'WhatConverts sales value + lead attribution', level: 1, engine: 'match' },
      { label: 'Lead magnet (budget / reserve template)', level: 2, engine: 'match' },
      { label: 'Proposal system', level: 2, engine: 'match' },
      { label: 'Proof & case-study content', level: 3, engine: 'match' },
      { label: 'Social media cadence (repurposing-led)', level: 1, engine: 'retain' },
      { label: 'Monthly newsletter', level: 1, engine: 'retain' },
      { label: 'Review generation & response program', level: 2, engine: 'retain' },
      { label: 'Education / video content program', level: 3, engine: 'retain' },
      { label: 'Reputation engine & referrals', level: 4, engine: 'retain' },
    ],
  },
  multi: {
    label: 'Multi-location CAM', color: '#aed7d0',
    tagline: 'We build each market out individually',
    diagHeadline: 'Every market gets its own roadmap.',
    diagBody: "We don't spread one thin plan across your offices. Each market runs the full five-phase journey — Foundation to Dominance, five milestones a phase — and we grow them in parallel, giving each the individual attention it needs.",
    getHeadline: 'One engine. Every market.',
    rmCount: '5', rmLabel: 'active markets', rmNote: 'growing in parallel',
    markets: [
      { name: 'Denham Springs, LA', sub: 'HQ · 8 months in', curPhase: 1, curHit: 3 },
      { name: 'Carencro, LA', sub: '3 months in', curPhase: 0, curHit: 3 },
      { name: 'Shreveport, LA', sub: '3 months in', curPhase: 0, curHit: 2 },
      { name: 'Biloxi, MS', sub: '2 months in', curPhase: 0, curHit: 2 },
      { name: 'Daphne, AL', sub: '1 month in', curPhase: 0, curHit: 1 },
    ],
    defaultBudget: 3,
    q1Headline: 'Your first quarter, market by market.',
    q1Body: "Multi-market growth is a content multiplier — each market needs its own city pages, GBP, and local presence, not a copy-paste. Quarter 1 launches the site and builds markets out in parallel. Slide the budget to see how many we activate at once.",
    plays: [
      { label: 'Quarterly growth audit & strategy', level: 1, engine: 'reach' },
      { label: 'Site cutover + 301 redirect map', level: 1, engine: 'reach' },
      { label: 'Post-launch technical verification', level: 1, engine: 'reach' },
      { label: 'GBP optimization + local pack — primary market', level: 1, engine: 'reach' },
      { label: 'City / location page — primary market', level: 1, engine: 'reach' },
      { label: 'GBP + local pack — added markets', level: 2, engine: 'reach' },
      { label: 'City / location pages — added markets', level: 2, engine: 'reach' },
      { label: 'Local directory submissions + NAP cleanup', level: 2, engine: 'reach' },
      { label: 'State HOA-law pages per market', level: 3, engine: 'reach' },
      { label: 'GEO / AIO + ongoing SEO monitoring', level: 3, engine: 'reach' },
      { label: 'Every market built in parallel', level: 4, engine: 'reach' },
      { label: 'Toxic-link review + disavow', level: 4, engine: 'reach' },
      { label: 'Proposal Portal + WhatConverts integration', level: 1, engine: 'match' },
      { label: 'Cross-market lead routing & attribution', level: 1, engine: 'match' },
      { label: 'Conversion & trust pages', level: 2, engine: 'match' },
      { label: 'Proof & case-study content per market', level: 3, engine: 'match' },
      { label: 'Reputation workflow + review-response system', level: 2, engine: 'retain' },
      { label: 'Social media cadence (~60 / quarter)', level: 2, engine: 'retain' },
      { label: 'Monthly newsletter', level: 2, engine: 'retain' },
      { label: 'Board education / resource hub', level: 3, engine: 'retain' },
      { label: 'Per-market review programs', level: 3, engine: 'retain' },
      { label: 'Video / thought-leadership program', level: 4, engine: 'retain' },
    ],
  },
};

const ENGINE_META: { key: Engine; name: string; sub: string; color: string }[] = [
  { key: 'reach', name: 'Reach', sub: 'Attract boards', color: '#d9356e' },
  { key: 'match', name: 'Match', sub: 'Win the contract', color: '#3a7fb0' },
  { key: 'retain', name: 'Retain', sub: 'Keep & grow', color: '#4c8a6f' },
];

// ─────────────────────────────────────────────────────────────
// Small inline icon helpers (Lucide-style, matching the prototype)
// ─────────────────────────────────────────────────────────────
type SvgProps = { size?: number; stroke?: string; sw?: number; style?: CSSProperties };

function ArrowRight({ size = 18, stroke = '#fff', sw = 2.4, style }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function ArrowBack({ stroke = '#8a8296' }: { stroke?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}
function ShieldCheck({ size = 26, stroke = '#f5d880', sw = 2 }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z" /><path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function InfoCircle({ size = 20, stroke = '#f5d880' }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 1 }}>
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}
function TrendingUp({ size = 24, stroke = '#fff', sw = 2 }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l6-6 4 4 8-8" /><path d="M17 7h4v4" />
    </svg>
  );
}
function MapPin({ stroke = '#c9c1d6' }: { stroke?: string }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function Chevron({ stroke = '#8a6ba3', rotate = 'none' }: { stroke?: string; rotate?: string }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ transform: rotate, transition: 'transform .2s' }}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
function CheckMark({ size = 26, stroke = '#4c8a6f', sw = 2.6 }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function LockIcon({ size = 22, stroke = '#a89bb8', sw = 2 }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#b8aec7" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 8v4l2 2" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#d9356e" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

// Step-4 guided-reveal helpers
function TipCallout({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', background: '#fdeef4', border: '1px solid #f6cfe0', borderLeft: '3px solid #d9356e', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
      <div style={{ fontSize: 13, lineHeight: 1.5, fontWeight: 600, color: '#381c4f' }}>{text}</div>
      <div onClick={onClose} style={{ cursor: 'pointer', flex: 'none', color: '#a89bb8', fontSize: 15, lineHeight: 1 }}>✕</div>
    </div>
  );
}
function RevealCard({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <div className="fyp-reveal" onClick={onClick} style={{ cursor: 'pointer', minHeight: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, textAlign: 'center', background: '#faf9fd', border: '2px dashed #d9cbe9', borderRadius: 20, padding: 26 }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#fff', border: '1px solid #e8e4ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlusIcon /></div>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#a89bb8' }}>Tap to reveal</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: '#381c4f', lineHeight: 1.2 }}>{name}</div>
    </div>
  );
}
function UpNextLock() {
  return (
    <div style={{ minHeight: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center', background: '#f6f4fa', border: '2px dashed #efeaf5', borderRadius: 20, padding: 26 }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#efeaf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LockIcon size={18} stroke="#b8aec7" sw={2} /></div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#b8aec7' }}>Up next</div>
    </div>
  );
}

// Component-scoped CSS (keyframes, range-slider styling, hover states, reduced-motion).
const FYP_CSS = `
@keyframes fypRise { from { opacity:0; transform:translateY(26px);} to { opacity:1; transform:none;} }
@keyframes fypRiseIn { from { opacity:0; transform:translateY(16px);} to { opacity:1; transform:none;} }
@keyframes fypGrowX { from { transform:scaleX(0);} to { transform:scaleX(1);} }
@keyframes fypPop { from { opacity:0; transform:scale(.96);} to { opacity:1; transform:scale(1);} }
input[type=range].fyp-budget { -webkit-appearance:none; appearance:none; width:100%; height:10px; border-radius:99px; outline:none; cursor:pointer; }
input[type=range].fyp-budget::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:32px; height:32px; border-radius:50%; background:#d9356e; border:5px solid #fff; box-shadow:0 4px 14px rgba(217,53,110,.45); cursor:pointer; }
input[type=range].fyp-budget::-moz-range-thumb { width:26px; height:26px; border-radius:50%; background:#d9356e; border:5px solid #fff; box-shadow:0 4px 14px rgba(217,53,110,.45); cursor:pointer; }
.fyp-choice { transition:transform .16s,border-color .2s,background .2s; }
.fyp-choice-blue:hover { transform:translateY(-4px); border-color:#a1c8e7 !important; background:rgba(255,255,255,.09) !important; }
.fyp-choice-pink:hover { transform:translateY(-4px); border-color:#d9356e !important; background:rgba(255,255,255,.09) !important; }
.fyp-choice-green:hover { transform:translateY(-4px); border-color:#aed7d0 !important; background:rgba(255,255,255,.09) !important; }
.fyp-cta:hover { background:#c12a60 !important; }
.fyp-phase:hover { color:#d9356e !important; }
.fyp-book:hover { background:#fff !important; color:#381c4f !important; }
.fyp-reveal { transition:border-color .2s,background .2s; }
.fyp-reveal:hover { border-color:#d9356e !important; background:#fdf7fa !important; }
@media (prefers-reduced-motion: reduce) {
  [style*="fypRise"], [style*="fypPop"], [style*="fypGrowX"] { animation:none !important; }
}
`;

// Shared style fragments
const EASE = 'cubic-bezier(.16,1,.3,1)';
const CTA_BTN: CSSProperties = {
  cursor: 'pointer', background: '#d9356e', color: '#fff', fontWeight: 700, fontSize: 15,
  letterSpacing: '.08em', textTransform: 'uppercase', padding: '18px 40px', borderRadius: 10,
  boxShadow: '0 8px 24px rgba(217,53,110,.25)', transition: 'background .2s',
  display: 'inline-flex', alignItems: 'center', gap: 10,
};
const BACK_LINK: CSSProperties = {
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
  fontSize: 14, fontWeight: 600, color: '#8a8296',
};
const MARKER: CSSProperties = {
  fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#a89bb8',
};

function ProfileChip({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e8e4ef', borderRadius: 99, padding: '8px 16px', fontSize: 13, fontWeight: 700, color: '#381c4f' }}>
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: color }} />{label}
    </span>
  );
}

// Roadmap node presentation
const NODE_DONE: CSSProperties = { width: 26, height: 26, borderRadius: '50%', background: '#d9356e', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const INNER_DONE: CSSProperties = { width: 9, height: 9, borderRadius: '50%', background: '#fff', display: 'block' };
const NODE_CURRENT: CSSProperties = { width: 26, height: 26, borderRadius: '50%', background: '#fff', border: '3px solid #d9356e', boxShadow: '0 0 0 5px rgba(217,53,110,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const INNER_CURRENT: CSSProperties = { width: 8, height: 8, borderRadius: '50%', background: '#d9356e', display: 'block' };
const NODE_LOCKED: CSSProperties = { width: 26, height: 26, borderRadius: '50%', background: 'transparent', border: '2px dashed #c9c1d6', display: 'block' };
const BADGE_HIT: CSSProperties = { width: 60, height: 60, borderRadius: '50%', background: '#e5f1ec', border: '2px solid #aed7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' };
const BADGE_LOCKED: CSSProperties = { width: 60, height: 60, borderRadius: '50%', background: '#f4f1f9', border: '2px dashed #c9c1d6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' };

export default function FindYourPathPage() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<'starting' | 'established' | 'multi' | null>(null);
  const [budget, setBudget] = useState(3);
  const [expandedMarket, setExpandedMarket] = useState(0);
  const [viewPhase, setViewPhase] = useState(0);
  const [showAllInit, setShowAllInit] = useState(false);
  const [openLead, setOpenLead] = useState<'a' | 'b' | null>('a');
  const [portalReveal, setPortalReveal] = useState(1);
  const [tip, setTip] = useState<'aq' | 'pb' | 'pv' | 'leads' | null>('aq');

  const go = (s: number) => { setStep(s); if (typeof window !== 'undefined') window.scrollTo({ top: 0 }); };
  // Entering the portal from Step 3 resets the guided tour to the start.
  const enterPortal = () => { setPortalReveal(1); setTip('aq'); go(4); };
  const pick = (p: 'starting' | 'established' | 'multi') => {
    const prof = PROFILES[p];
    const first = prof.markets[0] || { curPhase: 0 };
    setProfile(p);
    setBudget(prof.defaultBudget);
    setExpandedMarket(0);
    setViewPhase(first.curPhase);
    setShowAllInit(false);
    setPortalReveal(1);
    setTip('aq');
    setStep(2);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  };

  const prof = profile ? PROFILES[profile] : null;
  const B = budget;
  const lvl = BUDGET_LEVELS[B - 1] ?? BUDGET_LEVELS[2]!;

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Raw CSS via dangerouslySetInnerHTML: React would HTML-escape the quotes in the
          attribute selector inside <style>{`...`}</style> on the server (→ &quot;), which
          mismatches the client and breaks island hydration. */}
      <style dangerouslySetInnerHTML={{ __html: FYP_CSS }} />

      {/* Fixed 8px five-color accent bar (never reorder: pink, amber, blue, green, purple) */}
      <div style={{ display: 'flex', height: 8, width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 60 }}>
        <div style={{ flex: 1, background: '#d9356e' }} />
        <div style={{ flex: 1, background: '#f5d880' }} />
        <div style={{ flex: 1, background: '#a1c8e7' }} />
        <div style={{ flex: 1, background: '#aed7d0' }} />
        <div style={{ flex: 1, background: '#381c4f' }} />
      </div>

      {step === 1 && <Step1 pick={pick} />}
      {step === 2 && prof && <Step2 prof={prof} expandedMarket={expandedMarket} setExpandedMarket={setExpandedMarket} viewPhase={viewPhase} setViewPhase={setViewPhase} go={go} />}
      {step === 3 && prof && <Step3 prof={prof} B={B} lvl={lvl} setBudget={setBudget} go={go} enterPortal={enterPortal} />}
      {step === 4 && prof && <Step4 prof={prof} showAllInit={showAllInit} setShowAllInit={setShowAllInit} openLead={openLead} setOpenLead={setOpenLead} portalReveal={portalReveal} setPortalReveal={setPortalReveal} tip={tip} setTip={setTip} go={go} />}
      {step === 5 && prof && <Step5 prof={prof} B={B} lvl={lvl} go={go} />}
    </div>
  );
}

// ═══════════════════════════════ STEP 1 ═══════════════════════════════
function Step1({ pick }: { pick: (p: 'starting' | 'established' | 'multi') => void }) {
  const choices = [
    {
      key: 'starting' as const, cls: 'fyp-choice-blue', accent: '#a1c8e7', eyebrowColor: '#a1c8e7', iconStroke: '#381c4f',
      eyebrow: 'Just getting started', title: 'Little or no online presence',
      body: "New CAM, or boards can't find you online yet. You're ready to put yourself on the map.",
      delay: '.24s',
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#381c4f" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M19 5l-2.5 2.5M7.5 16.5 5 19" /><circle cx="12" cy="12" r="3" /></svg>,
    },
    {
      key: 'established' as const, cls: 'fyp-choice-pink', accent: '#d9356e', eyebrowColor: '#f3a6c2', iconStroke: '#fff',
      eyebrow: 'Established', title: 'One location, solid reputation',
      body: 'You manage a real portfolio and have a name locally — but growth is inconsistent.',
      delay: '.32s',
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M6 21V8l6-4 6 4v13M10 21v-5h4v5" /></svg>,
    },
    {
      key: 'multi' as const, cls: 'fyp-choice-green', accent: '#aed7d0', eyebrowColor: '#aed7d0', iconStroke: '#381c4f',
      eyebrow: 'Multi-location', title: 'Multiple markets to grow',
      body: "You've proven the model across offices and want to dominate every market you're in.",
      delay: '.4s',
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#381c4f" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V7l5-3v17M8 21V11l6-4v14M14 21V9l7 4v8M3 21h18" /></svg>,
    },
  ];

  return (
    <section style={{ minHeight: '100vh', background: '#381c4f', color: '#fff', padding: '64px clamp(28px,7vw,120px) 72px', display: 'flex', flexDirection: 'column' }}>
      <img src={LOGO_INVERTED} alt="Alloy Growth Partners" style={{ height: 42, width: 'auto' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <div style={{ animation: `fypRise .6s ${EASE} both`, fontSize: 14, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#f5d880', marginBottom: 26 }}>Find your path · 60 seconds</div>
        <h1 style={{ animation: `fypRise .6s ${EASE} .08s both`, fontSize: 'clamp(38px,6vw,86px)', fontWeight: 800, lineHeight: 1.03, letterSpacing: '-0.02em', margin: 0, maxWidth: 1050 }}>Where is your CAM<br />right now?</h1>
        <p style={{ animation: `fypRise .6s ${EASE} .16s both`, fontSize: 'clamp(18px,2vw,25px)', lineHeight: 1.5, color: 'rgba(255,255,255,.82)', margin: '30px 0 0', maxWidth: 760 }}>Pick the one that sounds like you. We'll show you exactly what Alloy does for a CAM in your position — and what your first quarter would look like.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22, marginTop: 56 }}>
          {choices.map((c) => (
            <div key={c.key} className={`fyp-choice ${c.cls}`} onClick={() => pick(c.key)} style={{ animation: `fypRise .6s ${EASE} ${c.delay} both`, cursor: 'pointer', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 16, padding: '34px 30px' }}>
              <div style={{ width: 52, height: 52, borderRadius: 13, background: c.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: c.eyebrowColor, marginTop: 22 }}>{c.eyebrow}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginTop: 8, lineHeight: 1.15 }}>{c.title}</div>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(255,255,255,.7)', margin: '14px 0 0', fontWeight: 500 }}>{c.body}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 22, fontSize: 14, fontWeight: 700, color: '#f5d880' }}>This is me <ArrowRight size={17} stroke="#f5d880" /></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', fontSize: 13, color: 'rgba(255,255,255,.45)', fontWeight: 500 }}>One partner per market. Answer honestly — the plan changes with the answer.</div>
    </section>
  );
}

// ═══════════════════════════════ STEP 2 ═══════════════════════════════
function Step2({ prof, expandedMarket, setExpandedMarket, viewPhase, setViewPhase, go }: {
  prof: Profile; expandedMarket: number; setExpandedMarket: (n: number) => void;
  viewPhase: number; setViewPhase: (n: number) => void; go: (s: number) => void;
}) {
  const expandedAny = expandedMarket >= 0 && expandedMarket < prof.markets.length;

  return (
    <section style={{ minHeight: '100vh', background: '#f8f7fc', padding: '72px clamp(28px,7vw,120px) 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <div style={{ animation: `fypRiseIn .5s ${EASE} both`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span onClick={() => go(1)} style={BACK_LINK}><ArrowBack />Change answer</span>
            <ProfileChip color={prof.color} label={prof.label} />
          </div>
          <div style={MARKER}>Step 2 of 5 · Your journey</div>
        </div>

        <div style={{ animation: `fypRiseIn .5s ${EASE} .06s both`, fontSize: 14, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#d9356e', marginTop: 36 }}>{prof.tagline}</div>
        <h2 style={{ animation: `fypRiseIn .5s ${EASE} .1s both`, fontSize: 'clamp(32px,4.6vw,62px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#381c4f', margin: '14px 0 0', maxWidth: 1000 }}>{prof.diagHeadline}</h2>
        <p style={{ animation: `fypRiseIn .5s ${EASE} .14s both`, fontSize: 'clamp(17px,1.9vw,23px)', lineHeight: 1.55, color: '#555', margin: '18px 0 0', maxWidth: 860, fontWeight: 500 }}>{prof.diagBody}</p>

        {/* growth journey roadmap */}
        <div style={{ animation: `fypPop .5s ${EASE} .18s both`, background: '#fff', borderRadius: 20, boxShadow: '0 16px 40px rgba(56,28,79,.12)', border: '1px solid #efeaf5', marginTop: 40, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: 900, padding: '30px 34px 34px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: '#381c4f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp /></div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#381c4f' }}>The growth journey</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ fontSize: 46, fontWeight: 800, color: '#381c4f', lineHeight: 1 }}>{prof.rmCount}</div>
                  <div style={{ borderLeft: '2px solid #e8e4ef', paddingLeft: 16 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#381c4f', lineHeight: 1.1 }}>{prof.rmLabel}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 14, color: '#8a8296', fontWeight: 600, marginTop: 3 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4c8a6f' }} />{prof.rmNote}</div>
                  </div>
                </div>
              </div>

              <div style={{ height: 1, background: '#eee6f2', margin: '24px 0 20px' }} />

              {/* phase header row */}
              <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr 44px', alignItems: 'center' }}>
                <div />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', textAlign: 'center' }}>
                  {PHASE_NAMES.map((nm, idx) => (
                    <div key={nm} className="fyp-phase" onClick={() => { setExpandedMarket(expandedMarket >= 0 ? expandedMarket : 0); setViewPhase(idx); }}
                      style={{ cursor: 'pointer', fontSize: 15, fontWeight: 800, color: (expandedAny && viewPhase === idx) ? '#d9356e' : '#381c4f', transition: 'color .15s' }}>{nm}</div>
                  ))}
                </div>
                <div />
              </div>

              {/* market rows */}
              {prof.markets.map((mk, i) => {
                const expanded = expandedMarket === i;
                const vp = expanded ? viewPhase : mk.curPhase;
                const hitCount = vp < mk.curPhase ? 5 : (vp === mk.curPhase ? mk.curHit : 0);
                let hitColor = '#a89bb8', hitBg = '#f4f1f9';
                if (hitCount === 5) { hitColor = '#4c8a6f'; hitBg = '#e5f1ec'; }
                else if (hitCount > 0) { hitColor = '#d9356e'; hitBg = '#fbe7ef'; }
                const fillWidth = `${(mk.curPhase / 4) * 80}%`;
                const toggle = () => {
                  if (expandedMarket === i) { setExpandedMarket(-1); }
                  else { setExpandedMarket(i); setViewPhase(mk.curPhase); }
                };
                return (
                  <div key={mk.name} style={{ border: `1px solid ${expanded ? '#e2d5ef' : '#efeaf5'}`, background: expanded ? '#ffffff' : '#faf9fd', borderRadius: 16, marginTop: 14, overflow: 'hidden', transition: 'border-color .2s' }}>
                    <div onClick={toggle} style={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: '230px 1fr 44px', alignItems: 'center', padding: '20px 16px 20px 22px', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                        <MapPin stroke={expanded ? '#d9356e' : '#c9c1d6'} />
                        <div>
                          <div style={{ fontSize: 19, fontWeight: 800, color: expanded ? '#381c4f' : '#6b6577', lineHeight: 1.1 }}>{mk.name}</div>
                          <div style={{ fontSize: 13, color: '#8a8296', fontWeight: 600, marginTop: 2 }}>{mk.sub}</div>
                        </div>
                      </div>
                      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', alignItems: 'center' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: 3, background: '#eee6f2', transform: 'translateY(-50%)', borderRadius: 2 }} />
                        <div style={{ position: 'absolute', top: '50%', left: '10%', width: fillWidth, height: 3, background: '#d9356e', transform: 'translateY(-50%)', borderRadius: 2 }} />
                        {[0, 1, 2, 3, 4].map((j) => {
                          const circleStyle = j < mk.curPhase ? NODE_DONE : j === mk.curPhase ? NODE_CURRENT : NODE_LOCKED;
                          const innerStyle = j < mk.curPhase ? INNER_DONE : j === mk.curPhase ? INNER_CURRENT : { display: 'none' as const };
                          return (
                            <div key={j} style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                              <div style={circleStyle}><span style={innerStyle} /></div>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: expanded ? '#d9356e' : '#f4f1f9', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>
                          <Chevron stroke={expanded ? '#fff' : '#8a6ba3'} rotate={expanded ? 'rotate(90deg)' : 'none'} />
                        </div>
                      </div>
                    </div>

                    {expanded && (
                      <div style={{ padding: '4px 24px 26px', borderTop: '1px solid #f1eef7' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: '#381c4f' }}>{PHASE_NAMES[vp]} milestones</div>
                            <span style={{ fontSize: 12, fontWeight: 800, color: hitColor, background: hitBg, padding: '4px 12px', borderRadius: 99 }}>{hitCount}/5 hit</span>
                          </div>
                          <div style={{ fontSize: 13, color: '#a89bb8', fontWeight: 600 }}>Click a phase above to preview its five gates</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, marginTop: 24 }}>
                          {(MILESTONE_SETS[vp] ?? []).map((nm, k) => {
                            const hit = vp < mk.curPhase || (vp === mk.curPhase && k < mk.curHit);
                            return (
                              <div key={nm} style={{ textAlign: 'center' }}>
                                <div style={hit ? BADGE_HIT : BADGE_LOCKED}>{hit ? <CheckMark /> : <LockIcon />}</div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: hit ? '#381c4f' : '#a89bb8', marginTop: 12, lineHeight: 1.25 }}>{nm}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ animation: `fypRiseIn .5s ${EASE} .26s both`, display: 'flex', alignItems: 'flex-start', gap: 20, background: '#381c4f', borderRadius: 16, padding: '28px 32px', marginTop: 22 }}>
          <div style={{ flex: 'none', width: 48, height: 48, borderRadius: 12, background: 'rgba(245,216,128,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck /></div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>Dominance isn't a finish line.</div>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(255,255,255,.8)', margin: '8px 0 0', fontWeight: 500, maxWidth: 900 }}>Reach the top and the work doesn't stop. Ease off and you slide back — competitors move, rankings decay, boards get courted. We keep feeding the engine so the lead you built is the lead you keep.</p>
          </div>
        </div>

        <div style={{ animation: `fypRiseIn .5s ${EASE} .32s both`, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, marginTop: 36 }}>
          <div className="fyp-cta" onClick={() => go(3)} style={CTA_BTN}>Build my first-quarter playbook <ArrowRight /></div>
          <span style={{ fontSize: 15, color: '#8a8296', fontWeight: 600 }}>See exactly what your first 90 days include. ↓</span>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════ STEP 3 ═══════════════════════════════
function Step3({ prof, B, lvl, setBudget, go, enterPortal }: {
  prof: Profile; B: number; lvl: typeof BUDGET_LEVELS[number]; setBudget: (n: number) => void; go: (s: number) => void; enterPortal: () => void;
}) {
  let q1Count = 0, totalCount = 0;
  const engines = ENGINE_META.map((em) => {
    let active = 0;
    const items = prof.plays.filter((p) => p.engine === em.key).map((it) => {
      const on = it.level <= B;
      totalCount++; if (on) { q1Count++; active++; }
      return { label: it.label, active: on, locked: !on, labelColor: on ? '#381c4f' : '#a89bb8' };
    });
    let countColor = '#a89bb8', countBg = '#f4f1f9';
    if (items.length && active === items.length) { countColor = '#4c8a6f'; countBg = '#e5f1ec'; }
    else if (active > 0) { countColor = '#d9356e'; countBg = '#fbe7ef'; }
    return { ...em, items, countLabel: `${active}/${items.length}`, countColor, countBg };
  });
  const pct = ((B - 1) / 3) * 100;
  const budgetGrad = `linear-gradient(90deg,#d9356e ${pct}%,rgba(255,255,255,.16) ${pct}%)`;

  let toolkitOn = 0;
  const toolkit = TOOLKIT.map((t) => {
    const on = t.level <= B;
    if (on) toolkitOn++;
    return { name: t.name, on, bg: on ? '#ffffff' : '#f6f4fa', border: on ? '#e2d5ef' : '#efeaf5', nameColor: on ? '#381c4f' : '#a89bb8' };
  });

  return (
    <section style={{ minHeight: '100vh', background: '#f8f7fc', padding: '72px clamp(28px,7vw,120px) 80px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <div style={{ animation: `fypRiseIn .5s ${EASE} both`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span onClick={() => go(2)} style={BACK_LINK}><ArrowBack />Back</span>
            <ProfileChip color={prof.color} label={prof.label} />
          </div>
          <div style={MARKER}>Step 3 of 5 · Your first quarter</div>
        </div>

        <div style={{ animation: `fypRiseIn .5s ${EASE} .06s both`, fontSize: 14, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#d9356e', marginTop: 34 }}>Your first 90 days</div>
        <h2 style={{ animation: `fypRiseIn .5s ${EASE} .1s both`, fontSize: 'clamp(32px,4.6vw,62px)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.02em', color: '#381c4f', margin: '14px 0 0', maxWidth: 1050 }}>{prof.q1Headline}</h2>
        <p style={{ animation: `fypRiseIn .5s ${EASE} .14s both`, fontSize: 'clamp(17px,1.9vw,22px)', lineHeight: 1.55, color: '#555', margin: '18px 0 0', maxWidth: 880, fontWeight: 500 }}>{prof.q1Body}</p>

        {/* budget slider */}
        <div style={{ animation: `fypPop .5s ${EASE} .18s both`, background: '#381c4f', borderRadius: 20, padding: '34px 38px', marginTop: 38, boxShadow: '0 16px 40px rgba(56,28,79,.18)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#f5d880' }}>Your quarterly budget</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 8 }}>
                <span style={{ fontSize: 'clamp(38px,5vw,58px)', fontWeight: 800, color: '#d9356e', lineHeight: 1, letterSpacing: '.02em' }}>{lvl.sym}</span>
                <span style={{ fontSize: 'clamp(24px,3vw,34px)', fontWeight: 800, color: '#fff' }}>{lvl.name}</span>
              </div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,.7)', fontWeight: 500, marginTop: 4 }}>{lvl.scope}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 'clamp(34px,4.5vw,52px)', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{q1Count}<span style={{ fontSize: 22, color: 'rgba(255,255,255,.5)' }}>/{totalCount}</span></div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', fontWeight: 600 }}>deliverables in Quarter 1</div>
            </div>
          </div>

          <div style={{ marginTop: 30 }}>
            <input type="range" min={1} max={4} step={1} value={B} onChange={(e) => setBudget(+e.target.value)} className="fyp-budget" style={{ background: budgetGrad }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
              {BUDGET_LEVELS.map((bl) => (
                <div key={bl.n} onClick={() => setBudget(bl.n)} style={{ cursor: 'pointer', textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: bl.n === B ? '#d9356e' : 'rgba(255,255,255,.35)', lineHeight: 1 }}>{bl.sym}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: bl.n === B ? '#fff' : 'rgba(255,255,255,.5)', marginTop: 6 }}>{bl.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: 'rgba(255,255,255,.06)', borderRadius: 12, padding: '18px 20px', marginTop: 28 }}>
            <InfoCircle />
            <p style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(255,255,255,.82)', margin: 0, fontWeight: 500 }}>Same playbook at any budget — a higher budget just means more of it lands in Quarter 1. A lighter budget spreads the same work across more quarters. We don't sell faster leads (too many variables). We sell how much gets done, and how soon.</p>
          </div>
        </div>

        {/* alloy toolkit */}
        <div style={{ animation: `fypPop .5s ${EASE} .2s both`, background: '#fff', borderRadius: 18, padding: '24px 26px', boxShadow: '0 10px 30px rgba(56,28,79,.08)', border: '1px solid #efeaf5', marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: '#8a8296' }}>Alloy toolkit · {TOOLKIT.length} systems</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#4c8a6f' }}>{toolkitOn} on</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12, marginTop: 16 }}>
            {toolkit.map((tk) => (
              <div key={tk.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, background: tk.bg, border: `1px solid ${tk.border}`, borderRadius: 12, padding: '16px 18px' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: tk.nameColor }}>{tk.name}</span>
                {tk.on ? (
                  <span style={{ flex: 'none', fontSize: 11, fontWeight: 800, letterSpacing: '.06em', color: '#4c8a6f', background: '#e5f1ec', padding: '5px 12px', borderRadius: 99 }}>ON</span>
                ) : (
                  <span style={{ flex: 'none', width: 28, height: 28, borderRadius: '50%', background: '#efeaf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LockIcon size={14} stroke="#b8aec7" sw={2.2} /></span>
                )}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: '#8a8296', fontWeight: 500, marginTop: 14 }}>Higher budgets switch more systems on. Locked systems are available as add-ons at any tier.</div>
        </div>

        {/* playbook — reach / match / retain */}
        <div style={{ marginTop: 24, overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 16, minWidth: 820 }}>
            {engines.map((eng) => (
              <div key={eng.key} style={{ animation: `fypPop .45s ${EASE} both`, background: '#fff', borderRadius: 18, padding: 22, boxShadow: '0 10px 30px rgba(56,28,79,.08)', border: '1px solid #efeaf5', borderTop: `4px solid ${eng.color}` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#381c4f' }}>{eng.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#8a8296', marginTop: 2 }}>{eng.sub}</div>
                  </div>
                  <span style={{ flex: 'none', fontSize: 12, fontWeight: 800, color: eng.countColor, background: eng.countBg, padding: '4px 10px', borderRadius: 99 }}>{eng.countLabel}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 14 }}>
                  {eng.items.map((it) => (
                    <div key={it.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderTop: '1px solid #f4f1f9' }}>
                      {it.active ? (
                        <span style={{ flex: 'none', width: 19, height: 19, borderRadius: '50%', background: '#e5f1ec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckMark size={12} sw={3.2} /></span>
                      ) : (
                        <span style={{ flex: 'none', width: 19, height: 19, borderRadius: '50%', background: '#f4f1f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ClockIcon /></span>
                      )}
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: it.labelColor, lineHeight: 1.3 }}>{it.label}</span>
                      {it.locked && <span style={{ flex: 'none', fontSize: 10, fontWeight: 700, color: '#a89bb8', background: '#f4f1f9', padding: '2px 7px', borderRadius: 99 }}>Later</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ animation: `fypRiseIn .5s ${EASE} .3s both`, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, marginTop: 36 }}>
          <div className="fyp-cta" onClick={enterPortal} style={CTA_BTN}>What this looks like <ArrowRight /></div>
          <span style={{ fontSize: 15, color: '#8a8296', fontWeight: 600 }}>This is an example quarter — yours is built around your actual CAM.</span>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════ STEP 4 ═══════════════════════════════
function Step4({ prof, showAllInit, setShowAllInit, openLead, setOpenLead, portalReveal, setPortalReveal, tip, setTip, go }: {
  prof: Profile; showAllInit: boolean; setShowAllInit: (b: boolean) => void;
  openLead: 'a' | 'b' | null; setOpenLead: (v: 'a' | 'b' | null) => void;
  portalReveal: number; setPortalReveal: (n: number) => void;
  tip: 'aq' | 'pb' | 'pv' | 'leads' | null; setTip: (v: 'aq' | 'pb' | 'pv' | 'leads' | null) => void;
  go: (s: number) => void;
}) {
  const toggleLead = (id: 'a' | 'b') => setOpenLead(openLead === id ? null : id);
  const docIcon = (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="#3a7fb0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
  );

  // Guided-tour reveal state derivations
  const showPB = portalReveal >= 2, btnPB = portalReveal === 1;
  const showPV = portalReveal >= 3, btnPV = portalReveal === 2, lockPV = portalReveal === 1;
  const showLeads = portalReveal >= 4, btnLeads = portalReveal === 3;
  const allRevealed = portalReveal >= 4;
  const closeTip = () => setTip(null);
  const revealNext = () => {
    const n = Math.min(4, portalReveal + 1);
    setPortalReveal(n);
    setTip(n === 2 ? 'pb' : n === 3 ? 'pv' : 'leads');
  };

  return (
    <section style={{ minHeight: '100vh', background: '#f8f7fc', padding: '72px clamp(28px,7vw,120px) 80px' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', width: '100%' }}>
        <div style={{ animation: `fypRiseIn .5s ${EASE} both`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span onClick={() => go(3)} style={BACK_LINK}><ArrowBack />Back</span>
          <div style={MARKER}>Step 4 of 5 · What this looks like</div>
        </div>

        <div style={{ animation: `fypRiseIn .5s ${EASE} .06s both`, fontSize: 14, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#d9356e', marginTop: 34 }}>Your portal · same for every partner</div>
        <h2 style={{ animation: `fypRiseIn .5s ${EASE} .1s both`, fontSize: 'clamp(32px,4.6vw,64px)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.02em', color: '#381c4f', margin: '14px 0 0', maxWidth: 1050 }}>{prof.getHeadline}</h2>
        <p style={{ animation: `fypRiseIn .5s ${EASE} .14s both`, fontSize: 18, lineHeight: 1.55, color: '#555', margin: '18px 0 0', maxWidth: 820, fontWeight: 500 }}>Your whole playbook runs here — what needs you, everything we're doing this quarter, and the dollar value we're creating. One screen, updated in real time.</p>

        {/* welcome band */}
        <div style={{ animation: `fypPop .5s ${EASE} .16s both`, position: 'relative', background: '#2e1642', borderRadius: 20, padding: '34px 38px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(56,28,79,.18)', marginTop: 44 }}>
          <div style={{ display: 'flex', height: 6, width: '100%', position: 'absolute', top: 0, left: 0 }}>
            <div style={{ flex: 1, background: '#d9356e' }} /><div style={{ flex: 1, background: '#f5d880' }} /><div style={{ flex: 1, background: '#a1c8e7' }} /><div style={{ flex: 1, background: '#aed7d0' }} /><div style={{ flex: 1, background: '#5a3d72' }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ flex: 'none', width: 58, height: 58, borderRadius: '50%', overflow: 'hidden', background: '#a1c8e7' }}><img src={PORTAL_AVATAR} alt="" style={{ width: 58, height: 58, objectFit: 'cover' }} /></div>
              <div style={{ fontSize: 'clamp(22px,2.6vw,34px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Welcome back, Summit Ridge.</div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#d9356e', color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '13px 20px', borderRadius: 10 }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v16M15 6v16" /></svg>View roadmap
            </div>
          </div>
        </div>

        {/* three widget cards — fixed 3-col so slots keep 1/3 width from first render */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 24, marginTop: 24, alignItems: 'start' }}>
          {/* Slot 1 · Action Queue (always shown) */}
          <div style={{ position: 'relative' }}>
          {tip === 'aq' && <TipCallout text="Action Queue — what needs your attention, synced to your inbox so nothing slips." onClose={closeTip} />}
          <div style={{ animation: `fypPop .5s ${EASE} .2s both`, background: '#fff', borderRadius: 20, padding: 26, boxShadow: '0 10px 30px rgba(56,28,79,.10)', border: '1px solid #efeaf5' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: '#fdf4d6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width={21} height={21} viewBox="0 0 24 24" fill="#381c4f"><path d="M13 2 4 14h6l-1 8 9-12h-6z" /></svg></div>
                <div><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#d9356e' }}>Waiting on you</div><div style={{ fontSize: 20, fontWeight: 800, color: '#381c4f' }}>Action Queue</div></div>
              </div>
            </div>
            <div style={{ background: '#fbfaff', border: '1px solid #eee6f2', borderRadius: 14, padding: '18px 20px', marginTop: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: '#d9356e', lineHeight: 1 }}>37</div>
              <div style={{ flex: 1, fontSize: 16, fontWeight: 700, color: '#381c4f', lineHeight: 1.2 }}>Leads to<br />qualify</div>
              <div style={{ background: '#d9356e', color: '#fff', fontSize: 13, fontWeight: 700, padding: '11px 16px', borderRadius: 9 }}>Qualify</div>
            </div>
            {[
              { dot: '#d9356e', label: 'Develop Website – City Pages', pill: 'Needs you', pillColor: '#d9356e', pillBg: '#fbe7ef', mt: 20, bt: true },
              { dot: '#e0b93c', label: 'Website Launch Plan Review', pill: 'Review', pillColor: '#9a7d1a', pillBg: '#fbf3d8', mt: 12, bt: false },
              { dot: '#a1c8e7', label: 'Quarterly Planning', pill: 'Scheduled', pillColor: '#3a7fb0', pillBg: '#eaf3fa', mt: 12, bt: false },
            ].map((r) => (
              <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: r.mt, ...(r.bt ? { paddingTop: 14, borderTop: '1px solid #f1eef7' } : {}) }}>
                <span style={{ flex: 'none', width: 9, height: 9, borderRadius: '50%', background: r.dot }} />
                <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: '#381c4f' }}>{r.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: r.pillColor, background: r.pillBg, padding: '4px 10px', borderRadius: 99 }}>{r.pill}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, fontSize: 13, color: '#8a8296', fontWeight: 600 }}>
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#8a8296" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg>Syncs to your inbox — reply anywhere.
            </div>
          </div>
          </div>

          {/* Slot 2 · Quarterly Playbook */}
          <div style={{ position: 'relative' }}>
          {btnPB && <RevealCard name="Quarterly Playbook" onClick={revealNext} />}
          {showPB && (<>
          {tip === 'pb' && <TipCallout text="Quarterly Playbook — every project and growth play we're running, tracked in the open." onClose={closeTip} />}
          <div style={{ animation: `fypPop .45s ${EASE} both`, background: '#fff', borderRadius: 20, padding: 26, boxShadow: '0 10px 30px rgba(56,28,79,.10)', border: '1px solid #efeaf5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: '#fbe1ec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke="#d9356e" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z" /><path d="M9 3v16" /></svg></div>
              <div><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#d9356e' }}>Q3 2026</div><div style={{ fontSize: 20, fontWeight: 800, color: '#381c4f' }}>Quarterly Playbook</div></div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e5f1ec', color: '#4c8a6f', fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 99, marginTop: 20 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4c8a6f' }} />In motion</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#381c4f', lineHeight: 1.15, margin: '14px 0 0' }}>6 initiatives in flight.</div>
            <div style={{ marginTop: 18 }}>
              {[
                { label: 'Website refresh', right: '60%', rightColor: '#8a8296', rightWeight: 600, rightSize: 14, pct: 60, bar: '#381c4f', delay: '.4s', mb: 14 },
                { label: 'Google Ads campaign', right: 'Live', rightColor: '#4c8a6f', rightWeight: 700, rightSize: 12, pct: 85, bar: '#d9356e', delay: '.5s', mb: 14 },
                { label: 'Local SEO · 12 keywords', right: '40%', rightColor: '#8a8296', rightWeight: 600, rightSize: 14, pct: 40, bar: '#a1c8e7', delay: '.6s', mb: 0 },
              ].map((p) => (
                <div key={p.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 600, color: '#381c4f' }}><span>{p.label}</span><span style={{ color: p.rightColor, fontWeight: p.rightWeight, fontSize: p.rightSize }}>{p.right}</span></div>
                  <div style={{ height: 7, background: '#eee6f2', borderRadius: 99, margin: `8px 0 ${p.mb}px`, overflow: 'hidden' }}><div style={{ height: '100%', width: `${p.pct}%`, background: p.bar, borderRadius: 99, transformOrigin: 'left', animation: `fypGrowX .9s ${EASE} ${p.delay} both` }} /></div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, borderTop: '1px solid #f1eef7', paddingTop: 14 }}>
              <div onClick={() => setShowAllInit(!showAllInit)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#d9356e', background: '#fbe7ef', padding: '4px 10px', borderRadius: 99 }}>+34</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#d9356e' }}>{showAllInit ? 'Show less' : 'See the other 34 initiatives'}</span>
                </div>
                <Chevron stroke="#d9356e" rotate={showAllInit ? 'rotate(90deg)' : 'none'} />
              </div>
              {showAllInit && (
                <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { dot: '#4c8a6f', label: 'Reputation & review program', pill: 'Live', pillColor: '#4c8a6f', pillBg: '#e5f1ec' },
                    { dot: '#e0b93c', label: 'Referral partner outreach', pill: 'In progress', pillColor: '#9a7d1a', pillBg: '#fbf3d8' },
                    { dot: '#4c8a6f', label: 'Content engine · 4 posts / mo', pill: 'Live', pillColor: '#4c8a6f', pillBg: '#e5f1ec' },
                    { dot: '#e0b93c', label: 'Email nurture sequences', pill: 'In progress', pillColor: '#9a7d1a', pillBg: '#fbf3d8' },
                    { dot: '#c9c1d6', label: 'Board event sponsorships', pill: 'Planned', pillColor: '#8a8296', pillBg: '#f4f1f9' },
                  ].map((r) => (
                    <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#381c4f', fontWeight: 600 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.dot }} />{r.label}
                      <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: r.pillColor, background: r.pillBg, padding: '3px 9px', borderRadius: 99 }}>{r.pill}</span>
                    </div>
                  ))}
                  <div style={{ fontSize: 13, color: '#8a8296', fontWeight: 600, paddingLeft: 18 }}>…and 29 more in your Playbook</div>
                </div>
              )}
            </div>
          </div>
          </>)}
          </div>

          {/* Slot 3 · Partnership Value */}
          <div style={{ position: 'relative' }}>
          {btnPV && <RevealCard name="Partnership Value" onClick={revealNext} />}
          {lockPV && <UpNextLock />}
          {showPV && (<>
          {tip === 'pv' && <TipCallout text="Partnership Value — the real dollar value we've built together, updated live." onClose={closeTip} />}
          <div style={{ animation: `fypPop .45s ${EASE} both`, background: '#fff', borderRadius: 20, padding: 26, boxShadow: '0 10px 30px rgba(56,28,79,.10)', border: '1px solid #efeaf5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: '#fdf4d6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp size={21} stroke="#381c4f" /></div>
              <div><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#d9356e' }}>Built together</div><div style={{ fontSize: 20, fontWeight: 800, color: '#381c4f' }}>Partnership Value</div></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
              {[
                { v: '11', vColor: '#381c4f', label: 'Qualified leads', sub: null },
                { v: '$540K', vColor: '#3a7fb0', label: 'Quote value', sub: null },
                { v: '$312K', vColor: '#4c8a6f', label: 'Revenue created', sub: null },
                { v: '+$1.2M', vColor: '#d9356e', label: 'Added CAM value', sub: 'from our work' },
              ].map((s) => (
                <div key={s.label} style={{ background: '#fbfaff', border: '1px solid #eee6f2', borderRadius: 12, padding: 15 }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: s.vColor, lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#381c4f', marginTop: 6 }}>{s.label}</div>
                  {s.sub && <div style={{ fontSize: 11, color: '#8a8296', fontWeight: 500, marginTop: 2 }}>{s.sub}</div>}
                </div>
              ))}
            </div>
          </div>
          </>)}
          </div>
        </div>

        {/* Slot 4 · Leads waiting on you (full width, below the grid) */}
        <div style={{ position: 'relative', marginTop: 24 }}>
        {btnLeads && (
          <div className="fyp-reveal" onClick={revealNext} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, background: '#faf9fd', border: '2px dashed #d9cbe9', borderRadius: 20, padding: 26 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid #e8e4ef', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><PlusIcon /></div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#a89bb8' }}>Tap to reveal</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#381c4f', lineHeight: 1.2 }}>Leads waiting on you</div>
            </div>
          </div>
        )}
        {showLeads && (<>
        {tip === 'leads' && <TipCallout text="Leads waiting on you — every inbound lead, traced from first click to signed contract." onClose={closeTip} />}
        <div style={{ animation: `fypPop .45s ${EASE} both`, background: '#fff', borderRadius: 20, padding: '26px 28px', boxShadow: '0 10px 30px rgba(56,28,79,.10)', border: '1px solid #efeaf5' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#381c4f' }}>Leads waiting on you</div>
            <div style={{ fontSize: 13, color: '#8a8296', fontWeight: 600 }}>Click a lead to trace its journey</div>
          </div>

          {[
            {
              id: 'a' as const, name: 'David Miller · Conroy Commons', srcDot: '#d9356e', meta: 'google · Proposal Request · Jul 21', mt: 18,
              trail: [
                { dot: '#d9356e', bold: false, text: 'Clicked Google ad — "HOA management near me"' },
                { dot: '#d9356e', bold: false, text: 'Viewed Services, then Pricing' },
                { dot: '#0f7a52', bold: true, text: 'Requested a proposal — awaiting your review' },
              ],
            },
            {
              id: 'b' as const, name: 'Karen Whitfield · Carriage Homes', srcDot: '#0f7a52', meta: 'referral · Proposal Request · Jul 17', mt: 12,
              trail: [
                { dot: '#0f7a52', bold: false, text: 'Referred by an existing board member' },
                { dot: '#0f7a52', bold: false, text: 'Reviewed the services overview page' },
                { dot: '#f5d880', bold: true, text: 'Discovery call booked for next week' },
              ],
            },
          ].map((lead) => {
            const open = openLead === lead.id;
            return (
              <div key={lead.id} style={{ border: '1px solid #eee6f2', borderRadius: 14, marginTop: lead.mt, overflow: 'hidden' }}>
                <div onClick={() => toggleLead(lead.id)} style={{ cursor: 'pointer', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ flex: 'none', width: 38, height: 38, borderRadius: 10, background: '#eaf3fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{docIcon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#381c4f' }}>{lead.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#8a8296', fontWeight: 600, marginTop: 2 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: lead.srcDot }} />{lead.meta}</div>
                  </div>
                  <div style={{ background: '#0f7a52', color: '#fff', fontSize: 13, fontWeight: 700, padding: '10px 16px', borderRadius: 9 }}>Qualify now</div>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: '#f4f1f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21, fontWeight: 700, color: '#8a6ba3' }}>{open ? '–' : '+'}</div>
                </div>
                {open && (
                  <div style={{ padding: '2px 20px 20px 72px', display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {lead.trail.map((t, ti) => (
                      <div key={ti} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 14, color: t.bold ? '#381c4f' : '#555', fontWeight: t.bold ? 700 : 500 }}>
                        <span style={{ flex: 'none', width: 9, height: 9, borderRadius: '50%', background: t.dot }} />{t.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        </>)}
        </div>

        <div style={{ animation: `fypRiseIn .5s ${EASE} .4s both`, display: allRevealed ? 'flex' : 'none', flexWrap: 'wrap', alignItems: 'center', gap: 20, marginTop: 40 }}>
          <div className="fyp-cta" onClick={() => go(5)} style={CTA_BTN}>How do I get this? <ArrowRight /></div>
          <span style={{ fontSize: 15, color: '#8a8296', fontWeight: 600 }}>One last step.</span>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════ STEP 5 ═══════════════════════════════
function Step5({ prof, B, lvl, go }: {
  prof: Profile; B: number; lvl: typeof BUDGET_LEVELS[number]; go: (s: number) => void;
}) {
  // Recompute Quarter-1 deliverable count (matches Step 3 derivation)
  const q1Count = prof.plays.filter((p) => p.level <= B).length;
  const exclIncluded = B === 4;
  const exclColor = exclIncluded ? '#aed7d0' : 'rgba(255,255,255,.75)';
  const exclStroke = exclIncluded ? '#aed7d0' : 'rgba(255,255,255,.45)';

  const steps = [
    { n: '1', bg: '#f5d880', title: 'Claim your market', body: 'We confirm your market is still open and reserve it for your CAM.', delay: '.24s' },
    { n: '2', bg: '#a1c8e7', title: 'We build your playbook', body: 'A quarter built around your actual CAM, live in your portal from day one.', delay: '.3s' },
    { n: '3', bg: '#aed7d0', title: 'Watch the work compound', body: 'Every objective, decision, and dollar of impact — visible as it happens.', delay: '.36s' },
  ];

  return (
    <section style={{ minHeight: '100vh', background: '#381c4f', color: '#fff', padding: '72px clamp(28px,7vw,120px) 80px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <div style={{ animation: `fypRiseIn .5s ${EASE} both`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span onClick={() => go(4)} style={{ ...BACK_LINK, color: 'rgba(255,255,255,.6)' }}><ArrowBack stroke="rgba(255,255,255,.6)" />Back</span>
          <div style={{ ...MARKER, color: 'rgba(255,255,255,.4)' }}>Step 5 of 5 · Get started</div>
        </div>

        <div style={{ animation: `fypRiseIn .5s ${EASE} .06s both`, fontSize: 14, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#f5d880', marginTop: 34 }}>Get started</div>
        <h2 style={{ animation: `fypRiseIn .5s ${EASE} .1s both`, fontSize: 'clamp(34px,5.4vw,80px)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.02em', margin: '14px 0 0', maxWidth: 1100 }}>Claim your market before someone else does.</h2>

        {/* your plan recap */}
        <div style={{ animation: `fypPop .5s ${EASE} .16s both`, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 18, padding: '28px 32px', marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)' }}>Your starting point</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 8 }}>{prof.label}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)' }}>Your budget</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 8 }}><span style={{ color: '#d9356e' }}>{lvl.sym}</span> <span style={{ color: '#fff' }}>{lvl.name}</span></div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)' }}>Quarter 1 scope</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 8 }}>{q1Count} deliverables</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)' }}>Market exclusivity</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 800, color: exclColor, marginTop: 8 }}>
              <ShieldCheck size={18} stroke={exclStroke} sw={2.4} />{exclIncluded ? 'Included' : 'Add-on'}
            </div>
          </div>
        </div>

        {/* transparency note */}
        <div style={{ animation: `fypRiseIn .5s ${EASE} .2s both`, display: 'flex', alignItems: 'flex-start', gap: 14, background: 'rgba(245,216,128,.1)', border: '1px solid rgba(245,216,128,.25)', borderRadius: 14, padding: '20px 24px', marginTop: 20 }}>
          <InfoCircle size={22} />
          <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(255,255,255,.85)', margin: 0, fontWeight: 500, maxWidth: 960 }}>Your budget sets how fast we accomplish the objectives that drive growth — not how fast leads arrive (too many variables to promise that). Invest more and more gets done each quarter; invest less and the same work simply takes longer to complete.</p>
        </div>

        {/* three steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24, marginTop: 36 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ animation: `fypRiseIn .5s ${EASE} ${s.delay} both` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#381c4f', background: s.bg, width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.n}</div>
              <div style={{ fontSize: 21, fontWeight: 700, margin: '18px 0 8px' }}>{s.title}</div>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(255,255,255,.72)', margin: 0, fontWeight: 500 }}>{s.body}</p>
            </div>
          ))}
        </div>

        <div style={{ animation: `fypRiseIn .5s ${EASE} .4s both`, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18, marginTop: 44 }}>
          <a className="fyp-cta" href={SIGNUP_HREF} style={{ background: '#d9356e', color: '#fff', fontWeight: 700, fontSize: 15, letterSpacing: '.1em', textTransform: 'uppercase', padding: '18px 42px', borderRadius: 10, boxShadow: '0 8px 24px rgba(217,53,110,.25)', transition: 'background .2s' }}>Get started</a>
          <a className="fyp-book" href={BOOK_HREF} style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,.5)', fontWeight: 700, fontSize: 15, letterSpacing: '.1em', textTransform: 'uppercase', padding: '16px 36px', borderRadius: 10, transition: 'background .2s,color .2s' }}>Book a call</a>
          <span style={{ fontSize: 15, color: '#f5d880', fontWeight: 600 }}>One CAM per market. Yours is still open.</span>
        </div>

        <p style={{ animation: `fypRiseIn .5s ${EASE} .46s both`, fontSize: 'clamp(19px,2.3vw,28px)', fontWeight: 600, color: 'rgba(255,255,255,.85)', margin: '56px 0 0', maxWidth: 900, lineHeight: 1.4 }}>Most partners tell us the same thing: <span style={{ color: '#fff' }}>"I wish we'd started sooner."</span></p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 48, flexWrap: 'wrap', gap: 20 }}>
          <img src={LOGO_INVERTED} alt="Alloy Growth Partners" style={{ height: 36, width: 'auto' }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', fontWeight: 500 }}>Example figures & playbook shown for illustration.</span>
        </div>
      </div>
    </section>
  );
}
