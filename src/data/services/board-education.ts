// /boardretain/board-education — copy from docs/redesign-handoff/site/boardretain-board-education.dc.html
import type { ServicePageData } from './types';

const data: ServicePageData = {
  href: '/boardretain/board-education',
  engine: 'retain',
  name: 'Board Education Programs',
  eyebrow: 'BoardRetain™ · Board education',
  h1: 'Educated boards',
  h1Accent: 'renew.',
  intro: 'Boards leave when they don’t understand what you do. Board Education Programs for HOA management companies are branded micro-courses, workshops, and guides that teach volunteers their job — with your firm as the teacher. It is the most underused retention tool in the category.',
  secondaryCta: { label: 'Talk to a CAM operator', href: '/get-started' },
  stats: [
    { value: 4, suffix: 'micro-courses', note: 'In the BoardSuite Growth library, branded to your firm' },
    { value: 20, suffix: 'min', note: 'Typical course length — built for volunteers with day jobs' },
    { value: 1, suffix: 'teacher', note: 'You. Every lesson positions your firm as the authority' },
  ],
  sections: [
    {
      h: 'Why education is retention.',
      p: [
        'A board that understands reserves, insurance, and their fiduciary duty stops blaming the manager for things the manager didn’t cause. They also stop shopping — because switching means retraining themselves. Education is the switching cost you build on purpose.',
      ],
    },
    {
      h: 'What the library looks like.',
      p: [
        'Short, self-paced courses: new board member orientation, reading the financials, the budget process, running an effective meeting, reserve studies, insurance basics. Each branded to your firm, hosted where boards can find it, and referenced by your managers.',
      ],
    },
    {
      h: 'Formats that fit real boards.',
      p: [
        'Video micro-courses for onboarding. Live workshops at the annual meeting. One-page guides your manager leaves behind. A quarterly board briefing email. The mix is scoped to your portfolio.',
      ],
    },
  ],
  included: {
    h2: 'Scoped to your portfolio.',
    intro: 'Every line below is included in the retainer. Nothing is added after you sign.',
    items: [
      'Curriculum design for your portfolio',
      'Four to eight branded micro-courses',
      'Video production and editing',
      'Workshop decks and facilitator notes',
      'One-page board guides',
      'Hosting and access setup',
      'Manager playbook for using the library',
      'Completion tracking',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Map', body: 'Where boards get confused and where they churn.' },
      { title: 'Design', body: 'Curriculum, formats, and the manager playbook.' },
      { title: 'Produce', body: 'Courses, guides, and workshops.' },
      { title: 'Deploy', body: 'Onboarding, annual meetings, and quarterly cadence.' },
    ],
  },
  faq: {
    items: [
      { q: 'Do boards actually take these?', a: 'When the manager introduces them at onboarding and references them in meetings, yes. The playbook is half the product.' },
      { q: 'Can we sell this to boards?', a: 'Some firms do. Most include it as a retention differentiator and mention it in every proposal.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
