// src/components/modules/HeroCard.tsx
// Homepage hero card — design option 2b (final), docs/redesign-handoff-hero-2b/README.md.
// One story from the board's point of view: a board searches three ways (Google, an AI assistant,
// the referral network) and finds the same company every time → payoff line → "Is your metro still
// open?" + the pays-for-itself guarantee. STATIC (no client directive): only the availability check
// hydrates — it arrives as `children` from index.astro (<HeroCard><MetroCheck client:load /></HeroCard>).
// Copy is the handoff's, verbatim. "Your Company" / "Oak Hollow HOA" are illustrative placeholders by design.
import type { ReactNode } from 'react';

type GlyphName = 'search' | 'sparkle' | 'users' | 'pin' | 'check';
const PATHS: Record<GlyphName, string> = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 1 0 0-14Zm9 16-3.5-3.5',
  sparkle: 'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  pin: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0ZM12 7a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z',
  check: 'M20 6 9 17l-5-5',
};

export function Glyph({ name, size = 16, stroke = 2.5, color = 'currentColor' }: { name: GlyphName; size?: number; stroke?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
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
function Answer({ icon, trailing, rank = false }: { icon: GlyphName; trailing: string; rank?: boolean }) {
  return (
    <div className="rd-hc-answer">
      {rank ? <span className="rd-hc-rank" aria-hidden="true">1</span> : null}
      <Glyph name={icon} size={rank ? 14 : 16} stroke={icon === 'pin' ? 2 : 2.5} color="var(--alloy-gold)" />
      <span className="rd-hc-answer-name">Your Company</span>
      <span className="rd-hc-answer-trail">{trailing}</span>
    </div>
  );
}

function Skeleton({ width }: { width: string }) {
  return (
    <div className="rd-hc-skel" aria-hidden="true"><span /><span style={{ width }} /></div>
  );
}

export default function HeroCard({ children }: { children?: ReactNode }) {
  return (
    <div className="rd-hc">
      <div className="rd-hc-head">
        <div className="rd-hc-eyebrow">Growth partner for CAM companies · One per metro</div>
        <h2 className="rd-hc-h2">When a board in your city looks for a new management company, who do they find?</h2>
      </div>

      {/* Search story — three moments, same answer */}
      <div className="rd-hc-story">
        <div className="rd-hc-moments">
          <Moment icon="search" chipBg="#e3eef8" chipColor="#3f6f9e" label="Google search">
            <div className="rd-hc-pill">hoa management company near me</div>
            <div className="rd-hc-stack">
              <Answer icon="pin" trailing="4.9" rank />
              <Skeleton width="62%" />
              <Skeleton width="48%" />
            </div>
          </Moment>
          <Moment icon="sparkle" chipBg="#e1f0ec" chipColor="#2f7a6a" label="AI assistant">
            <div className="rd-hc-bubble">Who’s the best HOA management company in Austin?</div>
            <div className="rd-hc-stack">
              <Answer icon="sparkle" trailing="Top choice" />
              <div className="rd-hc-sentence">A top choice, known for local experience and strong reviews.</div>
            </div>
          </Moment>
          <Moment icon="users" chipBg="#f9e1ea" chipColor="var(--alloy-pink)" label="Referral network">
            <div className="rd-hc-request">
              <span className="rd-hc-request-title">Oak Hollow HOA</span>
              <span className="rd-hc-request-meta">212 homes · Seeking new management</span>
            </div>
            <Answer icon="check" trailing="Matched" />
          </Moment>
        </div>
      </div>

      <p className="rd-hc-payoff">We make sure it’s you, and only you, in your market.</p>

      <div className="rd-hc-rule" />

      {/* Availability check (island) + guarantee */}
      <div className="rd-hc-bottom">
        {children}
        <div className="rd-hc-guarantee">
          <div className="rd-hc-guarantee-side">
            <Glyph name="check" size={26} stroke={3} />
            <span className="rd-hc-guarantee-mo">24 MO</span>
          </div>
          <div className="rd-hc-guarantee-body">
            <span className="rd-hc-guarantee-title">Pays for itself. Guaranteed.</span>
            <span className="rd-hc-guarantee-text">If new business doesn’t cover our fee within 24 months, we refund the difference.</span>
            <a href="/faq#guarantee" className="rd-hc-guarantee-link" data-dialog="guarantee-terms">See guarantee terms</a>
          </div>
        </div>
      </div>

      {/* Guarantee terms — native <dialog>, opened by src/lib/dialog.ts (no-JS fallback: /faq#guarantee) */}
      <dialog id="guarantee-terms" className="rd-dialog" aria-labelledby="guarantee-terms-title">
        <div className="rd-dialog-panel">
          <button type="button" className="rd-dialog-close" data-dialog-close aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
          </button>
          <div className="rd-dialog-eyebrow">The guarantee</div>
          <h3 id="guarantee-terms-title" className="rd-dialog-title">Pays for itself. Guaranteed.</h3>
          <p className="rd-dialog-lead">If the new business Alloy brings in doesn’t cover our fee within 24 months of starting, we refund the difference.</p>
          <div className="rd-dialog-terms">
            <div className="rd-dialog-terms-head">The one condition</div>
            <p>The guarantee holds when your firm runs the programs we put in place — the review requests, proposals, follow-ups, and board touchpoints that make the system work. We build it; you run it with us. That’s how we can make the promise.</p>
            <p>How new business and the fee are measured is spelled out in your engagement agreement before you sign, so there’s nothing to interpret later.</p>
          </div>
          <div className="rd-dialog-actions">
            <a href="/get-started" className="rd-hc-btn">Claim your market</a>
            <button type="button" className="rd-hc-again" data-dialog-close>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
