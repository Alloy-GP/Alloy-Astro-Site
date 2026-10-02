// src/data/metros.ts
// Partner-office data for the homepage availability check (/api/metro).
// CLAIMED = every partner office address the client supplied on 2026-10-02 (geocoded to the street where the
// geocoder resolved it, otherwise the ZIP centroid); anything within LOCK_RADIUS_MI of one is "claimed".
// Keep this list in step with the client roster — add a row per new office. Firm names stay in comments only;
// /api/metro returns the city label (`near`), never the firm.
// OPEN = larger metros, only used as a last-resort name match in /api/metro.

export interface Metro { label: string; lat: number; lng: number }

export const LOCK_RADIUS_MI = 15; // client decision 2026-10-01 (was 30)

export const CLAIMED_METROS: Metro[] = [
  { label: 'Ocean City, MD', lat: 38.3811, lng: -75.1138 },   // Tidewater Property Management — 8101 Coastal Hwy Suite 5, Ocean City, MD 21842
  { label: 'Owings Mills, MD', lat: 39.4360, lng: -76.7735 },   // Tidewater Property Management — 3600 Crondall Lane, Owings Mills, MD 21117
  { label: 'Lewes, DE', lat: 38.7381, lng: -75.1747 },   // Tidewater Property Management — 20375 John J Williams Highway, Lewes, DE 19958
  { label: 'San Antonio, TX', lat: 29.6168, lng: -98.4874 },   // RISE Association Management Group — 401 E Sonterra Blvd, San Antonio, TX 78258
  { label: 'League City, TX', lat: 29.5428, lng: -95.0652 },   // RISE Association Management Group — 2600 South Shore Blvd, League City, TX 77573
  { label: 'Houston, TX', lat: 29.7373, lng: -95.4245 },   // RISE Association Management Group — 3131 Eastside St, Houston, TX 77098
  { label: 'Austin, TX', lat: 30.2668, lng: -97.7502 },   // RISE Association Management Group — 500 W 2nd St, Austin, TX 78701
  { label: 'The Woodlands, TX', lat: 30.1585, lng: -95.4507 },   // RISE Association Management Group — 2001 Timberloch Place, The Woodlands, TX 77380
  { label: 'Fredericksburg, VA', lat: 38.2481, lng: -77.4681 },   // Landmarc Real Estate — 3715 Latimers Knoll Court, Fredericksburg, VA 22408
  { label: 'Venice, FL', lat: 27.0606, lng: -82.3520 },   // Keys-Caldwell — 1162 Indian Hills Boulevard, Venice, FL 34293
  { label: 'Carencro, LA', lat: 30.3027, lng: -92.0280 },   // CMGT — 3419 NW Evangeline Thruway, Carencro, LA 70520
  { label: 'Baton Rouge, LA', lat: 30.4494, lng: -91.1870 },   // CMGT Rentals — Baton Rouge, LA
  { label: 'Shreveport, LA', lat: 32.5092, lng: -93.7503 },   // CMGT — 717 Crockett St, Shreveport, LA 71101
  { label: 'Biloxi, MS', lat: 30.3949, lng: -88.8880 },   // CMGT — 770 Water St, Biloxi, MS 39530
  { label: 'Denham Springs, LA', lat: 30.4603, lng: -90.9554 },   // CMGT — 140 Aspen Square, Denham Springs, LA 70726
  { label: 'Daphne, AL', lat: 30.6051, lng: -87.8725 },   // CMGT — 26241 Equity Dr, Daphne, AL 36526
  { label: 'Richardson, TX', lat: 32.9814, lng: -96.7113 },   // Insight Association Management — 2400 Lakeside Blvd, Richardson, TX 75082
  { label: 'Manchester, NH', lat: 42.9978, lng: -71.4687 },   // Innovia Co-op — 670 North Commercial Street, Manchester, NH 03101
  { label: 'Orlando, FL', lat: 28.5533, lng: -81.3702 },   // Edison Association Management — 619 E Colonial Drive, Orlando, FL 32803
  { label: 'New Haven, CT', lat: 41.3154, lng: -72.9049 },   // CPE Property Management Solutions — 470 James Street, New Haven, CT 06513
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
