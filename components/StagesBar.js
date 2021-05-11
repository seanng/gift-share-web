import ProgressDot from 'components/ProgressDot'

const creatorStages = ['Create', 'Invite', 'Payment', 'Delivery']
const memberStages = ['Invitee List', 'Payment']

export default function StagesBar({ index = 0, isCreator }) {
  const stages = isCreator ? creatorStages : memberStages
  const currentStage = stages[index]
  return (
    <nav
      className="flex items-center justify-center py-8"
      aria-label="Progress"
    >
      <p className="text-sm font-medium">{currentStage}</p>
      <ol className="ml-8 flex items-center space-x-5">
        {stages.map((stage, idx) => (
          <li key={stage}>
            <ProgressDot name={stage} idx={idx} currentIdx={index} />
          </li>
        ))}
      </ol>
    </nav>
  )
}
