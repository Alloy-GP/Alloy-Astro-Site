// /boardmatch/rfp-response-system — copy from docs/redesign-handoff/site/boardmatch-rfp-response-system.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardmatch/rfp-response-system',
  engine: 'match',
  name: 'RFP Response System',
  eyebrow: 'BoardMatch™ · RFP response',
  h1: 'The RFP you',
  h1Accent: 'can’t afford to lose.',
  intro: 'Some RFPs are worth a dedicated team: the 800-door master association, the portfolio that changes your year. RFP Response System is done-for-you response production (research, narrative, deck, financials, exhibits) with a ten-day turnaround. For your everyday template, see Proposal Optimization.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/contact' },
  statsFootnote: 'Sample metrics from Alloy partner engagements and industry benchmarks, shown as a guide. Your proposal shows the numbers for your firm.',
  stats: [
    { value: 800, display: '800', suffix: '-door', note: 'The master association that changes your year is the RFP we take' },
    { value: 1, suffix: 'pursuit', note: 'Full attention on one RFP, not a template' },
    { value: 45, suffix: '% avg', note: 'Qualified-to-closed on pursuits we support end to end' },
  ],
  sections: [
    {
      h: 'Which RFPs are worth a sprint.',
      p: [
        'We don’t take every RFP. We take the ones where losing means twelve months of regret and winning re-anchors your portfolio. Large master-planned communities where the board weighs five firms over six weeks. Self-managed associations, or a competitor’s account you’ve been chasing for two years. High-amenity HOAs and condos that expect polished references and a concierge tone.',
        'Mixed commercial-residential portfolios belong on the list too, because the response has to satisfy a board and a sponsor at the same time. If an RFP isn’t worth the effort, we say so on the intake call, before either side commits.',
      ],
    },
    {
      h: 'Research the board, not just the RFP.',
      p: [
        'Who’s on the board, what they’ve complained about, why the incumbent is out, what the last three meetings decided. The response should read like it was written for that room, because it was.',
        'It starts with a 60-minute intake: the RFP, the board profile, the incumbent, and what you already know about the room. That becomes a three-page strategy memo, who’s voting, what they care about, where the incumbent fell short, where you win outright and where you flank.',
      ],
    },
    {
      h: 'Answer the question they didn’t write down.',
      p: [
        'Every RFP has an official scoring rubric and a real one. We write to both: compliant to the letter, persuasive on the transition risk, the staffing, and the proof.',
        'Transition risk gets its own section, with a week-by-week plan from contract signing through the first board meeting. The fee model is built from your actual operating cost for this community, not pulled from your last template, so the number holds when the treasurer pushes on it.',
      ],
    },
    {
      h: 'Presentation-ready.',
      p: [
        'A response document, a finalist presentation, exhibits, and a Q&A brief for your team. You walk in prepared for the questions the board will actually ask.',
        'Whoever presents gets two hours of live coaching from people who have sat through more than 200 CAM selection meetings: the talk tracks, the three slides that matter, and the four objections you will hear. Three references are picked and briefed. Bios get rewritten to read like operators, not LinkedIn summaries.',
      ],
    },
    {
      h: 'Fixed fee, quoted per RFP.',
      p: [
        'Each pursuit is priced as a fixed fee on the intake call. The number depends on portfolio size, how many people vote, and how much incumbent research the room requires. You know it before either side commits, and it doesn’t move when the draft needs another pass.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'RFP analysis and go / no-go recommendation',
      'Board and community research',
      'Three-page strategy memo on the room',
      'Response strategy and win themes',
      'Full narrative writing',
      'Pricing and financials layout',
      'Fee model built from your operating cost',
      'Week-by-week transition plan',
      'Exhibits, references, and case studies',
      'Finalist presentation deck',
      'Q&A prep for your team',
      'Reference selection and coaching',
      'Production and submission logistics',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Kickoff', body: 'Day 1: RFP, rubric, research plan, win themes.' },
      { title: 'Draft', body: 'Days 2–6: narrative, financials, exhibits.' },
      { title: 'Refine', body: 'Days 7–9: your review, our revisions, design. Two rounds of edits to harden the numbers, references, and bios.' },
      { title: 'Submit', body: 'Day 10: production, submission, presentation prep. The finished response runs 18–24 pages, ready to print, bind, or send.' },
    ],
  },
  faq: {
    items: [
      { q: 'What if we only have five days?', a: 'Call us. Some RFPs can be compressed; some shouldn’t be pursued. We’ll tell you which.' },
      { q: 'Is this included in BoardSuite?', a: 'Growth and Scale include proposal and RFP systems; single-pursuit production is scoped separately when the RFP arrives.' },
      { q: 'Why not use our internal team?', a: 'Use them when you can. We come in when the stakes outrun your bandwidth, when your BD lead is also running three other proposals, or the RFP needs more strategy and design than your team has time for. Your people still own the relationship and the room.' },
      { q: 'Can you guarantee we win?', a: 'No, and be skeptical of anyone who does. We can guarantee the response is materially better than what you would have submitted, the fee model is defensible, and the team walking into the finalist meeting is prepared. We also turn down pursuits where the fit isn’t real.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you, and which engine to fix first.' },
};

export default data;
