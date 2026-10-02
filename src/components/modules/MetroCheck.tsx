// src/components/modules/MetroCheck.tsx — the metro card's header band + 58px state row (client:load island inside HeroMap).
// Hero 7a v2 §1: Idle (field + Check) → Checking (spinner, pill CHECKING) → Result Open (Get my report — client 2026-10-02, was "Reserve it"; no glyph so the metro name keeps its room) / Claimed (Join waitlist),
// each a 58px row so the card never changes height. Unknown input → Open with the typed string title-cased, map stays.
// Dispatches `alloy:metro` for src/lib/hero-map.ts (map zoom/re-centre + pin label).
import { useEffect, useRef, useState } from 'react';

type Phase = 'idle' | 'checking' | 'result';
interface Result { name: string; claimed: boolean; lat?: number; lng?: number; near?: string }

const titleCase = (s: string) => s.replace(/\S+/g, (w) => (/^[A-Z]{2}$/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()));
const emit = (detail: { phase: Phase | 'checking'; name?: string; lat?: number; lng?: number }) => window.dispatchEvent(new CustomEvent('alloy:metro', { detail }));

export default function MetroCheck() {
  const [q, setQ] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [result, setResult] = useState<Result | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; }, []);

  const check = async () => {
    const query = q.trim();
    if (!query) { inputRef.current?.focus(); return; }
    if (phase === 'checking') return;
    setPhase('checking'); emit({ phase: 'checking' });
    const started = performance.now();
    let next: Result;
    try {
      const r = await fetch(`/api/metro?q=${encodeURIComponent(query)}`);
      const d = (await r.json()) as Result & { error?: string };
      next = r.ok ? d : { name: titleCase(query), claimed: false };   // unknown → Open, keep the map (spec)
    } catch {
      next = { name: titleCase(query), claimed: false };
    }
    const wait = Math.max(0, 900 - (performance.now() - started));   // the spec's ~900ms "Checking" beat
    window.setTimeout(() => {
      if (!alive.current) return;
      setResult(next); setPhase('result');
      emit({ phase: 'result', name: next.name, ...(typeof next.lat === 'number' && typeof next.lng === 'number' ? { lat: next.lat, lng: next.lng } : {}) });
    }, wait);
  };
  const reset = () => { setPhase('idle'); setResult(null); setQ(''); emit({ phase: 'idle' }); window.setTimeout(() => inputRef.current?.focus(), 0); };

  const r = phase === 'result' ? result : null;
  const pillState = phase === 'checking' ? 'checking' : r ? (r.claimed ? 'claimed' : 'open') : 'live';
  const pillText = { live: 'Live', checking: 'Checking', open: 'Open', claimed: 'Claimed' }[pillState];
  const to = (intent: 'claim' | 'waitlist') => `/contact?metro=${encodeURIComponent(r?.name ?? q.trim())}&intent=${intent}`;

  return (
    <>
      <div className="rd-mc-head">
        <div className="rd-mc-title">Is your metro still open?</div>
        <div className={`rd-mc-live rd-mc-live--${pillState}`} aria-live="polite">
          <span className="rd-mc-live-dot" aria-hidden="true" />
          {pillText}
        </div>
      </div>
      <div className="rd-mc-body">
        {r ? (
          <div className={`rd-mc-row rd-mc-result rd-mc-result--${r.claimed ? 'claimed' : 'open'}`} role="status" aria-live="polite">
            <span className="rd-mc-result-dot" aria-hidden="true" />
            <span className="rd-mc-result-stack">
              <span className="rd-mc-result-name">{r.name}</span>
              <span className="rd-mc-result-word">{r.claimed ? 'Claimed' : 'Open'}</span>
            </span>
            {r.claimed ? (
              <a href={to('waitlist')} className="rd-mc-btn rd-mc-btn--dark">Join waitlist</a>
            ) : (
              <a href={to('claim')} className="rd-mc-btn rd-mc-btn--go">Get my report</a>
            )}
            <button type="button" className="rd-mc-reset" onClick={reset} aria-label="Check another metro">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></svg>
            </button>
          </div>
        ) : (
          <form className="rd-mc-row rd-mc-field" onSubmit={(e) => { e.preventDefault(); void check(); }}>
            <label htmlFor="hero-metro" className="rd-sr-only">Your metro or ZIP code</label>
            <input
              id="hero-metro"
              ref={inputRef}
              className="rd-mc-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter your metro"
              autoComplete="address-level2"
              maxLength={80}
              disabled={phase === 'checking'}
            />
            <button type="submit" className="rd-mc-check" disabled={phase === 'checking'} aria-busy={phase === 'checking' || undefined}>
              {phase === 'checking' ? <><span className="rd-mc-spinner" aria-hidden="true" />Checking</> : 'Check'}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
