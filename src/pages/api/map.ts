// src/pages/api/map.ts — GET /api/map?lat=30.27&lng=-97.74 → 768×768 muted street-map WebP for the hero.
// Contiguous-US only; rounded to ~1 km so the CDN cache key is stable; cached 30 days (CDN) / 1 day (browser).
import type { APIRoute } from 'astro';
import { renderMetroMap } from '~/lib/map-tiles';

const memo = new Map<string, Buffer>();

export const GET: APIRoute = async ({ url }) => {
  const lat = Number(url.searchParams.get('lat')), lng = Number(url.searchParams.get('lng'));
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < 24 || lat > 50 || lng < -125 || lng > -66) {
    return new Response('lat/lng out of range', { status: 400 });
  }
  const key = `${lat.toFixed(2)},${lng.toFixed(2)}`;
  try {
    let buf = memo.get(key);
    if (!buf) {
      buf = await renderMetroMap(Number(lat.toFixed(2)), Number(lng.toFixed(2)));
      if (memo.size > 200) memo.delete(memo.keys().next().value as string);
      memo.set(key, buf);
    }
    return new Response(new Uint8Array(buf), { status: 200, headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'public, s-maxage=2592000, max-age=86400, stale-while-revalidate=604800' } });
  } catch {
    return new Response('map unavailable', { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
};
