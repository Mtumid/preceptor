import useStore from './store/useStore'
import HomeScreen from './components/HomeScreen'
import ExerciseScreen from './components/ExerciseScreen'
import ResultsScreen from './components/ResultsScreen'
import DailyExpressionScreen from './components/DailyExpressionScreen'
import ExpressionDetail from './components/ExpressionDetail'

export default function App() {
  const screen = useStore(s => s.screen)
  const viewingExpressionId = useStore(s => s.viewingExpressionId)
  const openExpressionDetail = useStore(s => s.openExpressionDetail)
  const practiseThisExpression = useStore(s => s.practiseThisExpression)
  const returnHome = useStore(s => s.returnHome)

  if (screen === 'exercise') return <ExerciseScreen />
  if (screen === 'results')  return <ResultsScreen />
  if (screen === 'daily_expression') return <DailyExpressionScreen />
  if (screen === 'expression_detail' && viewingExpressionId) {
    return (
      <ExpressionDetail
        initialExpressionId={viewingExpressionId}
        onBack={returnHome}
        onPractise={practiseThisExpression}
      />
    )
  }
  return <HomeScreen />
}
