// /boardretain/annual-report-production — copy from docs/redesign-handoff/site/boardretain-annual-report-production.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardretain/annual-report-production',
  engine: 'retain',
  name: 'Annual Report Production',
  eyebrow: 'BoardRetain™ · Annual report',
  h1: 'One document that proves',
  h1Accent: 'the year.',
  intro: 'At the annual meeting, the board has to justify your contract to a room of owners. Annual Report Production gives them the document: what was done, what it cost, what was saved, what’s next — designed to be forwarded, printed, and remembered when the contract comes up.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/contact' },
  stats: [
    { value: 1, suffix: 'document', note: 'Per association or firm-wide — the year, in owners’ hands' },
    { value: 12, suffix: 'months', note: 'Of work made visible in one place' },
    { value: 60, suffix: 'days', note: 'Before the annual meeting — that’s when we start' },
  ],
  sections: [
    {
      h: 'The renewal case, written a year early.',
      p: [
        'Every violation resolved, project completed, dollar saved, and meeting held is a line in the report. When the contract comes up, the board doesn’t have to remember what you did. They have it.',
        'Most CAM firms ship a stapled, photocopied packet instead, and most homeowners never open it. It checks the compliance box and does nothing for the contract. Operators who switch to a designed, narrated report see 1.7× higher board renewal probability.',
      ],
    },
    {
      h: 'Owners read it. Boards forward it.',
      p: [
        'Designed for the homeowner who skims: the numbers up front, the projects in pictures, the plan for next year on one page. Boards send it to the whole community because it makes them look good too.',
        'The pictures are real: on-site photography of the roof replacement, the pool deck refinish, the common areas, and community life. A stock aerial proves nothing. A photo of the finished project is the evidence.',
        'For the meeting itself, the deck comes from the same data and the same design, so the manager presenting the year isn’t building slides the night before.',
      ],
    },
    {
      h: 'Reserve health a homeowner can follow.',
      p: [
        'The structure is the one boards expect: year in review, reserve health, operations, capital projects, and next year’s priorities. The charts cover reserve funding, income against budget, capital spend by category, and special-assessment risk — built to pass a CFO’s check and a homeowner’s thirty-second skim.',
        'Around the charts, we translate CC&R, reserve-study, and audit language into plain English. Boards stop fielding “I don’t understand my dues” at the meeting, and your managers stop fielding it on the phone.',
      ],
    },
    {
      h: 'A board chair letter they’re proud to sign.',
      p: [
        'Every report opens with a letter from the board chair. We interview the chair, ghost-write the letter in their voice, fact-check it against the numbers, and they approve it word for word before it’s published.',
        'We don’t put words in a board’s mouth; we shape the ones the chair already uses. The letter turns a set of charts into the board’s own account of the year — the version it presents to owners and remembers at renewal.',
      ],
    },
    {
      h: 'Data pulled, not typed.',
      p: [
        'We work from your management platform’s reports and your managers’ notes. Your team’s job is a review, not a rewrite.',
        'The sources are your accounting export, the work-order log, the reserve study, and the year’s meeting minutes. Then we interview the manager and the board chair, because the numbers show what happened and the people explain why it mattered.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Report structure and content plan',
      'Data gathering from your platform',
      'Writing: year in review, financials, projects, outlook',
      'Design in your brand system',
      'Per-association or firm-wide editions',
      'Print and digital production',
      'Annual meeting presentation version',
      'Distribution templates for boards',
      'Board chair letter, ghost-written and approved',
      'On-site photography of completed projects',
      'Plain-English charts: reserves, budget, capital spend',
      'Accessible HTML version and social tiles',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Kick off', body: 'Sixty days out: scope, associations, data sources.' },
      { title: 'Gather', body: 'Reports, notes, photos, and numbers. Data pulls and interviews take about two weeks.' },
      { title: 'Produce', body: 'Written, designed, reviewed by your team. The chair approves the outline before design starts, and counsel reviews the disclosures.' },
      { title: 'Deliver', body: 'Print, PDF, and the meeting deck. Plus accessible HTML, social tiles, and a distribution playbook.' },
    ],
  },
  faq: {
    items: [
      { q: 'Per association or for the whole firm?', a: 'Both are common. Larger associations get their own; the firm edition goes in every proposal.' },
      { q: 'When should we start?', a: 'Sixty days before the first annual meeting in the season.' },
      { q: 'Does this replace our required annual disclosure?', a: 'No — it sits on top of it. Required state and CC&R disclosures are reproduced verbatim as your counsel directs, and counsel signs off on reserve language and forward-looking statements. Our work is the narrative, the design, and the distribution that get the document read.' },
      { q: 'Does it help us win new boards?', a: 'Yes. The annual report is the artifact boards forward most to other boards, so it works for BoardReach™ as much as BoardRetain™. Operators running the program report real inbound from other associations.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
