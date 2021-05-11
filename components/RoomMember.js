import PageContainer from 'components/PageContainer'
import StagesBar from 'components/StagesBar'
import ParticipantsTable from 'components/ParticipantsTable'
import ActivityStatus from 'components/ActivityStatus'
import GiftDetailBox from 'components/GiftDetailBox'
import { INVITE_STATUS } from 'utils/constants'

export default function RoomMember({ data }) {
  const { status } = data
  const handleNextClick = () => {}

  const isCreatorReady = status !== INVITE_STATUS

  return (
    <>
      <StagesBar index={isCreatorReady ? 1 : 0} />
      <PageContainer classes="flex flex-col items-center">
        <div className="w-96">
          <GiftDetailBox data={data} classes="mb-6" />
          <ParticipantsTable
            participants={data.participants}
            withPaymentStatus={isCreatorReady}
          />
          <ActivityStatus data={data} />
          {!isCreatorReady && (
            <p className="text-md text-gray-600 whitespace-pre-wrap my-6">
              We will email you when it&apos;s time to pay.
            </p>
          )}
          <button
            type="button"
            className="w-full flex justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={!isCreatorReady}
            onClick={handleNextClick}
          >
            Proceed to Payment
          </button>
        </div>
      </PageContainer>
    </>
  )
}
