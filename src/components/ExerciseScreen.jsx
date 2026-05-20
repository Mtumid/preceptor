import ProgressHeader from './ProgressHeader'
import ExerciseCard from './ExerciseCard'

export default function ExerciseScreen() {
  return (
    <div className="min-h-screen bg-stone-50 px-4 py-8">
      <div className="max-w-lg mx-auto">
        <ProgressHeader />
        <ExerciseCard />
      </div>
    </div>
  )
}
