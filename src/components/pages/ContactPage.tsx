// src/components/pages/ContactPage.tsx
import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import { PURPLE, PINK, YELLOW } from '~/lib/tokens';

interface ContactFormState { name: string; email: string; message: string; subscribe: boolean; }
interface LeadFormState { name: string; email: string; company: string; units: string; goal: string; }
interface Props { variant?: 'contact' | 'lead'; }

export default function ContactPage({ variant = 'lead' }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [contactForm, setContactForm] = useState<ContactFormState>({ name: '', email: '', message: '', subscribe: false });
  const [leadForm, setLeadForm] = useState<LeadFormState>({ name: '', email: '', company: '', units: '', goal: '' });
  const [sourceData, setSourceData] = useState('');

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

  const updateContact = (k: keyof ContactFormState, v: string | boolean) =>
    setContactForm(f => ({ ...f, [k]: v }));
  const updateLead = (k: keyof LeadFormState, v: string) =>
    setLeadForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const fd = new FormData();
    const endpoint = variant === 'contact' ? '/api/contact' : '/api/lead';

    if (variant === 'contact') {
      fd.append('name', contactForm.name);
      fd.append('email', contactForm.email);
      fd.append('message', contactForm.message);
      fd.append('subscribe', contactForm.subscribe ? 'true' : 'false');
    } else {
      fd.append('name', leadForm.name);
      fd.append('email', leadForm.email);
      fd.append('company', leadForm.company);
      fd.append('units', leadForm.units);
      fd.append('goal', leadForm.goal);
    }
    fd.append('source', sourceData);

    try {
      const res = await fetch(endpoint, { method: 'POST', body: fd });
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

  const isContact = variant === 'contact';

  return (
    <section style={{ background: PURPLE, minHeight: 'calc(100vh - 80px)', color: '#fff', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle gradient — pulled WAY back so the field reads as deep purple, not pink-washed. */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 92% 8%, rgba(217,53,110,0.14) 0%, transparent 38%), radial-gradient(circle at 8% 95%, rgba(245,216,128,0.05) 0%, transparent 45%)' }}></div>

      <div className="container" style={{ position: 'relative', maxWidth: 1080, margin: '0 auto' }}>

        {/* Title block — centered above the form */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
          <Eyebrow onDark noLine>{isContact ? 'Get In Touch' : 'Claim Your Market'}</Eyebrow>
          <h1 className="display-xl" style={{ margin: '16px 0 20px', color: '#fff' }}>
            {isContact ? (
              <>Let's talk.<br /><span style={{ color: YELLOW }}>Real humans, real replies.</span></>
            ) : (
              <>30 minutes. No pitch.<br /><span style={{ color: YELLOW }}>Just diagnostic clarity.</span></>
            )}
          </h1>
          <p className="lead on-dark" style={{ margin: 0 }}>
            {isContact
              ? "Have a question or just want to connect? Send us a message and we'll get back to you within one business day."
              : "Tell us about your CAM firm. We'll confirm whether your metro is open and book a 30-minute diagnostic — where the leaks are, which engine to fix first, and what the next 18 months could look like."
            }
          </p>
        </div>

        {/* Form card — centered, single column */}
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div className="contact-form-card" style={{ background: '#fff', borderRadius: 16, padding: 40, color: PURPLE, boxShadow: '0 24px 60px rgba(0,0,0,0.18)' }}>
            {submitted ? (
              <div className="reveal" style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: 80, height: 80, borderRadius: 999, background: 'var(--alloy-green-tint)', color: '#2c6a62', margin: '0 auto 20px', display: 'grid', placeItems: 'center' }}>
                  <Icon name="check" size={40} strokeWidth={2.5} />
                </div>
                <h2 className="display-md" style={{ color: PURPLE, margin: '0 0 12px' }}>
                  Got it. We'll be in touch within one business day.
                </h2>
                <p style={{ color: '#555', lineHeight: 1.6 }}>
                  {isContact
                    ? "Thanks for reaching out. We typically respond within 1 business day."
                    : "If your market is still open, we'll send a calendar link for the 30-minute diagnostic. If it's already claimed, we'll add you to the waitlist and let you know if it opens."
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="display-md" style={{ color: PURPLE, fontSize: 24, marginBottom: 6 }}>
                  {isContact ? 'Send us a message' : 'Tell us about your firm'}
                </div>
                <p style={{ color: '#888', fontSize: 14, marginBottom: 28 }}>
                  {isContact
                    ? 'Real human reply within one business day.'
                    : '30 seconds. Five fields. Real human reply within one business day.'
                  }
                </p>

                {error && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 14px', color: '#b91c1c', fontSize: 14, marginBottom: 16 }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
                  {isContact ? (
                    <>
                      <div className="contact-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Field label="Your name" value={contactForm.name} onChange={v => updateContact('name', v)} required />
                        <Field label="Work email" type="email" value={contactForm.email} onChange={v => updateContact('email', v)} required />
                      </div>
                      <Field label="Message" value={contactForm.message} onChange={v => updateContact('message', v)} required multiline placeholder="What's on your mind?" />
                      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={contactForm.subscribe}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateContact('subscribe', e.target.checked)}
                          style={{ width: 16, height: 16, accentColor: PURPLE }}
                        />
                        <span style={{ fontSize: 13, color: '#555' }}>Keep me in the loop with Alloy's growth insights</span>
                      </label>
                    </>
                  ) : (
                    <>
                      <div className="contact-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Field label="Your name" value={leadForm.name} onChange={v => updateLead('name', v)} required />
                        <Field label="Work email" type="email" value={leadForm.email} onChange={v => updateLead('email', v)} required />
                      </div>
                      <div className="contact-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Field label="CAM company" value={leadForm.company} onChange={v => updateLead('company', v)} required />
                        <Field label="Associations under management" value={leadForm.units} placeholder="e.g. 120" onChange={v => updateLead('units', v)} />
                      </div>
                      <Field label="Primary growth goal" value={leadForm.goal} onChange={v => updateLead('goal', v)} multiline placeholder="One sentence is fine." />
                    </>
                  )}

                  <div className="contact-form-submit" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, gap: 16, flexWrap: 'wrap' }}>
                    <div className="contact-form-disclaimer" style={{ fontSize: 12, color: '#888', maxWidth: '60%' }}>By submitting, you agree to a real conversation. We won't spam you.</div>
                    <Button variant="primary" arrow type="submit">
                      {loading ? 'Sending…' : isContact ? 'Send message' : 'Request my diagnostic'}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Contact info — full-width row beneath the form */}
        <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { icon: 'phone',    label: 'Direct', value: '210-845-5989' },
              { icon: 'mail',     label: 'Email',  value: 'contact@alloygp.co' },
              { icon: 'map-pin',  label: 'HQ',     value: 'Austin, TX · Nationwide' },
              { icon: 'calendar', label: 'Hours',  value: 'Mon–Fri · 8a–6p CT' },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center', flex: '0 0 40px' }}>
                  <Icon name={c.icon} size={18} color="#fff" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: YELLOW }}>{c.label}</div>
                  <div style={{ fontSize: 15, color: '#fff', fontWeight: 500 }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
}
export function Field({ label, value, onChange, type = 'text', required, placeholder, multiline }: FieldProps) {
  const sharedStyle: React.CSSProperties = {
    padding: '12px 14px', borderRadius: 8, border: '1px solid var(--border-strong)',
    fontSize: 15, fontFamily: 'var(--font-body)', color: PURPLE, outline: 'none',
    background: '#fff', resize: multiline ? 'vertical' : 'none',
  };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: PURPLE }}>
        {label}{required && <span style={{ color: PINK, marginLeft: 4 }}>*</span>}
      </span>
      {multiline ? (
        <textarea
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          rows={3}
          style={sharedStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          style={sharedStyle}
        />
      )}
    </label>
  );
}
