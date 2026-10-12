// src/data/articles/collection-policy.ts — /resources/collections/collection-policy (cluster page 6)
// Written to the handoff spec (2026-10-08), reframed 2026-10-12 per the client notes: assess the policy you have,
// find the weak points, consider improvements; no single model presented as universal; timelines as ranges.
// Statute links go to official state code sites only (flagged for attorney review). Indexable. Go-live 2026-10-20.
import type { ArticleData } from './types';

const CO_TITLE_38 = 'https://leg.colorado.gov/sites/default/files/images/olls/crs2024-title-38.pdf';
const CIV_5660 = 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=5660.';
const CIV_5655 = 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=5655.';
const CIV_5650 = 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=5650.';
const FLA_720_3085 = 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0720/Sections/0720.3085.html';
const REG_F = 'https://www.consumerfinance.gov/rules-policy/regulations/1006/';
const OUTLINE = '/assets/collections/hoa-collection-policy-outline.txt';

export const data: ArticleData = {
  path: '/resources/collections/collection-policy',
  parent: { label: 'Collections', href: '/resources/collections' },
  crumb: 'Collection policy',
  eyebrow: 'Collections',
  h1: 'Building an HOA collection policy',
  h1Accent: 'a board will approve.',
  title: 'HOA Collection Policy: Elements and Sample Outline | Alloy',
  description: 'What an HOA collection policy must cover, where state law sets the rules, how to assess the policy you have, and a sample outline to bring to the board.',
  keywords: ['sample hoa collection policy', 'hoa collection policy', 'hoa collections policy'],
  published: '2026-10-20',
  answer: `An HOA collection policy states when assessments are due and when an account becomes delinquent. It sets late charges and interest, the notice sequence, and the point at which an account moves to the next stage. A manager drafts it from the governing documents and state law, the attorney reviews it, and the board adopts it by resolution.`,
  disclosure: 'interest',
  aside: { title: 'Does the policy match the practice?', body: 'A conversation with a CAM operator about where your written policy and your ledger disagree, and what to fix first.', label: 'Review your process', href: '/contact?intent=collections' },
  sections: [
    {
      id: 'required-elements',
      h2: 'What must a collection policy cover?',
      blocks: [
        { t: 'p', s: `A policy a board will approve is specific, short and consistent with the governing documents. These are the elements boards and attorneys look for:` },
        { t: 'ol', items: [
          `**Due dates and grace period.** When each assessment is due and how many days pass before it is late.`,
          `**Delinquency trigger.** The day an account is delinquent, and the day it moves to the next stage. Pick a number of days and use it everywhere.`,
          `**Late charges and interest.** The amounts or rates, within what the governing documents and state law allow.`,
          `**Notice steps.** Which notices go out, in what order, by what method, with how many days between them.`,
          `**Payment plans.** Whether the board offers them, the standard terms, and who approves exceptions.`,
          `**Application of payments.** The order in which a payment is applied. Some states require assessments first, by statute.`,
          `**Next-stage handoff.** When an account leaves the reminder stage and who handles it next (an internal team, counsel, or a vendor). What that party may and may not do, and when it comes back.`,
          `**Attorney referral.** When an account goes to counsel, who decides, and what the attorney needs with the file.`,
          `**Costs to the owner.** Which collection costs are added to the owner's balance, and the authority for each.`,
          `**Board approval and review.** The resolution adopting the policy and a date to review it.`,
        ] },
        { t: 'p', s: `Every element should trace back to a section of the declaration, the bylaws or a state statute. A policy that cites its authority survives the first owner who challenges it.` },
      ],
    },
    {
      id: 'assess-existing-policy',
      h2: 'How do you assess the policy you already have?',
      blocks: [
        { t: 'p', s: `Most associations have a policy. Fewer follow it, and fewer still have read it since it was adopted. Five checks find the weak points in an hour:` },
        { t: 'ul', items: [
          `**Policy versus practice.** Pull five delinquent accounts and compare each one's history with the policy's dates. If the policy says 60 days and the ledger says 140, the policy is not the process.`,
          `**Trigger versus law.** Check the trigger and notice steps against your state's current notice periods and lien rules. Statutes have changed in several states in recent years.`,
          `**Authority for every charge.** For each late charge, interest rate and collection cost on an owner's statement, find the sentence in the declaration or statute that allows it. Anything without one is a dispute waiting to happen.`,
          `**Payment plans.** If the policy has no standard terms, every plan is a negotiation, and the manager is making credit decisions the board did not approve.`,
          `**Reporting.** If the policy does not say what the board sees and when, the board will ask, and the answer will differ every month.`,
        ] },
        { t: 'p', s: `Write down what you found. The fixes are usually small edits to an existing document, not a new one.` },
      ],
    },
    {
      id: 'state-law',
      h2: 'Where does state law set the requirements?',
      blocks: [
        { t: 'p', s: `Collection law is state law, and it varies widely. Some states require a written policy. Some prescribe notice content and timing. Some cap interest and late charges or dictate how payments are applied. Three examples, each linked to the official code:` },
        { t: 'ul', items: [
          `**Colorado** requires associations to adopt a written policy on collecting unpaid assessments, with required contents. The association must follow it before acting on a delinquency. See C.R.S. 38-33.3-209.5 in [Title 38 of the Colorado Revised Statutes](${CO_TITLE_38}), published by the General Assembly.`,
          `**California** requires a pre-lien notice by certified mail at least 30 days before a lien is recorded, under [Civil Code section 5660](${CIV_5660}). The notice has required contents. [Section 5655](${CIV_5655}) applies payments to assessments first, and [section 5650](${CIV_5650}) limits recoverable costs to those the association incurred.`,
          `**Florida** sequences the notices: a notice of late assessment before attorney fees can accrue, then a 45-day notice before a lien, under [section 720.3085](${FLA_720_3085}).`,
        ] },
        { t: 'p', s: `Federal and state debt collection rules also apply to third parties who collect on an association's behalf, and many states license collection agencies. The federal rules are in [Regulation F](${REG_F}).` },
        { t: 'note', s: `This page is not legal advice. Statutes change, and your state may have rules not listed here. Have the association's attorney review the policy before the board adopts it, and again when the law changes.` },
      ],
    },
    {
      id: 'adding-a-middle-stage',
      h2: 'How do you add a middle stage, if you decide to?',
      blocks: [
        { t: 'p', s: `Many policies have two stages: reminders and attorney. Some associations are well served by exactly that, especially with counsel who runs a disciplined pre-lien cadence. Others benefit from a defined stage in between, run by an internal team, the attorney's office or a pre-legal vendor. If the board decides to add one, it takes four edits:` },
        { t: 'ol', items: [
          `**Name the trigger.** "Accounts more than [X] days past due are referred to the [team / vendor] for the intermediate stage." Pick the number that fits the governing documents, your state's notice periods and any lien deadlines. Policies commonly use 60, 90 or 120 days.`,
          `**Define the stage.** A window (commonly 60 to 120 days), the notices and contacts that will be made, and the payment-plan terms. Add a statement that the stage does not give legal advice, file liens, sue or foreclose.`,
          `**State who pays.** Which charges the association owes, which are added to the owner's balance, and the authority in the governing documents or statute for each. Have the attorney confirm it for your state. Where a charge cannot be supported, leave it out.`,
          `**Define the return.** At the end of the window, unresolved accounts return to the board with a full contact history, and the board decides on attorney referral.`,
        ] },
        { t: 'p', s: `Keep the attorney stage as it was. The middle stage sits in front of it, not instead of it. [What Pre-Legal Collections Are and Where They Fit](/resources/collections/pre-legal-collections) describes when a middle stage fits and when it does not. [Collections as a Revenue Stream for HOA Management Companies](/resources/collections) covers the management company's side.` },
      ],
    },
    {
      id: 'what-a-board-needs',
      h2: 'What does a board need to say yes?',
      blocks: [
        { t: 'p', s: `Boards approve policies they can explain to a neighbor. Bring four things to the meeting:` },
        { t: 'ul', items: [
          `**A one-page summary.** Trigger dates, notice sequence, charges, stages. The full policy is the attachment.`,
          `**The attorney's review.** A short note that counsel reviewed the policy for compliance in your state.`,
          `**The owner's experience.** What a delinquent owner will receive, in what order, in plain language. Board members are neighbors of the people being contacted.`,
          `**The reporting.** What the board will see each month, and that it will arrive without being requested.`,
        ] },
        { t: 'p', s: `Then ask for a resolution adopting the policy and a review date one year out.` },
      ],
    },
    {
      id: 'sample-outline',
      h2: 'Sample outline (not a legal template)',
      blocks: [
        { t: 'callout', label: 'Not a legal template.', s: `This outline shows structure only. Terms, amounts and notice periods depend on the governing documents and your state's law. The association's attorney must review the final policy. Every bracket is a decision for the board and the attorney.` },
        { t: 'ol', items: [
          `**Purpose and authority.** Cite the declaration and bylaw sections and the state statute that authorize the policy.`,
          `**Assessments and due dates.** Regular and special assessments; due date; grace period [X days].`,
          `**Delinquency.** Date an account is delinquent; late charge [$ or %]; interest [rate], each within state limits.`,
          `**Notice sequence.** Reminder at [X days]; late notice at [X days]; any statutory notice with its required content and delivery method.`,
          `**Payment plans.** Standard terms [length, minimum]; who approves; what ends a plan.`,
          `**Application of payments.** Order of application, per statute where one applies.`,
          `**Intermediate stage, if adopted.** Trigger [X days]; who runs it; window [commonly 60 to 120 days]; what the stage may and may not do. Who pays which charges, with the authority for each; return to the board with contact history.`,
          `**Attorney referral.** Trigger; board decision; file contents; which costs are added to the owner's balance and under what authority.`,
          `**Liens, suits and foreclosure.** Reference to the attorney's process and the statutory requirements; board approval required at each step.`,
          `**Records and reporting.** Monthly report contents; retention of notices and contact logs.`,
          `**Adoption and review.** Resolution date; annual review date.`,
        ] },
        { t: 'cta', s: `The same outline as a plain text file, labelled "not a legal template", for pasting into your own document.`, label: 'Download the outline', href: OUTLINE },
      ],
    },
  ],
  faq: [
    { q: 'Is an HOA collection policy required by law?', a: `In some states, yes. Colorado requires a written policy with specific contents before an association acts on a delinquency. Other states do not require a policy but prescribe notice steps that a policy should reflect. Either way, a written policy protects the association and gives the manager a process to point to.` },
    { q: `Can a collection policy add a vendor's charges to the owner's balance?`, a: `Only where the governing documents and state law allow it. Statutes often limit recoverable costs to those the association incurred, and courts have questioned charges that fail that test. Name the authority in the policy and have the association's attorney confirm it for your state before adding the stage.` },
    { q: 'How often should the policy be reviewed?', a: `Annually, and whenever state law changes. Put the review date in the adopting resolution. Collection statutes have changed in several states in recent years. A policy that cites an old notice period is one the first owner's attorney will challenge.` },
    { q: 'Who drafts the policy, the manager or the attorney?', a: `Usually the manager drafts from the governing documents and a template the attorney has approved. The attorney then reviews for state compliance, and the board adopts by resolution. That order keeps costs down and gives the board a document the manager can actually administer.` },
  ],
  next: [
    `Run the five checks on the policy you have and draft the edits from the outline. Send them to the association's attorney, then bring the one-page summary to the board. If you are weighing a middle stage, read [What Pre-Legal Collections Are and Where They Fit](/resources/collections/pre-legal-collections) first so the stage is described accurately.`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Start here', title: 'What pre-legal collections are and where they fit.', href: '/resources/collections/pre-legal-collections', tone: 'reach' },
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/resources/collections/cost-of-delinquent-accounts', tone: 'match' },
    { kind: 'Collections', meta: 'Software', title: 'Automating HOA dues collection: what software does and doesn’t solve.', href: '/resources/collections/automating-hoa-dues-collection', tone: 'blue' },
  ],
  cta: { text: 'Want a second set of eyes on the policy and the practice? Thirty minutes with a CAM operator covers where they disagree and what to fix first.', label: 'Review your collections process', href: '/contact?intent=collections' },
};
