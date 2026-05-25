import { create } from 'zustand'
import { reviewCard } from '../utils/fsrs'
import { saveLastSession, loadLastSession, loadTheme, saveTheme } from '../utils/storage'
import { buildSession } from '../utils/buildSession'

const useStore = create((set) => ({
  screen: 'home',
  sessionLength: 0,
  queue: [],
  currentIndex: 0,
  score: { correct: 0, total: 0 },
  lastSession: loadLastSession(),
  selectedThemeId: loadTheme(),

  startSession: (length) => set((state) => {
    const queue = buildSession(length, state.selectedThemeId)
    return {
      screen: 'exercise',
      sessionLength: queue.length,
      queue,
      currentIndex: 0,
      score: { correct: 0, total: 0 },
    }
  }),

  setTheme: (themeId) => {
    saveTheme(themeId)
    set({ selectedThemeId: themeId })
  },

  answerCard: (wasCorrect) => set((state) => {
    const card = state.queue[state.currentIndex]
    if (card) {
      reviewCard(card.expression.id, wasCorrect)
    }
    return {
      score: {
        correct: state.score.correct + (wasCorrect ? 1 : 0),
        total: state.score.total + 1,
      },
    }
  }),

  nextCard: () => set((state) => {
    const nextIndex = state.currentIndex + 1
    if (nextIndex >= state.queue.length) {
      const lastSession = {
        correct: state.score.correct,
        total: state.score.total,
        completedAt: new Date().toISOString(),
      }
      saveLastSession(lastSession)
      return { screen: 'results', lastSession }
    }
    return { currentIndex: nextIndex }
  }),

  resetProgress: () => set({ lastSession: null }),

  returnHome: () => set({ screen: 'home' }),
}))

export default useStore
