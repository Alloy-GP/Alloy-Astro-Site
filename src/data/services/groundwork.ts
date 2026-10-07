// /boardmatch/groundwork — copy from docs/redesign-handoff/site/boardmatch-groundwork.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardmatch/groundwork',
  engine: 'match',
  name: 'Groundwork. Fractional BD',
  eyebrow: 'BoardMatch™ · Fractional business development',
  h1: 'Senior business development',
  h1Accent: 'without the senior salary.',
  intro: 'Groundwork is fractional business development for HOA management companies: a CAM-experienced BD lead who prospects, qualifies, and books the meetings, then hands your principal a board that’s ready to talk. A steady cadence of conversations, one metro, one firm.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/contact' },
  statsFootnote: 'Sample metrics from Alloy partner engagements and industry benchmarks, shown as a guide. Your proposal shows the numbers for your firm.',
  stats: [
    { value: 100, suffix: '%', note: 'Of meetings qualified against your criteria before they reach your calendar' },
    { value: 45, suffix: '% avg', note: 'Qualified-to-closed on meetings Groundwork books' },
    { value: 1, suffix: 'firm per metro', note: 'Your Groundwork lead never prospects for a competitor' },
  ],
  sections: [
    {
      h: 'Prospecting, the part nobody in your office has time for.',
      p: [
        'Your best closer is also running operations. Groundwork takes the top of the funnel (research, outreach, follow-up, qualification) and delivers a calendar of meetings with boards that fit your portfolio and are actually in motion.',
        'The list is built from signals that a board is about to move: board-rotation timing, contract dates, RFP activity, and fit with the associations you already run well. Outreach runs as a cadence across phone, email, LinkedIn, direct mail, and local events, with messaging keyed to the problem that board is likely having.',
      ],
    },
    {
      h: 'A name and a phone number isn’t a lead.',
      p: [
        'Every conversation is a live exchange with a board member or manager in your metro, someone who told us where their association stands. The boards that clear the bar go on your calendar. The rest go back into the cadence with a note on when their contract opens, and Groundwork makes that call when the date comes around.',
      ],
    },
    {
      h: 'Qualification that respects your time.',
      p: [
        'Doors, budget, contract date, decision process, and why they’re looking. If a board doesn’t clear the bar, you never hear about it. If it does, you get a brief before the meeting and a debrief after.',
        'The bar is set with you and written down before outreach starts. Holding to it is what the 45% average qualified-to-closed rate depends on. Loosen it and you get more meetings and a worse close rate.',
      ],
    },
    {
      h: 'Handoff and follow-through.',
      p: [
        'Groundwork stays in the deal after the first meeting: proposal logistics, follow-up cadence, and the lost-deal post-mortem when it doesn’t go your way, so the next one does.',
        'The handoff is a warm introduction, not a forwarded email. Your principal gets who we spoke with, why they’re looking, how the board decides, and a recommended next move. The debrief goes into the CRM, so the monthly pipeline review reflects what actually happened in the room.',
      ],
    },
    {
      h: 'Who Groundwork is for.',
      p: [
        'Firms that close well once they’re in the room but don’t get in often enough. Groundwork sits in the Ascend tier of BoardSuite™, built for firms past 5,000 doors and working more than one market.',
        'It’s the wrong first move if your proposals are losing rooms. More meetings won’t fix a close problem. Start with Proposal Optimization, then fill the calendar.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Dedicated CAM-experienced BD lead',
      'Target list by metro, doors, and contract timing',
      'Outbound outreach: phone, email, LinkedIn, events',
      'Qualification against your criteria',
      'Meeting briefs and debriefs',
      'CRM hygiene and pipeline reporting',
      'Proposal logistics and follow-up',
      'Lost-deal post-mortems',
      'Monthly pipeline review',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Define', body: 'Ideal association profile, territory, and qualification bar. Written down with your principal before the first call.' },
      { title: 'Build', body: 'Target list, messaging, and CRM. Sorted by contract timing, so outreach starts with the boards closest to a decision.' },
      { title: 'Prospect', body: 'A steady monthly cadence of conversations; meetings on your calendar.' },
      { title: 'Close', body: 'Briefs, follow-up, and post-mortems until the contract signs.' },
    ],
  },
  faq: {
    items: [
      { q: 'Is this a call center?', a: 'No. One senior person who has worked in or around CAM, embedded with your team, working your metro only.' },
      { q: 'What’s the minimum engagement?', a: 'Twelve months, like everything else. BD compounds; the second half of the year is where the pipeline pays.' },
      { q: 'Do you replace our BD person?', a: 'Usually we extend them. Groundwork handles the prospecting; your closer closes.' },
      { q: 'Can we add Groundwork without Scale?', a: 'Often, yes. Growth plus fractional BD is one of the common add-on requests, quoted at the Strategic Review based on scope. The metro rule doesn’t change: if we already prospect for a firm in your market, the seat is taken.' },
      { q: 'What does our team still do?', a: 'Take the meetings and close. Your principal walks in with the brief, reads the debrief after, and joins the monthly pipeline review.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you, and which engine to fix first.' },
};

export default data;
