// src/components/pages/CourseTrustBuildingLessonPage.tsx
// Data-driven lesson page for the Trust-Building course.
// Accepts a lessonSlug prop from the Astro page.
import { useState, useEffect, useCallback } from 'react';
import {
  LESSONS,
  SIDEBAR_MODULES,
  COURSE_STORAGE_KEY,
  QUIZ_URL,
  COURSE_URL,
  getLessonBySlug,
  getPrevLesson,
  getNextLesson,
} from '~/data/courseTrustBuilding';

const ArrowLeft = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
  </svg>
);
const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
  </svg>
);

function loadCompleted(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(COURSE_STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr) : new Set();
  } catch {
    return new Set();
  }
}

function saveCompleted(slugs: Set<string>) {
  try {
    localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify([...slugs]));
  } catch {
    // silently fail
  }
}

interface Props {
  lessonSlug: string;
}

export default function CourseTrustBuildingLessonPage({ lessonSlug }: Props) {
  const lesson = getLessonBySlug(lessonSlug);
  const prevLesson = getPrevLesson(lessonSlug);
  const nextLesson = getNextLesson(lessonSlug);

  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [justCompleted, setJustCompleted] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    setCompleted(loadCompleted());
  }, []);

  const handleMarkComplete = useCallback(() => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(lessonSlug);
      saveCompleted(next);
      return next;
    });
    setJustCompleted(true);
    // Navigate to next destination after brief delay
    setTimeout(() => {
      const dest = nextLesson
        ? `/courses/trust-building/lessons/${nextLesson.slug}`
        : QUIZ_URL;
      window.location.href = dest;
    }, 280);
  }, [lessonSlug, nextLesson]);

  if (!lesson) {
    return (
      <div className="course-page">
        <div className="shell">
          <main className="main">
            <p>Lesson not found.</p>
            <a href={COURSE_URL}>← Back to course</a>
          </main>
        </div>
      </div>
    );
  }

  // Progress calculation
  const completedCount = completed.size;
  const totalItems = LESSONS.length + 1; // 10 lessons + quiz
  const progressPct = Math.round((completedCount / totalItems) * 100);

  // Sidebar state helpers
  const isCompleted = (slug: string) => completed.has(slug);
  const isActive = (slug: string) => slug === lessonSlug;

  const getLessonCheck = (slug: string) => {
    if (isCompleted(slug)) return '✓';
    const idx = LESSONS.findIndex((l) => l.slug === slug);
    return String(idx + 1);
  };

  return (
    <div className="course-page">
      <div className="shell">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-inner">
            <div className="sidebar-head">
              <div className="sidebar-eyebrow">Building Trust</div>
              <div className="sidebar-title">Trust-Building for CAM Firms</div>
              <div className="sidebar-meta">
                10 lessons · 1 quiz · <strong>{progressPct}% complete</strong>
              </div>
            </div>

            {SIDEBAR_MODULES.map((mod, mi) => {
              const modLessons = mod.lessons.map((i) => LESSONS[i]).filter((l): l is NonNullable<typeof l> => l != null);
              const allDone = modLessons.every((l) => isCompleted(l.slug));
              const isLastModule = mi === SIDEBAR_MODULES.length - 1;

              return (
                <div
                  key={mi}
                  className={`module-block${allDone ? ' done' : ''}`}
                  style={{ ['--module-color' as never]: mod.color }}
                >
                  <div className="module-label">{mod.label}</div>
                  {modLessons.map((l) => (
                    <a
                      key={l.slug}
                      className={`lesson-row${isActive(l.slug) ? ' active' : ''}${isCompleted(l.slug) ? ' done' : ''}`}
                      href={`/courses/trust-building/lessons/${l.slug}`}
                    >
                      <div className="lesson-check">{getLessonCheck(l.slug)}</div>
                      <div className="lesson-text">
                        {l.title}
                        <small>{l.duration} · Lesson</small>
                      </div>
                    </a>
                  ))}
                  {/* Add quiz row to last module */}
                  {isLastModule && (
                    <a className="lesson-row" href={QUIZ_URL}>
                      <div className="lesson-check">★</div>
                      <div className="lesson-text">
                        Check your learning
                        <small>5 min · Quiz</small>
                      </div>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main content */}
        <main className="main">
          <div className="crumbs">
            <a href="/courses">Courses</a>
            <span className="sep">/</span>
            <a href={COURSE_URL}>Trust-Building for CAM Firms</a>
            <span className="sep">/</span>
            <span className="here">{lesson.moduleLabel} · Lesson {lesson.index}</span>
          </div>

          <div className="lesson-counter">Lesson {String(lesson.index).padStart(2, '0')} of 10</div>
          <h1 className="lesson-h1">{lesson.title}</h1>

          <div className="lesson-meta">
            <span className="lesson-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {lesson.duration}
            </span>
            <span className="lesson-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              Video + transcript
            </span>
            <span className="lesson-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Foundations
            </span>
          </div>

          {/* Video placeholder */}
          <div className="video">
            <button className="video-play" aria-label="Play lesson video">
              <svg width="32" height="32" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
            <div className="video-caption">Lesson {lesson.index} · {lesson.duration} · Tap to play</div>
          </div>

          {/* Lesson body rendered from HTML */}
          <div
            className="lesson-body"
            dangerouslySetInnerHTML={{ __html: lesson.bodyHtml }}
          />

          {/* Lesson footer / nav */}
          <div className="lesson-foot">
            <div className="complete-row">
              <button
                className={`btn btn-primary${justCompleted ? ' btn-success' : ''}`}
                onClick={handleMarkComplete}
                disabled={justCompleted}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {justCompleted
                  ? 'Marked complete!'
                  : isCompleted(lessonSlug)
                    ? 'Continue to next lesson →'
                    : 'Mark complete & continue'}
              </button>
              {nextLesson ? (
                <a href={`/courses/trust-building/lessons/${nextLesson.slug}`} className="btn btn-ghost">
                  Skip for now →
                </a>
              ) : (
                <a href={QUIZ_URL} className="btn btn-ghost">Skip to quiz →</a>
              )}
            </div>

            <div className="nav-row">
              {prevLesson ? (
                <a className="nav-card" href={`/courses/trust-building/lessons/${prevLesson.slug}`}>
                  <div className="nav-card-label">
                    <ArrowLeft size={12} />
                    Previous lesson
                  </div>
                  <div className="nav-card-title">{prevLesson.title}</div>
                </a>
              ) : (
                <a className="nav-card" href={COURSE_URL}>
                  <div className="nav-card-label">
                    <ArrowLeft size={12} />
                    Back to course
                  </div>
                  <div className="nav-card-title">Trust-Building for CAM Firms</div>
                </a>
              )}

              {nextLesson ? (
                <a className="nav-card next" href={`/courses/trust-building/lessons/${nextLesson.slug}`}>
                  <div className="nav-card-label">
                    Next lesson · {nextLesson.moduleLabel}
                    <ArrowRight size={12} />
                  </div>
                  <div className="nav-card-title">{nextLesson.title}</div>
                </a>
              ) : (
                <a className="nav-card next" href={QUIZ_URL}>
                  <div className="nav-card-label">
                    Up next · Module 5
                    <ArrowRight size={12} />
                  </div>
                  <div className="nav-card-title">Check your learning — knowledge quiz</div>
                </a>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
