// src/components/modules/FormGuard.tsx — client half of src/lib/form-guard.ts for the React forms
// (ContactPage, NewsletterSignup, BookClubForm, GrowthPortalPage). Two pieces:
//   <Honeypot />   a visually hidden `website` input inside the <form>; people never see or tab into
//                  it, bots that fill every field fill it, and the server drops those silently.
//   useFormGuard() returns stamp(fd, form): appends the honeypot value and `elapsed`, the ms the
//                  form has been open (measured here, so the visitor's clock cannot matter). The
//                  server rejects submissions with no `elapsed` (no JS → bot) or under 2 s.
// The plain-JS forms (src/lib/book-club-form.js, src/assets/thinktank.html) do the same inline.
// Field names must match HONEYPOT_FIELD / ELAPSED_FIELD in src/lib/form-guard.ts.
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

export const HONEYPOT_FIELD = 'website';
export const ELAPSED_FIELD = 'elapsed';

// Off-screen rather than display:none so the field still "exists" for naive bots.
const hidden: CSSProperties = { position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none' };

export function Honeypot() {
  return (
    <div style={hidden} aria-hidden="true">
      <label>
        Website
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function useFormGuard(): (fd: FormData, form?: HTMLFormElement | null) => void {
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);
  return (fd, form) => {
    if (!fd.has(HONEYPOT_FIELD)) {
      const hp = form?.elements.namedItem(HONEYPOT_FIELD);
      fd.append(HONEYPOT_FIELD, hp instanceof HTMLInputElement ? hp.value : '');
    }
    fd.append(ELAPSED_FIELD, String(mountedAt.current ? Date.now() - mountedAt.current : 0));
  };
}
