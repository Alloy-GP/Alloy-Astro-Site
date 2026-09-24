// Shared scroll-reveal helpers for Alloy site pages.
// Usage in a logic class:
//   componentDidMount(){ AlloyMotion.mount(this); }
//   componentWillUnmount(){ AlloyMotion.unmount(this); }
// Mark any element with data-reveal="key"; when it enters view, this.state['rv_'+key] becomes true (once).
// Number counters: mark <span data-count="535" data-prefix="+"> inside a revealed block — they count up automatically.
// Bars: data-grow="30%" on an element sets width 0→30%. Rows: data-stagger on children fades them in sequence.
// SVG polylines with data-draw draw left-to-right; elements with data-pop scale in after.
(function(){
  const E = 'cubic-bezier(0.16,1,0.3,1)';
  const ease = p => 1 - Math.pow(1 - p, 3);
  function prep(root){
    root.querySelectorAll('[data-grow]').forEach(el => { el.style.width = '0%'; el.style.transition = `width 1000ms ${E} ${el.dataset.delay || 150}ms`; });
    root.querySelectorAll('[data-draw]').forEach(el => { el.setAttribute('pathLength', '1'); el.style.strokeDasharray = '1'; el.style.strokeDashoffset = '1'; el.style.transition = `stroke-dashoffset 1600ms ${E} 200ms`; });
    root.querySelectorAll('[data-pop]').forEach(el => { el.style.opacity = '0'; el.style.transform = 'scale(0)'; el.style.transformOrigin = el.dataset.pop || 'center'; el.style.transformBox = 'fill-box'; el.style.transition = `opacity 300ms ${E} 1700ms, transform 400ms ${E} 1700ms`; });
    root.querySelectorAll('[data-fade]').forEach(el => { el.style.opacity = '0'; el.style.transition = `opacity 600ms ${E} ${el.dataset.fade || 900}ms`; });
    root.querySelectorAll('[data-stagger]').forEach(par => { Array.from(par.children).forEach((c, i) => { c.style.opacity = '0'; c.style.transform = 'translateY(10px)'; c.style.transition = `opacity 480ms ${E} ${i * 110}ms, transform 480ms ${E} ${i * 110}ms`; }); });
    root.querySelectorAll('[data-count]').forEach(el => { el.dataset.final = el.textContent; el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || ''); });
    root.querySelectorAll('[data-rise]').forEach(par => { Array.from(par.children).forEach((c, i) => { c.style.opacity = '0'; c.style.transform = 'translateY(14px)'; c.style.transition = `opacity 520ms ${E} ${i * 90}ms, transform 520ms ${E} ${i * 90}ms`; }); });
  }
  function fire(root){
    root.querySelectorAll('[data-grow]').forEach(el => { el.style.width = el.dataset.grow; });
    root.querySelectorAll('[data-draw]').forEach(el => { el.style.strokeDashoffset = '0'; });
    root.querySelectorAll('[data-pop]').forEach(el => { el.style.opacity = '1'; el.style.transform = 'scale(1)'; });
    root.querySelectorAll('[data-fade]').forEach(el => { el.style.opacity = '1'; });
    root.querySelectorAll('[data-stagger],[data-rise]').forEach(par => { Array.from(par.children).forEach(c => { c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }); });
    root.querySelectorAll('[data-count]').forEach(el => {
      const to = parseFloat(el.dataset.count), pre = el.dataset.prefix || '', suf = el.dataset.suffix || '', dec = (el.dataset.count.split('.')[1] || '').length;
      const ms = Math.min(1600, 800 + to * 1.2), t0 = performance.now();
      const fmt = v => pre + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US')) + suf;
      const tick = t => { const p = Math.min(1, (t - t0) / ms); el.textContent = fmt(to * ease(p)); if (p < 1) requestAnimationFrame(tick); else el.textContent = el.dataset.final; };
      requestAnimationFrame(tick);
    });
    root.querySelectorAll('[data-bar-h]').forEach(el => { el.style.height = el.dataset.barH; });
  }
  function mount(cmp){
    const scan = () => {
      const roots = document.querySelectorAll('[data-reveal]');
      if (!roots.length) { cmp._amTries = (cmp._amTries || 0) + 1; if (cmp._amTries < 40) setTimeout(scan, 100); return; }
      cmp._am = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { fire(en.target); cmp._am.unobserve(en.target); } });
      }, { threshold: 0.3 });
      roots.forEach(r => { if (r.dataset.amPrepped) return; r.dataset.amPrepped = '1'; prep(r); cmp._am.observe(r); });
    };
    setTimeout(scan, 80);
  }
  function unmount(cmp){ cmp._am && cmp._am.disconnect(); }
  window.AlloyMotion = { mount, unmount };
})();
