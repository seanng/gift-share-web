import { useEffect } from 'react'
import { INVITE_STATUS } from 'utils/constants'
import StepWizard from 'react-step-wizard'
import Animate from 'styles/animate.module.css'
import RoomInviteLanding from './RoomInviteeLanding'
import RoomInviteForm from './RoomInviteeForm'

export default function RoomInviteeContainer({ data }) {
  const handleRejectClick = () => {
    // pop up modal to explain why.
    // some google analytics stuff goes here.
  }

  if (data.status !== INVITE_STATUS) {
    return <>This room is not open for invites. Please enter via email.</>
  }

  // TODO: change to opacity fadeout. look into dragnjob or animate css lib
  const transitions = {
    enterRight: `${Animate.animated} ${Animate.fadeInRight}`,
    enterLeft: `${Animate.animated} ${Animate.fadeInLeft}`,
    exitRight: `${Animate.animated} ${Animate.fadeOutRight}`,
    exitLeft: `${Animate.animated} ${Animate.fadeOutLeft}`,
  }

  return (
    <StepWizard transition={transitions} isHashEnabled>
      <Proxy />
      <RoomInviteLanding
        hashKey="invite"
        data={data}
        onRejectClick={handleRejectClick}
      />
      <RoomInviteForm
        hashKey="confirm"
        data={data}
        onRejectClick={handleRejectClick}
      />
    </StepWizard>
  )
}

// Hack to get the room hash to work
function Proxy({ nextStep }) {
  useEffect(() => {
    nextStep()
  }, [])
  return <></>
}
