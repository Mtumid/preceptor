import useStore from '../store/useStore'
import SessionPicker from './SessionPicker'

export default function HomeScreen() {
  const lastSession = useStore(s => s.lastSession)

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-sm w-full text-center mb-10">
        <h1 className="text-4xl font-bold text-stone-800 mb-2 font-serif">
          Le Précepteur
        </h1>
        <p className="text-stone-500 text-base leading-relaxed">
          Learn French the way the French actually speak it
        </p>

        {lastSession && (
          <p className="mt-4 text-sm text-stone-400">
            Last session: {lastSession.correct} correct out of {lastSession.total}
          </p>
        )}
      </div>

      <SessionPicker />
    </div>
  )
}
