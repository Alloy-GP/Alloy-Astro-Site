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
  cta: { text: 'Thirty minutes tells you which associations are at risk — and what would keep them.' },
};

export default data;
