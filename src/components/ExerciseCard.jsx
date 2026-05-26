import { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import RecogniseRegister from './modes/RecogniseRegister'
import ProduceInRegister from './modes/ProduceInRegister'
import TranslateAcross from './modes/TranslateAcross'
import SpotTheMismatch from './modes/SpotTheMismatch'
import EtymologyDrawer from './EtymologyDrawer'
import { IconArrow } from './Ornaments'

const MODE_NOTES = {
  recognise_register:  'Where does this expression sit on the dial?',
  produce_in_register: 'Choose the right phrase for the target register.',
  translate_across:    'Find the equivalent at a different formality.',
  spot_mismatch:       'Would a native use this here? Trust your ear.',
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
  const isLast = currentIndex + 1 >= queue.length

  return (
    <div className="lp-exercise-card">
      <p style={{
        textAlign: 'center', marginBottom: 22,
        fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14,
        color: 'var(--color-ink-3)',
      }}>
        {MODE_NOTES[card.mode]}
      </p>

      {card.mode === 'recognise_register'  && <RecogniseRegister  key={currentIndex} {...modeProps} />}
      {card.mode === 'produce_in_register' && <ProduceInRegister  key={currentIndex} {...modeProps} />}
      {card.mode === 'translate_across'    && <TranslateAcross    key={currentIndex} {...modeProps} />}
      {card.mode === 'spot_mismatch'       && <SpotTheMismatch    key={currentIndex} {...modeProps} />}

      <EtymologyDrawer expression={
        card.mode === 'spot_mismatch' ? card.spotMismatch.expressionToShow : card.expression
      } />

      {answered && (
        <div style={{ marginTop: 22 }} className="lp-fade-in">
          <button className="lp-btn lp-btn-primary lp-btn-full lp-btn-lg" onClick={nextCard}>
            {isLast ? 'See results' : 'Continue'} <IconArrow size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
