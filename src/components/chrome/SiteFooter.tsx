// src/components/chrome/SiteFooter.tsx
// Purple footer: 6px five-color bar, brand column, BoardReach / BoardMatch+BoardRetain /
// Company / Resources columns, legal bar. Static markup — rendered server-side, no island.
// ≤720px (mobile-spec.md, frame 1h): the five link blocks become accordion rows (all collapsed,
// links stay in the DOM); the toggling is done by src/lib/mobile.ts, the collapse by mobile.css.
import AccentBar from '~/components/AccentBar';
import { CTA, ENGINES, FOOTER, getEngine, type EngineKey } from '~/lib/nav';

interface SiteFooterProps {
  animatedBar?: boolean;
}

type Link = [label: string, href: string];

function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/** One link column on desktop; one accordion row ≤720px. */
function Block({ id, title, href, links, overview }: { id: string; title: string; href?: string; links: Link[]; overview?: Link }) {
  return (
    <div className="site-footer-block">
      <div className="site-footer-head-row">
        {href ? <a href={href} className="site-footer-head">{title}</a> : <div className="site-footer-head">{title}</div>}
        <button type="button" className="site-footer-acc" aria-expanded="false" aria-controls={id} aria-label={`Show ${title} links`}>
          <Chevron />
        </button>
      </div>
      <div id={id} className="site-footer-links">
        {overview ? <a href={overview[1]} className="site-footer-link site-footer-link--overview">{overview[0]}</a> : null}
        {links.map(([label, l]) => (
          <a key={l} href={l} className="site-footer-link">{label}</a>
        ))}
      </div>
    </div>
  );
}

export default function SiteFooter({ animatedBar = true }: SiteFooterProps) {
  const year = 2026;

  const engineLinks = (key: EngineKey): Link[] => {
    const e = ENGINES.find((x) => x.key === key)!;
    return e.services.map((s, i) => [FOOTER.engineLabels[key][i] ?? s.label, s.href]);
  };
  const engineBlock = (key: EngineKey) => {
    const e = getEngine(key);
    return <Block id={`footer-${key}`} title={e.title.replace('™', '')} href={e.href} links={engineLinks(key)} overview={[`${e.title.replace('™', '')} overview`, e.href]} />;
  };

  return (
    <footer className="site-footer">
      <AccentBar height={6} animated={animatedBar} />
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <img src="/assets/alloy-logomark.svg" alt="" className="site-footer-mark" width={48} height={48} loading="lazy" />
          <div className="site-footer-tagline">{FOOTER.tagline}</div>
          <div className="site-footer-contact">
            {FOOTER.contact.map((line, i) => (
              <span key={i}>{line}{i < FOOTER.contact.length - 1 && <br />}</span>
            ))}
          </div>
          {/* mobile only (chrome.css hides it on desktop) */}
          <a href={CTA.href} className="rd-btn rd-btn--block site-footer-cta">{CTA.label}</a>
        </div>

        {engineBlock('reach')}

        <div className="site-footer-col site-footer-col--stack">
          {engineBlock('match')}
          {engineBlock('retain')}
        </div>

        <Block id="footer-company" title="Company" links={FOOTER.company} />
        <Block id="footer-resources" title="Resources" links={FOOTER.resources} />
      </div>
      <div className="site-footer-bottom">
        <span>© {year} Alloy Growth Partners · Exclusively growing CAM companies</span>
        <span className="site-footer-bottom-links">
          {FOOTER.legal.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </span>
      </div>
    </footer>
  );
}
