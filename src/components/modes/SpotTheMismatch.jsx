import { useState } from 'react'
import RegisterPill from '../RegisterPill'
import { getRegisterConfig } from '../../utils/registerConfig'
import { contextRegisterMap } from '../../utils/contextRegisterMap'
import { IconCheck, IconX } from '../Ornaments'

export default function SpotTheMismatch({ card, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const { spotMismatch } = card
  const { context, expressionToShow, fits } = spotMismatch

  function handleSelect(answer) {
    if (selected !== null) return
    setSelected(answer)
    onAnswer(answer === fits)
  }

  const answered = selected !== null
  const wasCorrect = answered && selected === fits
  const fittingRegisters = contextRegisterMap[context]

  return (
    <div>
      <div className="lp-ctx-card">
        <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-ink-3)', marginBottom: 6 }}>
          Context
        </div>
        <div className="ctx-text">{context}</div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 22, padding: '20px 16px', background: 'var(--color-surface)', border: '1px solid var(--color-rule)', borderRadius: 6 }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 30, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 10 }}>
          {expressionToShow.text}
        </div>
        <RegisterPill register={expressionToShow.register} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
        {[true, false].map(choice => {
          const label = choice ? 'Fits' : 'Wrong register'
          const hint  = choice ? 'this expression suits the context'
                               : 'the register does not match'
          const isSelected = selected === choice
          const isThisCorrect = choice === fits
          const state = answered ? (isThisCorrect ? 'correct' : isSelected ? 'wrong' : 'dim') : undefined

          return (
            <button
              key={String(choice)}
              className="lp-choice"
              data-state={state}
              onClick={() => handleSelect(choice)}
              disabled={answered}
              style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}
            >
              <div className="choice-text plain">{label}</div>
              <div style={{
                fontSize: 11,
                color: state === 'correct' ? 'var(--color-good)'
                     : state === 'wrong'   ? 'var(--color-bad)'
                     : 'var(--color-ink-3)',
              }}>
                {hint}
              </div>
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
              {wasCorrect
                ? 'Correct.'
                : `Not quite. That expression ${fits ? 'fits' : 'does not fit'} this context.`}
            </div>
            <div className="fb-body">
              For {context.toLowerCase()}, the fitting registers are {fittingRegisters.join(' or ')}.{' '}
              {getRegisterConfig(expressionToShow.register).label} {fits ? 'is one of them.' : 'is not.'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
