// /boardreach/print-production — copy from docs/redesign-handoff/site/boardreach-print-production.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardreach/print-production',
  engine: 'reach',
  name: 'Print & Marketing Materials',
  eyebrow: 'BoardReach™ · Print',
  h1: 'The proposal on the table should look like',
  h1Accent: 'the winner.',
  intro: 'Boards still decide in a room, with paper. Print & Marketing Materials for HOA management companies covers the proposal binder, the leave-behind, the community signage, the tradeshow booth — designed as one system and produced on time.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 1, suffix: 'system', note: 'One set of templates across proposal, deck, mailer, signage' },
    { value: 10, suffix: '-day', note: 'Turnaround on most proposal production runs' },
    { value: 0, suffix: 'off-brand pieces', note: 'Every piece pulls from the same guidelines' },
  ],
  sections: [
    {
      h: 'Proposal production, not just design.',
      p: [
        'We handle the whole run: layout in your template, print, binding, and delivery to the meeting. Your BD lead walks in with a document that matches the pitch.',
      ],
    },
    {
      h: 'Signage that markets while it informs.',
      p: [
        'Entrance signs, pool rules, notice boards — every community you manage is a billboard for the next one. Consistent, well-made signage tells the neighboring board who runs a tight operation.',
      ],
    },
    {
      h: 'Direct mail and tradeshow, when they fit.',
      p: [
        'A targeted mailer to boards with contracts up in six months. A CAI booth that doesn’t look like a folding table. We produce them when the campaign calls for it, never as a default.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Proposal and RFP response templates',
      'Presentation deck system',
      'Leave-behinds and one-pagers',
      'Community signage standards and production',
      'Direct mail design and fulfillment',
      'Tradeshow booth and collateral',
      'Vehicle and uniform standards',
      'Print vendor management',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'System', body: 'Templates for everything you print, from the brand guidelines.' },
      { title: 'Queue', body: 'A production calendar around your proposal and event dates.' },
      { title: 'Produce', body: 'Design, print, and delivery.' },
      { title: 'Maintain', body: 'Updates as services, people, and proof change.' },
    ],
  },
  faq: {
    items: [
      { q: 'Do you handle printing or just design?', a: 'Both. We manage the vendors and the deadlines so your team gets a finished piece.' },
      { q: 'Can our team use the templates?', a: 'Yes — they’re built for it, with guidelines and a short training.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
