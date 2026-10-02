// src/lib/map-tiles.ts — SERVER. Renders the hero's muted street map for a lat/lng from OpenStreetMap tiles.
// Recipe (hero 7a v2): tiles → grayscale, brightness 1.12, contrast .98 → multiplied with cream #fdfbf5.
// Used by /api/map (per-metro, cached at the CDN) and .context/gen-map.mjs (the committed Austin default).
// OSM tile usage: identifying User-Agent, a handful of tiles per unique metro, results cached for 30 days.
// Attribution "© OpenStreetMap contributors" stays on the hero.
import sharp from 'sharp';

const T = 256;
const UA = 'alloygp.co hero map (contact@alloygp.co)';

export function tileXY(lat: number, lng: number, z: number) {
  const x = ((lng + 180) / 360) * 2 ** z;
  const y = ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * 2 ** z;
  return { x, y };
}

/** Stitch an N×N tile grid centred on the point and mute it. Returns a square WebP of `size` px. */
export async function renderMetroMap(lat: number, lng: number, { zoom = 12, grid = 3, size = 768 }: { zoom?: number; grid?: number; size?: number } = {}): Promise<Buffer> {
  const { x, y } = tileXY(lat, lng, zoom);
  const half = Math.floor(grid / 2);
  const x0 = Math.floor(x) - half, y0 = Math.floor(y) - half;
  const tiles = await Promise.all(
    Array.from({ length: grid * grid }, async (_, k) => {
      const i = k % grid, j = Math.floor(k / grid);
      const r = await fetch(`https://tile.openstreetmap.org/${zoom}/${x0 + i}/${y0 + j}.png`, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(6000) });
      if (!r.ok) throw new Error(`tile ${r.status}`);
      return { input: Buffer.from(await r.arrayBuffer()), left: i * T, top: j * T };
    }),
  );
  const W = grid * T;
  const full = await sharp({ create: { width: W, height: W, channels: 3, background: '#fdfbf5' } }).composite(tiles).png().toBuffer();
  const cx = Math.round((x - x0) * T), cy = Math.round((y - y0) * T);
  const S = Math.min(size, W);
  const left = Math.max(0, Math.min(W - S, cx - S / 2)), top = Math.max(0, Math.min(W - S, cy - S / 2));
  const muted = await sharp(full).extract({ left, top, width: S, height: S }).grayscale().modulate({ brightness: 1.12 }).linear(0.98, 2).toBuffer();
  const cream = Buffer.from(`<svg width="${S}" height="${S}"><rect width="100%" height="100%" fill="#fdfbf5"/></svg>`);
  return sharp(muted).composite([{ input: cream, blend: 'multiply' }]).webp({ quality: 72 }).toBuffer();
}
