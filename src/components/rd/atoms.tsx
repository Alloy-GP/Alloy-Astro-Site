// src/components/rd/atoms.tsx
// Small presentational pieces for the redesign templates. All styling via rd-* classes
// in src/styles/redesign.css. Engine tones map to --engine-* tokens.
import type { ReactNode, CSSProperties } from 'react';
import type { EngineKey } from '~/lib/nav';
import type { StatItem, Step, ProseSection, Cta } from '~/data/services/types';
import type { FaqItem } from '~/lib/schema';

export type Tone = 'pink' | 'purple' | 'yellow' | 'gray' | 'white' | EngineKey;

const toneClass = (base: string, tone?: Tone) => (tone && tone !== 'pink' ? ` ${base}--${tone}` : '');

/* ── Icons ─────────────────────────────────────────────────────────────── */
export function ArrowIcon({ size = 12, stroke = 2.5 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
export function ChevronRightIcon({ size = 14, stroke = 2 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
export function CheckIcon({ size = 18, color = 'var(--alloy-pink)' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
export function PlusIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ── Type ──────────────────────────────────────────────────────────────── */
export function Eyebrow({ children, tone = 'pink', noLine = false, className = '', small = false }: { children: ReactNode; tone?: Tone; noLine?: boolean; className?: string; small?: boolean }) {
  return (
    <div className={`rd-eyebrow${toneClass('rd-eyebrow', tone)}${noLine ? ' rd-eyebrow--noline' : ''}${small ? ' rd-eyebrow--12' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}

export function Label({ children, tone = 'gray', className = '', size = 11 }: { children: ReactNode; tone?: Tone; className?: string; size?: 11 | 12 }) {
  return (
    <div className={`rd-label${tone !== 'gray' ? ` rd-label--${tone}` : ''}${size === 12 ? ' rd-label--12' : ''} ${className}`.trim()}>{children}</div>
  );
}

/** Two-tone H1: first clause purple, `accent` clause pink. */
export function H1({ children, accent, tail, size = 'md', className = '', white = false }: { children: ReactNode; accent?: ReactNode; tail?: ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' | 'base'; className?: string; white?: boolean }) {
  const sizeCls = size === 'base' ? '' : ` rd-h1--${size}`;
  return (
    <h1 className={`rd-h1${sizeCls} ${className}`.trim()} style={white ? { color: '#fff' } : undefined}>
      {children}
      {accent ? <> <span className="rd-accent">{accent}</span></> : null}
      {tail ? <> {tail}</> : null}
    </h1>
  );
}

export function SectionHead({ eyebrow, tone = 'pink', h2, accent, intro, className = '', white = false }: { eyebrow?: ReactNode; tone?: Tone; h2: ReactNode; accent?: ReactNode; intro?: ReactNode; className?: string; white?: boolean }) {
  return (
    <div className={`rd-stack rd-stack--18 ${className}`.trim()}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 className="rd-h2" style={white ? { color: '#fff' } : undefined}>
        {h2}
        {accent ? <> <span className="rd-accent">{accent}</span></> : null}
      </h2>
      {intro ? <p className="rd-body">{intro}</p> : null}
    </div>
  );
}

/* ── Actions ───────────────────────────────────────────────────────────── */
export function Btn({ href, children, variant = 'primary', size, className = '', onClick, type = 'button', block = false, style }: {
  href?: string; children: ReactNode; variant?: 'primary' | 'dark' | 'outline' | 'white' | 'yellow'; size?: 'sm' | 'xs'; className?: string;
  onClick?: () => void; type?: 'button' | 'submit'; block?: boolean; style?: CSSProperties;
}) {
  const cls = `rd-btn${variant !== 'primary' ? ` rd-btn--${variant}` : ''}${size ? ` rd-btn--${size}` : ''}${block ? ' rd-btn--block' : ''} ${className}`.trim();
  if (href) return <a href={href} className={cls} style={style}>{children}</a>;
  return <button type={type} className={cls} onClick={onClick} style={style}>{children}</button>;
}

export function TextLink({ href, children, tone = 'purple', size = 13, arrow = true, pad = false, className = '' }: { href: string; children: ReactNode; tone?: 'purple' | 'pink' | 'white'; size?: 11 | 12 | 13; arrow?: boolean; pad?: boolean; className?: string }) {
  const cls = `rd-link${tone !== 'purple' ? ` rd-link--${tone}` : ''}${size !== 13 ? ` rd-link--${size}` : ''}${pad ? ' rd-link--pad' : ''} ${className}`.trim();
  return (
    <a href={href} className={cls}>
      {children}
      {arrow ? <ArrowIcon size={size === 11 ? 11 : 12} /> : null}
    </a>
  );
}

export function HeroCtas({ primary, secondary }: { primary?: Cta; secondary?: Cta }) {
  const p = primary ?? { label: 'Claim your market', href: '/get-started' };
  return (
    <div className="rd-row rd-row--wrap">
      <Btn href={p.href} className="rd-btn--inline">{p.label}</Btn>
      {secondary ? <TextLink href={secondary.href} pad>{secondary.label}</TextLink> : null}
    </div>
  );
}

/* ── Navigation pieces ─────────────────────────────────────────────────── */
export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="rd-breadcrumb" aria-label="Breadcrumb">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} style={{ display: 'contents' }}>
            {i > 0 && <span className="rd-breadcrumb-sep" aria-hidden="true">/</span>}
            {last ? (
              <a href={it.href ?? '#'} className="rd-breadcrumb-cur" aria-current="page">{it.label}</a>
            ) : it.href ? (
              <a href={it.href}>{it.label}</a>
            ) : (
              <span>{it.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function ChipRow({ label, chips, all }: { label: string; chips: Array<{ label: string; href: string }>; all?: Cta }) {
  return (
    <div className="rd-stack rd-stack--18 rd-rule-top" style={{ paddingTop: 48 }}>
      <Label>{label}</Label>
      <div className="rd-chips">
        {chips.map((c) => <a key={c.href} href={c.href} className="rd-chip">{c.label}</a>)}
        {all ? <a href={all.href} className="rd-chip">{all.label} →</a> : null}
      </div>
    </div>
  );
}

/* ── Content blocks ────────────────────────────────────────────────────── */
export function StatNumber({ stat, size = 48 }: { stat: StatItem; size?: 40 | 48 | 52 }) {
  const display = stat.display ?? stat.value.toLocaleString('en-US');
  return (
    <div className={`rd-stat-num${size !== 48 ? ` rd-stat-num--${size}` : ''}`}>
      <span data-count={stat.value} data-prefix={stat.prefix ?? ''} data-suffix="">
        {(stat.prefix ?? '') + display}
      </span>
      {stat.suffix ? <span className="rd-stat-suffix">{stat.suffix}</span> : null}
    </div>
  );
}

/** Purple full-width stat band (3 or 4 up). Wrap in a `.rd-section--band.rd-bg-purple`. */
export function StatBand({ stats, columns }: { stats: StatItem[]; columns?: 3 | 4 }) {
  const cols = columns ?? (stats.length >= 4 ? 4 : 3);
  return (
    <div data-reveal data-rise className={`rd-statband${cols === 4 ? ' rd-statband--4' : ''}`}>
      {stats.map((s, i) => (
        <div key={i} className="rd-stat">
          <StatNumber stat={s} />
          {s.label ? <div className="rd-stat-label">{s.label}</div> : null}
          <div className="rd-stat-note">{s.note}</div>
        </div>
      ))}
    </div>
  );
}

export function ProseRows({ sections }: { sections: ProseSection[] }) {
  return (
    <div className="rd-stack">
      {sections.map((s, i) => (
        <div key={i} className="rd-prose-row">
          <div><h3 className="rd-h3">{s.h}</h3></div>
          <div className="rd-prose-body">
            {s.p.map((para, j) => <p key={j} className="rd-body">{para}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Checklist({ items, columns = 2, color }: { items: string[]; columns?: 1 | 2; color?: string }) {
  return (
    <div className={`rd-checklist${columns === 1 ? ' rd-checklist--1' : ''}`}>
      {items.map((it, i) => (
        <div key={i} className="rd-check">
          <CheckIcon {...(color ? { color } : {})} />
          <span>{it}</span>
        </div>
      ))}
    </div>
  );
}

export function Steps({ steps, tone }: { steps: Step[]; tone?: EngineKey }) {
  return (
    <div className={`rd-steps${steps.length === 3 ? ' rd-steps--3' : ''}`}>
      {steps.map((s, i) => (
        <div key={i} className="rd-step">
          <span className={`rd-numeral${tone ? ` rd-numeral--${tone}` : ''}`}>{String(i + 1).padStart(2, '0')}</span>
          <div className="rd-step-title">{s.title}</div>
          <p>{s.body}</p>
        </div>
      ))}
    </div>
  );
}

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="rd-faq">
      {items.map((f, i) => (
        <div key={i} className="rd-faq-item">
          <div className="rd-faq-q">{f.q}</div>
          <p className="rd-faq-a">{f.a}</p>
        </div>
      ))}
    </div>
  );
}

export function CtaBar({ text, label = 'Claim your market', href = '/get-started' }: { text: ReactNode; label?: string; href?: string }) {
  return (
    <div className="rd-cta-bar">
      <div className="rd-cta-bar-text">{text}</div>
      <Btn href={href} className="rd-btn--inline">{label}</Btn>
    </div>
  );
}

/** Off-white card listing sibling services in the same engine (service hero right column). */
export function SiblingCard({ engineTitle, engineStage, engineHref, tone, links }: { engineTitle: string; engineStage: string; engineHref: string; tone: EngineKey; links: Array<{ label: string; href: string }> }) {
  return (
    <div className="rd-aside-card">
      <Label tone={tone} size={12}>{engineStage} · {engineTitle}</Label>
      <div className="rd-aside-links">
        {links.slice(0, 4).map((l) => (
          <a key={l.href} href={l.href} className="rd-aside-link">
            <span>{l.label}</span>
            <ChevronRightIcon />
          </a>
        ))}
      </div>
      <TextLink href={engineHref} size={12}>All of {engineTitle}</TextLink>
    </div>
  );
}
