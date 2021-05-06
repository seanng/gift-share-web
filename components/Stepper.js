import { useStages } from 'contexts/stages'
import ProgressDot from 'components/ProgressDot'

export default function Stepper() {
  const { currentStageIdx, stages } = useStages()
  const currentStage = stages[currentStageIdx]
  return (
    <nav
      className="flex items-center justify-center py-8"
      aria-label="Progress"
    >
      <p className="text-sm font-medium">{currentStage.name}</p>
      <ol className="ml-8 flex items-center space-x-5">
        {stages.map((step, idx) => (
          <li key={step}>
            <ProgressDot
              name={step.name}
              idx={idx}
              currentIdx={currentStageIdx}
            />
          </li>
        ))}
      </ol>
    </nav>
  )
}
