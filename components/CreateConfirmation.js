import { useState } from 'react'
import PageContainer from 'components/PageContainer'
import PageTitle from 'components/PageTitle'

function Row({ label, value }) {
  return (
    <div className="py-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 ">{value}</dd>
    </div>
  )
}

export default function CreateConfirmation({
  data,
  onConfirmClick,
  ...wizardProps
}) {
  const [isConfirmClicked, setIsConfirmClicked] = useState(false)

  const handleConfirmClick = (payload) => {
    setIsConfirmClicked(true)
    onConfirmClick(payload)
  }

  const handleBackClick = () => {
    wizardProps.previousStep()
  }

  return (
    <PageContainer classes="flex flex-col items-center">
      <PageTitle>Confirm Details</PageTitle>
      <div className="w-96 mt-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <dl className="px-4 py-5">
            <Row label="Recipient" value={data.recipient} />
            <Row label="Gift name" value={data.giftName} />
            <Row label="Gift price" value={data.giftPrice} />
            <Row
              label="Gift website url"
              value={data.giftWebsite || 'None provided'}
            />
            <Row label="Minimum contributors" value={data.minContributors} />
          </dl>
        </div>
        <button
          disabled={isConfirmClicked}
          type="button"
          className="w-full flex justify-center px-4 py-2 mt-8 mb-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleConfirmClick}
        >
          Confirm
        </button>
        <button
          type="button"
          className="w-full flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleBackClick}
        >
          Back
        </button>
      </div>
    </PageContainer>
  )
}
