import { useState } from 'react'
import { useRouter } from 'next/router'
import StepWizard from 'react-step-wizard'
import randomstring from 'randomstring'
import CreateStep from 'components/CreateStep'
import StagesBar from 'components/StagesBar'
import CreateConfirmation from 'components/CreateConfirmation'
import { createRoom } from 'lib/db'
import { WIZARD_STEPS, INITIAL_CREATE_FORM_STATE } from 'utils/configs'
import { INVITE_STATUS } from 'utils/constants'
import Animate from 'styles/animate.module.css'

export default function CreatePage() {
  const [details, setDetails] = useState(INITIAL_CREATE_FORM_STATE)
  const router = useRouter()

  const updateDetails = (formValues) => {
    setDetails({ ...details, ...formValues })
  }

  const handleConfirmClick = async () => {
    const hash = randomstring.generate(12)

    // create room
    const roomRef = await createRoom({
      status: INVITE_STATUS,
      participants: [{ name: details.creator, email: details.email, hash }],
      recipient: details.recipient,
      giftName: details.giftName,
      giftPrice: details.giftPrice,
      giftWebsite: details.giftWebsite,
      minContributors: details.minContributors,
    })

    // send email to creator

    // navigate to room with hash in param
    router.push({
      pathname: '/rooms/[slug]',
      query: { slug: roomRef.id, hash },
    })
  }

  const transitions = {
    enterRight: `${Animate.animated} ${Animate.fadeInRight}`,
    enterLeft: `${Animate.animated} ${Animate.fadeInLeft}`,
    exitRight: `${Animate.animated} ${Animate.fadeOutRight}`,
    exitLeft: `${Animate.animated} ${Animate.fadeOutLeft}`,
  }

  return (
    <>
      <StagesBar index={0} />
      <StepWizard transitions={transitions}>
        {WIZARD_STEPS.map((step) => (
          <CreateStep
            title={step.title}
            description={step.description}
            inputs={step.inputs}
            key={step.title}
            updateDetails={updateDetails}
          />
        ))}
        <CreateConfirmation
          data={details}
          onConfirmClick={handleConfirmClick}
        />
      </StepWizard>
    </>
  )
}
