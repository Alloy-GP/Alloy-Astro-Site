// /boardretain/newsletter-production — copy from docs/redesign-handoff/site/boardretain-newsletter-production.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardretain/newsletter-production',
  engine: 'retain',
  name: 'Newsletter Production',
  eyebrow: 'BoardRetain™ · Newsletters',
  h1: 'The newsletter that makes your work',
  h1Accent: 'visible.',
  intro: 'Boards forget what you did last quarter. Newsletter Production for HOA management companies is a done-for-you, branded monthly or quarterly newsletter — for boards, for homeowners, or both — that shows the work, teaches the basics, and keeps your firm the obvious choice at renewal.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 12, suffix: 'issues / yr', note: 'Monthly, written, designed, and sent for you' },
    { value: 2, suffix: 'audiences', note: 'Boards and homeowners, with different content and cadence' },
    { value: 1, suffix: 'hour', note: 'Of your team’s time per issue — a quick call and an approval' },
  ],
  sections: [
    {
      h: 'Show the work.',
      p: [
        'Violations resolved, vendor savings, projects completed, meetings held. Your team does this every month and nobody sees it. The newsletter is where it becomes visible — to the board that votes on your contract and the homeowners who talk to them.',
      ],
    },
    {
      h: 'Teach a little, every issue.',
      p: [
        'One short piece on how associations work: what a reserve study is, why the insurance premium moved, how to read the budget. Educated owners complain less and support the board that hired you.',
      ],
    },
    {
      h: 'Branded, done, sent.',
      p: [
        'We write it, design it in your system, get your approval, and send it — email, print, or both. Your team’s job is one call a month.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Editorial calendar',
      'Monthly or quarterly writing',
      'Design in your brand system',
      'Board edition and homeowner edition',
      'Email and print production',
      'Community-specific variants where needed',
      'Vendor and partner features',
      'Open and engagement reporting',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Plan', body: 'Audiences, cadence, and the calendar.' },
      { title: 'Gather', body: 'A monthly call with your team for the month’s work.' },
      { title: 'Produce', body: 'Written, designed, approved.' },
      { title: 'Send', body: 'Email, print, or both — and the report.' },
    ],
  },
  faq: {
    items: [
      { q: 'Per-community or firm-wide?', a: 'Either. Most firms run a firm-wide board edition plus community variants for larger associations.' },
      { q: 'Isn’t this what Email Marketing does?', a: 'Email Marketing is for boards you don’t have yet. Newsletters are for the ones you do.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
