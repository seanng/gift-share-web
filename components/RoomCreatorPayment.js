import StagesBar from 'components/StagesBar'
import PageContainer from 'components/PageContainer'
import GiftDetailBox from 'components/GiftDetailBox'
import ParticipantsTable from 'components/ParticipantsTable'

export default function RoomCreatorPayment({ data }) {
  const { participants, giftPrice } = data
  const paymentAmount = giftPrice / participants.length

  const handlePayClick = () => {
    // naigate to the select payment method screen.
  }

  return (
    <>
      <StagesBar index={2} isCreator />
      <PageContainer classes="flex flex-col items-center">
        <div className="w-96 mt-2">
          <GiftDetailBox data={data} />
          <h2 className="text-2xl mt-6 mb-5 font-bold leading-normal text-gray-900 text-center">
            Awaiting full payment...
          </h2>

          {/* Payment status table */}
          <ParticipantsTable
            participants={data.participants}
            withPaymentStatus
          />

          <button
            type="button"
            className="w-full flex justify-center px-4 py-2 mt-8 mb-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handlePayClick}
          >
            {`Pay $${paymentAmount}`}
          </button>
        </div>
      </PageContainer>
    </>
  )
}
