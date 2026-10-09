// src/data/articles/pre-legal-collections.ts — /collections/pre-legal-collections (cluster page 2)
// FINAL COPY from the collections handoff (2026-10-08, section 6), verbatim. Only the link targets changed
// to the site's no-trailing-slash URLs (/collections, /contact). Go-live: 2026-10-20.
import type { ArticleData } from './types';

export const data: ArticleData = {
  path: '/collections/pre-legal-collections',
  parent: { label: 'Collections', href: '/collections' },
  crumb: 'Pre-legal collections',
  eyebrow: 'Collections',
  h1: 'What pre-legal collections are',
  h1Accent: 'and where they fit.',
  title: 'What Are Pre-Legal HOA Collections? | Alloy',
  description: 'Pre-legal collections is the stage between a missed HOA payment and an attorney. Here is how it works, what it costs, and where it fits.',
  keywords: ['how to collect delinquent hoa dues', 'hoa collections process', 'pre-legal collections'],
  published: '2026-10-20',
  answer: `Pre-legal collections is the stage between an HOA's own late notices and an attorney. A third-party vendor works past-due accounts for a set window, usually 90 days, offering owners a clear way to pay in full or set up a payment plan. Accounts that don't resolve go back to the board, documented and ready for legal action.`,
  lead: [
    { t: 'callout', label: 'Pre-legal collections, defined:', s: `a structured, time-limited effort by a non-attorney vendor to resolve delinquent HOA or condo assessments through notices, calls and payment plans, before an association refers the account to its attorney. The vendor does not file liens, sue or foreclose.` },
  ],
  disclosure: 'named',
  sections: [
    {
      id: 'three-stages',
      h2: 'The three stages of HOA collections',
      blocks: [
        { t: 'p', s: `Most associations move a delinquent account through three stages. Not every association has the middle one.` },
        { t: 'ol', items: [
          `**Internal reminders.** The management company sends statements, late notices and reminders as the governing documents and collection policy require. Most late payers resolve here.`,
          `**Pre-legal.** Accounts that stay delinquent go to a vendor for a fixed window of structured outreach and payment options. The association's attorney is not involved yet.`,
          `**Legal.** Accounts that still don't resolve go to the association's attorney for demand letters, liens, lawsuits or, in some states, foreclosure.`,
        ] },
        { t: 'p', s: `Without a pre-legal stage, an account jumps from a reminder letter straight to an attorney. That jump is where legal fees begin, where timelines stretch, and where relationships with owners tend to break down.` },
      ],
    },
    {
      id: 'inside-90-days',
      h2: 'What happens inside a 90-day pre-legal window',
      blocks: [
        { t: 'p', s: `A well-run program is a fixed sequence, not open-ended dunning. [HOA 48](https://hoa48.com)'s program, for example, runs in three phases:` },
        { t: 'ul', items: [
          `**Days 1–30: audit and validation.** The vendor confirms the balance and checks it against the governing documents and collection policy. The owner receives a plain-language letter with a secure payment link.`,
          `**Days 31–90: outreach cadence.** A measured mix of emails and calls. The owner can pay in full or enroll in a standardized payment plan.`,
          `**Day 90 and beyond: resolution or return.** Unresolved accounts go back to the board with a complete record of every contact attempt, so the attorney starts with documentation rather than from scratch.`,
        ] },
        { t: 'p', s: `The fixed end date matters. Boards know exactly when an account will either be resolved or ready for legal review.` },
      ],
    },
    {
      id: 'can-and-cant',
      h2: `What a pre-legal vendor can and can't do`,
      blocks: [
        { t: 'p', s: `**A pre-legal vendor can:**` },
        { t: 'ul', items: [
          `Verify balances and confirm the account is ready to work`,
          `Contact owners by letter, email and phone`,
          `Accept payments and administer payment plans`,
          `Report account status to the board and management company`,
          `Prepare a documented contact history for the attorney`,
        ] },
        { t: 'p', s: `**A pre-legal vendor can't:**` },
        { t: 'ul', items: [
          `Give legal advice to the association or the owner`,
          `File liens, lawsuits or foreclosure actions. Those decisions and actions stay with the board and its attorney.`,
        ] },
        { t: 'p', s: `Vendors collecting on an association's behalf are generally subject to federal and state debt collection laws, and some states set specific notice requirements before an HOA can escalate. Ask any vendor how its process complies in your state, and have the association's attorney review the collection policy before adding a pre-legal stage.` },
      ],
    },
    {
      id: 'attorney-handoff',
      h2: 'How the handoff to the attorney works',
      blocks: [
        { t: 'p', s: `If an account isn't resolved in the window, the file returns to the board with its full history: notices sent, calls made, responses and any payment-plan activity. The board then decides whether to refer it to the attorney.` },
        { t: 'p', s: `That record shortens the attorney's start-up work and shows the association made a reasonable, consistent effort before legal action. With HOA 48, if a file goes to the attorney, invoicing for program charges is deferred for a grace period so the attorney can recover those charges from the owner first.` },
      ],
    },
    {
      id: 'why-it-matters',
      h2: 'Why pre-legal collections matters to management companies',
      blocks: [
        { t: 'p', s: `Delinquency usually gets framed as a board problem. Day to day, it lands on the management company.` },
        { t: 'ul', items: [
          `**Staff time.** Managers and accountants field owner calls, prepare delinquency reports and answer board questions about the same accounts month after month.`,
          `**Board confidence.** A growing receivables line is one of the first things a board notices, and it reflects on the management company even when the cause is outside its control.`,
          `**Revenue.** With a vendor program, the management company earns an administrative fee for coordinating each account, so work it was already doing becomes a revenue line.`,
        ] },
        { t: 'p', s: `A pre-legal stage also gives managers a concrete answer when a board asks, "What are we doing about delinquencies?" That answer can be part of a proposal, a renewal conversation or an annual meeting report.` },
      ],
    },
  ],
  faq: [
    { q: 'Is pre-legal collections the same as a collection agency?', a: `Not quite. A pre-legal program works within a fixed window, before any attorney involvement, and returns unresolved accounts to the board. It does not file liens, sue or foreclose.` },
    { q: 'Who pays for a pre-legal program?', a: `In owner-paid models like HOA 48's, flat program charges are added to the delinquent owner's balance. The association pays nothing to participate.` },
    { q: 'How long does pre-legal collections take?', a: `Typically 90 days per account. At the end of the window, an account is either resolved or returned to the board with documentation.` },
    { q: 'Can an account skip pre-legal and go straight to an attorney?', a: `Yes. The board decides. Accounts with large balances, bankruptcy filings or disputes may belong with the attorney from the start.` },
    { q: 'Do state laws affect pre-legal collections?', a: `Yes. Notice requirements and allowable charges vary by state. Confirm your process with the association's attorney.` },
  ],
  next: [
    `Pre-legal collections is one way management companies grow revenue per door while giving boards a clear plan for delinquent accounts. Read [Collections as a Revenue Stream for HOA Management Companies](/collections) for the full picture, or [talk to Alloy](/contact) about growing your management company.`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Policy', title: 'Building an HOA collection policy a board will approve.', href: '/collections/collection-policy', tone: 'retain' },
    { kind: 'Collections', meta: 'Software', title: 'Automating HOA dues collection: what software does and doesn’t solve.', href: '/collections/automating-hoa-dues-collection', tone: 'blue' },
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/collections/cost-of-delinquent-accounts', tone: 'match' },
  ],
  cta: { text: 'Revenue per door is one lever. Thirty minutes with a CAM operator tells you which of the three to pull first.', label: 'Talk to Alloy' },
};
