import useStore from '../store/useStore'
import ProgressHeader from './ProgressHeader'
import ExerciseCard from './ExerciseCard'

export default function ExerciseScreen() {
  const { queue, returnHome } = useStore()

  if (queue.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4">
        <p className="text-stone-500 text-base mb-4">No cards available at the moment.</p>
        <button
          onClick={returnHome}
          className="text-sm text-stone-400 hover:text-stone-600 transition-colors"
        >
          Back home
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-8">
      <div className="max-w-lg mx-auto">
        <ProgressHeader />
        <ExerciseCard />
      </div>
    </div>
  )
}
