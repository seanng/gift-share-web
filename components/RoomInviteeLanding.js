import PageContainer from './PageContainer'

export default function RoomInviteLanding({
  data,
  onRejectClick,
  ...wizardProps
}) {
  const { recipient, participants, minContributors } = data
  const creatorName = participants[0].name
  const otherContributors = minContributors - 1

  const handleJoinClick = () => {
    // Go to the next
    wizardProps.nextStep()
  }

  return (
    <PageContainer classes="flex flex-col items-center">
      <div className="w-96 mt-6">
        <h2 className="text-2xl font-bold leading-normal text-gray-900 text-center">{`${creatorName} would like to buy a gift for ${recipient} with you!`}</h2>
        <p className="text-md text-gray-600 whitespace-pre-wrap mt-6">
          {`${creatorName} would like to invite you and at least ${otherContributors} others to purchase a surprise gift for ${recipient}.\n\nIf you have already been invited, please enter through the link sent to your email.`}
        </p>

        {/* Gift Detail Box goes here */}

        <button
          type="button"
          className="w-full flex justify-center px-4 py-2 mt-8 mb-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleJoinClick}
        >
          Join!
        </button>
        <button
          type="button"
          className="w-full flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onRejectClick}
        >
          No thanks
        </button>
      </div>
    </PageContainer>
  )
}
