// src/components/pages/CoursesPage.tsx
import { useState, useEffect, useCallback, type CSSProperties } from 'react';
import Button from '~/components/Button';
import Eyebrow from '~/components/Eyebrow';
import { PageHero, CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, GREEN, BLUE } from '~/lib/tokens';

// ─── Progress reset modal ────────────────────────────────────────────────────

function CourseProgressControl() {
  const [open, setOpen] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [keyCount, setKeyCount] = useState(0);

  const PREFIXES = ['alloy:course:', 'alloy:progress:', 'alloy:quiz:'];

  const countKeys = useCallback(() => {
    try {
      let n = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && PREFIXES.some(p => k.startsWith(p))) n++;
      }
      return n;
    } catch { return 0; }
  }, []);

  useEffect(() => {
    if (open) setKeyCount(countKeys());
  }, [open, countKeys, cleared]);

  const handleClear = () => {
    try {
      const toRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && PREFIXES.some(p => k.startsWith(p))) toRemove.push(k);
      }
      toRemove.forEach(k => localStorage.removeItem(k));
      setCleared(true);
      setTimeout(() => setCleared(false), 2400);
    } catch { /* noop */ }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
          fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: '#888', textDecoration: 'underline', textUnderlineOffset: 4,
          textDecorationColor: 'rgba(136,136,136,0.4)',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = PURPLE; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#888'; }}
      >
        Reset course progress
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-progress-title"
          onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(56,28,79,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20, backdropFilter: 'blur(2px)',
          }}
        >
          <div style={{
            background: '#fff', borderRadius: 14, maxWidth: 520, width: '100%',
            padding: 32, boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
            border: `4px solid ${YELLOW}`, position: 'relative',
          }}>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute', top: 14, right: 14,
                background: 'transparent', border: 0, cursor: 'pointer',
                fontSize: 20, color: '#888', lineHeight: 1, padding: 6,
              }}
            >×</button>
            <Eyebrow>About course progress</Eyebrow>
            <h3 id="reset-progress-title" className="display-md" style={{ fontSize: 24, color: PURPLE, margin: '10px 0 14px', lineHeight: 1.2 }}>
              Your progress lives in <span style={{ color: PINK }}>this browser.</span>
            </h3>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 14 }}>
              Lesson completion, quiz scores, and your last-viewed lesson are stored locally on this device — there's no account system yet. That means:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Use the same browser on the same device to keep your progress.',
                "Clearing your browser's site data will also clear it.",
                'A different browser, device, or incognito window starts fresh.',
              ].map(t => (
                <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: '#444', lineHeight: 1.55 }}>
                  <span style={{
                    width: 14, height: 14, borderRadius: 999, background: PINK, color: '#fff',
                    fontSize: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 3, fontWeight: 800,
                  }}>✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div style={{
              background: '#fafafa', border: '1px solid var(--border-subtle)',
              borderRadius: 10, padding: 16, marginBottom: 18, fontSize: 13, color: '#555', lineHeight: 1.55,
            }}>
              <strong style={{ color: PURPLE }}>Want to keep your progress across devices?</strong> Accounts are coming. Until then, the safest path is to stay in one browser — or finish a course in a single sitting. They're built short for exactly that reason.
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
              paddingTop: 16, borderTop: '1px solid var(--border-subtle)',
            }}>
              <div style={{ fontSize: 12, color: '#888', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                {cleared
                  ? <span style={{ color: GREEN }}>Cleared — progress reset.</span>
                  : keyCount === 0
                    ? <>No saved progress on this device.</>
                    : <>{keyCount} progress {keyCount === 1 ? 'entry' : 'entries'} saved.</>
                }
              </div>
              <button
                type="button"
                onClick={handleClear}
                disabled={keyCount === 0}
                style={{
                  background: keyCount === 0 ? '#eee' : PURPLE,
                  color: keyCount === 0 ? '#aaa' : '#fff',
                  border: 0, borderRadius: 8, padding: '10px 16px',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
                  letterSpacing: '0.04em', cursor: keyCount === 0 ? 'not-allowed' : 'pointer',
                  transition: 'background 0.18s ease',
                }}
              >
                {cleared ? 'Done' : 'Reset progress'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Stripe pattern helper ────────────────────────────────────────────────────

function StripeDefs({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="14" stroke={PURPLE} strokeWidth="1" />
      </pattern>
    </defs>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CoursesPage() {

  const courses = [
    {
      title: 'Trust-Building for CAM Firms',
      color: PURPLE,
      lessons: 10,
      time: '55 min',
      level: 'Foundations',
      badge: 'Trust Operator',
      free: true,
      live: true,
      imgLabel: 'Reviews · testimonials · case studies',
      badgeImg: '/assets/badges/badge-citation.svg',
      desc: 'Why trust — not service quality — decides which CAM firms boards renew, refer, and rave about. Ten lessons plus a knowledge check.',
      href: '/courses/trust-building',
    },
    {
      title: 'Proposal Anatomy That Wins',
      color: PINK,
      lessons: 7,
      time: '75 min',
      level: 'Intermediate',
      badge: 'Proposal Architect',
      free: false,
      live: false,
      imgLabel: 'RFP framework breakdown',
      badgeImg: '/assets/badges/badge-proposal.svg',
      desc: 'The 7-section RFP framework that flips your win rate. Templates, narrative builds, and pricing presentation.',
      href: '/courses/proposal-anatomy',
    },
    {
      title: 'Build a Board Education Engine',
      color: GREEN,
      lessons: 6,
      time: '60 min',
      level: 'Foundations',
      badge: 'Board Educator',
      free: false,
      live: false,
      imgLabel: 'Learning library mockup',
      badgeImg: '/assets/badges/badge-board.svg',
      desc: 'How to launch a branded learning library that boards return to — and how to use it as a retention engine.',
      href: '/courses/board-education-engine',
    },
    {
      title: 'The Manager-Transition Playbook',
      color: BLUE,
      lessons: 4,
      time: '35 min',
      level: 'Practical',
      badge: 'Retention Specialist',
      free: false,
      live: false,
      imgLabel: 'Transition checklist',
      badgeImg: '/assets/badges/badge-retention.svg',
      desc: 'Reduce manager-turnover-driven churn with a transition checklist, comms cadence, and 90-day plan.',
      href: '/courses/manager-transition',
    },
  ];

  const featured = {
    title: 'Outsmarting AI Search',
    color: YELLOW,
    lessons: 5,
    time: '45 min',
    level: 'Foundations',
    badge: 'Citation Strategist',
    imgLabel: 'AI search citation diagram',
    badgeImg: '/assets/badges/badge-citation.svg',
    desc: 'From AI-search fundamentals to citation strategy. Built for CAM operators who want to be the answer ChatGPT cites.',
    href: '/courses/outsmarting-ai-search',
  };

  const comingSoon = [
    { title: 'Property Management SEO Foundations', color: YELLOW, level: 'Foundations', time: '60 min', lessons: 6, badge: 'Search Operator', desc: "The technical + content fundamentals that get a CAM firm ranking in board-stage searches across a metro.", imgLabel: 'SEO architecture map' },
    { title: 'Lead Generation for Board Stage', color: YELLOW, level: 'Intermediate', time: '70 min', lessons: 7, badge: 'Pipeline Engineer', desc: "Build a multi-touch intake system designed for the way boards actually shortlist — not the way ad platforms think they do.", imgLabel: 'Lead funnel diagram' },
    { title: 'The Newsletter Operating System', color: YELLOW, level: 'Practical', time: '45 min', lessons: 5, badge: 'Newsletter Operator', desc: "A repeatable production cadence for the monthly newsletter that boards forward instead of delete.", imgLabel: 'Newsletter calendar' },
    { title: 'RFP Response in 14 Days', color: PINK, level: 'Practical', time: '55 min', lessons: 5, badge: 'Response Operator', desc: "The done-for-you sequence — kickoff to delivery — for a proposal that lands inside two weeks without burning the team.", imgLabel: '14-day RFP timeline' },
    { title: 'Sales Messaging That Closes Boards', color: PINK, level: 'Intermediate', time: '65 min', lessons: 6, badge: 'Messaging Architect', desc: "Reframe your value prop, talk track, and proposal narrative around the four objections boards actually voice.", imgLabel: 'Messaging framework' },
    { title: 'Groundwork: Fractional BD for CAM', color: PINK, level: 'Advanced', time: '80 min', lessons: 8, badge: 'Business Developer', desc: "How to run a fractional business development motion that books qualified board meetings — without a full-time hire.", imgLabel: 'BD pipeline board' },
    { title: 'Reputation Management for CAM', color: GREEN, level: 'Foundations', time: '50 min', lessons: 5, badge: 'Reputation Operator', desc: "A practical reputation system: review velocity, response cadence, and the board-facing dashboard that proves it's working.", imgLabel: 'Review velocity chart' },
    { title: 'The Annual Report as Retention Asset', color: GREEN, level: 'Practical', time: '55 min', lessons: 6, badge: 'Reporting Architect', desc: "Turn the annual report from a compliance artifact into a renewal-stage retention tool boards re-read every spring.", imgLabel: 'Annual report spread' },
    { title: 'Branding for CAM', color: BLUE, level: 'Foundations', time: '60 min', lessons: 6, badge: 'Brand Operator', desc: "What a brand system looks like for a community management firm — and how to build one without burning a year of comms.", imgLabel: 'Brand system grid' },
  ];

  const metrics = [
    { color: PINK, k: '92%', v: 'of operators who finish a course ship a change to their playbook within 30 days.' },
    { color: YELLOW, k: '47 min', v: 'average time to complete a course — built for the gap between two board calls.' },
    { color: GREEN, k: '3.4×', v: 'more proposal wins reported by operators who finish Proposal Anatomy.' },
    { color: BLUE, k: '1,200+', v: 'CAM operators have earned at least one Alloy badge since launch.' },
  ];

  // Featured course card — rendered in the hero right column (dark-mode variant)
  const featuredCard = (
    <div
      aria-disabled="true"
      style={{
        display: 'block',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderTop: `5px solid ${featured.color}`,
        borderRadius: 12,
        overflow: 'hidden',
        color: '#fff',
        cursor: 'default',
        filter: 'grayscale(0.5)',
        opacity: 0.82,
      }}
    >
      {/* Image band */}
      <div style={{
        position: 'relative',
        background: `linear-gradient(135deg, ${featured.color} 0%, ${featured.color}cc 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 160, overflow: 'hidden',
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.35 } as CSSProperties} aria-hidden="true">
          <StripeDefs id="stripes-featured" />
          <rect width="100%" height="100%" fill="url(#stripes-featured)" />
        </svg>
        <div style={{
          position: 'relative',
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: PURPLE, background: 'rgba(255,255,255,0.85)',
          padding: '6px 10px', borderRadius: 4, fontWeight: 600,
          textAlign: 'center', maxWidth: '80%',
        }}>
          {featured.imgLabel}
        </div>
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: '#9a9a9a', color: '#fff',
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
          padding: '5px 10px', borderRadius: 999,
        }}>Coming Soon</div>
      </div>
      {/* Text */}
      <div style={{ padding: '24px 26px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>
          <span>{featured.level}</span>
          <span style={{ width: 3, height: 3, background: 'rgba(255,255,255,0.4)', borderRadius: 999 }} />
          <span>{featured.lessons} lessons</span>
          <span style={{ width: 3, height: 3, background: 'rgba(255,255,255,0.4)', borderRadius: 999 }} />
          <span>{featured.time}</span>
        </div>
        <div className="display-md" style={{ fontSize: 24, color: '#fff', lineHeight: 1.15 }}>{featured.title}</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>{featured.desc}</div>
        <div style={{ marginTop: 6, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            <span style={{
              width: 18, height: 18, borderRadius: 999, background: featured.color,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, color: PURPLE, fontWeight: 800,
            }}>★</span>
            <span>Earns: {featured.badge}</span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>
            In production
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <PageHero
        dark
        eyebrow="Courses"
        h1={<>Free and premium micro-courses<br />for <span style={{ color: PINK }}>CAM operators.</span></>}
        sub="Tight, practical, and built around field-tested frameworks. Each course is 30–90 minutes total — designed for owners and operators who don't have an afternoon to spare."
        sideStat={featuredCard}
        sideStatRaw
      />

      {/* ── Live courses ──────────────────────────────────────────────────── */}
      <section className="section section-white">
        <div className="container">
          {/* Section header */}
          <div style={{ marginBottom: 28, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <Eyebrow>The current catalog</Eyebrow>
              <h2 className="display-lg" style={{ margin: '12px 0 0', color: PURPLE }}>
                Live courses, <span style={{ color: PINK }}>shipping now.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, maxWidth: 360 }}>
              <p style={{ color: '#666', fontSize: 14, lineHeight: 1.55, margin: 0, textAlign: 'right' }}>
                Three premium courses built around the frameworks we run inside paid engagements. The free intro course lives in the hero above.
              </p>
              <CourseProgressControl />
            </div>
          </div>

          {/* 3-col grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {courses.map((c, i) => (
              c.live ? (
              <a
                key={c.title}
                href={c.href}
                style={{
                  display: 'flex', flexDirection: 'column',
                  background: '#fff',
                  border: '1px solid var(--border-subtle)',
                  borderTop: `5px solid ${c.color}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                  position: 'relative',
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 32px rgba(56,28,79,0.13)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = '';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '';
                }}
              >
                {/* Image band */}
                <div style={{
                  position: 'relative',
                  background: `linear-gradient(135deg, ${c.color} 0%, ${c.color}cc 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  minHeight: 160, overflow: 'hidden',
                }}>
                  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.35 } as CSSProperties} aria-hidden="true">
                    <StripeDefs id={`stripes-${i}`} />
                    <rect width="100%" height="100%" fill={`url(#stripes-${i})`} />
                  </svg>
                  <div style={{
                    position: 'relative',
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: PURPLE, background: 'rgba(255,255,255,0.85)',
                    padding: '6px 10px', borderRadius: 4, fontWeight: 600,
                    textAlign: 'center', maxWidth: '80%',
                  }}>
                    {c.imgLabel}
                  </div>
                  {c.free && (
                    <div style={{
                      position: 'absolute', top: 12, left: 12,
                      background: PURPLE, color: c.color === PURPLE ? YELLOW : c.color,
                      fontFamily: 'var(--font-display)', fontWeight: 800,
                      fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
                      padding: '5px 10px', borderRadius: 999,
                    }}>Free</div>
                  )}
                </div>

                {/* Text */}
                <div style={{ padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#888' }}>
                    <span>{c.level}</span>
                    <span style={{ width: 3, height: 3, background: '#bbb', borderRadius: 999 }} />
                    <span>{c.lessons} lessons</span>
                    <span style={{ width: 3, height: 3, background: '#bbb', borderRadius: 999 }} />
                    <span>{c.time}</span>
                  </div>
                  <div className="display-md" style={{ fontSize: 24, color: PURPLE, lineHeight: 1.15 }}>{c.title}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{c.desc}</div>
                  <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: PURPLE, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: 999,
                        background: c.color,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, color: PURPLE, fontWeight: 800,
                      }}>★</span>
                      <span>Earns: {c.badge}</span>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: PURPLE }}>
                      Start the course →
                    </span>
                  </div>
                </div>
              </a>
              ) : (
              <div
                key={c.title}
                aria-disabled="true"
                style={{
                  display: 'flex', flexDirection: 'column',
                  background: '#fafafa',
                  border: '1px solid var(--border-subtle)',
                  borderTop: `5px solid ${c.color}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'default',
                  filter: 'grayscale(0.85)',
                  opacity: 0.78,
                }}
              >
                {/* Image band */}
                <div style={{
                  position: 'relative',
                  background: `linear-gradient(135deg, ${c.color} 0%, ${c.color}cc 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  minHeight: 160, overflow: 'hidden',
                }}>
                  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.35 } as CSSProperties} aria-hidden="true">
                    <StripeDefs id={`stripes-${i}`} />
                    <rect width="100%" height="100%" fill={`url(#stripes-${i})`} />
                  </svg>
                  <div style={{
                    position: 'relative',
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: PURPLE, background: 'rgba(255,255,255,0.85)',
                    padding: '6px 10px', borderRadius: 4, fontWeight: 600,
                    textAlign: 'center', maxWidth: '80%',
                  }}>
                    {c.imgLabel}
                  </div>
                  <div style={{
                    position: 'absolute', top: 12, left: 12,
                    background: '#9a9a9a', color: '#fff',
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
                    padding: '5px 10px', borderRadius: 999,
                  }}>Coming Soon</div>
                </div>
                {/* Text */}
                <div style={{ padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#888' }}>
                    <span>{c.level}</span>
                    <span style={{ width: 3, height: 3, background: '#bbb', borderRadius: 999 }} />
                    <span>{c.lessons} lessons</span>
                    <span style={{ width: 3, height: 3, background: '#bbb', borderRadius: 999 }} />
                    <span>{c.time}</span>
                  </div>
                  <div className="display-md" style={{ fontSize: 24, color: PURPLE, lineHeight: 1.15 }}>{c.title}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{c.desc}</div>
                  <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#888', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: 999, background: '#cfcfcf',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, color: '#fff', fontWeight: 800,
                      }}>★</span>
                      <span>Earns: {c.badge}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#999', letterSpacing: '0.02em' }}>
                      In production
                    </span>
                  </div>
                </div>
              </div>
              )
            ))}
          </div>

          {/* ── Coming soon catalog ──────────────────────────────────────── */}
          <div style={{ marginTop: 80, marginBottom: 28, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <Eyebrow>The roadmap</Eyebrow>
              <h2 className="display-lg" style={{ margin: '12px 0 0', color: PURPLE }}>
                Coming soon — <span style={{ color: PINK }}>one course per service area.</span>
              </h2>
            </div>
            <p style={{ color: '#666', fontSize: 14, maxWidth: 380, lineHeight: 1.55, margin: 0 }}>
              One headline course for every active service inside the Alloy system — built around the same field-tested frameworks. Drops staggered through the year.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {comingSoon.map((c, i) => (
              <div
                key={c.title}
                aria-disabled="true"
                style={{
                  display: 'flex', flexDirection: 'column',
                  background: '#fafafa',
                  border: '1px solid var(--border-subtle)',
                  borderTop: `5px solid ${c.color}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'default',
                  filter: 'grayscale(0.85)',
                  opacity: 0.78,
                }}
              >
                {/* Image band */}
                <div style={{
                  position: 'relative',
                  background: `linear-gradient(135deg, ${c.color} 0%, ${c.color}cc 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  minHeight: 160, overflow: 'hidden',
                }}>
                  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.35 } as CSSProperties} aria-hidden="true">
                    <StripeDefs id={`stripes-cs-${i}`} />
                    <rect width="100%" height="100%" fill={`url(#stripes-cs-${i})`} />
                  </svg>
                  <div style={{
                    position: 'relative',
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: PURPLE, background: 'rgba(255,255,255,0.85)',
                    padding: '6px 10px', borderRadius: 4, fontWeight: 600,
                    textAlign: 'center', maxWidth: '80%',
                  }}>
                    {c.imgLabel}
                  </div>
                  <div style={{
                    position: 'absolute', top: 12, left: 12,
                    background: '#9a9a9a', color: '#fff',
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
                    padding: '5px 10px', borderRadius: 999,
                  }}>Coming Soon</div>
                </div>
                {/* Text */}
                <div style={{ padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#888' }}>
                    <span>{c.level}</span>
                    <span style={{ width: 3, height: 3, background: '#bbb', borderRadius: 999 }} />
                    <span>{c.lessons} lessons</span>
                    <span style={{ width: 3, height: 3, background: '#bbb', borderRadius: 999 }} />
                    <span>{c.time}</span>
                  </div>
                  <div className="display-md" style={{ fontSize: 22, color: PURPLE, lineHeight: 1.18 }}>{c.title}</div>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{c.desc}</div>
                  <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#888', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: 999, background: '#cfcfcf',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, color: '#fff', fontWeight: 800,
                      }}>★</span>
                      <span>Earns: {c.badge}</span>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#999', letterSpacing: '0.02em' }}>
                      In production
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics ───────────────────────────────────────────────────────── */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 720 }}>
            <Eyebrow>Why take the time</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 14px', color: PURPLE }}>
              An hour now. <span style={{ color: PINK }}>Months of compounding</span> later.
            </h2>
            <p style={{ color: '#555', fontSize: 17, lineHeight: 1.6 }}>
              These courses aren't theory. They're the same frameworks we run inside paid engagements — distilled, sequenced, and timed for operators who already have a full calendar.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {metrics.map(s => (
              <div key={s.k} style={{ borderTop: `4px solid ${s.color}`, paddingTop: 18 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 56, color: PURPLE, lineHeight: 0.95, letterSpacing: '-0.025em', marginBottom: 10 }}>{s.k}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.5 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alloy Certified ───────────────────────────────────────────────── */}
      <section className="section section-white">
        <div className="container">
          <div style={{
            background: '#fff',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16,
            padding: 56,
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 56,
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div>
              <Eyebrow>Coming soon · Alloy Certified</Eyebrow>
              <h2 className="display-lg" style={{ margin: '14px 0 16px', color: PURPLE }}>
                Stack badges.<br />Become <span style={{ color: PINK }}>Alloy Certified.</span>
              </h2>
              <p style={{ color: '#555', fontSize: 16, lineHeight: 1.65, marginBottom: 22 }}>
                Each course earns a focused badge — proof you've put a specific framework into your operating practice. Collect the four core badges and you're{' '}
                <strong style={{ color: PURPLE }}>Alloy Certified</strong>: a shorthand for CAM operators who run engineered, not accidental, growth.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'A verifiable badge for your LinkedIn and email signature.',
                  'Listing on the Alloy Certified operator directory.',
                  'Early access to new course drops and field-tested templates.',
                ].map(t => (
                  <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#444', lineHeight: 1.55 }}>
                    <span style={{ width: 16, height: 16, borderRadius: 999, background: PINK, color: '#fff', fontSize: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, fontWeight: 800 }}>✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Button variant="primary" arrow href="/strategic-review-request">Start your first course</Button>
            </div>

            {/* Badge cluster */}
            <div style={{ position: 'relative', minHeight: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <style>{`
                @keyframes badgeFloat0 { 0%,100% { transform: translate(0,0) rotate(-8deg); } 50% { transform: translate(-5px,-7px) rotate(-6deg); } }
                @keyframes badgeFloat1 { 0%,100% { transform: translate(0,0) rotate(6deg); } 50% { transform: translate(6px,-5px) rotate(8deg); } }
                @keyframes badgeFloat2 { 0%,100% { transform: translate(0,0) rotate(4deg); } 50% { transform: translate(-4px,6px) rotate(2deg); } }
                @keyframes badgeFloat3 { 0%,100% { transform: translate(0,0) rotate(-6deg); } 50% { transform: translate(7px,5px) rotate(-4deg); } }
              `}</style>
              <div style={{ position: 'relative', width: 360, height: 360 }}>
                {([
                  { label: 'Citation Strategist', x: 0, y: 0, rot: -8, img: '/assets/badges/badge-citation.svg' },
                  { label: 'Proposal Architect', x: 180, y: 20, rot: 6, img: '/assets/badges/badge-proposal.svg' },
                  { label: 'Board Educator', x: 30, y: 180, rot: 4, img: '/assets/badges/badge-board.svg' },
                  { label: 'Retention Specialist', x: 200, y: 200, rot: -6, img: '/assets/badges/badge-retention.svg' },
                ] as const).map((b, i) => (
                  <div key={b.label} style={{
                    position: 'absolute',
                    left: b.x, top: b.y,
                    width: 150, height: 164,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    filter: 'drop-shadow(0 10px 20px rgba(56,28,79,0.18))',
                    animation: `badgeFloat${i} ${7 + i}s ease-in-out ${i * 0.4}s infinite`,
                    transformOrigin: 'center',
                  }}>
                    <img src={b.img} alt={b.label + ' badge'} style={{ width: '100%', height: '100%' }} />
                  </div>
                ))}
                {/* Center seal */}
                <div style={{
                  position: 'absolute',
                  left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 140, height: 154,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  filter: 'drop-shadow(0 14px 32px rgba(56,28,79,0.30))',
                  zIndex: 2,
                }}>
                  <img src="/assets/badges/badge-certified.svg" alt="Alloy Certified" style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
