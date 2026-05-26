import useStore from '../store/useStore'
import ProgressHeader from './ProgressHeader'
import ExerciseCard from './ExerciseCard'
import { ModeIcon, IconArrowLeft } from './Ornaments'

const MODE_LABELS = {
  recognise_register:  'Recognise the register',
  produce_in_register: 'Produce in register',
  translate_across:    'Translate across registers',
  spot_mismatch:       'Spot the mismatch',
}

export default function ExerciseScreen() {
  const { queue, currentIndex, returnHome } = useStore()
  const card = queue[currentIndex]

  if (queue.length === 0) {
    return (
      <div className="lp-shell" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-ink-3)', marginBottom: 16 }}>
          No cards available at the moment.
        </p>
        <button className="lp-btn lp-btn-ghost" onClick={returnHome}>← Back home</button>
      </div>
    )
  }

  return (
    <div className="lp-shell-wide">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <button className="lp-back-link" onClick={returnHome}>
          <IconArrowLeft size={12} /> Quit
        </button>
        {card && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-ink-3)' }}>
            <ModeIcon mode={card.mode} size={16} />
            <span className="lp-smallcaps">{MODE_LABELS[card.mode]}</span>
          </div>
        )}
        <div style={{ width: 48 }} />
      </div>

      <ProgressHeader />
      <ExerciseCard />
    </div>
  )
}
