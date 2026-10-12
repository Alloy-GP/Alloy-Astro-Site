// src/data/articles/winning-hoa-management-proposals.ts — /resources/winning-hoa-management-proposals
// Cluster page 11 (the brief's /insights/… → /resources/). Revised 2026-10-12 per the client notes: stronger advice
// on demonstrating value, board priorities and conversion; the collections differentiator is a plan, not a provider.
// Ahrefs (US, 2026-10-12): "hoa management proposal" 40/mo, "hoa rfp" 40, "hoa rfp template" 30, "rfp for hoa management services" 10 KD 0;
// "property management proposal" 50 and "… template" 60 KD 0 exist but are excluded (client: no property-management targeting).
// Go-live 2026-11-10: until then noindex + out of sitemap.
import type { ArticleData } from './types';

const APPFOLIO = 'https://www.appfolio.com/blog/new-research-reveals-what-hoa-board-members-want/';

export const data: ArticleData = {
  path: '/resources/winning-hoa-management-proposals',
  parent: { label: 'Resources', href: '/resources' },
  crumb: 'HOA management proposals',
  eyebrow: 'Insights',
  h1: 'What to put in',
  h1Accent: 'an HOA management proposal.',
  title: 'What to Put in an HOA Management Proposal | Alloy',
  description: 'What boards weigh when comparing HOA management proposals and RFP responses: fee structure, staffing, reporting, transition plan, a delinquency plan, proof.',
  keywords: ['hoa management proposal (40/mo)', 'hoa rfp (40)', 'hoa rfp template (30)', 'rfp for hoa management services (10, KD 0)'],
  published: '2026-11-10',
  answer: `Boards comparing HOA management proposals or RFP responses weigh five things. They want the fee structure and what it includes, the people who will actually manage the association, and the reporting they will see. They also want a transition plan and proof that other boards are happy. A clear plan for delinquent accounts is the differentiator most proposals leave out.`,
  disclosure: 'interest',
  noindex: 'Go-live 2026-11-10 per the brief. On that date: remove robots, add to SITEMAP_ROUTES, activate the TODO links on page 8.',
  aside: { title: 'Where does your proposal lose boards?', body: 'A conversation with a CAM operator about your last five proposals: what won, what lost, and what the board was really asking.', label: 'Review your proposals', href: '/contact?intent=proposals' },
  sections: [
    {
      id: 'what-boards-weigh',
      h2: 'What do boards actually weigh?',
      blocks: [
        { t: 'p', s: `Board members read proposals the way anyone reads a stack of bids. Fee page first, then the names, then whatever answers the problem that made them look. The company that writes for that order is easier to choose.` },
        { t: 'p', s: `The surveys that exist point the same way. In a 2022 AppFolio and HOA-USA survey of board members, 75% ranked funds management and financial reporting among their top three expectations. Unresponsiveness was the most cited reason to switch ([source](${APPFOLIO})). Treat the figures as directional. Treat the order as advice: money, reporting and responsiveness come before anything about your company.` },
        { t: 'p', s: `The sections below follow the order boards tend to read. Put each one where a volunteer can find it in a minute.` },
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
      id: 'delinquency-plan',
      h2: 'The differentiator: a clear plan for delinquent accounts',
      blocks: [
        { t: 'p', s: `Most proposals describe collections in a sentence about late notices and the attorney. Boards with a receivables problem notice the proposal that offers a plan instead.` },
        { t: 'p', s: `The plan is a process, not a product. Give it its own page. The trigger in the collection policy, what happens at each stage and on what dates, and who does what (your team, the association's attorney, any vendor the board chooses). Then what the board sees each month, and which accounts go to counsel from day one. If a middle stage before the attorney is part of your approach, describe it in those terms. Keep the board's existing attorney in the plan unless the board asks otherwise.` },
        { t: 'p', s: `Say who pays what, and under what authority in the governing documents and state law. If the management company earns anything from the process, say so in the proposal. Boards respect disclosure and resent surprises. [Collections as a Revenue Stream for HOA Management Companies](/collections) covers the approaches and the questions boards ask.` },
      ],
    },
    {
      id: 'demonstrating-value',
      h2: 'How do you show value instead of claiming it?',
      blocks: [
        { t: 'p', s: `Every proposal claims responsiveness, transparency and experience. Boards discount the words. They do not discount evidence:` },
        { t: 'ul', items: [
          `**Your own numbers.** Median response time from your system. Action items closed per meeting from a real set of minutes, names removed.`,
          `**A comparable story.** One association like theirs, what you found, what changed, with the president's permission. A receivables backlog that shrank. A project that finished.`,
          `**The sample packet.** The report they will get, filled in for a fictional association, so they can see it rather than imagine it.`,
          `**The transition plan with dates.** A schedule is evidence that you have done this before.`,
        ] },
        { t: 'p', s: `If you cannot produce the evidence yet, that is the first improvement, before the next proposal goes out.` },
      ],
    },
    {
      id: 'proof',
      h2: 'Proof: references, reviews, response times',
      blocks: [
        { t: 'p', s: `Boards call references. Give three, from associations like theirs, with each president's permission and a sentence on why that one is relevant. Add reviews with dates, and the response-time figure from your own records. Proof in a proposal is not a brag. It is the answer to "how do we know?"` },
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
          `**Answer the delinquency question before it is asked.** Boards with receivables problems want to hear the plan, the dates and who pays.`,
          `**Leave a one-page summary.** Fees, names, reporting, transition, references. The board will discuss you after you leave, from that page.`,
        ] },
      ],
    },
    {
      id: 'checklist',
      h2: 'The one-page checklist',
      blocks: [
        { t: 'ul', items: [
          `A cover letter that names the problem that made them look`,
          `Fee page: base fee, inclusions, full schedule, what changes it`,
          `Named manager, backup, accountant, escalation path, response standards`,
          `Sample monthly packet`,
          `Dated transition plan with the board's tasks`,
          `Delinquency plan page: trigger, stages, dates, who does what, who pays, reporting, disclosure`,
          `Evidence: your own numbers, a comparable story, three relevant references, dated reviews`,
        ] },
      ],
    },
  ],
  faq: [
    { q: 'How long should an HOA management proposal be?', a: `Long enough to answer the five questions boards ask and no longer. A fee page, a staffing page, a sample report, a transition plan, a delinquency plan and a proof page. Put a one-page cover letter in front. Boards skim. Headings and tables beat paragraphs.` },
    { q: 'Should the proposal include the full management agreement?', a: `Attach it, but do not make the board read it to find the fee. Summarize the term, renewal and termination clauses on the fee page and point to the agreement for the rest. A board that finds no surprises in the agreement later trusts the next one.` },
    { q: 'How do we price against a lower bid?', a: `Show what the lower bid leaves out, without naming the competitor. A complete fee schedule, named staff with response standards and a delinquency plan with dates make the comparison about scope rather than price. Boards that have been burned by extras know what a low base fee costs.` },
    { q: 'What is the biggest mistake in HOA management proposals?', a: `Writing for the company instead of the board. Pages of history and awards before the fee, a "dedicated manager" with no name, and collections covered in one sentence. Boards are volunteers with a problem. The proposal that names the problem and answers it wins.` },
  ],
  next: [
    `Rebuild the proposal around the checklist and gather the evidence first. If the delinquency plan is the page you cannot write yet, start with [Collections as a Revenue Stream for HOA Management Companies](/collections). If the whole document needs work, [talk to Alloy](/contact?intent=proposals).`,
  ],
  keepReading: [
    { kind: 'Insights', meta: 'Retention', title: 'Why HOA boards change management companies.', href: '/resources/why-associations-change-management-companies', tone: 'retain' },
    { kind: 'Insights', meta: 'Three levers', title: 'How to grow an HOA management company.', href: '/resources/how-to-grow-an-hoa-management-company', tone: 'match' },
    { kind: 'Service', meta: 'BoardMatch', title: 'RFP response system: answer every board the same strong way.', href: '/boardmatch/rfp-response-system', tone: 'reach' },
  ],
  cta: { text: 'The proposal is the close. Thirty minutes with a CAM operator covers your last five proposals, what won, what lost, and what to change.', label: 'Review your proposals', href: '/contact?intent=proposals' },
};
