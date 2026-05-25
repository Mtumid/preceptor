import useStore from '../store/useStore'
import ExpressionDetail from './ExpressionDetail'
import { getDailyExpression } from '../utils/dailyExpression'

const daily = getDailyExpression()

const frenchDate = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date())

export default function DailyExpressionScreen() {
  const returnHome = useStore(s => s.returnHome)
  const practiseThisExpression = useStore(s => s.practiseThisExpression)

  return (
    <ExpressionDetail
      initialExpressionId={daily.id}
      subtitle={frenchDate}
      onBack={returnHome}
      onPractise={practiseThisExpression}
    />
  )
}
