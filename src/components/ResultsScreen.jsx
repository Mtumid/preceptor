import useStore from '../store/useStore'
import { buildSession } from '../utils/buildSession'

function getMessage(correct, total) {
  if (total === 0) return 'A clean slate. Ready for the next one.'
  const pct = correct / total
  if (pct >= 0.9) return 'Excellent. You are reading the room like a native.'
  if (pct >= 0.75) return 'Strong session. Your register ear is developing nicely.'
  if (pct >= 0.5) return 'Good effort. The tricky ones take time, and that is fine.'
  return 'Every session adds something, even when it does not feel like it.'
}

export default function ResultsScreen() {
  const { score, sessionLength, startSession, returnHome } = useStore()

  function handleAgain() {
    const queue = buildSession(sessionLength)
    startSession(queue)
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-sm border border-stone-200 p-8 text-center">
        <p className="text-sm text-stone-400 uppercase tracking-wide mb-4">Session complete</p>

        <p className="text-6xl font-bold text-stone-800 mb-1">
          {score.correct}
          <span className="text-3xl text-stone-400 font-normal">/{score.total}</span>
        </p>
        <p className="text-sm text-stone-400 mb-6">correct</p>

        <p className="text-base text-stone-600 leading-relaxed mb-8">
          {getMessage(score.correct, score.total)}
        </p>

        <button
          onClick={handleAgain}
          className="w-full py-4 rounded-xl bg-stone-800 text-white text-base font-semibold hover:bg-stone-700 transition-colors mb-3"
        >
          Another session
        </button>
        <button
          onClick={returnHome}
          className="w-full py-3 text-sm text-stone-500 hover:text-stone-700 transition-colors"
        >
          Back home
        </button>
      </div>
    </div>
  )
}
