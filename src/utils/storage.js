const STATE_KEY = 'preceptor_state_v1'
const SESSION_KEY = 'preceptor_last_session_v1'
const CURRENT_VERSION = 1

function probe() {
  try {
    localStorage.setItem('__preceptor_probe__', '1')
    localStorage.removeItem('__preceptor_probe__')
    return true
  } catch {
    return false
  }
}

export const storageAvailable = probe()

export function loadState() {
  if (!storageAvailable) return null
  try {
    const raw = localStorage.getItem(STATE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.version !== CURRENT_VERSION) return null
    return parsed
  } catch (e) {
    console.warn('[preceptor] Could not load state:', e)
    return null
  }
}

export function saveState(state) {
  if (!storageAvailable) return
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('[preceptor] Could not save state:', e)
  }
}

export function clearState() {
  if (!storageAvailable) return
  try {
    localStorage.removeItem(STATE_KEY)
    localStorage.removeItem(SESSION_KEY)
  } catch (e) {
    console.warn('[preceptor] Could not clear state:', e)
  }
}

export function getCardProgress(expressionId) {
  const state = loadState()
  return state?.cards?.[expressionId] ?? null
}

export function saveCardProgress(expressionId, cardData) {
  if (!storageAvailable) return
  try {
    let state = loadState()
    if (!state) {
      state = {
        version: CURRENT_VERSION,
        created_at: new Date().toISOString(),
        cards: {},
      }
    }
    state.cards[expressionId] = cardData
    saveState(state)
  } catch (e) {
    console.warn('[preceptor] Could not save card progress:', e)
  }
}

export function loadLastSession() {
  if (!storageAvailable) return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveLastSession(data) {
  if (!storageAvailable) return
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('[preceptor] Could not save last session:', e)
  }
}
