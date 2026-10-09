// src/data/articles/automating-hoa-dues-collection.ts — /collections/automating-hoa-dues-collection (cluster page 4)
// Written to the handoff spec (2026-10-08). Indexable. Go-live: 2026-10-20.
import type { ArticleData } from './types';

export const data: ArticleData = {
  path: '/collections/automating-hoa-dues-collection',
  parent: { label: 'Collections', href: '/collections' },
  crumb: 'Automating dues collection',
  eyebrow: 'Collections',
  h1: 'Automating HOA dues collection:',
  h1Accent: `what software does and doesn't solve.`,
  title: 'Automating HOA Dues Collection: What Software Solves | Alloy',
  description: 'Autopay, portals and reminders automate HOA billing but do not resolve accounts that stop paying. Where automation ends and what your company needs next.',
  keywords: ['how to automate hoa dues collection', 'hoa dues collection software', 'automatic hoa dues collection'],
  published: '2026-10-20',
  answer: `Software automates billing and reminders: invoices go out on schedule, autopay drafts the owners who enrolled, and portals take payments at 2 a.m. It does not resolve accounts that stop paying. Past about 60 days, a delinquent account needs a process with people, deadlines and a handoff. That is where most collections stacks go quiet.`,
  disclosure: 'short',
  sections: [
    {
      id: 'what-software-handles-well',
      h2: 'What do autopay, portals and reminder sequences handle well?',
      blocks: [
        { t: 'p', s: `Most HOA management platforms now cover the front half of collections well. Used fully, they remove the routine work that used to fill the first week of every month.` },
        { t: 'ul', items: [
          `**Recurring billing.** Assessments post on schedule with the right late-fee rules per association, pulled from the governing documents you set up once.`,
          `**Autopay and online portals.** Owners who enroll never go late. Portals take card and ACH payments without a phone call.`,
          `**Reminder sequences.** Email and text reminders before and after the due date, timed to the collection policy, sent without anyone drafting them.`,
          `**Statements and ledgers.** Owners see their balance, boards see the aging report, the accountant sees the reconciliation. One record.`,
        ] },
        { t: 'p', s: `The win is real: fewer owners go late by accident, and the ones who do are reminded without staff time. If your portfolio is not using all four, that is the first fix. [Our software guide](/resources/hoa-management-software-guide) compares how the major platforms handle them.` },
      ],
    },
    {
      id: 'where-accounts-fall-through',
      h2: 'Where do accounts fall through?',
      blocks: [
        { t: 'p', s: `Automation assumes the owner will respond to a reminder. Most do. The accounts that matter are the ones that don't.` },
        { t: 'p', s: `Past about 60 days, three things happen that software cannot handle:` },
        { t: 'ul', items: [
          `**The owner stops opening messages.** A fourth automated email reads like the first three. The platform keeps sending and the account keeps aging.`,
          `**The account needs a human decision.** Is the balance right? Did a partial payment post correctly? Should the board offer a plan? The system holds the data, but somebody has to act.`,
          `**The next step is governed by policy and law.** Notice requirements, waiting periods and allowable charges vary by state and by the association's collection policy. A reminder sequence does not know when it is allowed to escalate.`,
        ] },
        { t: 'p', s: `At this point the account usually sits in a queue called "send to attorney" until someone gets to it. That gap, between the last automated reminder and the first legal step, is where most delinquency cost accumulates. Staff time, board questions and owner frustration all live there.` },
      ],
    },
    {
      id: 'setting-the-trigger',
      h2: 'How do you set the trigger that moves an account out of automation?',
      blocks: [
        { t: 'p', s: `The trigger is the day an account stops being a reminder problem and becomes a process problem. It belongs in the collection policy, not in a manager's judgment.` },
        { t: 'ul', items: [
          `**Pick the day.** Most policies use 60 or 90 days past due. Shorter triggers catch accounts before balances grow; longer ones give reminders time to work.`,
          `**Check it against state notice periods.** Some states require specific notices before an account can escalate. The trigger must leave room for them.`,
          `**Flag automatically.** Set the platform to flag accounts on the trigger date and put them on one list.`,
          `**Name the owner.** One person reviews the list each week and moves accounts on the date. A list nobody owns is a queue.`,
        ] },
        { t: 'p', s: `Once the trigger is in the policy, the board has approved the handoff in advance. The manager no longer decides account by account, and the vendor receives files on a schedule.` },
      ],
    },
    {
      id: 'software-to-pre-legal-handoff',
      h2: 'How does the handoff from software to a pre-legal process work?',
      blocks: [
        { t: 'p', s: `A pre-legal process fills the gap with a fixed sequence and a deadline. Accounts that pass the collection policy's trigger, often 60 or 90 days past due, move to a non-attorney vendor for a set window. The vendor validates the balance and sends a plain-language notice with a payment link. It then runs a cadence of emails and calls and offers a standardized payment plan.` },
        { t: 'p', s: `Software stays in the picture. The platform is still the ledger: payments post there, the aging report updates there, the board reads status there. The vendor works from the ledger's data and reports back to it.` },
        { t: 'p', s: `At the end of the window, the account is resolved or it returns to the board with a full contact history. The attorney starts with documentation instead of a cold file. In owner-paid programs the association pays nothing for the stage, and the management company earns an administrative fee for coordinating each account.` },
        { t: 'p', s: `[What Pre-Legal Collections Are and Where They Fit](/collections/pre-legal-collections) explains the stage in detail. The revenue side is in [Collections as a Revenue Stream for HOA Management Companies](/collections).` },
      ],
    },
    {
      id: 'collections-stack-checklist',
      h2: `What belongs in a management company's collections stack?`,
      blocks: [
        { t: 'p', s: `Use this checklist to audit your own stack. Every "no" is a place where accounts stall or staff time leaks.` },
        { t: 'h3', s: 'Billing and payments (software)' },
        { t: 'ul', items: [
          `Assessments post automatically with per-association late-fee rules`,
          `Autopay enrollment is offered at onboarding and again every year`,
          `Online payment options cover card, ACH and payment plans`,
          `Pre-due and post-due reminders are timed to each collection policy`,
        ] },
        { t: 'h3', s: 'Monitoring (software plus people)' },
        { t: 'ul', items: [
          `A monthly aging report goes to the board without being requested`,
          `Accounts past the policy trigger are flagged automatically`,
          `One person owns the flagged list, with a deadline to act`,
        ] },
        { t: 'h3', s: 'Resolution (process)' },
        { t: 'ul', items: [
          `A pre-legal stage with a fixed window and a documented cadence`,
          `A written collection policy that names the trigger and the handoff`,
          `Attorney referral only for accounts that did not resolve, with the contact history attached`,
        ] },
        { t: 'h3', s: 'Reporting (back to the board)' },
        { t: 'ul', items: [
          `Stage and status of every delinquent account, monthly`,
          `Resolved, in a plan, returned to the board: three numbers the board can read in a minute`,
        ] },
        { t: 'p', s: `Software covers the first group and part of the second. The rest is process, and process is where management companies differentiate.` },
        // TODO(2026-11-03): link "other limits" → /resources/hoa-management-software-limits once page 9 is live.
        { t: 'p', s: `Collections is not the only place software stops. It does not win contracts or keep boards either. The same pattern applies: the platform runs the operation, people and process do the rest.` },
      ],
    },
  ],
  faq: [
    { q: 'Can HOA software collect delinquent dues on its own?', a: `It can bill, remind and accept payments, which keeps most owners current. It cannot resolve an account that has stopped responding. Past the policy trigger, the account needs a defined process: validation, a plain-language notice, calls, a payment-plan option and a deadline. That is a people-and-process stage, not a feature.` },
    { q: 'At what point should an automated reminder sequence stop?', a: `When the collection policy says so. Most policies name a trigger, often 60 or 90 days past due, after which the account moves to the next stage. Keep sending reminders past that point and the account simply ages. Set the trigger in the policy, flag accounts automatically, and move them on the date.` },
    { q: 'Does a pre-legal vendor replace the management software?', a: `No. The platform remains the ledger: payments post there and the board reads status there. The vendor works from that data and reports back into it. Think of the vendor as the stage the software hands off to, not a replacement for it.` },
    { q: 'What should the board see each month?', a: `Three numbers, in one place: accounts resolved, accounts in a payment plan, accounts returned for legal review. Add the aging report by bucket. A board that gets this without asking spends its meeting on something other than the same five delinquent accounts.` },
  ],
  next: [
    `Audit the checklist against your current stack. Then read [What Pre-Legal Collections Are and Where They Fit](/collections/pre-legal-collections) to see the resolution stage in practice. [Collections as a Revenue Stream for HOA Management Companies](/collections) covers what it means for the P&L.`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Start here', title: 'What pre-legal collections are and where they fit.', href: '/collections/pre-legal-collections', tone: 'reach' },
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/collections/cost-of-delinquent-accounts', tone: 'match' },
    { kind: 'Guide', meta: 'Long read', title: 'Best HOA management software (2026): the buyer’s guide for CAM firms.', href: '/resources/hoa-management-software-guide', tone: 'blue' },
  ],
  cta: { text: 'Software runs the operation. Thirty minutes with a CAM operator covers the part it does not: winning boards and keeping them.', label: 'Talk to Alloy' },
};
