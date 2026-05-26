import { useState } from 'react'
import { normalizeRegister } from '../../utils/registerConfig'
import RegisterDial from '../RegisterDial'
import { IconCheck, IconX } from '../Ornaments'

export default function ProduceInRegister({ card, onAnswer }) {
  const [selectedId, setSelectedId] = useState(null)
  const { concept, expression, choices, targetRegister } = card

  function handleSelect(choice) {
    if (selectedId !== null) return
    const wasCorrect = normalizeRegister(choice.register) === targetRegister
    setSelectedId(choice.id)
    onAnswer(wasCorrect)
  }

  const answered = selectedId !== null
  const selectedChoice = choices.find(c => c.id === selectedId)
  const wasCorrect = answered && normalizeRegister(selectedChoice?.register) === targetRegister
  const correctChoice = choices.find(c => normalizeRegister(c.register) === targetRegister)

  return (
    <div>
      <div className="lp-target-line">
        How do you say this in{' '}
        <span style={{ color: 'var(--color-terra)', fontStyle: 'normal', fontWeight: 600 }}>{targetRegister}</span>?
      </div>
      <div style={{ marginBottom: 18 }}>
        <RegisterDial register={targetRegister} compact />
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, textAlign: 'center', color: 'var(--color-ink)', marginBottom: 20 }}>
        {concept.gloss_en}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        {choices.map(choice => {
          const isCorrectChoice = normalizeRegister(choice.register) === targetRegister
          const isSelected = choice.id === selectedId
          const state = answered ? (isCorrectChoice ? 'correct' : isSelected ? 'wrong' : 'dim') : undefined

          return (
            <button
              key={choice.id}
              className="lp-choice"
              data-state={state}
              onClick={() => handleSelect(choice)}
              disabled={answered}
            >
              <div className="choice-text">{choice.text}</div>
              {answered && (isCorrectChoice || isSelected) && (
                <span className="lp-choice-mark">
                  {isCorrectChoice ? <IconCheck size={12} /> : <IconX size={12} />}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="lp-feedback" data-state={wasCorrect ? 'correct' : 'wrong'}>
          <span className="fb-icon">
            {wasCorrect ? <IconCheck size={16} /> : <IconX size={16} />}
          </span>
          <div>
            <div className="fb-title">
              {wasCorrect ? 'Correct.' : `The ${targetRegister} form is "${correctChoice?.text}".`}
            </div>
            {expression.notes && <div className="fb-body">{expression.notes}</div>}
          </div>
        </div>
      )}
    </div>
  )
}
