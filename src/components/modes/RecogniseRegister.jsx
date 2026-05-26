import { useState } from 'react'
import { REGISTERS, getRegisterConfig, normalizeRegister } from '../../utils/registerConfig'
import RegisterDial from '../RegisterDial'
import { IconCheck, IconX } from '../Ornaments'

export default function RecogniseRegister({ card, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const { expression } = card
  const correct = normalizeRegister(expression.register)

  function handleSelect(register) {
    if (selected !== null) return
    setSelected(register)
    onAnswer(register === correct)
  }

  const answered = selected !== null
  const wasCorrect = answered && selected === correct

  return (
    <div>
      <div className="lp-prompt-fr">{expression.text}</div>
      <div className="lp-example">"{expression.examples[0].fr}"</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        {REGISTERS.map(register => {
          const config = getRegisterConfig(register)
          const isCorrect = register === correct
          const isSelected = register === selected
          const state = answered ? (isCorrect ? 'correct' : isSelected ? 'wrong' : 'dim') : undefined

          return (
            <button
              key={register}
              className="lp-choice"
              data-state={state}
              onClick={() => handleSelect(register)}
              disabled={answered}
            >
              <div>
                <div className="choice-text plain">{config.label}</div>
                <div style={{
                  fontSize: 11, marginTop: 2,
                  color: state === 'correct' ? 'var(--color-good)'
                       : state === 'wrong'   ? 'var(--color-bad)'
                       : 'var(--color-ink-3)',
                }}>
                  {config.tagline}
                </div>
              </div>
              {answered && (isCorrect || isSelected) && (
                <span className="lp-choice-mark">
                  {isCorrect ? <IconCheck size={12} /> : <IconX size={12} />}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {answered && (
        <>
          <div style={{ marginBottom: 14 }}>
            <RegisterDial register={expression.register} />
          </div>
          <div className="lp-feedback" data-state={wasCorrect ? 'correct' : 'wrong'}>
            <span className="fb-icon">
              {wasCorrect ? <IconCheck size={16} /> : <IconX size={16} />}
            </span>
            <div>
              <div className="fb-title">{wasCorrect ? 'Correct.' : `That is ${correct}.`}</div>
              {expression.notes && <div className="fb-body">{expression.notes}</div>}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
