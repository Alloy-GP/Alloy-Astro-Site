// src/lib/mobile.ts — progressive enhancements for ≤720px (mobile-spec.md). Mounted once from BaseLayout.
// Everything here works on the server-rendered markup; nothing is required for the page to function.
//   1. Footer accordions  — .site-footer-block head rows toggle their link list (all collapsed on load).
//   2. Sticky CTA bar     — .rd-sticky-cta slides in once the hero's primary button scrolls away; hides
//                           while the footer or any form is in view (BaseLayout omits it on /contact, /contact).
//   3. Article TOC        — .rd-toc becomes a sticky "On this page · n of N" bar that opens the jump list;
//                           the purple "Want this done?" card moves inline after the second section.

const MQ = '(max-width: 720px)';

function initFooterAccordions(mq: MediaQueryList) {
  document.querySelectorAll<HTMLElement>('.site-footer-block').forEach((block) => {
    const row = block.querySelector<HTMLElement>('.site-footer-head-row');
    const btn = block.querySelector<HTMLButtonElement>('.site-footer-acc');
    if (!row || !btn) return;
    row.addEventListener('click', (e) => {
      if (!mq.matches) return; // desktop: headings are plain links
      e.preventDefault();
      const open = block.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
}

function initStickyCta(mq: MediaQueryList) {
  const bar = document.querySelector<HTMLAnchorElement>('.rd-sticky-cta');
  const main = document.querySelector('main');
  if (!bar || !main) return;

  const heroBtn = main.querySelector<HTMLElement>('.rd-section--hero :is(.rd-btn, .rd-mc-check), .rd-section--after-crumb .rd-btn, .rd-btn');
  const footer = document.querySelector('.site-footer');
  const forms = Array.from(main.querySelectorAll('form'));

  let heroOut = !heroBtn;
  let footerIn = false;
  const formsIn = new Set<Element>();

  const update = () => {
    const on = mq.matches && heroOut && !footerIn && formsIn.size === 0;
    bar.classList.toggle('is-on', on);
    bar.setAttribute('aria-hidden', String(!on));
    main.classList.toggle('has-sticky-cta', on);
  };

  if ('IntersectionObserver' in window) {
    if (heroBtn) {
      new IntersectionObserver(([e]) => {
        if (!e) return;
        heroOut = !e.isIntersecting && e.boundingClientRect.top < 0; // scrolled past, not merely below the fold
        update();
      }, { threshold: 0 }).observe(heroBtn);
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === footer) footerIn = e.isIntersecting;
        else if (e.isIntersecting) formsIn.add(e.target);
        else formsIn.delete(e.target);
      }
      update();
    }, { threshold: 0 });
    if (footer) io.observe(footer);
    forms.forEach((f) => io.observe(f));
  } else {
    heroOut = true;
  }
  mq.addEventListener('change', update);
  update();
}

function svg(path: string, size = 16) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

function initToc(mq: MediaQueryList) {
  const toc = document.querySelector<HTMLElement>('.rd-toc');
  const nav = toc?.querySelector<HTMLElement>('nav');
  const list = toc?.querySelector<HTMLElement>('.rd-toc-list');
  if (!toc || !nav || !list) return;

  const links = Array.from(list.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  const sections = links
    .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
    .filter((el): el is HTMLElement => !!el);
  if (!sections.length) return;

  // Sticky bar (built once; mobile.css shows it ≤720 and hides the list until .is-open)
  const bar = document.createElement('button');
  bar.type = 'button';
  bar.className = 'rd-toc-bar';
  bar.setAttribute('aria-expanded', 'false');
  bar.innerHTML =
    `<span class="rd-toc-bar-icon">${svg('<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>', 16)}</span>` +
    `<span class="rd-toc-bar-title">On this page</span>` +
    `<span class="rd-toc-bar-progress"><span class="rd-toc-bar-count">1 of ${sections.length}</span>${svg('<polyline points="6 9 12 15 18 9"/>', 16)}</span>`;
  nav.insertBefore(bar, nav.firstChild);
  const count = bar.querySelector<HTMLElement>('.rd-toc-bar-count')!;

  const setOpen = (open: boolean) => {
    toc.classList.toggle('is-open', open);
    bar.setAttribute('aria-expanded', String(open));
  };
  bar.addEventListener('click', () => setOpen(!toc.classList.contains('is-open')));
  links.forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  // Progress: the last section whose top has passed the bar
  let current = -1;
  const measure = () => {
    const line = 130; // header (60) + bar (52) + a little
    let idx = 0;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i]!;
      if (s.getBoundingClientRect().top <= line) idx = i;
    }
    if (idx === current) return;
    current = idx;
    count.textContent = `${idx + 1} of ${sections.length}`;
    links.forEach((a, i) => a.classList.toggle('is-current', i === idx));
  };
  let raf = 0;
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; measure(); }); };
  window.addEventListener('scroll', onScroll, { passive: true });
  measure();

  // "Want this done?" card: sidebar on desktop, inline after the second section on mobile
  const card = Array.from(toc.children).find((el) => el !== nav && el.classList.contains('rd-bg-purple')) as HTMLElement | undefined;
  const placeCard = () => {
    if (!card) return;
    if (mq.matches && sections.length >= 2) {
      card.classList.add('rd-toc-card--inline');
      sections[1]!.after(card);
    } else if (card.parentElement !== toc) {
      card.classList.remove('rd-toc-card--inline');
      toc.appendChild(card);
    }
  };
  placeCard();
  mq.addEventListener('change', () => { placeCard(); setOpen(false); });
}

export function initMobile() {
  const mq = window.matchMedia(MQ);
  initFooterAccordions(mq);
  initStickyCta(mq);
  initToc(mq);
}
