export default function ProgressDot({ name, currentIdx, idx }) {
  if (currentIdx === idx) {
    return (
      <div
        className="relative flex items-center justify-center"
        aria-current="step"
      >
        <span className="absolute w-5 h-5 p-px flex" aria-hidden="true">
          <span className="w-full h-full rounded-full bg-indigo-200" />
        </span>
        <span
          className="relative block w-2.5 h-2.5 bg-indigo-600 rounded-full"
          aria-hidden="true"
        />
        <span className="sr-only">{name}</span>
      </div>
    )
  }
  return currentIdx > idx ? (
    <div className="block w-2.5 h-2.5 bg-indigo-600 rounded-full">
      <span className="sr-only">{name}</span>
    </div>
  ) : (
    <div className="block w-2.5 h-2.5 bg-gray-200 rounded-full">
      <span className="sr-only">{name}</span>
    </div>
  )
}
