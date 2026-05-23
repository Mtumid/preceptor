import { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import RecogniseRegister from './modes/RecogniseRegister'
import ProduceInRegister from './modes/ProduceInRegister'
import TranslateAcross from './modes/TranslateAcross'
import SpotTheMismatch from './modes/SpotTheMismatch'
import EtymologyDrawer from './EtymologyDrawer'

const MODE_LABELS = {
  recognise_register:  'Recognise the register',
  produce_in_register: 'Produce in register',
  translate_across:    'Translate across registers',
  spot_mismatch:       'Spot the mismatch',
}

export default function ExerciseCard() {
  const { queue, currentIndex, answerCard, nextCard } = useStore()
  const [answered, setAnswered] = useState(false)

  const card = queue[currentIndex]

  useEffect(() => {
    setAnswered(false)
  }, [currentIndex])

  function handleAnswer(wasCorrect) {
    answerCard(wasCorrect)
    setAnswered(true)
  }

  if (!card) return null

  const modeProps = { card, onAnswer: handleAnswer }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
      <p className="text-xs text-stone-400 text-center uppercase tracking-wide mb-6">
        {MODE_LABELS[card.mode] ?? card.mode}
      </p>

      {card.mode === 'recognise_register'  && <RecogniseRegister  key={currentIndex} {...modeProps} />}
      {card.mode === 'produce_in_register' && <ProduceInRegister  key={currentIndex} {...modeProps} />}
      {card.mode === 'translate_across'    && <TranslateAcross    key={currentIndex} {...modeProps} />}
      {card.mode === 'spot_mismatch'       && <SpotTheMismatch    key={currentIndex} {...modeProps} />}

      <EtymologyDrawer expression={
        card.mode === 'spot_mismatch' ? card.spotMismatch.expressionToShow : card.expression
      } />

      {answered && (
        <button
          onClick={nextCard}
          className="mt-4 w-full py-4 rounded-xl bg-stone-800 text-white text-base font-semibold hover:bg-stone-700 transition-colors"
        >
          Continue
        </button>
      )}
    </div>
  )
}
