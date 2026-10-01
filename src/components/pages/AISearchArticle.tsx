// src/components/pages/AISearchArticle.tsx — /resources/ai-search-for-cam
// Template 5 — article. Restored 2026-10-01 at the client's request ("no fake blogs — pull the real ones over"):
// the body is the pre-redesign /resource-hub/ai-search-for-cam article, copy verbatim (commit c3c47de on main),
// re-set in the rd-article layout used by MarketingStrategyArticle. Static — no client directive needed.
import type { ReactNode } from 'react';
import { Breadcrumb, Eyebrow, Label, Btn, CtaBar, ArrowIcon } from '~/components/rd/atoms';
import { PINK, BLUE, GREEN, REACH_INK, RETAIN_INK } from '~/lib/tokens';

const PATH = '/resources/ai-search-for-cam';

const TOC: Array<{ id: string; label: string }> = [
  { id: 'what-changed', label: 'What changed' },
  { id: 'what-to-do', label: 'What to do, in priority order' },
  { id: 'the-compound-effect', label: 'The compound effect' },
];

const KEEP_READING = [
  { kind: 'Strategy', ink: '#4a86ad', accent: BLUE, meta: '12 min read', title: 'CAM marketing strategy: the plan before the tactics.', href: '/resources/cam-marketing-strategy' },
  { kind: 'Service', ink: REACH_INK, accent: PINK, meta: 'BoardReach', title: 'Property management SEO: Google, the map, and the AI answer.', href: '/property-management-seo' },
  { kind: 'Course', ink: RETAIN_INK, accent: GREEN, meta: '10 sections', title: 'Trust building for CAM firms.', href: '/resources/courses/trust-building' },
];

function Section({ id, title, children }: { id: string; title: ReactNode; children: ReactNode }) {
  const n = TOC.findIndex((t) => t.id === id) + 1;
  return (
    <section id={id} className="rd-article-section">
      <div className="rd-article-head" style={{ gap: 14 }}>
        <span className="rd-numeral rd-numeral--36">{String(n).padStart(2, '0')}</span>
        <h2 className="rd-h3 rd-h3--sm" style={{ lineHeight: 1.2 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function AISearchArticle() {
  return (
    <div className="rd-page">
      <section className="rd-breadcrumb-section">
        <div className="rd-wrap">
          <Breadcrumb items={[{ label: 'Resources', href: '/resources' }, { label: 'AI search for CAM', href: PATH }]} />
        </div>
      </section>

      {/* Hero */}
      <section className="rd-section" style={{ padding: '56px 0 72px' }}>
        <div className="rd-wrap rd-grid rd-grid--hero-wide rd-grid--end">
          <div className="rd-stack" style={{ gap: 28 }}>
            <Eyebrow>AI search</Eyebrow>
            <h1 className="rd-h1" style={{ fontSize: 'clamp(36px, 5.9vw, 68px)' }}>How CAM firms win <span className="rd-accent">in AI search.</span></h1>
          </div>
          <div className="rd-stack" style={{ gap: 16 }}>
            <p className="rd-intro" style={{ lineHeight: 1.65 }}>ChatGPT, Perplexity, Gemini, and Google AI Overviews now answer board questions before your website does. The firms cited are winning meetings competitors don’t even know happened.</p>
            <div className="rd-tiny rd-w-500">{TOC.length} sections · 3 min read</div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="rd-section" style={{ paddingTop: 0 }}>
        <div className="rd-wrap rd-grid rd-grid--article rd-gap-80">
          <aside className="rd-toc">
            <nav className="rd-stack" aria-label="On this page" style={{ gap: 13 }}>
              <Label>On this page</Label>
              <div className="rd-toc-list" style={{ borderTop: 0 }}>
                {TOC.map((t) => <a key={t.id} href={`#${t.id}`}>{t.label}</a>)}
              </div>
            </nav>
            <div className="rd-bg-purple rd-ink-white rd-stack" style={{ borderRadius: 10, padding: 22, gap: 12, marginTop: 6 }}>
              <div className="rd-title-16">Want this done for your firm?</div>
              <p className="rd-tiny rd-muted-80">Thirty minutes with a CAM operator. Written 90-day plan, yours to keep.</p>
              <Btn href="/get-started" size="xs">Claim your market</Btn>
            </div>
          </aside>

          <article className="rd-article" style={{ minWidth: 0 }}>
            <p>For fifteen years, the marketing question for CAM firms was “how do we get to page one of Google?” That question is now obsolete. Boards are asking AI for one answer. If you’re not it, you don’t exist in the consideration set — and you’ll never know the search occurred.</p>

            <Section id="what-changed" title="What changed">
              <p>AI search engines synthesize an answer from a small set of cited sources. Three to five citations. Not ten blue links. Not “we found 4,200 results.” One synthesized answer, and a small number of sources that get the credit (and the click).</p>
              <p>For CAM firms, this changes the math. Being the 7th-best SEO result was fine when boards browsed. It’s worthless when they ask an LLM “which CAM firm should we use in Phoenix?” and get one answer.</p>
              <blockquote>“AI search gives boards one answer. If you’re not it, you don’t exist.”</blockquote>
            </Section>

            <Section id="what-to-do" title="What to do, in priority order">
              <p><strong>1. Schema, properly.</strong> LocalBusiness, Service, FAQ, and Organization schema, deployed across every page. AI engines lean on structured data more heavily than human users. Most CAM sites have either no schema or broken schema.</p>
              <p><strong>2. Authority content with depth.</strong> Generic “10 things to look for in a CAM firm” posts don’t get cited. 4,000-word definitive guides on regional governance, transition processes, or RFP anatomy do. Depth wins citations.</p>
              <p><strong>3. Per-metro pillar pages.</strong> If you serve Phoenix, Tucson, and Flagstaff, you need three substantial pages — not one “service area” page with three city names. AI engines reward topical depth at the geographic level.</p>
              <p><strong>4. Citation tracking, monthly.</strong> Most agencies track keyword ranking. That’s a dead metric. Track which AI engines cite you, for which queries, with what context. Then optimize backwards.</p>
            </Section>

            <Section id="the-compound-effect" title="The compound effect">
              <p>Here’s the leverage: AI engines build a rolling sense of which sources they trust on a topic. Once you’re cited consistently in CAM-adjacent queries, you become the default citation. Competitors entering the AI search game late are competing for citations from a position of disadvantage that compounds against them.</p>
              <p>The firms moving on this in 2025 will be uncatchable in 2027.</p>
            </Section>
          </article>
        </div>
      </section>

      {/* Keep reading */}
      <section className="rd-section rd-bg-off">
        <div className="rd-wrap rd-stack rd-stack--24">
          <Label>Keep reading</Label>
          <div className="rd-grid rd-grid--3 rd-gap-20">
            {KEEP_READING.map((k) => (
              <a key={k.href} href={k.href} className="rd-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, borderLeft: `5px solid ${k.accent}`, padding: '26px 26px 22px 28px' }}>
                <div className="rd-row rd-row--between">
                  <span className="rd-label rd-label--12" style={{ color: k.ink }}>{k.kind}</span>
                  <span className="rd-tiny rd-tiny--12">{k.meta}</span>
                </div>
                <div className="rd-title-22 rd-ink" style={{ fontSize: 21 }}>{k.title}</div>
                <span className="rd-link rd-link--12" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>Read <ArrowIcon /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-section rd-bg-off" style={{ paddingTop: 0 }}>
        <div className="rd-wrap">
          <CtaBar text="Want to be the answer boards get? Thirty minutes tells you how far off you are — and whether your metro is open." />
        </div>
      </section>
    </div>
  );
}
