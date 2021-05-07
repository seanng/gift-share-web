import { useState } from 'react'
import StepWizard from 'react-step-wizard'
import CreateStep from 'components/CreateStep'
import CreateConfirmation from 'components/CreateConfirmation'
import Animate from 'styles/animate.module.css'

// TODO: add validation
const steps = [
  {
    title: "What's your name and email?",
    description: '請留下可收信的信箱，我們會透過此信箱寄送禮物進度給您！',
    inputs: [
      {
        name: 'creator',
        type: 'text',
        label: 'Name',
        validation: { required: true },
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        validation: { required: true },
      },
    ],
  },
  {
    title: "Who's the lucky recipient?",
    inputs: [
      {
        name: 'recipient',
        type: 'text',
        label: 'Recipient',
        validation: { required: true },
      },
    ],
  },
  {
    title: 'Enter the gift details',
    inputs: [
      {
        name: 'giftName',
        type: 'text',
        label: 'Gift name',
        validation: { required: true },
      },
      {
        name: 'giftPrice',
        type: 'number',
        label: 'Gift price',
        validation: { required: true },
      },
      {
        name: 'giftWebsite',
        type: 'text',
        label: 'Gift website (optional)',
      },
    ],
  },
  {
    title: 'How many contributors?',
    description:
      'Enter the minimum number of contributors for this gift.\nThe project will be cancelled if this number is not met.',
    inputs: [
      {
        name: 'minContributors',
        type: 'number',
        label: 'Minimum contributors',
        validation: { required: true, min: 1 },
        defaultValue: 1,
      },
    ],
  },
]

const INITIAL_STATE = {
  creator: '',
  email: '',
  recipient: '',
  giftName: '',
  giftPrice: '',
  giftWebsite: '',
  minContributors: '',
}

export default function CreatePage() {
  const [details, setDetails] = useState(INITIAL_STATE)

  const updateDetails = (formValues) => {
    setDetails({ ...details, ...formValues })
  }

  const handleConfirmClick = () => {
    // clicking
  }

  const transitions = {
    enterRight: `${Animate.animated} ${Animate.fadeInRight}`,
    enterLeft: `${Animate.animated} ${Animate.fadeInLeft}`,
    exitRight: `${Animate.animated} ${Animate.fadeOutRight}`,
    exitLeft: `${Animate.animated} ${Animate.fadeOutLeft}`,
  }

  return (
    <StepWizard transitions={transitions}>
      {steps.map((step) => (
        <CreateStep
          title={step.title}
          description={step.description}
          inputs={step.inputs}
          key={step.title}
          updateDetails={updateDetails}
        />
      ))}
      <CreateConfirmation data={details} onConfirmClick={handleConfirmClick} />
    </StepWizard>
  )
}
