// src/components/pages/HOASoftwareGuide.tsx — /resources/hoa-management-software-guide
// Template 5 — article / guide. Layout + hero/TOC/aside copy from
// docs/redesign-handoff/site/resources-hoa-management-software-guide.dc.html.
//
// Body = the prototype's five sections (why-it-matters, the-platforms,
// what-boards-see, integrations, switching) merged with ALL of the
// pre-redesign pillar-guide copy — the SEO asset for the "hoa management
// software" cluster. The pre-redesign section ids (#what-it-is, #audience,
// #categories, #features, #pricing, #rfp, #rollout, #build-vs-buy, #faq) are
// kept so existing deep links still land.
//
// Voice: senior partner, operator-grade. Frameworks and Tuesday-night
// reality checks. Static — the FAQ uses <details>, no client JS needed.
import type { ReactNode } from 'react';
import { Breadcrumb, Eyebrow, Label, Btn, CtaBar, ArrowIcon, CheckIcon, PlusIcon, HeroCtas } from '~/components/rd/atoms';
import { PURPLE, PINK, YELLOW, BLUE, GREEN, REACH_INK, MATCH_INK, RETAIN_INK } from '~/lib/tokens';

// Label ink for blue-accented elements (the prototype's #4a86ad). Not yet a token.
const BLUE_INK = '#4a86ad';

/** Readable-on-white ink for a brand accent color. */
function inkFor(color: string): string {
  if (color === PINK) return REACH_INK;
  if (color === YELLOW) return MATCH_INK;
  if (color === GREEN) return RETAIN_INK;
  if (color === BLUE) return BLUE_INK;
  return PURPLE;
}

interface CategoryProps { accent: string; label: string; headline: string; body: string; board: string; manager: string; examples: string }
interface PhaseProps { phase: string; weeks: string; h: string; tasks: string[]; color: string }
interface FAQItem { q: string; a: string }

// ---------------------------------------------------------------------------
// Content (carried over verbatim from the pre-redesign guide)
// ---------------------------------------------------------------------------
const categories: CategoryProps[] = [
  {
    accent: PINK,
    label: 'Accounting & financial',
    headline: 'Books, reserves, dues, audits.',
    body: 'The foundation layer. Every CAM firm runs accounting software — the only question is whether it integrates with everything else or sits in a silo your team reconciles by hand each month. Dues billing, AR/AP, bank rec, reserve and fund accounting, audit-ready trial balances, 1099s, lockbox integration.',
    board: 'Clean financials at every meeting. Reserve studies that match the bank balance.',
    manager: 'Bank rec, AR aging, vendor 1099s, year-end audits. Where the auditor lives.',
    examples: 'CINC Systems, Enumerate Central (formerly TOPS), FRONTSTEPS Caliber, AppFolio Property Manager, Buildium, VMS, Smartwebs, PayHOA',
  },
  {
    accent: YELLOW,
    label: 'Board portals & governance',
    headline: 'The room where the work happens.',
    body: 'Where directors review packets, vote, sign documents, and find the agenda. The standalone-board-portal market that exists for corporate boards (Diligent, BoardEffect) has effectively zero footprint in HOA — every credible option here is a module inside an all-in-one platform. The board sees this surface more than they see your website. They form their opinion of your firm on it.',
    board: 'Find the packet, sign the doc, see what’s next — on a phone, at 9 PM, before the meeting.',
    manager: 'Packet assembly, agenda templates, motion tracking, document retention.',
    examples: 'Vantaca Home, FRONTSTEPS Community, CINC Systems, Enumerate Engage, TownSq, BoardSpace',
  },
  {
    accent: BLUE,
    label: 'Resident communication',
    headline: 'Notices, requests, the inbox.',
    body: 'Mass communication, work order intake, ARC submissions, violation tracking, community calendars, e-voting. Usually bundled into the accounting platform — and usually the source of every "why didn’t anyone tell us?" complaint.',
    board: 'Did our notice go out? Did homeowners actually see it?',
    manager: 'Eblasts, SMS, push, work orders, violations, ARC, gate codes, e-voting.',
    examples: 'TownSq, Condo Control, FRONTSTEPS Community, Smartwebs, AppFolio Property Manager, PayHOA',
  },
  {
    accent: GREEN,
    label: 'Maintenance & operations',
    headline: 'Inspections, vendors, work orders.',
    body: 'Site inspections (ideally offline-capable on a phone), vendor bid tracking, COI tracking, preventive maintenance schedules, and the photo evidence that proves the manager was actually there. The layer most underbuilt in the typical CAM stack — and the one Smartwebs originally won on with its "3 clicks and a pic" field workflow.',
    board: 'Was the property inspected? Were vendors invoiced for work that actually happened?',
    manager: 'Inspection routes, vendor management, COI tracking, PM schedules, photo logs.',
    examples: 'Smartwebs, Vantaca, FRONTSTEPS Suite Manager, AppFolio Property Manager, CINC Systems',
  },
  {
    accent: PURPLE,
    label: 'Document management & voting',
    headline: 'Governing docs, retention, e-voting.',
    body: 'CC&Rs, bylaws, meeting minutes, ballot logic, proxy tracking, and the retention rules that get firms sued when they’re ignored. Nearly always a module inside the all-in-one platform; standalone e-voting tools sometimes get bolted on for contested elections.',
    board: 'Can we find the original CC&Rs in under a minute? Can we vote without paper?',
    manager: 'Document libraries, version control, statutory retention, e-ballot setup.',
    examples: 'Vantaca, Smartwebs, Enumerate Central, CINC Systems, eUnify · standalone voting: eBallot, ElectionBuddy, AssociationVoting',
  },
  {
    accent: PINK,
    label: 'All-in-one HOA property management software',
    headline: 'One vendor, every layer.',
    body: 'Single-vendor systems covering accounting, portal, communication, documents, and operations. This is where the real competition is — the two clear market leaders for professional CAM firms are Vantaca and CINC Systems, with FRONTSTEPS, Enumerate, and AppFolio Property Manager rounding out the mid-market tier. Easier to buy. Harder to leave. Quality varies module-by-module — the accounting can be excellent and the portal can feel like it shipped in 2014.',
    board: 'One login. One bill. One throat to choke when something breaks.',
    manager: 'Everything in one dashboard. Or — depending on the vendor — five tabs of one dashboard.',
    examples: 'Vantaca · CINC Systems · FRONTSTEPS (Caliber + Community + Suite Manager) · Enumerate (formerly TOPS) · AppFolio Property Manager · Buildium · Smartwebs',
  },
];

const features = [
  {
    n: '01',
    h: 'Mobile-first board portal',
    what: 'Find the packet in 30 seconds, on a phone, at 9 PM, on hotel Wi-Fi. If a director needs a desktop, the portal does not exist for them. This is the single biggest driver of board NPS and the single most-faked dimension in vendor demos.',
    signal: 'Open the live demo portal on your phone. Time it.',
  },
  {
    n: '02',
    h: 'Integrated e-signature, not bolted on',
    what: 'Boards sign 12\u201330 documents a year. DocuSign-out, DocuSign-back is a deal-killing experience. The signing flow must live inside the portal — same login, same UI, archived to the document library automatically.',
    signal: 'Walk through signing a budget approval end-to-end. Count clicks.',
  },
  {
    n: '03',
    h: 'Accounting that actually reconciles',
    what: 'The platform must produce a reserve balance and YTD-vs-budget that match the bank without a controller calling someone. Reserve-account segregation, fund accounting, and audit-ready trial balances are table stakes, not roadmap items.',
    signal: 'Ask for last month’s actual reserve report from a live association.',
  },
  {
    n: '04',
    h: 'Compliance-supporting communications',
    what: 'No platform genuinely "warns you" about fair-housing wording or election-period rules in real time — anyone claiming that is overselling. What the right platform does is support the workflow: configurable templates, approval gates, communication restrictions during election windows, and timestamped audit trails. The cost of one bad eblast during a contested board election dwarfs the licensing fee for a decade; the platform should make the right path the path of least resistance.',
    signal: 'Send a test notice in election mode. Watch what the system makes hard vs. easy.',
  },
  {
    n: '05',
    h: 'Real integrations, in production',
    what: 'An API spec is not an integration. Ask for the named CAM firms running their ACH, eblast, accounting, and CRM connectors in production today. Ship-and-supported, not "on the roadmap."',
    signal: 'Three reference customers per integration, available on a call this week.',
  },
  {
    n: '06',
    h: 'Per-association branding & permissions',
    what: 'One firm running 80 associations needs 80 visual identities, 80 permission models, 80 communication templates — managed centrally. Most platforms force one master brand or one-by-one chaos. The right one does both.',
    signal: 'Show me three live associations on your platform with distinct branding.',
  },
  {
    n: '07',
    h: 'Data export without ransom',
    what: 'Your associations’ data is your data. Get the export terms — including format, frequency, and cost — in writing during the contract phase. The vendors that fight this question are the ones you most need protection from.',
    signal: 'Section 8 of the contract: data export, format, and ceiling cost.',
  },
  {
    n: '08',
    h: 'Real support, not ticket theater',
    what: 'Who answers the phone on a Friday at 4:50 PM when a board meeting at 6 PM can’t open the packet? Tickets are not support. Named human contacts with phone numbers are.',
    signal: 'Call the support line during the eval. Time-to-human, not time-to-ticket.',
  },
  {
    n: '09',
    h: 'A roadmap with ship dates',
    what: 'Every vendor has a roadmap deck. Ask for the three pain points your team complained about last year. If they’re not scoped with quarter-targeted ship dates, they’re "on the list" — and "the list" is where roadmaps go to die.',
    signal: 'Three specific items, three specific quarters. In writing.',
  },
];

const rfp = [
  { num: 'Q01', q: 'Walk us through bank reconciliation for a 200-unit association on a Tuesday morning. Show the actual screens a controller uses, not the dashboard.' },
  { num: 'Q02', q: 'Send credentials for a live demo association we can browse on a phone. No sandbox. Fifteen minutes, unsupervised.' },
  { num: 'Q03', q: 'What is the all-in monthly cost for a portfolio of 80 associations, 12,000 doors, with the module mix below? Include ACH fees, eblast credits, document storage, onboarding amortized, and integration fees.' },
  { num: 'Q04', q: 'Quote the contractual ceiling on year-over-year price increases. What’s the renewal mechanic — opt-out, auto-renew, multi-year lock?' },
  { num: 'Q05', q: 'Connect us with two firms who went live in the last 12 months. We will find a third one ourselves.' },
  { num: 'Q06', q: 'What percentage of your last 10 implementations went live on the originally-scoped timeline? Where did the others slip and why?' },
  { num: 'Q07', q: 'Show three live associations on your platform with distinct branding, distinct permission models, and distinct communication templates. Same login pane.' },
  { num: 'Q08', q: 'Walk us through a budget approval e-signature flow end-to-end. From "manager prepares" to "signed, archived, board notified."' },
  { num: 'Q09', q: 'Send a sample eblast in election-period mode for a fictional association. Show what the system flags or rewrites.' },
  { num: 'Q10', q: 'List every API integration shipped, supported, and in production today. Three customer references per integration, available this week.' },
  { num: 'Q11', q: 'Describe support escalation on a Friday at 4:50 PM when a 6 PM board meeting can’t access the packet. Specifically: who picks up, in what time frame, with what authority?' },
  { num: 'Q12', q: 'Provide the three roadmap items your largest CAM customer asked for at last year’s user conference. With current status and committed ship quarter.' },
  { num: 'Q13', q: 'Send the data export clause from your standard MSA. Format, frequency, cost ceiling, on contract termination.' },
  { num: 'Q14', q: 'In one sentence per item: what are the three things your platform does NOT do well that we should consider before signing?' },
];

const rollout: PhaseProps[] = [
  {
    phase: 'Phase 1', weeks: 'Weeks 0\u20134', h: 'Foundations & data prep',
    color: BLUE,
    tasks: [
      'Lock the implementation team — internal owner, external CSM, executive sponsor.',
      'Inventory current systems and reconciliations. List every workaround your team has invented.',
      'Stage clean chart of accounts, vendor master, and association master.',
      'Communicate the migration timeline to boards before they hear about it from a manager.',
    ],
  },
  {
    phase: 'Phase 2', weeks: 'Weeks 4\u201310', h: 'Dual-system pilot',
    color: YELLOW,
    tasks: [
      'Migrate one association cohort (5\u201310 properties). Run both platforms in parallel.',
      'Train managers in cohort first. Document every "wait, where did that go?" question.',
      'Reconcile pilot AR/AP daily for 30 days. Resolve every discrepancy before scaling.',
      'Brief pilot boards on the new portal experience and what changes for them.',
    ],
  },
  {
    phase: 'Phase 3', weeks: 'Weeks 10\u201320', h: 'Portfolio rollout',
    color: PINK,
    tasks: [
      'Migrate in cohorts of 10\u201320 associations. Two-week cadence between cohorts.',
      'Owner-operator and operations lead embedded with each cohort kickoff.',
      'Hold weekly post-mortems. What broke, what got bolted on, what got cut.',
      'Lock retention bonuses for any manager whose cohort is mid-migration.',
    ],
  },
  {
    phase: 'Phase 4', weeks: 'Weeks 20\u201326', h: 'Decommission & optimize',
    color: GREEN,
    tasks: [
      'Sunset the legacy system. Export every record, store under signed retention policy.',
      'Audit the new platform against the original RFP scorecard. Flag the gaps.',
      'Re-train managers on the workflows that drifted. Update SOPs in the platform.',
      'Reset board NPS baseline post-migration. Compare to pre-migration baseline.',
    ],
  },
];

const pricing = [
  {
    color: BLUE, tier: 'Self-managed HOA software',
    portfolio: 'Single HOA, board-run, no management firm.',
    range: '$0.50–$3 / door / mo',
    range2: 'Or $39–$300/mo flat per association',
    gotchas: 'Real examples: PayHOA ($49/mo up to 25 units → $275/mo for 500+), HOA Start ($39/mo flat), Effortless HOA ($3/home), Buildium Essential (~$55/mo min), EasyHOA (flat-rate tiers). Hidden costs: ACH fees ($1–$3/txn or 0.30–0.50% of dues), per-eblast credits, document storage tiers, monthly minimums on small communities. All-in cost is frequently 50–100% over the headline rate.',
  },
  {
    color: YELLOW, tier: 'CAM-managed · small',
    portfolio: 'Under 50 associations, single market.',
    range: '$1–$3 / door / mo',
    range2: 'Plus $3K–$10K onboarding',
    gotchas: 'Most platforms at this tier use custom quotes. Module add-ons (inspections, e-voting, ARC), per-user manager seats, and integration fees stack up. Some vendors (Smartwebs, Buildium) skip formal onboarding fees — confirm what is actually included before signing.',
  },
  {
    color: PINK, tier: 'CAM-managed · mid-market',
    portfolio: '50–300 associations, multi-market.',
    range: '$1.50–$3.50 / door / mo',
    range2: 'Plus $15K–$40K onboarding',
    gotchas: 'Volume discounts get meaningful here. Negotiate the YoY price ceiling and the multi-year discount up front. Line items that move the most: ACH float, eblast credits, document storage, custom integrations.',
  },
  {
    color: GREEN, tier: 'Enterprise · regional/national',
    portfolio: '300+ associations, complex stack.',
    range: '$1–$3 / door / mo',
    range2: 'Custom MSAs; onboarding $30K–$75K+',
    gotchas: 'Volume discounts are real but require contractual term commitments. At this scale software should be roughly 10–20% of per-door management fees — not more. Multi-system (best-of-breed across layers) sometimes beats single-vendor TCO above 400 associations.',
  },
];

const faq: FAQItem[] = [
  {
    q: 'What is HOA management software?',
    a: 'HOA management software is the day-to-day operating layer a community association management firm — or a self-managed HOA board — runs the business on. It typically covers accounting (dues, reserves, AP/AR), board portals (packets, e-signature, voting), resident communication (notices, work orders, ARC requests), maintenance/inspections, and document retention. Some platforms cover all of those in one (all-in-one); others specialize in one or two layers and integrate.',
  },
  {
    q: 'What is the difference between HOA software and a board portal?',
    a: 'HOA software is the broader operating system the management company runs on; a board portal is one surface inside it — where directors log in to find packets, sign documents, and vote. In HOA, standalone board portals essentially do not exist; the corporate-governance board-portal market (Diligent, BoardEffect) serves Fortune 500s and nonprofits and has no real footprint in CAM. The portal you care about is the one inside Vantaca Home, FRONTSTEPS Community, CINC, Enumerate Engage, TownSq, or whichever all-in-one runs your portfolio.',
  },
  {
    q: 'What is the best HOA management software?',
    a: 'It depends on buyer type. For professional CAM firms, the two clear market leaders are Vantaca and CINC Systems, with FRONTSTEPS, Enumerate (formerly TOPS), and AppFolio Property Manager as the strongest alternatives at mid-market. For self-managed HOAs, the most-recommended platforms are PayHOA, Condo Control, HOA Start, EasyHOA, and Smartwebs. The framework matters more than the brand — use the 14-question RFP on this page to score whichever shortlist you build.',
  },
  {
    q: 'How much does HOA property management software cost?',
    a: 'Self-managed HOAs typically pay $0.50–$3 per door per month or $39–$300 per month flat (PayHOA, HOA Start, EasyHOA, Effortless HOA). CAM firms typically pay $1–$3.50 per door per month depending on portfolio size, plus onboarding from $3K (small firms) up to $75K+ (enterprise). The headline rate is misleading: ACH fees (commonly 0.30–0.50% of dues processed) are often the single biggest hidden cost. Build a 36-month TCO before negotiating.',
  },
  {
    q: 'Can self-managed HOAs use the same software CAM firms use?',
    a: 'Most CAM-grade platforms offer a self-managed tier, but the economics rarely work for a single association — these platforms are priced for portfolio scale and integration density. If you are a self-managed board, look at purpose-built tools: PayHOA, HOA Start, EasyHOA, Effortless HOA, or Yardi Breeze Premier. If you are a CAM firm, skip the self-managed tier of any vendor and start where you are going.',
  },
  {
    q: 'How long does HOA software implementation actually take?',
    a: 'It depends on scope. A self-managed HOA can be up and running in days to a few weeks (PayHOA cites days; HOA Start is similar). A small CAM firm typically takes 30–90 days. A mid-to-large CAM portfolio migration is honestly four to six months — vendors quote 60–90 days but the field reality is longer once you account for the dual-system pilot and cohort rollout. Manager turnover during implementation is the single most common reason migrations fail; lock retention bonuses before kickoff, not after.',
  },
  {
    q: 'Will switching HOA software fix our growth or retention problem?',
    a: 'Almost never. Software fixes operations problems — slow bank rec, late packets, lost vendor invoices, ARC backlog. It helps with service problems where communication and transparency are bottlenecks. It does not fix positioning problems (invisible to boards shopping for new management) or retention problems (quiet churn, transactional renewal conversations). Those require a growth system above the software layer. That is what BoardSuite is for.',
  },
];

const PLATFORMS: Array<[string, string, string, string]> = [
  ['Vantaca', 'Strong', 'Good', '1,500+ doors, CAM-only'],
  ['AppFolio', 'Good', 'Strong', 'Mixed portfolios'],
  ['Buildium', 'Basic', 'Good', 'Under 2,000 doors'],
  ['CINC', 'Good', 'Improving', 'Accounting-led firms'],
];

const AUDIENCES = [
  {
    accent: BLUE,
    label: 'Self-managed HOA software',
    title: 'One association, board-run, no management company.',
    body: 'The board is doing it themselves — dues, reserves, notices, meetings. Self managed HOA software exists to keep this from becoming a second job. Priorities flip: simplicity over depth, predictable monthly cost over per-door pricing, communication and document management over accounting sophistication.',
    items: [
      'Optimize for: low setup time, low ongoing admin, board-friendly UX.',
      'Skip: per-door pricing models, enterprise modules, CAM-grade integrations.',
      'Caution: vendors who quote operator pricing for a 1-association deployment.',
    ],
  },
  {
    accent: PINK,
    label: 'HOA property management software',
    title: 'A CAM firm running a portfolio of properties.',
    body: 'The math changes completely. Per-association costs are pooled across the portfolio, but so are the consequences of a bad choice — every association inherits the platform you pick. Integration depth, manager workflows, per-association branding, and contractual price ceilings matter more than UX gloss.',
    items: [
      'Optimize for: workflow density, manager retention, board portal quality.',
      'Insist on: data export terms, integration roadmap, YoY price ceiling.',
      'Caution: full-stack platforms that are strong in one layer and weak in another.',
    ],
  },
];

const PROBLEMS = [
  { color: PINK, label: 'Operations problem', caption: 'Bank rec slow, packets late, vendor invoices lost, ARC backlog.', fix: 'Software fixes this.', fixInk: RETAIN_INK },
  { color: YELLOW, label: 'Service problem', caption: 'Boards feel ignored. Manager turnover. Communication gaps.', fix: 'Software helps. People decide it.', fixInk: BLUE_INK },
  { color: BLUE, label: 'Positioning problem', caption: 'Invisible to boards searching. Cited by nobody. RFPs go nowhere.', fix: 'Software won’t help.', fixInk: REACH_INK },
  { color: GREEN, label: 'Retention problem', caption: 'Quiet 12% churn. Renewal conversations feel transactional.', fix: 'Software won’t help.', fixInk: REACH_INK },
];

const TOC: Array<{ id: string; label: string }> = [
  { id: 'what-it-is', label: 'What HOA management software is' },
  { id: 'why-it-matters', label: 'Why your software choice is a marketing decision' },
  { id: 'audience', label: 'Self-managed HOAs vs CAM firms' },
  { id: 'categories', label: 'The six software categories' },
  { id: 'the-platforms', label: 'The platforms, compared the way an operator compares them' },
  { id: 'features', label: 'Nine features that matter' },
  { id: 'what-boards-see', label: 'What boards actually see — and judge' },
  { id: 'integrations', label: 'Integrations that touch marketing' },
  { id: 'pricing', label: 'What it actually costs' },
  { id: 'rfp', label: 'The 14-question RFP' },
  { id: 'rollout', label: 'The rollout playbook' },
  { id: 'switching', label: 'If you’re switching: the marketing checklist' },
  { id: 'build-vs-buy', label: 'Build vs buy vs system' },
  { id: 'faq', label: 'FAQ' },
];

const KEEP_READING = [
  { kind: 'Strategy', ink: BLUE_INK, accent: BLUE, meta: '12 min', title: 'CAM marketing strategy: the plan before the tactics.', href: '/resources/cam-marketing-strategy' },
  { kind: 'Course', ink: RETAIN_INK, accent: GREEN, meta: '10 sections', title: 'Trust building for CAM firms.', href: '/resources/courses/trust-building' },
  { kind: 'Proof', ink: REACH_INK, accent: PINK, meta: 'Case study · 12 min', title: 'How one CAM partner went from chasing RFPs to inbound boards.', href: '/results/apex-cmg' },
];

// ---------------------------------------------------------------------------
// Local building blocks
// ---------------------------------------------------------------------------
function Section({ id, label, title, children }: { id: string; label?: string; title: ReactNode; children: ReactNode }) {
  const n = TOC.findIndex((t) => t.id === id) + 1;
  return (
    <section id={id} className="rd-article-section">
      {label ? <Label>{label}</Label> : null}
      <div className="rd-article-head" style={{ gap: 14 }}>
        <span className="rd-numeral rd-numeral--36">{String(n).padStart(2, '0')}</span>
        <h2 className="rd-h3 rd-h3--sm" style={{ lineHeight: 1.2 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function CheckRow({ children, color }: { children: ReactNode; color: string }) {
  return (
    <div className="rd-check" style={{ gap: 10 }}>
      <CheckIcon size={14} color={color} />
      <span className="rd-tiny">{children}</span>
    </div>
  );
}

function CategoryCard({ c }: { c: CategoryProps }) {
  return (
    <div className="rd-card rd-card--pad-sm rd-stack rd-stack--10" style={{ borderLeft: `5px solid ${c.accent}` }}>
      <span className="rd-label" style={{ color: inkFor(c.accent) }}>{c.label}</span>
      <div className="rd-title-18">{c.headline}</div>
      <div className="rd-small rd-small--14">{c.body}</div>
      <div className="rd-stack rd-stack--10 rd-rule-top" style={{ paddingTop: 12, marginTop: 4 }}>
        <div className="rd-stack rd-stack--6"><span className="rd-label rd-label--purple">Board sees</span><span className="rd-tiny">{c.board}</span></div>
        <div className="rd-stack rd-stack--6"><span className="rd-label rd-label--purple">Manager runs</span><span className="rd-tiny">{c.manager}</span></div>
      </div>
      <div className="rd-tiny rd-tiny--12" style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: 10, marginTop: 'auto' }}>
        <span className="rd-label" style={{ marginRight: 8 }}>Examples</span>{c.examples}
      </div>
    </div>
  );
}

export default function HOASoftwareGuide() {
  return (
    <div className="rd-page">
      <section className="rd-breadcrumb-section">
        <div className="rd-wrap">
          <Breadcrumb items={[{ label: 'Resources', href: '/resources' }, { label: 'Software guide', href: '/resources/hoa-management-software-guide' }]} />
        </div>
      </section>

      {/* Hero */}
      <section className="rd-section" style={{ padding: '56px 0 72px' }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>Guide</Eyebrow>
            <h1 className="rd-h1" style={{ fontSize: 'clamp(36px, 5.9vw, 68px)' }}>The HOA management <span className="rd-accent">software guide.</span></h1>
          </div>
          <div className="rd-stack" style={{ gap: 16 }}>
            <p className="rd-intro" style={{ lineHeight: 1.65 }}>Vantaca, AppFolio, Buildium, CINC — compared the way an operator compares them, and what each one means for boards, owners, and your marketing.</p>
            <div className="rd-tiny rd-w-500">{TOC.length} sections · 18 min read · Updated quarterly</div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap rd-grid rd-grid--article rd-gap-80">
          <aside className="rd-toc">
            <nav className="rd-stack" aria-label="On this page" style={{ gap: 13 }}>
              <Label>On this page</Label>
              <div className="rd-toc-list" style={{ borderTop: 0 }}>
                {TOC.map((t) => <a key={t.id} href={`#${t.id}`}>{t.label}</a>)}
              </div>
            </nav>
            <div className="rd-bg-purple rd-ink-white rd-stack" style={{ borderRadius: 10, padding: 22, gap: 12, marginTop: 6 }}>
              <div className="rd-title-16">Want this done for your firm?</div>
              <p className="rd-tiny rd-muted-80">Thirty minutes with a CAM operator. Written 90-day plan, yours to keep.</p>
              <Btn href="/get-started" size="xs">Claim your market</Btn>
            </div>
          </aside>

          <article className="rd-article" style={{ minWidth: 0 }}>
            <Section id="what-it-is" label="What HOA management software is" title="The operating system underneath every CAM firm and every self-managed HOA.">
              <p>HOA management software is the day-to-day operating layer that handles dues collection, reserve accounting, board packets, e-signatures, homeowner notices, work orders, ARC submissions, vendor management, and document retention. Some platforms cover all of those — the all-in-one HOA property management software category. Others specialize in one layer — accounting, the board portal, communications — and integrate with the rest.</p>
              <p>The conversation usually starts the same way. A board complains they can’t find the packet. A manager quits and takes the tribal knowledge with them. A controller spends a weekend reconciling because the integration broke. Somebody says <em>“we need new software for HOA management.”</em> Three vendor demos are scheduled before anyone asks what the actual problem is. <strong>This guide is how to ask that question — and what to do with the answer.</strong></p>
              <p>Most CAM firms shop HOA software by demo. Boards judge it by Tuesday at 9 PM, on a phone, looking for the packet. This is the guide we give every Alloy client when they’re evaluating the platform underneath their portfolio — categories, real pricing ranges, the 14-question RFP, and the rollout playbook that doesn’t blow up your board NPS.</p>
            </Section>

            <Section id="why-it-matters" title="Why your software choice is a marketing decision">
              <p>Boards evaluate you through the portal. Owners judge you by the payment flow. Your proposal promises “technology,” and the platform is what that word means. The software you run shapes every touchpoint a board and an owner have with your firm — which makes it a brand decision as much as an operations one.</p>
            </Section>

            <Section id="audience" label="Who this is for" title="Two buyers. Two playbooks. Same platforms.">
              <p>The product category is the same, but the evaluation math is not. Boards running self-managed HOAs and operators running CAM firms make different bets — and frequently mis-buy by ignoring this.</p>
              <div className="rd-grid rd-grid--2 rd-gap-20">
                {AUDIENCES.map((a) => (
                  <div key={a.label} className="rd-card rd-card--pad rd-stack rd-stack--14" style={{ borderTop: `5px solid ${a.accent}` }}>
                    <span className="rd-label rd-label--12" style={{ color: inkFor(a.accent) }}>{a.label}</span>
                    <div className="rd-title-22 rd-ink">{a.title}</div>
                    <div className="rd-small rd-small--14">{a.body}</div>
                    <div className="rd-stack rd-stack--10" style={{ marginTop: 4 }}>
                      {a.items.map((s) => <CheckRow key={s} color={inkFor(a.accent)}>{s}</CheckRow>)}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="categories" label="The landscape" title="Six functional layers. One platform usually covers all of them.">
              <p>HOA software is not really six independent markets with separate vendors — it is one all-in-one market dominated by a handful of platforms, with six functional layers inside each one. The interesting question is not “which vendor for each layer” but “which layers is this vendor actually strong in, and which ones were bolted on.”</p>
              <div className="rd-grid rd-grid--2 rd-gap-20">
                {categories.map((c) => <CategoryCard key={c.label} c={c} />)}
              </div>
            </Section>

            <Section id="the-platforms" title="The platforms, compared the way an operator compares them">
              <p>Vantaca: built for CAM specifically, strong on board-facing workflow and reporting; steeper onboarding. AppFolio: broad property-management platform with a polished owner experience; association features are a subset. Buildium: accessible pricing and a familiar interface; scales less gracefully past a few thousand doors. CINC Systems: deep accounting and banking integration; the owner UI has improved but still trails.</p>
              <p>None is wrong. The mismatch is choosing a platform for accounting and discovering the board portal is the thing owners see most.</p>
              <div className="rd-table-wrap" style={{ border: '1px solid var(--border-subtle)', borderRadius: 10 }}>
                <table className="rd-table" style={{ fontSize: 14 }}>
                  <colgroup><col style={{ width: '30%' }} /><col /><col /><col /></colgroup>
                  <thead>
                    <tr style={{ background: 'var(--alloy-off-white)' }}>
                      <td aria-hidden="true" />
                      {['Board portal', 'Owner experience', 'Best fit'].map((h) => (
                        <th key={h} scope="col" style={{ color: 'var(--alloy-purple)', fontSize: 11, letterSpacing: '.12em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PLATFORMS.map(([name, portal, owner, fit]) => (
                      <tr key={name}>
                        <td style={{ fontWeight: 700 }}>{name}</td>
                        <td className="rd-td-muted">{portal}</td>
                        <td className="rd-td-muted">{owner}</td>
                        <td className="rd-td-muted">{fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="features" label="The checklist" title="The nine features that actually decide renewal.">
              <p>Vendors lead demos with what photographs well. Boards renew on what works at 9 PM. Re-rank every vendor scorecard around these.</p>
              <div className="rd-rule-bottom">
                {features.map((f) => (
                  <div key={f.n} className="rd-rule-top" style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16, padding: '24px 0' }}>
                    <span className="rd-numeral" style={{ fontSize: 24 }}>{f.n}</span>
                    <div className="rd-stack rd-stack--10">
                      <div className="rd-title-18">{f.h}</div>
                      <div className="rd-small">{f.what}</div>
                      <div className="rd-stack rd-stack--6" style={{ background: 'var(--alloy-purple-tint)', borderLeft: '3px solid var(--alloy-purple)', padding: '14px 16px', borderRadius: 6, marginTop: 4 }}>
                        <span className="rd-label rd-label--purple">Buying signal</span>
                        <div className="rd-small rd-small--14" style={{ fontStyle: 'italic' }}>{f.signal}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="what-boards-see" title="What boards actually see — and judge">
              <p>The login. The financial packet. The violation workflow. The architectural request. If any of them requires a call to your office, that’s the story the board tells at the next meeting. When we build a website or a proposal for a firm, the platform’s board experience is the first thing we look at, because it’s the first thing the board will.</p>
            </Section>

            <Section id="integrations" title="Integrations that touch marketing">
              <p>Inquiry forms that create a CRM record. Review requests triggered by a closed work order. Newsletter lists synced from the owner roster. Attribution that survives the handoff from marketing to operations. Every platform can do some of this; none does all of it out of the box. BoardSuite Scale includes the custom integration work; below that, we scope it.</p>
            </Section>

            <Section id="pricing" label="Pricing reality" title="What HOA software actually costs — by tier, not by brand.">
              <p>Public pricing is rare and usually misleading. These are the ranges we see across active client engagements. Build your 36-month TCO from this, then negotiate.</p>
              <div className="rd-grid rd-grid--2 rd-gap-20">
                {pricing.map((p) => (
                  <div key={p.tier} className="rd-card rd-card--pad-sm rd-stack rd-stack--10" style={{ borderTop: `5px solid ${p.color}` }}>
                    <span className="rd-label" style={{ color: inkFor(p.color) }}>{p.tier}</span>
                    <div className="rd-title-16 rd-ink">{p.portfolio}</div>
                    <div style={{ background: 'var(--alloy-off-white)', borderRadius: 8, padding: '14px 16px' }}>
                      <div className="rd-stat-num" style={{ fontSize: 24 }}>{p.range}</div>
                      <div className="rd-tiny rd-tiny--12" style={{ marginTop: 4 }}>{p.range2}</div>
                    </div>
                    <div className="rd-stack rd-stack--6 rd-rule-top" style={{ paddingTop: 12, marginTop: 'auto' }}>
                      <span className="rd-label">Watch the line items</span>
                      <div className="rd-tiny">{p.gotchas}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rd-stack rd-stack--6" style={{ background: 'var(--alloy-pink-tint)', borderLeft: '4px solid var(--alloy-pink)', padding: '20px 24px', borderRadius: 8 }}>
                <span className="rd-label rd-label--pink">The line that costs you</span>
                <div className="rd-small">ACH float on dues processed is the single biggest hidden cost. A 0.40% rate on a $40M annual dues book is $160K/year — typically more than the licensing line on the same contract. Negotiate the ACH rate as hard as you negotiate the seat license.</div>
              </div>
            </Section>

            <Section id="rfp" label="Vendor evaluation" title="The short-form RFP. Fourteen questions. Send to every shortlist vendor.">
              <p>This is the diligence sequence we walk every Alloy client through when they’re evaluating a platform — independent of which vendor is in the room. Copy it. Paste it. Score the answers.</p>
              <div className="rd-card" style={{ overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <div className="rd-bg-purple rd-row rd-row--between rd-row--wrap" style={{ padding: '20px 28px', gap: 16 }}>
                  <div className="rd-stack rd-stack--6">
                    <Label tone="yellow">The Alloy RFP — short form</Label>
                    <div className="rd-title-18" style={{ color: '#fff' }}>14 questions. Send to every shortlisted vendor. Score the answers.</div>
                  </div>
                  <span className="rd-label rd-label--white" style={{ opacity: 0.6 }}>Copy/paste · No download required</span>
                </div>
                <ol style={{ listStyle: 'none', padding: 0, gap: 0 }}>
                  {rfp.map((it, i) => (
                    <li key={it.num} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 16, padding: '16px 28px', borderTop: i === 0 ? 0 : '1px solid var(--border-subtle)', background: i % 2 === 0 ? '#fff' : 'var(--alloy-off-white)', fontSize: 15, lineHeight: 1.6 }}>
                      <span className="rd-label rd-label--pink" style={{ fontSize: 13, letterSpacing: '.04em', lineHeight: 1.8 }}>{it.num}</span>
                      <span>{it.q}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <p>Want help running this evaluation? <a className="rd-a" href="/get-started">Talk to Alloy</a> — we sit on the buyer side of the table.</p>
            </Section>

            <Section id="rollout" label="The rollout playbook" title="26 weeks. Four phases. Don’t skip Phase 1.">
              <p>The vendor will quote you 60–90 days. For a mid-to-large CAM portfolio migration, the honest number is closer to six months — and the board-side communication has to start before week one of dual-system operation, not after. (Self-managed HOAs and small firms onboarding their first platform compress this dramatically: PayHOA cites days, FRONTSTEPS quotes ~60-day averages. The phased shape still applies; the calendar shrinks.)</p>
              <div className="rd-grid rd-grid--2 rd-gap-20">
                {rollout.map((r) => (
                  <div key={r.phase} className="rd-card rd-card--pad-sm rd-stack rd-stack--10" style={{ borderTop: `5px solid ${r.color}` }}>
                    <div className="rd-row" style={{ gap: 8 }}>
                      <span className="rd-label" style={{ color: inkFor(r.color) }}>{r.phase}</span>
                      <span className="rd-label">· {r.weeks}</span>
                    </div>
                    <div className="rd-title-18">{r.h}</div>
                    <div className="rd-stack rd-stack--10">
                      {r.tasks.map((t) => <CheckRow key={t} color={inkFor(r.color)}>{t}</CheckRow>)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rd-card rd-stack rd-stack--6" style={{ borderLeft: '4px solid var(--alloy-yellow)', padding: '20px 24px', borderRadius: 8 }}>
                <span className="rd-label rd-label--purple">The thing that kills migrations</span>
                <div className="rd-small">
                  Manager turnover during implementation. The manager who has the tribal knowledge of how the current platform handles a specific edge case quits during week 12 of dual-system pain, and the migration loses its anchor. <strong className="rd-ink">Lock retention bonuses before kickoff, not after.</strong> Read our deeper take in <a className="rd-a" href="/resources/cam-marketing-strategy">The CAM Marketing Strategy That Actually Compounds</a> on why operator retention drives every other metric.
                </div>
              </div>
            </Section>

            <Section id="switching" title="If you’re switching: the marketing checklist">
              <p>Announce the change to boards before owners. Redesign the owner communication around the new login. Update every proposal that names the old platform. Retrain the review-request triggers. And put the new portal’s strengths in the sales messaging — a platform migration done well is a proof point, not a disruption.</p>
            </Section>

            <Section id="build-vs-buy" label="Build vs buy vs system" title={<>Software runs the firm. <span className="rd-accent">It does not grow the firm.</span></>}>
              <p>If you’re invisible to boards shopping for a new manager — software won’t help. If your proposals lose to firms running the same platform with a better pitch — software won’t help. If a 12% churn rate is quietly undoing a 20% growth rate — software won’t help.</p>
              <p>That’s what <strong>BoardSuite™</strong> is for: the system above the software layer that engineers attract, close, and keep into one connected playbook. Most of our clients run Vantaca, CINC, or AppFolio. The platform is rarely the constraint. The system around it is. See <a className="rd-a" href="/results/apex-cmg">the Apex CMG case study</a> for an 18-month example.</p>
              <div className="rd-grid rd-grid--2 rd-gap-20" style={{ gap: 14 }}>
                {PROBLEMS.map((p) => (
                  <div key={p.label} className="rd-card rd-card--off rd-card--pad-sm rd-stack rd-stack--10" style={{ borderTop: `3px solid ${p.color}` }}>
                    <span className="rd-label" style={{ color: inkFor(p.color) }}>{p.label}</span>
                    <div className="rd-tiny">{p.caption}</div>
                    <span className="rd-label" style={{ color: p.fixInk, letterSpacing: '.04em', marginTop: 'auto' }}>{p.fix}</span>
                  </div>
                ))}
              </div>
              <HeroCtas primary={{ label: 'See BoardSuite™', href: '/boardsuite' }} secondary={{ label: 'Run your eval with us', href: '/get-started' }} />
            </Section>

            <Section id="faq" label="FAQ" title="The questions CAM operators ask every week.">
              <p>Quick answers from working with firms across every major platform.</p>
              <div className="rd-faq">
                {faq.map((f, i) => (
                  <details key={f.q} open={i === 0}>
                    <summary>{f.q}<PlusIcon /></summary>
                    <div className="rd-faq-a">{f.a}</div>
                  </details>
                ))}
              </div>
            </Section>
          </article>
        </div>
      </section>

      {/* Keep reading */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--24">
          <Label>Keep reading</Label>
          <div className="rd-grid rd-grid--3 rd-gap-20">
            {KEEP_READING.map((k) => (
              <a key={k.href} href={k.href} className="rd-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, borderLeft: `5px solid ${k.accent}`, padding: '26px 26px 22px 28px' }}>
                <div className="rd-row rd-row--between">
                  <span className="rd-label rd-label--12" style={{ color: k.ink }}>{k.kind}</span>
                  <span className="rd-tiny rd-tiny--12">{k.meta}</span>
                </div>
                <div className="rd-title-22 rd-ink" style={{ fontSize: 21 }}>{k.title}</div>
                <span className="rd-link rd-link--12" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>Read <ArrowIcon /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-section rd-bg-off" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <CtaBar text="Thirty minutes tells you which engine to fix first — and whether your metro is open." />
        </div>
      </section>
    </div>
  );
}

// FAQ data for the route's FAQPage JSON-LD — the same answers readers see on
// the page (schema text must match visible content).
export const hoaSoftwareFAQ: FAQItem[] = faq;
