// src/data/metros.ts
// Partner-metro data for the homepage metro checker and /api/metro.
// CLAIMED = metros with an active Alloy partner (one CAM firm per metro); anything within
// LOCK_RADIUS_MI of one of these is "claimed". OPEN = larger metros shown as open dots on the
// idle map. Replace with a CMS-backed list when available (see OPEN-QUESTIONS §11).

export interface Metro { label: string; lat: number; lng: number }

export const LOCK_RADIUS_MI = 30;

export const CLAIMED_METROS: Metro[] = [
  { label: 'Denham Springs, LA', lat: 30.4863, lng: -90.9559 },
  { label: 'Branford, CT', lat: 41.2793, lng: -72.8151 },
  { label: 'Orlando, FL', lat: 28.5383, lng: -81.3792 },
  { label: 'Manchester, NH', lat: 42.9956, lng: -71.4548 },
  { label: 'Venice, FL', lat: 27.0998, lng: -82.4543 },
  { label: 'Fredericksburg, VA', lat: 38.3032, lng: -77.4605 },
  { label: 'Houston, TX', lat: 29.7604, lng: -95.3698 },
  { label: 'Austin, TX', lat: 30.2672, lng: -97.7431 },
  { label: 'San Antonio, TX', lat: 29.4241, lng: -98.4936 },
  { label: 'Owings Mills, MD', lat: 39.4193, lng: -76.7802 },
];

export const OPEN_METROS: Metro[] = [
  { label: 'Phoenix, AZ', lat: 33.45, lng: -112.07 },
  { label: 'Denver, CO', lat: 39.74, lng: -104.99 },
  { label: 'Charlotte, NC', lat: 35.23, lng: -80.84 },
  { label: 'San Diego, CA', lat: 32.72, lng: -117.16 },
  { label: 'Atlanta, GA', lat: 33.75, lng: -84.39 },
  { label: 'Chicago, IL', lat: 41.88, lng: -87.63 },
  { label: 'New York, NY', lat: 40.71, lng: -74.01 },
  { label: 'Seattle, WA', lat: 47.61, lng: -122.33 },
  { label: 'Dallas, TX', lat: 32.78, lng: -96.8 },
  { label: 'Miami, FL', lat: 25.76, lng: -80.19 },
  { label: 'Tampa, FL', lat: 27.95, lng: -82.46 },
  { label: 'Las Vegas, NV', lat: 36.17, lng: -115.14 },
  { label: 'Nashville, TN', lat: 36.16, lng: -86.78 },
  { label: 'Raleigh, NC', lat: 35.78, lng: -78.64 },
  { label: 'Jacksonville, FL', lat: 30.33, lng: -81.66 },
  { label: 'San Francisco, CA', lat: 37.77, lng: -122.42 },
  { label: 'Los Angeles, CA', lat: 34.05, lng: -118.24 },
  { label: 'Salt Lake City, UT', lat: 40.76, lng: -111.89 },
  { label: 'Minneapolis, MN', lat: 44.98, lng: -93.27 },
  { label: 'Kansas City, MO', lat: 39.1, lng: -94.58 },
  { label: 'Columbus, OH', lat: 39.96, lng: -83.0 },
  { label: 'Philadelphia, PA', lat: 39.95, lng: -75.17 },
  { label: 'Boston, MA', lat: 42.36, lng: -71.06 },
  { label: 'Portland, OR', lat: 45.52, lng: -122.68 },
];

export function distanceMi(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/** Nearest claimed metro and whether the point is inside its lock radius. */
export function claimStatus(lat: number, lng: number): { claimed: boolean; near?: string } {
  let nearest: (Metro & { d: number }) | undefined;
  for (const m of CLAIMED_METROS) {
    const d = distanceMi(lat, lng, m.lat, m.lng);
    if (!nearest || d < nearest.d) nearest = { ...m, d };
  }
  const claimed = !!nearest && nearest.d <= LOCK_RADIUS_MI;
  return claimed && nearest ? { claimed, near: nearest.label } : { claimed };
}
