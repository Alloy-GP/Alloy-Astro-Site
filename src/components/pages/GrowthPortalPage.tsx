import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

// ---------------------------------------------------------------------------
// Hero carousel copy map — headline + lead rotate in sync with active widget.
// ---------------------------------------------------------------------------
const heroCopyMap: Record<string, { t: string; l: string }> = {
  'wid-pv': {
    t: 'Finally,<br>growth you can<br><span style="color:var(--alloy-yellow);">actually see.</span>',
    l: 'Revenue created, leads qualified, and ROI you can watch climb. The live numbers that prove the partnership pays for itself.',
  },
  'wid-aq': {
    t: 'Act on every<br>lead while it\'s<br>still <span style="color:var(--alloy-pink);">warm.</span>',
    l: 'Leads to qualify and anything we need from you, surfaced in one place, so you can act fast and never wonder whether you\'re holding a project up.',
  },
  'wid-pb': {
    t: 'Watch the plan<br>turn into<br><span style="color:var(--alloy-yellow);">progress.</span>',
    l: 'Every project we\'re driving this quarter, tracked live: what\'s done, what\'s next, and exactly how far along we are.',
  },
};
const WIDGET_KEYS = ['wid-pv', 'wid-aq', 'wid-pb'];

// "Inside the portal" tab metadata — title + intro swap per tab.
const gpMeta = [
  { t: 'Five screens. Our whole partnership.', d: 'Everything we do for your firm, organized into one calm, always-current view, built for board members and owners, not analysts.' },
  { t: 'Every lead. Every dollar. Live.', d: 'The screen that ends the “is it working?” conversation: qualified-lead pace, real-dollar value, and exactly where every lead came from.' },
  { t: 'The plan (and the proof you’re on it.', d: 'Growth isn’t one campaign) it’s a journey across every market you serve. The roadmap shows where each market sits.' },
  { t: 'Watch the work get done.', d: 'The engine room: every project we’re driving this quarter, what’s waiting on you, and how far along each one is.' },
  { t: 'Every message and request, in one thread.', d: 'No more lost emails or “did you get my note?” · a full ticket and messaging system, every conversation tracked against the work it belongs to.' },
];

const TAB_LABELS = ['Home', 'Partnership', 'Roadmap', 'Playbook', 'Messages'];

export default function GrowthPortalPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [czIdx, setCzIdx] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [formError, setFormError] = useState('');
  const [formFirst, setFormFirst] = useState('');
  const animatedWidgets = useRef<Set<number>>(new Set());
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroLeadRef = useRef<HTMLParagraphElement>(null);

  const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- fitMocks: scale fixed-width portal mockups to fit their column ----
  const fitMocks = () => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>('.gp-hero-art, .gp-showcase-art').forEach((c) => {
      const f = c.querySelector<HTMLElement>('.gp-frame, .gp-carousel');
      if (!f) return;
      // Clear any height we set on a prior run: when the container is a flex
      // box (showcase-art) a stale height collapses the mock via align-items
      // stretch, so the natH read below would be wrong. Reset, measure, scale.
      c.style.height = '';
      f.style.transform = 'none';
      const natW = f.offsetWidth;
      const natH = f.offsetHeight;
      const avail = c.clientWidth;
      const s = Math.min(1, avail / natW);
      f.style.transform = 'scale(' + s + ')';
      c.style.height = Math.ceil(natH * s) + 'px';
    });
  };

  // ---- count-up number animation (cubic ease-out, ~1100ms) ----
  const animNum = (el: HTMLElement) => {
    const target = parseFloat(el.getAttribute('data-target') || '');
    if (isNaN(target)) return;
    const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    const pre = el.getAttribute('data-prefix') || '';
    const suf = el.getAttribute('data-suffix') || '';
    const dur = 1100;
    let start: number | null = null;
    const finalTxt = el.textContent || '';
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      el.textContent = pre + (target * ease(p)).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = finalTxt;
    };
    requestAnimationFrame(step);
  };

  // ---- swap hero copy with a fade ----
  const setHeroCopy = (key: string, animate: boolean) => {
    const c = heroCopyMap[key];
    const titleEl = heroTitleRef.current;
    const leadEl = heroLeadRef.current;
    const copyEl = heroCopyRef.current;
    if (!c || !titleEl || !leadEl) return;
    if (animate && copyEl && !prefersReduced()) {
      copyEl.style.opacity = '0';
      window.setTimeout(() => {
        titleEl.innerHTML = c.t;
        leadEl.innerHTML = c.l;
        copyEl.style.opacity = '1';
      }, 200);
    } else {
      titleEl.innerHTML = c.t;
      leadEl.innerHTML = c.l;
    }
  };

  // ---- show a carousel slide ----
  const czShow = (n: number) => {
    const root = rootRef.current;
    if (!root) return;
    const slides = Array.from(root.querySelectorAll<HTMLElement>('.gp-cz-track .gp-wid'));
    const total = slides.length || WIDGET_KEYS.length;
    const idx = ((n % total) + total) % total;
    setCzIdx(idx);
    const key = WIDGET_KEYS[idx];
    setHeroCopy(key, true);
    const cur = slides[idx];
    if (cur && !animatedWidgets.current.has(idx)) {
      animatedWidgets.current.add(idx);
      if (!prefersReduced()) cur.querySelectorAll<HTMLElement>('.gp-num').forEach(animNum);
    }
    requestAnimationFrame(fitMocks);
  };

  // ---- initial carousel + fitMocks + lottie + scroll-in observers ----
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Set initial hero copy without animation.
    setHeroCopy(WIDGET_KEYS[0], false);

    // First-reveal count-up for the initial (visible) widget.
    if (!animatedWidgets.current.has(0) && !prefersReduced()) {
      animatedWidgets.current.add(0);
      const first = root.querySelector<HTMLElement>('.gp-cz-track .gp-wid');
      if (first) first.querySelectorAll<HTMLElement>('.gp-num').forEach(animNum);
    } else {
      animatedWidgets.current.add(0);
    }

    fitMocks();

    const onResize = () => fitMocks();
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => fitMocks());
    }

    // ResizeObserver on the host element keeps mockups fitted on layout shifts.
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => fitMocks());
      ro.observe(root);
    }

    // Lottie cool-face on the Partnership Value widget.
    let lottieAnim: { destroy: () => void } | null = null;
    const lottieEl = root.querySelector<HTMLElement>('#pvSmileLottie');
    if (lottieEl) {
      import('lottie-web')
        .then((mod) => {
          const lottie = (mod as { default?: unknown }).default ?? mod;
          try {
            lottieAnim = (lottie as {
              loadAnimation: (cfg: Record<string, unknown>) => { destroy: () => void };
            }).loadAnimation({
              container: lottieEl,
              renderer: 'svg',
              loop: true,
              autoplay: !prefersReduced(),
              path: '/assets/cool-face.json',
            });
          } catch (e) {
            /* noop */
          }
        })
        .catch(() => {});
    }

    // Scroll-in animations (.gp-anim -> .in-view).
    const animEls = root.querySelectorAll<HTMLElement>('.gp-anim');
    let io: IntersectionObserver | null = null;
    if (animEls.length) {
      if ('IntersectionObserver' in window) {
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add('in-view');
                io?.unobserve(e.target);
              }
            });
          },
          { threshold: 0.25 }
        );
        animEls.forEach((el) => io?.observe(el));
      } else {
        animEls.forEach((el) => el.classList.add('in-view'));
      }
    }

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      ro?.disconnect();
      io?.disconnect();
      lottieAnim?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- tab change: swap title/intro, re-trigger anim, stagger notes, refit ----
  const showGpTab = (i: number) => {
    setActiveTab(i);
    const root = rootRef.current;
    if (!root) return;
    const titleEl = root.querySelector<HTMLElement>('#gpTitle');
    const introEl = root.querySelector<HTMLElement>('#gpIntro');
    const swap = (el: HTMLElement | null) => {
      if (!el) return;
      el.classList.remove('gp-swap');
      void el.offsetWidth;
      el.classList.add('gp-swap');
    };
    swap(titleEl);
    swap(introEl);

    const panels = root.querySelectorAll<HTMLElement>('.gp-tabpanels > .gp-showcase');
    const panel = panels[i];
    if (panel) {
      // Re-trigger entrance animations on active panel.
      panel.querySelectorAll<HTMLElement>('.gp-anim').forEach((a) => a.classList.add('in-view'));
      const art = panel.querySelector<HTMLElement>('.gp-showcase-art');
      swap(art);
      panel.querySelectorAll<HTMLElement>('.gp-tour-note').forEach((n, ni) => {
        n.classList.remove('gp-note-anim');
        void n.offsetWidth;
        n.style.animationDelay = (0.1 + ni * 0.07) + 's';
        n.classList.add('gp-note-anim');
      });
      requestAnimationFrame(fitMocks);
      window.setTimeout(fitMocks, 70);
    }
  };

  // ---- FAQ accordion: only one open at a time ----
  const onFaqToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const d = e.currentTarget;
    if (!d.open) return;
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLDetailsElement>('.gp-faq details').forEach((other) => {
      if (other !== d) other.open = false;
    });
  };

  // ---- walkthrough form: posts to /api/lead (same pipeline as Get Started) ----
  // State-driven so React owns the UI — imperative DOM writes get wiped by the
  // carousel/animation re-renders, so status + message live in state.
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (typeof f.checkValidity === 'function' && !f.checkValidity()) {
      f.reportValidity();
      return;
    }
    const nameEl = f.querySelector<HTMLInputElement>('[name="name"]');
    const first = nameEl && nameEl.value ? nameEl.value.trim().split(' ')[0] : '';

    // Reuse the site's existing lead pipeline (/api/lead → Resend + Mailchimp,
    // same recipients as the Get Started form). Map the walkthrough-specific
    // fields (market + interest) into the `goal` field that endpoint reads.
    const fd = new FormData(f);
    const plan = (fd.get('plan') || '').toString().trim();
    const market = (fd.get('market') || '').toString().trim();
    const goalParts = ['Growth Portal walkthrough request'];
    if (plan) goalParts.push('interested in: ' + plan);
    if (market) goalParts.push('primary market: ' + market);
    fd.append('goal', goalParts.join(' · '));
    try {
      const utm = new URLSearchParams(window.location.search).toString();
      fd.append('source', [
        'page: ' + window.location.href,
        'referrer: ' + (document.referrer || 'No'),
        utm ? 'utm: ' + utm : '',
      ].filter(Boolean).join('\n'));
    } catch {
      /* ignore */
    }

    setFormError('');
    setFormStatus('sending');
    try {
      const res = await fetch('/api/lead', { method: 'POST', body: fd });
      if (!res.ok) {
        let err = `Something went wrong (${res.status}). Please try again.`;
        try { const j = await res.json(); if (j?.error) err = j.error; } catch { /* ignore */ }
        throw new Error(err);
      }
      setFormFirst(first);
      setFormStatus('done');
    } catch (err) {
      setFormStatus('idle');
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div ref={rootRef} className="growth-portal-page" data-herobg="dark" data-shot="frame">
      {/* ============ HERO ============ */}
      <section className="gp-hero">
        <div className="gp-hero-grid-line"></div>
        <div className="gp-hero-glow"></div>
        <div className="gp-hero-inner">
          <div>
            <div className="gp-eyebrow-dot">
              <span className="dot"></span>
              <span className="lbl">Introducing CAM Growth Portal <span className="by">by Alloy</span></span>
            </div>

            <div className="gp-hero-copy" id="heroCopy" ref={heroCopyRef}>
              <h1 className="display-xl" id="heroTitle" ref={heroTitleRef} style={{ margin: '0 0 22px' }}>
                Finally,<br />growth you can<br />
                <span style={{ color: 'var(--alloy-yellow)' }}>actually see.</span>
              </h1>
              <p className="lead on-dark" id="heroLead" ref={heroLeadRef} style={{ marginBottom: 28, maxWidth: 540 }}>
                Revenue created, leads qualified, and ROI you can watch climb. The live numbers that prove the partnership pays for itself, updated in real time.
              </p>
            </div>

            <div className="gp-incl-pill">
              <span className="chk">✓</span> <span><b>Included free</b> with every BoardSuite plan</span>
            </div>

            <div className="gp-hero-cta-row">
              <a className="btn btn-primary btn-arrow" href="#get-started">Get started</a>
              <a className="btn btn-secondary on-dark" href="#inside">See what's inside</a>
            </div>

            <div className="gp-hero-stats">
              <div className="item"><div className="v">Real-time</div><div className="k">leads &amp; results, not monthly PDFs</div></div>
              <div className="item"><div className="v">One screen</div><div className="k">roadmap, leads, projects &amp; ROI</div></div>
              <div className="item"><div className="v">$0 extra</div><div className="k">included with every plan</div></div>
            </div>
          </div>

          {/* Floating standalone widgets */}
          <div className="gp-hero-art">
            <div className="gp-carousel">
              <div className="gp-cz-track">
                {/* Partnership Value */}
                <div className={'gp-wid wid-pv' + (czIdx === 0 ? ' active' : '')}>
                  <div className="wid-head">
                    <div className="wid-ic pv"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l5.5-5.5 4 4L21 8" /><path d="M15 8h6v6" /></svg></div>
                    <div className="wid-htext">
                      <div className="wid-eb">What we've built together</div>
                      <div className="wid-ttl">Partnership Value</div>
                    </div>
                    <div className="wid-arrow pink"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 12h14" /><path d="M12.5 6l6 6-6 6" /></svg></div>
                  </div>
                  <div className="pv-grid">
                    <div className="pv-stat purple"><span className="info">i</span><div className="v gp-num" data-target="74">74</div><div className="k">Qualified leads</div><div className="s">since June 2025</div></div>
                    <div className="pv-stat blue"><span className="info">i</span><div className="v gp-num" data-target="1.16" data-prefix="$" data-suffix="M" data-dec="2">$1.16M</div><div className="k">Total quote value</div><div className="s">contract revenue</div></div>
                    <div className="pv-stat green"><span className="info">i</span><div className="v gp-num" data-target="2.39" data-prefix="$" data-suffix="M" data-dec="2">$2.39M</div><div className="k">Revenue created</div><div className="s">lifetime, closed</div></div>
                    <div className="pv-stat pink"><span className="info">i</span><div className="v gp-num" data-target="1.92" data-prefix="+$" data-suffix="M" data-dec="2">+$1.92M</div><div className="k">Projected firm value</div><div className="s">firm value increased</div></div>
                  </div>
                  <div className="pv-smile">
                    <div className="emo" id="pvSmileLottie"></div>
                    <div className="num gp-num" data-target="75">75</div>
                    <div className="lbl">Times we made you<br />smile this quarter</div>
                  </div>
                </div>

                {/* Action Queue */}
                <div className={'gp-wid wid-aq' + (czIdx === 1 ? ' active' : '')}>
                  <div className="wid-head">
                    <div className="wid-ic aq"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6.5l-1 8L19 10h-6.5l.5-8Z" /></svg></div>
                    <div className="wid-htext">
                      <div className="wid-eb">Waiting on you</div>
                      <div className="wid-ttl">Your Action Queue</div>
                    </div>
                    <div className="wid-arrow purple"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 12h14" /><path d="M12.5 6l6 6-6 6" /></svg></div>
                  </div>
                  <div className="aq-hero">
                    <div className="num gp-num" data-target="12">12</div>
                    <div className="lbl">Leads to<br />Qualify</div>
                    <div className="qbtn">Qualify Now</div>
                  </div>
                  <div className="aq-sub">Awaiting your reply <span className="cnt">9</span></div>
                  <div className="aq-row"><span className="dot"></span><span className="nm">Email Signature</span><span className="age">5d</span><span className="chev">›</span></div>
                  <div className="aq-row"><span className="dot"></span><span className="nm">LinkedIn Request</span><span className="age">6d</span><span className="chev">›</span></div>
                  <div className="aq-row"><span className="dot"></span><span className="nm">Social Media Access and Posting</span><span className="age">6d</span><span className="chev">›</span></div>
                  <div className="aq-fade">
                    <div className="aq-row"><span className="dot"></span><span className="nm">Website Form Submissions</span><span className="age">25d</span><span className="chev">›</span></div>
                    <div className="aq-more">⌄ 5 more</div>
                  </div>
                </div>

                {/* Quarterly Playbook */}
                <div className={'gp-wid wid-pb' + (czIdx === 2 ? ' active' : '')}>
                  <div className="wid-head">
                    <div className="wid-ic pb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /><path d="M10 2v8l3-2 3 2V2" /></svg></div>
                    <div className="wid-htext">
                      <div className="wid-eb">Q2 2026</div>
                      <div className="wid-ttl">Quarterly Playbook</div>
                    </div>
                    <div className="wid-arrow purple"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 12h14" /><path d="M12.5 6l6 6-6 6" /></svg></div>
                  </div>
                  <div className="pb-top">
                    <div className="pct"><span className="gp-num" data-target="89">89</span><span>%</span></div>
                    <div className="pb-desc">of this quarter's<br />work is complete</div>
                    <span className="pb-badge">● On track</span>
                  </div>
                  <div className="pb-scope"><span>Scope · 79 tasks</span><span className="vs">+132% vs plan</span></div>
                  <div className="pb-bars">
                    <div>
                      <div className="row"><span className="lbl">Planned</span><span className="n">34</span></div>
                      <div className="pb-bar"><i className="done" style={{ width: '74%' }}>25</i><i className="rem" style={{ width: '26%' }}>9</i></div>
                    </div>
                    <div className="pb-div"></div>
                    <div className="pb-added"><span className="lbl">Added</span><span className="pill">45</span></div>
                  </div>
                  <div className="pb-toolkit-head"><span>Alloy toolkit · 4 systems</span><span className="on">1 on</span></div>
                  <div className="pb-tools">
                    <div className="pb-tool">Proposal System <span className="on-pill">ON</span></div>
                    <div className="pb-tool off">Review Program <span className="lock">🔒</span></div>
                    <div className="pb-tool off">Board Surveys <span className="lock">🔒</span></div>
                    <div className="pb-tool off">Staff Surveys <span className="lock">🔒</span></div>
                  </div>
                </div>
              </div>
              <button className="cz-arrow cz-prev" type="button" aria-label="Previous" onClick={() => czShow(czIdx - 1)}>←</button>
              <button className="cz-arrow cz-next" type="button" aria-label="Next" onClick={() => czShow(czIdx + 1)}>→</button>
              <div className="gp-cz-nav">
                <div className="cz-dots">
                  {WIDGET_KEYS.map((k, i) => (
                    <span key={k} className={i === czIdx ? 'on' : ''} onClick={() => czShow(i)}></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accent-bar"><div></div><div></div><div></div><div></div><div></div></div>
      </section>

      {/* ============ WHY ============ */}
      <section className="section section-white gp-why">
        <div className="container">
          <div className="gp-head">
            <span className="eyebrow no-line">Why we built it</span>
            <h2 className="display-lg">You shouldn't have to take<br />our word for it.</h2>
            <p className="lead">Marketing is the easiest place in the world to hide. We took the opposite bet: open the books, show the work, and let the results speak. The portal is where our partnership lives in the open.</p>
          </div>
          <div className="gp-tri">
            <div className="gp-tri-card">
              <div className="ic pink"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3.2" /></svg></div>
              <h3>See the work, as it happens</h3>
              <p>No "trust us, we're on it." Every project, subtask, and deadline we're driving for you is visible and updated live, not summarized in a slide three weeks later.</p>
            </div>
            <div className="gp-tri-card">
              <div className="ic green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h6.5l-1 8L19 10h-6.5l.5-8Z" /></svg></div>
              <h3>Act on leads in real time</h3>
              <p>The moment a board fills out a form, it lands in your queue. Qualify, sort, and follow up the same day, while the lead is still warm.</p>
            </div>
            <div className="gp-tri-card">
              <div className="ic blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l5.5-5.5 4 4L21 8" /><path d="M15 8h6v6" /></svg></div>
              <h3>Prove the value, every quarter</h3>
              <p>Revenue created, quote value, projected firm value. The numbers that justify the spend, totalled and always on. Renewals built on proof, not faith.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INSIDE THE PORTAL — SHOWCASES ============ */}
      <section id="inside" className="section section-ivory">
        <div className="container">
          <div className="gp-head center">
            <span className="eyebrow no-line">Inside the portal</span>
            <h2 className="display-lg" id="gpTitle">Five screens. Our whole partnership.</h2>
            <p className="lead" id="gpIntro">Everything we do for your firm, organized into one calm, always-current view, built for board members and owners, not analysts.</p>
          </div>

          <div className="gp-tabs" role="tablist">
            {TAB_LABELS.map((label, i) => (
              <button
                key={label}
                className={'gp-tab' + (activeTab === i ? ' is-active' : '')}
                onClick={() => showGpTab(i)}
                type="button"
              >
                <span className="t-num">{String(i + 1).padStart(2, '0')}</span> {label}
              </button>
            ))}
          </div>

          <div className="gp-tabpanels">
            {/* 01 Home (annotated) */}
            <div className={'gp-showcase gp-tour gp-bare' + (activeTab === 0 ? ' is-active' : '')}>
              <div className="gp-panel-head">
                <h3>{gpMeta[0].t}</h3>
                <p>{gpMeta[0].d}</p>
              </div>
              <div className="gp-tour-stage">
                <div className="gp-tour-note left p1"><b>Welcome, by name</b><span>Your quarter, goal and date the moment you land.</span></div>
                <div className="gp-tour-note left p2"><b>Value, always on</b><span>Revenue created and firm value, totalled live.</span></div>
                <div className="gp-showcase-art">
                  <div className="gp-frame">
                    <div className="gp-frame-chrome">
                      <div className="gp-frame-dots"><span></span><span></span><span></span></div>
                      <div className="gp-frame-url"><span className="lock">🔒</span> growth.alloygp.co</div>
                    </div>
                    <div className="gp-panel gp-anim" style={{ padding: 18 }}>
                      <div className="gp-welcome" style={{ marginBottom: 14 }}>
                        <div className="gp-welcome-top"><i></i><i></i><i></i><i></i></div>
                        <div className="gp-welcome-head">
                          <div className="gp-welcome-av">👤</div>
                          <h3 style={{ fontSize: 24 }}>Welcome back, John.</h3>
                        </div>
                        <div className="gp-welcome-row">
                          <span className="gp-roadmap-btn">View roadmap →</span>
                          <div className="gp-welcome-stat"><div className="k">Current quarter</div><div className="v">Q2 2026 · June 22</div></div>
                          <div className="gp-welcome-stat"><div className="k">Goal</div><div className="v">3 of 30 boards signed</div></div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
                        <div className="gp-card">
                          <div className="gp-card-head"><div style={{ display: 'flex', gap: 10 }}><div className="ic" style={{ background: 'var(--alloy-yellow-tint)', color: '#8a6d12' }}>⚡</div><div><div className="eyebrow-sm">Waiting on you</div><div className="ttl">Action Queue</div></div></div></div>
                          <div className="gp-leadbox"><div className="big">12</div><div className="lbl">Leads to<br />qualify</div><span className="qbtn">Qualify</span></div>
                        </div>
                        <div className="gp-card">
                          <div className="gp-card-head"><div style={{ display: 'flex', gap: 10 }}><div className="ic" style={{ background: 'var(--alloy-pink-tint)', color: 'var(--alloy-pink)' }}>↗</div><div><div className="eyebrow-sm">Built together</div><div className="ttl">Partnership Value</div></div></div></div>
                          <div className="gp-pv-grid">
                            <div className="gp-pv green"><div className="v">$2.39M</div><div className="k">Revenue created</div></div>
                            <div className="gp-pv pink"><div className="v">+$1.92M</div><div className="k">Firm value</div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gp-tour-note right p3"><b>Action queue, front &amp; center</b><span>Exactly what is waiting on you, 12 leads to qualify.</span></div>
                <div className="gp-tour-note right p4"><b>One tap to the plan</b><span>Jump straight to the full roadmap whenever you want.</span></div>
              </div>
            </div>

            {/* 02 Partnership (annotated) */}
            <div className={'gp-showcase gp-tour gp-bare' + (activeTab === 1 ? ' is-active' : '')}>
              <div className="gp-panel-head">
                <h3>{gpMeta[1].t}</h3>
                <p>{gpMeta[1].d}</p>
              </div>
              <div className="gp-tour-stage">
                <div className="gp-tour-note left p1"><b>Leads waiting on you</b><span>12 ready to qualify in a single click.</span></div>
                <div className="gp-tour-note left p2"><b>Win rate, live</b><span>26% of quotes signed, tracked continuously.</span></div>
                <div className="gp-showcase-art">
                  <div className="gp-frame">
                    <div className="gp-frame-chrome">
                      <div className="gp-frame-dots"><span></span><span></span><span></span></div>
                      <div className="gp-frame-url"><span className="lock">🔒</span> growth.alloygp.co/partnership</div>
                    </div>
                    <div className="gp-panel gp-anim">
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
                        <div>
                          <div className="gp-leads-banner">
                            <div className="n">12</div>
                            <div><div className="eb">Partnership growth · live</div><h4>Leads waiting on you</h4></div>
                          </div>
                          <div className="gp-leadrow">
                            <div className="doc">▦</div>
                            <div className="who">
                              <div className="nm">Lorraine <span>· 2208 Postoffice St Condos</span></div>
                              <div className="meta"><span style={{ color: '#8a6d12' }}>● management.co</span> · Quote Form · Jun 14</div>
                              <div className="gp-pills"><span className="gp-pillsm">29 units</span><span className="gp-pillsm">High-Rise</span><span className="gp-pillsm ok">Board ✓</span></div>
                            </div>
                            <span className="gp-qnow">Qualify</span>
                          </div>
                        </div>
                        <div className="gp-roi">
                          <div className="gp-roi-card">
                            <div className="eb">Qualified leads · 2026</div>
                            <div className="gp-roi-big"><div className="v">42</div><span className="gp-roi-tag">↗ 10 ahead of '25 pace</span></div>
                            <div className="gp-roi-bars">
                              <div className="gp-roi-barline"><span>2026</span><span className="track"><i style={{ width: '100%', background: 'var(--alloy-pink)' }}></i></span><span>42</span></div>
                              <div className="gp-roi-barline"><span>2025</span><span className="track"><i style={{ width: '76%', background: '#c9c1d6' }}></i></span><span>32</span></div>
                            </div>
                          </div>
                          <div className="gp-roi-2">
                            <div className="gp-roi-card blue"><div className="eb" style={{ color: '#2f7fc0' }}>Quote value</div><div className="v2">$493K<span style={{ fontSize: 13, color: 'var(--fg-muted)' }}>/yr</span></div><div className="s">from 26 open leads</div></div>
                            <div className="gp-roi-card green"><div className="eb" style={{ color: '#2c6a62' }}>Sales value</div><div className="v2">$204K<span style={{ fontSize: 13, color: 'var(--fg-muted)' }}>/yr</span></div><div className="s">from 9 leads in 2026</div></div>
                          </div>
                          <div className="gp-roi-card">
                            <div className="eb" style={{ color: '#8a6d12' }}>Win rate</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: 'var(--alloy-purple)', letterSpacing: '-0.02em' }}>26%</div>
                              <span className="track" style={{ flex: 1, height: 9, borderRadius: 999, background: '#ece7f2', overflow: 'hidden' }}><i style={{ display: 'block', width: '26%', height: '100%', background: 'linear-gradient(90deg,var(--alloy-pink),var(--alloy-yellow))', borderRadius: 999 }}></i></span>
                            </div>
                            <div className="s" style={{ fontSize: 10, color: 'var(--fg-muted)', marginTop: 6 }}>9 of 35 quotes signed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gp-tour-note right p3"><b>Pace vs. last year</b><span>42 qualified leads, 10 ahead of last year.</span></div>
                <div className="gp-tour-note right p4"><b>Real-dollar value</b><span>$493K in quote value, $204K in sales.</span></div>
              </div>
            </div>

            {/* 03 Roadmap (annotated) */}
            <div className={'gp-showcase gp-tour gp-bare' + (activeTab === 2 ? ' is-active' : '')}>
              <div className="gp-panel-head">
                <h3>{gpMeta[2].t}</h3>
                <p>{gpMeta[2].d}</p>
              </div>
              <div className="gp-tour-stage">
                <div className="gp-tour-note left p1"><b>Foundation → Dominance</b><span>Every market you serve, mapped across all five stages.</span></div>
                <div className="gp-tour-note left p2"><b>Delivered &amp; counted</b><span>Quarter-by-quarter initiatives, 126 in Q1, 79 this quarter.</span></div>
                <div className="gp-showcase-art">
                  <div className="gp-frame">
                    <div className="gp-frame-chrome">
                      <div className="gp-frame-dots"><span></span><span></span><span></span></div>
                      <div className="gp-frame-url"><span className="lock">🔒</span> growth.alloygp.co/roadmap</div>
                    </div>
                    <div className="gp-panel gp-anim">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--alloy-purple)', color: '#fff', display: 'grid', placeItems: 'center' }}>↗</div><span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--alloy-purple)' }}>The growth journey</span></div>
                        <div style={{ textAlign: 'right' }}><span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: 'var(--alloy-purple)' }}>4</span> <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>active markets</span></div>
                      </div>
                      <div className="gp-journey-head">
                        <span></span><span className="stage">Foundation</span><span className="stage">Traction</span><span className="stage">Momentum</span><span className="stage">Expansion</span><span className="stage">Dominance</span>
                      </div>
                      <div className="gp-journey-row">
                        <div className="loc"><div className="nm">⌖ Los Angeles, CA</div><div className="sub">HQ · 10 years in</div></div>
                        <div className="gp-track"><span className="gp-node done">✓</span><span className="seg done"></span><span className="gp-node done">✓</span><span className="seg done"></span><span className="gp-node done">✓</span><span className="seg active"></span><span className="gp-node now"></span><span className="seg"></span><span className="gp-node future"></span></div>
                      </div>
                      <div className="gp-journey-row">
                        <div className="loc"><div className="nm">⌖ San Diego, CA</div><div className="sub">1 year in</div></div>
                        <div className="gp-track"><span className="gp-node done">✓</span><span className="seg active"></span><span className="gp-node now"></span><span className="seg"></span><span className="gp-node future"></span><span className="seg"></span><span className="gp-node future"></span><span className="seg"></span><span className="gp-node future"></span></div>
                      </div>
                      <div className="gp-journey-row">
                        <div className="loc"><div className="nm">⌖ San Francisco, CA</div><div className="sub">5 months in</div></div>
                        <div className="gp-track"><span className="gp-node done">✓</span><span className="seg active"></span><span className="gp-node now"></span><span className="seg"></span><span className="gp-node future"></span><span className="seg"></span><span className="gp-node future"></span><span className="seg"></span><span className="gp-node future"></span></div>
                      </div>
                      <div className="gp-cycle">
                        <div className="gp-cycle-eb">The growth engine</div>
                        <h4>Program roadmap · the 90-day cycle</h4>
                        <div className="gp-cycle-grid">
                          <div className="gp-qcard done"><div className="qhead"><span className="q">Q4</span><span className="st done">Complete</span></div><div className="dt">Oct–Dec 2025</div><div className="kpi">67</div><div className="kpi-sub">key initiatives · 100%</div><div className="prog"><i style={{ width: '100%', background: '#2c8a6d' }}></i></div></div>
                          <div className="gp-qcard done"><div className="qhead"><span className="q">Q1</span><span className="st done">Complete</span></div><div className="dt">Jan–Mar 2026</div><div className="kpi">126</div><div className="kpi-sub">key initiatives · 100%</div><div className="prog"><i style={{ width: '100%', background: '#2c8a6d' }}></i></div></div>
                          <div className="gp-qcard now"><div className="qhead"><span className="q">Q2</span><span className="st now">In progress</span></div><div className="dt">Apr–Jun 2026</div><div className="kpi">79</div><div className="kpi-sub">70 of 79 · 89%</div><div className="prog"><i style={{ width: '89%', background: 'var(--alloy-pink)' }}></i></div></div>
                          <div className="gp-qcard locked"><div className="qhead"><span className="q">Q3</span><span className="st next">Up next</span></div><div className="dt">Jul–Sep 2026</div><div className="kpi" style={{ color: 'var(--fg-muted)' }}>🔒</div><div className="kpi-sub">Plan locks at kickoff</div><div className="prog"><i style={{ width: 0 }}></i></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gp-tour-note right p3"><b>The 90-day cycle</b><span>Plan, build, prove. The engine that drives every quarter.</span></div>
                <div className="gp-tour-note right p4"><b>Live stage per market</b><span>See exactly where Los Angeles, San Diego and San Francisco sit.</span></div>
              </div>
            </div>

            {/* 04 Playbook (annotated) */}
            <div className={'gp-showcase gp-tour gp-bare' + (activeTab === 3 ? ' is-active' : '')}>
              <div className="gp-panel-head">
                <h3>{gpMeta[3].t}</h3>
                <p>{gpMeta[3].d}</p>
              </div>
              <div className="gp-tour-stage">
                <div className="gp-tour-note left p1"><b>Live project list</b><span>Every initiative with subtasks and due dates.</span></div>
                <div className="gp-tour-note left p2"><b>Tagged by engine</b><span>Reach, Match, Retain. Filter to what matters.</span></div>
                <div className="gp-showcase-art">
                  <div className="gp-frame">
                    <div className="gp-frame-chrome">
                      <div className="gp-frame-dots"><span></span><span></span><span></span></div>
                      <div className="gp-frame-url"><span className="lock">🔒</span> growth.alloygp.co/playbook</div>
                    </div>
                    <div className="gp-panel gp-anim">
                      <div className="gp-proj-head">
                        <div className="n">10</div>
                        <h4>Projects we're driving</h4>
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, color: 'var(--alloy-purple)' }}>89<span style={{ fontSize: 16 }}>%</span></span><span style={{ fontSize: 11, color: 'var(--fg-3)' }}>of quarter<br />complete</span><span className="gp-badge ontrack">● On Track</span></div>
                      </div>
                      <div className="gp-projrow">
                        <div><div className="pname">Build Website. Foundation</div><div className="subtasks">●●○○○○○ 2/7 subtasks</div></div>
                        <span className="gp-status prog"><span className="d"></span> In progress</span>
                        <span className="gp-eng">Reach</span>
                        <div className="pr"><span className="track"><i style={{ width: '29%' }}></i></span><span className="pct">29%</span></div>
                      </div>
                      <div className="gp-projrow">
                        <div><div className="pname">Local Takeover · League City</div><div className="subtasks">●●●○ 3/4 subtasks</div></div>
                        <span className="gp-status prog"><span className="d"></span> In progress</span>
                        <span className="gp-eng">Reach</span>
                        <div className="pr"><span className="track"><i style={{ width: '75%' }}></i></span><span className="pct">75%</span></div>
                      </div>
                      <div className="gp-projrow">
                        <div><div className="pname">Local Takeover · Los Angeles</div><div className="subtasks">●●●○ 3/4 subtasks</div></div>
                        <span className="gp-status prog"><span className="d"></span> In progress</span>
                        <span className="gp-eng">Reach</span>
                        <div className="pr"><span className="track"><i style={{ width: '75%' }}></i></span><span className="pct">75%</span></div>
                      </div>
                      <div className="gp-projrow">
                        <div><div className="pname">Update Growth Blueprint &amp; Q3 Playbook</div><div className="subtasks">○○○○○ 0/5 subtasks</div></div>
                        <span className="gp-status plan"><span className="d"></span> Planning</span>
                        <span className="gp-eng" style={{ background: 'var(--alloy-green-tint)', color: '#2c6a62' }}>Retain</span>
                        <div className="pr"><span className="track"><i style={{ width: 0 }}></i></span><span className="pct">0%</span></div>
                      </div>
                      <div className="gp-projrow">
                        <div><div className="pname">Social Media. June</div><div className="subtasks">○○○○○○○ 0/7 subtasks</div></div>
                        <span className="gp-status prog"><span className="d"></span> In progress</span>
                        <span className="gp-eng">Reach</span>
                        <div className="pr"><span className="track"><i style={{ width: '6%' }}></i></span><span className="pct">6%</span></div>
                      </div>
                    </div>
                    {/* floating discussion widget */}
                    <div className="gp-msgcard">
                      <div className="gp-msgcard-head">
                        <span className="av">JS</span>
                        <div><div className="nm">John Smith</div><div className="sub">Alloy started this · 6 replies</div></div>
                      </div>
                      <div className="gp-msgcard-ttl">Your new site is taking shape, ready for your first look</div>
                      <div className="gp-msgcard-move">
                        <div className="eb"><span className="spin">✦</span> Your move</div>
                        <div className="tx">management.co needs to review website design feedback in the In Review section.</div>
                      </div>
                      <div className="gp-msgcard-btns">
                        <span className="pri">Review now</span>
                        <span className="sec">Open message</span>
                      </div>
                    </div>
                    {/* floating leads widget */}
                    <div className="gp-leadcard">
                      <div className="gp-leadcard-top"><span className="tag">Leads</span><span className="new">◷ new today</span></div>
                      <div className="gp-leadcard-body"><div className="big">3</div><div className="lbl">new leads to qualify</div></div>
                      <div className="gp-leadcard-btn">Qualify leads →</div>
                    </div>
                  </div>
                </div>
                <div className="gp-tour-note right p3"><b>Waiting on you, surfaced</b><span>Nothing stalls because a task slipped through.</span></div>
                <div className="gp-tour-note right p4"><b>Real-time progress</b><span>Bars and quarter completion update as work lands.</span></div>
              </div>
            </div>

            {/* 05 Messages (annotated) */}
            <div className={'gp-showcase gp-tour gp-bare' + (activeTab === 4 ? ' is-active' : '')}>
              <div className="gp-panel-head">
                <h3>{gpMeta[4].t}</h3>
                <p>{gpMeta[4].d}</p>
              </div>
              <div className="gp-tour-stage">
                <div className="gp-tour-note left p1"><b>Tracked inbox</b><span>Every ticket. Pending, In-progress, Resolved.</span></div>
                <div className="gp-tour-note left p2"><b>Full history kept</b><span>Attach files, CC teammates: nothing lost.</span></div>
                <div className="gp-showcase-art">
                  <div className="gp-frame">
                    <div className="gp-frame-chrome">
                      <div className="gp-frame-dots"><span></span><span></span><span></span></div>
                      <div className="gp-frame-url"><span className="lock">🔒</span> growth.alloygp.co/tickets</div>
                    </div>
                    <div className="gp-ib gp-anim">
                      <div className="gp-ib-list">
                        <div className="gp-ib-tabs"><span className="on">CPE Tasks 9</span><span>In-Progress 2</span><span>All</span></div>
                        <div className="gp-ib-search">⌕ Search tickets…</div>
                        <div className="gp-ib-item on">
                          <div className="t"><span className="id">#10572</span><span className="pill">Pending</span></div>
                          <div className="subj">Email Signature</div>
                          <div className="who"><span className="av">JS</span> John Smith</div>
                        </div>
                        <div className="gp-ib-item">
                          <div className="t"><span className="id">#10511</span><span className="pill">Pending</span></div>
                          <div className="subj">LinkedIn Request</div>
                          <div className="who"><span className="av">JS</span> John Smith</div>
                        </div>
                        <div className="gp-ib-item">
                          <div className="t"><span className="id">#10510</span><span className="pill">Pending</span></div>
                          <div className="subj">Social Media Access &amp; Posting</div>
                          <div className="who"><span className="av">JS</span> John Smith</div>
                        </div>
                        <div className="gp-ib-item">
                          <div className="t"><span className="id">#10441</span><span className="pill">Pending</span></div>
                          <div className="subj">Re: Website form routing</div>
                          <div className="who"><span className="av">DN</span> Doug Newman</div>
                        </div>
                      </div>
                      <div className="gp-ib-thread">
                        <div className="gp-ib-thread-head">
                          <div className="row"><span className="id">#10572</span><span className="pill">Pending</span><span className="resolved">Mark resolved</span></div>
                          <h4>Email Signature</h4>
                          <div className="from">From <b>John Smith</b> · john@smith.com</div>
                        </div>
                        <div className="gp-ib-msg">
                          <span className="av">MJ</span>
                          <div className="bubble">
                            <div className="meta"><b>Mary Jane</b> · 5d ago</div>
                            <p>Hi John. I wanted to make sure the email signature ended on a good note. We created an updated method for you. Can you take a look and let us know if this is easier to install?</p>
                          </div>
                        </div>
                        <div className="gp-ib-reply">Reply to your team… <span className="send">➤ Send</span></div>
                      </div>
                      {/* floating intake card */}
                      <div className="gp-ib-newreq">
                        <div className="eb">New request</div>
                        <h5>How can we help?</h5>
                        <div className="fld-lbl">Subject</div>
                        <div className="fld focus">Short summary of what you need</div>
                        <div className="fld-lbl">Details</div>
                        <div className="fld area">Tell us what's going on…</div>
                        <div className="send-req">Send request</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gp-tour-note right p3"><b>Two-way messaging</b><span>Threaded by topic, with your Alloy team.</span></div>
                <div className="gp-tour-note right p4"><b>One-click new request</b><span>Open a request for anything in seconds.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROOF BAND ============ */}
      <section id="proof" className="section section-dark">
        <div className="container">
          <div className="gp-head">
            <span className="eyebrow on-dark">Proof of partnership value</span>
            <h2 className="display-lg" style={{ color: '#fff' }}>The numbers that justify<br />the partnership, <span style={{ color: 'var(--alloy-yellow)' }}>always on.</span></h2>
            <p className="lead on-dark">With other agencies you get a raw Google Analytics export and you're left to decode what it means. The portal totals your return continuously, so the case for the work is never more than a glance away.</p>
          </div>
          <div className="gp-proof-grid">
            <div className="gp-proof-stat"><div className="v yellow">74</div><div className="k">Qualified leads</div><div className="s">since June 2025</div></div>
            <div className="gp-proof-stat"><div className="v blue">$1.16M</div><div className="k">Total quote value</div><div className="s">contract revenue in play</div></div>
            <div className="gp-proof-stat"><div className="v green">$2.39M</div><div className="k">Revenue created</div><div className="s">lifetime, closed</div></div>
            <div className="gp-proof-stat"><div className="v">+$1.92M</div><div className="k">Projected firm value</div><div className="s">enterprise value increase</div></div>
          </div>
          <p style={{ margin: '28px 0 0', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.55, letterSpacing: '0.02em', color: 'rgba(255,255,255,0.45)', maxWidth: '74ch' }}>Figures shown are an illustrative partnership. Your portal reflects your firm's actual leads, quotes, revenue, and projected value: tracked from day one.</p>
        </div>
      </section>

      {/* ============ HOW YOU GET IT ============ */}
      <section id="how" className="section section-white">
        <div className="container">
          <div className="gp-head">
            <span className="eyebrow no-line">How you get it</span>
            <h2 className="display-lg">No upsell. It comes<br />with the work.</h2>
            <p className="lead">The Growth Portal isn't a product we sell on the side. It's how every Alloy engagement is run. Start a plan and your portal goes live on day one.</p>
          </div>
          <div className="gp-steps">
            <div className="gp-step">
              <div className="n" style={{ background: 'var(--alloy-pink)' }}>1</div>
              <h3>Start a plan</h3>
              <p>Start a BoardSuite plan. A quick conversation gets the partnership moving: no prep, no pressure.</p>
            </div>
            <div className="gp-step">
              <div className="n" style={{ background: 'var(--alloy-yellow)', color: 'var(--alloy-purple)' }}>2</div>
              <h3>We build your engine</h3>
              <p>The brand interview and growth roadmap set the plan. Your portal is provisioned and connected to the work as we build.</p>
            </div>
            <div className="gp-step">
              <div className="n" style={{ background: '#2c8a6d' }}>3</div>
              <h3>Your portal goes live</h3>
              <p>Log in to watch leads land, projects move, and value compound, in real time, for as long as we work together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="section section-ivory">
        <div className="container-narrow">
          <div className="gp-head center">
            <span className="eyebrow no-line">Common questions</span>
            <h2 className="display-lg">Honest answers, plainly.</h2>
          </div>
          <div className="gp-faq">
            <details open onToggle={onFaqToggle}>
              <summary>How much does the Growth Portal cost? <span className="pm">+</span></summary>
              <p>Nothing extra. The portal is included free with every BoardSuite plan. It's simply how we run the work and report on it. There's no separate license, seat fee, or add-on.</p>
            </details>
            <details onToggle={onFaqToggle}>
              <summary>Can I get the portal without a plan? <span className="pm">+</span></summary>
              <p>The portal exists to show the work we're doing for you, so it's tied to an active engagement. Start a BoardSuite plan and your portal comes with it. If you'd like a walkthrough first, we're happy to give you a live tour.</p>
            </details>
            <details onToggle={onFaqToggle}>
              <summary>Where does the data come from? <span className="pm">+</span></summary>
              <p>Directly from the systems running your growth: your lead forms, Google Business Profile, ad platforms, our project management, and our proposal and review engines. The portal pulls it together so you see one honest picture instead of five disconnected dashboards.</p>
            </details>
            <details onToggle={onFaqToggle}>
              <summary>Is it just for one person, or my whole team? <span className="pm">+</span></summary>
              <p>Your whole team. Invite owners, partners, and key staff so everyone sees the same source of truth, no more forwarding screenshots or re-explaining results in a meeting.</p>
            </details>
            <details onToggle={onFaqToggle}>
              <summary>How current is the information? <span className="pm">+</span></summary>
              <p>Leads and project status update in real time. Value metrics like revenue created and projected firm value refresh continuously as quotes are sent, deals close, and work ships, not once a month in a deck.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ============ GET STARTED / FINAL CTA ============ */}
      <section id="get-started" className="gp-cta">
        <div className="gp-hero-glow"></div>
        <div className="gp-cta-inner">
          <div>
            <span className="eyebrow on-dark no-line">Get started</span>
            <h2 className="display-lg">Start a plan. Get the portal. See everything.</h2>
            <p>Every Alloy plan comes with the Growth Portal. Full transparency into the work and the wins, from day one. Tell us about your firm and we'll show you what our partnership could look like.</p>
            <div className="gp-hero-stats" style={{ borderTopColor: 'rgba(255,255,255,0.14)', maxWidth: 520 } as CSSProperties}>
              <div className="item"><div className="v">Day-one access</div><div className="k">live with your first plan</div></div>
              <div className="item"><div className="v">Whole team</div><div className="k">one source of truth</div></div>
              <div className="item"><div className="v">Free</div><div className="k">with every plan</div></div>
            </div>
          </div>
          <div className="gp-form-card">
            <div className="ttl">Takes 30 seconds</div>
            <h3>Request a walkthrough</h3>
            {formStatus === 'done' ? (
              <div className="gp-form-msg" aria-live="polite" style={{ paddingTop: 4 }}>
                Thanks{formFirst ? ', ' + formFirst : ''}. We&rsquo;ll be in touch within one business day to set up your walkthrough.
              </div>
            ) : (
              <form className="gp-form" id="gp-walkthrough-form" name="growth-portal-walkthrough" action="/api/lead" method="post" onSubmit={onFormSubmit}>
                <div className="gp-form-row">
                  <input className="gp-input" name="name" placeholder="First name" required />
                  <input className="gp-input" name="company" placeholder="CAM company" required />
                </div>
                <input className="gp-input" name="email" type="email" placeholder="Work email" required />
                <input className="gp-input" name="market" placeholder="Primary market (city, state)" />
                <select className="gp-input" name="plan" defaultValue="">
                  <option value="">Interested in… (optional)</option>
                  <option value="Growth plan">Growth plan</option>
                  <option value="Just exploring">Just exploring</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
                <button className="btn btn-primary btn-arrow" type="submit" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Sending…' : 'Request walkthrough'}
                </button>
                {formError && (
                  <div className="gp-form-msg" aria-live="polite" style={{ color: '#ffb4c6', paddingTop: 4 }}>
                    {formError}
                  </div>
                )}
              </form>
            )}
            <p className="gp-fine">No long-term contract required. We'll reach out within one business day.</p>
          </div>
        </div>
        <div className="accent-bar"><div></div><div></div><div></div><div></div><div></div></div>
      </section>
    </div>
  );
}
