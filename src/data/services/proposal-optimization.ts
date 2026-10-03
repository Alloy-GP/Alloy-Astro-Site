// /boardmatch/proposal-optimization — copy from docs/redesign-handoff/site/boardmatch-proposal-optimization.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardmatch/proposal-optimization',
  engine: 'match',
  name: 'Proposal Optimization',
  eyebrow: 'BoardMatch™ · Proposals',
  h1: 'Rebuild the proposal boards',
  h1Accent: 'compare you on.',
  intro: 'Your standing proposal is the document every board reads before they pick. Proposal Optimization rebuilds it (structure, narrative, pricing presentation, design) so it answers the board’s real questions in the order they ask them. This is the template you reuse; for a single high-stakes RFP, see RFP Response System.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/contact' },
  statsFootnote: 'Sample metrics from Alloy partner engagements and industry benchmarks, shown as a guide. Your proposal shows the numbers for your firm.',
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
        'The typical CAM proposal opens with company history, staff bios, and the same fee table the other three firms used. The answers a board wants, like fee transparency and response-time commitments, land somewhere around page 31. The rebuild moves them to the front, so a director who skims for ninety seconds leaves with them.',
      ],
    },
    {
      h: 'Three to five proof points, ranked.',
      p: [
        'We rank your proof by how much it moves boards in selection meetings, not by what your team finds impressive. That usually leaves three to five points, each with a source a board can check. When every advantage gets equal weight, boards latch onto whatever happens to be on top and forget the rest.',
        'The rebuilt proposal typically runs about half the length of the old one, sized for 18 pages and capped at 28.',
      ],
    },
    {
      h: 'Pricing presented, not just listed.',
      p: [
        'Per-door math, what’s included, what isn’t, and how it compares to the incumbent. Laid out so the treasurer can defend it to the room.',
        'The fee table gets rebuilt so a board can read it without calling you. The goal is to turn “expensive” into “priced for the work” · every line tied to what the association gets, and nothing a treasurer discovers later that wasn’t on the page.',
      ],
    },
    {
      h: 'Designed to be skimmed in a meeting.',
      p: [
        'Boards vote after a 90-minute meeting with five proposals on the table. Clear sections, one idea per spread, proof where it matters, and a summary page they can hold up.',
      ],
    },
    {
      h: 'A template your team runs without us.',
      p: [
        'The master ships in InDesign and Word, with a locked layout and modular copy blocks for portfolio specifics. A 30-minute live training and a 90-minute recorded library mean your BD team turns out the same proposal every time. Each quarter we re-benchmark, re-test the opener, and refresh the proof as your portfolio grows.',
      ],
    },
    {
      h: 'Who this is built for.',
      p: [
        'It fits if you win fewer than 30% of the warm proposals you answer, your team writes from scratch or copies the last one, your last proposal ran past 30 pages, or you can name three competitors but can’t say how you differ.',
        'Skip it if you only take referral business, or you already win 60% or more and the volume is fine. It’s also the wrong buy if you want each proposal ghostwritten: we build the system. And if leadership doesn’t agree on who the firm is, start with Sales Messaging & UVP.',
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
      'Ranked proof points with sources',
      'Fee disclosure framework',
      'Design in your brand system',
      'Editable master template',
      'Team training on assembly',
      'Win/loss tracker and quarterly refresh',
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
      { q: 'Can you help with an RFP that’s due next week?', a: 'That’s RFP Response System, built to run on the RFP’s clock, even a short one.' },
      { q: 'How long until the new proposal is in use?', a: 'About a quarter: audit and strategy, the rebuild, then training and the first live proposal. Exact timing is set at the Strategic Review. Win-rate signal becomes meaningful a few months after that.' },
      { q: 'Our proposal already looks great.', a: 'Looks and wins are different things. Good-looking proposals lose all the time because the differentiation is wrong, the fee disclosure spooks the board, or the answers are in the wrong order. We audit win rate, not aesthetics.' },
      { q: 'How is this different from hiring a designer?', a: 'A designer fixes layout. We fix what happens in the selection meeting. Strategy comes first, what your differentiators should be, then structure, the order boards want answers in, then design. Most CAM proposals fail before the designer opens the file.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you, and which engine to fix first.' },
};

export default data;
