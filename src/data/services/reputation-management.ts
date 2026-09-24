// /boardretain/reputation-management — copy from docs/redesign-handoff/site/boardretain-reputation-management.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardretain/reputation-management',
  engine: 'retain',
  name: 'Reputation Management',
  eyebrow: 'BoardRetain™ · Reputation',
  h1: 'Your reviews are written by',
  h1Accent: 'angry homeowners.',
  h1Tail: 'Fix that.',
  intro: 'Management companies get reviewed by the owner who got the violation letter, not the board that renewed for the fifth year. Reputation Management for CAM firms builds a system that gets the happy ones to speak, responds to the rest with grace, and keeps the rating that the next board checks.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 10, suffix: '+ reviews / qtr', note: 'Our velocity target — recent, real, and from the right people' },
    { value: 4.5, suffix: '★ +', note: 'Where a CAM firm needs to sit to make the shortlist' },
    { value: 24, suffix: 'hr', note: 'Response time on every review, good or bad' },
  ],
  sections: [
    {
      h: 'The ask, timed right.',
      p: [
        'The moment a board renews. The day the pool opens. The week after a smooth annual meeting. We build the triggers into your managers’ workflow so the request goes out when the sentiment is highest — and to the people who can actually speak to your work.',
      ],
    },
    {
      h: 'Responses that recruit.',
      p: [
        'Every response is read by a future board member. We write them: grateful, specific, never defensive. A well-handled complaint is a better trust signal than a wall of five stars.',
      ],
    },
    {
      h: 'Monitoring across everywhere boards look.',
      p: [
        'Google, Yelp, Facebook, the BBB, industry directories. We watch them all and flag anything that needs your attention the same day.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Review audit across all platforms',
      'Request system built into manager workflows',
      'Request templates and timing triggers',
      'Response writing within 24 hours',
      'Escalation protocol for serious complaints',
      'Fake and policy-violating review removal',
      'Monthly reputation report',
      'Review integration on your website and proposals',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Audit', body: 'Where you stand, where you’re listed, what’s said.' },
      { title: 'System', body: 'Triggers, templates, and the manager playbook.' },
      { title: 'Run', body: 'Requests go out; responses go up; we monitor.' },
      { title: 'Report', body: 'Volume, rating, and sentiment — monthly.' },
    ],
  },
  faq: {
    items: [
      { q: 'Can you remove bad reviews?', a: 'Only ones that violate platform policy. The rest we respond to, then outnumber.' },
      { q: 'Do boards really read reviews?', a: 'Yes — it’s the first thing a board member does after the referral. Our Trust Building course covers exactly how they weigh them.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
