// src/components/chrome/SiteHeader.tsx
// Fixed header: logo · The System ▾ · Results · Pricing · Resources · [Claim your market].
// "The System" opens a two-level, full-width panel (engines left, services right).
// ≤980px: burger → full-screen mobile nav with per-engine accordions (mobile.css).
import { useEffect, useRef, useState } from 'react';
import { PRIMARY, CTA, ENGINES, BOARDSUITE_TILE, DROPDOWN_FOOTER, getEngine, type EngineKey } from '~/lib/nav';

/** Legacy pageId values still passed by some routes → new nav ids. */
const ACTIVE_MAP: Record<string, string> = {
  system: 'system',
  services: 'system',
  boardsuite: 'system',
  approach: 'system',
  results: 'results',
  pricing: 'pricing',
  resources: 'resources',
};

interface SiteHeaderProps {
  /** BaseLayout pageId */
  active?: string;
  /** Kept for BaseLayout compatibility; the redesign has a single header theme. */
  theme?: 'light' | 'purple';
}

function Chevron({ dir = 'down', size = 12, stroke = 2.5, className }: { dir?: 'down' | 'right'; size?: number; stroke?: number; className?: string }) {
  const points = dir === 'down' ? '6 9 12 15 18 9' : '9 18 15 12 9 6';
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points={points} />
    </svg>
  );
}

function Arrow({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function SiteHeader({ active }: SiteHeaderProps) {
  const activeId = active ? ACTIVE_MAP[active] : undefined;

  // Desktop dropdown
  const [open, setOpen] = useState(false);
  const [engine, setEngine] = useState<EngineKey>('reach');
  const closeTimer = useRef<number | null>(null);

  // Mobile nav
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileEngine, setMobileEngine] = useState<EngineKey | null>(null);

  const clearTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openMenu = () => {
    clearTimer();
    if (!open) setEngine('reach'); // reset to BoardReach on every open
    setOpen(true);
  };
  const closeNow = () => { clearTimer(); setOpen(false); };
  const scheduleClose = () => {
    clearTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  // Escape closes either menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeNow(); setMobileOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll while the mobile nav is open; close on resize to desktop
  useEffect(() => {
    document.body.classList.toggle('nav-open', mobileOpen);
    if (!mobileOpen) return;
    const onResize = () => { if (window.innerWidth > 980) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); document.body.classList.remove('nav-open'); };
  }, [mobileOpen]);

  useEffect(() => () => clearTimer(), []);

  const cur = getEngine(engine);

  return (
    <header className="site-header" onMouseLeave={scheduleClose}>
      <div className="site-header-inner">
        <a href="/" className="site-logo" aria-label="Alloy Growth Partners — home">
          <img src="/assets/alloy-logo-full-color.svg" alt="Alloy Growth Partners" width={160} height={30} />
        </a>

        <nav className="site-nav-desktop" aria-label="Primary">
          {PRIMARY.map((item) =>
            item.dropdown ? (
              <a
                key={item.id}
                href={item.href}
                className={`site-nav-link${activeId === item.id ? ' is-active' : ''}${open ? ' is-open' : ''}`}
                onMouseEnter={openMenu}
                onFocus={openMenu}
                aria-haspopup="true"
                aria-expanded={open}
              >
                {item.label}
                <Chevron className="site-nav-chevron" />
              </a>
            ) : (
              <a key={item.id} href={item.href} className={`site-nav-link${activeId === item.id ? ' is-active' : ''}`} onMouseEnter={closeNow}>
                {item.label}
              </a>
            ),
          )}
          <a href={CTA.href} className="site-cta site-cta--desktop" onMouseEnter={closeNow}>{CTA.label}</a>
        </nav>

        <button
          type="button"
          className={`site-burger${mobileOpen ? ' is-open' : ''}`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="site-mobile-nav"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="site-burger-bars"><span /><span /><span /></span>
        </button>
      </div>

      {open && (
        <div className="site-menu" onMouseEnter={clearTimer} role="region" aria-label="The System">
          <div className="site-menu-bar"><span /><span /><span /><span /><span /></div>
          <div className="site-menu-inner">
            <div className="site-menu-left">
              <div className="site-menu-eyebrow">Three engines</div>
              {ENGINES.map((e) => (
                <a
                  key={e.key}
                  href={e.href}
                  className={`site-menu-engine${e.key === engine ? ' is-active' : ''}`}
                  onMouseEnter={() => setEngine(e.key)}
                  onFocus={() => setEngine(e.key)}
                >
                  <span className="site-menu-engine-main">
                    <span className="site-menu-engine-dot" style={{ background: e.color }} />
                    <span className="site-menu-engine-text">
                      <span className="site-menu-engine-title">{e.title}</span>
                      <span className="site-menu-engine-sub">{e.stage} · {e.sub}</span>
                    </span>
                  </span>
                  <span className="site-menu-engine-arrow" style={{ color: '#381c4f' }}><Chevron dir="right" size={16} stroke={2} /></span>
                </a>
              ))}
              <a href={BOARDSUITE_TILE.href} className="site-menu-tile">
                <span className="site-menu-tile-title">{BOARDSUITE_TILE.title}</span>
                <span className="site-menu-tile-sub">{BOARDSUITE_TILE.sub}</span>
              </a>
            </div>

            <div className="site-menu-right" key={cur.key}>
              <div className="site-menu-right-head">
                <div className="site-menu-right-eyebrow" style={{ color: cur.color }}>{cur.title} · {cur.stage}</div>
                <a href={cur.href} className="site-menu-overview">Engine overview <Arrow /></a>
              </div>
              <div className="site-menu-services">
                {cur.services.map((s) => (
                  <a key={s.href} href={s.href} className="site-menu-service">
                    <span className="site-menu-service-label">{s.label}</span>
                    <span className="site-menu-service-sub">{s.sub}</span>
                  </a>
                ))}
              </div>
              <div className="site-menu-foot">
                <div className="site-menu-foot-text">{DROPDOWN_FOOTER.text}</div>
                <a href={DROPDOWN_FOOTER.href} className="site-menu-foot-link">{DROPDOWN_FOOTER.cta} <Arrow /></a>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav id="site-mobile-nav" className={`site-mobile-nav${mobileOpen ? ' is-open' : ''}`} aria-label="Mobile" aria-hidden={!mobileOpen}>
        <div className="site-mobile-group">
          <div className="site-mobile-head">The System</div>
          {ENGINES.map((e) => {
            const expanded = mobileEngine === e.key;
            return (
              <div key={e.key}>
                <button
                  type="button"
                  className="site-mobile-engine-btn"
                  aria-expanded={expanded}
                  onClick={() => setMobileEngine(expanded ? null : e.key)}
                >
                  <span className="site-menu-engine-dot" style={{ background: e.color }} />
                  <span className="site-menu-engine-text">
                    <span className="site-menu-engine-title">{e.title}</span>
                    <span className="site-menu-engine-sub">{e.stage} · {e.sub}</span>
                  </span>
                  <Chevron size={16} stroke={2} />
                </button>
                {expanded && (
                  <div className="site-mobile-services">
                    <a href={e.href} className="site-mobile-overview">Engine overview →</a>
                    {e.services.map((s) => (
                      <a key={s.href} href={s.href}>{s.label}</a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <a href={BOARDSUITE_TILE.href} className="site-menu-tile site-mobile-tile">
            <span className="site-menu-tile-title">{BOARDSUITE_TILE.title}</span>
            <span className="site-menu-tile-sub">{BOARDSUITE_TILE.sub}</span>
          </a>
        </div>
        {PRIMARY.filter((i) => !i.dropdown).map((item) => (
          <a key={item.id} href={item.href} className={`site-mobile-link${activeId === item.id ? ' is-active' : ''}`}>
            {item.label}
            <Chevron dir="right" size={16} stroke={2} />
          </a>
        ))}
        <a href={CTA.href} className="rd-btn rd-btn--block site-mobile-cta">{CTA.label}</a>
      </nav>
    </header>
  );
}
