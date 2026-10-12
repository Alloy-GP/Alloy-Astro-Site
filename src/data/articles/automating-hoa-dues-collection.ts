// src/data/articles/automating-hoa-dues-collection.ts — /collections/automating-hoa-dues-collection (cluster page 4)
// Written to the handoff spec (2026-10-08), revised 2026-10-12 per the client notes: practical automation,
// integration realities, less administrative work, no overstated capabilities, no provider named. Indexable. Go-live 2026-10-20.
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
  answer: `Software automates billing and reminders: invoices go out on schedule, autopay drafts the owners who enrolled, and portals take payments at 2 a.m. It does not resolve accounts that stop paying. Past the policy trigger, a delinquent account needs a process with people, deadlines and a handoff. That is where most collections stacks go quiet.`,
  disclosure: 'interest',
  aside: { title: 'Is the stack doing its share?', body: 'A conversation with a CAM operator about where your processes and tools are falling short, and what is already paid for but not used.', label: 'Review your tools', href: '/contact?intent=operations' },
  sections: [
    {
      id: 'what-software-handles-well',
      h2: 'What do autopay, portals and reminder sequences handle well?',
      blocks: [
        { t: 'p', s: `Most HOA management platforms cover the front half of collections well when they are set up and used fully. That caveat matters. The gap between what a platform can do and what a company has switched on is often the first finding of a process review.` },
        { t: 'ul', items: [
          `**Recurring billing.** Assessments post on schedule with per-association late-fee rules, pulled from the governing documents you set up once.`,
          `**Autopay and online portals.** Owners who enroll rarely go late by accident. Portals take card and ACH payments without a phone call.`,
          `**Reminder sequences.** Email and text reminders before and after the due date, timed to the collection policy, sent without anyone drafting them.`,
          `**Statements and ledgers.** Owners see their balance, boards see the aging report, the accountant sees the reconciliation. One record.`,
        ] },
        { t: 'p', s: `Fewer owners go late by accident, and the ones who do are reminded without staff time. If your portfolio is not using all four, that is the first fix, and it costs nothing you are not already paying. [Our software guide](/resources/hoa-management-software-guide) compares how the major platforms handle them.` },
      ],
    },
    {
      id: 'where-accounts-fall-through',
      h2: 'Where do accounts fall through?',
      blocks: [
        { t: 'p', s: `Automation assumes the owner will respond to a reminder. Most do. The accounts that matter are the ones that do not.` },
        { t: 'p', s: `Past the policy trigger, three things happen that reminder software is not built to handle:` },
        { t: 'ul', items: [
          `**The owner stops opening messages.** A fourth automated email reads like the first three. The platform keeps sending and the account keeps aging.`,
          `**The account needs a human decision.** Is the balance right? Did a partial payment post correctly? Should the board offer a plan? The system holds the data, but somebody has to act.`,
          `**The next step is governed by policy and law.** Notice requirements, waiting periods and allowable charges vary by state and by the association's collection policy. A reminder sequence does not know when it is allowed to escalate.`,
        ] },
        { t: 'p', s: `At this point the account usually sits in a queue called "send to attorney" until someone gets to it. That gap, between the last automated reminder and the first deliberate step, is where most delinquency cost accumulates. Staff time, board questions and owner frustration all live there.` },
      ],
    },
    {
      id: 'setting-the-trigger',
      h2: 'How do you set the trigger that moves an account out of automation?',
      blocks: [
        { t: 'p', s: `The trigger is the day an account stops being a reminder problem and becomes a process problem. It belongs in the collection policy, not in a manager's judgment.` },
        { t: 'ul', items: [
          `**Pick the day.** Policies commonly use 60, 90 or 120 days past due. Shorter triggers catch accounts before balances grow; longer ones give reminders time to work and respect existing board expectations.`,
          `**Check it against state notice periods and lien deadlines.** Some states require specific notices before an account can escalate, and some give the association a window to lien. The trigger must leave room for both.`,
          `**Flag automatically.** Set the platform to flag accounts on the trigger date and put them on one list.`,
          `**Name the owner.** One person reviews the list each week and moves accounts on the date. A list nobody owns is a queue.`,
        ] },
        { t: 'p', s: `Once the trigger is in the policy, the board has approved the handoff in advance. The manager no longer decides account by account, and whoever handles the next stage receives files on a schedule.` },
      ],
    },
    {
      id: 'software-to-process-handoff',
      h2: 'How does the handoff from software to a managed process work?',
      blocks: [
        { t: 'p', s: `Whatever the next stage is, an internal team, the association's attorney or a pre-legal vendor, the handoff has the same shape. Accounts that pass the trigger move to a defined stage with a window, a cadence and an exit rule. Someone validates the balance, sends a plain-language notice, follows a written schedule of contacts and offers the board's standard payment plan.` },
        { t: 'p', s: `Software stays in the picture. The platform is still the ledger: payments post there, the aging report updates there, the board reads status there. Whoever works the account works from the ledger's data and reports back to it.` },
        { t: 'p', s: `Integration is where plans meet reality. Few platforms hand accounts to an outside party and take status back automatically. Expect exports, a shared spreadsheet or a portal upload, and a weekly reconciliation. Build that routine into the handoff and assign it, or the two records drift and the board sees two different numbers.` },
        { t: 'p', s: `[What Pre-Legal Collections Are and Where They Fit](/collections/pre-legal-collections) explains the middle-stage option in detail. [Collections as a Revenue Stream for HOA Management Companies](/collections) covers the approaches and what each costs.` },
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
          `A defined next stage with a window, a cadence and an exit rule, whoever runs it`,
          `A written collection policy that names the trigger and the handoffs`,
          `Attorney referral for accounts that need counsel from the start, and for those that did not resolve, with the contact history attached`,
        ] },
        { t: 'h3', s: 'Reporting (back to the board)' },
        { t: 'ul', items: [
          `Stage and status of every delinquent account, monthly`,
          `Resolved, in a plan, with counsel: three numbers the board can read in a minute`,
        ] },
        { t: 'p', s: `Software covers the first group and part of the second. The rest is process, and process is where the administrative work either disappears or doubles.` },
      ],
    },
    {
      id: 'reducing-admin-work',
      h2: 'Where does the administrative work actually go away?',
      blocks: [
        { t: 'p', s: `Automation is sold as time saved. It delivers that only when the manual steps around it are removed too. Four places to look:` },
        { t: 'ul', items: [
          `**Double entry.** Any step where a person retypes something the platform already knows. A notice drafted from the ledger by hand, or a spreadsheet of delinquent accounts kept beside the aging report.`,
          `**Unanswered questions.** Owner calls that exist because the first notice did not explain the balance or how to pay. A better notice is cheaper than a better phone script.`,
          `**Board questions.** A monthly report that arrives before the meeting removes most of them.`,
          `**Case-by-case decisions.** Payment-plan terms and triggers approved in advance turn judgment calls into routine.`,
        ] },
        // TODO(2026-11-03): link "other limits" → /resources/hoa-management-software-limits once page 9 is live.
        { t: 'p', s: `Collections is not the only place software stops. It does not win contracts or keep boards either. The same pattern applies: the platform runs the operation, people and process do the rest.` },
      ],
    },
  ],
  faq: [
    { q: 'Can HOA software collect delinquent dues on its own?', a: `It can bill, remind and accept payments, which keeps most owners current. It is not built to resolve an account that has stopped responding. Past the policy trigger, the account needs a defined process: validation, a plain-language notice, calls, a payment-plan option and a deadline. That is a people-and-process stage, not a feature.` },
    { q: 'At what point should an automated reminder sequence stop?', a: `When the collection policy says so. Policies commonly name a trigger at 60, 90 or 120 days past due, after which the account moves to the next stage. Keep sending reminders past that point and the account simply ages. Set the trigger in the policy, flag accounts automatically, and move them on the date.` },
    { q: 'Does a pre-legal vendor replace the management software?', a: `No. The platform remains the ledger: payments post there and the board reads status there. Whoever works the account works from that data and reports back into it. That usually means exports and a weekly reconciliation rather than a live integration. Plan for that routine before adding a stage.` },
    { q: 'What should the board see each month?', a: `Three numbers, in one place: accounts resolved, accounts in a payment plan, accounts with counsel. Add the aging report by bucket and the next action and date for each account. A board that gets this without asking spends its meeting on something other than the same five delinquent accounts.` },
  ],
  next: [
    `Audit the checklist against your current stack and mark every "no". Then read [What Pre-Legal Collections Are and Where They Fit](/collections/pre-legal-collections) to see one option for the resolution stage. [Collections as a Revenue Stream for HOA Management Companies](/collections) covers the approaches and what each one costs.`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Start here', title: 'What pre-legal collections are and where they fit.', href: '/collections/pre-legal-collections', tone: 'reach' },
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/collections/cost-of-delinquent-accounts', tone: 'match' },
    { kind: 'Guide', meta: 'Long read', title: 'Best HOA management software (2026): the buyer’s guide for CAM firms.', href: '/resources/hoa-management-software-guide', tone: 'blue' },
  ],
  cta: { text: 'Software runs the operation. Thirty minutes with a CAM operator covers where your processes and tools fall short, and what is already paid for but not used.', label: 'Review your operations and tools', href: '/contact?intent=operations' },
};
