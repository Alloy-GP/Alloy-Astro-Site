// src/components/modules/MetroCheck.tsx — the metro card's header band + combined field (client:load island inside HeroMap).
// Free-text metro or ZIP → /api/metro?q= → Open / Claimed. The result replaces the field in place; "Claim it" /
// "Join the waitlist" carry the metro to /contact. The LIVE pill in the header swaps to the status.
import { useEffect, useRef, useState } from 'react';
import { Glyph } from './HeroMap';

type Phase = 'idle' | 'loading' | 'result' | 'error';
interface Result { name: string; claimed: boolean; near?: string; zip?: string }

export default function MetroCheck() {
  const [q, setQ] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; }, []);

  const check = async () => {
    const query = q.trim();
    if (!query) { inputRef.current?.focus(); return; }
    if (phase === 'loading') return;
    setPhase('loading'); setError('');
    try {
      const r = await fetch(`/api/metro?q=${encodeURIComponent(query)}`);
      const d = (await r.json()) as Result & { error?: string };
      if (!alive.current) return;
      if (r.ok) { setResult(d); setPhase('result'); }
      else { setError(d.error ?? 'We couldn’t place that. Try a ZIP code.'); setPhase('error'); }
    } catch {
      if (!alive.current) return;
      setError('We couldn’t reach the lookup. Try again in a moment.'); setPhase('error');
    }
  };
  const reset = () => { setPhase('idle'); setResult(null); setError(''); setQ(''); window.setTimeout(() => inputRef.current?.focus(), 0); };

  const r = phase === 'result' ? result : null;
  const live = phase === 'loading' ? 'Checking…' : r ? (r.claimed ? 'Claimed' : 'Open') : 'Live';
  const micro = phase === 'error' ? error
    : r ? (r.claimed ? `A CAM firm already holds ${r.near ?? r.name}. Join the waitlist and we’ll tell you if it opens.` : `${r.name} is open. Thirty minutes locks it for your firm.`)
    : '';
  const to = (intent?: string) => `/contact?metro=${encodeURIComponent(r?.name ?? q.trim())}${intent ? `&intent=${intent}` : ''}`;

  return (
    <>
      <div className="rd-mc-head">
        <div className="rd-mc-title">Is your metro still open?</div>
        <div className={`rd-mc-live${r?.claimed ? ' rd-mc-live--claimed' : ''}`} aria-live="polite">
          <span className="rd-mc-live-dot" aria-hidden="true" />
          {live}
        </div>
      </div>
      <div className="rd-mc-body">
        {r ? (
          <div className="rd-mc-result" role="status">
            <div className="rd-mc-result-main">
              <span className="rd-mc-result-dot" style={{ background: r.claimed ? 'var(--alloy-pink)' : 'var(--live)' }} />
              <span className="rd-mc-result-name">{r.name}</span>
              <span className="rd-mc-result-status">· {r.claimed ? 'claimed' : 'open'}</span>
            </div>
            <div className="rd-mc-result-actions">
              {r.claimed ? (
                <a href={to('waitlist')} className="rd-mc-btn rd-mc-btn--dark">Join the waitlist</a>
              ) : (
                <a href={to()} className="rd-mc-btn"><Glyph name="check" size={12} stroke={3} /> Claim it</a>
              )}
              <button type="button" className="rd-mc-again" onClick={reset}>Check another</button>
            </div>
          </div>
        ) : (
          <form className="rd-mc-field" onSubmit={(e) => { e.preventDefault(); void check(); }}>
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
              aria-invalid={phase === 'error' || undefined}
            />
            <button type="submit" className="rd-mc-check" disabled={phase === 'loading'}>{phase === 'loading' ? 'Checking…' : 'Check'}</button>
          </form>
        )}
        {micro ? <div className={`rd-mc-micro${phase === 'error' ? ' rd-mc-micro--error' : ''}`} aria-live="polite">{micro}</div> : <div className="rd-sr-only" aria-live="polite" />}
      </div>
    </>
  );
}
