// /boardmatch — copy from docs/redesign-handoff/site/boardmatch.dc.html
import type { HubPageData } from './types';

const data: HubPageData = {
  engine: 'match',
  eyebrow: 'BoardMatch™ · Close',
  h1: 'Closing one in four?',
  h1Accent: 'You should be at one in two.',
  intro: 'Boards don’t choose the best manager. They choose the firm that made the switch feel safest. BoardMatch is the close engine: the proposal, the RFP response, the sales language, and — when you need it — a fractional BD lead who fills the calendar.',
  systemNote: 'Attract feeds Close. Close feeds Keep. One playbook, one partner, one CAM firm per metro.',
  outcomes: {
    eyebrow: 'Three outcomes',
    h2: 'What BoardMatch is built to produce.',
    items: [
      {
        title: 'A calendar full of boards that are actually in motion.',
        body: 'Prospecting is the job nobody in a CAM office has time for. Groundwork does it — forty conversations a month, qualified against your criteria, meetings booked for your closer.',
        services: [
          { label: 'Groundwork — Fractional BD', sub: 'Senior BD muscle without the senior BD salary', href: '/boardmatch/groundwork' },
        ],
      },
      {
        title: 'A proposal that answers the board’s real question: is this safe?',
        body: 'Boards read for risk. Transition plan, communication cadence, who they’ll talk to, what happens when a manager leaves. Most proposals bury it. Yours leads with it.',
        services: [
          { label: 'Proposal Optimization', sub: 'Rebuild the standing proposal boards compare you on', href: '/boardmatch/proposal-optimization' },
          { label: 'RFP Response System', sub: 'Done-for-you on a single high-stakes RFP', href: '/boardmatch/rfp-response-system' },
        ],
      },
      {
        title: 'A team that says the same true thing in every room.',
        body: 'The principal, the BD lead, the manager on the site visit. One position, one set of talk tracks, one answer to “why you?”',
        services: [
          { label: 'Sales Messaging & UVP', sub: 'The words that separate you from every other firm', href: '/boardmatch/sales-messaging' },
        ],
      },
    ],
  },
  proof: {
    eyebrow: 'One Alloy CAM partner',
    h2: 'What Close produced.',
    link: { label: 'Read the results', href: '/results' },
    stats: [
      { value: 40, suffix: '–60%', note: 'qualified-to-closed on Groundwork meetings' },
      { value: 3, suffix: '×', note: 'proposal requests, 18 months' },
      { value: 1, suffix: 'in 2', note: 'target close rate, from the industry’s one in four' },
    ],
  },
  wait: {
    eyebrow: 'What it costs to wait',
    h2: 'Every proposal that loses on price',
    h2Accent: 'lost on trust first.',
    body: 'Boards say it was the fee. It almost never is. It was the transition plan they couldn’t picture, the manager they never met, the proposal that read like everyone else’s. Fix the trust and the price conversation changes.',
  },
  cta: { text: 'Thirty minutes tells you where your pursuits are leaking — proposal, pipeline, or the room.' },
};

export default data;
