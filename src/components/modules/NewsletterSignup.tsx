// src/components/modules/NewsletterSignup.tsx
// "The Alloy Briefing" newsletter form on /resources (client:idle island).
// Posts FormData to /api/subscribe → Mailchimp audience (FNAME merge field, tags
// ["newsletter", source]) + Resend welcome email. Inline success / error states.
import { useState } from 'react';
import type { FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterSignup({ source = 'resources-page' }: { source?: string }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setError('');
    const fd = new FormData();
    fd.append('email', email.trim());
    fd.append('firstName', firstName.trim());
    fd.append('source', source);
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', body: fd });
      let json: Record<string, string> = {};
      try { json = await res.json(); } catch { /* non-JSON body */ }
      if (!res.ok) {
        setError(json.error ?? `Server error (${res.status}). Please try again.`);
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch (err) {
      setError(`Network error: ${err instanceof Error ? err.message : String(err)}`);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="rd-nl-success">
        <span className="rd-nl-success-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </span>
        <div>
          <div className="rd-title-18">You’re in{firstName.trim() ? `, ${firstName.trim()}` : ''}.</div>
          <p className="rd-small rd-small--14">A welcome note is on its way. The next Briefing lands on a Tuesday.</p>
        </div>
      </div>
    );
  }

  const loading = status === 'loading';

  return (
    <form onSubmit={handleSubmit} className="rd-stack rd-stack--14" noValidate={false}>
      <div className="rd-field-group">
        <label className="rd-field-label" htmlFor="nl-first">First name</label>
        <input id="nl-first" type="text" name="firstName" autoComplete="given-name" placeholder="Your first name" className="rd-field" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className="rd-field-group">
        <label className="rd-field-label" htmlFor="nl-email">Work email</label>
        <input id="nl-email" type="email" name="email" required autoComplete="email" placeholder="you@yourfirm.com" className="rd-field" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit" className="rd-btn rd-btn--block" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
        {loading ? 'Subscribing…' : 'Send me the Briefing'}
      </button>
      {status === 'error' && error ? <div role="alert" className="rd-tiny" style={{ color: 'var(--alloy-pink)' }}>{error}</div> : null}
      <p className="rd-tiny rd-tiny--12 rd-center" style={{ color: 'var(--fg-muted)' }}>Every other Tuesday. Unsubscribe in one click. We never share your email.</p>
    </form>
  );
}
