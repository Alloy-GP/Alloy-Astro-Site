// src/components/modules/NewsletterSignup.tsx
// "The Alloy briefing" signup form on /resources. Small island (client:idle).
// Posts FormData to the existing /api/subscribe route (Mailchimp + Resend
// welcome email) — same `email` field name, same fetch/JSON error handling
// pattern as ContactPage.
import { useState } from 'react';
import type { FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const fd = new FormData();
    fd.append('email', email.trim());

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
      <div role="status" className="rd-title-18" style={{ color: 'var(--engine-retain)' }}>
        You’re on the list — welcome to Alloy.
      </div>
    );
  }

  const loading = status === 'loading';

  return (
    <form onSubmit={handleSubmit} className="rd-stack" style={{ gap: 8 }}>
      <div className="rd-row rd-row--wrap" style={{ gap: 10 }}>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Work email"
          aria-label="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rd-field"
          style={{ flex: '1 1 240px', width: 'auto', minWidth: 240, background: 'var(--alloy-off-white)', padding: '13px 16px', fontSize: 14 }}
        />
        <button
          type="submit"
          className="rd-btn rd-btn--dark rd-btn--sm rd-btn--inline"
          disabled={loading}
          style={{ padding: '13px 20px', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && error ? (
        <div role="alert" className="rd-tiny" style={{ color: 'var(--alloy-pink)' }}>{error}</div>
      ) : null}
    </form>
  );
}
