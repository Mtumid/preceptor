import { fsrs, createEmptyCard, Rating } from 'ts-fsrs'
import { getCardProgress, saveCardProgress } from './storage'

const scheduler = fsrs()

function cardFromStorage(stored) {
  return {
    ...stored,
    due: new Date(stored.due),
    last_review: stored.last_review ? new Date(stored.last_review) : undefined,
  }
}

export function getOrCreateCard(expressionId) {
  const stored = getCardProgress(expressionId)
  if (stored) return cardFromStorage(stored)
  return createEmptyCard()
}

export function reviewCard(expressionId, wasCorrect) {
  const card = getOrCreateCard(expressionId)
  const rating = wasCorrect ? Rating.Good : Rating.Again
  const now = new Date()

  const scheduling = scheduler.repeat(card, now)
  const next = scheduling[rating].card

  const existing = getCardProgress(expressionId)
  const updated = {
    due: next.due.toISOString(),
    stability: next.stability,
    difficulty: next.difficulty,
    elapsed_days: next.elapsed_days,
    scheduled_days: next.scheduled_days,
    reps: next.reps,
    lapses: next.lapses,
    learning_steps: next.learning_steps,
    state: next.state,
    last_review: next.last_review ? next.last_review.toISOString() : now.toISOString(),
    first_seen: existing?.first_seen ?? now.toISOString(),
    total_correct: (existing?.total_correct ?? 0) + (wasCorrect ? 1 : 0),
    total_incorrect: (existing?.total_incorrect ?? 0) + (wasCorrect ? 0 : 1),
  }

  saveCardProgress(expressionId, updated)
  return updated
}
