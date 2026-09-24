// src/components/pages/GetStartedPage.tsx — /get-started
// Template 4e — Strategic Review intake. Copy from docs/redesign-handoff/site/get-started.dc.html.
//
// Two exports:
//   default GetStartedPage — static page shell (hero copy, 3 steps, 30 · 90 · 1 band).
//     Renders `children` in the form slot so the route can pass the island in.
//   GetStartedForm         — the interactive lead form (React island, client:load).
// Keeping the band out of the island means the data-count spans are plain SSR HTML
// and React hydration never sees motion.ts rewriting their text.
//
// Submit contract (src/pages/api/lead.ts): only name, email, company, units, goal,
// source are accepted. The prototype's extra fields (role, metro/ZIP, phone, "where
// is growth stuck") are folded into `goal` so they still reach the notify email.
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, FormEvent, ReactNode } from 'react';
import { Eyebrow, Label, CheckIcon } from '~/components/rd/atoms';

const STEPS = [
  { title: 'You submit. We research.', body: 'Before the call we pull your local search footprint, review velocity, and how boards in your metro currently find management companies.' },
  { title: 'We meet for 30 minutes.', body: 'A CAM operator walks you through what we found — the leaks, the quick fixes, and which engine to build first.' },
  { title: 'You get the plan. You decide.', body: 'A written 90-day plan lands in your inbox within 48 hours. It’s yours whether or not we ever work together.' },
];

const BAND = [
  { value: 30, unit: ' min', note: 'With a CAM operator who has run a portfolio — not an account manager.' },
  { value: 90, unit: '-day plan', note: 'Written, specific to your metro, yours to keep — whether or not you hire us.' },
  { value: 1, unit: ' firm per metro', note: 'If your market is open, we hold it while you decide. If it isn’t, we’ll tell you.' },
];

// Door bands mirror the pre-redesign intake (Under 1,500 / 1,500–5,000 / 5,000–15,000 / 15,000+).
const DOORS = ['Under 1,500', '1,500–5,000', '5,000–15,000', '15,000+'];

// Prototype labels are 11px/.1em (rd-field-label is 12px/.08em); groups gap 6 (rd-field-group is 8).
const LABEL: CSSProperties = { fontSize: 11, letterSpacing: '.1em' };
const GROUP: CSSProperties = { gap: 6 };
const FULL: CSSProperties = { gridColumn: '1 / -1' };
const CARD: CSSProperties = { padding: 36, display: 'flex', flexDirection: 'column', gap: 22 };
const TITLE: CSSProperties = { margin: 0, fontWeight: 700, fontSize: 24, lineHeight: 1.15, color: 'var(--alloy-purple)' };

function Field({ id, label, full = false, children }: { id: string; label: string; full?: boolean; children: ReactNode }) {
  return (
    <div className="rd-field-group" style={full ? { ...GROUP, ...FULL } : GROUP}>
      <label htmlFor={id} className="rd-field-label" style={LABEL}>{label}</label>
      {children}
    </div>
  );
}

export function GetStartedForm() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [doors, setDoors] = useState('');
  const [metro, setMetro] = useState('');
  const [stuck, setStuck] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sourceData, setSourceData] = useState('');
  const doneRef = useRef<HTMLHeadingElement>(null);

  // Lead source capture (page, referrer, UTMs) — unchanged from the pre-redesign form.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const utms = utmKeys.filter(k => params.get(k)).map(k => `${k}=${params.get(k)}`).join(' | ');
    const parts = [
      `Page: ${window.location.href}`,
      document.referrer ? `Referrer: ${document.referrer}` : 'Referrer: direct',
      utms ? `UTMs: ${utms}` : null,
    ].filter(Boolean) as string[];
    setSourceData(parts.join('\n'));
  }, []);

  useEffect(() => {
    if (submitted) doneRef.current?.focus();
  }, [submitted]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const name = `${first.trim()} ${last.trim()}`.trim();
    if (!first.trim() || !last.trim() || !company.trim() || !email.trim() || !doors) {
      setError('Please add your name, company, work email, and doors under management.');
      return;
    }
    setLoading(true);
    setError('');
    const goal = [
      stuck.trim() ? `Where growth feels stuck: ${stuck.trim()}` : null,
      role.trim() ? `Role: ${role.trim()}` : null,
      metro.trim() ? `Primary metro/ZIP: ${metro.trim()}` : null,
      phone.trim() ? `Phone: ${phone.trim()}` : null,
    ].filter(Boolean).join(' | ');
    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email.trim());
    fd.append('company', company.trim());
    fd.append('units', doors);
    fd.append('goal', goal);
    fd.append('source', sourceData);
    try {
      const res = await fetch('/api/lead', { method: 'POST', body: fd });
      if (!res.ok) {
        let json: Record<string, string> = {};
        try { json = await res.json(); } catch { /* ignore */ }
        setError(json['error'] ?? `Server error (${res.status}). Please try again.`);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError(`Network error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rd-card rd-card--off" role="status" style={CARD}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--alloy-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckIcon size={26} color="var(--alloy-purple)" />
        </div>
        <div className="rd-stack rd-stack--6">
          <Label tone="pink" size={12}>Strategic Review · Free</Label>
          <h2 ref={doneRef} tabIndex={-1} style={{ ...TITLE, outline: 'none' }}>You’re in the queue.</h2>
        </div>
        <p className="rd-small">We’ll confirm market availability and send a calendar link within one business day.</p>
      </div>
    );
  }

  return (
    <form className="rd-card rd-card--off" onSubmit={handleSubmit} aria-labelledby="gs-form-title" style={CARD}>
      <div className="rd-stack rd-stack--6">
        <Label tone="pink" size={12}>Strategic Review · Free</Label>
        <h2 id="gs-form-title" style={TITLE}>Request your review</h2>
      </div>

      <div className="rd-grid rd-grid--2" style={{ gap: 16 }}>
        <Field id="gs-first" label="First name">
          <input id="gs-first" name="first_name" className="rd-field" placeholder="First" autoComplete="given-name" required value={first} onChange={(e) => setFirst(e.target.value)} />
        </Field>
        <Field id="gs-last" label="Last name">
          <input id="gs-last" name="last_name" className="rd-field" placeholder="Last" autoComplete="family-name" required value={last} onChange={(e) => setLast(e.target.value)} />
        </Field>
        <Field id="gs-company" label="Company" full>
          <input id="gs-company" name="company" className="rd-field" placeholder="Your CAM firm" autoComplete="organization" required value={company} onChange={(e) => setCompany(e.target.value)} />
        </Field>
        <Field id="gs-email" label="Work email" full>
          <input id="gs-email" name="email" type="email" className="rd-field" placeholder="you@yourfirm.com" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field id="gs-phone" label="Phone">
          <input id="gs-phone" name="phone" type="tel" className="rd-field" placeholder="(000) 000-0000" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
        <Field id="gs-role" label="Your role">
          <input id="gs-role" name="role" className="rd-field" placeholder="Owner / CEO" autoComplete="organization-title" value={role} onChange={(e) => setRole(e.target.value)} />
        </Field>
        <Field id="gs-doors" label="Doors under management">
          <select
            id="gs-doors"
            name="units"
            className="rd-field"
            required
            value={doors}
            onChange={(e) => setDoors(e.target.value)}
            style={doors ? undefined : { color: 'var(--fg-muted)', fontWeight: 400 }}
          >
            <option value="" disabled>Select a range</option>
            {DOORS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <Field id="gs-metro" label="Primary metro or ZIP">
          <input id="gs-metro" name="metro" className="rd-field" placeholder="ZIP code" autoComplete="postal-code" value={metro} onChange={(e) => setMetro(e.target.value)} />
        </Field>
        <Field id="gs-stuck" label="Where does growth feel stuck?" full>
          <textarea id="gs-stuck" name="goal" className="rd-field" rows={3} placeholder="Referrals slowed, RFP win rate, churn, no inbound…" value={stuck} onChange={(e) => setStuck(e.target.value)} style={{ minHeight: 84 }} />
        </Field>
      </div>

      {error ? (
        <div role="alert" className="rd-small rd-small--14 rd-w-500" style={{ background: 'var(--alloy-pink-tint)', borderLeft: '3px solid var(--alloy-pink)', borderRadius: 8, padding: '12px 16px', color: 'var(--alloy-pink-press)' }}>
          {error}
        </div>
      ) : null}

      <button type="submit" className="rd-btn rd-btn--block" disabled={loading} aria-busy={loading} style={{ padding: '18px 28px', ...(loading ? { opacity: .7, cursor: 'wait' } : {}) }}>
        {loading ? 'Sending…' : 'Claim your market'}
      </button>
      <p className="rd-tiny rd-tiny--12 rd-center">We reply within one business day. No drip campaign — one CAM operator, one email.</p>
    </form>
  );
}

export default function GetStartedPage({ children }: { children?: ReactNode }) {
  return (
    <div className="rd-page">
      <section className="rd-section rd-section--hero">
        <div className="rd-wrap rd-grid rd-grid--2 rd-gap-80" style={{ alignItems: 'start' }}>
          <div className="rd-stack rd-stack--40">
            <div className="rd-stack" style={{ gap: 28 }}>
              <Eyebrow>Claim your market</Eyebrow>
              <h1 className="rd-h1 rd-h1--md">Thirty minutes. <span className="rd-accent">One metro.</span> Yours or your competitor’s.</h1>
              <p className="rd-intro">A Strategic Review with a CAM operator — not a sales rep. We diagnose which engine is leaking, hand you a written 90-day plan you keep either way, and check whether your metro is still open. If it is, we hold it for you.</p>
            </div>

            <div className="rd-stack rd-rule-top" style={{ gap: 28, paddingTop: 36 }}>
              <Eyebrow tone="purple">What happens next</Eyebrow>
              {STEPS.map((s, i) => (
                <div key={s.title} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <span className="rd-numeral rd-numeral--36" style={{ flex: 'none', width: 56 }}>{String(i + 1).padStart(2, '0')}</span>
                  <div className="rd-stack rd-stack--6">
                    <div className="rd-step-title">{s.title}</div>
                    <p className="rd-small">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rd-row" style={{ gap: 16, background: 'var(--alloy-off-white)', borderRadius: 10, padding: '22px 24px' }}>
              <span className="rd-dot" style={{ background: 'var(--alloy-green)' }} />
              <div className="rd-small rd-small--14 rd-ink rd-w-500" style={{ lineHeight: 1.5 }}>Once a CAM firm claims a metro, no competing firm in that area can engage Alloy. Nine metros claimed this year.</div>
            </div>
          </div>

          {children ?? <GetStartedForm />}
        </div>
      </section>

      {/* 30 · 90 · 1 strip. data-reveal sits one level up: the rise CSS matches [data-rise] as a descendant of the root. */}
      <section className="rd-section rd-bg-purple" style={{ padding: '72px 0' }}>
        <div className="rd-wrap" data-reveal>
          <div data-rise className="rd-statband">
            {BAND.map((b) => (
              <div key={b.unit} className="rd-stat" style={{ gap: 8 }}>
                <div className="rd-stat-num" style={{ fontSize: 44, letterSpacing: '-.03em' }}>
                  <span data-count={b.value}>{b.value}</span>
                  <span className="rd-accent--yellow">{b.unit}</span>
                </div>
                <div className="rd-stat-note">{b.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
