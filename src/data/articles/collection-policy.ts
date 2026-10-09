// src/data/articles/collection-policy.ts — /collections/collection-policy (cluster page 6)
// Written to the handoff spec (2026-10-08). Indexable. Statute links go to official state code sites only.
// The downloadable outline lives at public/assets/collections/hoa-collection-policy-outline.txt and is
// labelled "not a legal template" both here and in the file. Go-live: 2026-10-20.
import type { ArticleData } from './types';

const CO_TITLE_38 = 'https://leg.colorado.gov/sites/default/files/images/olls/crs2024-title-38.pdf';
const CIV_5660 = 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=5660.';
const CIV_5655 = 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=5655.';
const CIV_5650 = 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=5650.';
const FLA_720_3085 = 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0720/Sections/0720.3085.html';
const REG_F = 'https://www.consumerfinance.gov/rules-policy/regulations/1006/';
const OUTLINE = '/assets/collections/hoa-collection-policy-outline.txt';

export const data: ArticleData = {
  path: '/collections/collection-policy',
  parent: { label: 'Collections', href: '/collections' },
  crumb: 'Collection policy',
  eyebrow: 'Collections',
  h1: 'Building an HOA collection policy',
  h1Accent: 'a board will approve.',
  title: 'HOA Collection Policy: Elements and Sample Outline | Alloy',
  description: 'What an HOA collection policy must cover, where state law sets the rules, how to add a pre-legal stage, and a sample outline to bring to the board.',
  keywords: ['sample hoa collection policy', 'hoa collection policy', 'hoa collections policy'],
  published: '2026-10-20',
  answer: `An HOA collection policy states when assessments are due and when an account becomes delinquent. It sets late charges and interest, the notice sequence, and the point at which an account moves to a vendor or attorney. A manager drafts it from the governing documents and state law, the attorney reviews it, and the board adopts it by resolution.`,
  disclosure: 'short',
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
          `**Vendor handoff.** When an account goes to a pre-legal vendor, what the vendor may and may not do, and when it comes back.`,
          `**Attorney referral.** When an account goes to counsel, who decides, and what the attorney needs with the file.`,
          `**Costs to the owner.** Which collection costs are added to the owner's balance, and the authority for each.`,
          `**Board approval and review.** The resolution adopting the policy and a date to review it.`,
        ] },
        { t: 'p', s: `Every element should trace back to a section of the declaration, the bylaws or a state statute. A policy that cites its authority survives the first owner who challenges it.` },
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
        { t: 'p', s: `Federal and state debt collection rules also apply to third parties who collect on an association's behalf. The federal rules are in [Regulation F](${REG_F}).` },
        { t: 'note', s: `This page is not legal advice. Statutes change, and your state may have rules not listed here. Have the association's attorney review the policy before the board adopts it.` },
      ],
    },
    {
      id: 'adding-a-pre-legal-stage',
      h2: 'How do you add a pre-legal stage to an existing policy?',
      blocks: [
        { t: 'p', s: `Most policies already have two stages: reminders and attorney. Adding a middle stage takes four edits.` },
        { t: 'ol', items: [
          `**Name the trigger.** "Accounts more than 60 days past due are referred to the association's pre-legal collections vendor." Pick the number that fits the governing documents and your state's notice periods.`,
          `**Define the stage.** A fixed window (usually 90 days), the notices and contacts the vendor will make, and the payment-plan terms. Add a statement that the vendor does not give legal advice, file liens, sue or foreclose.`,
          `**State who pays.** In owner-paid programs, program charges are added to the delinquent owner's balance and the association pays nothing. Name the authority in the governing documents or statute for adding those charges, and have the attorney confirm it for your state.`,
          `**Define the return.** At the end of the window, unresolved accounts return to the board with a full contact history, and the board decides on attorney referral.`,
        ] },
        { t: 'p', s: `Keep the attorney stage as it was. The pre-legal stage sits in front of it, not instead of it. [What Pre-Legal Collections Are and Where They Fit](/collections/pre-legal-collections) describes what the stage looks like in practice. [Collections as a Revenue Stream for HOA Management Companies](/collections) covers the management company's side.` },
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
          `**Pre-legal stage.** Trigger [X days]; vendor; window [90 days]; what the vendor may and may not do. Who pays program charges; return to the board with contact history.`,
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
    { q: `Can a collection policy add a pre-legal vendor's charges to the owner's balance?`, a: `Only where the governing documents and state law allow it. Statutes often limit recoverable costs to those the association incurred, and courts have questioned charges that fail that test. Name the authority in the policy and have the association's attorney confirm it for your state before adding the stage.` },
    { q: 'How often should the policy be reviewed?', a: `Annually, and whenever state law changes. Put the review date in the adopting resolution. Collection statutes have changed in several states in recent years. A policy that cites an old notice period is one the first owner's attorney will challenge.` },
    { q: 'Who drafts the policy, the manager or the attorney?', a: `Usually the manager drafts from the governing documents and a template the attorney has approved. The attorney then reviews for state compliance, and the board adopts by resolution. That order keeps costs down and gives the board a document the manager can actually administer.` },
  ],
  next: [
    `Draft from the outline, send it to the association's attorney, and bring the one-page summary to the board. If the policy is gaining a pre-legal stage, read [What Pre-Legal Collections Are and Where They Fit](/collections/pre-legal-collections) first so the stage is described accurately.`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Start here', title: 'What pre-legal collections are and where they fit.', href: '/collections/pre-legal-collections', tone: 'reach' },
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/collections/cost-of-delinquent-accounts', tone: 'match' },
    { kind: 'Collections', meta: 'Software', title: 'Automating HOA dues collection: what software does and doesn’t solve.', href: '/collections/automating-hoa-dues-collection', tone: 'blue' },
  ],
  cta: { text: 'A clear delinquency plan wins proposals and renewals. Thirty minutes with a CAM operator covers the rest of the growth picture.', label: 'Talk to Alloy' },
};
