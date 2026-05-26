import { getRegisterConfig } from '../utils/registerConfig'

export default function RegisterPill({ register, size = 'md' }) {
  const config = getRegisterConfig(register)
  return (
    <span
      className="lp-reg-pill"
      data-size={size === 'sm' ? 'sm' : undefined}
      style={{ background: config.color }}
    >
      <span className="dot" />
      {config.label}
    </span>
  )
}
