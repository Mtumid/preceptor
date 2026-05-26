import { REGISTERS, getRegisterConfig, normalizeRegister } from '../utils/registerConfig'

/*
 * RegisterDial – the centerpiece visual.
 *
 * Shows a 5-segment gradient track from argot → littéraire with ticks
 * and a position marker. Used on the daily/detail screens and inline
 * within exercise prompts so the user always sees where the current
 * register sits on the full spectrum.
 */
export default function RegisterDial({ register, showLabels = true, compact = false }) {
  const cfg = getRegisterConfig(register)
  const positions = [0, 25, 50, 75, 100]
  const pos = positions[cfg.index] ?? 50

  return (
    <div className="lp-dial" style={compact ? { maxWidth: 240, margin: '0 auto' } : undefined}>
      <div className="lp-dial-track">
        {positions.map((p, i) => (
          <div key={i} className="lp-dial-tick" style={{ left: `${p}%` }} />
        ))}
        <div className="lp-dial-marker" style={{ left: `${pos}%` }} />
      </div>
      {showLabels && (
        <div className="lp-dial-labels">
          {REGISTERS.map((r, i) => (
            <span key={r} data-active={i === cfg.index}>
              {getRegisterConfig(r).short}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
