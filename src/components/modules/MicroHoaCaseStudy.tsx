// src/components/modules/MosaicCmgCaseStudy.tsx
import { useState } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import AnimatedNumber from '~/components/AnimatedNumber';
import { RiseStatCompact } from './RiseCaseStudy';
import { PURPLE, PINK, YELLOW, GREEN, BLUE } from '~/lib/tokens';

interface Month {
  label: string;
  total: number;
  parts: { google: number; direct: number; bing: number; hoausa: number; other: number; unmatched: number };
}

const MONTHS: Month[] = [
  { label: "Sep '25", total: 18, parts: { google: 11, direct: 2, bing: 0, hoausa: 1, other: 1, unmatched: 3 } },
  { label: "Oct '25", total: 35, parts: { google: 19, direct: 4, bing: 1, hoausa: 3, other: 2, unmatched: 6 } },
  { label: "Nov '25", total: 52, parts: { google: 22, direct: 6, bing: 2, hoausa: 4, other: 4, unmatched: 14 } },
  { label: "Dec '25", total: 57, parts: { google: 26, direct: 7, bing: 1, hoausa: 5, other: 5, unmatched: 13 } },
  { label: "Jan '26", total: 72, parts: { google: 39, direct: 7, bing: 2, hoausa: 8, other: 4, unmatched: 12 } },
  { label: "Feb '26", total: 74, parts: { google: 35, direct: 13, bing: 1, hoausa: 4, other: 12, unmatched: 9 } },
  { label: "Mar '26", total: 91, parts: { google: 51, direct: 11, bing: 3, hoausa: 4, other: 9, unmatched: 13 } },
];

export interface MosaicCmgCaseStudyProps { compact?: boolean; }

export default function MosaicCmgCaseStudy({ compact = false }: MosaicCmgCaseStudyProps) {
  const months = MONTHS;
  const baseline = months[0].total;
  const peak = Math.max(...months.map(m => m.total));
  const growthPct = Math.round(((peak - baseline) / baseline) * 100);

  if (compact) {
    return (
      <div className="case-study-card" style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(56,28,79,0.14)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '32px 32px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 12 }}>
            <Eyebrow noLine>Rapid deployment</Eyebrow>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: GREEN, padding: '5px 10px', border: `1px solid ${GREEN}`, borderRadius: 999, whiteSpace: 'nowrap' }}>7 months</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, lineHeight: 1.2, letterSpacing: '-0.02em', color: PURPLE, margin: '0 0 16px' }}>
            "We finally stopped guessing where leads came from — and watched the system compound."
          </h3>
          <Avatar size={44} />
          <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, margin: '12px 0 16px' }}>
            BoardSuite Steady. Niche-segment SEO + channel diversification across Google, Bing, hoa-usa.com, and direct.
          </p>
          <div style={{ marginTop: 'auto' }}>
            <Button variant="secondary" arrow href="/strategic-review-request" size="sm">Request a diagnostic</Button>
          </div>
        </div>
        <DarkPanel months={months} baseline={baseline} peak={peak} growthPct={growthPct} compact />
      </div>
    );
  }

  return (
    <div className="case-study-card" style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(56,28,79,0.14)', border: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr' }}>
        <div style={{ padding: '44px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Eyebrow noLine>Signature client · Mosaic CMG</Eyebrow>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.02em', color: PURPLE, margin: '14px 0 18px' }}>
            "We finally stopped guessing where leads came from — and watched the system compound."
          </h3>
          <Avatar size={56} />
          <p style={{ color: '#555', fontSize: 15, lineHeight: 1.65, margin: '14px 0 18px', maxWidth: '48ch' }}>
            7-month engagement. BoardSuite Steady. Niche-segment SEO and channel diversification across Google, Bing, hoa-usa.com, and direct — built for boards who don't search the way larger associations do.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { c: PINK, t: 'Niche-segment SEO + GEO targeting' },
              { c: YELLOW, t: 'Channel diversification across 5+ sources' },
              { c: GREEN, t: 'Source attribution wired up at engagement start' },
              { c: BLUE, t: 'Sustained month-over-month compounding' },
            ].map(b => (
              <li key={b.t} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13.5, color: '#444' }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: b.c, flexShrink: 0 }}></span>
                <span>{b.t}</span>
              </li>
            ))}
          </ul>
          <div>
            <Button variant="secondary" arrow href="/strategic-review-request">Request a diagnostic</Button>
          </div>
        </div>
        <DarkPanel months={months} baseline={baseline} peak={peak} growthPct={growthPct} />
      </div>
    </div>
  );
}

function Avatar({ size }: { size: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: size, height: size, borderRadius: 12, background: 'linear-gradient(135deg, var(--alloy-green) 0%, var(--alloy-blue) 100%)', display: 'grid', placeItems: 'center', flexShrink: 0, border: '2px solid var(--alloy-purple)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: PURPLE, letterSpacing: '-0.02em' }}>M</span>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 14 }}>Mosaic CMG</div>
        <div style={{ fontSize: 12, color: '#888' }}>Small-association portfolio specialists</div>
      </div>
    </div>
  );
}

function DarkPanel({ months, baseline, peak, growthPct, compact = false }: { months: Month[]; baseline: number; peak: number; growthPct: number; compact?: boolean }) {
  return (
    <div style={{ background: 'linear-gradient(160deg, #381c4f 0%, #290d41 100%)', color: '#fff', padding: compact ? '26px 32px 26px' : '36px 40px 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: compact ? '28px 28px' : '32px 32px' }}></div>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: compact ? 10 : 14 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: compact ? 10.5 : 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.7 }}>{compact ? 'Monthly inquiries' : '7-month trajectory'}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: compact ? 10.5 : 11, letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 600, opacity: 0.55 }}>Sep '25 → Mar '26</div>
        </div>
        <MosaicCmgInquiryChart months={months} />
        <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: compact ? '18px 0 16px' : '24px 0 22px' }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: compact ? 14 : 18 }}>
          <RiseStatCompact color={PINK} label="Sep baseline" value={<AnimatedNumber value={baseline} />} />
          <RiseStatCompact color={YELLOW} label={compact ? 'Mar peak' : 'Mar peak'} value={<AnimatedNumber value={peak} />} />
          <RiseStatCompact color={GREEN} label={compact ? 'Growth' : 'Total growth'} value={<AnimatedNumber value={growthPct} prefix="+" suffix="%" />} />
        </div>
      </div>
    </div>
  );
}

function MosaicCmgInquiryChart({ months }: { months: Month[] }) {
  const [activeMonth, setActiveMonth] = useState<Month | null>(null);
  const segments = [
    { key: 'google', label: 'Google', color: '#5fa3e8' },
    { key: 'direct', label: 'Direct', color: '#9a9aa6' },
    { key: 'bing', label: 'Bing', color: '#3aac82' },
    { key: 'hoausa', label: 'hoa-usa', color: '#d68a3a' },
    { key: 'other', label: 'Other', color: '#b6a9d8' },
    { key: 'unmatched', label: 'Unmatched', color: '#cfcfd5' },
  ] as const;

  const W = 520, H = 230;
  const padL = 32, padR = 8, padT = 12, padB = 30;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const yMax = 100;
  const yTicks = [0, 25, 50, 75, 100];
  const barGap = 10;
  const barW = (innerW - barGap * (months.length - 1)) / months.length;

  const focusMonth = activeMonth ?? months[months.length - 1];
  const topChannels = segments
    .map(s => ({ ...s, count: focusMonth.parts[s.key] }))
    .filter(c => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 8, fontSize: 10.5, fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.02em' }}>
        {segments.map(s => (
          <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 9, height: 9, background: s.color, borderRadius: 2, display: 'inline-block' }}></span>
            <span style={{ color: 'rgba(255,255,255,0.78)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }} aria-label="Mosaic CMG monthly inbound inquiries by source, September 2025 to March 2026">
        {yTicks.map(t => {
          const y = padT + innerH - (t / yMax) * innerH;
          return (
            <g key={t}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <text x={padL - 6} y={y + 3.5} textAnchor="end" fontFamily="var(--font-display)" fontSize="9.5" fill="rgba(255,255,255,0.45)">{t}</text>
            </g>
          );
        })}

        <g className="cs-bar-stack">
          {months.map((m, i) => {
            const x = padL + i * (barW + barGap);
            let cumulative = 0;
            const isActive = activeMonth?.label === m.label;
            const isDimmed = !!activeMonth && !isActive;
            return (
              <g
                key={m.label}
                className={`cs-bar ${isActive ? 'cs-active' : ''} ${isDimmed ? 'cs-dim' : ''}`}
                onMouseEnter={() => setActiveMonth(m)}
                onMouseLeave={() => setActiveMonth(null)}
                onFocus={() => setActiveMonth(m)}
                onBlur={() => setActiveMonth(null)}
                tabIndex={0}
                style={{ outline: 'none' }}
              >
                <rect x={x - barGap / 2} y={padT} width={barW + barGap} height={innerH} fill="transparent" />
                {segments.map(seg => {
                  const v = m.parts[seg.key] || 0;
                  if (v <= 0) return null;
                  const segH = (v / yMax) * innerH;
                  const segY = padT + innerH - ((cumulative + v) / yMax) * innerH;
                  cumulative += v;
                  return <rect key={seg.key} x={x} y={segY} width={barW} height={segH} fill={seg.color} />;
                })}
                {isActive && (
                  <rect
                    x={x - 1.5} y={padT + innerH - (m.total / yMax) * innerH - 1.5}
                    width={barW + 3} height={(m.total / yMax) * innerH + 3}
                    fill="none" stroke="#fff" strokeWidth="1.5" rx="2" pointerEvents="none"
                  />
                )}
                <text x={x + barW / 2} y={padT + innerH - (m.total / yMax) * innerH - 6}
                  textAnchor="middle" fontFamily="var(--font-display)" fontSize="11" fontWeight="700"
                  fill={isActive ? '#fff' : 'rgba(255,255,255,0.85)'}>{m.total}</text>
                <text x={x + barW / 2} y={H - 12} textAnchor="middle" fontFamily="var(--font-display)" fontSize="10"
                  fill={isActive ? '#fff' : 'rgba(255,255,255,0.6)'} fontWeight={isActive ? 700 : 400}>{m.label}</text>
              </g>
            );
          })}
        </g>
      </svg>

      <div style={{ marginTop: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 14, minHeight: 36 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 10.5, letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 700, color: activeMonth ? '#fff' : 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>
          {activeMonth ? `${focusMonth.label} · top channels` : 'Hover a bar'}
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: 1 }}>
          {topChannels.map(c => (
            <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5 }}>
              <span style={{ width: 8, height: 8, background: c.color, borderRadius: 2, display: 'inline-block' }}></span>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{c.label}</span>
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>{c.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
