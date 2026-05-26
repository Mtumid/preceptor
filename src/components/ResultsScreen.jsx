import useStore from '../store/useStore'
import { BrandMark, Divider, IconArrow } from './Ornaments'

function getMessage(correct, total) {
  if (total === 0)        return { title: 'A clean slate',   msg: 'Ready for the next one whenever you are.' }
  const pct = correct / total
  if (pct >= 0.9)         return { title: 'Excellent',       msg: 'You are reading the room like a native.' }
  if (pct >= 0.75)        return { title: 'Strong session',  msg: 'Your register ear is developing nicely.' }
  if (pct >= 0.5)         return { title: 'Good effort',     msg: 'The tricky ones take time, and that is fine.' }
  return                         { title: 'Onward',          msg: "Every session adds something, even when it doesn't feel like it." }
}

export default function ResultsScreen() {
  const { score, sessionLength, startSession, returnHome } = useStore()
  const { title, msg } = getMessage(score.correct, score.total)

  function handleAgain() {
    startSession(sessionLength)
  }

  return (
    <div className="lp-shell">
      <div className="lp-masthead">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 30, height: 30, display: 'grid', placeItems: 'center', color: 'var(--color-terra)' }}>
            <BrandMark size={30} />
          </span>
          <div>
            <div className="brand-title">Le&nbsp;Précepteur</div>
            <div className="brand-sub">l'art du registre</div>
          </div>
        </div>
      </div>

      <div className="lp-card lp-results-card">
        <div className="lp-smallcaps" style={{ color: 'var(--color-terra)', marginBottom: 6 }}>
          End of session
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
          <span className="lp-results-numeral">{score.correct}</span>
          <span className="lp-results-of">/{score.total}</span>
        </div>
        <div className="lp-smallcaps" style={{ marginTop: 8 }}>correct</div>

        <Divider ornament="fleuron" />

        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--color-ink)', marginBottom: 8 }}>
          {title}.
        </div>
        <div className="lp-results-msg">{msg}</div>

        <button className="lp-btn lp-btn-primary lp-btn-full lp-btn-lg" onClick={handleAgain}>
          Another session <IconArrow size={14} />
        </button>
        <button className="lp-btn lp-btn-ghost lp-btn-full" style={{ marginTop: 6 }} onClick={returnHome}>
          Back home
        </button>
      </div>
    </div>
  )
}
