import { useState } from 'react'
import RegisterPill from '../RegisterPill'
import { normalizeRegister } from '../../utils/registerConfig'

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

  return (
    <div>
      <p className="text-sm font-medium text-stone-500 text-center mb-3 uppercase tracking-wide">
        Translate across registers
      </p>

      <div className="bg-stone-100 rounded-xl p-4 mb-2 text-center">
        <p className="text-3xl font-bold font-serif text-stone-800 mb-2">{expression.text}</p>
        <RegisterPill register={expression.register} />
      </div>

      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-stone-500 text-sm">What is the</span>
        <RegisterPill register={targetRegister} />
        <span className="text-stone-500 text-sm">equivalent?</span>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {choices.map(choice => {
          const isCorrectChoice = choice.id === targetExpression.id
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
        <div className={`rounded-xl p-4 border ${selectedId === targetExpression.id ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <p className={`text-sm font-semibold mb-1 ${selectedId === targetExpression.id ? 'text-emerald-700' : 'text-red-700'}`}>
            {selectedId === targetExpression.id
              ? 'Correct.'
              : `The answer is "${targetExpression.text}".`}
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">{targetExpression.notes}</p>
        </div>
      )}
    </div>
  )
}
