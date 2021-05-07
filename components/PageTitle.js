export default function PageTitle({ classes, ...props }) {
  return (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h2
      className={`text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mt-6 ${classes}`}
      {...props}
    />
  )
}
