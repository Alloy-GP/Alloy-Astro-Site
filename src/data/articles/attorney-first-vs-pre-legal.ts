// src/data/articles/attorney-first-vs-pre-legal.ts — /resources/collections/attorney-first-vs-pre-legal (cluster page 3)
// Written to the handoff spec (2026-10-08), rebalanced 2026-10-12 per the client notes: trade-offs both ways, no
// provider named, no savings promised. 2026-10-13: dollar ranges removed (unverified for assessment collections),
// Hanson and Cisneros verified against the court documents and linked, Florida notice sequence verified against the
// statute, service descriptions replace "leverage" language. Indexable from 2026-10-13 (checks passed).
import type { ArticleData } from './types';

const CIV_5650 = 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=5650.';
const FLA_720_3085 = 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0720/Sections/0720.3085.html';
const REG_F = 'https://www.consumerfinance.gov/rules-policy/regulations/1006/';
const PROPUBLICA = 'https://www.propublica.org/article/colorado-hoa-lawsuits-foreclosure-law-firms-paymah';
const TINNELLY_2012 = 'https://hoalaw.tinnellylaw.com/allowable-collection-fees-to-o/';
const TINNELLY_2017 = 'https://hoalaw.tinnellylaw.com/no-cost-collections-can-prove-costly/';
const HANSON_ORDER = 'https://docs.justia.com/cases/federal/district-courts/california/candce/3:2013cv05377/272085/38';
const CISNEROS_OPINION = 'https://www.govinfo.gov/content/pkg/USCOURTS-canb-1_12-bk-10468/pdf/USCOURTS-canb-1_12-bk-10468-0.pdf';

export const data: ArticleData = {
  path: '/resources/collections/attorney-first-vs-pre-legal',
  parent: { label: 'Collections', href: '/resources/collections' },
  crumb: 'Attorney-first vs. pre-legal',
  eyebrow: 'Collections',
  h1: 'Attorney-first vs. pre-legal collections:',
  h1Accent: 'a cost comparison.',
  title: 'Attorney-First vs. Pre-Legal HOA Collections: Costs | Alloy',
  description: 'Who does what, at whose expense, under attorney-first and pre-legal HOA collections: trade-offs both ways, owner-paid fee debate, when counsel first is right.',
  keywords: ['hoa collections legal service cost comparison', 'hoa collections cost comparison', 'cost of law firm hoa assessment collections'],
  published: '2026-10-13',
  answer: `Under an attorney-first approach, the association engages counsel under its fee agreement. It may recover costs from the owner where the documents and applicable law allow. Under a pre-legal-first approach, a vendor or team provides outreach and payment-plan administration for a defined window. Enforcement is referred separately. The difference is who does what, when, and at whose expense.`,
  disclosure: 'interest',
  aside: { title: 'Which path fits your portfolio?', body: 'A conversation with a CAM operator about your attorney costs per file, your backlog by balance, and whether a middle stage would help.', label: 'Review your process', href: '/contact?intent=collections' },
  sections: [
    {
      id: 'attorney-first',
      h2: 'What does attorney-first collections cost, and what does it buy?',
      blocks: [
        { t: 'p', s: `In an attorney-first model, the association refers a delinquent account to its law firm once internal reminders fail. What happens next depends on the engagement, the governing documents and applicable law. Counsel can advise on and pursue authorized legal remedies. Those may include demand letters, liens, lawsuits or, where permitted, foreclosure, in whatever order the situation calls for. Work is billed under the firm's fee agreement.` },
        { t: 'p', s: `What it buys is real. Counsel is positioned to track lien, notice and filing deadlines and to act on them. Counsel exercises judgment on every file, which matters for disputes and bankruptcies. And many boards value a single relationship they already trust. Billing terms vary: some firms bill as work is done, some defer billing until recovery, so ask before assuming the association pays up front.` },
        { t: 'p', s: `The governing documents and applicable law may let the association add reasonable collection costs and attorney fees to the owner's balance. "Add" is the key word. Where the association pays the invoice first, it recovers the money only if the owner pays, or the property is sold or foreclosed.` },
        { t: 'p', s: `Published fee information for routine assessment collection is sparse, and general guides to HOA legal costs do not establish it. The number that matters is the association's actual attorney fee schedule and last year's invoices. One verified data point comes from a 2023 Colorado court filing reported by [ProPublica](${PROPUBLICA}). A collections law firm stated that a typical uncontested HOA foreclosure case generated $4,000 to $6,000 in attorney fees. Treat that as one firm's statement about one remedy in one state, not a benchmark.` },
        { t: 'p', s: `Timelines are set partly by statute. Florida's homeowners' association statute, for example, sequences the notices under [Fla. Stat. 720.3085](${FLA_720_3085}); condominiums are governed separately. A written notice of late assessment must go out before attorney fees related to a past-due assessment may be charged to the owner (the statutory notice gives the owner 30 days to pay). Then a 45-day notice of intent to lien, then a 45-day notice before a foreclosure action. Recovery is uncertain throughout. If the owner does not pay and the property does not change hands, the fees can stay with the association.` },
      ],
    },
    {
      id: 'pre-legal-first',
      h2: 'What does pre-legal-first collections cost, and what does it buy?',
      blocks: [
        { t: 'p', s: `In a pre-legal-first model, the account goes to a non-attorney vendor or a dedicated team for a defined window. The policy and the agreement set the window. The stage verifies the account against the ledger and sends a plain-language notice. It runs a cadence of emails and calls and offers a standard payment plan. Enforcement is referred separately, to counsel, for files that do not resolve or that need legal review sooner.` },
        { t: 'p', s: `Who pays depends on the arrangement. Some vendors bill the association a flat fee. Others add program charges to the delinquent owner's balance where the governing documents and state law allow. That keeps the association's direct cost low, but not necessarily zero. Charges that cannot be recovered from the owner may fall back to the association, depending on the agreement. Some arrangements also include a coordination fee for the management company, which must be disclosed to the board. Board approval or a management agreement alone does not establish that a charge may be added to a homeowner's balance. Counsel should confirm the legal basis, applicable limits and required notices for each charge.` },
        { t: 'p', s: `What it buys: structured outreach that actually happens and payment plans that keep owners out of court. It also produces documentation the attorney can use, and fewer small files in counsel's queue.` },
        { t: 'p', s: `What it costs beyond the fees: it adds a party and a handoff. A window that runs too long can crowd a lien or filing deadline. The whole sequence has to be reviewed against applicable deadlines. Owner-paid charges can be challenged, as the next sections explain. And the stage provides outreach and payment-plan administration, not enforcement, so an owner who ignores it has cost the association time.` },
      ],
    },
    {
      id: 'stage-by-stage',
      h2: 'How do the two paths compare, stage by stage?',
      blocks: [
        { t: 'p', s: `The table compares what each path provides at each stage and who carries the cost. Attorney fees are per the association's actual attorney fee schedule; no ranges are shown because published figures do not establish routine assessment-collection pricing. Pre-legal charges are not listed because they vary by provider and are set out in each agreement.` },
        { t: 'table', caption: 'Attorney-first vs. pre-legal-first, by stage', head: ['Stage', 'Attorney-first', 'Pre-legal-first'], rows: [
          ['Internal reminders', 'Management company staff time. No outside cost.', 'Same.'],
          ['First outside contact', 'Attorney communication under the engagement, per the association\u2019s actual attorney fee schedule. Counsel can advise on and pursue authorized remedies.', 'Account verification and a plain-language notice. Charge billed to the association, or added to the owner\u2019s balance only where counsel has confirmed the legal basis. Outreach only; enforcement is referred separately.'],
          ['Follow-up', 'Further attorney communications, per the fee schedule.', 'Email and call cadence plus a payment-plan option, inside the same charge, paused where law requires it; legal deadlines tracked separately by counsel.'],
          ['Lien', 'Counsel prepares and records a lien where authorized, per the fee schedule, and tracks the applicable deadlines.', 'Not part of pre-legal. Unresolved files return to the board with documentation; counsel records a lien if the board authorizes it. The whole sequence must be reviewed against the deadlines.'],
          ['Lawsuit or foreclosure', 'Per the association\u2019s actual attorney fee schedule. Remedies and their order depend on the governing documents and applicable law.', 'Not part of pre-legal. Files that did not resolve, or that needed legal review sooner, are referred to counsel.'],
          ['Who carries the outside cost', 'The association, recovered from the owner where the documents and applicable law allow and the owner pays.', 'The association or the owner, by agreement and only where a legal basis exists. Charges that cannot be recovered may come back to the association.'],
          ['What each provides', 'Legal advice and authorized legal remedies.', 'Outreach, documentation and payment-plan administration; enforcement referred separately.'],
          ['Relationships', 'One: the association\u2019s counsel.', 'Two or more: the stage and counsel, with handoffs to manage.'],
        ], note: `Fees: per the association's actual attorney fee schedule and the provider's agreement. Remedies, sequence and recoverability depend on the governing documents and applicable law.` },
        { t: 'p', s: `No savings figure appears here on purpose. Whether a pre-legal stage saves an association money depends on three things. How many accounts resolve in the window. What the attorney would have charged for them under the actual fee schedule. What the stage itself costs. Ask for all three numbers before you believe a projection, from any provider and from any consultant, including us.` },
      ],
    },
    {
      id: 'owner-paid-fee-debate',
      h2: 'Are owner-paid collection charges legal? The debate boards should know about',
      blocks: [
        { t: 'p', s: `"No cost to the association" is the pitch for most owner-paid arrangements. It is also the part that has drawn legal scrutiny, mainly in California, and it is worth understanding before a board signs anything.` },
        { t: 'p', s: `California Civil Code section 5650 lets an association recover reasonable costs it incurred in collecting a delinquent assessment, including attorney fees ([Cal. Civ. Code 5650](${CIV_5650})). The word "incurred" is the issue. If the association owes the vendor nothing, a court can ask whether the vendor's charges were ever the association's costs to pass on.` },
        { t: 'ul', items: [
          `In [In re Cisneros](${CISNEROS_OPINION}) (Bankr. N.D. Cal., Oct. 1, 2012), a Chapter 13 debtor objected to the collection fees in two claims a vendor filed on an association's behalf. The court disallowed the disputed fees, $14,744 across the two claims. They were not costs the association had incurred under its contract and, separately, the vendor had not shown them to be reasonable. It warned that the arrangement "opens the door to all sorts of mischief." It noted the vendor "cannot have more rights than the HOA has."`,
          `In [Hanson v. JQD, LLC](${HANSON_ORDER}) (N.D. Cal.), a homeowner challenged an owner-paid vendor's charges. In 2014, a federal district court allowed FDCPA and unfair-competition claims challenging the vendor's charges to proceed. The ruling addressed whether the allegations stated viable claims, rather than a final determination of liability. The court reasoned that a vendor acting as the association's agent could impose collection fees no further than the association's own right. That right comes from section 5650. It noted the Court of Appeal had not addressed whether the statute's limits bear on third-party fees.`,
        ] },
        { t: 'p', s: `California HOA law firms have written about both cases. Tinnelly Law Group's position is that collection services carry costs no matter who performs them. The association must actually owe those costs for them to become part of the owner's debt ([2012 post](${TINNELLY_2012}), [2017 post](${TINNELLY_2017})).` },
        { t: 'p', s: `Both rulings are California-specific and fact-specific. They do not invalidate every owner-paid arrangement. They show what a court examines. Did the association incur the cost? Does the charge have a legal basis, with its limits and notices? Is it reasonable? What this means for a board: the fee structure matters more than the headline. Questions to ask any provider:` },
        { t: 'ul', items: [
          `Which charges are the association's obligations, and which are billed only to the owner? Get it in writing, with the legal basis for each. Board approval or a management agreement alone does not establish it.`,
          `How does the fee structure comply with our state's assessment-collection statute? Ask for the specific section.`,
          `Does the process comply with the FDCPA and [Regulation F](${REG_F}), including validation notices and dispute handling? Many states add licensing and their own rules, and the "pre-legal" label exempts nobody.`,
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
          `**Large or aged balances near a statutory deadline.** Where a lien or filing deadline is close, counsel needs to act.`,
          `**A pending sale or another lienholder's foreclosure.** Timing and priority are legal questions.`,
        ] },
        { t: 'p', s: `A middle stage tends to help with the rest: modest balances, owners who respond to a call, no legal complications. It also suits a board that would rather see a payment plan than a lawsuit against a neighbor. For those accounts, the question is sequence. Resolve what can be resolved, then refer the files that need counsel, with the record already built. Review the whole sequence against applicable deadlines with counsel before adopting it.` },
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
          `Pilot a middle stage on a few associations with the board's approval, with the full sequence reviewed by counsel against applicable deadlines.`,
          `Measure resolution, cost and board questions against the associations that stayed on the current path.`,
        ] },
        { t: 'cta', s: `Alloy helps management companies review operations, evaluate options and coordinate implementation. The association's attorney reviews legal requirements, policy language and fee authority.`, label: 'Review your collections process', href: '/contact?intent=collections' },
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
