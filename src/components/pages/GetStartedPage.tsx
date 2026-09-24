// src/components/pages/GetStartedPage.tsx
// Alloy — Get Started / Claim Your Market
// Diagnostic intake: not a generic contact form. The page itself does work —
// it shows operators which engine is leaking before the call happens.

import React, { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import AccentBar from '~/components/AccentBar';
import Eyebrow from '~/components/Eyebrow';
import Icon from '~/components/Icon';
import { CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

// ─── Client locations (from GBP export, May 2026) ────────────────────────────
// One entry per distinct metro. Duplicates and suspended profiles included
// where the market is still effectively held.
const CLIENT_LOCATIONS = [
  { metro: 'Baltimore/Owings Mills, MD', lat: 39.4198, lng: -76.7775 },
  { metro: 'Lewes, DE',                  lat: 38.7737, lng: -75.1396 },
  { metro: 'San Antonio, TX',            lat: 29.6195, lng: -98.4896 },
  { metro: 'League City, TX',            lat: 29.5074, lng: -95.0949 },
  { metro: 'Houston, TX',                lat: 29.7414, lng: -95.3970 },
  { metro: 'Austin, TX',                 lat: 30.2672, lng: -97.7431 },
  { metro: 'The Woodlands, TX',          lat: 30.1658, lng: -95.4613 },
  { metro: 'Fredericksburg, VA',         lat: 38.3032, lng: -77.4605 },
  { metro: 'Venice, FL',                 lat: 27.0506, lng: -82.3932 },
  { metro: 'Lafayette/Carencro, LA',     lat: 30.3188, lng: -92.0490 },
  { metro: 'Denham Springs, LA',         lat: 30.4877, lng: -90.9590 },
  { metro: 'Shreveport, LA',             lat: 32.5252, lng: -93.7502 },
  { metro: 'Biloxi, MS',                 lat: 30.3960, lng: -88.8853 },
  { metro: 'Daphne/Mobile, AL',          lat: 30.6035, lng: -87.9036 },
  { metro: 'Manchester, NH',             lat: 42.9956, lng: -71.4548 },
  { metro: 'Orlando, FL',                lat: 28.5488, lng: -81.3640 },
  { metro: 'New Haven, CT',              lat: 41.3083, lng: -72.9279 },
];

// Haversine distance in miles between two lat/lng points
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── Market check card ────────────────────────────────────────────────────────
type CheckStatus = 'idle' | 'loading' | 'claimed' | 'available' | 'error';

function MarketCheckCard() {
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState<CheckStatus>('idle');
  const [cityLabel, setCityLabel] = useState('');

  const checkMarket = async () => {
    if (zip.length !== 5) return;
    setStatus('loading');
    setCityLabel('');
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!res.ok) { setStatus('error'); return; }
      const data = await res.json() as { places?: Array<{ latitude: string; longitude: string; 'place name': string; 'state abbreviation': string }> };
      const place = data.places?.[0];
      if (!place) { setStatus('error'); return; }
      const userLat = parseFloat(place.latitude);
      const userLng = parseFloat(place.longitude);
      setCityLabel(`${place['place name']}, ${place['state abbreviation']}`);
      const isClaimed = CLIENT_LOCATIONS.some(c => haversine(userLat, userLng, c.lat, c.lng) <= 30);
      setStatus(isClaimed ? 'claimed' : 'available');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 30px 80px rgba(0,0,0,0.20), 0 6px 16px rgba(0,0,0,0.10)', border: `1px solid ${BLUE}30` }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: PINK, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Step 0 · Market check</div>
      <div className="display-md" style={{ fontSize: 24, color: PURPLE, marginBottom: 6, lineHeight: 1.15 }}>Is your market still open?</div>
      <p style={{ fontSize: 13, color: '#666', marginBottom: 18, lineHeight: 1.55 }}>One CAM company per metro. Enter your ZIP — we check against our active client footprint.</p>
      <div className="gs-zip-row" style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => { setZip(e.target.value.replace(/\D/g, '')); setStatus('idle'); }}
          onKeyDown={(e) => e.key === 'Enter' && checkMarket()}
          placeholder="78701"
          className="gs-zip-input"
          style={{ flex: 1, padding: '14px 16px', borderRadius: 8, border: '1.5px solid #e2e2e2', fontSize: 16, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' } as CSSProperties}
        />
        <button
          onClick={checkMarket}
          disabled={zip.length !== 5 || status === 'loading'}
          className="gs-zip-btn"
          style={{ padding: '0 22px', background: zip.length === 5 ? PURPLE : '#ddd', color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, cursor: zip.length === 5 ? 'pointer' : 'not-allowed', letterSpacing: '0.02em', minWidth: 80 } as CSSProperties}
        >{status === 'loading' ? '…' : 'Check'}</button>
      </div>
      {status === 'claimed' && (
        <div style={{ background: `${PINK}10`, borderLeft: `3px solid ${PINK}`, padding: '14px 16px', borderRadius: 4 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: PINK, marginBottom: 4 }}>
            {cityLabel ? `${cityLabel} is claimed.` : 'This market is claimed.'}
          </div>
          <div style={{ fontSize: 12, color: '#444', lineHeight: 1.5 }}>
            {"We're already working with a CAM firm within 30 miles of this ZIP. Submit anyway — we maintain a waitlist as engagements rotate."}
          </div>
        </div>
      )}
      {status === 'available' && (
        <div style={{ background: `${GREEN}30`, borderLeft: `3px solid #1a8c4a`, padding: '14px 16px', borderRadius: 4 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: '#1a6b3a', marginBottom: 4 }}>
            {cityLabel ? `${cityLabel} is available.` : 'This market is available.'}
          </div>
          <div style={{ fontSize: 12, color: '#444', lineHeight: 1.5 }}>
            {"No Alloy client holds exclusivity within 30 miles of this ZIP. The Strategic Review will lock your spot for 30 days while we diagnose."}
          </div>
        </div>
      )}
      {status === 'error' && (
        <div style={{ background: '#fff8e1', borderLeft: `3px solid ${YELLOW}`, padding: '14px 16px', borderRadius: 4 }}>
          <div style={{ fontSize: 12, color: '#555', lineHeight: 1.5 }}>
            {"We couldn't look up that ZIP. Double-check the number, or skip this step and submit the form — we'll verify your market manually."}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Form field ───────────────────────────────────────────────────────────────
interface FormFieldProps { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; }
function FormField({ label, value, onChange, placeholder, type = 'text' }: FormFieldProps) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#888', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1.5px solid #e2e2e2', fontSize: 15, fontFamily: 'var(--font-body)', boxSizing: 'border-box' } as CSSProperties}
      />
    </label>
  );
}

// ─── FAQ accordion ────────────────────────────────────────────────────────────
interface FAQItemProps { q: string; a: string; bordered: boolean; accent: string; }
function FAQItem({ q, a, accent }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 } as CSSProperties}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: PURPLE, lineHeight: 1.35 }}>{q}</span>
        <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: 999, background: open ? accent : 'var(--alloy-light-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
          <Icon name={open ? 'arrow-down' : 'plus'} size={14} color={open ? '#fff' : PURPLE} strokeWidth={2.5} />
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: 22, fontSize: 15, color: '#444', lineHeight: 1.7, paddingRight: 40 }}>{a}</div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GetStartedPage() {
  const [size, setSize] = useState('');
  const [stage, setStage] = useState('');
  const [problem, setProblem] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  const sizes = [
    { v: 'starter',    label: 'Under 1,500 doors',    sub: 'Solo PM or small team' },
    { v: 'growth',     label: '1,500 – 5,000 doors',  sub: 'Established mid-market' },
    { v: 'scale',      label: '5,000 – 15,000 doors', sub: 'Multi-market operator' },
    { v: 'enterprise', label: '15,000+ doors',         sub: 'Regional / national' },
  ];

  const stages = [
    { v: 'no-marketing', label: 'No marketing function',     d: 'Word-of-mouth + a website. Manager-driven sales.' },
    { v: 'scattered',    label: 'Scattered marketing spend', d: 'Some SEO, some content, no system. Tactics, not strategy.' },
    { v: 'in-house',     label: 'In-house marketing person', d: 'One marketer wearing 9 hats. Drowning in execution.' },
    { v: 'agency',       label: 'Generic agency',            d: "Working with a non-CAM agency. Speed and fluency gaps." },
    { v: 'considering',  label: 'Considering a switch',      d: "Have a marketing motion but it's not compounding." },
  ];

  const problems = [
    { v: 'leads',       label: 'Not enough qualified board leads',          pillar: 'BoardReach' },
    { v: 'visibility',  label: 'Invisible in search & AI search',           pillar: 'BoardReach' },
    { v: 'rfps',        label: 'Losing too many RFPs',                      pillar: 'BoardMatch' },
    { v: 'messaging',   label: "Pitch and proposals don't differentiate",   pillar: 'BoardMatch' },
    { v: 'churn',       label: 'Boards leaving for competitors',            pillar: 'BoardRetain' },
    { v: 'education',   label: 'Boards undertrained, calls take forever',   pillar: 'BoardRetain' },
    { v: 'brand',       label: 'Brand and website feel outdated',           pillar: 'Foundation' },
    { v: 'growth-plan', label: 'No clear 24-month growth plan',             pillar: 'All three' },
  ];

  const togProblem = (v: string) =>
    setProblem(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  const readout = (() => {
    const tags = problem.map(v => problems.find(p => p.v === v)?.pillar).filter(Boolean) as string[];
    const counts = tags.reduce<Record<string, number>>((a, t) => { a[t] = (a[t] ?? 0) + 1; return a; }, {});
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (!top) return null;
    if (top[0] === 'BoardReach')  return { color: PINK,   h: 'Your bottleneck is Attract.', d: "Boards aren't finding you — or aren't finding enough of you. Strategic Review will start with the local pack, AI search citation rate, and demand-gen funnel." };
    if (top[0] === 'BoardMatch')  return { color: YELLOW, h: 'Your bottleneck is Close.',   d: "Boards are talking to you, but they aren't picking you. Review will dig into proposal quality, sales messaging, and BD process velocity." };
    if (top[0] === 'BoardRetain') return { color: GREEN,  h: 'Your bottleneck is Keep.',    d: "Acquisition isn't your problem — retention is. Review will diagnose board education, satisfaction signals, and renewal-window behavior." };
    if (top[0] === 'Foundation')  return { color: BLUE,   h: 'Your foundation needs work.', d: "Brand, website, or print system are working against you before any campaign starts. Review will start there." };
    return { color: PURPLE, h: 'Your growth plan needs all three engines.', d: 'Mixed signals across attract, close, and keep — most operators in your stage. Review will sequence which engine to fix first.' };
  })();

  const submitDisabled = !size || !stage || problem.length === 0 || !name || !company || !email;

  const handleSubmit = async () => {
    if (submitDisabled) return;
    setLoading(true);
    setError('');
    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('company', company);
    fd.append('phone', phone);
    fd.append('units', size);
    fd.append('goal', `Stage: ${stage} | Problems: ${problem.join(', ')}`);
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
      <section style={{ background: PURPLE, minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '80px 0' }}>
        <div style={{ textAlign: 'center', maxWidth: 600 }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Icon name="check" size={28} color={PURPLE} strokeWidth={2.5} />
          </div>
          <h1 className="display-xl" style={{ color: '#fff', margin: '0 0 16px' }}>You're in the queue.</h1>
          <p className="lead on-dark" style={{ margin: '0 auto', maxWidth: 480 }}>We'll confirm market availability and send a calendar link within one business day.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative', paddingTop: 88, paddingBottom: 72 } as CSSProperties}>
          <div className="gs-hero-grid" style={{ display: 'grid', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: PINK, boxShadow: `0 0 0 4px ${PINK}30` }}></span>
                <Eyebrow onDark noLine>Get Started · Claim Your Market</Eyebrow>
              </div>
              <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
                The form is the <span style={{ color: PINK }}>diagnostic.</span><br />
                The call is the <span style={{ color: YELLOW }}>plan.</span>
              </h1>
              <p className="lead on-dark" style={{ marginBottom: 30, maxWidth: 580 }}>
                Most "contact us" forms are bait. Ours is the start of the strategic review — by the time you submit it, you'll already know which of the three engines is leaking. The 30-minute call is where we build your sequence.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, paddingTop: 26, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                {[
                  { k: '30 min', v: 'Strategic Review' },
                  { k: '$0',     v: 'No pitch, no obligation' },
                  { k: '1:1',    v: 'With a CAM operator' },
                ].map(s => (
                  <div key={s.k}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.k}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginTop: 6 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <MarketCheckCard />
          </div>
        </div>
        <AccentBar height={6} />
      </section>

      {/* DIAGNOSTIC FORM */}
      <section className="section section-ivory" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 1080 }}>
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <Eyebrow noLine>The diagnostic</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px auto 12px', color: PURPLE, maxWidth: 760 }}>Five minutes. Three honest questions.</h2>
            <p style={{ maxWidth: 620, margin: '0 auto', color: '#555', fontSize: 16, lineHeight: 1.6 }}>
              Your answers route the review. By the time you click submit, we already know what to talk about.
            </p>
          </div>

          {/* STEP 1 — SIZE */}
          <div className="gs-step-card" style={{ background: '#fff', borderRadius: 16, padding: '36px 40px', marginBottom: 24, border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 22 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: PINK, fontSize: 12, letterSpacing: '0.2em' }}>01</div>
              <div className="display-md" style={{ fontSize: 22, color: PURPLE }}>How big is your portfolio?</div>
            </div>
            <div className="gs-size-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {sizes.map(s => (
                <button key={s.v} onClick={() => setSize(s.v)} style={{
                  textAlign: 'left', padding: '16px 18px',
                  border: `2px solid ${size === s.v ? PURPLE : '#e8e8e8'}`,
                  background: size === s.v ? `${PURPLE}05` : '#fff',
                  borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s',
                } as CSSProperties}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: PURPLE, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: '#888', lineHeight: 1.4 }}>{s.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2 — STAGE */}
          <div className="gs-step-card" style={{ background: '#fff', borderRadius: 16, padding: '36px 40px', marginBottom: 24, border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 22 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: YELLOW, fontSize: 12, letterSpacing: '0.2em' }}>02</div>
              <div className="display-md" style={{ fontSize: 22, color: PURPLE }}>Where are you on marketing today?</div>
            </div>
            <div className="gs-stage-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
              {stages.map(s => (
                <button key={s.v} onClick={() => setStage(s.v)} style={{
                  textAlign: 'left', padding: '16px 14px',
                  border: `2px solid ${stage === s.v ? PURPLE : '#e8e8e8'}`,
                  background: stage === s.v ? `${PURPLE}05` : '#fff',
                  borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s',
                } as CSSProperties}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: PURPLE, marginBottom: 6, lineHeight: 1.25 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: '#888', lineHeight: 1.45 }}>{s.d}</div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3 — PROBLEMS */}
          <div className="gs-step-card" style={{ background: '#fff', borderRadius: 16, padding: '36px 40px', marginBottom: 24, border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 6 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: GREEN, fontSize: 12, letterSpacing: '0.2em' }}>03</div>
              <div className="display-md" style={{ fontSize: 22, color: PURPLE }}>Which problems are real for you right now?</div>
            </div>
            <div style={{ marginLeft: 26, fontSize: 13, color: '#888', marginBottom: 22 }}>Pick all that apply. Each one routes to a different engine.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {problems.map(p => {
                const on = problem.includes(p.v);
                const c = p.pillar === 'BoardReach' ? PINK : p.pillar === 'BoardMatch' ? YELLOW : p.pillar === 'BoardRetain' ? GREEN : p.pillar === 'Foundation' ? BLUE : PURPLE;
                return (
                  <button key={p.v} onClick={() => togProblem(p.v)} style={{
                    textAlign: 'left', padding: '14px 18px',
                    border: `2px solid ${on ? c : '#e8e8e8'}`,
                    background: on ? `${c}15` : '#fff',
                    borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', gap: 12,
                  } as CSSProperties}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${on ? c : '#ccc'}`, background: on ? c : '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      {on && <Icon name="check" size={12} color="#fff" strokeWidth={3} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: PURPLE, lineHeight: 1.3 }}>{p.label}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: c, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginTop: 4 }}>{p.pillar}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* LIVE READOUT */}
          {readout && (
            <div className="gs-step-card" style={{ background: PURPLE, color: '#fff', borderRadius: 16, padding: '32px 40px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: readout.color }}></div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: readout.color, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Diagnostic readout · Updates as you select</div>
              <div className="display-md" style={{ fontSize: 26, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>{readout.h}</div>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, margin: 0, maxWidth: 760 }}>{readout.d}</p>
            </div>
          )}

          {/* STEP 4 — CONTACT */}
          <div className="gs-step-card" style={{ background: '#fff', borderRadius: 16, padding: '36px 40px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 22 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: BLUE, fontSize: 12, letterSpacing: '0.2em' }}>04</div>
              <div className="display-md" style={{ fontSize: 22, color: PURPLE }}>Where do we send the calendar link?</div>
            </div>
            <div className="gs-contact-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label="Your name"       value={name}    onChange={setName}    placeholder="Pat Operator" />
              <FormField label="Company"         value={company} onChange={setCompany} placeholder="Cypress Lakes Management" />
              <FormField label="Work email"      value={email}   onChange={setEmail}   placeholder="pat@cypresslakes.com" type="email" />
              <FormField label="Phone (optional)" value={phone}  onChange={setPhone}   placeholder="(210) 555-0142" type="tel" />
            </div>
            {error && (
              <div style={{ marginTop: 16, padding: '12px 16px', background: '#fff0f3', borderLeft: `3px solid ${PINK}`, borderRadius: 4, fontSize: 14, color: PINK }}>{error}</div>
            )}
            <div className="gs-submit-row" style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div className="gs-submit-disclaimer" style={{ fontSize: 12, color: '#888', maxWidth: 480, lineHeight: 1.5 }}>
                We'll respond within one business day with a calendar link. No mailing list. No drip sequence. We hate them too.
              </div>
              <button
                disabled={submitDisabled || loading}
                onClick={handleSubmit}
                style={{
                  padding: '16px 32px',
                  background: submitDisabled || loading ? '#ddd' : PINK,
                  color: '#fff', border: 'none', borderRadius: 999,
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15,
                  cursor: submitDisabled || loading ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.02em',
                  boxShadow: submitDisabled || loading ? 'none' : '0 8px 20px rgba(217,53,110,0.30)',
                  transition: 'all 0.15s',
                } as CSSProperties}
              >{loading ? 'Sending…' : 'Request my Strategic Review →'}</button>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow>What happens next</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>The next 14 days, mapped.</h2>
          </div>
          <div className="gs-timeline-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
            {[
              { d: 'Day 0',   c: PINK,   h: 'You submit',      b: "We confirm market availability and lock your ZIP exclusivity for 30 days while we diagnose. No charge." },
              { d: 'Day 1–3', c: YELLOW, h: 'Pre-review prep',  b: "We pull your local pack, AI citations, RFP win-rate proxy, and review velocity. You see the data we'll discuss before the call." },
              { d: 'Day 5–7', c: GREEN,  h: '30-min review',    b: "1:1 with a CAM operator. We diagnose which engine to fix first. You leave with a sequenced 90-day plan — yours to keep, no obligation." },
              { d: 'Day 14',  c: BLUE,   h: 'Decision point',   b: "If it's a fit, we propose a tier and a sequence. If it isn't, we tell you exactly what to fix and who to fix it with. No follow-up pressure." },
            ].map((s, i) => (
              <div key={s.d} style={{ position: 'relative', padding: '0 18px 0 0' }}>
                <div style={{ width: 14, height: 14, borderRadius: 999, background: s.c, marginBottom: 18, boxShadow: `0 0 0 6px ${s.c}25` }}></div>
                {i < 3 && <div style={{ position: 'absolute', top: 6, left: 14, right: 8, height: 2, background: `${s.c}55` }}></div>}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: s.c, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>{s.d}</div>
                <div className="display-md" style={{ fontSize: 20, color: PURPLE, marginBottom: 10 }}>{s.h}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{s.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="section section-ivory">
        <div className="container-narrow">
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <Eyebrow noLine>Before you wonder</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px auto 0', color: PURPLE }}>The questions every operator asks here.</h2>
          </div>
          <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <FAQItem bordered accent={PINK}   q="Is this really free?"              a="Yes — and it's not loss-leader bait either. We do ~10 strategic reviews per month and we close ~3. The other 7 leave with a written 90-day plan and either fix it themselves or hire someone else. We've placed clients with other vendors when it wasn't a fit. If your portfolio doesn't justify our retainer, we'll tell you that on the call." />
            <FAQItem bordered accent={YELLOW} q="What if my market is already claimed?" a="Submit anyway. We maintain a quiet waitlist, and engagements rotate every 12–18 months. If a slot opens in your metro, you'll be the first call. We also occasionally release adjacent ZIPs when a partner sublets coverage area." />
            <FAQItem bordered accent={GREEN}  q="What if we're not ready to spend yet?" a="The Strategic Review is the same call regardless. Many of our best partnerships started with a review 6, 12, even 24 months before signing. The plan we build is yours — implement it on your timeline, with us or without us." />
            <FAQItem bordered accent={BLUE}   q="Will I be on a sales call?"          a="No. The call is run by a CAM operator (Brad, Hank, or one of our senior strategists), not a salesperson. There is no pitch deck. We diagnose, we discuss, we hand you the plan. If you want to talk pricing at the end, we will — but only if you bring it up." />
            <FAQItem bordered accent={PURPLE} q="What do I need to bring to the call?" a="Nothing. We pre-pull the public data (search visibility, review velocity, AI citation rate, recent RFP coverage). It helps if you can share door count and current marketing spend in advance, but it isn't required." />
          </div>
        </div>
      </section>

      <CtaBand
        headline="Or skip the form and just book the call."
        sub="Same call, same operator, same 30 minutes. The form just helps us prep."
        primary="Open the calendar"
        primaryHref="/contact"
      />
    </>
  );
}
