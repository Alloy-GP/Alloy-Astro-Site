// src/components/modules/HeroMap.tsx
// Homepage hero — option 7a "map hero" (docs/redesign-handoff-hero-7a/README.md, client 2026-10-02). STATIC.
// Left: pink keyword eyebrow (client), H1 question with the pink last clause, payoff line, and the metro card
// (purple header band + combined field — the MetroCheck island arrives as `children` — + guarantee row that
// opens the terms <dialog>). Right: a muted street map of the metro (static image generated from OSM tiles by
// .context/gen-map.mjs; Austin by default) with the three ways a board finds a management company layered on
// top — Google local-pack card, ChatGPT thread, referral pill — all pointing at the same #1 pin: Your Company.
// Map is decorative (aria-hidden, no pointer events). The pin pulse is the only motion (reduced-motion: off).
// Deviations from the handoff (earlier client calls): flush hero (no outer card/border/shadow), site radii (10),
// pink keyword eyebrow + question as H1, whole guarantee row is the terms button, Open/Claimed result state.
import type { ReactNode } from 'react';

type GlyphName = 'sparkle' | 'users' | 'check';
const PATHS: Record<GlyphName, string> = {
  sparkle: 'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  check: 'M20 6 9 17l-5-5',
};
export function Glyph({ name, size = 16, stroke = 2.5, color = 'currentColor' }: { name: GlyphName; size?: number; stroke?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

/** Google "G" (brand mark, nominative use — depicts where boards search; legal review noted in the launch checklist). */
function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" style={{ flex: 'none' }}>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.5 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.5z" />
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.3 0 11.7-2.1 15.6-5.7l-7.6-5.9c-2.1 1.4-4.8 2.3-8 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

/** Guarantee badge: five 5px arcs on r46 in brand order, purple disc, gold check. No text. */
export function GuaranteeBadge() {
  const ring = ['var(--alloy-purple)', 'var(--alloy-pink)', 'var(--alloy-yellow)', 'var(--alloy-blue)', 'var(--alloy-green)'];
  return (
    <svg className="rd-mc-badge" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <g fill="none" strokeWidth={5} strokeLinecap="round" strokeDasharray="48 241" transform="rotate(-142 50 50)">
        {ring.map((c, i) => <circle key={c} cx={50} cy={50} r={46} stroke={c} transform={`rotate(${i * 72} 50 50)`} />)}
      </g>
      <circle cx={50} cy={50} r={35} fill="var(--alloy-purple)" />
      <path d="M36 51l9 9 19-20" fill="none" stroke="var(--alloy-yellow)" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Default metro shown on the map. Swap per visitor once a map provider key exists (see OPEN-QUESTIONS §39). */
const MAP = { src: '/assets/map/austin.webp', metro: 'Austin' };

export default function HeroMap({ children }: { children?: ReactNode }) {
  return (
    <div className="rd-hm">
      {/* Left: copy + metro card */}
      <div className="rd-hm-left">
        <div className="rd-hm-copy">
          <div className="rd-hm-eyebrow">Marketing for HOA Management Companies</div>
          <h1 className="rd-hm-title">When a board in your city looks for a new HOA management company, <span className="rd-accent">who do they find?</span></h1>
          <p className="rd-hm-payoff">Google, AI assistants, referral networks — boards check all three. We make sure it’s you, and only you, in your market.</p>
        </div>

        <div className="rd-mc">
          {children}
          <a href="/faq#guarantee" className="rd-mc-guarantee" data-dialog="guarantee-terms" aria-haspopup="dialog">
            <GuaranteeBadge />
            <span className="rd-mc-guarantee-body">
              <span className="rd-mc-guarantee-title">Your growth covers our fees. Guaranteed.</span>
              <span className="rd-mc-guarantee-link">See guarantee terms</span>
            </span>
          </a>
        </div>
      </div>

      {/* Right: the map + callouts (decorative) */}
      <div className="rd-hm-map" aria-hidden="true">
        <div className="rd-hm-map-clip">
          <img src={MAP.src} alt="" width={1200} height={1200} fetchPriority="high" decoding="async" />
          <div className="rd-hm-map-tint" />
          <div className="rd-hm-map-vignette" />
        </div>

        <span className="rd-hm-dot" style={{ left: '86%', top: '12%' }} />
        <span className="rd-hm-dot" style={{ left: '58%', top: '46%' }} />
        <span className="rd-hm-pulse" />
        <div className="rd-hm-pin">
          <span className="rd-hm-pin-num">1</span>
          <span className="rd-hm-pin-label">Your Company</span>
        </div>

        <div className="rd-hm-google">
          <div className="rd-hm-callout-head"><GoogleG /><span>Google search</span></div>
          <div className="rd-hm-query">hoa management company near me</div>
          <div className="rd-hm-stack">
            <div className="rd-hm-result"><span className="rd-hm-rank">1</span><span className="rd-hm-name">Your Company</span><span className="rd-hm-trail">4.9</span><span className="rd-hm-you">YOU</span></div>
            <div className="rd-hm-skel"><span /><span style={{ width: '62%' }} /></div>
            <div className="rd-hm-skel"><span /><span style={{ width: '48%' }} /></div>
          </div>
        </div>

        <div className="rd-hm-chat">
          <div className="rd-hm-bubble rd-hm-bubble--q"><span className="rd-hm-bubble-label">Asked ChatGPT</span>Who’s the best HOA management company in {MAP.metro}?</div>
          <div className="rd-hm-reply">
            <span className="rd-hm-avatar"><Glyph name="sparkle" size={16} stroke={2.5} /></span>
            <div className="rd-hm-bubble rd-hm-bubble--a">
              <div className="rd-hm-bubble-label rd-hm-bubble-label--ai"><Glyph name="sparkle" size={10} stroke={3} />ChatGPT · answer</div>
              <span className="rd-hm-chip">Your Company</span>is the top choice in {MAP.metro} — strong board reviews and local experience.
            </div>
          </div>
        </div>

        <div className="rd-hm-referral">
          <span className="rd-hm-referral-icon"><Glyph name="users" size={16} /></span>
          <span className="rd-hm-referral-text">
            <span className="rd-hm-referral-label">Referral · Oak Hollow HOA</span>
            <span className="rd-hm-referral-title">Matched with Your Company</span>
          </span>
        </div>

        <div className="rd-hm-attrib">© OpenStreetMap contributors</div>
      </div>

      {/* Guarantee terms — native <dialog>, opened by src/lib/dialog.ts (no-JS fallback: /faq#guarantee) */}
      <dialog id="guarantee-terms" className="rd-dialog" aria-labelledby="guarantee-terms-title">
        <div className="rd-dialog-panel">
          <button type="button" className="rd-dialog-close" data-dialog-close aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
          </button>
          <div className="rd-dialog-eyebrow">The floor · 1×</div>
          <h3 id="guarantee-terms-title" className="rd-dialog-title">Your growth covers our fees. Guaranteed.</h3>
          <p className="rd-dialog-lead">1× is the floor: the new business Alloy brings in covers what you pay us. We’re confident enough to back it with our money, not just yours.</p>
          <div className="rd-dialog-terms">
            <div className="rd-dialog-terms-head">The one condition</div>
            <p>The guarantee holds when your firm runs the programs we put in place — the review requests, proposals, follow-ups, and board touchpoints that make the system work. We build it; you run it with us. That’s how we can make the promise.</p>
            <p>How growth is measured, the timeframe, and what happens if we miss are spelled out in your engagement agreement before you sign, so there’s nothing to interpret later.</p>
          </div>
          <div className="rd-dialog-actions">
            <a href="/contact" className="rd-mc-btn">Claim your market</a>
            <button type="button" className="rd-mc-again" data-dialog-close>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
