// src/lib/dialog.ts — native <dialog> modals, progressively enhanced. Mounted once from BaseLayout.
// Trigger: any element with data-dialog="<dialog id>" (its href stays as the no-JS fallback).
// Close: [data-dialog-close] inside the dialog, a click on the backdrop, or Escape (native).
export function initDialogs() {
  if (typeof HTMLDialogElement === 'undefined' || !('showModal' in HTMLDialogElement.prototype)) return;

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const trigger = target.closest<HTMLElement>('[data-dialog]');
    if (trigger) {
      const dlg = document.getElementById(trigger.dataset.dialog ?? '') as HTMLDialogElement | null;
      if (!dlg) return;
      e.preventDefault();
      dlg.showModal();
      dlg.querySelector<HTMLElement>('[data-dialog-close]')?.focus();
      return;
    }

    const closer = target.closest<HTMLElement>('[data-dialog-close]');
    if (closer) { closer.closest('dialog')?.close(); return; }

    // Backdrop click: the dialog element itself is the target only when the click lands outside its panel.
    if (target instanceof HTMLDialogElement && target.open) {
      const r = target.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) target.close();
    }
  });
}
