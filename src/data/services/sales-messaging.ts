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
        'The rewrite swaps a claim for a fact. “Our people are our biggest differentiator” becomes “Every community gets two named operators — a manager and a backup — and both know your reserve study before the first meeting.” Any firm can say the first sentence. A board can check the second.',
      ],
    },
    {
      h: 'Four questions every pitch has to answer.',
      p: [
        'Most CAM messaging breaks in the same four places: who you are in thirty seconds, why a board should pick you over the firm it has now, what proves it, and why you cost what you cost. We write a pillar for each.',
        'The fee pillar is the one most firms skip. “You get what you pay for” sounds like a defense. A firm that knows where its fee sits against the regional average — and what switching saves a board by year two — puts that math on the table at the intro meeting, before anyone asks.',
      ],
    },
    {
      h: 'Language for the whole team.',
      p: [
        'The principal, the BD lead, the manager on the site visit. Each hears the same questions and each should give the same answer. We write the talk tracks, the objection responses, and the one-liners.',
        'Opener scripts, three variants per persona. Eight discovery questions, ranked by which ones surface a board ready to fire its incumbent. Objection cards for the eleven objections that come up in 90% of selection meetings, with three ways to answer each. A twelve-slide finalist deck built to run 25 minutes.',
      ],
    },
    {
      h: 'Written down, so it survives turnover.',
      p: [
        'BD staff turn over, and each new hire invents a pitch of their own. We build an onboarding guide that runs from day one to day 90, so a new hire sounds like a veteran by month two, plus a library of twelve follow-up emails and six LinkedIn messages that don’t read like a sales drip.',
      ],
    },
    {
      h: 'Tested in real pursuits.',
      p: [
        'Messaging is a draft until it’s been in a room. We revise after your first three pursuits based on what landed and what didn’t.',
      ],
    },
    {
      h: 'One source for proposals and RFPs.',
      p: [
        'Once the pillars are written, the rest of BoardMatch™ inherits them. Proposal templates take the pillars, the fee logic, and the proof points. When a strategic RFP lands, it’s written from the same system instead of a blank page. If your brand can’t carry the new position, we fix the brand. Most of the time we don’t have to.',
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
      'Opener scripts and discovery questions',
      'Twelve-slide finalist presentation',
      'Follow-up email and LinkedIn library',
      'Onboarding guide for new BD hires',
      'Website and proposal copy alignment',
      'Team workshop',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Listen', body: 'Your team, your clients, and the boards that said no. We sit in on five sales calls, three board interviews, and a portfolio walkthrough.' },
      { title: 'Position', body: 'What’s true, different, and provable. Mapped against the three competitors who keep beating you, through five drafts.' },
      { title: 'Write', body: 'Talk tracks, objections, one-liners, copy.' },
      { title: 'Rehearse', body: 'A workshop, then revisions after real pursuits.' },
    ],
  },
  faq: {
    items: [
      { q: 'We already have a mission statement.', a: 'Good — that’s for your team. A UVP is for a board deciding between you and two others. Different job.' },
      { q: 'How long does this take?', a: 'Four to six weeks to the workshop; revisions over the following quarter.' },
      { q: 'Is this just website copywriting?', a: 'No. Website copy is one downstream surface. We write the words your team says on cold calls, at first appointments, in selection meetings, and when a board pushes back. The website inherits that language. It’s the smallest part of the system.' },
      { q: 'How is this different from a brand strategist?', a: 'Brand strategists work in adjectives like “premium” and “trusted.” We work in the sentences your team will say at 11 a.m. on a Tuesday in front of a board. If a director can’t repeat it to the rest of the board, it isn’t finished.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
