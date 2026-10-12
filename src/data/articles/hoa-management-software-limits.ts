// src/data/articles/hoa-management-software-limits.ts — /resources/hoa-management-software-limits
// Cluster page 9 (the brief's /insights/… → /resources/). Revised 2026-10-12 per the client notes: limits of
// software alone, how adoption, process, people and technology work together, no platform generalizations,
// no provider named. Go-live 2026-11-03: until then noindex + out of sitemap.
import type { ArticleData } from './types';

export const data: ArticleData = {
  path: '/resources/hoa-management-software-limits',
  parent: { label: 'Resources', href: '/resources' },
  crumb: 'What software doesn’t fix',
  eyebrow: 'Insights',
  h1: 'What HOA management software',
  h1Accent: `doesn't fix.`,
  title: `What HOA Management Software Doesn't Fix | Alloy`,
  description: 'HOA software runs operations. On its own it does not win contracts, keep boards or resolve delinquent accounts. Three gaps and how people and process fill them.',
  keywords: ['hoa management software'],
  published: '2026-11-03',
  answer: `HOA management software runs the operation: accounting, owner portals, work orders, communications and board packets. On its own it does not win contracts, keep boards or resolve delinquent accounts. Those three gaps are where management companies compete, and no platform closes them without people and process around it. The companies that grow treat software as the floor.`,
  disclosure: 'interest',
  noindex: 'Go-live 2026-11-03 per the brief. On that date: remove robots from the route, add the path to SITEMAP_ROUTES, activate the TODO link on page 4.',
  aside: { title: 'Is the platform doing its share?', body: 'A conversation with a CAM operator about adoption, process and where your tools and people are falling short of each other.', label: 'Review your tools', href: '/contact?intent=operations' },
  sections: [
    {
      id: 'what-platforms-cover',
      h2: 'What do the major platforms actually cover?',
      blocks: [
        { t: 'p', s: `Most established platforms are good at what they were built for, and most management companies should use theirs fully before buying anything else. The common coverage:` },
        { t: 'ul', items: [
          `**Accounting.** Assessments, payables, bank reconciliation, financial statements per association.`,
          `**Owner and board portals.** Payments, documents, requests, meeting materials.`,
          `**Operations.** Work orders, violations, architectural requests, vendor management.`,
          `**Communication.** Email and text broadcasts, reminder sequences, announcements.`,
          `**Reporting.** Aging, budget versus actual, board packets on a schedule.`,
        ] },
        { t: 'p', s: `If any of those is still being done in spreadsheets, that is the first project. [Our buyer's guide](/resources/hoa-management-software-guide) compares the platforms on exactly these points. Features differ between platforms, so check the specifics against your own needs rather than assuming.` },
      ],
    },
    {
      id: 'gap-winning-contracts',
      h2: 'Gap one: software does not win contracts',
      blocks: [
        { t: 'p', s: `No platform makes a board choose you. Boards find candidates through search, through other board members and through reputation, then compare proposals. The platform is mostly invisible in all three, with one exception: a good portal is a proposal talking point, and boards notice digital tools.` },
        { t: 'p', s: `Two tests make this concrete. Search your own metro for "HOA management company". See whether your company appears with reviews and a page that answers a board member's questions. Then ask an AI assistant which companies to consider in your area. The platform you run has little effect on either answer.` },
        { t: 'p', s: `What fills the gap is being findable and credible before the board compares anyone. That means a service page a board member understands, local and AI search presence, reviews and references. It also means a proposal that answers the board's real questions. [How to Grow an HOA Management Company](/resources/how-to-grow-an-hoa-management-company) covers each piece. Alloy's [BoardReach](/boardreach) engine is built for this gap.` },
      ],
    },
    {
      id: 'gap-keeping-boards',
      h2: 'Gap two: software does not keep boards',
      blocks: [
        { t: 'p', s: `A portal shows the board its documents. It does not make the board feel managed. Boards leave over communication, over delinquency and over service quality, and they experience all three through people, not screens.` },
        { t: 'p', s: `A simple test: pick your three largest associations and write down, from memory, the last time each president heard from the manager without asking. If the answer is "the board packet", the portal is doing the talking and the relationship is drifting.` },
        { t: 'p', s: `Platforms help at the edges: a response-time report, a reminder sequence, a monthly packet. The relationship work is the manager's. It is a standard for responses, a report the board can read in a minute, and board education that makes volunteers better. It is also a renewal conversation that starts early. [BoardRetain](/boardretain) is Alloy's system for that gap.` },
      ],
    },
    {
      id: 'gap-delinquent-accounts',
      h2: 'Gap three: software does not resolve delinquent accounts on its own',
      blocks: [
        { t: 'p', s: `This is the gap most operators discover last. Platforms bill, remind and accept payments, and that keeps most owners current. The owners who stop responding are not a software problem. Past the policy trigger, an account needs validation, a plain-language notice, calls, a payment-plan option and a deadline, and someone accountable for each.` },
        { t: 'p', s: `A defined next stage fills this gap, whether it is an internal team, the attorney's pre-lien cadence or a pre-legal vendor. It has a window, a cadence and an exit rule, and the platform stays the ledger. [Automating HOA Dues Collection](/collections/automating-hoa-dues-collection) maps where software stops and the process starts. [Collections as a Revenue Stream for HOA Management Companies](/collections) covers the approaches and what each one costs.` },
      ],
    },
    {
      id: 'people-process-platform',
      h2: 'How do people, process and platform work together?',
      blocks: [
        { t: 'p', s: `The platforms that disappoint are rarely bad. They are half-adopted. Three questions tell you whether the problem is the tool or the way it is used:` },
        { t: 'ul', items: [
          `**Adoption.** What share of owners are on autopay? What share of associations get their packet from the platform rather than from a manager's inbox? Which reports are still built by hand?`,
          `**Ownership.** For each process the platform supports, who owns it, and would it keep running if that person left? A platform with no process owner becomes a filing cabinet.`,
          `**Training.** When did the team last learn a feature it already pays for? Most platforms add capabilities faster than companies adopt them.`,
        ] },
        { t: 'p', s: `Then resource the fix. Sometimes that is a configuration afternoon. Sometimes it is a process rewrite with the platform doing the routine steps. Sometimes it is an outside resource for the part no platform does, such as working delinquent accounts or winning boards. The platform, the process and the people have to be designed together, or each blames the other.` },
      ],
    },
    {
      id: 'what-to-ask-vendors',
      h2: 'What should you ask a platform vendor about the three gaps?',
      blocks: [
        { t: 'p', s: `Buying or renewing a platform is the right moment to ask about the edges. The honest answer is usually "that is not what we do". Useful questions:` },
        { t: 'ul', items: [
          `**Response times.** Can the platform report how long each owner and board request waited for a reply? That number is the start of a retention standard.`,
          `**Variance flags.** Can it flag budget-versus-actual variances in the month they happen, by association, without a custom report?`,
          `**Delinquency handoff.** Can it flag accounts on a policy trigger date, export them to whoever works the next stage, and take status back? That is the collections gap.`,
          `**Data out.** Can you export what you need, in a usable format, for a proposal, a board report or a vendor? A platform that holds data hostage limits every other fix.`,
        ] },
        { t: 'p', s: `None of these buy you growth. They stop the platform from getting in the way of it.` },
      ],
    },
    {
      id: 'filling-the-gaps',
      h2: 'How do management companies fill the gaps?',
      blocks: [
        { t: 'table', caption: 'Three gaps and what fills them', head: ['Gap', 'What software does', 'What fills the rest'], rows: [
          ['Winning contracts', 'Little the board can see, beyond a portal to mention', `Search presence, reviews, references, a proposal that answers the board's questions`],
          ['Keeping boards', 'Portals, reminders, packets', 'Response standards, monthly reporting, board education, early renewal conversations'],
          ['Resolving delinquencies', 'Billing, autopay, reminders, flags', 'A written policy with a trigger, a defined next stage with a deadline, attorney referral with documentation'],
        ] },
        { t: 'p', s: `Use the platform fully, then stop expecting it to do these three jobs alone. Each one is process and people with the platform underneath. Each one is where a management company can be different from the one down the road.` },
      ],
    },
  ],
  faq: [
    { q: 'Which HOA management software is best?', a: `The one your team will use fully. The established platforms cover accounting, portals, operations and communication, and for most companies adoption matters more than the differences between them. Compare them on the points in our buyer's guide, then judge the rest of your growth on the three gaps no platform fills alone.` },
    { q: 'Can HOA software help win new associations?', a: `Indirectly. A good portal is a proposal talking point, and boards notice digital tools. But software does not make a board find you or trust you. That comes from search presence, reviews, references and the proposal itself. Lead with those, and mention the portal as one of the things the board will get.` },
    { q: 'Does HOA software reduce delinquencies?', a: `It reduces accidental lateness through autopay and reminders, which is worth a lot. It does not resolve accounts that stop responding. Those need a process with a trigger, a defined window and a handoff. People have to be accountable for it, with the platform as the ledger underneath.` },
    { q: 'Should we switch platforms to grow?', a: `Rarely. Switching costs months and seldom moves any of the three growth levers. Use the current platform fully first. If the gap is contracts, boards or delinquencies, the fix is process and marketing, not a migration. Switch when the platform fails at accounting or portals, which are the jobs it is actually for.` },
  ],
  next: [
    `Audit the three gaps and the three adoption questions against your own company. Then read [How to Grow an HOA Management Company](/resources/how-to-grow-an-hoa-management-company) for the levers, and [Automating HOA Dues Collection](/collections/automating-hoa-dues-collection) for the collections handoff.`,
  ],
  keepReading: [
    { kind: 'Guide', meta: 'Long read', title: 'Best HOA management software (2026): the buyer’s guide for CAM firms.', href: '/resources/hoa-management-software-guide', tone: 'blue' },
    { kind: 'Collections', meta: 'Software', title: 'Automating HOA dues collection: what software does and doesn’t solve.', href: '/collections/automating-hoa-dues-collection', tone: 'reach' },
    { kind: 'Insights', meta: 'Three levers', title: 'How to grow an HOA management company.', href: '/resources/how-to-grow-an-hoa-management-company', tone: 'match' },
  ],
  cta: { text: 'Software runs the operation. Thirty minutes with a CAM operator covers adoption, process and where your tools and people are falling short of each other.', label: 'Review your operations and tools', href: '/contact?intent=operations' },
};
