// /boardmatch/proposal-optimization — copy from docs/redesign-handoff/site/boardmatch-proposal-optimization.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardmatch/proposal-optimization',
  engine: 'match',
  name: 'Proposal Optimization',
  eyebrow: 'BoardMatch™ · Proposals',
  h1: 'Rebuild the proposal boards',
  h1Accent: 'compare you on.',
  intro: 'Your standing proposal is the document every board reads before they pick. Proposal Optimization rebuilds it — structure, narrative, pricing presentation, design — so it answers the board’s real questions in the order they ask them. This is the template you reuse; for a single high-stakes RFP, see RFP Response System.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 12, suffix: 'things', note: 'What boards actually evaluate in a proposal, per our audit' },
    { value: 1, display: '1 in 2', note: 'Where your close rate should be, up from the industry’s one in four' },
    { value: 3, suffix: '×', note: 'Proposal request growth for one Alloy CAM partner' },
  ],
  sections: [
    {
      h: 'Boards read for risk. Write for it.',
      p: [
        'A volunteer board is choosing whom to blame if things go wrong. Your proposal needs to make the switch feel safe: transition plan, communication cadence, who they’ll actually talk to, what happens when a manager leaves. Most proposals bury this under a services list.',
      ],
    },
    {
      h: 'Pricing presented, not just listed.',
      p: [
        'Per-door math, what’s included, what isn’t, and how it compares to the incumbent — laid out so the treasurer can defend it to the room.',
      ],
    },
    {
      h: 'Designed to be skimmed in a meeting.',
      p: [
        'Boards vote after a 90-minute meeting with five proposals on the table. Clear sections, one idea per spread, proof where it matters, and a summary page they can hold up.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Audit of your current proposal against board criteria',
      'Structure and narrative rebuild',
      'Transition and communication plan sections',
      'Pricing presentation',
      'Proof and case study integration',
      'Design in your brand system',
      'Editable master template',
      'Team training on assembly',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Audit', body: 'Your last ten proposals: what won, what lost, what boards asked.' },
      { title: 'Rebuild', body: 'Structure, copy, pricing, design.' },
      { title: 'Template', body: 'A master your team assembles in an hour.' },
      { title: 'Measure', body: 'Win rate by quarter; revisions as you learn.' },
    ],
  },
  faq: {
    items: [
      { q: 'How is this different from RFP Response System?', a: 'Proposal Optimization rebuilds the standing template you use for every pursuit. RFP Response System is done-for-you production on one specific, high-stakes RFP.' },
      { q: 'Can you help with an RFP that’s due next week?', a: 'That’s RFP Response System — ten-day turnaround.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
