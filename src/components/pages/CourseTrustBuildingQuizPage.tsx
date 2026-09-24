// src/components/pages/CourseTrustBuildingQuizPage.tsx
// Knowledge-check quiz for the Trust-Building course.
import { useState, useEffect } from 'react';

const ArrowLeft = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
);

type Question = {
  id: string;
  prompt: React.ReactNode;
  correct: string; // letter
  options: { letter: string; text: React.ReactNode }[];
  explanation: React.ReactNode;
};

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: <>Which trust signal is most useful <strong>before</strong> a board has reached out to your firm?</>,
    correct: 'A',
    options: [
      { letter: 'A', text: <><strong>Reviews</strong> — volume, recency, and homeowner voices</> },
      { letter: 'B', text: <>Testimonials from named board presidents</> },
      { letter: 'C', text: <>A detailed case study with measurable outcomes</> },
      { letter: 'D', text: <>An industry award or certification</> },
    ],
    explanation: <><strong>Why:</strong> Reviews are the discovery-stage signal. Boards looking at firms they haven't contacted yet check reviews to confirm you're active and well-regarded. Testimonials and case studies become more important <em>after</em> they're already considering you.</>,
  },
  {
    id: 'q2',
    prompt: <>What primarily makes a testimonial more impactful than a review?</>,
    correct: 'C',
    options: [
      { letter: 'A', text: <>It's longer than a review</> },
      { letter: 'B', text: <>It includes a star rating</> },
      { letter: 'C', text: <><strong>Specificity and a named author</strong> — a real board member saying something concrete</> },
      { letter: 'D', text: <>It was published more recently</> },
    ],
    explanation: <><strong>Why:</strong> Testimonials work because they put a face and a name on the proof. Anonymous or generic praise reads as filler. The more specific the person, role, and outcome, the more weight a board gives it.</>,
  },
  {
    id: 'q3',
    prompt: <>A board is in the final round, comparing you against two other firms. Which signal carries the most weight?</>,
    correct: 'C',
    options: [
      { letter: 'A', text: <>Reviews — overall star average</> },
      { letter: 'B', text: <>Testimonials from past board members</> },
      { letter: 'C', text: <><strong>Case studies</strong> — a community like theirs, a measurable outcome</> },
      { letter: 'D', text: <>Brand awareness in the metro area</> },
    ],
    explanation: <><strong>Why:</strong> By the final round, the board has already decided you're credible. They're now de-risking the choice — and case studies do that better than anything else. A community like theirs, a problem like theirs, a result they can point to in their vote.</>,
  },
  {
    id: 'q4',
    prompt: <>Which is <strong>not</strong> one of the three primary trust signals covered in this course?</>,
    correct: 'D',
    options: [
      { letter: 'A', text: <>Reviews</> },
      { letter: 'B', text: <>Testimonials</> },
      { letter: 'C', text: <>Case studies</> },
      { letter: 'D', text: <><strong>Press mentions</strong></> },
    ],
    explanation: <><strong>Why:</strong> Press mentions can support credibility, but they're not the load-bearing trust signals for board decisions. Reviews, testimonials, and case studies are.</>,
  },
  {
    id: 'q5',
    prompt: <>True or false: showing the same trust signal at every stage of the board journey is the strongest approach.</>,
    correct: 'B',
    options: [
      { letter: 'A', text: <>True</> },
      { letter: 'B', text: <><strong>False</strong> — different signals carry different weight at different stages</> },
    ],
    explanation: <><strong>Why:</strong> Each signal has a job. Reviews build initial credibility, testimonials reassure during consideration, case studies de-risk the final vote. Use them in that order — not all at once.</>,
  },
];

// Demo answers — pre-set so reviewers can see the graded state quickly.
const DEMO_ANSWERS: Record<string, string> = { q1: 'A', q2: 'C', q3: 'B', q4: 'D', q5: 'B' };

export default function CourseTrustBuildingQuizPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState(false);

  // For demo: enable submit immediately so reviewers don't have to fill it out
  const submitDisabled = false;
  const answered = Object.keys(answers).length;

  useEffect(() => {
    if (graded) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [graded]);

  const handleSelect = (qid: string, letter: string) => {
    if (graded) return;
    setAnswers((prev) => ({ ...prev, [qid]: letter }));
  };

  const handleSubmit = () => {
    // Apply demo answers if user hasn't filled in any
    const final = { ...DEMO_ANSWERS, ...answers };
    setAnswers(final);
    setGraded(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setGraded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute score
  const correctCount = QUESTIONS.filter((q) => answers[q.id] === q.correct).length;
  const total = QUESTIONS.length;
  const pct = Math.round((correctCount / total) * 100);
  const passed = pct >= 70;

  // Sidebar lesson row helper
  const sidebarRow = (status: 'done' | 'active', check: string, title: React.ReactNode, sub: string, href = '#') => (
    <a className={`lesson-row ${status}`} href={href}>
      <div className="lesson-check">{check}</div>
      <div className="lesson-text">
        {title}
        <small>{sub}</small>
      </div>
    </a>
  );

  return (
    <div className="course-page">
      <div className="shell">
        <aside className="sidebar">
         <div className="sidebar-inner">
          <div className="sidebar-head">
            <div className="sidebar-eyebrow">Building Trust</div>
            <div className="sidebar-title">Trust-Building for CAM Firms</div>
            <div className="sidebar-meta">10 lessons · 1 quiz · <strong>{graded ? '100' : '90'}% complete</strong></div>
          </div>

          <div className={`module-block done`} style={{ ['--module-color' as never]: '#381c4f' }}>
            <div className="module-label">Module 1 · Introduction</div>
            {sidebarRow('done', '✓', <>Intro to <em>Trust-Building for CAM Firms</em></>, '4 min · Lesson', '/courses/trust-building-lesson')}
            {sidebarRow('done', '✓', <>Why trust signals matter to HOA boards</>, '6 min · Lesson', '/courses/trust-building-lesson')}
          </div>
          <div className={`module-block done`} style={{ ['--module-color' as never]: '#d9356e' }}>
            <div className="module-label">Module 2 · Reviews</div>
            {sidebarRow('done', '✓', <>What reviews are and why they carry weight</>, '7 min · Lesson')}
            {sidebarRow('done', '✓', <>Reviews: extra factors that influence impact</>, '5 min · Lesson')}
          </div>
          <div className={`module-block done`} style={{ ['--module-color' as never]: '#f5d880' }}>
            <div className="module-label">Module 3 · Testimonials</div>
            {sidebarRow('done', '✓', <>What testimonials are and why they stand out</>, '6 min · Lesson')}
            {sidebarRow('done', '✓', <>Testimonials: extra factors that influence impact</>, '5 min · Lesson')}
          </div>
          <div className={`module-block done`} style={{ ['--module-color' as never]: '#aed7d0' }}>
            <div className="module-label">Module 4 · Case studies</div>
            {sidebarRow('done', '✓', <>What case studies are and why they convince</>, '7 min · Lesson')}
            {sidebarRow('done', '✓', <>Case studies: extra factors that influence impact</>, '6 min · Lesson')}
          </div>
          <div className={`module-block ${graded ? 'done' : ''}`} style={{ ['--module-color' as never]: '#381c4f' }}>
            <div className="module-label">Module 5 · Wrap-up</div>
            {sidebarRow('done', '✓', <>Recapping the 3 trust signals</>, '4 min · Lesson')}
            {sidebarRow('done', '✓', <>From proof to persuasion</>, '6 min · Lesson')}
            {sidebarRow(graded ? 'done' : 'active', graded ? '✓' : '★', <>Check your learning</>, '5 min · Quiz')}
          </div>
         </div>
        </aside>

        <main className={`main ${graded ? 'graded' : ''}`}>
          <div className="crumbs">
            <a href="/courses">Courses</a>
            <span className="sep">/</span>
            <a href="/courses/trust-building">Trust-Building for CAM Firms</a>
            <span className="sep">/</span>
            <span className="here">Knowledge check</span>
          </div>

          <div className="quiz-counter">Final knowledge check</div>
          <h1 className="quiz-h1">Check your learning.</h1>
          <p className="quiz-sub">Five questions on what you covered. Pass at 70%+. You can retake it as many times as you want.</p>
          <div className="quiz-meta">
            <span className="quiz-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              ~5 minutes
            </span>
            <span className="quiz-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><path d="M12 22a10 10 0 1 0-10-10" /></svg>
              5 questions · multiple choice
            </span>
            <span className="quiz-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 4 12 14.01 9 11.01" /></svg>
              Pass at 70%+
            </span>
          </div>

          {/* Result banner — graded only */}
          {graded && (
            <div className="result-banner show">
              <div className="result-banner-grid">
                <div>
                  <div className="result-eyebrow">Quiz complete</div>
                  <h2 className="result-headline">{passed ? 'Nicely done — you passed.' : 'Close — review and retake.'}</h2>
                  <p className="result-sub">You got <strong>{correctCount} of {total}</strong> right. {passed ? "Review the ones you missed below — it's the difference between picking the right signal and picking the comfortable one." : 'Take another look at the explanations and give it another go.'}</p>
                </div>
                <div className="score-ring" style={{ background: `conic-gradient(var(--alloy-yellow) 0% ${pct}%, rgba(255,255,255,0.10) ${pct}% 100%)` }}>
                  <div className="score-ring-inner">
                    <div className="score-ring-pct">{pct}%</div>
                    <div className="score-ring-frac">Score</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Questions */}
          {QUESTIONS.map((q, qi) => {
            const userAnswer = answers[q.id];
            return (
              <div className="question" key={q.id}>
                <div className="q-num">
                  Question {qi + 1} of {total}
                  {graded && (
                    <span className={`q-status ${userAnswer === q.correct ? 'correct' : 'wrong'}`}>
                      {userAnswer === q.correct ? 'Correct' : 'Try again'}
                    </span>
                  )}
                </div>
                <div className="q-prompt">{q.prompt}</div>
                <div className="options">
                  {q.options.map((opt) => {
                    const isCorrect = opt.letter === q.correct;
                    const isUserChoice = userAnswer === opt.letter;
                    let extraCls = '';
                    if (graded) {
                      if (isCorrect) extraCls = 'correct';
                      else if (isUserChoice) extraCls = 'wrong';
                    }
                    return (
                      <div
                        className={`option ${extraCls}`}
                        key={opt.letter}
                        role="button"
                        tabIndex={graded ? -1 : 0}
                        onClick={() => handleSelect(q.id, opt.letter)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSelect(q.id, opt.letter);
                          }
                        }}
                      >
                        <span className={`option-bullet ${isUserChoice ? 'is-checked' : ''}`}></span>
                        <span className="option-text">{opt.text}</span>
                        {graded && (
                          <span className="option-marker">
                            {isCorrect ? 'Correct answer' : isUserChoice ? 'Your answer' : ''}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                {graded && <div className="explanation">{q.explanation}</div>}
              </div>
            );
          })}

          {/* Submit row — pre-grade */}
          {!graded && (
            <div className="submit-row">
              <div className="submit-status">
                {answered === 0 ? 'Demo: click submit to grade' : `${answered} of ${total} answered`}
              </div>
              <button className="btn btn-primary" disabled={submitDisabled} onClick={handleSubmit}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Submit answers
              </button>
            </div>
          )}

          {/* Post-grade actions */}
          {graded && (
            <div className="post-actions" style={{ display: 'flex' }}>
              <div className="completion-card">
                <h3>You finished the course. ★</h3>
                <p>You've completed Trust-Building for CAM Firms. The next step in the Building Trust track is "Putting Trust Signals to Work" — practical templates for collecting, displaying, and refreshing your three signals.</p>
              </div>
              <div className="post-cta-row">
                <a href="#" className="btn btn-secondary">Continue to next course →</a>
                <button className="btn btn-ghost" onClick={handleRetake}>↺ Retake the quiz</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
