// import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import PageContainer from 'components/PageContainer'
import StagesBar from 'components/StagesBar'
import PageTitle from 'components/PageTitle'
import { PAYMENT_STATUS } from 'utils/constants'
import { updateRoom } from 'lib/db'

const BASE_URL = 'https://www.giftshare.com/rooms'
// TODO: change default image.
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'

export default function RoomCreatorInvite({ data }) {
  // const [isCopied, setIsCopied] = useState(false)
  const hasTooFewParticipants =
    data.participants.length < data.minContributors * 1

  const inviteLink = `${BASE_URL}/${data.slug}`

  const tableData = [
    {
      label: 'Min Contributors',
      value: data.minContributors,
    },
    {
      label: 'Contributors',
      value: data.participants.length,
    },
    {
      label: 'Avg Spend',
      value: `$${(data.giftPrice / data.participants.length).toFixed(2)}`,
    },
  ]

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
      <StagesBar index={1} />
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

          {/* table of participants */}
          <div className="flex flex-col">
            <div className="-my-2">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.participants.map((person) => (
                        <tr key={person.email}>
                          <td className="pl-6 py-4 whitespace-nowrap">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={person.image || DEFAULT_IMAGE}
                                alt=""
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {person.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {person.email}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* room stats table */}
          <dl className="my-5 grid grid-cols-3 gap-3">
            {tableData.map(({ label, value }) => (
              <div
                key={label}
                className="px-4 pt-5 pb-4 bg-white shadow rounded-lg overflow-hidden text-center"
              >
                <dt className="text-xs font-medium text-gray-500 truncate">
                  {label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-gray-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
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
