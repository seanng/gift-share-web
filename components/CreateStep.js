import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import PageContainer from 'components/PageContainer'

export default function CreateStep({
  title,
  updateDetails,
  inputs,
  ...wizardProps
}) {
  const defaultValues = useMemo(() => {
    const retVal = {}
    inputs.forEach(({ name }) => {
      retVal[name] = ''
    })
    return retVal
  }, [])

  // TODO: add validation
  const { register, handleSubmit } = useForm({ defaultValues })

  const onSubmit = (data) => {
    updateDetails(data)
    wizardProps.nextStep()
  }

  const handleBackClick = () => {
    wizardProps.previousStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageContainer classes="flex flex-col items-center">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-2">
          {title}
        </h2>
        <div className="w-96">
          {inputs.map((input) => (
            <div key={input.name} className="my-4">
              <label
                htmlFor={input.name}
                className="block text-sm font-medium text-gray-700"
              >
                {input.name}
              </label>
              <div className="mt-1">
                <input
                  type={input.type}
                  name={input.name}
                  id={input.name}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder={input.placeholder}
                  {...register(input.name)}
                />
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full flex justify-center px-4 py-2 mt-8 mb-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
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
    </form>
  )
}
