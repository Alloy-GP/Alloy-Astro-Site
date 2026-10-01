// src/lib/albers.ts — spherical Albers equal-area conic projection for the contiguous US
// (standard parallels 29.5° / 45.5°, central meridian −96°, origin latitude 23°; d3's
// geoAlbers defaults). Returns unscaled projection units; src/data/us-map.ts fits them to
// the map's viewBox. Used both by the map generator and at runtime for metro dots/pins.
const R = Math.PI / 180;
const phi0 = 23 * R, lambda0 = -96 * R, phi1 = 29.5 * R, phi2 = 45.5 * R;
const n = (Math.sin(phi1) + Math.sin(phi2)) / 2;
const C = Math.cos(phi1) ** 2 + 2 * n * Math.sin(phi1);
const rho0 = Math.sqrt(C - 2 * n * Math.sin(phi0)) / n;

export function albersRaw(lat: number, lng: number): [number, number] {
  const phi = lat * R, lambda = lng * R;
  const theta = n * (lambda - lambda0);
  const rho = Math.sqrt(Math.max(0, C - 2 * n * Math.sin(phi))) / n;
  // y grows downward (screen space), matching d3's geoProjection output.
  return [rho * Math.sin(theta), rho * Math.cos(theta) - rho0];
}
