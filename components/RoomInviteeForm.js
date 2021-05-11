import { useForm } from 'react-hook-form'
import PageContainer from 'components/PageContainer'
import PageTitle from 'components/PageTitle'

export default function RoomInviteForm({ data, onRejectClick }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', email: '' } })

  const { recipient, participants } = data
  const creatorName = participants[0].name

  const onSubmit = () => {
    // check that email is unique (via data)
    // update the participant list on firebase
    // update hash in url (and refresh page?)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageContainer classes="flex flex-col items-center">
        <div className="w-96 mt-6">
          <h2 className="text-2xl font-bold leading-normal text-gray-900 text-center">{`${creatorName} would like to buy a gift for ${recipient} with you!`}</h2>
          <PageTitle>What&apos;s your name and email?</PageTitle>
          <p className="text-sm text-gray-600 whitespace-pre-wrap mt-6">
            Enter a valid email for login and payment information.
          </p>
          <div className="my-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.name &&
                  'border-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
                }`}
                {...register('name', { required: true })}
              />
            </div>
          </div>
          <div className="my-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.name &&
                  'border-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
                }`}
                {...register('email', { required: true })}
              />
            </div>
          </div>
          <div className="w-96 mt-6">
            <button
              type="submit"
              className="w-full flex justify-center px-4 py-2 mt-8 mb-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
            <button
              type="button"
              className="w-full flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onRejectClick}
            >
              Cancel
            </button>
          </div>
        </div>
      </PageContainer>
    </form>
  )
}
