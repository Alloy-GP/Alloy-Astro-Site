// src/components/sections/HeroCard.tsx
// Replacement for the rotating metrics card in the homepage hero (design option 2b, light).
// Tells one story from the HOA board's POV: three search moments → same answer → "Is your metro still open?"
// Follows the repo's inline-style convention. Submit handler is a prop so it can reuse MarketChecker's lookup.
import { useState } from 'react';
import { PURPLE, PINK } from '~/lib/tokens';

const GOLD = '#F2D98A';
const PANEL = '#f3f0f8';      // lavender inner panel
const BORDER = '#e8e4ef';
const BODY = '#555555';
const MUTED = '#8C7A9E';
const LIVE = '#2f9e85';

interface HeroCardProps {
  onCheck?: (metro: string) => void;
  /** Hide the headline so the Astro layer can own the h1 for LCP (same pattern as hideHero). */
  hideHeadline?: boolean;
}

export default function HeroCard({ onCheck, hideHeadline = false }: HeroCardProps) {
  const [metro, setMetro] = useState('');
  return (
    <div className="hero-card" style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 24, padding: 40, boxShadow: '0 6px 18px rgba(56,28,79,0.08)', display: 'flex', flexDirection: 'column', gap: 26, fontFamily: 'var(--font-display)' }}>
      {/* Top: eyebrow + capped headline, context line bottom-right */}
      <div className="hero-card-top" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr)', gap: 40, alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: PINK, lineHeight: 1.6 }}>
            Growth partner for community association management companies, one per metro.
          </div>
          {!hideHeadline && (
            <h2 style={{ margin: 0, maxWidth: 540, fontSize: 42, lineHeight: 1.08, fontWeight: 700, color: PURPLE, letterSpacing: '-0.015em', textWrap: 'balance' }}>
              When a board in your city looks for a new management company, who do they find?
            </h2>
          )}
        </div>
        <p className="hero-card-aside" style={{ margin: '0 0 6px', maxWidth: 300, justifySelf: 'end', fontSize: 15.5, fontWeight: 500, color: BODY, lineHeight: 1.55 }}>
          Boards look in three places. The answer should be the same in every one of them.
        </p>
      </div>

      {/* Search story */}
      <div style={{ background: PANEL, borderRadius: 18, padding: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <Moment icon="search" iconBg="#e3eef8" iconColor="#3f6f9e" label="Google search">
            <div style={{ background: PANEL, borderRadius: 999, padding: '9px 14px', color: BODY, fontSize: 12.5, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>hoa management company near me</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Answer icon="pin" trailing="4.9" />
              <Skeleton width="62%" />
              <Skeleton width="48%" />
            </div>
          </Moment>
          <Moment icon="sparkle" iconBg="#e1f0ec" iconColor="#2f7a6a" label="AI assistant">
            <div style={{ alignSelf: 'flex-end', maxWidth: '92%', background: PANEL, borderRadius: '14px 14px 4px 14px', padding: '9px 14px', color: BODY, fontSize: 12.5, fontWeight: 500, lineHeight: 1.45 }}>Who should our board consider?</div>
            <div style={{ color: BODY, fontSize: 12.5, fontWeight: 500, lineHeight: 1.6 }}>
              Boards in your area most often start with{' '}
              <span style={{ display: 'inline-block', margin: '3px 0', background: PURPLE, borderRadius: 8, padding: '4px 10px', color: '#fff', fontSize: 13.5, fontWeight: 700, lineHeight: 1.4 }}>Your Company</span>
              {' '}for local experience and strong reviews.
            </div>
          </Moment>
          <Moment icon="users" iconBg="#f9e1ea" iconColor={PINK} label="Referral network">
            <div style={{ background: PANEL, borderRadius: 10, padding: '11px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: PURPLE }}>Oak Hollow HOA</span>
              <span style={{ fontSize: 11.5, fontWeight: 500, color: MUTED }}>212 homes · Seeking new management</span>
            </div>
            <Answer icon="check" trailing="Matched" />
          </Moment>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 18, fontWeight: 500, color: BODY, lineHeight: 1.5 }}>
        We make sure it's you, and <span style={{ color: PURPLE, fontWeight: 700 }}>only you</span> in your market.
      </p>

      <div style={{ height: 1, background: BORDER }} />

      {/* Availability check */}
      <div className="hero-card-avail" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr)', gap: 24, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 26, lineHeight: 1.15, fontWeight: 700, color: PURPLE }}>Is your metro still open?</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: BODY }}>
            <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: LIVE, display: 'inline-block', boxShadow: '0 0 0 4px rgba(47,158,133,0.18)' }} />
            Live availability
          </div>
        </div>
        <form className="hero-card-form" style={{ display: 'flex', gap: 10 }} onSubmit={(e) => { e.preventDefault(); onCheck?.(metro.trim()); }}>
          <label htmlFor="hero-metro" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Your metro</label>
          <input id="hero-metro" value={metro} onChange={(e) => setMetro(e.target.value)} placeholder="Enter your metro" autoComplete="address-level2"
            style={{ flex: 1, minWidth: 0, height: 56, borderRadius: 10, border: '1px solid #c9c1d6', background: '#fff', padding: '0 18px', fontFamily: 'inherit', fontWeight: 500, fontSize: 15, color: PURPLE, outline: 'none' }} />
          <button type="submit" style={{ flex: 'none', height: 56, padding: '0 26px', borderRadius: 10, border: 'none', background: PINK, color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 8px 24px rgba(217,53,110,0.25)' }}>
            Check availability
          </button>
        </form>
      </div>
    </div>
  );
}

function Moment({ icon, iconBg, iconColor, label, children }: { icon: 'search' | 'sparkle' | 'users'; iconBg: string; iconColor: string; label: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: 18, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0, boxShadow: `0 2px 6px rgba(56,28,79,0.08), 0 0 0 1px ${BORDER}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: 6, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <Glyph name={icon} color={iconColor} size={12} strokeWidth={2.5} />
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: PURPLE }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

// The repeated focal element: solid purple block, gold mark, "Your Company".
function Answer({ icon, trailing }: { icon: 'pin' | 'check'; trailing: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: PURPLE, borderRadius: 10, padding: '12px 14px' }}>
      <Glyph name={icon} color={GOLD} size={16} strokeWidth={icon === 'check' ? 2.5 : 2} />
      <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Your Company</span>
      <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 700, color: GOLD }}>{trailing}</span>
    </div>
  );
}

function Skeleton({ width }: { width: string }) {
  return (
    <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px' }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: BORDER, flex: 'none' }} />
      <span style={{ height: 8, width, borderRadius: 4, background: BORDER }} />
    </div>
  );
}

// Swap for the repo's <Icon> if these names exist there (lucide: search, sparkles, users, map-pin, check).
const PATHS: Record<string, string> = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 1 0 0-14Zm9 16-3.5-3.5',
  sparkle: 'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  pin: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0ZM12 7a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z',
  check: 'M20 6 9 17l-5-5',
};
function Glyph({ name, color, size, strokeWidth }: { name: string; color: string; size: number; strokeWidth: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }} aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}
