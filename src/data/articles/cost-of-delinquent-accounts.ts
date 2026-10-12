// src/data/articles/cost-of-delinquent-accounts.ts — /collections/cost-of-delinquent-accounts (cluster page 5)
// Written to the handoff spec (2026-10-08), expanded 2026-10-12 per the client notes: labor, opportunity cost,
// homeowner experience and profitability; worksheet assumptions spelled out; revenue framed as conditional.
// Indexable. Go-live 2026-10-20.
import type { ArticleData } from './types';

export const data: ArticleData = {
  path: '/collections/cost-of-delinquent-accounts',
  parent: { label: 'Collections', href: '/collections' },
  crumb: 'Cost of delinquent accounts',
  eyebrow: 'Collections',
  h1: 'What delinquent accounts cost',
  h1Accent: 'a management company.',
  title: 'What Delinquent HOA Dues Cost a Management Company | Alloy',
  description: 'Delinquent HOA dues cost a management company staff hours, board trust and renewals, not only the association cash. A worksheet to measure it, and the fix.',
  keywords: ['delinquent hoa dues', 'hoa accounts receivable'],
  published: '2026-10-20',
  answer: `Delinquent accounts cost the management company in three currencies: staff time, board trust and renewals. The association loses cash. The management company loses hours nobody bills for and agenda minutes spent on the same accounts. It also loses the confidence of a board that reads the receivables line first. The fix starts with measuring your own number.`,
  disclosure: 'interest',
  aside: { title: 'What is delinquency costing you?', body: 'A conversation with a CAM operator about your backlog, the hours behind it and the options for getting the work managed.', label: 'Review your process', href: '/contact?intent=collections' },
  sections: [
    {
      id: 'staff-hours',
      h2: 'How many staff hours does a delinquent account consume?',
      blocks: [
        { t: 'p', s: `Nobody logs the time. A delinquent account touches the manager (notices, owner calls, the board's questions), the accountant (partial payments, re-statements, aging reports) and often the front desk (the owner's second and third call). Each touch is small. Over a month and across a portfolio, the total is a payroll line.` },
        { t: 'p', s: `Industry averages would be a guess, so this page does not offer one. Fill in your own numbers from one recent month. The assumptions are yours: count real minutes, and use a loaded cost that includes wages, payroll taxes, benefits and a share of overhead.` },
        { t: 'worksheet', title: 'Worksheet: staff hours per delinquent account', rows: [
          { label: 'Delinquent accounts (past your policy trigger)', hint: `Count from this month's aging reports, across every association. Use your own trigger, whether that is 60, 90 or 120 days.` },
          { label: 'Manager minutes per account per month', hint: 'Notices, owner calls, emails, board questions, meeting prep. Estimate from a typical week, then check it against a calendar.' },
          { label: 'Accounting minutes per account per month', hint: 'Partial payments, re-statements, aging reports, reconciliation.' },
          { label: 'Front-desk and other minutes per account per month', hint: 'Inbound calls, portal questions, mail.' },
          { label: 'Loaded hourly cost of those people', hint: 'Wages plus payroll taxes, benefits and a share of overhead. Not the wage alone.' },
        ], result: 'Monthly cost = accounts × (total minutes ÷ 60) × loaded hourly cost', note: 'Multiply by twelve for the annual figure. Compare it with the annual revenue one average association contract brings in.' },
        { t: 'p', s: `Most operators who run this exercise find the number is larger than they assumed. The work is spread across people who each see only their part.` },
      ],
    },
    {
      id: 'beyond-staff-hours',
      h2: 'What else does delinquency cost?',
      blocks: [
        { t: 'p', s: `The worksheet captures labor. Three other costs are real and harder to put a number on:` },
        { t: 'ul', items: [
          `**Opportunity cost.** Every hour a manager spends on the same delinquent account is an hour not spent elsewhere. A renewal conversation, a project, or the proposal that wins the next association. The hours are the same hours.`,
          `**Homeowner experience.** An owner who gets four identical reminders, then a surprise attorney letter with fees, tells the neighbors. Inconsistent contact and unexplained charges produce complaints, reviews and board emails. A clear notice and a payment option produce fewer of all three.`,
          `**Profitability per association.** A contract with a persistent backlog consumes more hours than its fee was priced for. Margin on that association shrinks without anyone deciding it should. Companies that track hours by association usually find delinquency explains part of the gap between their best and worst contracts.`,
        ] },
        { t: 'p', s: `None of these appear on an invoice. All of them affect whether the management company is a more valuable business next year than this year.` },
      ],
    },
    {
      id: 'board-meetings-and-renewals',
      h2: 'How does delinquency show up in board meetings and renewals?',
      blocks: [
        { t: 'p', s: `Boards read the receivables line early in the financial packet. When it grows, the question comes to the manager, not to the owners who owe the money.` },
        { t: 'p', s: `Three patterns to watch for:` },
        { t: 'ul', items: [
          `**The same accounts every month.** When the delinquency report lists the same names for a year, the board stops seeing a collections problem and starts seeing a management problem.`,
          `**Agenda drift.** Minutes spent on delinquencies are minutes not spent on projects, reserves or the manager's wins. The board remembers the meeting that felt stuck.`,
          `**The renewal question.** At contract time, "what are we doing about delinquencies?" is a referendum on the management company's process. A board that got a clear plan months earlier does not ask it.`,
        ] },
        { t: 'p', s: `None of this is fair. The management company did not create the delinquency. It is still the management company's problem to manage, and the board judges it on whether there is a plan.` },
      ],
    },
    {
      id: 'reporting-receivables',
      h2: 'How should receivables be reported to the board?',
      blocks: [
        { t: 'p', s: `A board that gets clear numbers without asking stops asking. Make the report small enough to read in a minute:` },
        { t: 'ul', items: [
          `**Aging by bucket.** Current, 30, 60, 90-plus. Dollar totals and account counts.`,
          `**Stage of every delinquent account.** Reminder, next stage, with attorney, payment plan. One line per account, no narrative.`,
          `**Movement since last month.** Resolved, newly delinquent, escalated. Three numbers.`,
          `**Next action and date.** What happens to each account and when. A date is the difference between a plan and a hope.`,
        ] },
        { t: 'p', s: `Put it on the same page every month, in the same order. Boards trust what they can compare.` },
      ],
    },
    {
      id: 'presenting-the-number',
      h2: 'How do you bring the number to your own leadership?',
      blocks: [
        { t: 'p', s: `The worksheet gives you a monthly cost. On its own it is a complaint. Put it next to three comparisons and it becomes a decision.` },
        { t: 'ul', items: [
          `**Against one contract.** How many months of delinquency cost equal the annual revenue of one average association? That is the contract the work is quietly consuming.`,
          `**Against a hire.** If the hours add up to a part-time role, the question is whether that role should exist or whether the work should be redesigned.`,
          `**Against the renewal list.** Which associations with the highest delinquency cost are up for renewal in the next year? Those boards are the ones asking the question.`,
        ] },
        { t: 'p', s: `Then lay out the options every management company has:` },
        { t: 'ol', items: [
          `**Absorb the cost.** The default, and a legitimate choice for a small portfolio with few delinquencies.`,
          `**Fix the process first.** A written trigger, a validated first notice, standard payment plans and a monthly report often shrink the hours before anything else changes. This is usually the first move.`,
          `**Bill for the work.** A collections administration fee in the management agreement, approved by the board. Some boards accept it; some do not.`,
          `**Add a stage.** An internal team, the attorney's pre-lien cadence or a pre-legal vendor takes the accounts past the trigger. In some arrangements charges go to the owner where the governing documents and state law allow, which can lower the association's direct cost.`,
        ] },
        { t: 'p', s: `The right answer is usually a combination, and it can differ by association.` },
      ],
    },
    {
      id: 'cost-to-managed-line',
      h2: 'How does the cost become a managed line, and sometimes a revenue line?',
      blocks: [
        { t: 'p', s: `The work in the worksheet does not disappear. The question is whether it is managed, and whether anyone pays for it.` },
        { t: 'p', s: `A managed process moves accounts through defined stages on dates the board approved. That alone cuts the touches. Fewer owner calls because the notice explained the balance. Fewer board questions because the report arrived first. Fewer judgment calls because the terms were set in advance.` },
        { t: 'p', s: `In some arrangements the management company also earns a fee for coordinating the process. That can be a board-approved line in the management agreement. It can also be a coordination fee inside an owner-paid vendor model, where the governing documents and state law allow it. Neither is automatic, both must be disclosed to the board, and the association's attorney should confirm the authority. Revenue that does not cover the coordination hours is not profit, so count the hours either way. [Collections as a Revenue Stream for HOA Management Companies](/collections) covers the approaches and how to review your own.` },
        // TODO(2026-10-27): link "revenue per door" → /resources/hoa-management-company-revenue-streams once page 7 is live.
        { t: 'p', s: `Revenue per door is one of the three ways a management company grows, alongside new contracts and retention. Removing unbilled hours is the quiet fourth, and it improves margin on every contract you already have.` },
      ],
    },
  ],
  faq: [
    { q: 'Who really pays for delinquent HOA dues?', a: `The association loses the cash until it is collected. The management company pays in staff time, board goodwill and renewal risk, none of which appear on an invoice. Owners who pay on time carry the association's shortfall through reserves or special assessments. The worksheet above measures the management company's share.` },
    { q: 'What is a reasonable delinquency rate for an HOA?', a: `There is no single benchmark worth quoting, because it varies by region, housing type and economy. The useful comparison is your own portfolio over time, by association. Track accounts past the policy trigger each month and watch the direction, not a national average.` },
    { q: 'Should the management company charge the association for collections work?', a: `Some do, through a fee schedule in the management agreement that the board approves. Others recover coordination costs inside a vendor arrangement where the governing documents and state law allow charges to be added to the owner's balance. Either way, disclose it to the board and have the association's attorney confirm the authority.` },
    { q: 'How soon should a delinquent account leave the reminder stage?', a: `When the collection policy says so. Policies commonly set a trigger at 60, 90 or 120 days past due, within what state notice periods allow. Accounts that linger past the trigger are the ones that consume staff time and board patience. Name the trigger in the policy and move accounts on the date.` },
  ],
  next: [
    `Run the worksheet for one month and bring the number to your next leadership meeting. Then read [What Pre-Legal Collections Are and Where They Fit](/collections/pre-legal-collections) for one option for the next stage. [Building an HOA Collection Policy a Board Will Approve](/collections/collection-policy) covers the trigger that starts it.`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Start here', title: 'What pre-legal collections are and where they fit.', href: '/collections/pre-legal-collections', tone: 'reach' },
    { kind: 'Collections', meta: 'Software', title: 'Automating HOA dues collection: what software does and doesn’t solve.', href: '/collections/automating-hoa-dues-collection', tone: 'blue' },
    { kind: 'Collections', meta: 'Policy', title: 'Building an HOA collection policy a board will approve.', href: '/collections/collection-policy', tone: 'retain' },
  ],
  cta: { text: 'Want help turning the worksheet into a decision? Thirty minutes with a CAM operator covers your backlog, the hours behind it and the options.', label: 'Review your collections process', href: '/contact?intent=collections' },
};
