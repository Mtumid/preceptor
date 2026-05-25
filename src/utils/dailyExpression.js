import expressions from '../content/expressions.json'

function djb2(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

// Returns the expression object for today's daily expression.
// Selection is deterministic: same date always returns same expression.
export function getDailyExpression() {
  const today = new Date().toISOString().slice(0, 10)
  const index = djb2(today) % expressions.length
  return expressions[index]
}
