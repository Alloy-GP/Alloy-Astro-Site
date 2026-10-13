// src/components/rd/ResourceCard.tsx
// The article/resource card used on /resources and in every article's "Keep reading" row (2026-10-13, client:
// no colored side bars; show the article's image on the tile when it has one). Whole card is the link.
export interface ResourceCardItem {
  kind: string;
  /** Label ink (engine ink or BLUE_INK). */
  ink: string;
  meta: string;
  title: string;
  href: string;
  /** Card image (e.g. /assets/resources/<slug>-card.jpg, 800×447). Optional. */
  image?: string;
}

export default function ResourceCard({ r }: { r: ResourceCardItem }) {
  return (
    <a href={r.href} className="rd-card-link rd-res-card">
      {r.image ? <img className="rd-res-img" src={r.image} alt="" width={800} height={447} loading="lazy" decoding="async" /> : null}
      <div className="rd-res-body">
        <div className="rd-row rd-row--between">
          <span className="rd-label rd-label--12" style={{ color: r.ink }}>{r.kind}</span>
          <span className="rd-tiny rd-tiny--12">{r.meta}</span>
        </div>
        <div className="rd-title-22 rd-ink rd-res-title">{r.title}</div>
        <span className="rd-link rd-link--12 rd-res-link">Read <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></span>
      </div>
    </a>
  );
}
