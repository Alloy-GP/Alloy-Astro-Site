// src/components/modules/CaseStudyDivider.tsx
import { PURPLE } from '~/lib/tokens';

export interface CaseStudyDividerProps {
  number: string;
  title: string;
  kicker: string;
  duration: string;
  durationDetail: string;
  color: string;
  colorDeep: string;
  ribbonFill: number;
}

export default function CaseStudyDivider({ number, title, kicker, duration, durationDetail, color, colorDeep, ribbonFill }: CaseStudyDividerProps) {
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
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
          background: color, color: '#fff', borderRadius: 999,
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, letterSpacing: '0.04em',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 3.5V7L9 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>{duration}</span>
        </div>
      </div>
      <DurationRibbon color={color} fillFraction={ribbonFill} />
      <div style={{ marginTop: 8, fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: 'rgba(56,28,79,0.55)', letterSpacing: '0.04em' }}>{durationDetail}</div>
    </div>
  );
}

function DurationRibbon({ color, fillFraction }: { color: string; fillFraction: number }) {
  const months = 36;
  const ticks = [0, 6, 12, 18, 24, 30, 36];
  return (
    <div>
      <div style={{ position: 'relative', height: 28, background: 'rgba(56,28,79,0.06)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${fillFraction * 100}%`,
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          borderRadius: 999,
          boxShadow: `0 4px 14px ${color}44`,
        }}></div>
        <div style={{
          position: 'absolute',
          left: `calc(${fillFraction * 100}% - 4px)`,
          top: 4, bottom: 4, width: 8,
          background: '#fff', borderRadius: 4,
          boxShadow: `0 0 0 2px ${color}`,
        }}></div>
      </div>
      <div style={{ position: 'relative', height: 22, marginTop: 4 }}>
        {ticks.map(t => (
          <div key={t} style={{
            position: 'absolute',
            left: `${(t / months) * 100}%`,
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700,
            color: 'rgba(56,28,79,0.45)', letterSpacing: '0.08em', whiteSpace: 'nowrap',
          }}>
            {t === 0 ? 'START' : `${t} MO`}
          </div>
        ))}
      </div>
    </div>
  );
}
