import { useState } from 'react'
import { normalizeRegister } from '../../utils/registerConfig'
import RegisterPill from '../RegisterPill'
import RegisterDial from '../RegisterDial'
import { IconCheck, IconX } from '../Ornaments'

export default function TranslateAcross({ card, onAnswer }) {
  const [selectedId, setSelectedId] = useState(null)
  const { expression, choices, targetExpression, targetRegister } = card

  function handleSelect(choice) {
    if (selectedId !== null) return
    const wasCorrect = choice.id === targetExpression.id
    setSelectedId(choice.id)
    onAnswer(wasCorrect)
  }

  const answered = selectedId !== null
  const wasCorrect = answered && selectedId === targetExpression.id

  return (
    <div>
      <div className="lp-src-block">
        <div className="src-fr">{expression.text}</div>
        <RegisterPill register={expression.register} size="sm" />
      </div>

      <div className="lp-target-line">
        Find the{' '}
        <span style={{ color: 'var(--color-terra)', fontStyle: 'normal', fontWeight: 600 }}>{targetRegister}</span>
        {' '}equivalent
      </div>
      <div style={{ marginBottom: 18 }}>
        <RegisterDial register={targetRegister} compact />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        {choices.map(choice => {
          const isCorrectChoice = choice.id === targetExpression.id
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
              {wasCorrect ? 'Correct.' : `The answer is "${targetExpression.text}".`}
            </div>
            {targetExpression.notes && <div className="fb-body">{targetExpression.notes}</div>}
          </div>
        </div>
      )}
    </div>
  )
}
