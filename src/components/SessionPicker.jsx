import useStore from '../store/useStore'
import { buildSession } from '../utils/buildSession'

const OPTIONS = [
  { label: 'Quick',    count: 5,  sub: '5 cards' },
  { label: 'Standard', count: 15, sub: '15 cards' },
  { label: 'Long',     count: 30, sub: '30 cards' },
]

export default function SessionPicker() {
  const startSession = useStore(s => s.startSession)

  function handleStart(count) {
    const queue = buildSession(count)
    startSession(queue)
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      {OPTIONS.map(({ label, count, sub }) => (
        <button
          key={label}
          onClick={() => handleStart(count)}
          className="w-full py-5 px-6 rounded-2xl bg-white border-2 border-stone-200 hover:border-stone-400 hover:shadow-sm text-left transition-all duration-150"
        >
          <p className="text-xl font-bold text-stone-800">{label}</p>
          <p className="text-sm text-stone-400 mt-0.5">{sub}</p>
        </button>
      ))}
    </div>
  )
}
