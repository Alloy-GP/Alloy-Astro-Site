// src/components/sections/Shells.tsx
// Reusable page shells: PageHero, CtaBand, PillarCard, ServiceList,
// CaseStudyDivider, DurationRibbon. Ported from pages-extra.jsx.
import type { ReactNode, CSSProperties } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Tag from '~/components/Tag';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import AccentBar from '~/components/AccentBar';
import PillarMark from '~/components/PillarMark';
import { PURPLE, PINK, YELLOW, GREEN, BLUE } from '~/lib/tokens';

type PillarKey = 'reach' | 'match' | 'retain';

interface PageHeroProps {
  eyebrow: ReactNode;
  h1: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  bg?: string;
  accent?: string;
  image?: string;
  sideStat?: ReactNode;
  /** When true, sideStat renders without the card wrapper (use when sideStat is already a fully styled card). */
  sideStatRaw?: boolean;
}

export function PageHero({ eyebrow, h1, sub, dark = false, bg, sideStat, sideStatRaw = false, image }: PageHeroProps) {
  const isDark = dark || !!bg;
  const bgStyle: CSSProperties = bg ? { background: bg, color: '#fff' } : isDark ? { background: PURPLE, color: '#fff' } : {};
  return (
    <section className={`hero ${isDark ? '' : 'bg-ivory'}`} style={bgStyle}>
      <div className="hero-bg-grid"></div>
      <div className="hero-inner">
        <div style={{ display: 'grid', gridTemplateColumns: sideStat || image ? '1.4fr 1fr' : '1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <Eyebrow onDark={isDark}>{eyebrow}</Eyebrow>
            <h1 className="display-xl" style={{ margin: '16px 0 22px', color: isDark ? '#fff' : PURPLE }}>{h1}</h1>
            {sub && <p className="lead" style={{ color: isDark ? 'rgba(255,255,255,0.78)' : '#555', maxWidth: 720 }}>{sub}</p>}
          </div>
          {sideStat && (
            sideStatRaw ? sideStat : (
              <div style={{
                background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid var(--border-subtle)',
                borderRadius: 16, padding: 32,
              }}>
                {sideStat}
              </div>
            )
          )}
        </div>
      </div>
      <AccentBar height={6} />
    </section>
  );
}

interface CtaBandProps {
  headline?: string;
  sub?: string;
  primary?: string;
  primaryHref?: string;
}

export function CtaBand({
  headline = 'Three engines. One playbook. Your market.',
  sub = 'Attract, close, and keep — engineered as one connected system. 30 minutes tells you which engine to fix first.',
  primary = 'Claim Your Market',
  primaryHref = '/contact',
}: CtaBandProps) {
  return (
    <section style={{ background: 'linear-gradient(135deg, #381c4f 0%, #290d41 100%)', padding: '100px 0', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(217,53,110,0.30) 0%, transparent 60%)' }}></div>
      <div className="container-narrow" style={{ position: 'relative', textAlign: 'center' }}>
        <Eyebrow onDark noLine>Ready when you are</Eyebrow>
        <h2 className="display-xl" style={{ margin: '16px auto 18px', color: '#fff', maxWidth: 800 }}>{headline}</h2>
        <p className="lead on-dark" style={{ margin: '0 auto 32px' }}>{sub}</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" arrow href={primaryHref}>{primary}</Button>
          <Button variant="secondary" onDark href="/services">Explore the system</Button>
        </div>
      </div>
    </section>
  );
}

interface PillarCardProps {
  color: string;
  tint?: string;
  icon?: string;
  brand: string;
  label: string;
  headline: string;
  items: string[];
  href?: string;
  pillar?: PillarKey;
}

export function PillarCard({ color, brand, label, headline, items, href, pillar }: PillarCardProps) {
  const p: PillarKey = pillar || (color === PINK ? 'reach' : color === YELLOW ? 'match' : color === GREEN ? 'retain' : 'reach');
  const tagColor = color === PINK ? 'pink' : color === YELLOW ? 'yellow' : color === GREEN ? 'green' : 'blue';
  return (
    <div className="card card-pad pillar-card" style={{ borderTop: `5px solid ${color}`, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Tag color={tagColor as any}>{label}</Tag>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: PURPLE, letterSpacing: '-0.018em', lineHeight: 1.1 }}>{brand}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, color: PURPLE, lineHeight: 1.3 }}>{headline}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(s => (
          <li key={s} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: '#555' }}>
            <Icon name="check" size={16} color={color} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 } as CSSProperties} />
            <span>{s}</span>
          </li>
        ))}
      </ul>
      {href && (
        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <Button variant="ghost" arrow href={href} size="sm">Learn more</Button>
        </div>
      )}
    </div>
  );
}

interface ServiceListItem { h: string; d: string; icon?: string; }
interface ServiceListProps { items: ServiceListItem[]; color?: string; pillar?: PillarKey; }

export function ServiceList({ items, color = PINK, pillar }: ServiceListProps) {
  const p: PillarKey = pillar || (color === PINK ? 'reach' : color === YELLOW ? 'match' : color === GREEN ? 'retain' : 'reach');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {items.map((c, i) => (
        <div key={i} className={`card card-pad pillar-card pillar-card-${p}`} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="display-md" style={{ fontSize: 24, color: PURPLE, lineHeight: 1.2 }}>{c.h}</div>
          <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{c.d}</div>
        </div>
      ))}
    </div>
  );
}

interface CaseStudyDividerProps {
  number: string;
  title: string;
  kicker: string;
  duration: string;
  durationDetail: string;
  color: string;
  colorDeep: string;
  ribbonFill: number;
}

export function CaseStudyDivider({ number, title, kicker, duration, durationDetail, color, colorDeep, ribbonFill }: CaseStudyDividerProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 64, lineHeight: 0.9, color, letterSpacing: '-0.04em' }}>{number}</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 800, color: colorDeep, marginBottom: 4 }}>{kicker}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, lineHeight: 1, color: PURPLE, letterSpacing: '-0.025em', margin: 0 }}>{title}</h3>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: color, color: '#fff', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, letterSpacing: '0.04em' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 3.5V7L9 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>{duration}</span>
        </div>
      </div>
      <DurationRibbon color={color} fillFraction={ribbonFill} detail={durationDetail} />
    </div>
  );
}

interface DurationRibbonProps { color: string; fillFraction: number; detail: string; }

export function DurationRibbon({ color, fillFraction, detail }: DurationRibbonProps) {
  const months = 36;
  const ticks = [0, 6, 12, 18, 24, 30, 36];
  return (
    <div>
      <div style={{ position: 'relative', height: 28, background: 'rgba(56,28,79,0.06)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fillFraction * 100}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 999, boxShadow: `0 4px 14px ${color}44` }}></div>
        <div style={{ position: 'absolute', left: `calc(${fillFraction * 100}% - 4px)`, top: 4, bottom: 4, width: 8, background: '#fff', borderRadius: 4, boxShadow: `0 0 0 2px ${color}` }}></div>
      </div>
      <div style={{ position: 'relative', height: 22, marginTop: 4 }}>
        {ticks.map(t => (
          <div key={t} style={{ position: 'absolute', left: `${(t / months) * 100}%`, transform: 'translateX(-50%)', fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, color: 'rgba(56,28,79,0.45)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
            {t === 0 ? 'START' : `${t} MO`}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 6, fontSize: 12.5, color: '#888', fontStyle: 'italic' }}>{detail}</div>
    </div>
  );
}
