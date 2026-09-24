// /boardreach/hoa-management-branding — copy from docs/redesign-handoff/site/boardreach-hoa-management-branding.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardreach/hoa-management-branding',
  engine: 'reach',
  name: 'Branding for CAM',
  eyebrow: 'BoardReach™ · Brand',
  h1: 'Look like the firm boards',
  h1Accent: 'already trust.',
  intro: 'When a board compares three management companies, the one that looks established gets the benefit of the doubt. Branding for CAM is a logo, a visual system, a messaging architecture, and the guidelines to keep them consistent across proposals, signage, and screens.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 3, suffix: 'firms', note: 'How many boards usually shortlist. Looking like the safe choice matters.' },
    { value: 60, suffix: '–90 days', note: 'Typical identity project from discovery to guidelines' },
    { value: 1, suffix: 'firm per metro', note: 'Your identity is never reused for a competitor' },
  ],
  sections: [
    {
      h: 'The brand does its work before you say a word.',
      p: [
        'Board members are volunteers. They don’t read your proposal cover to cover; they form an impression in the first pages and confirm it in the meeting. A coherent identity — one that looks like it belongs in the room with the incumbent — buys you the credibility to be heard.',
      ],
    },
    {
      h: 'Messaging architecture, not just a mark.',
      p: [
        'We define what you say and in what order: the positioning statement, the proof points, the language for each service and each audience. Every proposal, page, and post pulls from the same source, so your firm sounds like one firm.',
      ],
    },
    {
      h: 'Built to survive every surface.',
      p: [
        'Signage at the community entrance. A 40-page proposal. A LinkedIn post. A truck. We deliver the system and the rules so the identity holds up in every one of them — and a print system your team can actually use.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Brand audit and competitive review',
      'Positioning and messaging architecture',
      'Logo and visual identity system',
      'Typography, color, and layout rules',
      'Proposal, deck, and letterhead templates',
      'Signage and vehicle standards',
      'Brand guidelines document',
      'Rollout plan across web, print, and social',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Audit', body: 'How you look next to the firms you lose to.' },
      { title: 'Position', body: 'What you stand for and how you say it.' },
      { title: 'Design', body: 'Identity, system, and templates — reviewed with your team.' },
      { title: 'Roll out', body: 'Guidelines, files, and training for whoever touches the brand.' },
    ],
  },
  faq: {
    items: [
      { q: 'We have a logo. Do we need a rebrand?', a: 'Maybe not. If the mark works, we build the system around it — messaging, templates, guidelines. A new mark is only the answer when the current one costs you credibility.' },
      { q: 'Who owns the files?', a: 'You do. Every source file, every template, every guideline is delivered and yours.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
