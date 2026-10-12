// src/data/articles/hoa-management-company-revenue-streams.ts — /resources/hoa-management-company-revenue-streams
// Cluster page 7 (the brief's /insights/… → /resources/). Revised 2026-10-12 per the client notes: revenue vs.
// contribution to profit made explicit, collections revenue conditional, no provider named.
// Go-live 2026-10-27: until then noindex and out of the sitemap.
import type { ArticleData } from './types';

export const data: ArticleData = {
  path: '/resources/hoa-management-company-revenue-streams',
  parent: { label: 'Resources', href: '/resources' },
  crumb: 'Revenue streams',
  eyebrow: 'Insights',
  h1: 'Revenue streams',
  h1Accent: 'for HOA management companies.',
  title: 'Revenue Streams for HOA Management Companies | Alloy',
  description: 'HOA management company revenue beyond the base fee: ancillary services, resale fees, project oversight, collections. Which lines add to profit, and how to tell.',
  keywords: ['property management revenue streams'],
  published: '2026-10-27',
  answer: `An HOA management company earns a base management fee per association, then adds revenue lines on top of it. The main ones are ancillary services billed by the task, transfer and resale fees, project oversight, and in some models collections coordination. Revenue per door shows whether the lines add up. Contribution per line shows whether they add to profit.`,
  disclosure: 'interest',
  noindex: 'Go-live 2026-10-27 per the brief. On that date: remove robots from the route, add the path to SITEMAP_ROUTES, activate the TODO links on pages 1 and 5.',
  aside: { title: 'Which lines actually make money?', body: 'A conversation with a CAM operator about your fee schedule, the hours behind each line and where margin is leaking.', label: 'Talk revenue and margin', href: '/contact?intent=profitability' },
  sections: [
    {
      id: 'base-fee',
      h2: 'What is the base management fee, and why is it not enough?',
      blocks: [
        { t: 'p', s: `The base fee is the monthly contract amount per association, negotiated per door or as a flat figure. It funds the manager's time, the accounting, the board packets and the office. It is also the line every competitor bids against.` },
        { t: 'p', s: `Base fees are sticky in both directions. They rarely go up mid-contract, and the proposal that wins is often the one that goes down. Companies that grow on base fee alone grow only by adding doors, which means winning contracts faster than they lose them.` },
        { t: 'p', s: `Every other line on this page exists to make growth less dependent on that race. Not every line is worth having, which is the point of the section on contribution.` },
      ],
    },
    {
      id: 'ancillary-services',
      h2: 'What ancillary services do management companies bill for?',
      blocks: [
        { t: 'p', s: `Ancillary fees are charges for work outside the base scope, listed in the management agreement's fee schedule. Common lines:` },
        { t: 'ul', items: [
          `**Document and compliance work.** Resale certificates, estoppel letters, lender questionnaires, violation letters beyond a set number.`,
          `**Meetings and events.** Extra board meetings, annual meeting support, election administration.`,
          `**Administrative extras.** Mailings, printing, records requests, after-hours calls.`,
          `**Project oversight.** A percentage or flat fee for managing capital projects, insurance claims and reconstruction.`,
        ] },
        { t: 'p', s: `The rule for boards is that every ancillary fee should be in the schedule the board signed. The rule for operators is that the schedule should be reviewed yearly, because the work changes faster than the document.` },
        { t: 'p', s: `A quick audit finds the leaks. Pull one quarter of work orders, closings and board requests, and mark every task the schedule allows you to bill. Then check whether it was billed. Most companies find a short list of tasks that are done every month and invoiced rarely.` },
      ],
    },
    {
      id: 'transfer-resale-project-fees',
      h2: 'How do transfer, resale and project fees work?',
      blocks: [
        { t: 'p', s: `Transfer and resale fees are charged at a closing, usually to the buyer or seller. They cover the account setup, the records transfer and the resale disclosure package. Many states regulate what can be charged and to whom, so the fee schedule should cite the authority.` },
        { t: 'p', s: `Project oversight fees apply when the association undertakes capital work: roofs, paving, reconstruction after a loss. The management company coordinates bids, contractors and draws, and bills a percentage of the project or a flat fee. Boards accept this when the scope is written down before the project starts.` },
        { t: 'p', s: `Both lines are lumpy. Closings follow the housing market and projects follow reserve studies. They add revenue, but a growth plan cannot be built on them.` },
      ],
    },
    {
      id: 'collections-revenue',
      h2: 'How does collections revenue work, and what should you check first?',
      blocks: [
        { t: 'p', s: `Collections revenue is the newest line and the least understood. It exists in two forms. A board-approved administration fee in the management agreement pays the management company for delinquency work. Or, in some pre-legal vendor arrangements, charges are added to the delinquent owner's balance where the governing documents and state law allow. A coordination fee for the management company sits inside them.` },
        { t: 'p', s: `Neither is automatic. Not every account produces revenue. Charges that cannot be recovered may fall back to the association, and in some states the owner-paid model is contested. It is a candidate line rather than a new product because the accounts already exist. The coordination is work the company already does.` },
        { t: 'p', s: `Before adding it, check four things:` },
        { t: 'ul', items: [
          `**Authority.** The governing documents, state law and the management agreement must allow the charge. The association's attorney confirms this.`,
          `**Disclosure.** The board should see the full fee schedule, including anything the management company earns, before approving the arrangement.`,
          `**Limits.** Whoever runs the stage must not give legal advice, file liens, sue or foreclose. Those stay with the attorney.`,
          `**Reporting.** The board gets stage and status for every account, monthly, without asking.`,
        ] },
        { t: 'p', s: `[Collections as a Revenue Stream for HOA Management Companies](/resources/collections) covers the approaches and what boards ask before approving one. It also shows how to review the process you have.` },
      ],
    },
    {
      id: 'revenue-vs-profit',
      h2: 'Which of these lines actually add to profit?',
      blocks: [
        { t: 'p', s: `Revenue is what the line bills. Contribution is what is left after the hours it takes to deliver. The two are not the same, and companies that track only the first sometimes add lines that lose money.` },
        { t: 'table', caption: 'Revenue line vs. what usually drives its contribution', head: ['Line', 'What drives contribution', 'Watch for'], rows: [
          ['Base fee', 'Hours per association against the fee. Delinquency, projects and board demands move it.', 'Associations priced three years ago at today’s hours.'],
          ['Ancillary services', 'Usually high contribution when the work is routine and documented, because the hours are already being spent.', 'Work done but not billed. Fees the board did not sign.'],
          ['Transfer and resale', 'Mostly fixed effort per closing, so contribution tracks volume.', 'Lumpy. State limits on who can be charged.'],
          ['Project oversight', 'Depends on the hours the project consumes against the percentage or flat fee.', 'Scope creep. Projects priced before the scope was written.'],
          ['Collections coordination', 'Only positive if the fee covers the coordination hours. A managed process lowers the hours either way.', 'Charges without authority. Boards that were not told.'],
        ] },
        { t: 'worksheet', title: 'Worksheet: contribution per line, this quarter', rows: [
          { label: 'Revenue from the line this quarter', hint: 'From invoices, by line.' },
          { label: 'Hours spent delivering it', hint: 'Estimate from a typical week if you do not track time. Include accounting and admin.' },
          { label: 'Loaded hourly cost', hint: 'Wages plus payroll taxes, benefits and a share of overhead.' },
        ], result: 'Contribution = revenue − (hours × loaded hourly cost)', note: 'Run it for each line. A line with revenue and no contribution is a cost with a nicer name.' },
      ],
    },
    {
      id: 'revenue-per-door',
      h2: 'Why is revenue per door the number that ties it together?',
      blocks: [
        { t: 'p', s: `Revenue per door is total revenue divided by the number of units under management. It is the one metric that captures every line above in a single figure, and it moves when any of them moves. Pair it with contribution per association and you can see both whether the lines add up and whether they add to profit.` },
        { t: 'p', s: `Track it quarterly, by association, and watch three things:` },
        { t: 'ul', items: [
          `**Direction.** Rising revenue per door with a flat door count means the lines are working. Flat revenue per door with a rising door count means growth is coming from the base fee race.`,
          `**Spread.** Associations with the lowest revenue per door are the ones to review first: wrong fee schedule, unbilled work or a contract due for renegotiation.`,
          `**Mix.** How much of the figure is base fee versus everything else. Companies with a healthier mix are less exposed when a proposal war starts.`,
        ] },
        { t: 'worksheet', title: 'Worksheet: revenue per door, this quarter', rows: [
          { label: 'Total revenue this quarter', hint: 'All lines: base fees, ancillary, transfer and resale, project oversight, collections.' },
          { label: 'Doors under management', hint: 'Units across every association at quarter end.' },
        ], result: 'Revenue per door = total revenue ÷ doors', note: `Run it for the same quarter last year. The direction matters more than the figure.` },
        { t: 'cta', s: `Revenue per door is one of three growth levers. Alloy helps management companies work on all three, and on the margin underneath them.`, label: 'Talk through revenue and margin', href: '/contact?intent=profitability' },
      ],
    },
  ],
  faq: [
    { q: 'What are the main revenue streams for an HOA management company?', a: `The base management fee per association comes first. On top of it sit ancillary service fees from the management agreement's schedule, transfer and resale fees, and project oversight fees on capital work. The newest line, in some models, is collections coordination. Revenue per door, total revenue divided by units managed, shows whether the lines add up.` },
    { q: 'Is collections revenue a conflict of interest for the management company?', a: `It can be if it is hidden or unauthorized. The fee must be disclosed to the board as part of the full fee schedule. The charges must be allowed by the governing documents, state law and the management agreement. Handled that way, boards generally see it as payment for coordination work the company already does.` },
    { q: 'Should a management company raise its base fee or add revenue lines?', a: `Both, in the right order. Base fees should at least track costs at renewal. But lines tied to work the company already does, like documented ancillary services, add revenue without reopening the contract. Contribution per line shows whether each one is worth having. Revenue per door shows whether the mix is improving.` },
    { q: 'How often should the fee schedule be reviewed?', a: `Annually, before renewal season. Work changes faster than the agreement: new state disclosure rules, new lender forms, new project types. A schedule the board signed three years ago is leaving revenue unbilled and inviting disputes about what is included. Review it with the board at renewal so nothing in it is a surprise later.` },
  ],
  next: [
    `Run both worksheets for this quarter and the same quarter last year. If collections is the line that is missing or unmanaged, [Collections as a Revenue Stream for HOA Management Companies](/resources/collections) explains the approaches. If the question is margin across the whole business, [talk to Alloy](/contact?intent=profitability).`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/resources/collections/cost-of-delinquent-accounts', tone: 'match' },
    { kind: 'Insights', meta: 'Three levers', title: 'How to grow an HOA management company.', href: '/resources/how-to-grow-an-hoa-management-company', tone: 'reach' },
    { kind: 'Strategy', meta: '12 min read', title: 'Marketing an HOA management company: the plan before the tactics.', href: '/resources/cam-marketing-strategy', tone: 'blue' },
  ],
  cta: { text: 'Revenue is easy to add and margin is easy to lose. Thirty minutes with a CAM operator covers your fee schedule, the hours behind it and where to look first.', label: 'Talk through revenue and margin', href: '/contact?intent=profitability' },
};
