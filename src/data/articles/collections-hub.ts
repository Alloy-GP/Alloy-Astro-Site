// src/data/articles/collections-hub.ts — /resources/collections (cluster page 1, the hub)
// Written to the handoff spec (2026-10-08), repositioned 2026-10-12 (client notes): Alloy as an unbiased advisor
// on collections strategy and process, no provider named, timelines as ranges, no absolutes, revenue framed as
// conditional. Proof placeholders removed → the page is indexable. Go-live: 2026-10-20.
import type { ArticleData } from './types';

export const data: ArticleData = {
  path: '/resources/collections',
  parent: { label: 'Resources', href: '/resources' },
  crumb: 'Collections',
  eyebrow: 'Collections',
  h1: 'Collections as a revenue stream',
  h1Accent: 'for HOA management companies.',
  title: 'HOA Collections: A Revenue Stream for Management Companies | Alloy',
  description: 'How HOA management companies turn delinquent accounts from unpaid work into a managed process and, in some models, a revenue line. Approaches and costs.',
  keywords: ['hoa collections', 'hoa accounts receivable', 'hoa debt collection', 'hoa collections process'],
  published: '2026-10-20',
  answer: `Most HOA management companies treat delinquent accounts as unpaid work. A well-designed collections process changes that. It moves accounts through defined stages on a schedule and cuts the hours staff spend chasing them. It gives boards a clear plan, and in some models adds a legitimate revenue line for the management company.`,
  disclosure: 'interest',
  aside: { title: 'Where do your accounts get stuck?', body: 'A conversation with a CAM operator about your current collections process: where it stalls, what it costs, what to change first.', label: 'Review your process', href: '/contact?intent=collections' },
  sections: [
    {
      id: 'what-delinquent-accounts-cost',
      h2: 'What do delinquent accounts cost a management company?',
      blocks: [
        { t: 'p', s: `Every delinquent account creates work that nobody bills for. A manager pulls the aging report, drafts the late notice, answers the owner's call, then explains the account again at the board meeting. The accountant reconciles partial payments and re-runs the statement. None of that time appears on an invoice.` },
        { t: 'p', s: `The cost shows up in three places.` },
        { t: 'ul', items: [
          `**Staff hours.** Each account touches a manager, an accountant and often a front-desk person every month it stays open. Multiply that across a portfolio and delinquency becomes a hidden payroll line.`,
          `**Board meeting time.** Delinquency reports eat agenda minutes that could go to projects, reserves or the manager's own wins. A board that spends every meeting on the same five accounts starts to associate the management company with the problem.`,
          `**Renewal risk.** A rising receivables line is one of the first numbers a board reads. When the contract comes up, "what are we doing about delinquencies?" becomes a renewal question, not a routine one.`,
        ] },
        { t: 'p', s: `Industry averages will not tell you what this costs your company. Your own numbers will. Use the worksheet below with one month of data.` },
        { t: 'worksheet', title: 'Worksheet: what delinquency costs you each month', rows: [
          { label: 'Accounts past your policy trigger', hint: `Across the whole portfolio, from this month's aging reports. Use your own trigger, whether that is 60, 90 or 120 days.` },
          { label: 'Staff hours per account per month', hint: 'Manager, accounting and front-desk time: notices, calls, board questions, reconciliation.' },
          { label: 'Loaded hourly cost', hint: 'Wages plus taxes, benefits and overhead for the people doing that work.' },
        ], result: 'Monthly cost = accounts × hours × loaded hourly cost', note: 'No benchmarks are built in. The point is to see your own number, then decide whether that work should stay unmanaged and unbilled.' },
        { t: 'p', s: `Run the same math for board meeting minutes if you want the full picture. A longer version of this exercise, including opportunity cost and the homeowner side, is in [What Delinquent Accounts Cost a Management Company](/resources/collections/cost-of-delinquent-accounts).` },
      ],
    },
    {
      id: 'approaches',
      h2: 'What are the main approaches to HOA collections?',
      blocks: [
        { t: 'p', s: `Most portfolios run one of four models, often without having chosen it deliberately.` },
        { t: 'ul', items: [
          `**Internal reminders only.** Statements, late notices and calls from the management company, then nothing until the board decides to escalate. Low direct cost, but accounts age and staff time grows with the backlog.`,
          `**Attorney-first.** Accounts go from internal reminders straight to the association's attorney. Legal leverage arrives early, lien deadlines are easier to protect, and many boards value a relationship they already trust. Fees are usually billed to the association first and recovered from the owner where the governing documents and state law allow.`,
          `**A pre-legal stage.** A non-attorney vendor or a dedicated internal team works accounts for a defined window before any attorney referral: structured outreach, payment plans and documentation. It can resolve accounts that would otherwise reach counsel. It also adds a party and a step that have to be managed.`,
          `**Hybrid.** Most companies that review their process land here. Internal reminders, then a pre-legal stage with clear entry and exit rules. The attorney takes accounts that need legal action from the start or do not resolve.`,
        ] },
        { t: 'p', s: `No single model is right for every portfolio. The right answer depends on the governing documents, state law, the association's existing relationships and what the board will support. [What Pre-Legal Collections Are and Where They Fit](/resources/collections/pre-legal-collections) covers the middle stage. [Attorney-First vs. Pre-Legal Collections](/resources/collections/attorney-first-vs-pre-legal) compares the trade-offs.` },
      ],
    },
    {
      id: 'well-designed-process',
      h2: 'What does a well-designed collections process look like?',
      blocks: [
        { t: 'p', s: `Timelines vary more than most articles admit. Some management companies run 60-day internal policies, others 120 days. Pre-legal windows differ by provider and policy. What the effective processes share is that every stage has an entry rule, an exit rule and a date, written down and followed.` },
        { t: 'ol', items: [
          `**Entry rule.** The day an account moves from reminders to the next stage, set by the collection policy and consistent with state notice requirements.`,
          `**Validation.** Someone confirms the balance against the ledger, the governing documents and the policy before any outside contact. Errors found here are far cheaper than errors found by the owner's attorney.`,
          `**First notice.** A plain-language letter that explains the balance and gives the owner a clear way to pay or to ask a question.`,
          `**Structured follow-up.** A written cadence of letters, emails and calls, not an open-ended stream of reminders.`,
          `**Payment options.** Standard payment-plan terms the board has approved in advance, so the manager is not negotiating case by case.`,
          `**Exit rule.** A date on which the account is either resolved, in a plan, or referred to counsel with a decision from the board.`,
          `**Documentation.** Every contact logged, so the attorney starts with a record and the board can see what was done.`,
          `**Reporting.** Stage and status for every delinquent account, monthly, without being asked.`,
        ] },
        { t: 'p', s: `A process with those eight pieces can be run internally, with an outside vendor, with the attorney, or with a mix. The pieces matter more than who performs them.` },
      ],
    },
    {
      id: 'can-the-management-company-earn-revenue',
      h2: 'Can a management company earn revenue from collections?',
      blocks: [
        { t: 'p', s: `Sometimes, and only when the structure allows it. Two models are common.` },
        { t: 'ul', items: [
          `**A collections administration fee in the management agreement.** The board approves a fee schedule that pays the management company for delinquency work: notices, reporting, coordination with counsel. Transparent and simple, and some boards push back on it.`,
          `**A coordination fee inside an owner-paid vendor arrangement.** Some pre-legal arrangements add program charges to the delinquent owner's balance where the governing documents and state law allow it. A fee for the management company's coordination work sits inside those charges. Whether that is permissible and appropriate depends on the documents, the state, the management agreement and full disclosure to the board.`,
        ] },
        { t: 'p', s: `Neither is automatic, and not every account produces revenue. Charges that cannot be recovered from an owner may fall back on the association or go unpaid. The association's attorney should confirm the authority for any charge before it appears on a statement.` },
        { t: 'p', s: `Treat collections revenue as a possible outcome of a better process, not the reason to adopt one. The reliable gain is fewer unbilled hours and a board that stops asking the question. Revenue that does not cover the coordination work is not profit, so count the hours either way.` },
      ],
    },
    {
      id: 'who-pays',
      h2: 'Who pays, and what does the association risk?',
      blocks: [
        { t: 'p', s: `It depends on the model, the governing documents and state law. Three cost structures are common:` },
        { t: 'ul', items: [
          `**Association-paid.** The association pays the attorney or vendor and adds reasonable collection costs to the owner's balance where the documents and statute allow. Recovery depends on the owner paying or the property changing hands.`,
          `**Owner-paid.** Program charges are added to the delinquent owner's balance from the start. The association's direct cost can be low, but it is not zero in every case. Charges an owner successfully challenges, or that a bankruptcy court disallows, may come back to the association, depending on the agreement.`,
          `**Hybrid.** A flat fee from the association for the stage, with some charges passed to the owner.`,
        ] },
        { t: 'p', s: `The risks sit in the details. Some states limit recoverable costs to those the association actually incurred, and courts have questioned vendor charges that fail that test. Third parties collecting on an association's behalf are generally subject to federal debt collection rules and, in many states, licensing and state collection law. Ask any provider three questions. Which charges does the association owe? Which are billed to the owner? What happens to charges that cannot be recovered?` },
      ],
    },
    {
      id: 'what-stays-with-the-attorney',
      h2: `What stays with the association's attorney?`,
      blocks: [
        { t: 'p', s: `Everything with legal force. A pre-legal vendor or internal team cannot give legal advice, file a lien, sue or foreclose. Those steps belong to the board and its attorney, and a pre-legal stage exists to make them rarer, not to replace them.` },
        { t: 'p', s: `The attorney also keeps the accounts that should skip pre-legal entirely. Bankruptcies, disputed balances and accounts near a lien or filing deadline belong there from day one. So do large or aged balances where the board wants immediate legal review.` },
        { t: 'p', s: `Many companies that add a stage keep their current counsel and vendors exactly as they are. The stage sits in front of the attorney, with defined handoffs in both directions. Relationships that work are worth protecting, and a good process improves how existing providers work together rather than replacing them.` },
      ],
    },
    {
      id: 'what-boards-ask',
      h2: 'What do boards ask before approving a change?',
      blocks: [
        { t: 'p', s: `Expect four questions. Bring the answers to the meeting where you propose the change.` },
        { t: 'ul', items: [
          `**Fee transparency.** Boards want every charge listed, including anything the management company earns. Show the schedule in writing and explain who pays each line and under what authority.`,
          `**State-law compliance.** Collection rules differ by state, from notice requirements to what can be added to an owner's balance. Ask any provider how it complies in your state and have the association's attorney confirm it.`,
          `**Reporting.** Boards want the status of every delinquent account without asking for it. A monthly report with stage, contacts made and next action answers that before the meeting.`,
          `**Owner treatment.** Board members are neighbors of the people being contacted. Plain-language notices, payment plans and no threats are what let a board say yes.`,
        ] },
      ],
    },
    {
      id: 'review-your-process',
      h2: 'How do you review your current collections process?',
      blocks: [
        { t: 'p', s: `Few management companies have mapped their collections process end to end. Doing it takes an afternoon and usually finds the leak. Work through these eight checks with one month of data:` },
        { t: 'ol', items: [
          `**Map the stages.** Write down what happens at each stage and on what day, as it actually runs, not as the policy says.`,
          `**Measure the backlog.** Accounts and dollars by aging bucket, by association. Note which buckets are growing.`,
          `**Count the touches.** How many times a manager, accountant or front-desk person handles an account before it resolves or escalates.`,
          `**Compare policy to practice.** Where the written policy says 60 days and the ledger says 140, you have found the stuck point.`,
          `**Check the authority.** For every charge on an owner's statement, name the document or statute that allows it.`,
          `**Check the reporting.** What does the board see each month, and does it arrive without being requested?`,
          `**Check the relationships.** What does the attorney charge per referred file, how long do files sit with counsel, and what comes back?`,
          `**Find where accounts get stuck.** Usually one of three places: the gap between the last reminder and the first escalation, the board's decision to refer, or the attorney's queue.`,
        ] },
        { t: 'p', s: `The findings point to the fix. Sometimes it is a policy change. Sometimes it is technology that is already paid for and not fully used. Sometimes it is an added stage, or simply a better handoff between the providers already in place.` },
        { t: 'cta', s: `Alloy helps management companies run this review, evaluate the options and implement the changes, from policy edits to provider handoffs.`, label: 'Review your collections process', href: '/contact?intent=collections' },
      ],
    },
    {
      id: 'the-bigger-picture',
      h2: 'How does collections fit the bigger picture?',
      blocks: [
        { t: 'p', s: `Collections is one example of a larger opportunity. Management companies tend to measure growth in doors. The businesses that end up more valuable, and less dependent on their owners, work on five things at once. Grow revenue. Improve margins. Eliminate unnecessary work. Make better use of people and technology. Build processes that run without the owner in the room.` },
        { t: 'p', s: `Delinquency touches all five. A managed process removes unbilled hours, protects renewals, uses software that is already paid for, and in some models adds revenue. The same review applies to fee schedules, project oversight, board reporting and software adoption.` },
        // TODO(2026-10-27): link /resources/hoa-management-company-revenue-streams and /resources/how-to-grow-an-hoa-management-company once pages 7 and 8 are live.
        { t: 'p', s: `Not just more doors. Better businesses. That is the lens for every article in this series.` },
      ],
    },
  ],
  faq: [
    { q: 'Can a management company earn revenue from HOA collections?', a: `Sometimes. A board-approved administration fee in the management agreement can pay the management company for delinquency work. So can a coordination fee inside an owner-paid vendor arrangement. Both depend on the governing documents, state law and full disclosure to the board, and neither produces revenue on every account. The dependable gain is fewer unbilled hours.` },
    { q: 'Does a pre-legal collections stage cost the association anything?', a: `It depends on the model. In association-paid models the association pays and recovers costs where allowed. In owner-paid models program charges go on the owner's balance, so the association's direct cost can be low. Charges that cannot be recovered may still fall back to it. Ask any provider exactly which charges the association owes.` },
    { q: 'Is a pre-legal vendor a collection agency or a law firm?', a: `Not a law firm. A pre-legal vendor is a non-attorney third party that works accounts for a defined window before any legal step. In many states it is regulated as a collection agency, and federal debt collection rules generally apply. It does not give legal advice, file liens, sue or foreclose. Those stay with the board and its attorney.` },
    { q: `What happens to an account that isn't resolved in the pre-legal window?`, a: `It returns to the board with its history: every notice, call, response and payment-plan event. The board then decides whether to refer it to the association's attorney. That record shortens the attorney's start-up work and shows a consistent effort before legal action, which matters if the account is later contested.` },
    { q: 'Do state laws limit what can be charged to a delinquent owner?', a: `Often, yes. States differ on notice requirements, interest, late charges and which collection costs can be added to an owner's balance. Some require a written collection policy. Ask any provider how its charges comply in your state, and have the association's attorney review the agreement before adding a stage.` },
  ],
  next: [
    `Start with your own numbers. Run the worksheet above for one month, then work through the eight checks. Read how a pre-legal stage fits the [collection policy](/resources/collections/collection-policy) and the [software stack](/resources/collections/automating-hoa-dues-collection). If you want a second set of eyes on the process, [talk to Alloy](/contact?intent=collections).`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Start here', title: 'What pre-legal collections are and where they fit.', href: '/resources/collections/pre-legal-collections', tone: 'reach' },
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/resources/collections/cost-of-delinquent-accounts', tone: 'match' },
    { kind: 'Collections', meta: 'Policy', title: 'Building an HOA collection policy a board will approve.', href: '/resources/collections/collection-policy', tone: 'retain' },
  ],
  cta: { text: 'Want a second set of eyes on your collections process? Thirty minutes with a CAM operator covers where accounts stall, what it costs and what to change first.', label: 'Review your collections process', href: '/contact?intent=collections' },
};
