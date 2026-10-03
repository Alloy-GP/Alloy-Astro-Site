// src/components/chrome/SiteSearch.tsx — header site search (restored 2026-10-01 per client).
// Button (desktop icon / mobile row) + native <dialog>: type to filter src/lib/search-index.ts,
// ↑↓ to move, ↵ to open, Esc or backdrop to close (backdrop handled by src/lib/dialog.ts). ⌘K / Ctrl+K opens it.
import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { searchIndex } from '~/lib/search-index';

export function SearchIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export default function SiteSearch({ variant = 'icon' }: { variant?: 'icon' | 'row' | 'utility' }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);

  const show = () => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    setQ(''); setActive(0);
    d.showModal();
    setOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 30);
  };
  const hide = () => dialogRef.current?.close();

  // Keep React state in sync when the dialog closes natively (Esc, backdrop via dialog.ts)
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => setOpen(false);
    d.addEventListener('close', onClose);
    return () => d.removeEventListener('close', onClose);
  }, []);

  // ⌘K / Ctrl+K anywhere; "/" when not typing
  useEffect(() => {
    if (variant === 'row') return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest('input, textarea, select, [contenteditable="true"]');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); show(); }
      else if (e.key === '/' && !typing && !dialogRef.current?.open) { e.preventDefault(); show(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [variant]);

  const results = useMemo(() => searchIndex(q), [q]);
  useEffect(() => { setActive(0); }, [q]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { const hit = results[active]; if (hit) window.location.href = hit.h; }
  };

  const groups: Array<[string, typeof results]> = [];
  for (const r of results) {
    const g = groups.find(([name]) => name === r.g);
    if (g) g[1].push(r); else groups.push([r.g, [r]]);
  }
  let idx = -1;

  return (
    <>
      {variant === 'utility' ? (
        <button type="button" className="site-util-link site-util-search" onClick={show} title="Search (⌘K)" aria-haspopup="dialog" aria-expanded={open}>
          <SearchIcon size={13} />
          <span>Search</span>
        </button>
      ) : variant === 'icon' ? (
        <button type="button" className="site-iconbtn site-search-btn" onClick={show} aria-label="Search the site (⌘K)" title="Search (⌘K)" aria-haspopup="dialog" aria-expanded={open}>
          <SearchIcon />
        </button>
      ) : (
        <button type="button" className="site-mobile-search" onClick={show} aria-haspopup="dialog" aria-expanded={open}>
          <SearchIcon size={16} />
          <span>Search the site…</span>
        </button>
      )}

      <dialog ref={dialogRef} className="rd-dialog site-search" aria-label="Site search">
        <div className="site-search-panel">
          <div className="site-search-row">
            <span className="site-search-row-icon"><SearchIcon size={20} /></span>
            <input
              ref={inputRef}
              type="search"
              className="site-search-input"
              placeholder="Search services, pages, topics…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              spellCheck={false}
              aria-label="Search"
              aria-controls="site-search-results"
            />
            <button type="button" className="site-search-close" onClick={hide} aria-label="Close search"><kbd>esc</kbd></button>
          </div>
          <div id="site-search-results" className="site-search-results" role="listbox" aria-label="Results">
            {results.length === 0 ? (
              <div className="site-search-empty">No matches for “{q}”. Try “seo”, “proposal”, “newsletter”, or “pricing”.</div>
            ) : groups.map(([g, items]) => (
              <div key={g} className="site-search-group">
                <div className="site-search-group-label">{g}</div>
                {items.map((item) => {
                  idx += 1;
                  const i = idx;
                  const external = item.h.startsWith('http');
                  return (
                    <a
                      key={item.h}
                      href={item.h}
                      className={`site-search-hit${i === active ? ' is-active' : ''}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                    >
                      <span className="site-search-hit-title">{item.t}</span>
                      <span className="site-search-hit-meta">{external ? '↗' : item.h}</span>
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="site-search-foot"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>enter</kbd> open</span><span><kbd>esc</kbd> close</span></div>
        </div>
      </dialog>
    </>
  );
}
