// src/lib/motion.ts
// Scroll-triggered reveal motion for the redesign. Port of the handoff's
// alloy-motion.js data-attribute contract, implemented with CSS classes so it
// survives React hydration (React never touches className on SSR'd islands
// unless the component re-renders — and even then only its own props).
//
// Contract (mark a root with data-reveal; fires once at 30% visibility):
//   data-rise        children fade+rise in sequence (90ms apart)
//   data-stagger     children fade+rise in sequence (110ms apart)
//   data-count="535" data-prefix="+" data-suffix="%" data-decimals="1"
//                    counts up from 0, cubic ease-out, ≤1.6s, locale-formatted
//   data-grow        bar width 0 → var(--grow)   (set --grow inline)
//   data-bar-h       bar height 0 → var(--bar-h) (set --bar-h inline)
//   data-draw        SVG polyline/path draws left→right (needs pathLength="1")
//   data-pop         element scales in after the draw completes
//   data-fade        element fades in late
//
// Styling for the prepped/fired states lives in redesign.css under
// `[data-reveal]` / `.am-in`.

const PREP = 'am-prep';
const IN = 'am-in';

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

function reducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function formatCount(v: number, pre: string, suf: string, dec: number): string {
  const n = dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US');
  return pre + n + suf;
}

function prepCounters(root: Element) {
  root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    if (el.dataset.final === undefined) el.dataset.final = el.textContent ?? '';
    const pre = el.dataset.prefix ?? '';
    const suf = el.dataset.suffix ?? '';
    el.textContent = pre + '0' + suf;
  });
}

function runCounters(root: Element) {
  root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const raw = el.dataset.count ?? '0';
    const to = parseFloat(raw);
    const pre = el.dataset.prefix ?? '';
    const suf = el.dataset.suffix ?? '';
    const dec = el.dataset.decimals !== undefined ? parseInt(el.dataset.decimals, 10) : (raw.split('.')[1] ?? '').length;
    const finalText = el.dataset.final ?? formatCount(to, pre, suf, dec);
    if (reducedMotion() || !Number.isFinite(to)) {
      el.textContent = finalText;
      return;
    }
    const ms = Math.min(1600, 800 + to * 1.2);
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      el.textContent = formatCount(to * easeOut(p), pre, suf, dec);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = finalText;
    };
    requestAnimationFrame(tick);
  });
}

function fire(root: Element) {
  root.classList.add(IN);
  runCounters(root);
}

let observer: IntersectionObserver | null = null;
const seen = new WeakSet<Element>();

function observe(root: Element) {
  if (seen.has(root)) return;
  seen.add(root);
  if (reducedMotion() || !('IntersectionObserver' in window)) {
    root.classList.add(PREP);
    fire(root);
    return;
  }
  root.classList.add(PREP);
  prepCounters(root);
  observer!.observe(root);
}

function scan() {
  document.querySelectorAll('[data-reveal]').forEach(observe);
}

export function initMotion() {
  if (typeof window === 'undefined') return;
  if (observer) { scan(); return; }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          fire(en.target);
          observer!.unobserve(en.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  scan();
  // Islands that hydrate late (client:visible) or render new reveal roots —
  // pick them up without a page-level polling loop.
  const mo = new MutationObserver(() => scan());
  mo.observe(document.body, { childList: true, subtree: true });
}
