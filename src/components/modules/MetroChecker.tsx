// src/components/modules/MetroChecker.tsx
// Homepage hero — "One firm per metro" availability checker (React island, client:load).
// ZIP → /api/metro → Available / Claimed over a live map tile layer.
// Tile provider is a single constant so it can be swapped for a keyed provider at launch.
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTR = { label: '© OpenStreetMap', href: 'https://www.openstreetmap.org/copyright' };
const US_VIEW = { lat: 38.5, lng: -97, z: 4 };
const METRO_ZOOM = 10;
const THINK_MS = 1600;

type Phase = 'idle' | 'loading' | 'result' | 'error';
interface Metro { name: string; lat: number; lng: number; claimed: boolean; near?: string }

function tiles(lat: number, lng: number, z: number, cols: number, rows: number) {
  const n = Math.pow(2, z);
  const x = ((lng + 180) / 360) * n;
  const r = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n;
  const tx = Math.floor(x), ty = Math.floor(y);
  const out: Array<{ key: string; src: string; style: CSSProperties }> = [];
  for (let dy = -rows; dy <= rows; dy++) {
    for (let dx = -cols; dx <= cols; dx++) {
      const X = tx + dx, Y = ty + dy;
      if (Y < 0 || Y >= n) continue;
      out.push({
        key: `${z}-${X}-${Y}`,
        src: TILE_URL.replace('{z}', String(z)).replace('{x}', String(((X % n) + n) % n)).replace('{y}', String(Y)),
        style: { left: `calc(50% + ${(X - x) * 256}px)`, top: `calc(50% + ${(Y - y) * 256}px)` },
      });
    }
  }
  return out;
}

export default function MetroChecker() {
  const [zip, setZip] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [metro, setMetro] = useState<Metro | null>(null);
  const [error, setError] = useState('');
  const timer = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const check = async () => {
    const z = zip.trim();
    if (z.length !== 5 || phase === 'loading') return;
    setPhase('loading');
    setError('');
    const started = performance.now();
    let next: Metro | null = null;
    let err = '';
    try {
      const r = await fetch(`/api/metro?zip=${encodeURIComponent(z)}`);
      const d = await r.json();
      if (r.ok) next = d as Metro;
      else err = d.error ?? 'We couldn’t place that ZIP.';
    } catch {
      err = 'We couldn’t reach the lookup. Try again in a moment.';
    }
    const wait = Math.max(0, THINK_MS - (performance.now() - started));
    timer.current = window.setTimeout(() => {
      if (next) { setMetro(next); setPhase('result'); }
      else { setError(err); setPhase('error'); }
    }, wait);
  };

  const reset = () => { setPhase('idle'); setZip(''); setMetro(null); setError(''); inputRef.current?.focus(); };

  const view = metro && (phase === 'result' || phase === 'loading') ? { lat: metro.lat, lng: metro.lng, z: METRO_ZOOM } : US_VIEW;
  const tileSet = tiles(view.lat, view.lng, view.z, 2, 1);
  const label = phase === 'idle' ? 'Live availability' : phase === 'loading' ? 'Checking…' : phase === 'error' ? 'Not found' : metro?.claimed ? 'Claimed' : 'Open';

  return (
    <div className="rd-panel-dark rd-metro">
      <div className="rd-row rd-row--between">
        <div className="rd-label rd-label--12 rd-label--yellow" style={{ letterSpacing: '.14em' }}>One firm per metro</div>
        <div className="rd-tiny rd-tiny--12 rd-w-500" style={{ color: '#fff', opacity: .7 }} aria-live="polite">{label}</div>
      </div>

      <div className="rd-map" aria-busy={phase === 'loading'}>
        <div className="rd-map-tiles" aria-hidden="true">
          {tileSet.map((t) => <img key={t.key} src={t.src} alt="" style={t.style} loading="lazy" decoding="async" />)}
        </div>
        <div className="rd-map-shade" />
        {phase === 'idle' && (
          <div className="rd-map-center"><div className="rd-map-idle">Enter your ZIP to see your metro.</div></div>
        )}
        {phase === 'loading' && (
          <div className="rd-map-center">
            <div className="rd-pulse-pin" />
            <div className="rd-map-checking">Checking {metro?.name ?? `ZIP ${zip}`}…</div>
          </div>
        )}
        {phase === 'error' && (
          <div className="rd-map-center"><div className="rd-map-idle" style={{ fontSize: 15 }}>{error}</div></div>
        )}
        {phase === 'result' && metro && (
          <>
            <div className="rd-map-pin" />
            <div className="rd-map-card">
              <div className="rd-stack" style={{ gap: 3 }}>
                <div className="rd-title-15">{metro.name}</div>
                <div className="rd-row" style={{ gap: 6, fontSize: 12, fontWeight: 500, color: 'var(--alloy-body-gray)' }}>
                  <span className="rd-dot rd-dot--8" style={{ background: metro.claimed ? 'var(--alloy-pink)' : 'var(--engine-retain)' }} />
                  {metro.claimed ? 'Claimed by another CAM firm' : 'Available — no Alloy partner here yet'}
                </div>
              </div>
              {metro.claimed ? (
                <div className="rd-row" style={{ gap: 8 }}>
                  <a href={`/get-started?intent=waitlist&zip=${zip}`} className="rd-btn rd-btn--dark rd-btn--xs rd-btn--inline">Waitlist</a>
                  <a href="/contact" className="rd-btn rd-btn--outline rd-btn--xs rd-btn--inline" style={{ padding: '10px 14px' }}>Talk to us</a>
                </div>
              ) : (
                <a href={`/get-started?zip=${zip}`} className="rd-btn rd-btn--xs rd-btn--inline">Claim it</a>
              )}
            </div>
          </>
        )}
        <div className="rd-map-attr"><a href={TILE_ATTR.href} target="_blank" rel="noopener">{TILE_ATTR.label}</a></div>
      </div>

      <div className="rd-metro-foot">
        <div className="rd-row rd-row--between" style={{ alignItems: 'baseline' }}>
          <div className="rd-title-15" style={{ color: '#fff' }}>Is your metro still open?</div>
          {(phase === 'result' || phase === 'error') && (
            <button type="button" onClick={reset} className="rd-tiny rd-tiny--12 rd-w-500" style={{ color: '#fff', opacity: .7, background: 'none', border: 0, cursor: 'pointer', padding: 0, font: 'inherit', fontSize: 12 }}>Check another →</button>
          )}
        </div>
        <form className="rd-row" style={{ gap: 10 }} onSubmit={(e) => { e.preventDefault(); void check(); }}>
          <input
            ref={inputRef}
            className="rd-metro-input"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
            placeholder="Your ZIP code"
            inputMode="numeric"
            maxLength={5}
            aria-label="ZIP code"
            autoComplete="postal-code"
          />
          <button type="submit" className="rd-btn rd-btn--sm rd-btn--inline" disabled={phase === 'loading'} style={{ padding: '14px 20px' }}>Check</button>
        </form>
      </div>
    </div>
  );
}
