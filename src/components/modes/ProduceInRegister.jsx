import { useState } from 'react'
import RegisterPill from '../RegisterPill'
import { normalizeRegister, getRegisterConfig } from '../../utils/registerConfig'

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

  return (
    <div>
      <p className="text-sm font-medium text-stone-500 text-center mb-2 uppercase tracking-wide">
        How do you say this in&hellip;
      </p>
      <div className="flex justify-center mb-3">
        <RegisterPill register={targetRegister} />
      </div>
      <p className="text-2xl font-semibold text-center text-stone-700 mb-8 leading-snug">
        {concept.gloss_en}
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {choices.map(choice => {
          const isCorrectChoice = normalizeRegister(choice.register) === targetRegister
          const isSelected = choice.id === selectedId

          let bgColor = '#ffffff'
          let borderColor = '#e7e5e4'
          let textColor = '#44403c'

          if (answered) {
            if (isCorrectChoice) {
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
              key={choice.id}
              onClick={() => handleSelect(choice)}
              disabled={answered}
              className="py-4 px-5 rounded-xl text-xl font-bold border-2 font-serif transition-all duration-150 text-left"
              style={{ backgroundColor: bgColor, borderColor, color: textColor }}
            >
              {answered && isCorrectChoice && <span className="mr-2 text-base">✓</span>}
              {answered && isSelected && !isCorrectChoice && <span className="mr-2 text-base">✗</span>}
              {choice.text}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`rounded-xl p-4 border ${choices.find(c => c.id === selectedId && normalizeRegister(c.register) === targetRegister) ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          {(() => {
            const wasCorrect = normalizeRegister(choices.find(c => c.id === selectedId)?.register) === targetRegister
            const correctChoice = choices.find(c => normalizeRegister(c.register) === targetRegister)
            return (
              <>
                <p className={`text-sm font-semibold mb-1 ${wasCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                  {wasCorrect ? 'Correct.' : `The ${targetRegister} form is "${correctChoice?.text}".`}
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {expression.notes}
                </p>
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}
