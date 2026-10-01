// src/pages/api/metro.ts
// GET /api/metro?q=Austin | ?q=Austin, TX | ?q=78701 (legacy: ?zip=78701)
//   → { query, zip?, name, lat, lng, claimed, near? }
// Resolution order:
//   ZIP          → Zippopotam (free, no key) → bundled 3-digit prefix table if the lookup is down.
//   "City, ST"   → Zippopotam /us/{state}/{city}.
//   "City"       → Nominatim (OpenStreetMap; UA identifies us, ≤1 req/s policy — fine at our volume,
//                  results cached in-memory + at the CDN for a day) → our own metro lists as a last resort.
// "claimed" = within LOCK_RADIUS_MI of an existing Alloy partner metro (one CAM firm per metro).
import type { APIRoute } from 'astro';

import { CLAIMED_METROS, OPEN_METROS, claimStatus } from '~/data/metros';

// Fallback: 3-digit ZIP prefix → [city/state, lat, lng]. Used only when the live lookup fails.
const PREFIX: Record<string, [string, number, number]> = {
  '029': ['Providence, RI', 41.82, -71.41], '031': ['Manchester, NH', 42.99, -71.46], '064': ['Branford, CT', 41.28, -72.82],
  '100': ['New York, NY', 40.71, -74.01], '212': ['Baltimore, MD', 39.29, -76.61], '234': ['Virginia Beach, VA', 36.85, -75.98],
  '275': ['Raleigh, NC', 35.78, -78.64], '282': ['Charlotte, NC', 35.23, -80.84], '300': ['Atlanta, GA', 33.75, -84.39], '303': ['Atlanta, GA', 33.75, -84.39],
  '322': ['Jacksonville, FL', 30.33, -81.66], '328': ['Orlando, FL', 28.54, -81.38], '331': ['Miami, FL', 25.76, -80.19], '332': ['Miami, FL', 25.76, -80.19],
  '334': ['West Palm Beach, FL', 26.71, -80.05], '336': ['Tampa, FL', 27.95, -82.46], '339': ['Fort Myers, FL', 26.64, -81.87], '342': ['Sarasota, FL', 27.34, -82.53],
  '372': ['Nashville, TN', 36.16, -86.78], '606': ['Chicago, IL', 41.88, -87.63], '707': ['Baton Rouge, LA', 30.45, -91.19],
  '750': ['Dallas, TX', 32.78, -96.80], '752': ['Dallas, TX', 32.78, -96.80], '770': ['Houston, TX', 29.76, -95.37], '782': ['San Antonio, TX', 29.42, -98.49],
  '786': ['Austin, TX', 30.27, -97.74], '787': ['Austin, TX', 30.27, -97.74], '802': ['Denver, CO', 39.74, -104.99], '841': ['Salt Lake City, UT', 40.76, -111.89],
  '850': ['Phoenix, AZ', 33.45, -112.07], '852': ['Phoenix, AZ', 33.45, -112.07], '891': ['Las Vegas, NV', 36.17, -115.14],
  '900': ['Los Angeles, CA', 34.05, -118.24], '921': ['San Diego, CA', 32.72, -117.16], '941': ['San Francisco, CA', 37.77, -122.42], '981': ['Seattle, WA', 47.61, -122.33],
};

const STATES: Record<string, string> = {
  alabama: 'AL', alaska: 'AK', arizona: 'AZ', arkansas: 'AR', california: 'CA', colorado: 'CO', connecticut: 'CT', delaware: 'DE', 'district of columbia': 'DC',
  florida: 'FL', georgia: 'GA', hawaii: 'HI', idaho: 'ID', illinois: 'IL', indiana: 'IN', iowa: 'IA', kansas: 'KS', kentucky: 'KY', louisiana: 'LA', maine: 'ME',
  maryland: 'MD', massachusetts: 'MA', michigan: 'MI', minnesota: 'MN', mississippi: 'MS', missouri: 'MO', montana: 'MT', nebraska: 'NE', nevada: 'NV',
  'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND', ohio: 'OH', oklahoma: 'OK',
  oregon: 'OR', pennsylvania: 'PA', 'rhode island': 'RI', 'south carolina': 'SC', 'south dakota': 'SD', tennessee: 'TN', texas: 'TX', utah: 'UT', vermont: 'VT',
  virginia: 'VA', washington: 'WA', 'west virginia': 'WV', wisconsin: 'WI', wyoming: 'WY',
};
const STATE_ABBRS = new Set(Object.values(STATES));

interface Place { name: string; lat: number; lng: number; zip?: string }
const UA = 'alloygp.co metro check (contact@alloygp.co)';
const cityCache = new Map<string, Place | null>();

const json = (body: unknown, status = 200, cache = false) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...(cache ? { 'Cache-Control': 'public, s-maxage=86400, max-age=3600' } : {}) },
  });

const finite = (n: number) => Number.isFinite(n);

async function byZip(zip: string): Promise<Place | null> {
  try {
    const r = await fetch(`https://api.zippopotam.us/us/${zip}`, { signal: AbortSignal.timeout(2500), headers: { Accept: 'application/json' } });
    if (r.ok) {
      const d = (await r.json()) as { places?: Array<{ 'place name': string; 'state abbreviation': string; latitude: string; longitude: string }> };
      const p = d.places?.[0];
      if (p) {
        const lat = parseFloat(p.latitude), lng = parseFloat(p.longitude);
        if (finite(lat) && finite(lng)) return { name: `${p['place name']}, ${p['state abbreviation']}`, lat, lng, zip };
      }
    }
  } catch { /* fall through */ }
  const f = PREFIX[zip.slice(0, 3)];
  return f ? { name: f[0], lat: f[1], lng: f[2], zip } : null;
}

/** "Austin, TX" | "Austin TX" | "Austin, Texas" | "Austin" → { city, state? } */
function parseCity(raw: string): { city: string; state?: string } {
  const s = raw.replace(/\s+/g, ' ').trim();
  const comma = s.split(',').map((x) => x.trim()).filter(Boolean);
  if (comma.length >= 2) {
    const st = comma[comma.length - 1]!.toLowerCase();
    const abbr = STATES[st] ?? (STATE_ABBRS.has(st.toUpperCase()) ? st.toUpperCase() : undefined);
    if (abbr) return { city: comma.slice(0, -1).join(', '), state: abbr };
  }
  const words = s.split(' ');
  if (words.length >= 2) {
    const last = words[words.length - 1]!;
    if (STATE_ABBRS.has(last.toUpperCase()) && last.length === 2) return { city: words.slice(0, -1).join(' '), state: last.toUpperCase() };
    for (let n = 2; n >= 1; n--) {
      if (words.length > n) {
        const tail = words.slice(-n).join(' ').toLowerCase();
        if (STATES[tail]) return { city: words.slice(0, -n).join(' '), state: STATES[tail] };
      }
    }
  }
  return { city: s };
}

async function byCityState(city: string, state: string): Promise<Place | null> {
  try {
    const r = await fetch(`https://api.zippopotam.us/us/${state.toLowerCase()}/${encodeURIComponent(city.toLowerCase())}`, { signal: AbortSignal.timeout(2500), headers: { Accept: 'application/json' } });
    if (!r.ok) return null;
    const d = (await r.json()) as { 'place name'?: string; 'state abbreviation'?: string; places?: Array<{ latitude: string; longitude: string; 'place name': string }> };
    const p = d.places?.[0];
    if (!p) return null;
    const lat = parseFloat(p.latitude), lng = parseFloat(p.longitude);
    if (!finite(lat) || !finite(lng)) return null;
    return { name: `${d['place name'] ?? p['place name']}, ${d['state abbreviation'] ?? state}`, lat, lng };
  } catch { return null; }
}

async function byNominatim(query: string): Promise<Place | null> {
  try {
    const u = new URL('https://nominatim.openstreetmap.org/search');
    u.search = new URLSearchParams({ q: query, countrycodes: 'us', format: 'jsonv2', limit: '1', addressdetails: '1', featureType: 'settlement' }).toString();
    const r = await fetch(u, { signal: AbortSignal.timeout(2500), headers: { Accept: 'application/json', 'User-Agent': UA } });
    if (!r.ok) return null;
    const d = (await r.json()) as Array<{ lat: string; lon: string; name?: string; address?: Record<string, string> }>;
    const hit = d[0];
    if (!hit) return null;
    const lat = parseFloat(hit.lat), lng = parseFloat(hit.lon);
    if (!finite(lat) || !finite(lng)) return null;
    const a = hit.address ?? {};
    const city = a.city ?? a.town ?? a.village ?? a.hamlet ?? a.municipality ?? hit.name ?? query;
    const st = (a['ISO3166-2-lvl4'] ?? '').replace(/^US-/, '');
    return { name: st ? `${city}, ${st}` : city, lat, lng };
  } catch { return null; }
}

function byOurMetros(city: string): Place | null {
  const c = city.toLowerCase();
  const hit = [...CLAIMED_METROS, ...OPEN_METROS].find((m) => m.label.toLowerCase() === c || m.label.toLowerCase().split(',')[0] === c);
  return hit ? { name: hit.label, lat: hit.lat, lng: hit.lng } : null;
}

export const GET: APIRoute = async ({ url }) => {
  const raw = (url.searchParams.get('q') ?? url.searchParams.get('zip') ?? '').trim().slice(0, 80);
  if (!raw) return json({ error: 'Enter a metro or ZIP code.' }, 400);

  let place: Place | null = null;
  const zipMatch = raw.match(/^(\d{5})(?:-\d{4})?$/);
  if (zipMatch) {
    place = await byZip(zipMatch[1]!);
    if (!place) return json({ query: raw, error: 'We couldn’t place that ZIP. Try a nearby one, or talk to us.' }, 404);
  } else if (/^\d+$/.test(raw)) {
    return json({ query: raw, error: 'Enter a 5-digit ZIP code or a city name.' }, 400);
  } else {
    const key = raw.toLowerCase();
    if (cityCache.has(key)) place = cityCache.get(key) ?? null;
    else {
      const { city, state } = parseCity(raw);
      place = (state ? await byCityState(city, state) : null) ?? (await byNominatim(raw)) ?? byOurMetros(city);
      cityCache.set(key, place);
    }
    if (!place) return json({ query: raw, error: 'We couldn’t place that. Try “City, ST” or a ZIP code.' }, 404);
  }

  const status = claimStatus(place.lat, place.lng);
  return json({ query: raw, ...(place.zip ? { zip: place.zip } : {}), name: place.name, lat: place.lat, lng: place.lng, ...status }, 200, true);
};
