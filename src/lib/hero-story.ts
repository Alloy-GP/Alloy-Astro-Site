// src/lib/hero-story.ts — the homepage hero's three "search moments" play one at a time (client, 2026-10-01:
// subtle and simple). Progressive enhancement: the final state is server-rendered; with JS the pieces hide
// (CSS keyed on html.js + .rd-hc-moments:not(.is-done)) until their turn. Reduced motion → static.
//   1. Google: the query types out → the #1 result pops in → competitor rows fade in.
//   2. AI: the question types out → thinking dots → the answer slides in → the sentence fades in.
//   3. Referral: the board request fades in → "Searching for a match…" sweep → the match pops in, check draws.
const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

function type(el: HTMLElement, text: string, speed: number) {
  return new Promise<void>((resolve) => {
    let i = 0;
    el.textContent = '​'; // keep the line box while empty
    el.classList.add('is-typing');
    const tick = () => {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i < text.length) window.setTimeout(tick, speed + Math.random() * 24);
      else { el.classList.remove('is-typing'); el.classList.add('is-typed'); resolve(); }
    };
    window.setTimeout(tick, 140);
  });
}

export function initHeroStory() {
  const root = document.querySelector<HTMLElement>('.rd-hc-moments[data-story]');
  if (!root) return;
  const done = () => root.classList.add('is-done');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { done(); return; }

  const [m1, m2, m3] = Array.from(root.children) as HTMLElement[];
  if (!m1 || !m2 || !m3) { done(); return; }
  root.classList.add('is-armed');

  const q = (el: HTMLElement, sel: string) => el.querySelector<HTMLElement>(sel);
  const show = (el: HTMLElement | null) => el?.classList.add('is-in');

  const run = async () => {
    const p1 = q(m1, '[data-type]'); const t1 = p1?.textContent?.trim() ?? '';
    const p2 = q(m2, '[data-type]'); const t2 = p2?.textContent?.trim() ?? '';

    await wait(500);
    if (p1) await type(p1, t1, 26);
    await wait(260);
    show(q(m1, '[data-anim="pop"]'));
    for (const s of Array.from(m1.querySelectorAll<HTMLElement>('[data-anim="fade"]'))) { await wait(170); show(s); }

    await wait(1000);
    if (p2) await type(p2, t2, 22);
    const thinking = q(m2, '.rd-hc-thinking');
    if (thinking) thinking.hidden = false;
    await wait(950);
    if (thinking) thinking.hidden = true;
    show(q(m2, '[data-anim="slide"]'));
    await wait(320);
    show(q(m2, '[data-anim="fade"]'));

    await wait(1000);
    show(q(m3, '[data-anim="fade"]'));
    await wait(650);
    const searching = q(m3, '.rd-hc-searching');
    if (searching) searching.hidden = false;
    await wait(1400);
    if (searching) searching.hidden = true;
    show(q(m3, '[data-anim="pop"]'));

    await wait(800);
    done();
  };

  if (!('IntersectionObserver' in window)) { void run(); return; }
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { io.disconnect(); void run(); }
  }, { threshold: 0.35 });
  io.observe(root);
}
