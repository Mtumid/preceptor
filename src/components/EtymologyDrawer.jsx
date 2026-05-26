import { useState } from 'react'
import etymologies from '../content/etymologies.json'
import { Quill, IconChevron } from './Ornaments'

const etymologyMap = Object.fromEntries(etymologies.map(e => [e.expression_id, e]))

export default function EtymologyDrawer({ expression }) {
  const [open, setOpen] = useState(false)
  const data = etymologyMap[expression.id]

  if (!data) return null

  return (
    <div style={{ marginTop: 18, borderTop: '1px dashed var(--color-rule)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 0',
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: 'var(--color-ink-3)',
          background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--color-terra)' }}>
          <Quill size={14} />
          <span style={{ color: 'var(--color-ink-3)' }}>Word history</span>
        </span>
        <span style={{ color: 'var(--color-ink-3)', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 150ms ease-out' }}>
          <IconChevron size={12} />
        </span>
      </button>

      {open && (
        <div className="lp-fade-in" style={{ paddingBottom: 12 }}>
          <div style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: 13, color: 'var(--color-terra)', marginBottom: 8,
          }}>
            {data.origin}
            {data.first_attested && (
              <span style={{ color: 'var(--color-ink-3)' }}> · first attested {data.first_attested}</span>
            )}
          </div>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 15, lineHeight: 1.55,
            color: 'var(--color-ink-2)', margin: 0,
          }}>
            {data.story}
          </p>
          {data.cognates?.length > 0 && (
            <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {data.cognates.map((c, i) => (
                <span key={i} style={{
                  fontFamily: 'var(--font-sans)', fontSize: 11,
                  padding: '3px 9px',
                  border: '1px solid var(--color-rule)',
                  borderRadius: 999,
                  color: 'var(--color-ink-3)',
                  background: 'var(--color-bg-2)',
                }}>{c}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
