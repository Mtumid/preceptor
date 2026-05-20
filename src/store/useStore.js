import { create } from 'zustand'

const useStore = create((set) => ({
  screen: 'home',
  sessionLength: 0,
  queue: [],
  currentIndex: 0,
  score: { correct: 0, total: 0 },
  lastSession: null,

  startSession: (queue) => set({
    screen: 'exercise',
    sessionLength: queue.length,
    queue,
    currentIndex: 0,
    score: { correct: 0, total: 0 },
  }),

  answerCard: (wasCorrect) => set((state) => ({
    score: {
      correct: state.score.correct + (wasCorrect ? 1 : 0),
      total: state.score.total + 1,
    },
  })),

  nextCard: () => set((state) => {
    const nextIndex = state.currentIndex + 1
    if (nextIndex >= state.queue.length) {
      return {
        screen: 'results',
        lastSession: { ...state.score },
      }
    }
    return { currentIndex: nextIndex }
  }),

  returnHome: () => set({ screen: 'home' }),
}))

export default useStore
