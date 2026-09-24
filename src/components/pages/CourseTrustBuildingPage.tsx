// src/components/pages/CourseTrustBuildingPage.tsx
// Cover page for the Trust-Building course.

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d9356e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
);

export default function CourseTrustBuildingPage() {
  return (
    <div className="course-page">
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="crumbs">
                <a href="/courses">Courses</a>
                <span className="sep">/</span>
                <span className="here">Building Trust</span>
              </div>

              <div className="pill-row">
                <span className="pill">Building Trust</span>
                <span className="pill level">Foundations</span>
              </div>

              <h1>Trust-Building for CAM Firms: <em>Reviews, testimonials &amp; case studies.</em></h1>

              <p className="hero-sub">
                Three trust signals decide whether boards consider you or choose you. This course shows you what each one is, where it shows up in the HOA decision process, and how to put the right proof in front of the right board at the right time.
              </p>

              <div className="meta-strip">
                <div className="meta-item"><span className="meta-label">Lessons</span><span className="meta-value">10</span></div>
                <div className="meta-item"><span className="meta-label">Quiz</span><span className="meta-value">1</span></div>
                <div className="meta-item"><span className="meta-label">Time</span><span className="meta-value">~60 min</span></div>
                <div className="meta-item"><span className="meta-label">Level</span><span className="meta-value">Foundations</span></div>
                <div className="meta-item"><span className="meta-label">Format</span><span className="meta-value">Self-paced</span></div>
              </div>
            </div>

            <aside className="enroll-card">
              <div className="enroll-card-eyebrow">Free • Open registration</div>
              <div className="enroll-card-price">$0</div>
              <div className="enroll-card-price-note">No card. No upsell. Just the course.</div>

              <a href="/courses/trust-building/lessons/intro" className="btn btn-primary">Start the course →</a>

              <ul className="enroll-includes">
                <li><Check />10 short, focused lessons</li>
                <li><Check />1 knowledge-check quiz</li>
                <li><Check />Built around HOA board decisions</li>
                <li><Check />No prerequisites</li>
              </ul>

              <a href="#curriculum" className="btn btn-ghost">↓ Preview the curriculum</a>
            </aside>
          </div>
        </div>
      </section>

      {/* WHY THIS COURSE */}
      <section className="block">
        <div className="container">
          <div className="why-grid">
            <div>
              <div className="section-eyebrow">Why this course</div>
              <div className="why-quote">Trust is the difference between being considered and being chosen.</div>
            </div>
            <div className="why-body">
              <p>HOA boards make high-stakes decisions that affect their communities' finances, property values, and quality of life. Before they award a contract, they're looking for proof you'll deliver — and most CAM firms are showing the wrong proof at the wrong moment.</p>
              <p>Reviews, testimonials, and case studies aren't interchangeable. Each one carries weight at a different stage of the board's journey. By the end of this course, you'll know which signal to use when — and how to make sure the right one is sitting in front of the right board at the right time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="block alt">
        <div className="container">
          <div className="section-eyebrow">What you'll learn</div>
          <h2 className="section-title">By the end, you'll be able to —</h2>
          <p className="section-lead">Five concrete capabilities you'll walk away with. Each one ties directly to how boards evaluate firms.</p>

          <div className="objectives">
            <div className="objective"><div className="objective-num">1</div><div className="objective-text">Define what trust signals are and explain their importance in CAM marketing.</div></div>
            <div className="objective"><div className="objective-num">2</div><div className="objective-text">Differentiate between reviews, testimonials, and case studies — and the role each plays.</div></div>
            <div className="objective"><div className="objective-num">3</div><div className="objective-text">Explain why each trust signal matters to HOA boards in their decision-making process.</div></div>
            <div className="objective"><div className="objective-num">4</div><div className="objective-text">Evaluate how different trust signals support various stages of the board journey.</div></div>
            <div className="objective"><div className="objective-num">5</div><div className="objective-text">Recognize how showcasing trust signals strengthens credibility and board confidence.</div></div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="block" id="curriculum">
        <div className="container">
          <div className="section-eyebrow">Course curriculum</div>
          <h2 className="section-title">Five modules. Ten lessons. One quiz.</h2>
          <p className="section-lead">Each module unpacks one trust signal — what it is, why it matters, and the extra factors that change its impact.</p>

          <div className="curriculum">
            {/* Module 1 */}
            <div className="module">
              <div className="module-head">
                <div className="module-mark intro">01</div>
                <div className="module-info">
                  <span className="module-tag">Module 1 · Introduction</span>
                  <span className="module-title">Why trust signals matter to HOA boards</span>
                </div>
                <div className="module-meta">2 lessons</div>
              </div>
              <div className="module-body">
                <a className="lesson" href="/courses/trust-building/lessons/intro">
                  <span className="lesson-num">01</span>
                  <span className="lesson-title">Intro to <em>Trust-Building for CAM Firms</em></span>
                  <span className="lesson-type"><span className="dot"></span>Lesson · 4 min</span>
                </a>
                <a className="lesson" href="/courses/trust-building/lessons/why-trust-signals-matter">
                  <span className="lesson-num">02</span>
                  <span className="lesson-title">Why trust signals matter to HOA boards</span>
                  <span className="lesson-type"><span className="dot"></span>Lesson · 6 min</span>
                </a>
              </div>
            </div>

            {/* Module 2 */}
            <div className="module">
              <div className="module-head">
                <div className="module-mark reviews">02</div>
                <div className="module-info">
                  <span className="module-tag">Module 2 · Reviews</span>
                  <span className="module-title">Homeowner voices, board decisions</span>
                </div>
                <div className="module-meta">2 lessons</div>
              </div>
              <div className="module-body">
                <a className="lesson" href="#"><span className="lesson-num">03</span><span className="lesson-title">What reviews are and why they carry weight</span><span className="lesson-type"><span className="dot"></span>Lesson · 7 min</span></a>
                <a className="lesson" href="#"><span className="lesson-num">04</span><span className="lesson-title">Reviews: extra factors that influence impact</span><span className="lesson-type"><span className="dot"></span>Lesson · 5 min</span></a>
              </div>
            </div>

            {/* Module 3 */}
            <div className="module">
              <div className="module-head">
                <div className="module-mark testimonials">03</div>
                <div className="module-info">
                  <span className="module-tag">Module 3 · Testimonials</span>
                  <span className="module-title">Personal stories that reassure</span>
                </div>
                <div className="module-meta">2 lessons</div>
              </div>
              <div className="module-body">
                <a className="lesson" href="#"><span className="lesson-num">05</span><span className="lesson-title">What testimonials are and why they stand out</span><span className="lesson-type"><span className="dot"></span>Lesson · 6 min</span></a>
                <a className="lesson" href="#"><span className="lesson-num">06</span><span className="lesson-title">Testimonials: extra factors that influence impact</span><span className="lesson-type"><span className="dot"></span>Lesson · 5 min</span></a>
              </div>
            </div>

            {/* Module 4 */}
            <div className="module">
              <div className="module-head">
                <div className="module-mark cases">04</div>
                <div className="module-info">
                  <span className="module-tag">Module 4 · Case studies</span>
                  <span className="module-title">Proof boards can see in action</span>
                </div>
                <div className="module-meta">2 lessons</div>
              </div>
              <div className="module-body">
                <a className="lesson" href="#"><span className="lesson-num">07</span><span className="lesson-title">What case studies are and why they convince</span><span className="lesson-type"><span className="dot"></span>Lesson · 7 min</span></a>
                <a className="lesson" href="#"><span className="lesson-num">08</span><span className="lesson-title">Case studies: extra factors that influence impact</span><span className="lesson-type"><span className="dot"></span>Lesson · 6 min</span></a>
              </div>
            </div>

            {/* Module 5 */}
            <div className="module">
              <div className="module-head">
                <div className="module-mark conclusion">05</div>
                <div className="module-info">
                  <span className="module-tag">Module 5 · Wrap-up</span>
                  <span className="module-title">From proof to persuasion</span>
                </div>
                <div className="module-meta">2 lessons + quiz</div>
              </div>
              <div className="module-body">
                <a className="lesson" href="#"><span className="lesson-num">09</span><span className="lesson-title">Recapping the 3 trust signals</span><span className="lesson-type"><span className="dot"></span>Lesson · 4 min</span></a>
                <a className="lesson" href="#"><span className="lesson-num">10</span><span className="lesson-title">From proof to persuasion: using trust signals effectively</span><span className="lesson-type"><span className="dot"></span>Lesson · 6 min</span></a>
                <a className="lesson quiz" href="/courses/trust-building-quiz">
                  <span className="lesson-num">★</span>
                  <span className="lesson-title">Check your learning — Trust-Building knowledge check</span>
                  <span className="lesson-type"><span className="dot"></span>Quiz · 5 min</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" id="start">
        <div className="container-narrow">
          <div className="final-cta-eyebrow">Ready to start?</div>
          <h2>Show the right proof at the right moment.</h2>
          <p>10 lessons. ~60 minutes. No card, no upsell. Just the framework — and a knowledge check at the end.</p>
          <div className="final-cta-actions">
            <a href="/courses/trust-building/lessons/intro" className="btn btn-primary-on-dark">Start the course →</a>
            <a href="/courses" className="btn btn-secondary-on-dark">Browse all courses</a>
          </div>
        </div>
      </section>
    </div>
  );
}
