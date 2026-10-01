// /boardretain — copy from docs/redesign-handoff/site/boardretain.dc.html
import type { HubPageData } from './types';

const data: HubPageData = {
  engine: 'retain',
  eyebrow: 'BoardRetain™ · Keep',
  h1: 'Protect the portfolio',
  h1Accent: 'you already built.',
  intro: 'Retention is the cheapest growth you have — and the least managed. BoardRetain is the keep engine: education that makes boards competent, communication that makes your work visible, and a reputation the next board checks.',
  systemNote: 'Attract feeds Close. Close feeds Keep. One playbook, one partner, one CAM firm per metro.',
  outcomes: {
    eyebrow: 'Three outcomes',
    h2: 'What BoardRetain is built to produce.',
    items: [
      {
        title: 'Boards that understand the job — and stop blaming you for it.',
        body: 'Volunteers who know what a reserve study is don’t churn over a special assessment. Education is the switching cost you build on purpose.',
        services: [
          { label: 'Board Education Programs', sub: 'Educate boards so they renew with confidence', href: '/boardretain/board-education' },
        ],
      },
      {
        title: 'Work that’s visible before the contract comes up.',
        body: 'Violations resolved, projects completed, dollars saved — every month, in the board’s inbox and the owners’ hands. At renewal, they don’t have to remember. They have it.',
        services: [
          { label: 'Newsletter Production', sub: 'Done-for-you newsletters boards actually read', href: '/boardretain/newsletter-production' },
          { label: 'Annual Report Production', sub: 'The yearly proof boards forward to owners', href: '/boardretain/annual-report-production' },
        ],
      },
      {
        title: 'A reputation the next board checks and believes.',
        body: 'Reviews from the right people, responses that recruit, and a principal whose expertise is in print. Authority keeps the boards you have and reaches the ones you want.',
        services: [
          { label: 'Reputation Management', sub: "Protect and build your firm's online reputation", href: '/boardretain/reputation-management' },
          { label: 'Thought Leadership', sub: 'Position your firm as the CAM authority', href: '/boardretain/thought-leadership' },
        ],
      },
    ],
  },
  proof: {
    eyebrow: 'What retention is worth',
    h2: 'The math on keeping a board.',
    link: { label: 'Read the results', href: '/results' },
    stats: [
      { value: 5, suffix: '–7×', note: 'cheaper to keep an association than to win one' },
      { value: 11, suffix: 'months', note: 'before renewal — when the decision is actually made' },
      { value: 1, suffix: 'newsletter', note: 'a month is often the difference' },
    ],
  },
  wait: {
    eyebrow: 'What it costs to wait',
    h2: 'The renewal conversation started',
    h2Accent: 'eleven months ago.',
    body: 'By the time a board tells you they’re “taking it out to bid,” they decided months earlier — in a meeting you weren’t in, about a problem you didn’t know was yours. Retention is what you do in those eleven months.',
  },
  // Hub FAQ (client, 2026-10-01): answers reuse only facts already published on the site; rendered as an accordion + FAQPage schema.
  faq: {
    eyebrow: 'Questions',
    h2: 'Questions about BoardRetain',
    items: [
      { q: 'Why does retention belong in a marketing engagement?', a: 'Because it’s the cheapest growth you have and the least managed. Keeping an association costs a fraction of winning one, and the decision to leave is made months before a board says it’s “taking it out to bid.” BoardRetain is what you do in those months — visibly, on purpose.' },
      { q: 'What does BoardRetain actually produce each month?', a: 'Board education that makes volunteers competent, a monthly record of the work — violations resolved, projects completed, dollars saved — in the board’s inbox and the owners’ hands, review requests timed to the moments boards are happiest, and a principal whose expertise shows up in print. At renewal, the board doesn’t have to remember what you did. They have it.' },
      { q: 'Can’t our managers just do this themselves?', a: 'They could, and almost none have the time — the newsletter slips, the review request never goes out, the education deck is three years old. We build the system into your managers’ workflow with triggers and templates, then run it with you. The guarantee depends on that: you run the programs we put in place, and we stand behind the result.' },
      { q: 'Is BoardRetain only for firms that are losing boards?', a: 'No. It’s a switching cost you build before anyone threatens to leave — a board that understands the job doesn’t churn over a special assessment. The same work reaches outward: a reputation the next board checks and believes is how retention turns into referrals.' },
      { q: 'How do we know it’s working?', a: 'Renewals that never go to bid. Review velocity and rating on the profiles boards check. Open rates on the newsletters and board emails. And the number of boards that call you about a problem before it becomes a bid — the clearest sign that the eleven-month window is now yours.' },
    ],
  },
  cta: { text: 'Thirty minutes tells you which associations are at risk — and what would keep them.' },
};

export default data;
