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
  secondaryCta: { label: 'Talk to a CAM operator', href: '/contact' },
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
        'The proposal template carries a cover, narrative pages, financial overview, scope, fee schedule, and exhibits, editable in Word, InDesign, or Google Docs. Beside it sits a deck library: capabilities, RFP response, board presentation, annual report, and transition. Nobody reformats a Word file with a 2018 cover the night before a pitch.',
      ],
    },
    {
      h: 'Signage that markets while it informs.',
      p: [
        'Entrance signs, pool rules, notice boards — every community you manage is a billboard for the next one. Consistent, well-made signage tells the neighboring board who runs a tight operation.',
        'The standard extends to gate codes, amenity hours, construction notices, wayfinding, and parking, so no manager is designing a sign on the fly the week the pool opens.',
      ],
    },
    {
      h: 'Homeowner mail, formatted for the mail house.',
      p: [
        'Annual meeting notices, special-assessment letters, election ballots, welcome packets, board recruitment flyers. Every community sends them, usually on a vendor’s generic template with no sign of the firm that manages it.',
        'We build each one print-ready, to mail-house spec, in your brand. A homeowner opening a ballot sees the same firm that’s on the entrance sign and in the board packet.',
      ],
    },
    {
      h: 'Direct mail and tradeshow, when they fit.',
      p: [
        'A targeted mailer to boards with contracts up in six months. A CAI booth that doesn’t look like a folding table. We produce them when the campaign calls for it, never as a default.',
      ],
    },
    {
      h: 'The other surfaces with your name on them.',
      p: [
        'A working CAM firm needs 24 print and signage surfaces at any given time. Most have templates for two or three, and whoever’s free handles the rest. That’s how a maintenance truck ends up with a magnetic logo on white paint.',
        'We design the full set. Truck wraps, polos, hard hats, and equipment decals, so your crew reads as your crew on site. Letterhead, envelopes, business cards, name badges, and lanyards as a day-one kit for every new hire and every community you onboard.',
      ],
    },
    {
      h: 'One print library, one reorder form.',
      p: [
        'Every file lives in a central library with reorder triggers. When stationery runs low, a sign gets damaged, or a new community comes on, your team submits one form and the piece ships on a two-day turnaround — no out-of-stock scramble every quarter.',
        'Behind it is a vetted vendor network for digital, offset, large-format, and mail-house work. We bid each job, manage proofs and QC, and deliver. You sign off; we ship.',
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
      'Homeowner notices, ballots, and welcome packets',
      'Stationery and new-hire kits',
      'Print library with reorder triggers',
      '48-hour rush for board emergencies',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'System', body: 'Templates for everything you print, from the brand guidelines. We inventory every surface in use first — damaged, off-brand, missing.' },
      { title: 'Queue', body: 'A production calendar around your proposal and event dates.' },
      { title: 'Produce', body: 'Design, print, and delivery. The first run reaches your office and communities on a phased schedule.' },
      { title: 'Maintain', body: 'Updates as services, people, and proof change. Reorder triggers run in the background, and the system gets an annual review.' },
    ],
  },
  faq: {
    items: [
      { q: 'Do you handle printing or just design?', a: 'Both. We manage the vendors and the deadlines so your team gets a finished piece.' },
      { q: 'Can our team use the templates?', a: 'Yes — they’re built for it, with guidelines and a short training.' },
      { q: 'Can we keep our existing printer?', a: 'Yes. About a third of the firms we work with have a printer relationship they want to keep. We design to that printer’s specs, hand off print-ready files, and stay out of the procurement chain. Pricing adjusts accordingly.' },
      { q: 'How fast can you turn around a rush job?', a: 'Board emergencies — a special-assessment notice, capital project signage, a crisis mailer to homeowners — run on a 48-hour turnaround from approved file for digital print and small-format signage. Mail-house and large-format runs take five to seven business days.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
