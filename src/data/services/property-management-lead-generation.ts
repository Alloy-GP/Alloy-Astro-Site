// /boardreach/property-management-lead-generation — copy from docs/redesign-handoff/site/boardreach-property-management-lead-generation.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardreach/property-management-lead-generation',
  engine: 'reach',
  name: 'Lead Generation',
  eyebrow: 'BoardReach™ · Demand',
  h1: 'Turn attention into',
  h1Accent: 'board inquiries',
  h1Tail: 'you can count.',
  intro: 'Traffic isn’t a pipeline. Lead Generation for property management companies is the set of assets and campaigns that convert a curious board member into a named contact: guides, calculators, webinars, paid campaigns, and the follow-up that turns a download into a meeting.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 40, suffix: '–60%', note: 'Qualified-to-closed rate on Groundwork-handled leads' },
    { value: 3, suffix: '×', note: 'Proposal request growth for one Alloy CAM partner' },
    { value: 1, suffix: 'source of truth', note: 'Every inquiry attributed to its channel from day one' },
  ],
  sections: [
    {
      h: 'Assets a board president would actually download.',
      p: [
        'A reserve study checklist. A board’s guide to switching management companies. A budget-season timeline. Useful, specific, and gated only where it earns the exchange.',
      ],
    },
    {
      h: 'Paid where it pays.',
      p: [
        'Google Ads for boards actively searching. LinkedIn for board members by title and geography. Retargeting for the ones who visited and left. Budgets rebalanced quarterly against cost per qualified inquiry, not clicks.',
      ],
    },
    {
      h: 'Attribution before spend.',
      p: [
        'We wire the inquiry form, the phone line, and the calendar link to report their source before a dollar goes into media. Otherwise you’re guessing — and so are we.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Lead magnet strategy and production',
      'Landing pages built to convert',
      'Google Ads setup and management',
      'LinkedIn campaigns by title and metro',
      'Retargeting',
      'Webinar and event promotion',
      'Follow-up sequences (with Email Marketing)',
      'Call tracking and form attribution',
      'Monthly cost-per-inquiry report',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Attribute', body: 'Forms, phones, and calendars report their source.' },
      { title: 'Create', body: 'Assets and pages boards want.' },
      { title: 'Run', body: 'Paid and organic campaigns, tuned monthly.' },
      { title: 'Hand off', body: 'Qualified inquiries to your BD lead — or to Groundwork.' },
    ],
  },
  faq: {
    items: [
      { q: 'What does a qualified lead look like?', a: 'A named board member or manager at an association in your service area with a stated need or timeline. Not a homeowner asking about a fence.' },
      { q: 'How much should we spend on ads?', a: 'It depends on your metro and doors. We scope a starting budget in the Strategic Review and adjust against cost per qualified inquiry.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
