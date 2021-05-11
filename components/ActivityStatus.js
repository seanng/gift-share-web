export default function ActivityStatus({ data }) {
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

  return (
    <dl className="my-5 grid grid-cols-3 gap-3">
      {tableData.map(({ label, value }) => (
        <div
          key={label}
          className="px-4 pt-5 pb-4 bg-white shadow rounded-lg overflow-hidden text-center"
        >
          <dt className="text-xs font-medium text-gray-500 truncate">
            {label}
          </dt>
          <dd className="mt-2 text-2xl font-semibold text-gray-900">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
