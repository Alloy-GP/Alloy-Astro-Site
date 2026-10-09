// src/data/articles/cost-of-delinquent-accounts.ts — /collections/cost-of-delinquent-accounts (cluster page 5)
// Written to the handoff spec (2026-10-08). Indexable. Numbers come from the reader's worksheet, never from
// invented averages. Go-live: 2026-10-20.
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
  disclosure: 'short',
  sections: [
    {
      id: 'staff-hours',
      h2: 'How many staff hours does a delinquent account consume?',
      blocks: [
        { t: 'p', s: `Nobody logs the time. A delinquent account touches the manager (notices, owner calls, the board's questions), the accountant (partial payments, re-statements, aging reports) and often the front desk (the owner's second and third call). Each touch is small. Over a month and across a portfolio, the total is a payroll line.` },
        { t: 'p', s: `Industry averages would be a guess, so this page does not offer one. Fill in your own numbers from one recent month:` },
        { t: 'worksheet', title: 'Worksheet: staff hours per delinquent account', rows: [
          { label: 'Delinquent accounts (past the policy trigger)', hint: `Count from this month's aging reports, across every association.` },
          { label: 'Manager minutes per account per month', hint: 'Notices, owner calls, emails, board questions, meeting prep.' },
          { label: 'Accounting minutes per account per month', hint: 'Partial payments, re-statements, aging reports, reconciliation.' },
          { label: 'Front-desk and other minutes per account per month', hint: 'Inbound calls, portal questions, mail.' },
          { label: 'Loaded hourly cost of those people', hint: 'Wages plus taxes, benefits and overhead.' },
        ], result: 'Monthly cost = accounts × (total minutes ÷ 60) × loaded hourly cost', note: 'Multiply by twelve for the annual figure. Compare it with the revenue one new association contract brings in.' },
        { t: 'p', s: `Most operators who run this exercise find the number is larger than they assumed. The work is spread across people who each see only their part.` },
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
          `**Stage of every delinquent account.** Reminder, pre-legal, with attorney, payment plan. One line per account, no narrative.`,
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
          `**Against a hire.** If the hours add up to a part-time role, the question is whether that role should exist or whether the work should move.`,
          `**Against the renewal list.** Which associations with the highest delinquency cost are up for renewal in the next year? Those boards are the ones asking the question.`,
        ] },
        { t: 'p', s: `Then lay out the three options every management company has. Absorb the cost, which is the default. Charge the association for collections work through the management agreement, which boards resist. Or move the work to an owner-paid program, which costs the association nothing and pays the management company for coordination.` },
        { t: 'p', s: `The third option is the one most operators have not seen modelled. The next section explains how it works.` },
      ],
    },
    {
      id: 'cost-to-revenue-line',
      h2: 'How does the cost become a revenue line?',
      blocks: [
        { t: 'p', s: `The work in the worksheet does not disappear. The question is whether anyone pays for it.` },
        { t: 'p', s: `In a pre-legal collections program, accounts past the policy trigger go to a non-attorney vendor for a fixed window. The vendor validates the balance, sends plain-language notices, runs a cadence of calls and emails, and offers payment plans. In owner-paid programs, the charges are added to the delinquent owner's balance and the association pays nothing. The management company earns an administrative fee for coordinating each account.` },
        { t: 'p', s: `Coordination is the work the management company already does: submitting the file, posting payments, reporting to the board. The program makes it a revenue line, with a dated plan the board can see. [Collections as a Revenue Stream for HOA Management Companies](/collections) covers how the program works end to end.` },
        // TODO(2026-10-27): link "revenue per door" → /resources/hoa-management-company-revenue-streams once page 7 is live.
        { t: 'p', s: `Revenue per door is one of the three ways a management company grows, alongside new contracts and retention. Collections revenue is the one that needs no new sales effort.` },
      ],
    },
  ],
  faq: [
    { q: 'Who really pays for delinquent HOA dues?', a: `The association loses the cash until it is collected. The management company pays in staff time, board goodwill and renewal risk, none of which appear on an invoice. Owners who pay on time carry the association's shortfall through reserves or special assessments. The worksheet above measures the management company's share.` },
    { q: 'What is a reasonable delinquency rate for an HOA?', a: `There is no single benchmark worth quoting, because it varies by region, housing type and economy. The useful comparison is your own portfolio over time, by association. Track accounts past the policy trigger each month and watch the direction, not a national average.` },
    { q: 'Should the management company charge the association for collections work?', a: `Some do, through fee schedules in the management agreement. An owner-paid pre-legal program takes a different route. The delinquent owner's balance carries the program charges, and the management company's administrative fee sits inside them. The association pays nothing, which is easier for a board to approve.` },
    { q: 'How soon should a delinquent account leave the reminder stage?', a: `When the collection policy says so. Most policies set a trigger, often 60 or 90 days past due. Accounts that linger past the trigger are the ones that consume staff time and board patience. Name the trigger in the policy and move accounts on the date.` },
  ],
  next: [
    `Run the worksheet for one month and bring the number to your next leadership meeting. Then read [What Pre-Legal Collections Are and Where They Fit](/collections/pre-legal-collections) for the stage that turns the cost around. [Building an HOA Collection Policy a Board Will Approve](/collections/collection-policy) covers the trigger that starts it.`,
  ],
  keepReading: [
    { kind: 'Collections', meta: 'Start here', title: 'What pre-legal collections are and where they fit.', href: '/collections/pre-legal-collections', tone: 'reach' },
    { kind: 'Collections', meta: 'Software', title: 'Automating HOA dues collection: what software does and doesn’t solve.', href: '/collections/automating-hoa-dues-collection', tone: 'blue' },
    { kind: 'Collections', meta: 'Policy', title: 'Building an HOA collection policy a board will approve.', href: '/collections/collection-policy', tone: 'retain' },
  ],
  cta: { text: 'Revenue per door is one lever. Thirty minutes with a CAM operator tells you which of the three to pull first.', label: 'Talk to Alloy' },
};
