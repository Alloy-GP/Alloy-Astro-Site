// src/components/modules/TrustBuildingQuiz.tsx
// Knowledge check for /resources/courses/trust-building (#knowledge-check).
// Island — mounted with client:visible. Question data, scoring (percent
// correct, pass at 70%) and the result / completion copy are ported from the
// retired /courses/trust-building-quiz page (CourseTrustBuildingQuizPage.tsx),
// restyled with rd-* classes (no courses.css dependency).
//
// Changes from the old quiz: the reviewer-only DEMO_ANSWERS auto-fill is gone
// (submit unlocks once every question is answered), and grading scrolls to the
// #knowledge-check section instead of the top of the window.
import { useState } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { Label, TextLink, CheckIcon } from '~/components/rd/atoms';

type Question = {
  id: string;
  prompt: ReactNode;
  correct: string; // letter
  options: { letter: string; text: ReactNode }[];
  explanation: ReactNode;
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

const PASS_PCT = 70;

function scrollToSection() {
  const el = document.getElementById('knowledge-check');
  if (!el) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

/** Option chip styles by state (no rd-* class covers selected/graded chips). */
function optionStyle(state: 'idle' | 'selected' | 'correct' | 'wrong' | 'dim'): CSSProperties {
  const base: CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left',
    padding: '10px 14px', fontFamily: 'var(--font-body)', lineHeight: 1.45, cursor: 'pointer',
  };
  switch (state) {
    case 'selected': return { ...base, borderColor: 'var(--alloy-purple)', background: 'var(--alloy-purple-tint)' };
    case 'correct': return { ...base, cursor: 'default', borderColor: 'var(--engine-retain)', background: 'var(--alloy-green-tint)', color: 'var(--alloy-purple)' };
    case 'wrong': return { ...base, cursor: 'default', borderColor: 'var(--alloy-pink)', background: 'var(--alloy-pink-tint)', color: 'var(--alloy-purple)' };
    case 'dim': return { ...base, cursor: 'default', opacity: 0.55 };
    default: return base;
  }
}

export default function TrustBuildingQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState(false);

  const total = QUESTIONS.length;
  const answered = QUESTIONS.filter((q) => answers[q.id]).length;
  const correctCount = QUESTIONS.filter((q) => answers[q.id] === q.correct).length;
  const pct = Math.round((correctCount / total) * 100);
  const passed = pct >= PASS_PCT;

  const handleSelect = (qid: string, letter: string) => {
    if (graded) return;
    setAnswers((prev) => ({ ...prev, [qid]: letter }));
  };

  const handleSubmit = () => {
    if (answered < total) return;
    setGraded(true);
    requestAnimationFrame(scrollToSection);
  };

  const handleRetake = () => {
    setAnswers({});
    setGraded(false);
    requestAnimationFrame(scrollToSection);
  };

  return (
    <div className="rd-card rd-stack" style={{ padding: 28, gap: 24 }}>
      <div className="rd-tiny rd-w-500">~5 minutes · {total} questions · multiple choice · Pass at {PASS_PCT}%+ · Retake as many times as you want</div>

      {/* Result banner — graded only */}
      {graded ? (
        <div className="rd-bg-purple rd-row rd-row--between rd-row--wrap" role="status" style={{ borderRadius: 10, padding: '24px 26px', gap: 24 }}>
          <div className="rd-stack rd-stack--10" style={{ flex: '1 1 320px' }}>
            <Label tone="yellow">Quiz complete</Label>
            <div className="rd-title-22">{passed ? 'Nicely done — you passed.' : 'Close — review and retake.'}</div>
            <div className="rd-small rd-small--14" style={{ color: '#fff', opacity: 0.85 }}>
              You got <strong>{correctCount} of {total}</strong> right. {passed ? "Review the ones you missed below — it's the difference between picking the right signal and picking the comfortable one." : 'Take another look at the explanations and give it another go.'}
            </div>
          </div>
          <div aria-hidden="true" style={{ flex: 'none', width: 104, height: 104, borderRadius: '50%', background: `conic-gradient(var(--alloy-yellow) 0% ${pct}%, rgba(255,255,255,0.12) ${pct}% 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--alloy-purple)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="rd-stat-num" style={{ fontSize: 24 }}>{pct}%</div>
              <div className="rd-label rd-label--white" style={{ fontSize: 9, opacity: 0.7 }}>Score</div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Questions */}
      {QUESTIONS.map((q, qi) => {
        const userAnswer = answers[q.id];
        const right = userAnswer === q.correct;
        return (
          <div key={q.id} className="rd-stack rd-stack--10">
            <div className="rd-row rd-row--between" style={{ alignItems: 'flex-start', gap: 12 }}>
              <div id={`${q.id}-prompt`} className="rd-title-15" style={{ fontSize: 16, lineHeight: 1.4 }}>{qi + 1}. {q.prompt}</div>
              {graded ? (
                <span className={`rd-tag ${right ? 'rd-tag--retain' : 'rd-tag--reach'}`} style={{ flex: 'none' }}>{right ? 'Correct' : 'Try again'}</span>
              ) : null}
            </div>
            <div role="radiogroup" aria-labelledby={`${q.id}-prompt`} className="rd-stack" style={{ gap: 8 }}>
              {q.options.map((opt) => {
                const isCorrect = opt.letter === q.correct;
                const isUserChoice = userAnswer === opt.letter;
                const state = graded
                  ? isCorrect ? 'correct' : isUserChoice ? 'wrong' : 'dim'
                  : isUserChoice ? 'selected' : 'idle';
                return (
                  <button
                    key={opt.letter}
                    type="button"
                    role="radio"
                    aria-checked={isUserChoice}
                    aria-disabled={graded}
                    className="rd-chip"
                    style={optionStyle(state)}
                    onClick={() => handleSelect(q.id, opt.letter)}
                  >
                    <span className="rd-label rd-label--purple" style={{ flex: 'none', minWidth: 14 }}>{opt.letter}</span>
                    <span style={{ flex: 1 }}>{opt.text}</span>
                    {graded && (isCorrect || isUserChoice) ? (
                      <span className="rd-label" style={{ flex: 'none', color: isCorrect ? 'var(--engine-retain)' : 'var(--alloy-pink)' }}>
                        {isCorrect ? 'Correct answer' : 'Your answer'}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            {graded ? (
              <div className="rd-small rd-small--14" style={{ background: 'var(--alloy-off-white)', borderLeft: '3px solid var(--alloy-purple)', borderRadius: '0 8px 8px 0', padding: '12px 16px' }}>{q.explanation}</div>
            ) : null}
          </div>
        );
      })}

      {/* Submit row — pre-grade */}
      {!graded ? (
        <div className="rd-row rd-row--between rd-row--wrap rd-rule-top" style={{ paddingTop: 20 }}>
          <div className="rd-tiny" aria-live="polite">{answered} of {total} answered</div>
          <button
            type="button"
            className="rd-btn rd-btn--inline"
            disabled={answered < total}
            onClick={handleSubmit}
            style={answered < total ? { opacity: 0.5, cursor: 'not-allowed', boxShadow: 'none' } : undefined}
          >
            Submit answers
          </button>
        </div>
      ) : (
        /* Post-grade actions */
        <div className="rd-stack rd-stack--18 rd-rule-top" style={{ paddingTop: 20 }}>
          <div className="rd-card rd-card--off rd-stack rd-stack--10" style={{ padding: '22px 24px' }}>
            <div className="rd-row" style={{ gap: 10 }}>
              <CheckIcon size={18} color="var(--engine-retain)" />
              <div className="rd-title-18">You finished the course. ★</div>
            </div>
            <div className="rd-small rd-small--14">You've completed Trust-Building for CAM Firms. The next step in the Building Trust track is "Putting Trust Signals to Work" — practical templates for collecting, displaying, and refreshing your three signals.</div>
          </div>
          <div className="rd-row rd-row--wrap" style={{ gap: 20 }}>
            <button type="button" className="rd-btn rd-btn--outline rd-btn--sm rd-btn--inline" onClick={handleRetake}>Retake the quiz</button>
            <TextLink href="/resources/courses" size={12}>Browse all courses</TextLink>
          </div>
        </div>
      )}
    </div>
  );
}
