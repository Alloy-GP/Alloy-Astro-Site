// src/data/articles/hoa-management-software-limits.ts — /resources/hoa-management-software-limits
// Cluster page 9 (the brief's /insights/… → /resources/). Written to the handoff spec (2026-10-08): win on
// angle, no product comparison, no named vendor disparaged. Go-live 2026-11-03: until then noindex + out of sitemap.
import type { ArticleData } from './types';

export const data: ArticleData = {
  path: '/resources/hoa-management-software-limits',
  parent: { label: 'Resources', href: '/resources' },
  crumb: 'What software doesn’t fix',
  eyebrow: 'Insights',
  h1: 'What HOA management software',
  h1Accent: `doesn't fix.`,
  title: `What HOA Management Software Doesn't Fix | Alloy`,
  description: 'HOA software runs operations. It does not win contracts, keep boards or resolve delinquent accounts. The three gaps, and how management companies fill them.',
  keywords: ['hoa management software'],
  published: '2026-11-03',
  answer: `HOA management software runs the operation: accounting, owner portals, work orders, communications and board packets. It does not win contracts, keep boards or resolve delinquent accounts. Those three gaps are where management companies compete, and no platform closes them. The companies that grow treat software as the floor and build process and marketing on top.`,
  disclosure: 'short',
  noindex: 'Go-live 2026-11-03 per the brief. On that date: remove robots from the route, add the path to SITEMAP_ROUTES, activate the TODO link on page 4.',
  sections: [
    {
      id: 'what-platforms-cover',
      h2: 'What do the major platforms actually cover?',
      blocks: [
        { t: 'p', s: `The leading platforms are good at what they were built for, and most management companies should use one fully before buying anything else. The common coverage:` },
        { t: 'ul', items: [
          `**Accounting.** Assessments, payables, bank reconciliation, financial statements per association.`,
          `**Owner and board portals.** Payments, documents, requests, meeting materials.`,
          `**Operations.** Work orders, violations, architectural requests, vendor management.`,
          `**Communication.** Email and text broadcasts, reminder sequences, announcements.`,
          `**Reporting.** Aging, budget versus actual, board packets on a schedule.`,
        ] },
        { t: 'p', s: `If any of those is still being done in spreadsheets, that is the first project. [Our buyer's guide](/resources/hoa-management-software-guide) compares the platforms on exactly these points.` },
      ],
    },
    {
      id: 'gap-winning-contracts',
      h2: 'Gap one: software does not win contracts',
      blocks: [
        { t: 'p', s: `No platform makes a board choose you. Boards find candidates through search, through other board members and through reputation, then compare proposals. The platform is invisible in all three.` },
        { t: 'p', s: `What fills the gap is being findable and credible before the board compares anyone. That means a service page a board member understands, local and AI search presence, reviews and references. It also means a proposal that answers the board's real questions. [How to Grow an HOA Management Company](/resources/how-to-grow-an-hoa-management-company) covers each piece. Alloy's [BoardReach](/boardreach) engine is built for this gap.` },
        { t: 'p', s: `Two tests make this concrete. Search your own metro for "HOA management company". See whether your company appears with reviews and a page that answers a board member's questions. Then ask an AI assistant which companies to consider in your area. The platform you run has no effect on either answer.` },
      ],
    },
    {
      id: 'gap-keeping-boards',
      h2: 'Gap two: software does not keep boards',
      blocks: [
        { t: 'p', s: `A portal shows the board its documents. It does not make the board feel managed. Boards leave over communication, over delinquency and over service quality, and they experience all three through people, not screens.` },
        { t: 'p', s: `Platforms help at the edges: a response-time report, a reminder sequence, a monthly packet. The relationship work is the manager's. It is a standard for responses, a report the board can read in a minute, and board education that makes volunteers better. It is also a renewal conversation that starts early. [BoardRetain](/boardretain) is Alloy's system for that gap.` },
        { t: 'p', s: `A simple test: pick your three largest associations and write down, from memory, the last time each president heard from the manager without asking. If the answer is "the board packet", the portal is doing the talking and the relationship is drifting.` },
      ],
    },
    {
      id: 'gap-delinquent-accounts',
      h2: 'Gap three: software does not resolve delinquent accounts',
      blocks: [
        { t: 'p', s: `This is the gap most operators discover last. Platforms bill, remind and accept payments, and that keeps most owners current. The owners who stop responding are not a software problem. Past the policy trigger, an account needs validation, a plain-language notice, calls, a payment-plan option and a deadline.` },
        { t: 'p', s: `A pre-legal collections process fills this gap with a fixed window and a handoff. Accounts go to a non-attorney vendor for about 90 days before any attorney is involved. The platform stays the ledger. [Automating HOA Dues Collection](/collections/automating-hoa-dues-collection) maps where software stops and the process starts. [Collections as a Revenue Stream for HOA Management Companies](/collections) covers what the stage means for the management company's revenue.` },
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
          `**Delinquency handoff.** Can it flag accounts on a policy trigger date, export them to a vendor and take status back? That is the collections gap.`,
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
          ['Winning contracts', 'Nothing the board can see', `Search presence, reviews, references, a proposal that answers the board's questions`],
          ['Keeping boards', 'Portals, reminders, packets', 'Response standards, monthly reporting, board education, early renewal conversations'],
          ['Resolving delinquencies', 'Billing, autopay, reminders', 'A written policy with a trigger, a pre-legal stage with a deadline, attorney referral with documentation'],
        ] },
        { t: 'p', s: `Use the platform fully, then stop expecting it to do these three jobs. Each one is process and people, and each one is where a management company can be different from the one down the road.` },
      ],
    },
  ],
  faq: [
    { q: 'Which HOA management software is best?', a: `The one your team will use fully. The leading platforms cover accounting, portals, operations and communication well, and the differences matter less than adoption. Compare them on the points in our buyer's guide, then judge the rest of your growth on the three gaps no platform fills.` },
    { q: 'Can HOA software help win new associations?', a: `Indirectly. A good portal is a proposal talking point, and boards notice digital tools. But software does not make a board find you or trust you. That comes from search presence, reviews, references and the proposal itself. Lead with those, and mention the portal as one of the things the board will get.` },
    { q: 'Does HOA software reduce delinquencies?', a: `It reduces accidental lateness through autopay and reminders, which is worth a lot. It does not resolve accounts that stop responding. Those need a process with a trigger, a fixed window and a handoff, usually a pre-legal stage before the attorney.` },
    { q: 'Should we switch platforms to grow?', a: `Rarely. Switching costs months and seldom moves any of the three growth levers. Use the current platform fully first. If the gap is contracts, boards or delinquencies, the fix is process and marketing, not a migration. Switch when the platform fails at accounting or portals, which are the jobs it is actually for.` },
  ],
  next: [
    `Audit the three gaps against your own company. Then read [How to Grow an HOA Management Company](/resources/how-to-grow-an-hoa-management-company) for the levers, and [Automating HOA Dues Collection](/collections/automating-hoa-dues-collection) for the collections handoff.`,
  ],
  keepReading: [
    { kind: 'Guide', meta: 'Long read', title: 'Best HOA management software (2026): the buyer’s guide for CAM firms.', href: '/resources/hoa-management-software-guide', tone: 'blue' },
    { kind: 'Collections', meta: 'Software', title: 'Automating HOA dues collection: what software does and doesn’t solve.', href: '/collections/automating-hoa-dues-collection', tone: 'reach' },
    { kind: 'Insights', meta: 'Three levers', title: 'How to grow an HOA management company.', href: '/resources/how-to-grow-an-hoa-management-company', tone: 'match' },
  ],
  cta: { text: 'Software runs the operation. Thirty minutes with a CAM operator covers the three jobs it does not do.', label: 'Talk to Alloy' },
};
