import useStore from '../store/useStore'
import themes from '../content/themes.json'
import { countThemeExpressions } from '../utils/buildSession'
import { IconArrow } from './Ornaments'

const OPTIONS = [
  { label: 'Quick',    count: 5,  numeral: 'I.',   sub: '~3 min'  },
  { label: 'Standard', count: 15, numeral: 'II.',  sub: '~10 min' },
  { label: 'Long',     count: 30, numeral: 'III.', sub: '~20 min' },
]

export default function SessionPicker() {
  const startSession = useStore(s => s.startSession)
  const selectedThemeId = useStore(s => s.selectedThemeId)

  const selectedTheme = themes.find(t => t.id === selectedThemeId) ?? null
  const available = countThemeExpressions(selectedThemeId)

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {OPTIONS.map(({ label, count, numeral, sub }) => {
        const showNotice = selectedThemeId !== null && available < count
        const detail = selectedTheme
          ? `${count} cards from ${selectedTheme.name} · ${sub}`
          : `${count} cards · ${sub}`
        return (
          <div key={label}>
            <button
              onClick={() => startSession(count)}
              className="lp-session-card"
            >
              <span className="roman">{numeral}</span>
              <div>
                <div className="title">{label}</div>
                <div className="sub">{detail}</div>
              </div>
              <span className="arrow"><IconArrow size={16} /></span>
            </button>
            {showNotice && (
              <p style={{ fontSize: 11, color: 'var(--color-ink-3)', marginTop: 6, paddingLeft: 6, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
                Only {available} card{available === 1 ? '' : 's'} available in this theme.
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
