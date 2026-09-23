// /boardreach/email-marketing — copy from docs/redesign-handoff/site/boardreach-email-marketing.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardreach/email-marketing',
  engine: 'reach',
  name: 'Email Marketing',
  eyebrow: 'BoardReach™ · Email',
  h1: 'Stay in front of every board',
  h1Accent: 'until they’re ready.',
  intro: 'Most boards don’t switch when they first meet you. They switch eleven months later when the contract comes up. Email Marketing for HOA management companies keeps you present in between — segmented, branded, and written for the board timeline, not a generic drip.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 11, suffix: 'months', note: 'Average gap between first conversation and contract decision' },
    { value: 4, suffix: 'segments', note: 'Prospect boards, current boards, homeowners, vendors and partners' },
    { value: 2, suffix: '×', note: 'Open rates we typically see against category benchmarks after a rebuild' },
  ],
  sections: [
    {
      h: 'Sequences built on the contract calendar.',
      p: [
        'We map the year a board lives: budget season, annual meeting, insurance renewal, the contract review. Every send lands when the topic is already on the agenda — and positions your firm as the one that understands it.',
      ],
    },
    {
      h: 'One list, four conversations.',
      p: [
        'Boards you’re courting, boards you manage, the homeowners inside them, and the vendors and attorneys who refer you. Each gets a different cadence and a different message, from one system.',
      ],
    },
    {
      h: 'Templates your team can run.',
      p: [
        'Branded, mobile-first, and simple enough that your operations lead can send an emergency notice without calling us.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'List audit, segmentation, and cleanup',
      'Branded template system',
      'Prospect nurture sequences',
      'Board and homeowner communication templates',
      'Monthly or bi-weekly editorial calendar',
      'Copywriting and design for every send',
      'Automation and CRM integration',
      'Reporting: opens, replies, inquiries',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Audit', body: 'Who’s on the list, what they’ve received, what’s bounced.' },
      { title: 'Map', body: 'Segments and the calendar each one lives by.' },
      { title: 'Build', body: 'Templates, sequences, and automations.' },
      { title: 'Run', body: 'We write, you approve, it sends — with a monthly report.' },
    ],
  },
  faq: {
    items: [
      { q: 'We use Mailchimp / Constant Contact / HubSpot. Do we switch?', a: 'No. We work in the tool you have unless it genuinely can’t do the job.' },
      { q: 'Isn’t this just a newsletter?', a: 'Newsletter Production is the retention piece for boards you already manage. Email Marketing is the demand piece — the boards you don’t have yet.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
