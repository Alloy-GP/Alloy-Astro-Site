// /boardretain/annual-report-production — copy from docs/redesign-handoff/site/boardretain-annual-report-production.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardretain/annual-report-production',
  engine: 'retain',
  name: 'Annual Report Production',
  eyebrow: 'BoardRetain™ · Annual report',
  h1: 'One document that proves',
  h1Accent: 'the year.',
  intro: 'At the annual meeting, the board has to justify your contract to a room of owners. Annual Report Production gives them the document: what was done, what it cost, what was saved, what’s next — designed to be forwarded, printed, and remembered when the contract comes up.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 1, suffix: 'document', note: 'Per association or firm-wide — the year, in owners’ hands' },
    { value: 12, suffix: 'months', note: 'Of work made visible in one place' },
    { value: 60, suffix: 'days', note: 'Before the annual meeting — that’s when we start' },
  ],
  sections: [
    {
      h: 'The renewal case, written a year early.',
      p: [
        'Every violation resolved, project completed, dollar saved, and meeting held is a line in the report. When the contract comes up, the board doesn’t have to remember what you did. They have it.',
      ],
    },
    {
      h: 'Owners read it. Boards forward it.',
      p: [
        'Designed for the homeowner who skims: the numbers up front, the projects in pictures, the plan for next year on one page. Boards send it to the whole community because it makes them look good too.',
      ],
    },
    {
      h: 'Data pulled, not typed.',
      p: [
        'We work from your management platform’s reports and your managers’ notes. Your team’s job is a review, not a rewrite.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Report structure and content plan',
      'Data gathering from your platform',
      'Writing: year in review, financials, projects, outlook',
      'Design in your brand system',
      'Per-association or firm-wide editions',
      'Print and digital production',
      'Annual meeting presentation version',
      'Distribution templates for boards',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Kick off', body: 'Sixty days out: scope, associations, data sources.' },
      { title: 'Gather', body: 'Reports, notes, photos, and numbers.' },
      { title: 'Produce', body: 'Written, designed, reviewed by your team.' },
      { title: 'Deliver', body: 'Print, PDF, and the meeting deck.' },
    ],
  },
  faq: {
    items: [
      { q: 'Per association or for the whole firm?', a: 'Both are common. Larger associations get their own; the firm edition goes in every proposal.' },
      { q: 'When should we start?', a: 'Sixty days before the first annual meeting in the season.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
