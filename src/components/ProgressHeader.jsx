import useStore from '../store/useStore'

export default function ProgressHeader() {
  const { queue, currentIndex, score } = useStore()
  const total = queue.length
  const current = currentIndex + 1
  const pct = total > 0 ? (currentIndex / total) * 100 : 0

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-stone-500">
          Card {current} of {total}
        </span>
        <span className="text-sm text-stone-500">
          {score.correct}/{score.total} correct
        </span>
      </div>
      <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-stone-600 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
