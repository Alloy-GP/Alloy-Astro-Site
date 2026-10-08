// src/components/modules/BookClubForm.tsx — HOA Leader Book Club seats form (client:load island inside
// BookClubPage's hero card, /book-club). POSTs FormData to /api/book-club: name / email / company / cell /
// team (one entry per leader) / source (page URL + referrer + UTMs, same shape as /contact).
// id / name / action / method are what WhatConverts keys on (Tracking › Web Forms, Attribute Type "ID" →
// ge-book-club). Same id as the worksheet's form on /cai-growth, so one registration covers both pages.
import { useState, useEffect } from 'react';
import type { CSSProperties, ChangeEvent, FormEvent } from 'react';
import { Btn, CheckIcon } from '~/components/rd/atoms';

const CALENDAR_URL = 'https://calendar.app.google/ssQ22vSCJC38Cy8QA';
const CONTACT_EMAIL = 'cameron@alloygp.co';
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_SEATS = 10;

const LH: CSSProperties = { lineHeight: 1.65 };
const fieldLabel: CSSProperties = { fontSize: 11, letterSpacing: '.1em' };
const fieldGroup: CSSProperties = { gap: 6 };
const span2: CSSProperties = { gridColumn: '1 / -1' };
const optionalTag: CSSProperties = { fontWeight: 500, letterSpacing: 0, textTransform: 'none', color: 'var(--alloy-body-gray)', marginLeft: 6 };

export default function BookClubForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [cell, setCell] = useState('');
  const [team, setTeam] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');
  const [offline, setOffline] = useState(false); // request never reached the server → offer the email fallback
  const [source, setSource] = useState('');

  // Attribution travels with every submission (unchanged pattern from the Contact form).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const utms = utmKeys.filter((k) => params.get(k)).map((k) => `${k}=${params.get(k)}`).join(' | ');
    setSource([
      'Form: HOA Leader Book Club (Book club landing page)',
      `Page: ${window.location.href}`,
      document.referrer ? `Referrer: ${document.referrer}` : 'Referrer: direct',
      utms ? `UTMs: ${utms}` : null,
    ].filter(Boolean).join('\n'));
  }, []);

  const seats = () => team.map((t) => t.trim()).filter(Boolean);
  const seatCount = seats().length;

  const mailtoHref = () => {
    const lines = [
      'HOA Leader Book Club request', '',
      `Name: ${name}`, `Email: ${email}`, `Company: ${company}`, `Cell: ${cell || 'not given'}`,
      `Also seat: ${seatCount ? seats().join(', ') : 'none yet'}`,
    ];
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('HOA Leader Book Club')}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const problems: string[] = [];
    if (!name.trim()) problems.push('your name');
    if (!EMAIL_RE.test(email.trim())) problems.push('a working email');
    if (!company.trim()) problems.push('your company');
    const bad = seats().filter((t) => !EMAIL_RE.test(t));
    if (bad.length) problems.push(`a working email for ${bad.join(', ')}`);
    if (problems.length) { setOffline(false); setError(`Still need ${problems.join(', ')}.`); return; }

    setError(''); setOffline(false); setStatus('loading');
    const fd = new FormData();
    fd.append('name', name.trim());
    fd.append('email', email.trim());
    fd.append('company', company.trim());
    fd.append('cell', cell.trim());
    seats().forEach((t) => fd.append('team', t));
    fd.append('source', source);
    try {
      const res = await fetch('/api/book-club', { method: 'POST', body: fd });
      let json: { error?: unknown } = {};
      try { json = await res.json(); } catch { /* non-JSON body */ }
      if (!res.ok) {
        setStatus('idle');
        setError(typeof json.error === 'string' ? json.error : `Server error (${res.status}). Please try again.`);
        return;
      }
      setStatus('done');
    } catch {
      setStatus('idle'); setOffline(true);
      setError('That did not go through. Try again, or send your details by email and every seat is still yours.');
    }
  };

  if (status === 'done') {
    const seatLine = seatCount ? ` and to the ${seatCount} leader${seatCount === 1 ? '' : 's'} you added` : '';
    return (
      <div className="rd-stack rd-center" style={{ gap: 14, alignItems: 'center', padding: '24px 0' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--alloy-green-tint)', display: 'grid', placeItems: 'center' }}>
          <CheckIcon size={30} color="#2c6a62" />
        </div>
        <h2 className="rd-title-26" style={{ fontSize: 24, lineHeight: 1.15 }}>You are in.</h2>
        <p className="rd-small" style={LH}>Cameron will email the details to {email.trim()}{seatLine}.</p>
        <Btn href={CALENDAR_URL} variant="dark" size="sm">Book 20 minutes while you are here</Btn>
      </div>
    );
  }

  const loading = status === 'loading';
  return (
    <>
      <div className="rd-stack" style={{ gap: 8 }}>
        <h2 className="rd-title-26" style={{ fontSize: 24, lineHeight: 1.15 }}>Save your seats</h2>
        <p className="rd-small" style={LH}>Your seat is included. So are seats for the senior leaders you are developing.</p>
      </div>

      {error ? (
        <div role="alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 14px', color: '#b91c1c', fontSize: 14, lineHeight: 1.5 }}>
          {error}
          {offline ? <> <a href={mailtoHref()} style={{ color: 'inherit', fontWeight: 700 }}>Open in email</a>.</> : null}
        </div>
      ) : null}

      <form id="ge-book-club" name="hoa-leader-book-club" action="/api/book-club" method="post" onSubmit={handleSubmit} className="rd-stack" style={{ gap: 22 }} noValidate>
        <div className="rd-grid rd-grid--2 rd-form-grid" style={{ gap: 16 }}>
          <label className="rd-field-group" style={{ ...fieldGroup, ...span2 }}>
            <span className="rd-field-label" style={fieldLabel}>Name</span>
            <input className="rd-field" type="text" name="name" autoComplete="name" placeholder="First and last" required
              value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
          </label>
          <label className="rd-field-group" style={{ ...fieldGroup, ...span2 }}>
            <span className="rd-field-label" style={fieldLabel}>Email</span>
            <input className="rd-field" type="email" name="email" autoComplete="email" placeholder="you@company.com" required
              value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
          </label>
          <label className="rd-field-group" style={fieldGroup}>
            <span className="rd-field-label" style={fieldLabel}>Company</span>
            <input className="rd-field" type="text" name="company" autoComplete="organization" placeholder="Company" required
              value={company} onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)} />
          </label>
          <label className="rd-field-group" style={fieldGroup}>
            <span className="rd-field-label" style={fieldLabel}>Cell<span style={optionalTag}>optional</span></span>
            <input className="rd-field" type="tel" name="cell" autoComplete="tel" placeholder="(210) 555-0148"
              value={cell} onChange={(e: ChangeEvent<HTMLInputElement>) => setCell(e.target.value)} />
          </label>

          {/* Included seats for senior leaders: one email per row */}
          <div className="rd-stack" style={{ ...span2, gap: 10 }}>
            <span className="rd-field-label" style={fieldLabel}>Senior leaders to seat<span style={optionalTag}>included</span></span>
            {team.map((t, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
                <input className="rd-field" type="email" name="team" placeholder="leader@yourcompany.com" aria-label={`Leader ${i + 1} email`}
                  value={t} onChange={(e: ChangeEvent<HTMLInputElement>) => setTeam((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))} />
                <button type="button" className="rd-btn rd-btn--outline rd-btn--sm rd-btn--inline" aria-label={`Remove leader ${i + 1}`}
                  onClick={() => setTeam((prev) => prev.filter((_, j) => j !== i))}>Remove</button>
              </div>
            ))}
            <div>
              <button type="button" className="rd-btn rd-btn--outline rd-btn--sm rd-btn--inline" disabled={team.length >= MAX_SEATS}
                onClick={() => setTeam((prev) => [...prev, ''])}>
                {team.length ? '+ Add another leader' : '+ Add a senior leader'}
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="rd-btn rd-btn--dark rd-btn--block" style={{ padding: '18px 28px' }} disabled={loading} aria-busy={loading}>
          {loading ? 'Saving…' : 'Save our seats'}
        </button>
        <div className="rd-tiny rd-tiny--12 rd-center">Cameron emails the details to you and every leader you add.</div>
      </form>
    </>
  );
}
