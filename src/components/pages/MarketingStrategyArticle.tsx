// src/components/pages/MarketingStrategyArticle.tsx
import ArticleShell, { articleProse, articleH2, articleQuote } from './ArticleShell';
import { YELLOW } from '~/lib/tokens';

export default function MarketingStrategyArticle() {
  return (
    <ArticleShell
      category="Article"
      categoryColor={YELLOW}
      title="The CAM Marketing Strategy That Actually Compounds"
      dek="'Do more marketing' is the most expensive advice CAM firms hear. An engineered, system-first growth strategy is what compounds — here's the 18-month shape of it."
      body={
        <div style={articleProse}>
          <p>If you've owned a CAM firm for any meaningful time, you've heard the same advice from a dozen agencies and consultants: do more marketing. Run more ads. Post more on LinkedIn. Send more email. The premise is that <em>volume</em> is the lever. It isn't. <strong>System</strong> is the lever.</p>
          <h2 style={articleH2}>Why volume fails</h2>
          <p>Volume without system is a rounding error. You spend more, get marginally more leads, those leads hit the same broken proposal anatomy and the same overworked owner-operator, and your close rate stays where it was. The math doesn't move.</p>
          <p>System is what fixes the close rate. System is what fixes the retention rate. System is what makes the marketing investment compound instead of recurring as a monthly expense.</p>
          <div style={articleQuote}>"More marketing doesn't grow CAM firms. Engineered marketing does."</div>
          <h2 style={articleH2}>The 18-month shape</h2>
          <p><strong>Months 0–3: diagnostic and foundation.</strong> Audit the three engines (attract, close, keep). Identify the binding constraint. Most CAM firms find their close engine is broken before they need more leads. Fix that first.</p>
          <p><strong>Months 3–6: foundation execution.</strong> Authority content goes live. Proposal anatomy gets rebuilt. SOPs get documented. Reputation systems get installed. Nothing visible yet — and that's the point. Foundations don't headline.</p>
          <p><strong>Months 6–12: signal in market.</strong> Inbound starts arriving. Win rates climb on outbound. Reviews accumulate. Boards begin returning to your education library. The first compound effects show up.</p>
          <p><strong>Months 12–18: pipeline pressure.</strong> The system is producing more qualified opportunities than the firm can comfortably absorb. Hiring conversations begin from a position of demand strength, not desperation.</p>
          <h2 style={articleH2}>The two failure modes</h2>
          <p>Most CAM growth efforts fail in one of two ways. <strong>Mode A: agency-driven volume push without system.</strong> Spend climbs, results stay flat, owner concludes "marketing doesn't work in our industry." <strong>Mode B: heroic owner sales effort.</strong> One person carries everything, growth is a function of their personal calendar, and the business is one missed quarter from a flat year.</p>
          <p>Engineered growth is neither. It's the boring discipline of fixing the engine that's actually broken, then the next one, then the next one — until growth stops requiring heroics.</p>
        </div>
      }
    />
  );
}
