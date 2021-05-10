import ProgressDot from 'components/ProgressDot'

const stages = [
  {
    name: 'Create',
    path: '/create',
  },
  {
    name: 'Invite',
    path: '/invite',
  },
  {
    name: 'Payment',
    path: '/payment',
  },
  {
    name: 'Delivery',
    path: '/delivery',
  },
]

export default function StagesBar({ index = 0 }) {
  const currentStage = stages[index]
  return (
    <nav
      className="flex items-center justify-center py-8"
      aria-label="Progress"
    >
      <p className="text-sm font-medium">{currentStage.name}</p>
      <ol className="ml-8 flex items-center space-x-5">
        {stages.map((stage, idx) => (
          <li key={stage.name}>
            <ProgressDot name={stage.name} idx={idx} currentIdx={index} />
          </li>
        ))}
      </ol>
    </nav>
  )
}
