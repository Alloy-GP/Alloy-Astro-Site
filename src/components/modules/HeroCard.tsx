// src/components/modules/HeroCard.tsx
// Homepage hero — the purple "outcomes card" (client:load island).
//   1. header row  2. two-page outcome carousel (auto-rotates, pauses on hover)
//   3. metro check: ZIP → /api/metro → Open / Claimed over a live map strip.
// Spec: docs/redesign-handoff-homepage README §1. Tile numbers are illustrative placeholders.
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { CLAIMED_METROS, OPEN_METROS } from '~/data/metros';

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const US_VIEW = { lat: 37.8, lng: -96.5, z: 3 };
const METRO_ZOOM = 10;
const THINK_MS = 1600;
const ROTATE_MS = 4200;
const ADS = [3, 5, 4, 8, 9, 12, 14, 13, 18, 21, 24, 28];
const AI_ENGINES = ['ChatGPT', 'Gemini', 'Perplexity', 'Google'];

type Phase = 'idle' | 'loading' | 'result' | 'error';
interface Metro { name: string; lat: number; lng: number; claimed: boolean; near?: string }
interface View { lat: number; lng: number; z: number }

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ── Web-mercator helpers ─────────────────────────────────────────────── */
function toXY(lat: number, lng: number, z: number): [number, number] {
  const n = Math.pow(2, z);
  const r = (lat * Math.PI) / 180;
  return [((lng + 180) / 360) * n, ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n];
}
function project(lat: number, lng: number, view: View) {
  const [cx, cy] = toXY(view.lat, view.lng, view.z);
  const [x, y] = toXY(lat, lng, view.z);
  return { left: `calc(50% + ${(x - cx) * 256}px)`, top: `calc(50% + ${(y - cy) * 256}px)` };
}
function tiles(view: View, cols: number, rows: number) {
  const n = Math.pow(2, view.z);
  const [x, y] = toXY(view.lat, view.lng, view.z);
  const tx = Math.floor(x), ty = Math.floor(y);
  const out: Array<{ key: string; src: string; style: CSSProperties }> = [];
  for (let dy = -rows; dy <= rows; dy++) {
    for (let dx = -cols; dx <= cols; dx++) {
      const X = tx + dx, Y = ty + dy;
      if (Y < 0 || Y >= n) continue;
      out.push({
        key: `${view.z}-${X}-${Y}`,
        src: TILE_URL.replace('{z}', String(view.z)).replace('{x}', String(((X % n) + n) % n)).replace('{y}', String(Y)),
        style: { left: `calc(50% + ${(X - x) * 256}px)`, top: `calc(50% + ${(Y - y) * 256}px)` },
      });
    }
  }
  return out;
}

/* ── Count-up hook (cubic ease-out) ───────────────────────────────────── */
function useCount(to: number, on: boolean, ms: number): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) { setV(0); return; }
    if (reduced()) { setV(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, to, ms]);
  return v;
}

/* ── Outcome tiles ────────────────────────────────────────────────────── */
function Tile({ color, eyebrow, number, label, children }: { color: string; eyebrow: string; number: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="rd-oc-tile">
      <div className="rd-row rd-row--between"><span className="rd-oc-tile-eyebrow" style={{ color }}>{eyebrow}</span></div>
      <div className="rd-oc-tile-num"><b>{number}</b><span>{label}</span></div>
      <div className="rd-oc-tile-chart">{children}</div>
    </div>
  );
}

function PageA({ on }: { on: boolean }) {
  const ads = useCount(28, on, 1300);
  const drop = useCount(6, on, 1400);
  return (
    <div className={`rd-oc-page${on ? ' is-on' : ''}`}>
      <Tile color="var(--alloy-pink)" eyebrow="Paid leads" number={ads} label="inquiries">
        <svg viewBox="0 0 120 44" width="100%" height="56" preserveAspectRatio="none" aria-hidden="true">
          {ADS.map((v, i) => (
            <rect key={i} className="rd-oc-bar" x={i * 10 + 1} y={44 - (v / 28) * 44} width={7} height={(v / 28) * 44} rx={1.5} fill={i === ADS.length - 1 ? '#fff' : '#d9356e'} style={{ animationDelay: `${i * 45}ms` }} />
          ))}
        </svg>
      </Tile>
      <Tile color="var(--alloy-blue)" eyebrow="Organic + local" number={`#${on ? Math.max(3, 9 - drop) : 9}`} label="on the map">
        <svg viewBox="0 0 120 44" width="100%" height="56" preserveAspectRatio="none" style={{ overflow: 'visible' }} aria-hidden="true">
          <polyline className="rd-oc-line" points="0,40 20,38 40,30 60,26 80,16 100,10 120,4" fill="none" stroke="#a1c8e7" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" pathLength={1} />
          <circle className="rd-oc-dot-end" cx={120} cy={4} r={4} fill="#fff" />
        </svg>
      </Tile>
    </div>
  );
}

function PageB({ on }: { on: boolean }) {
  const ai = useCount(4, on, 900);
  const mh = useCount(10, on, 1100);
  return (
    <div className={`rd-oc-page${on ? ' is-on' : ''}`}>
      <Tile color="var(--alloy-yellow)" eyebrow="AI exposure" number={`${ai}/4`} label="AI engines">
        <div className="rd-oc-pills">
          {AI_ENGINES.map((t, i) => <span key={t} className="rd-oc-pill" style={{ animationDelay: `${300 + i * 200}ms` }}>{t}</span>)}
        </div>
      </Tile>
      <Tile color="var(--alloy-green)" eyebrow="Network leads" number={mh} label="boards">
        <div className="rd-oc-hbars">
          <div className="rd-oc-hbar"><span className="rd-oc-hbar-label" style={{ color: 'var(--alloy-green)' }}>MHOA</span><div className="rd-oc-hbar-track"><div className="rd-oc-hbar-fill rd-oc-hbar-fill--slow" style={{ width: '100%', background: 'var(--alloy-green)' }} /></div></div>
          <div className="rd-oc-hbar"><span className="rd-oc-hbar-label" style={{ opacity: .6 }}>GA</span><div className="rd-oc-hbar-track"><div className="rd-oc-hbar-fill" style={{ width: '30%', background: 'rgba(255,255,255,.35)' }} /></div></div>
        </div>
      </Tile>
    </div>
  );
}

/* ── Metro check ──────────────────────────────────────────────────────── */
function MetroCheck() {
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
    setPhase('loading'); setError('');
    const started = performance.now();
    let next: Metro | null = null; let err = '';
    try {
      const r = await fetch(`/api/metro?zip=${encodeURIComponent(z)}`);
      const d = await r.json();
      if (r.ok) next = d as Metro; else err = d.error ?? 'We couldn’t place that ZIP.';
    } catch { err = 'We couldn’t reach the lookup. Try again in a moment.'; }
    const wait = Math.max(0, THINK_MS - (performance.now() - started));
    timer.current = window.setTimeout(() => {
      if (next) { setMetro(next); setPhase('result'); } else { setError(err); setPhase('error'); }
    }, wait);
  };
  const reset = () => { setPhase('idle'); setZip(''); setMetro(null); setError(''); inputRef.current?.focus(); };

  const showMetro = phase === 'result' && metro;
  const view: View = showMetro ? { lat: metro.lat, lng: metro.lng, z: METRO_ZOOM } : US_VIEW;
  const statusColor = metro?.claimed ? 'var(--alloy-pink)' : 'var(--success)';
  const label = phase === 'idle' ? 'Live availability' : phase === 'loading' ? 'Checking…' : phase === 'error' ? 'Not found' : metro?.claimed ? 'Claimed' : 'Open';

  return (
    <div className="rd-mc">
      <div className="rd-mc-head">
        <div className="rd-mc-title">Is your metro still open?</div>
        <div className="rd-mc-status" aria-live="polite">{label}</div>
      </div>
      <div className="rd-mc-map" aria-busy={phase === 'loading'}>
        <div className={`rd-mc-tiles${phase === 'loading' ? ' is-loading' : ''}`} aria-hidden="true">
          {tiles(view, 3, 1).map((t) => <img key={t.key} src={t.src} alt="" style={t.style} loading="lazy" decoding="async" />)}
        </div>
        <div className="rd-mc-shade" />
        <div className="rd-mc-vignette" />
        {!showMetro && (
          <>
            {CLAIMED_METROS.map((m) => <span key={m.label} className="rd-mc-metro rd-mc-metro--claimed" title={m.label} style={project(m.lat, m.lng, view)} />)}
            {OPEN_METROS.map((m) => <span key={m.label} className="rd-mc-metro rd-mc-metro--open" title={m.label} style={project(m.lat, m.lng, view)} />)}
          </>
        )}
        {phase === 'loading' && <div className="rd-mc-center"><div className="rd-mc-pulse" /></div>}
        {showMetro && (
          <>
            <div className="rd-mc-pin" style={{ background: statusColor }} />
            <div className="rd-mc-ring" style={{ color: statusColor }} />
            <div className="rd-mc-pill" role="status">
              <div className="rd-mc-pill-main">
                <span className="rd-dot rd-dot--8" style={{ background: statusColor }} />
                <span className="rd-mc-pill-name">{metro.name}</span>
                <span className="rd-mc-pill-status">{metro.claimed ? '· claimed' : '· open'}</span>
              </div>
              <div className="rd-mc-pill-actions">
                {metro.claimed ? (
                  <a href={`/get-started?intent=waitlist&zip=${zip}`} className="rd-mc-btn rd-mc-btn--wait">Waitlist</a>
                ) : (
                  <a href={`/get-started?zip=${zip}`} className="rd-mc-btn rd-mc-btn--claim">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    Claim it
                  </a>
                )}
                <button type="button" className="rd-mc-close" onClick={reset} aria-label="Check another ZIP">✕</button>
              </div>
            </div>
          </>
        )}
        {phase === 'error' && (
          <div className="rd-mc-pill" role="alert">
            <div className="rd-mc-pill-main"><span className="rd-mc-pill-status" style={{ whiteSpace: 'normal' }}>{error}</span></div>
            <div className="rd-mc-pill-actions"><button type="button" className="rd-mc-close" onClick={reset} aria-label="Try another ZIP">✕</button></div>
          </div>
        )}
        <div className="rd-mc-attr"><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a></div>
      </div>
      <form className="rd-mc-form" onSubmit={(e) => { e.preventDefault(); void check(); }}>
        <input ref={inputRef} className="rd-mc-input" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))} placeholder="Enter your ZIP code" inputMode="numeric" maxLength={5} aria-label="ZIP code" autoComplete="postal-code" />
        <button type="submit" className="rd-mc-check" disabled={phase === 'loading'}>Check</button>
      </form>
    </div>
  );
}

/* ── Card ─────────────────────────────────────────────────────────────── */
export default function HeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setRevealed(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setRevealed(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!revealed || paused) return;
    const id = window.setInterval(() => setPage((p) => (p + 1) % 2), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [revealed, paused]);

  return (
    <div className="rd-oc" ref={cardRef}>
      <div className="rd-row rd-row--between">
        <div className="rd-label rd-label--12 rd-label--yellow" style={{ letterSpacing: '.14em' }}>Your metro. Your growth.</div>
        <div className="rd-oc-meta">One partner per market</div>
      </div>
      <div className="rd-oc-dash" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {page === 0 ? <PageA key="a" on={revealed} /> : <PageB key="b" on={revealed} />}
        <div className="rd-oc-dots" role="tablist" aria-label="Outcome pages">
          {[0, 1].map((i) => (
            <button key={i} type="button" role="tab" aria-selected={i === page} aria-label={i === 0 ? 'Paid and organic leads' : 'AI exposure and network leads'} className={`rd-oc-dot${i === page ? ' is-active' : ''}`} onClick={() => setPage(i)} />
          ))}
        </div>
      </div>
      <MetroCheck />
    </div>
  );
}
