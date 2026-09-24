// src/components/chrome/SiteFooter.tsx
// Footer v2 — 6 layout variants (default: stacked).
// Active layout switches at runtime via a custom "alloy:tweaks" event
// (dispatched by the Tweaks dev panel) carrying { footerLayout: string }.
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import AccentBar from '~/components/AccentBar';

// ── Site link inventory ───────────────────────────────────────────────────────
interface NavSection {
  label: string;
  accent: string;
  items: { label: string; href: string }[];
}

const INVENTORY: {
  reach: NavSection; match: NavSection; retain: NavSection;
  company: NavSection; resources: NavSection;
} = {
  reach: {
    label: 'Attract — BoardReach',
    accent: '#FFCD3C',
    items: [
      { label: 'CAM Marketing',               href: '/hoa-cam-marketing-services' },
      { label: 'SEO + AI Search',             href: '/property-management-seo' },
      { label: 'Social Media Marketing',      href: '/services/social-media-marketing-for-hoa-management-companies' },
      { label: 'HOA Email Marketing',         href: '/boardreach/email-marketing' },
      { label: 'Newsletter Production',       href: '/services/hoa-newsletter-production' },
      { label: 'HOA Website Design',          href: '/boardreach/hoa-website-design' },
      { label: 'Branding for CAM',            href: '/boardreach/hoa-management-branding' },
      { label: 'Print + Marketing Materials', href: '/boardreach/print-production' },
      { label: 'Lead Generation',             href: '/boardreach/property-management-lead-generation' },
    ],
  },
  match: {
    label: 'Close — BoardMatch',
    accent: '#FF5C8A',
    items: [
      { label: 'Proposal Optimization', href: '/boardmatch/proposal-optimization' },
      { label: 'RFP Response',          href: '/boardmatch/rfp-response-system' },
      { label: 'Sales Messaging',       href: '/boardmatch/sales-messaging' },
      { label: 'Groundwork BD',         href: '/groundwork' },
    ],
  },
  retain: {
    label: 'Keep — BoardRetain',
    accent: '#5BC8B8',
    items: [
      { label: 'Thought Leadership',       href: '/boardretain/thought-leadership' },
      { label: 'Reputation Management',    href: '/boardretain/reputation-management' },
      { label: 'Annual Report Production', href: '/boardretain/annual-report-production' },
      { label: 'Board Education',          href: '/hoa-board-education-programs' },
      { label: 'Courses',                  href: '/courses' },
    ],
  },
  company: {
    label: 'Company',
    accent: '#FFFFFF',
    items: [
      { label: 'About',         href: '/about' },
      { label: 'Pricing',       href: '/pricing' },
      { label: 'Testimonials',  href: '/about/testimonials' },
      { label: 'We Know CAM',   href: '/we-know-cam' },
      { label: 'Our Approach',  href: '/our-approach' },
      { label: 'BoardSuite',    href: '/boardsuite' },
      { label: 'Results',       href: '/results' },
      { label: 'Careers',       href: '/careers' },
      { label: 'Partners',      href: '/partners' },
    ],
  },
  resources: {
    label: 'Resources',
    accent: '#FFFFFF',
    items: [
      { label: 'Resource Hub',     href: '/resource-hub' },
      { label: 'Case Studies',     href: '/results' },
      { label: 'Courses',          href: '/courses' },
      { label: 'Growth Modeled',   href: '/growth-modeled' },
      { label: 'FAQ',              href: '/faq' },
      { label: 'Strategic Review', href: '/strategic-review-request' },
      { label: 'Contact',          href: '/contact' },
    ],
  },
};

// ── Content cards (heavy-hitter links shown in some layouts) ──────────────────
const CONTENT_CARDS = [
  { eyebrow: 'Guide',      t: 'The CAM Growth Playbook',        href: '/resource-hub',             desc: 'How CAM operators build durable demand without burning out their team.' },
  { eyebrow: 'Case Study', t: 'Apex CMG · 47% pipeline growth', href: '/results/apex-cmg',         desc: 'From referral-only to engineered growth in 9 months.' },
  { eyebrow: 'Tool',       t: 'Strategic Review',               href: '/strategic-review-request', desc: '60-minute audit of your growth engine. No pitch.' },
  { eyebrow: 'Article',    t: 'Why CAM is winnable',            href: '/we-know-cam',              desc: 'What incumbents miss about how boards actually buy.' },
];

// ── Shared sub-components ─────────────────────────────────────────────────────
function FooterBrand() {
  return (
    <div>
      <img
        src="/assets/alloy-logomark.svg"
        alt="Alloy Growth Partners"
        width={70}
        height={64}
        style={{ width: 70, height: 'auto' }}
      />
      <div className="site-footer-tagline-eyebrow" style={{ marginTop: 22 }}>The Alloy promise</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: 380 }}>
        Growth <span style={{ color: 'var(--alloy-pink)' }}>engineered</span><br />
        exclusively for CAM.
      </div>
      <div style={{ fontSize: 13, opacity: 0.72, marginTop: 18, lineHeight: 1.7, maxWidth: 380 }}>
        The dedicated growth partner for community association management firms. Marketing, sales,
        and retention engineered into one connected system — exclusively for CAM operators.
      </div>
      <div style={{ fontSize: 12, opacity: 0.55, marginTop: 18, lineHeight: 1.7, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
        Austin, TX · Serving CAM nationwide<br />
        <a href="mailto:contact@alloygp.co">contact@alloygp.co</a> · <a href="tel:+12108455989">210-845-5989</a><br />
        BBB Accredited · CAI Member
      </div>
    </div>
  );
}

function FooterColumn({ section, dense = false }: { section: NavSection; dense?: boolean }) {
  return (
    <div>
      <div
        className="site-footer-col-title"
        style={{ color: section.accent !== '#FFFFFF' ? section.accent : 'var(--alloy-yellow)' } as CSSProperties}
      >
        {section.label}
      </div>
      <ul {...(dense ? { style: { gap: 9 } as CSSProperties } : {})}>
        {section.items.map((it, i) => (
          <li key={i}><a href={it.href}>{it.label}</a></li>
        ))}
      </ul>
    </div>
  );
}

function ContentCardRow({ cards = CONTENT_CARDS, max = 4 }: { cards?: typeof CONTENT_CARDS; max?: number }) {
  return (
    <div className="alloy-footer-cards">
      {cards.slice(0, max).map(c => (
        <a key={c.href + c.t} href={c.href} className="alloy-footer-card">
          <div className="alloy-footer-card-eyebrow">{c.eyebrow}</div>
          <div className="alloy-footer-card-title">{c.t}</div>
          <div className="alloy-footer-card-desc">{c.desc}</div>
          <span className="alloy-footer-card-cta">Read <span aria-hidden="true">→</span></span>
        </a>
      ))}
    </div>
  );
}

// ── Layout variants ───────────────────────────────────────────────────────────
function LayoutStacked() {
  return (
    <div className="alloy-footer-stacked">
      <div className="alloy-footer-stacked-row1">
        <div><FooterBrand /></div>
        <FooterColumn section={INVENTORY.reach}  dense />
        <FooterColumn section={INVENTORY.match}  dense />
        <FooterColumn section={INVENTORY.retain} dense />
      </div>
      <div className="alloy-footer-stacked-divider" />
      <div className="alloy-footer-stacked-row2">
        <FooterColumn section={INVENTORY.company}   dense />
        <FooterColumn section={INVENTORY.resources} dense />
        <div className="alloy-footer-stacked-cards">
          <ContentCardRow max={2} />
        </div>
      </div>
    </div>
  );
}

function LayoutEngines() {
  return (
    <div className="alloy-footer-engines">
      <div className="alloy-footer-brand-cell"><FooterBrand /></div>
      <FooterColumn section={INVENTORY.reach}  dense />
      <FooterColumn section={INVENTORY.match}  dense />
      <FooterColumn section={INVENTORY.retain} dense />
      <div className="alloy-footer-meta-cell">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 } as CSSProperties}>
          <FooterColumn section={INVENTORY.company}   dense />
          <FooterColumn section={INVENTORY.resources} dense />
        </div>
      </div>
    </div>
  );
}

function LayoutSitemap() {
  return (
    <div className="alloy-footer-sitemap">
      <div className="alloy-footer-brand-cell"><FooterBrand /></div>
      <div className="alloy-footer-cols-5">
        <FooterColumn section={INVENTORY.reach}     dense />
        <FooterColumn section={INVENTORY.match}     dense />
        <FooterColumn section={INVENTORY.retain}    dense />
        <FooterColumn section={INVENTORY.company}   dense />
        <FooterColumn section={INVENTORY.resources} dense />
      </div>
    </div>
  );
}

function LayoutEditorial() {
  const engines = [INVENTORY.reach, INVENTORY.match, INVENTORY.retain];
  return (
    <div className="alloy-footer-editorial">
      <div><FooterBrand /></div>
      <div className="alloy-footer-editorial-services">
        <div className="site-footer-col-title" style={{ marginBottom: 22 }}>What we do</div>
        {engines.map(sec => (
          <div
            key={sec.label}
            style={{ paddingTop: 18, marginTop: 18, borderTop: '1px solid rgba(255,255,255,0.10)' } as CSSProperties}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 } as CSSProperties}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: sec.accent, flexShrink: 0 } as CSSProperties} />
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: '-0.005em' }}>
                {sec.label}
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px 14px' }}>
              {sec.items.map((it, i) => (
                <a key={i} href={it.href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', padding: '4px 0' }}>
                  {it.label}
                  {i < sec.items.length - 1 && <span style={{ opacity: 0.3, marginLeft: 14 }}>·</span>}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="alloy-footer-editorial-meta">
        <FooterColumn section={INVENTORY.company} dense />
        <div style={{ marginTop: 32 }}>
          <FooterColumn section={INVENTORY.resources} dense />
        </div>
      </div>
    </div>
  );
}

function LayoutAnchored() {
  return (
    <div className="alloy-footer-anchored">
      <div className="alloy-footer-anchored-brand"><FooterBrand /></div>
      <div className="alloy-footer-anchored-right">
        <div className="alloy-footer-anchored-cols">
          <FooterColumn section={INVENTORY.reach}     dense />
          <FooterColumn section={INVENTORY.match}     dense />
          <FooterColumn section={INVENTORY.retain}    dense />
          <FooterColumn section={INVENTORY.company}   dense />
          <FooterColumn section={INVENTORY.resources} dense />
        </div>
        <div className="alloy-footer-anchored-cardrow">
          <div className="alloy-footer-anchored-cardrow-label">Heavy hitters</div>
          <ContentCardRow />
        </div>
      </div>
    </div>
  );
}

function LayoutMagazine() {
  return (
    <div className="alloy-footer-magazine">
      <div className="alloy-footer-magazine-grid">
        <a href="/our-approach" className="alloy-footer-magazine-feature">
          <div className="alloy-footer-magazine-feature-eyebrow">The Alloy System</div>
          <div className="alloy-footer-magazine-feature-title">
            One growth engine.<br />Three connected modes.
          </div>
          <div className="alloy-footer-magazine-feature-modes">
            <span style={{ color: '#FFCD3C' }}>Reach</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ color: '#FF5C8A' }}>Match</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ color: '#5BC8B8' }}>Retain</span>
          </div>
          <span className="alloy-footer-magazine-feature-cta">
            Explore the system <span aria-hidden="true">→</span>
          </span>
        </a>
        <FooterColumn section={INVENTORY.reach}  dense />
        <FooterColumn section={INVENTORY.match}  dense />
        <FooterColumn section={INVENTORY.retain} dense />
      </div>
      <div className="alloy-footer-magazine-divider" />
      <div className="alloy-footer-magazine-bottom">
        <div className="alloy-footer-magazine-brand"><FooterBrand /></div>
        <div className="alloy-footer-magazine-meta">
          <FooterColumn section={INVENTORY.company}   dense />
          <FooterColumn section={INVENTORY.resources} dense />
        </div>
      </div>
    </div>
  );
}

// ── Newsletter signup ─────────────────────────────────────────────────────────
type Status = 'idle' | 'submitting' | 'ok' | 'err';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus('err');
      setMsg('Enter a valid email address.');
      return;
    }
    setStatus('submitting');
    try {
      const fd = new FormData();
      fd.append('email', email);
      const res = await fetch('/api/subscribe', { method: 'POST', body: fd });
      const json = await res.json() as { error?: string };
      if (res.ok) {
        setStatus('ok');
        setMsg("You're in. First Alloy briefing lands soon.");
        setEmail('');
      } else {
        setStatus('err');
        setMsg(json.error ?? 'Something went wrong. Try again?');
      }
    } catch {
      setStatus('err');
      setMsg("Couldn't reach the list. Try again in a moment.");
    }
  };

  return (
    <div className="site-footer-newsletter">
      <div className="site-footer-newsletter-pitch">
        <div className="site-footer-tagline-eyebrow">The Alloy briefing</div>
        <h3>CAM growth, engineered — in your inbox.</h3>
        <p>
          Field-tested plays on attract, close, and keep. One short email, every other Tuesday.
          No fluff, no spam, unsubscribe anytime.
        </p>
      </div>
      <form onSubmit={onSubmit} noValidate>
        <input
          type="email"
          name="EMAIL"
          placeholder="you@yourcamcompany.com"
          value={email}
          onChange={e => { setEmail(e.target.value); if (status === 'err') setStatus('idle'); }}
          aria-label="Email address"
          required
        />
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Subscribing…' : status === 'ok' ? 'Subscribed ✓' : 'Subscribe'}
        </button>
        <div
          className="site-footer-newsletter-msg"
          style={{ color: status === 'err' ? '#ffb3c7' : 'var(--alloy-yellow)' }}
        >
          {msg}
        </div>
      </form>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export interface SiteFooterProps {
  animatedBar?: boolean;
}

type FooterVariant = 'stacked' | 'engines' | 'sitemap' | 'editorial' | 'anchored' | 'magazine';

export default function SiteFooter({ animatedBar = true }: SiteFooterProps) {
  const [variant, setVariant] = useState<FooterVariant>('stacked');

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ footerLayout?: string }>).detail;
      const next = (detail?.footerLayout ?? 'stacked') as FooterVariant;
      setVariant(next);
    };
    window.addEventListener('alloy:tweaks', handler);
    return () => window.removeEventListener('alloy:tweaks', handler);
  }, []);

  let layout: React.ReactNode;
  switch (variant) {
    case 'sitemap':   layout = <LayoutSitemap />;   break;
    case 'editorial': layout = <LayoutEditorial />; break;
    case 'engines':   layout = <LayoutEngines />;   break;
    case 'anchored':  layout = <LayoutAnchored />;  break;
    case 'magazine':  layout = <LayoutMagazine />;  break;
    default:          layout = <LayoutStacked />;   break;
  }

  return (
    <footer className="site-footer alloy-footer-v2">
      <AccentBar height={8} animated={animatedBar} />
      <div className="site-footer-inner alloy-footer-inner-v2" data-variant={variant}>
        {layout}
        <NewsletterSignup />
      </div>
      <div className="site-footer-bottom">
        <div>© 2026 Alloy Growth Partners · Exclusively growing CAM companies</div>
        <div className="site-footer-bottom-links">
          <a href="/terms-conditions">Terms</a>
          <a href="/privacy-policy">Privacy</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
