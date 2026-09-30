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
        'It also changes who delivers bad news. A board that took the reserve course hears about a shortfall from its manager in a budget workshop, months before an owner raises it at the annual meeting. The special assessment is still unwelcome. It just isn’t a surprise, and it isn’t pinned on you.',
      ],
    },
    {
      h: 'What the library looks like.',
      p: [
        'Short, self-paced courses: new board member orientation, reading the financials, the budget process, running an effective meeting, reserve studies, insurance basics. Each branded to your firm, hosted where boards can find it, and referenced by your managers.',
        'A micro-course is a short run of lessons — often five — that a director can finish in a week. Each lesson covers one decision the board actually makes. The reserve-study course, for example, walks through what the study measures, when it gets updated, and what the percent-funded figure means for dues. Vendor oversight and bid review follow the same pattern.',
      ],
    },
    {
      h: 'A track for every new director.',
      p: [
        'Board turnover is where retention slips. A new director arrives with no memory of why the board hired you and a neighbor’s opinion of how things should run. The onboarding track gives every new director the same first-90-days curriculum — orientation, the financials, fiduciary duty — introduced by their manager at the first meeting.',
        'That shortens the manager’s first year with each new director. The questions a new treasurer would have raised across three meetings get answered in a lesson taken at home.',
      ],
    },
    {
      h: 'Formats that fit real boards.',
      p: [
        'Video micro-courses for onboarding. Live workshops at the annual meeting. One-page guides your manager leaves behind. A quarterly board briefing email. The mix is scoped to your portfolio.',
        'Every course sign-up captures the director’s email address, which gives your firm a direct line to each person on the board, not only the president. Live workshops get recorded and added to the library for the directors who missed them.',
      ],
    },
    {
      h: 'When state law changes, you explain it first.',
      p: [
        'Legislatures keep changing the rules associations run under: reserve requirements, meeting notice, collections. When a change passes in your state, we produce a branded explainer your managers send to every board. Directors forward your email instead of searching for the answer, and the firm that explained the change looks like the firm in charge of it.',
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
      'New-director onboarding track',
      'Branded explainers when state law changes',
      'Hosting and access setup',
      'Manager playbook for using the library',
      'Completion tracking',
    ],
  },
  process: {
    h2: 'How it works.',
    intro: 'Four steps, one accountable team. Timelines are scoped at the Strategic Review.',
    steps: [
      { title: 'Map', body: 'Where boards get confused and where they churn. We start with your managers’ most-asked questions and the boards you’ve lost.' },
      { title: 'Design', body: 'Curriculum, formats, and the manager playbook.' },
      { title: 'Produce', body: 'Courses, guides, and workshops.' },
      { title: 'Deploy', body: 'Onboarding, annual meetings, and quarterly cadence.' },
    ],
  },
  faq: {
    items: [
      { q: 'Do boards actually take these?', a: 'When the manager introduces them at onboarding and references them in meetings, yes. The playbook is half the product.' },
      { q: 'Can we sell this to boards?', a: 'Some firms do. Most include it as a retention differentiator and mention it in every proposal.' },
      { q: 'Is this included in BoardSuite?', a: 'Growth includes four micro-courses, branded to your firm. Scale adds custom course production, so the library can grow into what’s specific to your portfolio.' },
      { q: 'Who writes the courses?', a: 'We do, from interviews with your managers and your own documents — the budget calendar, meeting procedures, how you run bids. Your firm reviews everything before it goes live. Courses teach general practice and your process; they don’t replace advice from the association’s attorney or reserve specialist.' },
    ],
  },
  cta: { text: 'Is your metro still open? Thirty minutes tells you — and which engine to fix first.' },
};

export default data;
