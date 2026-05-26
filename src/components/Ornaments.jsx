/*
 * Le Précepteur – ornaments and icons
 *
 * Two families share this file:
 *  - Editorial ornaments (fleurons, asterisms, pilcrows, quills, laurels)
 *    used as section dividers and decorative accents.
 *  - Functional line icons (arrows, check/x, ear, pen, loupe, coffee cup,
 *    heart, coin, shuffle, book, calendar, chevron) used in UI.
 *  - Composite helpers (ModeIcon, ThemeIcon, BrandMark, Divider, toRoman).
 */

/* ---------- Editorial ornaments ----------------------------- */

export function FleuronHeart({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5c-1.2-2-3-3-5-3-2.5 0-4 2-4 4 0 3 3 5 9 9 6-4 9-6 9-9 0-2-1.5-4-4-4-2 0-3.8 1-5 3z"
            fill="currentColor" opacity="0.92"/>
      <path d="M12 14v6M10 19h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
    </svg>
  )
}

export function FleuronRotated({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 12c2-1.5 3.2-3 3.2-5 0-1.5-1.2-2.5-2.5-2.5C2.5 4.5 2 5.5 2 6.5c0 1 .6 1.7 1.5 2-.9.3-1.5 1-1.5 2C2 12 3 12 3 12zm0 0c2 1.5 3.2 3 3.2 5 0 1.5-1.2 2.5-2.5 2.5C2.5 19.5 2 18.5 2 17.5c0-1 .6-1.7 1.5-2-.9-.3-1.5-1-1.5-2 0-1.5 1-1.5 1-1.5z"/>
      <path d="M7 12h14M19 10l2 2-2 2" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function Asterism({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="6" r="2"/>
      <circle cx="6" cy="17" r="2"/>
      <circle cx="18" cy="17" r="2"/>
    </svg>
  )
}

export function Pilcrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M14 4v16M18 4v16M14 4h-3a4 4 0 100 8h3" strokeLinecap="round"/>
    </svg>
  )
}

export function Quill({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 4c-7 0-12 5-13 12l-2 4 4-2c7-1 12-6 11-13z"/>
      <path d="M8 16l3-3M14 10l3-3"/>
    </svg>
  )
}

export function Laurel({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      <path d="M12 21V9"/>
      <path d="M12 16c-3 0-5-2-5-5M12 13c-3 0-5-1.5-5-4M12 19c-3 0-5-2-5-5"/>
      <path d="M12 16c3 0 5-2 5-5M12 13c3 0 5-1.5 5-4M12 19c3 0 5-2 5-5"/>
      <circle cx="12" cy="6" r="1.8" fill="currentColor"/>
    </svg>
  )
}

/* ---------- Functional icons -------------------------------- */

export function IconArrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  )
}
export function IconArrowLeft({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6"/>
    </svg>
  )
}
export function IconCheck({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12l5 5L20 6"/>
    </svg>
  )
}
export function IconX({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  )
}
export function IconChevron({ size = 12, dir = 'right' }) {
  const rot = { right: 0, left: 180, up: -90, down: 90 }[dir]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }} aria-hidden="true">
      <path d="M9 6l6 6-6 6"/>
    </svg>
  )
}

export function IconEar({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21c-2 0-3-1.5-3-3.5 0-1 .4-1.6 1-2.5 1-1.4 1-3 .5-4-1-2 .5-5 4.5-5 3 0 5 2 5 4 0 3.5-3 4-3 6 0 .8.4 1.5-.5 2-1 .6-2.5 0-2.5 0"/>
      <path d="M11 11c0-1 1-1.5 1.8-1.5"/>
    </svg>
  )
}
export function IconPen({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4l6 6-11 11H3v-6l11-11z"/>
      <path d="M13 5l6 6"/>
    </svg>
  )
}
export function IconArrows({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 8h11l-3-3M19 16H8l3 3"/>
    </svg>
  )
}
export function IconLoupe({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="6"/>
      <path d="M16 16l5 5"/>
    </svg>
  )
}

export function IconCoffeeCup({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 9h12v6a4 4 0 01-4 4H9a4 4 0 01-4-4V9z"/>
      <path d="M17 11h2a2 2 0 010 4h-2"/>
      <path d="M9 3c0 1 1 1.5 1 3M13 3c0 1 1 1.5 1 3"/>
    </svg>
  )
}
export function IconHeart({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20s-7-4.5-7-10c0-2.5 2-4 4-4 1.5 0 3 1 3 3 0-2 1.5-3 3-3 2 0 4 1.5 4 4 0 5.5-7 10-7 10z"/>
    </svg>
  )
}
export function IconCoin({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="7" rx="7" ry="3"/>
      <path d="M5 7v6c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/>
      <path d="M5 13v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4"/>
    </svg>
  )
}
export function IconShuffle({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h3l10 10h3M4 17h3l4-4M14 11l3-4h3M18 4l3 3-3 3M18 14l3 3-3 3"/>
    </svg>
  )
}
export function IconBook({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5a2 2 0 012-2h13v18H6a2 2 0 01-2-2V5z"/>
      <path d="M4 19a2 2 0 012-2h13"/>
    </svg>
  )
}
export function IconCalendar({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="5" width="16" height="16" rx="1.5"/>
      <path d="M4 10h16M9 3v4M15 3v4"/>
    </svg>
  )
}

/* ---------- Composite helpers -------------------------------- */

export function Divider({ ornament = 'asterism', color = 'var(--color-terra)' }) {
  const Ornament = ornament === 'fleuron' ? FleuronHeart
                 : ornament === 'rotated' ? FleuronRotated
                 : Asterism
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '22px 0 18px', color }}>
      <div style={{ flex: 1, height: 1, background: 'var(--color-rule)' }}/>
      <Ornament size={14}/>
      <div style={{ flex: 1, height: 1, background: 'var(--color-rule)' }}/>
    </div>
  )
}

export function ModeIcon({ mode, size = 18 }) {
  switch (mode) {
    case 'recognise_register':  return <IconEar size={size}/>
    case 'produce_in_register': return <IconPen size={size}/>
    case 'translate_across':    return <IconArrows size={size}/>
    case 'spot_mismatch':       return <IconLoupe size={size}/>
    default: return null
  }
}

export function ThemeIcon({ themeId, size = 18 }) {
  switch (themeId) {
    case 'theme_everyday':   return <IconCoffeeCup size={size}/>
    case 'theme_body_mind':  return <IconHeart size={size}/>
    case 'theme_money_work': return <IconCoin size={size}/>
    default: return <IconBook size={size}/>
  }
}

export function BrandMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.2" fill="rgba(176,74,42,0.06)"/>
      <text x="20" y="27" textAnchor="middle"
            fontFamily="Source Serif 4, Georgia, serif"
            fontSize="22" fontStyle="italic" fontWeight="500"
            fill="currentColor">P</text>
      <circle cx="32" cy="9" r="1.4" fill="currentColor"/>
    </svg>
  )
}

export function toRoman(num) {
  const map = [['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]]
  let r = ''
  for (const [s, v] of map) { while (num >= v) { r += s; num -= v } }
  return r
}
