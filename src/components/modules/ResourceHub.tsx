// src/components/modules/ResourceHub.tsx
// Resource hub teaser grid. Ported from modules.jsx.
import Tag from '~/components/Tag';
import Icon from '~/components/Icon';
import { PURPLE, PINK } from '~/lib/tokens';

interface ResourceItem {
  type: string;
  color: 'yellow' | 'blue' | 'pink' | 'green';
  icon: string;
  title: string;
  meta: string;
  featured?: boolean;
}

const items: ResourceItem[] = [
  { type: 'Micro-course', color: 'yellow', icon: 'sparkles', title: 'Outsmarting AI Search: How Micro-Courses Drive Clicks, Credibility, & Conversions', meta: '5 lessons · Free', featured: true },
  { type: 'Field guide', color: 'blue', icon: 'book', title: 'The CAM Proposal Audit: 12 things boards actually evaluate', meta: 'PDF · 18 min read' },
  { type: 'Article', color: 'pink', icon: 'trending', title: 'Why referrals stop scaling at 80 associations — and what replaces them', meta: 'Insight · 7 min read' },
  { type: 'Case study', color: 'green', icon: 'shield', title: 'How Apex CMG flipped from chasing RFPs to inbound', meta: 'Long-form · 12 min' },
];

export default function ResourceHub() {
  return (
    <div className="resource-hub-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 20 }}>
      {items.map((it, i) => (
        <div key={i} className={`card card-pad card-accent-${it.color}`} style={{
          gridColumn: it.featured ? 'span 1' : 'auto',
          gridRow: it.featured ? 'span 2' : 'auto',
          display: 'flex', flexDirection: 'column', gap: 16,
          minHeight: it.featured ? 320 : 200,
          cursor: 'pointer',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tag color={it.color}>{it.type}</Tag>
            <Icon name={it.icon} size={20} color={it.color === 'yellow' ? '#8a6d12' : it.color === 'blue' ? '#1f5380' : it.color === 'green' ? '#2c6a62' : PINK} />
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: it.featured ? 26 : 17,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: PURPLE,
            textWrap: 'pretty',
            flex: 1,
          }}>{it.title}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#888', fontWeight: 500 }}>
            <span>{it.meta}</span>
            <span style={{ color: PURPLE, fontWeight: 700 }}>Read →</span>
          </div>
        </div>
      ))}
    </div>
  );
}
