import { useState } from 'react'
import RegisterPill from '../RegisterPill'
import { getRegisterConfig } from '../../utils/registerConfig'
import { contextRegisterMap } from '../../utils/contextRegisterMap'

export default function SpotTheMismatch({ card, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const { spotMismatch } = card
  const { context, expressionToShow, fits } = spotMismatch

  function handleSelect(answer) {
    if (selected !== null) return
    const wasCorrect = answer === fits
    setSelected(answer)
    onAnswer(wasCorrect)
  }

  const answered = selected !== null
  const fittingRegisters = contextRegisterMap[context]

  return (
    <div>
      <p className="text-sm font-medium text-stone-500 text-center mb-2 uppercase tracking-wide">
        Spot the mismatch
      </p>

      <div className="bg-stone-100 rounded-xl p-4 mb-4 text-center">
        <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Context</p>
        <p className="text-base font-semibold text-stone-700">{context}</p>
      </div>

      <div className="border-2 border-stone-200 rounded-xl p-5 mb-6 text-center">
        <p className="text-3xl font-bold font-serif text-stone-800 mb-3">
          {expressionToShow.text}
        </p>
        <RegisterPill register={expressionToShow.register} />
      </div>

      <p className="text-sm text-center text-stone-500 mb-4">
        Does this expression fit the context?
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[true, false].map(choice => {
          const label = choice ? 'Fits' : 'Wrong register'
          const isSelected = selected === choice

          let bgColor = '#ffffff'
          let borderColor = '#e7e5e4'
          let textColor = '#44403c'

          if (answered) {
            const isThisCorrect = choice === fits
            if (isThisCorrect) {
              bgColor = '#f0fdf4'
              borderColor = '#16a34a'
              textColor = '#15803d'
            } else if (isSelected) {
              bgColor = '#fef2f2'
              borderColor = '#dc2626'
              textColor = '#b91c1c'
            } else {
              bgColor = '#fafaf9'
              textColor = '#a8a29e'
              borderColor = '#e7e5e4'
            }
          }

          return (
            <button
              key={String(choice)}
              onClick={() => handleSelect(choice)}
              disabled={answered}
              className="py-4 px-4 rounded-xl text-base font-semibold border-2 transition-all duration-150"
              style={{ backgroundColor: bgColor, borderColor, color: textColor }}
            >
              {answered && choice === fits && <span className="mr-1">✓</span>}
              {answered && isSelected && choice !== fits && <span className="mr-1">✗</span>}
              {label}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`rounded-xl p-4 border ${selected === fits ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <p className={`text-sm font-semibold mb-1 ${selected === fits ? 'text-emerald-700' : 'text-red-700'}`}>
            {selected === fits ? 'Correct.' : `Not quite. That expression ${fits ? 'fits' : 'does not fit'} this context.`}
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            For <strong>{context.toLowerCase()}</strong>, the fitting registers are{' '}
            {fittingRegisters.join(' or ')}.{' '}
            <strong>{getRegisterConfig(expressionToShow.register).label}</strong>{' '}
            {fits ? 'is one of them.' : 'is not.'}
          </p>
        </div>
      )}
    </div>
  )
}
