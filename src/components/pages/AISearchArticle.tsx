// src/components/pages/AISearchArticle.tsx
import ArticleShell, { articleProse, articleH2, articleQuote } from './ArticleShell';
import { PINK } from '~/lib/tokens';

export default function AISearchArticle() {
  return (
    <ArticleShell
      category="Article"
      categoryColor={PINK}
      title="How CAM Firms Win in AI Search"
      dek="ChatGPT, Perplexity, Gemini, and Google AI Overviews now answer board questions before your website does. The firms cited are winning meetings competitors don't even know happened."
      body={
        <div style={articleProse}>
          <p>For fifteen years, the marketing question for CAM firms was "how do we get to page one of Google?" That question is now obsolete. Boards are asking AI for one answer. If you're not it, you don't exist in the consideration set — and you'll never know the search occurred.</p>
          <h2 style={articleH2}>What changed</h2>
          <p>AI search engines synthesize an answer from a small set of cited sources. Three to five citations. Not ten blue links. Not "we found 4,200 results." One synthesized answer, and a small number of sources that get the credit (and the click).</p>
          <p>For CAM firms, this changes the math. Being the 7th-best SEO result was fine when boards browsed. It's worthless when they ask an LLM "which CAM firm should we use in Phoenix?" and get one answer.</p>
          <div style={articleQuote}>"AI search gives boards one answer. If you're not it, you don't exist."</div>
          <h2 style={articleH2}>What to do, in priority order</h2>
          <p><strong>1. Schema, properly.</strong> LocalBusiness, Service, FAQ, and Organization schema, deployed across every page. AI engines lean on structured data more heavily than human users. Most CAM sites have either no schema or broken schema.</p>
          <p><strong>2. Authority content with depth.</strong> Generic "10 things to look for in a CAM firm" posts don't get cited. 4,000-word definitive guides on regional governance, transition processes, or RFP anatomy do. Depth wins citations.</p>
          <p><strong>3. Per-metro pillar pages.</strong> If you serve Phoenix, Tucson, and Flagstaff, you need three substantial pages — not one "service area" page with three city names. AI engines reward topical depth at the geographic level.</p>
          <p><strong>4. Citation tracking, monthly.</strong> Most agencies track keyword ranking. That's a dead metric. Track which AI engines cite you, for which queries, with what context. Then optimize backwards.</p>
          <h2 style={articleH2}>The compound effect</h2>
          <p>Here's the leverage: AI engines build a rolling sense of which sources they trust on a topic. Once you're cited consistently in CAM-adjacent queries, you become the default citation. Competitors entering the AI search game late are competing for citations from a position of disadvantage that compounds against them.</p>
          <p>The firms moving on this in 2025 will be uncatchable in 2027.</p>
        </div>
      }
    />
  );
}
