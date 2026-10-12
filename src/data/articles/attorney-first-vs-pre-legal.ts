// src/data/articles/attorney-first-vs-pre-legal.ts — /resources/collections/attorney-first-vs-pre-legal (cluster page 3)
// Written to the handoff spec (2026-10-08), rebalanced 2026-10-12 per the client notes: trade-offs both ways, no
// provider named, fee ranges are sourced inline, no savings promised. Stays noindex until the comparison is
// approved (client). Statute links go to official state code sites.
import type { ArticleData } from './types';

const CIV_5650 = 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=5650.';
const FLA_720_3085 = 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0720/Sections/0720.3085.html';
const REG_F = 'https://www.consumerfinance.gov/rules-policy/regulations/1006/';
const GOMEZ = 'https://www.gomezlaw.com/how-much-does-an-hoa-lawyer-cost/';
const CARLSON = 'https://www.lscarlsonlaw.com/articles/budgeting-for-potential-hoa-legal-expenses';
const PROPUBLICA = 'https://www.propublica.org/article/colorado-hoa-lawsuits-foreclosure-law-firms-paymah';
const TINNELLY_2012 = 'https://hoalaw.tinnellylaw.com/allowable-collection-fees-to-o/';
const TINNELLY_2017 = 'https://hoalaw.tinnellylaw.com/no-cost-collections-can-prove-costly/';

export const data: ArticleData = {
  path: '/resources/collections/attorney-first-vs-pre-legal',
  parent: { label: 'Collections', href: '/resources/collections' },
  crumb: 'Attorney-first vs. pre-legal',
  eyebrow: 'Collections',
  h1: 'Attorney-first vs. pre-legal collections:',
  h1Accent: 'a cost comparison.',
  title: 'Attorney-First vs. Pre-Legal HOA Collections: Costs | Alloy',
  description: 'Who pays what, and when, under attorney-first and pre-legal HOA collections: sourced fee ranges, trade-offs both ways, and when counsel first is right.',
  keywords: ['hoa collections legal service cost comparison', 'hoa collections cost comparison', 'cost of law firm hoa assessment collections'],
  published: '2026-10-20',
  answer: `Under an attorney-first approach, the association fronts legal fees and recovers them from the owner where the documents and state law allow. Under a pre-legal-first approach, a vendor or team works the account for a defined window, and only unresolved files go to counsel. Each has costs and risks. The difference is who carries them, when, and with what leverage.`,
  disclosure: 'interest',
  noindex: 'Client (2026-10-12): stays noindex until the cost comparison is reviewed and approved.',
  aside: { title: 'Which path fits your portfolio?', body: 'A conversation with a CAM operator about your attorney costs per file, your backlog by balance, and whether a middle stage would help.', label: 'Review your process', href: '/contact?intent=collections' },
  sections: [
    {
      id: 'attorney-first',
      h2: 'What does attorney-first collections cost, and what does it buy?',
      blocks: [
        { t: 'p', s: `In an attorney-first model, the association refers a delinquent account to its law firm once internal reminders fail. The firm sends a demand letter, then records a lien, then files suit if the account stays unpaid. Each step is billed to the association, usually hourly or at a flat rate per task.` },
        { t: 'p', s: `What it buys is real. Legal leverage arrives early. Lien and filing deadlines are easier to protect. Counsel exercises judgment on every file, which matters for disputes and bankruptcies. And many boards value a single relationship they already trust. Some firms also work on arrangements that defer billing until recovery, so ask before assuming the association pays up front.` },
        { t: 'p', s: `The governing documents and state law typically let the association add reasonable collection costs and attorney fees to the owner's balance. "Add" is the key word. The association usually pays the invoice first and recovers the money only if the owner pays, or the property is sold or foreclosed.` },
        { t: 'p', s: `Published fee information is sparse. Use the ranges below as orientation, not as a quote:` },
        { t: 'ul', items: [
          `A Florida HOA law firm's 2025 guide puts typical HOA attorney rates at $250 to $500 per hour. It puts simple demand letters at $500 to $1,500 flat ([Gomez Law](${GOMEZ})).`,
          `A California firm describes hourly rates from $250 to $500 or more and court filing fees above $400. It puts complex litigation at $10,000 to $50,000 or more ([LS Carlson Law](${CARLSON})).`,
          `In Colorado, one collections law firm told a court that a typical uncontested HOA foreclosure generates $4,000 to $6,000 in attorney fees. [ProPublica](${PROPUBLICA}) reported the filing in 2023.`,
        ] },
        { t: 'p', s: `Timelines are set partly by statute. Florida, for example, requires a notice of late assessment before attorney fees can accrue, then a 45-day notice before a lien ([Fla. Stat. 720.3085](${FLA_720_3085})). Recovery is uncertain throughout. If the owner does not pay and the property does not change hands, the fees can stay with the association.` },
      ],
    },
    {
      id: 'pre-legal-first',
      h2: 'What does pre-legal-first collections cost, and what does it buy?',
      blocks: [
        { t: 'p', s: `In a pre-legal-first model, the account goes to a non-attorney vendor or a dedicated team for a defined window, commonly 60 to 120 days. The stage validates the balance, sends a plain-language notice, runs a cadence of emails and calls, and offers a standard payment plan. Only unresolved files reach counsel.` },
        { t: 'p', s: `Who pays depends on the arrangement. Some vendors bill the association a flat fee. Others add program charges to the delinquent owner's balance where the governing documents and state law allow. That keeps the association's direct cost low, but not necessarily zero. Charges that cannot be recovered from the owner may fall back to the association, depending on the agreement. Some arrangements also include a coordination fee for the management company, which must be disclosed to the board.` },
        { t: 'p', s: `What it buys: structured outreach that actually happens and payment plans that keep owners out of court. It also produces documentation the attorney can use, and fewer small files in counsel's queue.` },
        { t: 'p', s: `What it costs beyond the fees: it adds a party and a handoff. A window that runs too long can crowd a lien or filing deadline. Owner-paid charges can be challenged, as the next sections explain. And the stage has no legal leverage of its own, so an owner who ignores it has lost the association time.` },
      ],
    },
    {
      id: 'stage-by-stage',
      h2: 'How do the two paths compare, stage by stage?',
      blocks: [
        { t: 'p', s: `The table compares who carries the cost and what each path has at each stage. The attorney-fee figures are the sourced ranges above, not predictions. Pre-legal charges are not listed because they vary by provider and are set out in each agreement.` },
        { t: 'table', caption: 'Attorney-first vs. pre-legal-first, by stage', head: ['Stage', 'Attorney-first', 'Pre-legal-first'], rows: [
          ['Internal reminders', 'Management company staff time. No outside cost.', 'Same.'],
          ['First outside contact', 'Attorney demand letter, billed to the association. Published flat-fee example: $500 to $1,500 (Florida, 2025). Carries legal weight.', 'Validation and a plain-language notice. Charge billed to the association or added to the owner’s balance, by agreement. No legal weight.'],
          ['Follow-up', 'Further attorney letters and calls at hourly rates. Published range: $250 to $500 per hour (Florida and California, 2025).', 'Email and call cadence plus a payment-plan option, inside the same charge.'],
          ['Lien', 'Attorney prepares and records the lien, usually fronted by the association. Deadline protected by counsel.', 'Not part of pre-legal. Unresolved files return to the board with documentation; the attorney records a lien if the board decides to. The window must leave room for the deadline.'],
          ['Lawsuit or foreclosure', 'Attorney fees at hourly rates. One Colorado firm’s court filing: $4,000 to $6,000 for a typical uncontested foreclosure (2023).', 'Not part of pre-legal. Only accounts that did not resolve in the window reach this stage.'],
          ['Who carries the outside cost', 'The association, recovered from the owner where the documents and statute allow and the owner pays.', 'The association or the owner, by agreement. Charges that cannot be recovered may come back to the association.'],
          ['Leverage', 'Legal, from the first letter.', 'Persuasion, payment options and documentation. Legal leverage arrives only after the window.'],
          ['Relationships', 'One: the association’s counsel.', 'Two or more: the stage and counsel, with handoffs to manage.'],
        ], note: `Sources: [Gomez Law](${GOMEZ}) (Florida, Oct 2025), [LS Carlson Law](${CARLSON}) (California, Dec 2025), [ProPublica](${PROPUBLICA}) (Colorado, Mar 2023). Ranges vary by state, firm and account.` },
        { t: 'p', s: `No savings figure appears here on purpose. Whether a pre-legal stage saves an association money depends on three things. How many accounts resolve in the window, what the attorney would have charged for them, and what the stage itself costs. Ask for all three numbers before you believe a projection, from any provider and from any consultant, including us.` },
      ],
    },
    {
      id: 'owner-paid-fee-debate',
      h2: 'Are owner-paid collection charges legal? The debate boards should know about',
      blocks: [
        { t: 'p', s: `"No cost to the association" is the pitch for most owner-paid arrangements. It is also the part that has drawn legal scrutiny, mainly in California, and it is worth understanding before a board signs anything.` },
        { t: 'p', s: `California Civil Code section 5650 lets an association recover reasonable costs it incurred in collecting a delinquent assessment, including attorney fees ([Cal. Civ. Code 5650](${CIV_5650})). The word "incurred" is the issue. If the association owes the vendor nothing, a court can ask whether the vendor's charges were ever the association's costs to pass on.` },
        { t: 'ul', items: [
          `In a 2012 Chapter 13 case, In re Cisneros, a California bankruptcy court disallowed roughly $14,000 of a collection company's fees. The association had no obligation to pay them under its contract. The court warned that the arrangement "opens the door to all sorts of mischief."`,
          `In Hanson v. JQD (N.D. Cal. 2014), a homeowner sued an owner-paid vendor under the Civil Code and debt collection laws. The court reasoned that the vendor's right to charge the owner could extend no further than the association's own right. The case settled, so it set no binding precedent.`,
        ] },
        { t: 'p', s: `California HOA law firms have written about both cases. Tinnelly Law Group's position is that collection services carry costs no matter who performs them. The association must actually owe those costs for them to become part of the owner's debt ([2012 post](${TINNELLY_2012}), [2017 post](${TINNELLY_2017})).` },
        { t: 'p', s: `What this means for a board: the fee structure matters more than the headline. Questions to ask any provider:` },
        { t: 'ul', items: [
          `Which charges are the association's obligations, and which are billed only to the owner? Get it in writing.`,
          `How does the fee structure comply with our state's assessment-collection statute? Ask for the specific section.`,
          `Does the process meet federal and state debt collection rules? The federal rules are in [Regulation F](${REG_F}); many states add licensing and their own rules.`,
          `What happens to charges if the attorney later finds they cannot be recovered from the owner?`,
        ] },
        { t: 'note', s: `This section describes a legal debate. It is not legal advice, and the cases are California-specific. Have the association's attorney review any vendor agreement for your state.` },
      ],
    },
    {
      id: 'when-each-is-right',
      h2: 'When is going straight to an attorney the right call, and when is a middle stage?',
      blocks: [
        { t: 'p', s: `Some accounts belong with counsel from day one. The board decides, and a good collection policy names the exceptions:` },
        { t: 'ul', items: [
          `**Bankruptcy filings.** An automatic stay changes what anyone may do. Counsel first.`,
          `**Disputed balances.** If the owner contests the assessment itself, the account needs legal review, not a payment plan.`,
          `**Large or aged balances near a statutory deadline.** Where a lien or filing deadline is close, the attorney needs to move.`,
          `**A pending sale or another lienholder's foreclosure.** Timing and priority are legal questions.`,
        ] },
        { t: 'p', s: `A middle stage tends to help with the rest: modest balances, owners who respond to a call, no legal complications. It also suits a board that would rather see a payment plan than a lawsuit against a neighbor. For those accounts, the question is sequence. Resolve what can be resolved, then send counsel the files that need them, with the record already built.` },
      ],
    },
    {
      id: 'deciding-for-your-portfolio',
      h2: 'How do you decide for your portfolio?',
      blocks: [
        { t: 'p', s: `Not from an article. From your own data:` },
        { t: 'ol', items: [
          `Count delinquent accounts by aging bucket and by balance, by association.`,
          `Pull the attorney's invoices for the last year and work out the cost per referred file, and how many files resolved at each stage.`,
          `Ask counsel which accounts they would want from day one regardless of process.`,
          `Pilot a middle stage on a few associations with the board's approval, with a defined window that respects your lien deadlines.`,
          `Measure resolution, cost and board questions against the associations that stayed on the current path.`,
        ] },
        { t: 'cta', s: `Alloy helps management companies run this comparison on their own numbers and work out what to change, if anything.`, label: 'Review your collections process', href: '/contact?intent=collections' },
      ],
    },
  ],
  next: [
    `If your associations have not had a middle stage, start with [What Pre-Legal Collections Are and Where They Fit](/resources/collections/pre-legal-collections). Then bring this comparison and your attorney's invoices to the board. The management company's side of the picture is in [Collections as a Revenue Stream for HOA Management Companies](/resources/collections).`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Start here', title: 'What pre-legal collections are and where they fit.', href: '/resources/collections/pre-legal-collections', tone: 'reach' },
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/resources/collections/cost-of-delinquent-accounts', tone: 'match' },
    { kind: 'Collections', meta: 'Policy', title: 'Building an HOA collection policy a board will approve.', href: '/resources/collections/collection-policy', tone: 'retain' },
  ],
  cta: { text: 'Want the comparison run on your own numbers? Thirty minutes with a CAM operator covers your attorney costs per file, your backlog and whether a middle stage would help.', label: 'Review your collections process', href: '/contact?intent=collections' },
};
