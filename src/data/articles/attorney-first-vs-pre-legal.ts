// src/data/articles/attorney-first-vs-pre-legal.ts — /collections/attorney-first-vs-pre-legal (cluster page 3)
// Written to the handoff spec (2026-10-08). Fee figures are sourced ranges only (each cited inline); no savings
// are promised. Carries [PROOF: …] placeholders → route is noindex and out of the sitemap until filled.
// Statute links go to official state code sites. Go-live: 2026-10-20 (indexable once proof is in).
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
  path: '/collections/attorney-first-vs-pre-legal',
  parent: { label: 'Collections', href: '/collections' },
  crumb: 'Attorney-first vs. pre-legal',
  eyebrow: 'Collections',
  h1: 'Attorney-first vs. pre-legal collections:',
  h1Accent: 'a cost comparison.',
  title: 'Attorney-First vs. Pre-Legal HOA Collections: Costs | Alloy',
  description: 'Who pays what, and when, under attorney-first and pre-legal HOA collections: sourced fee ranges, the no-cost model debate, when to go straight to counsel.',
  keywords: ['hoa collections legal service cost comparison', 'hoa collections cost comparison', 'cost of law firm hoa assessment collections'],
  published: '2026-10-20',
  answer: `Under an attorney-first approach, the association fronts legal fees and recovers them from the owner later, if it can. Under a pre-legal-first approach, a vendor works the account for about 90 days and charges are added to the owner's balance. Only unresolved files go to the attorney. The difference is who carries the cost, and when.`,
  disclosure: 'named',
  noindex: 'Proof placeholders (HOA 48 results, real cost data for the comparison table) still to be filled. Brief: noindex and off navigation until then.',
  sections: [
    {
      id: 'attorney-first-cost',
      h2: 'What does attorney-first collections cost, and who pays first?',
      blocks: [
        { t: 'p', s: `In an attorney-first model, the association refers a delinquent account to its law firm as soon as internal reminders fail. The firm sends a demand letter, then records a lien, then files suit if the account stays unpaid. Each step is billed to the association, usually hourly or at a flat rate per task.` },
        { t: 'p', s: `The governing documents and state law typically let the association add reasonable collection costs and attorney fees to the owner's balance. "Add" is the key word. The association pays the invoice first and recovers the money only if the owner pays, or the property is sold or foreclosed.` },
        { t: 'p', s: `Published fee information is sparse. Use the ranges below as orientation, not as a quote:` },
        { t: 'ul', items: [
          `A Florida HOA law firm's 2025 guide puts typical HOA attorney rates at $250 to $500 per hour. It puts simple demand letters at $500 to $1,500 flat ([Gomez Law](${GOMEZ})).`,
          `A California firm describes hourly rates from $250 to $500 or more and court filing fees above $400. It puts complex litigation at $10,000 to $50,000 or more ([LS Carlson Law](${CARLSON})).`,
          `In Colorado, one collections law firm told a court that a typical uncontested HOA foreclosure generates $4,000 to $6,000 in attorney fees. [ProPublica](${PROPUBLICA}) reported the filing in 2023.`,
        ] },
        { t: 'p', s: `Timelines stretch too. Statutory notice periods alone can add months. Florida, for example, requires a notice of late assessment before attorney fees can accrue, then a 45-day notice before a lien ([Fla. Stat. 720.3085](${FLA_720_3085})). Recovery is uncertain throughout. If the owner never pays and the property never changes hands, the fees stay with the association.` },
      ],
    },
    {
      id: 'pre-legal-first-cost',
      h2: 'What does pre-legal-first collections cost, and who pays?',
      blocks: [
        { t: 'p', s: `In a pre-legal-first model, the account goes to a non-attorney vendor for a fixed window, usually 90 days. The vendor validates the balance, sends a plain-language notice, runs a cadence of emails and calls, and offers a standardized payment plan.` },
        { t: 'p', s: `In owner-paid programs, the association pays nothing to participate. Flat program charges are added to the delinquent owner's balance. Payment-plan charges apply only if the owner elects a plan. The management company earns an administrative fee inside that structure for coordinating the account.` },
        { t: 'p', s: `At day 90, the account is either resolved or returned to the board with a complete contact history. Only then does the attorney get involved, and only for the accounts that need it. HOA 48, the program Alloy's partners operate, defers invoicing for program charges when a file goes to the attorney. Counsel can then recover those charges from the owner first.` },
        { t: 'p', s: `The program's goal is to resolve 70% or more of accounts before legal. A goal is not a result. Ask for the actual figures and the period they cover.` },
        { t: 'proof', s: 'HOA 48 results to date: accounts worked, share resolved before legal, and typical days to resolution, with the period covered.' },
      ],
    },
    {
      id: 'stage-by-stage',
      h2: 'How do the two paths compare, stage by stage?',
      blocks: [
        { t: 'p', s: `The table compares who carries the cost at each stage. The attorney-fee figures are the sourced ranges above, not predictions. Pre-legal program charges are not listed because they vary by vendor and are set out in each agreement.` },
        { t: 'table', caption: 'Cost by stage: attorney-first vs. pre-legal-first', head: ['Stage', 'Attorney-first', 'Pre-legal-first'], rows: [
          ['Internal reminders', 'Management company staff time. No outside cost.', 'Same.'],
          ['First outside contact', 'Attorney demand letter, billed to the association. Published flat-fee example: $500 to $1,500 (Florida, 2025).', 'Vendor validation and plain-language notice. Flat program charge added to the owner’s balance; the association pays nothing.'],
          ['Follow-up, 30 to 90 days', 'Further attorney letters and calls at hourly rates. Published range: $250 to $500 per hour (Florida and California, 2025).', 'Email and call cadence plus a payment-plan option, inside the same program charge.'],
          ['Lien', 'Attorney prepares and records the lien. Hourly or flat fee plus recording cost, fronted by the association.', 'Not part of pre-legal. Unresolved files return to the board with documentation; the attorney records a lien if the board decides to.'],
          ['Lawsuit or foreclosure', 'Attorney fees at hourly rates. One Colorado firm’s court filing: $4,000 to $6,000 for a typical uncontested foreclosure (2023).', 'Not part of pre-legal. Only accounts that did not resolve in the window reach this stage.'],
          ['Who recovers the outside cost', 'The association, from the owner, if and when the owner pays.', 'The vendor and the management company, from the owner. The association fronts nothing.'],
        ], note: `Sources: [Gomez Law](${GOMEZ}) (Florida, Oct 2025), [LS Carlson Law](${CARLSON}) (California, Dec 2025), [ProPublica](${PROPUBLICA}) (Colorado, Mar 2023). Ranges vary by state, firm and account.` },
        { t: 'p', s: `No savings figure appears here on purpose. Whether pre-legal saves an association money depends on how many accounts resolve in the window and what the attorney would have charged for them. Ask for both numbers before you believe a projection.` },
        { t: 'proof', s: 'Real cost data for the table: attorney fees per referred account from one or two partner associations (with permission), and HOA 48 program-charge structure confirmed for publication (no per-account amount).' },
      ],
    },
    {
      id: 'no-cost-model-debate',
      h2: 'Is the "no-cost model" legal? The debate boards should know about',
      blocks: [
        { t: 'p', s: `"No cost to the association" is the pitch for most owner-paid programs. It is also the part that has drawn legal scrutiny, mainly in California, and it is worth understanding before a board signs anything.` },
        { t: 'p', s: `California Civil Code section 5650 lets an association recover reasonable costs it incurred in collecting a delinquent assessment, including attorney fees ([Cal. Civ. Code 5650](${CIV_5650})). The word "incurred" is the issue. If the association never owes the vendor anything, a court can ask whether the vendor's charges were ever the association's costs to pass on.` },
        { t: 'ul', items: [
          `In a 2012 Chapter 13 case, In re Cisneros, a California bankruptcy court disallowed roughly $14,000 of a collection company's fees. The association had no obligation to pay them under its contract. The court warned that the arrangement "opens the door to all sorts of mischief."`,
          `In Hanson v. JQD (N.D. Cal. 2014), a homeowner sued a no-cost vendor under the Civil Code and debt collection laws. The court reasoned that the vendor's right to charge the owner could extend no further than the association's own right. The case settled, so it set no binding precedent.`,
        ] },
        { t: 'p', s: `California HOA law firms have written about both cases. Tinnelly Law Group's position is that collection services carry costs no matter who performs them. The association must actually owe those costs for them to become part of the owner's debt ([2012 post](${TINNELLY_2012}), [2017 post](${TINNELLY_2017})).` },
        { t: 'p', s: `What this means for a board: the fee structure matters more than the headline. Questions to ask any vendor:` },
        { t: 'ul', items: [
          `Which charges are the association's obligations, and which are billed only to the owner? Get it in writing.`,
          `How does the fee structure comply with our state's assessment-collection statute? Ask for the specific section.`,
          `Does the process meet federal and state debt collection rules? The federal rules are in [Regulation F](${REG_F}); many states add their own.`,
          `What happens to program charges if the attorney later finds they cannot be recovered from the owner?`,
        ] },
        { t: 'note', s: `This section describes a legal debate. It is not legal advice, and the cases are California-specific. Have the association's attorney review any vendor agreement for your state.` },
      ],
    },
    {
      id: 'when-attorney-first-is-right',
      h2: 'When is going straight to an attorney the right call?',
      blocks: [
        { t: 'p', s: `Pre-legal is not the answer for every account. The board decides, and some accounts belong with counsel from day one:` },
        { t: 'ul', items: [
          `**Bankruptcy filings.** An automatic stay changes what anyone may do. Counsel first.`,
          `**Disputed balances.** If the owner contests the assessment itself, the account needs legal review, not a payment plan.`,
          `**Large or aged balances near a statutory deadline.** Where a lien or filing deadline is close, the attorney needs to move.`,
          `**A pending sale or another lienholder's foreclosure.** Timing and priority are legal questions.`,
        ] },
        { t: 'p', s: `For everything else, the question is sequence. In owner-paid programs a 90-day pre-legal window costs the association nothing to try. Accounts that resolve never reach the attorney. Accounts that do not resolve arrive with the record already built.` },
      ],
    },
  ],
  next: [
    `If your associations have never had a middle stage, start with [What Pre-Legal Collections Are and Where They Fit](/collections/pre-legal-collections). Then bring this comparison and your attorney's fee schedule to the board. The management company's side of the picture is in [Collections as a Revenue Stream for HOA Management Companies](/collections).`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Start here', title: 'What pre-legal collections are and where they fit.', href: '/collections/pre-legal-collections', tone: 'reach' },
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/collections/cost-of-delinquent-accounts', tone: 'match' },
    { kind: 'Collections', meta: 'Policy', title: 'Building an HOA collection policy a board will approve.', href: '/collections/collection-policy', tone: 'retain' },
  ],
  cta: { text: 'Collections is one lever. Thirty minutes with a CAM operator tells you which of the three to pull first.', label: 'Talk to Alloy' },
};
