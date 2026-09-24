// src/components/modules/RiseCaseStudy.tsx
// Apex CMG case study card (full + compact). Ported from modules.jsx.
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import AnimatedNumber from '~/components/AnimatedNumber';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

export interface RiseCaseStudyProps { compact?: boolean; }

export default function RiseCaseStudy({ compact = false }: RiseCaseStudyProps) {
  if (compact) {
    return (
      <div className="case-study-card" style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(56,28,79,0.14)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '32px 32px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 12 }}>
            <Eyebrow noLine>Long-term build</Eyebrow>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: PINK, padding: '5px 10px', border: `1px solid ${PINK}`, borderRadius: 999, whiteSpace: 'nowrap' }}>3 years</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, lineHeight: 1.2, letterSpacing: '-0.02em', color: PURPLE, margin: '0 0 16px' }}>
            "We went from chasing RFPs to having boards reach out directly."
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, border: '2px solid var(--alloy-pink)', flexShrink: 0, background: 'var(--alloy-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: '#fff', letterSpacing: '0.04em' }}>MG</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 13 }}>Marcus G.</div>
              <div style={{ fontSize: 11.5, color: '#888' }}>CEO, Apex CMG*</div>
            </div>
          </div>
          <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>
            BoardSuite Accelerate. Full-cycle system: local SEO + authority content + proposal redesign + Groundwork BD.
          </p>
          <div style={{ marginTop: 'auto' }}>
            <Button variant="secondary" arrow href="/results/apex-cmg" size="sm">Read the full story</Button>
          </div>
        </div>
        <div style={{ background: 'linear-gradient(160deg, #381c4f 0%, #290d41 100%)', color: '#fff', padding: '26px 32px 26px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.7 }}>Indexed growth</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 10.5, letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 600, opacity: 0.55 }}>2016 → 2025</div>
            </div>
            <RiseGrowthChart />
            <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '18px 0 16px' }}></div>
            <div className="case-study-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <RiseStatCompact color={PINK} label="Lead intake" value={<AnimatedNumber value={535} prefix="+" suffix="%" />} />
              <RiseStatCompact color={YELLOW} label="Proposals" value={<AnimatedNumber value={3} suffix="×" />} />
              <RiseStatCompact color={GREEN} label="YoY opps" value={<AnimatedNumber value={1580} prefix="+" suffix="%" />} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="case-study-card" style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(56,28,79,0.14)', border: '1px solid var(--border-subtle)' }}>
      <div className="case-study-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr' }}>
        <div className="case-study-panel-left" style={{ padding: '44px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Eyebrow noLine>Signature client · Apex CMG*</Eyebrow>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.02em', color: PURPLE, margin: '14px 0 18px' }}>
            "We went from chasing RFPs to having boards reach out directly."
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{ width: 56, height: 56, borderRadius: 999, border: '2px solid var(--alloy-pink)', flexShrink: 0, background: 'var(--alloy-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, color: '#fff', letterSpacing: '0.04em' }}>MG</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 14 }}>Marcus G.</div>
              <div style={{ fontSize: 12, color: '#888' }}>CEO, Apex CMG*</div>
            </div>
          </div>
          <p style={{ color: '#555', fontSize: 15, lineHeight: 1.65, margin: '0 0 18px', maxWidth: '48ch' }}>
            3-year engagement. BoardSuite Accelerate. Full-cycle system from local SEO and authority content through proposal redesign and Groundwork BD.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { c: PINK, t: 'Technical SEO + GEO/AI-search rebuild' },
              { c: YELLOW, t: '14 pillar articles + trade press authority' },
              { c: GREEN, t: 'Proposal redesign + Groundwork BD' },
              { c: BLUE, t: 'Onboarding + board education curriculum' },
            ].map((b) => (
              <li key={b.t} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13.5, color: '#444' }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: b.c, flexShrink: 0 }}></span>
                <span>{b.t}</span>
              </li>
            ))}
          </ul>
          <div>
            <Button variant="secondary" arrow href="/results/apex-cmg">Read the full story</Button>
          </div>
        </div>
        <div className="case-study-panel-right" style={{ background: 'linear-gradient(160deg, #381c4f 0%, #290d41 100%)', color: '#fff', padding: '36px 40px 32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.7 }}>3-year trajectory</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 600, opacity: 0.55 }}>2023 → 2025</div>
            </div>
            <RiseGrowthChart />
            <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '24px 0 22px' }}></div>
            <div className="case-study-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18 }}>
              <RiseStatCompact color={PINK} label="Lead intake" value={<AnimatedNumber value={535} prefix="+" suffix="%" />} />
              <RiseStatCompact color={YELLOW} label="Proposals" value={<AnimatedNumber value={3} suffix="×" />} />
              <RiseStatCompact color={GREEN} label="YoY opportunities" value={<AnimatedNumber value={1580} prefix="+" suffix="%" />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Series { color: string; label: string; points: number[]; }

export function RiseGrowthChart() {
  const W = 520, H = 230;
  const padL = 42, padR = 14, padT = 18, padB = 30;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const series: Series[] = [
    { color: '#d9356e', label: 'Lead intake', points: [100, 128, 158, 192, 178, 215, 248, 340, 490, 635] },
    { color: '#f5d880', label: 'Proposals', points: [100, 118, 138, 162, 152, 178, 198, 225, 265, 300] },
    { color: '#aed7d0', label: 'YoY opps', points: [100, 132, 168, 215, 195, 248, 285, 520, 980, 1680] },
  ];

  const N = series[0].points.length;
  const ALLOY_START_I = 7;
  const yMax = 1750;
  const x = (i: number) => padL + (i / (N - 1)) * innerW;
  const y = (v: number) => padT + innerH - (v / yMax) * innerH;

  const yearTicks = [
    { i: 0, label: '2016' },
    { i: 2, label: '2018' },
    { i: 4, label: '2020' },
    { i: 6, label: '2022' },
    { i: 8, label: '2024' },
    { i: 9, label: '' },
  ];
  const gridYs = [100, 500, 1000, 1500];

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const buildPath = (pts: number[]) => pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(2)} ${y(v).toFixed(2)}`).join(' ');

  const alloyX = x(ALLOY_START_I);
  const alloyTagX = x(ALLOY_START_I - 1.1);

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }} aria-label="Apex CMG growth from 2016 to 2025, with Alloy engagement starting 2023">
        <rect x={padL} y={padT} width={alloyX - padL} height={innerH} fill="rgba(255,255,255,0.025)" />
        {gridYs.map((g) => (
          <g key={g}>
            <line x1={padL} y1={y(g)} x2={W - padR} y2={y(g)} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <text x={padL - 6} y={y(g) + 3} textAnchor="end" fontFamily="var(--font-display)" fontSize="9" fill="rgba(255,255,255,0.42)" fontWeight="600">{g === 100 ? '0%' : `+${g - 100}%`}</text>
          </g>
        ))}
        {yearTicks.map((t) => (
          <g key={t.i}>
            <line x1={x(t.i)} y1={padT + innerH} x2={x(t.i)} y2={padT + innerH + 4} stroke="rgba(255,255,255,0.30)" strokeWidth="1" />
            {t.label ? (
              <text x={x(t.i)} y={padT + innerH + 16} textAnchor={t.i === 0 ? 'start' : t.i === N - 1 ? 'end' : 'middle'} fontFamily="var(--font-display)" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.65)" letterSpacing="0.06em">{t.label}</text>
            ) : null}
          </g>
        ))}
        {series.map((s) => (
          <g key={s.label}>
            <path d={buildPath(s.points)} fill="none" stroke={s.color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - progress} style={{ filter: `drop-shadow(0 1px 4px ${s.color}33)` }} />
            <circle cx={x(N - 1)} cy={y(s.points[N - 1])} r={progress > 0.95 ? 4 : 0} fill={s.color} stroke="#290d41" strokeWidth="2" />
          </g>
        ))}
        <line x1={alloyTagX} y1={padT + 2} x2={alloyTagX} y2={padT + innerH} stroke="#f5d880" strokeWidth="1.5" strokeDasharray="3 3" opacity={progress > 0.15 ? 1 : 0} style={{ transition: 'opacity 300ms ease' }} />
        <g transform={`translate(${alloyTagX + 6}, ${padT + 2})`} opacity={progress > 0.25 ? 1 : 0} style={{ transition: 'opacity 400ms ease 200ms' }}>
          <rect x="0" y="0" width="44" height="20" rx="4" fill="#f5d880" />
          <text x="22" y="13.5" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="10" fill="#3a2a04" letterSpacing="0.08em">ALLOY</text>
        </g>
        <g transform={`translate(${x(0) + 6}, ${padT + 2})`} opacity={progress > 0.05 ? 1 : 0} style={{ transition: 'opacity 300ms ease' }}>
          <rect x="0" y="0" width="86" height="20" rx="4" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.20)" />
          <text x="9" y="13.5" fontFamily="var(--font-display)" fontWeight="700" fontSize="10" fill="rgba(255,255,255,0.85)" letterSpacing="0.06em">Apex CMG FOUNDED</text>
        </g>
        {hoverIdx !== null && (
          <line x1={x(hoverIdx)} y1={padT} x2={x(hoverIdx)} y2={padT + innerH} stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="2 2" pointerEvents="none" />
        )}
        {series.map((s) => hoverIdx !== null && (
          <circle key={`hpt-${s.label}`} cx={x(hoverIdx)} cy={y(s.points[hoverIdx])} r={4} fill={s.color} stroke="#290d41" strokeWidth="2" pointerEvents="none" />
        ))}
        {series[0].points.map((_, i) => {
          const left = i === 0 ? x(0) : (x(i - 1) + x(i)) / 2;
          const right = i === N - 1 ? x(N - 1) : (x(i) + x(i + 1)) / 2;
          return (
            <rect key={`hit-${i}`} x={left} y={padT} width={Math.max(1, right - left)} height={innerH} fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoverIdx(i)} onMouseLeave={() => setHoverIdx(null)}
              onFocus={() => setHoverIdx(i)} onBlur={() => setHoverIdx(null)} tabIndex={0} />
          );
        })}
      </svg>
      <RiseChartReadout series={series} hoverIdx={hoverIdx} N={N} />
    </div>
  );
}

function RiseChartReadout({ series, hoverIdx, N }: { series: Series[]; hoverIdx: number | null; N: number }) {
  const yearLabels = ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];
  const idx = hoverIdx ?? N - 1;
  const isLive = hoverIdx !== null;
  return (
    <div className="cs-tooltip-panel" style={{
      marginTop: 8, padding: '8px 12px',
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 8, display: 'flex', alignItems: 'center', gap: 14, minHeight: 36,
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 10.5, letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 700, color: isLive ? '#fff' : 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>
        {isLive ? `${yearLabels[idx]} · indexed` : 'Hover the chart'}
      </div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', flex: 1 }}>
        {series.map((s) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5 }}>
            <span style={{ width: 8, height: 8, background: s.color, borderRadius: 2, display: 'inline-block' }}></span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{s.label}</span>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{s.points[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RiseStatCompact({ color, label, value }: { color: string; label: string; value: ReactNode }) {
  return (
    <div style={{ borderTop: `2px solid ${color}`, paddingTop: 10 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: color, marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, lineHeight: 1, letterSpacing: '-0.02em' }}>{value}</div>
    </div>
  );
}
