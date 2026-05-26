import { useState } from 'react'
import useStore from '../store/useStore'
import SessionPicker from './SessionPicker'
import RegisterPill from './RegisterPill'
import RegisterDial from './RegisterDial'
import themes from '../content/themes.json'
import { loadState, clearState, storageAvailable } from '../utils/storage'
import expressions from '../content/expressions.json'
import concepts from '../content/concepts.json'
import { getDailyExpression } from '../utils/dailyExpression'
import {
  BrandMark, Laurel, FleuronHeart, FleuronRotated, Asterism,
  IconCalendar, IconArrow, IconChevron, IconShuffle, ThemeIcon,
} from './Ornaments'

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

  const learned   = entries.filter(([, c]) => c.reps > 0).length
  const dueToday  = entries.filter(([, c]) => new Date(c.due) <= now).length
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
    <div className="lp-shell">
      {!storageAvailable && (
        <div className="lp-card" style={{ marginBottom: 16, background: 'var(--color-bad-bg)', borderColor: '#d9a795' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--color-bad)' }}>
            Your browser is blocking storage, so progress will not be saved between visits.
          </div>
        </div>
      )}

      {/* Masthead */}
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
        <span style={{ color: 'var(--color-terra)' }} title="French formality, charted">
          <Laurel size={18} />
        </span>
      </div>

      {/* Expression of the day */}
      {dailyExpression && (
        <button className="lp-eotd" onClick={openDailyExpression}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span className="lp-smallcaps" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-terra)' }}>
              <IconCalendar size={12} /> Expression du jour
            </span>
            <IconArrow size={14} />
          </div>
          <div className="lp-eotd-fr">{dailyExpression.text}</div>
          {dailyConcept && (
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--color-ink-3)', letterSpacing: '0.08em' }}>
                · {dailyConcept.gloss_en}
              </span>
            </div>
          )}
          <RegisterDial register={dailyExpression.register} />
        </button>
      )}

      {/* Stats */}
      <div className="lp-sec-head">
        <span className="ornament"><FleuronHeart size={13} /></span>
        <span className="label">Your progress</span>
        <span className="rule" />
      </div>

      <div className="lp-card" style={{ padding: '4px 0' }}>
        <div className="lp-stats">
          <div>
            <div className="num">{stats.learned}</div>
            <div className="lp-smallcaps lbl">Learned</div>
          </div>
          <div>
            <div className="num">{stats.dueToday}</div>
            <div className="lp-smallcaps lbl">Due today</div>
          </div>
          <div>
            <div className="num">{stats.totalSeen}</div>
            <div className="lp-smallcaps lbl">Encountered</div>
          </div>
        </div>

        {stats.trickiest.length >= 1 && (
          <div style={{ padding: '6px 22px 18px', borderTop: '1px solid var(--color-rule)', marginTop: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 14, marginBottom: 6 }}>
              <span className="lp-smallcaps">Trickiest right now</span>
            </div>
            {stats.trickiest.map(({ id, expression, concept }) => (
              <button
                key={id}
                className="lp-trickiest-row"
                onClick={() => openExpressionDetail(id)}
              >
                <div>
                  <div className="tr-fr">{expression.text}</div>
                  <div className="tr-en">{concept.gloss_en}</div>
                </div>
                <div className="tr-meta">
                  <RegisterPill register={expression.register} size="sm" />
                  <IconChevron size={12} />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Theme picker */}
      <div className="lp-sec-head">
        <span className="ornament"><FleuronRotated size={13} /></span>
        <span className="label">Focus your study</span>
        <span className="rule" />
      </div>

      <div className="lp-theme-grid">
        <button
          className="lp-theme-card"
          data-active={selectedThemeId === null}
          onClick={() => setTheme(null)}
        >
          <span className="theme-icon"><IconShuffle size={18} /></span>
          <div>
            <div className="theme-name">Mixed</div>
            <div className="theme-sub">All themes blended</div>
          </div>
        </button>
        {themes.map(theme => (
          <button
            key={theme.id}
            className="lp-theme-card"
            data-active={selectedThemeId === theme.id}
            onClick={() => setTheme(theme.id)}
          >
            <span className="theme-icon"><ThemeIcon themeId={theme.id} size={18} /></span>
            <div>
              <div className="theme-name">{theme.name}</div>
              <div className="theme-sub">{theme.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Session picker */}
      <div className="lp-sec-head">
        <span className="ornament"><Asterism size={13} /></span>
        <span className="label">Begin a session</span>
        <span className="rule" />
      </div>

      <SessionPicker />

      {/* Footer */}
      <div className="lp-footer">
        {lastSession && (
          <div>
            Last session — {lastSession.correct} of {lastSession.total} correct
            {lastSession.completedAt && <> · {relativeDate(lastSession.completedAt)}</>}.
          </div>
        )}
        <button className="reset" onClick={handleReset}>
          Reset progress
        </button>
      </div>
    </div>
  )
}
