import { useState } from 'react'
import useStore from '../store/useStore'
import SessionPicker from './SessionPicker'
import RegisterPill from './RegisterPill'
import themes from '../content/themes.json'
import { loadState, clearState, storageAvailable } from '../utils/storage'
import expressions from '../content/expressions.json'
import concepts from '../content/concepts.json'
import { getDailyExpression } from '../utils/dailyExpression'

const expressionMap = Object.fromEntries(expressions.map(e => [e.id, e]))
const conceptMap = Object.fromEntries(concepts.map(c => [c.id, c]))
const validExpressionIds = new Set(expressions.map(e => e.id))
const dailyExpression = getDailyExpression()
const dailyConcept = conceptMap[dailyExpression?.concept_id]

function computeStats() {
  const state = loadState()
  if (!state) return { learned: 0, dueToday: 0, totalSeen: 0, trickiest: [] }

  const now = new Date()
  const entries = Object.entries(state.cards).filter(([id]) => validExpressionIds.has(id))

  const learned = entries.filter(([, c]) => c.reps > 0).length
  const dueToday = entries.filter(([, c]) => new Date(c.due) <= now).length
  const totalSeen = entries.length

  const reviewed = entries.filter(([, c]) => c.reps > 0)
  let trickiest = []
  if (reviewed.length >= 3) {
    trickiest = reviewed
      .sort((a, b) => {
        const diff = a[1].stability - b[1].stability
        if (diff !== 0) return diff
        return new Date(a[1].last_review) - new Date(b[1].last_review)
      })
      .slice(0, 3)
      .map(([id, card]) => {
        const expression = expressionMap[id]
        const concept = expression ? conceptMap[expression.concept_id] : null
        return { id, card, expression, concept }
      })
      .filter(item => item.expression && item.concept)
  }

  return { learned, dueToday, totalSeen, trickiest }
}

function relativeDate(isoString) {
  const then = new Date(isoString)
  const now = new Date()
  const diffDays = Math.floor((now - then) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  return `${diffDays} days ago`
}

export default function HomeScreen() {
  const lastSession = useStore(s => s.lastSession)
  const resetProgress = useStore(s => s.resetProgress)
  const selectedThemeId = useStore(s => s.selectedThemeId)
  const setTheme = useStore(s => s.setTheme)
  const openDailyExpression = useStore(s => s.openDailyExpression)
  const openExpressionDetail = useStore(s => s.openExpressionDetail)
  const [statsKey, setStatsKey] = useState(0)

  const stats = computeStats(statsKey)

  function handleReset() {
    if (window.confirm(
      'This will erase all your progress including review history and statistics. ' +
      'The app will reset to a clean state. This cannot be undone. Continue?'
    )) {
      clearState()
      resetProgress()
      setStatsKey(k => k + 1)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center px-4 py-12">
      {!storageAvailable && (
        <div className="w-full max-w-sm mb-6 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-700">
          Your browser is blocking storage, so progress will not be saved between visits.
        </div>
      )}

      {/* Title */}
      <div className="max-w-sm w-full text-center mb-8">
        <h1 className="text-4xl font-bold text-stone-800 mb-2 font-serif">
          Le Précepteur
        </h1>
        <p className="text-stone-500 text-base leading-relaxed">
          Learn French the way the French actually speak it
        </p>
      </div>

      {/* Expression of the Day teaser */}
      {dailyExpression && (
        <button
          onClick={openDailyExpression}
          className="w-full max-w-sm mb-6 bg-stone-800 text-white rounded-2xl shadow-sm p-5 text-left hover:bg-stone-700 transition-colors"
        >
          <p className="text-xs text-stone-400 uppercase tracking-wide mb-2">Expression of the day</p>
          <p className="text-2xl font-bold font-serif mb-1">{dailyExpression.text}</p>
          {dailyConcept && (
            <p className="text-sm text-stone-400">{dailyConcept.gloss_en}</p>
          )}
        </button>
      )}

      {/* Stats */}
      <div className="w-full max-w-sm mb-6 bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-stone-800">{stats.learned}</p>
            <p className="text-xs text-stone-400 mt-0.5">Cards learned</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-stone-800">{stats.dueToday}</p>
            <p className="text-xs text-stone-400 mt-0.5">Due today</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-stone-800">{stats.totalSeen}</p>
            <p className="text-xs text-stone-400 mt-0.5">Total seen</p>
          </div>
        </div>

        {stats.trickiest.length >= 3 && (
          <div className="mt-4 pt-4 border-t border-stone-100">
            <p className="text-xs text-stone-400 uppercase tracking-wide mb-3">Trickiest right now</p>
            <div className="space-y-2.5">
              {stats.trickiest.map(({ id, expression, concept }) => (
                <button
                  key={id}
                  onClick={() => openExpressionDetail(id)}
                  className="w-full flex items-center justify-between gap-3 hover:opacity-70 transition-opacity"
                >
                  <span className="font-serif font-bold text-stone-800 text-base">{expression.text}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <RegisterPill register={expression.register} size="sm" />
                    <span className="text-xs text-stone-400">{concept.gloss_en}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Theme picker */}
      <div className="w-full max-w-sm mb-5">
        <p className="text-xs text-stone-400 uppercase tracking-wide mb-2.5">Focus on</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTheme(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-colors ${
              selectedThemeId === null
                ? 'bg-stone-800 text-white border-stone-800'
                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
            }`}
          >
            Mixed
          </button>
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-colors ${
                selectedThemeId === theme.id
                  ? 'bg-stone-800 text-white border-stone-800'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Session length buttons */}
      <SessionPicker />

      {/* Footer */}
      <div className="mt-8 text-center">
        {lastSession && (
          <p className="text-sm text-stone-400 mb-4">
            Last session: {lastSession.correct} correct out of {lastSession.total}
            {lastSession.completedAt && (
              <span className="ml-1">({relativeDate(lastSession.completedAt)})</span>
            )}
          </p>
        )}

        <button
          onClick={handleReset}
          className="text-xs text-stone-300 hover:text-stone-500 transition-colors"
        >
          Reset progress
        </button>
      </div>
    </div>
  )
}
