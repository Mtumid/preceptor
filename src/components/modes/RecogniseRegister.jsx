import { useState } from 'react'
import { REGISTERS, getRegisterConfig, normalizeRegister } from '../../utils/registerConfig'

export default function RecogniseRegister({ card, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const { expression } = card
  const correct = normalizeRegister(expression.register)

  function handleSelect(register) {
    if (selected !== null) return
    setSelected(register)
    onAnswer(register === correct)
  }

  return (
    <div>
      <p className="text-4xl font-bold text-center text-stone-800 font-serif mb-3 leading-tight">
        {expression.text}
      </p>
      <p className="text-base italic text-center text-stone-500 mb-8 leading-relaxed">
        {expression.examples[0].fr}
      </p>

      <p className="text-sm font-medium text-stone-500 text-center mb-4 uppercase tracking-wide">
        What register is this?
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {REGISTERS.map(register => {
          const config = getRegisterConfig(register)
          const isCorrect = register === correct
          const isSelected = register === selected
          const answered = selected !== null

          let borderColor = '#e7e5e4'
          let bgColor = '#fafaf9'
          let textColor = '#44403c'
          let opacity = 1

          if (answered) {
            if (isCorrect) {
              bgColor = '#f0fdf4'
              borderColor = '#16a34a'
              textColor = '#15803d'
            } else if (isSelected) {
              bgColor = '#fef2f2'
              borderColor = '#dc2626'
              textColor = '#b91c1c'
            } else {
              opacity = 0.4
            }
          } else {
            bgColor = '#ffffff'
            borderColor = '#e7e5e4'
          }

          return (
            <button
              key={register}
              onClick={() => handleSelect(register)}
              disabled={answered}
              className="py-4 px-4 rounded-xl text-base font-medium border-2 transition-all duration-150 text-left"
              style={{ backgroundColor: bgColor, borderColor, color: textColor, opacity }}
            >
              {answered && isCorrect && <span className="mr-1">✓</span>}
              {answered && isSelected && !isCorrect && <span className="mr-1">✗</span>}
              {config.label}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div className={`rounded-xl p-4 border ${selected === correct ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <p className={`text-sm font-semibold mb-1 ${selected === correct ? 'text-emerald-700' : 'text-red-700'}`}>
            {selected === correct ? 'Correct.' : `Not quite. This is ${correct}.`}
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">{expression.notes}</p>
        </div>
      )}
    </div>
  )
}
