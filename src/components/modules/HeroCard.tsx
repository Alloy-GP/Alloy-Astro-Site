// src/components/modules/HeroCard.tsx
// Homepage hero card — design option 2b (final), docs/redesign-handoff-hero-2b/README.md.
// One story from the board's point of view: a board searches three ways (Google, an AI assistant,
// the referral network) and finds the same company every time → payoff line → "Is your metro still
// open?" + the pays-for-itself guarantee. STATIC (no client directive): only the availability check
// hydrates — it arrives as `children` from index.astro (<HeroCard><MetroCheck client:load /></HeroCard>).
// Copy is the handoff's, verbatim, except: the question is the page H1 and gained "HOA" (target term); the eyebrow is a plain label.
// "Your Company" / "Oak Hollow HOA" are illustrative placeholders by design (client-approved).
import type { ReactNode } from 'react';

type GlyphName = 'search' | 'sparkle' | 'users' | 'pin' | 'check';
const PATHS: Record<GlyphName, string> = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 1 0 0-14Zm9 16-3.5-3.5',
  sparkle: 'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  pin: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0ZM12 7a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z',
  check: 'M20 6 9 17l-5-5',
};

export function Glyph({ name, size = 16, stroke = 2.5, color = 'currentColor', draw = false }: { name: GlyphName; size?: number; stroke?: number; color?: string; draw?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {draw ? <path className="rd-hc-draw" d={PATHS[name]} pathLength={1} /> : <path d={PATHS[name]} />}
    </svg>
  );
}

function Moment({ icon, chipBg, chipColor, label, children }: { icon: GlyphName; chipBg: string; chipColor: string; label: string; children: ReactNode }) {
  return (
    <div className="rd-hc-moment">
      <div className="rd-hc-moment-head">
        <span className="rd-hc-chip" style={{ background: chipBg }}><Glyph name={icon} size={12} color={chipColor} /></span>
        <span className="rd-hc-moment-label">{label}</span>
      </div>
      {children}
    </div>
  );
}

/** The repeated focal element: purple block, 3px gold edge, gold mark, "Your Company". */
function Answer({ icon, trailing, rank = false, anim, draw = false }: { icon: GlyphName; trailing: string; rank?: boolean; anim?: 'pop' | 'slide'; draw?: boolean }) {
  return (
    <div className="rd-hc-answer" {...(anim ? { 'data-anim': anim } : {})}>
      {rank ? <span className="rd-hc-rank" aria-hidden="true">1</span> : null}
      <Glyph name={icon} size={rank ? 14 : 16} stroke={icon === 'pin' ? 2 : 2.5} color="var(--alloy-gold)" draw={draw} />
      <span className="rd-hc-answer-name">Your Company</span>
      <span className="rd-hc-answer-trail">{trailing}</span>
    </div>
  );
}

function Skeleton({ width }: { width: string }) {
  return (
    <div className="rd-hc-skel" aria-hidden="true" data-anim="fade"><span /><span style={{ width }} /></div>
  );
}

export default function HeroCard({ children }: { children?: ReactNode }) {
  return (
    <div className="rd-hc">
      <div className="rd-hc-head">
        {/* The card is the hero. The question is the page H1 (client, 2026-10-01: "HOA" added for the target term); the keyword eyebrow is a plain label. */}
        <div className="rd-hc-eyebrow">Marketing for HOA Management Companies</div>
        <h1 className="rd-hc-title">When a board in your city looks for a new HOA management company, who do they find?</h1>
      </div>

      {/* Search story — three moments, same answer */}
      {/* Search story — three moments, same answer. With JS they play one at a time (src/lib/hero-story.ts):
          Google types the query → result pops; AI types the question → thinks → answer slides in; Referral shows the
          request → searches → match pops with the check drawing. Final state is what's rendered here (no JS = static). */}
      <div className="rd-hc-story">
        <div className="rd-hc-moments" data-story>
          <Moment icon="search" chipBg="#e3eef8" chipColor="#3f6f9e" label="Google search">
            <div className="rd-hc-pill" data-type>hoa management company near me</div>
            <div className="rd-hc-stack">
              <Answer icon="pin" trailing="4.9" rank anim="pop" />
              <Skeleton width="62%" />
              <Skeleton width="48%" />
            </div>
          </Moment>
          <Moment icon="sparkle" chipBg="#e1f0ec" chipColor="#2f7a6a" label="AI assistant">
            <div className="rd-hc-bubble" data-type>Who’s the best HOA management company in Austin?</div>
            <div className="rd-hc-stack">
              <div className="rd-hc-thinking" hidden aria-hidden="true"><span /><span /><span /></div>
              <Answer icon="sparkle" trailing="Top choice" anim="slide" />
              <div className="rd-hc-sentence" data-anim="fade">A top choice, known for local experience and strong reviews.</div>
            </div>
          </Moment>
          <Moment icon="users" chipBg="#f9e1ea" chipColor="var(--alloy-pink)" label="Referral network">
            <div className="rd-hc-request" data-anim="fade">
              <span className="rd-hc-request-title">Oak Hollow HOA</span>
              <span className="rd-hc-request-meta">212 homes · Seeking new management</span>
            </div>
            <div className="rd-hc-searching" hidden aria-hidden="true"><span className="rd-hc-searching-bar" /><span>Searching for a match…</span></div>
            <Answer icon="check" trailing="Matched" anim="pop" draw />
          </Moment>
        </div>
      </div>

      <p className="rd-hc-payoff">We make sure it’s you, and only you, in your market.</p>

      <div className="rd-hc-rule" />

      {/* Availability check (island) + guarantee */}
      <div className="rd-hc-bottom">
        {children}
        {/* The whole guarantee card opens the terms modal (client, 2026-10-01); /faq#guarantee is the no-JS fallback.
            Copy = "The floor · 1×" from the client's three-year-plan graphic (2026-10-02). */}
        <a href="/faq#guarantee" className="rd-hc-guarantee" data-dialog="guarantee-terms" aria-haspopup="dialog">
          <span className="rd-hc-guarantee-side">
            <span className="rd-hc-guarantee-mo">The floor</span>
            <span className="rd-hc-guarantee-x">1×</span>
          </span>
          <span className="rd-hc-guarantee-body">
            <span className="rd-hc-guarantee-title">Your growth covers our fees. Guaranteed.</span>
            <span className="rd-hc-guarantee-text">We’re confident enough to back it with our money, not just yours.</span>
            <span className="rd-hc-guarantee-link">See guarantee terms</span>
          </span>
        </a>
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
            <a href="/contact" className="rd-hc-btn">Claim your market</a>
            <button type="button" className="rd-hc-again" data-dialog-close>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
