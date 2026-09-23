// /boardmatch/rfp-response-system — copy from docs/redesign-handoff/site/boardmatch-rfp-response-system.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardmatch/rfp-response-system',
  engine: 'match',
  name: 'RFP Response System',
  eyebrow: 'BoardMatch™ · RFP response',
  h1: 'The RFP you',
  h1Accent: 'can’t afford to lose.',
  intro: 'Some RFPs are worth a dedicated team: the 800-door master association, the portfolio that changes your year. RFP Response System is done-for-you response production — research, narrative, deck, financials, exhibits — with a ten-day turnaround. For your everyday template, see Proposal Optimization.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 10, suffix: '-day', note: 'Turnaround from kickoff to submission-ready' },
    { value: 1, suffix: 'pursuit', note: 'Full attention on one RFP, not a template' },
    { value: 40, display: '40–60', suffix: '%', note: 'Qualified-to-closed on pursuits we support end to end' },
  ],
  sections: [
    {
      h: 'Research the board, not just the RFP.',
      p: [
        'Who’s on the board, what they’ve complained about, why the incumbent is out, what the last three meetings decided. The response should read like it was written for that room, because it was.',
      ],
    },
    {
      h: 'Answer the question they didn’t write down.',
      p: [
        'Every RFP has an official scoring rubric and a real one. We write to both: compliant to the letter, persuasive on the transition risk, the staffing, and the proof.',
      ],
    },
    {
      h: 'Presentation-ready.',
      p: [
        'A response document, a finalist presentation, exhibits, and a Q&A brief for your team. You walk in prepared for the questions the board will actually ask.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'RFP analysis and go / no-go recommendation',
      'Board and community research',
      'Response strategy and win themes',
      'Full narrative writing',
      'Pricing and financials layout',
      'Exhibits, references, and case studies',
      'Finalist presentation deck',
      'Q&A prep for your team',
      'Production and submission logistics',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Kickoff', body: 'Day 1: RFP, rubric, research plan, win themes.' },
      { title: 'Draft', body: 'Days 2–6: narrative, financials, exhibits.' },
      { title: 'Refine', body: 'Days 7–9: your review, our revisions, design.' },
      { title: 'Submit', body: 'Day 10: production, submission, presentation prep.' },
    ],
  },
  faq: {
    items: [
      { q: 'What if we only have five days?', a: 'Call us. Some RFPs can be compressed; some shouldn’t be pursued. We’ll tell you which.' },
      { q: 'Is this included in BoardSuite?', a: 'Growth and Scale include proposal and RFP systems; single-pursuit production is scoped separately when the RFP arrives.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
