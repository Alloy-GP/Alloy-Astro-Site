// /boardmatch/sales-messaging — copy from docs/redesign-handoff/site/boardmatch-sales-messaging.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardmatch/sales-messaging',
  engine: 'match',
  name: 'Sales Messaging & UVP',
  eyebrow: 'BoardMatch™ · Messaging',
  h1: 'Say what only',
  h1Accent: 'you',
  h1Tail: 'can say.',
  intro: 'Every management company says “responsive,” “transparent,” and “experienced.” Sales Messaging & UVP development gives your firm a position boards can repeat back — and the language for every conversation, from first call to final vote.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 1, suffix: 'sentence', note: 'The position a board member can repeat to the rest of the board' },
    { value: 5, suffix: 'moments', note: 'First call, site visit, proposal, finalist meeting, follow-up — each scripted' },
    { value: 3, suffix: 'firms', note: 'On the shortlist. Yours needs a reason to be the pick.' },
  ],
  sections: [
    {
      h: 'The problem with “responsive.”',
      p: [
        'If everyone claims it, it’s not a differentiator, it’s a minimum. We find what’s actually true and different about how you operate — the manager ratio, the transition process, the specialty, the founder story — and build the position on that.',
      ],
    },
    {
      h: 'Language for the whole team.',
      p: [
        'The principal, the BD lead, the manager on the site visit. Each hears the same questions and each should give the same answer. We write the talk tracks, the objection responses, and the one-liners.',
      ],
    },
    {
      h: 'Tested in real pursuits.',
      p: [
        'Messaging is a draft until it’s been in a room. We revise after your first three pursuits based on what landed and what didn’t.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Stakeholder interviews and lost-deal review',
      'Competitive positioning audit',
      'Unique value proposition and positioning statement',
      'Proof points and story bank',
      'Talk tracks for each sales moment',
      'Objection handling guide',
      'Website and proposal copy alignment',
      'Team workshop',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Listen', body: 'Your team, your clients, and the boards that said no.' },
      { title: 'Position', body: 'What’s true, different, and provable.' },
      { title: 'Write', body: 'Talk tracks, objections, one-liners, copy.' },
      { title: 'Rehearse', body: 'A workshop, then revisions after real pursuits.' },
    ],
  },
  faq: {
    items: [
      { q: 'We already have a mission statement.', a: 'Good — that’s for your team. A UVP is for a board deciding between you and two others. Different job.' },
      { q: 'How long does this take?', a: 'Four to six weeks to the workshop; revisions over the following quarter.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
