export default function PageContainer({ classes, ...props }) {
  return (
    <div className={`relative px-4 sm:px-6 lg:px-8 ${classes}`} {...props} />
  )
}
