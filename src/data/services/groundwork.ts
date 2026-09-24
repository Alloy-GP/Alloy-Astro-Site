// /boardmatch/groundwork — copy from docs/redesign-handoff/site/boardmatch-groundwork.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardmatch/groundwork',
  engine: 'match',
  name: 'Groundwork — Fractional BD',
  eyebrow: 'BoardMatch™ · Fractional business development',
  h1: 'Senior business development',
  h1Accent: 'without the senior salary.',
  intro: 'Groundwork is fractional business development for property management companies: a CAM-experienced BD lead who prospects, qualifies, and books the meetings — then hands your principal a board that’s ready to talk. Forty conversations a month, one metro, one firm.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 40, suffix: 'conversations / mo', note: 'Live conversations with boards and managers in your metro' },
    { value: 40, display: '40–60', suffix: '%', note: 'Qualified-to-closed on meetings Groundwork books' },
    { value: 1, suffix: 'firm per metro', note: 'Your Groundwork lead never prospects for a competitor' },
  ],
  sections: [
    {
      h: 'Prospecting, the part nobody in your office has time for.',
      p: [
        'Your best closer is also running operations. Groundwork takes the top of the funnel — research, outreach, follow-up, qualification — and delivers a calendar of meetings with boards that fit your portfolio and are actually in motion.',
      ],
    },
    {
      h: 'Qualification that respects your time.',
      p: [
        'Doors, budget, contract date, decision process, and why they’re looking. If a board doesn’t clear the bar, you never hear about it. If it does, you get a brief before the meeting and a debrief after.',
      ],
    },
    {
      h: 'Handoff and follow-through.',
      p: [
        'Groundwork stays in the deal after the first meeting: proposal logistics, follow-up cadence, and the lost-deal post-mortem when it doesn’t go your way — so the next one does.',
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
      { title: 'Define', body: 'Ideal association profile, territory, and qualification bar.' },
      { title: 'Build', body: 'Target list, messaging, and CRM.' },
      { title: 'Prospect', body: 'Forty conversations a month; meetings on your calendar.' },
      { title: 'Close', body: 'Briefs, follow-up, and post-mortems until the contract signs.' },
    ],
  },
  faq: {
    items: [
      { q: 'Is this a call center?', a: 'No. One senior person who has worked in or around CAM, embedded with your team, working your metro only.' },
      { q: 'What’s the minimum engagement?', a: 'Twelve months, like everything else. BD compounds; the second half of the year is where the pipeline pays.' },
      { q: 'Do you replace our BD person?', a: 'Usually we extend them. Groundwork handles the prospecting; your closer closes.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
