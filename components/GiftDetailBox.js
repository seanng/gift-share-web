export default function GiftDetailBox({ data, classes }) {
  const maxAvgSpend = (data.giftPrice / data.minContributors).toFixed(2)
  return (
    <div className={`rounded-lg bg-white shadow px-4 py-5 sm:px-6 ${classes}`}>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 grid-cols-2">
        <div className="col-span-1">
          <dt className="text-sm font-medium text-gray-500">Gift</dt>
          <dd className="mt-1 text-sm text-gray-900">{data.giftName}</dd>
        </div>
        <div className="col-span-1">
          <dt className="text-sm font-medium text-gray-500">
            Min contributors
          </dt>
          <dd className="mt-1 text-sm text-gray-900">{data.minContributors}</dd>
        </div>
        <div className="col-span-1">
          <dt className="text-sm font-medium text-gray-500">Price</dt>
          <dd className="mt-1 text-sm text-gray-900">{data.giftPrice}</dd>
        </div>
        <div className="col-span-1">
          <dt className="text-sm font-medium text-gray-500">
            Max spend per person
          </dt>
          <dd className="mt-1 text-sm text-gray-900">${maxAvgSpend}</dd>
        </div>
        {data.giftWebsite && (
          <div className="col-span-2">
            <dt className="text-sm font-medium text-gray-500">Shop URL</dt>
            <dd className="mt-1 text-sm text-gray-900 truncate">
              {data.giftWebsite}
            </dd>
          </div>
        )}
      </dl>
    </div>
  )
}
