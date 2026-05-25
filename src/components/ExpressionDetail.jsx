import { useState } from 'react'
import expressions from '../content/expressions.json'
import concepts from '../content/concepts.json'
import etymologies from '../content/etymologies.json'
import { getCardProgress } from '../utils/storage'
import RegisterPill from './RegisterPill'

const expressionMap = Object.fromEntries(expressions.map(e => [e.id, e]))
const conceptMap = Object.fromEntries(concepts.map(c => [c.id, c]))
const etymologyMap = Object.fromEntries(etymologies.map(e => [e.expression_id, e]))

const REGISTER_ORDER = ['argotique', 'familier', 'familier_oral', 'courant', 'soutenu', 'littéraire']

const byConceptId = {}
for (const expr of expressions) {
  if (!byConceptId[expr.concept_id]) byConceptId[expr.concept_id] = []
  byConceptId[expr.concept_id].push(expr)
}

function getProgressBadge(card) {
  if (!card || card.state === 0) return { label: 'New', bg: '#9ca3af' }
  if (card.state === 1) return { label: 'Learning', bg: '#2563eb' }
  if (card.state === 3) return { label: 'Relearning', bg: '#d97706' }
  const stability = card.stability ?? 0
  if (stability >= 21) return { label: 'Mastered', bg: '#059669' }
  return { label: 'Review', bg: '#059669' }
}

export default function ExpressionDetail({ initialExpressionId, onBack, onPractise, subtitle = null }) {
  const [expressionId, setExpressionId] = useState(initialExpressionId)

  const expression = expressionMap[expressionId]
  if (!expression) return null

  const concept = conceptMap[expression.concept_id]
  const variants = (byConceptId[expression.concept_id] ?? [])
    .slice()
    .sort((a, b) => REGISTER_ORDER.indexOf(a.register) - REGISTER_ORDER.indexOf(b.register))
  const etymology = etymologyMap[expressionId] ?? null
  const card = getCardProgress(expressionId)
  const badge = getProgressBadge(card)

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <div className="px-4 pt-10 pb-4 max-w-sm mx-auto w-full">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-stone-400 hover:text-stone-600 transition-colors text-sm"
          >
            ← Back
          </button>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full text-white"
            style={{ backgroundColor: badge.bg }}
          >
            {badge.label}
          </span>
        </div>
        {subtitle && (
          <p className="text-xs text-stone-400 mt-1.5">{subtitle}</p>
        )}
      </div>

      <div className="flex-1 px-4 pb-16 max-w-sm mx-auto w-full">
        <div className="text-center mb-6">
          <p className="text-5xl font-bold font-serif text-stone-800 mb-3 leading-tight">
            {expression.text}
          </p>
          <RegisterPill register={expression.register} />
          {concept && (
            <p className="text-stone-400 text-sm mt-2">{concept.gloss_en}</p>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 mb-4">
          <p className="text-xs text-stone-400 uppercase tracking-wide mb-3">
            {expression.examples.length === 1 ? 'Example' : 'Examples'}
          </p>
          <div className="space-y-4">
            {expression.examples.map((ex, i) => (
              <div key={i}>
                <p className="text-sm italic text-stone-700 leading-relaxed">{ex.fr}</p>
                <p className="text-sm text-stone-400 leading-relaxed mt-0.5">{ex.en}</p>
              </div>
            ))}
          </div>
        </div>

        {expression.notes && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 mb-4">
            <p className="text-xs text-stone-400 uppercase tracking-wide mb-2">Notes</p>
            <p className="text-sm text-stone-600 leading-relaxed">{expression.notes}</p>
          </div>
        )}

        {variants.length > 1 && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 mb-4">
            <p className="text-xs text-stone-400 uppercase tracking-wide mb-3">All registers</p>
            <div className="space-y-2">
              {variants.map(v => (
                <button
                  key={v.id}
                  onClick={() => setExpressionId(v.id)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl border-2 transition-colors ${
                    v.id === expressionId
                      ? 'border-stone-800 bg-stone-50'
                      : 'border-stone-100 hover:border-stone-300'
                  }`}
                >
                  <span className="font-serif font-bold text-stone-800 text-base">{v.text}</span>
                  <RegisterPill register={v.register} size="sm" />
                </button>
              ))}
            </div>
          </div>
        )}

        {etymology && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 mb-4">
            <p className="text-xs text-stone-400 uppercase tracking-wide mb-2">Etymology</p>
            <p className="text-sm text-stone-400 mb-2">
              {etymology.origin}
              {etymology.first_attested && ` · first attested ${etymology.first_attested}`}
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">{etymology.story}</p>
            {etymology.cognates?.length > 0 && (
              <p className="text-sm text-stone-400 mt-2">{etymology.cognates.join(' · ')}</p>
            )}
          </div>
        )}

        <button
          onClick={() => onPractise(expressionId)}
          className="w-full py-4 rounded-2xl bg-stone-800 text-white font-semibold text-base hover:bg-stone-700 transition-colors mt-2"
        >
          Practise this now
        </button>
      </div>
    </div>
  )
}
