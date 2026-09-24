// src/components/modules/WebinarSignup.tsx
// Homepage "Save my seat" email capture (React island). Posts to the existing /api/subscribe.
import { useState } from 'react';

export default function WebinarSignup() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state === 'sending') return;
    setState('sending');
    try {
      const fd = new FormData();
      fd.set('email', email);
      const r = await fetch('/api/subscribe', { method: 'POST', body: fd });
      const d = await r.json().catch(() => ({}));
      if (r.ok) { setState('done'); setMsg('You’re registered. The recording goes to this inbox.'); }
      else { setState('error'); setMsg(d.error ?? 'Could not register. Please try again.'); }
    } catch {
      setState('error'); setMsg('Could not register. Please try again.');
    }
  };

  if (state === 'done') return <div className="rd-small rd-w-500 rd-ink" role="status">{msg}</div>;

  return (
    <form className="rd-webinar-form" onSubmit={submit}>
      <input type="email" required className="rd-field" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Work email" autoComplete="email" />
      <button type="submit" className="rd-btn rd-btn--sm rd-btn--inline" disabled={state === 'sending'} style={{ padding: '13px 20px' }}>{state === 'sending' ? 'Saving…' : 'Save my seat'}</button>
      {state === 'error' && <div className="rd-tiny" role="alert" style={{ color: 'var(--alloy-pink)' }}>{msg}</div>}
    </form>
  );
}
