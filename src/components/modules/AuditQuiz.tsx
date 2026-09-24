// src/components/modules/AuditQuiz.tsx
// 4-question self-diagnostic, ported from modules.jsx.
import { useState } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Tag from '~/components/Tag';
import Button from '~/components/Button';
import { PURPLE, PINK, YELLOW, GREEN } from '~/lib/tokens';

interface QOption { v: number; label: string; }
interface Question { id: string; q: string; opts: QOption[]; }

const questions: Question[] = [
  { id: 'find', q: 'How do most new boards find your CAM company today?', opts: [
    { v: 3, label: "They reach out to us directly — they already know who we are." },
    { v: 2, label: 'Mostly referrals from boards, vendors, or staff.' },
    { v: 1, label: 'Shared lead platforms or paid directories.' },
    { v: 0, label: "Honestly? It's unpredictable. We grow by accident." },
  ]},
  { id: 'close', q: 'When you compete for a portfolio, what does your proposal look like?', opts: [
    { v: 3, label: 'Custom-built per board, with discovery insights baked in.' },
    { v: 2, label: 'Strong template — we tweak per opportunity.' },
    { v: 1, label: 'We use a generic deck and hope our reputation closes it.' },
    { v: 0, label: "We don't have a structured proposal process." },
  ]},
  { id: 'churn', q: 'What happens when a community manager leaves?', opts: [
    { v: 3, label: 'We have an onboarding + early-warning system. Almost no churn.' },
    { v: 2, label: 'We hand-hold the transition. Sometimes we lose an association.' },
    { v: 1, label: "Churn happens. We'd rather not talk about it." },
    { v: 0, label: 'Manager transitions are our biggest churn driver.' },
  ]},
  { id: 'system', q: 'Do you have a documented growth system?', opts: [
    { v: 3, label: 'Yes — attract, close, and keep all run as repeatable processes.' },
    { v: 2, label: 'Two of three are solid. One is a black box.' },
    { v: 1, label: "We've talked about it. Nothing written down." },
    { v: 0, label: 'Growth depends on the owner showing up every day.' },
  ]},
];

export default function AuditQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const isDone = step >= questions.length;
  const score = Object.values(answers).reduce((s: number, v: number) => s + v, 0);
  const maxScore = questions.length * 3;
  const pct = Math.round((score / maxScore) * 100);

  const verdict = score >= 10
    ? { tag: 'Engineered', color: GREEN, msg: "Your growth engine is mostly built. We'd zero in on the weakest of the three pillars and accelerate.", cta: 'Talk to us about scale-mode' }
    : score >= 6
    ? { tag: 'Mixed', color: YELLOW, msg: "You've got pieces — referrals, reputation, maybe a strong manager team — but no connected system. That's where the leaks are.", cta: 'Get the BoardAttract™ Audit' }
    : { tag: 'Accidental', color: PINK, msg: "You're in the majority — most CAM companies grow by accident. Good news: every gap you flagged is something we engineer.", cta: 'Claim your market' };

  const reset = () => { setStep(0); setAnswers({}); };

  if (isDone) {
    return (
      <div style={{ background: '#fff', borderRadius: 16, padding: 48, boxShadow: '0 16px 48px rgba(56,28,79,0.12)', border: '1px solid var(--border-subtle)' }} className="reveal audit-quiz-card">
        <Eyebrow>Your BoardAttract™ snapshot</Eyebrow>
        <div className="audit-quiz-result-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40, alignItems: 'center', marginTop: 24 }}>
          <div className="audit-quiz-circle" style={{ position: 'relative', width: 180, height: 180 }}>
            <svg width="180" height="180" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="78" stroke="#e8e4ef" strokeWidth="14" fill="none" />
              <circle cx="90" cy="90" r="78" stroke={verdict.color} strokeWidth="14" fill="none"
                      strokeDasharray={`${(pct / 100) * 490} 490`} strokeLinecap="round"
                      transform="rotate(-90 90 90)" style={{ transition: 'stroke-dasharray 800ms var(--ease-emphasis)' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 48, lineHeight: 1, color: PURPLE }}>{pct}</div>
                <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#888', marginTop: 4 }}>Score</div>
              </div>
            </div>
          </div>
          <div>
            <Tag color={verdict.color === PINK ? 'pink' : verdict.color === YELLOW ? 'yellow' : 'green'}>{verdict.tag} growth</Tag>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, lineHeight: 1.15, letterSpacing: '-0.018em', margin: '16px 0 12px', color: PURPLE }}>
              Most CAM companies grow by accident. Yours doesn't have to.
            </h3>
            <p style={{ color: '#555', fontSize: 15, lineHeight: 1.6, marginBottom: 24, maxWidth: '55ch' }}>{verdict.msg}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button variant="primary" arrow>{verdict.cta}</Button>
              <Button variant="ghost" onClick={reset}>Retake</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 48, boxShadow: '0 16px 48px rgba(56,28,79,0.12)', border: '1px solid var(--border-subtle)' }} className="audit-quiz-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <Eyebrow>BoardAttract™ Audit · 4 questions</Eyebrow>
        <div style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888' }}>
          {step + 1} / {questions.length}
        </div>
      </div>
      <div style={{ height: 4, background: '#f0ecf5', borderRadius: 999, marginBottom: 32, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(step / questions.length) * 100}%`, background: PINK, transition: 'width 320ms var(--ease-emphasis)' }}></div>
      </div>
      <h3 key={step} className="reveal" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, lineHeight: 1.2, letterSpacing: '-0.018em', color: PURPLE, margin: '0 0 24px' }}>{q.q}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {q.opts.map((o, i) => (
          <button key={i} onClick={() => { setAnswers({ ...answers, [q.id]: o.v }); setStep(step + 1); }}
            style={{ all: 'unset', cursor: 'pointer', padding: '18px 22px', border: '1px solid var(--border-subtle)', borderRadius: 10, fontSize: 15, color: '#333', lineHeight: 1.5, transition: 'all 180ms var(--ease-standard)', display: 'flex', alignItems: 'center', gap: 14 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = PINK; (e.currentTarget as HTMLButtonElement).style.background = '#fbf6f8'; (e.currentTarget as HTMLButtonElement).style.color = PURPLE; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-subtle)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#333'; }}>
            <div style={{ width: 24, height: 24, borderRadius: 999, border: '2px solid var(--border-strong)', flexShrink: 0 }}></div>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
