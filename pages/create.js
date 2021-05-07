import { useState } from 'react'
import StepWizard from 'react-step-wizard'
import CreateStep from 'components/CreateStep'
import CreateConfirmation from 'components/CreateConfirmation'

// TODO: add validation
const steps = [
  {
    title: "What's your name and email?",
    inputs: [
      { name: 'creator', type: 'text' },
      { name: 'email', type: 'email' },
    ],
  },
  {
    title: "Who's the lucky recipient?",
    inputs: [{ name: 'recipient', type: 'text' }],
  },
  {
    title: 'Enter the gift details',
    inputs: [
      { name: 'giftName', type: 'text' },
      { name: 'giftPrice', type: 'number' },
      { name: 'giftWebsite', type: 'text' },
    ],
  },
  {
    title: 'How many contributors?',
    inputs: [{ name: 'contributors', type: 'number' }],
  },
]

const INITIAL_STATE = {
  creator: '',
  email: '',
  recipient: '',
  giftName: '',
  giftPrice: '',
  giftWebsite: '',
  contributors: '',
}

export default function CreatePage() {
  const [details, setDetails] = useState(INITIAL_STATE)

  const updateDetails = (formValues) => {
    setDetails({ ...details, ...formValues })
  }

  const handleConfirmClick = () => {
    // clicking
  }

  return (
    <StepWizard>
      {steps.map((substage) => (
        <CreateStep
          title={substage.title}
          inputs={substage.inputs}
          key={substage.title}
          updateDetails={updateDetails}
        />
      ))}
      <CreateConfirmation data={details} onConfirmClick={handleConfirmClick} />
    </StepWizard>
  )
}
