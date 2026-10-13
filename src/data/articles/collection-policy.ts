// src/data/articles/collection-policy.ts — /resources/collections/collection-policy (cluster page 6)
// Written to the handoff spec (2026-10-08), reframed 2026-10-12 per the client notes: assess the policy you have,
// find the weak points, consider improvements; no single model presented as universal; timelines as ranges.
// Statute links go to official sources only (flagged for attorney review). 2026-10-13: legal-accuracy round (payment-plan
// wording, authority vs. enforceability, Colorado current source + 2025 amendment, Florida notice sequence verified,
// association type named per state, scope statement, counsel sentence). Published 2026-10-13.
import type { ArticleData } from './types';

const CO_CRS = 'https://leg.colorado.gov/colorado-revised-statutes';
const CO_HB25_1043 = 'https://leg.colorado.gov/bills/hb25-1043';
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
  published: '2026-10-13',
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
          `**Payment plans.** When payment plans must be offered, when the board may offer them, and the applicable terms. Who approves exceptions.`,
          `**Application of payments.** The order in which a payment is applied. Some states require assessments first, by statute.`,
          `**Next-stage handoff.** When an account leaves the reminder stage and who handles it next (an internal team, counsel, or a vendor). The scope of that stage, what pauses it, and when the account comes back.`,
          `**Attorney referral.** When an account goes to counsel, who decides, and what the attorney needs with the file.`,
          `**Costs to the owner.** Which collection costs are added to the owner's balance, and the legal basis, limits and required notices for each, confirmed by counsel.`,
          `**Board approval and review.** The resolution adopting the policy and a date to review it.`,
        ] },
        { t: 'p', s: `Every element should trace back to a section of the declaration, the bylaws or a statute. Citing the authority helps counsel evaluate and defend the policy; it does not guarantee enforceability.` },
      ],
    },
    {
      id: 'assess-existing-policy',
      h2: 'How do you assess the policy you already have?',
      blocks: [
        { t: 'p', s: `Most associations have a policy. Fewer follow it, and fewer still have read it since it was adopted. Five checks find the weak points in an hour:` },
        { t: 'ul', items: [
          `**Policy versus practice.** Pull five delinquent accounts and compare each one's history with the policy's dates. If the policy says 60 days and the ledger says 140, the policy is not the process.`,
          `**Trigger versus law.** Check the trigger and notice steps against current federal and state requirements, including validation notices, and against lien rules. Statutes have changed in several states in recent years.`,
          `**Legal basis for every charge.** For each late charge, interest rate and collection cost on an owner's statement, find the sentence in the declaration or statute that allows it. Have counsel confirm the limits and notices. A board vote is not a legal basis on its own.`,
          `**Payment plans.** If the policy has no standard terms, every plan is a negotiation, and the manager is making credit decisions the board did not approve. Some states require plans to be offered in defined circumstances; the policy should say when.`,
          `**Reporting.** If the policy does not say what the board sees and when, the board will ask, and the answer will differ every month.`,
        ] },
        { t: 'p', s: `Write down what you found. The fixes are usually small edits to an existing document, not a new one.` },
      ],
    },
    {
      id: 'state-law',
      h2: 'Where does state law set the requirements?',
      blocks: [
        { t: 'p', s: `HOA collections are governed by applicable federal and state law, as well as the association's governing documents. Requirements vary widely. Some states require a written policy. Some prescribe notice content and timing. Some cap interest and late charges or dictate how payments are applied. Three state examples, each naming the association type it covers and linked to an official source:` },
        { t: 'ul', items: [
          `**Colorado** (the Common Interest Ownership Act, which covers condominiums, cooperatives and planned communities) bars collection-agency referral or legal action on unpaid assessments unless the association has adopted and follows a written collection policy with required contents. Those include a certified-mail notice of delinquency before referral. It also requires first contact with the owner before acting on a delinquency. See C.R.S. 38-33.3-209.5 in the [Colorado Revised Statutes](${CO_CRS}) as currently published by the General Assembly. The section was amended by [HB25-1043](${CO_HB25_1043}), effective October 1, 2025.`,
          `**California** (the Davis-Stirling Act, which covers common interest developments including condominiums and planned developments) requires a pre-lien notice by certified mail at least 30 days before a lien is recorded, under [Civil Code section 5660](${CIV_5660}). The notice has required contents. [Section 5655](${CIV_5655}) applies payments to assessments first, and [section 5650](${CIV_5650}) limits recoverable costs to those the association incurred.`,
          `**Florida** (chapter 720, homeowners' associations; condominiums are governed by chapter 718) sequences the notices under [section 720.3085](${FLA_720_3085}). A written notice of late assessment must go out before attorney fees related to a past-due assessment may be charged to the owner (the statutory notice gives the owner 30 days to pay). Then a 45-day notice of intent to lien, then a 45-day notice before a foreclosure action.`,
        ] },
        { t: 'p', s: `The federal Fair Debt Collection Practices Act, implemented by the CFPB's [Regulation F](${REG_F}), applies to third parties that regularly collect consumer debts. Courts have treated association assessments as consumer debts. Validation notices, dispute handling and communication limits apply, and the "pre-legal" label does not change that. Many states license collection agencies and add their own rules.` },
        { t: 'note', s: `This page is not legal advice. Statutes change, and your state may have rules not listed here. Have the association's attorney review the policy before the board adopts it, and again when the law changes.` },
      ],
    },
    {
      id: 'adding-a-middle-stage',
      h2: 'How do you add a middle stage, if you decide to?',
      blocks: [
        { t: 'p', s: `Many policies have two stages: reminders and attorney. Some associations are well served by exactly that, especially with counsel who runs a disciplined pre-lien cadence. Others benefit from a defined stage in between, run by an internal team, the attorney's office or a pre-legal vendor. If the board decides to add one, it takes four edits:` },
        { t: 'ol', items: [
          `**Name the trigger.** "Accounts more than [X] days past due are referred to the [team / vendor] for the intermediate stage." Pick the number that fits the governing documents, applicable notice periods and any lien or filing deadlines. Have counsel review the full sequence; do not assume the attorney's timeline is unaffected. 60, 90 and 120 days are all in use.`,
          `**Define the stage.** A window, the notices and contacts that will be made, what pauses the cadence (disputes, bankruptcy notices, required notice periods), and the payment-plan terms. Add the scope statement: The pre-legal stage described here excludes legal advice, lien recording, lawsuits and foreclosure. Accounts requiring those steps should receive legal review and follow applicable board-approval requirements.`,
          `**State who pays.** Which charges the association owes and which are added to the owner's balance. Board approval or a management agreement alone does not establish that a charge may be added to a homeowner's balance. Counsel should confirm the legal basis, applicable limits and required notices for each charge. Where a charge cannot be supported, leave it out.`,
          `**Define the return.** At the end of the window, unresolved accounts return to the board with a full contact history, and the board decides on attorney referral.`,
        ] },
        { t: 'p', s: `Keep the attorney stage. The middle stage sits in front of referral for legal enforcement, not instead of counsel. Adding a stage changes the sequence, so review every deadline with counsel rather than assuming the attorney's timelines are unaffected. [What Pre-Legal Collections Are and Where They Fit](/resources/collections/pre-legal-collections) describes when a middle stage fits and when it does not. [Collections as a Revenue Stream for HOA Management Companies](/resources/collections) covers the management company's side.` },
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
          `**Payment plans.** When plans must be offered, when the board may offer them, the applicable terms [length, minimum]; who approves; what ends a plan.`,
          `**Application of payments.** Order of application, per statute where one applies.`,
          `**Intermediate stage, if adopted.** Trigger [X days, sequence reviewed against deadlines]; who runs it; window [X days]; scope statement (excludes legal advice, lien recording, lawsuits, foreclosure). Account verification, not a substitute for statutory validation; what pauses follow-up. Who pays which charges, with the legal basis for each confirmed by counsel; return to the board with contact history.`,
          `**Attorney referral.** Trigger, and what requires earlier referral; board decision; file contents. Which costs are added to the owner's balance, with the legal basis confirmed by counsel.`,
          `**Liens, suits and foreclosure.** Reference to the attorney's process and the statutory requirements; legal review and applicable board-approval requirements at each step.`,
          `**Records and reporting.** Monthly report contents; retention of notices and contact logs.`,
          `**Adoption and review.** Resolution date; annual review date.`,
        ] },
        { t: 'cta', s: `The same outline as a plain text file, labelled "not a legal template", for pasting into your own document.`, label: 'Download the outline', href: OUTLINE },
      ],
    },
  ],
  faq: [
    { q: 'Is an HOA collection policy required by law?', a: `In some states, yes. Colorado, for example, bars collection-agency referral or legal action on unpaid assessments without a written policy. The association must adopt and follow one with specific contents. Other states do not require a policy but prescribe notice steps a policy should reflect. Either way, a written policy gives the manager a process to point to.` },
    { q: `Can a collection policy add a vendor's charges to the owner's balance?`, a: `Only where a legal basis exists. Statutes often limit recoverable costs to those the association incurred, and courts have questioned charges that fail that test. Board approval or a management agreement alone does not establish that a charge may be added to a homeowner's balance. Counsel should confirm the legal basis, applicable limits and required notices for each charge.` },
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
