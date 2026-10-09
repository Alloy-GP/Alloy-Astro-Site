// src/data/articles/collections-hub.ts — /collections (cluster page 1, the hub)
// Written to the handoff spec (2026-10-08, section 7, page 1). Carries [PROOF: …] placeholders (HOA 48 results,
// account examples, a quote, a sample notice) → the route is noindex and the page stays out of the sitemap/nav
// until they are filled. Go-live: 2026-10-20 (indexable only once proof is in).
import type { ArticleData } from './types';

export const data: ArticleData = {
  path: '/collections',
  parent: { label: 'Resources', href: '/resources' },
  crumb: 'Collections',
  eyebrow: 'Collections',
  h1: 'Collections as a revenue stream',
  h1Accent: 'for HOA management companies.',
  title: 'HOA Collections: A Revenue Stream for Management Companies | Alloy',
  description: 'How HOA management companies turn delinquent accounts into revenue with a pre-legal collections program that costs the association nothing.',
  keywords: ['hoa collections', 'hoa accounts receivable', 'hoa debt collection', 'hoa collections process'],
  published: '2026-10-20',
  answer: `Most HOA management companies treat delinquent accounts as unpaid work. A pre-legal collections program changes that. A vendor works past-due accounts for a set window before any attorney is involved, the association pays nothing to participate, and the management company earns an administrative fee for coordinating each account.`,
  disclosure: 'named',
  noindex: 'Proof placeholders (HOA 48 results, account examples, quote, sample notice) still to be filled. Brief: noindex and off navigation until then.',
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
          { label: 'Accounts more than 60 days past due', hint: `Across the whole portfolio, from this month's aging reports.` },
          { label: 'Staff hours per account per month', hint: 'Manager, accounting and front-desk time: notices, calls, board questions, reconciliation.' },
          { label: 'Loaded hourly cost', hint: 'Wages plus taxes, benefits and overhead for the people doing that work.' },
        ], result: 'Monthly cost = accounts × hours × loaded hourly cost', note: 'No benchmarks are built in. The point is to see your own number, then decide whether that work should stay unpaid.' },
        { t: 'p', s: `Run the same math for board meeting minutes if you want the full picture. A longer version of this exercise is in [What Delinquent Accounts Cost a Management Company](/collections/cost-of-delinquent-accounts).` },
      ],
    },
    {
      id: 'what-is-pre-legal',
      h2: 'What is a pre-legal collections program?',
      blocks: [
        { t: 'p', s: `Pre-legal collections is a structured, time-limited effort by a non-attorney vendor to resolve delinquent assessments before an account goes to the association's attorney. The vendor sends notices, makes calls and offers payment plans inside a fixed window, usually 90 days. It does not file liens, sue or foreclose.` },
        { t: 'p', s: `Most associations move a delinquent account through three stages. Internal reminders come first: statements, late notices and courtesy calls from the management company. Pre-legal comes second, if the association has it. Legal comes last, when the attorney sends demands, records liens or files suit.` },
        { t: 'p', s: `Without the middle stage, accounts jump from a reminder letter straight to an attorney. That jump is where legal fees begin and where owner relationships break. [What Pre-Legal Collections Are and Where They Fit](/collections/pre-legal-collections) walks through each stage in detail.` },
      ],
    },
    {
      id: 'how-the-program-works',
      h2: 'How does the program work, start to finish?',
      blocks: [
        { t: 'p', s: `A pre-legal program is a fixed sequence, not open-ended dunning. Here is the path an account takes through [HOA 48](https://hoa48.com), the pre-legal program Alloy's partners operate.` },
        { t: 'ol', items: [
          `**Submission.** The association or management company submits the account through a secure portal. Accounts are accepted at any stage of delinquency.`,
          `**Audit and compliance check (days 1 to 30).** The vendor validates the balance against the ledger, the governing documents and the collection policy. It confirms the account can be worked in that state.`,
          `**Plain-language notice.** The owner receives a clear letter that explains the balance and includes a secure payment link. No legal threats, no jargon.`,
          `**The cadence (days 31 to 90).** A measured sequence of emails and calls. The owner can pay in full or enroll in a standardized payment plan.`,
          `**Resolution or return (day 90 and beyond).** Resolved accounts close. Unresolved files return to the board with a full contact history, ready for the attorney.`,
        ] },
        { t: 'p', s: `The fixed end date is the point. The board knows when every account will be either resolved or documented for legal review. The manager has a dated answer for every question about it.` },
        { t: 'p', s: `The program's stated goal is to resolve 70% or more of submitted accounts before an attorney is involved. That is a goal, not a result. Ask any vendor for its actual figures and the period they cover.` },
        { t: 'proof', s: 'HOA 48 resolution results to date: accounts worked and the share resolved before legal, with the period covered.' },
        { t: 'proof', s: 'One or two anonymized account examples, start to finish: balance at submission, contacts made, how and when the account resolved or returned.' },
        { t: 'proof', s: 'Sample owner notice or board report, screenshot with identifying details removed.' },
      ],
    },
    {
      id: 'how-the-management-company-earns',
      h2: 'How does the management company earn revenue from collections?',
      blocks: [
        { t: 'p', s: `In an owner-paid program, the charges for working an account are added to the delinquent owner's balance. Part of that structure is a management company administrative fee, the vendor's own term for it. It compensates the management company for coordinating each account: submitting the file, answering the vendor's questions, applying payments and reporting to the board.` },
        { t: 'p', s: `That coordination is work your team already does for delinquent accounts today. The difference is that it becomes a revenue line instead of an unpaid one.` },
        { t: 'p', s: `The fee is not a percentage we can quote here, because it varies by program and by agreement. Treat it as a share of collected revenue. Confirm it in writing with the vendor and disclose it to the board before the program starts.` },
      ],
    },
    {
      id: 'who-pays',
      h2: 'Who pays, and what does the association risk?',
      blocks: [
        { t: 'p', s: `The delinquent owner pays. Flat program charges are added to the owner's balance, and payment-plan charges apply only if the owner elects a plan. The association pays nothing to participate and nothing up front.` },
        { t: 'p', s: `What does the association risk? Less than most boards assume, if the vendor is structured well. Three things to confirm:` },
        { t: 'ul', items: [
          `**No up-front billing.** The association should never receive an invoice to start the program or to submit an account.`,
          `**A grace period on attorney handoffs.** If a file goes to the attorney, invoicing for program charges should be deferred. The attorney can then recover those charges from the owner first. HOA 48 builds this in.`,
          `**A paper trail the attorney can use.** Every notice, call and response is logged, so the legal stage starts with documentation instead of from scratch.`,
        ] },
        { t: 'p', s: `The real risk is choosing a vendor that charges owners for costs the association never incurred. Some states limit what can be passed through to an owner, and courts have questioned fee structures that fail that test. Have the association's attorney review the agreement before the first account is submitted.` },
      ],
    },
    {
      id: 'what-stays-with-the-attorney',
      h2: `What stays with the association's attorney?`,
      blocks: [
        { t: 'p', s: `Everything with legal force. A pre-legal vendor cannot give legal advice, file a lien, sue or foreclose. Those steps belong to the board and its attorney, and the pre-legal stage exists to make them rarer.` },
        { t: 'p', s: `The attorney also keeps the accounts that should skip pre-legal entirely. Bankruptcies, disputed balances, and large or aged accounts where the board wants immediate legal review belong there. A good program accepts that the board decides which accounts go where.` },
        { t: 'p', s: `For a side-by-side look at what each path costs, when, and who pays, read [Attorney-First vs. Pre-Legal Collections: Cost Comparison](/collections/attorney-first-vs-pre-legal).` },
      ],
    },
    {
      id: 'what-boards-ask',
      h2: 'What do boards ask before approving a program?',
      blocks: [
        { t: 'p', s: `Expect four questions. Bring the answers to the meeting where you propose the program.` },
        { t: 'ul', items: [
          `**Fee transparency.** Boards want every charge listed: program charges, payment-plan charges and the management company's administrative fee. Show them the schedule in writing and explain who pays each line.`,
          `**State-law compliance.** Collection rules differ by state, from notice requirements to what can be added to an owner's balance. Ask the vendor how it complies in your state and have the association's attorney confirm it.`,
          `**Reporting.** Boards want the status of every submitted account without asking for it. A monthly report with stage, contacts made and resolution status answers that before the meeting.`,
          `**Owner treatment.** Board members are neighbors of the people being contacted. Plain-language notices, payment plans and no threats are what let a board say yes.`,
        ] },
        { t: 'proof', s: 'A manager or board quote on the program, with written permission to publish.' },
      ],
    },
    {
      id: 'how-collections-fits-growth',
      h2: `How does collections fit a management company's growth?`,
      blocks: [
        { t: 'p', s: `Management companies grow in three ways: new contracts, retained contracts and more revenue from each contract. Most growth plans chase the first and neglect the third. A collections program adds to revenue per door with no new sales effort, because the accounts already exist.` },
        { t: 'p', s: `It also helps the other two. A clear delinquency plan is a differentiator in a proposal, and a shrinking receivables line is a retention argument at renewal.` },
        // TODO(2026-10-27): once pages 7 and 8 are live, link "revenue per door" → /resources/hoa-management-company-revenue-streams
        // and "three ways" → /resources/how-to-grow-an-hoa-management-company in the paragraph above.
        { t: 'p', s: `Revenue per door is the lever a management company can pull without a single new sale. The other two, winning boards and keeping them, are where Alloy's work lives.` },
        { t: 'cta', s: `Alloy builds the attract, close and keep engines for one HOA management company per metro.`, label: `See Alloy's services`, href: '/services' },
      ],
    },
  ],
  faq: [
    { q: 'Can a management company earn revenue from HOA collections?', a: `Yes. In an owner-paid pre-legal program, the charges added to the delinquent owner's balance include a management company administrative fee. It compensates the management company for coordinating each account: submission, payment posting and board reporting. The amount varies by program and agreement, so confirm it in writing before the first account goes in.` },
    { q: 'Does a pre-legal collections program cost the association anything?', a: `In owner-paid models, no. The association pays nothing to participate and nothing up front. Program charges are added to the delinquent owner's balance, and payment-plan charges apply only when an owner elects a plan. If a file goes to the attorney, invoicing is deferred so the attorney can recover charges from the owner first.` },
    { q: 'Is a pre-legal vendor a collection agency or a law firm?', a: `Neither, in the usual sense. A pre-legal vendor is a non-attorney third party that works accounts for a fixed window before any legal step. It sends notices, makes calls and administers payment plans. It does not give legal advice, file liens, sue or foreclose. Those actions stay with the board and its attorney.` },
    { q: `What happens to an account that isn't resolved in 90 days?`, a: `It returns to the board with its full history: every notice, call, response and payment-plan event. The board then decides whether to refer it to the association's attorney. That record shortens the attorney's start-up work and shows a consistent, reasonable effort before legal action.` },
    { q: 'Do state laws limit what can be charged to a delinquent owner?', a: `Often, yes. States differ on notice requirements, interest, late charges and which collection costs can be added to an owner's balance. Some require a written collection policy. Ask the vendor how its charges comply in your state, and have the association's attorney review the agreement before adding a pre-legal stage.` },
  ],
  next: [
    `Start with your own numbers. Run the worksheet above for one month. Then read how a pre-legal program fits into the [collection policy](/collections/collection-policy), the [software stack](/collections/automating-hoa-dues-collection) and the attorney handoff. If you want help with the other two levers, winning boards and keeping them, [talk to Alloy](/contact).`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Start here', title: 'What pre-legal collections are and where they fit.', href: '/collections/pre-legal-collections', tone: 'reach' },
    { kind: 'Collections', meta: 'Worksheet', title: 'What delinquent accounts cost a management company.', href: '/collections/cost-of-delinquent-accounts', tone: 'match' },
    { kind: 'Collections', meta: 'Policy', title: 'Building an HOA collection policy a board will approve.', href: '/collections/collection-policy', tone: 'retain' },
  ],
  cta: { text: 'Collections is one lever. Thirty minutes with a CAM operator tells you which of the three to pull first.', label: 'Talk to Alloy' },
};
