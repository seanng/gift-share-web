// import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import PageContainer from 'components/PageContainer'
import StagesBar from 'components/StagesBar'
import PageTitle from 'components/PageTitle'

const BASE_URL = 'https://www.giftshare.com/rooms'

const participants = [
  {
    name: 'Bryan',
    email: 'bryan@bry.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Sophie',
    email: 'soph@sophoe.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Sean',
    email: 'sean@bry.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

export default function RoomCreator({ data }) {
  // const [isCopied, setIsCopied] = useState(false)
  const handleCopy = () => {}
  console.log('data in RoomCreator: ', data)

  const inviteLink = `${BASE_URL}/${data.slug}`

  const tableData = [
    {
      label: 'Min Contributors',
      value: data.minContributors,
    },
    {
      label: 'Contributors',
      // TODO: replace with data.participants
      value: participants.length,
    },
    {
      label: 'Avg Spend',
      // TODO: replace with data.participants
      value: `$${(data.giftPrice / participants.length).toFixed(2)}`,
    },
  ]

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
                      {participants.map((person) => (
                        <tr key={person.email}>
                          <td className="pl-6 py-4 whitespace-nowrap">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={person.image}
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
          <div>
            <dl className="mt-5 grid grid-cols-3 gap-3">
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
          </div>
        </div>
      </PageContainer>
    </>
  )
}
