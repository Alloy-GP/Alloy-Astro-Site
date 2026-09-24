// src/components/pages/ContactPage.tsx — /contact
// Template 6 (Editorial). Layout + copy from docs/redesign-handoff/site/contact.dc.html.
// Form logic carried over from the pre-redesign page: POSTs FormData to /api/contact with
// name / email / message / subscribe / source (page URL + referrer + UTMs). /api/contact only
// accepts those fields, so the prototype's Company + "reaching out about" fields are appended
// to the message body rather than sent as new keys. Hydrated with client:load (see contact.astro).
import { useState, useEffect } from 'react';
import type { CSSProperties, ChangeEvent, FormEvent, ReactNode } from 'react';
import { Eyebrow, Btn, CheckIcon } from '~/components/rd/atoms';

const LH: CSSProperties = { lineHeight: 1.65 };

const TOPICS = ['General question', 'Partnerships', 'Press', 'Careers'] as const;

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
  subscribe: boolean;
}

const DETAILS: Array<{ label: string; value: ReactNode }> = [
  { label: 'Email', value: <a href="mailto:contact@alloygp.co" className="rd-ink" style={{ textDecoration: 'none' }}>contact@alloygp.co</a> },
  { label: 'Phone', value: <a href="tel:+12108455989" className="rd-ink" style={{ textDecoration: 'none' }}>210-845-5989</a> },
  { label: 'Office', value: 'Austin, TX · Serving CAM nationwide' },
  { label: 'Credentials', value: 'BBB Accredited · CAI Member' },
];

const detailLabel: CSSProperties = { fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--alloy-body-gray)', paddingTop: 3 };
const fieldLabel: CSSProperties = { fontSize: 11, letterSpacing: '.1em' };
const fieldGroup: CSSProperties = { gap: 6 };
const span2: CSSProperties = { gridColumn: '1 / -1' };

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ContactFormState>({ name: '', email: '', company: '', topic: TOPICS[0], message: '', subscribe: false });
  const [sourceData, setSourceData] = useState('');

  // Attribution: page URL, referrer, and UTMs travel with every submission (unchanged).
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

  const update = <K extends keyof ContactFormState>(k: K, v: ContactFormState[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Only decorate a non-empty message, so /api/contact's "message required" check still applies.
    const extra = [`Reaching out about: ${form.topic}`, form.company.trim() ? `Company: ${form.company.trim()}` : null]
      .filter(Boolean)
      .join('\n');
    const message = form.message.trim() ? `${form.message}\n\n—\n${extra}` : form.message;

    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('email', form.email);
    fd.append('message', message);
    fd.append('subscribe', form.subscribe ? 'true' : 'false');
    fd.append('source', sourceData);

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: fd });
      let json: Record<string, string> = {};
      try { json = await res.json(); } catch { /* non-JSON body */ }
      if (!res.ok) {
        setError(json.error ?? `Server error (${res.status}). Please try again.`);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError(`Network error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rd-page">
      <section className="rd-section rd-section--hero">
        <div className="rd-wrap rd-grid rd-grid--2 rd-gap-80" style={{ alignItems: 'start' }}>
          {/* Left: intro + details */}
          <div className="rd-stack rd-stack--40">
            <div className="rd-stack" style={{ gap: 28 }}>
              <Eyebrow>Contact</Eyebrow>
              <h1 className="rd-h1 rd-h1--lg">Talk to an <span className="rd-accent">operator.</span></h1>
              <p className="rd-intro" style={LH}>General questions, partnerships, press, and careers. If you’re a CAM owner wondering whether your metro is open, the Strategic Review is the faster path.</p>
            </div>
            <div className="rd-stack rd-rule-top" style={{ gap: 22, paddingTop: 32 }}>
              {DETAILS.map((d) => (
                <div key={d.label} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, fontSize: 15 }}>
                  <span style={detailLabel}>{d.label}</span>
                  <span className="rd-ink rd-w-500">{d.value}</span>
                </div>
              ))}
            </div>
            <div className="rd-row rd-row--between rd-row--wrap" style={{ background: 'var(--alloy-off-white)', borderRadius: 10, padding: '22px 24px', gap: 16 }}>
              <div className="rd-ink rd-w-500" style={{ fontSize: 14, lineHeight: 1.5 }}>CAM owner? Skip the form.</div>
              <Btn href="/get-started" size="sm" className="rd-btn--inline" style={{ padding: '12px 18px' }}>Claim your market</Btn>
            </div>
          </div>

          {/* Right: form card */}
          <div className="rd-card rd-card--off contact-form-card rd-stack" style={{ padding: 36, gap: 22 }}>
            {submitted ? (
              <div className="rd-stack rd-center" style={{ gap: 14, alignItems: 'center', padding: '24px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--alloy-green-tint)', display: 'grid', placeItems: 'center' }}>
                  <CheckIcon size={30} color="#2c6a62" />
                </div>
                <h2 className="rd-title-26" style={{ fontSize: 24, lineHeight: 1.15 }}>Got it. We&apos;ll be in touch within one business day.</h2>
                <p className="rd-small" style={LH}>Thanks for reaching out. We typically respond within 1 business day.</p>
              </div>
            ) : (
              <>
                <h2 className="rd-title-26" style={{ fontSize: 24, lineHeight: 1.15 }}>Send a message</h2>

                {error ? (
                  <div role="alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 14px', color: '#b91c1c', fontSize: 14 }}>
                    {error}
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="rd-stack" style={{ gap: 22 }}>
                  <div className="rd-grid rd-grid--2" style={{ gap: 16 }}>
                    <label className="rd-field-group" style={{ ...fieldGroup, ...span2 }}>
                      <span className="rd-field-label" style={fieldLabel}>Name</span>
                      <input className="rd-field" type="text" name="name" autoComplete="name" placeholder="Your name" required
                        value={form.name} onChange={(e: ChangeEvent<HTMLInputElement>) => update('name', e.target.value)} />
                    </label>
                    <label className="rd-field-group" style={{ ...fieldGroup, ...span2 }}>
                      <span className="rd-field-label" style={fieldLabel}>Email</span>
                      <input className="rd-field" type="email" name="email" autoComplete="email" placeholder="you@company.com" required
                        value={form.email} onChange={(e: ChangeEvent<HTMLInputElement>) => update('email', e.target.value)} />
                    </label>
                    <label className="rd-field-group" style={fieldGroup}>
                      <span className="rd-field-label" style={fieldLabel}>Company</span>
                      <input className="rd-field" type="text" name="company" autoComplete="organization" placeholder="Optional"
                        value={form.company} onChange={(e: ChangeEvent<HTMLInputElement>) => update('company', e.target.value)} />
                    </label>
                    <label className="rd-field-group" style={fieldGroup}>
                      <span className="rd-field-label" style={fieldLabel}>I’m reaching out about</span>
                      <select className="rd-field" name="topic"
                        value={form.topic} onChange={(e: ChangeEvent<HTMLSelectElement>) => update('topic', e.target.value)}>
                        {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </label>
                    <label className="rd-field-group" style={{ ...fieldGroup, ...span2 }}>
                      <span className="rd-field-label" style={fieldLabel}>Message</span>
                      <textarea className="rd-field" name="message" placeholder="How can we help?" required rows={4}
                        value={form.message} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => update('message', e.target.value)} />
                    </label>
                    <label style={{ ...span2, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <input type="checkbox" name="subscribe" checked={form.subscribe}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => update('subscribe', e.target.checked)}
                        style={{ width: 16, height: 16, accentColor: 'var(--alloy-purple)' }} />
                      <span className="rd-tiny">Keep me in the loop with Alloy&apos;s growth insights</span>
                    </label>
                  </div>

                  <button type="submit" className="rd-btn rd-btn--dark rd-btn--block" style={{ padding: '18px 28px' }} disabled={loading} aria-busy={loading}>
                    {loading ? 'Sending…' : 'Send'}
                  </button>
                  <div className="rd-tiny rd-tiny--12 rd-center">We reply within one business day.</div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
