import useStore from '../store/useStore'
import themes from '../content/themes.json'
import { countThemeExpressions } from '../utils/buildSession'

const OPTIONS = [
  { label: 'Quick',    count: 5 },
  { label: 'Standard', count: 15 },
  { label: 'Long',     count: 30 },
]

export default function SessionPicker() {
  const startSession = useStore(s => s.startSession)
  const selectedThemeId = useStore(s => s.selectedThemeId)

  const selectedTheme = themes.find(t => t.id === selectedThemeId) ?? null
  const available = countThemeExpressions(selectedThemeId)

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {OPTIONS.map(({ label, count }) => {
        const sub = selectedTheme
          ? `${count} cards from ${selectedTheme.name}`
          : `${count} cards`
        const showNotice = selectedThemeId !== null && available < count

        return (
          <div key={label}>
            <button
              onClick={() => startSession(count)}
              className="w-full py-5 px-6 rounded-2xl bg-white border-2 border-stone-200 hover:border-stone-400 hover:shadow-sm text-left transition-all duration-150"
            >
              <p className="text-xl font-bold text-stone-800">{label}</p>
              <p className="text-sm text-stone-400 mt-0.5">{sub}</p>
            </button>
            {showNotice && (
              <p className="text-xs text-stone-400 mt-1.5 px-1">
                Only {available} card{available === 1 ? '' : 's'} available in this theme.
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
