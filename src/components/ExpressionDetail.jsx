import { useState } from 'react'
import expressions from '../content/expressions.json'
import concepts from '../content/concepts.json'
import etymologies from '../content/etymologies.json'
import { getCardProgress } from '../utils/storage'
import { getRegisterConfig } from '../utils/registerConfig'
import RegisterPill from './RegisterPill'
import RegisterDial from './RegisterDial'
import {
  IconArrowLeft, IconArrow, IconCalendar,
  FleuronHeart, FleuronRotated, Pilcrow, Quill,
} from './Ornaments'

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
  if (!card || card.state === 0) return { label: 'New',        bg: '#9ca3af' }
  if (card.state === 1)          return { label: 'Learning',   bg: '#2563eb' }
  if (card.state === 3)          return { label: 'Relearning', bg: '#d97706' }
  const stability = card.stability ?? 0
  if (stability >= 21)           return { label: 'Mastered',   bg: 'var(--color-good)' }
  return                                { label: 'Review',     bg: 'var(--color-good)' }
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
    <div className="lp-shell">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="lp-back-link" onClick={onBack}>
          <IconArrowLeft size={12} /> Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {subtitle && (
            <span className="lp-smallcaps" style={{ color: 'var(--color-terra)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <IconCalendar size={12} /> Expression du jour
            </span>
          )}
          <span className="lp-badge" style={{ background: badge.bg }}>{badge.label}</span>
        </div>
      </div>
      {subtitle && (
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--color-ink-3)', marginTop: 8 }}>
          {subtitle}
        </div>
      )}

      <div className="lp-detail-hero">
        <div className="fr">{expression.text}</div>
        <div className="en">{concept?.gloss_en}</div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <RegisterDial register={expression.register} />
        <div style={{
          textAlign: 'center', marginTop: 14,
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 14, color: 'var(--color-ink-3)',
        }}>
          {getRegisterConfig(expression.register).tagline}
        </div>
      </div>

      <div className="lp-sec-head">
        <span className="ornament"><FleuronHeart size={13} /></span>
        <span className="label">{expression.examples.length === 1 ? 'Example' : 'Examples'}</span>
        <span className="rule" />
      </div>

      <div className="lp-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {expression.examples.map((ex, i) => (
            <div key={i}>
              <div className="lp-example-fr">"{ex.fr}"</div>
              <div className="lp-example-en">{ex.en}</div>
            </div>
          ))}
        </div>
      </div>

      {expression.notes && (
        <>
          <div className="lp-sec-head">
            <span className="ornament"><Pilcrow size={13} /></span>
            <span className="label">Note</span>
            <span className="rule" />
          </div>
          <div className="lp-card">
            <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--color-ink-2)', lineHeight: 1.55 }}>
              {expression.notes}
            </div>
          </div>
        </>
      )}

      {variants.length > 1 && (
        <>
          <div className="lp-sec-head">
            <span className="ornament"><FleuronRotated size={13} /></span>
            <span className="label">Across all registers</span>
            <span className="rule" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {variants.map(v => (
              <button
                key={v.id}
                className="lp-variant"
                data-active={v.id === expressionId}
                onClick={() => setExpressionId(v.id)}
              >
                <div>
                  <div className="v-fr">{v.text}</div>
                  <div className="v-sub">{getRegisterConfig(v.register).tagline}</div>
                </div>
                <RegisterPill register={v.register} size="sm" />
              </button>
            ))}
          </div>
        </>
      )}

      {etymology && (
        <>
          <div className="lp-sec-head">
            <span className="ornament"><Quill size={14} /></span>
            <span className="label">Etymology</span>
            <span className="rule" />
          </div>
          <div className="lp-card lp-etymology">
            <div className="ety-origin">
              {etymology.origin}
              {etymology.first_attested && (
                <span style={{ color: 'var(--color-ink-3)' }}> · first attested {etymology.first_attested}</span>
              )}
            </div>
            <div className="ety-story">{etymology.story}</div>
            {etymology.cognates?.length > 0 && (
              <div className="ety-cognates">
                {etymology.cognates.map((c, i) => <span key={i} className="cog">{c}</span>)}
              </div>
            )}
          </div>
        </>
      )}

      <div style={{ marginTop: 28 }}>
        <button
          className="lp-btn lp-btn-primary lp-btn-full lp-btn-lg"
          onClick={() => onPractise(expressionId)}
        >
          Practise this now <IconArrow size={14} />
        </button>
      </div>
    </div>
  )
}
