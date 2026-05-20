import expressions from '../content/expressions.json'
import concepts from '../content/concepts.json'
import { contextRegisterMap, CONTEXTS } from './contextRegisterMap'
import { normalizeRegister } from './registerConfig'

const MODES = ['recognise_register', 'produce_in_register', 'translate_across', 'spot_mismatch']

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

export function buildSession(length) {
  const conceptMap = Object.fromEntries(concepts.map(c => [c.id, c]))

  const byConceptId = {}
  for (const expr of expressions) {
    if (!byConceptId[expr.concept_id]) byConceptId[expr.concept_id] = []
    byConceptId[expr.concept_id].push(expr)
  }

  const selected = pickRandomN(expressions, length)

  return selected.map(expression => {
    const concept = conceptMap[expression.concept_id]
    const conceptExpressions = byConceptId[expression.concept_id] ?? []
    const others = conceptExpressions.filter(e => e.id !== expression.id)

    let availableModes = [...MODES]
    if (others.length === 0) availableModes = ['recognise_register']
    if (conceptExpressions.length < 2) {
      availableModes = availableModes.filter(m => m !== 'spot_mismatch')
    }

    const mode = pickRandom(availableModes)

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
  })
}
