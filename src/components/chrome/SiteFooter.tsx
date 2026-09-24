// src/components/chrome/SiteFooter.tsx
// Purple footer: 6px five-color bar, brand column, BoardReach / BoardMatch+BoardRetain /
// Company / Resources columns, legal bar. Static markup — rendered server-side, no island.
import AccentBar from '~/components/AccentBar';
import { ENGINES, FOOTER, getEngine } from '~/lib/nav';

interface SiteFooterProps {
  animatedBar?: boolean;
}

export default function SiteFooter({ animatedBar = true }: SiteFooterProps) {
  const reach = getEngine('reach');
  const match = getEngine('match');
  const retain = getEngine('retain');
  const year = 2026;

  const engineLinks = (key: 'reach' | 'match' | 'retain') => {
    const e = ENGINES.find((x) => x.key === key)!;
    return e.services.map((s, i) => (
      <a key={s.href} href={s.href} className="site-footer-link">{FOOTER.engineLabels[key][i] ?? s.label}</a>
    ));
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
        </div>

        <div className="site-footer-col">
          <a href={reach.href} className="site-footer-head">BoardReach</a>
          {engineLinks('reach')}
        </div>

        <div className="site-footer-col">
          <a href={match.href} className="site-footer-head">BoardMatch</a>
          {engineLinks('match')}
          <a href={retain.href} className="site-footer-head site-footer-head--spaced">BoardRetain</a>
          {engineLinks('retain')}
        </div>

        <div className="site-footer-col">
          <div className="site-footer-head">Company</div>
          {FOOTER.company.map(([label, href]) => (
            <a key={href} href={href} className="site-footer-link">{label}</a>
          ))}
        </div>

        <div className="site-footer-col">
          <div className="site-footer-head">Resources</div>
          {FOOTER.resources.map(([label, href]) => (
            <a key={href} href={href} className="site-footer-link">{label}</a>
          ))}
        </div>
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
