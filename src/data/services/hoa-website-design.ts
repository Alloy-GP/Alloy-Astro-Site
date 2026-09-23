// /boardreach/hoa-website-design — copy from docs/redesign-handoff/site/boardreach-hoa-website-design.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardreach/hoa-website-design',
  engine: 'reach',
  name: 'HOA Website Design',
  eyebrow: 'BoardReach™ · Website',
  h1: 'A website that',
  h1Accent: 'wins boards',
  h1Tail: ', not just homeowners.',
  intro: 'Most CAM sites are built for the owners you already have — portals, payments, forms. Boards evaluating you land on the same page and leave. We build the site four audiences actually use: boards, RFP committees, homeowners, and the talent you’re hiring.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 4, suffix: 'audiences', note: 'Boards, RFP committees, homeowners, talent — each with a clear path' },
    { value: 535, suffix: '%', note: 'More lead intake for one Alloy CAM partner after the rebuild' },
    { value: 1, suffix: 'firm per metro', note: 'Your site is never a template we sell to your competitor' },
  ],
  sections: [
    {
      h: 'Built for the board’s decision, not the owner’s login.',
      p: [
        'A board president landing on your homepage wants three things in ten seconds: do you manage communities like theirs, can they trust you, and how do they start a conversation. Most CAM sites answer none of them above the fold. Ours answer all three.',
        'Owner and portal traffic still gets a clear, fast path — it just doesn’t sit in the way of the people deciding whether to hire you.',
      ],
    },
    {
      h: 'Structured so search engines and AI answers can read it.',
      p: [
        'Every service, every city, every association type gets a page with a real job. Schema is written in, not bolted on. When a board asks Google or ChatGPT who manages HOAs in your metro, your site gives them something to quote.',
      ],
    },
    {
      h: 'Proposals, RFPs, and careers get their own front door.',
      p: [
        'An RFP committee comparing five firms shouldn’t have to dig. A dedicated RFP page, a proposal request form, and a careers section that actually sells the job — each converts a different visitor without cluttering the homepage.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Discovery with your BD and operations leads',
      'Information architecture for four audiences',
      'Copy written for board-stage intent',
      'Design in your brand system (or a refreshed one)',
      'Astro or WordPress build, your choice',
      'Service, city, and association-type pages',
      'Portal, payments, and owner paths preserved',
      'Schema, speed, and accessibility baked in',
      'Analytics and attribution wired from day one',
      'Ninety days of post-launch optimization',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Discover', body: 'Who visits, why, and what they need to see to act.' },
      { title: 'Architect', body: 'The page tree, the copy, the paths for each audience.' },
      { title: 'Build', body: 'Design, development, and content on a staging site you review.' },
      { title: 'Launch', body: 'Redirects, tracking, and a ninety-day optimization window.' },
    ],
  },
  faq: {
    items: [
      { q: 'We just redesigned. Do we need to start over?', a: 'Usually not. We audit what you have, keep what works, and fix the board-facing paths first. A full rebuild is only the answer when the foundation can’t support the pages you need.' },
      { q: 'Do you migrate our owner portal?', a: 'We don’t replace your portal — we integrate it. Vantaca, AppFolio, Buildium, CINC: the login stays where owners expect it.' },
      { q: 'How long does a build take?', a: 'Sixty to ninety days for most firms. Multi-brand or multi-market sites run longer; we scope that in the Strategic Review.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
