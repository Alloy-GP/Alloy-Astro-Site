// src/components/chrome/SiteHeader.tsx
// Hide-on-scroll-down / show-on-scroll-up header.
// Includes Services mega-menu (intro + 3-column by pillar), Approach mega-menu,
// Resources mega-menu, About mega-menu, and standard dropdowns.
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties } from 'react';
import Icon from '~/components/Icon';
import EngineLoop from '~/components/EngineLoop';
import { NAV } from '~/lib/nav';

// ── Search index — every navigable page on the site ────────────────────────
const SEARCH_INDEX = [
  { t: 'Our Approach',                h: '/our-approach',                                          g: 'Approach', k: 'system framework boardreach boardmatch boardretain attract close keep' },
  { t: 'BoardReach — Attract',        h: '/our-approach/boardreach',                               g: 'Approach', k: 'marketing seo demand generation leads attract' },
  { t: 'BoardMatch — Close',          h: '/our-approach/boardmatch',                               g: 'Approach', k: 'proposal rfp sales close win conversion' },
  { t: 'BoardRetain — Keep',          h: '/our-approach/boardretain',                              g: 'Approach', k: 'retention reputation board education renewal keep' },
  { t: 'BoardSuite',                  h: '/boardsuite',                                            g: 'Approach', k: 'platform suite tools software' },
  { t: 'CAM Marketing Services',      h: '/hoa-cam-marketing-services',                            g: 'Reach',    k: 'cam hoa marketing pillar service' },
  { t: 'Property Management SEO',     h: '/property-management-seo',                               g: 'Reach',    k: 'seo search engine optimization rankings google' },
  { t: 'Social Media Marketing',      h: '/services/social-media-marketing-for-hoa-management-companies', g: 'Reach', k: 'social media linkedin facebook instagram content' },
  { t: 'HOA Email Marketing',         h: '/boardreach/email-marketing',                            g: 'Reach',    k: 'email marketing nurture campaigns drip' },
  { t: 'Newsletter Production',       h: '/services/hoa-newsletter-production',                    g: 'Reach',    k: 'newsletter email content community' },
  { t: 'HOA Website Design',          h: '/boardreach/hoa-website-design',                         g: 'Reach',    k: 'website design development cam hoa site core web vitals' },
  { t: 'Branding for CAM',            h: '/boardreach/hoa-management-branding',                    g: 'Reach',    k: 'branding identity logo visual system' },
  { t: 'Print + Marketing Materials', h: '/boardreach/print-production',                           g: 'Reach',    k: 'print collateral brochures flyers proposals' },
  { t: 'Proposal Optimization',       h: '/boardmatch/proposal-optimization',                      g: 'Match',    k: 'proposal optimization rebuild template winrate' },
  { t: 'RFP Response (14-day)',        h: '/boardmatch/rfp-response-system',                        g: 'Match',    k: 'rfp response done for you sprint concierge' },
  { t: 'Sales Messaging',             h: '/boardmatch/sales-messaging',                            g: 'Match',    k: 'positioning sales narrative messaging pitch bd' },
  { t: 'Groundwork — Fractional BD',  h: '/groundwork',                                            g: 'Match',    k: 'groundwork business development fractional bd outbound' },
  { t: 'Thought Leadership',          h: '/boardretain/thought-leadership',                        g: 'Retain',   k: 'thought leadership essays speaking research industry voice' },
  { t: 'Reputation Management',       h: '/boardretain/reputation-management',                     g: 'Retain',   k: 'reputation reviews google ratings online presence' },
  { t: 'Board Education',             h: '/hoa-board-education-programs',                          g: 'Retain',   k: 'board education training homeowner workshops' },
  { t: 'Annual Report Production',    h: '/boardretain/annual-report-production',                  g: 'Retain',   k: 'annual report design board renewal' },
  { t: 'Courses',                     h: '/courses',                                               g: 'Retain',   k: 'courses training education learning' },
  { t: 'About Alloy',                 h: '/about',                                                 g: 'Company',  k: 'about team founders story' },
  { t: 'Testimonials',               h: '/about/testimonials',                                    g: 'Company',  k: 'testimonials reviews quotes partners' },
  { t: 'We Know CAM',                 h: '/we-know-cam',                                           g: 'Company',  k: 'we know cam expertise specialists experience' },
  { t: 'Results & Case Studies',      h: '/results',                                               g: 'Company',  k: 'results case studies portfolio outcomes proof' },
  { t: 'Careers',                     h: '/careers',                                               g: 'Company',  k: 'careers jobs hiring team join' },
  { t: 'Partners',                    h: '/partners',                                              g: 'Company',  k: 'partners partnerships referral network' },
  { t: 'Resource Hub',                h: '/resource-hub',                                          g: 'Resources', k: 'resources guides articles library knowledge' },
  { t: 'FAQ',                         h: '/faq',                                                   g: 'Resources', k: 'faq questions answers help support' },
  { t: 'Get Started',                  h: '/get-started',                                          g: 'Resources', k: 'get started strategic review request audit assessment consultation' },
  { t: 'Contact',                     h: '/contact',                                               g: 'Resources', k: 'contact email phone reach out' },
] as const;

type SearchItem = { t: string; h: string; g: string; k: string };

// ── Search icon ─────────────────────────────────────────────────────────────
function SearchIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ── Search modal (portaled to document.body) ─────────────────────────────────
function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const results = useMemo<SearchItem[]>(() => {
    const term = q.trim().toLowerCase();
    if (!term) return (SEARCH_INDEX as unknown as SearchItem[]).slice(0, 12);
    const tokens = term.split(/\s+/);
    const scored = (SEARCH_INDEX as unknown as SearchItem[]).map(item => {
      const hay = (item.t + ' ' + item.g + ' ' + item.k).toLowerCase();
      let score = 0;
      for (const tok of tokens) {
        if (item.t.toLowerCase().startsWith(tok)) score += 10;
        else if (item.t.toLowerCase().includes(tok)) score += 6;
        else if (hay.includes(tok)) score += 2;
        else return null;
      }
      return { item, score };
    }).filter((x): x is { item: SearchItem; score: number } => x !== null);
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 20).map(s => s.item);
  }, [q]);

  useEffect(() => { setActive(0); }, [q]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') {
      const hit = results[active];
      if (hit) { window.location.href = hit.h; }
    }
  };

  const grouped: Record<string, SearchItem[]> = {};
  results.forEach(r => { (grouped[r.g] = grouped[r.g] || []).push(r); });

  if (!open) return null;
  let runningIdx = -1;

  const modal = (
    <div className="alloy-search-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Site search">
      <div className="alloy-search-modal" onClick={e => e.stopPropagation()}>
        <div className="alloy-search-input-row">
          <span className="alloy-search-input-icon"><SearchIcon size={20} /></span>
          <input
            ref={inputRef}
            type="text"
            className="alloy-search-input"
            placeholder="Search services, pages, topics…"
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
          />
          <button className="alloy-search-close" onClick={onClose} aria-label="Close search">
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', opacity: 0.55, marginRight: 8 }}>ESC</span>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="alloy-search-results">
          {results.length === 0 ? (
            <div className="alloy-search-empty">
              No matches for &ldquo;{q}&rdquo;.<br />
              <span style={{ opacity: 0.6 }}>Try &ldquo;proposal&rdquo;, &ldquo;seo&rdquo;, &ldquo;newsletter&rdquo;, or &ldquo;rfp&rdquo;.</span>
            </div>
          ) : (
            Object.keys(grouped).map(g => (
              <div key={g} className="alloy-search-group">
                <div className="alloy-search-group-label">{g}</div>
                {(grouped[g] ?? []).map(item => {
                  runningIdx++;
                  const isActive = runningIdx === active;
                  const idx = runningIdx;
                  return (
                    <a
                      key={item.h}
                      href={item.h}
                      className={`alloy-search-hit${isActive ? ' is-active' : ''}`}
                      onMouseEnter={() => setActive(idx)}
                    >
                      <span className="alloy-search-hit-title">{item.t}</span>
                      <span className="alloy-search-hit-arrow" aria-hidden="true">↵</span>
                    </a>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className="alloy-search-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

// Small icon set used in the mega panels (Resources, About, Services).
// Inline SVGs so we have no additional bundle dependency.
function ResourceIcon({ name }: { name: string }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'library':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="4" height="16" rx="0.5" />
          <rect x="9" y="4" width="4" height="16" rx="0.5" />
          <path d="M16.5 5.2L20 6 17.5 19.8 14 19" />
        </svg>
      );
    case 'graduation':
      return (
        <svg {...props}>
          <path d="M2 9l10-5 10 5-10 5L2 9z" />
          <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
          <path d="M22 9v5" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...props}>
          <path d="M3 21V3" />
          <path d="M3 21h18" />
          <path d="M7 17V12" />
          <path d="M11 17V8" />
          <path d="M15 17v-7" />
          <path d="M19 17V6" />
        </svg>
      );
    case 'help':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.3 9.3a2.7 2.7 0 1 1 3.7 3.4c-0.7 0.4-1 1-1 1.7" />
          <circle cx="12" cy="17.2" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'megaphone':
      return (
        <svg {...props}>
          <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
          <path d="M14 8.5a4 4 0 0 1 0 7" />
          <path d="M17 6a7 7 0 0 1 0 12" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4.5 4.5" />
          <path d="M9 9.5a3 3 0 0 1 4 0" />
        </svg>
      );
    case 'handshake':
      return (
        <svg {...props}>
          <path d="M3 11l4-4 3 2 3-2 4 4-2 2-2-2-3 3-3-3z" />
          <path d="M14 13l3 3 3-3" />
          <path d="M4 13l3 3" />
        </svg>
      );
    case 'newsletter':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="M3 9h18" />
          <path d="M7 13h7" />
          <path d="M7 16h5" />
          <path d="M16 13h2" />
          <path d="M16 16h2" />
        </svg>
      );
    case 'social':
      return (
        <svg {...props}>
          <circle cx="6" cy="7" r="2.5" />
          <circle cx="18" cy="7" r="2.5" />
          <circle cx="12" cy="17" r="2.5" />
          <path d="M8 8.5l3 6" />
          <path d="M16 8.5l-3 6" />
        </svg>
      );
    case 'layout':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="1.5" />
          <path d="M3 9h18" />
          <path d="M9 9v12" />
        </svg>
      );
    case 'file-sig':
      return (
        <svg {...props}>
          <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
          <path d="M14 3v5h5" />
          <path d="M8 15l2 1.5 2-3 2 3 1.5-1.5" />
        </svg>
      );
    case 'archive':
      return (
        <svg {...props}>
          <rect x="2" y="4" width="20" height="4" rx="1" />
          <path d="M4 8v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8" />
          <path d="M10 13h4" />
        </svg>
      );
    case 'feather':
      return (
        <svg {...props}>
          <path d="M20.24 4.76a6 6 0 0 0-8.49 0L4 12.51V20h7.49l7.75-7.75a6 6 0 0 0 0-8.49z" />
          <path d="M16 8L2 22" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...props}>
          <path d="M12 3L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'edit':
      return (
        <svg {...props}>
          <path d="M11 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
          <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z" />
        </svg>
      );
    case 'users':
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'map-pin':
      return (
        <svg {...props}>
          <path d="M12 2C8.7 2 6 4.7 6 8c0 4.5 6 13 6 13s6-8.5 6-13c0-3.3-2.7-6-6-6z" />
          <circle cx="12" cy="8" r="2.2" />
        </svg>
      );
    case 'zap':
      return (
        <svg {...props}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case 'calculator':
      return (
        <svg {...props}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <rect x="7" y="5" width="10" height="4" rx="0.5" />
          <circle cx="8" cy="13" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none" />
          <circle cx="16" cy="13" r="1" fill="currentColor" stroke="none" />
          <circle cx="8" cy="17" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
          <circle cx="16" cy="17" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export interface SiteHeaderProps {
  /**
   * Top-level nav id to highlight as the active page.
   * One of: services, boardsuite, approach, resources, about
   */
  active?: string;
  /**
   * Visual theme. 'light' (default) = white/translucent; 'purple' = purple-deep
   * background with white nav.
   */
  theme?: 'light' | 'purple';
}

export default function SiteHeader({ active, theme = 'light' }: SiteHeaderProps) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > 120 && y > lastY.current) {
        setHidden(true);
      } else if (y < lastY.current - 4) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cmd-K / Ctrl-K keyboard shortcut opens search modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(s => !s);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Close mega menu and mobile nav on Astro View Transitions page navigation.
  useEffect(() => {
    const onPageLoad = () => {
      setOpenMenu(null);
      setMobileOpen(false);
      setMenuClosing(false);
    };
    document.addEventListener('astro:page-load', onPageLoad);
    return () => document.removeEventListener('astro:page-load', onPageLoad);
  }, []);

  // Close on Escape, on click outside header, or when cursor leaves both the
  // header band AND the open mega panel rect.
  const openMenuRef = useRef<string | null>(null);
  useEffect(() => {
    openMenuRef.current = openMenu;
  }, [openMenu]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
        setMenuClosing(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!openMenuRef.current) return;
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      const header = t.closest('.site-header');
      const mega =
        t.closest('.nav-mega') ||
        t.closest('.nav-mega-services') ||
        t.closest('.nav-mega-resources') ||
        t.closest('.nav-mega-about');
      if (!header && !mega) setOpenMenu(null);
    };
    let closeTimer: ReturnType<typeof setTimeout> | null = null;
    const onMove = (e: MouseEvent) => {
      if (!openMenuRef.current) return;
      const header = document.querySelector('.site-header');
      const mega = document.querySelector(
        '.nav-mega-services, .nav-mega, .nav-mega-resources, .nav-mega-about'
      );
      const x = e.clientX;
      const y = e.clientY;
      const inHeader =
        !!header &&
        (() => {
          const r = (header as HTMLElement).getBoundingClientRect();
          return x >= r.left && x <= r.right && y >= r.top - 4 && y <= r.bottom + 4;
        })();
      const inMega =
        !!mega &&
        (() => {
          const r = (mega as HTMLElement).getBoundingClientRect();
          return x >= r.left - 8 && x <= r.right + 8 && y >= r.top - 12 && y <= r.bottom + 8;
        })();
      if (inHeader || inMega) {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
      } else if (!closeTimer) {
        closeTimer = setTimeout(() => {
          closeTimer = null;
          if (openMenuRef.current) setOpenMenu(null);
        }, 120);
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    document.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      document.removeEventListener('mousemove', onMove);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, []);

  return (
    <header
      className={`site-header site-header--${theme} ${hidden ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''}`}
    >
      <div className="site-header-inner">
        <a className="site-logo" href="/">
          <img src="/assets/alloy-logo-full-color.svg" alt="Alloy Growth Partners" width={101} height={32} />
        </a>

        <nav className="site-nav-desktop" aria-label="Primary">
          {NAV.map((it) => {
            const hasFlyout = !!(
              it.children ||
              it.megaServices ||
              it.megaResources ||
              it.megaAbout
            );
            const hasMega = !!(it.mega || it.megaServices || it.megaResources || it.megaAbout);
            return (
              <div
                key={it.id}
                className={`nav-item-wrap ${hasMega ? 'has-mega' : ''}`}
                onMouseEnter={() => setOpenMenu(hasFlyout ? it.id : null)}
              >
                <a
                  href={it.href}
                  className={`site-nav-link ${active === it.id ? 'active' : ''} ${openMenu === it.id ? 'is-open' : ''}`}
                  {...(hasFlyout ? { 'aria-haspopup': 'true' } : {})}
                  {...(openMenu === it.id ? { 'aria-expanded': 'true' } : {})}
                >
                  {it.label}
                  {hasFlyout && (
                    <svg
                      className="caret"
                      width="11"
                      height="7"
                      viewBox="0 0 11 7"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 1L5.5 5.5L10 1"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </a>

                {hasFlyout && openMenu === it.id && (
                  it.megaServices && it.pillars ? (
                    // ── Services mega panel ──────────────────────────────────
                    <div className="nav-mega-services" role="menu">
                      <div className="nav-mega-services-inner">
                        <div className="nav-mega-services-intro">
                          <div className="nav-mega-services-eyebrow">Services</div>
                          <h3 className="nav-mega-services-headline">
                            Three engines.<br />One growth playbook.
                          </h3>
                          <p className="nav-mega-services-introsub">
                            Each service ladders into a connected system — built only for CAM
                            management companies.
                          </p>
                          <a href="/services" className="nav-mega-services-overview">
                            See all services →
                          </a>
                        </div>
                        <div className="nav-mega-services-groups">
                          {it.pillars.map((p) => (
                            <div key={p.pillar} className="nav-mega-services-group">
                              <a href={p.href} className="nav-mega-services-grouphead-link">
                                <span
                                  className="nav-mega-services-pillardot"
                                  style={{ background: p.color } as CSSProperties}
                                  aria-hidden="true"
                                />
                                <span className="nav-mega-services-grouphead-stack">
                                  <span
                                    className="nav-mega-services-stage"
                                    style={{ color: p.color } as CSSProperties}
                                  >
                                    {p.stageWord.toUpperCase()}
                                  </span>
                                  <span className="nav-mega-services-grouphead">
                                    {p.title}
                                  </span>
                                </span>
                              </a>
                              <div className="nav-mega-services-items">
                                {p.items.map((c) => (
                                  <a
                                    key={c.href}
                                    href={c.href}
                                    className="nav-mega-services-item"
                                    role="menuitem"
                                  >
                                    {c.icon ? (
                                      <span
                                        className="nav-mega-services-itemicon"
                                        style={
                                          {
                                            color: p.color,
                                            background: p.color + '1F',
                                          } as CSSProperties
                                        }
                                        aria-hidden="true"
                                      >
                                        <ResourceIcon name={c.icon} />
                                      </span>
                                    ) : (
                                      <span
                                        className="nav-mega-services-itemdot"
                                        style={{ background: p.color } as CSSProperties}
                                        aria-hidden="true"
                                      />
                                    )}
                                    <div className="nav-mega-services-item-body">
                                      <div className="nav-mega-services-item-head">
                                        <span className="nav-mega-services-item-title">
                                          {c.label}
                                        </span>
                                        {c.isNew && (
                                          <span className="nav-mega-services-new">New</span>
                                        )}
                                      </div>
                                      {c.subtitle && (
                                        <div className="nav-mega-services-item-sub">
                                          {c.subtitle}
                                        </div>
                                      )}
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : it.mega && it.children ? (
                    // ── Our Approach mega panel ──────────────────────────────
                    <div className="nav-mega" role="menu">
                      <div className="nav-mega-intro">
                        <div className="nav-mega-eyebrow">The Alloy System</div>
                        <h3 className="nav-mega-headline">
                          Three engines.
                          <br />
                          One playbook.
                        </h3>
                        <p className="nav-mega-sub">
                          Attract, close, and keep — engineered as one connected system, not three
                          disconnected agencies.
                        </p>
                        <a href="/our-approach" className="nav-mega-overview">
                          See the whole system →
                        </a>
                      </div>
                      <div className="nav-mega-cards">
                        {it.children.map((c) => (
                          <a
                            key={c.href}
                            href={c.href}
                            className="nav-mega-card"
                            role="menuitem"
                          >
                            <div className="nav-mega-card-icon">
                              <EngineLoop
                                {...(c.pillar ? { pillar: c.pillar } : {})}
                                active={true}
                                size={44}
                              />
                            </div>
                            <div className="nav-mega-card-body">
                              <div className="nav-mega-card-head">
                                <span
                                  className="nav-mega-stage"
                                  style={{ color: c.color } as CSSProperties}
                                >
                                  {c.stageWord}
                                </span>
                              </div>
                              <div className="nav-mega-title">{c.label}</div>
                              <div className="nav-mega-sub-2">{c.subtitle}</div>
                            </div>
                            <div className="nav-mega-arrow" aria-hidden="true">→</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : it.megaResources && it.items ? (
                    // ── Resources mega panel ─────────────────────────────────
                    <div className="nav-mega-resources" role="menu">
                      <div className="nav-mega-resources-inner">
                        <div className="nav-mega-resources-grid">
                          <div className="nav-mega-resources-eyebrow">Resources</div>
                          <h3 className="nav-mega-resources-headline">
                            Sharper boards.<br />Faster CAM teams.
                          </h3>
                          <p className="nav-mega-resources-sub">
                            Frameworks, training, and proof points — built for the way community
                            management actually works.
                          </p>
                          <div className="nav-mega-resources-items">
                            {it.items.map((c) => (
                              <a
                                key={c.href}
                                href={c.href}
                                className="nav-mega-resources-item"
                                role="menuitem"
                              >
                                <span className="nav-mega-resources-itemicon" aria-hidden="true">
                                  {c.icon && <ResourceIcon name={c.icon} />}
                                </span>
                                <div className="nav-mega-resources-item-body">
                                  <div className="nav-mega-resources-item-title">{c.label}</div>
                                  <div className="nav-mega-resources-item-sub">{c.subtitle}</div>
                                </div>
                                <span className="nav-mega-resources-itemarrow" aria-hidden="true">
                                  →
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                        {it.feature && (
                          <a
                            href={it.feature.href}
                            className="nav-mega-resources-feature"
                            role="menuitem"
                            style={
                              {
                                '--feature-bg': 'url(/assets/trust-building-fistbump.webp)',
                              } as CSSProperties
                            }
                          >
                            <div className="nav-mega-resources-feature-eyebrow">
                              {it.feature.eyebrow}
                            </div>
                            <div className="nav-mega-resources-feature-titlewrap">
                              <h4 className="nav-mega-resources-feature-title">
                                {it.feature.title}
                              </h4>
                            </div>
                            <p className="nav-mega-resources-feature-sub">{it.feature.sub}</p>
                            <div className="nav-mega-resources-feature-tag">{it.feature.tag}</div>
                            <span className="nav-mega-resources-feature-cta">
                              {it.feature.cta} →
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : it.megaAbout && it.items ? (
                    // ── About mega panel ─────────────────────────────────────
                    <div className="nav-mega-about" role="menu">
                      <div className="nav-mega-about-inner">
                        <div className="nav-mega-about-grid">
                          <div className="nav-mega-about-eyebrow">About Alloy</div>
                          <h3 className="nav-mega-about-headline">
                            Operators who built<br />the playbook.
                          </h3>
                          <p className="nav-mega-about-sub">
                            We grew CAM portfolios before we built the agency. Every page on this
                            site is something we&apos;d want as an operator.
                          </p>
                          <div className="nav-mega-about-items">
                            {it.items.map((c) => (
                              <a
                                key={c.href}
                                href={c.href}
                                className="nav-mega-about-item"
                                role="menuitem"
                              >
                                <span className="nav-mega-about-itemicon" aria-hidden="true">
                                  {c.icon && <ResourceIcon name={c.icon} />}
                                </span>
                                <div className="nav-mega-about-item-body">
                                  <div className="nav-mega-about-item-title">{c.label}</div>
                                  <div className="nav-mega-about-item-sub">{c.subtitle}</div>
                                </div>
                                <span className="nav-mega-about-itemarrow" aria-hidden="true">
                                  →
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                        {it.feature && (
                          <a
                            href={it.feature.href}
                            className="nav-mega-about-feature"
                            role="menuitem"
                          >
                            <div className="nav-mega-about-feature-eyebrow">
                              {it.feature.eyebrow}
                            </div>
                            <div
                              className="nav-mega-about-feature-stars"
                              aria-label="5 out of 5 stars"
                            >
                              <span aria-hidden="true">★★★★★</span>
                            </div>
                            <div
                              className="nav-mega-about-feature-quotemark"
                              aria-hidden="true"
                            >
                              &ldquo;
                            </div>
                            <p className="nav-mega-about-feature-quote">{it.feature.quote}</p>
                            <div className="nav-mega-about-feature-attrib">
                              <div className="nav-mega-about-feature-name">{it.feature.name}</div>
                              <div className="nav-mega-about-feature-role">{it.feature.role}</div>
                            </div>
                            <span className="nav-mega-about-feature-cta">
                              {it.feature.cta} →
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : it.children ? (
                    // ── Plain dropdown (fallback) ─────────────────────────────
                    <div className="nav-dropdown" role="menu">
                      {it.children.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          role="menuitem"
                          className="nav-dropdown-item"
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  ) : null
                )}
              </div>
            );
          })}
        </nav>

        <div className="site-header-cta">
          <button
            className="site-header-search"
            onClick={() => setSearchOpen(true)}
            aria-label="Search site (⌘K)"
            title="Search (⌘K)"
          >
            <SearchIcon size={18} />
          </button>
          <a href="/get-started" className="btn btn-primary btn-sm btn-arrow">
            Claim Your Market
          </a>
          <a
            href="https://growth.alloygp.co"
            className="site-header-login"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Log in to your Alloy account"
          >
            <img
              src="/assets/alloy-logomark.svg"
              alt=""
              width={22}
              height={22}
              className="site-header-login-icon"
            />
            <span>Log in</span>
          </a>
        </div>

        <button
          type="button"
          className={`site-header-burger${(mobileOpen && !menuClosing) ? ' is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => {
            if (mobileOpen) {
              setMenuClosing(true);
              setTimeout(() => { setMobileOpen(false); setMenuClosing(false); }, 280);
            } else {
              setMobileOpen(true);
            }
          }}
        >
          <span className="burger-bar burger-bar-1" />
          <span className="burger-bar burger-bar-2" />
          <span className="burger-bar burger-bar-3" />
        </button>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {(mobileOpen || menuClosing) && (
        <div className={`site-nav-mobile${menuClosing ? ' is-closing' : ' is-open'}`}>
          {NAV.map((it) => {
            const mobileChildren =
              it.megaServices && it.pillars
                ? it.pillars.flatMap((p) => [
                    { label: p.title, href: p.href, isPillar: true, isNew: false },
                    ...p.items.map((c) => ({ ...c, isPillar: false })),
                  ])
                : it.megaResources || it.megaAbout
                ? (it.items ?? []).map((c) => ({ ...c, isPillar: false, isNew: false }))
                : it.children
                ? it.children.map((c) => ({ ...c, isPillar: false }))
                : null;
            return (
              <div key={it.id} className="mobile-section">
                <a href={it.href} className="mobile-section-title">
                  {it.label}
                </a>
                {mobileChildren && (
                  <div className="mobile-children">
                    {mobileChildren.map((c, i) => (
                      <a
                        key={c.href + i}
                        href={c.href}
                        className={c.isPillar ? 'mobile-child-pillar' : ''}
                      >
                        {c.label}
                        {c.isNew && <span className="mobile-child-new">New</span>}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <a href="/get-started" className="btn btn-primary mobile-cta">
            Claim Your Market
          </a>
          <a href="https://growth.alloygp.co" className="mobile-login-link" target="_blank" rel="noopener noreferrer">
            Log in to your account →
          </a>
        </div>
      )}
    </header>
  );
}
