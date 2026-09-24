// src/pages/api/metro.ts
// GET /api/metro?zip=78701 → { zip, name, lat, lng, claimed, near? }
// ZIP → place via Zippopotam (free, no key), with a bundled ZIP-prefix fallback so the
// homepage checker still answers if the lookup is unavailable. "claimed" = within
// LOCK_RADIUS_MI of an existing Alloy partner metro (one CAM firm per metro).
import type { APIRoute } from 'astro';

import { claimStatus } from '~/data/metros';

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

const json = (body: unknown, status = 200, cache = false) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...(cache ? { 'Cache-Control': 'public, s-maxage=86400, max-age=3600' } : {}) },
  });

export const GET: APIRoute = async ({ url }) => {
  const zip = (url.searchParams.get('zip') ?? '').replace(/\D/g, '').slice(0, 5);
  if (zip.length !== 5) return json({ error: 'Enter a 5-digit ZIP code.' }, 400);

  let name: string | undefined;
  let lat: number | undefined;
  let lng: number | undefined;

  try {
    const r = await fetch(`https://api.zippopotam.us/us/${zip}`, { signal: AbortSignal.timeout(2500), headers: { Accept: 'application/json' } });
    if (r.ok) {
      const d = (await r.json()) as { places?: Array<{ 'place name': string; 'state abbreviation': string; latitude: string; longitude: string }> };
      const place = d.places?.[0];
      if (place) {
        name = `${place['place name']}, ${place['state abbreviation']}`;
        lat = parseFloat(place.latitude);
        lng = parseFloat(place.longitude);
      }
    }
  } catch {
    /* fall through to the bundled table */
  }

  if (name === undefined || lat === undefined || lng === undefined || Number.isNaN(lat) || Number.isNaN(lng)) {
    const p = PREFIX[zip.slice(0, 3)];
    if (!p) return json({ zip, error: 'We couldn’t place that ZIP. Try a nearby one, or talk to us.' }, 404);
    [name, lat, lng] = p;
  }

  const status = claimStatus(lat, lng);
  return json({ zip, name, lat, lng, ...status }, 200, true);
};
