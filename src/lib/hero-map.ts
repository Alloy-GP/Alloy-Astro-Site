// src/lib/hero-map.ts — the hero map reacts to the metro check (hero 7a v2 §2). Mounted once from BaseLayout.
// MetroCheck (island) dispatches `alloy:metro` on window; this script, which owns the static map DOM in HeroMap:
//   checking → map layer scales 1.1 / fades to .55
//   result   → fetch /api/map?lat&lng for the metro, swap the image when loaded, scale back, pin label "Your Company · City"
//   idle     → pin label back to "Your Company" (the map stays where it is)
// Reduced motion: no zoom animation (the swap still happens).
export interface MetroEvent { phase: 'checking' | 'result' | 'idle'; name?: string; lat?: number; lng?: number }

export function initHeroMap() {
  const map = document.querySelector<HTMLElement>('.rd-hm-map');
  const layer = map?.querySelector<HTMLElement>('.rd-hm-map-layer');
  const img = layer?.querySelector<HTMLImageElement>('img');
  const city = map?.querySelector<HTMLElement>('.rd-hm-pin-city');   // " · City" (desktop inline, own line on phones)
  if (!map || !layer || !img || !city) return;
  let token = 0;

  window.addEventListener('alloy:metro', (e) => {
    const d = (e as CustomEvent<MetroEvent>).detail;
    if (d.phase === 'checking') { layer.classList.add('is-checking'); return; }
    if (d.phase === 'idle') { city.textContent = ''; layer.classList.remove('is-checking'); return; }
    // result
    city.textContent = (d.name ?? '').split(',')[0]?.trim() ?? '';
    if (typeof d.lat !== 'number' || typeof d.lng !== 'number') { layer.classList.remove('is-checking'); return; }
    const mine = ++token;
    const next = new Image();
    const done = () => { if (mine !== token) return; layer.classList.remove('is-checking'); };
    next.onload = () => { if (mine !== token) return; img.src = next.src; done(); };
    next.onerror = done;
    next.src = `/api/map?lat=${d.lat.toFixed(2)}&lng=${d.lng.toFixed(2)}`;
    window.setTimeout(done, 4000); // never leave the map dimmed if the tile server is slow
  });
}
