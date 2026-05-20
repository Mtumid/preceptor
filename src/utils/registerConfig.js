/*
 * Register display config. Using inline style colours avoids Tailwind's
 * static-scanning limitation with dynamically constructed class names.
 */

export const REGISTERS = ['argotique', 'familier', 'courant', 'soutenu', 'littéraire']

export const REGISTER_CONFIG = {
  argotique:     { label: 'argotique',   color: '#6d28d9' },
  familier:      { label: 'familier',    color: '#2563eb' },
  familier_oral: { label: 'familier',    color: '#2563eb' },
  courant:       { label: 'courant',     color: '#059669' },
  soutenu:       { label: 'soutenu',     color: '#d97706' },
  'littéraire':  { label: 'littéraire',  color: '#7f1d1d' },
}

export function normalizeRegister(register) {
  if (register === 'familier_oral') return 'familier'
  return register
}

export function getRegisterConfig(register) {
  return REGISTER_CONFIG[register] ?? { label: register, color: '#6b7280' }
}
