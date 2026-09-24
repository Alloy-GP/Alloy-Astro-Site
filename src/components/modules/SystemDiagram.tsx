// src/components/modules/SystemDiagram.tsx
// Interactive attract → close → keep diagram. Ported from modules.jsx.
import { useState } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Icon from '~/components/Icon';
import Button from '~/components/Button';
import EngineLoop from '~/components/EngineLoop';
import { PURPLE, PINK, YELLOW, GREEN } from '~/lib/tokens';

export interface SystemDiagramProps {
  onLearn?: string;
}

type StageId = 'attract' | 'close' | 'keep';
interface Stage {
  label: string;
  brand: string;
  color: string;
  colorTint: string;
  icon: string;
  headline: string;
  sub: string;
  proof: string;
  proofLabel: string;
  services: string[];
}

export default function SystemDiagram(_props: SystemDiagramProps = {}) {
  const [active, setActive] = useState<StageId>('attract');
  const hrefs: Record<StageId, string> = {
    attract: '/our-approach/boardreach',
    close: '/our-approach/boardmatch',
    keep: '/our-approach/boardretain',
  };
  const stages: Record<StageId, Stage> = {
    attract: {
      label: 'Attract', brand: 'BoardReach™', color: PINK, colorTint: '#fbe2eb', icon: 'binoculars',
      headline: 'Get found before boards start shopping.',
      sub: 'Authority positioning, local SEO, AI search visibility, demand generation. Boards reach out — you stop chasing.',
      proof: '535%', proofLabel: 'increase in lead intake (Apex CMG*)',
      services: ['Local SEO & GEO', 'Content & pillar pages', 'PPC management', 'Lead magnets', 'Email & newsletter', 'Social cadence'],
    },
    close: {
      label: 'Close', brand: 'BoardMatch™', color: YELLOW, colorTint: '#fbf2d6', icon: 'file-sig',
      headline: 'Turn conversations into signed contracts.',
      sub: 'Discovery frameworks, proposal optimization, board psychology, BD training. Your team walks in armed and ready.',
      proof: '3×', proofLabel: 'growth in proposal requests',
      services: ['Proposal redesign', 'Sales messaging & UVP', 'BD training', 'Follow-up sequences', 'Shared board portal', 'RFP system'],
    },
    keep: {
      label: 'Keep', brand: 'BoardRetain™', color: GREEN, colorTint: '#def0ec', icon: 'shield',
      headline: 'Protect the portfolio you have.',
      sub: 'Onboarding systems, churn prevention, board education, manager-transition resilience. Happy boards become a referral engine.',
      proof: '40‑60%', proofLabel: 'Groundwork conversion rate',
      services: ['Board education programs', 'Satisfaction & feedback systems', 'SOP creation', 'Reputation management', 'Communication strategy', 'Staff training'],
    },
  };
  const a = stages[active];
  const order: StageId[] = ['attract', 'close', 'keep'];
  const pillarMap: Record<StageId, 'reach' | 'match' | 'retain'> = { attract: 'reach', close: 'match', keep: 'retain' };

  return (
    <div className="system-diagram" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'stretch' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', left: 22, top: 28, bottom: 80, width: 1,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.18) 12%, rgba(255,255,255,0.18) 88%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
        }}></div>
        {order.map((id) => {
          const s = stages[id];
          const isActive = id === active;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              onMouseEnter={() => setActive(id)}
              className={`engine-tab ${isActive ? 'is-active' : ''}`}
              style={{
                all: 'unset', cursor: 'pointer', display: 'block', position: 'relative',
                background: isActive ? '#fff' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 14,
                padding: '20px 24px 22px',
                transition: 'background 280ms var(--ease-standard), border-color 280ms var(--ease-standard), transform 280ms var(--ease-standard), box-shadow 280ms var(--ease-standard)',
                boxShadow: isActive ? '0 18px 40px rgba(0,0,0,0.30)' : 'none',
                transform: isActive ? 'translateX(6px)' : 'translateX(0)',
                color: isActive ? PURPLE : '#fff',
                overflow: 'hidden',
              }}
            >
              <span aria-hidden="true" style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
                background: s.color,
                opacity: isActive ? 1 : 0.35,
                transition: 'opacity 280ms var(--ease-standard), width 280ms var(--ease-standard)',
              }}></span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <EngineLoop pillar={pillarMap[id]} active={isActive} size={44} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                    fontWeight: 700, opacity: isActive ? 0.85 : 0.5,
                    color: isActive ? s.color : 'inherit',
                    marginBottom: 4,
                  }}>{s.label}</div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: isActive ? 28 : 24,
                    lineHeight: 1.05, letterSpacing: '-0.02em',
                    transition: 'font-size 280ms var(--ease-standard)',
                  }}>{s.brand}</div>
                  <div style={{
                    fontFamily: 'var(--font-text)', fontSize: 13, lineHeight: 1.45, color: '#666',
                    marginTop: 6,
                    maxHeight: isActive ? 60 : 0,
                    opacity: isActive ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 280ms var(--ease-standard), opacity 200ms var(--ease-standard) 80ms',
                  }}>{s.headline}</div>
                </div>
              </div>
            </button>
          );
        })}
        <div style={{ marginTop: 18, padding: '20px 24px', background: 'rgba(245,216,128,0.08)', border: '1px dashed rgba(245,216,128,0.35)', borderRadius: 12, color: '#fff' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: YELLOW, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>BoardSuite™ — all three, in unison</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.55, opacity: 0.82 }}>The integrated system. Every engine coordinated by one growth partner — built by CAM operators.</div>
        </div>
      </div>

      <div className="system-diagram-panel" style={{ background: '#fff', borderRadius: 16, padding: 40, color: PURPLE, position: 'relative', overflow: 'hidden', minHeight: 460 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: a.color, transition: 'background 320ms var(--ease-standard)' }}></div>
        <div key={active} className="panel-swap">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', background: a.colorTint, borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: PURPLE }}>
            <Icon name={a.icon} size={14} />
            {a.brand} · {a.label}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '20px 0 14px', color: PURPLE }}>{a.headline}</h3>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: '#555', maxWidth: '55ch', margin: '0 0 28px' }}>{a.sub}</p>

          <div className="system-diagram-proof" style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 28, padding: '20px 24px', background: a.colorTint, borderRadius: 12 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 56, lineHeight: 0.9, letterSpacing: '-0.025em', color: PURPLE }}>{a.proof}</div>
            <div style={{ fontSize: 13, color: '#555', lineHeight: 1.4, fontWeight: 500 }}>{a.proofLabel}</div>
          </div>

          <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: a.color === YELLOW ? '#8a6d12' : a.color === GREEN ? '#2c6a62' : PINK, marginBottom: 14 }}>
            What's inside
          </div>
          <div className="system-diagram-services" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
            {a.services.map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#444' }}>
                <Icon name="check" size={16} color={a.color === YELLOW ? '#8a6d12' : a.color === GREEN ? '#2c6a62' : PINK} strokeWidth={2.5} />
                {s}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <Button variant="dark" arrow href={hrefs[active]} size="sm">See {a.brand}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
