/*
 * Register display config. Using inline style colours avoids Tailwind's
 * static-scanning limitation with dynamically constructed class names.
 *
 * Each register entry carries:
 *  - label / short  – display strings
 *  - color          – CSS colour (for register pills and inline dots)
 *  - index          – 0..4 position on the formality dial (low → high)
 *  - tagline        – one-line italic descriptor used on detail / exercise screens
 */

export const REGISTERS = ['argotique', 'familier', 'courant', 'soutenu', 'littéraire']

export const REGISTER_CONFIG = {
  argotique: {
    label: 'argotique',  short: 'argot', color: '#8a2a18', index: 0,
    tagline: 'the street, the slang, the texts to your mate',
  },
  familier: {
    label: 'familier',   short: 'fam.',  color: '#c06a36', index: 1,
    tagline: 'easy with friends, family, at the café',
  },
  familier_oral: {
    label: 'familier',   short: 'fam.',  color: '#c06a36', index: 1,
    tagline: 'spoken contraction – never written',
  },
  courant: {
    label: 'courant',    short: 'cour.', color: '#7c7048', index: 2,
    tagline: 'the neutral middle – safe anywhere',
  },
  soutenu: {
    label: 'soutenu',    short: 'sout.', color: '#466372', index: 3,
    tagline: 'a measured tone – letters, interviews, ceremony',
  },
  'littéraire': {
    label: 'littéraire', short: 'litt.', color: '#2c3a55', index: 4,
    tagline: 'books, poetry, the high register of writing',
  },
}

export function normalizeRegister(register) {
  if (register === 'familier_oral') return 'familier'
  return register
}

export function getRegisterConfig(register) {
  return REGISTER_CONFIG[register] ?? { label: register, short: register, color: '#6b7280', index: 2, tagline: '' }
}
