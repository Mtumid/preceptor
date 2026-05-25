import expressions from '../content/expressions.json'
import concepts from '../content/concepts.json'
import { contextRegisterMap, CONTEXTS } from './contextRegisterMap'
import { normalizeRegister } from './registerConfig'
import { loadState } from './storage'

const MODES = ['recognise_register', 'produce_in_register', 'translate_across', 'spot_mismatch']

const expressionMap = Object.fromEntries(expressions.map(e => [e.id, e]))
const conceptMap = Object.fromEntries(concepts.map(c => [c.id, c]))

const byConceptId = {}
for (const expr of expressions) {
  if (!byConceptId[expr.concept_id]) byConceptId[expr.concept_id] = []
  byConceptId[expr.concept_id].push(expr)
}

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function pickRandomN(array, n) {
  return shuffle(array).slice(0, Math.min(n, array.length))
}

// For new cards, bias heavily toward recognise_register and produce_in_register
// so the learner gets oriented before jumping into translation or mismatch tasks.
function pickModeWeighted(availableModes, isNew) {
  if (!isNew || availableModes.length === 1) return pickRandom(availableModes)

  const weights = availableModes.map(mode =>
    (mode === 'recognise_register' || mode === 'produce_in_register') ? 4 : 1
  )
  const total = weights.reduce((a, b) => a + b, 0)
  let rand = Math.random() * total
  for (let i = 0; i < availableModes.length; i++) {
    rand -= weights[i]
    if (rand < 0) return availableModes[i]
  }
  return availableModes[availableModes.length - 1]
}

function priorityQueue(pool, storedCards, length) {
  const poolIds = new Set(pool.map(e => e.id))
  const now = new Date()

  // Only stored cards that exist within this pool
  const validStored = Object.entries(storedCards).filter(([id]) => poolIds.has(id))

  // Due: past or present
  const due = validStored
    .filter(([, c]) => new Date(c.due) <= now)
    .sort((a, b) => new Date(a[1].due) - new Date(b[1].due))
    .map(([id]) => id)

  // New: no storage entry at all (within this pool)
  const storedSet = new Set(Object.keys(storedCards))
  const newIds = shuffle(pool.filter(e => !storedSet.has(e.id)).map(e => e.id))

  // Fallback: stored in pool, not yet due, least recently reviewed first
  const dueSet = new Set(due)
  const fallback = validStored
    .filter(([id]) => !dueSet.has(id))
    .sort((a, b) => {
      const da = a[1].last_review ? new Date(a[1].last_review) : new Date(0)
      const db = b[1].last_review ? new Date(b[1].last_review) : new Date(0)
      return da - db
    })
    .map(([id]) => id)

  const selected = []

  const takeDue = Math.min(length, due.length)
  selected.push(...due.slice(0, takeDue))

  const takeNew = Math.min(length - selected.length, newIds.length)
  selected.push(...newIds.slice(0, takeNew))

  const takeFallback = Math.min(length - selected.length, fallback.length)
  selected.push(...fallback.slice(0, takeFallback))

  // Very rare: content almost exhausted, allow repeats rather than crash
  if (selected.length > 0) {
    while (selected.length < length) {
      selected.push(selected[Math.floor(Math.random() * selected.length)])
    }
  }

  return selected
}

// Returns how many expressions are available for the given theme (or all if null).
// Used by SessionPicker to show the "Only N available" notice.
export function countThemeExpressions(themeId) {
  if (!themeId) return expressions.length
  const themeConcepts = new Set(
    concepts.filter(c => c.themes?.includes(themeId)).map(c => c.id)
  )
  return expressions.filter(e => themeConcepts.has(e.concept_id)).length
}

// Builds a single exercise card for one expression. Used by both buildSession
// and practiseThisExpression (which creates a one-card queue).
export function buildCardForExpression(expressionId, storedCards = {}) {
  const expression = expressionMap[expressionId]
  if (!expression) return null

  const concept = conceptMap[expression.concept_id]
  const conceptExpressions = byConceptId[expression.concept_id] ?? []
  const others = conceptExpressions.filter(e => e.id !== expression.id)

  let availableModes = [...MODES]
  if (others.length === 0) availableModes = ['recognise_register']
  if (conceptExpressions.length < 2) {
    availableModes = availableModes.filter(m => m !== 'spot_mismatch')
  }

  const cardData = storedCards[expressionId]
  const isNew = !cardData || cardData.state === 0
  const mode = pickModeWeighted(availableModes, isNew)

  const card = { expression, concept, conceptExpressions, mode }

  if (mode === 'produce_in_register') {
    const distractorsNeeded = 2 - Math.min(others.length, 2)
    const fromOthers = pickRandomN(others, 2)
    const fromElsewhere = distractorsNeeded > 0
      ? pickRandomN(expressions.filter(e => e.concept_id !== expression.concept_id), distractorsNeeded)
      : []
    card.choices = shuffle([expression, ...fromOthers, ...fromElsewhere].slice(0, 3))
    card.targetRegister = normalizeRegister(expression.register)
  }

  if (mode === 'translate_across') {
    if (others.length === 0) {
      card.mode = 'recognise_register'
      return card
    }
    const target = pickRandom(others)
    const distractors = pickRandomN(
      expressions.filter(e => e.concept_id !== expression.concept_id),
      2
    )
    card.choices = shuffle([target, ...distractors])
    card.targetExpression = target
    card.targetRegister = normalizeRegister(target.register)
  }

  if (mode === 'spot_mismatch') {
    const context = pickRandom(CONTEXTS)
    const fittingRegisters = contextRegisterMap[context]
    const shouldFit = Math.random() > 0.5

    let expressionToShow = expression

    if (shouldFit) {
      const fitting = conceptExpressions.filter(
        e => fittingRegisters.includes(normalizeRegister(e.register))
      )
      if (fitting.length > 0) expressionToShow = pickRandom(fitting)
    } else {
      const misfitting = conceptExpressions.filter(
        e => !fittingRegisters.includes(normalizeRegister(e.register))
      )
      if (misfitting.length > 0) expressionToShow = pickRandom(misfitting)
    }

    const fits = fittingRegisters.includes(normalizeRegister(expressionToShow.register))
    card.spotMismatch = { context, expressionToShow, fits }
  }

  return card
}

export function buildSession(length, themeId = null) {
  if (expressions.length === 0) return []

  let pool = expressions
  if (themeId) {
    const themeConcepts = new Set(
      concepts.filter(c => c.themes?.includes(themeId)).map(c => c.id)
    )
    pool = expressions.filter(e => themeConcepts.has(e.concept_id))
  }

  if (pool.length === 0) return []

  const storedState = loadState()
  const storedCards = storedState?.cards ?? {}

  const selectedIds = priorityQueue(pool, storedCards, length)

  return selectedIds
    .map(id => buildCardForExpression(id, storedCards))
    .filter(Boolean)
}
