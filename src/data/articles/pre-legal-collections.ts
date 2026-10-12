// src/data/articles/pre-legal-collections.ts — /resources/collections/pre-legal-collections (cluster page 2)
// Originally the handoff's FINAL COPY (2026-10-08, built around a named provider). Rewritten 2026-10-12 per the
// client notes: provider-neutral, timelines as ranges, when a middle stage fits and when it does not, how it sits
// with existing attorney and vendor relationships, what to ask. Indexable. Go-live: 2026-10-20.
import type { ArticleData } from './types';

const REG_F = 'https://www.consumerfinance.gov/rules-policy/regulations/1006/';

export const data: ArticleData = {
  path: '/resources/collections/pre-legal-collections',
  parent: { label: 'Collections', href: '/resources/collections' },
  crumb: 'Pre-legal collections',
  eyebrow: 'Collections',
  h1: 'What pre-legal collections are',
  h1Accent: 'and where they fit.',
  title: 'What Are Pre-Legal HOA Collections? | Alloy',
  description: 'Pre-legal collections is the stage between a missed HOA payment and an attorney. What it is, when it fits, how it works with current providers, what to ask.',
  keywords: ['how to collect delinquent hoa dues', 'hoa collections process', 'pre-legal collections'],
  published: '2026-10-20',
  answer: `Pre-legal collections is the stage between an HOA's own late notices and an attorney. A non-attorney vendor or a dedicated team works past-due accounts for a defined window. Owners get a clear way to pay in full or set up a payment plan. Accounts that do not resolve go back to the board, documented, for a decision on legal action.`,
  lead: [
    { t: 'callout', label: 'Pre-legal collections, defined:', s: `a structured, time-limited effort by a non-attorney vendor or team to resolve delinquent HOA or condo assessments. It uses notices, calls and payment plans, before an association refers the account to its attorney. The stage does not file liens, sue or foreclose.` },
  ],
  disclosure: 'interest',
  aside: { title: 'Thinking about a middle stage?', body: 'A conversation with a CAM operator about whether a pre-legal stage fits your portfolio and how it would sit with your current attorney and vendors.', label: 'Review your process', href: '/contact?intent=collections' },
  sections: [
    {
      id: 'three-stages',
      h2: 'The three stages of HOA collections',
      blocks: [
        { t: 'p', s: `Most associations move a delinquent account through up to three stages. Not every association has the middle one, and not every account should pass through it.` },
        { t: 'ol', items: [
          `**Internal reminders.** The management company sends statements, late notices and reminders as the governing documents and collection policy require. Policies differ: some escalate at 60 days, some at 120. Most late payers resolve here.`,
          `**Pre-legal.** Accounts that stay delinquent go to a vendor or a dedicated team for a defined window of structured outreach and payment options. The association's attorney is not yet involved.`,
          `**Legal.** Accounts that still do not resolve go to the association's attorney for demand letters, liens, lawsuits or, in some states, foreclosure.`,
        ] },
        { t: 'p', s: `Without a middle stage, an account jumps from a reminder letter straight to an attorney. For some accounts that is the right path. For many others it is where legal fees begin and timelines stretch. The relationship with the owner breaks down over a balance that a phone call and a payment plan might have resolved.` },
      ],
    },
    {
      id: 'inside-the-window',
      h2: 'What happens inside a pre-legal window',
      blocks: [
        { t: 'p', s: `Programs differ in length and cadence. Common windows run 60 to 120 days, and the right length depends on the collection policy, state notice periods and any lien deadlines. What the effective ones share is a fixed sequence rather than open-ended dunning:` },
        { t: 'ul', items: [
          `**Validation first.** The balance is checked against the ledger, the governing documents and the collection policy before anyone contacts the owner.`,
          `**A plain-language first notice.** What is owed, why, and a clear way to pay or ask a question.`,
          `**A written cadence.** Letters, emails and calls on a schedule, so the board knows what the owner will receive and when.`,
          `**Standard payment plans.** Terms the board approved in advance. The owner can pay in full or enroll.`,
          `**Resolution or return.** At the end of the window, the account is resolved, in a plan, or back with the board. A complete record of every contact goes with it.`,
        ] },
        { t: 'p', s: `The fixed end date matters. Boards know when an account will be either resolved or ready for a decision. Managers have a dated answer for every question about it.` },
      ],
    },
    {
      id: 'when-it-fits',
      h2: `When does a middle stage make sense, and when doesn't it?`,
      blocks: [
        { t: 'p', s: `A pre-legal stage tends to earn its place when several of these are true:` },
        { t: 'ul', items: [
          `A backlog of aged accounts with modest balances that nobody has worked consistently.`,
          `Staff time on delinquency that nobody tracks and nobody bills.`,
          `Boards asking the same question at every meeting, or a receivables line that keeps growing.`,
          `Attorney fees that look large next to the balances being pursued.`,
          `Counsel's queue full of small files that resolve with a phone call once someone makes it.`,
        ] },
        { t: 'p', s: `It tends not to fit when:` },
        { t: 'ul', items: [
          `The portfolio is small and delinquencies are few. A manager with a good cadence may be the whole process.`,
          `Most delinquent accounts are disputes, bankruptcies or balances near a statutory deadline. Those belong with counsel.`,
          `The association's attorney already runs an effective, reasonably priced pre-lien cadence that boards are happy with.`,
          `State law restricts what a third party can charge owners, and the only providers available depend on owner-paid charges.`,
          `The board will not support it. A stage the board does not understand will not survive the first owner complaint.`,
        ] },
        { t: 'p', s: `The honest answer for many portfolios is "for some associations, not all". The decision can be made association by association.` },
      ],
    },
    {
      id: 'existing-relationships',
      h2: 'How does it fit existing attorney and vendor relationships?',
      blocks: [
        { t: 'p', s: `A pre-legal stage sits in front of the attorney, not instead of the attorney. Companies that add one well tend to keep their current counsel and vendors exactly as they are and change three things:` },
        { t: 'ul', items: [
          `**The handoff in.** A written entry rule in the collection policy says which accounts enter the stage and when. Accounts that need counsel from day one bypass it.`,
          `**The handoff out.** A written exit rule says what returns to the board, with what documentation, and how the attorney receives it.`,
          `**The reporting.** One monthly view that shows every account's stage, whoever is working it.`,
        ] },
        { t: 'p', s: `Established relationships are an asset, not an obstacle. An attorney who knows the association's documents, a vendor who already handles notices, a board that trusts both. The goal is to make those parties work together better, not to swap them out. Pilot the stage on a few associations, measure it against the current process, and keep what works.` },
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
        { t: 'p', s: `Third parties collecting on an association's behalf are generally subject to the federal Fair Debt Collection Practices Act ([Regulation F](${REG_F})). In many states, licensing and state collection laws apply as well. Some states also set specific notice requirements before an association can escalate. Ask any vendor how its process complies in your state, and have the association's attorney review the collection policy before adding a stage.` },
      ],
    },
    {
      id: 'attorney-handoff',
      h2: 'How the handoff to the attorney works',
      blocks: [
        { t: 'p', s: `If an account is not resolved in the window, the file returns to the board with its full history. Notices sent, calls made, responses and any payment-plan activity. The board then decides whether to refer it to the attorney.` },
        { t: 'p', s: `That record shortens the attorney's start-up work and shows the association made a reasonable, consistent effort before legal action. Ask any provider what happens to its charges on accounts that go to counsel, and get the answer in writing. Arrangements differ, and the difference lands on the association.` },
      ],
    },
    {
      id: 'why-it-matters',
      h2: 'Why pre-legal collections matters to management companies',
      blocks: [
        { t: 'p', s: `Delinquency usually gets framed as a board problem. Day to day, it lands on the management company.` },
        { t: 'ul', items: [
          `**Staff time.** Managers and accountants field owner calls, prepare delinquency reports and answer board questions about the same accounts month after month.`,
          `**Board confidence.** A growing receivables line is one of the first things a board notices. It reflects on the management company even when the cause is outside its control.`,
          `**Revenue, in some models.** Some arrangements include a coordination or administration fee for the management company where the governing documents, state law and the management agreement allow it. It is not automatic, and it should be disclosed to the board.`,
        ] },
        { t: 'p', s: `A pre-legal stage also gives managers a concrete answer when a board asks, "What are we doing about delinquencies?" That answer can be part of a proposal, a renewal conversation or an annual meeting report.` },
      ],
    },
    {
      id: 'what-to-ask',
      h2: 'What should you ask before adding a stage?',
      blocks: [
        { t: 'p', s: `Whether the stage is a vendor or an internal team, the same questions apply:` },
        { t: 'ol', items: [
          `What is the window, and what is the cadence inside it?`,
          `Which charges does the association owe, which go to the owner, and under what authority in our documents and state law?`,
          `What happens to charges on accounts that go to the attorney or into bankruptcy?`,
          `How does the process comply with federal and state debt collection law in our states?`,
          `What does the board see each month, and in what format?`,
          `What comes back at the end of the window, and in what form does the attorney receive it?`,
          `How will the stage work with our current attorney and vendors, and who owns each handoff?`,
          `Can we pilot it on a few associations first, and how do we measure it against today?`,
        ] },
      ],
    },
  ],
  faq: [
    { q: 'Is pre-legal collections the same as a collection agency?', a: `In practice they overlap. A pre-legal stage works within a defined window, before any attorney involvement, and returns unresolved accounts to the board. In many states the vendor doing it is licensed and regulated as a collection agency, and federal debt collection rules generally apply. It does not file liens, sue or foreclose.` },
    { q: 'Who pays for a pre-legal stage?', a: `It depends on the model and on what the governing documents and state law allow. Some arrangements bill the association a flat fee. Others add program charges to the delinquent owner's balance, which keeps the association's direct cost low but not necessarily zero. Ask which charges the association owes and what happens to charges that cannot be recovered.` },
    { q: 'How long does pre-legal collections take?', a: `Commonly 60 to 120 days per account, set by the provider's cadence, the collection policy and any state notice periods or lien deadlines. At the end of the window, an account is resolved, in a payment plan, or back with the board. The board then decides on legal action, with documentation in hand.` },
    { q: 'Can an account skip pre-legal and go straight to an attorney?', a: `Yes, and some should. The board decides. Accounts with large balances, bankruptcy filings, disputed assessments, or deadlines for a lien or filing may belong with the attorney from the start. A good collection policy names those exceptions so the manager is not deciding case by case.` },
    { q: 'Do state laws affect pre-legal collections?', a: `Yes. Notice requirements, allowable charges, licensing of third-party collectors and the order in which payments are applied vary by state. Federal debt collection rules generally apply to third parties too. Confirm the process with the association's attorney before adding a stage, and again when the law changes.` },
  ],
  next: [
    `Pre-legal collections is one way management companies give boards a clear plan for delinquent accounts and recover the hours spent chasing them. Read [Collections as a Revenue Stream for HOA Management Companies](/resources/collections) for the full picture, or [talk to Alloy](/contact?intent=collections) about reviewing your current process.`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Policy', title: 'Building an HOA collection policy a board will approve.', href: '/resources/collections/collection-policy', tone: 'retain' },
    { kind: 'Collections', meta: 'Software', title: 'Automating HOA dues collection: what software does and doesn’t solve.', href: '/resources/collections/automating-hoa-dues-collection', tone: 'blue' },
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/resources/collections/cost-of-delinquent-accounts', tone: 'match' },
  ],
  cta: { text: 'Not sure whether a middle stage fits your portfolio? Thirty minutes with a CAM operator covers your current process, your relationships and what to change first.', label: 'Review your collections process', href: '/contact?intent=collections' },
};
