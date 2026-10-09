// src/data/articles/winning-hoa-management-proposals.ts — /resources/winning-hoa-management-proposals
// Cluster page 11 (the brief's /insights/… → /resources/). Written to the handoff spec (2026-10-08).
// Ahrefs volume check NOT run (no Ahrefs access from this workspace, 2026-10-09); candidate terms listed in `keywords`.
// Go-live 2026-11-10: until then noindex + out of sitemap.
import type { ArticleData } from './types';

export const data: ArticleData = {
  path: '/resources/winning-hoa-management-proposals',
  parent: { label: 'Resources', href: '/resources' },
  crumb: 'HOA management proposals',
  eyebrow: 'Insights',
  h1: 'What to put in',
  h1Accent: 'an HOA management proposal.',
  title: 'What to Put in an HOA Management Proposal | Alloy',
  description: 'The sections boards weigh when comparing HOA management proposals: fee structure, staffing, reporting, transition plan, a collections program, and proof.',
  keywords: ['hoa management proposal (volume unchecked)', 'hoa management company proposal (volume unchecked)', 'hoa management rfp (volume unchecked)'],
  published: '2026-11-10',
  answer: `Boards comparing HOA management proposals weigh five things. They want the fee structure and what it includes, the people who will actually manage the association, and the reporting they will see. They also want a transition plan and proof that other boards are happy. A collections program that costs the association nothing is the differentiator most proposals leave out.`,
  disclosure: 'short',
  noindex: 'Go-live 2026-11-10 per the brief, after the Ahrefs volume check. On that date: remove robots, add to SITEMAP_ROUTES, activate the TODO links on page 8.',
  sections: [
    {
      id: 'what-boards-compare-first',
      h2: 'What does the board compare first?',
      blocks: [
        { t: 'p', s: `Board members read proposals the way anyone reads a stack of bids. Fee page first, then the names, then whatever answers the problem that made them look. The company that writes for that order is easier to choose.` },
        { t: 'p', s: `The sections below are in the order boards tend to read them. Put each one where a volunteer can find it in a minute.` },
      ],
    },
    {
      id: 'cover-letter',
      h2: 'The cover letter: name the problem that made them look',
      blocks: [
        { t: 'p', s: `Boards rarely issue an RFP for fun. Something happened: a manager left, a project stalled, the receivables line grew, the budget missed. The cover letter is one page that names that problem in the board's words. It says what you would do about it in the first 90 days.` },
        { t: 'p', s: `Ask before you write. A ten-minute call with the president or the RFP contact usually surfaces the real reason. The proposals that lose answer a generic RFP. The ones that win answer the board.` },
      ],
    },
    {
      id: 'fee-structure',
      h2: 'Fee structure: what is included, and what is not?',
      blocks: [
        { t: 'p', s: `Boards want one number and a clear list of what it buys. They also want to know what will show up as an extra later, because that is what burned them last time.` },
        { t: 'ul', items: [
          `**The base fee.** Per door or flat, with the term and the renewal terms.`,
          `**What the base fee includes.** Meetings, financials, inspections, communications, with numbers where you can give them.`,
          `**The fee schedule.** Every ancillary charge, with the authority for any fee charged to owners.`,
          `**What changes the fee.** Door count, scope changes, state-mandated work.`,
        ] },
        { t: 'p', s: `A fee page that hides nothing wins trust even when it is not the lowest bid.` },
      ],
    },
    {
      id: 'staffing',
      h2: 'Staffing: who will actually manage us?',
      blocks: [
        { t: 'p', s: `Boards are buying a manager, not a company. Name the manager, the backup, the accountant and the escalation path. Give response-time standards in writing. If the manager carries a portfolio, say how large, because boards have been told "dedicated" before.` },
      ],
    },
    {
      id: 'reporting',
      h2: 'Reporting: what will we see, and when?',
      blocks: [
        { t: 'p', s: `Show a sample monthly packet: financials, aging by bucket, an action list with owners and dates, delinquency status by stage, projects. A board that can picture its monthly report believes it will get one.` },
      ],
    },
    {
      id: 'transition-plan',
      h2: 'Transition plan: how do we get from them to you?',
      blocks: [
        { t: 'p', s: `Switching is the board's biggest fear. A dated transition plan, with the records request, the bank changes, the owner communication and the first 90 days, answers it. Include who does what on the board's side. It is usually less than they expect.` },
      ],
    },
    {
      id: 'collections-differentiator',
      h2: 'The differentiator: a collections program that costs the association nothing',
      blocks: [
        { t: 'p', s: `Most proposals describe collections in a sentence about late notices and the attorney. Boards notice the proposal that offers a plan instead.` },
        { t: 'p', s: `A pre-legal collections program adds a stage between reminders and the attorney. A non-attorney vendor works delinquent accounts for a fixed window, usually 90 days, with plain-language notices, calls and payment plans. In owner-paid programs the charges are added to the delinquent owner's balance and the association pays nothing to participate. Unresolved accounts return to the board with a full contact history for the attorney.` },
        { t: 'p', s: `In the proposal, give it its own page. Cover the stages, the fixed window, what the vendor does not do (no liens, no suits, no foreclosure), who pays, and the monthly report the board will see. Say that the management company earns an administrative fee for coordinating accounts. Boards respect disclosure and resent surprises. [Collections as a Revenue Stream for HOA Management Companies](/collections) covers the program and the questions boards ask.` },
      ],
    },
    {
      id: 'proof',
      h2: 'Proof: references, reviews, response times',
      blocks: [
        { t: 'p', s: `Boards call references. Give three, from associations like theirs, with each president's permission and a sentence on why that one is relevant. Add reviews with dates, and a response-time figure from your own records. Proof in a proposal is not a brag. It is the answer to "how do we know?"` },
        { t: 'p', s: `Alloy's [proposal optimization](/boardmatch/proposal-optimization) service rebuilds the document around these sections, and the [RFP response system](/boardmatch/rfp-response-system) makes it repeatable.` },
      ],
    },
    {
      id: 'the-presentation',
      h2: 'The presentation: what to do in the room',
      blocks: [
        { t: 'p', s: `Most boards shortlist two or three companies and invite them to a meeting. The proposal got you in. The room decides.` },
        { t: 'ul', items: [
          `**Bring the manager.** The person who will run the association should speak for most of the meeting. Boards are choosing them, not the owner of the company.`,
          `**Lead with their problem.** Open with the issue from the cover letter and the plan for it. Save the company history for questions.`,
          `**Show the report.** Put the sample monthly packet on the table and walk the board through it in two minutes.`,
          `**Answer the collections question before it is asked.** Boards with delinquency problems want to hear the plan, the window and who pays.`,
          `**Leave a one-page summary.** Fees, names, reporting, transition, references. The board will discuss you after you leave, from that page.`,
        ] },
      ],
    },
    {
      id: 'checklist',
      h2: 'The one-page checklist',
      blocks: [
        { t: 'ul', items: [
          `Fee page: base fee, inclusions, full schedule, what changes it`,
          `Named manager, backup, accountant, escalation path, response standards`,
          `Sample monthly packet`,
          `Dated transition plan with the board's tasks`,
          `Collections program page: stages, window, limits, who pays, reporting, disclosure`,
          `Three relevant references, dated reviews, a response-time figure`,
          `A cover letter that answers the problem that made them look`,
        ] },
      ],
    },
  ],
  faq: [
    { q: 'How long should an HOA management proposal be?', a: `Long enough to answer the five questions boards ask and no longer. A fee page, a staffing page, a sample report, a transition plan, a collections page and a proof page. Put a one-page cover letter in front. Boards skim. Headings and tables beat paragraphs.` },
    { q: 'Should the proposal include the full management agreement?', a: `Attach it, but do not make the board read it to find the fee. Summarize the term, renewal and termination clauses on the fee page and point to the agreement for the rest. A board that finds no surprises in the agreement later trusts the next one.` },
    { q: 'How do we price against a lower bid?', a: `Show what the lower bid leaves out, without naming the competitor. A complete fee schedule, named staff with response standards and a collections plan make the comparison about scope rather than price. Boards that have been burned by extras know what a low base fee costs.` },
    { q: 'What is the biggest mistake in HOA management proposals?', a: `Writing for the company instead of the board. Pages of history and awards before the fee, a "dedicated manager" with no name, and collections covered in one sentence. Boards are volunteers with a problem. The proposal that names the problem and answers it wins.` },
  ],
  next: [
    `Rebuild the proposal around the checklist. If the collections page is the one you cannot write yet, start with [Collections as a Revenue Stream for HOA Management Companies](/collections). If the whole document needs work, [talk to Alloy](/contact).`,
  ],
  keepReading: [
    { kind: 'Insights', meta: 'Retention', title: 'Why associations change management companies.', href: '/resources/why-associations-change-management-companies', tone: 'retain' },
    { kind: 'Insights', meta: 'Three levers', title: 'How to grow an HOA management company.', href: '/resources/how-to-grow-an-hoa-management-company', tone: 'match' },
    { kind: 'Service', meta: 'BoardMatch', title: 'RFP response system: answer every board the same strong way.', href: '/boardmatch/rfp-response-system', tone: 'reach' },
  ],
  cta: { text: 'The proposal is the close. Thirty minutes with a CAM operator shows where yours loses boards.', label: 'Talk to Alloy' },
};
