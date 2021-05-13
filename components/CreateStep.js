import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import PageContainer from 'components/PageContainer'
import PageTitle from 'components/PageTitle'

export default function CreateStep({
  title,
  description,
  updateDetails,
  inputs,
  ...wizardProps
}) {
  const defaultValues = useMemo(() => {
    const retVal = {}
    inputs.forEach(({ name, defaultValue }) => {
      retVal[name] = defaultValue || ''
    })
    return retVal
  }, [])

  // TODO: add validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })

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
        <PageTitle>{title}</PageTitle>
        {description && (
          <p className="text-sm text-gray-600 whitespace-pre-wrap mt-6">
            {description}
          </p>
        )}
        <div className="w-96 mt-6">
          {inputs.map((input) => (
            <div key={input.name} className="my-4">
              <label
                htmlFor={input.name}
                className="block text-sm font-medium text-gray-700"
              >
                {input.label}
              </label>
              <div className="mt-1">
                <input
                  type={input.type}
                  name={input.name}
                  id={input.name}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors[input.name] &&
                    'border-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
                  }`}
                  placeholder={input.placeholder}
                  {...(input.type === 'number' ? { min: '1' } : {})}
                  {...register(input.name, input.validation)}
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
