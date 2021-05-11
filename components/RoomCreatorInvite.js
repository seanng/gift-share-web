// import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import PageContainer from 'components/PageContainer'
import StagesBar from 'components/StagesBar'
import PageTitle from 'components/PageTitle'
import ParticipantsTable from 'components/ParticipantsTable'
import ActivityStatus from 'components/ActivityStatus'
import { PAYMENT_STATUS } from 'utils/constants'
import { updateRoom } from 'lib/db'

const BASE_URL = 'https://www.giftshare.com/rooms'

export default function RoomCreatorInvite({ data }) {
  // const [isCopied, setIsCopied] = useState(false)
  const hasTooFewParticipants =
    data.participants.length < data.minContributors * 1

  const inviteLink = `${BASE_URL}/${data.slug}`

  const handleCopy = () => {
    // change text to "Copied!" for 2 seconds..
  }

  const handleNextClick = async () => {
    if (hasTooFewParticipants) return
    await updateRoom(data.slug, { status: PAYMENT_STATUS })
    // navigate to RoomCreatorPayment somehow
  }

  return (
    <>
      <StagesBar index={1} isCreator />
      <PageContainer classes="flex flex-col items-center">
        <PageTitle>Invite contributors</PageTitle>
        <div className="w-96 mt-6">
          {/* Copy thing */}
          <div className="border border-gray-200 rounded-md mb-8 pl-3 pr-4 py-3 flex items-center justify-between text-sm">
            <div className="truncate flex-1 ml-2">{inviteLink}</div>
            <div className="ml-4 flex-shrink-0">
              <CopyToClipboard text={inviteLink} onCopy={handleCopy}>
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Copy
                </a>
              </CopyToClipboard>
            </div>
          </div>

          <ParticipantsTable participants={data.participants} />

          {/* room stats table */}
          <ActivityStatus data={data} />
          <button
            type="button"
            className="w-full flex justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={hasTooFewParticipants}
            onClick={handleNextClick}
          >
            Proceed to Payment
          </button>
        </div>
      </PageContainer>
    </>
  )
}
