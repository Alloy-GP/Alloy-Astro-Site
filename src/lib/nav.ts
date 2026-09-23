// src/lib/nav.ts
// Site navigation — single source of truth for the header, mobile menu,
// "The System" dropdown, footer columns, service breadcrumbs and sibling chips.
// Data mirrors docs/redesign-handoff/docs/nav-data.json (final copy).

export type EngineKey = 'reach' | 'match' | 'retain';

export interface NavService {
  label: string;
  sub: string;
  href: string;
}

export interface NavEngine {
  key: EngineKey;
  /** Brand name with ™ */
  title: string;
  /** Attract · Close · Keep */
  stage: string;
  sub: string;
  /** Engine ink color — readable on white */
  color: string;
  href: string;
  services: NavService[];
}

export interface NavPrimaryItem {
  id: 'system' | 'results' | 'pricing' | 'resources';
  label: string;
  href: string;
  dropdown?: boolean;
}

export const PRIMARY: NavPrimaryItem[] = [
  { id: 'system', label: 'The System', href: '/services', dropdown: true },
  { id: 'results', label: 'Results', href: '/results' },
  { id: 'pricing', label: 'Pricing', href: '/pricing' },
  { id: 'resources', label: 'Resources', href: '/resources' },
];

export const CTA = { label: 'Claim your market', href: '/get-started' };

export const ENGINES: NavEngine[] = [
  {
    key: 'reach',
    title: 'BoardReach™',
    stage: 'Attract',
    sub: 'Get found before boards shop',
    color: '#d9356e',
    href: '/boardreach',
    services: [
      { label: 'Property Management SEO', sub: 'Google, the map pack, and the AI answer', href: '/property-management-seo' },
      { label: 'HOA Website Design', sub: 'Turn visitors into inbound board inquiries', href: '/boardreach/hoa-website-design' },
      { label: 'Branding for CAM', sub: 'An identity boards remember at the vote', href: '/boardreach/hoa-management-branding' },
      { label: 'Social Media Marketing', sub: 'Founder thought-leadership, on a cadence', href: '/boardreach/hoa-social-media-marketing' },
      { label: 'Email Marketing', sub: 'Nurture sequences written for boards', href: '/boardreach/email-marketing' },
      { label: 'Lead Generation', sub: 'Lead magnets and demand-gen assets', href: '/boardreach/property-management-lead-generation' },
      { label: 'Print & Marketing Materials', sub: 'Proposal, deck, mailer, and signage systems', href: '/boardreach/print-production' },
    ],
  },
  {
    key: 'match',
    title: 'BoardMatch™',
    stage: 'Close',
    sub: 'Turn conversations into contracts',
    color: '#b8942a',
    href: '/boardmatch',
    services: [
      { label: 'Groundwork — Fractional BD', sub: 'Senior BD muscle without the senior BD salary', href: '/boardmatch/groundwork' },
      { label: 'Proposal Optimization', sub: 'Rebuild the standing proposal boards compare you on', href: '/boardmatch/proposal-optimization' },
      { label: 'RFP Response System', sub: 'Done-for-you on a single high-stakes RFP', href: '/boardmatch/rfp-response-system' },
      { label: 'Sales Messaging & UVP', sub: 'The words that separate you from every other firm', href: '/boardmatch/sales-messaging' },
    ],
  },
  {
    key: 'retain',
    title: 'BoardRetain™',
    stage: 'Keep',
    sub: 'Protect the portfolio you have',
    color: '#3f8f83',
    href: '/boardretain',
    services: [
      { label: 'Board Education Programs', sub: 'Educate boards so they renew with confidence', href: '/boardretain/board-education' },
      { label: 'Newsletter Production', sub: 'Done-for-you newsletters boards actually read', href: '/boardretain/newsletter-production' },
      { label: 'Reputation Management', sub: "Protect and build your firm's online reputation", href: '/boardretain/reputation-management' },
      { label: 'Thought Leadership', sub: 'Position your firm as the CAM authority', href: '/boardretain/thought-leadership' },
      { label: 'Annual Report Production', sub: 'The yearly proof boards forward to owners', href: '/boardretain/annual-report-production' },
    ],
  },
];

export const BOARDSUITE_TILE = {
  title: 'BoardSuite™ — all three, in unison',
  sub: 'The full system. One playbook, one accountable team.',
  href: '/boardsuite',
};

export const DROPDOWN_FOOTER = {
  text: 'Not sure which engine is leaking? Thirty minutes tells you.',
  cta: 'Claim your market',
  href: '/get-started',
};

export type FooterLink = [label: string, href: string];

export const FOOTER = {
  /** Short labels used in the footer engine columns (design copy) */
  engineLabels: {
    reach: ['Property Management SEO', 'HOA Website Design', 'Branding for CAM', 'Social Media Marketing', 'Email Marketing', 'Lead Generation', 'Print & Marketing Materials'],
    match: ['Groundwork BD', 'Proposal Optimization', 'RFP Response', 'Sales Messaging'],
    retain: ['Board Education', 'Newsletters', 'Reputation', 'Thought Leadership', 'Annual Reports'],
  } as Record<EngineKey, string[]>,
  company: [
    ['About', '/about'],
    ['BoardSuite', '/boardsuite'],
    ['All services', '/services'],
    ['Testimonials', '/about/testimonials'],
    ['Pricing', '/pricing'],
    ['Careers', '/careers'],
    ['Partners', '/partners'],
    ['Contact', '/contact'],
  ] as FooterLink[],
  resources: [
    ['Resource Hub', '/resources'],
    ['Results', '/results'],
    ['Courses', '/resources/courses'],
    ['Software Guide', '/resources/hoa-management-software-guide'],
    ['Growth Modeled', '/growth-modeled'],
    ['FAQ', '/faq'],
  ] as FooterLink[],
  legal: [
    ['Terms', '/terms-conditions'],
    ['Privacy', '/privacy-policy'],
  ] as FooterLink[],
  tagline: 'Growth engineered exclusively for CAM.',
  contact: ['Austin, TX · Serving CAM nationwide', 'contact@alloygp.co · 210-845-5989', 'BBB Accredited · CAI Member'],
};

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getEngine(key: EngineKey): NavEngine {
  return ENGINES.find((e) => e.key === key)!;
}

/** Find the service entry (and its engine) for a given canonical href. */
export function findService(href: string): { engine: NavEngine; service: NavService } | undefined {
  for (const engine of ENGINES) {
    const service = engine.services.find((s) => s.href === href);
    if (service) return { engine, service };
  }
  return undefined;
}

/** All other services in the same engine — used for the "More in {Engine}" chip row. */
export function siblingServices(engineKey: EngineKey, currentHref: string): NavService[] {
  return getEngine(engineKey).services.filter((s) => s.href !== currentHref);
}

/**
 * Backwards-compatible `NAV` export. Older code imported `NAV` from this module;
 * nothing in the redesign should. Kept as a typed alias to PRIMARY so any stray
 * import still type-checks while old page components are being retired.
 */
export const NAV = PRIMARY;
