import useStore from '../store/useStore'
import { toRoman } from './Ornaments'

export default function ProgressHeader() {
  const { queue, currentIndex, score } = useStore()
  const total = queue.length
  const pct = total > 0 ? (currentIndex / total) * 100 : 0

  return (
    <div className="lp-progress">
      <div className="left">
        <span className="roman">{toRoman(currentIndex + 1)}</span>
        <span>of {toRoman(total)}</span>
      </div>
      <div className="bar">
        <div className="bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="right">
        {score.correct}
        <span style={{ color: 'var(--color-ink-4)' }}>/{score.total}</span>
      </div>
    </div>
  )
}
