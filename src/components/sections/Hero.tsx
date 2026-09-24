// src/components/sections/Hero.tsx
// Homepage hero. Ported from pages.jsx.
// Tweaks removed — defaults baked in (refined / split / deep / animatedBar / statsHero).
import type { ReactNode, CSSProperties } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import AccentBar from '~/components/AccentBar';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

export interface HeroProps {
  variant?: 'refined' | 'pov' | 'engineered' | 'proof' | 'exclusivity';
  layout?: 'split' | 'centered' | 'diagram' | 'fullbleed';
  color?: 'ivory' | 'deep' | 'purple';
  animatedBar?: boolean;
  statsHero?: boolean;
}

interface HeroContent {
  eyebrow: string;
  h1: ReactNode;
  sub: string;
}

export default function Hero({
  variant = 'refined',
  layout = 'split',
  color = 'deep',
  animatedBar = true,
  statsHero = true,
}: HeroProps) {
  const isDark = color !== 'ivory';
  const bgClass = color === 'ivory' ? 'bg-ivory' : color === 'deep' ? 'bg-deep' : '';

  const heroes: Record<string, HeroContent> = {
    refined: {
      eyebrow: 'Growth for CAM companies',
      h1: <>Your CAM company<br/>knows how to manage.<br/><span style={{ color: isDark ? YELLOW : PINK }}>We handle the growth.</span></>,
      sub: "Alloy is the CAM industry's dedicated growth agency. We engineer the system between reputation and revenue — so boards reach you before they shop.",
    },
    pov: {
      eyebrow: 'The Alloy POV',
      h1: <>Most CAM companies<br/>grow by accident.<br/><span style={{ color: isDark ? YELLOW : PINK }}>Alloy makes it intentional.</span></>,
      sub: 'Built by three operators who ran marketing, learning, and ops inside a CAM firm. We engineer attract, close, and keep into one connected system.',
    },
    engineered: {
      eyebrow: 'Built by CAM operators',
      h1: <>Growth should be<br/><span style={{ color: isDark ? YELLOW : PINK }}>engineered,</span><br/>not hoped for.</>,
      sub: 'BoardReach attracts. BoardMatch closes. BoardRetain keeps. One growth partner, one connected system — exclusively for CAM companies.',
    },
    proof: {
      eyebrow: 'What engineered growth looks like',
      h1: <><span style={{ color: isDark ? YELLOW : PINK }}>535%</span> more leads.<br/><span style={{ color: isDark ? YELLOW : PINK }}>3×</span> the proposals.<br/>One CAM growth partner.</>,
      sub: "Apex CMG*'s results in 18 months — without adding a sales hire. We don't promise growth. We engineer it.",
    },
    exclusivity: {
      eyebrow: 'Market exclusivity',
      h1: <>One CAM company<br/>per metro.<br/><span style={{ color: isDark ? YELLOW : PINK }}>Claim yours.</span></>,
      sub: 'When you partner with Alloy, no competing CAM firm in your market can. Your strategy, messaging, and competitive intel stay yours alone.',
    },
  };

  const hero = heroes[variant] || heroes.refined;

  if (statsHero) {
    return (
      <section className={`hero ${bgClass}`}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner">
          <div style={{ maxWidth: 1100 }}>
            <Eyebrow onDark={isDark}>{hero.eyebrow}</Eyebrow>
            <h1 className="display-xxl" style={{ margin: '20px 0 24px', color: isDark ? '#fff' : PURPLE }}>{hero.h1}</h1>
            <p className="lead" style={{ color: isDark ? 'rgba(255,255,255,0.78)' : '#555', marginBottom: 36 }}>{hero.sub}</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}>
              <Button variant="primary" arrow href="/strategic-review-request">Claim Your Market</Button>
              <Button variant="secondary" onDark={isDark} href="/services">See the system</Button>
            </div>
          </div>
          <div className="hero-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, paddingTop: 40, borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'var(--border-subtle)'}` }}>
            <BigStat color={PINK} label="Lead intake (Apex CMG*)" value="535%" sub="vs prior baseline" onDark={isDark} />
            <BigStat color={YELLOW} label="Proposal requests" value="3×" sub="growth in 18 months" onDark={isDark} />
            <BigStat color={BLUE} label="Groundwork conversion" value="40‑60%" sub="qualified to closed" onDark={isDark} />
            <BigStat color={GREEN} label="CAM industry years" value="35+" sub="across three partners" onDark={isDark} />
          </div>
        </div>
        <AccentBar height={8} animated={animatedBar} />
      </section>
    );
  }

  if (layout === 'centered') {
    return (
      <section className={`hero ${bgClass}`}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner">
          <div className="hero-grid-centered">
            <Eyebrow onDark={isDark}>{hero.eyebrow}</Eyebrow>
            <h1 className="display-xxl" style={{ color: isDark ? '#fff' : PURPLE, maxWidth: 1100 }}>{hero.h1}</h1>
            <p className="lead" style={{ color: isDark ? 'rgba(255,255,255,0.78)' : '#555', textAlign: 'center' }}>{hero.sub}</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button variant="primary" arrow href="/strategic-review-request">Claim Your Market</Button>
              <Button variant="secondary" onDark={isDark} href="/services">See the system</Button>
            </div>
          </div>
        </div>
        <AccentBar height={8} animated={animatedBar} />
      </section>
    );
  }

  if (layout === 'diagram') {
    return (
      <section className={`hero ${bgClass}`} style={{ background: isDark ? PURPLE : undefined }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner">
          <div className="hero-grid-split">
            <div>
              <Eyebrow onDark={isDark}>{hero.eyebrow}</Eyebrow>
              <h1 className="display-xl" style={{ margin: '20px 0 22px', color: isDark ? '#fff' : PURPLE }}>{hero.h1}</h1>
              <p className="lead" style={{ color: isDark ? 'rgba(255,255,255,0.78)' : '#555', marginBottom: 32 }}>{hero.sub}</p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Button variant="primary" arrow href="/strategic-review-request">Claim Your Market</Button>
                <Button variant="secondary" onDark={isDark} href="/services">See the system</Button>
              </div>
            </div>
            <HeroDiagram />
          </div>
        </div>
        <AccentBar height={8} animated={animatedBar} />
      </section>
    );
  }

  if (layout === 'fullbleed') {
    return (
      <section className={`hero ${bgClass}`} style={{ minHeight: 640 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #381c4f 0%, #290d41 60%, #1a0a26 100%)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 30%, rgba(217,53,110,0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(245,216,128,0.18) 0%, transparent 50%)', zIndex: 0 }}></div>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 900 }}>
            <Eyebrow onDark>{hero.eyebrow}</Eyebrow>
            <h1 className="display-xxl" style={{ margin: '20px 0 24px', color: '#fff' }}>{hero.h1}</h1>
            <p className="lead" style={{ color: 'rgba(255,255,255,0.84)', marginBottom: 32 }}>{hero.sub}</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button variant="primary" arrow href="/strategic-review-request">Claim Your Market</Button>
              <Button variant="secondary" onDark href="/services">See the system</Button>
            </div>
          </div>
        </div>
        <AccentBar height={8} animated={animatedBar} />
      </section>
    );
  }

  // SPLIT (default)
  return (
    <section className={`hero ${bgClass}`}>
      <div className="hero-bg-grid"></div>
      <div className="hero-inner">
        <div className="hero-grid-split">
          <div>
            <Eyebrow onDark={isDark}>{hero.eyebrow}</Eyebrow>
            <h1 className="display-xl" style={{ margin: '20px 0 22px', color: isDark ? '#fff' : PURPLE }}>{hero.h1}</h1>
            <p className="lead" style={{ color: isDark ? 'rgba(255,255,255,0.78)' : '#555', marginBottom: 32 }}>{hero.sub}</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
              <Button variant="primary" arrow href="/strategic-review-request">Claim Your Market</Button>
              <Button variant="secondary" onDark={isDark} href="/services">See the system</Button>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 12, color: isDark ? 'rgba(255,255,255,0.55)' : '#888', fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '0.02em' }}>
              <Icon name="lock" size={14} />
              <span>One CAM partner per metro · BBB Accredited · CAI Member</span>
            </div>
          </div>
          <HeroVisual isDark={isDark} />
        </div>
      </div>
      <AccentBar height={8} animated={animatedBar} />
    </section>
  );
}

function HeroVisual({ isDark }: { isDark: boolean }) {
  return (
    <div style={{ position: 'relative', height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="100%" height="100%" viewBox="0 0 480 480" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d9356e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#381c4f" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="240" cy="240" r="220" fill="none" stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(56,28,79,0.08)'} strokeWidth="1" />
        <circle cx="240" cy="240" r="170" fill="none" stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(56,28,79,0.10)'} strokeWidth="1" />
        <circle cx="240" cy="240" r="120" fill="none" stroke={isDark ? 'rgba(255,255,255,0.10)' : 'rgba(56,28,79,0.14)'} strokeWidth="1" />
        <circle cx="240" cy="240" r="200" fill="url(#ringGrad)" opacity="0.4" />
      </svg>
      <div style={{ position: 'relative', width: 160, height: 160, borderRadius: 999, background: 'linear-gradient(135deg, #d9356e 0%, #381c4f 100%)', display: 'grid', placeItems: 'center', boxShadow: '0 24px 60px rgba(217,53,110,0.4)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 64, color: '#fff', letterSpacing: '-0.04em' }}>α</div>
      </div>
      <FloatingChip top="8%" left="6%" color={PINK} eyebrow="Attract" value="BoardReach™" delay="0s" />
      <FloatingChip top="12%" right="4%" color={YELLOW} eyebrow="Energy" value="3× proposals" delay="0.2s" textColor="#8a6d12" />
      <FloatingChip bottom="14%" left="2%" color={BLUE} eyebrow="Close" value="BoardMatch™" delay="0.4s" textColor="#1f5380" />
      <FloatingChip bottom="6%" right="10%" color={GREEN} eyebrow="Keep" value="BoardRetain™" delay="0.6s" textColor="#2c6a62" />
    </div>
  );
}

interface FloatingChipProps {
  top?: string; left?: string; right?: string; bottom?: string;
  color: string; eyebrow: string; value: string; delay: string; textColor?: string;
}

function FloatingChip({ top, left, right, bottom, color, eyebrow, value, delay, textColor = PURPLE }: FloatingChipProps) {
  return (
    <div className="reveal" style={{
      position: 'absolute', top, left, right, bottom,
      animationDelay: delay,
      background: '#fff', borderRadius: 12, padding: '12px 16px',
      boxShadow: '0 12px 32px rgba(56,28,79,0.18)',
      borderTop: `4px solid ${color}`,
      display: 'flex', flexDirection: 'column', gap: 2,
      minWidth: 120,
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: textColor }}>{eyebrow}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: PURPLE, letterSpacing: '-0.005em' }}>{value}</div>
    </div>
  );
}

function HeroDiagram() {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 16, padding: 32, position: 'relative', height: 480 }}>
      <div style={{ position: 'absolute', top: 16, left: 24, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: YELLOW, fontWeight: 700 }}>The system</div>
      <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10" fill="rgba(255,255,255,0.4)" />
          </marker>
        </defs>
        <path d="M 100 110 Q 200 80 300 110" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" markerEnd="url(#arr)" />
        <path d="M 320 150 Q 360 250 320 330" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" markerEnd="url(#arr)" />
        <path d="M 280 360 Q 200 380 120 360" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" markerEnd="url(#arr)" />
        <path d="M 80 320 Q 60 230 80 140" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" markerEnd="url(#arr)" />
        <DiagNode cx="100" cy="110" color="#d9356e" label="ATTRACT" sub="BoardReach™" />
        <DiagNode cx="300" cy="110" color="#f5d880" label="CLOSE" sub="BoardMatch™" />
        <DiagNode cx="300" cy="330" color="#aed7d0" label="KEEP" sub="BoardRetain™" />
        <DiagNode cx="100" cy="330" color="#a1c8e7" label="REFER" sub="referral engine" />
        <circle cx="200" cy="220" r="50" fill="rgba(217,53,110,0.15)" stroke="rgba(217,53,110,0.5)" strokeWidth="1.5" />
        <text x="200" y="217" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="14" fill="#fff" letterSpacing="0.1em">BOARD</text>
        <text x="200" y="234" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="14" fill="#fff" letterSpacing="0.1em">SUITE™</text>
      </svg>
    </div>
  );
}

function DiagNode({ cx, cy, color, label, sub }: { cx: string; cy: string; color: string; label: string; sub: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="36" fill="rgba(255,255,255,0.06)" stroke={color} strokeWidth="2" />
      <circle cx={cx} cy={cy} r="6" fill={color} />
      <text x={cx} y={Number(cy) + 56} textAnchor="middle" fontFamily="var(--font-display)" fontSize="10" letterSpacing="0.14em" fontWeight="700" fill={color}>{label}</text>
      <text x={cx} y={Number(cy) + 72} textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fontWeight="700" fill="#fff">{sub}</text>
    </g>
  );
}

interface BigStatProps { color: string; label: string; value: string; sub: string; onDark?: boolean; }
function BigStat({ color, label, value, sub, onDark }: BigStatProps) {
  return (
    <div style={{ borderTop: `3px solid ${color}`, paddingTop: 14 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: onDark ? 'rgba(255,255,255,0.75)' : '#888', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 44, lineHeight: 0.95, letterSpacing: '-0.025em', color: onDark ? '#fff' : PURPLE, marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 12, color: onDark ? 'rgba(255,255,255,0.6)' : '#888' }}>{sub}</div>
    </div>
  );
}

export { BigStat };
