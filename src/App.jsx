import useStore from './store/useStore'
import HomeScreen from './components/HomeScreen'
import ExerciseScreen from './components/ExerciseScreen'
import ResultsScreen from './components/ResultsScreen'

export default function App() {
  const screen = useStore(s => s.screen)

  if (screen === 'exercise') return <ExerciseScreen />
  if (screen === 'results')  return <ResultsScreen />
  return <HomeScreen />
}
