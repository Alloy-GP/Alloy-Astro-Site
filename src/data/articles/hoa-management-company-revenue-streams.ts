// src/data/articles/hoa-management-company-revenue-streams.ts — /resources/hoa-management-company-revenue-streams
// Cluster page 7 (the brief's /insights/… → the site's /resources/ article convention). Written to the handoff
// spec (2026-10-08). Go-live 2026-10-27: until then the route is noindex and the page is out of the sitemap.
import type { ArticleData } from './types';

export const data: ArticleData = {
  path: '/resources/hoa-management-company-revenue-streams',
  parent: { label: 'Resources', href: '/resources' },
  crumb: 'Revenue streams',
  eyebrow: 'Insights',
  h1: 'Revenue streams',
  h1Accent: 'for HOA management companies.',
  title: 'Revenue Streams for HOA Management Companies | Alloy',
  description: 'HOA management company revenue beyond the base fee: ancillary services, resale fees, project oversight, collections. Revenue per door ties it together.',
  keywords: ['property management revenue streams'],
  published: '2026-10-27',
  answer: `An HOA management company earns a base management fee per association, then adds revenue lines on top of it. The main ones are ancillary services billed by the task, transfer and resale fees, project oversight, and collections revenue from a pre-legal program. Revenue per door is the number that shows whether the lines add up.`,
  disclosure: 'short',
  noindex: 'Go-live 2026-10-27 per the brief. On that date: remove robots from the route, add the path to SITEMAP_ROUTES, activate the TODO links on pages 1 and 5.',
  sections: [
    {
      id: 'base-fee',
      h2: 'What is the base management fee, and why is it not enough?',
      blocks: [
        { t: 'p', s: `The base fee is the monthly contract amount per association, negotiated per door or as a flat figure. It funds the manager's time, the accounting, the board packets and the office. It is also the line every competitor bids against.` },
        { t: 'p', s: `Base fees are sticky in both directions. They rarely go up mid-contract, and the proposal that wins is often the one that goes down. Companies that grow on base fee alone grow only by adding doors, which means winning contracts faster than they lose them.` },
        { t: 'p', s: `Every other line on this page exists to make growth less dependent on that race.` },
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
        { t: 'p', s: `A quick audit finds the leaks. Pull one quarter of work orders, closings and board requests, and mark every task the schedule allows you to bill. Then check whether it was billed. Most companies find a short list of tasks that are done every month and invoiced never.` },
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
        { t: 'p', s: `Collections revenue is the newest line and the least understood. In a pre-legal collections program, delinquent accounts go to a non-attorney vendor for a fixed window, usually 90 days, before any attorney is involved. In owner-paid programs, the charges are added to the delinquent owner's balance and the association pays nothing.` },
        { t: 'p', s: `The management company earns a management company administrative fee inside that structure. It pays for coordinating each account: submission, answering the vendor's questions, posting payments and reporting to the board. The accounts already exist and the coordination is work the company already does. That is what makes it a revenue line rather than a new product.` },
        { t: 'p', s: `Before adding it, check four things:` },
        { t: 'ul', items: [
          `**Authority.** The governing documents and state law must allow the program's charges to be added to an owner's balance. The association's attorney confirms this.`,
          `**Disclosure.** The board should see the full fee schedule, including the management company's fee, before approving the program.`,
          `**Vendor limits.** The vendor must not give legal advice, file liens, sue or foreclose. Those stay with the attorney.`,
          `**Reporting.** The board gets stage and status for every account, monthly, without asking.`,
        ] },
        { t: 'p', s: `[Collections as a Revenue Stream for HOA Management Companies](/collections) covers the program end to end, including what boards ask before approving one.` },
      ],
    },
    {
      id: 'revenue-per-door',
      h2: 'Why is revenue per door the number that ties it together?',
      blocks: [
        { t: 'p', s: `Revenue per door is total revenue divided by the number of units under management. It is the one metric that captures every line above in a single figure, and it moves when any of them moves.` },
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
        { t: 'cta', s: `Revenue per door is one of three growth levers. Alloy builds the other two: attracting boards and keeping them.`, label: `See Alloy's services`, href: '/services' },
      ],
    },
  ],
  faq: [
    { q: 'What are the main revenue streams for an HOA management company?', a: `The base management fee per association comes first. On top of it sit ancillary service fees from the management agreement's schedule, transfer and resale fees, and project oversight fees on capital work. The newest line is collections revenue from a pre-legal program. Revenue per door, total revenue divided by units managed, shows whether the lines add up.` },
    { q: 'Is collections revenue a conflict of interest for the management company?', a: `It can be if it is hidden. The fee must be disclosed to the board as part of the program's full fee schedule. The charges must be allowed by the governing documents and state law, and the vendor must take no legal action. Handled that way, boards generally see it as payment for coordination work the company already does.` },
    { q: 'Should a management company raise its base fee or add revenue lines?', a: `Both, in the right order. Base fees should at least track costs at renewal. But lines tied to work the company already does, like collections coordination and documented ancillary services, add revenue without reopening the contract. Revenue per door shows whether the mix is improving.` },
    { q: 'How often should the fee schedule be reviewed?', a: `Annually, before renewal season. Work changes faster than the agreement: new state disclosure rules, new lender forms, new project types. A schedule the board signed three years ago is leaving revenue unbilled and inviting disputes about what is included. Review it with the board at renewal so nothing in it is a surprise later.` },
  ],
  next: [
    `Run the revenue-per-door worksheet for this quarter and the same quarter last year. If collections is the line that is missing, [Collections as a Revenue Stream for HOA Management Companies](/collections) explains how the program works. If the missing lever is doors, [talk to Alloy](/contact).`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/collections/cost-of-delinquent-accounts', tone: 'match' },
    { kind: 'Insights', meta: 'Three levers', title: 'How to grow an HOA management company.', href: '/resources/how-to-grow-an-hoa-management-company', tone: 'reach' },
    { kind: 'Strategy', meta: '12 min read', title: 'Marketing an HOA management company: the plan before the tactics.', href: '/resources/cam-marketing-strategy', tone: 'blue' },
  ],
  cta: { text: 'Revenue per door is one lever. Thirty minutes with a CAM operator tells you which of the three to pull first.', label: 'Talk to Alloy' },
};
