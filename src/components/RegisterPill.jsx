import { getRegisterConfig, normalizeRegister } from '../utils/registerConfig'

export default function RegisterPill({ register, size = 'md' }) {
  const config = getRegisterConfig(register)
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
  return (
    <span
      className={`inline-block rounded-full font-medium text-white ${sizeClass}`}
      style={{ backgroundColor: config.color }}
    >
      {config.label}
    </span>
  )
}
