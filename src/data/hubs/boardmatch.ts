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
  // Hub FAQ (client, 2026-10-01): answers reuse only facts already published on the site; rendered as an accordion + FAQPage schema.
  faq: {
    eyebrow: 'Questions',
    h2: 'Questions about BoardMatch',
    items: [
      { q: 'Boards keep telling us we lost on price. Is that really why?', a: 'Almost never. Boards read a proposal for risk: the transition plan they couldn’t picture, the manager they never met, the answer to “what happens when a manager leaves.” Lose that and the fee is the polite reason you’re given. BoardMatch fixes the trust problem so the price conversation changes.' },
      { q: 'What’s the difference between Proposal Optimization, the RFP Response System, and Groundwork?', a: 'Proposal Optimization rebuilds the standing proposal you send to every board. The RFP Response System answers a live RFP for you on a deadline. Groundwork is fractional business development — about forty qualified conversations a month and meetings booked for your closer. Sales Messaging sits underneath all three so every room hears the same true thing.' },
      { q: 'What close rate should a CAM firm expect?', a: 'The industry sits around one in four. The target we build toward is one in two. On Groundwork-sourced meetings — boards already qualified against your criteria — partners have closed 40–60% of qualified opportunities, because the board was in motion before the first meeting.' },
      { q: 'How soon do sales changes show up?', a: 'In the next pursuit. Messaging and proposal work are in your hands within weeks, and an RFP response runs on the RFP’s clock — even a short one. Groundwork fills the calendar over its first quarter, since booked meetings have to come from real conversations, not a list.' },
      { q: 'Who on our team needs to be involved?', a: 'The principal, whoever runs business development, and the manager who shows up to the site visit — the three people a board actually meets. We align their talk tracks, rebuild what they hand over, and coach the presenter before the selection meeting. Your team still closes; we make sure they walk in with the safest story in the room.' },
    ],
  },
  cta: { text: 'Thirty minutes tells you where your pursuits are leaking — proposal, pipeline, or the room.' },
};

export default data;
