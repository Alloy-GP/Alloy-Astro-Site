// src/components/modules/MarketChecker.tsx
// Market exclusivity checker with geo lockout. Ported from modules.jsx.
import { useState, useEffect, useMemo } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import { PURPLE, PINK } from '~/lib/tokens';

interface LockedMetro { label: string; lat: number; lng: number; chip?: boolean; }
const LOCKED_METROS: LockedMetro[] = [
  { label: 'Denham Springs, LA', lat: 30.4863, lng: -90.9559 },
  { label: 'Branford, CT', lat: 41.2793, lng: -72.8151, chip: true },
  { label: 'Orlando, FL', lat: 28.5383, lng: -81.3792, chip: true },
  { label: 'Manchester, NH', lat: 42.9956, lng: -71.4548, chip: true },
  { label: 'Venice, FL', lat: 27.0998, lng: -82.4543 },
  { label: 'Fredericksburg, VA', lat: 38.3032, lng: -77.4605 },
  { label: 'Houston, TX', lat: 29.7604, lng: -95.3698 },
  { label: 'Austin, TX', lat: 30.2672, lng: -97.7431 },
  { label: 'San Antonio, TX', lat: 29.4241, lng: -98.4936 },
  { label: 'Owings Mills, MD', lat: 39.4193, lng: -76.7802 },
];
const LOCK_RADIUS_MI = 30;

const GEO: Record<string, [number, number]> = {
  'denham springs, la': [30.4863, -90.9559], 'branford, ct': [41.2793, -72.8151],
  'orlando, fl': [28.5383, -81.3792], 'manchester, nh': [42.9956, -71.4548],
  'venice, fl': [27.0998, -82.4543], 'fredericksburg, va': [38.3032, -77.4605],
  'raleigh, nc': [35.7796, -78.6382], 'houston, tx': [29.7604, -95.3698],
  'austin, tx': [30.2672, -97.7431], 'san antonio, tx': [29.4241, -98.4936],
  'owings mills, md': [39.4193, -76.7802], 'phoenix, az': [33.4484, -112.0740],
  'denver, co': [39.7392, -104.9903], 'charlotte, nc': [35.2271, -80.8431],
  'tampa, fl': [27.9506, -82.4572], 'las vegas, nv': [36.1699, -115.1398],
  'nashville, tn': [36.1627, -86.7816], 'miami, fl': [25.7617, -80.1918],
  'jacksonville, fl': [30.3322, -81.6557], 'tallahassee, fl': [30.4383, -84.2807],
  'fort lauderdale, fl': [26.1224, -80.1373], 'naples, fl': [26.1420, -81.7948],
  'dallas, tx': [32.7767, -96.7970], 'fort worth, tx': [32.7555, -97.3308],
  'el paso, tx': [31.7619, -106.4850], 'atlanta, ga': [33.7490, -84.3880],
  'savannah, ga': [32.0809, -81.0912], 'raleigh-durham, nc': [35.9940, -78.8986],
  'durham, nc': [35.9940, -78.8986], 'cary, nc': [35.7915, -78.7811],
  'greensboro, nc': [36.0726, -79.7920], 'richmond, va': [37.5407, -77.4360],
  'norfolk, va': [36.8508, -76.2859], 'virginia beach, va': [36.8529, -75.9780],
  'washington, dc': [38.9072, -77.0369], 'baltimore, md': [39.2904, -76.6122],
  'annapolis, md': [38.9784, -76.4922], 'boston, ma': [42.3601, -71.0589],
  'providence, ri': [41.8240, -71.4128], 'hartford, ct': [41.7658, -72.6734],
  'new haven, ct': [41.3083, -72.9279], 'stamford, ct': [41.0534, -73.5387],
  'concord, nh': [43.2081, -71.5376], 'nashua, nh': [42.7654, -71.4676],
  'new orleans, la': [29.9511, -90.0715], 'baton rouge, la': [30.4515, -91.1871],
};

function distanceMi(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

interface Resolved { coords: [number, number]; label: string; }
function resolveQuery(q: string): Resolved | null {
  const norm = q.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!norm) return null;
  if (GEO[norm]) return { coords: GEO[norm], label: q.trim() };
  const key = Object.keys(GEO).find((k) => k.startsWith(norm + ',') || k === norm);
  if (key) return { coords: GEO[key], label: q.trim() };
  return null;
}

interface CheckResult {
  status: 'open' | 'claimed' | 'unknown';
  label: string;
  dist?: number;
  nearLabel?: string;
}

export default function MarketChecker() {
  const [val, setVal] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [waitEmail, setWaitEmail] = useState('');
  const [waitCo, setWaitCo] = useState('');
  const [waitSubmitted, setWaitSubmitted] = useState(false);

  const onWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitEmail.trim() || !waitCo.trim()) return;
    setWaitSubmitted(true);
  };

  useEffect(() => {
    setWaitSubmitted(false);
    setWaitEmail('');
    setWaitCo('');
  }, [result?.label, result?.status]);

  const DECOY_METROS = [
    'Phoenix, AZ', 'Denver, CO', 'Charlotte, NC', 'Tampa, FL',
    'Las Vegas, NV', 'Nashville, TN', 'Atlanta, GA', 'Jacksonville, FL',
    'Dallas, TX', 'Fort Worth, TX', 'Richmond, VA', 'Virginia Beach, VA',
    'Baltimore, MD', 'Hartford, CT', 'Stamford, CT', 'Boston, MA',
    'Providence, RI', 'Naples, FL', 'Fort Lauderdale, FL', 'Miami, FL',
    'Savannah, GA', 'Greensboro, NC', 'Durham, NC', 'Concord, NH',
    'Annapolis, MD', 'New Orleans, LA', 'Baton Rouge, LA', 'El Paso, TX',
  ];

  const claimedChips = useMemo(() => {
    const real = LOCKED_METROS.filter((m) => m.chip).map((m) => m.label);
    const pool = [...DECOY_METROS];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const decoys = pool.slice(0, 6);
    const merged = [...real, ...decoys];
    for (let i = merged.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [merged[i], merged[j]] = [merged[j], merged[i]];
    }
    return merged;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCheck = () => {
    if (!val.trim()) return;
    const resolved = resolveQuery(val);
    if (!resolved) {
      const hit = LOCKED_METROS.find((m) => m.label.toLowerCase().includes(val.trim().toLowerCase()));
      if (hit) setResult({ status: 'claimed', label: hit.label, dist: 0 });
      else setResult({ status: 'unknown', label: val.trim() });
      return;
    }
    let nearest: (LockedMetro & { d: number }) | null = null;
    for (const m of LOCKED_METROS) {
      const d = distanceMi(resolved.coords[0], resolved.coords[1], m.lat, m.lng);
      if (!nearest || d < nearest.d) nearest = { ...m, d };
    }
    if (nearest && nearest.d <= LOCK_RADIUS_MI) {
      setResult({ status: 'claimed', label: resolved.label, dist: Math.round(nearest.d), nearLabel: nearest.label });
    } else {
      setResult({ status: 'open', label: resolved.label });
    }
  };

  return (
    <div className="market-checker-card" style={{ background: '#fff', borderRadius: 16, padding: 40, boxShadow: '0 16px 48px rgba(56,28,79,0.12)', border: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 10, background: 'var(--alloy-pink-tint)', display: 'grid', placeItems: 'center', color: PINK, flexShrink: 0 }}>
          <Icon name="map-pin" size={24} />
        </div>
        <div>
          <Eyebrow noLine>One CAM company per metro</Eyebrow>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, lineHeight: 1.15, letterSpacing: '-0.018em', color: PURPLE, margin: '8px 0 6px' }}>
            Is your market still open?
          </h3>
          <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6, margin: 0 }}>Once a CAM firm claims a metro, no competing firm in that area can engage Alloy.</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="City, State"
               onKeyDown={(e) => { if (e.key === 'Enter') onCheck(); }}
               style={{ flex: 1, padding: '16px 18px', borderRadius: 10, border: '1px solid var(--border-strong)', fontSize: 15, fontFamily: 'var(--font-body)', color: PURPLE, outline: 'none' }} />
        <Button variant="primary" onClick={onCheck}>Check</Button>
      </div>
      {result && (() => {
        const isOpen = result.status === 'open';
        const isUnknown = result.status === 'unknown';
        const bg = isOpen ? 'var(--alloy-green-tint)' : isUnknown ? '#f3f0f7' : 'var(--alloy-pink-tint)';
        const border = isOpen ? '#aed7d0' : isUnknown ? 'var(--border-subtle)' : '#f0bdcd';
        const iconBg = isOpen ? '#5fa899' : isUnknown ? '#888' : PINK;
        const iconName = isOpen ? 'check' : isUnknown ? 'map-pin' : 'x';
        const headline = isOpen
          ? `${result.label} appears open.`
          : isUnknown
          ? `We couldn't auto-locate "${result.label}".`
          : (result.dist ?? 0) > 0
          ? `${result.label} is inside a claimed exclusivity zone.`
          : `${result.label} is currently claimed.`;
        const sub = isOpen
          ? "Let's lock it in before a competitor does."
          : isUnknown
          ? "Submit a strategic review and we'll confirm by hand within one business day."
          : `Within ${LOCK_RADIUS_MI} miles of ${result.nearLabel || result.label}. Get on the waitlist — we'll alert you the moment it opens.`;
        return (
          <>
            <div className="reveal market-checker-result" style={{
              marginTop: 20, padding: '18px 22px', borderRadius: 10,
              background: bg, border: `1px solid ${border}`,
              display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: iconBg, color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon name={iconName} size={18} strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: PURPLE, fontSize: 15 }}>{headline}</div>
                <div style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{sub}</div>
              </div>
              {(isOpen || isUnknown) && (
                <a href="/strategic-review-request" className="btn btn-primary btn-sm" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>Reach out →</a>
              )}
            </div>

            {result.status === 'claimed' && !waitSubmitted && (
              <form onSubmit={onWaitlistSubmit} className="reveal" style={{
                marginTop: 14, padding: '20px 22px', borderRadius: 10,
                background: '#fff', border: '1px solid var(--border-subtle)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.10em', textTransform: 'uppercase', color: PURPLE, marginBottom: 4 }}>
                  Get on the waitlist
                </div>
                <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5, marginBottom: 14 }}>
                  We'll alert you the moment {result.nearLabel || result.label} opens up.
                </div>
                <div className="market-checker-waitlist-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10 }}>
                  <input type="email" required value={waitEmail} onChange={(e) => setWaitEmail(e.target.value)} placeholder="Work email"
                    style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', fontSize: 14, fontFamily: 'var(--font-body)', color: PURPLE, outline: 'none' }} />
                  <input type="text" required value={waitCo} onChange={(e) => setWaitCo(e.target.value)} placeholder="Company name"
                    style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', fontSize: 14, fontFamily: 'var(--font-body)', color: PURPLE, outline: 'none' }} />
                  <Button variant="primary" type="submit" size="sm">Notify me</Button>
                </div>
              </form>
            )}
            {result.status === 'claimed' && waitSubmitted && (
              <div className="reveal" style={{
                marginTop: 14, padding: '16px 20px', borderRadius: 10,
                background: 'var(--alloy-green-tint)', border: '1px solid #aed7d0',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: '#5fa899', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon name="check" size={16} strokeWidth={2.5} />
                </div>
                <div style={{ fontSize: 13.5, color: PURPLE, lineHeight: 1.5 }}>
                  <strong style={{ fontFamily: 'var(--font-display)' }}>You're on the list.</strong> We'll be in touch the moment that exclusivity opens.
                </div>
              </div>
            )}
          </>
        );
      })()}
      <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border-subtle)', fontSize: 12, color: '#888', display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Recently claimed:</span>
        {claimedChips.map((label) => (
          <span key={label} style={{ padding: '4px 10px', background: '#f3f0f7', borderRadius: 999, fontSize: 12, fontWeight: 500, color: PURPLE }}>{label}</span>
        ))}
      </div>
    </div>
  );
}
