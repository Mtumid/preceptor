import { useState } from 'react'
import etymologies from '../content/etymologies.json'

const etymologyMap = Object.fromEntries(etymologies.map(e => [e.expression_id, e]))

export default function EtymologyDrawer({ expression }) {
  const [open, setOpen] = useState(false)
  const data = etymologyMap[expression.id]

  if (!data) return null

  return (
    <div className="mt-4 border-t border-stone-200">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-3 text-sm text-stone-400 hover:text-stone-600 transition-colors"
      >
        <span className="font-medium">Word history</span>
        <span className="text-lg leading-none">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="pb-4 text-sm text-stone-600 leading-relaxed space-y-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-400 mb-3">
            <span><strong>Origin:</strong> {data.origin}</span>
            {data.first_attested && (
              <span><strong>First attested:</strong> {data.first_attested}</span>
            )}
          </div>
          <p>{data.story}</p>
          {data.cognates.length > 0 && (
            <p className="text-xs text-stone-400">
              <strong>Related words:</strong> {data.cognates.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
