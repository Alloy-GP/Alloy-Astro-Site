// src/components/modules/NetworkLeadsChart.tsx
// Homepage "Network leads" band — column chart card (client:visible island).
// 3 (your own paid ads) vs 10 (MatchHOA network) board leads per month, illustrative.
// Bars grow and numbers count up once on scroll-in; ⓘ icons open tooltips on hover/focus.
import { useEffect, useRef, useState } from 'react';

const TIP_A = 'Average board leads a CAM firm gets running its own Google Ads with an active budget. Paid for, one click at a time.';
const TIP_B = 'Boards we bring in through MatchHOA and hand to you at no cost — included as an Alloy partner. Nobody else in your market can buy them.';

function useCount(to: number, on: boolean, ms = 1100): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setV(to); return; }
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / ms); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, to, ms]);
  return v;
}

function Info({ text, id }: { text: string; id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="rd-tip-wrap" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className="rd-tip-btn" aria-describedby={open ? id : undefined} aria-label="More information" onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onClick={() => setOpen((o) => !o)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
      </button>
      {open && <span role="tooltip" id={id} className="rd-tip">{text}</span>}
    </span>
  );
}

export default function NetworkLeadsChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const n3 = useCount(3, on);
  const n10 = useCount(10, on);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setOn(true); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setOn(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`rd-nc${on ? ' is-on' : ''}`}>
      <div className="rd-nc-head">
        <div className="rd-label rd-label--12 rd-label--yellow" style={{ letterSpacing: '.14em' }}>Board leads per month, same metro</div>
        <div className="rd-tiny rd-tiny--12 rd-w-500" style={{ color: '#fff', opacity: .6, fontSize: 11 }}>Illustrative</div>
      </div>
      <div className="rd-nc-chart" role="img" aria-label="Board leads per month: about 3 from your own paid ads versus 10 through the MatchHOA network">
        <div className="rd-nc-col">
          <div className="rd-nc-num" style={{ opacity: .85 }}>{on ? n3 : 3}</div>
          <div className="rd-nc-bar rd-nc-bar--a" style={{ ['--h' as string]: '30%' } as React.CSSProperties} />
        </div>
        <div className="rd-nc-col">
          <div className="rd-nc-num" style={{ color: 'var(--alloy-green)' }}>{on ? n10 : 10}</div>
          <div className="rd-nc-bar rd-nc-bar--b" style={{ ['--h' as string]: '100%' } as React.CSSProperties} />
        </div>
      </div>
      <div className="rd-nc-labels">
        <div className="rd-nc-label">
          <div className="rd-nc-label-head" style={{ opacity: .85 }}><span>Your own paid ads</span><Info id="tip-paid" text={TIP_A} /></div>
          <div className="rd-nc-label-sub">You pay per click.</div>
        </div>
        <div className="rd-nc-label">
          <div className="rd-nc-label-head" style={{ color: 'var(--alloy-green)' }}><span>MatchHOA network</span><Info id="tip-network" text={TIP_B} /></div>
          <div className="rd-nc-label-sub rd-nc-label-sub--strong">Included. Yours alone.</div>
        </div>
      </div>
    </div>
  );
}
